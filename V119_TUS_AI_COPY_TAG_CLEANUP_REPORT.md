# V119 — TUS AI copy and score-tag cleanup

Changes applied:

1. Removed the small `1 soru / 19 p` meta tag from the `Yanıt seçenekleri` header inside the AI-generated TUS spot question flow.
2. Changed the AI spot narrative difficulty badge format from `Zor · 19p` to `Zor · 19 Puan`.
3. Replaced the fallback context copy from:
   `Çocuk Sağlığı ve Hastalıkları bağlamında tek köklü TUS spot sorusu.`
   to:
   `Çocuk Sağlığı ve Hastalıkları branşında bilimsel ve TUS uyumlu spot sorusu.`

Implementation notes:

- `DiagnosisQuiz` now supports a `hideQuestionScoreChip` prop.
- `AISpotQuestionScreen` passes `hideQuestionScoreChip` only for the AI spot question flow, preserving the regular quiz/exam UI behavior.
- `buildAISpotContextLine` now uses the requested more professional copy for generic spot questions.

Build note:

- `npm run build` could not be completed in this sandbox because dependencies are not installed (`vite: not found`, no `node_modules`).
