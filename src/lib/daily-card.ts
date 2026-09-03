"use client";

import { findCard } from "../tarotCards";
import { cardAllowed, deckFor, type DeckOptions } from "./deck-options";
import { localDateKey } from "./journal";

interface DailyState {
  date: string;
  cardId: number;
  isReversed: boolean;
  isRevealed: boolean;
}

const DAILY_KEY = "tarot-arcana:daily:v1";
const SEED_KEY = "tarot-arcana:installation-seed:v1";

function getInstallationSeed() {
  const stored = window.localStorage.getItem(SEED_KEY);
  if (stored) return stored;

  const bytes = new Uint32Array(2);
  window.crypto.getRandomValues(bytes);
  const seed = `${bytes[0].toString(16)}${bytes[1].toString(16)}`;
  window.localStorage.setItem(SEED_KEY, seed);
  return seed;
}

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function matchesOptions(state: DailyState, options: DeckOptions) {
  const card = findCard(state.cardId);
  if (!card) return false;
  // A card already turned stays for the day even if the deck settings change afterwards.
  if (state.isRevealed) return true;
  return cardAllowed(card, options) && (options.reversals || !state.isReversed);
}

export function getDailyState(options: DeckOptions): DailyState {
  const date = localDateKey();
  const stored = window.localStorage.getItem(DAILY_KEY);

  if (stored) {
    try {
      const parsed = JSON.parse(stored) as DailyState;
      if (parsed.date === date && matchesOptions(parsed, options)) {
        return parsed;
      }
    } catch {
      // A malformed local value is replaced by a clean daily draw below.
    }
  }

  const deck = deckFor(options);
  const seed = getInstallationSeed();
  const cardHash = hash(`${seed}:${date}:card`);
  const orientationHash = hash(`${seed}:${date}:orientation`);
  const state: DailyState = {
    date,
    cardId: deck[cardHash % deck.length].id,
    isReversed: options.reversals && orientationHash % 2 === 0,
    isRevealed: false,
  };
  window.localStorage.setItem(DAILY_KEY, JSON.stringify(state));
  return state;
}

export function revealDailyState(state: DailyState): DailyState {
  const next = { ...state, isRevealed: true };
  window.localStorage.setItem(DAILY_KEY, JSON.stringify(next));
  return next;
}
