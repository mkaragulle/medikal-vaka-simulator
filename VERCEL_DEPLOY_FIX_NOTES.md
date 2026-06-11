# KlinikIQ V419 Vercel Deploy Fix

Applied fixes:

- Moved non-endpoint helper code out of `/api` into `/server`.
- Kept `/api` limited to real Vercel endpoint files only.
- Updated API import paths from `./lib`, `./prompts`, and `./tus-question-prompt.js` to `../server/...`.
- Split `src/data/cases.js` into 30 smaller case-bank modules under `src/data/caseBank/`.
- Preserved raw case count: 1397.
- Updated `vite.config.js` to split case-bank and glossary output chunks.
- Set all Vercel function `maxDuration` values to 60 seconds.
- Added SPA rewrite to `vercel.json`.
- Added `.gitignore` entries for `node_modules/`, `dist/`, `.vercel/`, and `package-lock.json`.
