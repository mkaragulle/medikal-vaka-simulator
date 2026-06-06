# KlinikIQ V392 — AI TUS Generation Compact Status UI Fix

## Amaç
Yeni TUS sorusu oluşturulurken görünen bekleme alanında sağ taraftaki büyük `Tahmini süre`, `Son kontroller` ve `Soruyu Gör` bloklarını sadeleştirmek ve daha az yer kaplayan bir tasarıma almak.

## Yapılan değişiklikler
- `Yeni TUS sorunuz hazırlanıyor.` başlığının altındaki canlı aşama metni kaldırıldı.
- Canlı aşama metni sağ taraftaki kompakt durum chip'ine taşındı.
- `Tahmini süre / 13 sn` görünümü büyük karttan küçük, sade ve tek satırlı durum alanına dönüştürüldü.
- `Son kontroller` görünümü artık büyük tipografiyle patlamıyor; küçük ETA rozeti gibi gösteriliyor.
- `Soruyu Gör` butonu büyük kart görünümünden kompakt pill butona çevrildi.
- Bekleme kartının yüksekliği ve iç boşlukları azaltıldı.
- Progress bar daha ince ve daha sade hale getirildi.
- Mobil görünümde durum alanı taşma yapmayacak şekilde responsive düzenlendi.

## Değiştirilen dosyalar
- `src/components/AIGeneratedQuestionView.jsx`
- `src/index.css`
