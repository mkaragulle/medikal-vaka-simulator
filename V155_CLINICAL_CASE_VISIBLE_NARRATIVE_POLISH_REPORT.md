# V155 Clinical Case Visible Narrative Polish

- Klinik branş seç altında kullanılan 300 gömülü olgunun görünür hasta özeti alanları yeniden tarandı.
- Risk bağlamı, ayırt ettirici ipuçları ve fizik muayene/objektif veri alanları birbirini tekrar etmeyecek şekilde ayrıştırıldı.
- Başlık, başvuru ve kısa öykü metinlerinin risk/ipuçları/fizik muayene içine tekrar kopyalanması engellendi.
- Fizik muayene paneli mümkün olduğunca gerçek muayene, vital, laboratuvar, görüntüleme veya objektif veri cümleleriyle dolduruldu.
- Serotonin sendromu örneği özel olarak düzeltildi: ilaç risk bağlamı, klonus/hiperrefleksi ipuçları ve fizik muayene bulguları ayrı alanlara taşındı.
- Geri bildirimlerdeki kanıt zinciri ve yanlış seçenek açıklamaları tekrar eden “ana klinik patern” tarzı cümlelerden arındırıldı.
- 300 olgunun tamamında 5 seçenek korundu.
- `node --check src/data/cases.js` başarılı.
- Runtime import kontrolünde `rawCases.length === 300`, `cases.length === 300`, `badOptions === 0`, görünür alan tekrar çakışması `0` olarak doğrulandı.
- `npm run build` denenmiştir; ZIP içinde `node_modules` bulunmadığı için `vite: not found` hatasıyla çalışmamıştır.
