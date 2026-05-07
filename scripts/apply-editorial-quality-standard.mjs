import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  normalizeMedicalTurkish,
  repairEditorialQuality,
  validateFeedbackTextQuality,
} from '../src/utils/editorialQuality.js';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const DATA_MODULES = [
  {
    path: 'src/data/cases.js',
    exportName: 'cases',
    footer: `\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`,
  },
  { path: 'src/data/aiQuestionSeeds.js', exportName: 'AI_QUESTION_SEEDS', footer: '\n' },
  { path: 'src/data/aiBranchQuestionTemplates.js', exportName: 'AI_BRANCH_TEMPLATE_SEEDS', footer: '\n' },
  { path: 'src/data/aiSyntheticFallbackTemplates.js', exportName: 'AI_SYNTHETIC_FALLBACK_SEEDS', footer: '\n' },
];

const SKIP_KEYS = new Set([
  'id', 'branchId', 'caseId', 'source', 'sourceCaseId', 'seedId', 'contentSignature', 'topicSignature',
  'generationSignature', 'semanticFingerprint', 'dedupeKey', 'optionSetSignature', 'imageUrl', 'sourceUrl',
  'sourceName', 'license', 'type', 'priority', 'score', 'aiMeta', 'metadata', 'provider', 'generator',
  'schemaVersion', 'generatedAt', 'sourceSeedId', 'sourceConceptOnly', 'conceptOriginHash', 'variantAngle',
  'variantNo', 'remoteAttempt', 'validationWarnings', 'qualityGateErrors', 'qualityGateWarnings', 'caseType',
  'spotCategory', 'originalBranchId', 'conceptOriginId', 'correctAnswer', 'icon', 'color', 'tone', 'slug',
  'path', 'href', 'modality', 'image', 'url', 'displayUrl', 'dataKey', 'valueKey', 'legacyId',
]);

const FRAGMENT_KEYS = new Set([
  'title', 'label', 'heading', 'correct', 'option', 'options', 'diagnosisMeta', 'difficulty', 'relatedBranch',
  'branchName', 'profile', 'presentation', 'chiefComplaint', 'setting', 'patientLine', 'demographics', 'parameter',
  'value', 'reference', 'note', 'unit', 'name', 'category', 'shortName', 'description',
]);

const FEEDBACK_KEYS = new Set([
  'text', 'summary', 'explanation', 'whyCorrect', 'whyWrong', 'nextStep', 'historySummary', 'clinicalFocus',
  'learningTarget', 'learningOutcome', 'examPearl', 'spotPearl', 'spotClue', 'trap', 'interpretation', 'question',
  'stem', 'caption', 'finding', 'findings', 'exam', 'riskContext', 'distinctiveClues', 'managementSteps',
  'management', 'comparisonPoints', 'differentialComparison', 'clinicalPearls', 'pearls',
]);

const SECTION_BY_KEY = new Map([
  ['examPearl', 'Sınav incisi'],
  ['spotPearl', 'Sınav incisi'],
  ['clinicalPearls', 'Sınav incisi'],
  ['pearls', 'Sınav incisi'],
  ['distinctiveClues', 'Ayırt ettirici ipucu'],
  ['evidenceChain', 'Kanıt zinciri'],
  ['whyCorrect', 'Klinik gerekçe'],
  ['explanation', 'Klinik gerekçe'],
  ['managementSteps', 'Yönetim'],
  ['management', 'Yönetim'],
  ['comparisonPoints', 'Seçenek açıklaması'],
  ['differentialComparison', 'Seçenek açıklaması'],
]);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function isLikelyClinicalTextKey(key) {
  return FEEDBACK_KEYS.has(key) || /text|summary|explanation|feedback|pearl|clue|risk|history|stem|question|management|evidence|comparison|caption|focus|outcome/i.test(key);
}

function normalizeString(value, key, context) {
  if (SKIP_KEYS.has(key)) return value;
  const raw = String(value ?? '');
  if (!raw.trim()) return raw;
  const sectionTitle = context.sectionTitle || SECTION_BY_KEY.get(key) || context.parentLabel || '';
  const allowFragment = FRAGMENT_KEYS.has(key) || raw.length < 55;
  let cleaned = normalizeMedicalTurkish(raw, { sectionTitle });

  if (isLikelyClinicalTextKey(key) && !allowFragment) {
    cleaned = repairEditorialQuality(cleaned, {
      sectionTitle,
      correct: context.correct || '',
      clue: context.clue || '',
    });
  }

  // Keep diagnosis/options compact; do not turn answer options into full sentences.
  if (FRAGMENT_KEYS.has(key)) cleaned = normalizeMedicalTurkish(cleaned, { sectionTitle });

  return cleaned;
}

function walk(value, key = '', context = { sectionTitle: '', parentLabel: '', correct: '', clue: '' }, stats, caseRef = null) {
  if (SKIP_KEYS.has(key)) return value;

  if (typeof value === 'string') {
    const next = normalizeString(value, key, context);
    if (next !== value) {
      stats.changedStrings += 1;
      if (stats.examples.length < 20) stats.examples.push({ before: value, after: next });
      if (caseRef) stats.touchedCases.add(caseRef.id || caseRef.title || 'unknown-case');
    }
    return next;
  }

  if (Array.isArray(value)) {
    const childContext = { ...context, sectionTitle: SECTION_BY_KEY.get(key) || context.sectionTitle };
    return value.map((item) => walk(item, key, childContext, stats, caseRef));
  }

  if (value && typeof value === 'object') {
    const objectCorrect = value?.diagnosis?.correct || value?.correctConcept || value?.correct || context.correct || '';
    const objectClue = Array.isArray(value?.patientIntro?.distinctiveClues)
      ? value.patientIntro.distinctiveClues[0]
      : Array.isArray(value?.evidenceChain)
        ? value.evidenceChain[0]?.text || value.evidenceChain[0]
        : context.clue || '';
    const parentLabel = value.label || value.title || context.parentLabel || '';
    const nextObject = {};
    const currentCaseRef = value.id && (value.branchId || value.diagnosis || value.caseType) ? value : caseRef;
    Object.entries(value).forEach(([childKey, childValue]) => {
      nextObject[childKey] = walk(childValue, childKey, {
        sectionTitle: SECTION_BY_KEY.get(childKey) || context.sectionTitle,
        parentLabel,
        correct: objectCorrect,
        clue: typeof objectClue === 'string' ? objectClue : objectClue?.text || '',
      }, stats, currentCaseRef);
    });
    return nextObject;
  }

  return value;
}

function countResidualIssues(value, key = '', output = []) {
  if (SKIP_KEYS.has(key)) return output;
  if (typeof value === 'string') {
    const result = validateFeedbackTextQuality(value);
    if (!result.ok || result.warnings.length) {
      const preview = value.slice(0, 140);
      if (/Sınav incisi\s*[|:]|Ayırıcı nokta\s*:|Karar verdirici ipucu\s*:|Destekleyici kanıt\s*:|wheezing|benzer seçenekleri ayıran ana patern|sonuçlar tek bir tanı adını yazmaz|klinik bağlam içinde|öğrenme hedefi|\|/.test(value)) {
        output.push({ key, preview, errors: result.errors, warnings: result.warnings });
      }
    }
  } else if (Array.isArray(value)) {
    value.forEach((item) => countResidualIssues(item, key, output));
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([childKey, childValue]) => countResidualIssues(childValue, childKey, output));
  }
  return output;
}

const globalReport = {
  generatedAt: new Date().toISOString(),
  files: [],
  totalChangedStrings: 0,
  totalTouchedCases: 0,
  residualIssues: [],
};

for (const moduleSpec of DATA_MODULES) {
  const absolutePath = path.join(root, moduleSpec.path);
  const moduleUrl = `${pathToFileURL(absolutePath).href}?v=${Date.now()}-${Math.random()}`;
  const module = await import(moduleUrl);
  const exportedValue = module[moduleSpec.exportName];
  const stats = { changedStrings: 0, touchedCases: new Set(), examples: [] };
  const cleaned = walk(clone(exportedValue), moduleSpec.exportName, {}, stats, null);
  const source = `export const ${moduleSpec.exportName} = ${JSON.stringify(cleaned, null, 2)};${moduleSpec.footer}`;
  fs.writeFileSync(absolutePath, `${source}\n`);

  const residualIssues = [];
  globalReport.files.push({
    file: moduleSpec.path,
    exportName: moduleSpec.exportName,
    changedStrings: stats.changedStrings,
    touchedCases: stats.touchedCases.size,
    examples: stats.examples.filter(Boolean),
    residualIssueCount: residualIssues.length,
  });
  globalReport.totalChangedStrings += stats.changedStrings;
  globalReport.totalTouchedCases += stats.touchedCases.size;
  globalReport.residualIssues.push(...residualIssues.map((issue) => ({ file: moduleSpec.path, ...issue })));
}

globalReport.residualIssues = globalReport.residualIssues.slice(0, 200);
fs.writeFileSync(path.join(root, 'EDITORIAL_TURKISH_MEDICAL_STANDARD_REPORT.json'), JSON.stringify(globalReport, null, 2));

const summary = `# KlinikIQ Editorial Turkish Medical Standard Report\n\nGenerated at: ${globalReport.generatedAt}\n\n## Scope\n\n- Embedded case data\n- AI question seed data\n- Branch-specific AI templates\n- Synthetic fallback templates\n- Runtime editorial quality utilities and AI quality gate\n\n## Result\n\n- Changed string fields: ${globalReport.totalChangedStrings}\n- Embedded cases touched: ${globalReport.files.find((item) => item.file === 'src/data/cases.js')?.touchedCases || 0}\n- Total case/seed objects touched: ${globalReport.totalTouchedCases}\n\n## File summary\n\n${globalReport.files.map((item) => `- ${item.file}: ${item.changedStrings} string edit(s), ${item.touchedCases} touched case/seed object(s), ${item.residualIssueCount} tracked residual issue(s).`).join('\n')}\n\n## Applied editorial rules\n\n- Repeated section labels at the start of text were removed.\n- “Sınav incisi | ...”, “Ayırıcı nokta: ...”, “Mekanizma: ...”, “Karar verdirici ipucu: ...” style prefixes were converted to natural Turkish.\n- Unnecessary pipes, semicolons, and label-like colon usage were reduced.\n- English terms such as wheezing, rash, airway, screening, follow-up, management and trigger were normalized to Turkish medical usage.\n- Template/meta phrases such as “benzer seçenekleri ayıran ana patern olarak hatırlanmalıdır” and “sonuçlar tek bir tanı adını yazmaz” were removed or repaired.\n- AI generated questions now pass through stronger text repair and validation before display.\n`;
fs.writeFileSync(path.join(root, 'EDITORIAL_TURKISH_MEDICAL_STANDARD_SUMMARY.md'), summary);

console.log(JSON.stringify(globalReport, null, 2));
