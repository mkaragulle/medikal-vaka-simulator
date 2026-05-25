import { getGlossaryTerms, normalizeGlossaryText, auditGlossaryIntegrity } from './src/utils/glossary.js';
const terms = getGlossaryTerms();
const aliases = new Set();
for (const t of terms) {
  for (const a of [t.term, t.TurkishName, t.EnglishName, ...(Array.isArray(t.aliases) ? t.aliases : [])]) {
    if (a) aliases.add(normalizeGlossaryText(a));
  }
}
console.log(JSON.stringify({count: terms.length, aliasCount: aliases.size, sample: terms.slice(0,3).map(t=>t.term), audit: auditGlossaryIntegrity().summary || auditGlossaryIntegrity().counts || auditGlossaryIntegrity()}, null, 2));
