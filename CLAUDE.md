# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build production application
- `pnpm start` - Start production server (uses $PORT environment variable)
- `pnpm lint` - Run ESLint to check code quality

### Package Management
- Uses `pnpm` as the package manager (not npm/yarn)
- Lock file: `pnpm-lock.yaml`

## Architecture Overview

This is a Next.js 15 tarot reading application that combines modern web development with AI-powered tarot interpretation using the Mastra framework.

### Key Technologies
- **Next.js 15** with App Router
- **TypeScript** with strict mode enabled
- **Tailwind CSS** for styling
- **Mastra Framework** for AI agent orchestration
- **OpenAI GPT-4** for tarot interpretations
- **Zod** for schema validation

### Core Architecture Components

#### 1. Tarot Card System (`src/tarotCards.ts`)
- Complete 78-card tarot deck with detailed metadata
- Each card includes: name, meaning, reversed meaning, Hebrew correspondence, astrological association, elemental correspondence
- Cards are categorized into Major Arcana (0-21) and Minor Arcana (22-77)

#### 2. AI Agent System (`src/mastra/`)
- **Mastra Core**: Orchestrates AI agents with logging via Pino
- **Tarot Agent** (`agents/tarot-agent.ts`): Specialized GPT-4 agent for tarot interpretation
- **Interpretation Tool** (`tools/tarot-interpretation-tool.ts`): Comprehensive analysis tool that processes readings with:
  - Jungian psychological analysis
  - Esoteric correspondences (Hebrew letters, astrology, numerology)
  - Elemental balance calculations
  - Shadow work insights
  - Practical guidance generation

#### 3. Reading Types
- **Three-Card Reading**: Past, Present, Future spread
- **Celtic Cross**: Traditional 10-card spread
- Both accessible via dedicated routes (`/three-card`, `/celtic-cross`)

#### 4. Server Actions (`src/app/actions.ts`)
- `analyzeReading()`: Processes reading data through the Mastra agent system
- Handles question context, card positions, and orientations
- Returns comprehensive AI-generated interpretations

### Data Flow
1. User selects reading type from home page
2. Cards are drawn and positions assigned
3. Reading data (question, cards, positions, orientations) sent to server action
4. Mastra agent processes data using tarot interpretation tool
5. Tool performs multi-layered analysis (psychological, esoteric, practical)
6. Agent generates structured interpretation combining all aspects
7. Result returned to frontend for display

### File Structure Conventions
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components with TypeScript
- `src/mastra/` - AI agent and tool definitions
- `public/cards/` - Tarot card images (78 total)

### Environment Requirements
- Node.js with ES2017+ support
- Environment variables for OpenAI API key (check `.env` file)
- Tailwind CSS for styling

### Development Notes
- Uses strict TypeScript configuration
- ESLint configured with Next.js rules
- Components use TypeScript interfaces
- Server actions use "use server" directive
- Client components use "use client" directive

### AI Integration Specifics
- Mastra agent combines Jungian psychology with esoteric tarot knowledge
- Tool provides structured data analysis before interpretation
- Agent generates comprehensive readings with multiple analytical layers
- System designed for both psychological insight and practical guidance