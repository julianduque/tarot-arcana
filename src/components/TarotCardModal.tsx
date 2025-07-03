"use client";

import { createPortal } from "react-dom";
import { useEffect } from "react";
import { TarotCard } from "../tarotCards";

interface DrawnCard extends TarotCard {
  isReversed: boolean;
  isRevealed: boolean;
}

interface TarotCardModalProps {
  card: DrawnCard;
  onClose: () => void;
}

export function TarotCardModal({ card, onClose }: TarotCardModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);
  // Helper function to get tooltip text for correspondences
  const getTooltipText = (type: string, value: string) => {
    const tooltips: { [key: string]: { [key: string]: string } } = {
      hebrew: {
        "א": "Aleph - The Ox, representing leadership and new beginnings",
        "ב": "Beth - The House, representing duality and communication", 
        "ג": "Gimel - The Camel, representing movement and intuition",
        "ד": "Daleth - The Door, representing structure and stability",
        "ה": "Heh - The Window, representing authority and divine breath",
        "ו": "Vav - The Nail, representing tradition and connection",
        "ז": "Zayin - The Sword, representing choices and relationships",
        "ח": "Chet - The Fence, representing control and protection",
        "ט": "Tet - The Serpent, representing inner strength and courage",
        "י": "Yod - The Hand, representing divine guidance and introspection",
        "כ": "Kaph - The Palm, representing cycles and fortune",
        "ל": "Lamed - The Ox Goad, representing justice and balance",
        "מ": "Mem - The Water, representing sacrifice and letting go",
        "נ": "Nun - The Fish, representing transformation and renewal",
        "ס": "Samekh - The Tent Peg, representing balance and moderation",
        "ע": "Ayin - The Eye, representing material bonds and temptation",
        "פ": "Peh - The Mouth, representing sudden change and revelation",
        "צ": "Tzade - The Fish Hook, representing hope and spirituality",
        "ק": "Qoph - The Back of the Head, representing illusion and intuition",
        "ר": "Resh - The Head, representing vitality and success",
        "ש": "Shin - The Tooth, representing judgement and rebirth",
        "ת": "Tav - The Cross, representing completion and the world"
      },
      astrology: {
        "♅": "Uranus - Planet of innovation, rebellion, and sudden change",
        "☿": "Mercury - Planet of communication, intellect, and travel",
        "☽": "Moon - Celestial body of intuition, emotions, and the subconscious",
        "♀": "Venus - Planet of love, beauty, and harmony",
        "♈": "Aries - Fire sign of leadership, courage, and new beginnings",
        "♉": "Taurus - Earth sign of stability, patience, and material security",
        "♊": "Gemini - Air sign of communication, duality, and adaptability",
        "♋": "Cancer - Water sign of emotions, nurturing, and home",
        "♌": "Leo - Fire sign of creativity, confidence, and self-expression",
        "♍": "Virgo - Earth sign of analysis, service, and perfection",
        "♎": "Libra - Air sign of balance, justice, and relationships",
        "♏": "Scorpio - Water sign of transformation, mystery, and depth",
        "♐": "Sagittarius - Fire sign of adventure, philosophy, and expansion",
        "♑": "Capricorn - Earth sign of ambition, structure, and achievement",
        "♒": "Aquarius - Air sign of innovation, humanitarianism, and freedom",
        "♓": "Pisces - Water sign of intuition, compassion, and spirituality",
        "♃": "Jupiter - Planet of expansion, wisdom, and good fortune",
        "♆": "Neptune - Planet of dreams, illusion, and spiritual awakening",
        "♂": "Mars - Planet of action, energy, and conflict",
        "♇": "Pluto - Planet of transformation, power, and rebirth",
        "☉": "Sun - Star of vitality, ego, and life force"
      },
      element: {
        "🔥": "Fire - Passion, energy, creativity, and spiritual growth",
        "💧": "Water - Emotions, intuition, relationships, and healing",
        "🌪️": "Air - Thoughts, communication, intellect, and new ideas", 
        "🌍": "Earth - Material world, resources, stability, and practical matters"
      }
    };
    
    return tooltips[type]?.[value] || `${type}: ${value}`;
  };

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">×</button>
        
        <div className="modal-body">
          <div className="modal-card-image">
            <div
              className={`card-display ${card.isReversed ? "reversed" : ""}`}
              style={{
                backgroundImage: `url(${card.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>

          <div className="meaning-box">
            <div className="meaning-header">
              <h4 className="meaning-title">{card.name}</h4>
              {card.isReversed && (
                <div className="reversed-indicator">
                  <span>🔄</span>
                  <span>Reversed</span>
                </div>
              )}
              
              <div className="correspondences">
                {card.hebrew && (
                  <div className="correspondence-item tooltip" data-tooltip={getTooltipText('hebrew', card.hebrew)}>
                    <span className="correspondence-symbol">{card.hebrew}</span>
                    <span className="correspondence-text">Hebrew</span>
                  </div>
                )}
                {card.astrology && (
                  <div className="correspondence-item tooltip" data-tooltip={getTooltipText('astrology', card.astrology)}>
                    <span className="correspondence-symbol">{card.astrology}</span>
                    <span className="correspondence-text">Astrology</span>
                  </div>
                )}
                {card.element && (
                  <div className="correspondence-item tooltip" data-tooltip={getTooltipText('element', card.element)}>
                    <span className="correspondence-symbol">{card.element}</span>
                    <span className="correspondence-text">Element</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="meaning-content">
              <div className="meaning-label">
                {card.isReversed ? "Reversed Meaning" : "Upright Meaning"}
              </div>
              <p className="meaning-text mb-4">
                {card.isReversed ? card.reversed : card.meaning}
              </p>
              
              <div className="meaning-label opacity-80 text-sm">
                {card.isReversed ? "Upright Meaning" : "Reversed Meaning"}
              </div>
              <p className="meaning-text opacity-60 text-sm">
                {card.isReversed ? card.meaning : card.reversed}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null;
} 