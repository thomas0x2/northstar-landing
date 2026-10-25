# Northstar landing page

The Northstar one-page site, built with **Vite + React + TypeScript** on the Northstar design system (Spectrum Chrome).

## Run it

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # type-check and build to dist/
npm run preview   # serve the production build locally
```

`dist/` is a static site: deploy it to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Structure

- `index.html`: document head (title, meta, favicons, Google Fonts) and the React mount point.
- `src/content.ts`: all page copy in one place.
- `src/App.tsx`: home page composition.
- `thesis/index.html` + `src/thesis.tsx`: the Thesis page (`ThesisPage`), with vision and mission as its opening section, served at `/thesis/`. Its figures cite `thesisPage.sources` in `content.ts`. Each page is its own Vite entry in `vite.config.ts`.
- `src/components/`: `Hero`, `NavBar`, `Thesis`, `TestBand`, `Join`, `Footer`, `ThesisPage`, plus the building blocks `SpectrumField` and `Button`.
- `src/styles/tokens.css`: design tokens, mirroring `tokens.json` in the Northstar design system.
- `src/styles/global.css`: layout and component styles.
- `public/assets/`: images used by the page, favicons and the social image.
- `public/assets/brand/`: the full logo and visual set as SVG.

## Rules (from the design system)

- Backgrounds are black (`--ground`) by default. The only other surface is the spectrum field (`SpectrumField`, using `spectrum-field.svg`), for the hero and one band.
- White is only for text and the primary button. Spectrum colors never appear as UI accents.
- The logo is the sanded glass star; the chrome star is the hero visual only.
- Fonts: Oxanium Bold (display), Manrope (body).
- Headings (`h1`–`h3`) on black fill with the spectrum on hover (`spectrum-field.svg` clipped to the text), the same effect as the card numerals. Not on the spectrum field itself.
- White (primary) buttons on black fill with the spectrum on hover, with white text, instead of raising the glass sheet. On the spectrum field they keep the glass sheet.
- Cards on black turn to sanded glass on hover (the card surface itself, no sheet behind it), and their numeral and title fill with the spectrum.
- No shadows (box, text or drop). For depth or emphasis, use the sanded glass from the logo (`--glass-face`, `--glass-sheet`, `--grain`) or the spectrum field.

## Before launch

- Replace `[CONTACT EMAIL]` in `src/content.ts` with the real address and link.
- Set an absolute URL for `og:image` in `index.html` once the domain is known.
