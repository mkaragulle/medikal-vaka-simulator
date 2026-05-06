# KlinikIQ Clinical Content QA / Management & Investigation Rework

## Kapsam
- Toplam incelenen vaka: **132**
- TUS Spot Olgular: **62**
- Aktif klasik/klinik vaka yönetim akışı: **70**

## Yapılan temel düzeltmeler
1. `buildInvestigationOrders` içindeki otomatik genel tetkik bankası varsayılan olarak kapatıldı. Böylece her vakaya otomatik CBC, biyokimya, koagülasyon, kan gazı, tam idrar, akciğer grafisi vb. eklenmesi engellendi.
2. TUS Spot Olgular’da uzun ve gizli kalan yönetim algoritmaları sadeleştirildi; spot vakalarda yönetim sırası görünmeyecek şekilde temizlendi.
3. Şablon ve tekrar eden yönetim metinleri temizlendi. Özellikle pnömoni, sıtma, meningokoksemi, septik şok, Bruton agammaglobulinemisi, SLE, RA, DKA ve biyokimya/metabolizma vakaları vaka özelinde yeniden yazıldı.
4. Biyokimya/metabolizma vakalarında “beslenme ilişkisi/akut hipoglisemi/enzim-genetik test” şeklindeki kopya kalıp yerine hastalığa özgü klinik yaklaşım yazıldı.
5. Tetkik sonuçları daha somut hale getirildi; pnömoni, DKA, SLE ve skorbüt gibi vakalarda istem önceliği ve sonuç açıklamaları vaka özelinde düzeltildi.

## Sayısal özet
- Tek tek incelenen vaka: **132**
- Yönetim sırası değiştirilen/sadeleştirilen vaka: **84**
  - TUS Spot sadeleştirme: **62**
  - Tam vaka özel yeniden yazım: **22**
- Görünür gereksiz tetkik azaltımı: **855**
  - Otomatik/sentetik tetkik bankasından kaldırılan görünür istem: **854**
  - Açık vaka verisinden kaldırılan duplicate istem: **1**
- Vaka özel tetkik düzeltmesi yapılan açık veri alanı: **9**
- Son görünür tetkik sayısı: **239**
- TUS Spot Olgular’da 2’den fazla tetkik kalan vaka: **0**
- Yasaklı/şablon yönetim ifadesi kalan hit: **0**

## Öne çıkan vaka bazlı düzeltmeler
- **Toplum kökenli lobar pnömoni:** yatış riski, lobar konsolidasyon, ampirik antibiyotik, kültürün hangi durumda anlamlı olduğu ve 48-72 saat yanıt kontrolü olarak yeniden yazıldı.
- **Sıtma:** seyahat öyküsü, kalın damla/ince yayma, ağır sıtma ayrımı ve IV artesunat/ACT yaklaşımıyla yeniden düzenlendi.
- **Meningokoksemi:** peteşi-purpura, acil antibiyotik, damlacık izolasyonu ve temaslı profilaksisi eklendi.
- **Septik şok:** laktat, hemodinami, kültür-antibiyotik zamanlaması, sıvı ve norepinefrin sırası vaka özelinde yazıldı.
- **Bruton agammaglobulinemisi:** anne IgG azalması sonrası enfeksiyon paterni, Ig düşüklüğü, B hücre azalması, IVIG ve canlı aşı uyarısı ile düzeltildi.
- **SLE:** anti-dsDNA/kompleman aktivite takibi, proteinüri-hematüri ve nefrit değerlendirmesi vurgulandı.
- **RA:** eklem hastasında gereksiz akciğer grafisi yaklaşımı çeldirici olarak konumlandırıldı; RF/anti-CCP, akut faz ve eklem görüntüleme hedefli kaldı.
- **DKA:** sıvı, potasyum, insülin, dekstroz ve tetikleyici tarama sırası yeniden düzenlendi.
- **Biyokimya/metabolizma vakaları:** galaktozemi, HFI, Von Gierke, PKU, MSUD, alkaptonüri, albinizm, homosistinüri, pellagra, skorbüt, hemokromatozis, ailesel hiperkolesterolemi, Tangier ve G6PD krizinde hastalığa özgü yönetim yazıldı.

## Değiştirilen dosyalar
- `src/data/cases.js`
- `src/utils/investigationOrders.js`
- `src/components/ManagementSequencePanel.jsx`
- `scripts/reworkClinicalContent.mjs`
- `KLINIKIQ_CLINICAL_CONTENT_QA_REPORT.json`
- `KLINIKIQ_CLINICAL_CONTENT_QA_REPORT.md`

## Build/test sonucu
- `npm install --no-audit --no-fund`: başarılı
- `npm run build`: başarılı
- Vite build çıktısı: `dist/` klasörü oluşturuldu.

## Çalıştırma komutları
```bash
npm install
npm run build
npm run dev
```
