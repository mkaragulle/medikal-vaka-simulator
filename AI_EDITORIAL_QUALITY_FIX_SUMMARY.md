# KlinikIQ AI Editorial Quality Gate Fix

## Kök neden

AI üretim hattında klinik metinler alan görevi ve editoryal kalite açısından ayrı bir son kontrolden geçmeden kullanıcıya taşınıyordu. Özellikle `evidenceChain`, `patientIntro.distinctiveClues`, `examPearls`, `investigations` ve feedback alanları aynı kaynak cümleleri farklı kartlarda tekrar kullanabiliyor; temel bilim sorularında gerçek tetkik yokken `Objektif karar verisi` veya `Laboratuvar` gibi placeholder kartlar üretilebiliyordu.

## Eklenen editoryal quality gate kuralları

- Yasaklı kalıp kontrolü: `Morfolojik patern:`, `Morfolojik patern. Morfolojik patern`, `karar verdirici paternyla`, `likefaksiyon nekrozuyla`, `kısa TUS pratiğinde ele alınır`, `Klinik değerlendirme için ek veri`, `Objektif karar verisi`, `verilen öğrenme hedefi`, `yanıt ekseni`.
- Inline başlık kontrolü: `Sınav incisi:`, `Ayırıcı nokta:`, `Karar verdirici ipucu:`, `Destekleyici kanıt:`, `Laboratuvar paterni:` gibi önekler bullet metninden temizlenir.
- Tekrar kontrolü: aynı kısa başlığın veya aynı cümlenin tekrarlandığı metinler reddedilir veya repair edilir.
- Placeholder tetkik kontrolü: gerçek objektif veri içermeyen laboratuvar/tetkik kartları kullanıcıya gösterilmez.
- Temel bilim kontrolü: patoloji, fizyoloji, biyokimya, farmakoloji, mikrobiyoloji, anatomi, histoloji/embriyoloji sorularında yapay hasta öyküsü veya sahte laboratuvar kartı zorlanmaz.
- Türkçe tıbbi terim normalizasyonu: `wheezing` → `hışıltılı solunum`; `likefaksiyon nekrozuyla` → `sıvılaşma nekrozu ile`; `paternyla` → `paternle`.

## Repair / regenerate mantığı

1. Üretilen soru önce `repairAIQuestionQuality` katmanından geçer.
2. Kısa metinler `repairAIGeneratedText` ile temizlenir.
3. Boş, placeholder veya tekrar eden tetkik kartları düşürülür.
4. Repair sonrası `validateAIQuestionQuality` tekrar çalışır.
5. Remote AI endpoint tarafında aynı yasaklı kalıplar schema kabulünden önce reddedilir; frontend tarafı bu durumda local validated fallback üretir.

## Temel bilim standardı

- Gerçek laboratuvar veya görüntüleme verisi yoksa tetkik alanı boş kalabilir.
- Mekanizma sorularında teori cümlesi laboratuvar sonucu gibi gösterilmez.
- Patoloji sorularında gerekirse `Histopatolojik değerlendirme` kullanılır; örnek olarak doku paterni, inflamatuvar içerik ve beklenen normal referans ifade edilir.

## 50 AI soru kalite testi

`AI_EDITORIAL_QUALITY_50_TEST_REPORT.json` üretildi.

- Toplam test edilen aday: 50
- Başarılı: 50
- Başarısız: 0
- Kontrol edilenler: yasaklı kalıplar, inline etiketler, tekrar eden başlık/cümleler, placeholder tetkikler, temel bilimde sahte laboratuvar kartları.

## Kontrol edilen gömülü içerik

- 132 gömülü vaka verisi editoryal bad-pattern açısından tarandı ve temizlendi.
- 6 AI seed, 11 branch template seed ve 13 synthetic fallback seed kontrol edildi.

## Build / test sonucu

- JS syntax check geçti: `editorialQuality.js`, `aiQuestionQualityGate.js`, `aiQuestionGenerator.js`, `aiBranchRules.js`, `investigationOrders.js`, `validateAIQuestion.js`, `api/generate-ai-question.js`.
- Data import check geçti: 132 case, 6 AI seed, 11 branch template, 13 fallback template import edildi.
- 50 AI editorial smoke test geçti: 50/50 başarılı.
- `npm run build` bu sandbox ortamında tamamlanamadı. Neden: `node_modules` yok ve `npm install` sandbox süre sınırında tamamlanamadı; build çıktısı `vite: not found`.

## Çalıştırma komutları

```bash
npm install
npm run build
npm run dev
```
