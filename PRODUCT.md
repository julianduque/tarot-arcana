# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are people seeking a brief, private tarot ritual for reflection and decision-making. This is inferred from the existing reading flows, the requested Card of the Day, and the browser-owned notes features.

## Product Purpose

Tarot Arcana lets someone draw and interpret tarot cards without ceremony getting in the way. Success means a user can open the app, understand the card or spread in front of them, and capture what it means to them in a few focused moments.

## Positioning

Tarot Arcana treats the cards as the primary source material and keeps interpretation concise. It combines deliberate daily and spread-based draws with a private journal stored only in the browser.

## Operating Context

The app is used in short reflective sessions: drawing the daily card, asking a focused question, turning a spread one card at a time, reading the essential meaning, and writing a note tied to the session.

## Capabilities and Constraints

- Preserve one-card, three-card, and Celtic Cross readings.
- Follow Waite's Celtic Cross positions and layout, including an optional court-card significator that is excluded from the deal.
- Add a deterministic Card of the Day that remains stable for the user's local calendar day.
- Store Markdown notes, generated interpretations, significators, and reading history in browser local storage; do not require an account or remote persistence.
- Keep notes and reading history in the browser; the deployed application does not persist them remotely.
- Begin every AI-assisted interpretation with a direct answer to the question, then keep the pattern, tension, and next step concise.
- Make Pictorial Key text, alchemical/elemental, astrological, and Qabalistic correspondences independently opt-in and pass only enabled layers into AI synthesis.
- Include the Omarchy Tarot plugin URL and exact installation command on the Readings route.
- The existing Next.js application and Rider-Waite-Smith card image library remain the implementation foundation.

## Brand Commitments

- Preserve the name Tarot Arcana.
- Use the local `omarchy-tarot` project as the binding reference for a clean, minimal, direct experience.
- Support a composed warm-paper light mode and ink-blue dark mode, with the visitor's choice kept locally.
- Avoid ornate fantasy styling, inflated mystical copy, decorative excess, glassmorphism, and gold-on-purple occult clichés.

## Evidence on Hand

- The application contains 78 card images under `public/cards/`; public-domain Waite text and Golden Dawn / Book T attributions are imported from the local `omarchy-tarot` reference into `src/data/`.
- Existing reading routes are `src/app/one-card/page.tsx`, `src/app/three-card/page.tsx`, and `src/app/celtic-cross/page.tsx`.
- The local reference implementation and its screenshots live at `/home/julianduque/Projects/dev/personal/omarchy-tarot`.
- No testimonials, audience research, or commercial claims are present and none should be fabricated.

## Product Principles

1. Draw deliberately; never manufacture urgency or spectacle.
2. Let the card art carry the emotional weight.
3. Say the useful thing once, in plain language.
4. Keep reflection private and locally owned.
5. Preserve continuity: today's card, recent readings, and notes should survive a reload.

## Accessibility & Inclusion

Use semantic controls, visible keyboard focus, reduced-motion support, sufficient contrast, and responsive layouts that remain usable on a narrow mobile viewport.
