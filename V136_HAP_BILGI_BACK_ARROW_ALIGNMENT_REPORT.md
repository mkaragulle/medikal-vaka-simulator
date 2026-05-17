# V136 — Hap Bilgi Back Arrow Alignment Polish

- Replaced the text-based back arrow with a centered SVG arrow inside the icon capsule.
- Added a dedicated `pearl-study-return-v136` class so the fix only affects the Hap Bilgi Çalış header return button.
- Removed font-baseline drift by using inline-flex centering and SVG rotation instead of the `←` character.
- Preserved the existing compact/premium button styling, hover state, dark mode support, and scrollbar-free study layout.
- Build check: `npm run build` completed successfully after installing local dependencies for verification.
