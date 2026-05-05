# KlinikIQ V120 — Orbit Hard Fix

Bu sürümde giriş ekranındaki orbital alan eski `.auth-orbit-*` yapısından ayrıldı ve yeni `kq-orbit-*` sistemiyle yeniden kuruldu.

## Düzeltilen ana problem
- Önceki yapıda merkez shield, ring ve orbit node'ları farklı CSS katmanlarından gelen eski kurallarla çakışabiliyordu.
- Bazı desktop tarayıcılarda `prefers-reduced-motion` veya eski breakpoint override'ları animasyonları fiilen statik hale getiriyordu.
- Yeni sistem tek merkezli çalışır: `kq-orbit-stage` → `kq-orbit-track` → `kq-orbit-node` → `kq-orbit-node-counter`.

## Teknik değişiklik
- Orbit hareketi artık her ikonun ayrı ayrı karmaşık keyframe hesaplamasına bağlı değil.
- Tek bir track 46s linear döner.
- İkonların okunabilir kalması için iç counter layer ters yönde döner.
- Shield, ring ve ikonlar aynı merkez noktasını paylaşır.
- Reduced-motion durumunda global animasyon öldürme yerine orbit yavaşlatılır.
