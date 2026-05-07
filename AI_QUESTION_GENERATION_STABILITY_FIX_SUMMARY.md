# KlinikIQ AI Soru Üretim Stabilite Düzeltmesi

## Kök neden

"Soru üretilemedi" hatası, gerçek bir tekil hatadan değil, üretim hattındaki üç mekanizmanın aynı anda daralmasından kaynaklanıyordu:

1. Aynı branşta birkaç başarılı üretimden sonra generator aynı sınırlı seed kümesine geri dönüyordu.
2. Content signature ve similarity kontrolü aynı `stem + doğru cevap + seçenek seti` kombinasyonlarını doğru şekilde reddediyordu; ancak stem mutation yetersiz olduğu için sistem yeni açı üretmek yerine aynı şablonu tekrar deniyordu.
3. Gömülü vakadan türetilen concept seed'lerde `titleExact + stemSimilarity` eşiği fazla katıydı. Bu nedenle gömülü vakanın kopyası olmayan, farklı soru açısına çevrilebilecek adaylar da erken reddediliyordu.

Sonuç olarak primary, repair ve synthetic fallback denemeleri aynı dar içerik ekseninde dolaşıyor; tüm adaylar duplicate olarak reddedildikten sonra UI hata ekranına düşüyordu.

## Minimal değişikliklerle yapılan düzeltmeler

- Seed mutation güçlendirildi. Aynı seed kullanılsa bile soru açısı, klinik odak cümlesi ve varyant ipucu değişiyor.
- Seçenek seti yalnızca şık sırası değiştirilerek farklı gösterilmiyor; gerektiğinde güvenli branş fallback çeldiricilerinden biri kontrollü şekilde dahil ediliyor.
- Concept-derived seed'lerde gömülü vaka overlap eşiği dengelendi. Aynı başlık tek başına reject nedeni olmaktan çıkarıldı; stem, doğru cevap ve öğrenme hedefi birlikte değerlendiriliyor.
- History/localStorage etkisi sınırlandı. Çok eski signature'lar üretimi sonsuza kadar kilitlemesin diye son geçmiş daha güçlü, eski geçmiş daha zayıf değerlendiriliyor.
- Son aşama olarak relaxed-history mutation yolu eklendi. Bu yol duplicate kontrolünü kaldırmaz; sadece çok eski geçmişin kilitleyici etkisini azaltır.
- Development debug metadata güçlendirildi. Başarılı üretilen sorunun `aiMeta` alanında kaç adayın reddedildiği, reddedilme nedenleri, repair/fallback bilgisi tutuluyor.

## Duplicate check ayarı

Korunan kontroller:

- Exact contentSignature tekrarları reddediliyor.
- Aynı soru kökü + aynı doğru cevap + aynı seçenek seti reddediliyor.
- Gömülü vakayla çok yüksek benzerlik reddediliyor.
- Sadece şık sırası değiştirilmiş sorular duplicate kabul ediliyor.

Dengelenen kontroller:

- Aynı hastalık veya aynı doğru cevap tek başına reject nedeni değil.
- Aynı seed, farklı soru açısı ve farklı stem ile kullanılabiliyor.
- Concept seed'lerde aynı başlık, ancak farklı soru açısı varsa otomatik reject edilmiyor.

## Quality gate ayarı

- Bilimsel kalite ve Türkçe editoryal kalite kontrolleri korunmuştur.
- Quality gate küçük dil/format sorunlarında repair yolunu kullanır.
- Duplicate hatalarında seed mutation ve relaxed-history yolu denenir.
- Temel bilim sorularında gereksiz sahte tetkik kartı üretimi önceki düzeltmelerle korunmuştur.

## 100 soru testi

- Toplam test: 100
- Aynı branşta üretim: 50
- Farklı branşlara dağıtılmış üretim: 50
- Başarılı üretim: 100/100
- Error state: 0
- Unique contentSignature: 100
- Signature tekrarı: 0
- Sadece şık sırası değişmiş tekrar: 0
- Çok benzer tekrar: 0
- Duplicate olarak reddedilen aday: 15
- Repair yolu kullanılan üretim: 30
- Fallback kullanılan üretim: 0
- Ortalama üretim süresi: 1305 ms

Ayrıntılı rapor: `AI_QUESTION_GENERATION_100_RELIABILITY_REPORT.json`

## Build/test sonucu

- JS syntax kontrolleri geçti.
- AI generator smoke test geçti.
- 100 soru reliability testi geçti.
- `npm install` sandbox ortamında süre sınırına takıldığı için `npm run build` bu ortamda tamamlanamadı. ZIP içinde `node_modules` bulunmadığından gözlenen build hatası `vite: not found` olur.

## Çalıştırma komutları

```bash
npm install
npm run build
npm run dev
```
