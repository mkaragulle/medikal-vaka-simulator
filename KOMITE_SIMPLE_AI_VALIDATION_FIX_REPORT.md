# KOMITE Simple AI / Validation Fix

This build removes the remaining hard lesson-validation failure path and keeps KOMITE generation simple:

- The lesson API no longer returns `Lesson validation failed` for otherwise usable AI output.
- Lesson, question, and flashcard validation results are returned as non-blocking warnings instead of hard 422 errors after retry.
- Current uploaded file text is sent to AI as plain extracted text only; no `=== DOSYA ... ===`, `[[FILE ...]]`, filenames, or technical field labels are prepended.
- The KOMITE prompts were simplified to neutral, source-only instructions with no topic-specific trigger words or examples.
- The frontend no longer stores merged extraction text with `[[FILE ...]]` labels.
- Runtime KOMITE frontend/API files were checked for hardcoded topic detectors such as ketone/porphyria/circadian/CLOCK/BMAL/Warburg; none remain in the KOMITE runtime path.

Core source flow:

current upload batch -> filePackets[].cleanedExtractedText -> plain source text -> AI -> normalized JSON -> UI
