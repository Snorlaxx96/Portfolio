# MHYCO: portfolio of Mhyco Giselo P. Bunao

A one-page portfolio for a multidisciplinary designer working across identity, interface and space.

Built with Next.js 16 (App Router), React 19, TypeScript, GSAP ScrollTrigger, Lenis and Three.js.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build, run `npm run build` and then `npm start`.

## Edit the content

Every word on the site lives in [`content/site.ts`](content/site.ts): name, intro, email, socials, principles, process stages, projects and services.

- The six projects are **samples** (`sample: true`). Replace them with real work. The "Sample case studies" label disappears once no project is marked as a sample.
- Covers are generated SVG posters ([`components/Cover.tsx`](components/Cover.tsx)). Swap in real project images when you have them.

## Design

Colour tokens, type and motion rules are documented in [`DESIGN.md`](DESIGN.md), and the product scope is in [`PRODUCT.md`](PRODUCT.md).

- **Palette (Acid night):** graphite `#0E0F0C`, paper `#EEEDE6`, chartreuse `#D7FF3B`.
- **Type:** Anybody (variable width 50–150) for display and body; JetBrains Mono for labels and counters.
- **Motion:** every scroll scene has a `prefers-reduced-motion` fallback, and the WebGL helix falls back to a static word field.

The layout language borrows from santalarch.com: a Swiss grid, a giant wordmark, a hairline column nav and pinned scroll scenes. No copy, names or imagery from that site are used.
