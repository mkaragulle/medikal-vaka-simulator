# KlinikIQ V442 — Bilimsel Kaynak Kontrollü / Kısıtlamasız TUS Üretimi

Bu sürüm, kullanıcının isteği doğrultusunda V441 proje ZIP’i üzerinden hazırlandı.

## Amaç

AI ile TUS sorusu üretiminde metni sıkıştıran, belirli cümle/karakter uzunluğuna zorlayan, soru kökü/şık/feedback alanlarını kalıba sokan kısıtlayıcı ifadeler kaldırıldı. Sistem artık temel olarak seçilen branşa uygun, bilimsel, klinik akıl yürütmeye dayalı, tek doğru cevaplı TUS sorusu üretmeye odaklanır.

## Bilimsel kaynak kontrolü

`api/generate-ai-question.js` içinde OpenAI Responses API kullanıldığında `web_search` aracı eklendi. Böylece model, soru üretmeden önce güvenilir bilimsel tıp bilgisini kontrol edebilir. Bu özellik varsayılan olarak açıktır ve şu değişkenle kapatılabilir:

`TUS_ENABLE_SCIENTIFIC_SOURCE_CHECK=false`

Varsayılan olarak yalnızca resmi OpenAI base URL kullanılırken web source check aktif edilir. Farklı base URL kullanan yapılarda zorlamak için:

`TUS_FORCE_SOURCE_CHECK_ON_NON_OPENAI_BASE_URL=true`

## Değiştirilen ana dosyalar

- `api/generate-ai-question.js`: OpenAI çağrısı, Responses API web_search kaynak kontrolü, minimal JSON parse ve sourceChecked metadata.
- `server/tus-question-prompt.js`: kural yığını kaldırılmış, bilimsel kaynak kontrolü vurgulu, no-text-limit prompt.
- `src/utils/simpleAIQuestionAdapter.js`: kullanıcıya ham görünen üretim kalıntılarını ve dil bozukluklarını temizleyen sade adapter.
- `src/utils/aiSpotNarrative.js`: çözdürücü lab/görüntüleme/veri cümlelerini soru kökünden gizlemeyen görünür stem davranışı.
- `src/components/AnswerFeedbackPanel.jsx`: feedback tarafındaki sayısal kırpma ve tekrar eden blok kısıtları kaldırıldı.
- `src/services/aiQuestionService.js`: servis etiketi güncellendi.

## Korunan sade mimari

- Tek AI üretim çağrısı
- Minimal JSON şeması: `s, q, o, c, e, f`
- Prompt cache yok
- Local fallback yok
- Repair pass yok
- Question-bank/topic steering yok
- Hastalık/test/kelime özel yönlendirme yok
- Varsayılan output token limiti yok

## Not

OpenAI dışı base URL veya web_search desteklemeyen model kullanılıyorsa bilimsel kaynak kontrolü otomatik olarak devre dışı kalabilir. Resmi OpenAI Responses API + destekleyen model kullanıldığında web_search aktif çalışır.
