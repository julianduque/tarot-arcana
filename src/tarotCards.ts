import waiteDeck from "./data/cards.json";

export interface TarotCorrespondences {
  title: string | null;
  element: string | null;
  astrology: string | null;
  hebrew: string | null;
  path: string | null;
  connects: string | null;
  sephirah: string | null;
  world: string | null;
}

export interface TarotCard {
  id: number;
  sourceId: string;
  name: string;
  arcana: "major" | "minor";
  suit: string | null;
  rank: string | null;
  meaning: string;
  reversed: string;
  description: string;
  additional: { upright: string; reversed: string } | null;
  correspondences: TarotCorrespondences;
  imageUrl: string;
}

interface WaiteCard {
  id: string;
  name: string;
  arcana: "major" | "minor";
  suit: string | null;
  rank: string | null;
  upright: string;
  reversed: string;
  description: string;
  additional: { upright: string; reversed: string } | null;
  corr: TarotCorrespondences;
}

const majorImages: Record<string, string> = {
  "major-00-fool": "fool",
  "major-01-magician": "magician",
  "major-02-high-priestess": "high_priestess",
  "major-03-empress": "empress",
  "major-04-emperor": "emperor",
  "major-05-hierophant": "hierophant",
  "major-06-lovers": "lovers",
  "major-07-chariot": "chariot",
  "major-08-strength": "strength",
  "major-09-hermit": "hermit",
  "major-10-wheel": "wheel_of_fortune",
  "major-11-justice": "justice",
  "major-12-hanged-man": "hanged_man",
  "major-13-death": "death",
  "major-14-temperance": "temperance",
  "major-15-devil": "devil",
  "major-16-tower": "tower",
  "major-17-star": "star",
  "major-18-moon": "moon",
  "major-19-sun": "sun",
  "major-20-judgement": "judgement",
  "major-21-world": "world",
};

function imageName(card: WaiteCard) {
  return card.arcana === "major" ? majorImages[card.id] : card.id.replaceAll("-", "_");
}

/**
 * A. E. Waite's Pictorial Key text and the Golden Dawn / Book T study
 * correspondences are imported verbatim from the companion Omarchy project.
 */
export const tarotCards: TarotCard[] = (waiteDeck.cards as WaiteCard[]).map((card, id) => ({
  id,
  sourceId: card.id,
  name: card.name,
  arcana: card.arcana,
  suit: card.suit,
  rank: card.rank,
  meaning: card.upright,
  reversed: card.reversed,
  description: card.description,
  additional: card.additional,
  correspondences: card.corr,
  imageUrl: `/cards/${imageName(card)}.jpg`,
}));

export function findCard(cardId: number) {
  return tarotCards.find((card) => card.id === cardId);
}

export function correspondenceRows(card: TarotCard) {
  const { correspondences } = card;
  return [
    ["Esoteric title", correspondences.title],
    ["Alchemy", correspondences.element],
    ["Astrology", correspondences.astrology],
    ["Hebrew", correspondences.hebrew],
    ["Tree of Life path", correspondences.path],
    ["Connects", correspondences.connects],
    ["Sephirah", correspondences.sephirah],
    ["Qabalistic world", correspondences.world],
  ].filter((row): row is [string, string] => Boolean(row[1]));
}
