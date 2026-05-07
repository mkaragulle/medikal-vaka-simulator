const INLINE_LABEL_PATTERN = /^(başvuru\s+yakınması|başvuru|karar\s+verdirici\s+ipucu|destekleyici\s+kanıt|olgu\s+verisi|ek\s+destek|laboratuvar\s+paterni|görüntüleme\s+bulgusu|fizik\s+muayene\s+bulgusu|muayene\s+bulgusu|klinik\s+ipucu|destekleyen\s+bulgu|ekg\s+bulgu\s+örüntüsü|sınav\s+bilgisi|sınav\s+incisi|sınav\s+notu|ayırt\s+ettirici\s+ipucu|ayırt\s+ettirici\s+bulgu|kritik\s+ipucu|ana\s+kanıt|tanısal\s+ayrım|klinik\s+patern|mekanizma\s+özeti|klinik\s+not|sık\s+tuzak|etken[-\s]?test\s+ayrımı)\s*[:：\-–—]\s*/iu;

const UNIT_PATTERN = /\b(ng\/l|ng\/ml|pg\/ml|mg\/dl|mg\/l|mmol\/l|meq\/l|iu\/l|u\/l|g\/dl|mmhg|\/mm3|\/mm³|x10\^?3\/µ?l|µiu\/ml|bpm|dk|°c|%)\b/iu;
const LAB_KEYWORDS = /\b(lökosit|lokosit|wbc|nötrofil|notrofil|lenfosit|hemoglobin|\bhb\b|hematokrit|platelet|trombosit|crp|prokalsitonin|troponin|ck-mb|ck\s?mb|kreatinin|üre|glukoz|kan\s+şekeri|sodyum|potasyum|kalsiyum|bilirubin|amilaz|lipaz|d-dimer|ddimer|aptt|fibrinojen|ph|pco2|po2|hco3|baz\s+açığı|laktat|keton|proteinüri|hematüri|nitrit|lökosit\s+esteraz|bos|beyin\s+omurilik|seroloji|anti[-\s][a-z0-9]+|igg|igm|iga|ige|hbsag|anti-hbs|anti-hcv|hcv\s+rna|hbv\s+dna|hiv|pcr|kültür|kultur|gram|hormon|tsh|t3|t4|kortizol|acth|beta[-\s]?hcg|β[-\s]?hcg|ferritin|demir|transferrin|tibc|hba1c)\b/iu;
const IMAGING_KEYWORDS = /\b(akciğer\s+grafisi|grafi|röntgen|rontgen|x-ray|bt|tomografi|mr|mrg|manyetik\s+rezonans|ultrasonografi|ultrason|usg|eko|ekokardiyografi|doppler|anjiyografi|sintigrafi|pet[-\s]?ct|konsolidasyon|hava\s+bronkogramı|infiltrasyon|opasite|atelektazi|pnömotoraks|effüzyon|efüzyon|apandiks\s+çapı|iskemik\s+lezyon|safra\s+taşı|hidronefroz|kitle|nodül)\b/iu;
const ECG_KEYWORDS = /\b(ekg|st\s*(segment)?\s*(elevasyonu|depresyonu)|pr\s*depresyonu|qt\s*uzaması|qrs|t\s*dalga|av\s*blok|ritim|fibrilasyon|taşikardi|bradikardi)\b/iu;
const PHYSICAL_EXAM_KEYWORDS = /\b(ral|raller|ronküs|ronkus|wheezing|hışıltı|hışıltılı|stridor|solunum\s+ses|defans|rebound|hassasiyet|palpasyon|perküsyon|oskültasyon|üfürüm|ufurum|ense\s+sertliği|kernig|brudzinski|döküntü|makül|papül|püstül|vezikül|purpura|peteşi|eklem\s+şişliği|şişlik|ödem|nörolojik\s+defisit|hemiparezi|parezi|pleji|duyu\s+kaybı|refleks|babinski|nistagmus|kapiller\s+dolum|deri\s+turgoru|turgor|hepatosplenomegali|hepatomegali|splenomegali|lenfadenopati|nabızlar?\s+(alınıyor|palpabl|zayıf)|periferik\s+nabız|batında|karında|sağ\s+alt\s+zonda|sol\s+alt\s+zonda|duyulur|saptanır|izleniyor|gözlenir|muayenede)\b/iu;
const VITAL_KEYWORDS = /\b(kan\s+basıncı|tansiyon|nabız|solunum\s+sayısı|solunum|spo2|spo₂|oksijen\s+saturasyonu|ateş|vücut\s+sıcaklığı)\b/iu;
const SHORT_LAB_RESULT_PATTERN = /\b(AST|ALT|ALP|GGT|LDH|BUN|PT|INR|Hb|Na|K|Ca|Cl|Mg)\b\s*[:=]?\s*\d/iu;
const CHIEF_COMPLAINT_KEYWORDS = /\b(öksürük|oksuruk|ateş|nefes\s+darlığı|dispne|göğüs\s+ağrısı|gogus\s+agrisi|karın\s+ağrısı|kusma|ishal|baş\s+dönmesi|baş\s+ağrısı|baş\s+agrısı|döküntü|nöbet|halsizlik|sarılık|idrar\s+yakınması|dizüri|travma|ağrı|yan\s+ağrısı|çarpıntı|senkop|bayılma|bilinç|dalgınlık|uykuya\s+eğilim|güçsüzlük|hemiparezi|uyuşma|bulanık\s+görme|çift\s+görme|kanama|hematemez|melena|balgam|boğaz\s+ağrısı|yutma\s+güçlüğü|kaşıntı|şişlik)\b/iu;

function normalizeForMatch(text = '') {
  return String(text || '')
    .toLocaleLowerCase('tr')
    .replace(/[İIı]/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/\s+/g, ' ')
    .trim();
}

function plainText(value = '') {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(plainText).filter(Boolean).join(' ');
  if (typeof value === 'object') return [value.label, value.title, value.text, value.summary, value.result, value.description, value.interpretation]
    .map(plainText)
    .filter(Boolean)
    .join(' ');
  return String(value || '');
}

function cloneCaseLike(value) {
  if (Array.isArray(value)) return value.map(cloneCaseLike);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneCaseLike(entry)]));
  }
  return value;
}

export function isMetaLabel(text = '') {
  return INLINE_LABEL_PATTERN.test(String(text || '').trim());
}

export function removeInlineFieldLabels(text = '') {
  let value = String(text || '')
    .replace(/^[\s•*\-–—]+/u, '')
    .replace(INLINE_LABEL_PATTERN, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
  let previous = '';
  while (previous !== value) {
    previous = value;
    value = value.replace(INLINE_LABEL_PATTERN, '').trim();
  }
  return value;
}

export function normalizeObjectiveMeasurement(text = '') {
  let value = removeInlineFieldLabels(text)
    .replace(/\bLökosit\s*[:=]?\s*(\d{1,2})(?![\d.,])/giu, (_, n) => `Lökosit ${Number(n).toLocaleString('tr-TR')}.000/mm³`)
    .replace(/\bLokosit\s*[:=]?\s*(\d{1,2})(?![\d.,])/giu, (_, n) => `Lökosit ${Number(n).toLocaleString('tr-TR')}.000/mm³`)
    .replace(/\bWBC\s*[:=]?\s*(\d{1,2})(?![\d.,])/giu, (_, n) => `WBC ${Number(n).toLocaleString('tr-TR')}.000/mm³`)
    .replace(/\bCRP\s*[:=]?\s*(\d{1,3})(?![\d.,]\s*mg)/giu, 'CRP $1 mg/L')
    .replace(/\bTroponin\s*[:=]?\s*(\d+(?:[.,]\d+)?)(?!\s*(?:ng\/L|ng\/mL))/giu, 'Troponin $1 ng/L')
    .replace(/\bpH\s*[:=]?\s*(\d)\s*[,.]\s*(\d+)/giu, 'pH $1,$2')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();

  value = value.replace(/\bmm3\b/giu, 'mm³').replace(/\bmm\^3\b/giu, 'mm³');
  return value;
}

export function isLabResult(text = '') {
  const value = removeInlineFieldLabels(text);
  return LAB_KEYWORDS.test(value) || SHORT_LAB_RESULT_PATTERN.test(value) || UNIT_PATTERN.test(value) || /\b(?:Na|K|Ca|Cl|Mg)\+?\s*[:=]?\s*\d/iu.test(value) || /\b\d+(?:[.,]\d+)?\s*(mg|ng|pg|mmol|meq|iu|u|g)\b/iu.test(value);
}

export function isImagingFinding(text = '') {
  const value = removeInlineFieldLabels(text);
  return IMAGING_KEYWORDS.test(value) || ECG_KEYWORDS.test(value);
}

export function isPhysicalExamFinding(text = '') {
  const value = removeInlineFieldLabels(text);
  if (isLabResult(value) || isImagingFinding(value)) return false;
  return PHYSICAL_EXAM_KEYWORDS.test(value);
}

export function isChiefComplaint(text = '') {
  const value = removeInlineFieldLabels(text);
  if (!value) return false;
  if (/semptom\s+süresi|risk\s+faktörleri|eşlik\s+eden\s+yakınmalar|öyküde\s+netleştirilir|klinik\s+başvuru/iu.test(value)) return false;
  if (isLabResult(value) || isImagingFinding(value) || isPhysicalExamFinding(value)) return false;
  if (VITAL_KEYWORDS.test(value) && /\d/.test(value)) return false;
  return CHIEF_COMPLAINT_KEYWORDS.test(value) || /nedeniyle\s+başvur|tarif\s+eder|şikayet|yakınma/iu.test(value);
}

export function isInvestigationResult(text = '') {
  return isLabResult(text) || isImagingFinding(text);
}

export function classifyClinicalDatum(text = '') {
  const cleaned = removeInlineFieldLabels(plainText(text));
  if (!cleaned) return 'empty';
  if (isMetaLabel(text)) return 'metaLabel';
  if (isLabResult(cleaned)) return 'lab';
  if (isImagingFinding(cleaned)) return ECG_KEYWORDS.test(cleaned) ? 'ecg' : 'imaging';
  if (VITAL_KEYWORDS.test(cleaned) && /\d/.test(cleaned)) return 'vital';
  if (isPhysicalExamFinding(cleaned)) return 'physicalExam';
  if (isChiefComplaint(cleaned)) return 'chiefComplaint';
  if (/öykü|temas|risk|kullanım|ameliyat|travma|başvur/iu.test(cleaned)) return 'history';
  return 'unknown';
}

function toStringArray(value) {
  if (Array.isArray(value)) return value.map(plainText).map(removeInlineFieldLabels).filter(Boolean);
  if (typeof value === 'string' && value.trim()) return [removeInlineFieldLabels(value)];
  return [];
}

function uniqueTexts(items = [], max = Infinity) {
  const seen = new Set();
  const output = [];
  items.forEach((item) => {
    const cleaned = normalizeObjectiveMeasurement(removeInlineFieldLabels(plainText(item)))
      .replace(/\s+/g, ' ')
      .replace(/[\s,;:]+$/u, '')
      .trim();
    if (!cleaned || cleaned.length < 3) return;
    const key = normalizeForMatch(cleaned);
    if (seen.has(key)) return;
    seen.add(key);
    output.push(cleaned);
  });
  return output.slice(0, max);
}

function hasEquivalentText(items = [], candidate = '') {
  const key = normalizeForMatch(candidate);
  if (!key) return false;
  return items.some((item) => normalizeForMatch(plainText(item)).includes(key) || key.includes(normalizeForMatch(plainText(item))));
}

function investigationTextBundle(investigations = []) {
  return investigations.map(plainText).join(' | ');
}

function buildInvestigationFromMisplaced(text = '', category = 'lab', index = 0) {
  const normalized = normalizeObjectiveMeasurement(text);
  const isEcg = category === 'ecg' || ECG_KEYWORDS.test(normalized);
  const isImaging = category === 'imaging' || isEcg;
  return {
    id: `field-repair-${isEcg ? 'ecg' : isImaging ? 'imaging' : 'lab'}-${index + 1}`,
    label: isEcg ? 'EKG bulgusu' : isImaging ? 'Görüntüleme bulgusu' : 'Laboratuvar bulgusu',
    type: isEcg ? 'Ecg' : isImaging ? 'Imaging' : 'Lab',
    priority: 'Useful',
    summary: normalized,
    findings: [normalized],
    interpretation: 'Objektif sonuç öykü ve muayene bulgularıyla birlikte yorumlanır.',
  };
}

function cluePhrase(text = '') {
  const normalized = normalizeObjectiveMeasurement(text).replace(/[.]+$/u, '');
  const type = classifyClinicalDatum(normalized);
  if (type === 'lab') {
    if (/lökosit|lokosit|wbc/iu.test(normalized) && /nötrofil|notrofil/iu.test(normalized)) return 'Nötrofil baskın lökositoz';
    if (/lökosit|lokosit|wbc/iu.test(normalized)) return normalized.replace(/\s+ile.*$/iu, '');
    if (/crp/iu.test(normalized)) return normalized;
    if (/ph|baz\s+açığı|laktat/iu.test(normalized)) return normalized;
    return normalized;
  }
  if (type === 'imaging' || type === 'ecg') {
    if (/hava\s+bronkogramı|konsolidasyon/iu.test(normalized)) return 'Hava bronkogramı içeren lobar konsolidasyon';
    if (/st\s*(segment)?\s*elevasyonu/iu.test(normalized)) return normalized;
    return normalized;
  }
  return normalized;
}


function joinComplaintFragments(fragments = []) {
  const clean = uniqueTexts(fragments, 4);
  if (clean.length <= 1) return clean[0] || '';
  return `${clean.slice(0, -1).join(', ')} ve ${clean[clean.length - 1]}`;
}

function extractComplaintPhrase(text = '') {
  const cleaned = normalizeObjectiveMeasurement(text).replace(/[.]+$/u, '').trim();
  if (!cleaned) return '';
  if (/perkütan\s+yaralanma|iğne\s+batması|kesici[-\s]delici\s+yaralanma/iu.test(cleaned)) {
    if (/iğne\s+batması/iu.test(cleaned)) return 'İğne batması sonrası perkütan yaralanma';
    return 'Perkütan yaralanma';
  }
  if (/nefrotik\s+düzeyde\s+proteinüri|proteinüri/iu.test(cleaned) && /ödem|şişlik|idrar/iu.test(cleaned)) {
    return 'Köpüklü idrar ve bacaklarda şişlik';
  }
  if (/akut\s+hemiparezi|ani\s+başlayan[^.]{0,80}(güçsüzlük|hemiparezi)/iu.test(cleaned)) {
    const match = cleaned.match(/ani\s+başlayan[^.]{0,80}(?:güçsüzlük|hemiparezi)/iu);
    if (match?.[0]) return match[0];
    return 'Ani başlayan tek taraflı güçsüzlük';
  }
  const fragments = cleaned
    .split(/,\s+|;\s+|\s+ve\s+/u)
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => CHIEF_COMPLAINT_KEYWORDS.test(part) && !isInvestigationResult(part) && !isPhysicalExamFinding(part));
  return joinComplaintFragments(fragments);
}

function extractChiefComplaintFromSources(item = {}) {
  const sources = [
    item.chiefComplaint,
    item.patientIntro?.presentation,
    item.title,
    ...(toStringArray(item.findings?.history || item.history)),
    item.stem,
  ];
  for (const source of sources) {
    const fragments = String(plainText(source) || '')
      .split(/[.;]\s+|;|\|/u)
      .map(removeInlineFieldLabels)
      .filter(Boolean);
    for (const fragment of fragments) {
      if (isChiefComplaint(fragment)) return fragment.replace(/[.]+$/u, '.');
      const partial = extractComplaintPhrase(fragment);
      if (partial && isChiefComplaint(partial)) return partial.replace(/[.]+$/u, '.');
    }
  }
  return '';
}

function repairTextObject(value) {
  if (typeof value === 'string') return normalizeObjectiveMeasurement(value);
  if (Array.isArray(value)) return value.map(repairTextObject);
  if (value && typeof value === 'object') {
    const copy = { ...value };
    ['label', 'title', 'text', 'summary', 'result', 'description', 'interpretation'].forEach((key) => {
      if (typeof copy[key] === 'string') copy[key] = normalizeObjectiveMeasurement(copy[key]);
    });
    if (Array.isArray(copy.findings)) copy.findings = uniqueTexts(copy.findings);
    if (Array.isArray(copy.rows)) {
      copy.rows = copy.rows.map((row) => Array.isArray(row) ? row.map((cell) => typeof cell === 'string' ? normalizeObjectiveMeasurement(cell) : cell) : repairTextObject(row));
    }
    return copy;
  }
  return value;
}

export function repairMisplacedClinicalData(caseItem = {}) {
  const repaired = cloneCaseLike(caseItem || {});
  repaired.patientIntro = { ...(repaired.patientIntro || {}) };
  repaired.findings = { ...(repaired.findings || {}) };

  const misplacedInvestigations = [];
  const additionalExam = [];
  const preservedHistory = [];

  const rawHistory = uniqueTexts([
    ...toStringArray(repaired.history),
    ...toStringArray(repaired.findings?.history),
  ]);
  rawHistory.forEach((item) => {
    const type = classifyClinicalDatum(item);
    if (type === 'lab' || type === 'imaging' || type === 'ecg') misplacedInvestigations.push({ text: item, type });
    else if (type === 'physicalExam') additionalExam.push(item);
    else preservedHistory.push(item);
  });

  const rawExam = uniqueTexts([
    ...toStringArray(repaired.exam),
    ...toStringArray(repaired.findings?.exam),
  ]);
  const cleanedExam = [];
  rawExam.forEach((item) => {
    const type = classifyClinicalDatum(item);
    if (type === 'lab' || type === 'imaging' || type === 'ecg') misplacedInvestigations.push({ text: item, type });
    else cleanedExam.push(item);
  });

  const rawRisk = uniqueTexts(toStringArray(repaired.patientIntro?.riskContext), 4)
    .filter((item) => !isMetaLabel(item));

  const clueSources = [
    ...toStringArray(repaired.patientIntro?.distinctiveClues),
    ...toStringArray(repaired.evidenceChain),
  ];
  const repairedClues = [];
  clueSources.forEach((item) => {
    const cleaned = normalizeObjectiveMeasurement(item);
    const type = classifyClinicalDatum(cleaned);
    if (type === 'lab' || type === 'imaging' || type === 'ecg') {
      misplacedInvestigations.push({ text: cleaned, type });
      repairedClues.push(cluePhrase(cleaned));
    } else if (type === 'physicalExam' || type === 'chiefComplaint' || type === 'history' || type === 'unknown') {
      repairedClues.push(cluePhrase(cleaned));
    }
  });

  repaired.investigations = Array.isArray(repaired.investigations) ? repaired.investigations.map(repairTextObject) : [];
  const existingInvestigationText = investigationTextBundle(repaired.investigations);
  uniqueTexts(misplacedInvestigations.map((item) => item.text)).forEach((text, index) => {
    if (!text || hasEquivalentText([existingInvestigationText], text)) return;
    const type = classifyClinicalDatum(text);
    repaired.investigations.push(buildInvestigationFromMisplaced(text, type, index));
  });

  repaired.exam = uniqueTexts([...cleanedExam, ...additionalExam]);
  repaired.findings.exam = repaired.exam;
  repaired.findings.history = preservedHistory.length ? preservedHistory : [];
  repaired.findings.investigations = repaired.investigations;

  if (repaired.chiefComplaint && !isChiefComplaint(repaired.chiefComplaint)) {
    const type = classifyClinicalDatum(repaired.chiefComplaint);
    if (type === 'lab' || type === 'imaging' || type === 'ecg') {
      if (!hasEquivalentText(repaired.investigations, repaired.chiefComplaint)) {
        repaired.investigations.push(buildInvestigationFromMisplaced(repaired.chiefComplaint, type, repaired.investigations.length));
      }
      repaired.chiefComplaint = '';
    }
  }
  const derivedComplaint = extractChiefComplaintFromSources(repaired);
  repaired.chiefComplaint = normalizeObjectiveMeasurement(repaired.chiefComplaint || derivedComplaint || repaired.patientIntro?.presentation || repaired.title || 'Klinik başvuru');
  if (!isChiefComplaint(repaired.chiefComplaint)) {
    const partialComplaint = extractComplaintPhrase(repaired.chiefComplaint) || extractComplaintPhrase(repaired.stem) || derivedComplaint;
    if (partialComplaint) repaired.chiefComplaint = normalizeObjectiveMeasurement(partialComplaint);
  }
  if (!isChiefComplaint(repaired.chiefComplaint) && derivedComplaint) repaired.chiefComplaint = normalizeObjectiveMeasurement(derivedComplaint);
  if (!repaired.findings.history.length && repaired.chiefComplaint) {
    repaired.findings.history = [repaired.chiefComplaint];
  }

  const presentationCandidate = repaired.patientIntro.presentation || repaired.chiefComplaint;
  repaired.patientIntro.presentation = isChiefComplaint(presentationCandidate)
    ? normalizeObjectiveMeasurement(presentationCandidate)
    : repaired.chiefComplaint;

  repaired.patientIntro.riskContext = uniqueTexts(rawRisk, 4);
  repaired.patientIntro.distinctiveClues = uniqueTexts(repairedClues, 4);
  if (!repaired.patientIntro.distinctiveClues.length) {
    repaired.patientIntro.distinctiveClues = uniqueTexts([
      repaired.chiefComplaint,
      ...repaired.exam.slice(0, 2),
      ...repaired.investigations.map((item) => cluePhrase(item.summary || item.findings?.[0] || item.label)).slice(0, 2),
    ], 4);
  }
  repaired.evidenceChain = Array.isArray(repaired.evidenceChain)
    ? uniqueTexts(repaired.evidenceChain.map(cluePhrase), 4)
    : repaired.evidenceChain;

  if (repaired.diagnosis?.answerFeedback?.evidenceChain) {
    repaired.diagnosis.answerFeedback.evidenceChain = repaired.diagnosis.answerFeedback.evidenceChain.map((entry) => {
      if (typeof entry === 'string') return cluePhrase(entry);
      return {
        ...entry,
        title: typeof entry.title === 'string' ? removeInlineFieldLabels(entry.title) : entry.title,
        text: typeof entry.text === 'string' ? normalizeObjectiveMeasurement(entry.text) : entry.text,
      };
    });
  }

  return repaired;
}

function checkWrongField(fieldName, value, disallowedTypes, errors) {
  toStringArray(value).forEach((item) => {
    const type = classifyClinicalDatum(item);
    if (isMetaLabel(item)) errors.push(`${fieldName} inline etiket içeriyor: ${item.slice(0, 80)}`);
    if (disallowedTypes.includes(type)) errors.push(`${fieldName} alanında ${type} verisi var: ${item.slice(0, 100)}`);
  });
}

export function validateClinicalFieldPlacement(caseItem = {}) {
  const errors = [];
  const warnings = [];
  checkWrongField('chiefComplaint', caseItem.chiefComplaint, ['lab', 'imaging', 'ecg', 'physicalExam', 'vital'], errors);
  checkWrongField('patientIntro.presentation', caseItem.patientIntro?.presentation, ['lab', 'imaging', 'ecg', 'physicalExam', 'vital'], errors);
  checkWrongField('findings.history', caseItem.findings?.history || caseItem.history, ['lab', 'imaging', 'ecg', 'physicalExam', 'vital'], errors);
  checkWrongField('exam', caseItem.exam || caseItem.findings?.exam, ['lab', 'imaging', 'ecg', 'vital'], errors);
  checkWrongField('patientIntro.riskContext', caseItem.patientIntro?.riskContext, ['lab', 'imaging', 'ecg', 'physicalExam', 'vital'], warnings);
  checkWrongField('patientIntro.distinctiveClues', caseItem.patientIntro?.distinctiveClues, ['vital'], errors);

  toStringArray(caseItem.patientIntro?.distinctiveClues).forEach((item) => {
    if (isMetaLabel(item)) errors.push(`Ayırt ettirici ipucunda inline etiket var: ${item.slice(0, 100)}`);
    if (/\b(lökosit|lokosit|wbc)\s+\d{1,2}\b/iu.test(item) && !/mm³|\/mm3|\/mm³/iu.test(item)) {
      errors.push(`Lökosit değeri birimsiz/eksik formatta: ${item.slice(0, 100)}`);
    }
  });

  const clues = toStringArray(caseItem.patientIntro?.distinctiveClues);
  if (clues.length > 5) warnings.push('Ayırt ettirici ipuçları 5 maddeden uzun; veri çöplüğü riski var');
  return { ok: errors.length === 0, errors: Array.from(new Set(errors)), warnings: Array.from(new Set(warnings)) };
}
