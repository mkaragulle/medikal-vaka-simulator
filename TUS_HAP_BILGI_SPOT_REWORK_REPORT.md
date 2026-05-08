# KlinikIQ TUS Spot + Hap Bilgi Kartları Rework Raporu

## Kapsam

Bu paket, mevcut KlinikIQ ZIP projesi üzerine TUS öğrencisi geri bildirimlerine göre hızlı tekrar, spot bilgi, anahtar kelime ve çıkmış bilgi gösterimi altyapısını ekler. Bu turnda yalnızca KlinikIQ ZIP dosyası erişilebildi; ayrıca PDF dosyası görünmediği için PDF'ten yeni vaka/yıl çıkarımı yapılmadı ve hiçbir çıkmış yıl bilgisi uydurulmadı.

## Hap Bilgi Kartları

- Toplam eklenen kart: **500**
- AI soru üretimi için seed olarak açılan kart: **220**
- Çıkmış yıl bilgisi içeren yeni kart: **0**
- Not: PDF veya güvenilir yıl verisi olmadığı için tüm yeni kartlarda `appearedYears: []`, `appearanceCount: 0` bırakıldı.

### Branş dağılımı

| Branş | Kart sayısı |
|---|---:|
| Dahiliye | 60 |
| Çocuk Sağlığı ve Hastalıkları | 56 |
| Tıbbi Farmakoloji | 52 |
| Tıbbi Mikrobiyoloji | 44 |
| Tıbbi Patoloji | 44 |
| Tıbbi Biyokimya | 40 |
| Küçük Stajlar | 40 |
| Genel Cerrahi | 36 |
| TUS Spot Olgular / Karma | 36 |
| Kadın Hastalıkları ve Doğum | 32 |
| Anatomi | 20 |
| Fizyoloji | 20 |
| Histoloji ve Embriyoloji | 20 |

## Kart veri standardı

Kartlar `src/data/tusPearlCards.js` içinde oluşturuldu. Her kartta şu alanlar bulunur:

- `id`
- `branchId`
- `subject`
- `topic`
- `front`
- `back`
- `explanation`
- `keywords`
- `examTrap`
- `appearedYears`
- `appearanceCount`
- `sourceType`
- `isHighYield`
- `cardType`
- `difficulty`

Kartların ön yüzü aktif hatırlama sorusu, arka yüzü net cevap + kısa açıklama olarak tasarlandı. Kartlar genel TUS yüksek verim bilgisinden üretildi; bu turnda PDF dosyası erişilebilir olmadığı için PDF kaynaklı kart üretimi yapılmadı.

## UI yerleşimi

`BranchSelector.jsx` içine, klinik branş kartlarının üstüne **Hap Bilgi Kartları** bölümü eklendi. Bu bölümde:

- arama,
- branş filtresi,
- favoriler,
- yanlış yapılanlar,
- bilinenler,
- tekrar listesi,
- çıkmış bilgiler filtresi,
- kişisel katalog oluşturma,
- katalog içine kart ekleme/çıkarma

bulunur.

## LocalStorage yapısı

Kart ilerlemesi `klinikiq-pearl-card-progress-v1` anahtarıyla saklanır:

```js
{
  favoritePearlCardIds: [],
  wrongPearlCardIds: [],
  knownPearlCardIds: [],
  reviewPearlCardIds: [],
  customCatalogs: []
}
```

Yanlış işaretlenen kartlar otomatik tekrar listesine eklenir. Biliniyor olarak işaretlenen kartlar yanlış listesinden çıkarılır. Kataloglar localStorage'da hafif şekilde saklanır ve ileride kullanıcı hesabına bağlanabilecek yapıdadır.

## TUS işareti / belirteç kutusu

Yeni `src/utils/examMeta.js` ile vaka veya kart objelerindeki şu alanlar okunur:

- `appearedYears`
- `appearanceCount`
- `examMeta.appearedYears`
- `spotPearl`
- `keyWords` / `keywords`
- `examTrap`
- `sourceExamLabel`

`CasePlayer.jsx` içine soru başlığına yakın kompakt **TUS işareti** kutusu eklendi. `AnswerFeedbackPanel.jsx` içine TUS Spot modunda kısa feedback sinyal kutusu eklendi. Yıl bilgisi yoksa yıl badge'i gösterilmez.

## AI soru üretimi bağlantısı

`src/utils/aiQuestionGenerator.js` içine `TUS_PEARL_AI_SEEDS` eklendi. AI sistemi kartları birebir soru olarak kopyalamak yerine konu/anahtar bilgi seed'i olarak kullanacak şekilde genişletildi.

## PDF vaka entegrasyonu durumu

- İncelenen PDF içeriği: **0**
- TUS Spot Olguya dönüştürülen yeni PDF içeriği: **0**
- Klasik vakaya eklenen yeni PDF içeriği: **0**
- Elenen PDF içeriği: **0**
- Sebep: Bu turnda ZIP dosyası vardı, ancak ayrıca PDF dosyası erişilebilir değildi.

Mevcut ZIP içindeki vaka verileri korunmuştur; yeni PDF kaynaklı yıl veya çıkmış soru bilgisi uydurulmamıştır.

## Değiştirilen / eklenen dosyalar

- `src/data/tusPearlCards.js`
- `src/components/TusPearlCard.jsx`
- `src/components/TusPearlDeck.jsx`
- `src/components/tusPearlCards.css`
- `src/utils/pearlCardStorage.js`
- `src/utils/examMeta.js`
- `src/components/BranchSelector.jsx`
- `src/components/CasePlayer.jsx`
- `src/components/AnswerFeedbackPanel.jsx`
- `src/utils/aiQuestionGenerator.js`
- `TUS_HAP_BILGI_SPOT_REWORK_REPORT.md`

## Test / build sonucu

- `npm run build` başarıyla çalıştı.
- Bu çalışma ortamında tam `npm install` registry zaman aşımına takıldığı için build doğrulaması Vite/React bağımlılıkları ve geçici Firebase import stub'ı ile yapıldı. Kaynak kodda Firebase importları değiştirilmedi; normal ortamda `firebase` paketi package.json üzerinden kurulmaya devam eder.

## Çalıştırma komutları

```bash
npm install
npm run build
npm run dev
```
