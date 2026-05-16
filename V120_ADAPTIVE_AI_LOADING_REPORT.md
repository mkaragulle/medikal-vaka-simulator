# KlinikIQ — Adaptive AI Loading State V120

## Scope
Updated the loading state shown after pressing **Yeni TUS Sorusu Üret**.

## What changed
- Removed the fixed 9-second countdown behavior.
- Added an adaptive estimated remaining time based on real completed AI generation durations saved in `localStorage`.
- Estimates are stored globally and per branch/difficulty combination, then blended with future completed requests.
- Added staged loading messages:
  - Sunucuya istek gönderiliyor...
  - Klinik senaryo kuruluyor...
  - TUS dili ve klinik tutarlılık kontrol ediliyor...
  - Son kontroller yapılıyor...
  - Soru kalitesi denetleniyor...
  - Seçenekler düzenleniyor...
  - Açıklama ve yanıt uyumu son kez kontrol ediliyor...
- Redesigned the ETA card with a progress bar and compact status chips.

## Files changed
- `src/components/AIGeneratedQuestionView.jsx`
- `src/index.css`

## Build note
`npm install` could not complete in the sandbox environment, so a production build could not be executed here. The previous regex build fix is preserved.
