# KlinikIQ V297 — Glossary Hover Intent Delay Report

## Summary
Glossary popovers no longer open immediately on incidental mouse hover. Desktop hover now uses a short intent delay, while click/tap and keyboard activation remain immediate or near-immediate.

## Timing
- Desktop hover open delay: 240 ms
- Nested hover open delay: 220 ms
- Close delay: 150 ms
- Keyboard focus open delay: 90 ms
- Click/tap open delay: 0 ms
- CSS motion duration: 140 ms

## Changed files
- `src/components/GlossaryTooltip.jsx`
- `src/index.css`

## Behavior
- Fast pointer passes over glossary terms cancel the open timer and do not show the popover.
- Holding on a term for the configured delay opens the popover.
- Click/tap opens immediately.
- Moving from a term into its tooltip cancels the close timer.
- Leaving both the term and popover starts a short close delay.
- Old open timers are cleared on leave, click, close, unmount, and entry changes to prevent stale tooltips.
- Nested glossary behavior and full educational content mode were preserved.

## Regression checklist
- Hover no longer opens instantly.
- Click/tap still opens immediately.
- Tooltip does not close while moving pointer into the popover.
- Fast movement across dense glossary text no longer creates pop-up bursts.
- Nested glossary and breadcrumb/drilldown behavior remain intact.
- Inline minimal glossary styling remains unchanged.
