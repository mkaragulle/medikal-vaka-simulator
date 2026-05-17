# V144 TUS Pearl Card Deep Language Polish

- 700 embedded Hap Bilgi cards were regenerated through the shared card builder without changing the TUS AI question generation prompt or flow.
- Removed the remaining repetitive card language such as `temel ipucu setidir`, `Yanıta giderken`, and `hatırlanır`-style fronts.
- Reworked keyword cards into active recall prompts based on actual clue patterns.
- Added varied phrasing for active recall tips, keyword backs, and differential/trap fronts to reduce template repetition.
- Improved terminology cleanup for `surfaktan`, `maymun eli`, `sıvılaşma nekrozu`, and abbreviated medical entity wording.
- Verified card count and core quality checks:
  - `TUS_PEARL_CARDS.length === 700`
  - Required front/back/explanation fields are present.
  - No `TUS’ta` boilerplate remains in card display fields.
  - No arrow-chain `→` remains in card display fields.
  - No old `temel ipucu setidir` or `Yanıta giderken` phrasing remains.

Validation:
- `node --check src/data/tusPearlCards.js` passed.
- Dynamic import of `TUS_PEARL_CARDS` passed and returned 700 cards.
- `npm run build` could not run in this ZIP environment because dependencies are not installed and `vite` is not available.
