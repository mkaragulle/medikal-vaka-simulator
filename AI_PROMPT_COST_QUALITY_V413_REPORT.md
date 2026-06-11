# KlinikIQ V413 — No Prompt Cache Key

## Amaç
Kullanıcının isteği doğrultusunda `prompt_cache_key` karakter kısaltma/limit mantığı kaldırıldı. AI ile TUS sorusu üretiminde artık prompt cache key parametresi hiç gönderilmiyor.

## Yapılan Değişiklikler

### 1. TUS endpointinden prompt cache kaldırıldı
Dosya: `api/generate-ai-question.js`

- `buildPromptCacheConfig` importu kaldırıldı.
- OpenAI request body içine `prompt_cache_key` veya `prompt_cache_retention` eklenmiyor.
- Provider cache hatası için yapılan ikinci cache'siz retry bloğu kaldırıldı; çünkü artık cache parametresi hiç gönderilmiyor.
- `PROMPT_VERSION` şu şekilde güncellendi:
  - `klinikiq-v413-simple-direct-no-prompt-cache`

### 2. Global prompt cache helper güvenli şekilde devre dışı bırakıldı
Dosya: `api/lib/ai-token-optimizer.js`

`buildPromptCacheConfig()` artık her zaman `{}` döndürür.

Böylece:
- karakter limiti uygulanmaz,
- hash/kısaltma yapılmaz,
- provider'a prompt cache parametresi gönderilmez,
- `Invalid prompt_cache_key: string too long` hatası tekrar oluşmaz.

### 3. Sade V411/V412 mimarisi korundu
Aşağıdakiler hâlâ yok:

- kalite gate zinciri,
- repair pass,
- question-bank reuse,
- output cache,
- local fallback,
- çoklu üretim denemesi.

Akış hâlâ kısa ve direkt:

1. Kısa prompt hazırlanır.
2. Tek OpenAI çağrısı yapılır.
3. Compact JSON alınır.
4. UI şemasına çevrilir.
5. Temel yapısal kontrol yapılır.

## Testler

Çalıştırılan kontroller:

- `node --check api/generate-ai-question.js`
- `node --check api/lib/ai-token-optimizer.js`
- `buildPromptCacheConfig()` smoke test: `{}` döndü.
- Mock OpenAI endpoint testi: request body içinde `prompt_cache_key` olmadığı doğrulandı ve endpoint `ok:true` döndürdü.

## Sonuç
Bu sürümde karakter sınırlaması yapılmıyor. Bunun yerine ilgili cache parametresi tamamen kaldırıldığı için OpenAI tarafındaki 64 karakter sınırı artık AI TUS üretimini etkileyemez.
