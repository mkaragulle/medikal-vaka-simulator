# AI Spot Hero Control Inset Fix

## Root cause
The AI Spot hero control cluster still inherited older alignment behavior from the previous action block. The action card was wider than the actual select/button column and the children could remain visually right-aligned inside that wider surface, producing a large empty left gutter in the `Konu / Branş` card.

## Fix
A final V179 CSS layer forces the control card to hug its content column:

- desktop card width reduced to `min(100%, 440px)`;
- the action card is a vertical flex column;
- all direct children stretch to the full card width;
- label, select and button row share the same left/right alignment;
- the button row remains a two-column grid on desktop and stacks on mobile.

## Files changed
- `src/index.css`
- `scripts/run-ai-spot-hero-inset-test.mjs`
- `package.json`

## Validation
Run:

```bash
npm run build
npm run qa:ai-spot-hero-inset
```
