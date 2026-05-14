# KOMITE abort / timeout fix

This update fixes the raw `This operation was aborted` failure in the KOMITE AI generation flow.

## Main changes

- Removed the extra pre-generation `analyze-uploaded-material` AI call from the frontend KOMITE action flow.
- KOMITE lesson/questions/cards now call only their own generation endpoint.
- Server-side AI source text is now capped per current material batch to avoid sending overly large prompts.
- Validation retry calls were removed so a weak JSON shape does not trigger a second OpenAI request and timeout.
- OpenAI AbortError is mapped to a clear Turkish timeout message instead of leaking the raw browser/server message.
- Vercel maxDuration was added for all KOMITE API endpoints.
- The current-batch source rule is preserved: only `materialPacket.files[].cleanedExtractedText` is used as AI source.

## Important behavior

If a document is very large, the API uses a bounded portion of the current uploaded file text to keep generation fast and stable. It does not use old sessions, old cached outputs, topic templates, or hardcoded medical concepts.
