# KlinikIQ V373 Performance Audit Report

## Audit scope
The project was unpacked and inspected around the interaction paths that can create the strongest perceived lag: global cursor/scrollbar layers, scroll-state CSS flags, glossary parsing, answer submission/feedback rendering, and the `Kataloglarım > Tüm kartlardan ekle` card list. Medical/TUS data, answers, feedback content, glossary entries, case bank content, KOMİTE/TUS behavior and visual identity were not modified.

## Key findings

1. **Scroll class changes were indirectly waking global observers.** `PerformanceOptimizer` toggles `html.ki-is-scrolling` and `html.ki-route-transitioning` during normal scrolling/navigation. Both `PremiumCursor.jsx` and `KlinikIQCustomScrollbars.jsx` were observing `class` changes on `documentElement/body`, so every scroll-state class mutation could trigger theme recalculation, visual refresh, and in the scrollbar case a scan scheduling path.

2. **Custom scrollbar top-layer measurement was still relatively frequent.** The scrollbar overlay correctly avoids modal/tooltip overlap, but top-layer rect caching was short enough that repeated scroll/update frames could re-query and re-measure floating layers more often than necessary.

3. **Scroll-state timer churn could still occur on high-frequency scroll events.** The performance mode scroll listener was clearing and recreating a timer on each scroll event. This is small individually, but contributes to micro-stutter when combined with cursor, scrollbar, tooltip and dense CSS work.

4. **Answer submission still mounted heavy feedback immediately.** Even with `startTransition`, submitting an answer could synchronously move into heavy feedback UI, where glossary text and educational blocks are rendered together.

5. **GlossaryText memoization was shallow.** Many caller props are arrays or generated references. React's default `memo` comparator could still re-render glossary text even when the actual text and semantic glossary parameters did not change.

6. **Catalog card rows were inline in the large catalog/library lists.** V372 already limited visible library cards to 48, but row markup and handlers were still created inline inside the main `TusPearlStudyScreen` render. This made the large list more sensitive to unrelated parent state changes.

7. **Some V372 CSS layer-promotion rules could become counterproductive in dense lists.** `translateZ(0)`/layer-promotion helps some animations but can hurt smoothness when many card rows are visible. Dense list rows benefit more from containment and fewer promoted layers while scrolling.

## Bundle/build observations

- `src/data/cases.js` remains the largest static data file; content was not changed.
- `GlossaryTooltip` remains a large split chunk because it imports the glossary system; content was not reduced or removed.
- Existing manual chunking in `vite.config.js` is preserved.
- `npm install --no-audit --no-fund` completed successfully.
- `npm run build` completed successfully. Vite still reports large chunk warnings for the glossary and case-bank chunks, which is expected from the current data architecture and was not treated as a breaking build error.

## Risk control

This pass intentionally avoids deleting custom cursor/custom scrollbar/glossary systems. The changes focus on reducing unnecessary observer wakeups, batching scroll state work, delaying heavy feedback by one animation frame, memoizing stable glossary renders, and memoizing catalog rows. TUS/KOMİTE content, answers, explanations, branch logic, glossary entries and case data were left untouched.
