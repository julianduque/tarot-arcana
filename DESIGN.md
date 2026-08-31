---
name: Tarot Arcana
description: A reader's notebook for quiet tarot reflection from dawn to midnight.
colors:
  ink-ground: "#20232f"
  deep-ink: "#191c26"
  warm-paper: "#f1eee8"
  muted-ink: "#b5b6be"
  dim-ink: "#868a97"
  hairline: "rgba(241, 238, 232, 0.18)"
  hairline-strong: "rgba(241, 238, 232, 0.42)"
  focus-violet: "#b58aef"
  focus-violet-soft: "rgba(181, 138, 239, 0.15)"
  danger: "#ef9a9a"
  success: "#9ecf87"
  card-back: "#242938"
  dawn-ground: "#f2efe8"
  dawn-deep: "#e5ded2"
  dawn-text: "#292633"
  dawn-muted: "#625e68"
  dawn-focus-violet: "#6e3fa0"
typography:
  display:
    fontFamily: "IBM Plex Mono, Liberation Mono, monospace"
    fontSize: "clamp(28px, 4vw, 54px)"
    fontWeight: 500
    lineHeight: 1.16
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "IBM Plex Mono, Liberation Mono, monospace"
    fontSize: "clamp(22px, 3vw, 34px)"
    fontWeight: 500
    lineHeight: 1.16
    letterSpacing: "-0.025em"
  title:
    fontFamily: "IBM Plex Mono, Liberation Mono, monospace"
    fontSize: "clamp(20px, 2vw, 28px)"
    fontWeight: 500
    lineHeight: 1.16
    letterSpacing: "-0.025em"
  body:
    fontFamily: "IBM Plex Mono, Liberation Mono, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body-ruled:
    fontFamily: "IBM Plex Mono, Liberation Mono, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "32px"
    letterSpacing: "normal"
  action:
    fontFamily: "IBM Plex Mono, Liberation Mono, monospace"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, Liberation Mono, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.08em"
  section:
    fontFamily: "IBM Plex Mono, Liberation Mono, monospace"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.16
    letterSpacing: "0.08em"
  prominent-label:
    fontFamily: "IBM Plex Mono, Liberation Mono, monospace"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.16
    letterSpacing: "0.08em"
  small:
    fontFamily: "IBM Plex Mono, Liberation Mono, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.04em"
  meta:
    fontFamily: "IBM Plex Mono, Liberation Mono, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.08em"
  micro:
    fontFamily: "IBM Plex Mono, Liberation Mono, monospace"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.04em"
  reading-title:
    fontFamily: "IBM Plex Mono, Liberation Mono, monospace"
    fontSize: "clamp(24px, 3vw, 38px)"
    fontWeight: 500
    lineHeight: 1.16
    letterSpacing: "-0.025em"
rounded:
  thumbnail: "3px"
  soft: "6px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  section: "42px"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.focus-violet}"
    typography: "{typography.action}"
    rounded: "{rounded.soft}"
    padding: "10px 16px"
    height: "42px"
  button-primary-hover:
    backgroundColor: "{colors.focus-violet-soft}"
    textColor: "{colors.warm-paper}"
    typography: "{typography.action}"
    rounded: "{rounded.soft}"
    padding: "10px 16px"
    height: "42px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.warm-paper}"
    typography: "{typography.action}"
    rounded: "{rounded.soft}"
    padding: "10px 16px"
    height: "42px"
  button-danger:
    backgroundColor: "transparent"
    textColor: "{colors.danger}"
    typography: "{typography.action}"
    rounded: "{rounded.soft}"
    padding: "6px 10px"
    height: "34px"
  note-field:
    backgroundColor: "rgba(18, 20, 28, 0.2)"
    textColor: "{colors.warm-paper}"
    typography: "{typography.body-ruled}"
    rounded: "{rounded.soft}"
    padding: "14px 16px"
---

# Design System: Tarot Arcana

## Overview

**Creative North Star: "The Reader's Notebook, Dawn to Midnight"**

Tarot Arcana is a quiet working instrument with two composed settings: midnight ink for low ambient light and dawn paper for brighter reading. Warm monospaced notation and a small set of ruled controls recede behind the reading in both. Its atmosphere comes from restraint and continuity rather than occult decoration. Rider-Waite-Smith card art supplies the only dense texture and broad color spectrum.

The interface is compact, deliberate, and planar. Hairline divisions organize related tasks; muted copy stays subordinate; violet appears when the system needs attention, focus, or selection. Responsive layouts preserve the same reading order instead of inventing a separate mobile visual language.

**Key Characteristics:**

- Matte ink-blue night and warm-paper day palettes built from the same semantic roles.
- One monospaced family across display, reading, label, and control roles.
- Hairline rules and open fields in place of decorative containers.
- Muted violet reserved for interaction, selection, and focus.
- Natural tarot imagery left visually dominant and uncropped.
- Compact corners, brief transitions, and one deliberate card-turn motion.

## Colors

Both palettes are low-chroma reading environments interrupted by a muted violet signal and the natural colors of the card art. Dark mode is midnight ink with warm paper text. Light mode is dawn paper with dark plum ink; it is deliberately composed rather than mechanically inverted.

### Primary

- **Focus Violet:** The sole interactive accent for focus outlines, active navigation, selected cards, reading counts, and primary action borders.

### Tertiary

- **Success:** A narrow semantic signal for local-save confirmation.
- **Danger:** Deletion controls and error copy only.

### Neutral

- **Ink Ground:** The continuous page and application ground.
- **Deep Ink:** The deeper card-face and scrollbar ground used to separate material without introducing a panel effect.
- **Warm Paper:** Primary copy and high-emphasis labels; it gives the dark interface its slightly human, printed quality.
- **Muted Ink:** Secondary explanations, metadata, and inactive navigation.
- **Dim Ink:** Placeholder text only, kept visibly below ordinary supporting copy.
- **Hairline / Strong Hairline:** Low-contrast structural dividers and stronger control or image boundaries.
- **Soft Focus Violet:** A translucent interaction wash for hover and selected states.
- **Card Back:** The restrained blue-black fill behind the authored geometric card-back mark.
- **Dawn Ground / Dawn Deep:** Warm paper and a slightly deeper paper tone for the light reading environment.
- **Dawn Text / Dawn Muted:** Plum-black primary ink and softened secondary notation that retain strong contrast on paper.
- **Dawn Focus Violet:** A deeper violet that preserves the same action role and sufficient contrast in light mode.

### Named Rules

**The Violet Signal Rule.** Violet marks action, focus, selection, or reading state; it is not a general decorative fill.

**The Card Art Carries Color Rule.** Keep the interface low-chroma so Rider-Waite-Smith imagery remains the only richly colored and textured material.

**The Dawn / Midnight Rule.** Theme changes remap semantic roles. Never invert card art, weaken violet's interaction meaning, or turn light mode into pure white and black.

## Typography

**Display Font:** IBM Plex Mono (with Liberation Mono and monospace fallbacks)
**Body Font:** IBM Plex Mono (with Liberation Mono and monospace fallbacks)
**Label/Mono Font:** IBM Plex Mono (with Liberation Mono and monospace fallbacks)

**Character:** A single warm monospace voice makes the product feel like a private working notebook rather than a themed publication. Hierarchy comes from scale, weight, case, spacing, and rules—not from mixing typefaces.

### Hierarchy

- **Display** (500, fluid 28–54px, 1.16): Route-level reading and notes titles.
- **Headline** (500, fluid 22–34px, 1.16): Setup prompts, inspectors, and strong empty-state statements.
- **Title** (500, fluid 20–28px, 1.16): Revealed card names and primary content titles.
- **Body** (400, 15px, 1.55): Default prose; longer reading copy is constrained to roughly 65–70 characters and may open to 1.7–1.75 line-height.
- **Ruled Body** (400, 14px, 32px): Notes aligned to the textarea's repeating notebook rules.
- **Action** (500, 13px, 1.55): Text buttons and compact reading-row titles.
- **Label** (400, 12px, 0.08em tracking): Uppercase headings, navigation, metadata, and position labels; tiny spread annotations step down to 9–11px only where space demands it.
- **Section / Prominent Label** (500, 16–18px): Compact section landmarks and high-emphasis labels.
- **Small / Meta / Micro** (400, 9–11px): Spread geometry, plugin guidance, compact metadata, and constrained mobile navigation.
- **Reading Title** (500, fluid 24–38px): The focused card or interpretation title within an active reading.

### Named Rules

**The One Voice Rule.** Use IBM Plex Mono throughout; create hierarchy with the established scale and casing before introducing any new typographic voice.

**The Useful Line Rule.** Keep explanatory and interpretive prose within 62–70ch so it reads as a concise note, not an essay wall.

## Layout

The application shell is centered and capped at 1600px. Page gutters are fluid, generally growing from 20px to 52–70px. Home is a single centered daily instrument capped at 860px; notes and study layers enter the vertical flow only after the reader asks for them. Spread and journal screens use asymmetric work areas with a primary canvas and a narrower inspector or index.

Spacing follows a compact 8/12/16/24px working rhythm, with 42px as the recurring section interval. Larger page separations use fluid clamps rather than fixed empty bands. At 1080px, inspector content leaves its sticky side column when needed. At 760px, paired workspaces become a single reading sequence, navigation compresses, the Markdown split view stacks, and the notes index becomes a horizontal rail. The Celtic Cross never collapses into a false list: its full geometry remains intact inside a labelled horizontal scroll region. At 420px, labels tighten again without introducing page overflow.

**The Rule Becomes Stack Rule.** A desktop divider denotes a relationship, not a permanent column; below 760px it rotates into a horizontal boundary and preserves content order.

**The Open Desk Rule.** Prefer one shared ground with spacing and hairlines over nested cards or boxed dashboard modules.

## Elevation & Depth

The system is flat by default. Tonal shifts, hairline borders, and violet state rings establish separation. The revealed daily tarot image alone receives a diffuse ambient shadow, acknowledging it as a physical object on the desk; selected spread cards use a tight two-pixel violet wash rather than lift. Keyboard focus adds a one-pixel violet outline and a soft three-pixel ring.

### Shadow Vocabulary

- **Card Ambient** (`0 16px 42px rgba(4, 5, 10, 0.32)`): The large revealed daily card only.
- **Focus Halo** (`0 0 0 3px rgba(181, 138, 239, 0.28)`): Visible keyboard focus on links, buttons, textareas, and inputs.
- **Selection Ring** (`0 0 0 2px rgba(181, 138, 239, 0.15)`): The selected card in a spread.

### Named Rules

**The Flat Desk Rule.** Surfaces remain planar; depth belongs to physical card art and explicit interaction states, never to decorative containers.

## Shapes

The form language is nearly square but not brittle. Buttons, text fields, and tarot frames use gently softened six-pixel corners; small journal thumbnails tighten to three pixels. One-pixel rules define control edges, image edges, rows, navigation, and section boundaries. Authored card-back and spread glyphs use thin square-ended geometry that echoes the ruled notebook without becoming ornamental.

**The Six-Pixel Ceiling Rule.** Functional controls and full-size tarot frames do not exceed a 6px radius; avoid pills and soft floating panels.

## Components

Components are restrained working tools: transparent at rest, outlined by hairlines, and legible through small, fast state changes.

### Buttons

- **Shape:** Gently softened rectangle with a 1px rule, 6px radius, and 42px minimum height.
- **Primary:** Transparent ground, violet border and text, 10px × 16px padding; used for the next deliberate reading action.
- **Hover / Focus:** Hover adds the soft violet wash and warm text over 160ms; keyboard focus adds the shared outline and halo.
- **Quiet:** Warm text with a strong neutral rule; hover converges on the same violet treatment as primary.
- **Danger:** Compact 34px control with red text and border; hover adds a faint red wash.

### Cards / Containers

- **Corner Style:** Full-size tarot faces and card backs use 6px corners; journal thumbnails use 3px.
- **Background:** Tarot backs use deep blue-black; revealed art stays unframed by any additional panel.
- **Shadow Strategy:** Only the large daily card uses the Card Ambient shadow.
- **Border:** A strong hairline surrounds the physical card; violet replaces it for actionable or selected states.
- **Internal Padding:** No padding around card imagery. Card backs inset a second one-pixel geometric frame by 13px.

### Inputs / Fields

- **Style:** Dark translucent field, strong one-pixel rule, 6px corners, warm text, and a violet caret.
- **Markdown Notes:** One bordered editor offers Write, Split, and Preview modes. Its preview is the same safe React Markdown renderer used by saved notes and generated interpretations.
- **Focus:** Border shifts to violet and the shared focus halo remains visible.
- **Disabled:** Opacity drops to 0.48 while the field remains structurally present.

### Navigation

The 70px desktop navigation sits on one full-width hairline inside fluid side gutters. The brand is 16px primary text; destinations are 12px uppercase muted text with wide tracking. Hover and current states brighten to primary text, while the active destination receives a two-pixel violet underline. A compact authored sun/moon control switches and locally persists the palette. Below 760px the bar compresses to 60px and text sizes reduce without switching to an icon menu.

### Reading Index

The dedicated Readings route presents three equal cells between hairlines: violet tabular count, authored spread diagram, uppercase title, concise description, and a square-ended arrow. The Omarchy companion and its exact local installation command follow as a separate footer band.

### Progressive Study

The default card view contains only orientation and Waite's divinatory meaning. “Study layers” opens four persistent, independent switches: Pictorial Key, Alchemy, Astrology, and Qabalah. Source text and correspondences never appear without that deliberate request.

### Celtic Cross

The spread follows Waite's published geometry. An optional court-card significator is selected by rank and suit, laid face up in its own lower-left slot, and excluded from the deal. Position 2 rotates across position 1; the crown, base, past, future, and 10-to-7 staff retain their spatial relationships at every breakpoint.

### Tarot Reveal

The card back uses only violet hairlines and a centered authored geometric mark. Reveal rotates the face from 82 degrees with a brief blur and opacity recovery over 520–640ms using a decisive ease-out curve. All other state changes use 160ms fades or snaps, and reduced-motion preferences collapse animations and transitions to 0.01ms.

## Do's and Don'ts

### Do:

- **Do** let tarot artwork provide the broad color and texture while the interface remains nocturnal and low-chroma.
- **Do** use hairlines, open space, and shared ground to group tasks before adding a container.
- **Do** reserve violet for action, current state, focus, and selection.
- **Do** keep reflection Markdown locally framed and render it consistently in editor previews and the journal.
- **Do** preserve visible keyboard focus and the shipped reduced-motion behavior.

### Don't:

- **Don't** introduce ornate fantasy framing, star fields, gradients, glassmorphism, or gold-on-purple occult styling.
- **Don't** turn navigation, reading rows, or journal regions into elevated dashboard cards.
- **Don't** add a second display typeface; the single monospaced voice is the identity.
- **Don't** crop or color-treat Rider-Waite-Smith art as decoration; present the full card as source material.
- **Don't** use pills, oversized radii, glyph-only navigation, or ornamental icons.
