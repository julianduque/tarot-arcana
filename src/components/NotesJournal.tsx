"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  deleteJournalEntry,
  JournalEntry,
  loadJournal,
  noteIncludesInterpretation,
  subscribeToJournal,
  updateJournalNote,
} from "../lib/journal";
import { MarkdownEditor, MarkdownView } from "./MarkdownEditor";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function NotesJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const refresh = () => {
      const next = loadJournal().sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setEntries(next);
      setSelectedId((current) =>
        current && next.some((entry) => entry.id === current) ? current : (next[0]?.id ?? null),
      );
    };

    refresh();
    return subscribeToJournal(refresh);
  }, []);

  const selected = useMemo(
    () => entries.find((entry) => entry.id === selectedId) ?? null,
    [entries, selectedId],
  );
  const interpretationIsInNote = Boolean(
    selected?.interpretation && noteIncludesInterpretation(selected.note, selected.interpretation),
  );

  function handleNote(value: string) {
    if (!selected) return;
    setEntries((current) =>
      current.map((entry) => (entry.id === selected.id ? { ...entry, note: value } : entry)),
    );
    updateJournalNote(selected.id, value);
  }

  function removeSelected() {
    if (!selected) return;
    const confirmed = window.confirm("Delete this reading and its note? This cannot be undone.");
    if (confirmed) deleteJournalEntry(selected.id);
  }

  if (entries.length === 0) {
    return (
      <main className="app-shell notes-page">
        <header className="notes-heading">
          <h1>Notes</h1>
          <p>Your readings and reflections will gather here.</p>
        </header>
        <section className="notes-empty">
          <h2>No readings yet.</h2>
          <p>Turn today’s card or draw a spread. It will appear here with room for a note.</p>
          <Link className="button-primary" href="/">
            Go to today’s card
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell notes-page">
      <header className="notes-heading">
        <h1>Notes</h1>
        <p>{entries.length} {entries.length === 1 ? "entry" : "entries"}</p>
      </header>

      <section className="journal-layout">
        <aside className="journal-list" aria-label="Saved readings">
          {entries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={`journal-list-item ${entry.id === selectedId ? "is-selected" : ""}`}
              onClick={() => {
                setSelectedId(entry.id);
                setEditing(false);
              }}
            >
              <span className="journal-list-date">{formatDate(entry.createdAt)}</span>
              <strong>{entry.title}</strong>
              <span>{entry.cards.map((card) => card.name).join(" · ")}</span>
              {entry.note && <small>Note added</small>}
            </button>
          ))}
        </aside>

        {selected && (
          <article className="journal-entry">
            <header className="journal-entry-header">
              <div>
                <h2>{selected.title}</h2>
                <p>{formatDate(selected.createdAt)}</p>
              </div>
              <button className="button-danger" type="button" onClick={removeSelected}>
                Delete
              </button>
            </header>

            <p className="journal-question">{selected.question}</p>

            <div className="journal-card-strip">
              {selected.significator && (
                <figure key={`significator-${selected.significator.id}`}>
                  <div className="journal-card-image">
                    <Image
                      src={selected.significator.imageUrl}
                      alt={`${selected.significator.name}, significator`}
                      fill
                      sizes="120px"
                    />
                  </div>
                  <figcaption>
                    <span>Significator</span>
                    <strong>{selected.significator.name}</strong>
                  </figcaption>
                </figure>
              )}
              {selected.cards.map((card) => (
                <figure key={`${card.position}-${card.id}`}>
                  <div className={`journal-card-image ${card.isReversed ? "is-reversed" : ""}`}>
                    <Image
                      src={card.imageUrl}
                      alt={`${card.name}, ${card.isReversed ? "reversed" : "upright"}`}
                      fill
                      sizes="120px"
                    />
                  </div>
                  <figcaption>
                    <span>{card.position}</span>
                    <strong>{card.name}</strong>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="journal-editor">
              <div className="note-heading-row">
                <h2>Your note</h2>
                <button
                  className="button-quiet"
                  type="button"
                  onClick={() => setEditing((current) => !current)}
                >
                  {editing ? "Done" : "Edit note"}
                </button>
              </div>
              {editing ? (
                <MarkdownEditor
                  value={selected.note}
                  onChange={handleNote}
                  label={`Note for ${selected.title}`}
                  placeholder="Write what you want to remember."
                />
              ) : (
                <div className="journal-note-reader">
                  <MarkdownView empty="No note yet. Choose “Edit note” to begin.">
                    {selected.note}
                  </MarkdownView>
                </div>
              )}
            </div>

            {selected.interpretation && !interpretationIsInNote && (
              <section className="journal-interpretation">
                <h2>Interpretation</h2>
                <MarkdownView>{selected.interpretation}</MarkdownView>
              </section>
            )}
          </article>
        )}
      </section>
    </main>
  );
}
