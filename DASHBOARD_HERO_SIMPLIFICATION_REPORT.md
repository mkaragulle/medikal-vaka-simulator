# KlinikIQ Dashboard Hero Simplification Report

## Scope
The main dashboard/hero screen was simplified to remove duplicated metrics and unnecessary feature chips. The left hero metric row is now the only numeric performance area, while the right panel now provides qualitative guidance and next-step recommendations.

## Removed chip/tag elements
- Klinik muhakeme
- Tetkik seçimi
- AI destekli pratik

## Repeated statistics resolution
The following metrics remain only in the left hero metric area:
- Çözülen olgu
- Klinik doğruluk
- Doğru seri
- Toplam puan

The right-side panel no longer mirrors these values. The previous right-panel items such as numeric doğruluk, toplam puan, doğru seri and blok were removed from the dashboard component.

## New right-panel function
The right panel keeps the title “Oturum performansı” but now acts as a guidance/insight panel. It provides:
- Qualitative session status
- Suggested study focus
- Mode-aware strategy note
- A concise next-step recommendation

The panel derives its tone from session progress and accuracy internally, but does not re-display the same numeric values already shown in the hero metric cards.

## UI updates
- Added `session-summary-v11` guidance panel styling.
- Added compact insight cards with soft medical surfaces and icon badges.
- Added a calmer next-step card.
- Preserved the existing soft mint/teal premium medical design language.
- Added responsive rules for tablet and mobile layouts.
- Added dark-mode overrides for the new guidance panel.

## Changed files
- `src/components/HomeCommandCenter.jsx`
- `src/App.jsx`
- `src/styles/klinikiq-refine.css`
- `DASHBOARD_HERO_SIMPLIFICATION_REPORT.md`
- `DASHBOARD_HERO_BUILD_VALIDATION_RESULT.md`

## Validation
- JSX parse/static validation passed using TypeScript parser:
  `tsc --jsx react-jsx --allowJs --checkJs false --noEmit --moduleResolution bundler --module ESNext --target ES2020 src/components/HomeCommandCenter.jsx src/App.jsx`
- CSS parse validation passed for:
  - `src/index.css`
  - `src/styles/klinikiq-refine.css`
- Search validation confirmed removed dashboard chip texts are no longer present in `HomeCommandCenter.jsx`.
- Search validation confirmed old right-panel metric structures are no longer present in `HomeCommandCenter.jsx`.

## Build note
`npm run build` could not be completed in this sandbox because dependencies were not installed and repeated `npm install` attempts timed out. The direct build failure was `vite: not found`. Run the commands below locally in the project folder.

## Run commands
```bash
npm install
npm run build
npm run dev
```
