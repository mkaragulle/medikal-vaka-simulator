# Build and Test Result

## Completed

- `node --check` passed for modified JS modules.
- 50 same-branch local AI question generations completed without error state.
- 50 distributed-branch local AI question generations completed without error state.
- 100-question reliability report generated at `AI_QUESTION_GENERATION_RELIABILITY_100_TEST_REPORT.json`.

## 100-question result

- Requested: 100
- Generated: 100
- Error state: 0
- Duplicate rejected candidates: 18
- Quality rejected candidates: 9
- Total rejected candidates: 27
- Fallback used: 0
- Repeated content signatures: 0
- Option-order-only repeats: 0
- Embedded exact copies: 0
- Branch failures: 0

## Build note

`npm run build` could not complete in this sandbox because `vite` was not installed and `npm install` timed out while fetching dependencies. This ZIP does not include `node_modules`. Run the following locally:

```bash
npm install
npm run build
npm run dev
```
