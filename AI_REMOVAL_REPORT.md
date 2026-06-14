# KlinikIQ AI Kaldırma Raporu

## Silinen AI backend / servis / route dosyaları

- `api/analyze-uploaded-material.js`
- `api/generate-ai-question.js`
- `api/generate-lesson.js`
- `api/generate-material-flashcards.js`
- `api/generate-material-questions.js`
- `api/validate-ai-output.js`
- `server/lib/ai-token-optimizer.js`
- `server/lib/komite-ai-common.js`
- `src/services/aiQuestionService.js`

## Silinen prompt / quality gate / repair / fallback / local generation dosyaları

- `server/prompts/analyzeUploadedMaterialPrompt.js`
- `server/prompts/generateFlashcardsPrompt.js`
- `server/prompts/generateLessonPrompt.js`
- `server/prompts/generateMaterialQuestionsPrompt.js`
- `server/prompts/komiteGlobalEducationalPrompt.js`
- `server/prompts/tus-question-prompt.js`
- `server/prompts/validateAIOutputPrompt.js`
- `src/data/aiBranchQuestionTemplates.js`
- `src/data/aiQuestionSeeds.js`
- `src/data/aiSyntheticFallbackTemplates.js`
- `src/data/aiTopicPools.js`
- `src/utils/aiBranchRules.js`
- `src/utils/aiQuestionDiversity.js`
- `src/utils/aiQuestionGenerator.js`
- `src/utils/aiQuestionHistory.js`
- `src/utils/aiQuestionQualityGate.js`
- `src/utils/aiSpotNarrative.js`
- `src/utils/answerLeakageGate.js`
- `src/utils/clinicalCoherenceHardGate.js`
- `src/utils/clinicalScientificAccuracyGate.js`
- `src/utils/editorialQuality.js`
- `src/utils/finalAIQuestionSafetyGate.js`
- `src/utils/questionDeduplication.js`
- `src/utils/simpleAIQuestionAdapter.js`
- `src/utils/singleBestAnswerGate.js`
- `src/utils/validateAIQuestion.js`

## Güncellenen route / deployment ayarı

- `vercel.json` içindeki AI function tanımları kaldırıldı. Artık `/api/generate-ai-question`, `/api/generate-lesson`, `/api/analyze-uploaded-material`, `/api/generate-material-questions`, `/api/generate-material-flashcards`, `/api/validate-ai-output` function ayarları yok.

## Birebir korunması hedeflenen UI sayfaları / componentleri

- `src/App.jsx` ana route ve navigation akışı korundu.
- `src/components/AIGeneratedQuestionView.jsx` sayfa/hero/filter/button layout’u korunarak yalnızca üretim aksiyonu güvenli statik mesaja bağlandı.
- `src/components/KomiteModeWorkspace.jsx` ana Komite arayüzü, kartlar ve sekmeler korunarak AI fetch/generation çağrıları kaldırıldı.
- `src/components/AISpotQuestionScreen.jsx` UI component olarak korundu; silinen AI narrative helper importu yerine component içinde statik görüntüleme helperları kullanıldı.
- `src/components/AnswerFeedbackPanel.jsx` statik cevap değerlendirme/feedback UI’ı korunacak şekilde AI repair importu çıkarıldı ve yalnızca local statik metin filtreleri bırakıldı.
- `src/utils/investigationOrders.js` statik tetkik/özet akışı korunacak şekilde AI leakage gate importu kaldırıldı.

## TUS üret butonu davranışı

- `src/App.jsx` içinde `createAIQuestion` ve `prefetchNextAIQuestion` importları tamamen kaldırıldı.
- “Yeni TUS Sorusu Üret” butonu artık hiçbir async AI servisi, local generation, quality gate, repair, fallback veya API route çağırmaz.
- Buton yalnızca mevcut sayfa tasarımı içinde küçük statik mesaj gösterir: `Bu modül şu anda aktif değil.`

## Komite AI aksiyonları davranışı

- `KomiteModeWorkspace.jsx` içindeki `/api/generate-lesson`, `/api/generate-material-questions`, `/api/generate-material-flashcards` fetch akışı kaldırıldı.
- “AI Ders Anlatımı oluştur”, “10 soru oluştur”, “Hap kartları oluştur” aksiyonları artık API/model çağırmaz.
- Tıklanınca mevcut Komite UI içinde statik mesaj gösterir: `Bu modül şu anda aktif değil.`

## Klinik Branş Seç / statik vaka çözme koruması

- Statik vaka/soru data dosyaları silinmedi.
- Şık seçme state’i, doğru/yanlış değerlendirme akışı, `DiagnosisQuiz`, `AnswerFeedbackPanel`, `CasePlayer`, `CaseList` ve açıklama/feedback gösterme componentleri korunmuştur.
- “Yanıtı değerlendir” ve “Yeni vaka çöz” akışı AI servisine bağlanmadı; AI bağımlılığı olmayan statik frontend akışı korunmuştur.

## Kontrol sonucu

- `npm run build` başarılı.
- `npm run lint` script’i bu pakette yok.
- `npm run typecheck` script’i bu pakette yok.
- Statik taramada `/api/generate-*`, `/api/validate-ai-output`, OpenAI/Gemini/Anthropic client/import/fetch çağrısı aktif kaynak dosyalarda kalmadı.
- Sandbox Chromium, localhost sayfasını “blocked by organization” policy ile açmadığı için burada tam manuel tarayıcı tıklama testi yapılamadı. Build ve statik import/API taramaları temizdir.
