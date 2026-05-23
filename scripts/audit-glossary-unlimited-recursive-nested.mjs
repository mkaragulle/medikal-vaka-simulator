import fs from 'node:fs';
import path from 'node:path';
import { getGlossaryTerms, normalizeGlossaryText } from '../src/utils/glossary.js';

const PROJECT_ROOT = process.cwd();
const componentPath = path.join(PROJECT_ROOT, 'src/components/GlossaryTooltip.jsx');
const source = fs.readFileSync(componentPath, 'utf8');
const terms = getGlossaryTerms();

const hasUnlimitedDefault = /TOOLTIP_BODY_MAX_NESTED_DEPTH\s*=\s*Number\.POSITIVE_INFINITY/.test(source);
const hasFiniteDepthHelper = source.includes('isFiniteNestedDepthLimit') && source.includes('hasReachedNestedDepthLimit') && source.includes('canGoDeeperInNestedGlossary');
const noHardDepthFiveDefault = !/TOOLTIP_BODY_MAX_NESTED_DEPTH\s*=\s*5\b/.test(source);
const noOneLevelLimit = !/TOOLTIP_BODY_MAX_NESTED_DEPTH\s*=\s*1\b/.test(source);
const cycleGuardPresent = source.includes('entryPathContains(currentPath, nextEntry)') && source.includes('visitedEntryIds') && source.includes('pathEntryIds');
const hoverDrilldownPresent = source.includes('data-glossary-navigation-mode="hover-drilldown"') && source.includes('onPointerEnter={scheduleHoverNavigate}');
const breadcrumbPresent = source.includes('GlossaryBreadcrumb') && source.includes('onBack={goBack}') && source.includes('onJump={jumpToBreadcrumb}');
const noDepthNoticeShownByDefault = source.includes('hasReachedNestedDepthLimit(currentDepth, maxNestedDepth)') && hasUnlimitedDefault;

const byKey = new Map();
for (const entry of terms) {
  for (const key of [entry.id, entry.canonicalTerm, entry.displayTerm, entry.term, ...(entry.aliases || [])]) {
    const normalized = normalizeGlossaryText(key);
    if (normalized && !byKey.has(normalized)) byKey.set(normalized, entry);
  }
}
const resolve = (label) => byKey.get(normalizeGlossaryText(label));
const entryLabel = (entry) => entry?.displayTerm || entry?.canonicalTerm || entry?.term || entry?.id || '';
const entryId = (entry) => normalizeGlossaryText(entry?.id || entryLabel(entry));
const safeTerms = (entry) => [...new Set([...(entry?.safeNestedTerms || []), ...(entry?.relatedTerms || [])].filter(Boolean))];

function buildPath(seed, desired = [], maxSteps = 12) {
  const pathEntries = [];
  const visited = new Set();
  let current = resolve(seed);
  let pointer = 0;
  while (current && pathEntries.length < maxSteps) {
    const id = entryId(current);
    if (visited.has(id)) break;
    pathEntries.push(entryLabel(current));
    visited.add(id);
    const allowed = safeTerms(current).map(resolve).filter(Boolean).filter((entry) => !visited.has(entryId(entry)));
    const preferred = desired.slice(pointer).map(resolve).find((entry) => entry && allowed.some((candidate) => entryId(candidate) === entryId(entry)));
    if (preferred) pointer = Math.max(pointer + 1, desired.findIndex((item) => entryId(resolve(item)) === entryId(preferred)) + 1);
    current = preferred || allowed[0] || null;
  }
  return pathEntries;
}

const chains = [
  { seed: 'Astım', desired: ['Bronş hiperreaktivitesi', 'Bronkokonstriksiyon', 'Hava yolu direnci'] },
  { seed: 'Hiperkalemi', desired: ['Membran stabilizasyonu', 'İntravenöz kalsiyum glukonat', 'Kardiyak miyosit membranı'] },
  { seed: 'Testis torsiyonu', desired: ['Akut skrotum', 'Doppler ultrasonografi', 'Testiküler kan akımı'] },
  { seed: 'Diyabetik ketoasidoz', desired: ['Anion gap metabolik asidoz', 'Keton cisimleri', 'Beta-hidroksibütirat'] },
].map((chain) => ({ ...chain, path: buildPath(chain.seed, chain.desired) }));

const safeNestedEntryCount = terms.filter((entry) => Array.isArray(entry.safeNestedTerms) && entry.safeNestedTerms.length).length;
const safeNestedLinks = terms.reduce((sum, entry) => sum + (entry.safeNestedTerms?.length || 0), 0);

const regressions = [
  { name: 'no-hard-coded-finite-default-depth', pass: hasUnlimitedDefault && noHardDepthFiveDefault && noOneLevelLimit },
  { name: 'finite-depth-helper-only-for-optional-override', pass: hasFiniteDepthHelper },
  { name: 'cycle-detection-still-present', pass: cycleGuardPresent },
  { name: 'hover-recursive-navigation-still-present', pass: hoverDrilldownPresent },
  { name: 'breadcrumb-back-navigation-still-present', pass: breadcrumbPresent },
  { name: 'depth-note-not-shown-under-unlimited-default', pass: noDepthNoticeShownByDefault },
  { name: 'safe-chains-at-least-three-levels', pass: chains.every((chain) => chain.path.length >= 3), chains },
];

const report = {
  version: 'V291 unlimited recursive nested glossary audit',
  defaultNestedDepth: 'unlimited',
  artificialNumericDepthCap: false,
  safetyGuards: {
    cycleDetection: cycleGuardPresent,
    visitedEntryIds: source.includes('visitedEntryIds'),
    safeNestedTerms: safeNestedEntryCount,
    safeNestedLinks,
    hoverDrilldown: hoverDrilldownPresent,
    breadcrumb: breadcrumbPresent,
  },
  totalEntries: terms.length,
  totalAliases: terms.reduce((sum, entry) => sum + (entry.aliases?.length || 0), 0),
  chains,
  regressionPassed: regressions.filter((item) => item.pass).length,
  regressionTotal: regressions.length,
  regressions,
};

fs.writeFileSync('GLOSSARY_V291_UNLIMITED_RECURSIVE_NESTED_AUDIT.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
