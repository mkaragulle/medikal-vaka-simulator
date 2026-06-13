const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const TR_LOCALE = 'tr';

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/\s+/gu, ' ')
    .replace(/\s+([,.;:!?])/gu, '$1')
    .replace(/([,;:!?])(?=\S)/gu, '$1 ')
    .trim();
}

function normalizeText(value = '') {
  return cleanText(value)
    .toLocaleLowerCase(TR_LOCALE)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[ıİ]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .replace(/[^a-z0-9+/%°\s-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function collectStrings(value, output = []) {
  if (typeof value === 'string') output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, output));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectStrings(item, output));
  return output;
}

function compactItems(items = [], max = Number.POSITIVE_INFINITY) {
  const seen = new Set();
  const output = [];
  asArray(items).forEach((item) => {
    const label = cleanText(typeof item === 'string' ? item.split(/[:：]/u)[0] : item?.label || item?.name || item?.parameter || item?.title || '');
    const value = cleanText(typeof item === 'string' ? item.split(/[:：]/u).slice(1).join(':') : item?.value || item?.result || item?.text || item?.finding || '');
    if (!label && !value) return;
    const key = normalizeText(`${label} ${value}`);
    if (!key || seen.has(key)) return;
    seen.add(key);
    output.push({ label, value });
  });
  return output.slice(0, max);
}

function normalizeOptions(rawOptions = []) {
  const arr = Array.isArray(rawOptions) ? rawOptions : [];
  return OPTION_IDS.map((id, index) => {
    const source = arr.find((item) => String(item?.id || '').toUpperCase() === id) ?? arr[index];
    const text = cleanText(typeof source === 'string' ? source : source?.text || source?.label || '');
    return text ? { id, text } : null;
  }).filter(Boolean);
}

function normalizeFeedbackMap(question = {}, options = normalizeOptions(question.options)) {
  const raw = question.optionFeedback || question.wrongOptionFeedback || question.optionRationales || question.rationales || {};
  const output = {};
  OPTION_IDS.forEach((id) => {
    const optionText = options.find((option) => option.id === id)?.text || '';
    output[id] = cleanText(raw?.[id] || raw?.[optionText] || '');
  });
  return output;
}

function classifyClinicalData(items = []) {
  const buckets = { laboratoryData: [], imagingData: [], microbiologyData: [], pathologyData: [], objectiveData: [] };
  compactItems(items).forEach((item) => {
    const key = normalizeText(`${item.label} ${item.value}`);
    if (/kultur|pcr|gram|boyama|duyarlilik|oksidaz|dnaz|bakteri|virus|viral|mikrobiyoloji/.test(key)) buckets.microbiologyData.push(item);
    else if (/biyopsi|histoloji|patoloji|immünohistokimya|immunohistokimya|ihk|nekroz|inflamasyon|malignite/.test(key)) buckets.pathologyData.push(item);
    else if (/grafi|bt|mr|mrg|usg|ultrason|tomografi|ekokardiyografi|eko|radyoloji|goruntuleme|anjiyografi|ekg|ecg/.test(key)) buckets.imagingData.push(item);
    else if (/lökosit|lokosit|wbc|crp|hemoglobin|trombosit|platelet|plt|glukoz|sodyum|na|potasyum|kreatinin|ure|bun|ph|hco3|laktat|troponin|d-dimer|ast|alt|bilirubin|tsh|t4|t3|mg\/dl|mg\/l|mmol|meq|iu|u\/l|ng\/ml|pg\/ml/.test(key)) buckets.laboratoryData.push(item);
    else buckets.objectiveData.push(item);
  });
  buckets.objectiveData = [...buckets.objectiveData, ...buckets.laboratoryData, ...buckets.imagingData, ...buckets.microbiologyData, ...buckets.pathologyData];
  return buckets;
}

export function normalizeQuestionQualityFields(question = {}) {
  const options = normalizeOptions(question.options);
  const correctAnswer = String(question.correctAnswer || question.correctOptionId || question.answerKey || '').trim().toUpperCase();
  const correctOption = options.find((option) => option.id === correctAnswer);
  const stem = cleanText(question.questionStem || question.stem || question.narrativeStem || question.patientIntro?.historySummary || '');
  const vitalSigns = compactItems(question.vitalSigns || question.compactVitals || question.vitals || []);
  const explicitObjective = [
    ...(compactItems(question.objectiveData || question.compactObjectiveData || question.supportingData || [])),
    ...(compactItems(question.laboratoryData || [])),
    ...(compactItems(question.imagingData || [])),
    ...(compactItems(question.microbiologyData || [])),
    ...(compactItems(question.pathologyData || [])),
  ];
  const classified = classifyClinicalData(explicitObjective);
  const optionFeedback = normalizeFeedbackMap(question, options);
  return {
    ...question,
    questionStem: stem,
    stem,
    options,
    correctAnswer,
    correctOptionId: correctAnswer,
    correctAnswerText: cleanText(question.correctAnswerText || correctOption?.text || ''),
    explanation: cleanText(question.explanation || question.diagnosis?.explanation || question.diagnosis?.answerFeedback?.whyCorrect || ''),
    optionFeedback,
    wrongOptionFeedback: optionFeedback,
    objectiveData: classified.objectiveData,
    vitalSigns,
    compactVitals: vitalSigns,
    compactObjectiveData: classified.objectiveData,
    laboratoryData: compactItems(question.laboratoryData || classified.laboratoryData),
    imagingData: compactItems(question.imagingData || classified.imagingData),
    microbiologyData: compactItems(question.microbiologyData || classified.microbiologyData),
    pathologyData: compactItems(question.pathologyData || classified.pathologyData),
    diagnosisTarget: cleanText(question.diagnosisTarget || question.learningTarget || question.answerTarget || ''),
    caseType: cleanText(question.caseType || 'ai-question'),
  };
}

const PLACEHOLDER_PATTERNS = [
  /bu secenek klinik baglamda oncelikli degildir/u,
  /verilen bulgularla yeterince uyumlu degildir/u,
  /temel karar noktasini aciklamaz/u,
  /temel karar noktasini desteklemez/u,
  /bu nedenle uygun degildir/u,
  /ayirici tanida dusunulmez/u,
  /feedback uretilemedi/u,
  /ayirt ettirici feedback uretilemedi/u,
  /detayli aciklama eklenemedi/u,
  /aciklama bulunamadi/u,
  /bu secenek yanlistir/u,
  /bu secenek dogrudur/u,
  /klinik baglamda degerlendirilir/u,
  /kendi tipik oyku muayene veya tetkik paterni varsa guc kazanir/u,
];

function isPlaceholderFeedback(text = '') {
  const normalized = normalizeText(text);
  if (!normalized || normalized.length < 42) return true;
  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(normalized));
}

function visibleSourceText(question = {}) {
  return normalizeText([
    question.demographics,
    question.setting,
    question.chiefComplaint,
    question.questionStem,
    question.stem,
    question.question,
    ...compactItems(question.vitalSigns || question.compactVitals || []).flatMap((item) => [item.label, item.value]),
    ...compactItems(question.objectiveData || question.compactObjectiveData || []).flatMap((item) => [item.label, item.value]),
    ...compactItems(question.laboratoryData || []).flatMap((item) => [item.label, item.value]),
    ...compactItems(question.imagingData || []).flatMap((item) => [item.label, item.value]),
    ...compactItems(question.microbiologyData || []).flatMap((item) => [item.label, item.value]),
    ...compactItems(question.pathologyData || []).flatMap((item) => [item.label, item.value]),
  ].filter(Boolean).join(' | '));
}

function postAnswerText(question = {}) {
  return cleanText([
    question.explanation,
    question.examPearl,
    ...asArray(question.evidenceChain),
    ...Object.values(question.optionFeedback || question.wrongOptionFeedback || {}),
    ...asArray(question.managementSteps),
  ].filter(Boolean).join(' | '));
}

const CRITICAL_GROUNDING_RULES = [
  ['age_sex_timing', /\b(?:yas|yaş|erkek|kadin|kadın|gebe|gebelik|gunluk|günlük|aylik|aylık|haftalik|haftalık|saat|gun|gün|hafta|ay|yil|yıl)\b/u],
  ['symptom', /\b(?:ates|ateş|agri|ağrı|dispne|oksuruk|öksürük|kusma|ishal|kanama|sarilik|sarılık|dokuntu|döküntü|nobet|nöbet|halsizlik|bilinc|bilinç)\b/u],
  ['physical_exam', /\b(?:muayene|defans|rebound|ufurum|üfürüm|odem|ödem|purpura|artralji|hepatomegali|splenomegali|meningeal|fokal defisit|kapiller dolum)\b/u],
  ['vital_sign', /\b(?:kan basinci|kan basıncı|tansiyon|nabiz|nabız|spo2|spo|saturasyon|satürasyon|hipotansiyon|hipoksi|tasikardi|taşikardi|bradikardi|solunum)\b/u],
  ['laboratory_data', /\b(?:trombosit|plt|platelet|lokosit|lökosit|wbc|crp|hemoglobin|glukoz|sodyum|potasyum|kreatinin|ure|üre|bun|ph|hco3|laktat|troponin|pt|aptt|inr|idrar|proteinuri|proteinüri|hematuri|hematüri)\b/u],
  ['imaging_data', /\b(?:grafi|bt|mr|mrg|usg|ultrason|tomografi|goruntuleme|görüntüleme|ekg|eko|ekokardiyografi)\b/u],
  ['micro_path_genetic', /\b(?:kultur|kültür|pcr|gram|biyopsi|histoloji|patoloji|genetik|mutasyon|enzim|ihk|mikrobiyoloji)\b/u],
  ['history_exposure', /\b(?:aile oykusu|aile öyküsü|ilac|ilaç|steroid|antibiyotik|antikoagulan|seyahat|travma|temas|maruziyet|asi|aşı|enfeksiyon)\b/u],
];

function hasPatientSpecificCue(sentence = '') {
  const normalized = normalizeText(sentence);
  return /\b(?:bu olgu|bu hasta|bu bebek|bu cocuk|bu vakada|olguda|hastada|bebekte|burada|verilen|muayenede|laboratuvarda|tetkikte|goruntulemede|sonuclarda|oykude|öyküde|mevcut)\b/u.test(normalized)
    || /\b(?:normal|dusuk|düşük|yuksek|yüksek|pozitif|negatif|saptanir|saptanır|saptanmaz|yok|var|izlenir|eslik eder|eşlik eder|eslik etmez|eşlik etmez)\b/u.test(normalized);
}

function sentenceHasRule(sentence = '', pattern) {
  return pattern.test(normalizeText(sentence));
}

function validateGrounding(question = {}) {
  const visible = visibleSourceText(question);
  const sentences = postAnswerText(question).split(/(?<=[.!?])\s+/u).filter(Boolean);
  const unsupported = new Set();
  sentences.forEach((sentence) => {
    if (!hasPatientSpecificCue(sentence)) return;
    CRITICAL_GROUNDING_RULES.forEach(([id, pattern]) => {
      if (sentenceHasRule(sentence, pattern) && !pattern.test(visible)) unsupported.add(id);
    });
  });
  return Array.from(unsupported);
}

const STRICT_PATIENT_REFERENCE_PATTERN = /\b(?:bu olgu|bu hasta|bu bebek|bu cocuk|bu vakada|olguda|hastada|bebekte|cocukta|muayenede|laboratuvarda|tetkikte|goruntulemede|sonuclarda|oykude)\b/u;
const EXPLICIT_MARKER_GROUPS = [
  ['laboratory_data', ['trombosit', 'platelet', 'plt', 'lokosit', 'lökosit', 'wbc', 'crp', 'hemoglobin', 'glukoz', 'sodyum', 'osmolalite', 'potasyum', 'kreatinin', 'ure', 'bun', 'hco3', 'laktat', 'troponin', 'inr', 'aptt', 'proteinuri', 'hematuri']],
  ['vital_sign', ['kan basinci', 'tansiyon', 'nabiz', 'spo2', 'saturasyon', 'ates', 'solunum']],
  ['imaging_data', ['grafi', 'bt', 'mr', 'mrg', 'usg', 'ultrason', 'tomografi', 'ekg', 'eko', 'goruntuleme']],
  ['micro_path_genetic', ['kultur', 'pcr', 'gram', 'biyopsi', 'histoloji', 'patoloji', 'genetik', 'mutasyon', 'enzim']],
  ['history_exposure', ['aile oykusu', 'ilac', 'steroid', 'antibiyotik', 'seyahat', 'travma', 'temas', 'maruziyet', 'asi']],
];

function includesMarker(text = '', marker = '') {
  const normalized = normalizeText(text);
  const key = normalizeText(marker);
  return Boolean(key && normalized.includes(key));
}

function validateExplicitMarkerGrounding(question = {}) {
  const visible = visibleSourceText(question);
  const sentences = postAnswerText(question).split(/(?<=[.!?])\s+/u).filter(Boolean);
  const unsupported = new Set();
  sentences.forEach((sentence) => {
    const normalized = normalizeText(sentence);
    if (!STRICT_PATIENT_REFERENCE_PATTERN.test(normalized)) return;
    EXPLICIT_MARKER_GROUPS.forEach(([group, markers]) => {
      const hasUnsupportedMarker = markers.some((marker) => includesMarker(normalized, marker) && !includesMarker(visible, marker));
      if (hasUnsupportedMarker) unsupported.add(group);
    });
  });
  return Array.from(unsupported);
}

function cueGroups(question = {}) {
  const visible = visibleSourceText(question);
  const groups = [
    ['profile', /\b(?:yas|yaş|gunluk|günlük|aylik|aylık|erkek|kadin|kadın|bebek|cocuk|çocuk|ergen|eriskin|erişkin|gebe|gebelik|yenidogan|yenidoğan)\b/u],
    ['time_course', /\b(?:saat|gun|gün|hafta|ay|yil|yıl|akut|kronik|tekrarlayan|son|baslayan|başlayan|ilerleyen|azalan|artan)\b/u],
    ['symptoms', /\b(?:ates|ateş|agri|ağrı|dispne|oksuruk|öksürük|kusma|ishal|kanama|sarilik|sarılık|dokuntu|döküntü|nobet|nöbet|halsizlik|bilinc|bilinç)\b/u],
    ['exam', /\b(?:muayene|defans|rebound|ufurum|üfürüm|odem|ödem|purpura|artralji|hepatomegali|splenomegali|meningeal|fokal|kapiller|turgor)\b/u],
    ['vitals', /\b(?:kan basinci|kan basıncı|tansiyon|nabiz|nabız|spo2|saturasyon|satürasyon|hipotansiyon|hipoksi|tasikardi|taşikardi|bradikardi|solunum)\b/u],
    ['labs', /\b(?:trombosit|lokosit|lökosit|wbc|crp|hemoglobin|glukoz|sodyum|potasyum|kreatinin|ph|hco3|laktat|troponin|pt|aptt|inr|idrar|proteinuri|proteinüri|hematuri|hematüri|mg\/dl|mmol|meq)\b/u],
    ['imaging_or_micro', /\b(?:grafi|bt|mr|mrg|usg|ultrason|tomografi|ekg|eko|kultur|kültür|pcr|gram|biyopsi|histoloji|patoloji)\b/u],
    ['risk_context', /\b(?:aile|ilac|ilaç|seyahat|travma|temas|maruziyet|asi|aşı|gebelik|premature|prematüre|operasyon|ameliyat)\b/u],
    ['negative_data', /\b(?:yok|saptanmaz|normal|negatif|eslik etmez|eşlik etmez|stabil|afebril|korunmus|korunmuş)\b/u],
  ];
  return groups.filter(([, pattern]) => pattern.test(visible)).map(([id]) => id);
}

function demandLevel(question = {}) {
  const text = normalizeText([question.question, question.answerTarget, question.diagnosisTarget, question.learningTarget].filter(Boolean).join(' '));
  if (/ilk|oncelikli|öncelikli|acil|tedavi|mudahale|müdahale|yaklasim|yaklaşim|yonetim|yönetim|profilaksi|kesin tani|kesin tanı|dogrulama|doğrulama/.test(text)) return 'high';
  return 'standard';
}

function validateFeedback(question = {}) {
  const errors = [];
  const feedback = question.optionFeedback || {};
  const texts = [];
  OPTION_IDS.forEach((id) => {
    const text = cleanText(feedback[id] || '');
    texts.push([id, normalizeText(text)]);
    if (!text) errors.push(`option-feedback-missing:${id}`);
    else if (isPlaceholderFeedback(text)) errors.push(`option-feedback-placeholder-or-weak:${id}`);
    if (text && !/[.!?]$/u.test(text)) errors.push(`option-feedback-broken-sentence:${id}`);
  });
  for (let i = 0; i < texts.length; i += 1) {
    for (let j = i + 1; j < texts.length; j += 1) {
      if (texts[i][1] && texts[i][1] === texts[j][1]) errors.push(`option-feedback-duplicated:${texts[i][0]}-${texts[j][0]}`);
    }
  }
  return errors;
}

function validateAnswerKeyConsistency(question = {}) {
  const errors = [];
  const correctText = cleanText(question.correctAnswerText);
  const correctId = String(question.correctAnswer || '').toUpperCase();
  const explanation = normalizeText(question.explanation);
  const correctFeedback = normalizeText(question.optionFeedback?.[correctId] || '');
  if (!OPTION_IDS.includes(correctId)) errors.push('correct-answer-id-invalid');
  if (!correctText) errors.push('correct-answer-text-missing');
  if (correctText && normalizeText(question.questionStem).includes(normalizeText(correctText))) errors.push('answer-leak-in-stem');
  const otherOptions = question.options.filter((option) => option.id !== correctId);
  otherOptions.forEach((option) => {
    const optionNorm = normalizeText(option.text);
    const optionWords = optionNorm.split(/\s+/u).filter((word) => word.length >= 5);
    const mentionsOption = (text = '') => optionNorm.length >= 5 && (
      text.includes(optionNorm)
      || (optionWords.length >= 2 && optionWords.every((word) => text.includes(word)))
      || (optionWords.length === 1 && text.includes(optionWords[0]))
    );
    const supportivePattern = /\b(?:dogru|doğru|en iyi|uygun yanit|uygun yanıt|secilir|seçilir|destekler|lehine|uyumludur)\b/u;
    const negatedPattern = /\b(?:degil|değil|olmadig\w*|olmadığ\w*|olmadi\w*|olmadı\w*|desteklemez|zayiflatir|zayıflatır|beklenmez|secilmez|seçilmez|dislar|dışlar)\b/u;
    const suspiciousSupport = explanation
      .split(/[.;!?]/u)
      .map((clause) => clause.trim())
      .filter(Boolean)
      .some((clause) => mentionsOption(clause) && supportivePattern.test(clause) && !negatedPattern.test(clause));
    if (suspiciousSupport) {
      errors.push(`explanation-may-support-other-option:${option.id}`);
    }
  });
  if (!correctFeedback || isPlaceholderFeedback(correctFeedback)) errors.push('correct-option-feedback-not-specific');
  if (/\b(?:desteklemez|zayiflatir|zayıflatır|secilmez|seçilmez|uygun degildir|uygun değildir|beklenmez|elinir|elenir)\b/u.test(correctFeedback)) {
    errors.push('correct-option-feedback-contradicts-answer');
  }
  return errors;
}

function validateDifficulty(question = {}) {
  const errors = [];
  const difficulty = normalizeText(question.difficulty || '');
  const cues = cueGroups(question);
  if (/zor|hard/.test(difficulty) && cues.length <= 3) errors.push('difficulty-hard-but-stem-data-thin');
  if (cues.length <= 2) errors.push('missing-critical-data-not-a-hard-question');
  return errors;
}

function validateTextIntegrity(question = {}) {
  const errors = [];
  collectStrings({
    stem: question.questionStem,
    question: question.question,
    explanation: question.explanation,
    optionFeedback: question.optionFeedback,
    evidenceChain: question.evidenceChain,
    examPearl: question.examPearl,
  }).forEach((text) => {
    const clean = cleanText(text);
    const normalized = normalizeText(clean);
    if (!clean) return;
    if (/\.{3}|…/u.test(clean)) errors.push(`truncated-text:${clean.slice(0, 90)}`);
    if (/\b(?:ve|veya|ile|icin|için|ancak|fakat|olarak|saglayarak|sağlayarak)\.?$/u.test(normalized)) errors.push(`broken-ending:${clean.slice(0, 90)}`);
    if (/^(?:da|de)\s+[a-z0-9]/u.test(normalized)) errors.push(`orphan-connector:${clean.slice(0, 90)}`);
  });
  return errors;
}

function validateSchema(question = {}) {
  const errors = [];
  if (!question.questionStem || question.questionStem.length < 40) errors.push('question-stem-missing-or-too-thin');
  if (!question.question || !/\?$/u.test(cleanText(question.question))) errors.push('question-target-missing');
  if (question.options.length !== 5) errors.push('options-not-five');
  if (!question.explanation || question.explanation.length < 50) errors.push('explanation-missing-or-too-thin');
  if (!question.learningTarget && !question.diagnosisTarget && !question.answerTarget) errors.push('diagnosis-target-or-learning-objective-missing');
  return errors;
}

function validateFrontendCompatibility(question = {}) {
  const warnings = [];
  const explicitDataCount = [
    ...compactItems(question.vitalSigns || []),
    ...compactItems(question.objectiveData || []),
    ...compactItems(question.laboratoryData || []),
    ...compactItems(question.imagingData || []),
    ...compactItems(question.microbiologyData || []),
    ...compactItems(question.pathologyData || []),
  ].length;
  if (explicitDataCount && !compactItems(question.compactVitals || []).length && !compactItems(question.compactObjectiveData || []).length) {
    warnings.push('frontend-data-panel-empty-despite-structured-data');
  }
  return warnings;
}

export function runQuestionQualityGate(rawQuestion = {}, options = {}) {
  const question = normalizeQuestionQualityFields(rawQuestion);
  const errors = [];
  const warnings = [];
  errors.push(...validateSchema(question));
  errors.push(...validateFeedback(question));
  errors.push(...validateAnswerKeyConsistency(question));
  errors.push(...validateDifficulty(question));
  errors.push(...validateTextIntegrity(question));
  const unsupported = Array.from(new Set([...validateGrounding(question), ...validateExplicitMarkerGrounding(question)]));
  if (unsupported.length) errors.push(`explanation-to-stem-grounding:${unsupported.join(',')}`);
  const cues = cueGroups(question);
  if (cues.length < (demandLevel(question) === 'high' ? 4 : 3)) errors.push(`stem-sufficiency-failed:${cues.join(',') || 'no-cues'}`);
  warnings.push(...validateFrontendCompatibility(question));

  const uniqueErrors = Array.from(new Set(errors));
  const uniqueWarnings = Array.from(new Set(warnings));
  const decision = uniqueErrors.length ? 'manual_review_required' : 'publishable';
  return {
    ok: uniqueErrors.length === 0,
    decision,
    publishable: uniqueErrors.length === 0,
    errors: uniqueErrors,
    warnings: uniqueWarnings,
    cues,
    demand: demandLevel(question),
    question,
    version: options.version || 'global-question-quality-gate-v1',
  };
}
