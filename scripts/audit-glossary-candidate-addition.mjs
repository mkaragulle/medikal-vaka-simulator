
import fs from 'node:fs';
import { getGlossaryTerms, normalizeGlossaryText, auditGlossaryIntegrity } from '../src/utils/glossary.js';
import { TUS_GLOSSARY_CANDIDATE_AUDIT_TERMS } from '../src/data/tusGlossaryCandidateAuditIndex.js';

const terms = getGlossaryTerms();
const candidateEntries = TUS_GLOSSARY_CANDIDATE_AUDIT_TERMS;
const addedIds = new Set(candidateEntries.map((entry) => entry.id));
const activeAdded = terms.filter((entry) => addedIds.has(entry.id));

const aliasMap = new Map();
for (const entry of terms) {
  for (const alias of entry.aliases || []) {
    const key = normalizeGlossaryText(alias);
    if (!key) continue;
    const list = aliasMap.get(key) || [];
    list.push({ id: entry.id, term: entry.canonicalTerm || entry.term, alias });
    aliasMap.set(key, list);
  }
}
const duplicateAliases = [...aliasMap.entries()].filter(([, list]) => new Set(list.map((item) => item.id)).size > 1);
const duplicateIds = (() => {
  const seen = new Set(); const dup=[];
  for (const entry of terms) { if (seen.has(entry.id)) dup.push(entry.id); seen.add(entry.id); }
  return dup;
})();

const requiredRegression = [
  ['Adrenal Yetmezliği','Adrenal Yetmezliği'],
  ['Primer Adrenal Yetmezlik','Primer Adrenal Yetmezlik'],
  ['Karaciğer Yetmezliği','Karaciğer Yetmezliği'],
  ['IgA','IgA'],
  ['IgG','IgG'],
  ['IgM','IgM'],
  ['TSH','TSH'],
  ['PTH','PTH'],
  ['HBsAg','HBsAg'],
  ['PCR','PCR'],
  ['Pankreatik Ekzokrin Yetmezlik','Pankreatik Ekzokrin Yetmezlik'],
  ['Nervus laryngeus recurrens lezyonu','Nervus laryngeus recurrens lezyonu'],
  ['Prematür Over Yetmezliği','Prematür Over Yetmezliği'],
  ['Sinüs Bradikardi','Sinüs Bradikardi'],
  ['MR Kolanjiyografi','MR Kolanjiyografi'],
  ['Selektif IgA Eksikliği','Selektif IgA Eksikliği'],
  ['Kemik iliği yetmezliği','Kemik iliği yetmezliği'],
];
const termIndex = new Map(terms.map((entry) => [normalizeGlossaryText(entry.canonicalTerm || entry.term), entry]));
const regression = requiredRegression.map(([query, expected]) => {
  const entry = termIndex.get(normalizeGlossaryText(query));
  return { query, expected, actual: entry?.canonicalTerm || null, ok: Boolean(entry && normalizeGlossaryText(entry.canonicalTerm || entry.term) === normalizeGlossaryText(expected)) };
});

const integrity = auditGlossaryIntegrity(terms);
const summary = {
  totalEntries: terms.length,
  totalAliases: terms.reduce((sum, entry) => sum + (entry.aliases?.length || 0), 0),
  candidateAuditEntriesDeclared: candidateEntries.length,
  candidateAuditEntriesActive: activeAdded.length,
  duplicateIds: duplicateIds.length,
  duplicateNormalizedAliases: duplicateAliases.length,
  integritySeverityCounts: integrity.severityCounts,
  regressionPassed: regression.filter((item) => item.ok).length,
  regressionTotal: regression.length,
  regression,
};
fs.writeFileSync('reports/glossary-post-addition-audit.json', JSON.stringify(summary, null, 2));
const md = `# KlinikIQ V293 Post-addition Glossary Audit\n\n`+
`- Toplam aktif entry: ${summary.totalEntries}\n`+
`- Toplam alias: ${summary.totalAliases}\n`+
`- V293 candidate-audit entry deklarasyonu: ${summary.candidateAuditEntriesDeclared}\n`+
`- V293 aktif candidate-audit entry: ${summary.candidateAuditEntriesActive}\n`+
`- Duplicate id: ${summary.duplicateIds}\n`+
`- Duplicate normalized alias: ${summary.duplicateNormalizedAliases}\n`+
`- Integrity severity: ${JSON.stringify(summary.integritySeverityCounts)}\n`+
`- Regression: ${summary.regressionPassed} / ${summary.regressionTotal}\n\n`+
`## Regression detayları\n`+
summary.regression.map((item) => `- ${item.ok ? '✅' : '❌'} ${item.query} → ${item.actual || 'NO MATCH'}`).join('\n')+`\n`;
fs.writeFileSync('reports/glossary-post-addition-audit.md', md);
console.log(JSON.stringify(summary, null, 2));
