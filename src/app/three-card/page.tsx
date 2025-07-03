"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { TarotCard } from "../../tarotCards";
import { TarotCardModal, CardSelection } from "../../components";
import { analyzeReading } from "../actions";

interface DrawnCard extends TarotCard {
  isReversed: boolean;
  isRevealed: boolean;
}

export default function ThreeCardReading() {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [showCardSelection, setShowCardSelection] = useState(false);
  const [selectedCard, setSelectedCard] = useState<DrawnCard | null>(null);
  const [question, setQuestion] = useState("");
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startCardSelection = () => {
    setShowCardSelection(true);
  };

  const handleCardsDrawn = (cards: DrawnCard[]) => {
    setDrawnCards(cards);
    setShowCardSelection(false);
  };

  const revealCard = (index: number) => {
    setDrawnCards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, isRevealed: true } : card
      )
    );
  };

  const resetReading = () => {
    setDrawnCards([]);
    setShowCardSelection(false);
    setSelectedCard(null);
    setQuestion("");
    setInterpretation(null);
  };

  const handleAnalyzeReading = async () => {
    if (!question.trim() || drawnCards.some(card => !card.isRevealed)) return;
    
    setIsAnalyzing(true);
    try {
      const readingData = {
        question: question.trim(),
        readingType: "three-card" as const,
        cards: drawnCards.map((card, index) => ({
          cardId: card.id,
          position: positionNames[index],
          isReversed: card.isReversed
        }))
      };
      
      const result = await analyzeReading(readingData);
      setInterpretation(result);
    } catch (error) {
      console.error("Error analyzing reading:", error);
      setInterpretation("Sorry, there was an error analyzing your reading. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCardClick = (card: DrawnCard, index: number) => {
    if (!card.isRevealed) {
      revealCard(index);
    } else {
      setSelectedCard(card);
    }
  };

  const positionNames = ["Past", "Present", "Future"];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="reading-container">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-serif mb-6 text-shadow-gold text-gold">
              Three Card Reading
            </h1>
            <p className="text-xl text-antique-gold mb-12">
              Past, Present, and Future
            </p>

            {/* Question Input */}
            <div className="mb-12 max-w-5xl mx-auto">
              <label htmlFor="question">
                What would you like guidance on?
              </label>
              <input
                id="question"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && question.trim() && drawnCards.length === 0 && !showCardSelection) {
                    startCardSelection();
                  } else if (e.key === 'Enter' && question.trim() && drawnCards.every(card => card.isRevealed)) {
                    handleAnalyzeReading();
                  }
                }}
                placeholder="Enter your question about love, career, personal growth, or any area where you seek guidance..."
                disabled={drawnCards.length > 0}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              {drawnCards.length === 0 && !showCardSelection && (
                <button
                  onClick={startCardSelection}
                  disabled={!question.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Begin Card Selection
                </button>
              )}

              {drawnCards.length > 0 && (
                <button onClick={resetReading} className="btn-secondary">
                  New Reading
                </button>
              )}
            </div>
          </header>

          {/* Card Selection Experience */}
          {showCardSelection && (
            <CardSelection
              onCardsDrawn={handleCardsDrawn}
              cardsToSelect={3}
              readingType="three-card"
            />
          )}

          {drawnCards.length > 0 && (
            <section className="mb-16">
              <div className="cards-grid">
                {drawnCards.map((card, index) => (
                  <div key={`${card.id}-${index}`} className="card-column">
                    {/* Position Label */}
                    <h3 className="position-label">{positionNames[index]}</h3>

                    {/* Card */}
                    <div
                      className={`card-container cursor-pointer ${
                        card.isRevealed
                          ? "hover:shadow-xl hover:shadow-gold/40"
                          : "hover:shadow-xl hover:shadow-gold/20"
                      }`}
                      onClick={() => handleCardClick(card, index)}
                      style={{ width: "280px", height: "480px" }}
                    >
                      {!card.isRevealed ? (
                        /* Card Back */
                        <div className="w-full h-full card-back rounded-lg border-4 border-gold shadow-xl relative"></div>
                      ) : (
                        /* Revealed Card */
                        <div
                          className={`w-full h-full rounded-lg border-4 border-gold shadow-xl relative overflow-hidden
                                   ${card.isReversed ? "rotate-180" : ""}`}
                          style={{
                            backgroundImage: `url(${card.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          {/* Click to view meaning overlay */}
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-end justify-center">
                            <div className="text-white text-sm bg-black/70 px-3 py-1 rounded-t-lg opacity-0 hover:opacity-100 transition-opacity">
                              Click for meaning
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Analyze Button */}
              {drawnCards.every(card => card.isRevealed) && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleAnalyzeReading}
                    disabled={isAnalyzing || !question.trim()}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? "Analyzing..." : "✦ Analyze Reading ✦"}
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Interpretation Results */}
          {interpretation && (
            <section className="mb-16">
              <div className="analysis-container">
                <h2>✦ Your Reading Interpretation ✦</h2>
                <div className="markdown-content">
                  <ReactMarkdown>{interpretation}</ReactMarkdown>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedCard && (
        <TarotCardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </main>
  );
} 