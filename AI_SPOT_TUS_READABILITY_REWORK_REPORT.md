# AI Spot TUS Readability Rework

## Summary
AI-generated TUS Spot questions now prioritize a real exam-bank reading experience. The left panel renders a concise narrative stem and, only when clinically useful, separates dense vital/lab values into compact data chips instead of forcing everything into one heavy paragraph.

## Key changes
- Added AI narrative normalization for broken spacing, pregnancy-week abbreviations, age phrases, truncated words, punctuation, unit formatting, and reference-range overload.
- Prevented automatic visible vital dumping; vitals are shown only when clinically relevant or abnormal.
- Added compact vital and compact objective data UI groups under the question stem.
- Increased remote stem preservation length to avoid truncating generated stems into ellipses.
- Updated OpenRouter/OpenAI prompt rules so `stem` is a real TUS-style question root, while `compactVitals`/`compactObjectiveData` can carry dense values.
- Kept answer choices and post-answer feedback on the right column.

## Quality checks
- NEC premature infant readability case: PASS.
- Microbiology organism-identification case: PASS, no unnecessary vitals.
- Emergency management case: PASS, clinically relevant vitals are shown as compact data.
- Production build: PASS.
