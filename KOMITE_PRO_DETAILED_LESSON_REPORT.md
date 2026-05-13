# KOMITE detailed lesson and reading UX update

## Changed files
- `api/prompts/generateLessonPrompt.js`
- `api/generate-lesson.js`
- `api/lib/komite-ai-common.js`
- `src/components/KomiteModeWorkspace.jsx`
- `src/index.css`

## What changed
- Lesson prompt now requests full medical-school teaching, not compact summary.
- Multi-file material no longer has a fixed section-count target; the AI decides the section count from the material structure and may generate a longer lesson when needed.
- Section teaching text no longer has a fixed word-count ceiling; explanations can expand as much as the material requires.
- Big picture target increased to 2-3 substantial paragraphs.
- High-yield and must-remember lists can grow for large material sets.
- Backend validation now rejects very short big-picture sections and too few sections for multi-file workspaces.
- Frontend validation now uses deeper thresholds and rejects under-expanded multi-file lessons.
- Lesson UI now has a professional long-form reading layout with hero metrics, sticky quick navigation, concept chips, large reading flow, section numbering, paragraph splitting, and clearer note cards.
- Removed duplicate rendering behavior where exam/common-mistake content was merged into teaching text and then shown again below.

## TUS mode
No TUS prompt, TUS screen, TUS case flow, or TUS question generation file was intentionally changed.

## Build note
`node --check` passed for edited server files. `npm run build` could not be completed in this environment because Vite dependencies were not installed and `npm install` timed out before completion. Run locally with `npm install --legacy-peer-deps --no-audit --no-fund` and then `npm run build`.
