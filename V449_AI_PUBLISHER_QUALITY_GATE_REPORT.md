# KlinikIQ V449 — AI TUS Spot Yayın Kalitesi Kapısı Raporu

## Değiştirilen dosyalar

- `server/tus-question-prompt.js`
- `api/generate-ai-question.js`
- `server/lib/ai-token-optimizer.js`
- `src/utils/simpleAIQuestionAdapter.js`
- `src/components/AnswerFeedbackPanel.jsx`
- `V449_AI_PUBLISHER_QUALITY_GATE_REPORT.md`

## Ana problem

Önceki sistemde bazı çıktılar JSON olarak dolu göründüğü için kullanıcıya gösterilebiliyordu. Örneğin:

- Klinik kök gerçek anamnez yerine veri fişi gibi kalabiliyordu.
- Açıklama “ayırt edici bulgular doğru cevabı destekler” seviyesinde yüzeysel kalabiliyordu.
- Doğru seçenek feedbacki sadece seçenek adı + kısa hüküm gibi görünebiliyordu.
- Yanlış seçeneklerden bazıları yarım kalabiliyordu.
- Adapter/frontend bazı eksikleri explanation veya fallback ile makyajlayabiliyordu.

V449’da amaç, bu tarz çıktıların **yayın kapısından geçmemesi**dir.

## Yeni backend akışı

Yeni akış artık şu şekilde çalışır:

1. İlk AI soru JSON’u üretilir.
2. Backend normalize eder ve render-safe yapısal kontrol yapar.
3. Soru kalite rewrite editörüne gönderilir.
4. Rewrite sonrası ayrı bir AI yayın-denetçisi çalışır.
5. Yayın-denetçisi PASS vermezse kusurlar rewrite promptuna geri beslenir.
6. Bu döngü `TUS_AI_QUALITY_REWRITE_ATTEMPTS` kadar denenir.
7. Hâlâ PASS alınamazsa endpoint kullanıcıya soru döndürmez; hata döndürür:
   `AI soru üretimi kalite standardını karşılamadı; lütfen tekrar deneyin.`

Bu denetim kelime/karakter/cümle sayısı eşiğiyle yapılmaz. Denetim ayrı AI yayın editörünün semantik kalite değerlendirmesiyle yapılır.

## System prompt değişikliği

`server/tus-question-prompt.js` sıfıra yakın yeniden yazıldı.

Yeni system prompt:

- Gerçek hasta anamnezini zorunlu standart haline getirir.
- Klinik kökü veri fişi olmaktan çıkarır.
- Muayene, vital ve objektif veri ayrımını netleştirir.
- `shortClinicalSummary`, `title`, `subtopic`, `finalQualityCheck` alanlarını destekler.
- Doğru cevap gerekçesinin vaka verileriyle klinik zincir kurmasını ister.
- Her seçenek feedbackinde şu mantığı ister:
  - seçenek neyi temsil eder,
  - hangi durumda doğru olurdu,
  - bu vakada neden doğru/yanlış,
  - doğru cevapla ayırıcı nokta,
  - sınav pratiği.
- “Doğru/Yanlış/Uygun” düzeyindeki feedbackleri açıkça yayınlanamaz kabul eder.
- Karakter/kelime/cümle/token sınırı koymaz.

## User prompt değişikliği

`buildUserPrompt` sadeleştirildi ama kalite hedefi yükseltildi.

Artık user prompt:

- Branş, zorluk, hedef, tekrar notu ve kaynak bilgisini verir.
- Branşın sadece ana alan filtresi olduğunu belirtir.
- Özel hedef yoksa modelin bilimsel ve sınav değeri yüksek konuyu seçmesini ister.
- JSON dışında hiçbir çıktı istemez.
- Sabit uzunluk veya kısaltma dili kullanmaz.

## Yeni kalite rewrite sistemi

`TUS_QUALITY_REWRITE_SYSTEM_PROMPT` güçlendirildi.

Rewrite artık şunları özellikle düzeltir:

- Veri fişi gibi klinik kök → gerçek anamnez.
- Genel açıklama → vaka özelinde doğru cevap zinciri.
- Kısa doğru feedback → vaka verileriyle bağlanan doğru seçenek gerekçesi.
- Yüzeysel yanlış feedback → “hangi durumda doğru olurdu / bu vakada neden elenir / ayırıcı nokta” içeren öğretici metin.
- Yarım veya otomatik görünen metin → tamamlanmış yayın metni.

## Yeni bağımsız AI yayın-denetçisi

`TUS_QUALITY_REVIEW_SYSTEM_PROMPT` eklendi.

Bu denetçi kodsal regex/word count kullanmaz. Soruya editör gibi bakar ve JSON olarak şu formatta karar verir:

```json
{
  "pass": true,
  "publishable": true,
  "defects": [],
  "editorInstruction": "",
  "qualityScore": "excellent|good|borderline|fail"
}
```

FAIL vereceği durumlar:

- Hasta öyküsü veri fişi gibi duruyorsa.
- Açıklama yüzeyselse.
- Doğru seçenek feedbacki sadece seçenek adı/kısa hükümse.
- Yanlış seçenek feedbacki hangi durumda doğru olacağını ve bu vakada neden elendiğini öğretmiyorsa.
- Feedback yarım, taslak, placeholder veya otomatik fallback gibi görünüyorsa.
- Soru tek hedefli değilse veya seçenekler aynı kategoride değilse.

## Backend kalite kontrolleri

`api/generate-ai-question.js` içinde:

- `reviewPublishedQuality(...)` eklendi.
- `normalizeReviewPayload(...)` eklendi.
- `enforceEducationalQuality(...)` rewrite + bağımsız yayın-denetçisi döngüsüne çevrildi.
- `maybeRewriteForEducationalQuality(...)` daha güçlü editör talimatıyla yenilendi.
- `compactPayloadFromQuestion(...)` yeni alanları da taşır hale getirildi.
- `shortClinicalSummary`, `subtopic`, `title`, `finalQualityCheck` normalize edildi.

Kalan kodsal kontroller yalnızca render/schema güvenliği içindir:

- Soru kökü boş mu?
- Soru cümlesi boş mu?
- Beş seçenek var mı?
- CorrectAnswer A-E mi?
- CorrectAnswer seçeneklerle eşleşiyor mu?
- Temel alanlar boş mu?

Kelime sayısı, cümle sayısı, karakter uzunluğu veya belirli kelime/harf regexleriyle kalite puanlama yapılmaz.

## Adapter değişiklikleri

`src/utils/simpleAIQuestionAdapter.js` içinde:

- `subtopic`, `title`, `shortClinicalSummary`, `finalQualityCheck` okunur hale getirildi.
- AI’dan gelen başlık artık `clinicalCase.title` alanına aktarılıyor.
- `spotCategory` alt konu varsa daha açıklayıcı gösteriliyor.
- `shortClinicalSummary`, `coreKnowledge` ve feedback içine taşınıyor.
- Eksik doğru seçenek feedbacki artık otomatik olarak explanation ile doldurulmuyor.
- Eksik feedback frontend tarafından “kaliteliymiş gibi” makyajlanmıyor.

## Frontend feedback değişiklikleri

`src/components/AnswerFeedbackPanel.jsx` içinde:

- AI Spot bilim/mantık bölümüne `shortClinicalSummary` eklendi.
- Eksik optionFeedback durumunda frontend’in kendi fallback cümlesiyle kullanıcıyı yanıltması kaldırıldı.
- Uzun optionFeedback metinleri kırpılmadan gösterilmeye devam eder.
- Seçilen yanlış seçenek ve doğru cevap kartları AI’dan gelen gerçek feedbacki gösterir.

## Token/model/timeout değişiklikleri

`server/lib/ai-token-optimizer.js` kalite öncelikli hale getirildi.

- Mini/low-cost kalite profili dayatılmıyor.
- Varsayılan model `gpt-5.5` yapıldı; yine de en güvenlisi Vercel env üzerinden açık model seçmektir.
- `TUS_OPENAI_MAX_OUTPUT_TOKENS` default değeri `10000` yapıldı.
- `TUS_OPENAI_PER_REQUEST_TIMEOUT_MS` default değeri `120000` yapıldı.

Önerilen Vercel env:

```env
TUS_OPENAI_MODEL=gpt-5.5
TUS_AI_ALWAYS_QUALITY_REWRITE=true
TUS_AI_QUALITY_REWRITE_ATTEMPTS=3
TUS_OPENAI_MAX_OUTPUT_TOKENS=10000
TUS_OPENAI_PER_REQUEST_TIMEOUT_MS=120000
VITE_AI_REQUEST_TIMEOUT_MS=150000
```

Kaliteyi bozabilecek değerler kullanılmamalı:

```env
OPENAI_VERBOSITY=low
TUS_OPENAI_VERBOSITY=low
TUS_AI_ENABLE_QUALITY_REWRITE=false
TUS_AI_ALWAYS_QUALITY_REWRITE=false
TUS_OPENAI_MAX_OUTPUT_TOKENS=1000
OPENAI_MAX_OUTPUT_TOKENS=1000
```

## Build sonucu

Çalıştırılan komutlar:

```bash
npm install --legacy-peer-deps --no-audit --no-fund --package-lock=false
npm run build
```

Sonuç:

```text
✓ built successfully
```

## Not

Bu ortamda OpenAI API anahtarı olmadığı için canlı API çağrısı yapılamadı. Ancak build başarılıdır ve runtime akışı V449 kalite kapısı ile güncellenmiştir. Artık JSON dolu olsa bile bağımsız yayın-denetçisi PASS vermeyen soru kullanıcıya gösterilmez.
