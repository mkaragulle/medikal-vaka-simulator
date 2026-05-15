# KlinikIQ Branch Card Tag Cleanup V54

## Scope
Updated the TUS branch selection cards under **Klinik branş seç**.

## Changes
- Removed branch case-count pills such as `1 olgu`, `14 olgu`, and `spot olgu` from branch cards.
- Removed secondary metric tags such as `0 acil-kritik olgu`, `14 ortalama puan`, and `spot karar` from branch cards.
- Preserved the branch card click behavior, launch state, branch routing, TUS flow, AI flow, scoring, and Komite mode.
- Kept the existing visual card structure and progress styling so the layout remains stable.

## Files changed
- `src/components/BranchSelector.jsx`
