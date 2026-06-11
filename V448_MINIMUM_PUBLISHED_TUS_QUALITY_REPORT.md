# KlinikIQ V448 — Minimum Published TUS Quality Report

## Değiştirilen dosyalar
- `server/tus-question-prompt.js`
- `api/generate-ai-question.js`
- `server/lib/ai-token-optimizer.js` *(incelendi; TUS için düşük verbosity/token sıkıştırma profili uygulanmadığı doğrulandı)*
- `src/utils/simpleAIQuestionAdapter.js`
- `src/components/AnswerFeedbackPanel.jsx`
- `src/components/tusPearlCards.css`
- `src/services/aiQuestionService.js`

## System prompt değişikliği
- TUS system promptu açık JSON şeması üzerine yeniden kuruldu.
- `clinicalStem`, `physicalExam`, `vitals`, `objectiveData`, `optionFeedback`, `evidenceBasedReasoning` alanları birincil şema haline getirildi.
- Sabit karakter/cümle/token sınırı kullanılmadı.
- Prompt, modeli örnek hastalık/örnek seçenek ile manipüle etmeden kalite standartlarını soyut ve klinik editör mantığıyla tanımlıyor.
- Feedback standardı ayrı bölüm halinde güçlendirildi: doğru seçenek feedbacki vaka verileriyle bağlanıyor; yanlış seçeneklerde “hangi durumda doğru olurdu / bu vakada neden elenir” ayrımı zorunlu hale getirildi.

## User prompt değişikliği
- `buildUserPrompt` sadeleştirildi ve şu bilgileri taşıyacak hale getirildi: branş, zorluk, kullanıcı hedefi, son tekrar durumu, kaynak/metin, beklenen çıktı.
- Branşın sadece ana alan filtresi olduğu belirtildi.
- Özel hedef yoksa branş içinde sınav değeri yüksek konuyu modelin seçebileceği belirtildi.
- Kaynak varsa kaynakla uyum, kaynak yoksa genel kabul görmüş tıbbi bilgiye dayanma kuralı eklendi.
- “Kısa yaz”, “kompakt yaz”, “token tasarrufu yap” gibi kalite düşürebilecek ifadeler kullanılmadı.

## JSON şeması
- Yeni birincil şema açık alan adlarıyla çalışıyor:
  - `branch`, `difficulty`, `learningTarget`, `answerTarget`
  - `clinicalStem`, `physicalExam`, `vitals`, `objectiveData`
  - `question`, `options`, `correctAnswer`
  - `explanation`, `optionFeedback`, `evidenceBasedReasoning`, `examPearl`, `sourceUseNote`
- Backend ve adapter eski kısa alan adlarını da okumaya devam ediyor: `s`, `cv`, `co`, `o`, `c`, `e`, `f`, `k`, `p`.

## Backend kalite kontrolü
`api/generate-ai-question.js` içinde kalite kontrol katmanı güçlendirildi.

Eklenen/güçlendirilen ana fonksiyonlar:
- `findEducationalDefects(question)`
- `isBrokenOrTruncatedFeedback(text)`
- `isEducationalFeedback(text, optionText, question, id)`
- `maybeRewriteForEducationalQuality(question, defects, context, attempt)`
- `enforceEducationalQuality(question, context)`

Kontrol edilen kusurlar:
- Gerçek anamnez gibi akmayan veya veri fişi gibi duran `clinicalStem`
- Boş/yetersiz `physicalExam`, `vitals`, `objectiveData`
- Tek hedefli olmayan soru cümlesi
- Beş seçenek olmaması veya doğru cevabın seçeneklerle eşleşmemesi
- Vaka özelinde klinik zincir kurmayan açıklama
- Eksik, yarım, bozuk, jenerik veya yüzeysel optionFeedback
- Yanlış seçeneklerde “hangi durumda doğru olurdu?” bilgisinin olmaması
- Vaka verisi ile klinik anlamı bağlamayan evidence zinciri
- Answer leak ve biçimsel seçenek avantajı

## Quality rewrite akışı
- İlk AI çıktısı JSON olarak normalize ediliyor.
- Temel render güvenliği kontrol ediliyor.
- `TUS_AI_ALWAYS_QUALITY_REWRITE` varsayılan olarak açık kabul ediliyor.
- Rewrite promptu yeni soru üretmek yerine aynı klinik hedefi koruyarak kalite editörlüğü yapıyor.
- Rewrite en fazla `TUS_AI_QUALITY_REWRITE_ATTEMPTS` kadar deneniyor.
- Hâlâ kalite kusuru varsa endpoint soruyu yayınlamıyor ve şu hata mantığıyla dönüyor: “AI soru üretimi kalite standardını karşılamadı; lütfen tekrar deneyin.”

## Artık reddedilen kötü çıktılar
- “3 aylık erkek infant: ...” tarzı tek satır veri fişi kökler
- Muayene/vital/objektif veri alanları boş sorular
- “Doğru”, “Yanlış”, “uygun değil” düzeyi feedbackler
- “Bu seçenek, kökteki ana bulguları birlikte z.” gibi yarım feedbackler
- Yanlış seçeneklerde ayırıcı nokta ve “ne zaman doğru olurdu?” bilgisi olmayan açıklamalar
- Doğru seçeneğin uzunluk/ifade biçimiyle kendini ele verdiği seçenek setleri
- Placeholder, debug metni veya prompt kalıntısı içeren çıktılar

## Frontend feedback gösterimi
- `AnswerFeedbackPanel.jsx` AI Spot feedback alanında uzun optionFeedback metinlerini kesmeyecek şekilde düzenlendi.
- Seçilen yanlış seçenek ve doğru seçenek açıklamaları artık 620 karakterlik kırpmaya zorlanmıyor.
- Eksik feedback için eğiticiymiş gibi jenerik fallback üretilmiyor; bu durum backend kalite kapısının yakalaması gereken hata olarak görünür kalıyor.
- `tusPearlCards.css` içine V448 render-safe blok eklendi; AI Spot feedback kartlarında `max-height`, `overflow`, `line-clamp` kaynaklı kırpılma engellendi.

## Token / timeout / env önerileri
Vercel Environment Variables için önerilen değerler:

```env
TUS_AI_ALWAYS_QUALITY_REWRITE=true
TUS_AI_QUALITY_REWRITE_ATTEMPTS=3
TUS_OPENAI_MAX_OUTPUT_TOKENS=6000
TUS_OPENAI_PER_REQUEST_TIMEOUT_MS=90000
VITE_AI_REQUEST_TIMEOUT_MS=120000
```

Kaliteyi bozabilecek değerler kullanılmamalı:
- `OPENAI_VERBOSITY=low`
- `TUS_OPENAI_VERBOSITY=low`
- `TUS_AI_ENABLE_QUALITY_REWRITE=false`
- `TUS_AI_ALWAYS_QUALITY_REWRITE=false`
- düşük `OPENAI_MAX_OUTPUT_TOKENS`
- düşük `TUS_OPENAI_MAX_OUTPUT_TOKENS`

## Build sonucu
Çalıştırılan komutlar:

```bash
npm install --legacy-peer-deps --no-audit --no-fund --package-lock=false
npm run build
```

Sonuç: Build başarılı. Vite üretim build’i tamamlandı.
