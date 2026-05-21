# V194 – Set 34-36 Unique Case Addition and Difficulty Tag Review

## Summary
- Source file: `/mnt/data/Pasted text(257).txt`
- Source records: 30
- Added unique records: 29
- Skipped duplicate records: 1
- Total embedded clinical cases: 334

## Duplicate skipped
- Genel Cerrahi — Ani bacak ağrısı ve soğukluk

## Applied rules
- Existing V193 clinical urgency review was preserved.
- New cases were added only if their title + question pair was not already present.
- `shuffleOptions: false` was preserved.
- Option order, correct answer mapping, option feedback, evidence chain, exam pearl, and clinical rationale were preserved.
- Difficulty labels were reviewed so that `Acil` is used only for true urgent/emergency decision scenarios.

## New case difficulty distribution
- Acil: 3
- Zor: 14
- Orta: 10
- Kolay: 2

## Total difficulty distribution
- Acil: 110
- Zor: 100
- Orta: 83
- Kolay: 41

## Total branch distribution
- Çocuk Sağlığı ve Hastalıkları: 51
- Tıbbi Biyokimya: 27
- Fizyoloji: 27
- Tıbbi Mikrobiyoloji: 27
- Anatomi: 26
- Histoloji ve Embriyoloji: 26
- İç Hastalıkları: 26
- Küçük Stajlar: 25
- Kadın Hastalıkları ve Doğum: 25
- Tıbbi Farmakoloji: 25
- Tıbbi Patoloji: 25
- Genel Cerrahi: 24

## Validation
- `node --check src/data/cases.js` passed.
- `node --check src/utils/scoring.js` passed.
- `node --check src/utils/tusLanguageStandard.js` passed.
- Custom raw/sanitized case validation passed.
- `npm run build` could not run because `vite` is not installed in the ZIP environment.
