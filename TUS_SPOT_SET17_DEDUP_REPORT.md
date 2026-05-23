# TUS Spot Set17 Entegrasyon Raporu

Baz paket: V261 (`KlinikIQ_CLINICAL_CASES_V261_TUS_SPOT_SET16_DEDUP_15_SORU_EKLENDI.zip`)

## İşlem Özeti

- Başlangıç toplam kayıt: 550
- Başlangıç TUS Spot kayıt: 160
- Gelen Set17 kayıt sayısı: 10
- Eklenen kayıt sayısı: 9
- Eklenmeyen kayıt sayısı: 1
- Final toplam kayıt: 559
- Final TUS Spot kayıt: 169

## Eklenen ID'ler

- ai-spot-vakasiz-secki-171
- ai-spot-vakasiz-secki-172
- ai-spot-vakasiz-secki-174
- ai-spot-vakasiz-secki-175
- ai-spot-vakasiz-secki-176
- ai-spot-vakasiz-secki-177
- ai-spot-vakasiz-secki-178
- ai-spot-vakasiz-secki-179
- ai-spot-vakasiz-secki-180

## Eklenmeyen / Tekrar Riski Nedeniyle Korunmayan ID'ler

- ai-spot-vakasiz-secki-173: Mevcut CPT-I / karnitin şantı / malonil-KoA sorusuyla aynı öğrenme hedefini büyük ölçüde tekrar ediyor.

## Notlar

- `title` alanı boş bırakıldı.
- Kart başlığı için `listTitle` ve `cardTitle` alanları korundu.
- `Patoloji` branch standardı gerektiğinde `Tıbbi Patoloji` olarak normalize edildi.
- Tüm eklenen sorularda `answerFeedback`, `optionComparison`, `whyWrong`, `patientIntro`, `evidenceChain` ve `examPearl` alanları proje formatına tamamlandı.
