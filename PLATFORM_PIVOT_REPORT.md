# KlinikIQ Platform Pivot v37

This version expands KlinikIQ from a TUS-only case simulator into a broader AI-powered medical learning workspace for both medical students and TUS candidates.

## Product changes

- Added first-login onboarding with first name, last name, education status, university, primary study goal, and default language.
- Added a personalized learning workspace above the existing TUS modules.
- Added study mode separation: medical school, TUS, clinical rotation, and general learning.
- Added upload metadata flow before processing PDF/PPTX files.
- Added local prototype data model for uploaded materials, generated lessons, generated questions, flashcards, and review sets.
- Added material-specific generated lesson workspace.
- Added GoodNotes-like 10-question carousel with one question visible at a time.
- Added selected-wrong-option + correct-option feedback display after answer submission.
- Added flashcard deck, favorite/difficult/repeat filters, and user-created card support.
- Added material-specific Review Center.
- Kept existing TUS Spot and AI TUS question features as dedicated modules.

## New files

- `src/components/OnboardingScreen.jsx`
- `src/components/LearningWorkspace.jsx`
- `src/data/learningPlatform.js`
- `src/utils/learningWorkspaceStorage.js`
- `api/material-ai-utils.js`
- `api/analyze-uploaded-material.js`
- `api/generate-lesson.js`
- `api/generate-material-questions.js`
- `api/generate-material-flashcards.js`
- `api/generate-tus-question.js`
- `api/validate-ai-output.js`

## Modified files

- `src/App.jsx`: connects onboarding and the new learning workspace to the existing app shell.
- `src/index.css`: adds responsive styles for onboarding, learning workspace, upload flow, lesson view, carousel, cards, and review center.

## Architecture notes

The current implementation is intentionally safe and prototype-friendly. User profile and learning workspace data are persisted in localStorage through the existing `localBackend` abstraction. The new API routes are server-side only and support future OpenAI integration without exposing API keys in the frontend. If `OPENAI_API_KEY` is missing, routes return safe local fallback structures.

## Required environment variables for AI routes

- `OPENAI_API_KEY`
- `OPENAI_MODEL` optional, defaults to `gpt-4o-mini`
- `AI_PROVIDER` optional for future provider switching

## Limitations

- Real PDF/PPTX text extraction is not implemented in this prototype because no PDF parser dependency was added.
- Figure extraction is represented as a structured placeholder ready for a later extractor.
- Generated lessons/questions/cards in the frontend use safe local prototype content until a full backend extraction + AI pipeline is connected.
- `npm install` could not complete in this environment because dependency installation timed out, so a full Vite build could not be run here.
