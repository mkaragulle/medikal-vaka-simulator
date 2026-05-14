# GPT-5.5 Stack Overflow Fix

## Fixed issue
A helper function in `api/lib/komite-ai-common.js` was accidentally calling itself with the same arguments. This caused `Maximum call stack size exceeded` before the OpenAI request could be completed.

## Change
The helper now performs a direct model-name compatibility check instead of recursive self-calling.

## Validation
- API JavaScript syntax check passed.
- Shared helper module imports successfully.
- The KOMITE runtime term scan used by the project returns no matches.

## Build note
A local Vite build could not be completed in this environment because the ZIP does not include `node_modules`. Run `npm install` and `npm run build` locally or on Vercel.
