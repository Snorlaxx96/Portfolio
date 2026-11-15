# PRODUCT.md — Mhyco Giselo P. Bunao, Portfolio

## 1. Strategic scope
- **Owner**: Mhyco Giselo P. Bunao, a multidisciplinary designer working in brand, digital product, and spatial work.
- **Goal**: get studios and direct clients to start a conversation. Success means someone reads at least one project and clicks the email link.
- **Reference**: santalarch.com. The site borrows its design language (a monochrome Swiss grid, a giant grotesk wordmark, hairline column navigation, pinned scroll scenes). It does not use any of that site's names, copy, team, or imagery.

## 2. Audience
- Creative directors and design leads hiring senior freelancers.
- Founders who need an identity and a product built together.
- They skim on desktop between meetings. A smaller group opens the link on a phone from a DM.

## 3. Feature matrix
| Priority | Feature |
| :-- | :-- |
| P0 | Hero wordmark, manifesto, philosophy scene, principles, process, works index, services, contact |
| P0 | Mobile layout at 375px (the reference blocks portrait; this site does not) |
| P0 | Reduced-motion fallback for every scroll scene |
| P1 | Per-project case-study pages (`/work/[slug]`) |
| P2 | CMS-backed project content |
| P3 | Journal / writing |

## 4. Content model
All editable content lives in `content/site.ts`: name, role line, email, socials, principles, process stages, projects, services.
The projects shipped now are **samples**. Replace them with real work before launch.

## 5. Non-functional requirements
- Static output, no backend.
- LCP under 2.5s on 4G. Three.js loads only once the philosophy section is close to the viewport.
- WCAG AA contrast, keyboard reachable, visible focus rings, 44px touch targets.
