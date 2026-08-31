# Tarot Arcana

A quiet tarot reader for a daily card, focused spreads, optional traditional correspondences, and private reflection.

[Open Tarot Arcana](https://tarot.julianduque.co)

## What it includes

- **Card of the Day** — one stable card per local calendar day and browser installation.
- **One-card reading** — a direct look at the matter in front of you.
- **Three-card reading** — past, present, and future.
- **Celtic Cross** — Waite's ten-card pattern with an optional court-card significator.
- **Layered study** — independently enable the full *Pictorial Key to the Tarot* text, alchemical elements, astrology, and Qabalistic correspondences.
- **Focused interpretations** — a concise answer to the question followed by the central pattern, tension, and next step.
- **Private notes** — a Markdown editor and renderer backed by browser storage. Readings and generated interpretations can be saved into notes without losing their structure.
- **Light and dark themes** — warm paper by day and ink blue at night, with the selected theme kept in the browser.
- **Responsive layouts** — the Celtic Cross and other reading surfaces adapt from wide screens to mobile without changing their reading order.

The interface and reading data are informed by the companion [Omarchy Tarot](https://github.com/julianduque/omarchy-tarot) project.

## Omarchy plugin

Install the terminal-oriented companion on Omarchy with:

```bash
omarchy plugin add https://github.com/julianduque/omarchy-tarot.git --enable
```

See the [Omarchy Tarot installation guide](https://github.com/julianduque/omarchy-tarot#install) for usage and requirements.

## AI interpretations

Interpretations run through a server action backed by Mastra and OpenAI. The browser submits only the question, reading type, enabled study layers, card IDs, orientations, and optional significator. Card meanings and spread positions are reconstructed from the application's canonical data on the server.

The inference boundary includes:

- Runtime validation for every submitted field, exact spread sizes, valid card IDs, and unique cards.
- Instruction-like question screening and escaped, clearly separated reading data.
- A tarot-only agent with no tools, one generation step, bounded output, no automatic retries, and response-shape validation.
- No model prompt or response logging and no provider-side response storage request.
- A five-minute cooldown enforced with a signed, HttpOnly browser identity and available network identity.
- A privacy-preserving hashed safety identifier rather than personal information.

Anonymous rate limiting is intentionally lightweight. A shared rate-limit store and authenticated user identity would be required for strict enforcement across multiple server instances.

## Requirements

- Node.js 22 or newer
- pnpm 10
- An OpenAI API key for generated interpretations

Daily cards, manual card study, themes, readings, and notes work without an API key. Only generated interpretations require it.

## Local development

```bash
git clone git@github.com:julianduque/tarot-arcana.git
cd tarot-arcana
pnpm install
```

Create an ignored `.env` file:

```dotenv
OPENAI_API_KEY=your_openai_api_key_here
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm audit --prod
```

## Vercel

Link the repository to its Vercel project, add the API key as a secret, and deploy:

```bash
vercel link
vercel env add OPENAI_API_KEY production,preview,development --sensitive
vercel deploy --prod
```

The CLI prompts for the secret value. Local environment files and design-review artifacts are excluded from deployment by `.vercelignore`.

## Project map

```text
src/
├── app/
│   ├── actions.ts          # Validated server-side interpretation boundary
│   ├── celtic-cross/       # Celtic Cross route
│   ├── notes/              # Reading journal and notes
│   ├── one-card/           # One-card route
│   ├── readings/           # Spread index and Omarchy plugin guide
│   └── three-card/         # Three-card route
├── components/
│   ├── DailyCard.tsx
│   ├── MarkdownEditor.tsx
│   ├── NotesJournal.tsx
│   ├── ReadingExperience.tsx
│   ├── StudyLayers.tsx
│   └── ThemeToggle.tsx
├── data/
│   ├── cards.json          # Waite text and card correspondences
│   └── spreads.json        # Canonical spread positions
├── lib/
│   ├── daily-card.ts
│   ├── inference-guard.ts
│   ├── journal.ts
│   └── spreads.ts
└── mastra/
    └── agents/
        └── tarot-agent.ts
```

The visual identity and reusable interface rules are recorded in [`DESIGN.md`](./DESIGN.md).

## Card sources

Tarot Arcana includes the complete 78-card Rider–Waite–Smith deck, A. E. Waite's public-domain *Pictorial Key to the Tarot* text, traditional upright and reversed meanings, and Golden Dawn / Book T correspondences imported from the companion Omarchy project.

## Privacy and use

Notes, reading history, the daily-card seed, and theme choice stay in the browser's local storage. Clearing site data removes them.

Tarot Arcana is a reflective tool, not a substitute for medical, legal, financial, or other professional advice.

## License

[MIT](./LICENSE)
