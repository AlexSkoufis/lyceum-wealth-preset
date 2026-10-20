# Lyceum Wealth Management — Wealth Advisor Preset

A classical, editorial homepage for a **fictional** independent wealth advisor in Madison, Wisconsin. Near-black ink, cream paper and a copper accent; Bodoni Moda (plain, italic and outline headline) + Jost. The temple, goblets, oak tree, seal emblem and monogram portraits are line art drawn in code.

Next.js 16 (static export) · GSAP 3 + ScrollTrigger · Lenis · plain CSS. No UI libraries.

```bash
npm install
npm run dev
npm run build     # static site in ./out
```

## Sections

| Section | What it does |
|---|---|
| Hero | "Freedom. Purpose. Legacy." in three treatments (plain, italic, outline) beside a rotating engraved seal with the column emblem; the emblem follows the pointer. Three quick facts underneath. |
| Marquee | Planning areas scrolling. |
| Statement | One question, three pillars. |
| Five disciplines | A temple drawing whose five columns are the planning disciplines. Hover or tap a discipline and a light beam picks out its column. |
| Process | Three stages (Freedom, Purpose, Legacy) on a sticky panel; the drawing swaps between temple, pouring goblets and oak tree as you scroll. |
| Who we serve | Audience cards. |
| Team | Founder in an arched frame with an engraved monogram, bio and credential chips, plus a second team member. |
| Getting started | Three steps. |
| Insights | Three article cards with photos. |
| Contact | City-at-dusk background, direct contact details and an introductory-call form. |
| Footer | Wordmark, links and a disclosures block to be replaced with the firm's own. |

## Re-skin

- **Copy & data**: `content/site.json` (brand, contact, navigation, footer, disclosures) and `content/home.json` (every section). Column positions for the discipline highlight are `disciplines.items[].x`, matching `COLUMNS` in `components/Art.js`. Each process stage picks its drawing with `image.etching` (`temple`, `cups` or `tree`) and its labels with `image.labels`.
- **Logo & art**: `components/Art.js` holds the wordmark, seal emblem, the three etchings and the monogram medallion; all use `currentColor` or palette tokens. Favicon: `app/icon.svg`.
- **Photos**: `public/images/` (credits in `public/images/CREDITS.md`).
- **Colour**: tokens at the top of `app/globals.css` (`--gold*` hold the copper accent, plus `--ink`, `--cream`, `--paper`).
- **Type**: `app/layout.js`.

## Accessibility & motion

`prefers-reduced-motion` stops the seal rotation, pointer follow, marquee and scroll-driven reveals. The discipline highlight works with keyboard focus as well as hover, and every drawing has a text alternative.

## Demo content

Lyceum Wealth Management, its people, articles, figures and address are fictional. The email uses the reserved `.example` domain and the phone numbers are placeholders. The footer disclosures are placeholders too: a real firm must replace them with its own regulatory wording, reviewed by its compliance team, before launch.
