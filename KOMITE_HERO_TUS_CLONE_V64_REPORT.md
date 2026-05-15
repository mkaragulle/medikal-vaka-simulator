# Komite Hero TUS Clone V64

This update makes the Komite dashboard hero use the same JSX structure and styling classes as the TUS hero card.

## Changed
- Replaced the Komite-specific hero wrapper/classes with the exact TUS hero wrapper/classes.
- Removed Komite-specific hero layout override classes from the hero, copy area, tag row, action panel, and action buttons.
- Kept Komite-specific Turkish text:
  - Komite çalışma alanı
  - KlinikIQ Komite
  - Materyal yükle
  - Çalıştıklarım
  - Tekrar merkezine git
- Preserved existing click handlers and route/state behavior.

## Preserved
- TUS flow
- Komite upload/material flow
- Review and card navigation
- AI and scoring logic
