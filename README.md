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
- `src/App.tsx`: page composition.
- `src/components/`: `Hero`, `NavBar`, `Thesis`, `TestBand`, `Join`, `Footer`, plus the building blocks `SpectrumField` and `Button`.
- `src/styles/tokens.css`: design tokens, mirroring `tokens.json` in the Northstar design system.
- `src/styles/global.css`: layout and component styles.
- `public/assets/`: images used by the page, favicons and the social image.
- `public/assets/brand/`: the full logo and visual set as SVG.

## Rules (from the design system)

- Backgrounds are black (`--ground`) by default. The only other surface is the spectrum field (`SpectrumField`, using `spectrum-field.svg`), for the hero and one band.
- White is only for text and the primary button. Spectrum colors never appear as UI accents.
- The logo is the sanded glass star; the chrome star is the hero visual only.
- Fonts: Oxanium Bold (display), Manrope (body).

## Before launch

- Replace `[CONTACT EMAIL]` in `src/content.ts` with the real address and link.
- Set an absolute URL for `og:image` in `index.html` once the domain is known.
