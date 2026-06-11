# KlinikIQ V415 — Story + Data Panel Prompt/UI Fix

## Amaç
AI ile TUS sorusu üretiminde klinik hikâyeyi doğal tutmak, ham laboratuvar/vital/görüntüleme değerlerini ise metin içinde yığmak yerine madde/panel halinde göstermek.

## Yapılan değişiklikler

### 1) Prompt güncellendi
`api/tus-question-prompt.js` içinde system ve user prompta şu kural eklendi:

- Yakınma, öykü ve muayene bulguları `s` alanında doğal klinik hikâye olarak yazılacak.
- Serum Na, osmolalite, laktat, BT/MR bulgusu, vital değer gibi ham ölçümler `cv` / `co` alanlarına madde madde yazılacak.
- Aynı ölçüm hem soru kökünde hem veri panelinde tekrar edilmeyecek.

### 2) Veri paneli tekrar açıldı
`src/components/AISpotQuestionScreen.jsx` içinde AI TUS sorularındaki destek veri paneli tekrar aktif edildi.

Önceki davranış:
- `supportDataGroups = []`
- Tüm veriler paragraf içine gömülüyordu.

Yeni davranış:
- `supportDataGroups = getAISpotSupportDataGroups(question)`
- Laboratuvar/vital/görüntüleme verileri kompakt panelde gösteriliyor.

### 3) Hikâyeden ham veri tekrarları temizlendi
`src/utils/aiSpotNarrative.js` içinde ham veri ayrıştırma güçlendirildi:

- `Ek klinik verilerde ...` kalıbı temizleniyor.
- Serum Na, idrar Na, serum osmolalitesi, idrar osmolalitesi gibi değerler destek veri paneline alınabiliyor.
- Dense lab/vital cümleleri hikâye paragrafından çıkarılıyor.
- Cümle bölme mantığı küçük harfle başlayan ikinci cümleleri de ayıracak şekilde düzeltildi.

## Örnek beklenen görünüm

### Hikâye
42 yaşında bilinci bulanıklaşmış, kusma ve halsizlik yakınmaları olan bir kadın hasta değerlendirilmektedir. Fizik muayenede sistemik hipotansiyon veya belirgin volüm kaybı bulgusu yoktur; klinik olarak övolemik görünüm söz konusudur.

### Laboratuvar verileri
- Serum Na⁺: 124 mmol/L
- Serum osmolalitesi: 265 mOsm/kg
- İdrar osmolalitesi: 600 mOsm/kg
- İdrar Na⁺: 85 mmol/L

## Korunan mimari
- Prompt cache yok.
- Question-bank yok.
- Ağır kalite gate yok.
- Local fallback yok.
- Repair sistemi eklenmedi.
- Sade V413/V414 direct AI akışı korundu.

## Test
- `node --check api/tus-question-prompt.js` başarılı.
- `node --check api/generate-ai-question.js` başarılı.
- Örnek SIADH/adrenal yetmezlik kökünde lab değerleri hikâyeden ayrılarak `Laboratuvar verileri` paneline alındı.
