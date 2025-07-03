# Tarot Arcana

An esoteric tarot reading application rooted in Western mystical traditions, featuring AI-powered interpretations based on Golden Dawn, Thelemic, and Rider-Waite systems.

## Features

### 🔮 Reading Types
- **One Card Reading** - Simple wisdom for daily guidance
- **Three Card Reading** - Past, Present, and Future insights
- **Celtic Cross** - Comprehensive 10-card spread for deep analysis

### ✨ Key Features
- **Authentic Card Selection** - Realistic shuffle, cut, and draw experience
- **AI-Powered Interpretations** - Esoteric analysis using Mastra AI framework
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Professional UI** - Clean, mystical design with proper alchemical symbols
- **Question-Focused Readings** - AI provides specific guidance for your questions

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **AI Integration**: Mastra AI framework with OpenAI GPT-4
- **Styling**: CSS with custom design system
- **Language**: TypeScript for type safety
- **Deployment**: Optimized for Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tarot-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── one-card/          # One card reading page
│   ├── three-card/        # Three card reading page
│   ├── celtic-cross/      # Celtic cross reading page
│   ├── actions.ts         # Server actions for AI integration
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout with metadata
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Main navigation component
│   ├── CardSelection.tsx  # Card selection experience
│   └── TarotCardModal.tsx # Card detail modal
├── mastra/               # AI integration
│   ├── agents/           # Tarot interpretation agents
│   └── tools/            # AI tools and utilities
└── tarotCards.ts         # Tarot card data and definitions

public/
├── cards/                # Tarot card images
└── logo.png             # Application logo
```

## AI Integration

The application uses the Mastra AI framework to provide sophisticated tarot interpretations:

### Esoteric Agent
The **Esoteric Tarot Oracle** agent provides interpretations based on:
- **Golden Dawn Tradition**: Astrological and elemental correspondences
- **Thelemic Approach**: Individual will and elemental dignities  
- **Rider-Waite Symbolism**: Living symbols and mystical meanings
- **Hermetic Synthesis**: Connecting macrocosm to microcosm

### Interpretation Structure
1. **The Oracle Speaks** - Direct answers to specific questions
2. **The Great Work** - Advanced esoteric analysis
3. **The Cards in Council** - Symbolic relationships
4. **The Mysteries Revealed** - Individual card meanings
5. **The Path of Return** - Practical spiritual guidance
6. **The Closing Benediction** - Sacred conclusion

## Card Selection Experience

The application features a realistic card selection process:

1. **Focus Phase** - Mental preparation
2. **Shuffle Phase** - Cards are shuffled with intention
3. **Cut Phase** - Choose from three piles
4. **Draw Phase** - Cards selected from chosen pile

## Customization

### Adding New Reading Types
1. Create a new page in `src/app/[reading-type]/`
2. Update the navigation in `src/components/Navigation.tsx`
3. Add the reading type to the AI tool schema
4. Update the home page cards

### Styling
The application uses a custom design system with CSS variables:
- Colors: Antique gold theme with dark mystical background
- Typography: Serif fonts for headings, sans-serif for body
- Layout: Responsive grid system with proper spacing

## Development Commands

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
```

## Environment Variables

```bash
OPENAI_API_KEY=           # Required: Your OpenAI API key
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Tarot Card Data

The application includes a complete set of 78 tarot cards with:
- High-quality card images
- Traditional meanings and reversed interpretations
- Astrological correspondences
- Elemental associations
- Hebrew letter correspondences (for Major Arcana)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Tarot card images from the Rider-Waite tradition
- AI interpretations powered by OpenAI GPT-4
- Esoteric knowledge drawn from Golden Dawn and Thelemic traditions
- Built with Next.js and the Mastra AI framework

---

**Note**: This application is for entertainment and spiritual guidance purposes. Tarot readings should not be used as a substitute for professional advice in health, legal, or financial matters.