# KlinikIQ AI Soru Tekrarını Önleme Düzeltmesi

Bu güncelleme, AI ile soru üretiminde aynı veya çok benzer soruların tekrar tekrar görünmesine neden olan temel anti-repeat problemlerini düzeltir.

## Tespit edilen ana problem

Önceki yapıda gerçek AI tarafından üretilen sorularda `id` / `seedId` her üretimde değiştiği için tekrar imzasına dahil ediliyordu. Bu nedenle model aynı başlık, aynı doğru cevap, aynı senaryo ve aynı öğrenme hedefini yeniden üretse bile sistem bunu yeni bir soru gibi algılayabiliyordu.

## Yapılan düzeltmeler

1. `src/utils/aiQuestionHistory.js`
   - Tekrar imzası artık runtime/generated ID üzerinden değil, semantik içerik üzerinden hesaplanır.
   - İmza hesaplamasına başlık, stem, soru kökü, doğru cevap, öğrenme hedefi, seçenekler ve kanıt zinciri dahil edildi.
   - Ek olarak `topicSignature` eklendi. Böylece yalnızca birebir aynı soru değil, aynı konu + aynı doğru cevap paterni de yakalanır.
   - Yakın geçmiş kapasitesi artırıldı: daha uzun pratik oturumlarında eski sorular erken unutulmaz.
   - Eski `v2` localStorage geçmişi okunabilir durumda bırakıldı; temizleme fonksiyonu eski anahtarları da siler.

2. `src/utils/validateAIQuestion.js`
   - Gerçek AI sorularında `payload.id` artık `seedId` olarak kullanılmaz.
   - Aynı soru yeni ID alsa bile aynı imzayı üretir.
   - Validasyon artık hem `signature` hem de `topicSignature` üzerinden tekrar kontrolü yapar.

3. `src/services/aiQuestionService.js`
   - Gerçek AI aynı/benzer soru döndürürse kullanıcıya göstermeden yeniden deneme mantığı eklendi.
   - Varsayılan yeniden deneme sayısı: `VITE_AI_REMOTE_RETRY_COUNT=3`.
   - Tüm denemeler başarısız olursa local generator devreye girer; ancak local fallback de güncel geçmişe göre tekrar kontrolü yapar.

4. `api/generate-ai-question.js`
   - Prompt güçlendirildi.
   - Son üretilen başlıklar ve doğru cevaplar açık şekilde “yasak konu/doğru cevap listesi” olarak modele veriliyor.
   - Her istek için çeşitlilik anahtarı ve deneme numarası ekleniyor.
   - Modelden aynı hastalık, mekanizma, antidot, seroloji paterni veya doğru cevabı tekrar etmemesi isteniyor.

5. `src/utils/aiQuestionGenerator.js`
   - Local generator artık sadece ilk seçilen seed’e bağlı kalmıyor.
   - Seçilen soru validasyonda tekrar sayılırsa tüm aday havuzu dolaşılıyor ve ilk gerçekten yeni soru seçiliyor.

## Kontrol sonucu

- Değiştirilen JavaScript dosyaları için `node --check` syntax kontrolü yapıldı.
- Local generator üzerinde simülasyon yapıldı: 120 üretimde birebir aynı içerik imzası tekrar etmedi.
- Gerçek AI normalizasyon testi yapıldı: Aynı soru farklı `id` ile döndüğünde artık aynı imza üretiyor ve validasyon tarafından reddediliyor.

## Not

`node_modules` klasörü ZIP içinde olmadığı için tam `npm run build` çalıştırılmadı. Projede bağımlılıklar kurulu olan lokal ortamda aşağıdaki komutla final build kontrolü yapılmalıdır:

```bash
npm install
npm run build
```
