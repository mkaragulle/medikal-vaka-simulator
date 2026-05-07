const UNIT_PATTERN = /(mg\/dL|mg\/L|g\/dL|ng\/mL\s*FEU|ng\/mL|ng\/L|pg\/mL|µg\/dL|µmol\/L|mmol\/L|mEq\/L|U\/L|IU\/L|IU\/mL|copies\/mL|hücre\/µL|cells\/µL|µIU\/mL|mIU\/L|mL\/dk|mL\/min|mmHg|\/mm³|\/mm3|\/µL|\/uL|fL|mg\/g\s*kreatinin|g\/g\s*kreatinin|g\/gün|mg\/gün|mm\/saat|sn|ms|cmH₂O|Gy|µSv\/saat|µV|°|%)/iu;

function tr(value = '') {
  return String(value || '').toLocaleLowerCase('tr')
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
    .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/\s+/g, ' ').trim();
}

export function normalizeLabUnit(unit = '') {
  return String(unit || '').trim()
    .replace(/μ/g, 'µ')
    .replace(/\/mm3/giu, '/mm³')
    .replace(/\/uL/giu, '/µL')
    .replace(/\/µl/giu, '/µL')
    .replace(/mg\/dl/giu, 'mg/dL')
    .replace(/mg\/l/giu, 'mg/L')
    .replace(/g\/dl/giu, 'g/dL')
    .replace(/ng\/ml/giu, 'ng/mL')
    .replace(/ng\/l/giu, 'ng/L')
    .replace(/pg\/ml/giu, 'pg/mL')
    .replace(/µg\/dl/giu, 'µg/dL')
    .replace(/umol\/l|µmol\/l/giu, 'µmol/L')
    .replace(/µmol\s*(?:veya|\/)\s*l/giu, 'µmol/L')
    .replace(/iu\/ml/giu, 'IU/mL')
    .replace(/copies\/ml/giu, 'copies/mL')
    .replace(/cells\/ul|hücre\/ul/giu, 'hücre/µL')
    .replace(/fl/giu, 'fL')
    .replace(/mmol\/l/giu, 'mmol/L')
    .replace(/meq\/l/giu, 'mEq/L')
    .replace(/u\/l/giu, 'U/L')
    .replace(/iu\/l/giu, 'IU/L')
    .replace(/mmhg/giu, 'mmHg')
    .replace(/g\/gkreatinin/giu, 'g/g kreatinin')
    .replace(/mg\/gkreatinin/giu, 'mg/g kreatinin')
    .replace(/µSv\s*(?:veya|\/)\s*saat/giu, 'µSv/saat');
}

export function hasLabUnit(value = '') {
  return UNIT_PATTERN.test(String(value || ''));
}

const STANDARDS = [
  { rx: /\b(wbc|l[oö]kosit|beyaz k[au]re)\b/iu, parameter: 'Lökosit', unit: '/mm³', reference: '4.000–10.000/mm³', high: '15.000/mm³', normal: '8.900/mm³' },
  { rx: /mutlak n[öo]trofil|anc|n[öo]trofil say[ıi]s[ıi]/iu, parameter: 'Mutlak nötrofil', unit: '/mm³', reference: '1.500–7.500/mm³', low: '500/mm³', normal: '4.200/mm³' },
  { rx: /n[oö]trofil/iu, parameter: 'Nötrofil', unit: '%', reference: '%40–70', high: '%84', normal: '%66' },
  { rx: /\bcrp\b/iu, parameter: 'CRP', unit: 'mg/L', reference: '<5 mg/L', high: '86 mg/L', normal: '2 mg/L' },
  { rx: /prokalsitonin|pct/iu, parameter: 'Prokalsitonin', unit: 'ng/mL', reference: '<0.1 ng/mL', high: '1.8 ng/mL', normal: '0.04 ng/mL' },
  { rx: /d[-\s]?dimer/iu, parameter: 'D-dimer', unit: 'ng/mL FEU', reference: '<500 ng/mL FEU', high: '2.400 ng/mL FEU', normal: '320 ng/mL FEU' },
  { rx: /troponin|hs[-\s]?troponin/iu, parameter: 'Hs-Troponin I', unit: 'ng/L', reference: '<34 ng/L', high: '188 ng/L', borderline: '48 ng/L', normal: '12 ng/L' },
  { rx: /ck[-\s]?mb/iu, parameter: 'CK-MB', unit: 'ng/mL', reference: '<5 ng/mL', high: '23 ng/mL', normal: '3.1 ng/mL' },
  { rx: /\bhb\b|hemoglobin/iu, parameter: 'Hemoglobin', unit: 'g/dL', reference: '12–16 g/dL', low: '9.2 g/dL', normal: '13.4 g/dL' },
  { rx: /hct|hematokrit/iu, parameter: 'Hematokrit', unit: '%', reference: '%36–46', low: '%28', normal: '%41' },
  { rx: /trombosit|plt|platelet/iu, parameter: 'Trombosit', unit: '/mm³', reference: '150.000–400.000/mm³', low: '80.000/mm³', normal: '238.000/mm³' },
  { rx: /sodyum|(?:^|\s)na(?:\+|\s|$)/iu, parameter: 'Sodyum', unit: 'mmol/L', reference: '135–145 mmol/L', low: '128 mmol/L', high: '150 mmol/L', normal: '136 mmol/L' },
  { rx: /potasyum|(?:^|\s)k(?:\+|\s|$)/iu, parameter: 'Potasyum', unit: 'mEq/L', reference: '3.5–5.1 mEq/L', low: '3.2 mEq/L', high: '5.8 mEq/L', criticalHigh: '7.1 mEq/L', normal: '4.2 mEq/L' },
  { rx: /klor/iu, parameter: 'Klor', unit: 'mmol/L', reference: '98–107 mmol/L', normal: '101 mmol/L' },
  { rx: /glukoz|glucose|kan şekeri|kan sekeri/iu, parameter: 'Glukoz', unit: 'mg/dL', reference: '70–100 mg/dL', high: '412 mg/dL', low: '56 mg/dL', normal: '96 mg/dL' },
  { rx: /kreatinin/iu, parameter: 'Kreatinin', unit: 'mg/dL', reference: '0.6–1.2 mg/dL', high: '1.8 mg/dL', normal: '0.9 mg/dL' },
  { rx: /\büre\b|bun/iu, parameter: 'Üre', unit: 'mg/dL', reference: '17–43 mg/dL', high: '68 mg/dL', normal: '34 mg/dL' },
  { rx: /\bast\b/iu, parameter: 'AST', unit: 'U/L', reference: '<40 U/L', high: '96 U/L', normal: '31 U/L' },
  { rx: /\balt\b/iu, parameter: 'ALT', unit: 'U/L', reference: '<41 U/L', high: '88 U/L', normal: '28 U/L' },
  { rx: /direkt bilirubin|bilirubin.*direkt/iu, parameter: 'Direkt bilirubin', unit: 'mg/dL', reference: '<0.3 mg/dL', high: '2.4 mg/dL' },
  { rx: /total bilirubin|bilirubin/iu, parameter: 'Total bilirubin', unit: 'mg/dL', reference: '0.2–1.2 mg/dL', high: '2.8 mg/dL', normal: '0.8 mg/dL' },
  { rx: /albumin/iu, parameter: 'Albumin', unit: 'g/dL', reference: '3.5–5.2 g/dL', low: '2.7 g/dL' },
  { rx: /lipaz/iu, parameter: 'Lipaz', unit: 'U/L', reference: '<60 U/L', high: '380 U/L' },
  { rx: /laktat/iu, parameter: 'Laktat', unit: 'mmol/L', reference: '<2.0 mmol/L', high: '3.4 mmol/L', normal: '1.8 mmol/L' },
  { rx: /hco3|hco₃|bikarbonat/iu, parameter: 'HCO₃⁻', unit: 'mmol/L', reference: '22–26 mmol/L', low: '9 mmol/L', normal: '24 mmol/L' },
  { rx: /pco2|paco2/iu, parameter: 'PaCO₂', unit: 'mmHg', reference: '35–45 mmHg', low: '31 mmHg', high: '58 mmHg', normal: '40 mmHg' },
  { rx: /po2|pao2/iu, parameter: 'PaO₂', unit: 'mmHg', reference: '80–100 mmHg', low: '56 mmHg', normal: '86 mmHg' },
  { rx: /^pH$|\bpH\b/u, parameter: 'pH', unit: '', reference: '7.35–7.45', low: '7.21', high: '7.52', normal: '7.40' },
  { rx: /anyon/iu, parameter: 'Anyon açıklığı', unit: 'mmol/L', reference: '8–12 mmol/L', high: '28 mmol/L' },
  { rx: /inr/iu, parameter: 'INR', unit: '', reference: '0.8–1.2', high: '1.9', normal: '1.0' },
  { rx: /\bpt\b|protrombin/iu, parameter: 'PT', unit: 'sn', reference: '11–14 sn', high: '21 sn', normal: '13 sn' },
  { rx: /aptt/iu, parameter: 'aPTT', unit: 'sn', reference: '25–35 sn', high: '39 sn', normal: '31 sn' },
  { rx: /ferritin/iu, parameter: 'Ferritin', unit: 'ng/mL', reference: '30–300 ng/mL', high: '980 ng/mL' },
  { rx: /transferrin/iu, parameter: 'Transferrin satürasyonu', unit: '%', reference: '%20–45', high: '%72' },
  { rx: /hba1c/iu, parameter: 'HbA1c', unit: '%', reference: '<%5.7', high: '%8.1' },
  { rx: /protein[üu]ri/iu, parameter: 'Proteinüri', unit: 'g/g kreatinin', reference: '<0.15 g/g kreatinin', high: '6.2 g/g kreatinin' },
  { rx: /trigliserid/iu, parameter: 'Trigliserid', unit: 'mg/dL', reference: '<150 mg/dL', high: '420 mg/dL' },
  { rx: /[üu]rik asit/iu, parameter: 'Ürik asit', unit: 'mg/dL', reference: '2–5.5 mg/dL', high: '8.2 mg/dL' },
  { rx: /açılış basıncı|acilis basinci/iu, parameter: 'BOS açılış basıncı', unit: 'cmH₂O', reference: '10–20 cmH₂O', high: '28 cmH₂O' },
  { rx: /baz açığı|base deficit|baz acigi|be\b/iu, parameter: 'Baz açığı', unit: 'mmol/L', reference: '-2 – +2 mmol/L', low: '-15 mmol/L', normal: '0 mmol/L' },
  { rx: /mcv/iu, parameter: 'MCV', unit: 'fL', reference: '80–100 fL', high: '110 fL', low: '72 fL', normal: '88 fL' },
  { rx: /rdw/iu, parameter: 'RDW', unit: '%', reference: '%11.5–14.5', high: '%18' },
  { rx: /retik[üu]losit/iu, parameter: 'Retikülosit', unit: '%', reference: '%0.5–2.5', high: '%5.2', low: '%0.2' },
  { rx: /ldh/iu, parameter: 'LDH', unit: 'U/L', reference: '125–220 U/L', high: '680 U/L' },
  { rx: /amilaz/iu, parameter: 'Amilaz', unit: 'U/L', reference: '<100 U/L', high: '340 U/L' },
  { rx: /kalsiyum|d[üu]zeltilmiş kalsiyum/iu, parameter: 'Düzeltilmiş kalsiyum', unit: 'mg/dL', reference: '8.5–10.5 mg/dL', high: '11.6 mg/dL', low: '7.8 mg/dL', normal: '9.4 mg/dL' },
  { rx: /fosfor|fosfat/iu, parameter: 'Fosfor', unit: 'mg/dL', reference: '2.5–4.5 mg/dL', low: '2.1 mg/dL', high: '5.3 mg/dL' },
  { rx: /pth/iu, parameter: 'PTH', unit: 'pg/mL', reference: '15–65 pg/mL', high: '145 pg/mL' },
  { rx: /25[-\s]?oh d vitamini|vitamin d/iu, parameter: '25-OH D vitamini', unit: 'ng/mL', reference: '30–100 ng/mL', low: '14 ng/mL' },
  { rx: /tsh/iu, parameter: 'TSH', unit: 'µIU/mL', reference: '0.4–4.0 µIU/mL', high: '8.2 µIU/mL', low: '0.02 µIU/mL', normal: '1.8 µIU/mL' },
  { rx: /serbest t4|st4/iu, parameter: 'Serbest T4', unit: 'ng/dL', reference: '0.8–1.8 ng/dL', low: '0.5 ng/dL', high: '2.3 ng/dL' },
  { rx: /b12|vitamin b12/iu, parameter: 'Vitamin B12', unit: 'pg/mL', reference: '200–900 pg/mL', low: '120 pg/mL' },
  { rx: /folat/iu, parameter: 'Folat', unit: 'ng/mL', reference: '>4 ng/mL', low: '2.1 ng/mL' },
  { rx: /ferritin/iu, parameter: 'Ferritin', unit: 'ng/mL', reference: '30–300 ng/mL', high: '980 ng/mL', low: '8 ng/mL' },
  { rx: /total demir bağlama|tdbk|tibc/iu, parameter: 'Total demir bağlama kapasitesi', unit: 'µg/dL', reference: '250–450 µg/dL', high: '520 µg/dL' },
  { rx: /total kolesterol/iu, parameter: 'Total kolesterol', unit: 'mg/dL', reference: '<200 mg/dL', high: '260 mg/dL' },
  { rx: /ldl/iu, parameter: 'LDL-K', unit: 'mg/dL', reference: '<100 mg/dL', high: '168 mg/dL' },
  { rx: /hdl/iu, parameter: 'HDL-K', unit: 'mg/dL', reference: '>40 mg/dL', low: '32 mg/dL' },
  { rx: /tg\b|trigliserid/iu, parameter: 'Trigliserid', unit: 'mg/dL', reference: '<150 mg/dL', high: '420 mg/dL' },
  { rx: /bnp|nt-probnp/iu, parameter: 'NT-proBNP', unit: 'pg/mL', reference: '<125 pg/mL', high: '2.800 pg/mL' },
  { rx: /cd4/iu, parameter: 'CD4', unit: 'hücre/µL', reference: '500–1.500 hücre/µL', low: '120 hücre/µL' },
  { rx: /hiv rna/iu, parameter: 'HIV RNA', unit: 'copies/mL', reference: 'Saptanmamalı', high: '120.000 copies/mL' },
  { rx: /mutlak lenfosit|lenfosit say[ıi]s[ıi]/iu, parameter: 'Mutlak lenfosit', unit: '/mm³', reference: '1.000–4.000/mm³', low: '800/mm³', normal: '2.200/mm³' },
  { rx: /bos l[öo]kosit|hücre say[ıi]s[ıi]|hücre sayisi/iu, parameter: 'BOS lökosit', unit: '/mm³', reference: '0–5/mm³', high: '850/mm³' },
  { rx: /bos protein|protein\b/iu, parameter: 'Protein', unit: 'mg/dL', reference: '15–45 mg/dL', high: '180 mg/dL' },
  { rx: /bos glukoz/iu, parameter: 'BOS glukoz', unit: 'mg/dL', reference: '40–70 mg/dL', low: '32 mg/dL' },
  { rx: /asit pmn/iu, parameter: 'Asit PMN', unit: '/mm³', reference: '<250/mm³', high: '680/mm³' },
  { rx: /protein[üu]ri/iu, parameter: 'Proteinüri', unit: 'g/g kreatinin', reference: '<0.15 g/g kreatinin', high: '6.2 g/g kreatinin' },
];

export function getLabStandard(parameter = '') {
  return STANDARDS.find((item) => item.rx.test(String(parameter || ''))) || null;
}

function parseNumber(value = '') {
  const text = String(value || '').replace(',', '.');
  const match = text.match(/-?\d+(?:\.\d+)?/);
  return match ? Number.parseFloat(match[0]) : null;
}

function thousands(n) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function withUnit(value, standard) {
  const raw = normalizeLabUnit(String(value || '').trim());
  if (!standard || !raw || hasLabUnit(raw) || /pozitif|negatif|normal|referans|saptan|yok|planland|önerild|yüksek|düşük/i.test(raw)) return raw;
  const numeric = parseNumber(raw);
  if (numeric === null) return raw;
  if (standard.unit === '/mm³') return `${thousands(numeric < 1000 ? numeric * 1000 : numeric)}/mm³`;
  if (standard.unit === '%') return raw.startsWith('%') ? raw : `%${raw}`;
  return standard.unit ? `${raw} ${standard.unit}` : raw;
}

function referenceWithUnit(reference, standard) {
  const raw = normalizeLabUnit(String(reference || '').trim());
  if (!standard) return raw || '—';
  if (!raw || raw === '—' || /değişken|yaşa göre|beklenen veya karar eşiği|objektif bulgu/i.test(raw)) return standard.reference || raw || '—';
  if (!/\d/.test(raw) || hasLabUnit(raw) || /negatif|pozitif|normal|saptanmamal|beklenmez|üreme|yok|aktivite|risk/i.test(raw)) return raw;
  if (standard.unit === '%') return raw.replace(/(?<!%)\b(\d+(?:[.,]\d+)?)\b/g, '%$1');
  return standard.unit ? `${raw} ${standard.unit}` : raw;
}

function qualitativeToValue(value, note, standard, context = '') {
  const raw = normalizeLabUnit(String(value || '').trim());
  const key = tr(`${raw} ${note} ${context}`);
  if (!standard) return raw;
  if (/^yüksek$|^artmis$|^belirgin yüksek$|^çok yüksek$/.test(tr(raw))) return (/kritik|ekg|qrs|hiperpotas/.test(key) && standard.criticalHigh) ? standard.criticalHigh : (standard.high || standard.borderline || raw);
  if (/^hafif yüksek$|^sinirda$|^sinirda yüksek$/.test(tr(raw))) return standard.borderline || standard.high || raw;
  if (/^düşük$|^dusuk$|^azalmis$/.test(tr(raw))) return standard.low || raw;
  if (/^normal$|^referans içinde$|^referans icinde$|^sorun yok$/.test(tr(raw))) return standard.normal || raw;
  return raw;
}

export function inferLabStatus(value = '', reference = '', note = '') {
  const noteKey = tr(note);
  if (/kritik/.test(noteKey) && /düşük|dusuk|azalmis/.test(noteKey)) return 'Kritik düşük';
  if (/kritik/.test(noteKey) && /yüksek|yuksek|artmis|uzamis|nefrotik/.test(noteKey)) return 'Kritik yüksek';
  if (/kritik/.test(noteKey)) return 'Kritik';
  if (/yüksek|yuksek|artmis|uzamis|nefrotik/.test(noteKey)) return 'Yüksek';
  if (/düşük|dusuk|azalmis/.test(noteKey)) return 'Düşük';
  if (/pozitif/.test(noteKey)) return 'Pozitif';
  if (/patolojik|anormal/.test(noteKey)) return 'Patolojik';
  if (/negatif/.test(noteKey)) return 'Negatif';
  if (/normal|referans içinde|referans icinde|uygun|beklenen|sorun yok/.test(noteKey)) return 'Referans içinde';

  const result = tr(value);
  const ref = tr(reference);
  if (/pozitif/.test(result) && /negatif|saptanmamal|olmamal|yok/.test(ref)) return 'Pozitif';
  if (/negatif|saptanmadi|yok/.test(result) && /negatif|saptanmamal|olmamal|yok/.test(ref)) return 'Negatif';

  const numeric = parseNumber(value);
  if (numeric === null || !reference) return note || 'Bilgi';
  const cleanRef = String(reference || '').replace(',', '.').replace(/(\d)\s*[-–—]\s*(\d)/g, '$1–$2');
  const nums = [...cleanRef.matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number.parseFloat(m[0])).filter(Number.isFinite);
  if (/^\s*</.test(cleanRef) && nums.length) return numeric < nums[0] ? 'Referans içinde' : 'Yüksek';
  if (/^\s*≤|^\s*<=/.test(cleanRef) && nums.length) return numeric <= nums[0] ? 'Referans içinde' : 'Yüksek';
  if (/^\s*>/.test(cleanRef) && nums.length) return numeric > nums[0] ? 'Referans içinde' : 'Düşük';
  if (/^\s*≥|^\s*>=/.test(cleanRef) && nums.length) return numeric >= nums[0] ? 'Referans içinde' : 'Düşük';
  if (nums.length >= 2 && /[-–—]/.test(cleanRef)) {
    const [low, high] = nums[0] <= nums[1] ? [nums[0], nums[1]] : [nums[1], nums[0]];
    if (numeric < low) return 'Düşük';
    if (numeric > high) return 'Yüksek';
    return 'Referans içinde';
  }
  return note || 'Bilgi';
}

export function repairIncompleteLabResult(rowOrObject, caseContext = '') {
  const isArray = Array.isArray(rowOrObject);
  const source = isArray ? rowOrObject : [rowOrObject?.parameter, rowOrObject?.value, rowOrObject?.reference, rowOrObject?.note || rowOrObject?.interpretation];
  let [parameter = '', value = '', reference = '', note = ''] = source.map((item) => normalizeLabUnit(String(item ?? '').trim()));
  const standard = getLabStandard(`${parameter} ${value}`);
  if (standard) {
    parameter = standard.parameter;
    value = withUnit(qualitativeToValue(value, note, standard, caseContext), standard);
    reference = referenceWithUnit(reference || standard.reference, standard);
    note = inferLabStatus(value, reference, note);
  } else {
    reference = reference || '—';
    note = note || inferLabStatus(value, reference);
  }
  const repaired = [parameter, value, reference, note || 'Bilgi'];
  return isArray ? repaired : { ...rowOrObject, parameter, value, reference, note: note || 'Bilgi' };
}

export function formatLabValue(parameter, value, unit = '', reference = '') {
  const standard = getLabStandard(parameter) || { parameter, unit, reference };
  const formattedValue = withUnit(value, { ...standard, unit: normalizeLabUnit(unit || standard.unit) });
  const formattedReference = referenceWithUnit(reference || standard.reference, standard);
  return { parameter: standard.parameter || parameter, value: formattedValue, unit: unit || standard.unit || '', reference: formattedReference, status: inferLabStatus(formattedValue, formattedReference) };
}

export function validateLabResultCompleteness(result = {}) {
  const rows = Array.isArray(result) ? result : result.rows || [];
  const errors = [];
  rows.forEach((row, index) => {
    const [parameter, value, reference] = Array.isArray(row) ? row : [row.parameter, row.value, row.reference];
    const standard = getLabStandard(parameter);
    if (standard && /\d/.test(String(value || '')) && standard.unit && !hasLabUnit(value) && standard.unit !== '') errors.push(`row ${index + 1}: unit missing for ${parameter}`);
    if (standard && (!reference || String(reference).trim() === '—')) errors.push(`row ${index + 1}: reference missing for ${parameter}`);
  });
  return { ok: errors.length === 0, errors };
}

export function formatLabRows(rows = [], context = '') {
  return rows.map((row) => repairIncompleteLabResult(row, context));
}

export function labRowToSummary(row = []) {
  const [parameter, value, reference, status] = Array.isArray(row) ? row : [row.parameter, row.value, row.reference, row.note || row.interpretation];
  const statusText = status && status !== 'Bilgi' ? `; ${String(status).toLocaleLowerCase('tr')}` : '';
  return `${parameter}: ${value} (referans ${reference}${statusText})`;
}

export function buildLabSummary(rows = [], limit = 3) {
  const normalized = rows.map((row) => Array.isArray(row) ? row : [row.parameter, row.value, row.reference, row.note || row.interpretation]);
  const abnormal = normalized.filter((row) => !/referans içinde|normal|negatif|beklenen|uygun|bilgi/i.test(String(row[3] || '')));
  const selected = (abnormal.length ? abnormal : normalized).slice(0, limit);
  return selected.map(labRowToSummary).join('. ') + (selected.length ? '.' : '');
}

export function buildLabFindingItems(rows = [], limit = 4) {
  return rows.slice(0, limit).map(labRowToSummary);
}
