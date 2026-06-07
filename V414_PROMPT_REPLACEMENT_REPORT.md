# KlinikIQ V414 — Prompt Replacement Report

## Yapılan işlem
V413 Simple Direct No Prompt Cache projesindeki `api/tus-question-prompt.js` dosyasında bulunan ana TUS üretim promptları, kullanıcının ilettiği iki yeni sade prompt dosyasıyla değiştirildi.

## Değiştirilen dosyalar
- `api/tus-question-prompt.js`
- `api/generate-ai-question.js` içindeki `PROMPT_VERSION` etiketi güncellendi.

## Değiştirilen promptlar
1. `OPTIMIZED_TUS_SYSTEM_PROMPT`
   - Yeni sistem promptu `klinikIQ_TUS_soru_uretimi_sade_prompt(1).txt` içeriğiyle değiştirildi.

2. `buildUserPrompt(...)`
   - User prompt template’i `klinikIQ_kompakt_JSON_uretimi_prompt(1).txt` içeriğiyle değiştirildi.
   - `${branchText}`, `${selectedDifficulty}`, `${focus}`, `${recentCompact}` ve `${cleanText(antiRepeatNonce)}` değişkenleri dinamik olarak korunmuştur.

## Korunan mimari
- Prompt cache yok.
- Question-bank yok.
- Çoklu attempt yok.
- Ağır kalite gate yok.
- Repair pass eklenmedi.
- Local fallback eklenmedi.
- V413 simple direct AI akışı korunmuştur.

## Testler
- `node --check api/tus-question-prompt.js` başarılı.
- `node --check api/generate-ai-question.js` başarılı.
- ES module import smoke test başarılı.

## Not
Bu sürümde yalnızca kullanıcının ilettiği yeni system/user promptları projeye yerleştirilmiştir. Ek validator, gate, repair veya fallback mantığı eklenmemiştir.
