import spreadData from "../data/spreads.json";

export interface SpreadPosition {
  n: number;
  label: string;
  saying: string;
  description: string;
  col: number;
  row: number;
  rotated?: boolean;
}

export interface SpreadDefinition {
  id: "three-card" | "celtic-cross";
  name: string;
  cards: number;
  significator: boolean;
  columns: number;
  rows: number;
  provenance: string;
  positions: SpreadPosition[];
  significatorSlot?: { col: number; row: number };
  significatorGuide?: {
    ranks: Record<string, string>;
    suits: Record<string, string>;
  };
}

export const spreadDefinitions = spreadData.spreads as unknown as Record<
  "three-card" | "celtic-cross",
  SpreadDefinition
>;

export const oneCardPosition: SpreadPosition = {
  n: 1,
  label: "The matter",
  saying: "",
  description: "The central influence to notice in the question or situation.",
  col: 0,
  row: 0,
};
