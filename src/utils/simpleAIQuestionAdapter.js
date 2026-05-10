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
  const text = cleanText(value).replace(/[\s,;:]+$/u, '');
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function ensureQuestion(value = '') {
  const text = cleanText(value).replace(/[\s,;:.]+$/u, '');
  if (!text) return 'Bu olguda en uygun seçenek hangisidir?';
  return /\?$/u.test(text) ? text : `${text}?`;
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

function compactItems(items = [], max = 8) {
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
  return out.slice(0, max);
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
  return /^(first_step|next_step|treatment|prevention)$/iu.test(cleanText(answerTarget));
}

function buildDifferentialComparison({ options = [], correctOption, optionRationales = {}, wrongOptionFeedback = {} }) {
  return options.reduce((acc, option) => {
    if (!option?.text) return acc;
    const raw = optionRationales?.[option.id] || wrongOptionFeedback?.[option.id] || '';
    const explanation = ensureSentence(raw || (option.id === correctOption?.id
      ? 'Bu seçenek olgudaki karar verdirici ipuçlarını en iyi açıklar.'
      : 'Bu seçenek bu karar düzeyi için tek en iyi yanıt değildir.'));
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
  return unique.slice(0, 4);
}

export function makeSimpleSignature(question = {}) {
  const correct = question?.diagnosis?.correct || question?.correctAnswerText || '';
  const optionText = Array.isArray(question?.options)
    ? question.options.map((item) => item?.text || item).sort().join(' | ')
    : '';
  return `simple-${stableHash([
    question.relatedBranch || question.branchName,
    question.title,
    question.stem,
    question.question,
    correct,
    optionText,
  ].filter(Boolean).join(' :: '))}`;
}

export function isTooSimilarToRecent(question = {}, recent = []) {
  const title = normalizeForCompare(question.title);
  const correct = normalizeForCompare(question.diagnosis?.correct || question.correctAnswerText || '');
  const stem = normalizeForCompare(question.stem || '');
  const optionSet = normalizeForCompare((question.diagnosis?.options || []).slice().sort().join(' | '));
  const signature = question.contentSignature || makeSimpleSignature(question);

  return asArray(recent).some((item) => {
    const itemTitle = normalizeForCompare(item.title || '');
    const itemCorrect = normalizeForCompare(item.correct || item.correctAnswer || '');
    const itemStem = normalizeForCompare(item.stem || item.normalizedStem || '');
    const itemOptions = normalizeForCompare(asArray(item.optionTexts).slice().sort().join(' | ') || item.optionSetSignature || '');
    const itemSignature = item.contentSignature || item.semanticFingerprint || item.signature || '';
    if (itemSignature && signature && itemSignature === signature) return true;
    if (title && itemTitle && title === itemTitle) return true;
    if (correct && itemCorrect && correct === itemCorrect && optionSet && itemOptions && (optionSet === itemOptions || optionSet.includes(itemOptions) || itemOptions.includes(optionSet))) return true;
    if (stem && itemStem && stem.length > 80 && itemStem.length > 80 && (stem.includes(itemStem.slice(0, 120)) || itemStem.includes(stem.slice(0, 120)))) return true;
    return false;
  });
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
  const compactVitals = compactItems(payload.compactVitals || payload.cv || payload.vitals || [], 5);
  const compactObjectiveData = compactItems(payload.compactObjectiveData || payload.co || payload.objectiveData || [], 8);
  const branch = cleanText(payload.relatedBranch || payload.branch || payload.b || meta.branchFilter || 'TUS');
  const normalizedBranch = BRANCH_ALIASES.get(normalizeForCompare(branch)) || branch;
  const stem = ensureSentence(payload.stem || payload.s || 'Kısa klinik olgu verileri birlikte değerlendirilir.');
  const evidenceChain = buildEvidence(payload.evidenceChain || payload.evidence || payload.k)
    .filter((item) => !containsAnswerLeak(item, correctText))
    .slice(0, 3);
  const answerTarget = cleanText(payload.answerTarget || payload.questionIntent || payload.intent || 'single_best_answer');
  const managementSteps = isManagementTarget(answerTarget)
    ? asArray(payload.managementSteps || payload.management || []).map((item) => ensureSentence(item)).filter(Boolean).slice(0, 3)
    : [];
  const examPearl = ensureSentence(payload.examPearl || payload.teachingPoint || payload.pearl || payload.p || 'Benzer TUS sorularında karar verdirici ipucu, soru kökünün sorduğu hedefe göre yorumlanır.');
  const explanation = ensureSentence(payload.explanation || payload.whyCorrect || payload.e || 'Olgudaki klinik veriler birlikte değerlendirildiğinde doğru seçenek diğerlerinden ayrılır.');
  const optionRationales = payload.optionRationales || payload.wrongOptionFeedback || payload.rationales || {};
  const title = cleanText(payload.title || payload.t || 'TUS spot klinik karar');

  const question = {
    id: cleanText(payload.id) || `ai-spot-simple-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    source: payload.source || meta.source || 'real-ai',
    caseType: 'ai-spot',
    branchId: 'tus-spot-olgular',
    branchName: normalizedBranch,
    title,
    relatedBranch: normalizedBranch,
    spotCategory: `AI Spot • ${normalizedBranch}`,
    difficulty: cleanText(payload.difficulty || 'Orta'),
    learningTarget: cleanText(payload.learningTarget || payload.target || payload.lt || 'TUS düzeyinde tek karar noktasını yorumlama.'),
    answerTarget,
    demographics: cleanText(payload.demographics || payload.d || ''),
    setting: cleanText(payload.setting || 'Klinik değerlendirme'),
    chiefComplaint: cleanText(payload.chiefComplaint || payload.cc || title),
    stem,
    narrativeStem: stem,
    stemMode: 'narrative',
    compactVitals,
    compactObjectiveData,
    vitals: makeVitalsObject(compactVitals),
    exam: asArray(payload.exam || payload.physicalExam).map(cleanText).filter(Boolean).slice(0, 4),
    history: asArray(payload.history).map(cleanText).filter(Boolean).slice(0, 4),
    investigations: [],
    findings: {
      history: asArray(payload.history).map(cleanText).filter(Boolean).slice(0, 4),
      exam: asArray(payload.exam || payload.physicalExam).map(cleanText).filter(Boolean).slice(0, 4),
      vitals: makeVitalsObject(compactVitals),
      investigations: [],
    },
    question: ensureQuestion(payload.question || payload.q || 'Bu olguda en uygun seçenek hangisidir?'),
    questionType: cleanText(payload.questionType || payload.questionIntent || 'spot'),
    clinicalFocus: cleanText(payload.learningTarget || payload.target || 'Tek doğru cevaba yönelik TUS spot akıl yürütme.'),
    options,
    correctAnswer: correctOption?.id || 'A',
    managementSequence: { enabled: false, showInSpot: false, steps: [] },
    patientIntro: {
      profile: cleanText(payload.demographics || normalizedBranch),
      presentation: cleanText(payload.chiefComplaint || title),
      riskContext: '',
      distinctiveClues: evidenceChain.slice(0, 4),
      historySummary: stem,
    },
    diagnosis: {
      correct: correctText,
      options: options.map((option) => option.text),
      explanation,
      nextStep: cleanText(payload.nextStep || 'Olgudaki verileri aynı kategorideki seçeneklerle karşılaştır.'),
      pearls: [examPearl].filter(Boolean),
      answerFeedback: {
        whyCorrect: explanation,
        evidenceChain: evidenceChain.length ? evidenceChain : [stem, cleanText(payload.chiefComplaint || title)].filter(Boolean).map(ensureSentence).slice(0, 3),
        pearls: [examPearl].filter(Boolean),
        clinicalPearls: [examPearl].filter(Boolean),
        differentialComparison: buildDifferentialComparison({ options, correctOption, optionRationales, wrongOptionFeedback: payload.wrongOptionFeedback || {} }),
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
      validationWarnings: asArray(payload.qualityNotes || payload.warnings).slice(0, 5),
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
    title: 'Sıvı-elektrolit yorumu',
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
    title: 'Ateşli çocukta ilk değerlendirme',
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
    title: 'İlaç yan etkisi tanıma',
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

export function createSimpleFallbackQuestion({ branchFilter = 'random', recentQuestionSummaries = [] } = {}) {
  const normalizedBranch = normalizeForCompare(branchFilter);
  const candidates = FALLBACK_BANK.filter((item) => normalizedBranch === 'random' || normalizedBranch === 'rastgele' || normalizeForCompare(item.relatedBranch).includes(normalizedBranch) || normalizedBranch.includes(normalizeForCompare(item.relatedBranch)));
  const pool = candidates.length ? candidates : FALLBACK_BANK;
  const recentTitles = new Set(asArray(recentQuestionSummaries).map((item) => normalizeForCompare(item.title || '')));
  const selected = pool.find((item) => !recentTitles.has(normalizeForCompare(item.title))) || pool[Math.floor(Math.random() * pool.length)];
  return normalizeSimpleAIQuestion({ ...selected, id: `ai-spot-fallback-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }, { source: 'local-safe-fallback', provider: 'local-safe-fallback', remote: false, fallback: true, branchFilter });
}
