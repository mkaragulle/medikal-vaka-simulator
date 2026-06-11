# KlinikIQ V443 — Promptless Source-Read TUS

Bu sürümde TUS soru üretim akışı kullanıcının isteğine göre en yalın hâle indirildi.

## Ana hedef

AI'a artık kural listesi, kalite checklist'i, uzunluk/cümle sınırlaması, konu yönlendirmesi veya kalıp dayatması verilmiyor.

Aktif ana talimat tek fikirden oluşuyor:

> Bilimsel kaynakları oku ve bilimsel Türkçe TUS klinik sorusu üret.

## Değişen aktif dosyalar

- `api/generate-ai-question.js`
- `server/tus-question-prompt.js`

## Kaldırılanlar

- TUS promptundaki tüm uzun kalite kuralları
- Soru kökü / seçenek / açıklama / feedback için uzunluk, cümle veya karakter yönlendirmeleri
- Topic steering
- Recent question metni
- Anti-repeat metni
- Prompt cache
- Repair pass
- Local fallback
- Question-bank mantığı
- Model parametresiyle yaratıcılık/zorlama ayarı
- Feedback-kök uyumu için içerik kırpan deterministic filtreler
- Tıbbi içerik üzerinde kural bazlı yeniden yazma

## Korunan tek teknik zorunluluk

Uygulamanın çalışması için OpenAI çıktısı ekranda gösterilebilir JSON'a çevrilmek zorunda. Bu yüzden JSON mode korunur ve çok esnek bir JSON okuyucu kullanılır. Modelden belirli uzunlukta veya belirli kalıpta metin istenmez.

## Bilimsel kaynak okuma

- Responses API kullanılırken `web_search` aracı eklenir.
- Varsayılan olarak kaynak kontrolü açıktır: `TUS_ENABLE_SCIENTIFIC_SOURCE_CHECK=true`
- Varsayılan olarak web search zorunludur: `TUS_REQUIRE_SCIENTIFIC_SOURCE_CHECK=true`
- Kaynak okuma zorunlu olduğunda request body içinde `tool_choice: "required"` gönderilir.
- Web search tool type gerektiğinde `.env` üzerinden değiştirilebilir: `TUS_OPENAI_WEB_SEARCH_TOOL_TYPE=web_search`
- Bazı model/API kombinasyonlarında tool_choice problemi olursa `.env` ile `TUS_OPENAI_WEB_SEARCH_TOOL_CHOICE=auto` yapılabilir, ancak bu durumda kaynak okuma model kararına kalır.

## Not

Bu sürüm kaliteyi prompt kurallarıyla değil, modelin bilimsel kaynak okuyarak soru üretmesiyle sağlamaya çalışır. İçerik üzerinde kısıtlama veya uzunluk baskısı yoktur.
