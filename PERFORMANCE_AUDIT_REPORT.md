# KlinikIQ V370 Performance Audit Report

## Scope
This audit focused on the user-visible lag points reported for KlinikIQ V370: navigation between UI boxes/screens, popup/dropdown opening, answer option selection, catalog/library card browsing, glossary tooltip behavior, custom cursor movement, custom scrollbar tracking, and scroll smoothness.

## Main bottlenecks found

1. **Global custom cursor overhead**
   - `src/components/PremiumCursor.jsx` was listening to multiple overlapping pointer/mouse events (`pointermove`, `mousemove`, `mouseover`, `pointerdown`, `mousedown`, `pointerup`, `mouseup`).
   - The cursor render loop kept scheduling `requestAnimationFrame` continuously after activation, even when the pointer had already settled.
   - Every pointer movement re-ran expensive target checks and theme resolution logic, including localStorage/theme lookups and selector checks.

2. **Custom scrollbar DOM scanning / update pressure**
   - `src/components/KlinikIQCustomScrollbars.jsx` scans scrollable DOM targets and updates scrollbar geometry globally.
   - Pointer movement could trigger active/update work too frequently.
   - Top-layer occlusion checks repeatedly queried tooltip/modal/popover layers and recalculated bounding rects during updates.
   - The MutationObserver watched broad body-level attribute changes, which can be expensive in a highly animated UI.

3. **Answer option selection re-render cost**
   - In `src/components/DiagnosisQuiz.jsx`, every answer option received the full `selected` value. When one option changed, all option rows saw a changed prop and re-rendered.
   - This is especially costly because each option can contain `GlossaryText` and medical text parsing.

4. **Catalog / library membership checks**
   - In `src/components/TusPearlStudyScreen.jsx`, active catalog membership was checked through array `.includes()` in filtering logic.
   - For larger card pools and repeated list/filter passes, Set-based lookup is more stable.

5. **Popup/dropdown positioning**
   - The catalog source dropdown repositioned directly on scroll/resize. This is safe functionally but can cause extra layout work during rapid viewport changes.

6. **Synchronous pearl-card storage writes**
   - `src/utils/pearlCardStorage.js` wrote the whole pearl state to localStorage synchronously during UI state updates. On larger catalog/card states, this can momentarily block the main thread.

7. **Heavy CSS effects during interaction**
   - The project already has a performance mode, but several frequently used surfaces still carry costly shadows, filters, transitions and containment needs during scroll/navigation.
   - `src/index.css` is very large and contains many premium visual effects. The safest optimization path is to reduce those costs only during scrolling/transition states, not permanently.

## Files reviewed directly

- `src/App.jsx`
- `src/components/DiagnosisQuiz.jsx`
- `src/components/TusPearlStudyScreen.jsx`
- `src/components/GlossaryTooltip.jsx`
- `src/components/PremiumCursor.jsx`
- `src/components/KlinikIQCustomScrollbars.jsx`
- `src/components/PerformanceOptimizer.jsx`
- `src/utils/pearlCardStorage.js`
- `src/index.css`
- `src/components/tusPearlCards.css`
- `src/data/cases.js`
- `src/data/tusPearlCards.js`
- glossary index files under `src/data/`

## Large file / bundle observations

- `src/data/cases.js` is approximately 6.6 MB.
- `src/index.css` is approximately 1.6 MB.
- `src/data/tusPearlCards.js` is approximately 0.7 MB.
- Several glossary index files are large.
- `vite.config.js` already contains manual chunk rules for React, Firebase, PDF, JSZip, case bank and pearl bank. Because App-level flows still depend on case data, a deeper lazy-data refactor would be higher risk and was not forced in this patch.

## Validation status

- Modified non-JSX / JSX files were syntax-checked with TypeScript `transpileModule` parsing:
  - `src/components/DiagnosisQuiz.jsx`
  - `src/components/TusPearlStudyScreen.jsx`
  - `src/components/PremiumCursor.jsx`
  - `src/components/KlinikIQCustomScrollbars.jsx`
  - `src/components/PerformanceOptimizer.jsx`
  - `src/utils/pearlCardStorage.js`
- `node --check` passed for the pure JS-compatible modified files after temporary `.mjs` checking.
- `npm install` was attempted multiple times but timed out in this sandbox before `node_modules` could be installed, so `npm run build` could not be completed here. The project should still be built locally/Vercel-side after dependency installation.
