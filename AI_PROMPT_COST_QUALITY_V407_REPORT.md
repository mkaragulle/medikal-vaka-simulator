# KlinikIQ V407 — AI TUS Prompt Cost + Quality Optimization Report

## Goal
Reduce the 20-question generation cost from roughly 11 cents toward ~3 cents without turning the prompt into a complex, brittle rule wall.

## Main changes

### 1) Prompt simplified again, not expanded
- System prompt reduced from ~3416 chars to ~2119 chars.
- User prompt reduced from ~569 chars to ~493 chars in a typical branch-only request.
- The long rule wall was replaced with one compact quality contract focused on the 12 observed issues.

### 2) Critical quality contract tightened
The prompt now directly emphasizes:
- The stem must solve the question alone.
- Feedback/explanation must not invent patient-specific facts later.
- Ambiguous/two-correct-answer questions must receive discriminating context or be rewritten.
- Option lengths must be balanced.
- Distractors must be plausible, not obviously absurd.
- Difficulty labels must be realistic.
- Feedback must be compact, option-specific and non-repetitive.
- Turkish medical terminology must be clean.
- Question types should vary.

### 3) Output token control
- Explanation capped conceptually at 2 sentences.
- A-E option feedback is instructed as one option-specific sentence each.
- evidenceChain is now instructed as 3 short visible clues instead of full explanatory sentences.
- examPearl is one short high-yield sentence.
- managementSteps are generated only for management-type questions.
- max output token fallback changed from 2400 to 1700 before profile caps.
- ultra TUS cap reduced to 1150 output tokens.

### 4) Cost defaults changed
- `TUS_REMOTE_AI_ATTEMPTS` default reduced from 3 to 1.
- `tusQuestionDetailMode()` no longer upgrades concise mode to standard.
- Default fast model changed to `gpt-5.4-mini` unless overridden by env.
- Prompt cache support remains available.
- Output cache and question bank remain opt-in, because fresh question quality matters.

### 5) Validator strengthened without making prompt complex
New quality checks added:
- Hidden patient-specific data in explanation/feedback.
- Correct option length leak.
- Too-weak emergency/treatment distractors.

Only hidden patient-specific feedback data is hard-blocked by default. Option-length and weak-distractor issues are quality notes to avoid expensive retries unless you explicitly raise strictness later.

### 6) Turkish medical language standardization added
Post-processing now normalizes common issues such as:
- `yonlendirme` → `yönlendirme`
- `life-threatening` → `yaşamı tehdit eden`
- `stemde` → `soru kökünde`
- `chemoreseptör/chemoreseptor` → `kemoreseptör`
- `cavernöz/cavernoz` → `kavernöz`
- `kranial` → `kraniyal`
- `tubul/tubulus` → `tübül`
- `diffus` → `diffüz`
- `infeksiyon` → `enfeksiyon`

## Files changed
- `api/tus-question-prompt.js`
- `api/generate-ai-question.js`
- `api/lib/ai-token-optimizer.js`

## Cost expectation
The exact cost depends on the model actually used in production and whether env variables override defaults. V407 reduces cost via four levers:
1. cheaper default fast model,
2. one remote attempt by default,
3. smaller prompt,
4. shorter output.

If production was accidentally using a large/flagship model, the model switch is the largest saving. If it was already using a mini model, the main savings come from output caps and one-attempt generation.

Recommended env for the target profile:
```env
KLINIKIQ_AI_COST_PROFILE=ultra
KLINIKIQ_FORCE_FAST_MODEL=true
TUS_OPENAI_FAST_MODEL=gpt-5.4-mini
TUS_REMOTE_AI_ATTEMPTS=1
TUS_AI_OUTPUT_DETAIL_MODE=concise
TUS_OPENAI_REASONING_EFFORT=low
TUS_OPENAI_VERBOSITY=low
TUS_OPENAI_MAX_OUTPUT_TOKENS=1150
KLINIKIQ_TUS_OUTPUT_CACHE=false
KLINIKIQ_AI_QUESTION_BANK=false
```

## Validation performed
- `node --check api/tus-question-prompt.js`
- `node --check api/generate-ai-question.js`
- `node --check api/lib/ai-token-optimizer.js`
- ES module import smoke test for prompt builder.
- Local fallback handler smoke test with `KLINIKIQ_LIVE_TUS_AI=false`.

A full Vite build was not run because the ZIP does not include installed `node_modules`.
