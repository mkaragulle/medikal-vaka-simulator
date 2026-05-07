import { normalizeMedicalTurkish } from './editorialQuality.js';
import { sanitizeMeasurementText } from './clinicalFormatters.js';
import { normalizeQuestionText } from './aiQuestionHistory.js';
import { toPlainText } from './questionDeduplication.js';

export const INLINE_FIELD_LABELS = [
  'Başvuru yakınması',
  'Başvuru',
  'Karar verdirici ipucu',
  'Karar verdiren ipucu',
  'Destekleyici kanıt',
  'Destekleyici bulgu',
  'Olgu verisi',
  'Ek destek',
  'Laboratuvar paterni',
  'Laboratuvar bulgusu',
  'Görüntüleme bulgusu',
  'Fizik muayene bulgusu',
  'Muayene bulgusu',
  'Klinik patern',
  'Ana patern',
  'Ana kanıt',
  'Ayırıcı nokta',
  'Ayırt ettirici ipucu',
  'Ayırt ettirici bulgu',
  'Sınav incisi',
  'Sınav notu',
  'TUS notu',
  'Morfolojik patern',
  'Mekanizma',
  'Mekanizma özeti',
];

const LABEL_SOURCE = INLINE_FIELD_LABELS
  .map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  .join('|');

const INLINE_LABEL_PREFIX = new RegExp(`^(?:${LABEL_SOURCE})\\s*(?:[:：|\\-–—]+)\\s*`, 'iu');
const INLINE_LABEL_ANYWHERE = new RegExp(`(?:^|[\\n•\\-–—]\\s*)(?:${LABEL_SOURCE})\\s*(?:[:：|]+)\\s*`, 'giu');

const LAB_PATTERN = /\b(lökosit|lokosit|wbc|nötrofil|notrofil|lenfosit|trombosit|hemoglobin|\bhb\b|hematokrit|\bhct\b|crp|sedimentasyon|prokalsitonin|troponin|bilirubin|kreatinin|üre|bun|sodyum|na\+|potasyum|k\+|klor|cl-|kalsiyum|ca\+\+|magnezyum|mg\+\+|fosfor|glukoz|glucose|hba1c|keton|laktat|ph\b|pco₂|pco2|po₂|po2|hco₃|hco3|baz açığı|d-dimer|inr|pt\b|aptt|fibrinojen|seroloji|igg|igm|iga|ige|anti-|hbsag|hbeag|hcv|hiv|ana\b|anca\b|kültür|kultur|pcr|gram boyama|bos|idrar tahlili|dansite|proteinüri|hematuri|hematüri|mikroalbümin|tsh|serbest t4|kortizol|acth|pth|ferritin|transferrin|demir|amilaz|lipaz|albumin|trigliserid|kolesterol|hdl|ldl)\b|\d+[.,]?\d*\s*(mg\/dl|mg\/l|mmol\/l|meq\/l|ng\/ml|pg\/ml|µiu\/ml|u\/l|iu\/l|g\/dl|%|\/mm³|\/mm3|x10\^?3\/µl|mmhg)\b/iu;

const LAB_ABBREVIATION_PATTERN = /\b(AST|ALT|ALP|GGT|LDH|CK(?:-MB)?|BUN|PT|aPTT|INR|ANA|ANCA|HBsAg|HBeAg|Anti-HCV|Anti-HAV|Anti-HBc|PCR)\b/u;

const IMAGING_PATTERN = /\b(akciğer grafisi|grafi|radyografi|x-ray|bt\b|bilgisayarlı tomografi|mr\b|mrg\b|manyetik rezonans|usg\b|ultrasonografi|ekokardiyografi|eko\b|doppler|anjiyografi|tomografi|sintigrafi|pet-bt|röntgen|konsolidasyon|hava bronkogram|dolum defekti|infiltrasyon|atelektazi|pnömotoraks|plevral efüzyon|apandiks çapı|safra taşı|iskemik lezyon|ektazi|anevrizma|kitle|nodül|opasite|lezyon|fraktür|kırık hattı|çıkık)\b/iu;

const PHYSICAL_EXAM_PATTERN = /\b(raller|ral\b|ronküs|ronkus|hışıltılı solunum|wheezing|stridor|oskültasyon|perküsyon|palpasyon|matite|bronşiyal solunum|üfürüm|murmur|defans|rebound|hassasiyet|rijidite|ense sertliği|kernig|brudzinski|döküntü morfolojisi|eritem|ödem|ısı artışı|fluktuasyon|lenfadenopati|hepatomegali|splenomegali|hepatosplenomegali|kapiller dolum|deri turgoru|turgor|mukozalar kuru|pretibial ödem|periferik nabız|nabızlar alınamıyor|güç kaybı|motor defisit|duyu kaybı|babinski|nistagmus|ataksi|pitoz|pupil|refleks|eklem şişliği|eklem hareket|tripod pozisyonu|salya akması|tonsil|farenks|batın|sağ alt kadran|sol alt kadran|murphy|mcburney|homans)\b/iu;

const VITAL_PATTERN = /\b(ta\b|kan basıncı|nabız|ateş|solunum sayısı|solunum\s*:\s*|spo2|spo₂|saturasyon|satürasyon|hipotansiyon|hipertansiyon|taşikardi|bradikardi|taşipne|bradipne|hipoksemi|febril)\b|\d+\/\d+\s*mmhg|%\s*\d{2,3}|\d+\s*°c/iu;

const CHIEF_COMPLAINT_PATTERN = /(öksürük|ateş|nefes darlığı|dispne|göğüs ağrısı|yan ağrısı|karın ağrısı|baş ağrısı|baş dönmesi|kusma|bulantı|ishal|kabızlık|döküntü|nöbet|halsizlik|yorgunluk|sarılık|idrar yakınması|dizüri|hematüri|travma sonrası ağrı|bel ağrısı|eklem ağrısı|kalça ağrısı|omuz ağrısı|boğaz ağrısı|yutma güçlüğü|salya akması|çarpıntı|senkop|bayılma|kanama|hematemez|melena|ödem|şişlik|kilo kaybı|gece terlemesi|kaşıntı|görme bozukluğu|çift görme|konuşma bozukluğu|güçsüzlük|emmeme|beslenememe|letarji)/iu;

const TREATMENT_PATTERN = /\b(tedavi|antibiyotik|penisilin|seftriakson|ivig|adrenalin|insülin|heparin|oksijen|entübasyon|cerrahi|ameliyat|immobilizasyon|splint|alçı|sıvı resüsitasyonu|antidot|vazopressör|steroid|bronkodilatör)/iu;

function normalizeForRules(text = '') {
  return normalizeMedicalTurkish(sanitizeMeasurementText(String(text || '')))
    .replace(/TAşikardi/gu, 'Taşikardi')
    .replace(/ALTı/gu, 'altı')
    .replace(/ALT /gu, 'alt ')
    .replace(/Sağ ALT/gu, 'sağ alt')
    .replace(/Sol ALT/gu, 'sol alt')
    .replace(/sağ ALT/gu, 'sağ alt')
    .replace(/sol ALT/gu, 'sol alt')
    .replace(/\s+/g, ' ')
    .trim();
}

export function removeInlineFieldLabels(text = '') {
  let value = normalizeForRules(text);
  if (!value) return '';
  for (let i = 0; i < 5; i += 1) {
    const next = value.replace(INLINE_LABEL_PREFIX, '').trim();
    if (next === value) break;
    value = next;
  }
  value = value.replace(INLINE_LABEL_ANYWHERE, (match) => (match.startsWith('\n') ? '\n' : '')).trim();
  return value.replace(/^[•\-–—\s]+/u, '').replace(/[\s,;:]+$/u, '').trim();
}

export function isMetaLabel(text = '') {
  return INLINE_LABEL_PREFIX.test(String(text || '').trim());
}

export function isLabResult(text = '') {
  const value = removeInlineFieldLabels(text);
  return LAB_PATTERN.test(value) || LAB_ABBREVIATION_PATTERN.test(value);
}

export function isImagingFinding(text = '') {
  return IMAGING_PATTERN.test(removeInlineFieldLabels(text));
}

export function isPhysicalExamFinding(text = '') {
  const value = removeInlineFieldLabels(text);
  return PHYSICAL_EXAM_PATTERN.test(value) && !isLabResult(value) && !isImagingFinding(value);
}

export function isVitalFinding(text = '') {
  return VITAL_PATTERN.test(removeInlineFieldLabels(text));
}

export function isInvestigationResult(text = '') {
  return isLabResult(text) || isImagingFinding(text);
}

export function isChiefComplaint(text = '') {
  const value = removeInlineFieldLabels(text);
  return CHIEF_COMPLAINT_PATTERN.test(value) && !isLabResult(value) && !isImagingFinding(value) && !isPhysicalExamFinding(value);
}

export function classifyClinicalDatum(text = '') {
  const value = removeInlineFieldLabels(text);
  if (!value) return 'empty';
  if (isMetaLabel(text)) return 'metaLabel';
  if (isImagingFinding(value)) return 'imaging';
  if (isLabResult(value)) return 'lab';
  if (isVitalFinding(value)) return 'vital';
  if (isPhysicalExamFinding(value)) return 'physicalExam';
  if (TREATMENT_PATTERN.test(value)) return 'management';
  if (isChiefComplaint(value)) return 'chiefComplaint';
  return 'history';
}

export function canonicalEvidenceTitle(text = '', fallbackTitle = '') {
  const type = classifyClinicalDatum(text || fallbackTitle);
  if (type === 'lab') return 'Laboratuvar';
  if (type === 'imaging') return 'Görüntüleme';
  if (type === 'physicalExam') return 'Fizik muayene';
  if (type === 'vital') return 'Vital bulgular';
  if (type === 'chiefComplaint') return 'Başvuru';
  if (type === 'management') return 'İlk yaklaşım';
  return fallbackTitle && !isMetaLabel(fallbackTitle) ? removeInlineFieldLabels(fallbackTitle) : 'Klinik ipucu';
}

export function normalizeClinicalDatumText(text = '') {
  let value = removeInlineFieldLabels(text)
    .replace(/\bTAşikardi\b/gu, 'Taşikardi')
    .replace(/\bSağ ALT\b/gu, 'Sağ alt')
    .replace(/\bSol ALT\b/gu, 'Sol alt')
    .replace(/\bsağ ALT\b/gu, 'sağ alt')
    .replace(/\bsol ALT\b/gu, 'sol alt')
    .replace(/\bMorfolojik patern\s*[:：-]?\s*/giu, '')
    .replace(/Morfolojik patern\.\s*Morfolojik patern\.?/giu, '')
    .replace(/\bpaternyla\b/giu, 'paternle')
    .replace(/\blikefaksiyon\s+nekrozuyla\b/giu, 'likefaksiyon nekrozu ile')
    .replace(/\blikefaksiyon(?!\s+nekroz)/giu, 'likefaksiyon nekrozu')
    .replace(/\bLökosit\s+(\d{1,2})(?![\d.,]*\s*\/mm)/giu, (_, number) => `Lökosit ${Number(number).toLocaleString('tr-TR')}.000/mm³`)
    .replace(/\bLokosit\s+(\d{1,2})(?![\d.,]*\s*\/mm)/giu, (_, number) => `Lökosit ${Number(number).toLocaleString('tr-TR')}.000/mm³`)
    .replace(/\bCRP\s+(\d{1,3})(?![\d.,]*\s*mg\/L)/giu, 'CRP $1 mg/L')
    .replace(/\bD-dimer\s+(\d+(?:[.,]\d+)?)(?![\d.,]*\s*(?:mg\/L|ng\/mL|µg\/mL))/giu, 'D-dimer $1 mg/L')
    .replace(/\bSpO2\b/g, 'SpO₂')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  if (!value) return '';
  return /[.!?]$/u.test(value) ? value : `${value}.`;
}


function itemBodyText(value = '') {
  if (!value) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(itemBodyText).filter(Boolean).join(' | ');
  if (typeof value === 'object') {
    return [value.text, value.summary, value.explanation, value.description, value.result, value.interpretation, value.value]
      .map(itemBodyText)
      .filter(Boolean)
      .join(' | ');
  }
  return String(value);
}

function asTextArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(toPlainText).filter(Boolean);
  return [toPlainText(value)].filter(Boolean);
}

function uniqueItems(items = [], max = 4) {
  const seen = new Set();
  const output = [];
  items.map(normalizeClinicalDatumText).filter(Boolean).forEach((item) => {
    const key = normalizeQuestionText(item);
    if (!key || seen.has(key)) return;
    seen.add(key);
    output.push(item.replace(/[.]$/u, ''));
  });
  return output.slice(0, max);
}

function investigationTexts(investigations = []) {
  return (Array.isArray(investigations) ? investigations : []).flatMap((investigation) => [
    investigation?.summary,
    ...(Array.isArray(investigation?.findings) ? investigation.findings : []),
    ...(Array.isArray(investigation?.rows) ? investigation.rows.map((row) => Array.isArray(row) ? row.slice(0, 2).join(' ') : row) : []),
  ]).filter(Boolean);
}

export function buildSemanticDistinctiveClues(caseItem = {}, max = 4) {
  const historyCandidates = [caseItem.chiefComplaint, caseItem.patientIntro?.presentation, ...(asTextArray(caseItem.findings?.history)), caseItem.stem]
    .filter((item) => isChiefComplaint(item) || classifyClinicalDatum(item) === 'history');
  const examCandidates = [...asTextArray(caseItem.exam), ...asTextArray(caseItem.findings?.exam)].filter(isPhysicalExamFinding);
  const investigationCandidates = investigationTexts(caseItem.investigations || caseItem.findings?.investigations).filter(isInvestigationResult);
  const vitalCandidates = Object.entries(caseItem.vitals || caseItem.findings?.vitals || {})
    .map(([label, value]) => `${label}: ${value}`)
    .filter(isVitalFinding);

  return uniqueItems([
    ...historyCandidates.slice(0, 1),
    ...examCandidates.slice(0, 1),
    ...investigationCandidates.filter(isImagingFinding).slice(0, 1),
    ...investigationCandidates.filter(isLabResult).slice(0, 1),
    ...vitalCandidates.slice(0, 1),
  ], max);
}

export function repairEvidenceChainItems(items = [], caseItem = {}, max = 5) {
  const source = Array.isArray(items) && items.length ? items : buildSemanticDistinctiveClues(caseItem, max);
  const seen = new Set();
  const repaired = [];

  source.forEach((item) => {
    const rawText = typeof item === 'string' ? item : item?.text || item?.summary || item?.description || item?.title || '';
    const text = normalizeClinicalDatumText(rawText);
    if (!text || text.length < 5) return;
    const key = normalizeQuestionText(text);
    if (seen.has(key)) return;
    seen.add(key);
    if (typeof item === 'string') {
      repaired.push(text.replace(/[.]$/u, ''));
    } else {
      repaired.push({
        ...item,
        title: canonicalEvidenceTitle(text, item?.title || item?.label || ''),
        text,
      });
    }
  });

  if (repaired.length < 3) {
    buildSemanticDistinctiveClues(caseItem, max).forEach((text) => {
      const key = normalizeQuestionText(text);
      if (!seen.has(key)) {
        seen.add(key);
        repaired.push(text);
      }
    });
  }
  return repaired.slice(0, max);
}

export function validateClinicalFieldPlacement(caseItem = {}) {
  const errors = [];
  const warnings = [];
  const chief = caseItem.chiefComplaint || caseItem.patientIntro?.presentation || '';
  if (chief && (isLabResult(chief) || isImagingFinding(chief) || isPhysicalExamFinding(chief))) {
    errors.push('başvuru yakınması alanında laboratuvar/görüntüleme/muayene bulgusu var');
  }

  [...asTextArray(caseItem.exam), ...asTextArray(caseItem.findings?.exam)].forEach((finding) => {
    if (isLabResult(finding) || isImagingFinding(finding)) errors.push(`fizik muayene alanında tetkik verisi var: ${finding.slice(0, 90)}`);
  });

  const riskItems = asTextArray(caseItem.patientIntro?.riskContext);
  riskItems.forEach((item) => {
    const type = classifyClinicalDatum(item);
    if (['lab', 'imaging', 'physicalExam'].includes(type)) warnings.push(`risk bağlamında objektif bulgu var: ${item.slice(0, 90)}`);
    if (isMetaLabel(item)) errors.push(`risk bağlamında inline etiket var: ${item.slice(0, 90)}`);
  });

  const clueItems = asTextArray(caseItem.patientIntro?.distinctiveClues);
  clueItems.forEach((item) => {
    if (isMetaLabel(item)) errors.push(`ayırt ettirici ipuçlarında inline etiket var: ${item.slice(0, 90)}`);
    if (/Morfolojik patern\.\s*Morfolojik patern|paternyla|Klinik değerlendirme için ek veri/iu.test(item)) errors.push(`ayırt ettirici ipuçlarında yasaklı ifade var: ${item.slice(0, 90)}`);
    if (/\bLökosit\s+\d{1,2}\.?$/iu.test(removeInlineFieldLabels(item))) errors.push(`eksik laboratuvar formatı: ${item.slice(0, 90)}`);
  });
  if (clueItems.length > 5) warnings.push('ayırt ettirici ipuçları 5 maddeden uzun');

  const evidenceSource = caseItem.evidenceChain || caseItem.diagnosis?.answerFeedback?.evidenceChain || [];
  const evidenceItems = Array.isArray(evidenceSource) ? evidenceSource.map(itemBodyText).filter(Boolean) : asTextArray(evidenceSource);
  evidenceItems.forEach((item) => {
    if (isMetaLabel(item)) errors.push(`kanıt zincirinde inline etiket var: ${item.slice(0, 90)}`);
    if (/Morfolojik patern\.\s*Morfolojik patern|paternyla|Klinik değerlendirme için ek veri/iu.test(item)) errors.push(`kanıt zincirinde yasaklı ifade var: ${item.slice(0, 90)}`);
    if (/\bLökosit\s+\d{1,2}\.?$/iu.test(removeInlineFieldLabels(item))) errors.push(`kanıt zincirinde eksik laboratuvar formatı: ${item.slice(0, 90)}`);
  });

  return { ok: errors.length === 0, errors: Array.from(new Set(errors)), warnings: Array.from(new Set(warnings)) };
}

export function repairMisplacedClinicalData(caseItem = {}) {
  const repaired = { ...caseItem };
  const movedToInvestigations = [];
  const movedToExam = [];

  const chief = normalizeClinicalDatumText(repaired.chiefComplaint || repaired.patientIntro?.presentation || '').replace(/[.]$/u, '');
  if (chief && (isLabResult(chief) || isImagingFinding(chief) || isPhysicalExamFinding(chief))) {
    if (isPhysicalExamFinding(chief)) movedToExam.push(chief);
    else movedToInvestigations.push(chief);
    const fallbackChief = [repaired.patientIntro?.presentation, repaired.title, repaired.stem]
      .find((item) => item && isChiefComplaint(item));
    repaired.chiefComplaint = fallbackChief ? normalizeClinicalDatumText(fallbackChief).replace(/[.]$/u, '') : 'Klinik değerlendirme gerektiren başvuru';
  } else if (chief) {
    repaired.chiefComplaint = chief;
  }

  const originalExamItems = [...asTextArray(repaired.exam), ...asTextArray(repaired.findings?.exam)];
  const exam = originalExamItems
    .map(normalizeClinicalDatumText)
    .filter(Boolean)
    .filter((finding) => {
      if (isInvestigationResult(finding)) {
        movedToInvestigations.push(finding);
        return false;
      }
      return true;
    });
  if (exam.length || movedToExam.length || originalExamItems.length) {
    repaired.exam = uniqueItems([...exam, ...movedToExam], 8).map((item) => `${item.replace(/[.]$/u, '')}.`);
  }

  const existingInvestigations = Array.isArray(repaired.investigations) ? repaired.investigations : Array.isArray(repaired.findings?.investigations) ? repaired.findings.investigations : [];
  repaired.investigations = existingInvestigations.map((investigation, index) => ({
    ...investigation,
    label: normalizeClinicalDatumText(investigation?.label || investigation?.name || `Tetkik ${index + 1}`).replace(/[.]$/u, ''),
    summary: normalizeClinicalDatumText(investigation?.summary || investigation?.result || investigation?.interpretation || ''),
    findings: Array.isArray(investigation?.findings) ? uniqueItems(investigation.findings, 5) : investigation?.findings,
  }));
  if (movedToInvestigations.length) {
    repaired.investigations.push({
      id: `field-placement-repair-${Date.now().toString(36)}`,
      label: movedToInvestigations.some(isImagingFinding) ? 'Hedefli görüntüleme/laboratuvar' : 'Hedefli laboratuvar',
      type: movedToInvestigations.some(isImagingFinding) ? 'Imaging' : 'Lab',
      priority: 'Useful',
      summary: normalizeClinicalDatumText(movedToInvestigations.join(' ')),
      findings: uniqueItems(movedToInvestigations, 4),
    });
  }

  const riskContext = asTextArray(repaired.patientIntro?.riskContext)
    .map(removeInlineFieldLabels)
    .filter((item) => item && !['lab', 'imaging', 'physicalExam', 'vital'].includes(classifyClinicalDatum(item)));

  const currentClues = asTextArray(repaired.patientIntro?.distinctiveClues)
    .map(normalizeClinicalDatumText)
    .filter(Boolean);
  const semanticClues = buildSemanticDistinctiveClues({ ...repaired, patientIntro: { ...(repaired.patientIntro || {}), distinctiveClues: currentClues } }, 4);
  const clues = uniqueItems([...currentClues, ...semanticClues], 4);

  repaired.patientIntro = {
    ...(repaired.patientIntro || {}),
    presentation: repaired.chiefComplaint || repaired.patientIntro?.presentation || repaired.title,
    riskContext: uniqueItems(riskContext, 3),
    distinctiveClues: clues.length >= 3 ? clues : semanticClues,
    historySummary: normalizeClinicalDatumText(repaired.patientIntro?.historySummary || repaired.stem || '').replace(/[.]$/u, '.'),
  };

  repaired.evidenceChain = repairEvidenceChainItems(repaired.evidenceChain || repaired.diagnosis?.answerFeedback?.evidenceChain || [], repaired, 5);
  if (repaired.diagnosis?.answerFeedback) {
    repaired.diagnosis = {
      ...repaired.diagnosis,
      answerFeedback: {
        ...repaired.diagnosis.answerFeedback,
        evidenceChain: repairEvidenceChainItems(repaired.diagnosis.answerFeedback.evidenceChain || repaired.evidenceChain, repaired, 5),
      },
    };
  }

  if (repaired.findings) {
    repaired.findings = {
      ...repaired.findings,
      exam: repaired.exam || repaired.findings.exam || [],
      investigations: repaired.investigations,
    };
  }

  return repaired;
}
