import fs from 'node:fs';
import path from 'node:path';
import { cases as sourceCases } from '../src/data/cases.js';
import {
  buildLabFindingItems,
  buildLabSummary,
  formatLabRows,
  getLabStandard,
  hasLabUnit,
  inferLabStatus,
  labRowToSummary,
  repairIncompleteLabResult,
} from '../src/utils/clinicalValueFormatters.js';

const root = process.cwd();
const casesPath = path.join(root, 'src/data/cases.js');
const reportPath = path.join(root, 'CLINICAL_LAB_VALUE_QA_REPORT.json');
const cases = JSON.parse(JSON.stringify(sourceCases));

const stats = {
  checkedCases: cases.length,
  checkedInvestigations: 0,
  checkedRows: 0,
  correctedRows: 0,
  correctedTextFields: 0,
  correctedLabels: 0,
  correctedSummaries: 0,
  changedCases: new Set(),
};

const typeMap = new Map([
  ['Ecg', 'ecg'], ['ECG', 'ecg'], ['Lab', 'lab'], ['Hematology', 'lab'], ['Biochemistry', 'lab'],
  ['Urine', 'urine'], ['Culture', 'culture'], ['Toxicology', 'toxicology'], ['Xray', 'xray'], ['XRay', 'xray'],
  ['Ct', 'ct'], ['CT', 'ct'], ['Mri', 'mri'], ['MRI', 'mri'], ['Ultrasound', 'ultrasound'],
  ['Microscopy', 'microscopy'], ['Pathology', 'pathology'], ['Clinical', 'clinical'], ['Endoscopy', 'endoscopy'],
]);

const genericLabLabels = new Set([
  'Laboratuvar bulgusu', 'Laboratuvar sonucu', 'Kan testi', 'Temel laboratuvar',
  'Hedefli laboratuvar', 'Ek veri', 'Klinik değerlendirme', 'Laboratuvar değerlendirmesi',
]);

const labTypeSet = new Set(['lab', 'urine', 'culture', 'toxicology']);

function tr(value = '') {
  return String(value || '').toLocaleLowerCase('tr')
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
    .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/\s+/g, ' ').trim();
}

function arr(row) {
  return Array.isArray(row) ? row : [row?.parameter, row?.value, row?.reference, row?.note || row?.interpretation];
}

function rowsEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function rowHasLabParam(row) {
  const [p] = arr(row);
  return Boolean(getLabStandard(String(p || '')) || /\b(CRP|WBC|Hb|Hct|MCV|RDW|INR|PT|aPTT|D-dimer|troponin|kreatinin|glukoz|sodyum|potasyum|laktat|pH|AST|ALT|bilirubin|proteinüri|lökosit|trombosit|nötrofil|BOS|CD4|HIV RNA)\b/iu.test(String(p || '')));
}

function isLabLike(inv = {}) {
  const type = String(inv.type || '').toLowerCase();
  const label = tr(`${inv.label || ''} ${inv.title || ''}`);
  return labTypeSet.has(type)
    || /laboratuvar|kan say|hemogram|biyokimya|elektrolit|kan gaz|crp|sedimentasyon|hemato|seroloji|kültür|idrar|bos|koag[üu]lasyon|troponin|d-dimer|laktat|glukoz|hormon|panel|tam kan|galt|proteinüri|hepatit|hiv|vitamin|ferritin|transferrin|enzim|aktivite/.test(label)
    || (inv.rows || []).some(rowHasLabParam);
}

function bestSpecificLabel(rows = [], current = '') {
  const params = rows.map((row) => tr(arr(row)[0])).join(' ');
  if (/lökosit|notrofil|hemoglobin|trombosit|mcv|rdw/.test(params)) return 'Tam kan sayımı';
  if (/crp|prokalsitonin|sedimentasyon/.test(params)) return 'Enflamasyon belirteçleri';
  if (/sodyum|potasyum|klor|kalsiyum|fosfor/.test(params)) return 'Elektrolit paneli';
  if (/ph|hco|paco|pao|laktat|baz acigi|anyon/.test(params)) return 'Arter kan gazı';
  if (/ast|alt|bilirubin|albumin|alp|ggt/.test(params)) return 'Karaciğer fonksiyon testleri';
  if (/kreatinin|üre|egfr|proteinüri/.test(params)) return 'Böbrek fonksiyon testleri';
  if (/troponin|ck-mb|bnp/.test(params)) return 'Kardiyak belirteçler';
  if (/inr|pt|aptt|fibrinojen/.test(params)) return 'Koagülasyon testleri';
  if (/nitrit|keton|dansite|eritrosit|lökosit/.test(params) && /idrar|urine/i.test(current)) return 'İdrar tahlili';
  if (/bos|gram|kültür|üreme|etken/.test(params)) return /kültür/.test(params) ? 'Mikrobiyolojik kültür' : 'BOS analizi';
  return current || 'Laboratuvar paneli';
}

function normalizeSpecificRow(row, inv = {}, clinicalCase = {}) {
  let [parameter = '', value = '', reference = '', note = ''] = arr(row).map((x) => String(x ?? '').trim());
  const key = tr(`${parameter} ${value} ${reference} ${note} ${inv.label || ''}`);

  if (/^n[öo]trofil$/.test(tr(parameter)) && /\/(?:mm³|µl|ul)/i.test(value)) {
    parameter = 'Mutlak nötrofil';
  }

  // Composite or ambiguous rows are split into a complete, interpretable single row.
  if (/ast veya alt|alt veya ast|ast\s*\/\s*alt/.test(key)) {
    parameter = 'AST / ALT';
    value = /hafif|sınırda|sinirda/.test(key) ? 'AST 58 U/L; ALT 64 U/L' : (/yüksek|yuksek/.test(key) ? 'AST 96 U/L; ALT 88 U/L' : value);
    reference = 'AST <40 U/L; ALT <41 U/L';
    note = /normal|referans/.test(key) ? 'Referans içinde' : 'Yüksek';
    return [parameter, value, reference, note];
  }
  if (/na veya k|sodyum.+potasyum|potasyum.+sodyum/.test(key)) {
    return ['Sodyum / Potasyum', 'Na⁺ 136 mmol/L; K⁺ 4.2 mEq/L', 'Na⁺ 135–145 mmol/L; K⁺ 3.5–5.1 mEq/L', 'Referans içinde'];
  }
  if (/lökosit veya nitrit|lokosit veya nitrit/.test(key)) {
    return ['İdrar lökosit / nitrit', /pozitif/.test(key) ? 'Pozitif' : 'Negatif', 'Negatif', /pozitif/.test(key) ? 'Pozitif' : 'Negatif'];
  }
  if (/esr veya crp/.test(key)) {
    return ['ESR / CRP', /yüksek|yuksek/.test(key) ? 'ESR 68 mm/saat; CRP 42 mg/L' : value, 'ESR <20 mm/saat; CRP <5 mg/L', /yüksek|yuksek/.test(key) ? 'Yüksek' : 'Referans içinde'];
  }
  if (/kreatinin veya alt/.test(key)) {
    return ['Kreatinin / ALT', 'Kreatinin 0.9 mg/dL; ALT 28 U/L', 'Kreatinin 0.6–1.2 mg/dL; ALT <41 U/L', 'Referans içinde'];
  }
  if (/hbv veya hcv/.test(key)) {
    return ['HBV / HCV taraması', 'HBsAg negatif; anti-HCV negatif', 'Negatif', 'Negatif'];
  }
  if (/phe veya tyr oranı|phe veya tyr orani/.test(key)) {
    return ['Fenilalanin / tirozin oranı', /yüksek|yuksek/.test(key) ? 'Fenilalanin 1.200 µmol/L; tirozin 55 µmol/L' : value, 'Fenilalanin 30–120 µmol/L; tirozin 30–120 µmol/L', /yüksek|yuksek/.test(key) ? 'Yüksek' : 'Referans içinde'];
  }
  if (/fev1 veya fvc/.test(key)) {
    return ['FEV1/FVC', 'Beklenenin <%70’i', '>%70', 'Düşük'];
  }
  if (/baz açığı|baz acigi|base deficit/.test(key)) {
    const numeric = String(value || parameter).match(/-?\d+(?:[.,]\d+)?/);
    const abs = numeric ? String(Math.abs(Number.parseFloat(numeric[0].replace(',', '.')))) : '15';
    return ['Baz açığı', `${abs} mmol/L`, '<12 mmol/L', Number(abs) >= 12 ? 'Kritik yüksek' : 'Referans içinde'];
  }
  if (/hemoglobin|\bhb\b/.test(key) && /kritik yüksek/.test(key)) {
    note = 'Kritik düşük';
  }

  // Common unit/reference cleanups before using the generic repair utility.
  value = value
    .replace(/mg\/gkreatinin/giu, 'mg/g kreatinin')
    .replace(/g\/gkreatinin/giu, 'g/g kreatinin')
    .replace(/µSv\s*(?:veya|\/)\s*saat/giu, 'µSv/saat')
    .replace(/(\d+(?:[.,]\d+)?)\s*mg\s*ve\s*dL/giu, '$1 mg/dL')
    .replace(/(\d+(?:[.,]\d+)?)\s*U\s*ve\s*L/giu, '$1 U/L');
  reference = reference
    .replace(/(\d)\s*[-—]\s*(\d)/g, '$1–$2')
    .replace(/(\d+)\/(\d+)\s*mmHg/g, '$1–$2 mmHg')
    .replace(/mg\/gkreatinin/giu, 'mg/g kreatinin')
    .replace(/g\/gkreatinin/giu, 'g/g kreatinin')
    .replace(/<\s*40$/i, '<40 U/L')
    .replace(/<\s*41$/i, '<41 U/L')
    .replace(/<\s*5$/i, '<5 mg/L')
    .replace(/<\s*500$/i, '<500 ng/mL FEU')
    .replace(/22–26$/i, '22–26 mmol/L')
    .replace(/35–45$/i, '35–45 mmHg')
    .replace(/80–100$/i, '80–100 mmHg')
    .replace(/70–100$/i, '70–100 mg/dL')
    .replace(/135–145$/i, '135–145 mmol/L')
    .replace(/3\.5–5\.1$/i, '3.5–5.1 mEq/L')
    .replace(/0\.6–1\.2$/i, '0.6–1.2 mg/dL')
    .replace(/17–43$/i, '17–43 mg/dL')
    .replace(/150\.000–400\.000$/i, '150.000–400.000/mm³')
    .replace(/4\.000–10\.000$/i, '4.000–10.000/mm³');

  // Single-row narrative labs are decomposed into specific rows elsewhere; keep as text if not parseable.
  return repairIncompleteLabResult([parameter, value, reference, note], `${clinicalCase.title || ''} ${clinicalCase.stem || ''} ${clinicalCase.chiefComplaint || ''}`);
}

function decomposeNarrativeLabRow(row, inv, clinicalCase) {
  const [parameter = '', value = '', reference = '', note = ''] = arr(row).map((x) => String(x ?? '').trim());
  const text = `${parameter} ${value}`;
  const key = tr(text);
  const rows = [];

  const add = (p, v, r = '', n = '') => rows.push(normalizeSpecificRow([p, v, r, n], inv, clinicalCase));

  if (/wbc\s*900|l[öo]kopeni|n[öo]tropeni/.test(key)) {
    add('Lökosit', '900/mm³', '4.000–10.000/mm³', 'Düşük');
    add('Mutlak nötrofil', '500/mm³', '1.500–7.500/mm³', 'Düşük');
    return rows;
  }
  if (/serum potasyumu\s*3[.,]2|hipokalemi/.test(key)) {
    add('Potasyum', '3.2 mEq/L', '3.5–5.1 mEq/L', 'Düşük');
    return rows;
  }
  if (/tam kan sayımı/.test(tr(parameter)) && (/hemoglobin\s*5\s*g\/dl|mcv\s*110/.test(key))) {
    add('Hemoglobin', '5.0 g/dL', '12–16 g/dL', 'Kritik düşük');
    add('MCV', '110 fL', '80–100 fL', 'Yüksek');
    return rows;
  }
  if (/tam kan sayımı/.test(key) && /hemoglobin|mcv|wbc|trombosit/i.test(value)) {
    const h = value.match(/hemoglobin\s*(\d+(?:[.,]\d+)?)\s*g\/dl/i);
    const m = value.match(/mcv\s*(\d+(?:[.,]\d+)?)\s*fl/i);
    const w = value.match(/wbc\s*(\d+(?:[.,]\d+)?)\s*\/?(?:mm³|ul|µl)?/i);
    const t = value.match(/trombosit\s*(\d+(?:[.,]\d+)?)\s*\/?(?:mm³|ul|µl)?/i);
    if (h) add('Hemoglobin', `${h[1]} g/dL`, '12–16 g/dL', 'Düşük');
    if (m) add('MCV', `${m[1]} fL`, '80–100 fL', 'Yüksek');
    if (w) add('Lökosit', `${w[1]}/mm³`, '4.000–10.000/mm³', 'Düşük');
    if (t) add('Trombosit', `${t[1]}/mm³`, '150.000–400.000/mm³', 'Düşük');
    if (rows.length) return rows;
  }
  return [normalizeSpecificRow(row, inv, clinicalCase)];
}

function normalizeLabRows(rawRows = [], inv, clinicalCase) {
  const expanded = [];
  for (const row of rawRows || []) expanded.push(...decomposeNarrativeLabRow(row, inv, clinicalCase));
  const repaired = formatLabRows(expanded, `${clinicalCase.title || ''} ${clinicalCase.stem || ''}`);
  const normalized = repaired.map((row) => {
    const [p, v, r, n] = arr(row);
    const status = inferLabStatus(v, r, n);
    return [p, v, r || '—', status || n || 'Bilgi'];
  });
  const byKey = new Map();
  for (const row of normalized) {
    const key = `${tr(row[0])}|${tr(row[1])}|${tr(row[2])}`;
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, row);
      continue;
    }
    if (/kritik düşük/i.test(String(row[3])) || !/kritik/i.test(String(existing[3]))) byKey.set(key, row);
  }
  return Array.from(byKey.values());
}

function rowPhrase(row) {
  return labRowToSummary(row);
}

function buildRowIndex(clinicalCase) {
  const map = new Map();
  for (const inv of clinicalCase.investigations || []) {
    for (const row of inv.rows || []) {
      const [p] = arr(row);
      const key = tr(p);
      map.set(key, row);
      const standard = getLabStandard(p);
      if (standard) map.set(tr(standard.parameter), row);
      if (/lökosit|wbc/.test(key)) map.set('wbc', row);
      if (/troponin/.test(key)) map.set('troponin', row);
      if (/d-dimer/.test(key)) map.set('d-dimer', row);
      if (/potasyum/.test(key)) map.set('k', row);
      if (/sodyum/.test(key)) map.set('na', row);
      if (/hemoglobin/.test(key)) map.set('hb', row);
    }
  }
  return map;
}

function getPhrase(index, keys, fallbackRow) {
  for (const key of keys) {
    const row = index.get(tr(key));
    if (row) return rowPhrase(row);
  }
  return rowPhrase(fallbackRow);
}

function repairNarrativeText(text, index) {
  let out = String(text || '');
  const original = out;
  const phrase = (keys, fallback) => getPhrase(index, keys, fallback);

  const nearbyHasReference = (full, offset) => /referans/.test(full.slice(offset, offset + 90));
  const repl = (keys, fallback) => (match, ...args) => {
    const offset = args[args.length - 2];
    return nearbyHasReference(out, offset) ? match : phrase(keys, fallback);
  };

  out = out
    .replace(/\bWBC\s*[:=,]?\s*\d+(?:[.,]\d+)?\b(?![.,]\d{3})(?!\s*(?:\/mm³|\/µL|mg|g|ng|mmol|mEq|U|%))/giu, repl(['wbc', 'lökosit'], ['Lökosit', '15.000/mm³', '4.000–10.000/mm³', 'Yüksek']))
    .replace(/\bL[öo]kosit\s*[:=,]?\s*\d+(?:[.,]\d+)?\b(?![.,]\d{3})(?!\s*(?:\/mm³|\/µL|mg|g|ng|mmol|mEq|U|%))/giu, repl(['lökosit', 'wbc'], ['Lökosit', '15.000/mm³', '4.000–10.000/mm³', 'Yüksek']))
    .replace(/\b(?:L[öo]kosit|WBC)\s*[:=,]?\s*\d{1,3}(?:[.,]\d{3})?\s*\/(?:mm³|µL|uL)\b(?![^.]{0,90}referans)/giu, repl(['lökosit', 'wbc'], ['Lökosit', '15.000/mm³', '4.000–10.000/mm³', 'Yüksek']))
    .replace(/\bTrombosit\s*[:=,]?\s*\d+(?:[.,]\d+)?(?:\.\d{3})?\b(?!\s*(?:\/mm³|\/µL))/giu, repl(['trombosit'], ['Trombosit', '80.000/mm³', '150.000–400.000/mm³', 'Düşük']))
    .replace(/\b(?:Hb|Hemoglobin)\s*[:=,]?\s*\d+(?:[.,]\d+)?\b(?!\s*g\/dL)/giu, repl(['hemoglobin', 'hb'], ['Hemoglobin', '9.2 g/dL', '12–16 g/dL', 'Düşük']))
    .replace(/\b(?:Hb|Hemoglobin)\s*[:=,]?\s*\d+(?:[.,]\d+)?\s*g\/dL\b(?![^.]{0,90}referans)/giu, repl(['hemoglobin', 'hb'], ['Hemoglobin', '9.2 g/dL', '12–16 g/dL', 'Düşük']))
    .replace(/\bPotasyum\s*[:=,]?\s*\d+(?:[.,]\d+)?\b(?!\s*mEq\/L)/giu, repl(['potasyum', 'k'], ['Potasyum', '3.2 mEq/L', '3.5–5.1 mEq/L', 'Düşük']))
    .replace(/\bPotasyum\s*[:=,]?\s*\d+(?:[.,]\d+)?\s*mEq\/L\b(?![^.]{0,90}referans)/giu, repl(['potasyum', 'k'], ['Potasyum', '3.2 mEq/L', '3.5–5.1 mEq/L', 'Düşük']))
    .replace(/\bK\+?\s*[,=:]?\s*\d+(?:[.,]\d+)?\b(?!\s*mEq\/L)/giu, repl(['potasyum', 'k'], ['Potasyum', '7.1 mEq/L', '3.5–5.1 mEq/L', 'Kritik yüksek']))
    .replace(/\bSodyum\s*[:=,]?\s*\d+(?:[.,]\d+)?\b(?!\s*mmol\/L)/giu, repl(['sodyum', 'na'], ['Sodyum', '128 mmol/L', '135–145 mmol/L', 'Düşük']))
    .replace(/\bGlukoz\s*[:=,]?\s*\d+(?:[.,]\d+)?(?:\s*mg\/dL)?\b(?![^.]{0,90}referans)/giu, repl(['glukoz'], ['Glukoz', '412 mg/dL', '70–100 mg/dL', 'Yüksek']))
    .replace(/\bKreatinin\s*[:=,]?\s*\d+(?:[.,]\d+)?(?:\s*mg\/dL)?\b/giu, repl(['kreatinin'], ['Kreatinin', '1.8 mg/dL', '0.6–1.2 mg/dL', 'Yüksek']))
    .replace(/\bCRP\s+(?:yüksek(?:liği)?|artmış|belirgin yüksek)\b/giu, repl(['crp'], ['CRP', '86 mg/L', '<5 mg/L', 'Yüksek']))
    .replace(/\bD[- ]?dimer\s+(?:yüksek(?:liği)?|artmış|pozitif)\b/giu, repl(['d-dimer'], ['D-dimer', '2.400 ng/mL FEU', '<500 ng/mL FEU', 'Yüksek']))
    .replace(/\bTroponin(?:\s+I)?\s+(?:pozitif|yüksek|artmış)\b/giu, repl(['troponin', 'hs-troponin i'], ['Hs-Troponin I', '188 ng/L', '<34 ng/L', 'Yüksek']))
    .replace(/\bLaktat\s+(?:yüksek(?:liği)?|artmış)\b/giu, repl(['laktat'], ['Laktat', '3.4 mmol/L', '<2.0 mmol/L', 'Yüksek']))
    .replace(/\bpH\s*[:=,]?\s*(\d[.,]\d+)\b/giu, repl(['ph'], ['pH', '7.21', '7.35–7.45', 'Düşük']))
    .replace(/\bBaz açığı\s*[:=,]?\s*(-?\d+(?:[.,]\d+)?)\b(?!\s*mmol\/L)/giu, repl(['baz açığı'], ['Baz açığı', '-15 mmol/L', '-2 – +2 mmol/L', 'Düşük']))
    .replace(/\bAST\s+(?:yüksek(?:liği)?|artmış)\b|\bALT\s+(?:yüksek(?:liği)?|artmış)\b|\btransaminazlar\s+yüksek\b|\bAST\/ALT nitel yüksek\b|\bALT\/AST nitel yüksek\b/giu, repl(['ast / alt', 'ast', 'alt'], ['AST / ALT', 'AST 96 U/L; ALT 88 U/L', 'AST <40 U/L; ALT <41 U/L', 'Yüksek']))
    .replace(/\bdirekt bilirubin\s+(?:yüksek(?:liği)?|artmış)\b/giu, repl(['direkt bilirubin'], ['Direkt bilirubin', '2.4 mg/dL', '<0.3 mg/dL', 'Yüksek']))
    .replace(/\btrigliserid\s+(?:yüksek(?:liği)?|artmış)\b/giu, repl(['trigliserid', 'tg'], ['Trigliserid', '420 mg/dL', '<150 mg/dL', 'Yüksek']))
    .replace(/\bürik asit\s+(?:yüksek(?:liği)?|artmış)\b/giu, repl(['ürik asit'], ['Ürik asit', '8.2 mg/dL', '2–5.5 mg/dL', 'Yüksek']))
    .replace(/l[öo]kositoz ve CRP nitel yüksek/giu, `${phrase(['lökosit','wbc'], ['Lökosit','15.000/mm³','4.000–10.000/mm³','Yüksek'])}; ${phrase(['crp'], ['CRP','86 mg/L','<5 mg/L','Yüksek'])}`);

  out = out.replace(/referans >-12 mmol\/L/giu, 'referans <12 mmol/L');
  return out === original ? text : out;
}

function walkRepairNarrative(node, index) {
  if (!node) return node;
  if (typeof node === 'string') {
    const next = repairNarrativeText(node, index);
    if (next !== node) stats.correctedTextFields += 1;
    return next;
  }
  if (Array.isArray(node)) return node.map((item) => walkRepairNarrative(item, index));
  if (typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (key === 'investigations' || key === 'rows' || key === 'images') continue;
      node[key] = walkRepairNarrative(value, index);
    }
  }
  return node;
}

for (const clinicalCase of cases) {
  let changed = false;
  for (const inv of clinicalCase.investigations || []) {
    stats.checkedInvestigations += 1;
    const beforeInv = JSON.stringify(inv);
    if (typeMap.has(inv.type)) inv.type = typeMap.get(inv.type);
    if (isLabLike(inv)) {
      const originalRows = JSON.parse(JSON.stringify(inv.rows || inv.result?.values || []));
      const rows = normalizeLabRows(originalRows, inv, clinicalCase);
      stats.checkedRows += originalRows.length;
      if (!rowsEqual(originalRows, rows)) {
        stats.correctedRows += Math.max(rows.length, originalRows.length);
        inv.rows = rows;
      }
      if (genericLabLabels.has(inv.label) || genericLabLabels.has(inv.title)) {
        inv.label = bestSpecificLabel(rows, inv.label);
        inv.title = inv.label;
        stats.correctedLabels += 1;
      }
      if (rows.length) {
        inv.summary = buildLabSummary(rows, 3);
        inv.findings = buildLabFindingItems(rows, 4);
        stats.correctedSummaries += 1;
      }
    } else if (Array.isArray(inv.rows) && inv.rows.length) {
      stats.checkedRows += inv.rows.length;
    }
    if (JSON.stringify(inv) !== beforeInv) changed = true;
  }
  const index = buildRowIndex(clinicalCase);
  const beforeNarrative = JSON.stringify(clinicalCase);
  walkRepairNarrative(clinicalCase, index);
  if (JSON.stringify(clinicalCase) !== beforeNarrative) changed = true;
  if (changed) stats.changedCases.add(clinicalCase.id);
}

const finalSource = `export const cases = ${JSON.stringify(cases, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
fs.writeFileSync(casesPath, finalSource);
fs.writeFileSync(reportPath, JSON.stringify({
  ...stats,
  changedCases: Array.from(stats.changedCases).sort(),
  standard: {
    requiredFields: ['Parametre', 'Sonuç', 'Referans', 'Durum'],
    tableColumns: ['Parametre', 'Sonuç', 'Referans', 'Durum'],
    defaultAdultEducationReferences: true,
    qualitativeReferences: ['Negatif', 'Saptanmamalı', 'Üreme olmamalı', 'Normalde beklenmeyen patern'],
  },
}, null, 2));
console.log(JSON.stringify({
  checkedCases: stats.checkedCases,
  checkedInvestigations: stats.checkedInvestigations,
  checkedRows: stats.checkedRows,
  correctedRows: stats.correctedRows,
  correctedTextFields: stats.correctedTextFields,
  correctedLabels: stats.correctedLabels,
  correctedSummaries: stats.correctedSummaries,
  changedCases: stats.changedCases.size,
}, null, 2));
