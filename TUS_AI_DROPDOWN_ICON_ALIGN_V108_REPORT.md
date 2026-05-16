# KlinikIQ TUS AI Dropdown Icon Alignment V108

This patch fixes the visual alignment problem in the AI TUS question generation controls.

## Changes
- Added an explicit `ai-compact-dropdown-label` class to the dropdown label span.
- Added a stronger scoped CSS override for `.ai-compact-dropdown-trigger-icon`.
- Prevented generic `.ai-branch-filter-control span` label styles from leaking into the chevron icon wrapper.
- Centered the chevron SVG inside its circular background with fixed flex sizing, zero padding, and zero line-height.
- Preserved the open-state rotation and dark-theme styling.

## Result
The branch and difficulty dropdown arrows now sit optically centered inside their circular icon backgrounds.
