# KlinikIQ — Global Glossary Inline Flow Fix

## Problem
`GlossaryText` formerly rendered a React fragment with separate text and glossary-term spans. In card areas where the parent paragraph was styled as `display: grid` or `display: flex`, each fragment child could become a separate layout item. This caused sentences to split into rows around glossary words such as “stabilizasyon”.

## Fix
`GlossaryText` now always returns a single `.glossary-text-flow` wrapper. The glossary term spans and plain text spans remain inside that wrapper, so the parent layout sees one child and the sentence keeps normal inline flow.

## Visual result
- Glossary words no longer force row breaks.
- Feedback/management cards keep their intended title/body rhythm without splitting the body sentence.
- Tooltips still work on glossary terms.
- Highlight/background strip styling remains disabled from the previous visual-emphasis pass.

## Files changed
- `src/components/GlossaryTooltip.jsx`
- `src/index.css`
- `scripts/run-glossary-inline-flow-test.mjs`
- `package.json`
