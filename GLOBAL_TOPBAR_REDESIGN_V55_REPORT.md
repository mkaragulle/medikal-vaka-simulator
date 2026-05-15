# KlinikIQ Global Top Bar Redesign V55

## Scope
- Rebuilt the authenticated global top bar structure in `src/App.jsx`.
- The same top bar now serves TUS, Komite, exam, AI question, review and study screens.
- Preserved all existing button handlers, route/state behavior, scoring, AI flow and Komite functionality.

## Main changes
- Removed the previous nested left-cluster structure that caused logo/text overlap.
- Made top bar children direct grid areas: brand, product switch, context switch, actions.
- Rebuilt the visual system with a fixed glass/mint navigation shell, equal-height controls and aligned icons.
- Standardized icon/button sizes across user, wrong count, score, timed block, theme and logout controls.
- Added responsive rules so the bar compresses safely without text collisions.
- Added dark-theme support for the new bar.

## Files changed
- `src/App.jsx`
- `src/styles/klinikiq-refine.css`
