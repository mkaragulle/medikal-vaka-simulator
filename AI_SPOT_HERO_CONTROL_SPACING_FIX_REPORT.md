# AI Spot Hero Control Spacing Fix

## Root cause
The right-side `Konu / Branş` cluster was visually too wide for its content and inherited an earlier roomy hero action layout. The control card used a 520px visual rhythm, 14px internal padding, label inline padding, and a large hero gap. This made the left side of the branch/action card feel empty and optically detached from the left hero text.

## Fix
- Reduced the desktop right hero column to a compact `472px` maximum.
- Reduced the hero gap so the right control block sits closer to the left hero content without crowding it.
- Tuned the control card padding from a roomy card feel to a compact control-panel feel.
- Removed label-side inline padding.
- Reduced select left inset while preserving right arrow clearance.
- Kept the dropdown and the action buttons on the same width system.
- Preserved mobile stacking and tablet behavior.

## Changed files
- `src/index.css`
- `scripts/run-ai-spot-hero-control-spacing-test.mjs`
- `package.json`

## QA commands
```bash
npm run build
npm run qa:ai-spot-hero-spacing
npm run qa:ai-spot-render-layout
```
