# KOMITE Current Batch Source Isolation Cleanup

This update removes the remaining topic-biased KOMITE AI logic and makes the current upload batch the only AI source.

## Main changes

- Removed hardcoded KOMITE topic detectors and prewritten local lesson templates from `src/components/KomiteModeWorkspace.jsx`.
- Removed fallback behavior that could generate old metabolism, ketone, heme/porphyria, circadian, Warburg, or other profile-driven lessons.
- `buildCombinedMaterialPacket()` now builds the AI source packet from the current material's `filePackets` only when uploaded files exist.
- `material.extractedText` is no longer re-split or reused for uploaded-file workspaces, because it can contain merged/stale display text from older sessions.
- Pasted text is appended only for text-only workspaces with no uploaded files and no `filePackets`; it is not mixed into uploaded file batches.
- `combinedPacketToSourceText()` and server-side `sourceTextFromMaterialPacket()` now include only files with readable `cleanedExtractedText`/`text`.
- API endpoints now reject requests that do not contain readable current `materialPacket.files[]` text.
- Server endpoints no longer fall back to `body.extractedText`, `body.sourceTextChunks`, `body.text`, cached output, or old workspace content as a source of truth.

## Updated endpoints

- `api/generate-lesson.js`
- `api/analyze-uploaded-material.js`
- `api/generate-material-questions.js`
- `api/generate-material-flashcards.js`
- `api/lib/komite-ai-common.js`

## Source flow after fix

Current upload batch → `filePackets[].cleanedExtractedText` → `materialPacket.files[]` → server prompt source → AI lesson/questions/cards

## Verification

- Removed targeted hardcoded AI-manipulating topic terms from KOMITE runtime files.
- API syntax check passed for modified API/lib files.
- Frontend string-literal integrity check passed for `KomiteModeWorkspace.jsx`.

