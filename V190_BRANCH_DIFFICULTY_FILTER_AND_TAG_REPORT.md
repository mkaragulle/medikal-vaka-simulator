# V190 — Branş Zorluk Filtresi ve Vaka Tag Güncellemesi

## Yapılanlar

- Klinik branş detay ekranının üst sağ aksiyon alanına zorluk filtresi eklendi.
- Filtre seçenekleri: Tümü, Kolay, Orta, Zor, Acil.
- Filtre seçildiğinde:
  - Açık vaka havuzu ilgili zorluk düzeyine göre daraltılır.
  - “Yeni vaka çöz” aynı filtre içinden rastgele vaka getirir.
  - Alt “Diğer olgular” listesi aynı filtreye göre güncellenir.
  - “Branş bloku oluştur” aktif filtredeki vakalardan blok oluşturur.
- 300 vakanın difficulty/difficultyTag alanları Kolay-Orta-Zor-Acil standardına dönüştürüldü.
- Eski “Zor · 19p” gibi tag sistemi yeni dört kademeli etiketlemeye göre çalışacak şekilde scoring tarafı güncellendi.

## Toplam dağılım

- Kolay: 39
- Orta: 67
- Zor: 87
- Acil: 107
- Toplam: 300

## Kontroller

- rawCases = 300
- cases = 300
- Her vaka Kolay/Orta/Zor/Acil kategorilerinden birine bağlı
- Her vakada 5 seçenek var
- Doğru cevap her vakada seçenekler içinde
- [object Object] yok
- node --check src/data/cases.js geçti
- node --check src/utils/scoring.js geçti
- node --check src/utils/tusLanguageStandard.js geçti
