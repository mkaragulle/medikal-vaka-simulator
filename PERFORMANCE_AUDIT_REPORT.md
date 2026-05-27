# KlinikIQ Performance Audit Report — V374 GitHub-Safe Extra Optimization

## Scope
This pass started from `KlinikIQ_V372_PERFORMANCE_SMOOTHNESS_LAG_OPTIMIZED(2).zip` and intentionally avoided medical/content changes. No clinical case data, answer keys, option feedback, glossary entries, TUS/Komite content, or scientific text was edited.

## Main bottlenecks observed

1. **Catalog / “Tüm kartlardan ekle” search precomputation**
   - The library screen prepared a full joined/lowercased search string for every Hap Bilgi card even when the search box was empty.
   - This created unnecessary CPU work during catalog opening and filter changes.

2. **Glossary text setup on low-value text blocks**
   - `GlossaryText` already had split caching, but it still resolved the full glossary term pool before checking whether the actual text was a likely glossary candidate.
   - Repeated short/plain labels could therefore pay unnecessary setup cost.

3. **Tooltip positioning re-renders**
   - Floating glossary tooltip positioning recalculated on open/resize frames and always called `setPosition`, even when the computed placement was effectively identical.

4. **Custom scrollbar style churn**
   - The custom scrollbar correctly used RAF-based updates, but each update wrote the same inline style values repeatedly to tracks/thumbs.
   - Candidate scanning still included generic `section`, increasing the number of DOM nodes considered on large screens.

5. **Custom cursor target checks**
   - Pointer movement repeatedly evaluated whether the pointer was over the custom scrollbar using `closest()` even when the DOM target had not changed.

6. **Global performance CSS selectors**
   - The V347/V372 performance block still contained broad `*` selectors during scroll/resize and a costly `[style*="filter"]` selector.
   - These can increase style recalculation cost exactly during the interactions where the UI should feel lightest.

7. **Deferred storage still stringified synchronously**
   - `localBackend.writeDeferred()` deferred the actual `localStorage.setItem`, but it still ran `JSON.stringify(value)` immediately during the user interaction.

8. **Answer submission priority**
   - Answer feedback and global App-level stats/solved/wrong-answer updates happened in the same high-priority interaction path.

## Optimization strategy

- Keep changes narrow, reversible, and GitHub-safe.
- Prefer lazy computation and fewer writes over structural rewrites.
- Keep custom cursor, custom scrollbar, glossary, premium UI, TUS mode, KOMİTE mode, and all data intact.
- Avoid adding new dependencies.
- Build-test after changes.

## Build result

`npm install --prefer-offline --no-audit --no-fund --progress=false --package-lock=false` completed successfully.

`npm run build` completed successfully.

Vite still reports large chunk warnings for `case-bank` and `GlossaryTooltip`. This is expected because the large case bank and glossary data were intentionally preserved and not shortened.
