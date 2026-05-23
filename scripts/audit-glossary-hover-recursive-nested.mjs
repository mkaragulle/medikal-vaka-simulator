import fs from 'node:fs';
import path from 'node:path';
import { getGlossaryTerms, normalizeGlossaryText } from '../src/utils/glossary.js';

const PROJECT_ROOT = process.cwd();
const componentPath = path.join(PROJECT_ROOT, 'src/components/GlossaryTooltip.jsx');
const source = fs.readFileSync(componentPath, 'utf8');
const terms = getGlossaryTerms();

const hasHoverDelay = /DRILLDOWN_HOVER_DELAY_MS\s*=\s*\d+/.test(source);
const hasHoverDrilldownMode = source.includes('data-glossary-navigation-mode="hover-drilldown"');
const hasPointerEnterNavigate = source.includes('onPointerEnter={scheduleHoverNavigate}');
const hasMouseEnterNavigate = source.includes('onMouseEnter={scheduleHoverNavigate}');
const hasClickFallback = source.includes('onClick={navigate}');
const hasKeyboardFallback = source.includes("event.key === 'Enter'") && source.includes("event.key === ' '");
const hasTimerCleanup = source.includes('clearDrilldownTimer();') && source.includes('window.clearTimeout(drilldownTimerRef.current)');
const maxDepthIsUnlimited = /TOOLTIP_BODY_MAX_NESTED_DEPTH\s*=\s*Number\.POSITIVE_INFINITY/.test(source);
const maxDepthMatch = source.match(/TOOLTIP_BODY_MAX_NESTED_DEPTH\s*=\s*(\d+)/);
const defaultMaxDepth = maxDepthIsUnlimited ? 'unlimited' : (maxDepthMatch ? Number(maxDepthMatch[1]) : null);

const byKey = new Map();
for (const entry of terms) {
  for (const key of [entry.id, entry.canonicalTerm, entry.displayTerm, entry.term, ...(entry.aliases || [])]) {
    const normalized = normalizeGlossaryText(key);
    if (normalized && !byKey.has(normalized)) byKey.set(normalized, entry);
  }
}
const resolve = (label) => byKey.get(normalizeGlossaryText(label));
const label = (entry) => entry?.displayTerm || entry?.canonicalTerm || entry?.term || entry?.id || '';
const id = (entry) => normalizeGlossaryText(entry?.id || label(entry));
const safeTerms = (entry) => [...new Set([...(entry?.safeNestedTerms || []), ...(entry?.relatedTerms || [])].filter(Boolean))];
function buildSafePath(seed, preferred = []) {
  const pathEntries = [];
  let current = resolve(seed);
  const visited = new Set();
  for (const wanted of [seed, ...preferred]) {
    if (!current) break;
    if (!visited.has(id(current))) {
      pathEntries.push(label(current));
      visited.add(id(current));
    }
    const allowedChildren = safeTerms(current)
      .map(resolve)
      .filter(Boolean)
      .filter((entry) => !visited.has(id(entry)));
    const preferredChild = preferred.map(resolve).find((entry) => entry && allowedChildren.some((candidate) => id(candidate) === id(entry)) && !visited.has(id(entry)));
    current = preferredChild || allowedChildren[0] || null;
  }
  return pathEntries;
}

const chains = [
  { seed: 'Astım', preferred: ['Bronş hiperreaktivitesi', 'Bronkokonstriksiyon', 'Hava yolu direnci'] },
  { seed: 'Hiperkalemi', preferred: ['Membran stabilizasyonu', 'İntravenöz kalsiyum glukonat', 'Kardiyak miyosit membranı'] },
  { seed: 'Testis torsiyonu', preferred: ['Akut skrotum', 'Doppler ultrasonografi', 'Testiküler kan akımı'] },
  { seed: 'Diyabetik ketoasidoz', preferred: ['Anion gap metabolik asidoz', 'Keton cisimleri', 'Beta-hidroksibütirat'] },
].map((chain) => ({ ...chain, path: buildSafePath(chain.seed, chain.preferred) }));

const regressions = [
  { name: 'default-depth-is-unlimited-or-greater-than-one', pass: defaultMaxDepth === 'unlimited' || defaultMaxDepth > 1, value: defaultMaxDepth },
  { name: 'hover-drilldown-mode-enabled', pass: hasHoverDrilldownMode },
  { name: 'desktop-pointer-hover-navigates', pass: hasPointerEnterNavigate },
  { name: 'desktop-mouse-hover-fallback-navigates', pass: hasMouseEnterNavigate },
  { name: 'tap-click-fallback-retained', pass: hasClickFallback },
  { name: 'keyboard-fallback-retained', pass: hasKeyboardFallback },
  { name: 'hover-timer-cleanup-present', pass: hasTimerCleanup },
  { name: 'safe-chains-at-least-three-levels', pass: chains.every((chain) => chain.path.length >= 3), chains },
];

const report = {
  version: 'V290 hover recursive nested glossary audit',
  totalEntries: terms.length,
  totalAliases: terms.reduce((sum, entry) => sum + (entry.aliases?.length || 0), 0),
  defaultMaxDepth,
  hoverDelayMs: Number((source.match(/DRILLDOWN_HOVER_DELAY_MS\s*=\s*(\d+)/) || [null, 0])[1]),
  chains,
  regressionPassed: regressions.filter((item) => item.pass).length,
  regressionTotal: regressions.length,
  regressions,
};

fs.writeFileSync('GLOSSARY_V290_HOVER_RECURSIVE_NESTED_AUDIT.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
