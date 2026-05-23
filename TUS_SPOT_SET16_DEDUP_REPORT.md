# TUS Spot Set16 Dedup & Integration Report

Baz alınan proje: KlinikIQ_CLINICAL_CASES_V260_TUS_SPOT_OTHER_CASE_TITLES_SHORT_FIX

## İşlem Özeti
- Başlangıç toplam kayıt: 545
- Başlangıç TUS Spot kayıt: 155
- Mevcut havuzdan %90+ benzer/tekrar kabul edilen kayıtlar kaldırıldı: 10
- Set16'dan eklenen yeni soru: 15
- Final toplam kayıt: 550
- Final TUS Spot kayıt: 160

## Kaldırılan yüksek benzerlikli kayıtlar
- ai-spot-vakasiz-secki-008-kawasaki-hastaligi-tani-olcutleri
- ai-spot-vakasiz-secki-011-clostridioides-difficile-toksin-b-etki-mekanizmasi
- ai-spot-vakasiz-secki-015-sinus-cavernosus-icerigi-ve-komsuluklari
- ai-spot-vakasiz-secki-016-amiloidoz-kongo-kirmizisi-ve-birefringens
- ai-spot-vakasiz-secki-019-ektopik-gebelikte-metotreksat-kontrendikasyonlari
- ai-spot-vakasiz-secki-022-dantrolen-ryanodin-reseptoru-mekanizmasi
- ai-spot-vakasiz-secki-041-n-asetilsistein-glutatyon-parasetamol-toksisitesi
- ai-spot-vakasiz-secki-048-kistik-fibrozis-cftr-klor-kanali-epitel-sivi-dengesi
- ai-spot-vakasiz-secki-062-cryptococcus-polysaccharide-kapsul
- ai-spot-vakasiz-secki-072

## Eklenen Set16 kayıtları
- ai-spot-vakasiz-secki-156
- ai-spot-vakasiz-secki-157
- ai-spot-vakasiz-secki-158
- ai-spot-vakasiz-secki-159
- ai-spot-vakasiz-secki-160
- ai-spot-vakasiz-secki-161
- ai-spot-vakasiz-secki-162
- ai-spot-vakasiz-secki-163
- ai-spot-vakasiz-secki-164
- ai-spot-vakasiz-secki-165
- ai-spot-vakasiz-secki-166
- ai-spot-vakasiz-secki-167
- ai-spot-vakasiz-secki-168
- ai-spot-vakasiz-secki-169
- ai-spot-vakasiz-secki-170

## Kalite Kontrolleri
- ID çakışması kontrol edildi.
- TUS Spot içinde `title: ""` korundu.
- Tüm yeni sorular 5 seçenekli ve tek doğru cevaplı şekilde dönüştürüldü.
- `diagnosis.answerFeedback`, `optionComparison`, `whyWrong`, `patientIntro`, `listTitle` ve `cardTitle` alanları proje formatına eklendi.
- `Patoloji` standardı `Tıbbi Patoloji` olarak normalize edildi.
- Boş yere kaldırmamak için SIADH, nöral krest, Charcot/Reynolds ve surfaktan-RDS gibi benzer ama farklı öğrenme hedefleri korunmuştur.
