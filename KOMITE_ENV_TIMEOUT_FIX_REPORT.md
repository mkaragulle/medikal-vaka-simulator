# KOMITE Environment and Timeout Fix

This update separates TUS and KOMITE AI configuration so long document-based KOMITE generation does not depend on the short TUS question-generation settings.

## Main changes

- Added separate server-side environment variables for TUS and KOMITE.
- KOMITE endpoints now read `KOMITE_OPENAI_MODEL`, `KOMITE_AI_TIMEOUT_MS`, and KOMITE-specific token/source limits first.
- TUS question generation now reads `TUS_OPENAI_MODEL`, `TUS_OPENAI_PER_REQUEST_TIMEOUT_MS`, and TUS-specific output limits first.
- KOMITE source text is still taken only from the current upload batch: `materialPacket.files[].cleanedExtractedText`.
- KOMITE source text is compacted from the beginning, middle, and end of each file instead of sending a huge raw block.
- KOMITE Vercel function duration is raised in `vercel.json`; TUS remains shorter.
- The prompt remains neutral and contains no topic-specific teaching terms.

## Recommended Vercel variables

Use a faster model for TUS and a stronger/larger-context model for KOMITE. Keep the same API key if preferred, but the variables are separated so each mode can be tuned independently.

```env
TUS_OPENAI_API_KEY=your_openai_api_key_here
TUS_OPENAI_MODEL=your_fast_question_model
TUS_OPENAI_PER_REQUEST_TIMEOUT_MS=25000
TUS_OPENAI_MAX_OUTPUT_TOKENS=1800

KOMITE_OPENAI_API_KEY=your_openai_api_key_here
KOMITE_OPENAI_MODEL=your_document_summary_model
KOMITE_AI_TIMEOUT_MS=240000
KOMITE_MAX_SOURCE_CHARS=16000
KOMITE_LESSON_MAX_OUTPUT_TOKENS=4800
KOMITE_QUESTIONS_MAX_SOURCE_CHARS=14000
KOMITE_QUESTIONS_MAX_OUTPUT_TOKENS=4200
KOMITE_FLASHCARDS_MAX_SOURCE_CHARS=12000
KOMITE_FLASHCARDS_MAX_OUTPUT_TOKENS=3200
```

After changing Vercel environment variables, redeploy the project.
