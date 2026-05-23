import { auditGlossaryIntegrity, getGlossaryTerms, normalizeGlossaryText } from '../src/utils/glossary.js';

const terms = getGlossaryTerms();
const audit = auditGlossaryIntegrity(terms);

const aliasOwner = new Map();
for (const entry of terms) {
  for (const alias of entry.aliases || []) {
    const normalized = normalizeGlossaryText(alias);
    if (!normalized) continue;
    const list = aliasOwner.get(normalized) || [];
    list.push({ id: entry.id, term: entry.term, alias, category: entry.category });
    aliasOwner.set(normalized, list);
  }
}

const collisions = Array.from(aliasOwner.entries())
  .filter(([, list]) => new Set(list.map((item) => item.id)).size > 1)
  .map(([normalizedAlias, entries]) => ({ normalizedAlias, entries }));

const shortDefinitions = terms
  .filter((entry) => String(entry.shortDefinition || entry.definition || '').trim().length < 24)
  .map((entry) => ({ id: entry.id, term: entry.term, definition: entry.shortDefinition || entry.definition || '' }));

const blockingIssues = audit.issues.filter((issue) => ['critical', 'high'].includes(issue.severity));
const report = {
  totalEntries: terms.length,
  totalAliases: audit.totalAliases,
  issueCount: audit.issueCount,
  severityCounts: audit.severityCounts,
  blockingIssueCount: blockingIssues.length,
  duplicateAliasCollisions: collisions.length,
  shortDefinitionCount: shortDefinitions.length,
  blockingIssues: blockingIssues.slice(0, 100),
  mediumIssueSample: audit.issues.filter((issue) => issue.severity === 'medium').slice(0, 50),
  duplicateAliasExamples: collisions.slice(0, 50),
  shortDefinitionExamples: shortDefinitions.slice(0, 50),
};

console.log(JSON.stringify(report, null, 2));

if (blockingIssues.length > 0 || collisions.length > 0) {
  process.exitCode = 1;
}
