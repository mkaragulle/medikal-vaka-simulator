# V150 TUS Pearl Cards Performance Optimization

- Optimized the 1000-card Hap Bilgi study deck opening path.
- Added cached normalized card metadata in `pearlDeckShuffle.js` to avoid repeated Turkish locale normalization during deck balancing.
- Reduced full 1000-card deck build time from approximately 4.1 seconds to approximately 0.15 seconds in Node verification.
- Optimized AI seed distractor preparation in `tusPearlCards.js` by precomputing option entries and branch pools.
- Preserved the total system card count at 1000 and the full deck uniqueness at 1000/1000.
- No changes were made to TUS AI question generation prompts or flow.

Verification:
- `node --check src/utils/pearlDeckShuffle.js` passed.
- `node --check src/data/tusPearlCards.js` passed.
- Runtime import/deck check passed: 1000 cards, 1000 deck items, 1000 unique deck items.
- `npm run build` could not be completed because the ZIP does not include installed dependencies and `vite` is not available.
