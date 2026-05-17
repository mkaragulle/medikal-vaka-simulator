# V147 TUS Pearl Card Quality Audit

## Scope
- Reviewed and refined the generated output language for all 700 embedded Hap Bilgi cards.
- Kept the TUS AI question-generation prompt and flow unchanged.

## Improvements
- Reworked the keyword-card question generator to remove unnatural prompts such as “Aşağıdaki ipuçları hangi ... destekler”.
- Improved keyword-card answers so yes/no main answers are not reused in diagnosis/pattern cards.
- Cleaned repeated and artificial phrases such as “cevabı yönlendirir”, “üzerinden okunur”, and “hangi bilgi yanlış seçeneği dışlar”.
- Rewrote the child-abuse cards that produced the nonsensical “Hayır; ...” answer in a diagnostic cue card.
- Improved trap-card fronts to use clearer ayırıcı nokta / sınav tuzağı language.
- Preserved the total embedded card count: 700.

## Verification
- `TUS_PEARL_CARDS.length === 700`
- No empty front/back cards detected.
- `node --check src/data/tusPearlCards.js` passed.
- `npm run build` could not be completed because this ZIP does not include installed dependencies; `vite` was not available in `node_modules`.
