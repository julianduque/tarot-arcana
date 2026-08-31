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

This is a Next.js 16 tarot reflection application with browser-local journaling and optional AI interpretation through Mastra.

### Key Technologies
- **Next.js 16** with App Router
- **React 19**
- **TypeScript** with strict mode enabled
- **Plain CSS** with the shared design system in `src/app/globals.css`
- **Mastra Framework** for AI agent orchestration
- **OpenAI GPT-5.6 Terra** for concise tarot interpretations
- **IBM Plex Mono** served locally through Fontsource

### Core Architecture Components

#### 1. Tarot Card System (`src/tarotCards.ts`)
- Complete 78-card tarot deck with detailed metadata
- Each card includes Waite's upright/reversed meanings, full Pictorial Key description, and Golden Dawn / Book T study correspondences imported through `src/data/cards.json`
- Cards are categorized into Major Arcana (0-21) and Minor Arcana (22-77)

#### 2. AI Agent System (`src/mastra/`)
- **Mastra Core**: Orchestrates AI agents with logging via Pino
- **Tarot Agent** (`agents/tarot-agent.ts`): A concise reflective reader that avoids certainty, prophecy, and ceremonial filler
- **Server Action** (`src/app/actions.ts`): Supplies canonical meanings plus only the study layers enabled by the user, then requests a concise direct answer, pattern, tension, optional correspondences, and next step

#### 3. Reading Types
- **Card of the Day**: Stable for the local calendar day and browser installation
- **One-Card Reading**: A single point of focus
- **Three-Card Reading**: Past, Present, Future spread
- **Celtic Cross**: Waite's 10-card spread with an optional, separately laid significator
- Reading routes share `src/components/ReadingExperience.tsx`

#### 4. Local Journal (`src/lib/journal.ts`)
- Stores the daily card, reading history, and notes in browser local storage
- Uses the versioned key `tarot-arcana:journal:v1`
- The `/notes` route edits or deletes saved entries without an account or remote persistence

### Data Flow
1. The user opens the daily card or selects a reading type.
2. Cards are drawn locally and positions and orientations are assigned.
3. The draw and note are persisted to the local journal.
4. If the user asks for an interpretation, reading data is sent to the server action.
5. Mastra returns a short Answer / Pattern / Tension / optional Correspondences / Next step response.

### File Structure Conventions
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components with TypeScript
- `src/mastra/` - AI agent and runtime definitions
- `public/cards/` - Tarot card images (78 total)
- `src/lib/` - Daily-card and journal persistence helpers

### Environment Requirements
- A current Node.js runtime and `pnpm`
- `OPENAI_API_KEY` for optional AI interpretation

### Development Notes
- Uses strict TypeScript configuration
- ESLint configured with Next.js rules
- Components use TypeScript interfaces
- Server actions use "use server" directive
- Client components use "use client" directive

### Product Constraints
- Notes and reading history remain browser-local.
- Card art is the public-domain Pamela Colman Smith 1909 deck; text is A. E. Waite's public-domain 1911 Pictorial Key. Keep the current source notice attached to imported data.
- Do not add ornate occult decoration or force correspondence catalogues into the simple reading view.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
