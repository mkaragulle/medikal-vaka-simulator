# V383 — AI TUS soru kalite ve sağ panel düzeltmesi

Bu sürüm, AI ile üretilen TUS sorularında görülen bozuk sağ veri paneli ve klinik olarak saçma değer problemini hedefler.

## Değişiklikler
- AI TUS sorularında sağ taraftaki destek/veri tablosu kapatıldı.
- Vital, laboratuvar, görüntüleme ve destekleyici bulgular artık soru köküne doğal cümleler halinde entegre ediliyor.
- Backend sanitize aşamasında `compactVitals` ve `compactObjectiveData` soru metnine taşınıp boş array olarak kaydediliyor.
- Frontend adapter da aynı güvenliği uyguluyor; eski/önbellekten gelen veri panelli sorular bile soru metnine entegre ediliyor.
- Prompt kalite kuralları sertleştirildi:
  - tüm branşlarda aynı yüksek kalite,
  - pediatride yaşa uygun ve fizyolojik değerler,
  - imkânsız ateş gibi değerlerin yasaklanması,
  - bozuk Türkçe/fragment veri yasakları,
  - sağ panel yerine tek akıcı paragraf kuralı.
- Backend kalite kapısına imkânsız klinik değer/bozuk ifade kontrolü eklendi.
- Prompt version `v36-integrated-stem-quality` olarak güncellendi; eski kötü cache/question-bank çıktılarından ayrışır.

## Not
Mevcut Vercel question bank/cache içinde daha önce üretilmiş hatalı sorular varsa, promptVersion değiştiği için yeni üretimlerde kullanılmaz. Yine de eski localStorage/cache temizliği testte faydalı olabilir.
