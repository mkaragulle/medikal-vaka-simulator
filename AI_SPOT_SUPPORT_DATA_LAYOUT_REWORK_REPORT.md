# AI Spot Support Data Layout Rework

## Summary
AI-generated TUS Spot questions now render the question stem once, as part of the left narrative text. The duplicate spot question callout in the answer column is hidden for AI Spot questions. Vital signs, serology, laboratory, microbiology, imaging, and objective data are mapped into compact support-data cards shown beside the narrative on desktop.

## UI changes
- Added an inner two-column narrative layout: main question text on the left, support data panel on the right.
- Moved compact clinical data out of the bottom area and into a side support panel.
- Kept the answer/options/feedback column intact.
- Removed the extra pre-answer footer copy from the AI Spot narrative card.
- On small screens, support cards stack below the narrative before the options panel.

## Rendering changes
- `DiagnosisQuiz` now supports `hideSpotQuestionCallout`.
- `AISpotQuestionScreen` passes `hideSpotQuestionCallout` so the question is not shown twice.
- Narrative splitting now appends the final question sentence to the paragraph instead of rendering it as a separate block.
- Semantic duplicate question prompts are avoided when `stem` already contains the question.

## Support data groups
The side panel can render:
- Vital bulgular
- Serolojik veriler
- Laboratuvar verileri
- Mikrobiyoloji verileri
- Görüntüleme
- Objektif veriler

## Data mapping
- Added extraction from narrative text for dense serology/lab/vital patterns.
- Dense serology/lab/vital fragments are removed from the narrative when the support panel has structured data.
- `compactObjectiveData` capacity increased to support larger panels such as hepatitis serology.

## QA
- `npm run qa:ai-spot-render-layout`: PASS
- `npm run qa:ai-spot-readability`: PASS
- `npm run build`: PASS
