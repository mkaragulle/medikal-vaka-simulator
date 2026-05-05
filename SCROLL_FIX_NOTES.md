# KlinikIQ Scroll Fix Notes

Bu güncelleme sağ çalışma panelindeki scroll/overflow problemini hedefler.

## Değişen ana dosyalar

- `src/index.css`
  - Sağ panel için viewport-bound gerçek scroll alanı eklendi.
  - Sticky parent artık scroll hedefi değil; `.right-workspace-shell` dikey scroll hedefi.
  - Desktopta `height/max-height`, `min-height: 0`, `overflow-y: auto`, `overscroll-behavior`, `scrollbar-gutter` ve görünür premium scrollbar eklendi.
  - 1180px altı kırılımlarda nested scroll kapatıldı; panel normal sayfa akışıyla çalışır.

- `src/components/CasePlayer.jsx`
  - `.right-workspace-shell` erişilebilir, klavyeyle odaklanabilir bir region haline getirildi.

## Not

Bu zip içinde `node_modules`, `dist`, cache veya build artığı yoktur.
