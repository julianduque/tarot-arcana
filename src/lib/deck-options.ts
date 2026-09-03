"use client";

import { tarotCards, type TarotCard } from "../tarotCards";

export interface DeckOptions {
  majorsOnly: boolean;
  reversals: boolean;
}

export const DECK_OPTIONS_KEY = "tarot-arcana:deck-options:v1";
export const DECK_OPTIONS_EVENT = "tarot-arcana:deck-options-change";

export const defaultDeckOptions: DeckOptions = {
  majorsOnly: false,
  reversals: true,
};

export function loadDeckOptions(): DeckOptions {
  if (typeof window === "undefined") return defaultDeckOptions;

  try {
    const raw = window.localStorage.getItem(DECK_OPTIONS_KEY);
    if (!raw) return defaultDeckOptions;
    const parsed = JSON.parse(raw) as Partial<DeckOptions>;
    return {
      majorsOnly: typeof parsed.majorsOnly === "boolean" ? parsed.majorsOnly : false,
      reversals: typeof parsed.reversals === "boolean" ? parsed.reversals : true,
    };
  } catch {
    return defaultDeckOptions;
  }
}

export function saveDeckOptions(options: DeckOptions) {
  window.localStorage.setItem(DECK_OPTIONS_KEY, JSON.stringify(options));
  window.dispatchEvent(new Event(DECK_OPTIONS_EVENT));
}

export function subscribeToDeckOptions(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener(DECK_OPTIONS_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(DECK_OPTIONS_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function deckFor(options: DeckOptions): TarotCard[] {
  return options.majorsOnly ? tarotCards.filter((card) => card.arcana === "major") : tarotCards;
}

export function cardAllowed(card: TarotCard, options: DeckOptions) {
  return !options.majorsOnly || card.arcana === "major";
}
