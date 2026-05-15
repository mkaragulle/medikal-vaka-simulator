# KlinikIQ V69 Text Clipping Safety Patch

This update fixes clipped Turkish letters and vertically cropped text in the global top bar, segmented controls, hero buttons, mode selector tabs, hero titles, and compact statistic values.

## What was changed
- Added a final CSS safety layer in `src/index.css`.
- Increased unsafe `line-height` values for interactive controls.
- Allowed visible overflow for top-bar text and control labels.
- Added small vertical padding to segmented-control buttons.
- Preserved all existing handlers, routes, TUS logic, Komite logic, AI logic, scoring, and storage behavior.

## Main affected areas
- Global top bar: Komite / TUS / Öğrenme / Sınav / Zor
- Komite top bar context tabs: Materyal / Ders / Kartlar
- TUS hero and Komite hero titles
- Hero CTA buttons
- Mode selector buttons
- Compact stat values
