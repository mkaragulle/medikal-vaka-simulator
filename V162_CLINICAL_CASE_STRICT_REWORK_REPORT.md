# V162 Clinical Case Strict Rework

- 300 gömülü vaka için görünür olgu akışı hasta merkezli olacak şekilde yeniden sıkı kontrolden geçirildi.
- Risk bağlamı ve ayırt ettirici ipuçları veri alanlarından kaldırıldı.
- Hasta öyküsü alanları yalnızca öyküden öğrenilebilecek bilgilerle sınırlandı.
- Fizik muayene alanlarında yönerge/talimat cümleleri temizlendi; saptanmış klinik bulgu dili kullanıldı.
- Objektif Veri / Tetkik alanlarında generic başlıklar ve placeholder sonuçlar temizlendi.
- Nitel sonuçlarda referans alanları boş bırakıldı; sayısal laboratuvarlarda referans aralığı korundu.
- Patoloji, histoloji, görüntüleme, EKG, klinik ölçüm ve toksikoloji sonuçları vaka kararına katkı sağlayacak şekilde yeniden yazıldı.
- 300 vaka ve her vakada 5 seçenek korundu.
- `node --check src/data/cases.js` başarılı.
- Runtime import kontrolü: `rawCases.length === 300`, `badOptions === 0`, forbidden placeholder scan clean.
- `npm run build` çalışmadı; ZIP içinde `node_modules` olmadığı için `vite` bulunamadı.
