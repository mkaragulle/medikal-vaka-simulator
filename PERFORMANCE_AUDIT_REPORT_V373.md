# KlinikIQ V373 Performance / Smoothness Audit

## Main cause of remaining lag after V372
V372 already reduced several local render costs, but the remaining stutter was mostly global: custom cursor, custom scrollbar, scroll-state CSS, and lazy screen loading were still active across the whole app. The biggest remaining risks were:

1. **Custom cursor global CSS matching**
   - The cursor runtime style still used a broad `body *` selector and scrollbar pseudo selectors to hide the native cursor.
   - This can increase style recalculation cost across a very large DOM.

2. **Cursor still updating during scroll/resize**
   - Even after RAF throttling, the cursor could keep handling pointer movement while the browser was already busy scrolling or recalculating layout.
   - This can appear as occasional mouse stutter.

3. **Custom scrollbar rescans**
   - The scrollbar MutationObserver treated almost every `childList` change as a reason to rescan scroll containers.
   - React list changes, modal mounts, dropdowns, glossary/tooltips and route transitions could trigger expensive DOM scanning.

4. **Duplicate scroll update path**
   - The custom scrollbar had both per-target scroll listeners and an additional global window scroll listener.
   - This could duplicate update work during page scroll.

5. **Too many forced GPU layers / delayed rendering**
   - Some previous performance CSS used broad `translateZ(0)` and `content-visibility:auto` on interactive cards/screens.
   - Too many composited layers can cause GPU memory pressure and micro-stutter; `content-visibility` on visible interactive UI can feel like late loading.

6. **Lazy chunks causing first-open delay**
   - Some heavy screens were lazy-loaded only when first opened. That keeps first load lighter but can make first navigation into TUS/KOMITE/Hap Bilgi feel delayed.

## V373 optimization direction
V373 is a deeper smoothness pass focused on reducing global per-frame and per-interaction cost rather than changing the UI design. It keeps custom cursor, custom scrollbar, glossary, TUS/KOMITE modes, cards, popups, and premium appearance intact.
