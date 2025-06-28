export interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  reversed: string;
  hebrew: string;
  astrology: string;
  element?: string;
  imageUrl: string;
}

export const tarotCards: TarotCard[] = [
  // Major Arcana
  {
    id: 0,
    name: "The Fool",
    meaning: "New beginnings, innocence, adventure, freedom from limitations",
    reversed: "Recklessness, taken advantage of, inconsideration, foolishness",
    hebrew: "א", // Aleph
    astrology: "♅", // Uranus
    element: "🌪️", // Air
    imageUrl: "/cards/fool.jpg",
  },
  {
    id: 1,
    name: "The Magician",
    meaning: "Manifestation, resourcefulness, power, inspired action",
    reversed: "Manipulation, poor planning, untapped talents, deception",
    hebrew: "ב", // Beth
    astrology: "☿", // Mercury
    element: "🌪️", // Air
    imageUrl: "/cards/magician.jpg",
  },
  {
    id: 2,
    name: "The High Priestess",
    meaning: "Intuition, sacred knowledge, divine feminine, the subconscious mind",
    reversed: "Secrets, disconnected from intuition, withdrawal and silence",
    hebrew: "ג", // Gimel
    astrology: "☽", // Moon
    element: "💧", // Water
    imageUrl: "/cards/high_priestess.jpg",
  },
  {
    id: 3,
    name: "The Empress",
    meaning: "Femininity, beauty, nature, nurturing, abundance",
    reversed: "Creative block, dependence on others, smothering, emptiness",
    hebrew: "ד", // Daleth
    astrology: "♀", // Venus
    element: "🌍", // Earth
    imageUrl: "/cards/empress.jpg",
  },
  {
    id: 4,
    name: "The Emperor",
    meaning: "Authority, establishment, structure, a father figure",
    reversed: "Tyranny, rigidity, coldness, loss of authority",
    hebrew: "ה", // Heh
    astrology: "♈", // Aries
    element: "🔥", // Fire
    imageUrl: "/cards/emperor.jpg",
  },
  {
    id: 5,
    name: "The Hierophant",
    meaning: "Spiritual wisdom, religious beliefs, conformity, tradition, institutions",
    reversed: "Personal beliefs, freedom, challenging the status quo",
    hebrew: "ו", // Vav
    astrology: "♉", // Taurus
    element: "🌍", // Earth
    imageUrl: "/cards/hierophant.jpg",
  },
  {
    id: 6,
    name: "The Lovers",
    meaning: "Love, harmony, relationships, values alignment, choices",
    reversed: "Self-love, disharmony, imbalance, misalignment of values",
    hebrew: "ז", // Zayin
    astrology: "♊", // Gemini
    element: "🌪️", // Air
    imageUrl: "/cards/lovers.jpg",
  },
  {
    id: 7,
    name: "The Chariot",
    meaning: "Control, willpower, success, action, determination",
    reversed: "Self-discipline, opposition, lack of direction, self-doubt",
    hebrew: "ח", // Chet
    astrology: "♋", // Cancer
    element: "💧", // Water
    imageUrl: "/cards/chariot.jpg",
  },
  {
    id: 8,
    name: "Strength",
    meaning: "Strength, courage, persuasion, influence, compassion",
    reversed: "Self doubt, low energy, raw emotion, weakness, insecurity",
    hebrew: "ט", // Tet
    astrology: "♌", // Leo
    element: "🔥", // Fire
    imageUrl: "/cards/strength.jpg",
  },
  {
    id: 9,
    name: "The Hermit",
    meaning: "Soul searching, introspection, being alone, inner guidance",
    reversed: "Isolation, loneliness, withdrawal, paranoia, anti-social",
    hebrew: "י", // Yod
    astrology: "♍", // Virgo
    element: "🌍", // Earth
    imageUrl: "/cards/hermit.jpg",
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    meaning: "Good luck, karma, life cycles, destiny, a turning point",
    reversed: "Bad luck, lack of control, clinging to control, bad timing",
    hebrew: "כ", // Kaph
    astrology: "♃", // Jupiter
    element: "🔥", // Fire
    imageUrl: "/cards/wheel_of_fortune.jpg",
  },
  {
    id: 11,
    name: "Justice",
    meaning: "Justice, fairness, truth, cause and effect, law",
    reversed: "Unfairness, lack of accountability, dishonesty, bias",
    hebrew: "ל", // Lamed
    astrology: "♎", // Libra
    element: "🌪️", // Air
    imageUrl: "/cards/justice.jpg",
  },
  {
    id: 12,
    name: "The Hanged Man",
    meaning: "Suspension, restriction, letting go, sacrifice",
    reversed: "Martyrdom, indecision, delay, resistance, stalling",
    hebrew: "מ", // Mem
    astrology: "♆", // Neptune
    element: "💧", // Water
    imageUrl: "/cards/hanged_man.jpg",
  },
  {
    id: 13,
    name: "Death",
    meaning: "Endings, beginnings, change, transformation, transition",
    reversed: "Resistance to change, personal transformation, inner purging",
    hebrew: "נ", // Nun
    astrology: "♏", // Scorpio
    element: "💧", // Water
    imageUrl: "/cards/death.jpg",
  },
  {
    id: 14,
    name: "Temperance",
    meaning: "Balance, moderation, patience, purpose, divine guidance",
    reversed: "Imbalance, excess, self-healing, re-alignment",
    hebrew: "ס", // Samekh
    astrology: "♐", // Sagittarius
    element: "🔥", // Fire
    imageUrl: "/cards/temperance.jpg",
  },
  {
    id: 15,
    name: "The Devil",
    meaning: "Bondage, addiction, sexuality, materialism, playfulness",
    reversed: "Independence, freedom, revelation, release, reclaiming power",
    hebrew: "ע", // Ayin
    astrology: "♑", // Capricorn
    element: "🌍", // Earth
    imageUrl: "/cards/devil.jpg",
  },
  {
    id: 16,
    name: "The Tower",
    meaning: "Sudden change, upheaval, chaos, revelation, awakening",
    reversed: "Personal transformation, fear of change, averting disaster",
    hebrew: "פ", // Peh
    astrology: "♂", // Mars
    element: "🔥", // Fire
    imageUrl: "/cards/tower.jpg",
  },
  {
    id: 17,
    name: "The Star",
    meaning: "Hope, faith, purpose, renewal, spirituality",
    reversed: "Lack of faith, despair, self-trust, disconnection",
    hebrew: "צ", // Tzade
    astrology: "♒", // Aquarius
    element: "🌪️", // Air
    imageUrl: "/cards/star.jpg",
  },
  {
    id: 18,
    name: "The Moon",
    meaning: "Illusion, fear, anxiety, subconscious, intuition",
    reversed: "Release of fear, repressed emotion, inner confusion",
    hebrew: "ק", // Qoph
    astrology: "♓", // Pisces
    element: "💧", // Water
    imageUrl: "/cards/moon.jpg",
  },
  {
    id: 19,
    name: "The Sun",
    meaning: "Positivity, fun, warmth, success, vitality",
    reversed: "Inner child, feeling down, overly optimistic, unrealistic",
    hebrew: "ר", // Resh
    astrology: "☉", // Sun
    element: "🔥", // Fire
    imageUrl: "/cards/sun.jpg",
  },
  {
    id: 20,
    name: "Judgement",
    meaning: "Judgement, rebirth, inner calling, absolution",
    reversed: "Self-doubt, inner critic, ignoring the call, lack of self-awareness",
    hebrew: "ש", // Shin
    astrology: "♇", // Pluto
    element: "🔥", // Fire
    imageUrl: "/cards/judgement.jpg",
  },
  {
    id: 21,
    name: "The World",
    meaning: "Completion, integration, accomplishment, travel",
    reversed: "Seeking personal closure, short-cut to success, lack of achievement",
    hebrew: "ת", // Tav
    astrology: "♄", // Saturn
    element: "🌍", // Earth
    imageUrl: "/cards/world.jpg",
  },
  
  // Minor Arcana - Cups (Water)
  {
    id: 22,
    name: "Ace of Cups",
    meaning: "Love, compassion, creativity, overwhelming emotion",
    reversed: "Emotional loss, blocked creativity, emptiness, sadness",
    hebrew: "",
    astrology: "♎♏♐", // Libra/Scorpio/Sagittarius
    element: "💧",
    imageUrl: "/cards/ace_cups.jpg",
  },
  {
    id: 23,
    name: "Two of Cups",
    meaning: "Partnership, unity, love, mutual attraction",
    reversed: "Imbalance, broken communication, tension, separation",
    hebrew: "",
    astrology: "♀ in ♋", // Venus in Cancer
    element: "💧",
    imageUrl: "/cards/two_cups.jpg",
  },
  {
    id: 24,
    name: "Three of Cups",
    meaning: "Friendship, community, celebration, collaboration",
    reversed: "Social isolation, loneliness, withdrawal, discord",
    hebrew: "",
    astrology: "☿ in ♋", // Mercury in Cancer
    element: "💧",
    imageUrl: "/cards/three_cups.jpg",
  },
  {
    id: 25,
    name: "Four of Cups",
    meaning: "Apathy, contemplation, disconnectedness, missed opportunities",
    reversed: "Motivation, new perspectives, seizing opportunities",
    hebrew: "",
    astrology: "☽ in ♋", // Moon in Cancer
    element: "💧",
    imageUrl: "/cards/four_cups.jpg",
  },
  {
    id: 26,
    name: "Five of Cups",
    meaning: "Loss, regret, disappointment, despair, bereavement",
    reversed: "Recovery, learning from loss, moving on, acceptance",
    hebrew: "",
    astrology: "♂ in ♏", // Mars in Scorpio
    element: "💧",
    imageUrl: "/cards/five_cups.jpg",
  },
  {
    id: 27,
    name: "Six of Cups",
    meaning: "Revisiting the past, childhood memories, innocence, joy",
    reversed: "Living in the past, forgiveness, lacking playfulness",
    hebrew: "",
    astrology: "☉ in ♏", // Sun in Scorpio
    element: "💧",
    imageUrl: "/cards/six_cups.jpg",
  },
  {
    id: 28,
    name: "Seven of Cups",
    meaning: "Opportunities, choices, wishful thinking, illusion, fantasy",
    reversed: "Alignment, personal values, overwhelmed by choices",
    hebrew: "",
    astrology: "♀ in ♏", // Venus in Scorpio
    element: "💧",
    imageUrl: "/cards/seven_cups.jpg",
  },
  {
    id: 29,
    name: "Eight of Cups",
    meaning: "Disappointment, abandonment, withdrawal, escapism",
    reversed: "Trying one more time, indecision, aimless drifting",
    hebrew: "",
    astrology: "♄ in ♓", // Saturn in Pisces
    element: "💧",
    imageUrl: "/cards/eight_cups.jpg",
  },
  {
    id: 30,
    name: "Nine of Cups",
    meaning: "Contentment, satisfaction, gratitude, wish come true",
    reversed: "Inner happiness, materialism, dissatisfaction, indulgence",
    hebrew: "",
    astrology: "♃ in ♓", // Jupiter in Pisces
    element: "💧",
    imageUrl: "/cards/nine_cups.jpg",
  },
  {
    id: 31,
    name: "Ten of Cups",
    meaning: "Divine love, blissful relationships, harmony, alignment",
    reversed: "Disconnection, misaligned values, struggling relationships",
    hebrew: "",
    astrology: "♂ in ♓", // Mars in Pisces
    element: "💧",
    imageUrl: "/cards/ten_cups.jpg",
  },
  {
    id: 32,
    name: "Page of Cups",
    meaning: "Creative opportunities, intuitive messages, curiosity, possibility",
    reversed: "New ideas, doubting intuition, creative blocks, emotional immaturity",
    hebrew: "",
    astrology: "♎♏♐", // Libra/Scorpio/Sagittarius (Earth of Water)
    element: "💧",
    imageUrl: "/cards/page_cups.jpg",
  },
  {
    id: 33,
    name: "Knight of Cups",
    meaning: "Creativity, romance, charm, imagination, beauty",
    reversed: "Overactive imagination, unrealistic, jealous, moody",
    hebrew: "",
    astrology: "♎-♏", // 20° Libra - 20° Scorpio (Air of Water)
    element: "💧",
    imageUrl: "/cards/knight_cups.jpg",
  },
  {
    id: 34,
    name: "Queen of Cups",
    meaning: "Emotional balance, compassion, feminine power, intuition",
    reversed: "Emotional insecurity, depending on others, giving too much",
    hebrew: "",
    astrology: "♊-♋", // 20° Gemini - 20° Cancer (Water of Water)
    element: "💧",
    imageUrl: "/cards/queen_cups.jpg",
  },
  {
    id: 35,
    name: "King of Cups",
    meaning: "Emotional balance, generous, diplomatic, caring",
    reversed: "Emotional manipulation, moodiness, lacking emotional control",
    hebrew: "",
    astrology: "♒-♓", // 20° Aquarius - 20° Pisces (Fire of Water)
    element: "💧",
    imageUrl: "/cards/king_cups.jpg",
  },
  
  // Minor Arcana - Pentacles (Earth)
  {
    id: 36,
    name: "Ace of Pentacles",
    meaning: "A new financial or career opportunity, manifestation, abundance",
    reversed: "Lost opportunity, lack of planning, poor financial decisions",
    hebrew: "",
    astrology: "♈♉♊", // Aries/Taurus/Gemini
    element: "🌍",
    imageUrl: "/cards/ace_pentacles.jpg",
  },
  {
    id: 37,
    name: "Two of Pentacles",
    meaning: "Multiple priorities, time management, prioritization, adaptability",
    reversed: "Over-committed, disorganization, reprioritization",
    hebrew: "",
    astrology: "♃ in ♑", // Jupiter in Capricorn
    element: "🌍",
    imageUrl: "/cards/two_pentacles.jpg",
  },
  {
    id: 38,
    name: "Three of Pentacles",
    meaning: "Collaboration, teamwork, skill sharing, building",
    reversed: "Disharmony, misaligned goals, lack of teamwork",
    hebrew: "",
    astrology: "♂ in ♑", // Mars in Capricorn
    element: "🌍",
    imageUrl: "/cards/three_pentacles.jpg",
  },
  {
    id: 39,
    name: "Four of Pentacles",
    meaning: "Saving money, security, conservatism, scarcity, control",
    reversed: "Over-spending, greed, self-protection, financial insecurity",
    hebrew: "",
    astrology: "☉ in ♑", // Sun in Capricorn
    element: "🌍",
    imageUrl: "/cards/four_pentacles.jpg",
  },
  {
    id: 40,
    name: "Five of Pentacles",
    meaning: "Financial loss, poverty, lack mindset, isolation, worry",
    reversed: "Recovery, charity, improvement, spiritual poverty",
    hebrew: "",
    astrology: "☿ in ♉", // Mercury in Taurus
    element: "🌍",
    imageUrl: "/cards/five_pentacles.jpg",
  },
  {
    id: 41,
    name: "Six of Pentacles",
    meaning: "Giving, receiving, sharing wealth, generosity, charity",
    reversed: "Self-care, unpaid debts, one-sided charity",
    hebrew: "",
    astrology: "☽ in ♉", // Moon in Taurus
    element: "🌍",
    imageUrl: "/cards/six_pentacles.jpg",
  },
  {
    id: 42,
    name: "Seven of Pentacles",
    meaning: "Long-term view, sustainable results, perseverance, investment",
    reversed: "Lack of long-term vision, limited success or reward",
    hebrew: "",
    astrology: "♄ in ♉", // Saturn in Taurus
    element: "🌍",
    imageUrl: "/cards/seven_pentacles.jpg",
  },
  {
    id: 43,
    name: "Eight of Pentacles",
    meaning: "Apprenticeship, repetitive tasks, mastery, skill development",
    reversed: "Lack of focus, perfectionism, misdirected activity",
    hebrew: "",
    astrology: "☉ in ♍", // Sun in Virgo
    element: "🌍",
    imageUrl: "/cards/eight_pentacles.jpg",
  },
  {
    id: 44,
    name: "Nine of Pentacles",
    meaning: "Abundance, luxury, self-sufficiency, financial independence",
    reversed: "Over-investment, hustling, self-worth, setbacks",
    hebrew: "",
    astrology: "♀ in ♍", // Venus in Virgo
    element: "🌍",
    imageUrl: "/cards/nine_pentacles.jpg",
  },
  {
    id: 45,
    name: "Ten of Pentacles",
    meaning: "Wealth, financial security, family, long-term success, contribution",
    reversed: "The dark side of wealth, financial failure or loss",
    hebrew: "",
    astrology: "☿ in ♍", // Mercury in Virgo
    element: "🌍",
    imageUrl: "/cards/ten_pentacles.jpg",
  },
  {
    id: 46,
    name: "Page of Pentacles",
    meaning: "Financial opportunity, skill development, manifestation",
    reversed: "Lack of progress, procrastination, learn from failure",
    hebrew: "",
    astrology: "♈♉♊", // Aries/Taurus/Gemini (Earth of Earth)
    element: "🌍",
    imageUrl: "/cards/page_pentacles.jpg",
  },
  {
    id: 47,
    name: "Knight of Pentacles",
    meaning: "Hard work, productivity, routine, conservatism, service",
    reversed: "Self-discipline, boredom, feeling 'stuck', perfectionism",
    hebrew: "",
    astrology: "♈-♉", // 20° Aries - 20° Taurus (Air of Earth)
    element: "🌍",
    imageUrl: "/cards/knight_pentacles.jpg",
  },
  {
    id: 48,
    name: "Queen of Pentacles",
    meaning: "Nurturing, practical, providing financially, a working parent",
    reversed: "Financial independence, self-care, work-home conflicts",
    hebrew: "",
    astrology: "♐-♑", // 20° Sagittarius - 20° Capricorn (Water of Earth)
    element: "🌍",
    imageUrl: "/cards/queen_pentacles.jpg",
  },
  {
    id: 49,
    name: "King of Pentacles",
    meaning: "Financial abundance, business, leadership, security, discipline, abundance",
    reversed: "Financially inept, obsessed with wealth and status, bad business",
    hebrew: "",
    astrology: "♌-♍", // 20° Leo - 20° Virgo (Fire of Earth)
    element: "🌍",
    imageUrl: "/cards/king_pentacles.jpg",
  },
  
  // Minor Arcana - Swords (Air)
  {
    id: 50,
    name: "Ace of Swords",
    meaning: "New ideas, mental clarity, breakthrough, new communication",
    reversed: "Inner clarity, re-thinking an idea, clouded judgement",
    hebrew: "",
    astrology: "♑♒♓", // Capricorn/Aquarius/Pisces
    element: "🌪️",
    imageUrl: "/cards/ace_swords.jpg",
  },
  {
    id: 51,
    name: "Two of Swords",
    meaning: "Difficult decisions, weighing up options, an impasse, avoidance",
    reversed: "Indecision, confusion, information overload, hesitation",
    hebrew: "",
    astrology: "☽ in ♎", // Moon in Libra
    element: "🌪️",
    imageUrl: "/cards/two_swords.jpg",
  },
  {
    id: 52,
    name: "Three of Swords",
    meaning: "Heartbreak, emotional pain, sorrow, grief, hurt",
    reversed: "Recovery, forgiveness, moving on, optimism",
    hebrew: "",
    astrology: "♄ in ♎", // Saturn in Libra
    element: "🌪️",
    imageUrl: "/cards/three_swords.jpg",
  },
  {
    id: 53,
    name: "Four of Swords",
    meaning: "Rest, relaxation, meditation, contemplation, recuperation",
    reversed: "Exhaustion, burn-out, deep contemplation, stagnation",
    hebrew: "",
    astrology: "♃ in ♎", // Jupiter in Libra
    element: "🌪️",
    imageUrl: "/cards/four_swords.jpg",
  },
  {
    id: 54,
    name: "Five of Swords",
    meaning: "Conflict, disagreements, competition, defeat, winning at all costs",
    reversed: "Reconciliation, making amends, past resentment",
    hebrew: "",
    astrology: "♀ in ♒", // Venus in Aquarius
    element: "🌪️",
    imageUrl: "/cards/five_swords.jpg",
  },
  {
    id: 55,
    name: "Six of Swords",
    meaning: "Transition, change, rite of passage, releasing baggage",
    reversed: "Personal transition, resistance to change, unfinished business",
    hebrew: "",
    astrology: "☿ in ♒", // Mercury in Aquarius
    element: "🌪️",
    imageUrl: "/cards/six_swords.jpg",
  },
  {
    id: 56,
    name: "Seven of Swords",
    meaning: "Betrayal, deception, getting away with something, acting strategically",
    reversed: "Imposter syndrome, self-deceit, keeping secrets",
    hebrew: "",
    astrology: "☽ in ♒", // Moon in Aquarius
    element: "🌪️",
    imageUrl: "/cards/seven_swords.jpg",
  },
  {
    id: 57,
    name: "Eight of Swords",
    meaning: "Negative thoughts, self-imposed restriction, imprisonment, victim mentality",
    reversed: "Self-limiting beliefs, inner critic, releasing negative thoughts",
    hebrew: "",
    astrology: "♃ in ♊", // Jupiter in Gemini
    element: "🌪️",
    imageUrl: "/cards/eight_swords.jpg",
  },
  {
    id: 58,
    name: "Nine of Swords",
    meaning: "Anxiety, worry, fear, depression, nightmares",
    reversed: "Inner turmoil, deep-seated fears, secrets, releasing anxiety",
    hebrew: "",
    astrology: "♂ in ♊", // Mars in Gemini
    element: "🌪️",
    imageUrl: "/cards/nine_swords.jpg",
  },
  {
    id: 59,
    name: "Ten of Swords",
    meaning: "Painful endings, deep wounds, betrayal, loss, crisis",
    reversed: "Recovery, regeneration, resisting an inevitable end",
    hebrew: "",
    astrology: "☉ in ♊", // Sun in Gemini
    element: "🌪️",
    imageUrl: "/cards/ten_swords.jpg",
  },
  {
    id: 60,
    name: "Page of Swords",
    meaning: "New ideas, curiosity, thirst for knowledge, new ways of communicating",
    reversed: "Self-expression, all talk and no action, haphazard action",
    hebrew: "",
    astrology: "♑♒♓", // Capricorn/Aquarius/Pisces (Earth of Air)
    element: "🌪️",
    imageUrl: "/cards/page_swords.jpg",
  },
  {
    id: 61,
    name: "Knight of Swords",
    meaning: "Ambitious, action-oriented, driven to succeed, fast-thinking",
    reversed: "Restless, unfocused, impulsive, burn-out",
    hebrew: "",
    astrology: "♑-♒", // 20° Capricorn - 20° Aquarius (Air of Air)
    element: "🌪️",
    imageUrl: "/cards/knight_swords.jpg",
  },
  {
    id: 62,
    name: "Queen of Swords",
    meaning: "Independent, unbiased judgement, clear boundaries, direct communication",
    reversed: "Overly-emotional, easily influenced, harsh, lack of empathy",
    hebrew: "",
    astrology: "♍-♎", // 20° Virgo - 20° Libra (Water of Air)
    element: "🌪️",
    imageUrl: "/cards/queen_swords.jpg",
  },
  {
    id: 63,
    name: "King of Swords",
    meaning: "Mental clarity, intellectual power, authority, truth",
    reversed: "Quiet power, inner truth, misuse of power, manipulation",
    hebrew: "",
    astrology: "♉-♊", // 20° Taurus - 20° Gemini (Fire of Air)
    element: "🌪️",
    imageUrl: "/cards/king_swords.jpg",
  },
  
  // Minor Arcana - Wands (Fire)
  {
    id: 64,
    name: "Ace of Wands",
    meaning: "Inspiration, new opportunities, growth, potential",
    reversed: "An emerging idea, lack of direction, distractions, delays",
    hebrew: "",
    astrology: "♋♌♍", // Cancer/Leo/Virgo
    element: "🔥",
    imageUrl: "/cards/ace_wands.jpg",
  },
  {
    id: 65,
    name: "Two of Wands",
    meaning: "Future planning, making decisions, leaving comfort zone",
    reversed: "Personal goals, inner alignment, fear of unknown, lack of planning",
    hebrew: "",
    astrology: "♂ in ♈", // Mars in Aries
    element: "🔥",
    imageUrl: "/cards/two_wands.jpg",
  },
  {
    id: 66,
    name: "Three of Wands",
    meaning: "Expansion, foresight, overseas opportunities, leadership",
    reversed: "Playing small, lack of foresight, unexpected delays",
    hebrew: "",
    astrology: "☉ in ♈", // Sun in Aries
    element: "🔥",
    imageUrl: "/cards/three_wands.jpg",
  },
  {
    id: 67,
    name: "Four of Wands",
    meaning: "Celebration, joy, harmony, relaxation, homecoming",
    reversed: "Personal celebration, inner harmony, conflict with others",
    hebrew: "",
    astrology: "♀ in ♈", // Venus in Aries
    element: "🔥",
    imageUrl: "/cards/four_wands.jpg",
  },
  {
    id: 68,
    name: "Five of Wands",
    meaning: "Conflict, disagreements, competition, tension, diversity",
    reversed: "Inner conflict, conflict avoidance, tension release",
    hebrew: "",
    astrology: "♄ in ♌", // Saturn in Leo
    element: "🔥",
    imageUrl: "/cards/five_wands.jpg",
  },
  {
    id: 69,
    name: "Six of Wands",
    meaning: "Success, public recognition, progress, self-confidence",
    reversed: "Private achievement, personal definition of success, fall from grace",
    hebrew: "",
    astrology: "♃ in ♌", // Jupiter in Leo
    element: "🔥",
    imageUrl: "/cards/six_wands.jpg",
  },
  {
    id: 70,
    name: "Seven of Wands",
    meaning: "Challenge, competition, protection, perseverance",
    reversed: "Exhaustion, giving up, overwhelmed",
    hebrew: "",
    astrology: "♂ in ♌", // Mars in Leo
    element: "🔥",
    imageUrl: "/cards/seven_wands.jpg",
  },
  {
    id: 71,
    name: "Eight of Wands",
    meaning: "Swiftness, speed, progress, quick decisions, news, infatuation",
    reversed: "Delays, frustration, resisting change, internal alignment",
    hebrew: "",
    astrology: "☿ in ♐", // Mercury in Sagittarius
    element: "🔥",
    imageUrl: "/cards/eight_wands.jpg",
  },
  {
    id: 72,
    name: "Nine of Wands",
    meaning: "Resilience, courage, persistence, test of faith, boundaries",
    reversed: "Inner resources, struggle, overwhelm, defensive, paranoia",
    hebrew: "",
    astrology: "☽ in ♐", // Moon in Sagittarius
    element: "🔥",
    imageUrl: "/cards/nine_wands.jpg",
  },
  {
    id: 73,
    name: "Ten of Wands",
    meaning: "Burden, extra responsibility, hard work, completion",
    reversed: "Doing it all, carrying the burden, delegation, release",
    hebrew: "",
    astrology: "♄ in ♐", // Saturn in Sagittarius
    element: "🔥",
    imageUrl: "/cards/ten_wands.jpg",
  },
  {
    id: 74,
    name: "Page of Wands",
    meaning: "Inspiration, ideas, discovery, limitless potential, free spirit",
    reversed: "Newly-formed ideas, redirecting energy, self-limiting beliefs",
    hebrew: "",
    astrology: "♋♌♍", // Cancer/Leo/Virgo (Earth of Fire)
    element: "🔥",
    imageUrl: "/cards/page_wands.jpg",
  },
  {
    id: 75,
    name: "Knight of Wands",
    meaning: "Energy, passion, inspired action, adventure, impulsiveness",
    reversed: "Passion project, haste, scattered energy, delays, frustration",
    hebrew: "",
    astrology: "♋-♌", // 20° Cancer - 20° Leo (Air of Fire)
    element: "🔥",
    imageUrl: "/cards/knight_wands.jpg",
  },
  {
    id: 76,
    name: "Queen of Wands",
    meaning: "Courage, confidence, independence, social butterfly, determination",
    reversed: "Self-respect, self-confidence, introverted, re-establish sense of self",
    hebrew: "",
    astrology: "♓-♈", // 20° Pisces - 20° Aries (Water of Fire)
    element: "🔥",
    imageUrl: "/cards/queen_wands.jpg",
  },
  {
    id: 77,
    name: "King of Wands",
    meaning: "Natural-born leader, vision, entrepreneur, honour",
    reversed: "Impulsiveness, haste, ruthless, high expectations",
    hebrew: "",
    astrology: "♏-♐", // 20° Scorpio - 20° Sagittarius (Fire of Fire)
    element: "🔥",
    imageUrl: "/cards/king_wands.jpg",
  },
];
