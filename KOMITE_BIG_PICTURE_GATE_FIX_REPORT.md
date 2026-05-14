# KOMITE Big Picture Gate Fix

This package removes the user-facing hard error `Büyük resim yeterince açıklayıcı değil.` from KOMITE lesson generation.

## What changed

1. The frontend `qualityGateLesson()` no longer rejects a lesson because `bigPicture` is below an artificial character threshold.
2. Short or missing `bigPicture` is now normalized/enriched from the current lesson fields and the current active upload batch source text.
3. Lesson quality warnings are stored as `lesson.qualityWarnings` instead of blocking the user from receiving the AI lesson.
4. The API-side lesson validator no longer treats short `bigPicture`, short overview, low objective count, shallow section ratio, or template phrasing as hard rejection conditions.
5. `api/generate-lesson.js` now defines `sanitizeLessonOutput()` and guarantees a source-bound `bigPicture` fallback before validation.
6. Source isolation remains strict: lesson generation still uses only the current `materialPacket.files[].cleanedExtractedText` and the current source manifest.

## Important behavior

The app should now show the generated KOMITE lesson even if the AI returns a shorter `bigPicture`. The system may keep a non-blocking quality warning internally, but it should not display the old blocking error.
