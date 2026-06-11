# KlinikIQ V437 — Clean No Text Limits + Root Problem Fix

Bu sürüm, V436 üzerinde uygulanmıştır.

## Ana hedef
- Soru kökü, soru metni, seçenekler, açıklama ve feedback alanlarında metni belirli cümle/karakter kalıbına sıkıştıran kurallar kaldırıldı.
- Prompt şişirilmedi; hastalık/test/kelime özel konu yönlendirmesi eklenmedi.
- Sorunlar ikinci AI çağrısı, repair pass veya local fallback ile değil; daha temiz prompt ve deterministic final temizlik katmanıyla çözüldü.

## Prompt değişiklikleri
- `kısa`, `kompakt`, cümle sayısı, karakter sayısı, feedback uzunluğu gibi kısıtlayıcı ifadeler kaldırıldı.
- Prompt şu genel kalite ilkelerine indirildi:
  - Seçilen branşa uygun bilimsel, özgün, tek doğru cevaplı TUS sorusu üret.
  - Soru kökü kendi içinde net olsun; doğru cevabı zayıflatan belirsizlik/çelişki bırakmasın.
  - Açıklamada kullanılan hasta-özel kanıtlar soru kökünde görünür olsun.
  - Şıklar aynı türden ve seçenekle uyumlu olsun.
  - Feedback ilgili şıkla doğru eşleşsin.
  - Dil profesyonel Türkçe olsun; üretim etiketi, yarım cümle ve karışık dil kullanılmasın.

## Kaldırılan içerik/uzunluk kısıtları
- API isteğinde varsayılan `max_output_tokens` / `max_completion_tokens` gönderimi kaldırıldı.
- `text.verbosity: low` kaldırıldı.
- Backend tarafında stem, açıklama ve feedback için cümle sayısı kırpma/slice mantığı kaldırıldı.
- AI spot feedback panelinde metin kırpan `truncateSentence` etkisiz hale getirildi.
- `compactParagraph` artık cümle/karakter sınırı uygulamıyor.
- AI spot narrative tarafında uzun kökü parçalama/kırpma davranışı kaldırıldı.

## Problem örneklerine yönelik genel çözüm
- Gitelman/Bartter örneği için dil standardizasyonları güçlendirildi:
  - `creatinine` → `kreatinin`
  - `hipokalseüri` → `hipokalsiüri`
  - `distal tubulus` → `distal tübül`
  - `supressed renin` → `baskılanmış renin`
  - `serum Ca normal` → `serum kalsiyumu normal`
- Postpartum kanama örneği için dil standardizasyonları güçlendirildi:
  - `Retine plasenta` → `retansiyone plasenta`
  - `lacerasyon` → `laserasyon`
  - `midline` → `orta hatta`
  - `Genelize` → `yaygın`
- Feedbackte kökte olmayan hasta-özel kanıtların korunmasını engelleyen görünürlük filtresi korundu.
- Yarım cümle temizleyici ve feedback drift kontrolü korundu; başka şıkka kayan feedbackler generic güvenli feedbacke düşürülür.

## Korunan sade mimari
- Tek OpenAI çağrısı.
- Minimal JSON şeması: `s, q, o, c, e, f`.
- Prompt cache yok.
- Question-bank yok.
- Local fallback yok.
- Repair pass yok.
- Topic steering yok.
- Hastalık/test/kelime özel yasak veya yönlendirme yok.

## Değiştirilen ana dosyalar
- `api/tus-question-prompt.js`
- `api/generate-ai-question.js`
- `src/utils/simpleAIQuestionAdapter.js`
- `src/components/AnswerFeedbackPanel.jsx`
- `src/utils/aiSpotNarrative.js`
- `src/services/aiQuestionService.js`

## Kontrol
- `node --check` başarılı:
  - `api/tus-question-prompt.js`
  - `api/generate-ai-question.js`
  - `src/utils/simpleAIQuestionAdapter.js`
  - `src/utils/aiSpotNarrative.js`
  - `src/services/aiQuestionService.js`
- `.jsx` dosyası Node `--check` ile doğrudan kontrol edilemediği için manuel patch ve sözdizimi mantığıyla düzenlendi. Full Vite build çalıştırılmadı; sandbox içinde `node_modules` yok.
