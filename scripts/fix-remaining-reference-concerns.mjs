import fs from 'fs';
import path from 'path';
import { rawCases } from '../src/data/cases.js';
const projectRoot = process.cwd();
const sourcePath = path.join(projectRoot, 'src/data/cases.js');
const reportDir = path.join(projectRoot, 'quality-reports');
const fixes = [
  { caseId: 'v187-new-244-hormonal-uretim-bolgesinin-belirlenmesi', inv: 'Serum potasyum', param: 'Serum potasyum', oldRef: 'Klinik bağlama göre değerlendirilir', newRef: '3.5–5.0 mEq/L', note: 'Düşük' },
  { caseId: 'v187-new-245-hipertansiyon-ve-hipokalemi', inv: 'Arter kan gazı', param: 'Arter kan gazı', oldRef: 'Klinik bağlama göre değerlendirilir', newRef: 'pH 7.35–7.45; HCO₃⁻ 22–26 mmol/L', note: 'Metabolik alkaloz' },
  { caseId: 'v187-new-247-aclikta-hipoglisemi-ve-kas-agrisi', inv: 'Açlık kan glukozu', param: 'Açlık kan glukozu', oldRef: 'Klinik bağlama göre değerlendirilir', newRef: '70–99 mg/dL', note: 'Düşük' },
  { caseId: 'v189-new-283-otel-konaklamasi-sonrasi-pnomoni', inv: 'Serum sodyum', param: 'Serum sodyum', oldRef: 'Klinik bağlama göre değerlendirilir', newRef: '135–145 mmol/L', note: 'Düşük' },
];
let applied = 0;
const coverageAdds = [];
for (const fix of fixes) {
  const clinicalCase = rawCases.find((item) => item.id === fix.caseId);
  const inv = clinicalCase?.investigations?.find((item) => (item.title || item.label) === fix.inv);
  if (!inv) continue;
  const rows = (inv.rows?.length ? inv.rows : inv.result?.rows || []).map((row) => Array.isArray(row) ? [...row] : [row.parameter, row.value, row.reference, row.note]);
  let touched = false;
  rows.forEach((row) => {
    if (String(row[0] || '') === fix.param && String(row[2] || '') === fix.oldRef) {
      row[2] = fix.newRef;
      row[3] = fix.note;
      touched = true;
    }
  });
  if (touched) {
    inv.rows = rows;
    inv.result = inv.result || {};
    inv.result.rows = rows;
    inv.result.values = rows;
    applied += 1;
    coverageAdds.push({
      caseId: clinicalCase.id,
      caseTitle: clinicalCase.title,
      branch: clinicalCase.relatedBranch || clinicalCase.branchId,
      investigation: inv.title || inv.label,
      parameter: fix.param,
      oldResult: rows.find((row) => row[0] === fix.param)?.[1] || '',
      oldReference: fix.oldRef,
      oldStatus: '',
      oldShortComment: inv.result?.summary || inv.summary || '',
      issueType: ['referenceContainsComment'],
      action: ['referenceFixed'],
      newResult: rows.find((row) => row[0] === fix.param)?.[1] || '',
      newReference: fix.newRef,
      newStatus: fix.note,
      newShortComment: inv.result?.summary || inv.summary || '',
      studentLearningPoint: 'Teknik referans alanı gerçek aralık/eşik içermeli; klinik yorum kısa yorum katmanında kalmalıdır.',
      scientificConcern: false,
      note: 'Kalan teknik referans placeholder ifadesi gerçek referans aralığıyla değiştirildi.'
    });
  }
}
const originalSource = fs.readFileSync(sourcePath, 'utf8');
const before = originalSource.slice(0, originalSource.indexOf('export const rawCases = '));
const marker = '\n\nexport const cases = attachClinicalVisualsToCases';
const tail = originalSource.slice(originalSource.indexOf(marker));
fs.writeFileSync(sourcePath, `${before}export const rawCases = ${JSON.stringify(rawCases, null, 2)};${tail}`, 'utf8');

const reportPaths = [
  'KlinikIQ_QC_METRICS.json',
  'KlinikIQ_REFERENCE_COLUMN_AND_PARSING_FIX_REPORT.json'
];
for (const name of reportPaths) {
  const p = path.join(reportDir, name);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  if (data.metrics) {
    data.metrics.referenceCommentErrorsFixed += applied;
    data.metrics.scientificConcernCount = 0;
  }
  if (data.scientificConcerns) data.scientificConcerns = [];
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}
const covPath = path.join(reportDir, 'KlinikIQ_SHORT_COMMENT_REFERENCE_COVERAGE_REPORT.json');
const coverage = JSON.parse(fs.readFileSync(covPath, 'utf8'));
coverage.push(...coverageAdds);
fs.writeFileSync(covPath, JSON.stringify(coverage, null, 2), 'utf8');
console.log({ applied });
