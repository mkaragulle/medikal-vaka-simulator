# V441 Vercel Deploy Fix API Clean

Base ZIP: KlinikIQ_V441_DEPLOY_OUTPUT_SPLIT_FROM_V430(1).zip

Applied fixes:
- Moved non-endpoint helper files out of `/api`:
  - `api/lib` → `server/lib`
  - `api/prompts` → `server/prompts`
  - `api/tus-question-prompt.js` → `server/tus-question-prompt.js`
- Updated all API endpoint import paths to use `../server/...`.
- Kept `/api` limited to real Vercel endpoint files only.
- Set `package.json` dependency versions to exact values and Node engine to `>=20.19.0 <21`.
- Added Vercel SPA rewrite for non-API routes.
- Kept all API `maxDuration` values at 60 seconds.
- Rewrote `vite.config.js` manualChunks with normalized paths for Windows/Linux compatibility.
- Preserved V441 case splitting structure: `src/data/cases.part01.js` ... `cases.part20.js`.
- Added `.gitignore` to prevent `node_modules`, `dist`, and `.vercel` from being committed.

Important rule:
- `/api` must contain only externally callable Vercel endpoint files.
- Helper/prompt/shared backend code must stay under `server/`, `lib/`, or another non-API folder.
