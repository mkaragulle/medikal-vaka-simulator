import fs from 'node:fs';
import path from 'node:path';
import { getGlossaryTerms, isPlaceholderDefinitionText, hasPreAnswerDefinitionLeakage } from '../src/utils/glossary.js';

const projectRoot = process.cwd();
const reportsDir = path.join(projectRoot, 'reports');
fs.mkdirSync(reportsDir, { recursive: true });

const terms = getGlossaryTerms();
const requiredDefinitionFields = ['shortDefinition', 'preAnswerSafeDefinition'];
const optionalEducationFields = ['postAnswerExplanation', 'postAnswerExpandedExplanation', 'tusPearl', 'differentialPoint', 'clinicalContext', 'mechanism'];
const allDefinitionFields = [...requiredDefinitionFields, ...optionalEducationFields, 'definition'];

function normalized(value = '') {
  return String(value || '').replace(/\s+/g, ' ').trim().toLocaleLowerCase('tr');
}

function qualityIssueFor(entry, field, value) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text && requiredDefinitionFields.includes(field)) return 'missing-required-definition-field';
  if (!text) return null;
  if (isPlaceholderDefinitionText(text)) return 'placeholder-or-generic-filler';
  if (requiredDefinitionFields.includes(field) && text.length < 28) return 'too-short-required-definition';
  const term = String(entry.displayTerm || entry.canonicalTerm || entry.term || '').replace(/\s+/g, ' ').trim();
  if (text && term && normalized(text) === normalized(term)) return 'definition-repeats-title-only';
  return null;
}

const issues = [];
const rewritten = [];
const manualReview = [];
const definitionBuckets = new Map();

for (const entry of terms) {
  const term = entry.displayTerm || entry.canonicalTerm || entry.term || '';
  const id = entry.id || '';
  for (const field of allDefinitionFields) {
    const value = entry[field];
    const type = qualityIssueFor(entry, field, value);
    if (type) {
      issues.push({ id, term, field, type, value: value || '' });
    }
  }
  for (const field of allDefinitionFields) {
    const value = String(entry[field] || '').replace(/\s+/g, ' ').trim();
    if (!value || value.length < 42) continue;
    const key = normalized(value);
    if (!definitionBuckets.has(key)) definitionBuckets.set(key, []);
    definitionBuckets.get(key).push({ id, term, field, category: entry.category || '' });
  }
  if (entry.definitionQualityPatch === 'v294-placeholder-rewrite') {
    rewritten.push({
      id,
      canonicalTerm: term,
      category: entry.category || '',
      shortDefinition: entry.shortDefinition || '',
      preAnswerSafeDefinition: entry.preAnswerSafeDefinition || '',
      postAnswerExplanation: entry.postAnswerExplanation || entry.postAnswerExpandedExplanation || '',
      tusPearl: entry.tusPearl || '',
      differentialPoint: entry.differentialPoint || '',
      answerLeakRisk: entry.answerLeakRisk || 'medium',
      reason: 'Placeholder/generic pre-answer definition or duplicated low-value explanation was replaced with category-specific, scientific, TUS-oriented wording.',
    });
  }
  if (hasPreAnswerDefinitionLeakage(entry.preAnswerSafeDefinition || '')) {
    manualReview.push({ id, term, reason: 'pre-answer leakage heuristic still detected wording that may reveal a diagnostic or treatment answer', preAnswerSafeDefinition: entry.preAnswerSafeDefinition || '' });
  }
}

const duplicatedDefinitions = [];
for (const [definition, owners] of definitionBuckets.entries()) {
  const uniqueIds = new Set(owners.map((item) => item.id));
  const uniqueCategories = new Set(owners.map((item) => String(item.category || '').split('/')[0].trim()));
  if (uniqueIds.size > 2 && uniqueCategories.size > 1) {
    duplicatedDefinitions.push({ definition, owners: owners.slice(0, 12), ownerCount: owners.length });
  }
}

const severityCounts = {
  critical: issues.filter((issue) => ['placeholder-or-generic-filler', 'missing-required-definition-field'].includes(issue.type)).length,
  medium: issues.filter((issue) => ['too-short-required-definition', 'definition-repeats-title-only'].includes(issue.type)).length + duplicatedDefinitions.length,
  manualReview: manualReview.length,
};

const audit = {
  version: 'V294_DEFINITION_QUALITY_AUDIT',
  scannedEntryCount: terms.length,
  scannedDefinitionFieldCount: terms.length * allDefinitionFields.length,
  placeholderOrFillerIssueCount: issues.filter((issue) => issue.type === 'placeholder-or-generic-filler').length,
  missingRequiredDefinitionCount: issues.filter((issue) => issue.type === 'missing-required-definition-field').length,
  rewrittenEntryCount: rewritten.length,
  manualReviewCount: manualReview.length,
  duplicatedDefinitionSuspicionCount: duplicatedDefinitions.length,
  severityCounts,
  issues,
  rewrittenEntries: rewritten,
  manualReviewDefinitions: manualReview,
  duplicatedDefinitions,
  regression: {
    noPlaceholderDefinitionsRemaining: issues.filter((issue) => issue.type === 'placeholder-or-generic-filler').length === 0,
    noPreAnswerLeakageInPatchedEntries: rewritten.every((entry) => !hasPreAnswerDefinitionLeakage(entry.preAnswerSafeDefinition)),
    rewrittenEntriesHaveTusPearl: rewritten.every((entry) => Boolean(entry.tusPearl)),
    rewrittenEntriesHaveDifferentialPoint: rewritten.every((entry) => Boolean(entry.differentialPoint)),
  },
};

fs.writeFileSync(path.join(reportsDir, 'glossary-definition-quality-audit.json'), JSON.stringify(audit, null, 2), 'utf8');
fs.writeFileSync(path.join(reportsDir, 'glossary-rewritten-definitions.json'), JSON.stringify(rewritten, null, 2), 'utf8');
fs.writeFileSync(path.join(reportsDir, 'glossary-manual-review-definitions.json'), JSON.stringify(manualReview, null, 2), 'utf8');

const csvHeader = ['id','canonicalTerm','oldIssueType','newShortDefinition','newPreAnswerSafeDefinition','newPostAnswerExplanation','newTusPearl','newDifferentialPoint','category','answerLeakRisk'];
const csvRows = rewritten.map((item) => [
  item.id,
  item.canonicalTerm,
  'placeholder/generic-filler-definition',
  item.shortDefinition,
  item.preAnswerSafeDefinition,
  item.postAnswerExplanation,
  item.tusPearl,
  item.differentialPoint,
  item.category,
  item.answerLeakRisk,
]);
function csvEscape(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}
fs.writeFileSync(path.join(reportsDir, 'glossary-placeholder-entries-before-after.csv'), [csvHeader, ...csvRows].map((row) => row.map(csvEscape).join(',')).join('\n'), 'utf8');

const md = `# Glossary Definition Quality Audit — V294\n\n` +
`## Summary\n\n` +
`- Scanned glossary entries: **${audit.scannedEntryCount}**\n` +
`- Scanned definition-like fields: **${audit.scannedDefinitionFieldCount}**\n` +
`- Placeholder/filler definitions remaining after patch: **${audit.placeholderOrFillerIssueCount}**\n` +
`- Entries rewritten by V294 quality layer: **${audit.rewrittenEntryCount}**\n` +
`- Manual review items after patch: **${audit.manualReviewCount}**\n` +
`- Duplicate/generic definition suspicion groups: **${audit.duplicatedDefinitionSuspicionCount}**\n\n` +
`## What was fixed\n\n` +
`V294 adds a dedicated definition-quality layer that overrides placeholder or generic glossary explanations with scientific, short, TUS-oriented definitions. It also changes the runtime neutral pre-answer fallback so it no longer generates phrases such as “klinik metinlerde anlamı bilinmesi gereken tıbbi/terminolojik bir kavramdır.”\n\n` +
`## Rewritten entries\n\n` +
rewritten.map((item) => `### ${item.canonicalTerm}\n- Category: ${item.category}\n- New short definition: ${item.shortDefinition}\n- New pre-answer definition: ${item.preAnswerSafeDefinition}\n- New TUS pearl: ${item.tusPearl}\n- Differential point: ${item.differentialPoint}`).join('\n\n') +
`\n\n## Regression checks\n\n` +
Object.entries(audit.regression).map(([key, value]) => `- ${key}: **${value ? 'PASS' : 'FAIL'}**`).join('\n') +
`\n`;
fs.writeFileSync(path.join(reportsDir, 'glossary-definition-quality-audit.md'), md, 'utf8');

console.log(JSON.stringify({
  scannedEntryCount: audit.scannedEntryCount,
  placeholderRemaining: audit.placeholderOrFillerIssueCount,
  rewrittenEntryCount: audit.rewrittenEntryCount,
  manualReviewCount: audit.manualReviewCount,
  duplicatedDefinitionSuspicionCount: audit.duplicatedDefinitionSuspicionCount,
  regression: audit.regression,
}, null, 2));
