# Build / Test Result

- `node` ESM import checks passed.
- Embedded case field placement validation passed with 0 errors.
- AI generation field-placement smoke test produced 50 questions in two 25-question batches with 0 generation exceptions and 0 field-placement errors.
- `npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund` was attempted in the sandbox but timed out.
- `npm run build` could not complete in the sandbox because `vite` was not available before dependency installation completed.

Run locally:

```bash
npm install
npm run build
npm run dev
```
