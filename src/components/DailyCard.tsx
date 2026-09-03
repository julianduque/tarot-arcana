"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getDailyState, revealDailyState } from "../lib/daily-card";
import {
  dailyEntryId,
  type JournalEntry,
  loadJournal,
  upsertJournalEntry,
} from "../lib/journal";
import { tarotCards } from "../tarotCards";
import { DeckOptionSwitches, useDeckOptions } from "./DeckOptions";
import { MarkdownEditor } from "./MarkdownEditor";
import { StudyLayers, useStudyLayers } from "./StudyLayers";

export function DailyCard() {
  const [daily, setDaily] = useState<ReturnType<typeof getDailyState> | null>(null);
  const [note, setNote] = useState("");
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [justRevealed, setJustRevealed] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const { layers, toggle } = useStudyLayers();
  const { options: deckOptions, ready: deckReady, update: updateDeckOptions } = useDeckOptions();

  useEffect(() => {
    if (!deckReady) return;
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      const state = getDailyState(deckOptions);
      setDaily(state);
      const existing = loadJournal().find((entry) => entry.id === dailyEntryId());
      if (existing) {
        setNote(existing.note);
        setCreatedAt(existing.createdAt);
      }
    });
    return () => {
      active = false;
    };
  }, [deckReady, deckOptions]);

  const card = useMemo(
    () => (daily ? tarotCards.find((item) => item.id === daily.cardId) ?? null : null),
    [daily],
  );

  const dateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      }).format(new Date()),
    [],
  );

  function createEntry(
    nextNote = note,
    entryCreatedAt = createdAt ?? new Date().toISOString(),
  ): JournalEntry | null {
    if (!daily || !card) return null;
    return {
      id: dailyEntryId(),
      kind: "daily",
      title: "Today’s card",
      question: "A card for the day in front of you.",
      createdAt: entryCreatedAt,
      cards: [
        {
          id: card.id,
          name: card.name,
          imageUrl: card.imageUrl,
          position: "Today",
          isReversed: daily.isReversed,
        },
      ],
      note: nextNote,
    };
  }

  function turnCard() {
    if (!daily || !card) return;
    const next = revealDailyState(daily);
    setDaily(next);
    setJustRevealed(true);
    const entryCreatedAt = createdAt ?? new Date().toISOString();
    setCreatedAt(entryCreatedAt);
    const entry = createEntry(note, entryCreatedAt);
    if (entry) upsertJournalEntry(entry);
  }

  function handleNote(value: string) {
    setNote(value);
    const entry = createEntry(value);
    if (entry) upsertJournalEntry(entry);
  }

  if (!daily || !card) {
    return (
      <main className="app-shell" aria-busy="true">
        <div className="daily-loading">Preparing today’s card…</div>
      </main>
    );
  }

  const meaning = daily.isReversed ? card.reversed : card.meaning;
  const orientation = daily.isReversed ? "Reversed" : "Upright";

  return (
    <main className="app-shell daily-page">
      <section className="daily-reading" aria-labelledby="daily-heading">
        <header className="daily-heading-row">
          <h1 id="daily-heading">Today’s card</h1>
          <time dateTime={daily.date}>{dateLabel}</time>
        </header>

        <div className={`daily-card-stage ${justRevealed ? "just-revealed" : ""}`}>
          {daily.isRevealed ? (
            <div className={`daily-card-face ${daily.isReversed ? "is-reversed" : ""}`}>
              <Image
                src={card.imageUrl}
                alt={`${card.name}, ${orientation.toLowerCase()}`}
                fill
                priority
                sizes="(max-width: 720px) 74vw, 320px"
              />
            </div>
          ) : (
            <button className="card-back-button" type="button" onClick={turnCard}>
              <span className="card-back-mark" aria-hidden="true">
                <span />
                <span />
              </span>
              <span className="sr-only">Turn today’s card</span>
            </button>
          )}
        </div>

        <div className="daily-card-copy" aria-live="polite">
          {daily.isRevealed ? (
            <>
              <div className="card-title-row">
                <h2>{card.name}</h2>
                <span>{orientation}</span>
              </div>
              <p>{meaning}</p>
              <div className="daily-actions">
                <button
                  className="button-quiet"
                  type="button"
                  aria-expanded={studyOpen}
                  onClick={() => setStudyOpen((open) => !open)}
                >
                  {studyOpen ? "Close study" : "Study layers"}
                </button>
                <button
                  className="button-quiet"
                  type="button"
                  aria-expanded={noteOpen}
                  onClick={() => setNoteOpen((open) => !open)}
                >
                  {noteOpen ? "Close note" : note ? "Open note" : "Add note"}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>A card for the day in front of you.</h2>
              <p>Turn it when you’re ready. It will stay here until tomorrow.</p>
              <button className="button-primary" type="button" onClick={turnCard}>
                Turn the card
              </button>
              <DeckOptionSwitches options={deckOptions} onChange={updateDeckOptions} />
            </>
          )}
        </div>

        {daily.isRevealed && studyOpen && (
          <div className="daily-drawer">
            <StudyLayers card={card} layers={layers} onToggle={toggle} />
          </div>
        )}

        {daily.isRevealed && noteOpen && (
          <section className="daily-drawer" aria-labelledby="daily-note-heading">
            <div className="note-heading-row">
              <h2 id="daily-note-heading">Your note</h2>
              <span className="local-only">Saved</span>
            </div>
            <MarkdownEditor
              value={note}
              onChange={handleNote}
              label="Note about today’s card"
              placeholder="What does this card bring to mind?"
              minHeight={220}
            />
          </section>
        )}
      </section>
    </main>
  );
}
