"use client";

import { useState } from "react";
import { tarotCards, TarotCard } from "../tarotCards";

interface DrawnCard extends TarotCard {
  isReversed: boolean;
  isRevealed: boolean;
}

interface CardSelectionProps {
  onCardsDrawn: (cards: DrawnCard[]) => void;
  cardsToSelect: number;
  readingType: string;
}

type SelectionPhase = 'ready' | 'shuffling' | 'cut' | 'selecting' | 'complete';

export function CardSelection({ onCardsDrawn, cardsToSelect, readingType }: CardSelectionProps) {
  const [phase, setPhase] = useState<SelectionPhase>('ready');
  const [selectedPile, setSelectedPile] = useState<number | null>(null);
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);

  const startSelection = async () => {
    setPhase('shuffling');
    
    // Shuffle the deck
    await new Promise(resolve => setTimeout(resolve, 100));
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    setShuffledDeck(shuffled);
    
    // Wait for shuffle animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPhase('cut');
  };

  const selectPile = async (pileIndex: number) => {
    setSelectedPile(pileIndex);
    await new Promise(resolve => setTimeout(resolve, 800));
    setPhase('selecting');
    
    // Create three piles and select from the chosen one
    const deckThird = Math.floor(shuffledDeck.length / 3);
    const piles = [
      shuffledDeck.slice(0, deckThird),
      shuffledDeck.slice(deckThird, deckThird * 2),
      shuffledDeck.slice(deckThird * 2)
    ];
    
    const selectedDeckPortion = piles[pileIndex];
    
    // Further shuffle the selected pile
    const finalShuffle = [...selectedDeckPortion].sort(() => Math.random() - 0.5);
    
    // Select cards from the top of the chosen pile
    const selectedCards = finalShuffle.slice(0, cardsToSelect).map(card => ({
      ...card,
      isReversed: Math.random() < 0.5,
      isRevealed: false,
    }));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPhase('complete');
    
    // Pass the selected cards to parent
    onCardsDrawn(selectedCards);
  };

  const getPhaseTitle = () => {
    switch (phase) {
      case 'ready':
        return 'Prepare Your Mind';
      case 'shuffling':
        return 'Shuffling the Deck';
      case 'cut':
        return 'Cut the Deck';
      case 'selecting':
        return 'Drawing Your Cards';
      case 'complete':
        return 'Cards Selected';
      default:
        return '';
    }
  };

  const getPhaseInstructions = () => {
    switch (phase) {
      case 'ready':
        return 'Focus on your question and click the deck when you feel ready to begin the shuffle.';
      case 'shuffling':
        return 'The cards are being shuffled with your energy and intention...';
      case 'cut':
        return 'Choose one of the three piles to draw your cards from. Trust your intuition.';
      case 'selecting':
        return `Drawing ${cardsToSelect} cards from your chosen pile...`;
      case 'complete':
        return 'Your cards have been selected. The reading can now begin.';
      default:
        return '';
    }
  };

  return (
    <div className="card-selection-container">
      {/* Progress Indicator */}
      <div className="selection-progress">
        <div className={`progress-step ${phase === 'ready' ? 'active' : phase !== 'ready' ? 'completed' : ''}`}>
          <span className="progress-step-icon">🧘</span>
          <span>Focus</span>
        </div>
        <div className={`progress-step ${phase === 'shuffling' ? 'active' : ['cut', 'selecting', 'complete'].includes(phase) ? 'completed' : ''}`}>
          <span className="progress-step-icon">🔀</span>
          <span>Shuffle</span>
        </div>
        <div className={`progress-step ${phase === 'cut' ? 'active' : ['selecting', 'complete'].includes(phase) ? 'completed' : ''}`}>
          <span className="progress-step-icon">✂️</span>
          <span>Cut</span>
        </div>
        <div className={`progress-step ${phase === 'selecting' ? 'active' : phase === 'complete' ? 'completed' : ''}`}>
          <span className="progress-step-icon">🎯</span>
          <span>Draw</span>
        </div>
      </div>

      <div className="selection-phase">
        <h3 className="selection-title">{getPhaseTitle()}</h3>
        <p className="selection-instructions">{getPhaseInstructions()}</p>
      </div>

      {/* Ready Phase - Show deck to shuffle */}
      {phase === 'ready' && (
        <div className="deck-container">
          <div className="deck-stack" onClick={startSelection}>
            <div className="deck-card">✦</div>
            <div className="deck-card">✦</div>
            <div className="deck-card">✦</div>
            <div className="deck-card">✦</div>
            <div className="deck-card">✦</div>
          </div>
        </div>
      )}

      {/* Shuffling Phase */}
      {phase === 'shuffling' && (
        <div className="deck-container">
          <div className="deck-stack shuffling">
            <div className="deck-card">✦</div>
            <div className="deck-card">✦</div>
            <div className="deck-card">✦</div>
            <div className="deck-card">✦</div>
            <div className="deck-card">✦</div>
          </div>
        </div>
      )}

      {/* Cut Phase - Show three piles */}
      {phase === 'cut' && (
        <div className="cut-selector">
          {[0, 1, 2].map((pileIndex) => (
            <div
              key={pileIndex}
              className={`cut-pile ${selectedPile === pileIndex ? 'selected' : ''}`}
              onClick={() => selectPile(pileIndex)}
            >
              <div className="cut-pile-cards">
                <div className="cut-pile-card">✦</div>
                <div className="cut-pile-card">✦</div>
                <div className="cut-pile-card">✦</div>
              </div>
              <div className="cut-label">Pile {pileIndex + 1}</div>
            </div>
          ))}
        </div>
      )}

      {/* Selecting Phase */}
      {(phase === 'selecting' || phase === 'complete') && (
        <div className="deck-container">
          <div className="deck-stack">
            <div className="deck-card">✦</div>
            <div className="deck-card">✦</div>
            <div className="deck-card">✦</div>
          </div>
        </div>
      )}
    </div>
  );
}