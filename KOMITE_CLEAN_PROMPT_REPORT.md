# KOMITE clean prompt update

KOMITE AI prompt files were simplified. Current upload batch text is the only source sent to AI. Old session output, metadata, file labels, cached lesson text, and local template generation are not used.

Checked target files:
- src/components/KomiteModeWorkspace.jsx
- src/utils/komiteFileExtraction.js
- api/prompts/*.js
- api/lib/komite-ai-common.js
- api/generate-lesson.js
- api/analyze-uploaded-material.js
- api/generate-material-questions.js
- api/generate-material-flashcards.js

KOMITE runtime prompts are now neutral and source-only.
