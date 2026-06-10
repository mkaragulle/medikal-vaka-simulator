# V439 — Vercel Hobby Deploy Fix

## Amaç
Vercel loglarında `vite build` başarıyla tamamlanmasına rağmen deployment `Deploying outputs... status ● Error` aşamasında kalıyordu. Build tarafında syntax/import hatası görünmüyordu. Projedeki `vercel.json` içinde bazı API fonksiyonları için `maxDuration: 300` tanımlıydı. Hobby/Free deployment senaryosunda bu değer güvenli değildir ve deploy validasyonunda hata oluşturabilir.

## Yapılan değişiklikler

### 1) `vercel.json`
Tüm API fonksiyonlarının `maxDuration` değeri 60 saniyeye çekildi.

Değişen fonksiyonlar:
- `api/generate-ai-question.js`: 60 olarak korundu
- `api/generate-lesson.js`: 300 → 60
- `api/analyze-uploaded-material.js`: 300 → 60
- `api/generate-material-questions.js`: 300 → 60
- `api/generate-material-flashcards.js`: 300 → 60
- `api/validate-ai-output.js`: 300 → 60

### 2) `package.json`
Node engine değeri daha stabil Vercel formatına çekildi:

```json
"engines": {
  "node": "22.x"
}
```

Bu, Vercel’in `>=20.19.0` uyarısını azaltmak ve Node major sürümünün beklenmedik şekilde değişmesini engellemek içindir.

## Değişmeyenler
- TUS AI prompt sistemi değiştirilmedi.
- Soru üretim kalitesi/prompt mantığı değiştirilmedi.
- Metin uzunluğu, cümle veya karakter sınırı eklenmedi.
- Prompt cache, repair pass, local fallback, question-bank veya topic steering eklenmedi.
- Minimal JSON üretim yapısı korundu.

## Kontroller
- `vercel.json` JSON parse kontrolünden geçti.
- `package.json` JSON parse kontrolünden geçti.
- `api/*.js` dosyalarında `node --check` çalıştırıldı ve syntax hatası görülmedi.

## Sonraki adım
Bu ZIP'i projeye açıp GitHub'a commit/push yaptıktan sonra Vercel'de redeploy yapılmalı. İlk deneme için `Redeploy without Build Cache` önerilir.
