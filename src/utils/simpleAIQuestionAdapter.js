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

function ensureSentence(value = '') {
  const text = cleanGeneratedText(value).replace(/[\s,;:]+$/u, '');
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function ensureQuestion(value = '') {
  const text = cleanGeneratedText(value).replace(/[\s,;:.]+$/u, '');
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


function normalizeMedicalTurkishLanguage(value = '') {
  return String(value ?? '')
    .replace(/çocuklık/giu, 'çocukluk')
    .replace(/arthraljia/giu, 'artralji')
    .replace(/arthralji/giu, 'artralji')
    .replace(/platelet/giu, 'trombosit')
    .replace(/hematuri/giu, 'hematüri')
    .replace(/proteinuri/giu, 'proteinüri')
    .replace(/purpurasi/giu, 'purpurası')
    .replace(/koagulasyon/giu, 'koagülasyon')
    .replace(/Proteinüri/gu, 'proteinüri')
    .replace(/Hematuri/gu, 'hematüri');
}

function repairTurkishConnectorArtifacts(value = '') {
  return cleanText(value)
    .replace(/(^|[.!?]\s+)(?:Da|De)\s+(?=[a-zçğıöşü0-9%/>])/gu, '$1Bu olguda ')
    .replace(/(^|[.!?]\s+)(?:da|de)\s+(?=[a-zçğıöşü0-9%/>])/gu, '$1Bu olguda ')
    .replace(/\b(?:Da|De|da|de)\s+(?=renin\/aldosteron\b)/gu, 'Bu olguda ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanGeneratedText(value = '') {
  return normalizeMedicalTurkishLanguage(repairTurkishConnectorArtifacts(value))
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .trim();
}

function splitSentencesSafe(value = '') {
  const protectedText = cleanGeneratedText(value).replace(/(\d)\.\s?(\d)/g, '$1§DOT§$2');
  const parts = protectedText.match(/[^.!?]+[.!?]?/g) || [protectedText];
  return parts.map((part) => part.replace(/§DOT§/g, '.').trim()).filter(Boolean);
}

function isQuestionLikeStemFragment(value = '') {
  const text = cleanGeneratedText(value);
  const n = normalizeForCompare(text);
  if (!text) return false;
  const hasDecisionCue = /\b(?:hangi|hangisidir|hangisi|nedir|en uygun|en olasi|en duyarlı|ilk|sonraki|kesin tani|tanisal|laboratuvar|test|tetkik|inceleme|yaklasim|tedavi|mudahale|mekanizma|komplikasyon)\b/u.test(n);
  const hasCaseCue = /\b(?:bu olguda|bu hastada|bu bebekte|bu cocukta|bu prezentasyonda|bu tabloda|asagidakilerden)\b/u.test(n);
  if (hasCaseCue && hasDecisionCue) return true;
  if (/\?$/.test(text) && hasDecisionCue) return true;
  if (/\b(?:yapilmasi gereken|yapılması gereken|istenmesi gereken|bakılması gereken|secilmesi gereken|seçilmesi gereken)\.?$/iu.test(text)) return true;
  return false;
}

function cleanStemQuestionPair(stem = '', question = '') {
  const rawStem = cleanGeneratedText(stem);
  let rawQuestion = cleanGeneratedText(question);
  const sentences = splitSentencesSafe(rawStem);
  const last = sentences[sentences.length - 1] || '';
  if (isQuestionLikeStemFragment(last)) {
    if ((!rawQuestion || /en uygun seçenek hangisidir\??/iu.test(rawQuestion)) && /\?$/u.test(last)) rawQuestion = last;
    return { stem: sentences.filter((sentence, index) => index !== sentences.length - 1 || !isQuestionLikeStemFragment(sentence)).join(' ').trim() || rawStem, question: rawQuestion };
  }
  return { stem: rawStem, question: rawQuestion };
}

function compactItems(items = [], _max = Number.POSITIVE_INFINITY) {
  const seen = new Set();
  const out = [];
  asArray(items).forEach((item) => {
    const label = cleanText(typeof item === 'string' ? item.split(/[:：]/u)[0] : item?.label || item?.name || item?.parameter || item?.title || '');
    const value = cleanText(typeof item === 'string' ? item.split(/[:：]/u).slice(1).join(':') : item?.value || item?.result || item?.text || '');
    if (!label || !value) return;
    const key = normalizeForCompare(`${label} ${value}`);
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ label, value });
  });
  return out;
}

function normalizeOptions(rawOptions = []) {
  const arr = Array.isArray(rawOptions) ? rawOptions : [];
  return OPTION_IDS.map((id, index) => {
    const source = arr.find((item) => String(item?.id || '').toUpperCase() === id) ?? arr[index];
    const text = cleanText(typeof source === 'string' ? source : source?.text || source?.label || '');
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
  if (!value || !answer || answer.length < 5) return false;
  if (value.includes(answer)) return true;
  const words = answer.split(/\s+/u).filter((word) => word.length >= 4);
  if (words.length < 2) return false;
  return words.filter((word) => value.includes(word)).length >= Math.ceil(words.length * 0.8);
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

function tokenSimilarity(left = '', right = '') {
  const leftTokens = new Set(normalizeForCompare(left).split(/\s+/u).filter((token) => token.length >= 4));
  const rightTokens = new Set(normalizeForCompare(right).split(/\s+/u).filter((token) => token.length >= 4));
  if (!leftTokens.size || !rightTokens.size) return 0;
  let overlap = 0;
  leftTokens.forEach((token) => {
    if (rightTokens.has(token)) overlap += 1;
  });
  return overlap / Math.max(leftTokens.size, rightTokens.size);
}

export function isTooSimilarToRecent(question = {}, recent = []) {
  const correct = normalizeForCompare(question.diagnosis?.correct || question.correctAnswerText || '');
  const stem = normalizeForCompare(question.stem || '');
  const target = normalizeForCompare(question.learningTarget || question.clinicalFocus || question.question || '');
  const optionSet = normalizeForCompare((question.diagnosis?.options || []).slice().sort().join(' | '));
  const signature = question.contentSignature || makeSimpleSignature(question);

  return asArray(recent).some((item) => {
    const itemCorrect = normalizeForCompare(item.correct || item.correctAnswer || '');
    const itemStem = normalizeForCompare(item.stem || item.normalizedStem || '');
    const itemTarget = normalizeForCompare(item.learningTarget || item.normalizedLearningTarget || item.question || '');
    const itemOptions = normalizeForCompare(asArray(item.optionTexts).slice().sort().join(' | ') || item.optionSetSignature || '');
    const itemSignature = item.contentSignature || item.semanticFingerprint || item.signature || '';
    const stemOverlap = tokenSimilarity(stem, itemStem);
    const targetOverlap = tokenSimilarity(target, itemTarget);
    if (itemSignature && signature && itemSignature === signature) return true;
    if (correct && itemCorrect && correct === itemCorrect && optionSet && itemOptions && optionSet === itemOptions && Math.max(stemOverlap, targetOverlap) >= 0.72) return true;
    if (stem && itemStem && stem.length > 80 && itemStem.length > 80 && stemOverlap >= 0.86) return true;
    if (correct && itemCorrect && correct === itemCorrect && targetOverlap >= 0.9 && stemOverlap >= 0.45) return true;
    return false;
  });
}


function formatInlineClinicalData(items = [], prefix = '') {
  const rows = compactItems(items, 8)
    .map((item) => {
      const label = cleanText(item.label || '');
      const value = cleanText(item.value || '');
      if (!label && !value) return '';
      if (!value) return label;
      return `${label}: ${value}`;
    })
    .filter(Boolean)
    .filter((line) => !/^(görüntüleme|destekleyici veriler|laboratuvar|fizik muayene|eko|ekokardiyografi)$/iu.test(line));
  if (!rows.length) return '';
  return ensureSentence(`${prefix}${rows.join('; ')}`);
}

function integrateCompactDataIntoStem(stem = '', vitals = [], objectiveData = []) {
  const base = ensureSentence(stem || '');
  const vitalSentence = formatInlineClinicalData(vitals, 'Ek klinik verilerde ');
  const objectiveSentence = formatInlineClinicalData(objectiveData, 'Tetkik ve destekleyici bulgularda ');
  return [base, vitalSentence, objectiveSentence]
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
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
  const rawCompactVitals = compactItems([
    ...asArray(payload.compactVitals || []),
    ...asArray(payload.cv || []),
    ...asArray(payload.vitalSigns || []),
    ...asArray(payload.vitals || []),
  ], 5);
  const rawCompactObjectiveData = compactItems([
    ...asArray(payload.compactObjectiveData || []),
    ...asArray(payload.co || []),
    ...asArray(payload.objectiveData || []),
    ...asArray(payload.supportingData || []),
    ...asArray(payload.laboratoryData || []),
    ...asArray(payload.imagingData || []),
    ...asArray(payload.microbiologyData || []),
    ...asArray(payload.pathologyData || []),
  ], 12);
  const branch = cleanText(payload.relatedBranch || payload.branch || payload.b || meta.branchFilter || 'TUS');
  const normalizedBranch = BRANCH_ALIASES.get(normalizeForCompare(branch)) || branch;
  const stemQuestionPair = cleanStemQuestionPair(payload.stem || payload.s || 'Kısa klinik olgu verileri birlikte değerlendirilir.', payload.question || payload.q || '');
  const stem = integrateCompactDataIntoStem(stemQuestionPair.stem, rawCompactVitals, rawCompactObjectiveData);
  const compactVitals = rawCompactVitals;
  const compactObjectiveData = rawCompactObjectiveData;
  const evidenceChain = buildEvidence(payload.evidenceChain || payload.evidence || payload.k)
    .filter((item) => !containsAnswerLeak(item, correctText));
  const answerTarget = cleanText(payload.answerTarget || payload.questionIntent || payload.intent || '');
  const managementSteps = isManagementTarget(answerTarget)
    ? asArray(payload.managementSteps || payload.management || []).map((item) => ensureSentence(item)).filter(Boolean)
    : [];
  const examPearl = ensureSentence(cleanGeneratedText(payload.examPearl || payload.teachingPoint || payload.pearl || payload.p || ''));
  const explanation = ensureSentence(cleanGeneratedText(payload.explanation || payload.whyCorrect || payload.e || ''));
  const optionRationales = payload.optionRationales || payload.wrongOptionFeedback || payload.optionFeedback || payload.rationales || {};

  const question = {
    id: cleanText(payload.id) || `ai-spot-simple-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    source: payload.source || meta.source || 'real-ai',
    caseType: 'ai-spot',
    branchId: 'tus-spot-olgular',
    branchName: normalizedBranch,
    title: '',
    relatedBranch: normalizedBranch,
    spotCategory: `AI Spot • ${normalizedBranch}`,
    difficulty: normalizeDifficulty(payload.difficulty || meta.difficulty || 'Orta'),
    learningTarget: cleanText(payload.learningTarget || payload.target || payload.lt || ''),
    answerTarget,
    demographics: cleanText(payload.demographics || payload.d || ''),
    setting: cleanText(payload.setting || ''),
    chiefComplaint: cleanText(payload.chiefComplaint || payload.cc || ''),
    stem,
    questionStem: stem,
    narrativeStem: stem,
    stemMode: 'narrative',
    compactVitals,
    compactObjectiveData,
    vitalSigns: compactVitals,
    objectiveData: compactObjectiveData,
    laboratoryData: compactItems(payload.laboratoryData || [], 8),
    imagingData: compactItems(payload.imagingData || [], 6),
    microbiologyData: compactItems(payload.microbiologyData || [], 6),
    pathologyData: compactItems(payload.pathologyData || [], 6),
    vitals: makeVitalsObject(compactVitals),
    exam: asArray(payload.exam || payload.physicalExam).map(cleanText).filter(Boolean),
    history: asArray(payload.history).map(cleanText).filter(Boolean),
    investigations: [],
    findings: {
      history: asArray(payload.history).map(cleanText).filter(Boolean),
      exam: asArray(payload.exam || payload.physicalExam).map(cleanText).filter(Boolean),
      vitals: makeVitalsObject(compactVitals),
      investigations: [],
    },
    question: ensureQuestion(stemQuestionPair.question || 'Bu olguda en uygun seçenek hangisidir?'),
    questionType: cleanText(payload.questionType || payload.questionIntent || 'spot'),
    clinicalFocus: cleanText(payload.learningTarget || payload.target || ''),
    options,
    correctAnswer: correctOption?.id || 'A',
    wrongOptionFeedback: Object.fromEntries(Object.entries(optionRationales || {}).map(([key, value]) => [key, ensureSentence(cleanGeneratedText(value))])),
    optionFeedback: Object.fromEntries(Object.entries(optionRationales || {}).map(([key, value]) => [key, ensureSentence(cleanGeneratedText(value))])),
    managementSequence: { enabled: false, showInSpot: false, steps: [] },
    patientIntro: {
      profile: cleanText(payload.demographics || normalizedBranch),
      presentation: cleanText(payload.chiefComplaint || payload.cc || ''),
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
        correctOptionFeedback: ensureSentence(cleanGeneratedText(optionRationales?.[correctOption?.id] || explanation)),
        optionRationales: Object.fromEntries(Object.entries(optionRationales || {}).map(([key, value]) => [key, ensureSentence(cleanGeneratedText(value))])),
        evidenceChain: evidenceChain.length ? evidenceChain : [stem, cleanText(payload.chiefComplaint || payload.cc || '')].filter(Boolean).map(ensureSentence),
        pearls: [examPearl].filter(Boolean),
        clinicalPearls: [examPearl].filter(Boolean),
        differentialComparison: buildDifferentialComparison({ options, correctOption, optionRationales, wrongOptionFeedback: payload.wrongOptionFeedback || payload.optionFeedback || {} }),
        managementSteps,
        learningOutcome: cleanText(payload.learningTarget || payload.target || ''),
      },
    },
    aiMeta: {
      generatedAt: Date.now(),
      provider: meta.provider || payload.provider || 'openai',
      model: meta.model || payload.model || payload.openAIModel || null,
      remote: meta.remote !== false,
      fallback: Boolean(meta.fallback || payload.fallback),
      validationWarnings: asArray(payload.qualityNotes || payload.warnings),
    },
  };

  const signature = makeSimpleSignature(question);
  question.contentSignature = signature;
  question.generationSignature = signature;
  question.semanticFingerprint = payload.semanticFingerprint || signature;
  question.aiMeta.signature = signature;
  return question;
}

const FALLBACK_BANK = [
  {
    relatedBranch: 'İç Hastalıkları',
    learningTarget: 'Laboratuvar paterni ve klinik bağlamı birlikte yorumlama.',
    demographics: 'Erişkin hasta',
    chiefComplaint: 'Halsizlik ve bilinç bulanıklığı',
    stem: 'Erişkin hasta son günlerde artan halsizlik ve hafif bilinç bulanıklığı nedeniyle değerlendirilir. Öyküde sıvı alımında azalma ve yakın dönemde ilaç değişikliği vardır. Muayenede belirgin fokal nörolojik defisit saptanmaz.',
    compactObjectiveData: [{ label: 'Serum sodyum', value: '122 mEq/L' }, { label: 'Serum osmolalitesi', value: 'Düşük' }],
    question: 'Bu olguda laboratuvar paternini en iyi açıklayan seçenek hangisidir?',
    options: [
      { id: 'A', text: 'Hipotonik hiponatremi' },
      { id: 'B', text: 'Hipertonik hiponatremi' },
      { id: 'C', text: 'İzotonik psödohiponatremi' },
      { id: 'D', text: 'Hipernatremik dehidratasyon' },
      { id: 'E', text: 'Primer hiperkalemi' },
    ],
    correctAnswer: 'A',
    explanation: 'Düşük sodyum düzeyine düşük serum osmolalitesinin eşlik etmesi hipotonik hiponatremiyi destekler. Klinik değerlendirmede sonraki ayrım volüm durumu ve idrar elektrolitleriyle yapılır.',
    evidenceChain: ['Laboratuvar — Serum sodyum düşüktür.', 'Laboratuvar — Serum osmolalitesi düşüktür.', 'Klinik — Bilinç değişikliği semptomatik tabloyu destekler.'],
    examPearl: 'Hiponatremi yorumunda ilk ayrım serum osmolalitesidir; düşük osmolalite gerçek hipotonik hiponatremiyi gösterir.',
  },
  {
    relatedBranch: 'Çocuk Sağlığı ve Hastalıkları',
    learningTarget: 'Pediatrik acilde risk bulgularını ayırt etme.',
    demographics: 'Küçük çocuk',
    chiefComplaint: 'Ateş ve halsizlik',
    stem: 'Küçük çocuk yüksek ateş ve beslenmede azalma nedeniyle acile getirilir. Aile çocuğun son saatlerde daha halsiz olduğunu belirtir. Muayenede genel durum orta, kapiller dolum süresi uzamış ve cilt turgoru azalmıştır.',
    compactVitals: [{ label: 'Ateş', value: '39 °C' }, { label: 'Nabız', value: 'Taşikardik' }],
    question: 'Bu olguda öncelikle değerlendirilmesi gereken klinik öncelik hangisidir?',
    options: [
      { id: 'A', text: 'Perfüzyon ve hidrasyon durumu' },
      { id: 'B', text: 'Uzun dönem büyüme izlemi' },
      { id: 'C', text: 'Rutin aşı takvimi planı' },
      { id: 'D', text: 'Elektif dermatoloji değerlendirmesi' },
      { id: 'E', text: 'Okul çağı psikososyal taraması' },
    ],
    correctAnswer: 'A',
    explanation: 'Ateşli çocukta halsizlik, uzamış kapiller dolum ve turgor azalması dolaşım ve hidrasyon değerlendirmesini öncelikli kılar. Diğer seçenekler akut acil karar düzeyini karşılamaz.',
    evidenceChain: ['Öykü — Beslenme azalmıştır.', 'Muayene — Kapiller dolum süresi uzamıştır.', 'Muayene — Cilt turgoru azalmıştır.'],
    examPearl: 'Pediatrik acilde genel durum ve perfüzyon bulguları, tanısal ayrıntılardan önce değerlendirilir.',
  },
  {
    relatedBranch: 'Tıbbi Farmakoloji',
    learningTarget: 'İlaç-mekanizma-yan etki ilişkisini kurma.',
    demographics: 'Erişkin hasta',
    chiefComplaint: 'Yeni başlayan yakınma',
    stem: 'Erişkin hasta yeni başlanan bir tedaviden sonra gelişen yakınmalar nedeniyle başvurur. Öyküde benzer semptomların ilaç başlanmadan önce olmadığı öğrenilir. Klinik tablo ilacın beklenen farmakolojik etkisiyle ilişkilidir.',
    question: 'Bu olguda istenmeyen etkiyi yorumlamak için en uygun yaklaşım hangisidir?',
    options: [
      { id: 'A', text: 'İlacın etki mekanizması ve zaman ilişkisini birlikte değerlendirmek' },
      { id: 'B', text: 'Her ilacı aynı yan etki profiline sahip kabul etmek' },
      { id: 'C', text: 'Doz ve başlangıç zamanını dikkate almamak' },
      { id: 'D', text: 'Klinik yakınmayı ilaç öyküsünden bağımsız yorumlamak' },
      { id: 'E', text: 'Sadece laboratuvar sonucu varsa ilaç yan etkisi düşünmek' },
    ],
    correctAnswer: 'A',
    explanation: 'Farmakolojik yan etki değerlendirmesinde ilaç başlama zamanı, doz ve mekanizma birlikte ele alınır. Bu yaklaşım nedensellik değerlendirmesini diğer seçeneklerden daha doğru kurar.',
    evidenceChain: ['Öykü — Yakınmalar tedaviden sonra başlamıştır.', 'Öykü — Öncesinde benzer yakınma yoktur.', 'Mekanizma — Beklenen farmakolojik etki klinik tabloyla ilişkilidir.'],
    examPearl: 'TUS farmakoloji sorularında zaman ilişkisi tek başına yetmez; mekanizma ile klinik bulgunun uyumu aranır.',
  },
];

function buildFallbackOptionFeedback(item = {}) {
  const optionTexts = Object.fromEntries((item.options || []).map((option) => [option.id, option.text]));
  const correct = optionTexts[item.correctAnswer] || '';
  if (/Hipotonik hiponatremi/iu.test(correct)) {
    return {
      A: 'Hipotonik hiponatremi, serum sodyum düşüklüğüne düşük serum osmolalitesinin eşlik ettiği gerçek hiponatremi tablosudur. Bu olguda sodyumun 122 mEq/L ve osmolalitenin düşük verilmesi doğru seçeneği doğrudan destekler.',
      B: 'Hipertonik hiponatremi genellikle belirgin hiperglisemi veya mannitol gibi etkili ozmotik solütler varlığında düşünülür. Kökte serum osmolalitesi düşük olduğu için bu mekanizma bu olgudaki laboratuvar paternini açıklamaz.',
      C: 'İzotonik psödohiponatremi, ölçüm artefaktı veya belirgin lipid-protein yüksekliği gibi durumlarda osmolalitenin genellikle normal kaldığı tablodur. Bu soruda osmolalitenin düşük verilmesi psödohiponatremiden çok hipotonik hiponatremiyi öne çıkarır.',
      D: 'Hipernatremik dehidratasyonda su kaybı baskındır ve serum sodyumunun yüksek olması beklenir. Bu hastada sodyum düşük olduğu için seçenek mevcut elektrolit paterninin ters yönünde kalır.',
      E: 'Primer hiperkalemi potasyum yüksekliği ve buna bağlı kardiyak-elektrofizyolojik risklerle ilişkilidir. Soruda karar verdiren veri potasyum değil sodyum-osmolalite ilişkisi olduğu için bu seçenek doğru hedef değildir.',
    };
  }
  if (/Perfüzyon|Perf/u.test(correct)) {
    return {
      A: 'Perfüzyon ve hidrasyon durumu, ateşli ve halsiz çocukta acil triyajı belirleyen temel klinik önceliktir. Bu olguda uzamış kapiller dolum, taşikardi ve turgor azalması dolaşım-hidrasyon değerlendirmesini doğrudan destekler.',
      B: 'Uzun dönem büyüme izlemi sağlam çocuk takibi ve kronik sorunlarda önemlidir. Ancak bu olguda akut ateş, halsizlik ve perfüzyon bozukluğu bulguları varken ilk karar büyüme izlemi değil acil stabilite değerlendirmesidir.',
      C: 'Rutin aşı takvimi koruyucu pediatri uygulamalarının parçasıdır. Bu hastada akut genel durum değişikliği ve dehidratasyon-perfüzyon bulguları verildiği için aşı planı ilk klinik öncelik olmaz.',
      D: 'Elektif dermatoloji değerlendirmesi acil dolaşım veya hidrasyon sorunu olmayan deri yakınmalarında planlanabilir. Kökte deri lezyonu değil kapiller dolum uzaması ve turgor azalması verildiğinden bu seçenek olgunun karar noktasını karşılamaz.',
      E: 'Okul çağı psikososyal taraması koruyucu sağlık ve gelişim izlemi bağlamında değerlidir. Bu olguda akut ateşli hastalık ve dolaşım-hidrasyon bulguları ön planda olduğundan acil yaklaşımı açıklamaz.',
    };
  }
  if (/İlac|Ilac|etki mekanizmas/iu.test(correct)) {
    return {
      A: 'İlacın etki mekanizması ile yakınmanın başlama zamanını birlikte yorumlamak advers etki nedenselliğinin temelidir. Bu olguda semptomların tedavi sonrası başlaması ve klinik tablonun beklenen farmakolojik etkiyle ilişkili olması bu seçeneği destekler.',
      B: 'Her ilacı aynı yan etki profiline sahip kabul etmek farmakolojik seçiciliği ve hedef reseptör farklarını yok sayar. Bu olguda belirli bir tedavi sonrası belirli mekanizmayla uyumlu yakınma geliştiği için genelleyici yaklaşım doğru değildir.',
      C: 'Doz ve başlangıç zamanı advers etki olasılığını değerlendirmede kritik bilgiler arasındadır. Kökte yakınmanın ilaç başlandıktan sonra ortaya çıktığı vurgulandığı için bu bilgileri dışlamak klinik akıl yürütmeyi bozar.',
      D: 'Klinik yakınmayı ilaç öyküsünden bağımsız yorumlamak ilaç advers etkisini kaçırma riski taşır. Bu olguda semptom-zaman ilişkisi açıkça verildiğinden ilaç öyküsü kararın merkezinde olmalıdır.',
      E: 'Bazı ilaç yan etkileri laboratuvarla desteklenebilir, ancak advers etki şüphesi yalnızca laboratuvar varlığına bağlanmaz. Bu soruda klinik zamanlama ve mekanizma ilişkisi yeterli karar verdirici veri olduğu için bu seçenek fazla dar bir yaklaşımdır.',
    };
  }
  if (/Hipotonik hiponatremi/iu.test(correct)) {
    return {
      A: 'Hipotonik hiponatremi, serum sodyum düşüklüğüne düşük serum osmolalitesinin eşlik ettiği gerçek hiponatremi tablosudur. Bu olguda sodyumun 122 mEq/L ve osmolalitenin düşük verilmesi doğru seçeneği doğrudan destekler.',
      B: 'Hipertonik hiponatremi genellikle belirgin hiperglisemi veya mannitol gibi etkili ozmotik solütler varlığında düşünülür. Kökte serum osmolalitesi düşük olduğu için bu mekanizma bu olgudaki laboratuvar paternini açıklamaz.',
      C: 'İzotonik psödohiponatremi, ölçüm artefaktı veya belirgin lipid/protein yüksekliği gibi durumlarda osmolalitenin genellikle normal kaldığı tablodur. Bu soruda osmolalitenin düşük verilmesi psödohiponatremiden çok hipotonik hiponatremiyi öne çıkarır.',
      D: 'Hipernatremik dehidratasyonda su kaybı baskındır ve serum sodyumunun yüksek olması beklenir. Bu hastada sodyum düşük olduğu için seçenek mevcut elektrolit paterninin ters yönünde kalır.',
      E: 'Primer hiperkalemi potasyum yüksekliği ve buna bağlı kardiyak-elektrofizyolojik risklerle ilişkilidir. Soruda karar verdiren veri potasyum değil sodyum-osmolalite ilişkisi olduğu için bu seçenek doğru hedef değildir.',
    };
  }
  if (/Perfüzyon|PerfÃ¼zyon/iu.test(correct)) {
    return {
      A: 'PerfÃ¼zyon ve hidrasyon durumu, ateÅŸli ve halsiz Ã§ocukta acil triyajÄ± belirleyen temel klinik Ã¶nceliktir. Bu olguda uzamÄ±ÅŸ kapiller dolum, taÅŸikardi ve turgor azalmasÄ± dolaÅŸÄ±m-hidrasyon deÄŸerlendirmesini doÄŸrudan destekler.',
      B: 'Uzun dÃ¶nem bÃ¼yÃ¼me izlemi saÄŸlam Ã§ocuk takibi ve kronik sorunlarda Ã¶nemlidir. Ancak bu olguda akut ateÅŸ, halsizlik ve perfÃ¼zyon bozukluÄŸu bulgularÄ± varken ilk karar bÃ¼yÃ¼me izlemi deÄŸil acil stabilite deÄŸerlendirmesidir.',
      C: 'Rutin aÅŸÄ± takvimi koruyucu pediatri uygulamalarÄ±nÄ±n parÃ§asÄ±dÄ±r. Bu hastada akut genel durum deÄŸiÅŸikliÄŸi ve dehidratasyon/perfÃ¼zyon bulgularÄ± verildiÄŸi iÃ§in aÅŸÄ± planÄ± ilk klinik Ã¶ncelik olmaz.',
      D: 'Elektif dermatoloji deÄŸerlendirmesi acil dolaÅŸÄ±m veya hidrasyon sorunu olmayan deri yakÄ±nmalarÄ±nda planlanabilir. KÃ¶kte deri lezyonu deÄŸil kapiller dolum uzamasÄ± ve turgor azalmasÄ± verildiÄŸinden bu seÃ§enek olgunun karar noktasÄ±nÄ± karÅŸÄ±lamaz.',
      E: 'Okul Ã§aÄŸÄ± psikososyal taramasÄ± koruyucu saÄŸlÄ±k ve geliÅŸim izlemi baÄŸlamÄ±nda deÄŸerlidir. Bu olguda akut ateÅŸli hastalÄ±k ve dolaÅŸÄ±m/hidrasyon bulgularÄ± Ã¶n planda olduÄŸundan acil yaklaÅŸÄ±mÄ± aÃ§Ä±klamaz.',
    };
  }
  if (/etki mekanizmas/iu.test(correct)) {
    return {
      A: 'Ä°lacÄ±n etki mekanizmasÄ± ile yakÄ±nmanÄ±n baÅŸlama zamanÄ±nÄ± birlikte yorumlamak advers etki nedenselliÄŸinin temelidir. Bu olguda semptomlarÄ±n tedavi sonrasÄ± baÅŸlamasÄ± ve klinik tablonun beklenen farmakolojik etkiyle iliÅŸkili olmasÄ± bu seÃ§eneÄŸi destekler.',
      B: 'Her ilacÄ± aynÄ± yan etki profiline sahip kabul etmek farmakolojik seÃ§iciliÄŸi ve hedef reseptÃ¶r farklarÄ±nÄ± yok sayar. Bu olguda belirli bir tedavi sonrasÄ± belirli mekanizmayla uyumlu yakÄ±nma geliÅŸtiÄŸi iÃ§in genelleyici yaklaÅŸÄ±m doÄŸru deÄŸildir.',
      C: 'Doz ve baÅŸlangÄ±Ã§ zamanÄ± advers etki olasÄ±lÄ±ÄŸÄ±nÄ± deÄŸerlendirmede kritik bilgiler arasÄ±ndadÄ±r. KÃ¶kte yakÄ±nmanÄ±n ilaÃ§ baÅŸlandÄ±ktan sonra ortaya Ã§Ä±ktÄ±ÄŸÄ± vurgulandÄ±ÄŸÄ± iÃ§in bu bilgileri dÄ±ÅŸlamak klinik akÄ±l yÃ¼rÃ¼tmeyi bozar.',
      D: 'Klinik yakÄ±nmayÄ± ilaÃ§ Ã¶ykÃ¼sÃ¼nden baÄŸÄ±msÄ±z yorumlamak ilaÃ§ advers etkisini kaÃ§Ä±rma riski taÅŸÄ±r. Bu olguda semptom-zaman iliÅŸkisi aÃ§Ä±kÃ§a verildiÄŸinden ilaÃ§ Ã¶ykÃ¼sÃ¼ kararÄ±n merkezinde olmalÄ±dÄ±r.',
      E: 'BazÄ± ilaÃ§ yan etkileri laboratuvarla desteklenebilir, ancak advers etki ÅŸÃ¼phesi yalnÄ±zca laboratuvar varlÄ±ÄŸÄ±na baÄŸlanmaz. Bu soruda klinik zamanlama ve mekanizma iliÅŸkisi yeterli karar verdirici veri olduÄŸu iÃ§in bu seÃ§enek fazla dar bir yaklaÅŸÄ±mdÄ±r.',
    };
  }
  return Object.fromEntries((item.options || []).map((option) => [
    option.id,
    option.id === item.correctAnswer
      ? `${option.text} seÃ§eneÄŸi, kÃ¶kte verilen klinik veri ile en doÄŸrudan iliÅŸkili karar noktasÄ±nÄ± temsil eder. Bu olguda verilen bulgular birlikte yorumlandÄ±ÄŸÄ±nda en gÃ¼venli ve tek en iyi cevap bu seÃ§enektir.`
      : `${option.text} bazÄ± klinik baÄŸlamlarda ayÄ±rÄ±cÄ± tanÄ± veya karar seÃ§eneÄŸi olabilir. Bu olguda kÃ¶kte verilen ana bulgular doÄŸru seÃ§eneÄŸin karar noktasÄ±nÄ± daha doÄŸrudan desteklediÄŸi iÃ§in bu alternatif geri planda kalÄ±r.`,
  ]));
}

export function createSimpleFallbackQuestion({ branchFilter = 'random', difficulty = 'Orta', recentQuestionSummaries = [] } = {}) {
  const normalizedBranch = normalizeForCompare(branchFilter);
  const candidates = FALLBACK_BANK.filter((item) => normalizedBranch === 'random' || normalizedBranch === 'rastgele' || normalizeForCompare(item.relatedBranch).includes(normalizedBranch) || normalizedBranch.includes(normalizeForCompare(item.relatedBranch)));
  const pool = candidates.length ? candidates : FALLBACK_BANK;
  const recentCorrectAnswers = new Set(asArray(recentQuestionSummaries).map((item) => normalizeForCompare(item.correct || item.correctAnswer || item.correctAnswerText || '')));
  const selected = pool.find((item) => !recentCorrectAnswers.has(normalizeForCompare(item.options?.find?.((option) => option.id === item.correctAnswer)?.text || item.correctAnswer || ''))) || pool[Math.floor(Math.random() * pool.length)];
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const optionFeedback = selected.optionFeedback || buildFallbackOptionFeedback(selected);
  return normalizeSimpleAIQuestion({ ...selected, optionFeedback, wrongOptionFeedback: optionFeedback, difficulty: selectedDifficulty, id: `ai-spot-fallback-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }, { source: 'local-safe-fallback', provider: 'local-safe-fallback', remote: false, fallback: true, branchFilter, difficulty: selectedDifficulty });
}
