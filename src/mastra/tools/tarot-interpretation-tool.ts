import { z } from 'zod';
import { createTool } from '@mastra/core/tools';
import { tarotCards, TarotCard } from '../../tarotCards';

// Type definitions
interface CardWithPosition {
  card: TarotCard;
  position: string;
  isReversed: boolean;
  positionMeaning: string;
}

export const tarotInterpretationTool = createTool({
  id: 'interpret-tarot-reading',
  description: `
    Provides comprehensive tarot interpretation combining Jungian psychology with esoteric correspondences.
    Analyzes cards in context of their positions, orientations, and the querent's question.
  `,
  inputSchema: z.object({
    question: z.string().describe('The querent\'s question or area of focus'),
    readingType: z.enum(['celtic-cross', 'three-card']).describe('Type of tarot spread'),
    cards: z.array(z.object({
      cardId: z.number().describe('ID of the tarot card'),
      position: z.string().describe('Position name in the spread (e.g., "Present Situation", "Past", etc.)'),
      isReversed: z.boolean().describe('Whether the card is drawn reversed'),
      positionMeaning: z.string().optional().describe('Specific meaning of this position in the spread')
    })).describe('Array of cards in the reading with their positions and orientations'),
    additionalContext: z.string().optional().describe('Any additional context about the reading or querent')
  }),
  outputSchema: z.object({
    success: z.boolean(),
    readingData: z.record(z.any()).optional(),
    message: z.string()
  }),
  execute: async ({ context }) => {
    const { question, readingType, cards, additionalContext } = context;
    // Validate card IDs and get card data
    const cardData = cards.map(({ cardId, position, isReversed, positionMeaning }) => {
      const card = tarotCards.find(c => c.id === cardId);
      if (!card) {
        throw new Error(`Invalid card ID: ${cardId}`);
      }
      return {
        card,
        position,
        isReversed,
        positionMeaning: positionMeaning || position
      };
    });

    // Create comprehensive reading context
    const readingContext = {
      question,
      readingType,
      totalCards: cards.length,
      elementalBalance: calculateElementalBalance(cardData),
      numerologicalSignificance: calculateNumerology(cardData),
      astrologicalInfluences: getAstrologicalInfluences(cardData),
      majorArcanaCount: cardData.filter(c => c.card.id <= 21).length,
      reversedCount: cardData.filter(c => c.isReversed).length
    };

    // Format the structured reading data for the agent
    const formattedReading = {
      readingOverview: readingContext,
      cardAnalysis: cardData.map((item, index) => ({
        position: `${index + 1}. ${item.position}`,
        card: {
          name: item.card.name,
          type: item.card.id <= 21 ? 'Major Arcana' : 'Minor Arcana',
          meaning: item.isReversed ? item.card.reversed : item.card.meaning,
          orientation: item.isReversed ? 'Reversed' : 'Upright',
          hebrewLetter: item.card.hebrew,
          astrology: item.card.astrology,
          element: item.card.element || 'N/A',
          numerology: item.card.id <= 21 ? item.card.id : (item.card.id - 21) % 14,
          jungianArchetype: getJungianArchetype(item.card),
          kabbalahPath: getKabbalahPath(item.card),
          esotericKeywords: getEsotericKeywords(item.card, item.isReversed)
        },
        positionInfluence: item.positionMeaning,
        psychologicalSignificance: getPsychologicalSignificance(item.card, item.isReversed, item.position)
      })),
      synthesisSuggestions: {
        dominantThemes: getDominantThemes(cardData),
        shadowWork: getShadowWorkInsights(cardData),
        individuationGuidance: getIndividuationGuidance(cardData),
        practicalAdvice: getPracticalAdvice(cardData, question)
      },
      additionalContext: additionalContext || 'None provided'
    };

    return {
      success: true,
      readingData: formattedReading,
      message: `Tarot reading prepared for interpretation. ${cardData.length} cards analyzed in ${readingType} spread format.`
    };
  }
});

// Helper functions for analysis

function calculateElementalBalance(cardData: CardWithPosition[]) {
  const elements = { Fire: 0, Water: 0, Air: 0, Earth: 0 };
  cardData.forEach(({ card }) => {
    if (card.element) {
      if (card.element.includes('🔥')) elements.Fire++;
      if (card.element.includes('💧')) elements.Water++;
      if (card.element.includes('🌪️')) elements.Air++;
      if (card.element.includes('🌍')) elements.Earth++;
    }
  });
  return elements;
}

function calculateNumerology(cardData: CardWithPosition[]) {
  const numbers = cardData.map(({ card }) => {
    if (card.id <= 21) return card.id; // Major Arcana
    return ((card.id - 22) % 14) + 1; // Minor Arcana (1-14)
  });
  const sum = numbers.reduce((a, b) => a + b, 0);
  return {
    individualNumbers: numbers,
    sum,
    reducedNumber: sum > 22 ? String(sum).split('').reduce((a, b) => parseInt(a.toString()) + parseInt(b), 0) : sum
  };
}

function getAstrologicalInfluences(cardData: CardWithPosition[]) {
  return cardData.map(({ card }) => ({
    cardName: card.name,
    astrologySymbol: card.astrology,
    influence: interpretAstrologicalSymbol(card.astrology)
  }));
}

function interpretAstrologicalSymbol(symbol: string): string {
  const interpretations: { [key: string]: string } = {
    '☉': 'Solar consciousness, vitality, self-expression',
    '☽': 'Lunar intuition, subconscious, emotional cycles',
    '☿': 'Mercurial communication, intellect, adaptability',
    '♀': 'Venusian love, beauty, harmony',
    '♂': 'Martian action, courage, conflict',
    '♃': 'Jupiterian expansion, wisdom, abundance',
    '♄': 'Saturnian discipline, limitation, structure',
    '♅': 'Uranian innovation, rebellion, sudden change',
    '♆': 'Neptunian illusion, spirituality, dreams',
    '♇': 'Plutonian transformation, death/rebirth, power'
  };
  
  // Check for individual symbols
  for (const [sym, meaning] of Object.entries(interpretations)) {
    if (symbol.includes(sym)) return meaning;
  }
  
  // Check for zodiac signs
  const zodiacInterpretations: { [key: string]: string } = {
    '♈': 'Aries energy: initiative, leadership, pioneering spirit',
    '♉': 'Taurus energy: stability, material security, sensuality',
    '♊': 'Gemini energy: duality, communication, versatility',
    '♋': 'Cancer energy: nurturing, protection, emotional depth',
    '♌': 'Leo energy: creative expression, confidence, leadership',
    '♍': 'Virgo energy: analysis, service, perfectionism',
    '♎': 'Libra energy: balance, relationships, harmony',
    '♏': 'Scorpio energy: transformation, intensity, hidden depths',
    '♐': 'Sagittarius energy: expansion, philosophy, adventure',
    '♑': 'Capricorn energy: ambition, responsibility, achievement',
    '♒': 'Aquarius energy: innovation, independence, humanitarian ideals',
    '♓': 'Pisces energy: intuition, compassion, spiritual connection'
  };
  
  for (const [sym, meaning] of Object.entries(zodiacInterpretations)) {
    if (symbol.includes(sym)) return meaning;
  }
  
  return 'Complex astrological influence requiring deeper study';
}

function getJungianArchetype(card: TarotCard): string {
  const archetypes: { [key: string]: string } = {
    'The Fool': 'The Innocent/Child - Beginning the journey',
    'The Magician': 'The Magician/Creator - Manifesting will',
    'The High Priestess': 'The Wise Woman/Anima - Intuitive wisdom',
    'The Empress': 'The Mother - Nurturing creativity',
    'The Emperor': 'The Father/Ruler - Authority and structure',
    'The Hierophant': 'The Sage/Teacher - Traditional wisdom',
    'The Lovers': 'The Lover/Anima-Animus - Union of opposites',
    'The Chariot': 'The Hero/Warrior - Overcoming obstacles',
    'Strength': 'The Hero/Tamer - Inner strength and courage',
    'The Hermit': 'The Wise Old Man - Inner guidance',
    'Wheel of Fortune': 'The Self - Cycles and destiny',
    'Justice': 'The Judge - Balance and karma',
    'The Hanged Man': 'The Martyr/Sacrificial - Surrender and perspective',
    'Death': 'The Transformer - Endings and beginnings',
    'Temperance': 'The Alchemist - Integration and balance',
    'The Devil': 'The Shadow - Material bondage and desire',
    'The Tower': 'The Destroyer - Breaking illusions',
    'The Star': 'The Divine Child - Hope and inspiration',
    'The Moon': 'The Trickster/Illusion - Unconscious fears',
    'The Sun': 'The Self - Enlightenment and joy',
    'Judgement': 'The Angel - Spiritual awakening',
    'The World': 'The Self Realized - Completion and integration'
  };
  
  return archetypes[card.name] || 'Minor Arcana - Situational archetype';
}

function getKabbalahPath(card: TarotCard): string {
  if (card.id > 21) return 'Minor Arcana - Elemental expression';
  
  const paths: { [key: string]: string } = {
    'א': 'Path 11: Kether to Chokmah - Divine will',
    'ב': 'Path 12: Kether to Binah - Wisdom',
    'ג': 'Path 13: Kether to Tiphareth - Understanding',
    'ד': 'Path 14: Chokmah to Binah - Love/wisdom',
    'ה': 'Path 15: Chokmah to Tiphareth - Authority',
    'ו': 'Path 16: Chokmah to Chesed - Mercy',
    'ז': 'Path 17: Binah to Tiphareth - Choice',
    'ח': 'Path 18: Binah to Geburah - Strength',
    'ט': 'Path 19: Chesed to Geburah - Power',
    'י': 'Path 20: Chesed to Tiphareth - Guidance',
    'כ': 'Path 21: Chesed to Netzach - Fortune',
    'ל': 'Path 22: Geburah to Tiphareth - Justice',
    'מ': 'Path 23: Geburah to Hod - Sacrifice',
    'נ': 'Path 24: Tiphareth to Netzach - Transformation',
    'ס': 'Path 25: Tiphareth to Yesod - Temperance',
    'ע': 'Path 26: Tiphareth to Hod - Bondage',
    'פ': 'Path 27: Netzach to Hod - Awakening',
    'צ': 'Path 28: Netzach to Yesod - Hope',
    'ק': 'Path 29: Netzach to Malkuth - Illusion',
    'ר': 'Path 30: Hod to Yesod - Vitality',
    'ש': 'Path 31: Hod to Malkuth - Rebirth',
    'ת': 'Path 32: Yesod to Malkuth - Completion'
  };
  
  return paths[card.hebrew] || 'Path unknown';
}

function getEsotericKeywords(card: TarotCard, isReversed: boolean): string[] {
  const baseKeywords = card.name.toLowerCase().includes('ace') ? ['New beginnings', 'Pure potential'] :
                     card.name.toLowerCase().includes('two') ? ['Duality', 'Choice', 'Balance'] :
                     card.name.toLowerCase().includes('three') ? ['Growth', 'Expansion', 'Creation'] :
                     card.name.toLowerCase().includes('four') ? ['Stability', 'Foundation', 'Structure'] :
                     card.name.toLowerCase().includes('five') ? ['Conflict', 'Challenge', 'Change'] :
                     card.name.toLowerCase().includes('six') ? ['Harmony', 'Communication', 'Flow'] :
                     card.name.toLowerCase().includes('seven') ? ['Spiritual test', 'Reflection', 'Assessment'] :
                     card.name.toLowerCase().includes('eight') ? ['Movement', 'Regeneration', 'Power'] :
                     card.name.toLowerCase().includes('nine') ? ['Attainment', 'Completion', 'Wisdom'] :
                     card.name.toLowerCase().includes('ten') ? ['Culmination', 'Full expression', 'Excess'] :
                     card.name.toLowerCase().includes('page') ? ['Earth element', 'Student', 'Message'] :
                     card.name.toLowerCase().includes('knight') ? ['Air element', 'Action', 'Movement'] :
                     card.name.toLowerCase().includes('queen') ? ['Water element', 'Receptive', 'Intuitive'] :
                     card.name.toLowerCase().includes('king') ? ['Fire element', 'Active', 'Authoritative'] :
                     ['Major Arcana', 'Spiritual lesson'];

  if (isReversed) {
    baseKeywords.push('Internalized', 'Shadow work', 'Blocked energy');
  }

  return baseKeywords;
}

function getPsychologicalSignificance(card: TarotCard, isReversed: boolean, position: string): string {
  const base = isReversed ? 
    `The reversed ${card.name} suggests internalized or blocked energy around ${card.meaning.toLowerCase()}. This may indicate shadow material or unconscious resistance.` :
    `The upright ${card.name} represents active expression of ${card.meaning.toLowerCase()}.`;
  
  return `${base} In the ${position} position, this speaks to how this energy manifests in relation to the question.`;
}

function getDominantThemes(cardData: CardWithPosition[]): string[] {
  const themes = [];
  const majorCount = cardData.filter(c => c.card.id <= 21).length;
  const reversedCount = cardData.filter(c => c.isReversed).length;
  
  if (majorCount > cardData.length / 2) {
    themes.push('Major spiritual/psychological shifts');
  }
  
  if (reversedCount > cardData.length / 2) {
    themes.push('Shadow work and internal processing needed');
  }
  
  themes.push('Individual journey of consciousness');
  
  return themes;
}

function getShadowWorkInsights(cardData: CardWithPosition[]): string[] {
  const insights = [];
  
  cardData.filter(c => c.isReversed).forEach(({ card, position }) => {
    insights.push(`${card.name} reversed in ${position}: Explore hidden aspects of ${card.meaning.toLowerCase()}`);
  });
  
  if (insights.length === 0) {
    insights.push('No reversed cards - consider what aspects of these energies you might be avoiding or projecting');
  }
  
  return insights;
}

function getIndividuationGuidance(cardData: CardWithPosition[]): string[] {
  const guidance = [
    'Integration of conscious and unconscious elements',
    'Recognition of projected aspects in others',
    'Development of authentic self-expression'
  ];
  
  const majorArcana = cardData.filter(c => c.card.id <= 21);
  if (majorArcana.length > 0) {
    guidance.push(`Major archetypal work indicated through ${majorArcana.map(c => c.card.name).join(', ')}`);
  }
  
  return guidance;
}

function getPracticalAdvice(cardData: CardWithPosition[], question: string): string[] {
  const advice = [
    'Reflect on the patterns shown in this reading',
    'Consider journaling about the themes that emerge',
    'Meditate on the archetypal energies present'
  ];
  
  if (question.toLowerCase().includes('relationship')) {
    advice.push('Focus on your own psychological wholeness in relationships');
  }
  
  if (question.toLowerCase().includes('career') || question.toLowerCase().includes('work')) {
    advice.push('Align professional choices with your authentic self');
  }
  
  return advice;
} 