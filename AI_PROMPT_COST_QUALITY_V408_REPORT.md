# KlinikIQ V408 — TUS AI Prompt Cost + Quality Repair Pass

## Amaç
20 soruda görülen kalite problemlerini promptu büyütmeden azaltmak ve 11 cent seviyesindeki maliyeti 3 cent hedefine yaklaştırmak için V407 üzerine V408 optimizasyonları yapıldı.

Temel prensip: daha uzun prompt değil, kısa üretim promptu + ucuz validator + gerektiğinde tek kısa AI repair pass.

## Değiştirilen dosyalar
- `api/tus-question-prompt.js`
- `api/generate-ai-question.js`
- `AI_PROMPT_COST_QUALITY_V408_REPORT.md`

## 1. Prompt sade kaldı, kalite sözleşmesi netleşti
Sistem promptu uzun örnek listeleriyle büyütülmedi. Ana kurallar korunup daha net hale getirildi:
- Soru kökü / panel tek başına çözdürmeli.
- Feedbackte kullanılan hasta-özel veri stem, compactVitals veya compactObjectiveData içinde görünmeli.
- İki seçenek savunulabiliyorsa köke eşik/zamanlama/stabilite/kontrendikasyon eklenmeli.
- Şıklar aynı kategoriden ve benzer uzunlukta olmalı.
- Çeldiriciler saçma değil, yakın klinik algoritma basamağı olmalı.
- Zorluk etiketi gerçekçi olmalı; klasik tek bilgi soruları otomatik Zor yazılmamalı.
- Feedback kısa, seçenek özelinde ve tekrarsız olmalı.

## 2. Zorluk etiketi daha gerçekçi hale getirildi
Eski akışta `requestedDifficulty` sanitize aşamasında modelin ürettiği difficulty alanını eziyordu. Bu, UI Zor gönderdiğinde her sorunun Zor kalmasına yol açabiliyordu.

V408'de sanitize mantığı değişti:
- Önce modelin ürettiği gerçekçi difficulty okunur.
- Yoksa request difficulty fallback olarak kullanılır.

Böylece klasik bilgilerde model `Orta`, algoritma/eşik ayrımlarında `Zor` yazabilir.

## 3. Hard Türkçe düzeltmeler güvenli sınıra çekildi
Anlam değiştirebilecek dönüşümler otomatik olmamalı. Bu yüzden semantik risk taşıyan dönüşüm kaldırıldı:
- `kontrendikasyon yoktur → kontrendikasyon belirtilmemiştir` artık yapılmaz.

Güvenli yazım/terim standardizasyonları korunup genişletildi:
- `life-threatening → yaşamı tehdit eden`
- `therapeutic → terapötik`
- `vaginal → vajinal`
- `kontraendike → kontrendike`
- `irreversibl → geri dönüşümsüz`
- `chylomikron → şilomikron`
- `acinar → asiner`
- `kranial → kraniyal`
- `cavernöz → kavernöz`
- `tubul → tübül`
- `glomerul → glomerül`
- `embryolojik → embriyolojik`
- `infeksiyon → enfeksiyon`

Bozuk ama anlamı belirsiz ifadeler otomatik çevrilmek yerine validator tarafından yakalanır:
- `bilinç bulan hasta`
- `artikulasyon düzeyi`
- `nazokompleks`
- `kloak/örs`

## 4. Validator üç seviyeli kalite akışına taşındı
V407'de bazı kalite hataları fallback'e sebep olabiliyordu. V408'de `classifyValidationErrors()` eklendi.

### Fatal
Sadece yapısal bozukluklar fallback'e yol açabilir:
- soru kökü boş
- 5 seçenek yok
- correctAnswer A-E dışında
- doğru cevap seçeneklerle eşleşmiyor
- aynı seçenek iki kez tekrar ediyor

### Repairable
Bu hatalar fallback sebebi değil; kısa AI repair pass tetikler:
- stem çok kısa veya klinik veri eksik
- feedbackte kökte olmayan olgu verisi
- doğru şık uzunlukla ele veriyor
- feedback tekrar ediyor
- çeldiriciler zayıf
- bozuk Türkçe / makine çevirisi ifadesi
- zorluk/bağlam/eşik eksikliği

### Advisory
Küçük kalite uyarıları soru üretimini durdurmaz, qualityNotes olarak kalır.

## 5. Tek kısa AI repair pass eklendi
Yeni akış:
1. AI ilk soruyu üretir.
2. Validator kontrol eder.
3. Fatal yoksa local fallback'e düşmez.
4. Repairable hata varsa tek kısa repair promptu çalışır.
5. Repair sonrası fatal yoksa soru kullanılır.
6. Repair başarısız olursa orijinal AI sorusu qualityNotes ile korunur.

Eklenen fonksiyonlar:
- `TUS_REPAIR_SYSTEM_PROMPT`
- `compactQuestionForRepair()`
- `buildRepairPrompt()`
- `repairQuestionWithAI()`

Repair prompt yeni soru üretmez; mevcut JSON'u düzeltir. Bu, tam ikinci üretime göre daha ucuzdur.

## 6. Feedback-kök uyumsuzluğu fallback değil repair sebebi oldu
En kritik problem olan “feedbackte kökte olmayan veri kullanılması” artık doğrudan local fallback'e düşürülmüyor. Önce AI'a kısa düzeltme yaptırılıyor:
- eksik kritik veri stem/panele eklenir veya
- feedbackten çıkarılır.

Bu özellikle şu tip hataları hedefler:
- BT/MR bulgusu feedbackte var ama kökte yok
- laktat/sodyum/TG/kalsiyum gibi lab değerleri feedbackte var ama kökte yok
- hızlı düzeltme, invazyon, grade, aktif kanama, peritonit gibi karar verdirici veri kökte yok

## 7. Doğru şık uzunluk kontrolü korundu
Doğru seçenek diğerlerinden belirgin uzun ve profesyonel görünüyorsa validator bunu repairable hata olarak işaretler. Böylece answer leak fallback'e düşmeden düzeltilebilir.

## 8. Maliyet etkisi
V408'in maliyet stratejisi:
- Ana prompt hâlâ kompakt.
- Default full retry yerine 1 ana üretim korunuyor.
- Sadece kalite problemi varsa kısa repair pass çalışıyor.
- Repair pass tam üretim değil, mevcut JSON düzenleme görevi olduğu için daha ucuz.
- Output uzunluğu hâlâ cap altında tutuluyor.
- Türkçe terim temizliği promptta değil post-process içinde yapılıyor.

Pratik beklenti:
- Soruların çoğu ilk üretimde geçerse maliyet V407 düzeyinde veya daha düşük kalır.
- Problemli sorularda küçük ek maliyet oluşur ama local fallback kalitesi düşmez.
- 20 soru için 3 cent hedefi hâlâ esas olarak model seçimi, output token cap, reasoning effort ve repair oranına bağlıdır.

## 9. Testler
Çalıştırılan kontroller:
- `node --check api/generate-ai-question.js` başarılı.
- `node --check api/tus-question-prompt.js` başarılı.
- `api/tus-question-prompt.js` import smoke test başarılı.
- Live AI kapalıyken handler local fallback smoke test başarılı.

Full Vite build çalıştırılmadı; ZIP içinde `node_modules` bulunmadığı için bağımlılık kurulumu yapılmadı.

## Önerilen env ayarları
3 cent hedefine yaklaşmak için production'da önerilenler:

```env
KLINIKIQ_AI_COST_PROFILE=ultra
TUS_AI_OUTPUT_DETAIL_MODE=concise
TUS_REMOTE_AI_ATTEMPTS=1
KLINIKIQ_TUS_AI_REPAIR_PASS=true
TUS_OPENAI_REPAIR_MAX_OUTPUT_TOKENS=1200
TUS_OPENAI_REASONING_EFFORT=low
TUS_OPENAI_VERBOSITY=low
KLINIKIQ_AI_QUESTION_BANK=false
KLINIKIQ_TUS_OUTPUT_CACHE=false
```

Not: Eğer gerçekten yeni soru beklentisi varsa output cache ve question bank kapalı kalmalı. Demo/hız modu istenirse ayrı bir kullanıcı modunda açılabilir.
