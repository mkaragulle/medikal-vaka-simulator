# KlinikIQ — AI ile Soru Üret Özelliği

## Kısa açıklama
Ana dashboard hero alanına `AI ile Soru Üret` CTA butonu eklendi. Buton, kullanıcıyı mevcut TUS Spot Olgular çözüm deneyimiyle uyumlu yeni bir AI pratik ekranına yönlendirir.

## Akış
1. Kullanıcı dashboard üzerinden `AI ile Soru Üret` butonuna tıklar.
2. Kısa loading state gösterilir.
3. Local mock AI generator, TUS odaklı spot soru üretir.
4. Kullanıcı seçeneklerden birini seçer ve yanıtı değerlendirir.
5. Cevap sonrası Klinik gerekçe, Kanıt zinciri, Sınav notu ve seçenek karşılaştırmaları mevcut feedback paneli üzerinden gösterilir.
6. `Yeni AI sorusu üret` butonu ile yeni soru alınabilir.

## Mimari
- Gerçek AI API entegrasyonu henüz yoktur.
- `src/services/aiQuestionService.js` ileride API çağrısına dönüştürülebilecek izole servis katmanı olarak tasarlandı.
- `src/utils/aiQuestionGenerator.js` güvenli fallback/local mock generator görevi görür.
- `src/data/aiQuestionSeeds.js` bilimsel olarak kontrol edilmiş seed havuzudur.

## Kalite mantığı
- Tetkik sonuçları tanıyı doğrudan yazmaz; objektif veri olarak sunulur.
- Şıklar aynı kategori içinde tutulur ve en az iki güçlü çeldirici içerir.
- Yanlış seçenek feedbackleri, hangi durumda doğru olabileceğini ve bu olguda neden elendiğini açıklar.
- AI pratik istatistikleri ana olgu istatistiğini bozmadan ayrı local storage anahtarı altında tutulur.

## Kontrol sonucu
- JS/JSX statik parse kontrolü geçti.
- AI generator smoke test geçti.
- `npm run build` komutu, sandbox içinde `npm install` Firebase/Vite bağımlılık kurulumu tamamlanamadığı için çalıştırılamadı. Local ortamda `npm install` tamamlandıktan sonra `npm run build` çalıştırılmalıdır.
