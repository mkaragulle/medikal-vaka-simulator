# V152 Embedded Clinical Case Rewrite

- Rewrote the embedded clinical case pool from scratch.
- Replaced legacy clinical case IDs with a clean `rewritten-*` case set.
- Preserved branch IDs and existing UI/data contract.
- Total embedded cases: 161.
- Every case now has exactly 5 answer options.
- Added consistent clinical stem, objective clue set, question type, answer feedback, evidence chain, distractor explanations, and next-step text.
- Kept TUS AI question generation prompt and AI generation flow unchanged.
- `node --check src/data/cases.js` passed.
- Runtime import validation confirmed all cases load and every case contains 5 options.
- `npm run build` could not run because Vite dependencies were not available in the ZIP and `npm install` timed out in the sandbox.
