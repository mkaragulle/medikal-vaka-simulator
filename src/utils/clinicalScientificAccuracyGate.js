import { normalizeQuestionText } from './aiQuestionHistory.js';
import { attachQuestionDedupeFields, getQuestionCorrectText, toPlainText } from './questionDeduplication.js';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

export const highRiskClinicalRules = [
  {
    id: 'hyperkalemia-ecg-first-treatment',
    label: 'Hiperkalemi ve EKG değişiklikleri',
    risk: 'K+ ≥ 6.5 mEq/L veya EKG değişikliği varsa ilk tedavi kardiyak membran stabilizasyonudur.',
    expectedFirstStep: 'İntravenöz kalsiyum glukonat',
  },
  { id: 'anaphylaxis-first-drug', label: 'Anafilaksi / perioperatif anafilaksi', expectedFirstStep: 'Adrenalin temelli acil yaklaşım' },
  { id: 'dka-potassium-first-step', label: 'DKA ve potasyum', expectedFirstStep: 'Önce sıvı resüsitasyonu ve potasyum güvenliği' },
  { id: 'hypoglycemia-emergency', label: 'Hipoglisemi acil tedavisi', expectedFirstStep: 'Bilinç/IV erişim durumuna göre dekstroz veya glukagon' },
  { id: 'sepsis-shock-bundle', label: 'Sepsis / septik şok', expectedFirstStep: 'Erken sıvı, kültür-antibiyotik ve gerekirse vazopressör' },
  { id: 'pulmonary-embolism-stability', label: 'Pulmoner emboli stabil vs instabil ayrımı', expectedFirstStep: 'Hemodinamik duruma göre antikoagülasyon veya reperfüzyon' },
  { id: 'acs-stemi-reperfusion', label: 'ACS / STEMI ilk yaklaşım', expectedFirstStep: 'Reperfüzyon stratejisi ve antitrombotik tedavi' },
  { id: 'stroke-before-thrombolysis', label: 'İnme ve tromboliz öncesi görüntüleme', expectedFirstStep: 'Kanama dışlama için acil beyin görüntüleme' },
  { id: 'meningitis-lp-antibiotic', label: 'Menenjit ampirik tedavi ve LP öncesi kontrendikasyonlar', expectedFirstStep: 'Gecikmeden ampirik tedavi; BT/LP sırası kontrendikasyona göre' },
  { id: 'status-epilepticus-sequence', label: 'Status epileptikus tedavi sırası', expectedFirstStep: 'Benzodiazepin, ardından ikinci basamak antiepileptik' },
  { id: 'acute-asthma-copd', label: 'Akut astım / KOAH alevlenmesi', expectedFirstStep: 'Oksijen hedefi, bronkodilatör ve steroid bağlama göre' },
  { id: 'calcium-emergencies', label: 'Hiperkalsemi / hipokalsemi acil yaklaşım', expectedFirstStep: 'Semptom ve EKG durumuna göre acil elektrolit düzeltimi' },
  { id: 'toxicology-antidotes', label: 'Zehirlenmelerde antidot soruları', expectedFirstStep: 'Toksidroma ve antidot endikasyonuna göre tedavi' },
  { id: 'obstetric-emergencies', label: 'Obstetrik aciller', expectedFirstStep: 'Anne stabilizasyonu ve gebeliğe özgü acil yönetim' },
  { id: 'pediatric-red-flags', label: 'Pediatrik kırmızı bayraklar', expectedFirstStep: 'Yaşa göre hava yolu, dolaşım, sepsis/dehidratasyon riski' },
];

function normalizeTR(text = '') {
  return normalizeQuestionText(toPlainText(text))
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u');
}

function collectStrings(value, output = []) {
  if (typeof value === 'string') output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, output));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectStrings(item, output));
  return output;
}

function visibleClinicalBundle(question = {}) {
  return collectStrings({
    title: question.title,
    stem: question.stem,
    narrativeStem: question.narrativeStem,
    question: question.question,
    learningTarget: question.learningTarget,
    clinicalFocus: question.clinicalFocus,
    chiefComplaint: question.chiefComplaint,
    spotPearl: question.spotPearl,
    examPearls: question.examPearls,
    evidenceChain: question.evidenceChain,
    patientIntro: question.patientIntro,
    investigations: question.investigations,
    compactObjectiveData: question.compactObjectiveData,
    vitals: question.vitals,
    findings: question.findings,
    explanation: question.explanation,
    diagnosis: question.diagnosis,
    wrongOptionFeedback: question.wrongOptionFeedback,
  }).join(' | ');
}

function questionIntentText(question = {}) {
  return normalizeTR([question.question, question.learningTarget, question.clinicalFocus, question.diagnosis?.nextStep, question.spotPearl].filter(Boolean).join(' | '));
}

function asksFirstStep(question = {}) {
  return /\bilk\b|oncelikli|acil yaklasim|ilk basamak|ilk secenek|ilk yapilacak|hemen uygulan|ilk tedavi|en uygun ilk/.test(questionIntentText(question));
}

function optionMatches(optionText = '', patterns = []) {
  const normalized = normalizeTR(optionText);
  return patterns.some((pattern) => pattern.test(normalized));
}

function getOptions(question = {}) {
  return (Array.isArray(question.options) ? question.options : [])
    .map((option, index) => ({ id: String(option?.id || OPTION_IDS[index] || index + 1).toUpperCase(), text: String(option?.text || option || '').trim() }))
    .filter((option) => option.text);
}

function findOptionId(question = {}, patterns = []) {
  return getOptions(question).find((option) => optionMatches(option.text, patterns))?.id || null;
}

function hasCorrectOptionMatching(question = {}, patterns = []) {
  const correctId = String(question.correctAnswer || '').toUpperCase();
  const byId = getOptions(question).find((option) => option.id === correctId)?.text || '';
  const correctText = [byId, getQuestionCorrectText(question), question.diagnosis?.correct].filter(Boolean).join(' | ');
  return optionMatches(correctText, patterns);
}

function extractPotassiumValue(text = '') {
  const candidates = [];
  const regexes = [
    /(?:k\+?|k⁺|potasyum|serum\s*k\+?|serum\s*k⁺|serum\s+potasyumu)\s*[:=]?\s*(\d+(?:[.,]\d+)?)/giu,
    /(\d+(?:[.,]\d+)?)\s*(?:mEq\/L|mmol\/L)\s*(?:potasyum|k\+?|k⁺)/giu,
  ];
  regexes.forEach((regex) => {
    let match = regex.exec(text);
    while (match) {
      const value = Number(String(match[1]).replace(',', '.'));
      if (Number.isFinite(value) && value >= 3 && value <= 10) candidates.push(value);
      match = regex.exec(text);
    }
  });
  return candidates.length ? Math.max(...candidates) : null;
}

function hasHyperkalemiaContext(question = {}) {
  const rawBundle = visibleClinicalBundle(question);
  const bundle = normalizeTR(rawBundle);
  const potassium = extractPotassiumValue(rawBundle);
  return /hiperkalemi|hiperpotasemi|potasyum yuksekligi|k\+|k⁺/.test(bundle) || (potassium !== null && potassium >= 5.5);
}

function hasHyperkalemiaEcgChanges(question = {}) {
  const bundle = normalizeTR(visibleClinicalBundle(question));
  return /sivri\s*t|tepe\s*t|t\s*dalgasi|qrs\s*genis|pr\s*uzama|sine\s*wave|sinusoidal|bradikardi|iletim\s*bozuk|ventrikuler\s*aritmi|ekg.*degis|ecg.*degis/.test(bundle);
}

function isSevereHyperkalemiaWithEcg(question = {}) {
  const rawBundle = visibleClinicalBundle(question);
  const potassium = extractPotassiumValue(rawBundle);
  return hasHyperkalemiaContext(question) && (hasHyperkalemiaEcgChanges(question) || (potassium !== null && potassium >= 6.5));
}

function isHyperkalemiaFirstTreatmentQuestion(question = {}) {
  return isSevereHyperkalemiaWithEcg(question) && asksFirstStep(question);
}

const CALCIUM_PATTERNS = [/kalsiyum\s+glukonat/, /kalsiyum\s+tuzu/, /kardiyak\s+membran\s+stabil/];
const INSULIN_GLUCOSE_PATTERNS = [/insulin.*glukoz/, /insulin.*dekstroz/, /insulin.*dextroz/, /insulin\s*\+\s*glukoz/, /insulin\s*\+\s*dekstroz/];
const DIALYSIS_PATTERNS = [/diyaliz/, /hemodiyaliz/];
const BICARBONATE_PATTERNS = [/bikarbonat/, /sodyum\s+bikarbonat/];
const BETA_AGONIST_PATTERNS = [/albuterol/, /salbutamol/, /beta\s*agonist/];

function hasConflictingFeedback(question = {}) {
  const correct = normalizeTR(getQuestionCorrectText(question) || question.diagnosis?.correct || '');
  const bundle = normalizeTR(visibleClinicalBundle(question));
  if (isHyperkalemiaFirstTreatmentQuestion(question)) {
    if (/insulin.*glukoz|insulin.*dekstroz/.test(correct)) return true;
    if (/kalsiyum.*yeterli\s+degil|kalsiyum.*tek\s+basina\s+yeterli\s+kilmaz|kalsiyum.*gundeme\s+gelebilir/.test(bundle)) return true;
    if (/hiperkalemi.*ekg.*ilk.*kalsiyum/.test(bundle) && !/kalsiyum/.test(correct)) return true;
  }
  return false;
}

function normalizeMedicalTurkishText(text = '') {
  return String(text || '')
    .replace(/T\s*dalgalar[ıi]\s*tepelem[ıiış]+/giu, 'sivri T dalgaları')
    .replace(/\btall\s*T\s*waves?\b/giu, 'sivri T dalgaları')
    .replace(/\bwidened\s*QRS\b/giu, 'QRS genişlemesi')
    .replace(/\bwide\s*QRS\b/giu, 'QRS genişlemesi')
    .replace(/\bDializ\b/gu, 'Diyaliz')
    .replace(/\bdializ\b/gu, 'diyaliz')
    .replace(/\bCa\+\+\b/gu, 'kalsiyum')
    .replace(/\binsulin\s*\+\s*glucose\b/giu, 'intravenöz insülin + glukoz')
    .replace(/\binsulin\b/giu, 'insülin')
    .replace(/\bglucose\b/giu, 'glukoz')
    .replace(/\bIV\s+kalsiyum\b/gu, 'intravenöz kalsiyum')
    .replace(/\bIV\s+insülin\b/gu, 'intravenöz insülin')
    .replace(/\bIV\s+insulin\b/giu, 'intravenöz insülin')
    .replace(/\bEKG'de\s*sivri\s*T\b/gu, "EKG'de sivri T dalgaları")
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

function makeHyperkalemiaFeedbackMap(options = []) {
  return Object.fromEntries(options
    .filter((option) => !optionMatches(option.text, CALCIUM_PATTERNS))
    .map((option) => {
      const normalized = normalizeTR(option.text);
      if (INSULIN_GLUCOSE_PATTERNS.some((pattern) => pattern.test(normalized))) {
        return [option.id, 'İntravenöz insülin + glukoz doğru tedavi basamağıdır; potasyumu hücre içine kaydırır. Ancak EKG değişikliği varken ilk basamak kardiyak membranı stabilize etmek için intravenöz kalsiyum glukonattır.'];
      }
      if (BETA_AGONIST_PATTERNS.some((pattern) => pattern.test(normalized))) {
        return [option.id, 'Albuterol/salbutamol potasyumu hücre içine kaydırmaya yardımcı olabilir; fakat EKG bulgulu ciddi hiperkalemide tek başına ilk seçenek değildir.'];
      }
      if (BICARBONATE_PATTERNS.some((pattern) => pattern.test(normalized))) {
        return [option.id, 'Sodyum bikarbonat metabolik asidoz varsa yardımcı olabilir; rutin ilk basamak değildir ve EKG bulgulu tabloda kalsiyumun yerine geçmez.'];
      }
      if (DIALYSIS_PATTERNS.some((pattern) => pattern.test(normalized))) {
        return [option.id, 'Diyaliz böbrek yetmezliği, tedaviye dirençli hiperkalemi veya ağır kalıcı olguda düşünülür; EKG bulgulu acil tabloda ilk refleks kardiyak membran stabilizasyonudur.'];
      }
      return [option.id, `${option.text} bazı hiperkalemi bağlamlarında gündeme gelebilir; ancak EKG değişikliği varken ilk basamak intravenöz kalsiyum glukonat ile kardiyak membran stabilizasyonudur.`];
    }));
}

function buildHyperkalemiaRepair(question = {}) {
  const currentOptions = getOptions(question);
  let options = currentOptions.length === 5 ? currentOptions : [];
  let calciumId = findOptionId({ ...question, options }, CALCIUM_PATTERNS);

  if (!calciumId) {
    options = [
      { id: 'A', text: 'Sodyum bikarbonat infüzyonu' },
      { id: 'B', text: 'Diyaliz' },
      { id: 'C', text: 'Albuterol inhalasyonu' },
      { id: 'D', text: 'İntravenöz kalsiyum glukonat' },
      { id: 'E', text: 'İntravenöz insülin + glukoz' },
    ];
    calciumId = 'D';
  }

  options = options.map((option) => ({ ...option, text: normalizeMedicalTurkishText(option.text) }));
  const correctOption = options.find((option) => option.id === calciumId) || options[3];
  const whyCorrect = 'Serum K⁺ 6.8 mEq/L ile birlikte sivri T dalgaları ve QRS genişlemesi, EKG bulgulu ciddi hiperkalemiyi gösterir. Bu tabloda ilk basamak intravenöz kalsiyum glukonat ile kardiyak membranı stabilize etmektir. Kalsiyum potasyumu düşürmez; ancak ölümcül aritmi riskini hızla azaltır. İntravenöz insülin + glukoz hemen ardından potasyumu hücre içine kaydırmak için uygulanır.';
  const evidenceChain = [
    'Ciddi hiperkalemi: Serum K⁺ 6.8 mEq/L.',
    'EKG etkilenimi: Sivri T dalgaları ve QRS genişlemesi.',
    'Tedavi basamağı: EKG değişikliği varsa önce kardiyak membran stabilizasyonu gerekir.',
  ];
  const examPearl = 'Hiperkalemi + EKG değişikliği = ilk intravenöz kalsiyum glukonat. İntravenöz insülin + glukoz potasyumu hücre içine kaydırır ama kalsiyumdan sonra gelir.';
  const wrongById = makeHyperkalemiaFeedbackMap(options);
  const whyWrongByText = Object.fromEntries(options
    .filter((option) => option.id !== correctOption.id)
    .map((option) => [option.text, wrongById[option.id]]));
  const differentialComparison = Object.fromEntries(options
    .filter((option) => option.id !== correctOption.id)
    .map((option) => [option.text, {
      explanation: wrongById[option.id],
      comparisonPoints: [
        'EKG bulgulu ciddi hiperkalemide ölümcül aritmi riski önce azaltılır.',
        'Kalsiyum potasyumu düşürmez; kardiyak membranı stabilize eder.',
        'Potasyumu hücre içine kaydıran veya uzaklaştıran tedaviler stabilizasyondan sonra planlanır.',
      ],
    }]));

  const repaired = mapObjectStrings({ ...question }, normalizeMedicalTurkishText);
  Object.assign(repaired, {
    title: 'Hiperkalemi ve EKG değişikliği',
    relatedBranch: question.relatedBranch || 'İç Hastalıkları',
    branchName: question.branchName || question.relatedBranch || 'İç Hastalıkları',
    spotCategory: question.spotCategory || 'AI Spot • İç Hastalıkları',
    difficulty: question.difficulty || 'TUS Spot · Zor',
    learningTarget: 'EKG bulgulu ciddi hiperkalemide ilk tedavi basamağını ayırt etmek',
    clinicalFocus: 'EKG değişikliği olan hiperkalemide önce kardiyak membran stabilizasyonu yapılır.',
    demographics: '45 yaşında erkek',
    setting: 'Acil servis',
    chiefComplaint: 'Halsizlik ve kas güçsüzlüğü',
    stem: 'Hipertansiyon ve kalp yetmezliği nedeniyle spironolakton kullanan 45 yaşındaki erkek hasta, halsizlik ve kas güçsüzlüğü yakınmasıyla acil servise başvurur. Serum potasyumu 6.8 mEq/L saptanır. EKG’de sivri T dalgaları ve QRS genişlemesi görülür.',
    narrativeStem: 'Hipertansiyon ve kalp yetmezliği nedeniyle spironolakton kullanan 45 yaşındaki erkek hasta, halsizlik ve kas güçsüzlüğü yakınmasıyla acil servise başvurur. Serum potasyumu 6.8 mEq/L saptanır. EKG’de sivri T dalgaları ve QRS genişlemesi görülür.',
    question: 'Bu hastada uygulanması gereken ilk tedavi basamağı aşağıdakilerden hangisidir?',
    questionType: 'treatment',
    options,
    correctAnswer: correctOption.id,
    explanation: whyCorrect,
    evidenceChain,
    examPearls: [examPearl],
    wrongOptionFeedback: wrongById,
    vitals: question.vitals && Object.keys(question.vitals || {}).length ? question.vitals : { TA: '128/76 mmHg', Nabız: '58/dk', Solunum: '18/dk', 'SpO₂': '%97 oda havasında', Ateş: '36.8 °C' },
    exam: ['Genel durum orta; bilinç açık.', 'Kas güçsüzlüğü dışında lateralizan nörolojik defisit saptanmaz.'],
    investigations: [
      {
        id: 'hyperkalemia-serum-potassium-ecg',
        label: 'Serum potasyumu ve EKG',
        type: 'Ecg',
        priority: 'essential',
        summary: 'Serum K⁺: 6.8 mEq/L. EKG’de sivri T dalgaları ve QRS genişlemesi izlenir.',
        findings: [
          'Serum K⁺: 6.8 mEq/L; ciddi hiperkalemi düzeyindedir.',
          'EKG: sivri T dalgaları ve QRS genişlemesi; kardiyak membran etkilenimini gösterir.',
        ],
        rows: [
          ['Serum K⁺', '6.8 mEq/L', '3.5–5.0 mEq/L', 'Yüksek'],
          ['EKG', 'Sivri T dalgaları, QRS genişlemesi', 'Normal iletim', 'Kritik'],
        ],
      },
    ],
  });

  repaired.findings = {
    ...(repaired.findings || {}),
    history: [repaired.stem],
    exam: repaired.exam,
    vitals: repaired.vitals,
    investigations: repaired.investigations,
  };
  repaired.patientIntro = {
    ...(repaired.patientIntro || {}),
    profile: `${repaired.demographics} · ${repaired.setting}`,
    presentation: repaired.chiefComplaint,
    riskContext: [
      'Spironolakton kullanımı hiperkalemi riskini artırır.',
      'Serum K⁺ 6.8 mEq/L ciddi hiperkalemi düzeyindedir.',
      'EKG değişikliği ölümcül aritmi riskini acil hale getirir.',
    ],
    distinctiveClues: [
      'Serum K⁺ 6.8 mEq/L',
      'Sivri T dalgaları',
      'QRS genişlemesi',
      'İlk hedef kardiyak membran stabilizasyonudur.',
    ],
    historySummary: repaired.stem,
    priorityFocus: 'EKG bulgulu ciddi hiperkalemide ilk basamak intravenöz kalsiyum glukonattır.',
  };
  repaired.diagnosis = {
    ...(repaired.diagnosis || {}),
    correct: correctOption.text,
    options: options.map((option) => option.text),
    explanation: whyCorrect,
    nextStep: 'Monitörizasyon ve damar yolu sağlanır; EKG değişikliği nedeniyle intravenöz kalsiyum glukonat verilir. Ardından intravenöz insülin + glukoz ve potasyumu uzaklaştıran tedaviler planlanır.',
    pearls: [examPearl],
    answerFeedback: {
      ...(repaired.diagnosis?.answerFeedback || {}),
      whyCorrect,
      evidenceChain,
      pearls: [examPearl],
      clinicalPearls: [examPearl],
      whyWrong: whyWrongByText,
      differentialComparison,
      managementSteps: [
        'Monitörizasyon ve damar yolu sağla.',
        'EKG değişikliği nedeniyle intravenöz kalsiyum glukonat ile kardiyak membranı stabilize et.',
        'Ardından intravenöz insülin + glukoz, beta agonist ve potasyum uzaklaştırıcı tedavileri planla.',
      ],
      learningOutcome: repaired.learningTarget,
      feedbackStandardVersion: 'Scientific-accuracy-gate-v1',
    },
  };
  repaired.aiMeta = {
    ...(repaired.aiMeta || {}),
    scientificAccuracyGateRepaired: true,
    scientificAccuracyRule: 'hyperkalemia-ecg-first-treatment',
  };
  attachQuestionDedupeFields(repaired);
  return repaired;
}

function validateHyperkalemiaRule(question = {}) {
  const errors = [];
  const warnings = [];
  if (!isHyperkalemiaFirstTreatmentQuestion(question)) return { errors, warnings };
  if (!hasCorrectOptionMatching(question, CALCIUM_PATTERNS)) {
    errors.push('hyperkalemia-rule: EKG bulgulu ciddi hiperkalemide ilk tedavi intravenöz kalsiyum glukonat olmalı');
  }
  if (hasCorrectOptionMatching(question, INSULIN_GLUCOSE_PATTERNS)) {
    errors.push('hyperkalemia-rule: insülin + glukoz EKG bulgulu hiperkalemide ilk cevap yapılamaz');
  }
  if (hasConflictingFeedback(question)) {
    errors.push('hyperkalemia-rule: doğru cevap, spot bilgi veya feedback arasında hiperkalemi tedavi sırası çelişkisi var');
  }
  const calciumId = findOptionId(question, CALCIUM_PATTERNS);
  if (!calciumId) warnings.push('hyperkalemia-rule: seçeneklerde kalsiyum glukonat yok; repair ideal seçenek setini kurmalı');
  return { errors, warnings };
}

function validateAnaphylaxisRule(question = {}) {
  const bundle = normalizeTR(visibleClinicalBundle(question));
  const correct = normalizeTR(getQuestionCorrectText(question) || question.diagnosis?.correct || '');
  if (!/anafil|urtiker/.test(bundle) || !/hipotansiyon|bronkospazm|hisiltili|dusuk spo|sok/.test(bundle) || !asksFirstStep(question)) return { errors: [], warnings: [] };
  if (!/adrenalin|epinefrin|tetikleyici.*durdur/.test(correct)) {
    return { errors: ['anaphylaxis-rule: anafilaksi acil tedavi sorusunda adrenalin/epinefrin temelli yaklaşım doğru cevapta yok'], warnings: [] };
  }
  return { errors: [], warnings: [] };
}

function validateDkaRule(question = {}) {
  const bundle = normalizeTR(visibleClinicalBundle(question));
  const correct = normalizeTR(getQuestionCorrectText(question) || question.diagnosis?.correct || '');
  if (!/dka|diyabetik ketoasidoz|ketoasidoz/.test(bundle) || !asksFirstStep(question)) return { errors: [], warnings: [] };
  if (/insulin/.test(correct) && !/sivi|izotonik|potasyum/.test(correct)) {
    return { errors: ['dka-rule: DKA ilk yaklaşımında sıvı ve potasyum güvenliği atlanmış; tek başına insülin ilk cevap olamaz'], warnings: [] };
  }
  return { errors: [], warnings: [] };
}

function validateStrokeRule(question = {}) {
  const bundle = normalizeTR(visibleClinicalBundle(question));
  const correct = normalizeTR(getQuestionCorrectText(question) || question.diagnosis?.correct || '');
  if (!/inme|stroke|hemiparezi|afazi|akut norolojik/.test(bundle) || !/tromboliz|alteplaz|rtpa|reperfuzyon|ilk/.test(questionIntentText(question))) return { errors: [], warnings: [] };
  if (/tromboliz|alteplaz|rtpa/.test(correct) && !/bt|tomografi|kanama.*dis|goruntuleme/.test(bundle + ' ' + correct)) {
    return { errors: ['stroke-rule: tromboliz kararı öncesi intrakraniyal kanama dışlanmalıdır'], warnings: [] };
  }
  return { errors: [], warnings: [] };
}

function validateFeedbackConsistency(question = {}) {
  const errors = [];
  const correctText = normalizeTR(getQuestionCorrectText(question) || question.diagnosis?.correct || '');
  const feedback = normalizeTR([
    question.explanation,
    question.spotPearl,
    question.examPearls,
    question.evidenceChain,
    question.diagnosis?.explanation,
    question.diagnosis?.answerFeedback?.whyCorrect,
    question.diagnosis?.answerFeedback?.clinicalPearls,
    question.diagnosis?.answerFeedback?.managementSteps,
  ].map(toPlainText).join(' | '));
  if (!correctText) errors.push('answer-feedback-consistency: doğru cevap metni bulunamadı');
  if (isHyperkalemiaFirstTreatmentQuestion(question) && /kalsiyum/.test(feedback) && /insulin.*glukoz|insulin.*dekstroz/.test(correctText)) {
    errors.push('answer-feedback-consistency: feedback kalsiyumu ilk basamak anlatırken doğru cevap insülin + glukoz seçilmiş');
  }
  if (/tek\s+basina\s+yeterli\s+kilmaz|gundeme\s+gelebilir/.test(feedback) && /kalsiyum/.test(feedback) && isHyperkalemiaFirstTreatmentQuestion(question)) {
    errors.push('answer-feedback-consistency: kalsiyum glukonat için yasak/yanlış yetersizlik açıklaması var');
  }
  return errors;
}

function validateTurkishLanguageQuality(question = {}) {
  const errors = [];
  collectStrings(question).forEach((raw) => {
    const text = String(raw || '');
    if (/T\s*dalgalar[ıi]\s*tepelem/iu.test(text)) errors.push('turkish-quality: bozuk ifade "T dalgaları tepelemiş" yerine "sivri T dalgaları" kullanılmalı');
    if (/\btall\s*T\b|\bwidened\s*QRS\b/iu.test(text)) errors.push('turkish-quality: açıklamasız İngilizce EKG terimi var');
    if (/\binsulin\s*\+\s*glucose\b/iu.test(text)) errors.push('turkish-quality: insulin+glucose yerine intravenöz insülin + glukoz kullanılmalı');
    if (/\bDializ\b/u.test(text)) errors.push('turkish-quality: Dializ yerine Diyaliz yazılmalı');
    if (/\bCa\+\+\b/u.test(text)) errors.push('turkish-quality: Ca++ yerine kalsiyum/kalsiyum glukonat yazılmalı');
    if (/Klinik öncelik belirlenir|Ayırt ettirici bulgular hedefe yönelik yorumlanır|Bu seçeneği tek başına yeterli kılmaz|Bazı klinik durumlarda gündeme gelebilir/iu.test(text)) {
      errors.push('turkish-quality: şablon veya öğretici olmayan feedback ifadesi var');
    }
  });
  return Array.from(new Set(errors));
}

export function answerFeedbackConsistencyGate(question = {}) {
  const errors = validateFeedbackConsistency(question);
  return { ok: errors.length === 0, errors };
}

export function validateHighRiskClinicalRules(question = {}) {
  const results = [
    validateHyperkalemiaRule(question),
    validateAnaphylaxisRule(question),
    validateDkaRule(question),
    validateStrokeRule(question),
  ];
  const errors = results.flatMap((result) => result.errors || []);
  const warnings = results.flatMap((result) => result.warnings || []);
  return { ok: errors.length === 0, errors: Array.from(new Set(errors)), warnings: Array.from(new Set(warnings)) };
}

export function independentClinicalSolve(question = {}) {
  if (isHyperkalemiaFirstTreatmentQuestion(question)) {
    return {
      ruleId: 'hyperkalemia-ecg-first-treatment',
      expectedText: 'İntravenöz kalsiyum glukonat',
      expectedOptionId: findOptionId(question, CALCIUM_PATTERNS),
    };
  }
  const anaphylaxis = validateAnaphylaxisRule(question);
  if (anaphylaxis.errors.length) return { ruleId: 'anaphylaxis-first-drug', expectedText: 'Adrenalin/epinefrin temelli acil yaklaşım', expectedOptionId: findOptionId(question, [/adrenalin/, /epinefrin/]) };
  return null;
}

export function selfConsistencyClinicalValidation(question = {}) {
  const solved = independentClinicalSolve(question);
  if (!solved) return { ok: true, errors: [], solved: null };
  const correctId = String(question.correctAnswer || '').toUpperCase();
  const correctText = normalizeTR(getQuestionCorrectText(question) || question.diagnosis?.correct || '');
  const expected = normalizeTR(solved.expectedText || '');
  const idMatches = solved.expectedOptionId ? correctId === String(solved.expectedOptionId).toUpperCase() : true;
  const textMatches = expected ? correctText.includes(expected) || expected.includes(correctText) || (solved.ruleId === 'hyperkalemia-ecg-first-treatment' && /kalsiyum.*glukonat/.test(correctText)) : true;
  if (!idMatches || !textMatches) {
    return { ok: false, errors: [`self-consistency: validator ${solved.ruleId} için ${solved.expectedText} bekledi, generator ${getQuestionCorrectText(question) || question.correctAnswer} seçti`], solved };
  }
  return { ok: true, errors: [], solved };
}

export function repairScientificAccuracy(question = {}) {
  let repaired = mapObjectStrings(question, normalizeMedicalTurkishText);
  if (isHyperkalemiaFirstTreatmentQuestion(repaired)) repaired = buildHyperkalemiaRepair(repaired);
  attachQuestionDedupeFields(repaired);
  return repaired;
}

export function scientificAccuracyGate(question = {}, { repair = false } = {}) {
  const candidate = repair ? repairScientificAccuracy(question) : question;
  const highRisk = validateHighRiskClinicalRules(candidate);
  const consistency = answerFeedbackConsistencyGate(candidate);
  const languageErrors = validateTurkishLanguageQuality(candidate);
  const selfConsistency = selfConsistencyClinicalValidation(candidate);
  const errors = [
    ...highRisk.errors,
    ...consistency.errors,
    ...languageErrors,
    ...selfConsistency.errors,
  ];
  const warnings = highRisk.warnings;
  return {
    ok: errors.length === 0,
    question: candidate,
    errors: Array.from(new Set(errors)),
    warnings: Array.from(new Set(warnings)),
    selfConsistency: selfConsistency.solved,
  };
}
