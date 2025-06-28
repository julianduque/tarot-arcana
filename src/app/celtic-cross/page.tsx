"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { tarotCards, TarotCard } from "../../tarotCards";
import { TarotCardModal } from "../../components/TarotCardModal";
import { analyzeReading } from "../actions";

interface DrawnCard extends TarotCard {
  isReversed: boolean;
  isRevealed: boolean;
}

export default function CelticCrossReading() {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedCard, setSelectedCard] = useState<DrawnCard | null>(null);
  const [question, setQuestion] = useState("");
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const drawCards = async () => {
    setIsDrawing(true);
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10).map((card) => ({
      ...card,
      isReversed: Math.random() < 0.5,
      isRevealed: false,
    }));

    // Simulate card drawing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setDrawnCards(selected);
    setIsDrawing(false);
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
        readingType: "celtic-cross" as const,
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

  const positionNames = [
    "Present Situation",
    "Challenge/Cross",
    "Distant Past",
    "Recent Past", 
    "Possible Outcome",
    "Near Future",
    "Your Approach",
    "External Influences",
    "Hopes & Fears",
    "Final Outcome"
  ];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="reading-container">
          <header className="text-center mb-16">
            <Link href="/" className="inline-block mb-6 text-gold hover:text-antique-gold transition-colors">
              ← Back to Readings
            </Link>
            <h1 className="text-5xl font-serif mb-6 text-shadow-gold text-gold">
              ✦ Celtic Cross ✦
            </h1>
            <p className="text-xl text-antique-gold mb-12">
              The ancient ten-card spread
            </p>

            {/* Question Input */}
            <div className="mb-12 max-w-2xl mx-auto">
              <label htmlFor="question">
                What would you like guidance on?
              </label>
              <input
                id="question"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question about love, career, personal growth..."
                disabled={drawnCards.length > 0}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              {drawnCards.length === 0 && (
                <button
                  onClick={drawCards}
                  disabled={isDrawing || !question.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDrawing ? "Drawing Cards..." : "Draw Celtic Cross"}
                </button>
              )}

              {drawnCards.length > 0 && (
                <button onClick={resetReading} className="btn-secondary">
                  New Reading
                </button>
              )}
            </div>
          </header>

          {drawnCards.length > 0 && (
            <section className="mb-16">
              <div className="celtic-cross-layout">
                {/* Left side - Staff cards (positions 6-9) */}
                <div className="staff-cards">
                  {[6, 7, 8, 9].map((position) => {
                    const card = drawnCards[position];
                    return (
                      <div key={`staff-${position}`} className="staff-card">
                        <h3 className="position-label-small">{positionNames[position]}</h3>
                        <div
                          className={`card-container cursor-pointer ${
                            card.isRevealed
                              ? "hover:shadow-xl hover:shadow-gold/40"
                              : "hover:shadow-xl hover:shadow-gold/20"
                          }`}
                          onClick={() => handleCardClick(card, position)}
                          style={{ width: "160px", height: "280px" }}
                        >
                          {!card.isRevealed ? (
                            <div className="w-full h-full card-back rounded-lg border-3 border-gold shadow-xl relative"></div>
                          ) : (
                            <div
                              className={`w-full h-full rounded-lg border-3 border-gold shadow-xl relative overflow-hidden
                                       ${card.isReversed ? "rotate-180" : ""}`}
                              style={{
                                backgroundImage: `url(${card.imageUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                              }}
                            >
                              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-end justify-center">
                                <div className="text-white text-sm bg-black/70 px-2 py-1 rounded-t-lg opacity-0 hover:opacity-100 transition-opacity">
                                  Click
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Center - Cross formation (positions 0-5) */}
                <div className="cross-formation">
                  {/* Top card - Position 5 (Near Future) */}
                  <div className="cross-top">
                    <h3 className="position-label-small">{positionNames[5]}</h3>
                    <div
                      className={`card-container cursor-pointer ${
                        drawnCards[5].isRevealed
                          ? "hover:shadow-xl hover:shadow-gold/40"
                          : "hover:shadow-xl hover:shadow-gold/20"
                      }`}
                      onClick={() => handleCardClick(drawnCards[5], 5)}
                      style={{ width: "160px", height: "280px" }}
                    >
                      {!drawnCards[5].isRevealed ? (
                        <div className="w-full h-full card-back rounded-lg border-3 border-gold shadow-xl relative"></div>
                      ) : (
                        <div
                          className={`w-full h-full rounded-lg border-3 border-gold shadow-xl relative overflow-hidden
                                   ${drawnCards[5].isReversed ? "rotate-180" : ""}`}
                          style={{
                            backgroundImage: `url(${drawnCards[5].imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-end justify-center">
                            <div className="text-white text-sm bg-black/70 px-2 py-1 rounded-t-lg opacity-0 hover:opacity-100 transition-opacity">
                              Click
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                    {/* Left card - Position 3 (Recent Past) */}
                    <div className="cross-left">
                      <h3 className="position-label-small">{positionNames[3]}</h3>
                      <div
                        className={`card-container cursor-pointer ${
                          drawnCards[3].isRevealed
                            ? "hover:shadow-xl hover:shadow-gold/40"
                            : "hover:shadow-xl hover:shadow-gold/20"
                        }`}
                        onClick={() => handleCardClick(drawnCards[3], 3)}
                        style={{ width: "160px", height: "280px" }}
                      >
                        {!drawnCards[3].isRevealed ? (
                          <div className="w-full h-full card-back rounded-lg border-3 border-gold shadow-xl relative"></div>
                        ) : (
                          <div
                            className={`w-full h-full rounded-lg border-3 border-gold shadow-xl relative overflow-hidden
                                     ${drawnCards[3].isReversed ? "rotate-180" : ""}`}
                            style={{
                              backgroundImage: `url(${drawnCards[3].imageUrl})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-end justify-center">
                              <div className="text-white text-sm bg-black/70 px-2 py-1 rounded-t-lg opacity-0 hover:opacity-100 transition-opacity">
                                Click
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Center cards - Present (0) with Challenge (1) overlapping */}
                    <div className="cross-center">
                      <h3 className="position-label-small">{positionNames[0]}</h3>
                      <div className="center-cards-stack">
                        {/* Present Situation - Position 0 */}
                        <div
                          className={`card-container cursor-pointer center-base ${
                            drawnCards[0].isRevealed
                              ? "hover:shadow-xl hover:shadow-gold/40"
                              : "hover:shadow-xl hover:shadow-gold/20"
                          }`}
                          onClick={() => handleCardClick(drawnCards[0], 0)}
                          style={{ width: "180px", height: "300px" }}
                        >
                          {!drawnCards[0].isRevealed ? (
                            <div className="w-full h-full card-back rounded-lg border-4 border-gold shadow-xl relative"></div>
                          ) : (
                            <div
                              className={`w-full h-full rounded-lg border-4 border-gold shadow-xl relative overflow-hidden
                                       ${drawnCards[0].isReversed ? "rotate-180" : ""}`}
                              style={{
                                backgroundImage: `url(${drawnCards[0].imageUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                              }}
                            >
                              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-end justify-center">
                                <div className="text-white text-sm bg-black/70 px-2 py-1 rounded-t-lg opacity-0 hover:opacity-100 transition-opacity">
                                  Click
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Challenge/Cross - Position 1 (rotated and overlapping) */}
                        <div
                          className={`card-container cursor-pointer center-cross ${
                            drawnCards[1].isRevealed
                              ? "hover:shadow-xl hover:shadow-gold/40"
                              : "hover:shadow-xl hover:shadow-gold/20"
                          }`}
                          onClick={() => handleCardClick(drawnCards[1], 1)}
                          style={{ width: "160px", height: "280px" }}
                        >
                          {!drawnCards[1].isRevealed ? (
                            <div className="w-full h-full card-back rounded-lg border-4 border-gold shadow-xl relative"></div>
                          ) : (
                            <div
                              className={`w-full h-full rounded-lg border-4 border-gold shadow-xl relative overflow-hidden
                                       ${drawnCards[1].isReversed ? "rotate-180" : ""}`}
                              style={{
                                backgroundImage: `url(${drawnCards[1].imageUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                              }}
                            >
                              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-end justify-center">
                                <div className="text-white text-sm bg-black/70 px-2 py-1 rounded-t-lg opacity-0 hover:opacity-100 transition-opacity">
                                  {positionNames[1]}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                                          </div>
                  </div>

                  {/* Right card - Position 4 (Possible Outcome) */}
                  <div className="cross-right">
                    <h3 className="position-label-small">{positionNames[4]}</h3>
                    <div
                      className={`card-container cursor-pointer ${
                        drawnCards[4].isRevealed
                          ? "hover:shadow-xl hover:shadow-gold/40"
                          : "hover:shadow-xl hover:shadow-gold/20"
                      }`}
                      onClick={() => handleCardClick(drawnCards[4], 4)}
                      style={{ width: "160px", height: "280px" }}
                    >
                      {!drawnCards[4].isRevealed ? (
                        <div className="w-full h-full card-back rounded-lg border-3 border-gold shadow-xl relative"></div>
                      ) : (
                        <div
                          className={`w-full h-full rounded-lg border-3 border-gold shadow-xl relative overflow-hidden
                                   ${drawnCards[4].isReversed ? "rotate-180" : ""}`}
                          style={{
                            backgroundImage: `url(${drawnCards[4].imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-end justify-center">
                            <div className="text-white text-sm bg-black/70 px-2 py-1 rounded-t-lg opacity-0 hover:opacity-100 transition-opacity">
                              Click
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom card - Position 2 (Distant Past) */}
                  <div className="cross-bottom">
                    <h3 className="position-label-small">{positionNames[2]}</h3>
                    <div
                      className={`card-container cursor-pointer ${
                        drawnCards[2].isRevealed
                          ? "hover:shadow-xl hover:shadow-gold/40"
                          : "hover:shadow-xl hover:shadow-gold/20"
                      }`}
                      onClick={() => handleCardClick(drawnCards[2], 2)}
                      style={{ width: "160px", height: "280px" }}
                    >
                      {!drawnCards[2].isRevealed ? (
                        <div className="w-full h-full card-back rounded-lg border-3 border-gold shadow-xl relative"></div>
                      ) : (
                        <div
                          className={`w-full h-full rounded-lg border-3 border-gold shadow-xl relative overflow-hidden
                                   ${drawnCards[2].isReversed ? "rotate-180" : ""}`}
                          style={{
                            backgroundImage: `url(${drawnCards[2].imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-end justify-center">
                            <div className="text-white text-sm bg-black/70 px-2 py-1 rounded-t-lg opacity-0 hover:opacity-100 transition-opacity">
                              Click
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Analyze Button */}
                {drawnCards.every(card => card.isRevealed) && (
                  <div className="text-center mt-12">
                    <button
                      onClick={handleAnalyzeReading}
                      disabled={isAnalyzing || !question.trim()}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? "Analyzing..." : "✦ Analyze Reading ✦"}
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Interpretation Results */}
          {interpretation && (
            <section className="mb-16">
              <div className="analysis-container">
                <h2>✦ Your Celtic Cross Interpretation ✦</h2>
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