"use client";

export type JournalKind = "daily" | "one-card" | "three-card" | "celtic-cross";

export interface JournalCard {
  id: number;
  name: string;
  imageUrl: string;
  position: string;
  isReversed: boolean;
}

export interface JournalEntry {
  id: string;
  kind: JournalKind;
  title: string;
  question: string;
  createdAt: string;
  cards: JournalCard[];
  significator?: JournalCard;
  note: string;
  interpretation?: string;
}

export function noteIncludesInterpretation(note: string, interpretation: string) {
  const content = interpretation.trim();
  return content.length > 0 && note.includes(content);
}

export function appendInterpretationToNote(note: string, interpretation: string) {
  const content = interpretation.trim();
  if (!content || noteIncludesInterpretation(note, content)) return note;

  const block = `## Interpretation\n\n${content}`;
  return note.trim()
    ? `${note.trimEnd()}\n\n---\n\n${block}\n`
    : `${block}\n`;
}

const JOURNAL_KEY = "tarot-arcana:journal:v1";
const JOURNAL_EVENT = "tarot-arcana:journal-change";

function isJournalEntry(value: unknown): value is JournalEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<JournalEntry>;
  return (
    typeof entry.id === "string" &&
    typeof entry.title === "string" &&
    typeof entry.question === "string" &&
    typeof entry.createdAt === "string" &&
    typeof entry.note === "string" &&
    Array.isArray(entry.cards)
  );
}

export function loadJournal(): JournalEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(JOURNAL_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isJournalEntry) : [];
  } catch {
    return [];
  }
}

function saveJournal(entries: JournalEntry[]) {
  window.localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
  window.dispatchEvent(new Event(JOURNAL_EVENT));
}

export function upsertJournalEntry(entry: JournalEntry) {
  if (typeof window === "undefined") return;
  const entries = loadJournal();
  const existingIndex = entries.findIndex((item) => item.id === entry.id);

  if (existingIndex === -1) entries.unshift(entry);
  else entries[existingIndex] = entry;

  saveJournal(entries);
}

export function updateJournalNote(id: string, note: string) {
  if (typeof window === "undefined") return;
  const entries = loadJournal();
  const next = entries.map((entry) => (entry.id === id ? { ...entry, note } : entry));
  saveJournal(next);
}

export function updateJournalInterpretation(id: string, interpretation: string) {
  if (typeof window === "undefined") return;
  const entries = loadJournal();
  const next = entries.map((entry) =>
    entry.id === id ? { ...entry, interpretation } : entry,
  );
  saveJournal(next);
}

export function deleteJournalEntry(id: string) {
  if (typeof window === "undefined") return;
  saveJournal(loadJournal().filter((entry) => entry.id !== id));
}

export function subscribeToJournal(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener(JOURNAL_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(JOURNAL_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function dailyEntryId(date = new Date()) {
  return `daily:${localDateKey(date)}`;
}
