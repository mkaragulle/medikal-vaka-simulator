# KlinikIQ Answer Leakage Gate Build/Test Result

- `npm install`: PASS
- `npm run qa:answer-leakage`: PASS
  - Raw embedded cases scanned: 161
  - Raw cases with answer leakage: 135
  - Runtime repaired cases with answer leakage: 0
- `npm run qa:ai-answer-leakage`: PASS
  - AI candidate questions tested: 100
  - Passed: 100
  - Leakage failures: 0
  - Generation errors: 0
- `npm run build`: PASS
  - Vite transformed 91 modules and built successfully.

Commands:

```bash
npm install
npm run qa:answer-leakage
npm run qa:ai-answer-leakage
npm run build
npm run dev
```
