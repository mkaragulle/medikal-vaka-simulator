# KlinikIQ Glossary Tooltip Unit Fix Report

## Amaç
Glossary/tooltip sisteminin laboratuvar ve vital ölçü birimlerini tıbbi terim gibi işaretlemesini engellemek.

## Değiştirilen dosyalar
- `src/utils/glossary.js`
- `src/components/GlossaryTooltip.jsx`

## Eklenen merkezi koruma
`src/utils/glossary.js` içine merkezi `UNIT_BLACKLIST` eklendi. Aşağıdaki ölçü birimleri glossary autolink dışında bırakıldı:

`mg`, `g`, `kg`, `mcg`, `µg`, `ng`, `mL`, `L`, `dL`, `mg/dL`, `mg/L`, `g/dL`, `mmol/L`, `mEq/L`, `IU/L`, `U/L`, `pg/mL`, `ng/mL`, `µIU/mL`, `mmHg`, `bpm`, `°C`, `%`, `/mm³`, `x10^3/µL`.

## Eklenen matcher kontrolleri
- Ölçü birimleri alias olarak matcher içine alınmıyor.
- `number + unit` yapıları korumalı aralık olarak işaretleniyor.
- Korunan aralığın içinde kalan glossary eşleşmeleri iptal ediliyor.
- Kısa büyük harfli kısaltmalar case-sensitive hale getirildi.
- `mg` artık `MG` alias’ı ile eşleşmiyor.
- `MG` yalnızca büyük harfli ve gerçek tıbbi kısaltma olarak geçtiğinde tooltip alabiliyor.

## Kontrol edilen örnekler
Tooltip çıkmaması gereken örnekler:
- `Kreatinin 0.9 mg/dL`
- `Üre 34 mg/dL`
- `Sodyum 136 mmol/L`
- `Glukoz 412 mg/dL`
- `CRP 142 mg/L`
- `TA 120/80 mmHg`
- `Nabız 98 bpm`
- `Ateş 38.2 °C`
- `WBC 17.800/mm³`

Tooltip çıkabilecek örnek:
- `MG, fluktuasyon gösteren kas güçsüzlüğü ile karakterizedir.`

## Test sonucu
- `src/utils/glossary.js` Node syntax kontrolünden geçti.
- Unit range helper fonksiyonları örnek laboratuvar/vital ifadelerinde doğru korumalı aralık üretti.
- Bu sandbox ortamında `npm install` dependency kurulumu timeout’a düştüğü için tam Vite build tamamlanamadı; kod düzeyinde import/syntax kontrolü ve matcher mantık testi yapıldı.
