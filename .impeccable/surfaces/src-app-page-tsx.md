---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/one-card/page.tsx","src/app/three-card/page.tsx","src/app/celtic-cross/page.tsx"]
---

## Scope

Replacement visual world for the complete Tarot Arcana web app. Visitor mode: Operate.

## Audience and job

A person wants a short, private tarot ritual: see today's card, draw a spread, read the essential meaning, and capture a reflection without navigating an ornate content experience.

## Chosen direction

Reader's notebook from dawn to midnight, grounded in the local `omarchy-tarot` interface. The original ink-blue desk gains a composed warm-paper light mode; both use one muted-violet focus accent and Rider-Waite art as the only textured material. The approved composition is `.impeccable/mocks/home-journal-first.png`.

## Memorable moment

The daily card and its note occupy the two halves of one open reading desk. Turning the card reveals the image and makes the note feel attached to that exact daily draw.

## Component and layout inventory

| Ingredient | Commitment | Medium |
| --- | --- | --- |
| Global ground | Flat ink blue `#20232f` or warm paper `#f2efe8`; no gradient or star field | CSS |
| Type | Compact monospace UI; scale contrast from 11px labels to 28px card titles | CSS/system monospace |
| Navigation | One thin horizontal rule, three text destinations, violet active underline | Semantic HTML/CSS |
| Daily card | Large portrait with natural aged-paper colors; no extra card container | Existing `public/cards/*.jpg` raster |
| Note editor | Open field with ruled lines, square violet focus outline, local-save status | Semantic textarea/CSS/localStorage |
| Reading index | Three full-width rows with count, tiny spread diagram, label, and arrow | Links plus authored CSS diagrams |
| Dividing gutter | One vertical hairline at desktop; becomes horizontal on mobile | CSS |
| Controls | Square-cornered or 6px maximum, thin 1px rules, no elevation | HTML/CSS |
| Motion | One deliberate card turn/reveal; other state changes snap or fade quickly | CSS with reduced-motion fallback |
| Theme control | Authored sun/moon toggle in the primary navigation; local preference with system default | Client state/localStorage/CSS semantic tokens |
| Omarchy bridge | Compact install command and direct link to the plugin's canonical install guide | Semantic HTML/external link |

## Responsive behavior

Desktop uses the approved 58/42 split. Mobile stacks daily card, its meaning, note editor, and reading index in that order; navigation compresses into one compact text row. No horizontal overflow and no card art cropped beyond recognition.

## Constraints

Preserve one-card, three-card, and Celtic Cross workflows. Keep AI interpretation concise when available. Persist today's draw, reading history, and notes locally. Do not deploy.
