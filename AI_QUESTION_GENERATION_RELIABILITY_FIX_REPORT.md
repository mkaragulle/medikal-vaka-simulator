# KlinikIQ AI Soru Üretimi Stabilite Düzeltmesi

## Kök neden

“Soru üretilemedi” akışı tek bir hatadan değil, birkaç dar boğazın birleşiminden oluşuyordu:

1. Bazı branşlarda kullanılabilir seed havuzu dardı ve aynı branşta uzun süre üretim yapıldığında generator aynı birkaç seed etrafında dönüyordu.
2. `embedded-case-concept-only` kaynaklı seed’ler novelty skorunda avantajlıydı; bu nedenle gömülü vakalardan türeyen, kalite kontrolünde daha sık takılan adaylar gereğinden fazla deneniyordu.
3. Duplicate kontrolü aynı doğru cevap/seçenek seti/öğrenme hedefi kombinasyonlarında soru tipini yeterince ayırmadığı için farklı klinik açıları da tekrar gibi reddedebiliyordu.
4. History/localStorage tarafında son kayıt sayısı ve signature listesi gereğinden genişti. Topic/option signature gibi kaba izler exact signature listesine girdiği için eski üretimler yeni adayları gereğinden fazla baskılıyordu.
5. Retry akışı `candidates.length` kadar genişleyebildiği için bazı başarısız üretimlerde gereksiz uzun deneme zinciri oluşuyordu.
6. Local üretim zaten quality gate’ten geçtiği halde `validateAIQuestionCase` içinde ikinci kalite kontrolü tekrar çalışıyordu; bu da gereksiz reject ve maliyet yaratıyordu.

## Yapılan minimal düzeltmeler

- Seed çeşitliliği sanal varyantlarla artırıldı; mevcut veri şeması ve component yapısı korunarak seed başına kontrollü `variant` üretimi eklendi.
- Gömülü vaka konsept seed’leri doğrudan kopyaya yaklaşmaması için novelty skorunda geriye alındı.
- Duplicate fingerprint içine `questionType`/variant açısı dahil edildi.
- Duplicate threshold’ları exact signature için korunurken, semantik benzerlikte soru tipi ayrımı eklendi.
- Aynı hastalık fakat farklı soru tipi/klinik açı üreten adayların gereksiz reddedilmesi azaltıldı.
- History sınırları düşürüldü: son 150 kayıt, 240 signature, context varsayılanı 30 özet.
- History exact signature listesinde kaba topic/option signature saklanması kaldırıldı.
- Uzun geçmişte exact signature korunup semantik özet penceresi küçültüldü.
- Retry sayıları kullanıcı deneyimi için daha kontrollü hale getirildi: primary 8, repair 2, synthetic fallback 5.
- Retry sırasında farklı seed/variant/soru tipi/klinik açı seçimi güçlendirildi.
- Quality gate sonucu başarılı olan local adaylarda ikinci kalite kontrolü atlanabilir hale getirildi.
- Quality gate fallback cümlelerindeki şablon kokan ifadeler yumuşatıldı.
- Development-only debug log alanları genişletildi; kullanıcı UI’ına hiçbir debug bilgisi gösterilmiyor.

## Duplicate check ayarları

Korunan reject durumları:

- Exact `contentSignature` tekrarı
- Aynı soru kökü + aynı doğru cevap + aynı seçenek seti
- Gömülü vaka ile çok yakın örtüşme
- Yakın geçmişte aynı klinik senaryo ve aynı soru tipi

Gevşetilen durumlar:

- Aynı hastalık fakat farklı soru tipi
- Aynı doğru cevap fakat farklı klinik veri seti
- Aynı konu fakat farklı yönetim/tetkik/mekanizma açısı
- Aynı branş içinde farklı subtopic veya farklı learning target

## Quality gate ayarları

- Kritik bilimsel hata, branş uyumsuzluğu ve duplicate hâlâ reject sebebi.
- Küçük dil/şablon problemleri repair/autoclean tarafına yönlendirildi.
- Temel bilim sorularında tetkik yokluğu otomatik kilitleyici sebep haline getirilmedi.
- Local generator içinde quality gate başarılıysa validation içinde aynı ağır kalite kontrol ikinci kez çalıştırılmıyor.

## Retry / seed mutation / fallback

- Primary üretim: 8 deneme.
- Repair/seed mutation: kontrollü kısa deneme zinciri.
- Synthetic fallback: 5 deneme.
- Uzun geçmişte semantik history penceresi daraltılıyor, exact signature korunuyor.
- Synthetic fallback mevcut; 100 üretim testinde primary aşama yeterli olduğu için fallback kullanılmadı.

## 100 üretim test sonucu

`AI_QUESTION_GENERATION_RELIABILITY_100_TEST_REPORT.json` dosyasındaki son test sonucu:

- Toplam istek: 100
- Başarılı üretim: 100
- Error state: 0
- Duplicate aday reddi: 18
- Quality aday reddi: 9
- Toplam reddedilen aday: 27
- Repair kullanılan final soru: 0
- Fallback kullanılan final soru: 0
- Gömülü vaka birebir kopyası: 0
- Content signature tekrarı: 0
- Sadece şık sırası değişmiş tekrar: 0
- Branş uyumsuzluğu: 0
- Ortalama üretim süresi: 335 ms
- Maksimum üretim süresi: 3033 ms

## Değiştirilen dosyalar

- `src/utils/aiQuestionGenerator.js`
- `src/utils/questionDeduplication.js`
- `src/utils/aiQuestionHistory.js`
- `src/utils/validateAIQuestion.js`
- `src/utils/aiQuestionQualityGate.js`
- `src/services/aiQuestionService.js`
- `scripts/run-ai-generation-reliability-test.mjs`
- `AI_QUESTION_GENERATION_RELIABILITY_100_TEST_REPORT.json`
- `AI_QUESTION_GENERATION_RELIABILITY_FIX_REPORT.md`

## Build / test durumu

- Modified JS module syntax check: başarılı.
- 50 aynı branş üretim testi: başarılı.
- 50 dağıtılmış branş üretim testi: başarılı.
- 100 üretim raporu: başarılı.
- Sandbox ortamında `npm run build` çalıştırıldığında `vite: not found` hatası alındı çünkü ZIP içinde `node_modules` yoktu ve `npm install` paket indirme adımı bu ortamda zaman aşımına uğradı. Kod tarafında syntax check ve generator testleri tamamlandı; yerel makinede internet erişimiyle `npm install` sonrası build alınmalıdır.

## Çalıştırma komutları

```bash
npm install
npm run build
npm run dev
```

