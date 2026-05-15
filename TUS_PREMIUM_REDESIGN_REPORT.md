# KlinikIQ TUS Premium Dashboard Redesign

Updated areas:
- Rebuilt the TUS home dashboard visual structure in `src/components/HomeCommandCenter.jsx`.
- Added the requested premium glass/mint dashboard design language to `src/index.css`.
- Updated the shared top navigation in `src/App.jsx` with KlinikIQ wordmark, compact segmented controls, icons, and balanced action chips.
- Preserved existing TUS functionality, handlers, AI question generation flow, exam block action, branch navigation, scoring, and Komite mode.

Main design changes:
- Turkish copy throughout the TUS landing area.
- Centered max-width dashboard layout.
- Two-column hero card with brand/title/description/badges and action panel.
- Premium rounded navbar, mint/teal gradient buttons, subtle grid background, soft shadows, and responsive card structure.
- Redesigned learning/exam mode selector and four performance cards.

Validation:
- JS/JSX syntax checked with TypeScript parser for all source/API files.
- Full Vite build was not run because dependency installation timed out in the sandbox environment.
