
import { getGlossaryTerms, auditGlossaryIntegrity, normalizeGlossaryText } from './src/utils/glossary.js';
import { TUS_GLOSSARY_V332_MAJOR_JARGON_BATCH7_TERMS } from './src/data/tusGlossaryV332MajorJargonBatch7Index.js';

const all = getGlossaryTerms();
const norms = new Set(all.flatMap(t => [t.normalizedTerm, ...(t.normalizedAliases || [])].filter(Boolean)));
const added = TUS_GLOSSARY_V332_MAJOR_JARGON_BATCH7_TERMS;
const missing = added.filter(e => !norms.has(normalizeGlossaryText(e.term)));
const audit = auditGlossaryIntegrity(all);
const critical = audit.issues.filter(i => i.severity === 'critical').length;
const high = audit.issues.filter(i => i.severity === 'high').length;
console.log(JSON.stringify({
  total: all.length,
  added: added.length,
  missing: missing.map(e => e.term),
  auditSummary: audit.summary,
  critical,
  high
}, null, 2));
