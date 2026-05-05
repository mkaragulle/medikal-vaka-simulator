# KlinikIQ V127 Clean Rebuild Notes

This version applies a final clean refinement layer after inspecting the exported HTML snapshot.

Key fixes:
- Replaced the corrupted orbit implementation with isolated `kiq-*` classes so older `kq-*`/`auth-orbit-*` CSS cannot interfere.
- Removed hard-edged hero glow/pseudo layers and rebuilt the glow as a soft radial aura inside the orbit stage.
- Fixed the left auth panel corner/clipping artifact by normalizing panel radius, overflow, pseudo-elements, and background layers.
- Kept the center shield fixed while orbit nodes rotate around it with counter-rotation to keep icons visually upright.
- Refined login card typography, inputs, buttons, Google action, demo CTA, and soft notice styling.
- Re-centered the dark-mode toggle geometry globally.
- Rebalanced dashboard navbar and the home hero/performance grid.
- Added reduced-motion-safe durations so desktop animation is not accidentally frozen unless the user explicitly reduces motion.

Validation performed:
- JSX syntax was checked with TypeScript transpilation.
- CSS parsing was checked with PostCSS.
