# KlinikIQ V390 — AI TUS button hard center fix

Applied a final, last-imported CSS override for the AI TUS action buttons.

## Fixed areas
- `Yanıtı değerlendir` button inside AI-generated TUS question answer flow.
- `Yeni TUS Sorusu Üret` button inside the same answer flow.
- `Yeni TUS Sorusu Üret` CTA in the AI question generation header/ready state.

## Technical change
- Added `src/styles/ai-tus-button-center-hard-fix.css`.
- Imported it last in `src/App.jsx`, after `klinikiq-dark-mode-system.css`.
- Forced the affected buttons to use centered flex layout instead of earlier grid layouts.
- Neutralized previous `grid-template-columns`, `grid-auto-flow`, and gap rules that could pull the icon/text group away from the real center.
- Locked inner wrapper, icon, and text to exact vertical and horizontal centering.
