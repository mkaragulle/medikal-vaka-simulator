import fs from 'node:fs';
import { cases } from '../src/data/cases.js';
import { generateAIQuestion } from '../src/utils/aiQuestionGenerator.js';
import { validateAIQuestionCase } from '../src/utils/validateAIQuestion.js';
import { validateClinicalFieldPlacement } from '../src/utils/clinicalFieldClassification.js';

const embeddedFailures = [];
const embeddedWarnings = [];

cases.forEach((caseItem) => {
  const validation = validateClinicalFieldPlacement(caseItem);
  if (!validation.ok) {
    embeddedFailures.push({
      id: caseItem.id,
      title: caseItem.title,
      errors: validation.errors,
    });
  }
  if (validation.warnings.length) {
    embeddedWarnings.push({
      id: caseItem.id,
      title: caseItem.title,
      warnings: validation.warnings,
    });
  }
});

const aiBranchFilters = ['random', 'İç Hastalıkları', 'Çocuk Sağlığı ve Hastalıkları', 'Tıbbi Mikrobiyoloji', 'Tıbbi Farmakoloji'];
const aiSamples = [];
const aiContext = { recentSignatures: [], recentIds: [], recentQuestionSummaries: [] };

aiBranchFilters.forEach((branchFilter) => {
  const question = generateAIQuestion({ branchFilter, context: aiContext });
  const placement = validateClinicalFieldPlacement(question);
  const validation = validateAIQuestionCase(question, [], { context: aiContext, requestedBranch: branchFilter });
  aiSamples.push({
    branchFilter,
    id: question.id,
    chiefComplaint: question.chiefComplaint,
    placementOk: placement.ok,
    validationOk: validation.ok,
    errors: [...placement.errors, ...validation.errors],
  });
});

const report = {
  generatedAt: new Date().toISOString(),
  checkedEmbeddedCaseCount: cases.length,
  embeddedFailures,
  embeddedWarnings,
  aiSampleCount: aiSamples.length,
  aiSamples,
  repairRuleGroups: [
    'inline label removal',
    'chief complaint classifier',
    'history classifier',
    'physical exam classifier',
    'lab result classifier',
    'imaging and EKG classifier',
    'investigation result normalization',
    'misplaced exam-to-exam repair',
    'misplaced lab/imaging-to-investigation repair',
    'distinctive clue cleanup and dedupe',
    'objective measurement unit normalization',
    'AI quality gate field-placement validation',
  ],
  ok: embeddedFailures.length === 0 && aiSamples.every((sample) => sample.placementOk && sample.validationOk),
};

fs.writeFileSync('CLINICAL_FIELD_PLACEMENT_QA_REPORT.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  checkedEmbeddedCaseCount: report.checkedEmbeddedCaseCount,
  embeddedFailures: embeddedFailures.length,
  embeddedWarnings: embeddedWarnings.length,
  aiSampleCount: aiSamples.length,
  aiFailures: aiSamples.filter((sample) => !sample.placementOk || !sample.validationOk).length,
  ok: report.ok,
}, null, 2));

if (!report.ok) process.exitCode = 1;
