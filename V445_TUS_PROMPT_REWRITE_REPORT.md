# KlinikIQ V445 — TUS AI Spot Prompt Rewrite Report

Bu sürümde TUS AI Spot soru üretim sistemi ilgili dosyalarda sıfırdan sade ve profesyonel şekilde yeniden yazıldı.

## Düzenlenen ana dosyalar

- `server/tus-question-prompt.js`
- `api/generate-ai-question.js`
- `server/lib/ai-token-optimizer.js`
- `src/utils/simpleAIQuestionAdapter.js`

## Ana hedef

TUS soru üretiminde promptun kaliteyi tarif etmesi; fakat üretimi karakter, cümle, token, örnek vaka, örnek hastalık, örnek seçenek veya kelime-kalıp yasak listeleriyle manipüle etmemesi.

## Yapılan değişiklikler

### 1. System prompt sıfırdan yazıldı

Yeni prompt bilimsel doğruluk, klinik gerçekçilik, tek doğru cevap, seçenek kalitesi, açıklama/feedback tutarlılığı ve Türkçe tıp dili üzerine kuruldu.

### 2. User prompt sıfırdan yazıldı

User prompt yalnızca şu bilgileri taşır:

- Branş
- Zorluk
- Kullanıcı hedefi varsa hedef
- Kaynak/metin/materyal varsa kaynak
- Geçerli JSON üretim talebi

### 3. Kompakt cv/co şeması yerine açık alanlar kullanıldı

Yeni JSON alanları:

- `clinicalStem`
- `vitals`
- `objectiveData`
- `optionFeedback`
- `evidenceBasedReasoning`
- `sourceUseNote`

Backend yine eski `cv/co/s/q/o/c/e/f` gibi alanları okuyabilecek şekilde geriye uyumlu bırakıldı.

### 4. Token/kısa cevap baskıları kaldırıldı

OpenAI çağrısından şu tip parametreler çıkarıldı:

- `max_output_tokens`
- `max_completion_tokens`
- `reasoning.effort`
- `text.verbosity`
- maliyet profiliyle otomatik token kısma

### 5. Web search zorunluluğu kaldırıldı

Bilimsel kaynak mantığı prompt düzeyinde kaynak verildiyse onu kullanma, kaynak yoksa genel kabul görmüş tıbbi bilgiye dayanma şeklinde düzenlendi. Backend artık soru üretimini OpenAI web-search tool kullanımına zorlamaz.

### 6. Maliyet/token optimizer sadeleştirildi

`server/lib/ai-token-optimizer.js` artık token veya maliyet profili uygulamaz. Sadece env okuma, model çözümleme ve isteğe bağlı loglama yardımcılarını içerir.

### 7. Adapter açık alanları destekleyecek şekilde güncellendi

`simpleAIQuestionAdapter.js` artık `clinicalStem`, `vitals`, `objectiveData` alanlarını doğal şekilde işler. Geriye dönük `stem`, `cv`, `co` desteği korunmuştur.

## Korunan güvenli ilkeler

- Yalnızca geçerli JSON çıktısı
- Beş seçenek
- A-E doğru cevap harfi
- Açıklama zorunluluğu
- Her seçenek için feedback zorunluluğu
- Local fallback soru bankasının kapalı kalması
- TUS AI Spot dışındaki AI endpointlerinin devre dışı kalması
