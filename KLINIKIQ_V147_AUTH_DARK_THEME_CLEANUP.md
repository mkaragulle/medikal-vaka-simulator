# KlinikIQ V147 — Auth Dark Theme Cleanup

- Removed the bottom auth note from the login screen JSX.
- Added a hard CSS fallback that hides `.auth-minimal-note` everywhere on the auth screen.
- Fixed dark theme token inheritance for `.app-shell[data-theme="dark"]`.
- Reworked dark auth backgrounds, cards, text contrast, input states, feature cards, tabs, buttons, divider and theme toggle.
- Kept the existing orbital animation structure unchanged.
