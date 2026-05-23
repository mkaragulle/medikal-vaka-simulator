# KlinikIQ V301 Targeted Dark Mode Remediation Report

## Scope
This update is a visual-only dark-mode remediation pass. It does not change React state, data mapping, question solving logic, glossary matching, hover-delay behavior, nested tooltip logic, scoring, local storage, routing, TUS/KOMITE switching, flashcard storage, or catalog logic.

## Root cause
The project already had a V299 global dark-mode token bridge, but several late-loaded and high-specificity CSS layers still reintroduced light-mode visual assumptions. The most visible source was `src/components/tusPearlCards.css`, which is lazy-loaded after the global theme file and can override global dark-mode corrections. In addition, the topbar, dashboard metrics, CTA buttons, wrong-answer controls, feedback tags, flashcard faces, tool panels and glossary popovers were not all mapped to the same semantic dark surface/button/icon/tag system.

## Changed files
- `src/styles/klinikiq-dark-mode-system.css`
- `src/components/tusPearlCards.css`
- `reports/dark-mode-v301-targeted-remediation.md`
- `reports/dark-mode-v301-checklist.json`

## Semantic tokens added or expanded
The update extends the existing token system rather than replacing it. Added/expanded aliases include:
- `--ki-dark-bg`
- `--ki-dark-surface`
- `--ki-dark-surface-elevated`
- `--ki-dark-surface-soft`
- `--ki-dark-surface-muted`
- `--ki-dark-surface-disabled`
- `--ki-dark-text`
- `--ki-dark-text-secondary`
- `--ki-dark-text-muted`
- `--ki-dark-text-disabled`
- `--ki-dark-border`
- `--ki-dark-border-strong`
- `--ki-dark-accent`
- `--ki-dark-accent-soft`
- `--ki-dark-success-soft`
- `--ki-dark-danger-soft`
- `--ki-dark-warning-soft`
- `--ki-dark-focus-ring`
- `--ki-dark-icon-surface`
- `--ki-dark-button-secondary`
- `--ki-dark-button-disabled`
- shared aliases: `--ki-icon-surface`, `--ki-button-secondary`, `--ki-button-secondary-hover`, `--ki-button-disabled`, `--ki-chip-neutral`, `--ki-tag-info-soft`, `--ki-tag-info-text`

## Component groups corrected

### 1. Topbar / navigation
Corrected the dark surface, brand text, nav chips, wrong-answer badge, score badge, theme button, logout icon button, TUS/KOMITE segment, Öğrenme/Sınav segment and Zor tab. Active states now use soft accent surfaces; inactive states remain muted but readable.

### 2. Hero CTA area
Corrected the CTA stack, primary CTA, secondary CTA and AI CTA surfaces. CTA icon boxes now use dark icon-surface tokens instead of light gray/white residues.

### 3. Öğrenme / Sınav segment switch
The segment container and active tabs now use dark surface + soft accent. Light gray pill behavior is neutralized in dark mode.

### 4. Dashboard statistic cards
Metric cards, icon wrappers, labels, large numbers and sparklines are aligned to dark card tokens. Icon backgrounds now use controlled dark surfaces instead of bright light-mode blocks.

### 5. Kişisel tekrar / Yanlış çözülenler
Wrong-answer cards, the `Temizle` button, `Tekrar çöz` buttons, category chips and the X remove icon were corrected. The X icon button now uses a dark ghost surface and a soft danger hover state.

### 6. Hap Bilgi hub and TUS Spot study callout
The Hap Bilgi panel, stats, TUS Spot reinforcement callout, `Çalış` button and quick action cards now use dark surfaces and readable text/button states.

### 7. Seçimin / Doğru cevap tags
Feedback tags now use soft info/success/danger surfaces with readable text. This covers `Seçimin`, `Doğru cevap`, correct option tags and selected-wrong tags.

### 8. Hap Bilgi Çalış top bar
The flashcard study header, `Tekrar merkezine dön`, branch dropdown, progress display and progress fill now use dark elevated surface/input/progress tokens.

### 9. Tekrar Araçları / Kart Araçları
Tool cards, repeat list buttons, session actions, catalog triggers, popovers and disabled states now share the same dark card/button token system.

### 10. Hap kart answer buttons
`Biliyorum`, `Tekrar et` and `Zorlandım` now use success/accent/warning soft surfaces with readable icon/text contrast and consistent hover/active states.

### 11. Hap kart front and back faces
The flashcard front and back face surfaces, branch/progress chips, `Yanıt`, `Kısa gerekçe`, `TUS ipucu` and `Ayırıcı not` panels now use dark elevated/soft surfaces with readable text hierarchy.

### 12. Glossary words and pop-ups
Inline glossary words now use subtle dotted underline without a heavy background. Portal-rendered glossary popovers use a dark elevated surface, soft border, readable title/body/category text and preserved nested breadcrumb/back controls. Hover delay and nested drill-down logic were not changed.

## Hard-coded light residues addressed
The pass does not delete arbitrary legacy rules. Instead, the active dark-mode layer neutralizes recurring light-mode residues such as white/light-gray card backgrounds, light disabled buttons, light icon boxes, light CTA surfaces and light tag backgrounds by routing the visible dark states through semantic tokens.

## Regression controls
- CSS brace balance checked for changed CSS files: passed.
- CSS comment open/close balance checked: passed.
- React/JS data and state logic not modified.
- `npm run build` could not run because the zip does not include `node_modules` and the environment has no local `vite` binary.

## Remaining risk
The project still contains a large legacy CSS surface with many `!important` rules. This update is intentionally targeted and scoped. A deeper cleanup of `src/index.css` should be done only with visual regression snapshots because it contains many historical layout and case-player fixes.
