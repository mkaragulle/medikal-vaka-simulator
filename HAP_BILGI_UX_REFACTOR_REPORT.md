# KlinikIQ Hap Bilgi UX Refactor Report

## Scope
- Simplified Hap Bilgi dashboard panel.
- Separated study, catalog management, and card creation responsibilities.
- Removed heavy study-screen filter controls and persistent catalog dropdowns from card focus mode.
- Improved catalog detail empty states and catalog-card add flow.
- Preserved user-card creation/edit/delete and smart shuffled deck logic.

## Key UX Changes
- Dashboard right panel now shows only title, short description, four compact stats, four main actions, and one lightweight suggestion.
- Long preview lists, always-open catalog input, and recommendation blocks were removed from the dashboard panel.
- Study mode now exposes a compact quickbar instead of Set/Branch/Catalog dropdown rows.
- Card front no longer shows repeated card-type chips or the “Space veya karta tıkla” hint.
- Catalog add action now opens a small popover instead of keeping a visible select/input in the study screen.
- Empty states now provide direct actions: return to all cards, manage/add to catalog, or create a new card.

## Catalog Flow
- Catalog list shows card count, struggled count, personal-card count, and last studied metadata.
- Catalog detail displays cards already inside the catalog and a library section for adding system or personal cards.
- Cards already in a catalog are shown as “Eklendi”; other cards expose “Kataloğa ekle”.
- Empty catalog state links directly to the library section and offers new-card creation.

## Smart Shuffle
- `buildStudyDeck` uses seeded Fisher-Yates group shuffling, weighted interleave, topic/branch streak avoidance, and recent-start avoidance.
- Five test sessions were generated; first cards changed between sessions and max topic streak remained 1 in the sampled run.

## Build
- `npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund`: passed.
- `npm run build`: passed.
