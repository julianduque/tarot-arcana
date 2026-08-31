import "server-only";

import { createHash, createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { isIP } from "node:net";
import { cookies, headers } from "next/headers";

export const INFERENCE_WINDOW_MS = 5 * 60 * 1000;

const READER_COOKIE = "tarot-reader";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const MAX_BUCKETS = 10_000;

type InferenceBuckets = Map<string, number>;

declare global {
  // Keep the lock stable across development reloads in this single-process app.
  var tarotInferenceBuckets: InferenceBuckets | undefined;
  var tarotCookieSecret: Buffer | undefined;
}

const buckets = globalThis.tarotInferenceBuckets ?? new Map<string, number>();
globalThis.tarotInferenceBuckets = buckets;
const cookieSecret = globalThis.tarotCookieSecret ?? randomBytes(32);
globalThis.tarotCookieSecret = cookieSecret;

export type InferencePermit =
  | { allowed: true; safetyIdentifier: string }
  | { allowed: false; retryAfterSeconds: number };

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function signReaderId(readerId: string) {
  return createHmac("sha256", cookieSecret).update(readerId).digest("base64url");
}

function readSignedReader(value: string | undefined) {
  if (!value) return null;
  const [readerId, signature, extra] = value.split(".");
  if (extra || !readerId || !signature || !/^[0-9a-f-]{36}$/i.test(readerId)) return null;

  const expected = Buffer.from(signReaderId(readerId));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual) ? readerId : null;
}

function validAddress(value: string | null) {
  if (!value) return null;
  const candidate = value.split(",", 1)[0]?.trim();
  return candidate && isIP(candidate) ? candidate : null;
}

function removeExpiredBuckets(now: number) {
  if (buckets.size < MAX_BUCKETS) return;

  for (const [key, expiresAt] of buckets) {
    if (expiresAt <= now) buckets.delete(key);
  }
}

export function reserveInference(
  keys: string[],
  safetyIdentifier: string,
  now = Date.now(),
): InferencePermit {
  removeExpiredBuckets(now);

  if (buckets.size + keys.length > MAX_BUCKETS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(INFERENCE_WINDOW_MS / 1000),
    };
  }

  const retryAt = keys.reduce(
    (latest, key) => Math.max(latest, buckets.get(key) ?? 0),
    0,
  );

  if (retryAt > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((retryAt - now) / 1000)),
    };
  }

  const expiresAt = now + INFERENCE_WINDOW_MS;
  for (const key of keys) buckets.set(key, expiresAt);

  return { allowed: true, safetyIdentifier };
}

export async function acquireInferencePermit(): Promise<InferencePermit> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",", 1)[0]?.trim();
  const localHost = /^(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(host);
  const secureCookie = forwardedProtocol === "https" || (process.env.NODE_ENV === "production" && !localHost);
  const cookieStore = await cookies();
  let readerId = readSignedReader(cookieStore.get(READER_COOKIE)?.value);

  if (!readerId) {
    readerId = randomUUID();
    cookieStore.set(READER_COOKIE, `${readerId}.${signReaderId(readerId)}`, {
      httpOnly: true,
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "strict",
      secure: secureCookie,
    });
  }

  const address =
    validAddress(requestHeaders.get("x-vercel-forwarded-for")) ??
    validAddress(requestHeaders.get("cf-connecting-ip")) ??
    validAddress(requestHeaders.get("x-real-ip"));

  const readerHash = digest(`reader:${readerId}`);
  const keys = [`reader:${readerHash}`];
  if (address) keys.push(`network:${digest(`network:${address}`)}`);

  return reserveInference(keys, digest(`tarot-arcana:${readerId}`));
}
