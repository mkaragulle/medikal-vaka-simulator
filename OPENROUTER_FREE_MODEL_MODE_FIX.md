# OpenRouter Free Model Mode Fix

Bu sürüm OpenRouter ücretli/kredili modeller yerine `openai/gpt-oss-120b:free` gibi `:free` modellerle çalışmak üzere ayarlandı.

## Değişiklikler

- Varsayılan OpenRouter modeli `openai/gpt-oss-120b:free` yapıldı.
- `OPENROUTER_FREE_MODEL_MODE=true` eklendi.
- Free modelde tam KlinikIQ şeması doğrudan modele yazdırılmıyor; modelden kısa compact JSON alınır ve endpoint bunu tam KlinikIQ şemasına tamamlar.
- `google/gemini-2.5-flash-lite` varsayılanlarından çıkarıldı; bu model kredi gerektirebilir.
- `openai/gpt-oss-120b:free` yavaş olduğu için frontend timeout 90 saniye, server per-model timeout 52 saniye önerildi.
- Test scripti beklenen modeli `openai/gpt-oss-120b:free` olarak güncellendi.

## Öneri

Free model yavaş olabilir. Testlerde 30-55 saniye süre normal kabul edilebilir. Daha stabil ve hızlı üretim için OpenRouter kredisiyle `google/gemini-2.5-flash-lite` gibi hızlı modeller kullanılabilir.
