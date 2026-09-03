"use client";

import { useEffect, useState } from "react";
import {
  type DeckOptions,
  defaultDeckOptions,
  loadDeckOptions,
  saveDeckOptions,
  subscribeToDeckOptions,
} from "../lib/deck-options";

export function useDeckOptions() {
  const [options, setOptions] = useState<DeckOptions>(defaultDeckOptions);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setOptions(loadDeckOptions());
      setReady(true);
    };
    queueMicrotask(sync);
    return subscribeToDeckOptions(sync);
  }, []);

  function update(patch: Partial<DeckOptions>) {
    const next = { ...loadDeckOptions(), ...patch };
    saveDeckOptions(next);
    setOptions(next);
  }

  return { options, ready, update };
}

export function DeckOptionSwitches({
  options,
  onChange,
}: {
  options: DeckOptions;
  onChange: (patch: Partial<DeckOptions>) => void;
}) {
  return (
    <div className="deck-options">
      <span className="field-label" id="deck-options-label">
        Deck
      </span>
      <div className="layer-switches" role="group" aria-labelledby="deck-options-label">
        <button
          type="button"
          role="switch"
          aria-checked={options.majorsOnly}
          onClick={() => onChange({ majorsOnly: !options.majorsOnly })}
        >
          <span aria-hidden="true" />
          Majors only
        </button>
        <button
          type="button"
          role="switch"
          aria-checked={options.reversals}
          onClick={() => onChange({ reversals: !options.reversals })}
        >
          <span aria-hidden="true" />
          Reversals
        </button>
      </div>
      <p className="deck-options-note">
        {options.majorsOnly ? "Twenty-two trumps" : "All seventy-eight cards"}
        {options.reversals ? ", upright or reversed." : ", always upright."}
      </p>
    </div>
  );
}
