# KlinikIQ V417 — Simple Professional TUS AI

## Amaç
V416 üzerinde AI ile TUS sorusu üretim hattı karmaşıklaştırılmadan yeniden düzenlendi. Hedef; hikâyeleştirilmiş klinik olgu, temiz veri paneli, kök-feedback tutarlılığı, daha profesyonel Türkçe ve gereksiz fallback/gate döngüsü olmadan daha güvenilir soru üretimidir.

## Değiştirilen dosyalar
- `api/tus-question-prompt.js`
- `api/generate-ai-question.js`
- `src/utils/simpleAIQuestionAdapter.js`
- `src/services/aiQuestionService.js`
- `src/components/AIGeneratedQuestionView.jsx`

## 1. Prompt yeniden sade yazıldı
System prompt yeniden yazıldı. Uzun istisna listeleri yerine kısa kalite sözleşmesi kullanıldı:
- Olgu metni 2-4 doğal klinik cümle olmalı.
- Laboratuvar, vital ve görüntüleme verileri `cv` / `co` alanında madde madde tutulmalı.
- Feedbackte kökte veya veri panelinde olmayan hasta-özel veri kullanılmamalı.
- Soru hedefi net olmalı: ilk test, kesin doğrulama, ilk tedavi, sonraki adım, mekanizma gibi ifadeler karışmamalı.
- Seçenekler benzer uzunlukta ve aynı kategoriden olmalı.
- Açıklama ve feedback kısa, seçenek-özel ve tekrarsız olmalı.
- Anatomi/embriyoloji sorularında lokalizasyon ve ark/kese/oluk/krest ayrımı vurgulandı.

## 2. Frontend veri paneli problemi düzeltildi
Önemli hata: `src/utils/simpleAIQuestionAdapter.js` içinde `cv/co` verileri tekrar soru köküne gömülüyor ve sonra paneller boşaltılıyordu. Bu yüzden server doğru JSON üretse bile ekranda şu tarz kötü metinler oluşabiliyordu:

> Ek klinik verilerde ... Tetkik ve destekleyici bulgularda ...

V417’de bu kaldırıldı:
- `compactVitals` korunuyor.
- `compactObjectiveData` korunuyor.
- `stem` yalnızca hikâyeleştirilmiş klinik olgu olarak kalıyor.
- Boş label/value satırları filtreleniyor.

## 3. Hafif final temizlik katmanı eklendi
Kod tarafında güvenli Türkçe tıbbi dil normalizasyonu genişletildi:
- `stemde → soru kökünde`
- `life-threatening → yaşamı tehdit eden`
- `vaginal → vajinal`
- `kontraendike → kontrendike`
- `irreversibl → geri dönüşümsüz`
- `chylomicron/chylomikron → şilomikron`
- `acinar → asiner`
- `kranial → kraniyal`
- `tubul → tübül`
- `glomerul → glomerül`
- `nöral krista → nöral krest`
- `laparatomi → laparotomi`
- `toplumsal kazanımlı pnömoni → toplum kökenli pnömoni`

Klinik anlamı değiştirebilecek sert dönüşümler eklenmedi.

## 4. İç rehber/debug kalıntıları temizleniyor
Aşağıdaki kalıntılar final alanlardan temizleniyor veya repair sebebi sayılıyor:
- `A feedback`, `B feedback`
- `TUS ipucu.` placeholder
- `öğrenme hedefi:`
- `hedeflenen ayırıcı:`
- `kısıtlama:`
- `A) A)` / `B) B)` tekrarları
- boş veri satırları

## 5. Kök-feedback tutarlılığı için hafif kontrol eklendi
Feedback/açıklamada hasta-özel veri terimleri geçip kökte/veri panelinde yoksa soru doğrudan fallback’e düşmüyor. Bunun yerine yalnızca tek kısa repair pass deneniyor.

Örnek yakalanan terimler:
- laktat, sodyum, osmolalite, trigliserid, troponin
- BT, MR/MRI, USG, Doppler
- grade/evre, çap, invazyon, metastaz
- galaktomannan, zayıf asidorezistans, dallanan filament
- ARR, renin, aldosteron, kortizol, ACTH

## 6. Tek kısa repair pass eklendi
Bu sistem ağır kalite gate değildir. Sadece repairable sorun varsa çalışır:
- feedbackte kökte olmayan veri
- ham veri gibi duran kök
- iç rehber/placeholder kalıntısı
- doğru şıkkın aşırı uzun olması
- anatomi/embriyoloji nüans uyarısı

Repair başarısız olursa yapısal olarak kullanılabilir AI sorusu yine döner; local fallback eklenmedi.

Env ile kapatılabilir:

```env
TUS_AI_ENABLE_REPAIR=false
```

## 7. Loading ekranı sadeleştirildi
Frontend bekleme metinleri eski ağır kalite-gate dili yerine daha anlaşılır hale getirildi:
- Klinik olgu hikâyeleştiriliyor
- Seçenekler oluşturuluyor
- Açıklama sadeleştiriliyor
- Son temizlik yapılıyor

## Testler
- `node --check api/tus-question-prompt.js` başarılı.
- `node --check api/generate-ai-question.js` başarılı.
- `node --check src/utils/simpleAIQuestionAdapter.js` başarılı.
- `node --check src/services/aiQuestionService.js` başarılı.
- Mock OpenAI ile tek çağrılı üretim `ok:true` döndü.
- Mock OpenAI ile kök-feedback uyumsuzluğu senaryosunda 1 üretim + 1 repair sonrası `ok:true`, `repaired:true` döndü.
- Frontend adapter testinde `cv/co` verilerinin artık stem içine gömülmediği ve panelde korunduğu doğrulandı.

## Not
Full Vite build çalıştırılmadı; ZIP içinde `node_modules` bulunmuyor. Değişiklikler syntax ve mock endpoint seviyesinde test edildi.
