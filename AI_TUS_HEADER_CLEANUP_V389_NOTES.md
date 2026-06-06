# KlinikIQ V389 — AI TUS header cleanup

## Yapılan düzeltmeler

1. `Yeni TUS Sorusu Üret` ekranındaki istatistik kutuları tamamen kaldırıldı:
   - `TUS soru`
   - `Doğruluk`
   - `Pratik puanı`

2. AI TUS soru ekranındaki üst bilgi sadeleştirildi:
   - Eski ayrı pill/badge yapısı kaldırıldı.
   - `Klinik olgu`, branş adı ve zorluk/puan bilgisi tek, sade ve hizalı header yapısına alındı.
   - Görsel kalabalığı azaltıldı; branch/difficulty bilgisi daha okunabilir ve düzenli hale getirildi.

## Değiştirilen dosyalar

- `src/components/AIGeneratedQuestionView.jsx`
- `src/components/AISpotQuestionScreen.jsx`
- `src/index.css`

## Not

Dependency klasörü zip içinde olmadığı için bu ortamda `npm run build` çalıştırılamadı; `vite` bulunmadı.
