# KlinikIQ V416 — Story-first Prompt/Data Panel Fix

## Amaç
AI ile TUS sorusu üretiminde soru kökünün ham veri listesi gibi görünmesini engellemek ve tüm soru köklerini doğal klinik hikâye formatına yaklaştırmak.

## Yapılan Değişiklikler

### 1. Prompt kuralı güncellendi
System prompt ve user prompt içine kısa ama net bir kural eklendi:

- Soru kökü mutlaka hikâyeleştirilmiş 2-4 doğal klinik cümle olmalı.
- Hasta yakınması, süre/bağlam ve muayene ilişkisi anlatılmalı.
- `Ek klinik verilerde...` veya `Tetkik ve destekleyici bulgularda...` ile başlayan ham veri cümleleri soru kökü olarak kullanılmamalı.
- Serum Na, osmolalite, laktat, β-hCG, BT/MR/USG bulguları gibi ham ölçümler `cv` / `co` alanlarına madde madde yazılmalı.

### 2. Server-side koruma eklendi
Model yine de ham veri kökü üretirse, `api/generate-ai-question.js` içinde `buildStoryStem` mantığı devreye girer:

- Ham veri cümleleri kökten temizlenir.
- `dem`, `cc`, `set` alanlarından kısa doğal klinik hikâye oluşturulur.
- Ölçülebilir veriler `compactVitals` / `compactObjectiveData` içinde korunur.

### 3. Prompt versiyonu güncellendi
`PROMPT_VERSION` şu değere alındı:

`klinikiq-v416-story-first-data-panel`

## Örnek Beklenen Görünüm

Kötü görünüm:

> Ek klinik verilerde vital bulgu: stabil, servikal muayene: os kapalı. Tetkik ve destekleyici bulgularda transvajinal US: intrauterin gestasyon kesesi yok, serum β-hCG: 1500 IU/L.

İstenen görünüm:

> 28 yaşında kadın hasta, adet gecikmesi ve hafif kasık ağrısı nedeniyle acil serviste değerlendirilmektedir. Hemodinamik durum, gebelik olasılığı ve muayene bulguları birlikte yorumlanmaktadır.

Veri paneli:

- Vital bulgu: stabil
- Transvajinal US: intrauterin gestasyon kesesi yok
- Serum β-hCG: 1500 IU/L

## Korunan Mimari

- Prompt cache yok.
- Question-bank yok.
- Çoklu attempt yok.
- Ağır kalite gate yok.
- Local fallback yok.
- Sade doğrudan AI üretim hattı korundu.

## Test

- `node --check api/generate-ai-question.js` başarılı.
- Mock OpenAI cevabında ham veriyle başlayan kök, doğal hikâyeye çevrildi ve veriler panelde korundu.
