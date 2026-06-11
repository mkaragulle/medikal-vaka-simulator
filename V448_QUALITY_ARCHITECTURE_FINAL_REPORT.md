# KlinikIQ V448 — Minimum Published TUS Quality Final Report

## Değiştirilen / kontrol edilen dosyalar
- `server/tus-question-prompt.js`
- `api/generate-ai-question.js`
- `server/lib/ai-token-optimizer.js` (kontrol edildi; TUS için düşük verbosity/token sıkıştırma profili yok)
- `src/utils/simpleAIQuestionAdapter.js`
- `src/components/AnswerFeedbackPanel.jsx`
- `src/services/aiQuestionService.js`

## System prompt değişikliği
- TUS AI Spot system promptu açık JSON şemasına göre güçlendirildi.
- `clinicalStem`, `physicalExam`, `vitals`, `objectiveData`, `explanation`, `optionFeedback`, `evidenceBasedReasoning`, `examPearl`, `sourceUseNote` alanları birincil şema olarak vurgulandı.
- Klinik kökün gerçek anamnez gibi akması, muayene/vital/objektif verinin ayrı alanlarda kalması ve seçenek feedbacklerinin seçenek özelinde öğretici olması zorunlu hale getirildi.
- Sabit karakter/cümle/kelime/satır/token sınırı konmaması ve kalitenin içerik standardıyla sağlanması ayrıca eklendi.
- Örnek hastalık/örnek vaka/örnek seçenek verilerek konu manipülasyonu yapılmaması netleştirildi.

## User prompt değişikliği
- `buildUserPrompt` sade tutuldu: branş, zorluk, kullanıcı hedefi, son tekrar notu, kaynak/metin ve geçerli JSON beklentisini iletiyor.
- Branşın yalnızca ana alan filtresi olduğu, özel hedef yoksa modelin bilimsel/sınav değeri yüksek uygun konuyu seçebileceği belirtildi.
- Kaynak varsa kaynakla uyum, kaynak yoksa genel kabul görmüş tıbbi bilgi standardı korundu.
- Kompakt/token tasarrufu dilinden kaçınıldı.

## JSON şeması
- Birincil şema açık alan adlarıyla korunuyor: `clinicalStem`, `physicalExam`, `vitals`, `objectiveData`, `optionFeedback`, `evidenceBasedReasoning`.
- `physicalExam` alanı da `{ label, value }` object listesi olarak şemaya işlendi.
- Eski kısa alanlar için geriye uyum sürüyor: `s`, `cv`, `co`, `o`, `c`, `e`, `f`, `k`, `p`.

## Backend kalite kontrol fonksiyonları
- `findEducationalDefects(question)` genişletildi.
- `isBrokenOrTruncatedFeedback(text)` eklendi/güçlendirildi.
- `isEducationalFeedback(text, optionText, question, optionId)` eklendi.
- `looksLikeNonNarrativeStem`, `looksMultiTargetQuestion`, `evidenceLooksEducational`, `containsAnswerLeak` kontrolleri eklendi/güçlendirildi.
- Artık şu kusurlar kalite sorunu sayılıyor: kısa/veri fişi gibi clinicalStem, eksik muayene/vital/objektif veri, tek hedefli olmayan soru, eksik/bozuk/yüzeysel optionFeedback, vaka zinciri kurmayan explanation, zayıf kanıt zinciri, answer leak ve seçenek biçimsel outlier riski.

## Quality rewrite akışı
- Varsayılan olarak ilk üretimden sonra kalite-editör rewrite çalışacak şekilde bırakıldı (`TUS_AI_ALWAYS_QUALITY_REWRITE=true` davranışı).
- Rewrite yeni soru üretmek yerine aynı klinik hedefi ve doğru cevap mantığını koruyarak mevcut JSON’u yayın kalitesine çıkarıyor.
- Rewrite turu başarısız kalırsa veya kalite kusurları devam ederse kullanıcıya soru gösterilmiyor.
- Kalite standardı geçilemezse endpoint hatası: `AI soru üretimi kalite standardını karşılamadı; lütfen tekrar deneyin.`

## Artık reddedilecek kötü çıktılar
- “3 aylık erkek infant: ...” gibi veri fişi/tanı özeti kökler.
- Boş veya tek kelimelik feedbackler.
- “Bu seçenek için ayırt ettirici açıklama üretilemedi.” tarzı placeholderlar.
- “Bu seçenek, kökteki ana bulguları birlikte z.” gibi yarım/bozuk cümleler.
- Sadece “Doğru/Yanlış/Uygun değil” düzeyinde feedbackler.
- Yanlış seçeneklerde “hangi durumda doğru olurdu?” bilgisi olmayan feedbackler.
- Kanıt zinciri olmayan veya vaka verisiyle klinik anlamı bağlamayan açıklamalar.
- Doğru cevabı kök/veri alanında ele veren answer-leak riski.

## Frontend / adapter iyileştirmeleri
- `simpleAIQuestionAdapter` yeni alan adlarını doğrudan okuyor; eski kısa alanları da okuyor.
- `physicalExam` object geldiğinde `[object Object]` görünmesi engellendi; muayene bulguları okunabilir metne çevriliyor.
- Eksik/yüzeysel feedback için generic öğretici fallback üretme davranışı azaltıldı; eksik feedback kalite kapısının yakalaması gereken sorun olarak görünür hale getirildi.
- `AnswerFeedbackPanel` AI Spot feedback alanında uzun optionFeedback metinlerini kesmeden, satır satır göstermeye devam ediyor.
- `VITE_AI_REQUEST_TIMEOUT_MS` varsayılanı 120000 ms olarak güncellendi.

## Token / timeout / env önerileri
Vercel Environment Variables için önerilen değerler:

```env
TUS_AI_ALWAYS_QUALITY_REWRITE=true
TUS_AI_QUALITY_REWRITE_ATTEMPTS=3
TUS_OPENAI_MAX_OUTPUT_TOKENS=6000
TUS_OPENAI_PER_REQUEST_TIMEOUT_MS=90000
VITE_AI_REQUEST_TIMEOUT_MS=120000
```

Kaliteyi bozabilecek şekilde düşük kalmaması gerekenler:

```env
OPENAI_VERBOSITY=low
TUS_OPENAI_VERBOSITY=low
TUS_AI_ENABLE_QUALITY_REWRITE=false
TUS_AI_ALWAYS_QUALITY_REWRITE=false
OPENAI_MAX_OUTPUT_TOKENS=<düşük değer>
TUS_OPENAI_MAX_OUTPUT_TOKENS=<düşük değer>
```

## Build sonucu
Çalıştırılan komutlar:

```bash
npm install --legacy-peer-deps --no-audit --no-fund --package-lock=false
npm run build
```

Sonuç: `npm run build` başarıyla tamamlandı. Vite üretim build’i alındı.
