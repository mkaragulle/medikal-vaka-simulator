# AI Spot Prompt Placement Fix

## Summary
The AI Spot question sentence is now rendered above the answer options instead of being appended inside the left narrative text. The left panel contains only the clinical vignette and support-data grid; the answer panel contains the single actionable question prompt directly above the choices.

## Changes
- Added `buildAISpotQuestionPrompt(question)` to extract the terminal question sentence from `question.question`, `diagnosis.question`, or the final question-like sentence in `stem`/`narrativeStem`.
- Updated `buildAISpotNarrativeStem(question)` to remove question-like sentences from the left narrative.
- Re-enabled the TUS Spot question callout in the right answer panel for AI Spot questions and passed the extracted prompt through `questionPromptOverride`.
- Updated the remote AI prompt contract so `stem` is vignette-only and `question` is the single prompt shown above choices.
- Updated render/readability QA scripts to assert that the left narrative contains no question mark while the prompt above options is present.

## Verified behavior
Example input ending with: “Bu hastada ilk yapılması gereken en uygun müdahale nedir?” is split as:
- Left narrative: clinical context only.
- Above options: “Bu hastada ilk yapılması gereken en uygun müdahale nedir?”

## Commands
- `npm run qa:ai-spot-render-layout`
- `npm run qa:ai-spot-readability`
- `npm run build`
