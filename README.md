# Cross Out Subtraction

React single-page activity for take-away subtraction: learners cross out candies that Flexi “keeps,” leaving a remainder that should match `candies - candiesToKeep`. Vite builds static assets for GitHub Pages.

**Production:** [https://content-interactives.github.io/cross_out_subtraction/](https://content-interactives.github.io/cross_out_subtraction/)

---

## Stack

| Layer | Packages / tooling |
|--------|---------------------|
| UI | React 19 (`react`, `react-dom`) |
| Build | Vite 7, `@vitejs/plugin-react` |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer; component CSS (`Candies.css` animations) |
| Feedback | `canvas-confetti` on correct check |
| Lint | ESLint 9 (flat config), React Hooks / Refresh plugins |
| Deploy | `gh-pages` → `dist` |

`package.json` sets `"type": "module"`.

---

## Build and base path

`vite.config.js` sets `base: '/cross_out_subtraction/'` for GitHub Pages under the repo path. Adjust `base` if the app is hosted at a different URL prefix.

| Script | Command |
|--------|---------|
| Development | `npm run dev` |
| Production bundle | `npm run build` → `dist/` |
| Preview `dist` | `npm run preview` |
| Deploy | `npm run deploy` (`predeploy` runs `vite build`, then `gh-pages -d dist`) |

---

## Repository layout

| Path | Role |
|------|------|
| `index.html` | App shell; `#root` mount |
| `src/main.jsx` | `createRoot`, `StrictMode`, `index.css` |
| `src/App.jsx` | Renders `CrossOutSubtraction` |
| `src/components/CrossOutSubtraction.jsx` | Round parameters, `candiesLeft` bookkeeping, check/reset, audio |
| `src/components/Candies.jsx` | Per-candy SVG, `Set`-backed cross-out state, `onToggleDelta`, win pulse |
| `src/components/Candies.css` | e.g. `candy-pulse` keyframes |
| `src/components/ui/reused-ui/*` | Shared chrome (`Container`, buttons, etc.) |
| `src/index.css` | Tailwind entry |

---

## Application logic (summary)

- **Problem generation:** Each round picks `candies` uniformly from 6–12 inclusive, then `candiesToKeep` uniformly from 1 to `candies - 1`. Initial `candiesLeft` equals `candies` (count of candies **not** crossed out).
- **Cross-out model:** Toggling a candy updates a `Set` of crossed indices. Crossing out applies `onToggleDelta(-1)`; clearing a cross applies `+1`. So `candiesLeft` is the number of candies the learner is treating as “for you” (uncrossed). Pedagogy: cross out what Flexi keeps; remainder should be the share.
- **Verification:** `handleCheckAnswer` requires `candiesLeft === candies - candiesToKeep`. On success: confetti, mascot image swap, `winPulseId` increments (propagates to `Candies` to pulse **uncrossed** pieces), 3s timeout then `randomizeRound` (bumps `roundId` to remount `Candies`). On failure: confused mascot; check remains available until correct.
- **Candies UI:** Each `Candy` is inline SVG (wrapper + wings + stripes) with `useId()`-scoped defs to avoid ID collisions. `aria-pressed` reflects crossed state. `number` is clamped to 0..500. One random palette (from a fixed list) per `Candies` mount.

---

## Product integration

CK-12 and other embed targets: pending links tracked in-repo.

- **CK-12 Intent Response** — production / master: pending  
- **CK-12 Flexbooks** — book/lesson link: pending  

Upstream: [github.com/Content-Interactives/cross_out_subtraction](https://github.com/Content-Interactives/cross_out_subtraction).

---

## Educational alignment

Grade band, topic, and Common Core citations are in [`Standards.md`](Standards.md) (e.g. K.OA.A.1–A.3, 1.OA.C.6).
