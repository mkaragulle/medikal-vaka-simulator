const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .trim();
}

function normalizeMedicalTurkish(value = '') {
  return cleanText(value)
    .replace(/\bacil\s*[-‑]?\s*CoA\b/giu, 'açil-CoA')
    .replace(/\bacylcarnitine\b/giu, 'açilkarnitin')
    .replace(/\bcreatinine\b/giu, 'kreatinin')
    .replace(/\bhipokalseüri\b/giu, 'hipokalsiüri')
    .replace(/\bdistal\s+tubulus(?:ta)?\b/giu, (m) => /ta$/iu.test(m) ? 'distal tübülde' : 'distal tübül')
    .replace(/\bsupressed\s+renin\b/giu, 'baskılanmış renin')
    .replace(/\blacerasyon\b/giu, 'laserasyon')
    .replace(/\bRetine\s+plasenta\b/giu, 'Retansiyone plasenta')
    .replace(/\bretine\s+plasenta\b/giu, 'retansiyone plasenta')
    .replace(/\bmidline\b/giu, 'orta hatta')
    .replace(/\bGenelize\b/g, 'Yaygın')
    .replace(/\bgenelize\b/giu, 'yaygın')
    .replace(/\bserum\s+Ca(?:2\+)?\s+normal\b/giu, 'serum kalsiyumu normal')
    .replace(/\s+\.\s*\(/g, ' (')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeForCompare(value = '') {
  return cleanText(value)
    .toLocaleLowerCase('tr')
    .replace(/[ıİ]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function stableHash(value = '') {
  const text = normalizeForCompare(value);
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash) + text.charCodeAt(index);
    hash |= 0;
  }
  return `q${Math.abs(hash).toString(36)}`;
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function ensureSentence(value = '') {
  const text = normalizeMedicalTurkish(value).replace(/[\s,;:]+$/u, '');
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function ensureQuestion(value = '') {
  const text = normalizeMedicalTurkish(value).replace(/[\s,;:.]+$/u, '');
  if (!text) return 'Bu olguda en uygun seçenek hangisidir?';
  return /\?$/u.test(text) ? text : `${text}?`;
}

function normalizeDifficulty(value = 'Orta') {
  const text = cleanText(value).toLocaleLowerCase('tr');
  if (/kolay|easy/.test(text)) return 'Kolay';
  if (/zor|hard/.test(text)) return 'Zor';
  return 'Orta';
}

function normalizeOptions(raw = []) {
  const arr = Array.isArray(raw)
    ? raw
    : raw && typeof raw === 'object'
      ? OPTION_IDS.map((id) => raw[id] || raw[id.toLowerCase()] || raw[`option${id}`])
      : [];
  return OPTION_IDS.map((id, index) => {
    const source = arr.find((item) => typeof item === 'object' && String(item?.id || '').toUpperCase() === id) ?? arr[index];
    const text = normalizeMedicalTurkish(typeof source === 'string' ? source : source?.text || source?.label || source?.value || '');
    return { id, text: text.replace(/^\s*[A-E]\s*\)\s*/iu, '') };
  }).filter((option) => option.text);
}

function resolveCorrectOption(options = [], rawCorrect = '') {
  const raw = String(rawCorrect || '').trim().toUpperCase();
  if (OPTION_IDS.includes(raw)) return options.find((option) => option.id === raw) || null;
  const wanted = normalizeForCompare(rawCorrect);
  return options.find((option) => normalizeForCompare(option.text) === wanted) || null;
}

function feedbackMap(raw = {}, correctId = 'A', explanation = '') {
  const arr = Array.isArray(raw)
    ? raw
    : OPTION_IDS.map((id) => raw?.[id] || raw?.[id.toLowerCase()] || raw?.[`option${id}`] || '');
  return OPTION_IDS.reduce((acc, id, index) => {
    acc[id] = ensureSentence(normalizeMedicalTurkish(arr[index] || (id === correctId ? explanation : 'Bu seçenek olgudaki ayırt ettirici verilerle en iyi açıklama değildir.')));
    return acc;
  }, {});
}

export function makeSimpleSignature(question = {}) {
  return `simple-${stableHash([
    question.relatedBranch || question.branchName || '',
    question.stem || question.narrativeStem || '',
    question.question || question.diagnosis?.question || '',
    question.diagnosis?.correct || question.correctAnswer || '',
    ...(question.diagnosis?.options || question.options || []).map((item) => typeof item === 'string' ? item : item.text || ''),
  ].join(' | '))}`;
}

export function isTooSimilarToRecent() {
  return false;
}

export function normalizeSimpleAIQuestion(payload = {}, meta = {}) {
  if (payload?.diagnosis?.correct && Array.isArray(payload?.diagnosis?.options)) {
    const signature = payload.contentSignature || makeSimpleSignature(payload);
    return { ...payload, contentSignature: signature, generationSignature: payload.generationSignature || signature, semanticFingerprint: payload.semanticFingerprint || signature };
  }

  const options = normalizeOptions(payload.options || payload.o || []);
  const correctOption = resolveCorrectOption(options, payload.correctAnswer || payload.c || payload.answer || '') || options[0] || { id: 'A', text: '' };
  const explanation = ensureSentence(payload.explanation || payload.e || '');
  const optionRationales = feedbackMap(payload.wrongOptionFeedback || payload.optionFeedback || payload.f || {}, correctOption.id, explanation);
  const stem = ensureSentence(payload.stem || payload.s || '');
  const branch = normalizeMedicalTurkish(payload.relatedBranch || payload.branch || payload.b || meta.branchFilter || 'TUS');
  const difficulty = normalizeDifficulty(payload.difficulty || payload.d || meta.difficulty || 'Orta');
  const correctText = normalizeMedicalTurkish(correctOption.text);

  const question = {
    id: cleanText(payload.id) || `ai-spot-simple-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    source: payload.source || meta.source || 'real-ai',
    caseType: 'ai-spot',
    branchId: 'tus-spot-olgular',
    branchName: branch,
    title: '',
    relatedBranch: branch,
    spotCategory: `AI Spot • ${branch}`,
    difficulty,
    learningTarget: '',
    answerTarget: cleanText(payload.answerTarget || payload.at || 'diagnosis'),
    demographics: '',
    setting: '',
    chiefComplaint: '',
    stem,
    narrativeStem: stem,
    stemMode: 'narrative',
    compactVitals: [],
    compactObjectiveData: [],
    vitals: {},
    exam: [],
    history: [],
    investigations: [],
    findings: { history: [], exam: [], vitals: {}, investigations: [] },
    question: ensureQuestion(payload.question || payload.q || ''),
    questionType: 'spot',
    clinicalFocus: '',
    options,
    correctAnswer: correctOption.id,
    managementSequence: { enabled: false, showInSpot: false, steps: [] },
    patientIntro: { profile: branch, presentation: '', riskContext: '', distinctiveClues: [], historySummary: stem },
    diagnosis: {
      correct: correctText,
      options: options.map((option) => option.text),
      explanation,
      nextStep: '',
      pearls: [],
      answerFeedback: {
        whyCorrect: explanation,
        correctOptionFeedback: optionRationales[correctOption.id] || explanation,
        optionRationales,
        optionFeedback: optionRationales,
        feedbackByOption: optionRationales,
        evidenceChain: [],
        pearls: [],
        clinicalPearls: [],
        differentialComparison: {},
        managementSteps: [],
      },
    },
    aiMeta: {
      generatedAt: Date.now(),
      provider: meta.provider || payload.provider || 'openai',
      model: meta.model || payload.model || payload.openAIModel || null,
      remote: meta.remote !== false,
      fallback: Boolean(meta.fallback || payload.fallback),
      repaired: Boolean(payload.aiMeta?.repaired || payload.repaired),
    },
  };

  const signature = makeSimpleSignature(question);
  question.contentSignature = signature;
  question.generationSignature = signature;
  question.semanticFingerprint = signature;
  question.aiMeta.signature = signature;
  return question;
}

export function createSimpleFallbackQuestion({ branchFilter = 'TUS', difficulty = 'Orta' } = {}) {
  return normalizeSimpleAIQuestion({
    b: branchFilter,
    d: difficulty,
    s: 'Gerçek AI üretimi başarısız olduğunda gösterilen nötr yerel örnek sorudur.',
    q: 'TUS sorusunda doğru cevabı seçmek için en önemli ilke hangisidir?',
    o: [
      'Soru kökündeki karar verdirici verileri birlikte yorumlamak',
      'En uzun seçeneği doğru kabul etmek',
      'Sadece yaş ve cinsiyete göre karar vermek',
      'Laboratuvar verilerini klinikten bağımsız değerlendirmek',
      'Çeldiricileri aynı anlamlı kabul etmek',
    ],
    c: 'A',
    e: 'TUS sorusunda doğru cevap, soru kökündeki klinik ve bilimsel kanıtların birlikte yorumlanmasıyla seçilir.',
    f: [
      'Doğru yaklaşım, kökteki ayırt ettirici verileri birlikte değerlendirmektir.',
      'Seçenek uzunluğu tıbbi doğruluğu göstermez.',
      'Yaş ve cinsiyet tek başına çoğu TUS sorusunda yeterli değildir.',
      'Laboratuvar verileri klinik bağlamla birlikte yorumlanmalıdır.',
      'Çeldiriciler benzer görünse de kökteki ayırıcı kanıtlar doğru cevabı belirler.',
    ],
  }, { source: 'local-fallback', provider: 'local-fallback', remote: false, fallback: true, branchFilter, difficulty });
}
