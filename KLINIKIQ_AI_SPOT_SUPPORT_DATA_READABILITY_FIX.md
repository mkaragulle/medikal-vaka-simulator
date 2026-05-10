# KlinikIQ AI Spot Support Data Readability Fix

## Amaç
AI ile üretilen TUS spot sorularında sağ destek veri panelindeki maddelerin üç nokta ile kesilmesini ve aynı objektif verinin farklı satırlarda tekrar görünmesini engellemek.

## Yapılan değişiklikler
- `src/components/AISpotQuestionScreen.jsx`
  - Destek veri satırlarına uzunluk algısı eklendi.
  - Uzun label/value çiftleri için `is-long` sınıfı ve tam metin `title` desteği eklendi.
- `src/index.css`
  - Sağ paneldeki label ve value alanları artık ellipsis ile kırpılmıyor.
  - Uzun maddeler aynı kart içinde satır kırarak okunabilir kalıyor.
  - Sayfa hiyerarşisi, kart sistemi ve ana layout değiştirilmedi.
- `src/utils/aiSpotNarrative.js`
  - Compact destek verilerde semantik tekrar temizliği güçlendirildi.
  - Birleşik destek veri ifadeleri tek parametre/tek değer satırlarına ayrıştırılıyor.
  - Gereksiz statü kırıntıları ve üç nokta kalıntıları normalize ediliyor.
  - Aynı parametre-sonuç eşleşmesi birden fazla kez gösterilmiyor.
- `api/generate-ai-question.js`
  - AI promptuna destek veri üretimi için kısa, okunabilir, tek parametre/tek değer standardı eklendi.
  - `compactObjectiveData` içinde yorum, tekrar, uzun birleşik satır ve kırpılmış metin üretimi sınırlandı.
- `scripts/run-ai-spot-support-data-readability-test.mjs`
  - Sağ panel okunabilirliği ve destek veri tekrar kontrolü için QA testi eklendi.
- `package.json`
  - `npm run qa:ai-spot-support-data-readability` komutu eklendi.

## Test sonucu
- `npm run build` başarılı.
- `node scripts/run-ai-spot-support-data-readability-test.mjs` başarılı.
- `node scripts/run-ai-spot-duplicate-data-gate-test.mjs` başarılı.
- `node scripts/run-feedback-quality-standard-test.mjs` başarılı.
- `node scripts/run-ai-scientific-quality-regression-test.mjs` başarılı.
- `node scripts/run-pearl-active-recall-language-test.mjs` başarılı.

## Not
Bu düzenleme görsel tasarımı yeniden kurmaz; yalnızca mevcut sağ panel kartlarının içindeki metin davranışını ve AI veri normalizasyonunu güvenli hale getirir.
