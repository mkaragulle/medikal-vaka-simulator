# KlinikIQ Doublecheck QA Report

This package is GitHub-ready. Files are located at repository root, not inside an extra nested project folder.

## Critical fixes verified

- `src/data/cases.js` exports `cases`, `getCaseById`, and `getCasesByBranch`.
- Branch ID filters such as `internal-medicine`, `pediatrics`, `medical-biochemistry`, and `tus-spot-olgular` are recognized by the AI generator branch rules.
- `tus-spot-olgular` is treated as a mixed/random AI Spot entry point, so it no longer causes the generator to stall or reject valid cross-branch spot questions.
- Recent-title duplicate detection was added, so two generated questions with the same visible title are rejected during recent-history generation.
- Clinical field placement validation passes for all embedded cases.
- User-visible embedded case text has no remaining target bad patterns for inline labels, `wheezing`, invalid `veya` measurement usage, short `Lökosit 16`, or `Karar ... bilgisine dayanır` phrases.

## Local checks run in sandbox

- Imported `cases`, `getCaseById`, and `getCasesByBranch` successfully.
- Verified 132 embedded cases.
- Verified `getCasesByBranch('internal-medicine')` returns 19 cases.
- Ran clinical field placement validation: 0 errors.
- Ran visible text pattern scan across 20,655 strings: 0 target hits.
- Ran AI generation smoke test across every branch ID: 14/14 passed.
- Ran 20 sequential AI random generations with recent-history memory: 20/20 passed, 0 duplicate visible titles.

## Build status

`npm install` could not be completed inside the sandbox because dependency installation timed out while fetching the Firebase dependency tree. The project has a valid root `package.json`, `.npmrc`, `index.html`, `vite.config.js`, `src/`, `public/`, and `api/` structure. Run locally:

```bash
npm install
npm run build
npm run dev
```
