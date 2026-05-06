# KlinikIQ Patient Summary + AI Action Alignment Fix

## Scope
- Cleaned patient summary cards so raw technical prefixes such as `Laboratuvar:`, `EKG paterni:`, `Başvuru yakınması:` are not rendered in the card UI.
- Prevented objective lab/imaging/tracing values such as `Lökosit 14.800/mm³ saptandı` from appearing in the patient summary cards.
- Updated AI-generated question patientIntro generation so evidenceChain items are no longer copied directly into `riskContext` and `distinctiveClues`.
- Re-aligned the AI practice branch selector and `Dashboard’a dön` / `Yeni AI sorusu üret` button group into a clean two-column desktop layout and single-column mobile layout.

## Changed files
- `src/components/CasePlayer.jsx`
- `src/components/AIGeneratedQuestionView.jsx` indirectly uses updated styling
- `src/utils/aiQuestionGenerator.js`
- `src/utils/validateAIQuestion.js`
- `src/styles/klinikiq-refine.css`

## Validation
- TypeScript JSX transpile validation passed for:
  - `src/components/CasePlayer.jsx`
  - `src/components/AIGeneratedQuestionView.jsx`
  - `src/utils/aiQuestionGenerator.js`
  - `src/utils/validateAIQuestion.js`
- Utility module imports passed for `aiQuestionGenerator.js` and `validateAIQuestion.js`.
- `npm install` timed out in the sandbox, so `npm run build` could not be completed here because Vite dependencies were not available locally.

## Local commands
```bash
npm install
npm run build
npm run dev
```
