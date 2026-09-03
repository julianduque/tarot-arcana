"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { analyzeReading } from "../app/actions";
import type { SpreadPosition } from "../lib/spreads";
import { spreadDefinitions } from "../lib/spreads";
import type { JournalEntry, JournalKind } from "../lib/journal";
import {
  appendInterpretationToNote,
  noteIncludesInterpretation,
  upsertJournalEntry,
} from "../lib/journal";
import { deckFor } from "../lib/deck-options";
import { findCard, tarotCards, type TarotCard } from "../tarotCards";
import { DeckOptionSwitches, useDeckOptions } from "./DeckOptions";
import { MarkdownEditor, MarkdownView } from "./MarkdownEditor";
import { StudyLayers, useStudyLayers } from "./StudyLayers";

interface DrawnCard extends TarotCard {
  isReversed: boolean;
  isRevealed: boolean;
}

interface ReadingExperienceProps {
  kind: Exclude<JournalKind, "daily">;
  title: string;
  description: string;
  positions: SpreadPosition[];
}

const rankOrder = ["knight", "king", "queen", "page"];
const suitOrder = ["wands", "cups", "swords", "pentacles"];

function secureShuffle<T>(items: T[]) {
  const shuffled = [...items];
  const random = new Uint32Array(shuffled.length);
  window.crypto.getRandomValues(random);

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = random[index] % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function orientationLabel(card: DrawnCard) {
  return card.isReversed ? "Reversed" : "Upright";
}

function SignificatorChooser({
  rank,
  suit,
  onRank,
  onSuit,
}: {
  rank: string;
  suit: string;
  onRank: (rank: string) => void;
  onSuit: (suit: string) => void;
}) {
  const guide = spreadDefinitions["celtic-cross"].significatorGuide;

  return (
    <section className="significator-chooser" aria-labelledby="significator-heading">
      <div>
        <p className="setup-kicker">Optional · Waite method</p>
        <h2 id="significator-heading">Choose a significator</h2>
        <p>
          This card stands for the person or matter. It is laid face up before the first
          card covers it. The historical guide below is Waite’s.
        </p>
      </div>
      <div className="significator-columns">
        <fieldset>
          <legend>Who</legend>
          {rankOrder.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={rank === option}
              onClick={() => onRank(option)}
            >
              <strong>{option}</strong>
              <span>{guide?.ranks[option]}</span>
            </button>
          ))}
        </fieldset>
        <fieldset>
          <legend>Colouring</legend>
          {suitOrder.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={suit === option}
              onClick={() => onSuit(option)}
            >
              <strong>{option}</strong>
              <span>{guide?.suits[option]}</span>
            </button>
          ))}
        </fieldset>
      </div>
    </section>
  );
}

export function ReadingExperience({ kind, title, description, positions }: ReadingExperienceProps) {
  const [question, setQuestion] = useState("");
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [significatorId, setSignificatorId] = useState<number | null>(null);
  const [pendingRank, setPendingRank] = useState("");
  const [pendingSuit, setPendingSuit] = useState("");
  const [entryId, setEntryId] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { layers, toggle } = useStudyLayers();
  const { options: deckOptions, update: updateDeckOptions } = useDeckOptions();

  const allRevealed = cards.length > 0 && cards.every((card) => card.isRevealed);
  const selectedCard = selectedIndex === null ? null : cards[selectedIndex];
  const significator = significatorId === null ? null : findCard(significatorId) ?? null;
  const isCeltic = kind === "celtic-cross";
  const interpretationSavedToNote = Boolean(
    interpretation && noteIncludesInterpretation(note, interpretation),
  );

  const readingQuestion = useMemo(
    () => question.trim() || "What should I notice right now?",
    [question],
  );

  const chosenSignificator = useMemo(
    () =>
      pendingRank && pendingSuit
        ? tarotCards.find((card) => card.sourceId === `${pendingRank}-${pendingSuit}`) ?? null
        : null,
    [pendingRank, pendingSuit],
  );

  function journalEntry(
    nextCards = cards,
    nextNote = note,
    nextInterpretation = interpretation ?? undefined,
  ): JournalEntry | null {
    if (!entryId || !createdAt || nextCards.length === 0) return null;
    return {
      id: entryId,
      kind,
      title,
      question: readingQuestion,
      createdAt,
      cards: nextCards.map((card, index) => ({
        id: card.id,
        name: card.name,
        imageUrl: card.imageUrl,
        position: positions[index].label,
        isReversed: card.isReversed,
      })),
      significator: significator
        ? {
            id: significator.id,
            name: significator.name,
            imageUrl: significator.imageUrl,
            position: "Significator",
            isReversed: false,
          }
        : undefined,
      note: nextNote,
      interpretation: nextInterpretation,
    };
  }

  function drawCards(nextSignificator: TarotCard | null) {
    const deck = deckFor(deckOptions);
    const available = nextSignificator
      ? deck.filter((card) => card.id !== nextSignificator.id)
      : deck;
    const nextCards = secureShuffle(available)
      .slice(0, positions.length)
      .map((card) => ({
        ...card,
        isReversed:
          deckOptions.reversals &&
          window.crypto.getRandomValues(new Uint8Array(1))[0] % 2 === 0,
        isRevealed: false,
      }));
    const nextId = window.crypto.randomUUID();
    const nextCreatedAt = new Date().toISOString();
    setCards(nextCards);
    setSignificatorId(nextSignificator?.id ?? null);
    setEntryId(nextId);
    setCreatedAt(nextCreatedAt);
    setSelectedIndex(null);
    setNote("");
    setNoteOpen(false);
    setInterpretation(null);
    setError(null);

    upsertJournalEntry({
      id: nextId,
      kind,
      title,
      question: readingQuestion,
      createdAt: nextCreatedAt,
      cards: nextCards.map((card, index) => ({
        id: card.id,
        name: card.name,
        imageUrl: card.imageUrl,
        position: positions[index].label,
        isReversed: card.isReversed,
      })),
      significator: nextSignificator
        ? {
            id: nextSignificator.id,
            name: nextSignificator.name,
            imageUrl: nextSignificator.imageUrl,
            position: "Significator",
            isReversed: false,
          }
        : undefined,
      note: "",
    });
  }

  function revealCard(index: number) {
    setCards((current) => {
      const next = current.map((card, cardIndex) =>
        cardIndex === index ? { ...card, isRevealed: true } : card,
      );
      const entry = journalEntry(next);
      if (entry) upsertJournalEntry(entry);
      return next;
    });
    setSelectedIndex(index);
  }

  function revealAll() {
    setCards((current) => {
      const next = current.map((card) => ({ ...card, isRevealed: true }));
      const entry = journalEntry(next);
      if (entry) upsertJournalEntry(entry);
      return next;
    });
    setSelectedIndex(0);
  }

  function updateNote(value: string) {
    setNote(value);
    const entry = journalEntry(cards, value);
    if (entry) upsertJournalEntry(entry);
  }

  function saveInterpretationToNote() {
    if (!interpretation) return;
    updateNote(appendInterpretationToNote(note, interpretation));
    setNoteOpen(true);
  }

  async function interpretReading() {
    if (!allRevealed) return;
    setIsInterpreting(true);
    setError(null);

    try {
      const result = await analyzeReading({
        question: readingQuestion,
        readingType: kind,
        studyLayers: layers,
        significatorId,
        cards: cards.map((card) => ({
          cardId: card.id,
          isReversed: card.isReversed,
        })),
      });
      if (!result.ok) {
        if (result.reason === "cooldown") {
          const minutes = Math.max(1, Math.ceil((result.retryAfterSeconds ?? 300) / 60));
          setError(`Another interpretation will be available in ${minutes} ${minutes === 1 ? "minute" : "minutes"}.`);
        } else if (result.reason === "blocked") {
          setError("Keep the question focused on this reading, then try again.");
        } else if (result.reason === "invalid") {
          setError("Start a new reading and try again.");
        } else {
          setError("The reading could not be completed. Try again later.");
        }
        return;
      }
      setInterpretation(result.interpretation);
      const entry = journalEntry(cards, note, result.interpretation);
      if (entry) upsertJournalEntry(entry);
    } catch {
      setError("The reading could not be completed. Try again.");
    } finally {
      setIsInterpreting(false);
    }
  }

  function resetReading() {
    setCards([]);
    setSelectedIndex(null);
    setSignificatorId(null);
    setEntryId(null);
    setCreatedAt(null);
    setNote("");
    setNoteOpen(false);
    setStudyOpen(false);
    setInterpretation(null);
    setError(null);
  }

  return (
    <main className="app-shell reading-page">
      <header className="reading-header">
        <Link className="back-link" href="/readings">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5m5-5-5 5 5 5" />
          </svg>
          Readings
        </Link>
        <div className="reading-heading">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {cards.length > 0 && (
          <button className="button-quiet" type="button" onClick={resetReading}>
            New reading
          </button>
        )}
      </header>

      {cards.length === 0 ? (
        <section className={`reading-setup ${isCeltic ? "is-celtic" : ""}`}>
          <div>
            <h2 id="reading-question-heading">Name what you want to look at.</h2>
            <p>The question is optional. A clear focus often makes the cards easier to read.</p>
          </div>
          <label className="field-label" htmlFor="reading-question">
            Your question
          </label>
          <textarea
            id="reading-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            rows={3}
            placeholder="What should I understand about…"
          />

          <DeckOptionSwitches options={deckOptions} onChange={updateDeckOptions} />

          {isCeltic && (
            <SignificatorChooser
              rank={pendingRank}
              suit={pendingSuit}
              onRank={setPendingRank}
              onSuit={setPendingSuit}
            />
          )}

          <div className="setup-actions">
            {isCeltic ? (
              <>
                <button
                  className="button-primary"
                  type="button"
                  onClick={() => drawCards(chosenSignificator)}
                  disabled={!chosenSignificator}
                >
                  Deal with {chosenSignificator?.name ?? "this significator"}
                </button>
                <button className="button-quiet" type="button" onClick={() => drawCards(null)}>
                  Skip significator
                </button>
              </>
            ) : (
              <button className="button-primary" type="button" onClick={() => drawCards(null)}>
                Draw {positions.length === 1 ? "one card" : `${positions.length} cards`}
              </button>
            )}
          </div>
        </section>
      ) : (
        <>
          <section className={`spread-workspace spread-${kind}`}>
            <div className="spread-scroll">
              {isCeltic && <p className="spread-scroll-hint">Swipe to see the whole spread →</p>}
              <div className="spread-table" aria-label={`${title} cards`}>
                {isCeltic && significator && (
                  <figure className="significator-slot">
                    <div className="significator-card">
                      <Image
                        src={significator.imageUrl}
                        alt={`${significator.name}, significator`}
                        fill
                        sizes="112px"
                      />
                    </div>
                    <figcaption>
                      <span>Significator</span>
                      <strong>{significator.name}</strong>
                    </figcaption>
                  </figure>
                )}

                {cards.map((card, index) => (
                  <article
                    key={`${card.id}-${positions[index].label}`}
                    className={`spread-slot spread-slot-${index + 1} ${
                      selectedIndex === index ? "is-selected" : ""
                    } ${positions[index].rotated ? "is-rotated" : ""}`}
                  >
                    {!isCeltic && (
                      <p className="spread-position">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {positions[index].label}
                      </p>
                    )}
                    <button
                      className="reading-card-button"
                      type="button"
                      onClick={() => revealCard(index)}
                      aria-label={
                        card.isRevealed
                          ? `Read ${card.name} in ${positions[index].label}`
                          : `Turn card ${index + 1}, ${positions[index].label}`
                      }
                    >
                      {card.isRevealed ? (
                        <span className={`reading-card-face ${card.isReversed ? "is-reversed" : ""}`}>
                          <Image
                            src={card.imageUrl}
                            alt={`${card.name}, ${orientationLabel(card).toLowerCase()}`}
                            fill
                            sizes="(max-width: 720px) 112px, 210px"
                          />
                        </span>
                      ) : (
                        <span className="reading-card-back" aria-hidden="true">
                          <span className="card-back-mark">
                            <span />
                            <span />
                          </span>
                        </span>
                      )}
                      {isCeltic && (
                        <span className="position-chip" aria-hidden="true">
                          {index + 1}
                        </span>
                      )}
                    </button>
                  </article>
                ))}
              </div>
            </div>

            <aside className="reading-inspector" aria-live="polite">
              {selectedCard?.isRevealed ? (
                <>
                  <p className="inspector-position">
                    {selectedIndex === null ? "" : `${selectedIndex + 1}. ${positions[selectedIndex].label}`}
                  </p>
                  <h2>{selectedCard.name}</h2>
                  <p className="inspector-meta">{orientationLabel(selectedCard)}</p>
                  {selectedIndex !== null && positions[selectedIndex].saying && (
                    <p className="position-saying">“{positions[selectedIndex].saying}”</p>
                  )}
                  {selectedIndex !== null && (
                    <p className="position-description">{positions[selectedIndex].description}</p>
                  )}
                  <p className="inspector-meaning">
                    {selectedCard.isReversed ? selectedCard.reversed : selectedCard.meaning}
                  </p>
                  <div className="inspector-actions">
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
                      {noteOpen ? "Close note" : "Add note"}
                    </button>
                  </div>
                  {studyOpen && (
                    <StudyLayers card={selectedCard} layers={layers} onToggle={toggle} />
                  )}
                </>
              ) : (
                <>
                  <h2>Turn the cards in your own time.</h2>
                  <p className="inspector-meaning">
                    Select a face-down card. Its position and source meaning will appear here.
                  </p>
                </>
              )}

              <div className="reading-controls">
                {!allRevealed && (
                  <button className="button-quiet" type="button" onClick={revealAll}>
                    Turn all
                  </button>
                )}
                <span>
                  {cards.filter((card) => card.isRevealed).length} / {cards.length} turned
                </span>
              </div>
            </aside>
          </section>

          {noteOpen && (
            <section className="reading-note-drawer">
              <div className="note-heading-row">
                <h2>Your note</h2>
                <span className="local-only">Saved</span>
              </div>
              <MarkdownEditor
                label={`Note about this ${title} reading`}
                value={note}
                onChange={updateNote}
                placeholder="What stands out when you see these cards together?"
              />
            </section>
          )}

          <section className="interpretation-panel reading-interpretation">
            <div className="interpretation-heading">
              <h2>Interpretation</h2>
              <p>What the cards point to now.</p>
            </div>
            {!interpretation && (
              <button
                className="button-primary"
                type="button"
                onClick={interpretReading}
                disabled={!allRevealed || isInterpreting}
              >
                {isInterpreting ? "Reading the pattern…" : "Interpret this reading"}
              </button>
            )}
            {error && <p className="error-message">{error}</p>}
            {interpretation && (
              <>
                <MarkdownView>{interpretation}</MarkdownView>
                <div className="interpretation-save" aria-live="polite">
                  <button
                    className="button-quiet"
                    type="button"
                    onClick={saveInterpretationToNote}
                    disabled={interpretationSavedToNote}
                  >
                    {interpretationSavedToNote ? "Saved to note" : "Save interpretation to note"}
                  </button>
                </div>
              </>
            )}
          </section>
        </>
      )}
    </main>
  );
}
