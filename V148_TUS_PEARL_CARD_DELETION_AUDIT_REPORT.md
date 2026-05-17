# V148 TUS Pearl Card Deletion Audit

## Scope
- Audited the embedded Hap Bilgi deck after the previous language-polish pass.
- Removed cards whose front/back structure was still too template-like, repetitive, or low-value for direct study.
- Kept the TUS AI question-generation prompt and TUS question flow unchanged.

## Main change
- Removed generated low-quality `Anahtar patern` and `Ayırıcı nokta` cards unless they were explicitly hand-authored exceptions.
- Preserved the stronger direct recall and short application cards.
- Resulting deck count: 360 cards.

## Quality gates added
The deck now filters out cards containing patterns such as:
- `Aşağıdaki ipuçları...`
- `Temel ipuçları...`
- `Ayırıcı patern...`
- `birlikteliği bu yanıtı destekler`
- `cevabı yönlendirir`
- `üzerinden okunur`
- nonsensical `Hayır; güçlü şüphede...` style answers

## Targeted fixes
- Replaced remaining arrow-style special tips with sentence-based scientific language.
- Expanded the too-short hyperkalemia calcium-gluconate answer so it explains membrane stabilization rather than only saying “Hayır.”

## Verification
- `node --check src/data/tusPearlCards.js` passed.
- Runtime import check passed.
- `TUS_PEARL_CARDS.length === 360`.
- `npm run build` could not complete because the ZIP does not include installed dependencies; `vite` was not available in `node_modules`.
