import { normalizeQuestionText } from './aiQuestionHistory.js';
import { attachQuestionDedupeFields, getQuestionCorrectText, toPlainText } from './questionDeduplication.js';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

export const highRiskClinicalRules = [
  { id: 'hyperkalemia-ecg-first-treatment', label: 'Hiperkalemi + EKG değişikliği', expectedFirstStep: 'İntravenöz kalsiyum glukonat' },
  { id: 'pulmonary-embolism-shock-risk', label: 'Pulmoner emboli + hipotansiyon/şok', expectedFirstStep: 'Yüksek risk / masif PE olarak sınıflandırma ve acil reperfüzyon değerlendirmesi' },
  { id: 'anaphylaxis-first-drug', label: 'Anafilaksi', expectedFirstStep: 'Adrenalin/epinefrin temelli acil yaklaşım' },
  { id: 'dka-potassium-first-step', label: 'DKA ve potasyum güvenliği', expectedFirstStep: 'Önce sıvı resüsitasyonu; insülin potasyuma göre' },
  { id: 'hypoglycemia-emergency', label: 'Hipoglisemi acil tedavisi', expectedFirstStep: 'Oral alamayan/bilinci kapalı hastada IV dekstroz veya glukagon' },
  { id: 'sepsis-shock-bundle', label: 'Sepsis / septik şok', expectedFirstStep: 'Kültür-laktat, erken antibiyotik ve 30 mL/kg kristaloid; gerekirse vazopressör' },
  { id: 'acs-stemi-reperfusion', label: 'STEMI / ACS', expectedFirstStep: 'Reperfüzyon stratejisi ve antitrombotik tedavi' },
  { id: 'stroke-before-thrombolysis', label: 'Akut inme', expectedFirstStep: 'Tromboliz/trombektomi değerlendirmesi öncesi kanamayı dışlayan görüntüleme' },
  { id: 'status-epilepticus-sequence', label: 'Status epileptikus', expectedFirstStep: 'Benzodiazepin; ardından ikinci basamak antiepileptik yükleme' },
  { id: 'meningitis-lp-antibiotic', label: 'Menenjit', expectedFirstStep: 'Ampirik antibiyotiği geciktirmeden başlama; BT/LP sırası kontrendikasyona göre' },
  { id: 'acute-asthma-copd-red-flags', label: 'Akut astım / KOAH alevlenmesi', expectedFirstStep: 'Oksijen, kısa etkili bronkodilatör, steroid ve ventilasyon desteği bağlama göre' },
  { id: 'thyroid-adrenal-crisis-sequence', label: 'Tirotoksik kriz / adrenal kriz', expectedFirstStep: 'Kriz tipine özgü sıralı acil tedavi ve steroid güvenliği' },
  { id: 'calcium-emergencies', label: 'Hiperkalsemi / hipokalsemi', expectedFirstStep: 'Semptom ve EKG durumuna göre acil kalsiyum/sıvı tedavisi' },
  { id: 'toxicology-antidotes', label: 'Zehirlenmeler ve antidotlar', expectedFirstStep: 'ABC stabilizasyonu ve toksine özgü antidot' },
  { id: 'obstetric-emergencies', label: 'Obstetrik aciller', expectedFirstStep: 'Anne stabilizasyonu ve obstetrik acile özgü ilk müdahale' },
  { id: 'pediatric-red-flags', label: 'Pediatrik aciller', expectedFirstStep: 'Yaşa/kiloya uygun resüsitasyon ve tedavi' },
  { id: 'forensic-ethical-duty', label: 'Adli / etik olgular', expectedFirstStep: 'Stabilizasyonla birlikte bildirim, güvenlik ve objektif kayıt yükümlülüğü' },
];

const FORBIDDEN_FEEDBACK_PATTERNS = [
  /klinik öncelik belirlenir/iu,
  /ayırt ettirici bulgular hedefe yönelik yorumlanır/iu,
  /bu seçenek bazı klinik durumlarda gündeme gelebilir/iu,
  /kanıt\s*[2-4]/iu,
  /laboratuvar paterni/iu,
  /patern baskındır/iu,
  /bu seçeneği tek başına yeterli kılmaz/iu,
  /objektif bulguların karar basamağını desteklemesi/iu,
  /doğru yanıta götüren ana bulgudur/iu,
  /ilk karar\.?/iu,
  /tedavi önceliği\.?/iu,
  /bu veri klinik bağlamda değerlendirilir/iu,
];

const SCORE_NAMES = ['PESI', 'Wells', 'CURB-65', 'CHA₂DS₂-VASc', 'CHA2DS2-VASc', 'HAS-BLED', 'Child-Pugh', 'MELD', 'APGAR', 'Bishop', 'Centor', 'Alvarado', 'Glasgow', 'Ranson'];

function normalizeTR(text = '') {
  return normalizeQuestionText(toPlainText(text))
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u');
}

function rawBundle(question = {}) {
  // Clinical trigger detection must use only pre-answer scenario data. Options and feedback are
  // intentionally excluded here; otherwise a distractor such as epinephrine can falsely trigger
  // anaphylaxis, or a PESI option can falsely define the PE scenario.
  return collectStrings({
    title: question.title,
    stem: question.stem,
    narrativeStem: question.narrativeStem,
    question: question.question,
    learningTarget: question.learningTarget,
    clinicalFocus: question.clinicalFocus,
    chiefComplaint: question.chiefComplaint,
    patientIntro: question.patientIntro,
    investigations: question.investigations,
    compactObjectiveData: question.compactObjectiveData,
    vitals: question.vitals,
    exam: question.exam,
    findings: question.findings,
  }).join(' | ');
}

function bundle(question = {}) {
  return normalizeTR(rawBundle(question));
}

function collectStrings(value, output = []) {
  if (typeof value === 'string') output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, output));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectStrings(item, output));
  return output;
}

function questionIntentText(question = {}) {
  return normalizeTR([
    question.question,
    question.learningTarget,
    question.clinicalFocus,
    question.diagnosis?.nextStep,
    question.spotPearl,
    question.questionType,
  ].filter(Boolean).join(' | '));
}

function asksFirstStep(question = {}) {
  const intent = questionIntentText(question);
  return /\bilk\b|\boncelikli\b|acil yaklasim|ilk basamak|ilk secenek|ilk yapilacak|hemen uygulan|ilk tedavi|en uygun ilk|acil tedaviye baslan|acil olarak/.test(intent);
}

function asksManagement(question = {}) {
  const intent = questionIntentText(question);
  return asksFirstStep(question) || /\b(tedavi|yaklasim|yonetim|mudahale|resusitasyon|stabilizasyon|ilac)\b/.test(intent);
}

function hasExplicitManagementIntent(question = {}) {
  const intent = questionIntentText(question);
  return String(question.questionType || '').toLowerCase() === 'treatment' || /\b(tedavi|yaklasim|yonetim|mudahale|resusitasyon|stabilizasyon|ilac|ilk|acil)\b/.test(intent);
}


function asksRiskOrScore(question = {}) {
  return /risk|siniflandirma|skor|score|pesi|wells|curb|class|sinif/.test(questionIntentText(question));
}

function optionMatches(optionText = '', patterns = []) {
  const normalized = normalizeTR(optionText);
  return patterns.some((pattern) => pattern.test(normalized));
}

function getOptions(question = {}) {
  const direct = Array.isArray(question.options) ? question.options : [];
  const fallback = !direct.length && Array.isArray(question.diagnosis?.options) ? question.diagnosis.options : [];
  return (direct.length ? direct : fallback)
    .map((option, index) => ({ id: String(option?.id || OPTION_IDS[index] || index + 1).toUpperCase(), text: String(option?.text || option || '').trim() }))
    .filter((option) => option.text);
}

function findOption(question = {}, patterns = []) {
  return getOptions(question).find((option) => optionMatches(option.text, patterns)) || null;
}

function findOptionId(question = {}, patterns = []) {
  return findOption(question, patterns)?.id || null;
}

function correctOptionText(question = {}) {
  const correctId = String(question.correctAnswer || '').toUpperCase();
  const byId = getOptions(question).find((option) => option.id === correctId)?.text || '';
  return [byId, getQuestionCorrectText(question), question.diagnosis?.correct].filter(Boolean).join(' | ');
}

function hasCorrectOptionMatching(question = {}, patterns = []) {
  return optionMatches(correctOptionText(question), patterns);
}

function extractNumericAfterLabels(text = '', labels = []) {
  const values = [];
  const labelPart = labels.join('|');
  const regexes = [
    new RegExp(`(?:${labelPart})\\s*[:=]?\\s*(\\d+(?:[.,]\\d+)?)`, 'giu'),
    new RegExp(`(\\d+(?:[.,]\\d+)?)\\s*(?:mEq\\/L|mmol\\/L|mg\\/dL|mmol\\/L)?\\s*(?:${labelPart})`, 'giu'),
  ];
  regexes.forEach((regex) => {
    let match = regex.exec(text);
    while (match) {
      const value = Number(String(match[1]).replace(',', '.'));
      if (Number.isFinite(value)) values.push(value);
      match = regex.exec(text);
    }
  });
  return values;
}

function extractPotassiumValue(text = '') {
  const candidates = extractNumericAfterLabels(text, ['k\\+?', 'k⁺', 'potasyum', 'serum\\s*k\\+?', 'serum\\s*k⁺', 'serum\\s+potasyumu'])
    .filter((value) => value >= 1.5 && value <= 10);
  return candidates.length ? Math.max(...candidates) : null;
}

function extractGlucoseValue(text = '') {
  const candidates = extractNumericAfterLabels(text, ['glukoz', 'glucose', 'kan\\s+sekeri', 'serum\\s+glukoz'])
    .filter((value) => value >= 10 && value <= 1200);
  return candidates.length ? Math.max(...candidates) : null;
}

function extractCalciumValue(text = '') {
  const candidates = extractNumericAfterLabels(text, ['kalsiyum', 'ca\\+\\+', 'ca', 'serum\\s+kalsiyum'])
    .filter((value) => value >= 3 && value <= 25);
  return candidates.length ? Math.max(...candidates) : null;
}

function extractLactateValue(text = '') {
  const candidates = extractNumericAfterLabels(text, ['laktat', 'lactate']).filter((value) => value >= 0.5 && value <= 30);
  return candidates.length ? Math.max(...candidates) : null;
}

function extractSystolicBP(text = '') {
  const values = [];
  const regexes = [
    /(?:ta|bp|kan\s+basinci|kan\s+basıncı|tansiyon)\s*[:=]?\s*(\d{2,3})\s*\/\s*(\d{2,3})/giu,
    /\b(\d{2,3})\s*\/\s*(\d{2,3})\s*mmhg\b/giu,
  ];
  regexes.forEach((regex) => {
    let match = regex.exec(text);
    while (match) {
      const value = Number(match[1]);
      if (Number.isFinite(value) && value >= 40 && value <= 260) values.push(value);
      match = regex.exec(text);
    }
  });
  return values.length ? Math.min(...values) : null;
}

function hasHypotension(question = {}) {
  const text = rawBundle(question);
  const sbp = extractSystolicBP(text);
  return (sbp !== null && sbp < 90) || /hipotansiyon|sok|şok|vazopressor|kardiyak arrest|hemodinamik instabil/.test(bundle(question));
}

const CALCIUM_PATTERNS = [/kalsiyum\s+glukonat/, /kalsiyum\s+tuzu/, /intravenoz\s+kalsiyum/, /kardiyak\s+membran\s+stabil/];
const INSULIN_GLUCOSE_PATTERNS = [/insulin.*glukoz/, /insulin.*dekstroz/, /insulin.*dextroz/, /insulin\s*\+\s*glukoz/, /insulin\s*\+\s*dekstroz/];
const EPINEPHRINE_PATTERNS = [/adrenalin/, /epinefrin/, /epinephrine/];
const FLUID_PATTERNS = [/sivi/, /kristaloid/, /serum\s+fizyolojik/, /izotonik/, /ringer/, /30\s*ml\/kg/, /bolus/];
const ANTIBIOTIC_PATTERNS = [/antibiyotik/, /antimikrobiyal/, /seftriakson/, /sefotaksim/, /piperasilin/, /karbapenem/, /vankomisin/, /ampirik/];
const HIGH_RISK_PE_PATTERNS = [/^(?!.*pesi)(?!.*orta).*yuksek\s+risk/, /masif\s+pe/, /masif\s+pulmoner\s+emboli/, /hemodinamik\s+instabil/, /sok\s+ile\s+seyreden/];
const PESI_PATTERNS = [/pesi/, /pulmonary\s+embolism\s+severity\s+index/];

function isHyperkalemiaFirstTreatmentQuestion(question = {}) {
  const text = rawBundle(question);
  const normalized = bundle(question);
  const potassium = extractPotassiumValue(text);
  const hasContext = /hiperkalemi|hiperpotasemi|potasyum yuksekligi|k\+|k⁺/.test(normalized) || (potassium !== null && potassium >= 5.5);
  const hasEcg = /sivri\s*t|tepe\s*t|tepesen\s*t|tepeleş|t\s*dalgasi|qrs\s*genis|pr\s*uzama|sine\s*wave|sinusoidal|iletim\s*bozuk|ventrikuler\s*aritmi|ekg.*degis|ecg.*degis/.test(normalized);
  return hasContext && asksFirstStep(question) && (hasEcg || (potassium !== null && potassium >= 6.5));
}

function isPEContext(question = {}) {
  const text = bundle(question);
  return /pulmoner\s+emboli|\bpe\b|emboli|ploritik|pleuritik|nefes\s+darligi|dispne|dvt|derin\s+ven|bacak.*siskin|bacak.*hassasiyet/.test(text)
    && /gogus\s+agrisi|nefes\s+darligi|dispne|dvt|bacak|emboli/.test(text);
}

function isPEHighRiskClassificationQuestion(question = {}) {
  return isPEContext(question) && hasHypotension(question) && asksRiskOrScore(question);
}

function isAnaphylaxisEmergency(question = {}) {
  const text = bundle(question);
  // Do not classify every bronchospasm/epinephrine option as anaphylaxis. Require explicit
  // allergic/urticarial/angioedema/anaphylaxis context in the scenario.
  return /anafil|alerji|alerjik|urtiker|anjiyoödem|anjiyoedem/.test(text)
    && /hipotansiyon|bronkospazm|hisiltili|solunum\s+sikintisi|mukozal|urtiker|sok|dudak|dil|ödem|odem/.test(text)
    && asksManagement(question);
}

function isDkaQuestion(question = {}) {
  return /dka|diyabetik\s+ketoasidoz|ketoasidoz|ketonemi|ketonuri/.test(bundle(question)) && asksManagement(question);
}

function isHypoglycemiaQuestion(question = {}) {
  const text = bundle(question);
  const glucose = extractGlucoseValue(rawBundle(question));
  return (/hipoglisemi|glukoz\s+dusuk|kan\s+sekeri\s+dusuk/.test(text) || (glucose !== null && glucose < 60)) && asksManagement(question);
}

function isSepsisShockQuestion(question = {}) {
  const text = bundle(question);
  const lactate = extractLactateValue(rawBundle(question));
  const infectionContext = /sepsis|septik|urosepsis|pyelonefrit|idrar.*yanma|dizuri|enfeksiyon\s+odagi|enfeksiyon\s+kaynagi|ates.*titreme|titreme.*ates|ates.*lokosit|lokosit.*ates|crp|prokalsitonin/.test(text);
  return infectionContext
    && asksManagement(question)
    && (hasHypotension(question) || (lactate !== null && lactate >= 2) || /hipoperfuzyon|organ\s+yetmezligi/.test(text));
}

function isStemiQuestion(question = {}) {
  const text = bundle(question);
  return /\bstemi\b|\bst\s*elevasyon|akut\s+miyokard|miyokard\s+infarkt|\bacs\b|akut\s+koroner/.test(text) && hasExplicitManagementIntent(question);
}

function isStrokeReperfusionQuestion(question = {}) {
  const text = bundle(question);
  return /inme|stroke|hemiparezi|afazi|akut\s+norolojik|fasiyal\s+asimetri/.test(text)
    && /tromboliz|alteplaz|rtpa|trombektomi|reperfuzyon|ilk|acil/.test(questionIntentText(question) + ' ' + text);
}

function isStatusEpilepticusQuestion(question = {}) {
  const text = bundle(question);
  return /status\s+epileptikus|uzamis\s+nobet|nöbet.*5\s*dak|nobet.*5\s*dak|tekrarlayan\s+nobet/.test(text) && asksManagement(question);
}

function isMeningitisQuestion(question = {}) {
  const text = bundle(question);
  const explicitMeningitis = /menenjit|beyin\s+omurilik/.test(text);
  const positiveMeningealSign = /ense\s+sertligi|peteşi|petesi|fotofobi|ateş.*ense/.test(text)
    && !/ense\s+sertligi\s+(yok|saptanma|negatif)|meningeal\s+bulgu\s+(yok|saptanma|negatif)/.test(text);
  const infectiousMeningeal = positiveMeningealSign && /ateş|ates|nötrofil|notrofil|bakteri|viral|purulan|sepsis|enfeksiyon/.test(text);
  const bosInInfectiousContext = /\bbos\b/.test(text) && /ateş|ates|ense|fotofobi|nötrofil|notrofil|bakteri|viral|purulan|menenjit|enfeksiyon/.test(text);
  return (explicitMeningitis || infectiousMeningeal || bosInInfectiousContext) && hasExplicitManagementIntent(question);
}

function isAsthmaCopdSevereQuestion(question = {}) {
  const text = bundle(question);
  return /astim|astım|koah|bronkospazm|wheezing|hisiltili|sessiz\s+akciger|hiperkapni|pco2|solunum\s yetmezligi/.test(text)
    && asksManagement(question)
    && /sessiz\s+akciger|bilinc|hiperkapni|pco2|spo2|oksijen|solunum\s+sikintisi|atak|alevlenme/.test(text);
}

function isToxicologyQuestion(question = {}) {
  return /zehir|intoksikasyon|asetaminofen|parasetamol|opioid|morfin|eroin|organofosfat|kolinerjik|methemoglobin|benzodiazepin|antidot/.test(bundle(question)) && asksManagement(question);
}

function isObstetricEmergencyQuestion(question = {}) {
  return /ektopik|postpartum\s+kanama|uterin\s+atoni|preeklampsi|eklampsi|omuz\s+distosisi|gebelik|gebe/.test(bundle(question)) && hasExplicitManagementIntent(question);
}

function isForensicEthicalQuestion(question = {}) {
  return /cocuk\s+istismar|istismar|cinsel\s+saldiri|şüpheli\s+olum|supheli\s+olum|adli|bildirim|hekim\s+yukumlulugu|rapor|delil|guvenlik/.test(bundle(question)) && hasExplicitManagementIntent(question);
}

function validateHyperkalemiaRule(question = {}) {
  const errors = [];
  const warnings = [];
  if (!isHyperkalemiaFirstTreatmentQuestion(question)) return { errors, warnings, matched: false };
  if (!hasCorrectOptionMatching(question, CALCIUM_PATTERNS)) {
    errors.push('hyperkalemia-rule: EKG bulgulu ciddi hiperkalemide ilk tedavi intravenöz kalsiyum glukonat olmalı');
  }
  if (hasCorrectOptionMatching(question, INSULIN_GLUCOSE_PATTERNS)) {
    errors.push('hyperkalemia-rule: insülin + glukoz EKG bulgulu hiperkalemide ilk cevap yapılamaz; kalsiyumdan sonra gelir');
  }
  if (!findOptionId(question, CALCIUM_PATTERNS)) warnings.push('hyperkalemia-rule: seçeneklerde intravenöz kalsiyum glukonat yok; repair ideal seçenek setini kurmalı');
  return { errors, warnings, matched: true };
}

function validatePERule(question = {}) {
  const errors = [];
  const warnings = [];
  if (!isPEHighRiskClassificationQuestion(question)) return { errors, warnings, matched: false };
  const correct = normalizeTR(correctOptionText(question));
  const all = bundle(question);
  if (!HIGH_RISK_PE_PATTERNS.some((pattern) => pattern.test(correct))) {
    errors.push('pe-rule: hipotansiyon/şok olan PE olgusunda sınıflama yüksek risk / masif PE olmalıdır');
  }
  if (PESI_PATTERNS.some((pattern) => pattern.test(correct)) || /pesi.*iv|pesi.*iii|cok\s+yuksek\s+risk\s*\(?iv\)?/.test(all)) {
    errors.push('pe-rule: hemodinamik instabil PE, PESI IV/V gibi eksik veya teknik hatalı skor sınıfıyla cevaplanamaz');
  }
  return { errors, warnings, matched: true };
}

function validateAnaphylaxisRule(question = {}) {
  if (!isAnaphylaxisEmergency(question)) return { errors: [], warnings: [], matched: false };
  const correct = normalizeTR(correctOptionText(question));
  if (!EPINEPHRINE_PATTERNS.some((pattern) => pattern.test(correct))) {
    return { errors: ['anaphylaxis-rule: anafilaksi acil tedavi sorusunda adrenalin/epinefrin doğru cevapta bulunmalı'], warnings: [], matched: true };
  }
  return { errors: [], warnings: [], matched: true };
}

function validateDkaRule(question = {}) {
  if (!isDkaQuestion(question)) return { errors: [], warnings: [], matched: false };
  const text = rawBundle(question);
  const k = extractPotassiumValue(text);
  const correct = normalizeTR(correctOptionText(question));
  const errors = [];
  if (k !== null && k < 3.3 && /insulin/.test(correct)) {
    errors.push('dka-rule: DKA’da K⁺ düşükse insülin ertelenir; önce potasyum replasmanı gerekir');
  }
  if (k === null && /insulin/.test(correct) && !/sivi|izotonik|potasyum|k\+/.test(correct)) {
    errors.push('dka-rule: DKA ilk yaklaşımında sıvı resüsitasyonu ve potasyum güvenliği atlanamaz');
  }
  return { errors, warnings: [], matched: true };
}

function validateHypoglycemiaRule(question = {}) {
  if (!isHypoglycemiaQuestion(question)) return { errors: [], warnings: [], matched: false };
  const text = bundle(question);
  const correct = normalizeTR(correctOptionText(question));
  if (/bilinc\s+kapali|oral\s+alam|yutam|konfuze|nobet/.test(text) && /oral|agizdan|karbonhidrat/.test(correct) && !/dekstroz|glukagon/.test(correct)) {
    return { errors: ['hypoglycemia-rule: bilinci kapalı veya oral alamayan hipoglisemide oral karbonhidrat ilk basamak olamaz; IV dekstroz veya glukagon gerekir'], warnings: [], matched: true };
  }
  return { errors: [], warnings: [], matched: true };
}

function validateSepsisRule(question = {}) {
  if (!isSepsisShockQuestion(question)) return { errors: [], warnings: [], matched: false };
  const correct = normalizeTR(correctOptionText(question));
  const hasAntibiotic = ANTIBIOTIC_PATTERNS.some((pattern) => pattern.test(correct));
  const hasFluid = FLUID_PATTERNS.some((pattern) => pattern.test(correct));
  if (!(hasAntibiotic && hasFluid)) {
    return { errors: ['sepsis-rule: hipoperfüzyon/şok bulgulu sepsiste erken geniş spektrumlu antibiyotik ve kristaloid resüsitasyon birlikte yer almalı'], warnings: [], matched: true };
  }
  return { errors: [], warnings: [], matched: true };
}

function validateStemiRule(question = {}) {
  if (!isStemiQuestion(question)) return { errors: [], warnings: [], matched: false };
  const correct = normalizeTR(correctOptionText(question));
  if (!/primer\s+pci|anjiyoplasti|reperfuzyon|tromboliz|fibrinolitik|aspirin|p2y12|antikoagulan|heparin/.test(correct)) {
    return { errors: ['stemi-rule: STEMI/ACS ilk yaklaşımında reperfüzyon ve antitrombotik tedavi mantığı bulunmalı; yalnız semptomatik tedavi yeterli değildir'], warnings: [], matched: true };
  }
  return { errors: [], warnings: [], matched: true };
}

function validateStrokeRule(question = {}) {
  if (!isStrokeReperfusionQuestion(question)) return { errors: [], warnings: [], matched: false };
  const text = bundle(question);
  const correct = normalizeTR(correctOptionText(question));
  if (/tromboliz|alteplaz|rtpa|trombektomi/.test(correct) && (!/bt|tomografi|kanama.*dis|hemoraji.*dis|goruntuleme|difüzyon|diffuzyon/.test(correct) || /olmadan|yapilmadan|dislanmadan/.test(correct))) {
    return { errors: ['stroke-rule: tromboliz/trombektomi kararı öncesi intrakraniyal kanama görüntüleme ile dışlanmalıdır'], warnings: [], matched: true };
  }
  return { errors: [], warnings: [], matched: true };
}

function validateStatusEpilepticusRule(question = {}) {
  if (!isStatusEpilepticusQuestion(question)) return { errors: [], warnings: [], matched: false };
  const correct = normalizeTR(correctOptionText(question));
  if (!/benzodiazepin|lorazepam|diazepam|midazolam/.test(correct)) {
    return { errors: ['status-rule: status epileptikusta ilk basamak benzodiazepindir; sonra antiepileptik yükleme gelir'], warnings: [], matched: true };
  }
  return { errors: [], warnings: [], matched: true };
}

function validateMeningitisRule(question = {}) {
  if (!isMeningitisQuestion(question)) return { errors: [], warnings: [], matched: false };
  const correct = normalizeTR(correctOptionText(question));
  if (/yalniz|sadece/.test(correct) && /lp|lomber|bt|goruntuleme/.test(correct) && !ANTIBIOTIC_PATTERNS.some((pattern) => pattern.test(correct))) {
    return { errors: ['meningitis-rule: menenjit şüphesinde ampirik antibiyotik gereksiz geciktirilemez; LP/BT sırası kontrendikasyona göre düzenlenir'], warnings: [], matched: true };
  }
  if (!ANTIBIOTIC_PATTERNS.some((pattern) => pattern.test(correct)) && /tedavi|yaklasim|ilk/.test(questionIntentText(question))) {
    return { errors: ['meningitis-rule: menenjit yönetim sorusunda ampirik antibiyotik yaklaşımı doğru cevapta yer almalı'], warnings: [], matched: true };
  }
  return { errors: [], warnings: [], matched: true };
}

function validateAsthmaCopdRule(question = {}) {
  if (!isAsthmaCopdSevereQuestion(question)) return { errors: [], warnings: [], matched: false };
  const correct = normalizeTR(correctOptionText(question));
  if (/gozlem|oral\s+tedavi|taburcu/.test(correct) && !/oksijen|salbutamol|ipratropium|steroid|ventilasyon|noninvaziv|entubasyon/.test(correct)) {
    return { errors: ['asthma-copd-rule: ağır astım/KOAH alevlenmesinde yalnız gözlem veya oral tedavi uygun ilk yaklaşım olamaz'], warnings: [], matched: true };
  }
  return { errors: [], warnings: [], matched: true };
}

function validateCalciumEmergencyRule(question = {}) {
  const text = bundle(question);
  const correct = normalizeTR(correctOptionText(question));
  const calcium = extractCalciumValue(rawBundle(question));
  if (/hipokalsemi|tetani|laringospazm|uzamis\s+qt|qt\s+uzamasi/.test(text) && asksManagement(question)) {
    if (!/iv|intravenoz/.test(correct) || !/kalsiyum|kalsiyum\s+glukonat/.test(correct)) {
      return { errors: ['calcium-rule: semptomatik hipokalsemide ilk tedavi intravenöz kalsiyumdur'], warnings: [], matched: true };
    }
    return { errors: [], warnings: [], matched: true };
  }
  if ((/hiperkalsemi/.test(text) || (calcium !== null && calcium >= 14)) && asksManagement(question)) {
    if (!/sivi|izotonik|serum\s+fizyolojik|kalsitonin|bisfosfonat|zoledronat|pamidronat/.test(correct)) {
      return { errors: ['calcium-rule: ağır/simptomatik hiperkalsemide hidrasyon ve kalsiyum düşürücü tedavi basamakları doğru kurulmalı'], warnings: [], matched: true };
    }
    return { errors: [], warnings: [], matched: true };
  }
  return { errors: [], warnings: [], matched: false };
}

function validateToxicologyRule(question = {}) {
  if (!isToxicologyQuestion(question)) return { errors: [], warnings: [], matched: false };
  const text = bundle(question);
  const correct = normalizeTR(correctOptionText(question));
  const pairs = [
    [/asetaminofen|parasetamol/, /n\s*-?\s*asetilsistein|nac/],
    [/opioid|morfin|eroin|miyozis|solunum\s+depresyonu/, /nalokson/],
    [/organofosfat|kolinerjik|salivasyon|lakrimasyon|bronkore/, /atropin|pralidoksim/],
    [/methemoglobin|methemoglobinemi/, /metilen\s+mavisi/],
  ];
  for (const [contextPattern, expectedPattern] of pairs) {
    if (contextPattern.test(text) && !expectedPattern.test(correct)) {
      return { errors: ['toxicology-rule: toksin ile antidot eşleşmesi hatalı veya ABC/antidot önceliği eksik'], warnings: [], matched: true };
    }
  }
  return { errors: [], warnings: [], matched: true };
}

function validateObstetricEmergencyRule(question = {}) {
  if (!isObstetricEmergencyQuestion(question)) return { errors: [], warnings: [], matched: false };
  const text = bundle(question);
  const correct = normalizeTR(correctOptionText(question));
  const activeSeizure = /nobet|konvulziyon/.test(text) && !/nobet\s+(olmama|yok|saptanma)|nobet\s+gecirme(z|miş değil)|konvulziyon\s+yok/.test(text);
  if (/eklampsi|preeklampsi/.test(text) && activeSeizure && !/magnezyum\s+sulfat|mgso4/.test(correct)) {
    return { errors: ['obstetric-rule: eklampside nöbet profilaksisi/tedavisi için magnezyum sülfat temel basamaktır'], warnings: [], matched: true };
  }
  if (/postpartum\s+kanama|uterin\s+atoni/.test(text) && !/uterin\s+masaj|oksitosin|uterotonik|traneksamik|kanama\s+kontrol|resusitasyon/.test(correct)) {
    return { errors: ['obstetric-rule: postpartum kanamada uterin masaj, uterotonik ve resüsitasyon basamakları göz ardı edilemez'], warnings: [], matched: true };
  }
  return { errors: [], warnings: [], matched: true };
}

function validateForensicEthicalRule(question = {}) {
  if (!isForensicEthicalQuestion(question)) return { errors: [], warnings: [], matched: false };
  const correct = normalizeTR(correctOptionText(question));
  if (!/bildirim|adli|guvenlik|kayit|rapor|delil|koruma|savci|kolluk|cocuk\s+koruma/.test(correct)) {
    return { errors: ['forensic-rule: adli/etik olguda stabilizasyonla birlikte bildirim, güvenlik ve objektif kayıt yükümlülüğü doğru cevapta yer almalı'], warnings: [], matched: true };
  }
  return { errors: [], warnings: [], matched: true };
}

function validatePediatricFitRule(question = {}) {
  const text = `${question.relatedBranch || ''} ${question.branchName || ''} ${question.spotCategory || ''} ${question.demographics || ''} ${question.patientIntro?.profile || ''}`;
  const normalized = normalizeTR(text);
  if (!/pediatri|cocuk|yenidogan|bebek|adolesan|ergen/.test(normalized)) return { errors: [], warnings: [], matched: false };
  const ageMatches = [...String(text).matchAll(/\b(\d{1,3})\s*yaş/giu)].map((match) => Number(match[1])).filter(Number.isFinite);
  if (ageMatches.some((age) => age >= 19)) {
    return { errors: ['pediatric-rule: pediatri branşında erişkin/geriatrik hasta profili üretilemez'], warnings: [], matched: true };
  }
  return { errors: [], warnings: [], matched: true };
}

function validateThyroidAdrenalRule(question = {}) {
  const text = bundle(question);
  const correct = normalizeTR(correctOptionText(question));
  if (/tirotoksik\s+kriz|tiroid\s+firtinasi|thyroid\s+storm/.test(text) && hasExplicitManagementIntent(question)) {
    if (!/beta\s*bloker|propranolol|ptu|propiltiyourasil|metimazol|iyot|lugol|steroid|hidrokortizon/.test(correct)) {
      return { errors: ['thyroid-adrenal-rule: tirotoksik krizde beta-blokaj, antitiroid tedavi, iyot ve steroid sırası doğru kurulmalı'], warnings: [], matched: true };
    }
    return { errors: [], warnings: [], matched: true };
  }
  if (/adrenal\s+kriz|addison\s+krizi/.test(text) && hasExplicitManagementIntent(question)) {
    if (!/hidrokortizon|steroid|dekstroz|sivi|izotonik/.test(correct)) {
      return { errors: ['thyroid-adrenal-rule: adrenal krizde hidrokortizon ve sıvı/dekstroz desteği geciktirilemez'], warnings: [], matched: true };
    }
    return { errors: [], warnings: [], matched: true };
  }
  return { errors: [], warnings: [], matched: false };
}

export function validateHighRiskClinicalRules(question = {}) {
  const validators = [
    ['hyperkalemia-ecg-first-treatment', validateHyperkalemiaRule],
    ['pulmonary-embolism-shock-risk', validatePERule],
    ['anaphylaxis-first-drug', validateAnaphylaxisRule],
    ['dka-potassium-first-step', validateDkaRule],
    ['hypoglycemia-emergency', validateHypoglycemiaRule],
    ['sepsis-shock-bundle', validateSepsisRule],
    ['acs-stemi-reperfusion', validateStemiRule],
    ['stroke-before-thrombolysis', validateStrokeRule],
    ['status-epilepticus-sequence', validateStatusEpilepticusRule],
    ['meningitis-lp-antibiotic', validateMeningitisRule],
    ['acute-asthma-copd-red-flags', validateAsthmaCopdRule],
    ['thyroid-adrenal-crisis-sequence', validateThyroidAdrenalRule],
    ['calcium-emergencies', validateCalciumEmergencyRule],
    ['toxicology-antidotes', validateToxicologyRule],
    ['obstetric-emergencies', validateObstetricEmergencyRule],
    ['pediatric-red-flags', validatePediatricFitRule],
    ['forensic-ethical-duty', validateForensicEthicalRule],
  ];
  const results = validators.map(([ruleId, validator]) => ({ ruleId, ...validator(question) }));
  const errors = results.flatMap((result) => result.errors || []);
  const warnings = results.flatMap((result) => result.warnings || []);
  const matchedRules = results.filter((result) => result.matched).map((result) => result.ruleId);
  return { ok: errors.length === 0, errors: Array.from(new Set(errors)), warnings: Array.from(new Set(warnings)), matchedRules };
}

function scoreAppears(question = {}) {
  const text = rawBundle(question);
  return SCORE_NAMES.filter((name) => new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu').test(text));
}

export function validateScoreAndClassificationUse(question = {}) {
  const errors = [];
  const warnings = [];
  const text = bundle(question);
  const correct = normalizeTR(correctOptionText(question));
  const scores = scoreAppears(question);

  if (isPEContext(question) && hasHypotension(question) && (/pesi/.test(text) || /pesi/.test(correct))) {
    errors.push('score-gate: PE’de hemodinamik instabilite varsa yüksek risk/masif PE hard criterion’dır; PESI sınıfı doğru cevabı gölgeleyemez');
  }
  const fullText = normalizeTR(collectStrings(question).join(' | '));
  if (/pesi\s*(cok\s+yuksek\s+risk|very\s+high).*\(?iv\)?|pesi.*\(?iv\)?.*cok\s+yuksek/.test(fullText)) {
    errors.push('score-gate: PESI Class IV “high risk”tir; “very high risk/çok yüksek risk” Class V için kullanılır');
  }
  if (asksRiskOrScore(question) && scores.length) {
    if (/pesi/.test(text)) {
      const requiredSignals = ['yas', 'cinsiyet', 'kanser', 'kalp yetmezligi', 'kronik akciger', 'nabiz', 'ates', 'bilinc', 'spo'].filter((signal) => text.includes(signal));
      if (requiredSignals.length < 4 && /pesi/.test(correct + ' ' + questionIntentText(question))) {
        errors.push('score-gate: PESI sınıfını kesinleştirmek için gerekli değişkenler yeterli verilmemiş');
      }
    }
    if (/wells|curb-65|cha2ds2|has-bled|child-pugh|meld|apgar|bishop|centor|alvarado|glasgow|ranson/.test(text) && /kesin|sinif|class|risk/.test(questionIntentText(question))) {
      warnings.push('score-gate: skor sorusu gerekli değişkenler ve skorun amacı açısından gözden geçirildi');
    }
  }
  return { ok: errors.length === 0, errors: Array.from(new Set(errors)), warnings: Array.from(new Set(warnings)), scores };
}

export function validateFirstStepLogic(question = {}) {
  const highRisk = validateHighRiskClinicalRules(question);
  return {
    ok: highRisk.errors.length === 0,
    errors: highRisk.errors.filter((error) => /ilk|first|basamak|tedavi|yaklasim|resusitasyon|sınıflama|siniflama|risk|hard criterion|PE/.test(error)),
    warnings: highRisk.warnings,
    matchedRules: highRisk.matchedRules,
  };
}

function optionCategory(text = '') {
  const normalized = normalizeTR(text);
  if (/risk|sinif|class|pesi|wells|masif|submasif|dusuk|orta|yuksek/.test(normalized)) return 'risk';
  if (/tedavi|verilmesi|baslan|enjeksiyon|infuzyon|antibiyotik|adrenalin|kalsiyum|insulin|dekstroz|sivi|pci|tromboliz|benzodiazepin|oksitosin|nalokson|diyaliz|hemodiyaliz|albuterol|salbutamol|bikarbonat/.test(normalized)) return 'treatment';
  if (/bt|mr|ultrason|usg|ekg|kultur|seroloji|test|tetkik|biyopsi|laparoskopi|lp|lomber/.test(normalized)) return 'test';
  if (/defekt|mekanizma|inhibisyon|aktivasyon|mutasyon|ampulla|implantasyon|enzim/.test(normalized)) return 'mechanism';
  return 'diagnosis';
}

export function validateOptionQuality(question = {}) {
  const errors = [];
  const warnings = [];
  const options = getOptions(question);
  const normalizedTexts = options.map((option) => normalizeTR(option.text));
  if (options.length < 5) errors.push('option-gate: TUS spot sorusunda 5 seçenek bulunmalı');
  if (new Set(normalizedTexts).size !== normalizedTexts.length) errors.push('option-gate: seçeneklerde tekrar var');

  const intent = questionIntentText(question);
  const explicitCategoryRequest = /aşağıdaki\s+(tedavi|tetkik|test|tanı|risk|skor|sınıf)|asagidaki\s+(tedavi|tetkik|test|tani|risk|skor|sinif)/.test(intent);
  if (explicitCategoryRequest) {
    const expectedCategory = /risk|skor|sinif|sınıf/.test(intent) ? 'risk'
      : /tedavi|yaklasim|mudahale|yonetim/.test(intent) ? 'treatment'
        : /tetkik|test|seroloji|goruntuleme/.test(intent) ? 'test'
          : /mekanizma|patogenez|yerlesim|implantasyon/.test(intent) ? 'mechanism'
            : null;
    if (expectedCategory) {
      const categories = options.map((option) => optionCategory(option.text));
      const sameCategoryCount = categories.filter((category) => category === expectedCategory).length;
      if (sameCategoryCount < Math.min(4, options.length)) {
        errors.push(`option-gate: seçenekler aynı düzlemde değil; beklenen kategori ${expectedCategory}`);
      }
    }
  }
  if (isPEHighRiskClassificationQuestion(question) && !options.some((option) => HIGH_RISK_PE_PATTERNS.some((pattern) => pattern.test(normalizeTR(option.text))))) {
    errors.push('option-gate: hipotansif PE sorusunda yüksek risk/masif PE seçeneği bulunmalı');
  }
  if (isHyperkalemiaFirstTreatmentQuestion(question) && !options.some((option) => CALCIUM_PATTERNS.some((pattern) => pattern.test(normalizeTR(option.text))))) {
    errors.push('option-gate: EKG bulgulu hiperkalemi sorusunda IV kalsiyum glukonat seçeneği bulunmalı');
  }
  return { ok: errors.length === 0, errors: Array.from(new Set(errors)), warnings: Array.from(new Set(warnings)) };
}

function validateFeedbackConsistency(question = {}) {
  const errors = [];
  const correctText = normalizeTR(correctOptionText(question));
  const feedback = normalizeTR([
    question.explanation,
    question.spotPearl,
    question.examPearls,
    question.evidenceChain,
    question.wrongOptionFeedback,
    question.diagnosis?.explanation,
    question.diagnosis?.answerFeedback?.whyCorrect,
    question.diagnosis?.answerFeedback?.clinicalPearls,
    question.diagnosis?.answerFeedback?.managementSteps,
    question.diagnosis?.answerFeedback?.whyWrong,
    question.diagnosis?.answerFeedback?.differentialComparison,
  ].map(toPlainText).join(' | '));

  if (!correctText) errors.push('answer-feedback-consistency: doğru cevap metni bulunamadı');
  FORBIDDEN_FEEDBACK_PATTERNS.forEach((pattern) => {
    if (pattern.test(feedback)) errors.push('answer-feedback-consistency: şablon veya öğretici olmayan feedback ifadesi var');
  });
  if (isHyperkalemiaFirstTreatmentQuestion(question) && /kalsiyum/.test(feedback) && /insulin.*glukoz|insulin.*dekstroz/.test(correctText)) {
    errors.push('answer-feedback-consistency: feedback kalsiyumu ilk basamak anlatırken doğru cevap insülin + glukoz seçilmiş');
  }
  if (isPEHighRiskClassificationQuestion(question) && /hemodinamik|hipotansiyon|masif|yuksek\s+risk/.test(feedback) && /pesi/.test(correctText)) {
    errors.push('answer-feedback-consistency: feedback yüksek risk PE anlatırken doğru cevap PESI sınıfı seçilmiş');
  }
  return errors;
}

export function answerFeedbackConsistencyGate(question = {}) {
  const errors = validateFeedbackConsistency(question);
  return { ok: errors.length === 0, errors };
}

function validateTurkishLanguageQuality(question = {}) {
  const errors = [];
  collectStrings(question).forEach((raw) => {
    const text = String(raw || '');
    if (/T\s*dalgalar[ıi]\s*tepelem|tepeşen\s*T/iu.test(text)) errors.push('turkish-quality: bozuk EKG ifadesi yerine “sivri T dalgaları” kullanılmalı');
    if (/\btall\s*T\b|\bwidened\s*QRS\b|\bwheezing\b|lower\s+quadrant|flank\s+tenderness/iu.test(text)) errors.push('turkish-quality: açıklamasız İngilizce/karma klinik terim var');
    if (/\binsulin\s*\+\s*glucose\b/iu.test(text)) errors.push('turkish-quality: insulin+glucose yerine “intravenöz insülin + glukoz” kullanılmalı');
    if (/\bDializ\b/u.test(text)) errors.push('turkish-quality: “Dializ” yerine “Diyaliz” yazılmalı');
    if (/\bCa\+\+\b/u.test(text)) errors.push('turkish-quality: Ca++ yerine kalsiyum/kalsiyum glukonat yazılmalı');
    if (/sklerotik\s+göz\s+beyazı|hafif\s+solunumlu|lower\s+quadrante/iu.test(text)) errors.push('turkish-quality: hasta anlatımında bozuk Türkçe/tıbbi ifade var');
  });
  return Array.from(new Set(errors));
}

function normalizeMedicalTurkishText(text = '') {
  return String(text || '')
    .replace(/T\s*dalgalar[ıi]\s*tepelem[ıiış]+/giu, 'sivri T dalgaları')
    .replace(/tepeşen\s*T\s+dalgalar[ıi]/giu, 'sivri T dalgaları')
    .replace(/\btall\s*T\s*waves?\b/giu, 'sivri T dalgaları')
    .replace(/\bwidened\s*QRS\b/giu, 'QRS genişlemesi')
    .replace(/\bwide\s*QRS\b/giu, 'QRS genişlemesi')
    .replace(/\bwheezing\b/giu, 'hışıltılı solunum')
    .replace(/lower\s+quadrant/giu, 'alt kadran')
    .replace(/flank\s+tenderness/giu, 'kostovertebral açı hassasiyeti')
    .replace(/\bDializ\b/gu, 'Diyaliz')
    .replace(/\bdializ\b/gu, 'diyaliz')
    .replace(/\bCa\+\+\b/gu, 'kalsiyum')
    .replace(/\binsulin\s*\+\s*glucose\b/giu, 'intravenöz insülin + glukoz')
    .replace(/\binsulin\b/giu, 'insülin')
    .replace(/\bglucose\b/giu, 'glukoz')
    .replace(/\bIV\s+kalsiyum\b/gu, 'intravenöz kalsiyum')
    .replace(/\bIV\s+insülin\b/gu, 'intravenöz insülin')
    .replace(/\bIV\s+insulin\b/giu, 'intravenöz insülin')
    .replace(/sklerotik\s+göz\s+beyazı/giu, 'skleralarda ikter')
    .replace(/hafif\s+solunumlu/giu, 'hafif soluk görünümlü')
    .replace(/lower\s+quadrante/giu, 'alt kadranda')
    .replace(/\s+/g, ' ')
    .trim();
}

function mapObjectStrings(value, mapper) {
  if (typeof value === 'string') return mapper(value);
  if (Array.isArray(value)) return value.map((item) => mapObjectStrings(item, mapper));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, mapObjectStrings(item, mapper)]));
  }
  return value;
}

function makeWrongFeedbackMap(options = [], correctOption = {}, mode = '') {
  return Object.fromEntries(options
    .filter((option) => option.id !== correctOption.id)
    .map((option) => {
      const normalized = normalizeTR(option.text);
      if (mode === 'hyperkalemia') {
        if (INSULIN_GLUCOSE_PATTERNS.some((pattern) => pattern.test(normalized))) return [option.id, 'İntravenöz insülin + glukoz potasyumu hücre içine kaydırır; ancak EKG değişikliği varsa ilk basamak kardiyak membranı stabilize eden intravenöz kalsiyum glukonattır.'];
        if (/albuterol|salbutamol|beta/.test(normalized)) return [option.id, 'Beta-agonist potasyumu hücre içine kaydırmaya yardımcı olabilir; EKG bulgulu ciddi hiperkalemide kalsiyumun yerine ilk basamak olamaz.'];
        if (/bikarbonat/.test(normalized)) return [option.id, 'Sodyum bikarbonat belirgin metabolik asidozda yardımcı olabilir; EKG bulgulu hiperkalemide ilk müdahale kalsiyumdur.'];
        if (/diyaliz|hemodiyaliz/.test(normalized)) return [option.id, 'Diyaliz kalıcı potasyum uzaklaştırma yöntemidir; fakat EKG değişikliği olan acil tabloda önce kardiyak membran stabilize edilir.'];
      }
      if (mode === 'pe') {
        if (/pesi/.test(normalized)) return [option.id, 'PESI prognostik bir skordur; ancak hipotansiyon veya şok varsa PE doğrudan yüksek risk/masif PE kabul edilir.'];
        if (/dusuk|orta/.test(normalized)) return [option.id, 'Düşük veya orta risk sınıfları hemodinamik stabil PE için kullanılır; bu olguda ciddi hipotansiyon vardır.'];
      }
      return [option.id, `${option.text} bu klinik önceliği karşılamaz; olgudaki karar verdirici bulgular doğru seçeneği daha güçlü destekler.`];
    }));
}

function rebuildDiagnosis(question, options, correctOption, payload = {}) {
  const whyCorrect = payload.whyCorrect || question.explanation || question.diagnosis?.answerFeedback?.whyCorrect || `${correctOption.text} olgudaki somut bulgularla en uyumlu yanıttır.`;
  const evidenceChain = payload.evidenceChain || question.evidenceChain || question.diagnosis?.answerFeedback?.evidenceChain || [];
  const examPearl = payload.examPearl || question.examPearls?.[0] || question.diagnosis?.answerFeedback?.clinicalPearls?.[0] || '';
  const wrongById = payload.wrongById || makeWrongFeedbackMap(options, correctOption, payload.mode);
  const whyWrongByText = Object.fromEntries(options.filter((option) => option.id !== correctOption.id).map((option) => [option.text, wrongById[option.id]]));
  return {
    ...(question.diagnosis || {}),
    correct: correctOption.text,
    options: options.map((option) => option.text),
    explanation: whyCorrect,
    nextStep: payload.nextStep || question.diagnosis?.nextStep || 'Olgudaki somut verileri aynı kategorideki seçeneklerle karşılaştır.',
    pearls: [examPearl].filter(Boolean),
    answerFeedback: {
      ...(question.diagnosis?.answerFeedback || {}),
      whyCorrect,
      evidenceChain,
      pearls: [examPearl].filter(Boolean),
      clinicalPearls: [examPearl].filter(Boolean),
      whyWrong: whyWrongByText,
      differentialComparison: Object.fromEntries(options.filter((option) => option.id !== correctOption.id).map((option) => [option.text, {
        explanation: wrongById[option.id],
        comparisonPoints: [wrongById[option.id]],
      }])),
      managementSteps: payload.managementSteps || question.diagnosis?.answerFeedback?.managementSteps || [],
      learningOutcome: question.learningTarget,
      feedbackStandardVersion: 'Scientific-accuracy-gate-v2',
    },
  };
}

function repairToExpectedOption(question = {}, patterns = [], payload = {}) {
  let repaired = mapObjectStrings({ ...question }, normalizeMedicalTurkishText);
  let options = getOptions(repaired).map((option) => ({ ...option, text: normalizeMedicalTurkishText(option.text) }));
  let expected = options.find((option) => optionMatches(option.text, patterns));
  if (!expected && Array.isArray(payload.fallbackOptions)) {
    options = payload.fallbackOptions.map((text, index) => ({ id: OPTION_IDS[index], text }));
    expected = options.find((option) => optionMatches(option.text, patterns)) || options[0];
  }
  if (!expected) return repaired;
  repaired.options = options;
  repaired.correctAnswer = expected.id;
  repaired.explanation = payload.whyCorrect || repaired.explanation;
  repaired.evidenceChain = payload.evidenceChain || repaired.evidenceChain;
  repaired.examPearls = [payload.examPearl || repaired.examPearls?.[0]].filter(Boolean);
  repaired.wrongOptionFeedback = payload.wrongById || makeWrongFeedbackMap(options, expected, payload.mode);
  repaired.diagnosis = rebuildDiagnosis(repaired, options, expected, payload);
  repaired.aiMeta = {
    ...(repaired.aiMeta || {}),
    scientificAccuracyGateRepaired: true,
    scientificAccuracyRule: payload.ruleId || 'expected-option-repair',
  };
  attachQuestionDedupeFields(repaired);
  return repaired;
}

function buildHyperkalemiaRepair(question = {}) {
  return repairToExpectedOption(question, CALCIUM_PATTERNS, {
    mode: 'hyperkalemia',
    ruleId: 'hyperkalemia-ecg-first-treatment',
    fallbackOptions: [
      'Sodyum bikarbonat infüzyonu',
      'Diyaliz',
      'Albuterol inhalasyonu',
      'İntravenöz kalsiyum glukonat',
      'İntravenöz insülin + glukoz',
    ],
    whyCorrect: 'Serum K⁺ yüksekliği ile birlikte EKG’de sivri T dalgaları veya QRS genişlemesi varsa ilk hedef kardiyak membranı stabilize etmektir. Bu nedenle ilk müdahale intravenöz kalsiyum glukonattır; insülin + glukoz potasyumu hücre içine kaydırmak için sonraki basamakta kullanılır.',
    evidenceChain: ['Serum K⁺ ciddi hiperkalemi düzeyindedir.', 'EKG değişikliği kardiyak membran etkilenimini gösterir.', 'İlk müdahale ölümcül aritmi riskini azaltmaya yöneliktir.'],
    examPearl: 'Hiperkalemi + EKG değişikliği: önce IV kalsiyum glukonat, sonra potasyumu düşüren tedaviler.',
    managementSteps: ['Monitörizasyon ve damar yolu sağla.', 'İntravenöz kalsiyum glukonat ver.', 'Ardından insülin + glukoz, beta-agonist ve potasyum uzaklaştırıcı tedavileri planla.'],
  });
}

function buildPERepair(question = {}) {
  return repairToExpectedOption(question, HIGH_RISK_PE_PATTERNS, {
    mode: 'pe',
    ruleId: 'pulmonary-embolism-shock-risk',
    fallbackOptions: [
      'Düşük risk pulmoner emboli',
      'Orta-düşük risk pulmoner emboli',
      'Orta-yüksek risk pulmoner emboli',
      'Yüksek risk / masif pulmoner emboli',
      'PESI sınıf I düşük risk',
    ],
    whyCorrect: 'Pulmoner emboli şüphesinde sistolik kan basıncının 90 mmHg altında olması veya şok bulguları hemodinamik instabiliteyi gösterir. Bu durumda hasta PESI sınıfı ile değil, doğrudan yüksek risk/masif PE olarak değerlendirilir.',
    evidenceChain: ['Ani dispne ve plöritik göğüs ağrısı PE ile uyumludur.', 'Ciddi hipotansiyon hemodinamik instabiliteyi gösterir.', 'Hemodinamik instabilite PE’de yüksek risk/masif sınıflamayı belirler.'],
    examPearl: 'PE + hipotansiyon/şok = yüksek risk/masif PE; PESI bu hard criterion’ı gölgeleyemez.',
    managementSteps: ['Hemodinamik stabiliteyi değerlendir.', 'Yüksek risk/masif PE olarak acil tedavi planını başlat.', 'Antikoagülasyon ve reperfüzyon stratejisini kontrendikasyonlara göre değerlendir.'],
  });
}

export function independentClinicalSolve(question = {}) {
  if (isHyperkalemiaFirstTreatmentQuestion(question)) {
    return { ruleId: 'hyperkalemia-ecg-first-treatment', expectedText: 'İntravenöz kalsiyum glukonat', expectedOptionId: findOptionId(question, CALCIUM_PATTERNS) };
  }
  if (isPEHighRiskClassificationQuestion(question)) {
    return { ruleId: 'pulmonary-embolism-shock-risk', expectedText: 'Yüksek risk / masif pulmoner emboli', expectedOptionId: findOptionId(question, HIGH_RISK_PE_PATTERNS) };
  }
  if (isAnaphylaxisEmergency(question)) {
    return { ruleId: 'anaphylaxis-first-drug', expectedText: 'Adrenalin/epinefrin', expectedOptionId: findOptionId(question, EPINEPHRINE_PATTERNS) };
  }
  if (isSepsisShockQuestion(question)) {
    return { ruleId: 'sepsis-shock-bundle', expectedText: 'Geniş spektrumlu antibiyotik ve kristaloid resüsitasyon', expectedOptionId: findOptionId(question, [/(?=.*antibiyotik)(?=.*(kristaloid|sivi|30\s*ml\/kg|bolus))/]) };
  }
  if (isStatusEpilepticusQuestion(question)) {
    return { ruleId: 'status-epilepticus-sequence', expectedText: 'Benzodiazepin', expectedOptionId: findOptionId(question, [/benzodiazepin|lorazepam|diazepam|midazolam/]) };
  }
  return null;
}

export function selfConsistencyClinicalValidation(question = {}) {
  const solved = independentClinicalSolve(question);
  if (!solved) return { ok: true, errors: [], solved: null };
  const correctId = String(question.correctAnswer || '').toUpperCase();
  const correctText = normalizeTR(correctOptionText(question));
  const expected = normalizeTR(solved.expectedText || '');
  const idMatches = solved.expectedOptionId ? correctId === String(solved.expectedOptionId).toUpperCase() : true;
  const textMatches = expected ? correctText.includes(expected) || expected.includes(correctText)
    || (solved.ruleId === 'hyperkalemia-ecg-first-treatment' && /kalsiyum.*glukonat/.test(correctText))
    || (solved.ruleId === 'pulmonary-embolism-shock-risk' && HIGH_RISK_PE_PATTERNS.some((pattern) => pattern.test(correctText)))
    || (solved.ruleId === 'anaphylaxis-first-drug' && EPINEPHRINE_PATTERNS.some((pattern) => pattern.test(correctText)))
    || (solved.ruleId === 'sepsis-shock-bundle' && ANTIBIOTIC_PATTERNS.some((pattern) => pattern.test(correctText)) && FLUID_PATTERNS.some((pattern) => pattern.test(correctText)))
    : true;
  if (!idMatches || !textMatches) {
    return { ok: false, errors: [`self-consistency: validator ${solved.ruleId} için ${solved.expectedText} bekledi, generator ${getQuestionCorrectText(question) || question.correctAnswer} seçti`], solved };
  }
  return { ok: true, errors: [], solved };
}

export function repairScientificAccuracy(question = {}) {
  let repaired = mapObjectStrings(question, normalizeMedicalTurkishText);
  if (isHyperkalemiaFirstTreatmentQuestion(repaired)) repaired = buildHyperkalemiaRepair(repaired);
  if (isPEHighRiskClassificationQuestion(repaired)) repaired = buildPERepair(repaired);
  attachQuestionDedupeFields(repaired);
  return repaired;
}

export function scientificAccuracyGate(question = {}, { repair = false } = {}) {
  const candidate = repair ? repairScientificAccuracy(question) : question;
  const highRisk = validateHighRiskClinicalRules(candidate);
  const score = validateScoreAndClassificationUse(candidate);
  const optionQuality = validateOptionQuality(candidate);
  const consistency = answerFeedbackConsistencyGate(candidate);
  const languageErrors = validateTurkishLanguageQuality(candidate);
  const selfConsistency = selfConsistencyClinicalValidation(candidate);
  const errors = [
    ...highRisk.errors,
    ...score.errors,
    ...optionQuality.errors,
    ...consistency.errors,
    ...languageErrors,
    ...selfConsistency.errors,
  ];
  const warnings = [...highRisk.warnings, ...score.warnings, ...optionQuality.warnings];
  return {
    ok: errors.length === 0,
    question: candidate,
    errors: Array.from(new Set(errors)),
    warnings: Array.from(new Set(warnings)),
    matchedRules: highRisk.matchedRules || [],
    scoreSystems: score.scores || [],
    selfConsistency: selfConsistency.solved,
  };
}
