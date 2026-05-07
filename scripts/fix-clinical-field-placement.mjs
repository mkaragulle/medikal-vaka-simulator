import fs from 'node:fs';
import { cases } from '../src/data/cases.js';
import {
  classifyClinicalDatum,
  removeInlineFieldLabels,
  repairMisplacedClinicalData,
  validateClinicalFieldPlacement,
} from '../src/utils/clinicalFieldPlacement.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizePlainString(text = '') {
  return removeInlineFieldLabels(String(text || ''))
    .replace(/\s+/g, ' ')
    .replace(/\bsağ\s+ALT\b/giu, 'sağ alt')
    .replace(/\bsol\s+ALT\b/giu, 'sol alt')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/[|]+/g, ' ')
    .trim();
}

function walkStrings(value) {
  if (typeof value === 'string') return normalizePlainString(value);
  if (Array.isArray(value)) return value.map(walkStrings);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, walkStrings(child)]));
  }
  return value;
}

function countStrings(value) {
  let count = 0;
  if (typeof value === 'string') return 1;
  if (Array.isArray(value)) return value.reduce((sum, item) => sum + countStrings(item), 0);
  if (value && typeof value === 'object') return Object.values(value).reduce((sum, item) => sum + countStrings(item), 0);
  return count;
}

function normalizeEvidenceTitles(caseItem) {
  const repaired = clone(caseItem);
  const evidence = repaired.diagnosis?.answerFeedback?.evidenceChain;
  if (Array.isArray(evidence)) {
    evidence.forEach((item, index) => {
      if (!item || typeof item !== 'object') return;
      const text = item.text || item.summary || '';
      const type = classifyClinicalDatum(text);
      const titleByType = {
        chiefComplaint: 'Başvuru yakınması',
        history: 'Öykü',
        physicalExam: 'Fizik muayene',
        lab: 'Laboratuvar',
        imaging: 'Görüntüleme',
        vital: 'Vital bulgu',
      };
      item.title = titleByType[type] || item.title || `Kanıt ${index + 1}`;
    });
  }
  return repaired;
}

const beforeVisibleStrings = countStrings(cases);
let changedCases = 0;
const validationFailures = [];
const repairedCases = cases.map((caseItem) => {
  const before = JSON.stringify(caseItem);
  let item = walkStrings(clone(caseItem));
  item = repairMisplacedClinicalData(item);
  item = normalizeEvidenceTitles(item);
  const validation = validateClinicalFieldPlacement(item);
  if (!validation.ok) validationFailures.push({ id: item.id, errors: validation.errors, warnings: validation.warnings });
  if (JSON.stringify(item) !== before) changedCases += 1;
  return item;
});

const serialized = `export const cases = ${JSON.stringify(repairedCases, null, 2)};\n`;
fs.writeFileSync(new URL('../src/data/cases.js', import.meta.url), serialized);

const report = {
  checkedCases: cases.length,
  changedCases,
  visibleStringsScanned: beforeVisibleStrings,
  validationFailureCount: validationFailures.length,
  validationFailures,
  fieldRules: [
    'Başvuru yakınması yalnızca hasta veya yakınının ifade ettiği semptomlardan oluşur.',
    'Fizik muayene alanında laboratuvar, seroloji, EKG veya görüntüleme sonucu tutulmaz.',
    'Tetkik alanında laboratuvar ve görüntüleme verileri objektif biçimde saklanır.',
    'Ayırt ettirici ipuçları inline başlık etiketi içermez ve en fazla 3-5 seçici ipucuna indirgenir.',
    'Lökosit 16 gibi eksik laboratuvar ifadeleri nötrofil baskın lökositoz veya birimli tetkik verisi olarak normalize edilir.',
  ],
};
fs.writeFileSync(new URL('../CLINICAL_FIELD_PLACEMENT_QA_REPORT.json', import.meta.url), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
