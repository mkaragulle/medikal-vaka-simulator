# OpenRouter Low-Credit Stability Fix

Bu sürüm, OpenRouter hesabında kredi çok düşükken görülen iki hatayı azaltır:

1. `402: This request requires more credits, or fewer max_tokens`
2. Token düşürülünce modelin `evidenceChain` veya `examPearl` alanlarını eksik döndürmesi

## Yapılan değişiklikler

- `api/generate-ai-question.js` içinde OpenRouter 402 hatası yakalanırsa düşük tokenlı compact JSON modu denenir.
- Compact JSON, server tarafında KlinikIQ tam şemasına genişletilir.
- Remote model `evidenceChain`, `examPearl`, `wrongOptionFeedback`, `findings` gibi alanları eksik döndürürse güvenli tamamlayıcı katman devreye girer.
- Varsayılan OpenRouter max token ayarı 900 olarak düşürüldü.
- `.env.example` düşük krediye uygun ayarlarla güncellendi.

## Not

OpenRouter hesabında sadece ~343 token karşılanabiliyorsa tam kaliteli TUS sorusu üretimi garanti edilemez. Compact mode uygulamayı kırmadan gerçek AI çekirdeğinden kısa soru alır ve eksik şema alanlarını server tarafında tamamlar. En stabil kalite için OpenRouter kredisi eklemek gerekir.
