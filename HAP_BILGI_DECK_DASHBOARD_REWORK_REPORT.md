# Hap Bilgi Deck + Dashboard Rework Report

## Root cause

The quick action on the dashboard was wired to the `review` filter, so it did not consistently start from the full 500-card pool. The old deck builder also relied on a light group-level shuffle and stored only the latest first cards for recent-start avoidance, which made initial card groups feel familiar across sessions.

## Changes

- Replaced the old lightweight card ordering with a deterministic session deck builder.
- Added seeded Fisher-Yates shuffle for groups and intra-group card order.
- Added topic/branch/tag interleave constraints.
- Added recent-start memory that keeps up to 120 recent opening cards per mode instead of replacing the window each time.
- Updated `Hızlı tekrar başlat` to start a full `all` deck by default.
- Removed the large dashboard-level `Kart ekle` action card.
- Added a smaller secondary `Kendi kartların` panel with `Oluştur` and `Kendi kartlarım` actions.
- Kept card creation available from dashboard mini panel, study quickbar, study footer, catalog detail, and empty states.
- Improved empty catalog/no-catalog actions so the user can go to all cards or create a personal card.

## Deck rules

- `maxSameTopicStreak = 1`
- `maxSameBranchStreak = 2`
- `maxSameTagStreak = 2`
- Recent starts are pushed out of the first 20-card window when enough alternatives exist.
- Wrong/review/favorite/known weights influence ordering, but topic/branch interleave stays higher priority.

## Test result

`npm run qa:pearl-shuffle` passed.

Key results:

- 10 full-pool sessions were generated from 500 cards.
- First 20 cards had 20 unique topics in every tested session.
- Max topic streak: 1.
- Max branch streak: 2 or lower.
- Consecutive first-10 recent-start overlap: 0.
- Exact repeated first-20 pairs: 0.
- Anafilaksi max block: 1.
- Weighted wrong cards appeared earlier than their pool ratio without producing topic blocks.

## Build result

`npm run build` passed with Vite 7.2.7.
