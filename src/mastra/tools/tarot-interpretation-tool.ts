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
    Provides comprehensive esoteric tarot interpretation drawing from Golden Dawn, Thelemic, and Rider-Waite traditions.
    Analyzes sacred correspondences, elemental dignities, and mystical symbolism in context of the querent's spiritual inquiry.
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

    // Format the structured reading data for the esoteric agent
    const formattedReading = {
      sacredOverview: {
        ...readingContext,
        spiritualMessage: getSpiritualMessage(cardData, question),
        elementalDignities: calculateElementalDignities(cardData),
        qabalisticSignificance: getQabalisticSignificance(cardData),
        astrologicalTimings: getAstrologicalTimings(cardData)
      },
      cardMysteries: cardData.map((item, index) => ({
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
          goldenDawnArchetype: getGoldenDawnArchetype(item.card),
          kabbalahPath: getKabbalahPath(item.card),
          esotericSymbols: getEsotericSymbols(item.card),
          thelemicCorrespondence: getThelemicCorrespondence(item.card),
          waiteSymbolism: getWaiteSymbolism(item.card),
          elementalDignity: getElementalDignity(item, cardData, index)
        },
        positionInfluence: item.positionMeaning,
        mysticalSignificance: getMysticalSignificance(item.card, item.isReversed, item.position)
      })),
      esotericalSynthesis: {
        spiritualThemes: getSpiritualThemes(cardData),
        initiatoryLessons: getInitiatoryLessons(cardData),
        hermetic_guidance: getHermeticGuidance(cardData),
        sacredPractices: getSacredPractices(cardData, question)
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

// New esoteric helper functions for the updated agent

function getSpiritualMessage(cardData: CardWithPosition[], question: string): string {
  const majorCount = cardData.filter(c => c.card.id <= 21).length;
  const reversedCount = cardData.filter(c => c.isReversed).length;
  
  if (majorCount > cardData.length / 2) {
    return 'The Universe speaks through powerful archetypal forces, indicating major spiritual transformation is at hand.';
  }
  
  if (reversedCount > cardData.length / 2) {
    return 'The cards call for deep introspection and inner work, revealing hidden aspects of your spiritual journey.';
  }
  
  return 'The cosmos offers guidance through the sacred language of tarot, illuminating your path forward.';
}

function calculateElementalDignities(cardData: CardWithPosition[]): any {
  const dignities = cardData.map((item, index) => {
    const prevCard = index > 0 ? cardData[index - 1] : null;
    const nextCard = index < cardData.length - 1 ? cardData[index + 1] : null;
    
    return {
      cardName: item.card.name,
      element: item.card.element,
      dignity: getElementalDignity(item, cardData, index),
      influence: calculateElementalInfluence(item.card.element, prevCard?.card.element, nextCard?.card.element)
    };
  });
  
  return dignities;
}

function getElementalDignity(item: CardWithPosition, cardData: CardWithPosition[], index: number): string {
  const prevCard = index > 0 ? cardData[index - 1] : null;
  const nextCard = index < cardData.length - 1 ? cardData[index + 1] : null;
  
  const currentElement = item.card.element;
  let dignity = 'Neutral';
  
  if (prevCard || nextCard) {
    const prevElement = prevCard?.card.element;
    const nextElement = nextCard?.card.element;
    
    // Fire strengthens Fire and Air, weakens Water and Earth
    if (currentElement === '🔥') {
      if (prevElement === '🔥' || nextElement === '🔥' || prevElement === '🌪️' || nextElement === '🌪️') {
        dignity = 'Strengthened';
      } else if (prevElement === '💧' || nextElement === '💧' || prevElement === '🌍' || nextElement === '🌍') {
        dignity = 'Weakened';
      }
    }
    
    // Similar logic for other elements...
  }
  
  return dignity;
}

function calculateElementalInfluence(current: string | undefined, prev: string | undefined, next: string | undefined): string {
  if (!current) return 'Neutral influence';
  
  const influences = [];
  
  if (prev === current || next === current) {
    influences.push('Harmonious elemental support');
  }
  
  if ((current === '🔥' && (prev === '🌪️' || next === '🌪️')) || 
      (current === '🌪️' && (prev === '🔥' || next === '🔥'))) {
    influences.push('Active elemental alliance');
  }
  
  if ((current === '💧' && (prev === '🌍' || next === '🌍')) || 
      (current === '🌍' && (prev === '💧' || next === '💧'))) {
    influences.push('Receptive elemental harmony');
  }
  
  return influences.length > 0 ? influences.join(', ') : 'Balanced elemental energy';
}

function getQabalisticSignificance(cardData: CardWithPosition[]): any {
  const majorCards = cardData.filter(c => c.card.id <= 21);
  const pathways = majorCards.map(c => ({
    cardName: c.card.name,
    hebrewLetter: c.card.hebrew,
    path: getKabbalahPath(c.card),
    sephirothic: getSephirothicInfluence(c.card)
  }));
  
  return {
    pathways,
    treeOfLifeMessage: getTreeOfLifeMessage(majorCards),
    sephirothicBalance: getSephirothicBalance(majorCards)
  };
}

function getSephirothicInfluence(card: TarotCard): string {
  const influences: { [key: string]: string } = {
    'The Fool': 'Crown - Divine will and potential',
    'The Magician': 'Wisdom - Active intelligence',
    'The High Priestess': 'Understanding - Receptive wisdom',
    'The Empress': 'Mercy - Loving expansion',
    'The Emperor': 'Severity - Structured force',
    'The Hierophant': 'Beauty - Harmonious balance',
    'The Lovers': 'Victory - Enduring triumph',
    'The Chariot': 'Glory - Intellectual splendor',
    'Strength': 'Foundation - Stable base',
    'The Hermit': 'Kingdom - Material manifestation'
  };
  
  return influences[card.name] || 'Path between sephiroth';
}

function getTreeOfLifeMessage(majorCards: CardWithPosition[]): string {
  if (majorCards.length === 0) return 'Focus on material plane manifestation';
  
  const pathCount = majorCards.length;
  
  if (pathCount === 1) {
    return 'A single sacred path illuminates your journey';
  } else if (pathCount <= 3) {
    return 'Multiple pathways of wisdom converge in your reading';
  } else {
    return 'The Tree of Life reveals a complex spiritual initiation';
  }
}

function getSephirothicBalance(majorCards: CardWithPosition[]): string {
  const upperTriad = majorCards.filter(c => ['The Fool', 'The Magician', 'The High Priestess'].includes(c.card.name)).length;
  const middleTriad = majorCards.filter(c => ['The Empress', 'The Emperor', 'The Hierophant'].includes(c.card.name)).length;
  const lowerTriad = majorCards.filter(c => ['The Lovers', 'The Chariot', 'Strength'].includes(c.card.name)).length;
  
  if (upperTriad > middleTriad && upperTriad > lowerTriad) {
    return 'Spiritual/intellectual focus predominates';
  } else if (middleTriad > upperTriad && middleTriad > lowerTriad) {
    return 'Emotional/creative energies are emphasized';
  } else if (lowerTriad > upperTriad && lowerTriad > middleTriad) {
    return 'Material/practical matters take precedence';
  } else {
    return 'Balanced expression across all levels of being';
  }
}

function getAstrologicalTimings(cardData: CardWithPosition[]): any {
  const timings = cardData.map(c => ({
    cardName: c.card.name,
    astrologySymbol: c.card.astrology,
    timing: getAstrologicalTiming(c.card.astrology),
    influence: interpretAstrologicalSymbol(c.card.astrology)
  }));
  
  return {
    individualTimings: timings,
    overallTiming: getOverallTiming(cardData),
    planetaryHours: getPlanetaryHours(cardData)
  };
}

function getAstrologicalTiming(astrology: string): string {
  const timings: { [key: string]: string } = {
    '♈': 'March 21 - April 19 (Aries season)',
    '♉': 'April 20 - May 20 (Taurus season)',
    '♊': 'May 21 - June 20 (Gemini season)',
    '♋': 'June 21 - July 22 (Cancer season)',
    '♌': 'July 23 - August 22 (Leo season)',
    '♍': 'August 23 - September 22 (Virgo season)',
    '♎': 'September 23 - October 22 (Libra season)',
    '♏': 'October 23 - November 21 (Scorpio season)',
    '♐': 'November 22 - December 21 (Sagittarius season)',
    '♑': 'December 22 - January 19 (Capricorn season)',
    '♒': 'January 20 - February 18 (Aquarius season)',
    '♓': 'February 19 - March 20 (Pisces season)'
  };
  
  for (const [symbol, timing] of Object.entries(timings)) {
    if (astrology.includes(symbol)) return timing;
  }
  
  return 'Timing influenced by planetary aspects';
}

function getOverallTiming(cardData: CardWithPosition[]): string {
  const fireCards = cardData.filter(c => c.card.element === '🔥').length;
  const waterCards = cardData.filter(c => c.card.element === '💧').length;
  const airCards = cardData.filter(c => c.card.element === '🌪️').length;
  const earthCards = cardData.filter(c => c.card.element === '🌍').length;
  
  const max = Math.max(fireCards, waterCards, airCards, earthCards);
  
  if (fireCards === max) return 'Swift action required - fire season favors this endeavor';
  if (waterCards === max) return 'Allow for emotional processing - water season brings clarity';
  if (airCards === max) return 'Communication and planning phase - air season supports this';
  if (earthCards === max) return 'Practical manifestation time - earth season grounds this work';
  
  return 'Balanced timing across all seasons';
}

function getPlanetaryHours(cardData: CardWithPosition[]): string {
  const planets = cardData.map(c => c.card.astrology).filter(a => 
    ['☉', '☽', '☿', '♀', '♂', '♃', '♄'].some(p => a.includes(p))
  );
  
  if (planets.length === 0) return 'No specific planetary hours indicated';
  
  const dominantPlanet = planets[0];
  const planetHours: { [key: string]: string } = {
    '☉': 'Sunday, solar hours (dawn, noon, sunset)',
    '☽': 'Monday, lunar hours (night, twilight)',
    '☿': 'Wednesday, mercurial hours (morning, communication)',
    '♀': 'Friday, venusian hours (evening, love, beauty)',
    '♂': 'Tuesday, martial hours (midday, action)',
    '♃': 'Thursday, jovial hours (expansion, wisdom)',
    '♄': 'Saturday, saturnian hours (structure, discipline)'
  };
  
  for (const [planet, hours] of Object.entries(planetHours)) {
    if (dominantPlanet.includes(planet)) return hours;
  }
  
  return 'Mixed planetary influences';
}

function getGoldenDawnArchetype(card: TarotCard): string {
  const archetypes: { [key: string]: string } = {
    'The Fool': 'The Spirit of Aether - Divine breath entering creation',
    'The Magician': 'The Magus of Power - Will manifesting through skill',
    'The High Priestess': 'The Priestess of the Silver Star - Lunar wisdom',
    'The Empress': 'The Daughter of the Mighty Ones - Venus in earth',
    'The Emperor': 'The Son of the Morning - Mars in Aries',
    'The Hierophant': 'The Magus of the Eternal Gods - Taurus the Bull',
    'The Lovers': 'The Children of the Voice - Gemini the Twins',
    'The Chariot': 'The Child of the Powers of Water - Cancer the Crab',
    'Strength': 'The Daughter of the Flaming Sword - Leo the Lion',
    'The Hermit': 'The Magus of the Voice of Light - Virgo the Virgin',
    'Wheel of Fortune': 'The Lord of the Forces of Life - Jupiter mighty',
    'Justice': 'The Daughter of the Lords of Truth - Libra the Scales',
    'The Hanged Man': 'The Spirit of the Mighty Waters - Element of Water',
    'Death': 'The Child of the Great Transformers - Scorpio the Scorpion',
    'Temperance': 'The Daughter of the Reconcilers - Sagittarius the Archer',
    'The Devil': 'The Lord of the Gates of Matter - Capricorn the Goat',
    'The Tower': 'The Lord of the Hosts of the Mighty - Mars unaspected',
    'The Star': 'The Daughter of the Firmament - Aquarius the Water Bearer',
    'The Moon': 'The Ruler of Flux and Reflux - Pisces the Fishes',
    'The Sun': 'The Lord of the Fire of the World - Sol in splendor',
    'Judgement': 'The Spirit of the Primal Fire - Pluto transformative',
    'The World': 'The Great One of the Night of Time - Saturn completed'
  };
  
  return archetypes[card.name] || 'Minor Arcana - Elemental manifestation';
}

function getEsotericSymbols(card: TarotCard): string[] {
  const symbols: { [key: string]: string[] } = {
    'The Fool': ['White rose (purity)', 'Cliff edge (leap of faith)', 'Small dog (instinct)', 'Mountains (spiritual heights)'],
    'The Magician': ['Infinity symbol (eternal power)', 'Red roses (passion)', 'White lilies (purity)', 'Wand raised (will)'],
    'The High Priestess': ['Veil of mysteries', 'Crescent moon (subconscious)', 'Pomegranates (fertility)', 'Pillars B&J (duality)'],
    'The Empress': ['Wheat (fertility)', 'Venus symbol (love)', 'Scepter (authority)', 'Flowing water (emotion)'],
    'The Emperor': ['Throne (authority)', 'Ankh scepter (life)', 'Ram heads (Aries)', 'Armor (protection)'],
    'The Hierophant': ['Triple crown (spiritual authority)', 'Keys (mysteries)', 'Pillars (stability)', 'Blessing gesture'],
    'The Lovers': ['Angel Raphael (divine love)', 'Tree of Life', 'Tree of Knowledge', 'Naked figures (authenticity)'],
    'The Chariot': ['Sphinx (riddles)', 'Canopy of stars (heaven)', 'Crescent moons (subconscious)', 'Square (earth)'],
    'Strength': ['Infinity symbol (eternal)', 'Lion (primal force)', 'Gentle touch (love over force)', 'White robe (purity)'],
    'The Hermit': ['Lantern (inner light)', 'Staff (support)', 'Mountain peak (achievement)', 'Gray robes (wisdom)'],
    'Wheel of Fortune': ['Wheel (cycles)', 'Sphinx (riddles)', 'Snake (descent)', 'Anubis (ascent)'],
    'Justice': ['Scales (balance)', 'Sword (decision)', 'Pillars (law)', 'Crown (authority)'],
    'The Hanged Man': ['Halo (enlightenment)', 'Rope (surrender)', 'Tree (life)', 'Crossed legs (sacrifice)'],
    'Death': ['Black armor (protection)', 'White rose (purity)', 'Rising sun (rebirth)', 'Flowing water (renewal)'],
    'Temperance': ['Wings (spiritual)', 'Cups (mixing)', 'Path (journey)', 'Crown (divine)'],
    'The Devil': ['Horns (materialism)', 'Chains (bondage)', 'Torch (false light)', 'Nakedness (base nature)'],
    'The Tower': ['Lightning (divine force)', 'Crown (ego)', 'Falling figures (illusion)', 'Fire (purification)'],
    'The Star': ['Seven stars (chakras)', 'Water (flow)', 'Ibis (Thoth)', 'Nakedness (truth)'],
    'The Moon': ['Two towers (duality)', 'Crayfish (unconscious)', 'Dogs (domesticated)', 'Wolf (wild)'],
    'The Sun': ['Sunflowers (devotion)', 'Child (innocence)', 'White horse (purity)', 'Red banner (passion)'],
    'Judgement': ['Angel (divine call)', 'Trumpet (awakening)', 'Cross (spirit)', 'Rising figures (resurrection)'],
    'The World': ['Wreath (completion)', 'Four creatures (elements)', 'Wands (fire)', 'Nakedness (truth)']
  };
  
  return symbols[card.name] || ['Suit symbols', 'Numerological patterns', 'Elemental associations'];
}

function getThelemicCorrespondence(card: TarotCard): string {
  const correspondences: { [key: string]: string } = {
    'The Fool': 'Aleph - The Breath of Life, First Emanation',
    'The Magician': 'Beth - The House of God, Divine Will',
    'The High Priestess': 'Gimel - The Camel, Lunar Consciousness',
    'The Empress': 'Daleth - The Door, Venus Unveiled',
    'The Emperor': 'Heh - The Window, Sight and Authority',
    'The Hierophant': 'Vav - The Nail, Tradition and Teaching',
    'The Lovers': 'Zayin - The Sword, Choice and Union',
    'The Chariot': 'Cheth - The Fence, Protective Will',
    'Strength': 'Teth - The Serpent, Primal Force',
    'The Hermit': 'Yod - The Hand, Inner Light',
    'Wheel of Fortune': 'Kaph - The Palm, Cyclic Nature',
    'Justice': 'Lamed - The Ox-Goad, Karmic Balance',
    'The Hanged Man': 'Mem - The Water, Sacrificial Wisdom',
    'Death': 'Nun - The Fish, Transformation',
    'Temperance': 'Samekh - The Prop, Alchemical Union',
    'The Devil': 'Ayin - The Eye, Material Transcendence',
    'The Tower': 'Peh - The Mouth, Martial Disruption',
    'The Star': 'Tzaddi - The Fish Hook, Aquarian Hope',
    'The Moon': 'Qoph - The Back of Head, Piscean Illusion',
    'The Sun': 'Resh - The Head, Solar Consciousness',
    'Judgement': 'Shin - The Tooth, Spiritual Fire',
    'The World': 'Tav - The Cross, Cosmic Completion'
  };
  
  return correspondences[card.name] || 'Minor Arcana - Elemental expression in Malkuth';
}

function getWaiteSymbolism(card: TarotCard): string {
  const symbolism: { [key: string]: string } = {
    'The Fool': 'Christian pilgrim beginning sacred journey, guided by divine providence',
    'The Magician': 'Adept wielding the four elements, channeling divine will through earthly tools',
    'The High Priestess': 'Shekinah, the feminine aspect of God, keeper of sacred mysteries',
    'The Empress': 'Divine Mother, Venus in earth, creative force of nature',
    'The Emperor': 'Earthly authority reflecting divine order, structured masculine principle',
    'The Hierophant': 'Spiritual teacher, bridge between heaven and earth, orthodox wisdom',
    'The Lovers': 'Divine love, conscious choice, Adam and Eve in paradise',
    'The Chariot': 'Spiritual warrior, victory through self-discipline and divine protection',
    'Strength': 'Divine love conquering base nature, spiritual strength over material force',
    'The Hermit': 'Seeker of truth, inner Christ light, solitary spiritual journey',
    'Wheel of Fortune': 'Divine providence, karma, the wheel of life and death',
    'Justice': 'Divine justice, cosmic law, karmic balance and moral rectitude',
    'The Hanged Man': 'Sacrifice for wisdom, Christ-like surrender, mystic suspension',
    'Death': 'Spiritual transformation, death of ego, resurrection and renewal',
    'Temperance': 'Divine alchemy, guardian angel, tempering of opposite forces',
    'The Devil': 'Bondage to material, false god, illusion of separation from divine',
    'The Tower': 'Divine intervention, tower of Babel, destruction of false structures',
    'The Star': 'Divine hope, guidance from above, Aquarian age dawning',
    'The Moon': 'Psychic twilight, illusion, the dark night of the soul',
    'The Sun': 'Divine illumination, Christ consciousness, spiritual enlightenment',
    'Judgement': 'Resurrection, final judgment, spiritual awakening and rebirth',
    'The World': 'Cosmic completion, mystical marriage, return to divine source'
  };
  
  return symbolism[card.name] || 'Minor Arcana - Practical application of divine principles';
}

function getMysticalSignificance(card: TarotCard, isReversed: boolean, position: string): string {
  const base = isReversed ? 
    `The reversed ${card.name} calls for inner contemplation and spiritual rectification. The divine energy seeks expression through shadow work and spiritual purification.` :
    `The upright ${card.name} manifests divine energy in perfect expression, offering spiritual guidance and sacred wisdom.`;
  
  return `${base} In the ${position} position, this reveals the cosmic purpose and spiritual lesson inherent in this aspect of your journey.`;
}

function getSpiritualThemes(cardData: CardWithPosition[]): string[] {
  const themes = [];
  const majorCount = cardData.filter(c => c.card.id <= 21).length;
  const reversedCount = cardData.filter(c => c.isReversed).length;
  
  if (majorCount > cardData.length / 2) {
    themes.push('Major spiritual initiation and archetypal transformation');
  }
  
  if (reversedCount > cardData.length / 2) {
    themes.push('Inner spiritual work and esoteric contemplation required');
  }
  
  const fireCards = cardData.filter(c => c.card.element === '🔥').length;
  const waterCards = cardData.filter(c => c.card.element === '💧').length;
  const airCards = cardData.filter(c => c.card.element === '🌪️').length;
  const earthCards = cardData.filter(c => c.card.element === '🌍').length;
  
  const max = Math.max(fireCards, waterCards, airCards, earthCards);
  
  if (fireCards === max) themes.push('Spiritual action and divine will manifestation');
  if (waterCards === max) themes.push('Emotional purification and psychic development');
  if (airCards === max) themes.push('Mental illumination and communication with higher realms');
  if (earthCards === max) themes.push('Material world transformation and practical mysticism');
  
  themes.push('Sacred journey toward divine consciousness');
  
  return themes;
}

function getInitiatoryLessons(cardData: CardWithPosition[]): string[] {
  const lessons = [];
  
  cardData.forEach(({ card, isReversed, position }) => {
    if (card.id <= 21) { // Major Arcana
      if (isReversed) {
        lessons.push(`${card.name} in ${position}: Inner initiation through shadow integration and spiritual purification`);
      } else {
        lessons.push(`${card.name} in ${position}: Outer initiation through divine archetypal expression and spiritual mastery`);
      }
    }
  });
  
  if (lessons.length === 0) {
    lessons.push('Focus on practical spiritual development through daily mystical practice');
  }
  
  return lessons;
}

function getHermeticGuidance(cardData: CardWithPosition[]): string[] {
  const guidance = [
    'As above, so below - seek the divine pattern in earthly circumstances',
    'The microcosm reflects the macrocosm - your inner state creates your outer reality',
    'Solve et coagula - dissolve illusion and crystallize divine truth'
  ];
  
  const elements = cardData.map(c => c.card.element).filter(e => e);
  const uniqueElements = [...new Set(elements)];
  
  if (uniqueElements.length === 4) {
    guidance.push('Perfect elemental balance achieved - the sacred quaternary is complete');
  } else if (uniqueElements.length === 3) {
    guidance.push('Triune harmony manifests - seek the missing element for completion');
  } else if (uniqueElements.length === 2) {
    guidance.push('Duality seeks resolution - find the middle path between opposites');
  } else if (uniqueElements.length === 1) {
    guidance.push('Single elemental focus - master this energy completely before expanding');
  }
  
  return guidance;
}

function getSacredPractices(cardData: CardWithPosition[], question: string): string[] {
  const practices = [];
  
  // Base practices
  practices.push('Daily meditation on the card energies revealed');
  practices.push('Contemplation of the sacred symbols and their divine meanings');
  practices.push('Invocation of the appropriate planetary and elemental forces');
  
  // Element-specific practices
  const fireCards = cardData.filter(c => c.card.element === '🔥').length;
  const waterCards = cardData.filter(c => c.card.element === '💧').length;
  const airCards = cardData.filter(c => c.card.element === '🌪️').length;
  const earthCards = cardData.filter(c => c.card.element === '🌍').length;
  
  const max = Math.max(fireCards, waterCards, airCards, earthCards);
  
  if (fireCards === max) {
    practices.push('Fire practices: Candle meditation, solar invocations, dynamic movement');
  }
  if (waterCards === max) {
    practices.push('Water practices: Lunar meditation, scrying, emotional purification');
  }
  if (airCards === max) {
    practices.push('Air practices: Breathwork, incense burning, mental visualization');
  }
  if (earthCards === max) {
    practices.push('Earth practices: Crystal work, herbal study, practical manifestation');
  }
  
  // Question-specific practices
  if (question.toLowerCase().includes('relationship')) {
    practices.push('Venus rituals for love and harmony, rose meditation');
  }
  
  if (question.toLowerCase().includes('career') || question.toLowerCase().includes('work')) {
    practices.push('Mercury rituals for communication and skill, Wednesday practices');
  }
  
  if (question.toLowerCase().includes('spiritual') || question.toLowerCase().includes('path')) {
    practices.push('Daily Tree of Life meditation, Hebrew letter contemplation');
  }
  
  return practices;
}