import fs from 'node:fs';
import path from 'node:path';
import {
  auditGlossaryIntegrity,
  getGlossaryTerms,
  normalizeGlossaryText,
  isGenericStandaloneAlias,
} from '../src/utils/glossary.js';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SOURCE_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next']);

function walkFiles(dir, files = []) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!SKIP_DIRS.has(item)) walkFiles(full, files);
      continue;
    }
    if (SOURCE_EXTENSIONS.has(path.extname(item))) files.push(full);
  }
  return files;
}

const entries = getGlossaryTerms();
const audit = auditGlossaryIntegrity(entries);
const aliasOwner = new Map();
const allAliasKeys = new Set();

for (const entry of entries) {
  for (const alias of entry.aliases || []) {
    const key = normalizeGlossaryText(alias);
    if (!key) continue;
    allAliasKeys.add(key);
    const list = aliasOwner.get(key) || [];
    list.push({ id: entry.id, term: entry.term, displayTerm: entry.displayTerm, category: entry.category, alias, isGenericConcept: entry.isGenericConcept });
    aliasOwner.set(key, list);
  }
}

const sourceFiles = walkFiles(path.join(ROOT, 'src'));
const relevantTextFiles = sourceFiles.filter((file) => /case|question|pearl|glossary|tooltip|toolbox|catalog|komite|data|panel|quiz|feedback/i.test(file));
const content = relevantTextFiles.map((file) => ({ file: path.relative(ROOT, file), text: fs.readFileSync(file, 'utf8') }));
const combined = content.map((item) => item.text).join('\n');

const candidatePatterns = [
  /\b(?:sağ|sol)\s+[a-zçğıöşü]+\s+(?:bölge|insizyon|hassasiyet|ağrı|kenar|kadran|lob|arter|ven|sinir)\b/giu,
  /\b(?:aktif|pasif)\s+(?:elevasyon|abdüksiyon|adduksiyon|rotasyon|fleksiyon|ekstansiyon|hareket açıklığı)\b/giu,
  /\b(?:postoperatif|preoperatif|perioperatif)\s+[a-zçğıöşü]+\b/giu,
  /\b(?:direkt|indirekt)\s+[A-ZÇĞİÖŞÜa-zçğıöşü]+\s+(?:testi|bilirubinemi|Coombs testi)\b/giu,
  /\b[A-ZÇĞİÖŞÜa-zçğıöşü]+\s+(?:ultrasonografi|Doppler ultrasonografi|BT|MR|grafi|kültürü|yayması|testi)\b/giu,
  /\b(?:anion gap|normal anion gap|laktik)\s+metabolik\s+asidoz\b/giu,
  /\b(?:intravenöz|intramüsküler|oral|subkutan)\s+[a-zçğıöşü-]+(?:\s+[a-zçğıöşü-]+)?\b/giu,
  /\b(?:glomerüler filtrasyon|renal perfüzyon|renal hemodinamik|ventilasyon[- ]perfüzyon)\s+[a-zçğıöşü]+\b/giu,
  /\b(?:meningeal|peritoneal)\s+irritasyon\s+bulgusu\b/giu,
];

const candidateCounts = new Map();
for (const pattern of candidatePatterns) {
  for (const match of combined.matchAll(pattern)) {
    const raw = String(match[0] || '').replace(/\s+/g, ' ').trim();
    const key = normalizeGlossaryText(raw);
    if (!key || raw.length < 5) continue;
    candidateCounts.set(raw, (candidateCounts.get(raw) || 0) + 1);
  }
}

const missingTermCandidates = [...candidateCounts.entries()]
  .map(([term, count]) => ({ term, normalized: normalizeGlossaryText(term), count }))
  .filter((item) => !allAliasKeys.has(item.normalized))
  .sort((a, b) => b.count - a.count || b.term.length - a.term.length)
  .slice(0, 80);

const highRiskAliases = [
  'obstrüksiyon', 'tıkanıklık', 'inflamasyon', 'enfeksiyon', 'yetmezlik', 'iskemi', 'nekroz', 'ödem',
  'lezyon', 'kitle', 'darlık', 'bası', 'hassasiyet', 'ağrı', 'asidoz', 'şok', 'kanama', 'torsiyon',
  'elevasyon', 'defisit', 'tutulum', 'yanıt', 'kültür', 'rotasyon', 'insizyon', 'eksplorasyon',
  'sağ', 'sol', 'medial', 'lateral', 'anterior', 'posterior',
];

const highRiskAliasOwners = highRiskAliases.map((alias) => {
  const owners = aliasOwner.get(normalizeGlossaryText(alias)) || [];
  return { alias, owners };
}).filter((item) => item.owners.length);

const genericAliasRisks = [];
for (const entry of entries) {
  for (const alias of entry.aliases || []) {
    if (isGenericStandaloneAlias(alias) && !entry.isGenericConcept && normalizeGlossaryText(alias) !== normalizeGlossaryText(entry.term)) {
      genericAliasRisks.push({ id: entry.id, term: entry.term, alias, category: entry.category });
    }
  }
}

const acronymRisks = entries.flatMap((entry) => (entry.aliases || [])
  .filter((alias) => /^[A-ZÇĞİÖŞÜ]{1,3}$/.test(String(alias).trim()) && !entry.caseSensitiveDisplay && !['BT', 'MR', 'EKG', 'USG', 'BOS'].includes(String(alias).trim()))
  .map((alias) => ({ id: entry.id, term: entry.term, alias })));

function ownerFor(alias) {
  const list = aliasOwner.get(normalizeGlossaryText(alias)) || [];
  return list.map((item) => ({ id: item.id, term: item.term, category: item.category }));
}

const regressionTests = [
  { name: 'Astım binding', alias: 'astım', expectedIncludes: 'Astım', forbiddenIncludes: 'Eozinofil' },
  { name: 'Eozinofil binding', alias: 'eozinofil', expectedIncludes: 'Eozinofil', forbiddenIncludes: 'Astım' },
  { name: 'İleus binding', alias: 'ileus', expectedIncludes: 'İleus', forbiddenIncludes: 'Astım' },
  { name: 'Hiperkalemi binding', alias: 'hiperkalemi', expectedIncludes: 'Hiperkalemi' },
  { name: 'Doppler ultrasonografi binding', alias: 'Doppler ultrasonografi', expectedIncludes: 'Doppler' },
  { name: 'Aktif elevasyon binding', alias: 'aktif elevasyon', expectedIncludes: 'Aktif elevasyon' },
  { name: 'Sağ inguinal insizyon binding', alias: 'sağ inguinal insizyon', expectedIncludes: 'Sağ inguinal insizyon' },
  { name: 'Glomerüler filtrasyon binding', alias: 'glomerüler filtrasyon', expectedIncludes: 'Glomerüler filtrasyon' },
  { name: 'İntravenöz kalsiyum glukonat binding', alias: 'intravenöz kalsiyum glukonat', expectedIncludes: 'Kalsiyum glukonat' },
  { name: 'Direkt Coombs testi binding', alias: 'direkt Coombs testi', expectedIncludes: 'Direkt Coombs testi' },
  { name: 'Hava yolu obstrüksiyonu phrase', alias: 'hava yolu obstrüksiyonu', expectedIncludes: 'Hava yolu obstrüksiyonu' },
  { name: 'Bağırsak obstrüksiyonu phrase', alias: 'bağırsak obstrüksiyonu', expectedIncludes: 'Bağırsak obstrüksiyonu' },
  { name: 'Mesane çıkım obstrüksiyonu phrase', alias: 'mesane çıkım obstrüksiyonu', expectedIncludes: 'Mesane çıkım obstrüksiyonu' },
  { name: 'Obstrüksiyon general does not bind ileus', alias: 'obstrüksiyon', expectedIncludes: 'Obstrüksiyon', forbiddenIncludes: 'İleus' },
  { name: 'Inflamasyon general owner', alias: 'inflamasyon', expectedIncludes: 'İnflamasyon' },
  { name: 'Yetmezlik general owner', alias: 'yetmezlik', expectedIncludes: 'Yetmezlik' },
  { name: 'Rotasyon general owner', alias: 'rotasyon', expectedIncludes: 'Rotasyon' },
  { name: 'Kan kültürü phrase', alias: 'kan kültürü', expectedIncludes: 'Kan kültürü' },
  { name: 'İdrar kültürü phrase', alias: 'idrar kültürü', expectedIncludes: 'İdrar kültürü' },
];

const regressionResults = regressionTests.map((test) => {
  const owners = ownerFor(test.alias);
  const ownerText = owners.map((owner) => owner.term).join(' | ');
  const passedExpected = !test.expectedIncludes || ownerText.toLocaleLowerCase('tr').includes(test.expectedIncludes.toLocaleLowerCase('tr'));
  const passedForbidden = !test.forbiddenIncludes || !ownerText.toLocaleLowerCase('tr').includes(test.forbiddenIncludes.toLocaleLowerCase('tr'));
  return { ...test, owners, pass: passedExpected && passedForbidden };
});

const tooltipSource = fs.readFileSync(path.join(ROOT, 'src/components/GlossaryTooltip.jsx'), 'utf8');
const nestedTooltipSafety = {
  tooltipBodyContextModeBypass: tooltipSource.includes("contextMode === 'tooltip-body'"),
  plainTooltipBodyRenderer: tooltipSource.includes('smart-glossary-plain-inline'),
  maxNestedDepthProp: tooltipSource.includes('maxNestedDepth'),
  entryIdKey: tooltipSource.includes('data-glossary-entry-id') && tooltipSource.includes('resolvedEntry?.id'),
};

const report = {
  generatedAt: new Date().toISOString(),
  totalEntries: entries.length,
  totalAliases: [...aliasOwner.values()].reduce((sum, owners) => sum + owners.length, 0),
  scannedFiles: relevantTextFiles.length,
  scannedTextCharacters: combined.length,
  audit: {
    issueCount: audit.issueCount,
    severityCounts: audit.severityCounts,
    categorySummary: audit.categorySummary,
    criticalIssues: audit.issues.filter((issue) => issue.severity === 'critical').slice(0, 50),
    highIssues: audit.issues.filter((issue) => issue.severity === 'high').slice(0, 50),
    mediumIssueSample: audit.issues.filter((issue) => issue.severity === 'medium').slice(0, 40),
  },
  genericAliasRisks,
  acronymRisks,
  highRiskAliasOwners,
  missingTermCandidates,
  nestedTooltipSafety,
  regressionResults,
  regressionSummary: {
    total: regressionResults.length,
    passed: regressionResults.filter((test) => test.pass).length,
    failed: regressionResults.filter((test) => !test.pass),
  },
};

console.log(JSON.stringify(report, null, 2));

if (report.audit.criticalIssues.length || genericAliasRisks.length || report.regressionSummary.failed.length) {
  process.exitCode = 1;
}
