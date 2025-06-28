"use server";

import { mastra } from "../mastra";

interface ReadingData {
  question: string;
  readingType: "three-card" | "celtic-cross";
  cards: {
    cardId: number;
    position: string;
    isReversed: boolean;
  }[];
}

export async function analyzeReading(readingData: ReadingData): Promise<string> {
  try {
    // Get the tarot agent from Mastra
    const agent = mastra.getAgent("tarotAgent");
    
    // Format the reading request for the agent
    const prompt = `Please analyze this ${readingData.readingType} tarot reading:

Question: "${readingData.question}"

Cards drawn:
${readingData.cards.map((card, index) => 
  `${index + 1}. Position: ${card.position} - Card ID: ${card.cardId} - ${card.isReversed ? 'Reversed' : 'Upright'}`
).join('\n')}

Please use your tarot interpretation tool to process this reading data and provide a comprehensive analysis that includes:
- Individual card meanings in their positions with esoteric correspondences
- Jungian archetypal analysis and psychological insights
- Shadow work guidance based on any reversed cards
- Practical advice for the querent's spiritual journey
- How the cards work together to answer the question

Follow your structured interpretation approach and provide deep psychological and spiritual insights.`;

    // Generate the interpretation using the tarot agent
    const result = await agent.generate(prompt);

    return result.text;
  } catch (error) {
    console.error("Error in analyzeReading:", error);
    throw new Error("Failed to analyze the tarot reading. Please try again.");
  }
} 