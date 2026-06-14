# KlinikIQ AI kaldırma raporu

## Özet
AI üretim altyapısı fiziksel olarak kaldırıldı. TUS soru üretim ekranı ve KlinikIQ Komite UI shell’i korunarak butonlar üretim yapmayan statik/no-op davranışa bağlandı.

## Silinen AI modülleri / dosyaları
- `api/` klasörü kaldırıldı.
- `server/` klasörü kaldırıldı.
- `src/services/aiQuestionService.js` kaldırıldı.
- `src/components/AISpotQuestionScreen.jsx` kaldırıldı.
- `src/utils/aiBranchRules.js` kaldırıldı.
- `src/utils/aiQuestionDiversity.js` kaldırıldı.
- `src/utils/aiQuestionGenerator.js` kaldırıldı.
- `src/utils/aiQuestionHistory.js` kaldırıldı.
- `src/utils/aiQuestionQualityGate.js` kaldırıldı.
- `src/utils/aiSpotNarrative.js` kaldırıldı.
- `src/utils/answerLeakageGate.js` kaldırıldı.
- `src/utils/clinicalCoherenceHardGate.js` kaldırıldı.
- `src/utils/clinicalScientificAccuracyGate.js` kaldırıldı.
- `src/utils/feedbackDuplicationGate.js` kaldırıldı.
- `src/utils/feedbackQualityStandard.js` kaldırıldı.
- `src/utils/finalAIQuestionSafetyGate.js` kaldırıldı.
- `src/utils/simpleAIQuestionAdapter.js` kaldırıldı.
- `src/utils/singleBestAnswerGate.js` kaldırıldı.
- `src/utils/tusLanguageStandard.js` kaldırıldı.
- `src/utils/validateAIQuestion.js` kaldırıldı.
- `src/utils/questionDeduplication.js` kaldırıldı.
- `src/data/aiBranchQuestionTemplates.js` kaldırıldı.
- `src/data/aiQuestionSeeds.js` kaldırıldı.
- `src/data/aiSyntheticFallbackTemplates.js` kaldırıldı.
- `src/data/aiTopicPools.js` kaldırıldı.

## API / environment temizliği
- Vercel serverless AI route mapping’i `vercel.json` içinden kaldırıldı.
- Kod artık `OPENAI_API_KEY`, `GEMINI_API_KEY`, `ANTHROPIC_API_KEY` veya benzeri AI env değişkenlerine bağlı değil.
- `OpenAI`, `Gemini`, `Anthropic`, `chat.completions`, `generateContent` ve model çağrılarına ait aktif kod bulunmuyor.

## Prompt / quality gate / repair temizliği
- `server/prompts/*` prompt katmanı kaldırıldı.
- TUS üretim promptları, Komite promptları, feedback promptları, repair promptları, safe generation/local generation promptları ve schema repair/validator parçaları kaldırıldı.
- `src/data/cases.js` içindeki eski `aiMeta` blokları temizlendi.
- Kullanılmayan AI pearl/card çıktı normalizer ve generated-case validator fonksiyonları kaldırıldı.

## Korunan UI sayfaları
- Dashboard
- Yeni TUS Sorusu Üret ekranı
- KlinikIQ Komite ana/workspace ekranı
- Çalıştıklarım
- Hap Kartlar
- Tekrar Merkezi
- Yanlışlar / tekrar alanları

## No-op / statik hale getirilen yerler
- Yeni TUS Sorusu Üret butonu artık üretim başlatmaz; yalnızca “Bu modül şu anda aktif değil.” mesajını gösterir.
- Komite ders anlatımı, soru oluşturma ve hap kart üretimi aksiyonları üretim yapmaz; statik devre dışı mesajı gösterir.
- Dosya yükleme/metin ayrıştırma UI’ı korunmuştur; ancak dosyadan AI özet, ders, soru veya kart üretimi yapılmaz.

## Korunan statik içerikler
- Elle yazılmış klinik vaka/soru verileri korundu.
- Hap kartlar ve glossary/statik çalışma içerikleri korundu.
- Eski CSS class isimleri bazı yerlerde tasarımı bozmamak için korunmuştur; bunlar üretim motoru değildir.
- Komite içinde görünen “AI Ders Anlatımı” / “AI Soruları” gibi etiketler sadece statik UI metnidir; arkasında üretim logic’i yoktur.

## Kontrol sonuçları
- `npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund`: başarılı. Not: sandbox Node sürümü 22.16.0, proje `20.x` öneriyor; install tamamlandı.
- `npm run build`: başarılı. Sadece mevcut büyük chunk uyarıları var.
- `npm run lint`: package.json içinde script yok.
- `npm run typecheck`: package.json içinde script yok.
- Runtime render kontrolü: Vite preview HTTP 200 verdi; ayrıca React SSR render kontrolü `SSR_RENDER_OK` verdi ve giriş ekranı HTML’i üretildi.

## Arama sonuçları
Aşağıdaki hedefli arama sıfır sonuç verdi:

```bash
rg -n "\b(openai|gemini|anthropic)\b|generateContent|chat\.completions|OPENAI_API_KEY|GEMINI_API_KEY|ANTHROPIC_API_KEY|qualityGate|safeGeneration|localGeneration|feedbackGenerator|questionGenerator|aiClient|aiService|callOpenAI|postKomiteAI|createAIQuestion|prefetchNextAIQuestion|listAIQuestionBranches|AISpotQuestionScreen|aiQuestionService|aiQuestionGenerator|feedbackDuplicationGate|answerLeakageGate|finalAIQuestionSafetyGate|validateAIQuestion|simpleAIQuestionAdapter|repairAIGeneratedText|normalizeAIPearlCardOutput|ai_generated|generatedFrom|generatedAt" -S --glob '!node_modules' --glob '!dist'
```

`prompt|Prompt` araması da sıfır sonuç verdi.
