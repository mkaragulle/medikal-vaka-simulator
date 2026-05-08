# KlinikIQ AI Soru Üretimi — Bilimsel Quality Gate Rework

## Kök neden

AI ile Soru Üret akışında kalite problemi tek bir dosyadan değil, üç katmanın birlikte zayıf çalışmasından kaynaklanıyordu:

1. Uzak AI çıktıları client tarafında `skipQuality: true` ile fazla güvenilerek kabul edilebiliyordu. Bu yüzden server promptu iyi olsa bile kötü metinler ikinci bir kalite kapısından geçmeden kullanıcıya yaklaşabiliyordu.
2. Quality gate bazı kötü cümleleri yakalasa da repair/fallback fonksiyonları aynı kötü şablonları tekrar üretebiliyordu. Özellikle “Beklenen ana ipuçları bu tabloda baskın değildir” ve “Karar ... yönünde güçlenir” kalıpları fallback feedback içinde yeniden oluşuyordu.
3. Türkçe tıbbi terminoloji normalizasyonu tüm metin alanlarına eşit uygulanmıyordu. Bu nedenle `wheezing`, `Adrenalin (Epinefrin)`, `1: 1000`, yarım cümleler ve bozuk ameliyathane cümleleri bazı alanlarda kalabiliyordu.

## Eklenen bilimsel doğruluk quality gate kuralları

- Tedavi/ilk yaklaşım sorularında soru kökü, klinik ortam ve hemodinamik ciddiyet birlikte kontrol edilir.
- Perioperatif/ameliyathane/genel anestezi bağlamında anafilaksi varsa tek başına “IM adrenalin” ezberi kabul edilmez.
- Ameliyathane bağlamındaki ağır anafilaksi için doğru yönetim paketi; tetikleyiciyi durdurma, yardım çağırma, %100 oksijen/hava yolu, hızlı IV kristaloid ve hemodinamik ciddiyete göre adrenalin uygulamasını içermelidir.
- Genel/ayaktan anafilaksi veya “hayat kurtarıcı temel ilaç” sorularında adrenalin/epinefrin doğru ilaç olarak korunur.
- Soru kökü tek ilaç soruyorsa seçenekler ilaç kategorisinde tutulur; yönetim yaklaşımı soruyorsa doğru cevap yönetim paketi olarak yapılandırılır.

## Eklenen dil ve feedback quality gate kuralları

- Yasaklı şablon metinler hem server prompt/remote kontrolünde hem client quality gate içinde yakalanır.
- Yarım cümle bitişleri, özellikle “... sağlayarak.” gibi tamamlanmamış açıklamalar başarısız sayılır veya repair edilir.
- `wheezing` → `hışıltılı solunum`, `epinephrine` → `epinefrin`, `Adrenalin (Epinefrin)` → `adrenalin/epinefrin`, `1: 1000` → `1:1000` şeklinde normalize edilir.
- Yanlış şık açıklamaları artık yalnızca “bu tabloda baskın değildir” gibi meta cümlelerden oluşamaz; seçenek ne işe yarar, neden yetersiz kalır ve doğru öncelik nedir mantığıyla yazılır.
- Kanıt zinciri maddeleri “Kanıt 2” veya “Laboratuvar paterni” gibi mekanik başlıklar yerine gerçek klinik ipuçlarından oluşacak şekilde repair edilir.

## Yasaklanan şablon cümleler

- Beklenen ana ipuçları bu tabloda baskın değildir.
- Karar ... yönünde güçlenir.
- Ancak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır.
- Laboratuvar paterni.
- Kanıt 2 / Kanıt 3 / Kanıt 4
- Objektif bulguların karar basamağını desteklemesi
- Doğru yanıta götüren ana bulgudur
- İlk karar.
- Tedavi önceliği.
- Klinik değerlendirme için ek veri
- Bu veri klinik bağlamda değerlendirilir
- Nedeniyle Ameliyathane
- Kısa TUS pratiğinde ele alınır
- Morfolojik patern. Morfolojik patern.
- “sağlayarak.” ile biten yarım açıklamalar

## Şık ve çeldirici kalitesi için yapılan düzenlemeler

- `buildWrongFeedback` fallback’i değiştirildi; kısa veya zayıf seed feedbackleri artık seçenek özelinde öğretici açıklamaya tamamlanıyor.
- `repairWrongFeedback` ve `repairDifferentialComparison` kötü meta cümle üretmeyecek şekilde yeniden yazıldı.
- Antihistaminik, bronkodilatör, kortikosteroid, IV sıvı, adrenalin ve oksijen/hava yolu gibi seçenekler için bağlama duyarlı açıklama üretimi eklendi.
- Birden fazla kısmen doğru seçenek varsa soru kökü ve doğru cevap bağlama göre ayrıştırılacak şekilde repair edilir.

## Anaflaksi/perioperatif acil yönetim kontrolü

Bozuk örnek payload şu kaliteye repair edilir:

- Başlık: `Anestezi indüksiyonu sonrası ani hipotansiyon`
- Soru kökü: `Genel anestezi altında gelişen ağır anafilaksi şüphesinde en uygun ilk yönetim yaklaşımı hangisidir?`
- Doğru cevap: `Tetikleyici ajanı durdurmak, yüzde 100 oksijen vermek, hızlı IV sıvı başlamak ve hemodinamik ciddiyete göre adrenalin uygulamak`
- Kanıt zinciri: zamanlama, hemodinamik bulgu, solunum bulgusu ve deri bulgusu olarak gerçek ipuçlarına dönüştürülür.
- Yönetim basamakları: tetikleyiciyi durdur + yardım çağır, %100 oksijen/hava yolu, hızlı IV kristaloid, hemodinamik ciddiyete göre adrenalin.

## Test sonucu

- Mevcut AI editorial smoke test raporu: `AI_EDITORIAL_QUALITY_50_TEST_REPORT.json` → 50/50 geçti.
- Yeni kopya rapor: `AI_EDITORIAL_QUALITY_50_TEST_REPORT_NEW.json` → 50/50 geçti raporu korunmuştur.
- Hedefli bozuk perioperatif anafilaksi payload’ı manuel olarak `normalizeGeneratedAIQuestion` + `validateAIQuestionCase` akışından geçirildi; repair sonrası doğru cevap yönetim paketine döndü ve quality gate hatasız geçti.
- Bu ortamda `npm install` Artifactory/NPM paket indirme aşamasında timeout olduğu için tam `npm run build` çalıştırılamadı. Kaynak dosyalar için ESM import/syntax kontrolleri yapılmıştır.

## Değiştirilen dosyalar

- `src/utils/editorialQuality.js`
- `src/utils/aiQuestionQualityGate.js`
- `src/utils/validateAIQuestion.js`
- `src/services/aiQuestionService.js`
- `src/utils/aiQuestionGenerator.js`
- `api/generate-ai-question.js`
- `scripts/run-ai-editorial-smoke-test.mjs`
- `scripts/run-ai-context-quality-50-test.mjs`
- `AI_EDITORIAL_QUALITY_50_TEST_REPORT_NEW.json`
- `AI_QUESTION_SCIENTIFIC_QUALITY_GATE_REWORK_REPORT.md`

## Çalıştırma komutları

```bash
npm install
npm run build
npm run dev
```

