# KlinikIQ OpenRouter Fast-Only Stability Patch

Bu paket, `KlinikIQ_AI_Scientific_Quality_Gate_Rework(1).zip` üzerine uygulanmıştır.

## Kök problem

Backend testi bazen `google/gemini-2.5-flash-lite` yerine `openai/gpt-oss-120b:free` modeline düşüyordu. Bu model 38-60 saniye aralığında yanıt verdiği için Vercel Function 504 timeout üretiyor ve UI local generator fallback'e dönüyordu.

## Uygulanan minimal düzeltme

- OpenRouter model seçimi fast-only hale getirildi.
- `openai/gpt-oss-120b:free` ve `gpt-oss-120b`, `OPENROUTER_ALLOW_SLOW_MODELS=true` verilmedikçe bloklandı.
- Varsayılan `OPENROUTER_MAX_MODEL_ATTEMPTS` 1 yapıldı.
- Varsayılan `OPENROUTER_PER_MODEL_TIMEOUT_MS` 16000 yapıldı.
- Varsayılan `OPENROUTER_MAX_TOKENS` 1700 yapıldı.
- Server-side `REMOTE_AI_ATTEMPTS` varsayılanı 1 yapıldı.
- `.env.example` Vercel ayarları fast-only olacak şekilde güncellendi.
- `test-openrouter-endpoint.ps1`, yavaş model kullanılırsa `SLOW_MODEL_CHECK_ENV` uyarısı verecek şekilde güncellendi.

## Değişen dosyalar

- `api/generate-ai-question.js`
- `.env.example`
- `test-openrouter-endpoint.ps1`
- `KLINIKIQ_OPENROUTER_FAST_ONLY_PATCH_ON_SCIENTIFIC_GATE.md`

## Beklenen test çıktısı

`test-openrouter-endpoint.ps1` çalıştırıldığında model alanı şu olmalıdır:

```txt
MODEL=google/gemini-2.5-flash-lite
```

Süre hedefi: 4-12 saniye. `openai/gpt-oss-120b:free` görünüyorsa Vercel environment variables hâlâ eski değeri kullanıyordur.
