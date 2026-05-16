# KlinikIQ — Global Topbar Text Removal V112

## Applied changes
- Removed the visible user name text from the global topbar user chip.
- Removed the visible `Blok sınav` / `Demo blok` text from the timed block button.
- Kept icons, titles, and aria-labels intact for usability/accessibility.
- Added CSS overrides so both elements remain icon-only, centered, and aligned with the rest of the topbar capsules.

## Files changed
- `src/App.jsx`
- `src/index.css`

## Build note
- `npm run build` could not complete in this environment because `vite` is not installed in the extracted ZIP workspace.
