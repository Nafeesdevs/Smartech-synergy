# Smartech Synergys — Landing Page

Static, single-page landing site built with **React 18 + Vite + Tailwind CSS 3 + Framer Motion + Lenis** (smooth scroll).

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build for production
```bash
npm run build      # outputs static files to /dist
npm run preview    # preview the build
```
Upload the contents of `dist/` to any static host (Netlify, Vercel, cPanel, GitHub Pages, S3). `base: './'` is set, so it also works from a sub-folder.

## Where to edit
- **All text / contact details** → `src/data/content.js`
- **Brand colours** → `tailwind.config.js` (`ink`, `sun` #F4BC21, `volt` #196BE4, `paper`)
- **Sections** → `src/components/*` (Hero, About, Problems, Services, Products, Process, Vision, Coverage, Contact/Footer)
- **Motion primitives** (kinetic letters, mask reveals, scroll-words, parallax, magnetic buttons, viewfinder brackets) → `src/components/Motion.jsx`

## Motion features
- Intro preloader: dot → orbiting dots → rotating square → wordmark
- Fixed viewfinder HUD with scroll-driven timecode & section counter
- Kinetic scattered-letter headlines, masked line reveals, scroll-linked word highlighting
- Interactive canvas dot-wave in the hero (reacts to the pointer)
- Scroll-velocity marquees that speed up and skew
- Pinned horizontal-scroll services track
- Scroll-drawn process path with a travelling dot
- Clip-path expanding Vision & Mission panel, parallax outline type, rotating ring text
- 3D tilt product tiles, radar coverage map, custom cursor
- Respects `prefers-reduced-motion`

## Notes
- The contact form opens the visitor's email app pre-filled (mailto) — no backend needed. Swap in Formspree/EmailJS if you want direct submissions.
- Fonts load from Google Fonts (Archivo, Manrope, JetBrains Mono).
- The logo is a recreated SVG/text wordmark; replace `Logo` in `src/components/Chrome.jsx` with the client's official logo file when available.
