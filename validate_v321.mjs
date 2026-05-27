import { getGlossaryTerms, auditGlossaryIntegrity, normalizeGlossaryText } from './src/utils/glossary.js';
import { TUS_GLOSSARY_V321_DEEP_HIGH_YIELD_BATCH4_TERMS } from './src/data/tusGlossaryV321DeepHighYieldBatch4Index.js';
const terms = getGlossaryTerms();
const audit = auditGlossaryIntegrity();
const allAliases = new Set();
for (const t of terms) {
  for (const a of [t.term, t.TurkishName, t.EnglishName, ...(Array.isArray(t.aliases) ? t.aliases : [])]) {
    if (a) allAliases.add(normalizeGlossaryText(a));
  }
}
const missing = [];
for (const e of TUS_GLOSSARY_V321_DEEP_HIGH_YIELD_BATCH4_TERMS) {
  const n = normalizeGlossaryText(e.term);
  if (!allAliases.has(n)) missing.push(e.term);
}
console.log(JSON.stringify({v321Count:TUS_GLOSSARY_V321_DEEP_HIGH_YIELD_BATCH4_TERMS.length,totalTerms:terms.length,totalAliases:allAliases.size,missingCount:missing.length,missing:missing.slice(0,20),severityCounts:audit.summary?.severityCounts || audit.severityCounts || {},issueCount:audit.summary?.issueCount}, null, 2));
