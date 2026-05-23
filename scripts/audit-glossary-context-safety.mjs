import { auditGlossaryIntegrity, getGlossaryTerms, normalizeGlossaryText } from '../src/utils/glossary.js';

const entries = getGlossaryTerms();
const base = auditGlossaryIntegrity(entries);
const aliasOwners = new Map();
for (const entry of entries) {
  for (const alias of entry.aliases || []) {
    const key = normalizeGlossaryText(alias);
    if (!key) continue;
    const list = aliasOwners.get(key) || [];
    list.push({ id: entry.id, term: entry.term, alias, category: entry.category });
    aliasOwners.set(key, list);
  }
}

const highRiskAliases = [
  'obstrüksiyon', 'tıkanıklık', 'inflamasyon', 'enfeksiyon', 'yetmezlik', 'iskemi',
  'nekroz', 'ödem', 'lezyon', 'kitle', 'nodül', 'infiltrasyon', 'darlık', 'bası',
  'hiperreaktivite', 'hassasiyet', 'ağrı', 'dispne', 'hipoksi', 'asidoz', 'alkaloz',
  'şok', 'kanama', 'perforasyon', 'torsiyon', 'elevasyon', 'defisit', 'tutulum', 'yanıt',
];

const riskReport = highRiskAliases.map((alias) => {
  const owners = aliasOwners.get(normalizeGlossaryText(alias)) || [];
  return { alias, owners };
}).filter((item) => item.owners.length);

const collisions = [...aliasOwners.entries()]
  .filter(([, owners]) => new Set(owners.map((owner) => owner.id)).size > 1)
  .map(([alias, owners]) => ({ alias, owners }));

console.log(JSON.stringify({
  totalEntries: entries.length,
  integrityIssues: base.issueCount,
  duplicateAliasCollisions: collisions.length,
  highRiskAliasOwners: riskReport,
}, null, 2));
