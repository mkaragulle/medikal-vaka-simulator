# TUS Spot Set18 Integration Report

Baz paket: KlinikIQ_CLINICAL_CASES_V265_TUS_GLOSSARY_814_TERMS_QUALITY_PASS

## Özet

- Başlangıç toplam kayıt: 559
- Başlangıç TUS Spot Olgular kayıt sayısı: 169
- Set18 kaynak soru sayısı: 10
- Eklenen özgün soru sayısı: 9
- Eklenmeyen yüksek benzerlikli soru sayısı: 1
- Final toplam kayıt: 568
- Final TUS Spot Olgular kayıt sayısı: 178

## Eklenen ID'ler

- ai-spot-vakasiz-secki-181 — Karpal tünel içeriği
- ai-spot-vakasiz-secki-182 — Üçüncü faringeal poş türevleri
- ai-spot-vakasiz-secki-183 — MCAD eksikliği
- ai-spot-vakasiz-secki-184 — Arteriyel oksijen içeriği
- ai-spot-vakasiz-secki-186 — Klozapin ve agranülositoz
- ai-spot-vakasiz-secki-187 — Alfa-1 antitripsin eksikliği
- ai-spot-vakasiz-secki-188 — Distal renal tübüler asidoz
- ai-spot-vakasiz-secki-189 — Fallot tetralojisi bileşenleri
- ai-spot-vakasiz-secki-190 — Tedavi için gerekli hasta sayısı

## Eklenmeyen kayıtlar

- ai-spot-vakasiz-secki-185 — Staphylococcus aureus Protein A: Mevcut havuzdaki `ai-spot-vakasiz-secki-032-staphylococcus-aureus-protein-a-opsonizasyon` ile aynı öğrenme hedefi, aynı mekanizma ve aynı doğru cevap mantığını büyük ölçüde tekrar ettiği için eklenmedi.

## Uygulanan kontroller

- ID çakışması kontrol edildi.
- Branch/relatedBranch/spotCategory alanları normalize edildi.
- `Patoloji` ifadesi proje standardına uygun olarak `Tıbbi Patoloji` standardına çekildi.
- `title: ""` korundu.
- `answerFeedback`, `optionComparison`, `whyWrong`, `patientIntro`, `evidenceChain`, `examPearl`, `listTitle/cardTitle` alanları proje formatına tamamlandı.
- `cases.js` syntax kontrolü `node --check` ile başarılı.
