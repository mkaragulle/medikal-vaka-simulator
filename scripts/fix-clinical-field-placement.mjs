import { writeFileSync } from 'node:fs';
import { cases } from '../src/data/cases.js';
import { AI_QUESTION_SEEDS } from '../src/data/aiQuestionSeeds.js';
import { AI_BRANCH_TEMPLATE_SEEDS } from '../src/data/aiBranchQuestionTemplates.js';
import { AI_SYNTHETIC_FALLBACK_SEEDS } from '../src/data/aiSyntheticFallbackTemplates.js';
import {
  repairMisplacedClinicalData,
  validateClinicalFieldPlacement,
  removeInlineFieldLabels,
  normalizeClinicalDatumText,
  repairEvidenceChainItems,
} from '../src/utils/clinicalFieldPlacement.js';

function clean(value) {
  if (!value || typeof value !== 'string') return value;
  return normalizeClinicalDatumText(removeInlineFieldLabels(value)).replace(/[.]$/u, '');
}

function cleanSentence(value) {
  const text = clean(value);
  if (!text) return text;
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function cleanArray(items = [], sentence = false) {
  return (Array.isArray(items) ? items : [])
    .map((item) => (sentence ? cleanSentence(item) : clean(item)))
    .filter(Boolean);
}

function cleanTitledArray(items = []) {
  return (Array.isArray(items) ? items : []).map((item) => {
    if (typeof item === 'string') return clean(item);
    if (!item || typeof item !== 'object') return item;
    return {
      ...item,
      title: clean(item.title || item.label || ''),
      label: item.label ? clean(item.label) : item.label,
      text: item.text ? cleanSentence(item.text) : item.text,
      summary: item.summary ? cleanSentence(item.summary) : item.summary,
      explanation: item.explanation ? cleanSentence(item.explanation) : item.explanation,
    };
  }).filter(Boolean);
}

function cleanInvestigation(investigation = {}, index = 0) {
  const rows = Array.isArray(investigation.rows)
    ? investigation.rows.map((row) => Array.isArray(row) ? row.map((cell, cellIndex) => (cellIndex <= 1 ? clean(cell) : cell)) : clean(row))
    : investigation.rows;
  return {
    ...investigation,
    label: clean(investigation.label || investigation.name || `Tetkik ${index + 1}`),
    summary: investigation.summary ? cleanSentence(investigation.summary) : investigation.summary,
    findings: cleanArray(investigation.findings, false),
    rows,
  };
}

function targetedClean(item) {
  const clone = structuredClone(item);
  ['title', 'clinicalFocus', 'chiefComplaint', 'stem', 'question', 'learningTarget', 'demographics', 'setting'].forEach((key) => {
    if (clone[key]) clone[key] = clean(clone[key]);
  });
  if (Array.isArray(clone.exam)) clone.exam = cleanArray(clone.exam, true);
  if (clone.patientIntro) {
    clone.patientIntro = {
      ...clone.patientIntro,
      profile: clean(clone.patientIntro.profile),
      presentation: clean(clone.patientIntro.presentation),
      riskContext: cleanArray(clone.patientIntro.riskContext, false),
      distinctiveClues: cleanArray(clone.patientIntro.distinctiveClues, false),
      historySummary: cleanSentence(clone.patientIntro.historySummary),
      priorityFocus: cleanSentence(clone.patientIntro.priorityFocus),
    };
  }
  if (Array.isArray(clone.investigations)) clone.investigations = clone.investigations.map(cleanInvestigation);
  if (clone.findings) {
    clone.findings = {
      ...clone.findings,
      history: cleanArray(clone.findings.history, false),
      exam: cleanArray(clone.findings.exam, true),
      investigations: Array.isArray(clone.findings.investigations) ? clone.findings.investigations.map(cleanInvestigation) : clone.findings.investigations,
    };
  }
  if (Array.isArray(clone.evidenceChain)) clone.evidenceChain = cleanTitledArray(clone.evidenceChain);
  if (clone.diagnosis) {
    clone.diagnosis = { ...clone.diagnosis };
    clone.diagnosis.explanation = cleanSentence(clone.diagnosis.explanation);
    clone.diagnosis.nextStep = cleanSentence(clone.diagnosis.nextStep);
    clone.diagnosis.pearls = cleanTitledArray(clone.diagnosis.pearls);
    if (clone.diagnosis.answerFeedback) {
      const fb = { ...clone.diagnosis.answerFeedback };
      fb.whyCorrect = cleanSentence(fb.whyCorrect);
      fb.evidenceChain = cleanTitledArray(fb.evidenceChain);
      fb.pearls = cleanTitledArray(fb.pearls);
      fb.clinicalPearls = cleanTitledArray(fb.clinicalPearls);
      fb.management = cleanTitledArray(fb.management);
      fb.managementSteps = cleanTitledArray(fb.managementSteps);
      fb.learningOutcome = cleanSentence(fb.learningOutcome);
      clone.diagnosis.answerFeedback = fb;
    }
  }
  return clone;
}

function repairCaseLike(item) {
  const before = JSON.stringify(item);
  const repaired = repairMisplacedClinicalData(targetedClean(item));
  if (repaired.diagnosis?.answerFeedback) {
    repaired.diagnosis.answerFeedback.evidenceChain = repairEvidenceChainItems(repaired.diagnosis.answerFeedback.evidenceChain || [], repaired, 5);
  }
  const after = JSON.stringify(repaired);
  return { item: repaired, changed: before !== after };
}

function writeCasesFile(repairedCases) {
  const content = `export const cases = ${JSON.stringify(repairedCases, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
  writeFileSync('src/data/cases.js', content);
}

function writeSeedFile(path, exportName, items) {
  writeFileSync(path, `export const ${exportName} = ${JSON.stringify(items, null, 2)};\n`);
}

const caseResults = cases.map(repairCaseLike);
const seedResults = AI_QUESTION_SEEDS.map(repairCaseLike);
const branchResults = AI_BRANCH_TEMPLATE_SEEDS.map(repairCaseLike);
const syntheticResults = AI_SYNTHETIC_FALLBACK_SEEDS.map(repairCaseLike);

writeCasesFile(caseResults.map((result) => result.item));
writeSeedFile('src/data/aiQuestionSeeds.js', 'AI_QUESTION_SEEDS', seedResults.map((result) => result.item));
writeSeedFile('src/data/aiBranchQuestionTemplates.js', 'AI_BRANCH_TEMPLATE_SEEDS', branchResults.map((result) => result.item));
writeSeedFile('src/data/aiSyntheticFallbackTemplates.js', 'AI_SYNTHETIC_FALLBACK_SEEDS', syntheticResults.map((result) => result.item));

const allRepairedCases = caseResults.map((result) => result.item);
const validationIssues = allRepairedCases.flatMap((item) => {
  const validation = validateClinicalFieldPlacement(item);
  return validation.errors.map((error) => ({ id: item.id, error }));
});

const report = {
  generatedAt: new Date().toISOString(),
  embeddedCasesChecked: cases.length,
  embeddedCasesChanged: caseResults.filter((result) => result.changed).length,
  aiSeedItemsChecked: AI_QUESTION_SEEDS.length + AI_BRANCH_TEMPLATE_SEEDS.length + AI_SYNTHETIC_FALLBACK_SEEDS.length,
  aiSeedItemsChanged: [...seedResults, ...branchResults, ...syntheticResults].filter((result) => result.changed).length,
  validationErrorCount: validationIssues.length,
  validationIssues: validationIssues.slice(0, 100),
  addedRepairRules: [
    'chiefComplaint alanında laboratuvar/görüntüleme/muayene verisi yakalama',
    'exam alanında laboratuvar/görüntüleme verisini ayıklama',
    'evidenceChain başlığını metne göre Başvuru/Fizik muayene/Laboratuvar/Görüntüleme olarak yeniden sınıflandırma',
    'patientIntro.distinctiveClues içindeki inline etiketleri kaldırma',
    'riskContext içindeki objektif tetkik ve muayene verilerini dışlama',
    'Lökosit 16 gibi eksik laboratuvar ifadelerini birimli formata çevirme',
    'tekrarlı/aynı veri içeren ipuçlarını dedupe etme',
    'AI payload validasyonunda alan karışması varsa kullanıcıya göstermeden reddetme veya repair etme',
  ],
};
writeFileSync('CLINICAL_FIELD_PLACEMENT_REPAIR_REPORT.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
