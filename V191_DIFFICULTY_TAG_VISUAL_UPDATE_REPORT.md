# V191 Difficulty Tag Visual Update

- Branş detay ekranındaki `Kolay / Orta / Zor / Acil` filtre butonları görsel pill/tag yapısına dönüştürüldü.
- Kolay: hafif mavimsi, Orta: hafif yeşilimsi, Zor: hafif morumsu, Acil: hafif kırmızımsı olarak tasarlandı.
- Üst vaka kartındaki `Zorluk · puan` tagi aynı görsel sistemle uyumlu hale getirildi.
- Alt `Diğer olgular` kartlarındaki zorluk tagleri aynı renk sistemiyle yeniden override edildi.
- `Tümü` filtresi nötr pill olarak bırakıldı.

Kontroller:
- rawCases = 300
- cases = 300
- Duplicate ID yok
- Her vakada 5 tanı seçeneği var
- Doğru cevap seçenekler içinde
- Option feedback eşleşmeleri tam
- shuffleOptions = false tüm havuzda korunuyor
- [object Object] yok
- node --check src/data/cases.js geçti
- node --check src/utils/scoring.js geçti
- node --check src/utils/tusLanguageStandard.js geçti
- npm run build çalışmadı çünkü zip ortamında vite yok.
