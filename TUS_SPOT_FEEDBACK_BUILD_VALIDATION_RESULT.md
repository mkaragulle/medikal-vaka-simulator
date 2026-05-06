# TUS Spot Feedback Build / Validation Result

## Static data validation

Passed.

- `src/data/cases.js` imports successfully with Node ESM.
- Total cases: 132
- TUS Spot Olgular cases: 62
- All 62 spot cases have `diagnosis.answerFeedback.whyCorrect`.
- All 62 spot cases have non-empty `evidenceChain`, `clinicalPearls`, `managementSteps`.
- All wrong options in all 62 spot cases have explicit `whyWrong` and `differentialComparison` entries.
- Generic banned feedback phrases were scanned in TUS Spot data and no hits were found.

## npm / build check

- `npm install --prefer-offline --no-audit --no-fund --progress=false` was attempted, but the dependency installation timed out in this sandbox environment before `node_modules` could be created.
- `npm run build` was then attempted and failed because `vite` was not installed locally: `sh: 1: vite: not found`.

## Local run command

Run locally from the project root:

```bash
npm install
npm run build
npm run dev
```
