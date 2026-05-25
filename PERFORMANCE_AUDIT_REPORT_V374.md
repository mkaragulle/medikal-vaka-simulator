# KlinikIQ V374 Native Cursor / Native Scrollbar Performance Audit

## User-reported issue
The interface still had occasional lag, delayed openings and mouse stutter after the previous smoothness passes. The remaining risk was not a single screen; it was the presence of global interaction layers that run across the entire app.

## Main finding
The custom cursor and custom scrollbar systems were still global runtime layers. Even when optimized, these systems can add overhead because they rely on pointer tracking, animation frame updates, DOM scanning, injected styles, observer logic and overlap calculations. On a content-heavy React/Vite app with large case data, glossary rendering, modals, dropdowns and card lists, those layers can amplify micro-stutters.

## Decision in V374
The project now returns to the browser's native cursor and native scrollbars. This is the safest and most direct fix for remaining mouse/scroll lag because it removes the global custom pointer and scroll overlay systems completely instead of trying to keep optimizing them.

## Files removed from runtime
- `src/components/PremiumCursor.jsx`
- `src/components/KlinikIQCustomScrollbars.jsx`

## Files changed
- `src/App.jsx`
  - Removed `PremiumCursor` import.
  - Removed `KlinikIQCustomScrollbars` import.
  - Removed both components from authenticated and unauthenticated app shells.

- `src/index.css`
  - Removed custom pointer CSS remnants.
  - Removed old custom cursor selector blocks.
  - Removed explicit custom scrollbar pseudo-element styling.
  - Removed scrollbar-specific properties such as custom width/color/gutter overrides.

- `src/components/tusPearlCards.css`
  - Removed explicit custom scrollbar styling blocks and scrollbar-specific properties.

- `src/styles/klinikiq-refine.css`
  - Removed explicit scrollbar pseudo-element styling and scrollbar-specific properties.

- `src/styles/klinikiq-dark-mode-system.css`
  - Removed explicit scrollbar pseudo-element styling and scrollbar-specific properties.

- `src/components/GlossaryTooltip.jsx`
  - Removed the `data-cursor="glossary"` attribute because it only existed for the old custom cursor integration.
  - Updated a non-runtime comment to remove stale scrollbar wording.

- `src/data/tusGlossaryV368MajorDiseaseJargonBatch8Index.js`
  - Removed a non-medical metadata example that referenced the old custom cursor system. Medical glossary content was not shortened or rewritten.

## Verification performed
- Searched source for removed runtime references:
  - `PremiumCursor`
  - `KlinikIQCustomScrollbars`
  - `ki-custom-scrollbar`
  - `premium-cursor`
  - `ki-pointer`
  - `ki-unified-cursor`
  - `::-webkit-scrollbar`
  - `scrollbar-width`
  - `scrollbar-color`
- Result: no active source references remain.

## Syntax check
A local Vite build could not be completed in the sandbox because `npm install` timed out. However, an ESBuild syntax/bundle parse check was run against `src/main.jsx` with external dependencies marked external, and it completed successfully.

## Expected UX effect
- Mouse movement should feel closer to native browser behavior.
- Scroll should no longer trigger the removed overlay scrollbar system.
- Popups, dropdowns and modals should have less global pointer/scroll overhead.
- The app keeps its existing visual design, TUS/KOMITE logic, glossary system, cases, questions and feedback data.
