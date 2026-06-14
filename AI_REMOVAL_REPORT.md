# KlinikIQ V402 — İkinci AI Kalıntı Temizliği Audit Raporu

## Amaç
Bu çalışma, önceki AI kaldırma işleminden sonra kod tabanında kalmış olabilecek üretim sistemi kalıntılarını temizlemek için yapıldı. UI redesign/refactor yapılmadı; görünüm, layout, buton/kart sınıfları ve kullanıcı akışı mümkün olduğunca aynı tutuldu. Üretim/prompt/fallback/quality/repair/model çağrısı anlamı taşıyan parçalar ayrıştırıldı ve kaldırıldı.

## 1. Temizlenen gerçek AI kalıntıları
- TUS üretim sayfasındaki eski AI/practice state isimleri nötr TUS generator state isimlerine çevrildi.
- TUS üret butonu eski generator/service/local bank/quality akışına bağlanmadı; sadece statik inaktif mesaj davranışı kaldı.
- Komite çalışma alanındaki otomatik ders, soru, kart, materyal analizi ve yerel üretim yardımcıları kaldırıldı.
- Komite tarafında `buildLocalLesson`, `buildLocalQuestions`, `buildLocalFlashcards`, `buildMaterialAnalysisFallback`, `qualityGateLesson`, `qualityGateQuestions`, `qualityGateDeck`, `normalizeGeneratedLessonShape`, `normalizeGeneratedDeckShape` gibi üretim/kalite/fallback yardımcıları silindi.
- `src/utils/feedbackQualityStandard.js` tamamen kaldırıldı; kullanılmayan feedback repair/fallback/quality helper’ıydı.
- Hap kartlardan TUS seed/question türeten `TUS_PEARL_AI_SEEDS` bloğu ve ilişkili distractor üretim yardımcıları kaldırıldı.
- `normalizeAIPearlCardOutput` ve AI kart output schema/forbidden-expression kalıntıları kaldırıldı.

## 2. Silinen veya sadeleştirilen dosyalar
- Silindi: `src/utils/feedbackQualityStandard.js`
- Yeniden adlandırıldı: `src/components/AIGeneratedQuestionView.jsx` → `src/components/TusQuestionGeneratorView.jsx`
- Yeniden adlandırıldı: `src/components/AISpotQuestionScreen.jsx` → `src/components/TusSpotQuestionScreen.jsx`
- Yeniden adlandırıldı: `src/styles/ai-tus-button-center-hard-fix.css` → `src/styles/tus-button-center-hard-fix.css`
- Eski `AI_REMOVAL_REPORT.md` güncel raporla değiştirildi; eski stale bulgu metinleri bırakılmadı.

## 3. Silinen fonksiyonlar / eski üretim yardımcıları
Komite modülünden kaldırılan başlıca fonksiyonlar:
- `buildSourceManifest`, `sourceManifestMatches`, `getOutputSourceFingerprint`
- `stampGeneratedOutput`, `stampGeneratedQuestions`
- `isGeneratedAssetStale`, `areGeneratedQuestionsStale`, `resetGeneratedAssetsForSourceChange`
- `normalizeLessonCoverageForMaterial`, `buildSourceBoundBigPictureFallback`, `ensureLessonBigPicture`
- `deriveTopic`, `wordCount`, `buildSectionDepthText`, `deepenLessonSections`
- `qualityGateLesson`, `qualityGateQuestions`, `qualityGateDeck`
- `extractKeywords`, `splitSourceBlocks`, `getImportantSentences`
- `sourceDrivenSections`, `buildSourceObjectiveList`, `optionFeedbackForSourceQuestion`, `countMatches`
- `buildTopicProfileFromText`, `getMaterialTopicProfile`, `inferTitleFromTopicProfile`
- `buildLocalLesson`, `buildLocalQuestions`, `buildLocalFlashcards`
- `normalizeGeneratedLessonShape`, `normalizeGeneratedDeckShape`, `buildMaterialAnalysisFallback`

TUS/Hap kart tarafında kaldırılan başlıca parçalar:
- `TUS_PEARL_AI_SEEDS`
- `buildDistractors` ve bu seed bloğuna ait option-entry havuzları
- `normalizeAIPearlCardOutput`
- eski AI kart schema/forbidden-expression export’ları

## 4. Silinen prompt / repair / fallback / qualityGate / local generation sistemleri
- `qualityGate*` fonksiyonları kaldırıldı.
- Komite local generation/fallback fonksiyonları kaldırıldı.
- Prompt, model çağrısı, JSON schema ile response parse etme, remote provider/model metadata üretme akışı kalmadı.
- `feedbackQualityStandard.js` silindiği için eski feedback repair/fallback/quality standardizer kalmadı.
- `safeGeneration`, `localGeneration`, `generateContent`, `chat.completions`, `callOpenAIText`, `systemPrompt`, `userPrompt`, `repairAIGeneratedText` gibi teknik üretim terimleri kaynakta kalmadı.

## 5. Temizlenen data metadata alanları
- `src/data/cases.js` içinden 899 adet `aiMeta` metadata bloğu kaldırıldı.
- `caseType: "ai-spot"` değerleri nötr `caseType: "spot"` değerine çevrildi.
- `ai-spot` id/source kalıntıları `tus-spot` adlandırmasına taşındı.
- Data içine gömülü eski kaynak notlarında `OpenAI`, prompt, model, repair, AI seed/source path kalıntıları nötrleştirildi.
- `clinicalVisualManifest.js` içindeki eski “AI seed/fallback/template bankası” provenance metinleri statik TUS kayıt kaynağı olarak sadeleştirildi.

## 6. Korunan UI statik metinleri ve neden korunduğu
- “Yeni TUS Sorusu Üret” başlığı/butonu korundu; bu bir UI aksiyonu ve route etiketidir, artık üretim çağrısı yapmaz.
- TUS sayfasındaki hero, branş/zorluk seçicileri, dashboard’a dön butonu ve üret butonu korunmuştur.
- Komite ana sayfasındaki kartlar ve çalışma akışı korunmuştur.
- Klinik Branş Seç / TUS spot / statik vaka çözme ekranlarındaki şık kartları, radio görünümleri, değerlendirme ve yeni vaka butonları korunmuştur.
- İnaktif modül mesajı nötrleştirildi: “Soru üretim modülü bu sürümde aktif değildir.”

## 7. Zararsız isim olarak bırakılanlar / sınıflandırma
- Geniş aramada `fallback` görülen yerler React Suspense fallback, localStorage parse default değeri, görsel yüklenemezse gösterilen image fallback veya UI route fallback’tir; üretim fallback’i değildir.
- `prompt` görülen yerler soru kökü / question prompt render helper’ı veya Firebase Google OAuth `prompt: 'select_account'` parametresidir; LLM prompt değildir.
- `repair` görülen yerler laboratuvar satırı normalizasyonu, CSS yorumlarında hizalama düzeltmesi veya tıbbi “DNA mismatch repair / repaired TOF” içeriğidir; AI repair loop değildir.
- `model` görülen yerler tıbbi/cihaz/kalıtım modeli anlamındadır; LLM model seçimi değildir.
- `completion` için üretim API kalıntısı bulunmadı.

## 8. Package/env temizliği
- `package.json` içinde `openai`, `@google/generative-ai`, `anthropic`, `langchain`, `tiktoken`, `llm`, `gpt`, `vertex`, `llama`, `groq`, `mistral` bağımlılığı yok.
- `.env.example` dosyası bulunmadı; env dosyalarında AI API key kalıntısı bulunmadı.
- `vercel.json` içinde AI route/function tanımı yok.
- `package-lock.json` projede başlangıçta yoktu. `npm install` test amacıyla çalıştırıldı; sandbox registry’si internal URL ürettiği için final ZIP’e lock dosyası eklenmedi.

## 9. TUS modülünde kalan davranış
- Sayfa ve görsel tasarım korunur.
- Branş/zorluk seçimi korunur.
- “Yeni TUS Sorusu Üret” butonu hiçbir async AI/generator/API/local bank çağırmaz.
- Buton sadece statik inaktif mesaj gösterir: “Soru üretim modülü bu sürümde aktif değildir.”
- Daha önce çözülen/statik soru gösterimi ve yanlışlar merkezi bağlantıları korunur.

## 10. Komite modülünde kalan davranış
- Komite ana dashboard ve kart tasarımları korunur.
- Dosya yükleme UI’ı korunur; dosya metni yerel olarak saklanabilir fakat ders/soru/kart üretimi başlatmaz.
- Ders anlatımı, soru ve hap kart sekmelerindeki üretim aksiyonları statik “Bu modül bu sürümde aktif değildir.” mesajı verir.
- Remote API/fetch/model/prompt/quality/fallback pipeline kalmadı.

## 11. Build/lint/typecheck sonucu
- `npm install`: çalıştı. Node sürümü sandbox’ta v22.16.0 olduğu için proje `node: 20.x` engine uyarısı verdi; install tamamlandı.
- `npm run build`: başarılı.
- Vite build sadece büyük chunk uyarısı verdi; bu eski bundle boyutu uyarısıdır, build hatası değildir.
- `npm run lint`: package.json içinde script yok.
- `npm run typecheck`: package.json içinde script yok.

## 12. Final arama sonuçları
Arama `node_modules`, `dist`, `.git` ve audit raporları hariç çalıştırıldı.

Refined strict AI terimleri için sonuç: aktif kaynakta gerçek AI üretim kalıntısı bulunmadı.

Aranan strict terimler:
`OpenAI`, `Gemini`, `Anthropic`, `OPENAI`, `GEMINI`, `ANTHROPIC`, `LLM`, `llm`, `gpt`, `qualityGate`, `safeGeneration`, `localGeneration`, `generateContent`, `chat.completions`, `hallucination`, `aiMeta`, `ai-spot`, `usedRemoteAI`, `generationSource`, `AIGenerated`, `AISpot`, `PEARL_AI`, `TUS_PEARL_AI`, `callOpenAI`, `systemPrompt`, `userPrompt`, `repairAIGenerated`, `ai-generated`, `ai_generated`, `normalizeAI`, `AI_`.

Broad terimler için kalanlar sınıflandırıldı:
- `fallback`: UI/default fallback kullanımı; üretim fallback’i değil.
- `prompt`: soru kökü ve Firebase OAuth parametresi; LLM prompt değil.
- `repair`: laboratuvar normalizasyonu veya tıbbi terim; AI repair değil.
- `model`: tıbbi/cihaz/kalıtım modeli; LLM model değil.
- `completion`: API completion kalıntısı yok.

## Sonuç
AI motoru, promptlar, kalite kapıları, repair/fallback/local generation ve API/model çağrıları projeden temizlendi. UI korunarak build başarılı alındı. Klinik Branş Seç, statik soru çözme, cevap değerlendirme ve Komite/TUS ekranlarının render zinciri bozulmayacak şekilde import/state bağımlılıkları korunmuştur.
