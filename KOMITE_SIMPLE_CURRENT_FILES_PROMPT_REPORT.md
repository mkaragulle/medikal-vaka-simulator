# KOMITE Simple Current-Files AI Fix

## What changed
- Replaced the previous long KOMITE prompt stack with short, neutral prompts.
- Removed topic-specific prompt wording and old hardcoded educational templates from the KOMITE flow.
- The AI request now sends only the current upload batch's extracted file text as the learning source.
- The source text sent to the AI no longer contains learner-visible metadata such as file names, file types, JSON keys, or extraction field labels.
- Frontend local fallback lesson/question/card generation is disabled for KOMITE AI actions. If the AI service fails, the UI shows an error instead of inventing a lesson from local templates.
- Lesson generation now expects one clean professional Turkish explanation based on the uploaded text.

## Runtime source flow
Current uploaded files -> filePackets text -> clean source text -> AI endpoint -> JSON lesson/questions/cards

## Validation performed here
- Node syntax check passed for API and prompt files.
- Checked edited KOMITE runtime/prompt files for previously hardcoded topic-bias terms; none were found.
- Full Vite build could not be run because dependencies are not installed in the extracted ZIP environment (`vite: not found`).
