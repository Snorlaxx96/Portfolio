# DESIGN.md — BUNAO

Reading this as: a portfolio for creative directors and founders, with an acid-night club-poster language, leaning toward the santalarch.com grid pushed dark and loud.

```text
Primary Craft Engine: impeccable (Visitor Mode: Experience)
Taste Calibration: design-taste-frontend · Anti-Slop: anti-ai-slop
Page: Portfolio
Audience: Creative directors, design leads, founders
Vibe & Aesthetic: Acid night. Graphite ground, paper type, one chartreuse signal, ultra-wide heavy display
References: santalarch.com (structure and motion only)
Dials: DESIGN_VARIANCE 9, MOTION_INTENSITY 7, VISUAL_DENSITY 3
Key Assets / Constraints: no stock photography; generated SVG covers; dark-first, paper for Works only, acid for Contact
```

## Tokens
| Token | Value | Use |
| :-- | :-- | :-- |
| `--graphite` | `#0E0F0C` | default ground |
| `--night` | `#070806` | deeper bands (Philosophy, Principles, Services) |
| `--surface` | `#191A16` | raised panels |
| `--paper` | `#EEEDE6` | type on dark; ground of the Works band (`.band-paper`) |
| `--muted` | `#A9A89F` | secondary text on dark (about 8:1) |
| `--acid` | `#D7FF3B` | chartreuse signal: hero CTA, helix spine, Services numeral, Contact band |
| `--border` | `rgb(238 237 230 / 0.16)` | hairlines |

Bands: graphite (hero, manifesto, process) → night (philosophy, principles, services) → paper (works) → acid (contact).

## Type
- **Anybody** (variable `wght` 100–900, `wdth` 50–150). Headings default to `wdth` 118 via `--wdth-display`, and sections push higher (Works title 140, process steps 130).
- Wordmark: weight 900, resting at `wdth` 122. Letters near the cursor stretch toward 150 and the others squeeze toward 50.
- **JetBrains Mono** for indices, counters, and timestamps only, always `tabular-nums`.
- Display weights 800–900, tracking -0.045em. Body 400 at 16px, line-height 1.55.

## Geometry
- 12-column grid with a 16px gutter on mobile and 24px from 768px up.
- Hairline column rules in the header (the reference's main signature), extended into a per-section progress bar.
- Radii: 0 on containers and 4px on controls. The whole site is square-cornered on purpose.

## Motion
- Lenis smooth scroll driven by the GSAP ticker.
- Ease `cubic-bezier(0.25, 1, 0.5, 1)`. Entrances last 600–900ms. Hover responses settle within 300ms.
- Pinned scenes: manifesto word fill, a Three.js word helix, and horizontal process track.
- `prefers-reduced-motion`: no pinning, no smooth scroll, no helix rotation; content is shown statically.
