# KlinikIQ V115 — AI Generated Question Layout Polish

## What changed
- The generated TUS question screen now uses the full available horizontal space instead of leaving a large blank area on the right.
- The answer options use a two-column desktop layout and collapse cleanly to one column on tablet/mobile.
- The question stem, options, actions and feedback areas are no longer capped by narrow `max-width` limits.
- The right-side support-data rail was simplified with softer cards, better spacing and clearer label/value rhythm.

## Label and typography cleanup
- Support group headings are normalized to title-case Turkish labels such as `Vital Bulgular`, `Laboratuvar Verileri`, `Görüntüleme` and `Yaşına Göre`.
- `TA`/tansiyon labels are displayed as `Kan Basıncı` in the UI while preserving correct medical units such as `mmHg`.
- Scientific labels such as `SpO₂`, `pH`, `CRP`, `WBC`, `EKG`, `USG`, `MR` and `BT` are preserved in proper format.

## Modified files
- `src/components/AISpotQuestionScreen.jsx`
- `src/index.css`
