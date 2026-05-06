# Exam Content Leakage Repair - Build / Validation Result

## Commands run

```bash
node --input-type=module -e "import('./src/data/cases.js').then(...)"
node --input-type=module < custom leakage validation script > EXAM_CONTENT_LEAKAGE_VALIDATION_RESULT.json
npm install
npm run build
```

## Result

- `src/data/cases.js` ESM import: **PASS**
- `cases.length`: **132**
- `getCaseById` / `getCasesByBranch` exports: **PASS**
- Correct answer missing from option list: **0**
- Top-level `question` / `diagnosis.question` mismatch: **0**
- Test-selection questions where the correct answer still appears verbatim in investigation results: **0**
- Investigation result phrases such as `tanıyı destekler`, `tanısını doğrular`, `... ile uyumludur`, `... lehinedir`: **0**

## Build note

`npm run build` could not be completed in this sandbox because the project dependencies were not present in the uploaded ZIP and `npm install` timed out while resolving/installing the large Firebase dependency tree. Before dependency installation, `npm run build` failed with `vite: not found`, which is expected when `node_modules` is absent.

The data module was validated directly through Node ESM import, and the custom content-leakage validation passed. On a local machine, run:

```bash
npm install
npm run build
npm run dev
```
