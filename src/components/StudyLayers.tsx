"use client";

import { useEffect, useState } from "react";
import type { TarotCard } from "../tarotCards";

export type StudyLayer = "book" | "alchemy" | "astrology" | "qabalah";

const STORAGE_KEY = "tarot-arcana:study-layers:v1";
const layerOptions: { id: StudyLayer; label: string }[] = [
  { id: "book", label: "Pictorial Key" },
  { id: "alchemy", label: "Alchemy" },
  { id: "astrology", label: "Astrology" },
  { id: "qabalah", label: "Qabalah" },
];

function validLayers(value: unknown): StudyLayer[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(layerOptions.map((option) => option.id));
  return value.filter(
    (item): item is StudyLayer => typeof item === "string" && allowed.has(item as StudyLayer),
  );
}

export function useStudyLayers() {
  const [layers, setLayers] = useState<StudyLayer[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) setLayers(validLayers(JSON.parse(saved)));
      } catch {
        // A damaged preference falls back to the intentionally simple view.
      }
    });
  }, []);

  function toggle(layer: StudyLayer) {
    setLayers((current) => {
      const next = current.includes(layer)
        ? current.filter((item) => item !== layer)
        : [...current, layer];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return { layers, toggle };
}

function Datum({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="study-datum">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function StudyLayers({
  card,
  layers,
  onToggle,
}: {
  card: TarotCard;
  layers: StudyLayer[];
  onToggle: (layer: StudyLayer) => void;
}) {
  const corr = card.correspondences;

  return (
    <section className="study-layers" aria-labelledby="study-layers-heading">
      <div className="study-layers-heading">
        <div>
          <h3 id="study-layers-heading">Study layers</h3>
          <p>Keep the reading plain, or add only the systems you want.</p>
        </div>
        <span>{layers.length ? `${layers.length} on` : "Simple"}</span>
      </div>

      <div className="layer-switches" role="group" aria-label="Correspondence layers">
        {layerOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            role="switch"
            aria-checked={layers.includes(option.id)}
            onClick={() => onToggle(option.id)}
          >
            <span aria-hidden="true" />
            {option.label}
          </button>
        ))}
      </div>

      {layers.length > 0 && (
        <div className="study-content">
          {layers.includes("book") && (
            <section>
              <h4>The Pictorial Key to the Tarot</h4>
              <p>{card.description}</p>
              {card.additional && (
                <p className="study-secondary">
                  <strong>Additional divinatory meaning:</strong> {card.additional.upright}
                </p>
              )}
            </section>
          )}
          {layers.includes("alchemy") && corr.element && (
            <dl>
              <Datum label="Elemental attribution" value={corr.element} />
            </dl>
          )}
          {layers.includes("astrology") && corr.astrology && (
            <dl>
              <Datum label="Astrological attribution" value={corr.astrology} />
            </dl>
          )}
          {layers.includes("qabalah") && (
            <dl>
              <Datum label="Esoteric title" value={corr.title} />
              <Datum label="Hebrew" value={corr.hebrew} />
              <Datum label="Tree of Life path" value={corr.path} />
              <Datum label="Connects" value={corr.connects} />
              <Datum label="Sephirah" value={corr.sephirah} />
              <Datum label="Qabalistic world" value={corr.world} />
            </dl>
          )}
        </div>
      )}
      <p className="study-source">Waite text (1911) · Golden Dawn / Book T attributions</p>
    </section>
  );
}
