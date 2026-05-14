# KOMITE Source Isolation and Stale Output Fix

## Problem fixed
Yeni çalışma alanı veya yeni dosya oluşturulmasına rağmen KOMITE modunda eski AI ders çıktılarının tekrar görünmesine neden olabilecek kaynaklar kapatıldı.

## Main changes
- Added a source fingerprint system for each KOMITE workspace.
- Every generated lesson, question set and flashcard deck is now stamped with the exact source fingerprint.
- Old/stale generated outputs are automatically cleared when they do not match the current material source.
- Existing localStorage outputs without a source fingerprint are treated as unsafe and regenerated instead of being displayed.
- Added source-isolation checks before saving AI-generated lessons, questions and flashcards.
- Added a guard against legacy metabolism/porphyria content leaking into unrelated uploads.
- Fixed false topic detection where “heme protein staining” in a lab-methods slide could incorrectly trigger hem synthesis/porphyria lessons.
- Added stricter prompts telling the AI to use only the current material packet and never reuse prior workspace output.
- Passed current material packets/source excerpts into question and flashcard generation prompts, not only the generated lesson.
- Added a lab-methods fallback lesson path for SDS-PAGE, Western blot, staining, ELISA, buffers, enzyme kinetics, pyruvate assay, protein degradation and Bradford-type materials.

## Files changed
- `src/components/KomiteModeWorkspace.jsx`
- `api/generate-lesson.js`
- `api/generate-material-questions.js`
- `api/generate-material-flashcards.js`
- `api/prompts/generateLessonPrompt.js`
- `api/prompts/generateMaterialQuestionsPrompt.js`
- `api/prompts/generateFlashcardsPrompt.js`

## Validation
- Parsed all `src` and `api` JS/JSX files with the TypeScript parser.
- Verified that the uploaded MBGE303L lab PPTX is classified as protein/lab detection content, not hem synthesis/porphyria content.

## Expected behavior after deployment
- A newly uploaded file cannot reuse a previous workspace's AI lesson.
- If an old cached output exists in the browser, the app clears it and asks for regeneration.
- “Heme protein staining” stays under lab detection methods and no longer creates a porphyria lesson.
