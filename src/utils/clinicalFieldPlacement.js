import { sanitizeMeasurementText } from './clinicalFormatters.js';
import { normalizeMedicalTurkish } from './editorialQuality.js';

export const INLINE_FIELD_LABEL_REGEX = /^\s*(başvuru\s+yakınması|başvuru|şikayet|şikâyet|karar\s+verdirici\s+ipucu|destekleyici\s+kanıt|olgu\s+verisi|ek\s+destek|laboratuvar\s+paterni|laboratuvar\s+bulgusu|görüntüleme\s+bulgusu|fizik\s+muayene\s+bulgusu|muayene\s+bulgusu|tetkik\s+sonucu|kanıt|ayırıcı\s+nokta|ayırt\s+ettirici\s+ipucu|klinik\s+not|uygun\s+aday|ilk\s+adım|ilk\s+basamak)\s*[:：|\-–—]+\s*/iu;

const LAB_REGEX = /\b(lökosit|lokosit|wbc|nötrofil|notrofil|lenfosit|trombosit|platelet|hemoglobin|hb\b|hematokrit|hct\b|crp|sedim|esr|prokalsitonin|troponin|ck-mb|ck\b|ldh|sodyum|na⁺|potasyum|k⁺|klor|kreatinin|üre|bun|glukoz|şeker|hba1c|ast\b|alp\b|ggt|bilirubin|albumin|inr|pt\b|aptt|ph\b|paco2|pao2|hco3|hco₃|bikarbonat|laktat|d-dimer|ferritin|b12|folat|tsh|serbest\s*t4|t3|t4|kortizol|acth|prolaktin|amh|fsh|lh|bos|hücre|eritrosit|keton|nitrit|lökosit\s+esteraz|hbsag|anti-hav|anti-hbc|anti-hcv|anti-hbs|vdrl|rpr|igg|igm|iga|kültür|kultur|pcr|gram\s+boyama)\b/iu;
const IMAGING_REGEX = /\b(akciğer\s+grafisi|grafi|röntgen|rontgen|direkt\s+grafi|bt|bilgisayarlı\s+tomografi|mr\b|mrg|manyetik\s+rezonans|usg|ultrasonografi|ekokardiyografi|eko\b|doppler|anjiyografi|kolonoskopi|endoskopi|görüntüleme|konsolidasyon|hava\s+bronkogramı|infiltrasyon|opasite|dolum\s+defekti|apandiks\s+çapı|safra\s+taşı|koroner\s+ektazi|lezyon\s+izlenir|görüntülenir)\b/iu;
const ECG_REGEX = /\b(ekg|ecg|st\s*(segment)?\s*(elevasyon|depresyon)|t\s*dalga|qrs|qt\s*uzaması|av\s*blok|atriyal\s+fibrilasyon|ventriküler\s+taşikardi|sinüs\s+ritmi)\b/iu;
const EXAM_REGEX = /\b(raller|ral\b|hışıltılı\s+solunum|hışıltı|stridor|üfürüm|murmur|oskültasyon|palpasyon|perküsyon|matite|defans|rebound|hassasiyet|ense\s+sertliği|kernig|brudzinski|kapiller\s+dolum|deri\s+turgoru|hepatosplenomegali|splenomegali|lenfadenopati|peteşi|purpura|döküntü|makül|papül|vezikül|ekimoz|ödem|eklem\s+şişliği|nörolojik\s+defisit|hemiparezi|pleji|kuvvet\s+kaybı|babinski|nabızlar\s+(alınıyor|palpabl)|periferik\s+nabız|batın\s+muayenesi|solunum\s+eforu|çekilme|retraksiyon|tripod\s+pozisyonu|salya\s+akması|boyun\s+ven\s+dolgunluğu|krepitasyon|deformite)\b/iu;
const VITAL_REGEX = /\b(ta\s*[:=]?\s*\d{2,3}\/?\d{2,3}|kan\s+basıncı|nabız|solunum\s+sayısı|spo2|spo₂|vücut\s+ısısı|ateş\s*[:=]?\s*\d|şok\s+indeksi|\d{2,3}\/\d{2,3}\s*mmhg|\d{2,3}\s*\/dk|%\s*\d{2,3}|\d{2}\.\d\s*°c)\b/iu;
const COMPLAINT_REGEX = /(ağrı|agrı|ateş|öksürük|oksuruk|nefes\s+darlığı|dispne|göğüs\s+ağrısı|yan\s+ağrısı|karın\s+ağrısı|kusma|ishal|bulantı|baş\s+ağrısı|baş\s+dönmesi|döküntü|nöbet|halsizlik|sarılık|idrar\s+yakınması|yanma|travma|düşme|kanama|balgam|kilo\s+kaybı|gece\s+terlemesi|çarpıntı|senkop|bayılma|güçsüzlük|emmede\s+azalma|emme\s+azalması|iştahsızlık|şişlik|yürüyememe|ödem|köpüklü\s+idrar|bulanık\s+görme|görme\s+azalması|hemiparezi|yakınma|reflü)/iu;
const NUMERIC_LAB_HINT_REGEX = /\b\d+[.,]?\d*\s*(mg\/dL|mg\/L|mmol\/L|mEq\/L|ng\/L|ng\/mL|pg\/mL|IU\/L|U\/L|\/mm³|x10\^?3\/µL|g\/dL|%)\b/iu;

function normalizeComparable(text = '') {
  return String(text || '').toLocaleLowerCase('tr').replace(/ı/g, 'i').replace(/[.,;:|()\[\]{}]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function removeInlineFieldLabels(text = '') {
  return String(text || '')
    .replace(INLINE_FIELD_LABEL_REGEX, '')
    .replace(/^\s*(başvuru\s+yakınması|laboratuvar|görüntüleme|fizik\s+muayene)\s*[:：|\-–—]+\s*/iu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isMetaLabel(text = '') {
  return INLINE_FIELD_LABEL_REGEX.test(String(text || ''));
}

function hasComplaintCue(text = '') {
  return COMPLAINT_REGEX.test(String(text || ''));
}

export function classifyClinicalDatum(text = '') {
  const cleaned = removeInlineFieldLabels(sanitizeMeasurementText(text));
  if (!cleaned) return 'empty';
  if (VITAL_REGEX.test(cleaned)) return 'vital';
  if (ECG_REGEX.test(cleaned)) return 'ecg';
  if (IMAGING_REGEX.test(cleaned)) return 'imaging';
  if (LAB_REGEX.test(cleaned) || NUMERIC_LAB_HINT_REGEX.test(cleaned)) return 'lab';
  if (EXAM_REGEX.test(cleaned)) return 'physicalExam';
  if (hasComplaintCue(cleaned)) return 'chiefComplaint';
  return 'history';
}

export const isChiefComplaint = (text = '') => classifyClinicalDatum(text) === 'chiefComplaint';
export const isPhysicalExamFinding = (text = '') => classifyClinicalDatum(text) === 'physicalExam';
export const isLabResult = (text = '') => classifyClinicalDatum(text) === 'lab';
export const isImagingFinding = (text = '') => classifyClinicalDatum(text) === 'imaging';
export const isInvestigationResult = (text = '') => ['lab', 'imaging', 'ecg'].includes(classifyClinicalDatum(text));

function sentenceClean(text = '') {
  let value = normalizeMedicalTurkish(sanitizeMeasurementText(removeInlineFieldLabels(text)))
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/[|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!value) return '';
  if (/^lökosit\s+\d{1,2}\.?$/iu.test(value) || /^lokosit\s+\d{1,2}\.?$/iu.test(value)) value = 'Nötrofil baskın lökositoz';
  value = value.replace(/\bsağ\s+ALT\b/giu, 'sağ alt').replace(/\bsol\s+ALT\b/giu, 'sol alt');
  value = value.replace(/[;:|]+$/u, '').trim();
  if (!value) return '';
  const capped = value.charAt(0).toLocaleUpperCase('tr') + value.slice(1);
  return capped.replace(/^PH\b/u, 'pH');
}

function compactClue(text = '') {
  const cleaned = sentenceClean(text).replace(/[.;]+$/u, '').trim();
  if (!cleaned) return '';
  const type = classifyClinicalDatum(cleaned);
  if (type === 'lab') {
    if (/lökosit|lokosit|nötrofil|notrofil/i.test(cleaned)) return 'Nötrofil baskın lökositoz';
    if (/crp/i.test(cleaned)) return 'Yüksek CRP ile inflamatuvar yanıt';
    return cleaned;
  }
  if (type === 'imaging') {
    if (/hava\s+bronkogramı|lobar\s+konsolidasyon|konsolidasyon/i.test(cleaned)) return 'Hava bronkogramı içeren lobar konsolidasyon';
    return cleaned;
  }
  if (type === 'ecg') return cleaned;
  if (type === 'physicalExam') return cleaned.replace(/\s+duyuluyor$/iu, '').replace(/\s+saptanıyor$/iu, '').trim();
  return cleaned;
}

function dedupeItems(items = [], max = 5) {
  const seen = new Set();
  const output = [];
  for (const item of items) {
    const cleaned = sentenceClean(item).replace(/[.;]+$/u, '').trim();
    if (!cleaned || cleaned.length < 5) continue;
    if (/^genel durum\s+(orta|iyi|kötü)$/iu.test(cleaned)) continue;
    const key = normalizeComparable(cleaned);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    output.push(cleaned);
    if (output.length >= max) break;
  }
  return output;
}

function hasSimilar(items = [], candidate = '') {
  const key = normalizeComparable(candidate);
  if (!key) return true;
  return items.some((item) => {
    const other = normalizeComparable(typeof item === 'string' ? item : [item?.label, item?.summary, item?.text].filter(Boolean).join(' '));
    return other.includes(key) || key.includes(other);
  });
}

function makeInvestigationFromDatum(text = '', index = 0) {
  const cleaned = sentenceClean(text).replace(/[.;]+$/u, '');
  const type = classifyClinicalDatum(cleaned);
  if (type === 'lab') {
    let summary = cleaned;
    if (/^lökosit\s+\d{1,2}$/iu.test(summary) || /^nötrofil\s+baskın\s+lökositoz$/iu.test(summary)) summary = 'Lökosit yüksekliği nötrofil baskın inflamatuvar yanıtı destekler.';
    return { id: `auto-field-lab-${index + 1}`, label: 'Hedefli laboratuvar değerlendirmesi', type: 'Lab', priority: 'Useful', summary, findings: [summary] };
  }
  if (type === 'imaging') {
    return { id: `auto-field-imaging-${index + 1}`, label: /akciğer|konsolidasyon|bronkogram/i.test(cleaned) ? 'Akciğer grafisi' : 'Hedefli görüntüleme', type: 'Imaging', priority: 'Useful', summary: cleaned, findings: [cleaned] };
  }
  if (type === 'ecg') {
    return { id: `auto-field-ecg-${index + 1}`, label: '12 derivasyon EKG', type: 'Ecg', priority: 'Useful', summary: cleaned, findings: [cleaned] };
  }
  return null;
}

function normalizeEvidenceItem(item = {}, index = 0) {
  const rawText = typeof item === 'string' ? item : item?.text || item?.summary || item?.title || '';
  const cleanedText = sentenceClean(rawText);
  const type = classifyClinicalDatum(cleanedText);
  const titleByType = { chiefComplaint: 'Başvuru yakınması', history: 'Öykü', physicalExam: 'Fizik muayene', lab: 'Laboratuvar', imaging: 'Görüntüleme', ecg: 'EKG', vital: 'Vital bulgu' };
  if (typeof item === 'string') return cleanedText;
  return { ...item, title: titleByType[type] || item.title || `Kanıt ${index + 1}`, text: cleanedText };
}

function normalizeArrayItems(items = []) {
  return items.map((item) => {
    if (typeof item === 'string') return sentenceClean(item);
    if (item && typeof item === 'object') {
      const out = { ...item };
      if (out.text) out.text = sentenceClean(out.text);
      if (out.summary) out.summary = sentenceClean(out.summary);
      if (out.title) out.title = sentenceClean(out.title).replace(/[.;]+$/u, '');
      return out;
    }
    return item;
  }).filter((item) => typeof item === 'string' ? Boolean(item) : Boolean(item));
}

function dedupeEvidenceItems(items = []) {
  const seen = new Set();
  const output = [];
  for (const item of items) {
    const text = typeof item === 'string' ? item : item?.text || '';
    const key = normalizeComparable(text);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    output.push(item);
    if (output.length >= 5) break;
  }
  return output;
}

function isAllowedPresentationText(text = '') {
  const type = classifyClinicalDatum(text);
  if (!text) return false;
  if (['lab', 'imaging', 'vital'].includes(type)) return false;
  if (type === 'physicalExam') return /(ağrı|ateş|baş|güçsüzlük|halsizlik|kusma|ishal|sarılık|idrar|şişlik|nefes|öksürük|kanama|yürüyememe|ödem|görme|hemiparezi|hassasiyet|uykuya\s+eğilim)/iu.test(text) && !/(yok|saptanmıyor|doğal|bilinç\s+açık)/iu.test(text);
  return true;
}

function normalizeChiefComplaint(question = {}) {
  const stemCandidates = String(question.stem || '').split(/[.!?]/).map(sentenceClean);
  const candidates = [question.chiefComplaint, question.patientIntro?.presentation, ...stemCandidates, question.title].map(sentenceClean).filter(Boolean);
  const picked = candidates.find(isAllowedPresentationText);
  return picked || sentenceClean(question.title || 'Klinik başvuru') || 'Klinik başvuru';
}


function isClinicalClueCandidate(text = '') {
  const cleaned = sentenceClean(text);
  if (!cleaned || cleaned.length < 8 || cleaned.length > 150) return false;
  if (/(yanlış seçenek|doğru seçenek|uygun yanıt|klinik not|uygun aday|rutin antibiyotik|hiperbarik oksijen|periton diyalizi|görüntüleme öncelik|riskini azaltır|riski artar|tedavi gecikirse|temel tedavisi değildir|öncelik hava yolu|tedavi değildir|seçeneğidir)/iu.test(cleaned)) return false;
  return true;
}

function repairPatientIntro(question = {}) {
  const intro = { ...(question.patientIntro || {}) };
  const chiefComplaint = normalizeChiefComplaint(question);
  const currentClues = Array.isArray(intro.distinctiveClues) ? intro.distinctiveClues : [];
  const evidenceClues = Array.isArray(question.evidenceChain) ? question.evidenceChain.map((item) => typeof item === 'string' ? item : item?.text) : [];
  const sourceClues = [...currentClues, ...evidenceClues].filter(isClinicalClueCandidate).map(compactClue).filter(Boolean);
  const fallbackClues = [chiefComplaint, ...(Array.isArray(question.exam) ? question.exam : []), ...(question.investigations || []).map((item) => item.summary || item.label)].filter(isClinicalClueCandidate).map(compactClue).filter(Boolean);
  const clues = dedupeItems([...fallbackClues, ...sourceClues], 5);
  const presentationCandidate = sentenceClean(intro.presentation || chiefComplaint);
  const presentationType = classifyClinicalDatum(presentationCandidate);
  const safePresentation = ['lab', 'imaging', 'vital'].includes(presentationType) ? chiefComplaint : presentationCandidate;
  const historyCandidate = sentenceClean(intro.historySummary || question.stem || '');
  const safeHistory = ['lab', 'imaging', 'vital'].includes(classifyClinicalDatum(historyCandidate)) ? sentenceClean(question.stem || chiefComplaint) : historyCandidate;
  const result = {
    ...intro,
    presentation: safePresentation,
    riskContext: dedupeItems(Array.isArray(intro.riskContext) ? intro.riskContext : [], 3),
    distinctiveClues: clues.length >= 3 ? clues : dedupeItems([...clues, chiefComplaint], 4),
    historySummary: safeHistory,
    priorityFocus: '',
  };
  const firstClue = (result.distinctiveClues || [])[0] || chiefComplaint;
  result.priorityFocus = firstClue ? `${firstClue.replace(/[.;]+$/u, '')} klinik kararı yönlendirir.` : '';
  return result;
}


function isObjectiveInvestigationItem(item = {}) {
  const label = String(item.label || item.name || '').toLocaleLowerCase('tr');
  const typeLabel = String(item.type || '').toLocaleLowerCase('tr');
  const body = [item.summary, ...(Array.isArray(item.findings) ? item.findings : []), JSON.stringify(item.rows || '')].join(' ');
  if (Array.isArray(item.rows) && item.rows.length) return true;
  if (/(tedavi|öncelik|riskini azaltır|riskini artırır|değildir|uygun aday|klinik not|cerrahi öncesi)/iu.test(body)) return false;
  const datumType = classifyClinicalDatum(body || label);
  if (['lab', 'imaging', 'ecg', 'vital'].includes(datumType)) return true;
  return /(lab|kan|biyokimya|hemogram|seroloji|kültür|pcr|grafi|bt|mr|usg|eko|ekg|ecg|röntgen)/iu.test(`${label} ${typeLabel}`) && body.length > 8;
}

export function repairMisplacedClinicalData(caseItem = {}) {
  const repaired = { ...caseItem };
  repaired.title = sentenceClean(repaired.title || '');
  repaired.chiefComplaint = normalizeChiefComplaint(repaired);
  repaired.stem = sentenceClean(repaired.stem || '');
  repaired.clinicalFocus = sentenceClean(repaired.clinicalFocus || '');
  if (Object.prototype.hasOwnProperty.call(repaired, 'learningTarget')) repaired.learningTarget = sentenceClean(repaired.learningTarget || '');

  const movedInvestigations = [];
  const normalizedExam = [];
  (Array.isArray(repaired.exam) ? repaired.exam : []).forEach((item) => {
    const cleaned = sentenceClean(item);
    const type = classifyClinicalDatum(cleaned);
    if (['lab', 'imaging', 'ecg'].includes(type)) {
      const investigation = makeInvestigationFromDatum(cleaned, movedInvestigations.length);
      if (investigation) movedInvestigations.push(investigation);
    } else if (cleaned) normalizedExam.push(cleaned);
  });
  repaired.exam = dedupeItems(normalizedExam, 8);

  repaired.investigations = (Array.isArray(repaired.investigations) ? repaired.investigations : []).map((item, index) => ({
    ...item,
    label: sentenceClean(item.label || item.name || `Tetkik ${index + 1}`).replace(/[.;]+$/u, ''),
    summary: sentenceClean(item.summary || item.result || item.interpretation || ''),
    findings: normalizeArrayItems(item.findings || []),
    rows: Array.isArray(item.rows) ? item.rows.map((row) => Array.isArray(row) ? row.map((cell) => typeof cell === 'string' ? sanitizeMeasurementText(removeInlineFieldLabels(cell)).trim() : cell) : row) : item.rows,
  })).filter(isObjectiveInvestigationItem);
  movedInvestigations.forEach((item) => { if (!hasSimilar(repaired.investigations, item.summary)) repaired.investigations.push(item); });

  repaired.patientIntro = repairPatientIntro(repaired);
  if (!repaired.patientIntro.riskContext?.length) repaired.patientIntro.riskContext = ['Başvuru bağlamı komplikasyon ve aciliyet açısından değerlendirilir.'];

  const answerFeedback = repaired.diagnosis?.answerFeedback;
  if (answerFeedback) {
    const evidenceChain = Array.isArray(answerFeedback.evidenceChain) ? dedupeEvidenceItems(answerFeedback.evidenceChain.map(normalizeEvidenceItem).filter((item) => typeof item === 'string' ? Boolean(item) : Boolean(item?.text))) : answerFeedback.evidenceChain;
    repaired.diagnosis = { ...(repaired.diagnosis || {}), answerFeedback: { ...answerFeedback, evidenceChain, pearls: normalizeArrayItems(answerFeedback.pearls || []), clinicalPearls: normalizeArrayItems(answerFeedback.clinicalPearls || []), managementSteps: normalizeArrayItems(answerFeedback.managementSteps || []) } };
    if (repaired.diagnosis.explanation) repaired.diagnosis.explanation = sentenceClean(repaired.diagnosis.explanation);
  }
  if (Array.isArray(repaired.evidenceChain)) repaired.evidenceChain = dedupeEvidenceItems(repaired.evidenceChain.map((item, index) => normalizeEvidenceItem(item, index)));
  if (repaired.findings) {
    repaired.findings = { ...repaired.findings, history: normalizeArrayItems(repaired.findings.history || []), exam: normalizeArrayItems(repaired.findings.exam || []).filter((item) => !['lab', 'imaging', 'ecg'].includes(classifyClinicalDatum(item))), investigations: repaired.investigations };
  }
  return repaired;
}

export function validateClinicalFieldPlacement(caseItem = {}) {
  const errors = [];
  const warnings = [];
  const checkInline = (value, path) => {
    const text = typeof value === 'string' ? value : value?.text || value?.summary || '';
    if (isMetaLabel(text)) errors.push(`${path}: inline alan etiketi içeriyor`);
  };
  [caseItem.chiefComplaint, caseItem.patientIntro?.presentation].forEach((value, index) => {
    const type = classifyClinicalDatum(value || '');
    const raw = String(value || '');
    const physicalPresentationAllowed = type === 'physicalExam' && /(ağrı|ateş|baş|güçsüzlük|halsizlik|kusma|ishal|sarılık|idrar|şişlik|nefes|öksürük|kanama|yürüyememe|ödem|görme|hemiparezi|hassasiyet|uykuya\s+eğilim)/iu.test(raw) && !/(yok|saptanmıyor|doğal|bilinç\s+açık)/iu.test(raw);
    const imagingPresentationAllowed = type === 'imaging' && /(yakınma|reflü|nedeniyle|ağrı|tarama)/iu.test(raw);
    if ((['lab', 'vital'].includes(type) || (type === 'imaging' && !imagingPresentationAllowed) || (type === 'physicalExam' && !physicalPresentationAllowed))) errors.push(`${index === 0 ? 'chiefComplaint' : 'patientIntro.presentation'} yanlış veri türü içeriyor: ${type}`);
    checkInline(value, index === 0 ? 'chiefComplaint' : 'patientIntro.presentation');
  });
  (Array.isArray(caseItem.exam) ? caseItem.exam : []).forEach((item, index) => {
    const type = classifyClinicalDatum(item);
    checkInline(item, `exam[${index}]`);
    if (['lab', 'imaging', 'ecg'].includes(type)) errors.push(`exam[${index}] tetkik/görüntüleme verisi içeriyor`);
  });
  (Array.isArray(caseItem.patientIntro?.riskContext) ? caseItem.patientIntro.riskContext : []).forEach((item, index) => checkInline(item, `patientIntro.riskContext[${index}]`));
  (Array.isArray(caseItem.patientIntro?.distinctiveClues) ? caseItem.patientIntro.distinctiveClues : []).forEach((item, index) => {
    checkInline(item, `patientIntro.distinctiveClues[${index}]`);
    if (/^lökosit\s+\d{1,2}\.?$/iu.test(removeInlineFieldLabels(item))) errors.push(`patientIntro.distinctiveClues[${index}] eksik laboratuvar ifadesi içeriyor`);
  });
  const evidence = caseItem.evidenceChain || caseItem.diagnosis?.answerFeedback?.evidenceChain || [];
  (Array.isArray(evidence) ? evidence : []).forEach((item, index) => {
    const text = typeof item === 'string' ? item : item?.text || '';
    checkInline(text, `evidenceChain[${index}]`);
    if (/^lökosit\s+\d{1,2}\.?$/iu.test(removeInlineFieldLabels(text))) errors.push(`evidenceChain[${index}] eksik laboratuvar ifadesi içeriyor`);
    if (typeof item === 'object' && item?.title) {
      const title = normalizeComparable(item.title);
      const type = classifyClinicalDatum(text);
      if (title.includes('laboratuvar') && type === 'physicalExam') errors.push(`evidenceChain[${index}] fizik muayene bulgusu laboratuvar başlığı altında`);
      if (title.includes('ekg') && type !== 'ecg') warnings.push(`evidenceChain[${index}] EKG başlığı altında beklenmeyen veri türü: ${type}`);
      if (title.includes('başvuru') && ['lab', 'imaging', 'physicalExam', 'vital'].includes(type)) errors.push(`evidenceChain[${index}] başvuru başlığı altında ${type} verisi`);
    }
  });
  if ((caseItem.patientIntro?.distinctiveClues || []).length > 5) warnings.push('ayırt ettirici ipuçları 5 maddeden fazla');
  return { ok: errors.length === 0, errors: Array.from(new Set(errors)), warnings: Array.from(new Set(warnings)) };
}
