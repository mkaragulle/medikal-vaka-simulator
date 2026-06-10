# KlinikIQ V438 — Root Fix Without Content-Length Forcing

## Amaç
Kullanıcının bildirdiği tekrar eden kalite problemlerini çözmek ve TUS soru üretiminde soru kökü, soru cümlesi, seçenekler, açıklama ve şık geri bildirimi alanlarına uzunluk/cümle/karakter baskısı yapan kuralları kaldırmak.

## Kök problem
V437’de token azaltma için modelden çok küçük bir çıktıyla hem soru hem açıklama hem 5 seçenek geri bildirimi isteniyordu. Bu, bazı cevaplarda yarım cümle veya zayıf fallback üretimine yol açabiliyordu. Ayrıca option feedback tarafındaki görünürlük filtresi, yanlış seçeneklerin beklenen ayırıcı özelliklerini anlatan geçerli açıklamaları da bazen fazla agresif temizliyordu.

## Yapılan değişiklikler
- `api/tus-question-prompt.js` yeniden yazıldı.
- Prompttan `kısa`, `kompakt`, belirli cümle/karakter/uzunluk yönlendirmeleri kaldırıldı.
- JSON şeması minimal tutuldu: `s`, `q`, `o`, `c`, `e`, `r`.
- Modelden konu/hastalık/test yönlendirmesi istenmiyor.
- User prompt çok küçük kaldı: `B`, `D`, `R`, `JSON`.
- Default `max_output_tokens` / `max_completion_tokens` kaldırıldı. Sadece `.env` ile özellikle girilirse gönderilir.
- `text.verbosity: low` kaldırıldı.
- Option feedbackteki agresif kök-kanıt pruning kaldırıldı; böylece yanlış şıkların neden yanlış olduğu daha doğal ve öğretici kalır.
- Yarım cümle ve ham kalıntılar temizlenmeye devam eder.
- `Bu seçenek, kökteki ana bulguları birlikte z.` gibi bozuk kalıplar güvenli metne çevrilir.
- Frontend feedback tarafında AI spot için metni kırpan `truncate/compact/merge` davranışı etkisiz hale getirildi; artık AI spot açıklama ve geri bildirimleri kesilmez.
- Dil normalizasyonu genişletildi: kreatinin, hipokalsiüri, distal tübül, retansiyone plasenta, laserasyon, orta hatta vb.

## Korunan token tasarrufu
Token azaltımı artık içerik sıkıştırma kurallarıyla değil, gereksiz alanları istememekle yapılıyor:
- Tek OpenAI çağrısı.
- Repair pass yok.
- Local fallback yok.
- Prompt cache yok.
- Question-bank yok.
- Topic steering yok.
- Minimal JSON alanları.
- Minimal user prompt.

## Kontrol
`node --check` başarılı:
- `api/generate-ai-question.js`
- `api/tus-question-prompt.js`
- `src/utils/simpleAIQuestionAdapter.js`
- `src/services/aiQuestionService.js`

Not: JSX dosyası için full Vite build çalıştırılmadı; sandbox içinde `node_modules` yok.
