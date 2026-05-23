import { auditGlossaryIntegrity, getGlossaryTerms, normalizeGlossaryText } from '../src/utils/glossary.js';

const entries = getGlossaryTerms();
const base = auditGlossaryIntegrity(entries);
const aliasOwners = new Map();
for (const entry of entries) {
  for (const alias of entry.aliases || []) {
    const key = normalizeGlossaryText(alias);
    if (!key) continue;
    const list = aliasOwners.get(key) || [];
    list.push({ id: entry.id, term: entry.term, alias, category: entry.category, isGenericConcept: entry.isGenericConcept });
    aliasOwners.set(key, list);
  }
}

const highRiskAliases = [
  'obstrüksiyon', 'tıkanıklık', 'inflamasyon', 'enfeksiyon', 'yetmezlik', 'iskemi',
  'nekroz', 'ödem', 'lezyon', 'kitle', 'nodül', 'infiltrasyon', 'darlık', 'bası',
  'hiperreaktivite', 'hassasiyet', 'ağrı', 'dispne', 'hipoksi', 'asidoz', 'alkaloz',
  'şok', 'kanama', 'perforasyon', 'torsiyon', 'elevasyon', 'defisit', 'tutulum', 'yanıt',
  'kültür', 'rotasyon', 'insizyon', 'eksplorasyon', 'sağ', 'sol', 'medial', 'lateral',
];

const riskReport = highRiskAliases.map((alias) => {
  const owners = aliasOwners.get(normalizeGlossaryText(alias)) || [];
  return { alias, owners };
}).filter((item) => item.owners.length);

const collisions = [...aliasOwners.entries()]
  .filter(([, owners]) => new Set(owners.map((owner) => owner.id)).size > 1)
  .map(([alias, owners]) => ({ alias, owners }));

const blockingIssues = base.issues.filter((issue) => ['critical', 'high'].includes(issue.severity));

console.log(JSON.stringify({
  totalEntries: entries.length,
  totalAliases: base.totalAliases,
  integrityIssues: base.issueCount,
  severityCounts: base.severityCounts,
  blockingIssueCount: blockingIssues.length,
  duplicateAliasCollisions: collisions.length,
  highRiskAliasOwners: riskReport,
  blockingIssues: blockingIssues.slice(0, 100),
}, null, 2));

if (blockingIssues.length || collisions.length) process.exitCode = 1;
