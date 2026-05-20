// KlinikIQ embedded clinical case quality standard
// Applies a final non-destructive safety pass to built-in branch cases before rendering.

const SCREEN_META_FIELDS = ['riskContext', 'distinctiveClues', 'priorityFocus'];

const WEAK_RESULT_PATTERNS = [
  [/\btanısal\s+patern\b/giu, 'karar verdirici objektif bulgu'],
  [/\bpaternle\s+uyumlu\b/giu, 'objektif bulguyla desteklenen'],
  [/\bmetabolik\s+örüntü\b/giu, 'metabolik bulgu kümesi'],
  [/\bkarakteristik\s+metabolit\b/giu, 'ilgili metabolit'],
  [/\bobjektif\s+sonuç\b/giu, 'tetkik sonucu'],
  [/\bnormal\s+doku\b/giu, 'örneklenen dokuda ek patoloji izlenmez'],
  [/\bbeklenen\s+normal\s+aralık\b/giu, 'referans aralığı'],
  [/\bklinik\s+muayenede\s+etkilenmiş\b/giu, 'muayenede etkilenme bulgusu'],
  [/\banormal\s+bulgu\b/giu, 'patolojik bulgu'],
  [/\bAnormal\s+bulgu\b/gu, 'Patolojik bulgu'],
  [/\bBilgi\b/g, 'Sonuç'],
  [/\bbilgi\b/g, 'sonuç'],
  [/\bdeğerlendirilir\b/giu, 'raporlanır'],
  [/\bdeğerlendirilmiştir\b/giu, 'raporlanmıştır'],
  [/\bwheezing\b/giu, 'hışıltılı solunum'],
  [/\bwidened\s+QRS\b/giu, 'QRS genişlemesi'],
  [/\btall\s+T\s+waves?\b/giu, 'sivri T dalgaları'],
  [/\binsulin\s*\+\s*glucose\b/giu, 'intravenöz insülin + glukoz'],
];

const DIRECTIVE_EXAM_RE = /(test\s+edilir|değerlendirilir|karşılaştırılır|objektifleştirmek\s+için\s+bakılır|araştırılır|ilgili\s+anatomik\s+yapı\s+ile\s+eşleştirilir|klinik\s+muayenede\s+saptanır|gibi\s+bulgular\s+saptanır|gibi\s+eşlik\s+eden\s+bulgular|metabolik\s+tabloyla\s+uyumludur)/iu;
const LOW_VALUE_SUMMARY_RE = /^(bulgular\s+uyumludur|paternle\s+uyumludur|özel\s+inceleme|mikroskobik\s+bulgudur|klinik\s+dağılımla\s+uyumludur|panel\s+sonucu\s+tanıyı\s+destekler|patolojik\s+bulgu\s+saptandı)$/iu;
const QUALITATIVE_TYPES = new Set(['ecg', 'xray', 'ct', 'mri', 'ultrasound', 'imaging', 'microscopy', 'pathology', 'endoscopy', 'clinical', 'neurophysiology', 'nuclear']);

function compactSpaces(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+([,.;:!?])/gu, '$1')
    .replace(/([,;:!?])(?=\S)/gu, '$1 ')
    .replace(/(?<=\d)\.\s+(?=\d)/gu, ',')
    .replace(/(?<=\d),\s+(?=\d)/gu, ',')
    .replace(/\s{2,}/gu, ' ')
    .trim();
}

function cleanText(value = '') {
  let text = compactSpaces(value);
  WEAK_RESULT_PATTERNS.forEach(([pattern, replacement]) => {
    text = text.replace(pattern, replacement);
  });
  return compactSpaces(text);
}

function normalizeKey(value = '') {
  return cleanText(value)
    .toLocaleLowerCase('tr')
    .replace(/[âîû]/g, (m) => ({ â: 'a', î: 'i', û: 'u' }[m] || m))
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9çğıöşü]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function ensureSentence(value = '') {
  const text = cleanText(value).replace(/[\s,;:]+$/u, '');
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function stripAnswerLeak(text = '', clinicalCase = {}) {
  let cleaned = cleanText(text);
  const terms = [clinicalCase?.diagnosis?.correct, ...(clinicalCase?.diagnosis?.options || [])].filter(Boolean);
  terms.forEach((term) => {
    if (!term || String(term).length < 4) return;
    const escaped = String(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    cleaned = cleaned.replace(new RegExp(`\\b${escaped}\\b`, 'giu'), '').replace(/\s{2,}/g, ' ');
  });
  cleaned = cleaned.replace(/^[,.;:–\-\s]+/u, '').replace(/\s+([,.;:!?])/g, '$1').trim();
  return cleaned;
}

function cleanExam(exam = []) {
  return (Array.isArray(exam) ? exam : [])
    .map((item) => ensureSentence(cleanText(item)))
    .filter((item) => item && !DIRECTIVE_EXAM_RE.test(item))
    .filter((item, index, arr) => arr.findIndex((other) => normalizeKey(other) === normalizeKey(item)) === index);
}

function cleanResultCell(value = '', role = '', itemType = '') {
  const text = cleanText(value);
  if (!text || text === '—') return '';
  if (role === 'reference') {
    if (QUALITATIVE_TYPES.has(itemType)) return '';
    if (!/(\d|<|>|–|-|negatif|pozitif|yok|normal|referans)/iu.test(text)) return '';
  }
  if (role === 'note') {
    if (/^(patolojik\s+bulgu|sonuç|yorum\s+gerektirir|klinik\s+olarak\s+anlamlı)$/iu.test(text)) return '';
  }
  if (role === 'parameter' && /^(sonuç|bulgu|parametre)$/iu.test(normalizeKey(text))) return 'Rapor bulgusu';
  return text;
}

function cleanInvestigation(item = {}) {
  if (!item || typeof item !== 'object') return item;
  const type = item.type || 'clinical';
  const next = { ...item };
  next.label = cleanText(next.label || next.title || 'Tetkik sonucu');
  next.title = cleanText(next.title || next.label || 'Tetkik sonucu');
  next.purpose = cleanText(next.purpose || '');
  next.summary = cleanText(next.summary || '');
  next.clinicalMeaning = cleanText(next.clinicalMeaning || '');
  next.postAnswerExplanation = cleanText(next.postAnswerExplanation || '');

  if (next.result && typeof next.result === 'object') {
    const result = { ...next.result };
    const sourceRows = Array.isArray(result.values) ? result.values : Array.isArray(result.rows) ? result.rows : [];
    result.values = sourceRows.map((row) => {
      const cells = Array.isArray(row) ? row : [row.parameter, row.value, row.reference, row.note || row.interpretation];
      return [
        cleanResultCell(cells[0] || 'Rapor bulgusu', 'parameter', type),
        cleanResultCell(cells[1] || '', 'value', type),
        cleanResultCell(cells[2] || '', 'reference', type),
        cleanResultCell(cells[3] || '', 'note', type),
      ];
    }).filter((row) => row[1] || row[3]);
    delete result.rows;
    result.title = cleanText(result.title || next.title);
    result.summary = cleanText(result.summary || next.summary || '');
    result.interpretation = cleanText(result.interpretation || next.clinicalMeaning || '');
    if (LOW_VALUE_SUMMARY_RE.test(result.summary)) result.summary = '';
    next.result = result;
  }

  if (LOW_VALUE_SUMMARY_RE.test(next.summary)) next.summary = next.result?.summary || '';
  return next;
}

function cleanDiagnosis(diagnosis = {}) {
  if (!diagnosis || typeof diagnosis !== 'object') return diagnosis;
  const walk = (value) => {
    if (typeof value === 'string') return cleanText(value);
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, walk(child)]));
    }
    return value;
  };
  return walk(diagnosis);
}

export function applyEmbeddedCaseQualityStandard(clinicalCase = {}) {
  if (!clinicalCase || typeof clinicalCase !== 'object') return clinicalCase;
  const next = { ...clinicalCase };
  next.title = stripAnswerLeak(next.title || next.chiefComplaint || '', next) || next.chiefComplaint || 'Klinik olgu';
  next.chiefComplaint = stripAnswerLeak(next.chiefComplaint || next.title || '', next) || next.title;
  next.stem = ensureSentence(cleanText(next.stem || next.patientIntro?.historySummary || ''));
  next.clinicalFocus = 'Öykü, fizik muayene ve objektif veriler tek klinik problem etrafında birlikte değerlendirilmelidir.';

  const intro = { ...(next.patientIntro || {}) };
  SCREEN_META_FIELDS.forEach((field) => { delete intro[field]; });
  intro.profile = cleanText(intro.profile || [next.demographics, next.setting].filter(Boolean).join(' · '));
  intro.presentation = stripAnswerLeak(intro.presentation || next.chiefComplaint || '', next) || next.chiefComplaint;
  intro.historySummary = ensureSentence(cleanText(intro.historySummary || next.stem || ''));
  next.patientIntro = intro;

  next.exam = cleanExam(next.exam);
  next.availableInvestigations = (Array.isArray(next.availableInvestigations) ? next.availableInvestigations : []).map(cleanInvestigation).filter(Boolean);
  next.investigations = (Array.isArray(next.investigations) ? next.investigations : []).map(cleanInvestigation).filter(Boolean);
  next.diagnosis = cleanDiagnosis(next.diagnosis);
  return next;
}

export function hasEmbeddedCaseQualityIssue(value = '') {
  const text = String(value || '');
  return DIRECTIVE_EXAM_RE.test(text) || LOW_VALUE_SUMMARY_RE.test(cleanText(text));
}
