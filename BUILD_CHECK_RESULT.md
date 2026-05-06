# Build / Validation Result

## Static content validation

Passed:
- `src/data/cases.js` imports successfully with Node ESM.
- 132 cases are readable.
- Active management sequences: 70.
- TUS Spot cases with disabled management panel: 62.
- Active management steps with repeated full case title: 0.
- Duplicate active management step sets: 0.
- Banned template leakage patterns in management/investigation/nextStep fields: 0.

## npm install / build

`npm install --no-audit --no-fund` and `npm install --ignore-scripts --no-audit --no-fund --omit=optional --prefer-offline` both timed out while fetching the dependency tree, before `node_modules` could be created.

`npm run build` was attempted afterward and failed because Vite was not installed in `node_modules`:

```txt
sh: 1: vite: not found
```

Recommended local commands:

```bash
npm install
npm run build
npm run dev
```
