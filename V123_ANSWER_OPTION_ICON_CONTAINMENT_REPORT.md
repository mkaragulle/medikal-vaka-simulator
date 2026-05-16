# KlinikIQ V123 — Answer Option Icon Containment Fix

## Fixed
- The answer status icon on the right side of wrong/correct options no longer touches or visually exceeds the option card edge.
- Status icons are now absolutely positioned inside the option card with a fixed right inset.
- Option cards now reserve internal right padding for the status icon.
- The answer grid is clipped safely inside the AI TUS answer flow.
- The previous build regex fix and earlier V119–V122 UI changes are preserved.

## Files changed
- `src/index.css`
