# KlinikIQ V277 — Definitive Clinical Branch Profile/Option Layout Fix

## Scope
This update only changes responsive/layout CSS for the Klinik Branş Seç clinical case screen. No case content, option text, feedback text, diagnosis data, glossary data, or application logic was modified.

## Why V276 did not fully fix the issue
V276 placed the safety override mainly in `src/styles/klinikiq-refine.css`. In some Vite/CSS import orders, the large global `src/index.css` rules can still win later in the cascade. Therefore the same definitive layout constraints were added to both `src/index.css` and `src/styles/klinikiq-refine.css`.

## Fix 1 — PROFİL text breaking mid-word
The patient summary grid now uses responsive auto-fit columns instead of a fixed two-column layout:

`repeat(auto-fit, minmax(min(100%, 320px), 1fr))`

This prevents the profile card from becoming too narrow and causing Turkish words such as `acil` to appear as `ac / il`.

Additional safeguards:
- `word-break: normal`
- `overflow-wrap: normal` for the profile copy
- `hyphens: none`
- `line-break: auto`
- `min-width: 0` only where required for grid children
- one-column layout below 920px

## Fix 2 — Option radio circle covering option text
Answer option cards now use a hard three-column grid:

`42px minmax(0, 1fr) 34px`

This guarantees that:
- the option letter has its own fixed column,
- the option text has a safe flexible middle column,
- the radio/status icon has its own fixed right column,
- the text cannot flow underneath the radio circle.

The radio/status icon is forced back into normal grid flow with:
- `position: static`
- `inset: auto`
- `grid-column: 3`
- fixed width/height
- `pointer-events: none`

## Files changed
- `src/index.css`
- `src/styles/klinikiq-refine.css`

## Manual test targets
1. Klinik Branş Seç → any case with profile text such as `24 yaşında kadın hasta, acil serviste değerlendiriliyor.`
2. Confirm `acil` does not split as `ac / il`.
3. Long option text such as `Oral antibiyotik verilip poliklinik kontrolü önerilmesi`.
4. Confirm the right radio circle never overlays the option text.
5. Check selected / correct / wrong states remain aligned.
6. Check mobile widths around 390px, 520px, 768px, and desktop widths.
