# KlinikIQ V302 Dark Mode Specific Polish Report

## Scope
This patch addresses the remaining dark-mode issues reported after V301 without changing React state, data mapping, question logic, glossary matching, nested tooltip behavior, scoring, or routing.

## Fixed areas
1. **AI İle Soru Üret CTA icon**
   - Replaced the remaining visually dirty/light-looking icon surface with a dark elevated icon box, soft teal border, subtle radial highlight, and readable cyan icon color.

2. **Difficulty filter: Tümü / Kolay / Orta / Zor / Acil**
   - The legacy V191 difficulty pill layer used light pastel variables in dark mode. V302 re-declares semantic dark difficulty tokens for the filter container, inactive pills, active pills, hover state, and per-difficulty dots.

3. **15 Puan badge**
   - The amber points badge was too bright/yellow against the dark UI. V302 gives it a darker amber-soft background, controlled border, readable text, and consistent icon color.

4. **Glossary words global consistency**
   - Glossary terms inside popovers previously had a separate, more faded/filled style from normal inline terms. V302 forces one global dark-mode glossary style: transparent background, subtle dotted underline, readable teal text, and soft hover.

5. **Glossary popover block separation**
   - TUS ipucu and Ayırıcı not blocks are now visually separated with dark surface cards, soft borders, left accent bars, and distinct but controlled teal/amber labels.

## Files changed
- `src/styles/klinikiq-dark-mode-system.css`
- `reports/dark-mode-v302-specific-polish-report.md`

## Regression notes
- Functional code was not touched.
- All selectors are scoped to `html[data-theme="dark"]` and/or `.app-shell[data-theme="dark"]`, so light mode should not be affected.
- Existing glossary hover delay and nested popover behavior remain unchanged.
