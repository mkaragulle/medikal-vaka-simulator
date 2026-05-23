import fs from 'node:fs';
import path from 'node:path';
import { rawCases } from '../src/data/cases.js';
import { TUS_PEARL_CARDS, TUS_PEARL_TOPICS } from '../src/data/tusPearlCards.js';
import { getGlossaryTerms, normalizeGlossaryText, auditGlossaryIntegrity } from '../src/utils/glossary.js';
import { TUS_GLOSSARY_CONTENT_COVERAGE_TERMS } from '../src/data/tusGlossaryContentCoverageIndex.js';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const SRC = path.join(ROOT, 'src');

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (/\.(js|jsx|ts|tsx|json)$/i.test(name)) out.push(full);
  }
  return out;
}

function collectStrings(value, out = []) {
  if (typeof value === 'string') {
    const clean = value.replace(/\s+/g, ' ').trim();
    if (clean && /[A-Za-zÇĞİÖŞÜçğıöşü]/.test(clean)) out.push(clean);
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectStrings(item, out));
    return out;
  }
  if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => collectStrings(item, out));
  }
  return out;
}

const sourceFiles = walk(SRC);
const caseTexts = collectStrings(rawCases);
const pearlCardTexts = collectStrings(TUS_PEARL_CARDS);
const pearlTopicTexts = collectStrings(TUS_PEARL_TOPICS);
const sourceFileTexts = [];
for (const file of sourceFiles) {
  const raw = fs.readFileSync(file, 'utf8');
  const quoted = [...raw.matchAll(/['"`]([^'"`]{4,220})['"`]/g)].map((m) => m[1]).filter((s) => /[A-Za-zÇĞİÖŞÜçğıöşü]/.test(s));
  for (const item of quoted) sourceFileTexts.push(item);
}
const allProjectText = [...caseTexts, ...pearlCardTexts, ...pearlTopicTexts, ...sourceFileTexts];
const normalizedCorpus = normalizeGlossaryText(allProjectText.join(' '));
const terms = getGlossaryTerms();
const integrity = auditGlossaryIntegrity(terms);
const contentEntries = terms.filter((entry) => String(entry.id || '').startsWith('content-coverage-'));

const activeContentTerms = contentEntries.map((entry) => ({
  id: entry.id,
  canonicalTerm: entry.canonicalTerm || entry.term,
  category: entry.category,
  aliases: entry.aliases,
  safeNestedTerms: entry.safeNestedTerms,
  foundInCorpus: (entry.aliases || [entry.canonicalTerm || entry.term]).some((alias) => normalizedCorpus.includes(normalizeGlossaryText(alias))),
}));

const rejectedOrDeferredCandidates = [
  { term: 'ağrı', reason: 'Çok genel semptom; yalnızca bağlamlı phrase içinde güçlü olduğunda kullanılmalı.' },
  { term: 'test', reason: 'Çok genel; tanı testi türleri veya özel test adları phrase olarak eklenmeli.' },
  { term: 'yüksek', reason: 'Laboratuvar yorumu olabilir ama tek başına tıbbi kavram değildir.' },
  { term: 'pozitif', reason: 'Test sonucu niteliği; tek başına glossary değeri düşük ve yanlış eşleşme riski yüksek.' },
  { term: 'negatif', reason: 'Test sonucu niteliği; bağlamlı test adıyla birlikte anlamlıdır.' },
  { term: 'hasta', reason: 'Tıbbi jargon değil; UI kalabalığı oluşturur.' },
  { term: 'servis', reason: 'Klinik ortam adı; TUS kavram değeri düşük.' },
  { term: 'kontrol', reason: 'Genel kelime; spesifik klinik kontrol/izlem phrase’i yoksa eklenmedi.' },
  { term: 'başvuru', reason: 'Genel UI/klinik süreç kelimesi; glossary öğreticiliği düşük.' },
  { term: 'normal', reason: 'Laboratuvar niteleyicisi; tek başına kavram değil.' },
];

const categoryAdditions = activeContentTerms.reduce((acc, entry) => {
  const key = String(entry.category || 'Kategori yok');
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});

const safeNestedEnhancedEntries = activeContentTerms.filter((entry) => Array.isArray(entry.safeNestedTerms) && entry.safeNestedTerms.length > 0);

const aliasMap = new Map();
terms.forEach((entry) => {
  (entry.aliases || []).forEach((alias) => {
    const key = normalizeGlossaryText(alias);
    const list = aliasMap.get(key) || [];
    list.push({ id: entry.id, term: entry.canonicalTerm || entry.term, category: entry.category, alias });
    aliasMap.set(key, list);
  });
});
const duplicateAliases = [...aliasMap.entries()].filter(([, list]) => new Set(list.map((item) => item.id)).size > 1);

const regressionTests = [
  'Froment belirtisi hangi sinir lezyonunu destekler?',
  'El pençesi ve 4-5. parmak duyu kaybı ulnar sinir lezyonunu düşündürür.',
  'Düşük el bileği radial sinir lezyonunun klasik bulgusudur.',
  'Mast hücre degranülasyonu histamin salınımına yol açar.',
  'Mukozal ödem ve bronkospazm anafilakside hava yolu riski oluşturur.',
  'Glukozüri ve ketonüri diyabetik ketoasidozda birlikte görülebilir.',
  'Retikülosit sayısı hemoliz yanıtını gösterir.',
  'PT/INR ve aPTT koagülasyon yollarını değerlendirir.',
  'Gram pozitif kok ve Gram negatif basil ayrımı mikrobiyolojik tanıda önemlidir.',
  'Tip I aşırı duyarlılık IgE aracılı mast hücre aktivasyonudur.',
  'MHC sınıf I CD8 T hücresine antijen sunar.',
  'Preeklampsi ve HELLP sendromu gebelik komplikasyonlarıdır.',
  'Duyarlılık ve özgüllük tanı testi performansını değerlendirir.',
  'ST elevasyonu EKG bulgusudur; aktif elevasyon omuz muayenesi terimidir.',
  'Laktik asit yüksekliği ascites anlamındaki asit değildir.',
];
const regressionResults = regressionTests.map((text) => {
  const norm = normalizeGlossaryText(text);
  const matches = terms.filter((entry) => (entry.aliases || []).some((alias) => norm.includes(normalizeGlossaryText(alias)))).slice(0, 12).map((entry) => entry.canonicalTerm || entry.term);
  return { text, matchedAny: matches.length > 0, sampleMatches: matches };
});

const report = {
  version: 'V288_CONTENT_COVERAGE_EXPANSION',
  scanned: {
    sourceFiles: sourceFiles.length,
    rawCases: rawCases.length,
    tusPearlCards: TUS_PEARL_CARDS.length,
    tusPearlTopics: TUS_PEARL_TOPICS.length,
    caseTextFragments: caseTexts.length,
    flashcardTextFragments: pearlCardTexts.length,
    topicTextFragments: pearlTopicTexts.length,
    sourceLiteralFragments: sourceFileTexts.length,
    totalTextFragments: allProjectText.length,
  },
  glossary: {
    totalEntries: terms.length,
    totalAliases: terms.reduce((sum, entry) => sum + (entry.aliases?.length || 0), 0),
    contentCoverageLayerEntries: TUS_GLOSSARY_CONTENT_COVERAGE_TERMS.length,
    activeContentCoverageEntries: activeContentTerms.length,
    activeContentCoverageFoundInCorpus: activeContentTerms.filter((entry) => entry.foundInCorpus).length,
    categoryAdditions,
    safeNestedEnhancedEntryCount: safeNestedEnhancedEntries.length,
  },
  integrity: {
    duplicateAliasCollisions: duplicateAliases.length,
    duplicateIds: integrity.issues.filter((issue) => issue.type === 'duplicate-id').length,
    criticalIssues: integrity.severityCounts.critical || 0,
    highIssues: integrity.severityCounts.high || 0,
    mediumIssues: integrity.severityCounts.medium || 0,
    lowIssues: integrity.severityCounts.low || 0,
  },
  rejectedOrDeferredCandidates,
  newEntries: activeContentTerms,
  safeNestedEnhancedEntries: safeNestedEnhancedEntries.map((entry) => ({ id: entry.id, canonicalTerm: entry.canonicalTerm, safeNestedTerms: entry.safeNestedTerms })),
  regressionResults,
  notes: [
    'Normal text glossary coverage is expanded through the content coverage layer; ambiguity-safety rules from V287 remain active.',
    'Broad roots such as ağrı/test/pozitif/negatif were intentionally not added as standalone entries.',
    'Nested glossary coverage remains controlled through safeNestedTerms and maxNestedDepth=1.',
  ],
};

const outPath = path.join(ROOT, 'GLOSSARY_V288_CONTENT_COVERAGE_AUDIT.json');
fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
console.log(JSON.stringify({
  totalEntries: report.glossary.totalEntries,
  totalAliases: report.glossary.totalAliases,
  rawCases: report.scanned.rawCases,
  tusPearlCards: report.scanned.tusPearlCards,
  activeContentCoverageEntries: report.glossary.activeContentCoverageEntries,
  activeContentCoverageFoundInCorpus: report.glossary.activeContentCoverageFoundInCorpus,
  duplicateAliasCollisions: report.integrity.duplicateAliasCollisions,
  criticalIssues: report.integrity.criticalIssues,
  highIssues: report.integrity.highIssues,
  regressionPassed: regressionResults.filter((item) => item.matchedAny).length,
  regressionTotal: regressionResults.length,
}, null, 2));
