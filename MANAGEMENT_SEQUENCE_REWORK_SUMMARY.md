# KlinikIQ Yönetim Sırası Rework Özeti

Bu sürümde KlinikIQ veri setindeki tüm vakaların `managementSequence` alanı yeniden oluşturuldu. Amaç, her vakada aynı genel sepsis/enfeksiyon şablonunu kullanmak yerine tanıya, klinik aciliyete, branşa ve TUS öğrenme hedefine göre özel yönetim basamakları sağlamaktır.

## Kapsam

- Toplam vaka: 132
- Yönetim sırası eklenen/güncellenen vaka: 132
- TUS Spot Olgular içinde kısa yönetim/yaklaşım sırası gösterilen vaka: 62
- Eksik veya `undefined` başlık düzeltmesi yapılan vaka: 48 PDF kaynaklı spot olgu başlığı dâhil olmak üzere tüm vaka başlıkları kontrol edildi
- Genel yasaklı şablon cümleleri: 0 hit

## Yapılan ana düzenlemeler

- Her vakaya `managementSequence.steps` yapısı eklendi.
- Her basamakta `label`, `required`, `correctOrder`, `score`, `unsafe` ve `rationale` alanları standardize edildi.
- Doğru basamaklar klinik öncelik sırasına göre yazıldı.
- Yanlış/önceliksiz basamaklar rastgele değil, vaka özelinde öğretici çeldirici olacak şekilde düzenlendi.
- TUS Spot Olgular için `showInSpot: true` desteği eklendi ve spot olgularda yönetim akışı kısa tutuldu.
- `CasePlayer.jsx` içinde TUS Spot Olguların da kısa yönetim/yaklaşım sırası gösterebilmesi sağlandı.
- `diagnosis.answerFeedback.management` ve `managementSteps` alanları yeni yönetim sırası ile uyumlu olacak şekilde güncellendi.

## Örnek özelleştirmeler

- STEMI: EKG ile reperfüzyon kararı, antitrombotik tedavi, primer PCI/fibrinoliz kararı.
- DKA: sıvı, potasyum, insülin ve anyon açığı takibi.
- SLE: anti-dsDNA/kompleman, renal tarama, organ tutulumuna göre immünsupresyon.
- Hiperpotasemi: EKG değişikliğinde ilk IV kalsiyum glukonat.
- Anafilaksi: IM adrenalin önceliği ve destek tedavilerin doğru yeri.
- Pityriasis rosea: klinik tanı, semptomatik tedavi, gereksiz antifungal/biyopsi çeldiricileri.
- Adli olgular: tıbbi müdahaleyi geciktirmeden kayıt, bildirim, delil ve mahremiyet yönetimi.

## Test/build

- `node` import validasyonu: başarılı
- Yönetim sırası schema validasyonu: başarılı
- Duplicate case ID kontrolü: başarılı
- Spot görünürlük kontrolü: başarılı
- Yasaklı genel şablon cümleleri kontrolü: başarılı
- `npm install --prefer-offline --no-audit --no-fund`: başarılı
- `npm run build`: başarılı

## Çalıştırma komutları

```bash
npm install
npm run build
npm run dev
```
