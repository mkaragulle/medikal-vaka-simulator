# Hasta Özeti Reference Image Redesign

Updated the patient summary card to match the provided premium reference design more closely.

## Updated files
- `src/components/CasePlayer.jsx`
  - Reworked patient summary JSX structure.
  - Added icon tiles for Profile, Başvuru, Risk Bağlamı, Ayırt Ettirici İpuçları, Kısa Klinik Öykü Özeti, Öncelikli Klinik Odak and Klinik İpucu.
  - Split profile text into primary and secondary lines when the source text uses `·`.
  - Preserved glossary/highlighting behavior.
- `src/components/ui.jsx`
  - Added `Shield` and `Lightbulb` icons.
- `src/styles/klinikiq-refine.css`
  - Added a full premium reference-style CSS override for the patient summary card.
  - Added responsive and dark-mode support.

## Validation
- JSX syntax was checked with TypeScript parser successfully.
