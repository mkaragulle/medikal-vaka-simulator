# TUS Spot Olgular Test / Build Result

## Static validation

- `src/data/cases.js` import: passed
- `src/data/branches.js` import: passed
- Total cases: 132
- Total branches: 13
- TUS Spot Olgular cases: 62
- Duplicate case ID: none
- Unknown branchId: none
- Spot schema validation: passed
- Eski kısa olgu modülüne ait görünür adlandırma ve legacy veri anahtarları: none found

## Build

`npm run build` could not complete in the sandbox because `node_modules` is not present and Vite is not installed in the isolated environment. `npm install --no-audit --no-fund` was attempted but timed out. Run locally with:

```bash
npm install
npm run build
npm run dev
```
