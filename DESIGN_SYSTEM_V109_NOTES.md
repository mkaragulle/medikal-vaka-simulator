# KlinikIQ v109 — Layout and Design-System Standardization

## What changed

- Login screen gutters were reduced by widening the auth layout from the old narrow centered shell to a responsive max-width shell.
- The login brand card and auth form now align on the same vertical axis and use a more stable grid: wide brand panel + fixed-width form panel.
- A shared `ThemeToggle` component was added in `src/components/ui.jsx` and is now used by:
  - `AuthPanel.jsx`
  - `App.jsx` top navigation
  - `Header.jsx`
- Light/dark theme tokens were normalized at the end of `src/index.css` so the same accent, text, surface, border, button and focus colors are reused across screens.
- Button hover/focus behavior was normalized across auth, home and case screens.
- Input focus styling on the login form was softened so the old harsh highlight is replaced by the same subtle teal focus ring used globally.
- Demo access guard from v108 remains intact: demo users still only access the fixed 5-case demo pool.

## Files changed

- `src/components/ui.jsx`
- `src/components/AuthPanel.jsx`
- `src/components/Header.jsx`
- `src/App.jsx`
- `src/index.css`

## Validation

A TypeScript JSX parse check was run locally against all files in `src/` and passed. Full `npm run build` could not be completed in this environment because package installation timed out, but the JSX syntax was checked.
