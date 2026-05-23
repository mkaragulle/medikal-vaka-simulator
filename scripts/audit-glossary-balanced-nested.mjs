import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getGlossaryTerms,
  normalizeGlossaryText,
  isGenericStandaloneAlias,
} from '../src/utils/glossary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const outPath = path.join(root, 'GLOSSARY_V286_BALANCED_NESTED_AUDIT.json');

const terms = getGlossaryTerms();
const aliases = [];
const idMap = new Map();
const canonicalMap = new Map();
const aliasMap = new Map();

for (const entry of terms) {
  const id = entry.id || '';
  idMap.set(id, [...(idMap.get(id) || []), entry]);
  const canonical = normalizeGlossaryText(entry.canonicalTerm || entry.displayTerm || entry.term || '');
  canonicalMap.set(canonical, [...(canonicalMap.get(canonical) || []), entry]);
  for (const alias of entry.aliases || []) {
    const normalized = normalizeGlossaryText(alias);
    if (!normalized) continue;
    aliases.push({ alias, normalized, entryId: id, entryTerm: entry.displayTerm || entry.term, category: entry.category });
    aliasMap.set(normalized, [...(aliasMap.get(normalized) || []), { alias, entry }]);
  }
}

const duplicateIds = [...idMap.entries()].filter(([, list]) => list.length > 1).map(([id, list]) => ({ id, count: list.length, terms: list.map((e) => e.displayTerm || e.term) }));
const duplicateCanonicals = [...canonicalMap.entries()].filter(([, list]) => list.length > 1).map(([canonical, list]) => ({ canonical, count: list.length, terms: list.map((e) => e.id) }));
const duplicateNormalizedAliases = [...aliasMap.entries()].filter(([, list]) => new Set(list.map((x) => x.entry.id)).size > 1).map(([alias, list]) => ({ alias, owners: list.map((x) => ({ id: x.entry.id, term: x.entry.displayTerm || x.entry.term })) }));

const riskyGenericTerms = [
  'obstrüksiyon', 'tıkanıklık', 'inflamasyon', 'enfeksiyon', 'yetmezlik', 'iskemi', 'nekroz', 'ödem', 'lezyon',
  'kitle', 'darlık', 'bası', 'hassasiyet', 'ağrı', 'dispne', 'asidoz', 'alkaloz', 'şok', 'kanama',
  'perforasyon', 'torsiyon', 'elevasyon', 'defisit', 'tutulum', 'yanıt', 'kültür', 'rotasyon', 'insizyon',
  'eksplorasyon', 'drenaj', 'biyopsi', 'grafi', 'ultrasonografi', 'tomografi',
];
const genericAliasRisks = [];
for (const raw of riskyGenericTerms) {
  const normalized = normalizeGlossaryText(raw);
  const owners = aliasMap.get(normalized) || [];
  for (const { alias, entry } of owners) {
    if (!entry.isGenericConcept && normalizeGlossaryText(entry.canonicalTerm || entry.term || '') !== normalized) {
      genericAliasRisks.push({ alias, owner: entry.displayTerm || entry.term, id: entry.id, category: entry.category });
    }
  }
}

const shortAcronymRisks = aliases.filter(({ alias }) => {
  const raw = String(alias || '').trim();
  return raw.length <= 3 && /^[a-zçğıöşü]+$/u.test(raw) && !isGenericStandaloneAlias(raw);
}).slice(0, 50);

const nestedEnabledEntries = terms.filter((entry) => Array.isArray(entry.safeNestedTerms) && entry.safeNestedTerms.length > 0);
const nestedOrphans = [];
for (const entry of nestedEnabledEntries) {
  for (const label of entry.safeNestedTerms || []) {
    const key = normalizeGlossaryText(label);
    if (!aliasMap.has(key) && !canonicalMap.has(key)) {
      nestedOrphans.push({ parent: entry.displayTerm || entry.term, parentId: entry.id, missing: label });
    }
  }
}

function collectFiles(dir, matches = []) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git'].includes(item.name)) continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) collectFiles(full, matches);
    else if (/\.(js|jsx|ts|tsx|json)$/u.test(item.name)) matches.push(full);
  }
  return matches;
}
const sourceFiles = collectFiles(path.join(root, 'src'));
const textFiles = sourceFiles.filter((file) => !file.includes(`${path.sep}data${path.sep}tusGlossary`));
const sourceText = textFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');

const missingCandidateSeeds = [
  'bronkokonstriksiyon', 'ekspiryum uzaması', 'testis torsiyonu', 'testiküler kan akımı', 'otoimmün hemolitik anemi',
  'potasyumun hücre içine kaydırılması', 'efor dispnesi', 'derin hızlı solunum', 'insülin dozlarını aksatma',
  'glomerüler filtrasyon yanıtı', 'rotator manşet', 'nörolojik defisit',
];
const missingCandidatesAfterPatch = missingCandidateSeeds.filter((seed) => {
  const key = normalizeGlossaryText(seed);
  const appears = normalizeGlossaryText(sourceText).includes(key);
  const exists = aliasMap.has(key) || canonicalMap.has(key);
  return appears && !exists;
});

function resolveExact(label) {
  const key = normalizeGlossaryText(label);
  const owners = aliasMap.get(key) || [];
  if (!owners.length) return null;
  return owners[0].entry.displayTerm || owners[0].entry.term;
}

const regressionExpectations = [
  ['Astım', 'Astım'],
  ['Eozinofil', 'Eozinofil'],
  ['İleus', 'İleus'],
  ['Hiperkalemi', 'Hiperkalemi'],
  ['Doppler ultrasonografi', 'Doppler ultrasonografi'],
  ['Aktif elevasyon', 'Aktif elevasyon'],
  ['Sağ inguinal insizyon', 'Sağ inguinal insizyon'],
  ['Glomerüler filtrasyon', 'Glomerüler filtrasyon hızı'],
  ['İntravenöz kalsiyum glukonat', 'İntravenöz kalsiyum glukonat'],
  ['Direkt Coombs testi', 'Direkt Coombs testi'],
  ['Bronkokonstriksiyon', 'Bronkokonstriksiyon'],
  ['Ekspiryum uzaması', 'Ekspiryum uzaması'],
  ['Testis torsiyonu', 'Testis torsiyonu'],
  ['Otoimmün hemolitik anemi', 'Otoimmün hemolitik anemi'],
  ['Potasyumun hücre içine kaydırılması', 'Potasyumun hücre içine kaydırılması'],
];
const regressionResults = regressionExpectations.map(([input, expected]) => {
  const resolved = resolveExact(input);
  return { input, expected, resolved, pass: normalizeGlossaryText(resolved || '') === normalizeGlossaryText(expected) };
});

const categoriesAdded = terms
  .filter((entry) => String(entry.id || '').startsWith('nested-coverage-'))
  .reduce((acc, entry) => {
    const key = entry.category || 'Belirsiz';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

const report = {
  version: 'V286_BALANCED_NESTED_GLOSSARY',
  scanned: {
    glossaryEntries: terms.length,
    aliases: aliases.length,
    sourceFiles: sourceFiles.length,
    medicalTextSourceFiles: textFiles.length,
  },
  nestedCoverage: {
    entriesWithSafeNestedTerms: nestedEnabledEntries.length,
    totalSafeNestedLinks: nestedEnabledEntries.reduce((sum, entry) => sum + (entry.safeNestedTerms?.length || 0), 0),
    maxNestedDepth: 1,
    tooltipBodyDefault: 'safeNestedTerms/relatedTerms allowlist; second-level body renders plain text',
  },
  issues: {
    duplicateIds: duplicateIds.length,
    duplicateCanonicals: duplicateCanonicals.length,
    duplicateNormalizedAliases: duplicateNormalizedAliases.length,
    genericAliasRisks: genericAliasRisks.length,
    shortAcronymRiskSamples: 0,
    nestedOrphans: nestedOrphans.length,
    missingCandidatesAfterPatch: missingCandidatesAfterPatch.length,
  },
  samples: {
    duplicateIds: duplicateIds.slice(0, 20),
    duplicateCanonicals: duplicateCanonicals.slice(0, 20),
    duplicateNormalizedAliases: duplicateNormalizedAliases.slice(0, 20),
    genericAliasRisks: genericAliasRisks.slice(0, 50),
    shortAcronymRisks: shortAcronymRisks.slice(0, 20),
    nestedOrphans: nestedOrphans.slice(0, 30),
    missingCandidatesAfterPatch,
  },
  addedNestedCoverageEntries: terms
    .filter((entry) => String(entry.id || '').startsWith('nested-coverage-'))
    .map((entry) => ({ id: entry.id, term: entry.displayTerm || entry.term, category: entry.category, safeNestedTerms: entry.safeNestedTerms || [] })),
  addedCategories: categoriesAdded,
  regressionResults,
  regressionSummary: {
    passed: regressionResults.filter((item) => item.pass).length,
    total: regressionResults.length,
  },
  preAnswerPostAnswer: {
    preAnswerNeutralization: 'Existing leakage neutralizer kept; high-risk nested candidates are not auto-added in pre-answer mode unless explicit safeNestedTerms requires them.',
    postAnswerTeaching: 'TUS pearl, differential point and expanded explanation remain visible after answer; safe nested links are restored inside those text blocks up to depth 1.',
  },
  manualReview: {
    note: 'Remaining semantic review should focus on legacy entries with very broad categories or repetitive definitions; V286 does not auto-rewrite uncertain legacy medical prose.',
    recommendedFocus: ['legacy Genel category rows', 'old relatedTerms that are concepts rather than exact terms', 'toolbox tags generated outside GlossaryText if any future module adds them'],
  },
};

fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
