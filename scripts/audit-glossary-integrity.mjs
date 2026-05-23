import { auditGlossaryIntegrity, getGlossaryTerms, normalizeGlossaryText } from '../src/utils/glossary.js';

const terms = getGlossaryTerms();
const audit = auditGlossaryIntegrity(terms);

const aliasOwner = new Map();
for (const entry of terms) {
  for (const alias of entry.aliases || []) {
    const normalized = normalizeGlossaryText(alias);
    if (!normalized) continue;
    const list = aliasOwner.get(normalized) || [];
    list.push({ id: entry.id, term: entry.term, alias });
    aliasOwner.set(normalized, list);
  }
}

const collisions = Array.from(aliasOwner.entries())
  .filter(([, list]) => new Set(list.map((item) => item.id)).size > 1)
  .map(([normalizedAlias, entries]) => ({ normalizedAlias, entries }));

const shortDefinitions = terms
  .filter((entry) => String(entry.shortDefinition || entry.definition || '').trim().length < 24)
  .map((entry) => ({ id: entry.id, term: entry.term, definition: entry.shortDefinition || entry.definition || '' }));

const report = {
  totalEntries: terms.length,
  issueCount: audit.issueCount,
  duplicateAliasCollisions: collisions.length,
  shortDefinitionCount: shortDefinitions.length,
  issues: audit.issues.slice(0, 100),
  duplicateAliasExamples: collisions.slice(0, 50),
  shortDefinitionExamples: shortDefinitions.slice(0, 50),
};

console.log(JSON.stringify(report, null, 2));

if (audit.issueCount > 0 || collisions.length > 0) {
  process.exitCode = 1;
}
