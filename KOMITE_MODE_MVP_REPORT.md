# KlinikIQ KOMITE Mode MVP Report

## Summary
This build adds a separate KOMITE mode beside the preserved TUS mode. The TUS clinical case, TUS Spot, AI question, study/exam mode, and pearl-card flows were not removed. A top-level KOMITE/TUS switch was added to the navbar and persisted in localStorage.

## Main changes
- `src/App.jsx`: Adds product-level KOMITE/TUS mode switch and conditionally renders the KOMITE workspace without mixing it with TUS flows.
- `src/components/KomiteModeWorkspace.jsx`: New KOMITE MVP workspace with dashboard, material upload metadata flow, material tree, study workspace, 10-question carousel, flashcards, and material-specific review center.
- `src/index.css`: Adds responsive KOMITE mode visual system using the existing rounded, teal/mint, premium KlinikIQ language.
- `api/prompts/*`: Adds route-specific AI prompts for material analysis, lesson generation, material questions, flashcards, and validation.
- `api/lib/komite-ai-common.js`: Adds shared server-side JSON/body/OpenAI/validation helpers.
- `api/analyze-uploaded-material.js`, `api/generate-lesson.js`, `api/generate-material-questions.js`, `api/generate-material-flashcards.js`, `api/validate-ai-output.js`: Adds server-side route skeletons with validation gates.
- `.env.example`: Adds KOMITE-related server-side environment variables.

## Preserved TUS behavior
The existing TUS mode remains under the TUS switch. TUS mode still contains the previous home command center, branch selection, cases, block exam, TUS AI question flow, and pearl study flow.

## KOMITE MVP capabilities
- Four-card dashboard: Çalıştıklarım, Çalışmaya Başla, Hap Kartlar, Tekrar Merkezi.
- Çalışmaya Başla flow: class year, committee/course, learning target, optional university, file selection, optional pasted lecture text.
- UploadedMaterial metadata is saved locally per user.
- Çalıştıklarım tree groups materials by class year and committee/course.
- Material workspace includes lesson, figure notes, 10-question carousel, flashcards, and review.
- Questions store selected answers and show only selected wrong feedback plus correct feedback when wrong.
- Flashcards can be marked known/repeat/difficult/favorite.
- Review center is material-specific by default and can switch to all materials.

## AI route design
All KOMITE AI routes are server-side under `/api`. The frontend does not expose `OPENAI_API_KEY`. If the server-side API is configured, the workspace can call the route-level AI endpoints. If no key is available or a route fails, the UI falls back to a safe local MVP generator instead of breaking.

## Limitations
- Full PDF/PPTX/DOCX parsing and figure OCR are not implemented in this MVP. The UI supports file metadata and optional pasted text. TXT/MD files can be read client-side.
- Figure/table explanations do not pretend to analyze unavailable visuals.
- Advanced spaced repetition is represented as repeat/favorite/difficult status flags, not a full scheduling algorithm.

## Validation performed in this environment
- TypeScript transpilation syntax check for all `src/**/*.js(x)` files: passed.
- `node --check` for all `api/**/*.js` files: passed.
- CSS brace-balance check for `src/index.css`: passed.
- `npm run build`: could not complete here because `vite` is not installed in the extracted ZIP and `npm install` timed out in the sandbox. Run `npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund` and then `npm run build` locally or on Vercel.
