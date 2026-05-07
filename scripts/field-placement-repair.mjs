import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cases } from '../src/data/cases.js';
import { repairMisplacedClinicalData, validateClinicalFieldPlacement } from '../src/utils/clinicalFieldPlacement.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

let repairedCount = 0;
let changedClues = 0;
let fixedEvidence = 0;
let movedExamFindings = 0;
const beforeById = new Map(cases.map((item) => [item.id, JSON.stringify(item)]));

const repairedCases = cases.map((item) => {
  const beforeExam = Array.isArray(item.exam) ? item.exam.length : 0;
  const beforeClues = JSON.stringify(item.patientIntro?.distinctiveClues || []);
  const beforeEvidence = JSON.stringify(item.diagnosis?.answerFeedback?.evidenceChain || []);
  const repaired = repairMisplacedClinicalData(item);
  if (JSON.stringify(repaired) !== beforeById.get(item.id)) repairedCount += 1;
  if (JSON.stringify(repaired.patientIntro?.distinctiveClues || []) !== beforeClues) changedClues += 1;
  if (JSON.stringify(repaired.diagnosis?.answerFeedback?.evidenceChain || []) !== beforeEvidence) fixedEvidence += 1;
  const afterExam = Array.isArray(repaired.exam) ? repaired.exam.length : 0;
  if (afterExam < beforeExam) movedExamFindings += beforeExam - afterExam;
  return repaired;
});

const validation = repairedCases.map((item) => ({ id: item.id, ...validateClinicalFieldPlacement(item) }));
const errors = validation.flatMap((item) => item.errors.map((error) => ({ id: item.id, error })));
const warnings = validation.flatMap((item) => item.warnings.map((warning) => ({ id: item.id, warning })));

fs.writeFileSync(path.join(root, 'src/data/cases.js'), `export const cases = ${JSON.stringify(repairedCases, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(root, 'FIELD_PLACEMENT_REPAIR_REPORT.json'), JSON.stringify({
  checkedCases: repairedCases.length,
  repairedCount,
  changedClueBlocks: changedClues,
  fixedEvidenceBlocks: fixedEvidence,
  movedExamFindings,
  validationErrors: errors.length,
  validationWarnings: warnings.length,
  errors: errors.slice(0, 50),
  warnings: warnings.slice(0, 50),
}, null, 2), 'utf8');

console.log(JSON.stringify({ checkedCases: repairedCases.length, repairedCount, changedClueBlocks: changedClues, fixedEvidenceBlocks: fixedEvidence, movedExamFindings, validationErrors: errors.length, validationWarnings: warnings.length }, null, 2));
if (errors.length) process.exitCode = 1;
