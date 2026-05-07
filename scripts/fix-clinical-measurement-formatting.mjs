import { writeFileSync } from 'node:fs';
import { cases } from '../src/data/cases.js';
import { sanitizeMeasurementText, sanitizeVitalsObject } from '../src/utils/clinicalFormatters.js';

function fixUrlLikeText(text = '') {
  return String(text || '')
    .replace(/^Https:\s+veya\s+veya\s+/i, 'https://')
    .replace(/^Http:\s+veya\s+veya\s+/i, 'http://')
    .replace(/Commons\.\s*Wikimedia\.\s*Org/gi, 'commons.wikimedia.org')
    .replace(/Wikipedia\.\s*Org/gi, 'wikipedia.org')
    .replace(/\s+veya\s+wiki\s+veya\s+/gi, '/wiki/')
    .replace(/\s+veya\s+Special:\s*FilePath\s+veya\s+/gi, '/wiki/Special:FilePath/')
    .replace(/\s+veya\s+File:\s*/gi, '/wiki/File:')
    .replace(/\.\s*(Png|PNG|Jpg|JPG|Jpeg|JPEG|Svg|SVG)\b/g, '.$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function fixClinicalText(text = '') {
  let value = sanitizeMeasurementText(text);
  value = fixUrlLikeText(value)
    .replace(/\bdP\s+veya\s+dt\b/giu, 'dP/dt')
    .replace(/\bCURB-65([^.]*)≥\s*30\s+veya\s+dk\b/giu, (m) => m.replace(/≥\s*30\s+veya\s+dk/iu, '≥30/dk'))
    .replace(/\bt\(11\.14\)/giu, 't(11;14)')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/(?<!\d)\.(?=\S)/g, '. ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return value;
}

let stringsVisited = 0;
let stringsChanged = 0;
let vitalsObjects = 0;
let vitalsChanged = 0;

function deepFix(value, path = []) {
  if (typeof value === 'string') {
    stringsVisited += 1;
    const fixed = fixClinicalText(value);
    if (fixed !== value) stringsChanged += 1;
    return fixed;
  }
  if (Array.isArray(value)) return value.map((item, index) => deepFix(item, path.concat(index)));
  if (value && typeof value === 'object') {
    const output = {};
    const isVitals = path[path.length - 1] === 'vitals' || path[path.length - 1] === 'vitalSigns';
    if (isVitals) {
      vitalsObjects += 1;
      const before = JSON.stringify(value);
      const fixedVitals = sanitizeVitalsObject(value);
      const after = JSON.stringify(fixedVitals);
      if (before !== after) vitalsChanged += 1;
      Object.entries(fixedVitals).forEach(([key, child]) => {
        output[key] = deepFix(child, path.concat(key));
      });
      return output;
    }
    Object.entries(value).forEach(([key, child]) => {
      output[key] = deepFix(child, path.concat(key));
    });
    return output;
  }
  return value;
}

const fixedCases = deepFix(cases, ['cases']);
const file = `export const cases = ${JSON.stringify(fixedCases, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
writeFileSync('src/data/cases.js', file, 'utf8');
writeFileSync('CLINICAL_MEASUREMENT_FORMATTING_DATA_REPORT.json', JSON.stringify({
  cases: fixedCases.length,
  stringsVisited,
  stringsChanged,
  vitalsObjects,
  vitalsChanged,
}, null, 2));
console.log(JSON.stringify({ cases: fixedCases.length, stringsVisited, stringsChanged, vitalsObjects, vitalsChanged }, null, 2));
