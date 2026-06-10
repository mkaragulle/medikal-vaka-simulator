# KlinikIQ V438 — Deploy Safe Patch

Bu sürüm V437 üzerine minimum deployment güvenliği düzeltmesi uygular.

## Değişiklik
- `package.json` içindeki Node engine değeri `>=20.19.0` yerine Vercel tarafından doğrudan desteklenen major format olan `22.x` yapıldı.
- TUS prompt/AI kalite mimarisi değiştirilmedi.
- Metin uzunluğu/cümle/karakter kısıtları geri eklenmedi.
- Prompt cache, repair pass, fallback, question-bank veya topic steering eklenmedi.

## Not
Vercel deployment hatasının gerçek satırı loglarda görünür. Bu patch Node/Vite engine kaynaklı deployment uyumsuzluğunu önlemek için güvenli bir düzeltmedir.
