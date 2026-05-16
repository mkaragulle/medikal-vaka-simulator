# KlinikIQ — TUS AI Dropdown Theme Refresh V105

## Scope
Refined the **AI ile soru üret** control area inside the TUS side so the **Konu/Branş** and **Zorluk** selectors match the site theme and feel more compact.

## What changed
- Replaced the browser-native `<select>` dropdowns in `src/components/AIGeneratedQuestionView.jsx` with a themed custom dropdown component.
- Preserved the existing generation logic and manual trigger flow.
- Added compact, premium popover styling with better spacing, hover, active and disabled states.
- Added dark-theme support for the new dropdown menu.
- Kept labels and current selection visible while making long branch names truncate cleanly.

## Files changed
- `src/components/AIGeneratedQuestionView.jsx`
- `src/index.css`

## UX result
- The dropdown menus now open as compact in-app panels instead of the default system menu.
- The options visually align with the KlinikIQ turquoise premium theme.
- The selected option is highlighted with a check icon.
