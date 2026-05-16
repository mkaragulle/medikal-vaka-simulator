# KlinikIQ V124 — AI TUS Answer Options Redesign

## Changed
- Removed the problematic far-right answer status/radio icon column inside AI TUS answer options.
- Rebuilt option cards as a stable two-column layout: answer letter + content.
- Kept correct/wrong feedback visible through card color, letter state and status chip.
- Added stronger containment rules to prevent right-edge overflow.
- Preserved two-column desktop layout and safe one-column layout under 1100px.

## Files changed
- `src/index.css`
