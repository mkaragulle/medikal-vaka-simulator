# KlinikIQ V446 — Deep TUS Prompt + Feedback Quality Rewrite Report

## Amaç
Bu sürüm, TUS AI Spot üretiminde görülen iki ana problemi kökten düzeltmek için hazırlandı:

1. Klinik olgunun gerçek anamnez/anlatı yerine kısa, kesik ve başlıklı veri listesi gibi gelmesi.
2. Seçenek feedbacklerinin yüzeysel, kısa, tekrar eden veya öğretici olmayan cümlelerden oluşması.

## Düzenlenen dosyalar

- `server/tus-question-prompt.js`
- `api/generate-ai-question.js`
- `src/utils/simpleAIQuestionAdapter.js`
- `src/components/AnswerFeedbackPanel.jsx`
- `package.json`

## Prompt sistemi değişiklikleri

### `server/tus-question-prompt.js`
TUS system prompt sıfırdan daha güçlü bir klinik kalite standardıyla yeniden yazıldı.

Yeni sistem şunları özellikle zorunlu kalite davranışı haline getirir:

- `clinicalStem` gerçek hasta başvuru hikâyesi/anamnez akışı gibi yazılacak.
- Öykü; kuru “Öykü/Fizik/Lab” başlıklarıyla kesik kayıt gibi değil, doğal klinik anlatı gibi kurulacak.
- Muayene, vital ve tetkik verileri ayrı alanlara ayrılacak.
- Tetkikler “istenir/yapılır” şeklinde değil, hasta özelinde gerçek sonuç gibi yazılacak.
- Seçenekler aynı karar kategorisinde kalacak.
- Explanation vaka özelinde klinik gerekçe verecek.
- Her optionFeedback şu mantığı taşıyacak:
  - seçeneğin klinik anlamı,
  - hangi durumda doğru olabileceği,
  - bu vakada neden uyduğu/uymadığı,
  - doğru seçenekle karışan ayırıcı nokta,
  - öğrencinin benzer soruda kullanacağı pratik ayrım.

Prompta karakter, cümle veya token üst sınırı eklenmedi. Örnek hastalık, örnek vaka veya örnek şık verilerek AI belirli konuya yönlendirilmedi.

## Backend kalite denetimi

### `api/generate-ai-question.js`
Yeni kalite kontrol ve kalite rewrite akışı eklendi.

Backend artık yalnızca JSON alanları dolu mu diye bakmıyor; ayrıca şu kusurları da yakalıyor:

- `clinicalStem` gerçek anlatı değil de “Öykü: ... Fizik: ... CBC: ...” gibi kesik özet ise,
- explanation “kökteki ayırt edici bulgular doğru cevabı destekler” gibi genel/geçiştirme kalıyorsa,
- optionFeedback sadece “Doğru”, “Yanlış”, “uygun değildir”, seçenek adını tekrar etme veya genel kalıp düzeyindeyse,
- seçeneklerden biri answer leak oluşturacak kadar biçimsel olarak farklı görünüyorsa.

Bu kalite kusurları saptanırsa backend aynı JSON’u ikinci bir kalite editörü promptuna göndererek yeniden yazdırır.

Yeni repair sistemi eski anlamda fallback değildir. Aynı soru niyetini ve schema’yı koruyup klinik anlatı + feedback kalitesini yükselten kalite editörüdür.

## Feedback görüntüleme düzeltmesi

### `src/components/AnswerFeedbackPanel.jsx`
AI Spot detaylı feedback ekranındaki optionFeedback metinleri artık kısa tutulup kesilmiyor.

Önceden seçenek açıklamaları `mergeUniqueSentences(..., 4, 760)` gibi sınırlarla daraltılıyordu. Bu, AI uzun ve öğretici feedback üretse bile ekranda kısa görünmesine neden olabiliyordu.

Yeni sürümde AI Spot seçenek feedbackleri tam öğretici içeriğiyle gösterilir.

## Adapter düzeltmesi

### `src/utils/simpleAIQuestionAdapter.js`
Eksik feedbacklerde otomatik jenerik fallback cümlesi üretme davranışı kaldırıldı.

Önceki davranış kötü çıktıyı gizleyebiliyordu:

- “Bu seçenek aynı alanda düşünülür; ancak olgudaki ipuçları doğru cevabı desteklemez.”

Yeni davranışta gerçek feedback beklenir. Backend zaten eksik/yüzeysel feedbacki yakalar ve kalite rewrite akışına sokar.

## Ek alanlar

JSON schema artık `physicalExam` alanını da destekler. Böylece:

- `clinicalStem`: gerçek anamnez ve olay akışı,
- `physicalExam`: muayene bulguları,
- `vitals`: vital bulgular,
- `objectiveData`: laboratuvar/görüntüleme/diğer objektif veriler

birbirinden daha temiz ayrılır.

## Build kontrolü

`npm run build` başarıyla çalıştı.

Build sonucu: başarılı.

## Özet

Bu sürümde amaç token kısmak değil, AI TUS sorusunu gerçekten üst kalite klinik vaka seviyesine taşımaktır. Sistem artık kısa ve yüzeysel üretimi tolere etmek yerine daha iyi anamnez, daha iyi vaka mantığı ve daha öğretici seçenek feedbackleri üretmeye zorlar.
