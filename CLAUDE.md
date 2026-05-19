# CLAUDE.md — Portfolio Luka Spelberg

## Project goal

Personal portfolio for Luka Spelberg, digital designer. Presents design cases and tells a personal story. Site copy is in **Dutch**. Code follows English conventions.

Target audience: potential clients, internships, and jobs in digital design.

---

## Design vision — the core idea

The visual language is inspired by the UI of **Metaphor: ReFantazio**. Study it carefully before designing anything. This is not "a dark website with paint effects added." It is closer to a **vintage concert poster or propaganda poster that was turned into a UI** — then photographed, distressed, and printed on rough canvas.

### What Metaphor actually does (be specific about this)

**Typography as collision, not system:**
Metaphor mixes a heavy serif (thick/thin stroke contrast, bracketed serifs) with a condensed sans-serif — and lets them clash on the same screen. Different font weights, different styles, sometimes slightly rotated or cascading. The text feels like it was printed with a woodblock, cut out, and slapped onto a surface. It is NOT harmonious. It is NOT one clean typeface used consistently.

**Backgrounds are visibly, aggressively textured:**
The backgrounds in Metaphor are not dark colors with a subtle CSS noise overlay. They are visibly painted surfaces — heavy splatters, thick brushwork, layered grunge. You can *feel* the canvas. The texture is opaque, not a 4% hint. Think: ink-stained newspaper, or a wall that has been painted over many times.

**Text bleeds off the canvas as decoration:**
"STATUS" is enormous and half-hidden behind a character. "RAMBLERS" is cut off at the edge. Giant text that doesn't fully fit is used as a *background texture*. This is one of the most distinctive Metaphor moves — the typography participates in the composition even when it's not readable.

**Paint is violent, not placed:**
The red in Metaphor isn't a neat ellipse or a clean shape. It's a field of color with splatters, drips, and irregular edges that go in all directions. It bleeds into the image. It doesn't sit politely in one spot.

**Layering is deep:**
Background image → texture layer → large background text → paint/color fields → UI panel → foreground text → character art. Multiple layers, all visible simultaneously. Nothing sits on a clean flat surface.

---

## What this is NOT

- Not a dark website with some red accents
- Not Bebas Neue on a flat dark background
- Not subtle noise filters
- Not neatly placed decorative elements
- Not a "clean but edgy" portfolio
- Not safe

---

## Tech stack

**Next.js with React.** No Tailwind. Use CSS modules or styled-components. The visual language requires full control over every element.

---

## Color palette

```css
:root {
  --color-bg:        #0d0f0c;   /* near-black with a hint of green, like old canvas */
  --color-surface:   #161a14;   /* panel/card backgrounds */
  --color-accent:    #c0281a;   /* deep, saturated red — not terracotta, not coral. Violent red. */
  --color-gold:      #d4a854;   /* warm gold — third accent, for highlights and contrast */
  --color-teal:      #3db8b0;   /* cold teal — used sparingly, for numbers and stat-like elements */
  --color-text:      #f0ece0;   /* warm white/cream */
  --color-muted:     #6b7a68;   /* muted for metadata and secondary text */
}
```

**Color usage:**
- Red is violent and dominant — not a subtle accent. Use it for large paint fields, active elements, underlines, background splashes.
- Gold contrasts with red and adds warmth. Good for project numbers, secondary headings.
- Teal is cold and technical — use for metadata, numbers, stats-style elements.
- Background is never just a flat color — always has visible texture on top of it.

---

## Typography

Load via Google Fonts. **One display font, used at extreme size ranges.** The drama comes entirely from scale contrast — the same font going from 12px metadata to 400px background texture. This is how Metaphor's UI works: not two fonts clashing, but one font at wildly different scales creating the composition.

```css
/* Display — one font, all sizes */
font-family: 'Bebas Neue', cursive;

/* Body / UI text */
font-family: 'Syne', sans-serif;

/* Metadata / Labels */
font-family: 'Space Mono', monospace;
```

### Scale is the design

The entire visual hierarchy is built through size, not typeface variety:

- **Background/decorative text:** 200px–400px, 8–15% opacity, partially off-screen or clipped. This is texture, not readable text.
- **Hero headlines:** 120px–200px, full opacity
- **Section headings:** 60px–90px
- **Project titles on cards:** 40px–64px
- **Body text:** 16–18px Syne (the only font switch — for readability)
- **Metadata:** 13–14px Space Mono, letter-spacing: 0.1em

A single screen should show the same font at maybe 5 different sizes simultaneously. That range — from barely-there background text to massive foreground headline — is what creates the Metaphor feeling.

---

## Texture and background treatment

This is non-negotiable. The background must feel physical.

### Layered background approach

Every page and major section should combine at minimum:
1. Base dark color (`--color-bg`)
2. A visible noise/grain texture — **not 4% opacity, closer to 15–25%**. It should be noticeable.
3. Subtle paint smear or brush stroke layer at very low opacity (think: faint traces of a previous painting)

For noise, use an SVG feTurbulence filter or a real noise PNG at sufficient opacity:
```css
.textured-bg {
  background-color: var(--color-bg);
  position: relative;
}
.textured-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/textures/noise.png');
  opacity: 0.18; /* visible, not hinted */
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

### Paint fields

Paint splashes and fields are NOT decorative shapes placed neatly. They are:
- Irregularly shaped SVG paths with slightly lumpy, organic edges
- Sometimes they bleed off the edge of the screen
- Sometimes they go BEHIND text and BEHIND images, not on top
- They can be partially transparent to show what's underneath
- They can be used as large background color fields for entire sections (a full red region that takes up 40% of a section)

Implement PaintBlob as a component with multiple variants:
- `slash` — wide horizontal brushstroke behind a headline, with irregular edges and slight opacity variation
- `field` — large irregular region that can fill a section background
- `splatter` — small asymmetric blob, used as punctuation near text
- `stroke` — a thin diagonal line with paint-like taper, used as a divider

---

## Composition rules

### Large background text
Every major section should have a large, partially visible word in the background. Examples:
- Behind the hero: "DESIGN" or "LUKA" at 300px+, 10% opacity, slightly cut off
- Behind project cards: the project number ("01") at 400px, barely visible
- Behind the about section: "ABOUT" massive and half off-screen

### Layering order (back to front)
1. Textured background
2. Large background text (very low opacity)
3. Paint fields/blobs (medium opacity, color)
4. Images and thumbnails
5. UI panels (cards, frames)
6. Foreground text and labels

### Grid-breaking
Elements regularly violate their container:
- Hero image or illustration bleeds off the right edge
- A project card is slightly rotated (1–2 degrees) — not all of them, just one
- A heading's descender or ascender overlaps the section below it
- Paint blobs extend past any logical boundary

### Asymmetry
Avoid centered layouts except for very specific dramatic moments. Default to left-aligned with intentional right-side weight from images or large text.

---

## Page structure

### 1. Homepage (`/`)

```
[NAV]
  Small, minimal. Logo left (just "LS" or "Luka Spelberg" in Space Mono).
  Navigation right in Space Mono, small caps.

[HERO]
  Layered composition:
  - Background: texture + large dimmed "SPELBERG" or "DESIGN" text
  - Middle: red paint field (large, irregular, slightly rotated)
  - Foreground: "LUKA SPELBERG" in Playfair Display Black, enormous
  - Sub-label: "Digital Designer" in Bebas Neue with a red underline
  - Short intro: 2–3 lines in Syne
  This should feel like a poster, not a header.

[FEATURED PROJECTS — "Cases"]
  Section label: small, vertical along the left edge
  Large background text: "01", "02", "03" faintly visible
  2–3 project cards:
    - Each card has: project name in Bebas/Playfair, discipline in Space Mono,
      thumbnail image (or solid color field as placeholder), rough border
    - Hover: red accent appears, slight scale
  CTA: "Alle projecten →" in Space Mono

[ABOUT — short]
  1–2 paragraphs in Syne
  Personal: games, piano, design as discovery
  Strengths as rough tags (not bullet points)

[FOOTER]
  Name · Year · email · LinkedIn
```

### 2. Projects overview (`/projecten`)

```
[NAV]

[HEADER]
  "PROJECTEN" in Playfair Display Black, enormous, with background text behind it.
  Red paint field as section accent.

[PROJECTS]
  Asymmetric layout — not a clean grid.
  Mix: one large card, two smaller ones, one horizontal.
  Each card: name (display font large), discipline (Space Mono), year (Space Mono), thumbnail.
  Rough border treatment (slightly offset box-shadow, or SVG-drawn border).
```

### 3. Case detail page (`/projecten/[slug]`)

```
[NAV]
  ← Terug  |  Alle projecten →

[HERO]
  Project name: very large Playfair Display Black
  Metadata row: discipline · date · duration in Space Mono
  Hero image: full-width, with paint field overlay on one edge

[INTRO]
  Large subheading (Bebas Neue or Playfair, 60–80px)
  Body text (Syne, 17px)
  Optional link

[CONTENT SECTIONS — repeatable]
  a) Text left + image right (with image slightly oversized, bleeding out)
  b) Full-width image
  c) Centered text, wide column

[NEXT PROJECT]
  Project name enormous in background, small "Volgend project →" label over it
```

---

## Animations

**Philosophy:** Like a game UI booting up. Elements don't fade in softly — they arrive with intention.

1. **Hero entrance:**
   - Background text scales up from 90% → 100% (opacity 0 → visible) first
   - Paint field wipes in from left (clip-path or width animation), 400ms
   - Main headline clips in line by line (overflow hidden, translateY up), 500ms
   - Subtext fades in last, 200ms delay

2. **Scroll reveals:**
   - Elements enter with `translateY(30px) → 0`, opacity 0 → 1
   - Easing: `cubic-bezier(0.16, 1, 0.3, 1)` — fast arrival, no bounce
   - Stagger: 80ms between list items
   - Use IntersectionObserver (threshold: 0.15)

3. **Hover:**
   - Cards: red border appears (not just glows — a visible stroke animates in)
   - Links: paint stroke slides under text
   - Nav items: red vertical bar animates in from bottom

4. **Page transitions:**
   - Red paint wipe across screen (full-width clip-path), then reveal new page

**Limits:** Nothing loops. Nothing exceeds 600ms. No parallax on scroll.

---

## Build order

1. **Design system** — CSS variables, fonts, noise texture, PaintBlob component (all 4 variants), global base styles. Test on a blank page showing: all font combinations at various sizes, all paint blob variants, the color palette, the textured background. DO NOT proceed to pages until this is approved.
2. **Homepage**
3. **Projects overview**
4. **Case detail page**

---

## Existing projects

1. **Dynamo** — UX + Game Design, football board game
2. **Public City Jazz** — branding/UX, jazz festival for municipality of Rotterdam
3. **Replica Website Persona3 Reload** — frontend replica of the Persona 3 Reload website

---

## Copy tone

- **Language:** Dutch
- **Tone:** Personal, direct, not corporate.
- **About Luka:** Upbeat and creative. Loves games with a strong story (Cyberpunk, Persona). Plays piano. Found design through gaming.

---

## Hard rules — never break these

- No light backgrounds (no beige, white, cream as base)
- One display font (Bebas Neue) at extreme size variation — never add a second display font to create drama
- No subtle textures — texture must be visible and physical
- No neat, clean paint shapes — paint elements are organic and sometimes violent
- No centered hero layouts that feel like a resume
- No purple/pink gradients
- No Inter, Roboto, or Space Grotesk as display fonts
- No decorative elements that don't connect to the layout structurally
- If it looks like a safe, generic portfolio — it's wrong

---

## Reference

| Element | Source |
|---------|--------|
| Atmosphere, texture, layering | Metaphor: ReFantazio UI — study it |
| Layout structure, section flow | Previous AI version (case detail was good) |
| Typography clash | Metaphor's serif/sans collision |
| Paint as structure, not decoration | Metaphor's paint fields and splashes |
| Animation amount | Previous AI version (felt right) |
