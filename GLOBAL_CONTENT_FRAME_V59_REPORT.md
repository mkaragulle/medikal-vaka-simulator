# KlinikIQ Global Content Frame V59

This update standardizes the authenticated application layout so TUS, Komite, clinical case solving, AI-generated TUS questions, exam/review pages, and pearl-card study screens use the same premium page boundaries.

## What changed

- Introduced shared global layout tokens:
  - `--kiq-global-max-width: 1760px`
  - `--kiq-global-gutter`
  - `--kiq-topbar-height`
  - `--kiq-topbar-gap`
- Matched the global top bar width with the main content frame.
- Expanded narrow Komite and AI question pages to the same global frame used by the TUS dashboard.
- Removed inconsistent page max-width behavior across authenticated screens.
- Standardized spacing under the top bar.
- Made Komite dashboard cards and hero area use the same broad, premium visual rhythm as the TUS dashboard.
- Preserved all functional logic: TUS flow, AI generation, scoring, Komite material flow, review hub, and study cards.

## Files changed

- `src/index.css`

## Notes

This is a UI-only CSS update. No React state, handlers, API calls, routing, scoring, generation, or storage logic was changed.
