import fs from 'node:fs';
import { getGlossaryTerms } from '../src/utils/glossary.js';

const tooltipSource = fs.readFileSync(new URL('../src/components/GlossaryTooltip.jsx', import.meta.url), 'utf8');
const terms = getGlossaryTerms();
const definitionFields = ['shortDefinition','definition','previewDefinition','preAnswerSafeDefinition','postAnswerExplanation','postAnswerExpandedExplanation','detailedExplanation','clinicalContext','clinicalRelevance','mechanism','tusPearl','differentialPoint'];
const withPostOrDetailed = terms.filter((entry) => entry.postAnswerExplanation || entry.postAnswerExpandedExplanation || entry.detailedExplanation || entry.longDefinition).length;
const withFullEducationalSignal = terms.filter((entry) => definitionFields.some((field) => String(entry[field] || '').trim())).length;
const withPearl = terms.filter((entry) => String(entry.tusPearl || '').trim()).length;
const withDifferential = terms.filter((entry) => String(entry.differentialPoint || '').trim()).length;
const withNested = terms.filter((entry) => Array.isArray(entry.safeNestedTerms) && entry.safeNestedTerms.length).length;

const forbiddenRuntimePatterns = [
  { name: 'preanswer hides TUS pearl', pattern: /!isPreAnswer\s*&&\s*tusPearl/ },
  { name: 'preanswer hides differential', pattern: /!isPreAnswer\s*&&\s*differential/ },
  { name: 'preanswer hides detail block', pattern: /!isPreAnswer\s*&&\s*(?:expanded|showFullEducationalDetail)/ },
  { name: 'preanswer lower term cap', pattern: /revealMode\s*===\s*['"]preAnswer['"][\s\S]{0,120}PREANSWER_MAX_TERMS_PER_TEXT/ },
  { name: 'answerLeakRisk hides nested content', pattern: /answerLeakRisk\s*===\s*['"]high['"][\s\S]{0,80}return/ },
];
const failedRuntimeGuards = forbiddenRuntimePatterns.filter((item) => item.pattern.test(tooltipSource));

const cardContentSelection = {
  usesPostAnswerExplanation: /postAnswerExplanation/.test(tooltipSource),
  tusPearlAlwaysVisible: /\{tusPearl \? \(/.test(tooltipSource),
  differentialAlwaysVisible: /\{differential \? \(/.test(tooltipSource),
  detailBlockAlwaysVisible: /\{showFullEducationalDetail \? \(/.test(tooltipSource),
  revealModeDataIsFullEducational: /data-reveal-mode=\{GLOSSARY_EXPLANATION_MODE\}/.test(tooltipSource),
};

const report = {
  mode: 'fullEducational',
  checkedAt: new Date().toISOString(),
  totalEntries: terms.length,
  definitionFieldsChecked: definitionFields.length,
  entriesWithAnyEducationalDefinition: withFullEducationalSignal,
  entriesWithPostAnswerOrDetailedExplanation: withPostOrDetailed,
  entriesWithTusPearl: withPearl,
  entriesWithDifferentialPoint: withDifferential,
  entriesWithSafeNestedTerms: withNested,
  runtimeGuards: {
    forbiddenPatternCount: failedRuntimeGuards.length,
    failedRuntimeGuards,
  },
  cardContentSelection,
  regression: {
    preAnswerAndPostAnswerUseSameCardContent: failedRuntimeGuards.length === 0 && cardContentSelection.tusPearlAlwaysVisible && cardContentSelection.differentialAlwaysVisible,
    nestedCoverageIndependentFromAnswerState: failedRuntimeGuards.every((item) => item.name !== 'answerLeakRisk hides nested content'),
    triggerVisualModeNoLongerPreAnswerSpecific: cardContentSelection.revealModeDataIsFullEducational,
  },
};

fs.mkdirSync(new URL('../reports/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../reports/glossary-full-educational-mode-audit.json', import.meta.url), JSON.stringify(report, null, 2));

const md = `# Glossary Full Educational Mode Audit\n\n` +
`- Mode: fullEducational\n` +
`- Total glossary entries: ${report.totalEntries}\n` +
`- Entries with any educational definition field: ${withFullEducationalSignal}\n` +
`- Entries with postAnswer/detailed explanation: ${withPostOrDetailed}\n` +
`- Entries with TUS pearl: ${withPearl}\n` +
`- Entries with differential point: ${withDifferential}\n` +
`- Entries with safeNestedTerms: ${withNested}\n` +
`- Forbidden pre/post runtime guard patterns: ${failedRuntimeGuards.length}\n` +
`- Pre-answer and post-answer same glossary content: ${report.regression.preAnswerAndPostAnswerUseSameCardContent ? 'PASS' : 'FAIL'}\n` +
`- Nested coverage independent from answer state: ${report.regression.nestedCoverageIndependentFromAnswerState ? 'PASS' : 'FAIL'}\n` +
`- Trigger visual reveal mode normalized: ${report.regression.triggerVisualModeNoLongerPreAnswerSpecific ? 'PASS' : 'FAIL'}\n\n` +
`## Runtime checks\n\n` +
(failedRuntimeGuards.length ? failedRuntimeGuards.map((item) => `- FAIL: ${item.name}`).join('\n') : '- No forbidden pre-answer restriction pattern found.') + '\n';
fs.writeFileSync(new URL('../reports/glossary-full-educational-mode-audit.md', import.meta.url), md);
console.log(JSON.stringify(report, null, 2));
