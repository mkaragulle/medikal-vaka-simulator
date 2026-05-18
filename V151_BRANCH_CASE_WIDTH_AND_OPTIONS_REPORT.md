# V151 Branch case workspace width and five-option update

- Clinical branch case detail pages were widened to align with the global topbar frame on desktop screens.
- The right answer/workspace column was widened and compacted so options have more horizontal room.
- Branch case answer options are normalized to exactly five options at runtime for embedded clinical cases.
- Existing TUS AI question generation prompt and AI generation flow were not changed.
- `TUS_PEARL_CARDS` content and performance logic were not changed.

Validation:
- `node --check src/data/cases.js` passed.
- Runtime import check confirmed all embedded clinical cases expose exactly five diagnosis options.
- `npm run build` could not be completed because the ZIP does not contain dependencies and `npm install` did not finish within the sandbox timeout.
