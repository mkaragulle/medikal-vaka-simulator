# Smart Glossary V270 Performance Fix Report

## Problem
After V269, KlinikIQ slowed down because glossary coverage was expanded across many case/question fields while the glossary engine still recalculated heavy term normalization and matcher preparation repeatedly during React renders.

The glossary data itself was valid; the slowdown came from render-time computation.

## Main causes found

1. `getGlossaryTerms()` rebuilt and normalized the 1000+ term glossary list on every `GlossaryText` usage.
2. `GlossaryText` defaulted `extraTerms` to a new empty array, which made memoization less effective.
3. `makeMatcher()` built a large cache key from the full term list and could still pay O(n) cost per wrapper.
4. Numeric lab/vital cells such as values and units were still sent through the full matcher path.
5. Many case/vaka fields now use `GlossaryText`, so small inefficiencies multiplied across the whole screen.

## Fixes applied

### 1. Cached normalized glossary terms
File: `src/utils/glossary.js`

- Added `STATIC_GLOSSARY_SOURCES`.
- Added `NORMALIZED_GLOSSARY_CACHE`.
- Added `buildNormalizedGlossary()`.
- Added LRU-style cache cap.
- `getGlossaryTerms()` now returns the same cached array for the global glossary instead of rebuilding it.

Result from Node import test:

- `getGlossaryTerms()` returns 1021 active terms.
- Repeated cached calls are now effectively near-zero cost.

### 2. Stable matcher cache
File: `src/components/GlossaryTooltip.jsx`

- Replaced heavy string-key matcher cache with `WeakMap` keyed by the glossary term array reference.
- Removed the repeated full-list cache-key generation cost.
- Matcher regex is prepared once per stable term set.

### 3. Split-result LRU cache
File: `src/components/GlossaryTooltip.jsx`

- Added `SPLIT_CACHE`.
- Repeated rendering of the same clinical text no longer rescans the large glossary regex.
- Cache is capped to prevent memory growth.

### 4. Numeric/non-text fast skip
File: `src/components/GlossaryTooltip.jsx`

- Added `isLikelyGlossaryCandidateText()`.
- Pure numeric lab/vital cells skip glossary matching immediately.

### 5. Disabled mode no longer computes terms
File: `src/components/GlossaryTooltip.jsx`

- If `enabled={false}`, `GlossaryText` no longer calls `getGlossaryTerms()`.
- This prevents hidden/hard-mode/exam-mode sections from paying glossary cost.

## Files changed

- `src/utils/glossary.js`
- `src/components/GlossaryTooltip.jsx`
- `SMART_GLOSSARY_V270_PERFORMANCE_FIX_REPORT.md`

## Preserved behavior

- 1021 glossary terms remain active.
- Turkish suffix-aware matching remains active.
- Nested tooltip behavior remains active.
- Pre-answer/post-answer answer leakage protection remains active.
- Portal-based tooltip rendering remains active.
- No glossary content was removed.

## Test notes

- `src/utils/glossary.js` passed Node syntax/import test.
- `getGlossaryTerms()` returned 1021 terms.
- Repeated cached term retrieval was verified to be fast.
- Full Vite build could not be completed in this environment because `npm install` timed out and `node_modules` was not available.

## Critical screens to test manually

1. Klinik Branş Seç → vaka/olgu screen
2. TUS Spot Olgular
3. Diğer Olgular card list
4. Zamanlı Sınav Oluştur
5. Tetkik paneli with many lab rows
6. Feedback panel after answer submission
7. Hap Kartlar
8. Komite modu lesson/question/flashcard outputs
9. Tooltip-inside-tooltip chain such as Graves → Ekzoftalmi → Glikozaminoglikan

