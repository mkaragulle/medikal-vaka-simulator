const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

const BRANCH_ALIASES = new Map([
  ['random', 'Rastgele'],
  ['rastgele', 'Rastgele'],
]);

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/(?:\.\.\.|…)+/g, '')
    .trim();
}


function stripDisplayResidue(value = '') {
  return cleanText(value)
    .replace(/^\s*[A-E]\s*\)\s*[A-E]\s*\)?\s*/iu, '')
    .replace(/^\s*[A-E]\s+feedback\s*[:：.-]?\s*/iu, '')
    .replace(/\b(?:öğrenme hedefi|hedeflenen ayırıcı|kısıtlama|gereken klinik soru)\s*[:：][^.?!]*(?:[.?!]|$)/giu, ' ')
    .replace(/\b(?:Ek klinik verilerde|Tetkik ve destekleyici bulgularda)\s*[:：]?\s*/giu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function standardizeTurkishMedicalText(value = '') {
  let text = stripDisplayResidue(value);
  const replacements = [
    [/\byonlendirme\b/giu, 'yönlendirme'], [/\byonlendir/giu, 'yönlendir'],
    [/\blife[-\s]?threatening\b/giu, 'yaşamı tehdit eden'], [/\bstemde\b/giu, 'soru kökünde'],
    [/\btherapeutic\b/giu, 'terapötik'], [/\bvaginal\b/giu, 'vajinal'], [/\bkontraendike\b/giu, 'kontrendike'],
    [/\birreversibl\b/giu, 'geri dönüşümsüz'], [/\bchylomikron\b/giu, 'şilomikron'], [/\bchylomicron\b/giu, 'şilomikron'],
    [/\bacinar\b/giu, 'asiner'], [/\bchemoresept[oö]r\b/giu, 'kemoreseptör'], [/\bkemoreseptor\b/giu, 'kemoreseptör'],
    [/\bcavern[oö]z\b/giu, 'kavernöz'], [/\bkranial\b/giu, 'kraniyal'], [/\btubul(?:us)?\b/giu, 'tübül'],
    [/\bglomerul\b/giu, 'glomerül'], [/\bdiffus\b/giu, 'diffüz'], [/\bembryolojik\b/giu, 'embriyolojik'],
    [/\binfeksiyon\b/giu, 'enfeksiyon'], [/\boportunistik\b/giu, 'fırsatçı'], [/\bopportunistik\b/giu, 'fırsatçı'],
    [/\bdenozin\b/giu, 'adenozin'], [/\bomurga reseptör\b/giu, 'antijen reseptör'],
    [/\bakciğusda\b/giu, 'akciğerde'], [/\bprofılaktik\b/giu, 'profilaktik'],
    [/\bcontrastli\b/giu, 'kontrastlı'], [/\banjiografi\b/giu, 'anjiyografi'], [/\bnöral krista\b/giu, 'nöral krest'],
    [/\bintraivazöz\b/giu, 'intravenöz'], [/\baktiv\b/giu, 'aktif'], [/\bintraabdomenel\b/giu, 'intraabdominal'],
    [/\blaparatomi\b/giu, 'laparotomi'], [/\bspesifiktedir\b/giu, 'spesifiktir'], [/\bgösterür\b/giu, 'gösterir'],
    [/\btoplumsal kazanımlı pnömoni\b/giu, 'toplum kökenli pnömoni'], [/\bbilinç bulan hasta\b/giu, 'bilinci bulanık hasta'],
  ];
  replacements.forEach(([pattern, replacement]) => { text = text.replace(pattern, replacement); });
  return cleanText(text);
}

function isEmptyLike(value = '') {
  const text = cleanText(value);
  return !text || /^[-–—:;.,]*$/u.test(text) || /^(boş|yok|belirtilmedi|null|undefined)$/iu.test(text);
}

function ensureSentence(value = '') {
  const text = cleanText(value).replace(/[\s,;:]+$/u, '');
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function ensureQuestion(value = '') {
  const text = cleanText(value).replace(/[\s,;:.]+$/u, '');
  if (!text) return 'Bu olguda en uygun seçenek hangisidir?';
  return /\?$/u.test(text) ? text : `${text}?`;
}

function normalizeDifficulty(value = 'Orta') {
  const text = cleanText(value).toLocaleLowerCase('tr');
  if (/kolay|easy/.test(text)) return 'Kolay';
  if (/zor|hard/.test(text)) return 'Zor';
  return 'Orta';
}

export function normalizeForCompare(value = '') {
  return cleanText(value)
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/[âîû]/g, (match) => ({ â: 'a', î: 'i', û: 'u' }[match] || match))
    .replace(/[^a-z0-9çğıöşü\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function stableHash(value = '') {
  const text = normalizeForCompare(value);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `q${(hash >>> 0).toString(36)}`;
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function compactItems(items = []) {
  const seen = new Set();
  const out = [];
  asArray(items).forEach((item) => {
    let label = '';
    let value = '';
    if (typeof item === 'string') {
      const [first, ...rest] = item.split(/[:：]/u);
      label = first;
      value = rest.join(':');
    } else if (item && typeof item === 'object') {
      label = item.label || item.name || item.parameter || item.title || '';
      value = item.value || item.result || item.text || '';
    }
    label = standardizeTurkishMedicalText(label);
    value = standardizeTurkishMedicalText(value);
    if (isEmptyLike(label) || isEmptyLike(value)) return;
    const key = normalizeForCompare(`${label} ${value}`);
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ label, value });
  });
  return out;
}


function compactDisplayItems(items = []) {
  const seen = new Set();
  const out = [];
  asArray(items).forEach((item) => {
    let text = '';
    if (typeof item === 'string') {
      text = standardizeTurkishMedicalText(item);
    } else if (item && typeof item === 'object') {
      const label = standardizeTurkishMedicalText(item.label || item.name || item.parameter || item.title || item.key || '');
      const value = standardizeTurkishMedicalText(item.value || item.result || item.text || item.finding || item.data || '');
      text = [label, value].filter(Boolean).join(': ');
    }
    text = ensureSentence(text);
    if (isEmptyLike(text)) return;
    const key = normalizeForCompare(text);
    if (seen.has(key)) return;
    seen.add(key);
    out.push(text);
  });
  return out;
}

function normalizeOptions(rawOptions = []) {
  const arr = Array.isArray(rawOptions) ? rawOptions : [];
  return OPTION_IDS.map((id, index) => {
    const source = arr.find((item) => String(item?.id || '').toUpperCase() === id) ?? arr[index];
    let text = standardizeTurkishMedicalText(typeof source === 'string' ? source : source?.text || source?.label || '');
    text = text.replace(/^\s*[A-E]\s*\)\s*/iu, '').trim();
    return { id, text };
  }).filter((item) => item.text);
}

function getCorrectOption(options = [], correctAnswer = '') {
  const correctId = String(correctAnswer || '').trim().toUpperCase();
  return options.find((option) => option.id === correctId) || options[0] || null;
}


function containsAnswerLeak(text = '', correct = '') {
  const value = normalizeForCompare(text);
  const answer = normalizeForCompare(correct);
  return Boolean(value && answer && value.includes(answer));
}

function isManagementTarget(answerTarget = '') {
  return /^(first_step|next_step|treatment|prevention|management|emergency|emergency_approach|initial_management)$/iu.test(cleanText(answerTarget));
}

function buildDifferentialComparison({ options = [], correctOption, optionRationales = {}, wrongOptionFeedback = {} }) {
  return options.reduce((acc, option) => {
    if (!option?.text) return acc;
    const raw = optionRationales?.[option.id] || wrongOptionFeedback?.[option.id] || '';
    const explanation = ensureSentence(raw || (option.id === correctOption?.id
      ? ''
      : ''));
    if (option.id !== correctOption?.id) {
      acc[option.text] = { explanation, comparisonPoints: [explanation] };
    }
    return acc;
  }, {});
}

function makeVitalsObject(compactVitals = []) {
  const vitals = { TA: '', Nabız: '', Solunum: '', Ateş: '', 'SpO₂': '' };
  compactVitals.forEach((item) => {
    const label = cleanText(item.label);
    if (/^ta$|kan basıncı/i.test(label)) vitals.TA = item.value;
    else if (/nabız/i.test(label)) vitals.Nabız = item.value;
    else if (/solunum/i.test(label)) vitals.Solunum = item.value;
    else if (/ateş|ates/i.test(label)) vitals.Ateş = item.value;
    else if (/spo/i.test(label)) vitals['SpO₂'] = item.value;
  });
  return vitals;
}

function buildEvidence(evidence = []) {
  const items = asArray(evidence)
    .map((item) => {
      if (typeof item === 'object' && item) {
        const type = cleanText(item.type || item.label || 'İpucu');
        const clue = cleanText(item.clue || item.data || item.finding || item.text || '');
        const meaning = cleanText(item.meaning || item.interpretation || '');
        return [type, clue, meaning].filter(Boolean).join(' — ');
      }
      return cleanText(item);
    })
    .filter(Boolean);
  const unique = [];
  const seen = new Set();
  items.forEach((item) => {
    const key = normalizeForCompare(item);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(ensureSentence(item));
    }
  });
  return unique;
}

export function makeSimpleSignature(question = {}) {
  const correct = question?.diagnosis?.correct || question?.correctAnswerText || '';
  const optionText = Array.isArray(question?.options)
    ? question.options.map((item) => item?.text || item).sort().join(' | ')
    : '';
  return `simple-${stableHash([
    question.relatedBranch || question.branchName,
    question.stem,
    question.question,
    correct,
    optionText,
  ].filter(Boolean).join(' :: '))}`;
}

export function isTooSimilarToRecent(question = {}, recent = []) {
  const correct = normalizeForCompare(question.diagnosis?.correct || question.correctAnswerText || '');
  const stem = normalizeForCompare(question.stem || '');
  const optionSet = normalizeForCompare((question.diagnosis?.options || []).slice().sort().join(' | '));
  const signature = question.contentSignature || makeSimpleSignature(question);

  return asArray(recent).some((item) => {
    const itemCorrect = normalizeForCompare(item.correct || item.correctAnswer || '');
    const itemStem = normalizeForCompare(item.stem || item.normalizedStem || '');
    const itemOptions = normalizeForCompare(asArray(item.optionTexts).slice().sort().join(' | ') || item.optionSetSignature || '');
    const itemSignature = item.contentSignature || item.semanticFingerprint || item.signature || '';
    if (itemSignature && signature && itemSignature === signature) return true;
    if (correct && itemCorrect && correct === itemCorrect && optionSet && itemOptions && (optionSet === itemOptions || optionSet.includes(itemOptions) || itemOptions.includes(optionSet))) return true;
    if (stem && itemStem && (stem === itemStem || stem.includes(itemStem) || itemStem.includes(stem))) return true;
    return false;
  });
}


function sanitizeNarrativeStem(stem = '', { demographics = '', setting = '', chiefComplaint = '', branch = '' } = {}) {
  const story = standardizeTurkishMedicalText(stem);
  if (story) return ensureSentence(story);
  const dem = standardizeTurkishMedicalText(demographics || 'Hasta');
  const set = standardizeTurkishMedicalText(setting || 'klinik değerlendirmede');
  const cc = standardizeTurkishMedicalText(chiefComplaint || 'yakınmaları');
  const lowerSetting = set ? set.charAt(0).toLocaleLowerCase('tr') + set.slice(1) : 'klinik değerlendirmede';
  const context = /kadın hastalıkları|doğum/iu.test(branch)
    ? 'Gebelik durumu, muayene bulguları ve objektif veriler birlikte yorumlanmaktadır.'
    : 'Öykü, muayene ve objektif veriler birlikte klinik karar için değerlendirilmektedir.';
  return `${dem}, ${cc} nedeniyle ${lowerSetting} değerlendirilmektedir. ${context}`;
}

function rationalesObject(raw = {}) {
  const normalizeFeedbackValue = (value = '') => ensureSentence(standardizeTurkishMedicalText(value));
  if (Array.isArray(raw)) {
    return OPTION_IDS.reduce((acc, id, index) => {
      acc[id] = normalizeFeedbackValue(raw[index] || '');
      return acc;
    }, {});
  }
  return OPTION_IDS.reduce((acc, id) => {
    const value = raw?.[id] || raw?.[id.toLowerCase()] || raw?.[`option${id}`] || '';
    acc[id] = normalizeFeedbackValue(value);
    return acc;
  }, {});
}

export function normalizeSimpleAIQuestion(payload = {}, meta = {}) {
  if (payload?.diagnosis?.correct && Array.isArray(payload?.diagnosis?.options)) {
    const signature = payload.contentSignature || makeSimpleSignature(payload);
    return {
      ...payload,
      contentSignature: signature,
      generationSignature: payload.generationSignature || signature,
      semanticFingerprint: payload.semanticFingerprint || signature,
    };
  }

  const options = normalizeOptions(payload.options || payload.o);
  const correctOption = getCorrectOption(options, payload.correctAnswer || payload.c);
  const correctText = cleanText(correctOption?.text || payload.correctAnswerText || '');
  const compactVitals = compactItems(payload.compactVitals || payload.cv || payload.vitals || []);
  const compactObjectiveData = compactItems(payload.compactObjectiveData || payload.co || payload.objectiveData || []);
  const physicalExam = compactDisplayItems(payload.physicalExam || payload.exam || payload.muayene || []);
  const branch = standardizeTurkishMedicalText(payload.relatedBranch || payload.branch || payload.b || meta.branchFilter || 'TUS');
  const normalizedBranch = BRANCH_ALIASES.get(normalizeForCompare(branch)) || branch;
  const subtopic = standardizeTurkishMedicalText(payload.subtopic || payload.altKonu || payload.topic || '');
  const generatedTitle = standardizeTurkishMedicalText(payload.title || payload.baslik || payload['başlık'] || '');
  const demographics = standardizeTurkishMedicalText(payload.demographics || payload.dem || '');
  const setting = standardizeTurkishMedicalText(payload.setting || payload.set || '');
  const chiefComplaint = standardizeTurkishMedicalText(payload.chiefComplaint || payload.cc || '');
  const stem = sanitizeNarrativeStem(payload.clinicalStem || payload.stem || payload.s || '', { demographics, setting, chiefComplaint, branch: normalizedBranch });
  const evidenceChain = buildEvidence(payload.evidenceChain || payload.evidence || payload.k)
    .filter((item) => !containsAnswerLeak(item, correctText))

  const answerTarget = cleanText(payload.answerTarget || payload.at || payload.questionIntent || payload.intent || '');
  const managementSteps = isManagementTarget(answerTarget)
    ? asArray(payload.managementSteps || payload.management || payload.m || []).map((item) => ensureSentence(standardizeTurkishMedicalText(item))).filter(Boolean)
    : [];
  const shortClinicalSummary = ensureSentence(standardizeTurkishMedicalText(payload.shortClinicalSummary || payload.clinicalSummary || payload.kisaKlinikOzet || payload['kısaKlinikÖzet'] || ''));
  const examPearl = ensureSentence(standardizeTurkishMedicalText(payload.examPearl || payload.teachingPoint || payload.pearl || payload.p || ''));
  const explanation = ensureSentence(standardizeTurkishMedicalText(payload.explanation || payload.whyCorrect || payload.e || ''));
  const optionRationales = rationalesObject(payload.optionRationales || payload.wrongOptionFeedback || payload.optionFeedback || payload.rationales || payload.f || {});

  const question = {
    id: cleanText(payload.id) || `ai-spot-simple-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    source: payload.source || meta.source || 'real-ai',
    caseType: 'ai-spot',
    branchId: 'tus-spot-olgular',
    branchName: normalizedBranch,
    title: generatedTitle || standardizeTurkishMedicalText(payload.learningTarget || payload.target || payload.lt || normalizedBranch),
    relatedBranch: normalizedBranch,
    subtopic,
    spotCategory: subtopic ? `${normalizedBranch} • ${subtopic}` : `AI Spot • ${normalizedBranch}`,
    difficulty: normalizeDifficulty(payload.difficulty || payload.d || meta.difficulty || 'Orta'),
    learningTarget: standardizeTurkishMedicalText(payload.learningTarget || payload.target || payload.lt || ''),
    answerTarget,
    demographics,
    setting,
    chiefComplaint,
    stem,
    narrativeStem: stem,
    stemMode: 'narrative',
    shortClinicalSummary,
    coreKnowledge: shortClinicalSummary,
    compactVitals,
    compactObjectiveData,
    vitals: makeVitalsObject(compactVitals),
    exam: physicalExam,
    history: asArray(payload.history).map(standardizeTurkishMedicalText).filter(Boolean),
    investigations: compactObjectiveData,
    findings: {
      history: asArray(payload.history).map(standardizeTurkishMedicalText).filter(Boolean),
      exam: physicalExam,
      vitals: makeVitalsObject(compactVitals),
      investigations: compactObjectiveData,
    },
    question: ensureQuestion(standardizeTurkishMedicalText(payload.question || payload.q || 'Bu olguda en uygun seçenek hangisidir?')),
    questionType: cleanText(payload.questionType || payload.questionIntent || 'spot'),
    clinicalFocus: standardizeTurkishMedicalText(payload.learningTarget || payload.target || payload.lt || ''),
    options,
    correctAnswer: correctOption?.id || 'A',
    managementSequence: { enabled: false, showInSpot: false, steps: [] },
    patientIntro: {
      profile: demographics || normalizedBranch,
      presentation: chiefComplaint,
      riskContext: '',
      distinctiveClues: evidenceChain,
      historySummary: stem,
    },
    diagnosis: {
      correct: correctText,
      options: options.map((option) => option.text),
      explanation,
      nextStep: cleanText(payload.nextStep || ''),
      pearls: [examPearl].filter(Boolean),
      answerFeedback: {
        whyCorrect: explanation,
        shortClinicalSummary,
        correctOptionFeedback: ensureSentence(optionRationales?.[correctOption?.id] || ''),
        optionRationales,
        evidenceChain: evidenceChain.length ? evidenceChain : [],
        pearls: [examPearl].filter(Boolean),
        clinicalPearls: [examPearl].filter(Boolean),
        differentialComparison: buildDifferentialComparison({ options, correctOption, optionRationales, wrongOptionFeedback: optionRationales }),
        managementSteps,
        learningOutcome: standardizeTurkishMedicalText(payload.learningTarget || payload.target || payload.lt || ''),
      },
    },
    aiMeta: {
      generatedAt: Date.now(),
      provider: meta.provider || payload.provider || 'openai',
      model: meta.model || payload.model || payload.openAIModel || null,
      remote: meta.remote !== false,
      fallback: Boolean(meta.fallback || payload.fallback),
      validationWarnings: asArray(payload.qualityNotes || payload.warnings),
      publishQualityReview: payload.aiMeta?.publishQualityReview || payload.publishQualityReview || null,
      finalQualityCheck: payload.finalQualityCheck || payload.qualityCheck || null,
      repaired: Boolean(payload.aiMeta?.repaired || payload.repaired),
    },
  };

  const signature = makeSimpleSignature(question);
  question.contentSignature = signature;
  question.generationSignature = signature;
  question.semanticFingerprint = payload.semanticFingerprint || signature;
  question.aiMeta.signature = signature;
  return question;
}

const FALLBACK_BANK = [];

export function createSimpleFallbackQuestion() {
  throw new Error('Yerel fallback soru bankası kaldırıldı. Yalnızca TUS AI Spot gerçek AI endpointi aktiftir.');
}
