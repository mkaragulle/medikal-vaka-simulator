# KlinikIQ V406 — AI TUS Prompt Optimization Report

## Scope
Updated the AI TUS question generation prompt and related live-generation flow to reduce prompt bloat, preserve clinical quality, strengthen anti-repeat behavior, and avoid returning reused questions as if they were fresh AI generations.

## Main changes

### 1) Lean system prompt
- Replaced the long defensive prompt with a shorter principle-based prompt.
- Removed long high-risk example lists and excessive term examples.
- Preserved the core quality goals: single best answer, clean Turkish, plausible same-category distractors, specific feedback, JSON stability.
- System prompt character count reduced from ~6255 to ~3416 characters.

### 2) Corrected stem-feedback lock
- Old logic implied every feedback/explanation fact must be in the stem.
- New logic distinguishes patient-specific decision data from general medical knowledge.
- Patient-specific facts must be visible before the options in `stem`, `compactVitals`, or `compactObjectiveData`.
- General medical knowledge is allowed in explanation and option feedback.

### 3) Restored structured clinical data panels
- The previous sanitizer integrated compact vitals/objective data into the stem and then cleared the data arrays.
- New logic preserves `compactVitals` and `compactObjectiveData` for UI readability.
- Validators now count these panels as visible pre-answer data.
- The prompt now tells the model to use panels only when they improve readability and not to place answer-leaking interpretation labels in them.

### 4) Stronger anti-repeat context
- `buildRecentCompact` now includes branch, target, correct answer text, stem fragment and option fragment.
- This gives the model enough context to avoid repeating the same topic, stem structure, answer and option set.

### 5) Stronger recent-match detection
- Added token-overlap similarity logic for stem, target and option-set comparisons.
- Exact semantic fingerprint matching remains active.
- This reduces repeated/near-duplicate questions even when IDs or learning-target wording differ.

### 6) Fresh-question behavior by default
- Question-bank reuse is now disabled by default.
- Durable output cache is also disabled by default.
- Both can still be enabled explicitly by environment flags/request settings when cost-saving or demo reuse is desired.
- New generation nonce is used to reduce accidental same-request dedupe/reuse.

### 7) Correct-answer balance kept soft
- Correct letter distribution remains a soft editorial target.
- Medically valid answers are not rejected only because they land in a different letter.

### 8) Schema and management consistency
- Prompt answerTarget list now includes values used by the code such as `management` and `emergency_approach`.
- Management steps are only requested for management/treatment-type targets.

## Modified files
- `api/tus-question-prompt.js`
- `api/generate-ai-question.js`

## Validation performed
- JavaScript syntax checks passed with `node --check` for both modified files.
- ES module import smoke test passed for both prompt and generation modules.
- Local fallback handler smoke test returned a valid JSON payload and preserved compact objective data.

## Notes
- Full Vite build was not run because dependencies are not installed in this sandbox and no package lock was included.
- The code-level changes are intentionally conservative outside the TUS AI generation path.
