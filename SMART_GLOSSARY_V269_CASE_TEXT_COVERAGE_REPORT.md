# SMART GLOSSARY V269 — Case Text Coverage Pass

## Why this update was needed
The V268 glossary database loaded correctly, but the clinical branch cases, TUS Spot questions and investigation text still contained many terms that were not visibly linked. The main reasons were:

1. Some displayed case terms were written in inflected Turkish forms, for example `Sivri T dalgaları`, `QRS komplekslerinde genişleme`, `hiperkalemide`.
2. Some high-yield terms existed in the case text but were not in the curated glossary index yet.
3. Several case/question UI fields used very low `maxTerms` limits, so a long clinical sentence could show only one or two links.
4. Short acronyms could generate unsafe lowercase aliases, which could waste matching slots or create noisy matches.
5. The bottom `Diğer olgular` case cards did not render their case titles through `GlossaryText`.

## Files changed
- `src/data/tusGlossaryCaseDerivedIndex.js` — new case-derived curated TUS term layer.
- `src/utils/glossary.js` — imports the new layer, improves acronym handling, improves Turkish phrase variants and adds low-signal filters.
- `src/components/CaseList.jsx` — case card titles in `Diğer olgular` now use `GlossaryText`.
- `src/components/CasePlayer.jsx` — clinical story, profile and exam text now allow more safe glossary hits per block.
- `src/components/DiagnosisQuiz.jsx` — question stem/options now allow more safe glossary hits.
- `src/components/InvestigationPanel.jsx` — objective data, test names, result summaries and narrative lab/imaging cells now allow more safe glossary hits.
- `src/components/ManagementSequencePanel.jsx` — management step labels/rationales now allow more post-answer glossary hits.

## New glossary records
Added 153 curated case-derived records, selected from actual clinical branch/TUS Spot case text. These include emergency care, electrolytes, acid-base, renal, endocrine/metabolic, microbiology, pharmacology/toxicology, cardiology, pulmonary, hepatobiliary, OB/GYN, anatomy, embryology, pathology, hematology and statistics terms.

Examples:
- Anafilaksi
- İntramüsküler adrenalin
- Arter kan gazı
- Venöz kan gazı
- Serum potasyum
- Diyabetik ketoasidoz
- İdrar ketonu
- Anti-GBM hastalığı
- TTP
- Şistosit
- Staphylococcus aureus
- Listeria monocytogenes
- Asetilkolinesteraz
- Pralidoksim
- QRS komplekslerinde genişleme
- Sivri T dalgaları
- AST/ALT oranı
- Meckel divertikülü
- Ektopik gebelik
- Tiroglossal kanal kisti
- Nöral krest hücreleri
- Kongo kırmızısı
- Karıştırıcı değişken

## Leak prevention
All newly added terms have a neutral `preAnswerSafeDefinition`. TUS pearls and differential notes remain post-answer teaching content. This means pre-answer screens can show terminology meaning without directly revealing the diagnosis or treatment answer.

## Matching improvements
- Uppercase medical acronyms no longer automatically generate lowercase aliases.
- Turkish possessive/plural variants are generated for common noun phrases.
- Case-derived aliases were added for real UI phrases such as `Sivri T dalgaları`, `QRS komplekslerinde genişleme`, `anafilaktik reaksiyon`, `plazmaferez`, `artrosentez`.

## Critical screens to test
1. Klinik Branş Seç → standard vaka → Olgu sunumu / Hasta öyküsü
2. Klinik Branş Seç → Fizik Muayene ve Vital Bulgular
3. Klinik Branş Seç → Objektif Veri / Tetkik → selected test results
4. Klinik Branş Seç → right-column question stem and options
5. TUS Spot Olgular → pre-answer question/options
6. TUS Spot Olgular → post-answer feedback, evidence chain and option comparison
7. Diğer olgular horizontal card list
8. Zamanlı sınav mode, especially pre-answer leakage safety
9. Mobile tap behavior and nested tooltip behavior

## Expansion plan
Future term additions should go into `src/data/tusGlossaryCaseDerivedIndex.js` only if they are actually useful for TUS reasoning. Avoid everyday words and generic labels. Each new term must have a neutral pre-answer definition and a post-answer TUS/differential teaching note.
