# KlinikIQ OpenRouter JSON Repair Fix

## Problem
The OpenRouter endpoint authenticated correctly and returned a model response, but KlinikIQ returned fallback because the model output was not valid JSON:

`Unterminated string in JSON at position ...`

This means the API key and endpoint are working. The failure happened after the model response, during JSON parsing.

## Fix
- Added `getJsonCandidateFromText()` to reliably extract JSON from plain/fenced responses.
- Added a guarded OpenRouter JSON repair pass controlled by `OPENROUTER_REPAIR_JSON_ON_PARSE_ERROR=true`.
- Increased default `OPENROUTER_MAX_TOKENS` from 1600 to 3000 to reduce truncation.
- Added prompt constraints to keep all JSON fields shorter and avoid unescaped double quotes in JSON strings.
- Preserved existing schema/editorial validation and local fallback behavior.

## Recommended Vercel env

```txt
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=google/gemini-2.5-flash-lite
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_SITE_URL=https://medikal-vaka-simulator-yl76.vercel.app
OPENROUTER_APP_TITLE=KlinikIQ
OPENROUTER_MAX_TOKENS=3000
OPENROUTER_REPAIR_JSON_ON_PARSE_ERROR=true
OPENROUTER_REPAIR_MAX_TOKENS=3200
OPENROUTER_TEMPERATURE=0.72
OPENROUTER_TOP_P=0.9
OPENROUTER_USE_JSON_MODE=true
OPENROUTER_REASONING_ENABLED=false
OPENROUTER_REASONING_EXCLUDE=true
VITE_ENABLE_REAL_AI=true
VITE_AI_QUESTION_ENDPOINT=/api/generate-ai-question
VITE_AI_REQUEST_TIMEOUT_MS=90000
VITE_AI_REMOTE_RETRY_COUNT=1
```

## Build checks

```bash
node --check api/generate-ai-question.js
node --check src/services/aiQuestionService.js
```
