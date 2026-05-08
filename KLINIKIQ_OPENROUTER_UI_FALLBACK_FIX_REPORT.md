# KlinikIQ OpenRouter UI Fallback Fix

## Root cause

The deployed `/api/generate-ai-question` endpoint was already working: repeated terminal tests returned `ok: true`, `provider: openrouter`, and stable response times around 4-5 seconds. The remaining problem was in the browser flow: after a few generated questions, the frontend sent localStorage history to the remote endpoint and then ran the returned remote question through the same strict client-side novelty/quality validation used for local synthetic questions. This caused some valid remote AI questions to be rejected client-side and downgraded to local fallback, which showed the warning: "Gerçek AI yanıtı alınamadığında... local soru generatorü devreye girdi."

## Minimal fix

- Kept the OpenRouter endpoint and multi-model fallback intact.
- Reduced the client-side history context used for AI generation from 24 to 12 recent questions.
- Added a smaller remote validation context for browser-side validation.
- Added `trustRemoteAi` / `skipSemanticNovelty` support to `validateAIQuestionCase` so server-validated remote questions are not rejected by overly broad client-side semantic duplicate checks.
- Kept structural validation, branch fit, and exact recent signature protection.
- Skipped the heavy client quality gate for remote questions because the server endpoint already performs schema/editorial validation before returning `ok: true`.
- Added development-only console logs under `[KlinikIQ AI]` so local dev can see whether a remote attempt was accepted, rejected, or exhausted.

## Changed files

- `src/services/aiQuestionService.js`
- `src/utils/validateAIQuestion.js`

## Recommended Vercel variables

```txt
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-...new_key...
OPENROUTER_MODEL=google/gemini-2.5-flash-lite
OPENROUTER_MODELS=google/gemini-2.5-flash-lite,openai/gpt-oss-120b:free
OPENROUTER_MAX_MODEL_ATTEMPTS=2
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_SITE_URL=https://medikal-vaka-simulator-yl76.vercel.app
OPENROUTER_APP_TITLE=KlinikIQ
OPENROUTER_MAX_TOKENS=2200
OPENROUTER_PER_MODEL_TIMEOUT_MS=24000
OPENROUTER_REPAIR_JSON_ON_PARSE_ERROR=true
OPENROUTER_REPAIR_MAX_TOKENS=2600
OPENROUTER_TEMPERATURE=0.55
OPENROUTER_TOP_P=0.85
OPENROUTER_USE_JSON_MODE=true
OPENROUTER_REASONING_ENABLED=false
OPENROUTER_REASONING_EXCLUDE=true
REMOTE_AI_ATTEMPTS=2
VITE_ENABLE_REAL_AI=true
VITE_AI_QUESTION_ENDPOINT=/api/generate-ai-question
VITE_AI_REQUEST_TIMEOUT_MS=90000
VITE_AI_REMOTE_RETRY_COUNT=2
```

## Validation performed

```bash
node --check api/generate-ai-question.js
node --check src/services/aiQuestionService.js
node --check src/utils/validateAIQuestion.js
```

