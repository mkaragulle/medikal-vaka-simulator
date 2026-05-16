# KlinikIQ V114 — AI Generated Question Layout Redesign

## What changed
- The generated TUS question screen now uses the full available width more effectively.
- The answer options switch to a two-column desktop layout so the large empty right area is no longer wasted.
- The right-side support-data rail was simplified and visually cleaned.
- Support-data group titles and field labels are normalized for better typography and consistency.

## UI improvements
- Wider answer section and full-width question flow.
- Two-column answer option grid on desktop, one-column on tablet/mobile.
- Cleaner support-data cards for sections like Vital Bulgular and Laboratuvar Verileri.
- Better rhythm, spacing, and visual hierarchy in the right rail.

## Data-label normalization
- `TA` remains uppercase.
- Labels such as `Yaşına Göre` are normalized to proper title case.
- Common short labels such as `CRP`, `WBC`, `SpO₂`, `pH` are preserved in the correct scientific format.
- Group headings such as `Vital Bulgular`, `Laboratuvar Verileri`, `Fizik Muayene`, and `Görüntüleme` are cleaned automatically.

## Modified files
- `src/components/AISpotQuestionScreen.jsx`
- `src/index.css`
