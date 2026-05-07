import { writeFileSync } from 'node:fs';
import { cases } from '../src/data/cases.js';
import { AI_QUESTION_SEEDS } from '../src/data/aiQuestionSeeds.js';
import { AI_BRANCH_TEMPLATE_SEEDS } from '../src/data/aiBranchQuestionTemplates.js';
import { AI_SYNTHETIC_FALLBACK_SEEDS } from '../src/data/aiSyntheticFallbackTemplates.js';
import {
  buildSemanticDistinctiveClues,
  canonicalEvidenceTitle,
  classifyClinicalDatum,
  isChiefComplaint,
  isImagingFinding,
  isInvestigationResult,
  isLabResult,
  isPhysicalExamFinding,
  normalizeClinicalDatumText,
  removeInlineFieldLabels,
  validateClinicalFieldPlacement,
} from '../src/utils/clinicalFieldPlacement.js';
import { normalizeQuestionText } from '../src/utils/aiQuestionHistory.js';

function stripPeriod(text = '') {
  return String(text || '').replace(/[.]$/u, '').trim();
}

function cleanText(text = '', sentence = false) {
  let value = normalizeClinicalDatumText(removeInlineFieldLabels(String(text || ''))).trim();
  if (!value) return '';
  if (!sentence) value = stripPeriod(value);
  return value;
}

function textOf(item) {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return item.text || item.summary || item.explanation || item.description || item.value || item.title || item.label || '';
}

function unique(items = [], max = 5) {
  const seen = new Set();
  const output = [];
  items.map((item) => cleanText(textOf(item))).filter(Boolean).forEach((item) => {
    const key = normalizeQuestionText(item);
    if (!key || seen.has(key)) return;
    seen.add(key);
    output.push(item);
  });
  return output.slice(0, max);
}

function repairEvidence(items = [], itemContext = {}, max = 5) {
  const base = Array.isArray(items) ? items : [];
  const source = base.length ? base : buildSemanticDistinctiveClues(itemContext, max);
  const seen = new Set();
  const out = [];
  source.forEach((entry, index) => {
    const rawText = textOf(entry);
    const text = cleanText(rawText, true);
    if (!text) return;
    const key = normalizeQuestionText(text);
    if (seen.has(key)) return;
    seen.add(key);
    if (typeof entry === 'string') {
      out.push(stripPeriod(text));
    } else {
      out.push({
        ...entry,
        title: canonicalEvidenceTitle(text, entry.title || entry.label || `Kanıt ${index + 1}`),
        text,
      });
    }
  });
  if (out.length < 3) {
    buildSemanticDistinctiveClues(itemContext, max).forEach((text) => {
      const key = normalizeQuestionText(text);
      if (!seen.has(key)) {
        seen.add(key);
        out.push(stripPeriod(text));
      }
    });
  }
  return out.slice(0, max);
}

function repairPatientIntro(item) {
  const intro = item.patientIntro || {};
  const riskContext = unique(intro.riskContext || [], 4)
    .filter((text) => !['lab', 'imaging', 'physicalExam', 'vital'].includes(classifyClinicalDatum(text)));
  const originalClues = unique(intro.distinctiveClues || item.evidenceChain || item.diagnosis?.answerFeedback?.evidenceChain || [], 5);
  const semanticClues = buildSemanticDistinctiveClues({ ...item, patientIntro: { ...intro, distinctiveClues: originalClues } }, 5);
  const clues = unique([...originalClues, ...semanticClues], 4);
  return {
    ...intro,
    presentation: cleanText(intro.presentation || item.chiefComplaint || item.title),
    riskContext: riskContext.length ? riskContext.slice(0, 3) : unique(intro.riskContext || [], 3),
    distinctiveClues: clues.length >= 3 ? clues : semanticClues.slice(0, 4),
    historySummary: cleanText(intro.historySummary || item.stem || '', true),
    priorityFocus: intro.priorityFocus ? cleanText(intro.priorityFocus, true) : intro.priorityFocus,
  };
}

function repairCaseLike(item) {
  const before = JSON.stringify(item);
  const next = structuredClone(item);

  next.chiefComplaint = cleanText(next.chiefComplaint || next.patientIntro?.presentation || '');
  if (next.chiefComplaint && !isChiefComplaint(next.chiefComplaint) && isInvestigationResult(next.chiefComplaint)) {
    const fallback = [next.patientIntro?.presentation, next.stem, next.title].find((value) => value && isChiefComplaint(value));
    next.chiefComplaint = fallback ? cleanText(fallback) : next.chiefComplaint;
  }

  if (Array.isArray(next.exam)) {
    next.exam = next.exam
      .map((finding) => cleanText(finding, true))
      .filter((finding) => finding && !isLabResult(finding) && !isImagingFinding(finding));
  }
  if (next.findings?.exam) {
    next.findings.exam = next.findings.exam
      .map((finding) => cleanText(finding, true))
      .filter((finding) => finding && !isLabResult(finding) && !isImagingFinding(finding));
  }

  if (Array.isArray(next.investigations)) {
    next.investigations = next.investigations.map((investigation) => ({
      ...investigation,
      summary: investigation.summary ? cleanText(investigation.summary, true) : investigation.summary,
      findings: Array.isArray(investigation.findings) ? investigation.findings.map((finding) => cleanText(finding)).filter(Boolean) : investigation.findings,
    }));
  }
  if (Array.isArray(next.findings?.investigations)) {
    next.findings.investigations = next.findings.investigations.map((investigation) => ({
      ...investigation,
      summary: investigation.summary ? cleanText(investigation.summary, true) : investigation.summary,
      findings: Array.isArray(investigation.findings) ? investigation.findings.map((finding) => cleanText(finding)).filter(Boolean) : investigation.findings,
    }));
  }

  next.patientIntro = repairPatientIntro(next);
  if (Array.isArray(next.evidenceChain)) next.evidenceChain = repairEvidence(next.evidenceChain, next, 5);
  if (next.diagnosis?.answerFeedback) {
    next.diagnosis.answerFeedback = {
      ...next.diagnosis.answerFeedback,
      evidenceChain: repairEvidence(next.diagnosis.answerFeedback.evidenceChain || next.evidenceChain || [], next, 5),
    };
  }

  return { item: next, changed: before !== JSON.stringify(next) };
}

function writeCasesFile(repairedCases) {
  writeFileSync('src/data/cases.js', `export const cases = ${JSON.stringify(repairedCases, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`);
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

const validationIssues = caseResults.flatMap((result) => {
  const validation = validateClinicalFieldPlacement(result.item);
  return validation.errors.map((error) => ({ id: result.item.id, error }));
});

const report = {
  generatedAt: new Date().toISOString(),
  embeddedCasesChecked: cases.length,
  embeddedCasesChanged: caseResults.filter((result) => result.changed).length,
  aiSeedItemsChecked: AI_QUESTION_SEEDS.length + AI_BRANCH_TEMPLATE_SEEDS.length + AI_SYNTHETIC_FALLBACK_SEEDS.length,
  aiSeedItemsChanged: [...seedResults, ...branchResults, ...syntheticResults].filter((result) => result.changed).length,
  validationErrorCount: validationIssues.length,
  validationIssues,
  addedRepairRules: [
    'chiefComplaint alanında laboratuvar/görüntüleme/muayene verisi yakalama',
    'exam alanında laboratuvar/görüntüleme verisini ayıklama',
    'evidenceChain başlığını metne göre Başvuru/Fizik muayene/Laboratuvar/Görüntüleme olarak yeniden sınıflandırma',
    'patientIntro.distinctiveClues içindeki inline etiketleri kaldırma',
    'riskContext içindeki objektif tetkik ve muayene verilerini dışlama',
    'Eksik lökosit ifadelerini birimli formata çevirme',
    'tekrarlı/aynı veri içeren ipuçlarını dedupe etme',
    'AI payload validasyonunda alan karışması varsa kullanıcıya göstermeden reddetme veya repair etme',
  ],
};
writeFileSync('CLINICAL_FIELD_PLACEMENT_REPAIR_REPORT.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
