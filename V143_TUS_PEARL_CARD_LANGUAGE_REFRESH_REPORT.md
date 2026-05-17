# V143 — TUS Hap Bilgi Card Language Refresh

- Reworked the embedded 700-card Hap Bilgi generation layer without changing the TUS AI question prompt.
- Removed repetitive `TUS’ta ...` front/back patterns from generated card faces.
- Replaced arrow-heavy keyword chains with complete Turkish medical sentences.
- Improved keyword cards into clearer `Anahtar patern` cards.
- Improved trap cards into clearer `Ayırıcı nokta` cards with safer, shorter front-face wording.
- Reduced repeated back-face sections by avoiding duplicated tip/note content across card variants.
- Added terminology polish for embedded card text and preserved the 700-card count.

Verification:
- `TUS_PEARL_CARDS.length === 700`
- No generated card text contains `TUS’ta` boilerplate.
- No generated card text contains arrow chains (`→`).
- `node --check` passed for the edited data/normalization files.
- Full `npm run build` could not be completed in this sandbox because project dependencies/Vite are not installed and `npm install` was terminated by timeout.
