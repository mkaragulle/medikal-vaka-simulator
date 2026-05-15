# KlinikIQ V67 — Unified Topbar / First Card Spacing

Updated the authenticated page rhythm so TUS, Komite, clinical case, AI question, exam result and pearl-study shells share the same spacing between the global top bar and the first main content card.

## Changed
- Added a final CSS override in `src/styles/klinikiq-refine.css`.
- Used the TUS dashboard spacing as the reference.
- Removed competing top padding from Komite and clinical shells.
- Kept first content cards flush inside their page shell.

## Not changed
- No route, handler, scoring, AI, TUS, Komite, upload or review logic was changed.
