const TR_LOCALE = 'tr';

function normalize(value = '') {
  return String(value ?? '')
    .toLocaleLowerCase(TR_LOCALE)
    .replace(/[ıİ]/gu, 'i')
    .replace(/[ğĞ]/gu, 'g')
    .replace(/[üÜ]/gu, 'u')
    .replace(/[şŞ]/gu, 's')
    .replace(/[öÖ]/gu, 'o')
    .replace(/[çÇ]/gu, 'c')
    .replace(/[^a-z0-9+/% ]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

function collectText(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectText(item, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectText(item, out));
  return out;
}

function optionTexts(question = {}) {
  return (Array.isArray(question.options) ? question.options : [])
    .map((option) => (typeof option === 'string' ? option : option?.text))
    .filter(Boolean)
    .join(' | ');
}

function correctText(question = {}) {
  const correctId = String(question.correctAnswer || '').toUpperCase();
  const option = (Array.isArray(question.options) ? question.options : [])
    .find((item) => String(item?.id || '').toUpperCase() === correctId);
  return option?.text || question.correctAnswerText || question.diagnosis?.correct || '';
}

function preAnswerBundle(question = {}) {
  return normalize([
    question.relatedBranch,
    question.branchName,
    question.title,
    question.learningTarget,
    question.demographics,
    question.setting,
    question.chiefComplaint,
    question.stem,
    question.narrativeStem,
    JSON.stringify(question.compactVitals || []),
    JSON.stringify(question.compactObjectiveData || []),
    JSON.stringify(question.findings?.history || []),
    JSON.stringify(question.findings?.exam || []),
    JSON.stringify(question.findings?.vitals || {}),
    JSON.stringify(question.findings?.investigations || []),
    question.question,
  ].filter(Boolean).join(' | '));
}

function postAnswerBundle(question = {}) {
  return normalize([
    optionTexts(question),
    correctText(question),
    question.explanation,
    question.examPearl,
    JSON.stringify(question.wrongOptionFeedback || {}),
    JSON.stringify(question.evidenceChain || []),
    JSON.stringify(question.managementSteps || []),
    JSON.stringify(question.diagnosis?.answerFeedback || {}),
  ].filter(Boolean).join(' | '));
}

function countMatches(text, patterns = []) {
  return patterns.reduce((count, pattern) => count + (pattern.test(text) ? 1 : 0), 0);
}

const CLINICAL_CLUSTERS = [
  {
    id: 'ongoing_seizure',
    source: [/\bnobet\b/u, /tonik klonik/u, /epilepsi/u, /status epilept/u, /konvul/],
    expected: [/benzodiazepin/u, /diazepam/u, /lorazepam/u, /midazolam/u, /antiepileptik/u, /fenitoin/u, /levetirasetam/u, /valproat/u],
    foreign: [/hiperkalem/u, /potasyum/u, /serum k/u, /sivri t/u, /qrs/u, /kalsiyum glukonat/u, /insulin\s*\+\s*glukoz/u, /albuterol/u, /hemodiyaliz/u, /diyaliz/u],
  },
  {
    id: 'electrolyte_hyperkalemia',
    source: [/hiperkalem/u, /potasyum/u, /serum k/u, /sivri t/u, /qrs/u],
    expected: [/kalsiyum/u, /insulin/u, /glukoz/u, /salbutamol/u, /albuterol/u, /bikarbonat/u, /diyaliz/u, /potasyum/u],
    foreign: [/benzodiazepin/u, /tonik klonik/u, /nobet/u, /epilepsi/u, /levetirasetam/u, /fenitoin/u],
  },
  {
    id: 'sle_activity_monitoring',
    source: [/\bsle\b/u, /lupus/u, /proteinuri/u, /hematuri/u, /kompleman/u],
    expected: [/anti dsdna/u, /anti-dsdna/u, /c3/u, /c4/u, /kompleman/u, /proteinuri/u, /hematuri/u],
    foreign: [/sakroiliak/u, /hla b27/u, /anti ccp/u, /mitokondriyal/u],
    foreignAllowedInOptions: true,
  },
  {
    id: 'oral_rehydration_mechanism',
    source: [/ishal/u, /kusma/u, /dehidrat/u, /oral rehidrat/u, /rehidrasyon/u],
    expected: [/glukoz/u, /sodyum/u, /kotransport/u, /enterosit/u, /su emil/u, /oral rehidrat/u],
    foreign: [/mukozal tutulum/u, /döküntu/u, /dokuntu/u, /ateş ve döküntu/u, /kawasaki/u, /anafil/u, /hiperkalem/u],
  },
  {
    id: 'systemic_allergic_reaction',
    source: [/urtiker/u, /dudak/u, /alerjik/u, /anafil/u, /ari sok/u, /hisi/],
    expected: [/adrenalin/u, /epinefrin/u, /oksijen/u, /hava yolu/u, /kristaloid/u, /antihistaminik/u, /steroid/u],
    foreign: [/anti dsdna/u, /kalsiyum glukonat/u, /benzodiazepin/u],
  },
];

const BAD_META_PATTERNS = [
  /veri\s*[.:]\s*(oyku|öykü)\s*[—-]\s*\1/u,
  /hangi .* hangisidir.*bu alternatifin/u,
  /bu olguda .* hangisidir.*seçenekler aras/u,
  /iliskili bir alternatif gibi gorunse/u,
  /tek en iyi yanit yapacak duzeyde desteklemez/u,
  /bu karar duzeyinde oncelikli yaniti karsilamadigi/u,
  /ana ipuclarini tek basina aciklamaz/u,
  /farkli klinik tabloda uygun olabilir/u,
  /kapiller dolum.*bu bulgulari en iyi aciklayan mekanizma/u,
];

function validateClusterCoherence(question = {}) {
  const errors = [];
  const pre = preAnswerBundle(question);
  const post = postAnswerBundle(question);
  const options = normalize(optionTexts(question));
  CLINICAL_CLUSTERS.forEach((cluster) => {
    const sourceHits = countMatches(pre, cluster.source);
    if (!sourceHits) return;
    const expectedHits = countMatches(post, cluster.expected);
    const foreignText = cluster.foreignAllowedInOptions ? post.replace(options, '') : post;
    const foreignHits = countMatches(foreignText, cluster.foreign);
    if (foreignHits >= 2 && expectedHits === 0) errors.push(`clinical-contamination:${cluster.id}`);
    if (foreignHits >= 3 && expectedHits <= 1) errors.push(`cross-topic-feedback:${cluster.id}`);
  });
  return errors;
}

function validateBranchQuestionCoherence(question = {}) {
  const errors = [];
  const branch = normalize(`${question.relatedBranch || ''} ${question.branchName || ''}`);
  const pre = preAnswerBundle(question);
  const post = postAnswerBundle(question);
  if (/pediatri|cocuk sagligi|cocuk hastaliklari/.test(branch) && /\b[3-9][0-9]\s+yas\b|yasli|postmenopoz/.test(pre)) {
    errors.push('branch-age-mismatch:pediatrics');
  }
  if (/noroloji|nöroloji/.test(branch) && /kalsiyum glukonat|hiperkalem|potasyum|diyaliz/.test(post) && /nobet|epilepsi|tonik klonik/.test(pre)) {
    errors.push('branch-feedback-mismatch:neurology-seizure-vs-electrolyte');
  }
  if (/romatoloji|ic hastaliklari/.test(branch) && /uzun donem izlem veya idame yaklasimi/.test(post) && /laboratuvar.*kombinasyon|aktivite/.test(pre)) {
    errors.push('answer-target-feedback-mismatch:laboratory-vs-long-term');
  }
  return errors;
}

function validateMetaAndTruncation(question = {}) {
  const errors = [];
  const texts = collectText({
    explanation: question.explanation,
    examPearl: question.examPearl,
    evidenceChain: question.evidenceChain,
    wrongOptionFeedback: question.wrongOptionFeedback,
    managementSteps: question.managementSteps,
    answerFeedback: question.diagnosis?.answerFeedback,
  });
  texts.forEach((raw) => {
    const text = normalize(raw);
    if (!text) return;
    BAD_META_PATTERNS.forEach((pattern) => {
      if (pattern.test(text)) errors.push(`meta-template-contamination:${String(raw).slice(0, 90)}`);
    });
  });
  return errors;
}

export function validateClinicalCoherenceHardGate(question = {}) {
  const errors = [
    ...validateClusterCoherence(question),
    ...validateBranchQuestionCoherence(question),
    ...validateMetaAndTruncation(question),
  ];
  return { ok: errors.length === 0, errors: Array.from(new Set(errors)) };
}
