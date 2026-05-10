const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const VERSION = 'klinikiq-ai-reset-simple-v1.0';

const BRANCHES = [
  'Acil Tıp',
  'İç Hastalıkları',
  'Çocuk Sağlığı ve Hastalıkları',
  'Kadın Hastalıkları ve Doğum',
  'Genel Cerrahi',
  'Nöroloji',
  'Kardiyoloji',
  'Göğüs Hastalıkları',
  'Tıbbi Farmakoloji',
  'Tıbbi Mikrobiyoloji',
  'Romatoloji',
  'Ortopedi ve Travmatoloji',
];

const ANSWER_TARGETS = [
  'diagnosis',
  'first_step',
  'next_step',
  'treatment',
  'mechanism',
  'test_interpretation',
  'diagnostic_test',
  'complication',
  'prophylaxis',
  'ethics_or_forensic',
];

const FORBIDDEN_FEEDBACK_PHRASES = [
  'farklı klinik tabloda uygun olabilir',
  'olgudaki ana ipuçlarını tek başına açıklamaz',
  'klinik bağlamda değerlendirilir',
  'bu alternatifin eksik kaldığı karar noktasını gösterir',
  'seçenekler arasındaki ayrımı güçlendirir',
  'doğru cevap budur',
];

const FALLBACK_DRAFTS = [
  {
    branch: 'Acil Tıp',
    title: 'Akut hava yolu sorunu',
    topic: 'Acil yaklaşım',
    answerTarget: 'first_step',
    demographics: 'Kırk yaşında erkek hasta',
    setting: 'Acil servis',
    chiefComplaint: 'Ani nefes darlığı',
    stem: 'Kırk yaşında erkek hasta ani başlayan nefes darlığı ve yaygın kaşıntı nedeniyle acil servise getiriliyor. Yakın zamanda yeni bir ilaca maruz kaldığı öğreniliyor. Muayenede yaygın ürtiker, dudaklarda şişlik ve hışıltılı solunum vardır. Hasta konuşmakta zorlanmaktadır.',
    history: ['Yeni ilaç maruziyeti sonrası ani sistemik yakınma'],
    exam: ['Yaygın ürtiker, dudak şişliği ve hışıltılı solunum'],
    vitals: { TA: '86/52 mmHg', Nabız: '124/dk', Solunum: '28/dk', Ateş: '36,7 °C', 'SpO₂': '%91' },
    objectiveData: [],
    question: 'Bu hastada ilk hayat kurtarıcı tedavi hangisidir?',
    options: ['İntramüsküler adrenalin', 'Oral antihistaminik', 'İnhale bronkodilatör', 'İntravenöz kortikosteroid', 'Yalnız oksijen ve gözlem'],
    correctIndex: 0,
    explanation: 'Ani sistemik reaksiyona hipotansiyon ve solunum bulgularının eşlik etmesi yaşamı tehdit eden bir acil durumu gösterir. İlk ilaç, hava yolu ve dolaşım riskini hızla azaltan intramüsküler adrenalindir.',
    evidence: [
      ['Öykü', 'Yeni ilaç maruziyeti', 'Tetikleyiciyle zamansal ilişki sistemik reaksiyonu destekler.'],
      ['Muayene', 'Ürtiker ve mukozal şişlik', 'Deri ve mukozal tutulum sistemik yanıtı gösterir.'],
      ['Vital', 'Hipotansiyon ve düşük oksijen satürasyonu', 'Solunum ve dolaşımın birlikte etkilendiğini gösterir.'],
    ],
    pearl: 'Sistemik alerjik acilde solunum veya dolaşım etkilenmişse ilk ilaç adrenalin olmalıdır.',
    management: ['Hava yolu, solunum ve dolaşımı aynı anda değerlendir.', 'İntramüsküler adrenalin uygula.', 'Oksijen, damar yolu ve sıvı desteğiyle yanıtı izle.'],
  },
  {
    branch: 'Nöroloji',
    title: 'Devam eden nöbet',
    topic: 'Acil nöroloji',
    answerTarget: 'first_step',
    demographics: 'Otuz altı yaşında erkek hasta',
    setting: 'Acil servis',
    chiefComplaint: 'Devam eden jeneralize nöbet',
    stem: 'Otuz altı yaşında erkek hasta yaklaşık sekiz dakikadır süren jeneralize tonik-klonik nöbet nedeniyle acil servise getiriliyor. Yakınları bilinen epilepsi öyküsü olduğunu ve son günlerde ilaçlarını aksattığını belirtiyor. Hava yolu açıklığı değerlendirilirken nöbet aktivitesi devam etmektedir.',
    history: ['Epilepsi öyküsü ve ilaç aksatma'],
    exam: ['Jeneralize tonik-klonik nöbet aktivitesi sürüyor'],
    vitals: { TA: '126/78 mmHg', Nabız: '118/dk', Solunum: '22/dk', Ateş: '36,8 °C', 'SpO₂': '%94' },
    objectiveData: [{ type: 'Laboratuvar', label: 'Kapiller glukoz', value: '96 mg/dL' }],
    question: 'Bu hastada en uygun ilk ilaç tedavisi hangisidir?',
    options: ['İntravenöz benzodiazepin', 'Fosfenitoin yükleme', 'Levetirasetam idamesi', 'Sodyum bikarbonat infüzyonu', 'Acil kraniyal MR'],
    correctIndex: 0,
    explanation: 'Beş dakikayı aşan ve devam eden jeneralize nöbet acil ilaç tedavisi gerektirir. İlk ilaç tedavisi nöbeti hızlı durdurmaya yönelik intravenöz benzodiazepindir; yükleme antiepileptikleri sonraki basamakta düşünülür.',
    evidence: [
      ['Öykü', 'Nöbetin sekiz dakikadır sürmesi', 'Uzamış nöbet acil farmakolojik müdahale gerektirir.'],
      ['Muayene', 'Nöbet aktivitesinin devam etmesi', 'İlk hedef nöbetin hızla sonlandırılmasıdır.'],
      ['Laboratuvar', 'Kapiller glukozun normal olması', 'Hipoglisemiye bağlı akut nöbet olasılığını geri plana iter.'],
    ],
    pearl: 'Uzamış aktif nöbette ilk ilaç benzodiazepindir; ikinci basamak yükleme tedavileri nöbet sürerse eklenir.',
    management: ['Hava yolu ve oksijenlenmeyi değerlendir.', 'Damar yolu açıp benzodiazepin uygula.', 'Nöbet sürerse uygun antiepileptik yükleme tedavisine geç.'],
  },
  {
    branch: 'İç Hastalıkları',
    title: 'Aktivite izlemi',
    topic: 'Otoimmün hastalık izlemi',
    answerTarget: 'test_interpretation',
    demographics: 'Yirmi dokuz yaşında kadın hasta',
    setting: 'Poliklinik',
    chiefComplaint: 'Artan halsizlik ve köpüklü idrar',
    stem: 'Yirmi dokuz yaşında kadın hasta bilinen otoimmün hastalık izlemi sırasında artan halsizlik, eklem ağrısı ve köpüklü idrar yakınmasıyla başvuruyor. Muayenede el küçük eklemlerinde hassasiyet ve hafif pretibial ödem saptanıyor. Hekim hastalık aktivitesini destekleyecek laboratuvar kombinasyonunu değerlendirmek istiyor.',
    history: ['Bilinen otoimmün hastalık ve yeni idrar yakınması'],
    exam: ['Eklem hassasiyeti ve pretibial ödem'],
    vitals: { TA: '118/74 mmHg', Nabız: '86/dk', Solunum: '16/dk', Ateş: '36,9 °C', 'SpO₂': '%98' },
    objectiveData: [{ type: 'Laboratuvar', label: 'Tam idrar tetkiki', value: 'Proteinüri ve mikroskopik hematüri' }],
    question: 'Hastalık aktivitesini desteklemek için en uygun laboratuvar kombinasyonu hangisidir?',
    options: ['Anti-dsDNA ve C3/C4 düzeyleri', 'Romatoid faktör ve anti-CCP', 'HLA-B27 ve CRP', 'Anti-mitokondriyal antikor ve ALP', 'TSH ve anti-TPO'],
    correctIndex: 0,
    explanation: 'Proteinüri ve hematüriyle birlikte sistemik aktivite bulguları immün aktivasyonun böbrek tutulumu açısından değerlendirilmesini gerektirir. Anti-dsDNA artışı ve kompleman tüketimi aktivite izlemi için birlikte değerlidir.',
    evidence: [
      ['Öykü', 'Köpüklü idrar yakınması', 'Proteinüri olasılığını klinik olarak destekler.'],
      ['Muayene', 'Pretibial ödem', 'Böbrek kaynaklı sıvı tutulumunu düşündürür.'],
      ['Laboratuvar', 'Proteinüri ve mikroskopik hematüri', 'Aktif böbrek tutulumunu destekleyen objektif bulgudur.'],
    ],
    pearl: 'Aktivite izlemi tarama testinden farklıdır; aktivasyonu yansıtan markerlar birlikte yorumlanır.',
    management: ['İdrar bulgularını böbrek fonksiyonlarıyla birlikte değerlendir.', 'Aktivite markerlarını iste.', 'Böbrek tutulum şiddetine göre ileri değerlendirme planla.'],
  },
  {
    branch: 'Çocuk Sağlığı ve Hastalıkları',
    title: 'Dehidratasyon mekanizması',
    topic: 'Sıvı-elektrolit',
    answerTarget: 'mechanism',
    demographics: 'İki yaşında erkek çocuk',
    setting: 'Çocuk acil',
    chiefComplaint: 'İshal ve kusma',
    stem: 'İki yaşında erkek çocuk son yirmi dört saattir süren sulu ishal ve kusma nedeniyle acile getiriliyor. Ağızdan sıvı alımı azalmış, idrar miktarı belirgin düşmüştür. Muayenede ağız mukozaları kuru, gözyaşı azalmış ve kapiller dolum süresi uzamıştır.',
    history: ['Sulu ishal, kusma ve azalmış idrar çıkışı'],
    exam: ['Kuru mukozalar, azalmış gözyaşı ve uzamış kapiller dolum'],
    vitals: { TA: '88/54 mmHg', Nabız: '148/dk', Solunum: '30/dk', Ateş: '36,6 °C', 'SpO₂': '%99' },
    objectiveData: [],
    question: 'Oral rehidratasyonun sıvı emilimini sürdürmesini sağlayan temel mekanizma hangisidir?',
    options: ['Sodyum-glukoz kotransportunun su emilimini desteklemesi', 'Kolon su geçirgenliğinin doğrudan artırılması', 'Mide boşalmasının tamamen durdurulması', 'Yalnız potasyum emiliminin artırılması', 'Yağ asidi emiliminin baskılanması'],
    correctIndex: 0,
    explanation: 'Sulu ishalde bağırsak lümeninde sıvı kaybı olsa da sodyum-glukoz kotransportu korunabilir. Oral rehidratasyon bu taşıma yolunu kullanarak sodyum ve su emilimini destekler.',
    evidence: [
      ['Öykü', 'Sulu ishal ve kusma', 'Akut sıvı kaybı mekanizmasını düşündürür.'],
      ['Muayene', 'Kuru mukozalar ve azalmış gözyaşı', 'Dehidratasyonun klinik bulgularıdır.'],
      ['Vital', 'Taşikardi ve düşük kan basıncı', 'Dolaşım etkilenimini gösteren bulgulardır.'],
    ],
    pearl: 'Oral rehidratasyonun temel mantığı glukoz eşliğinde sodyum emiliminin korunmasına dayanır.',
    management: ['Klinik dehidratasyon derecesini değerlendir.', 'Uygunsa küçük ve sık oral rehidratasyon başla.', 'İdrar çıkışı ve perfüzyon bulgularını izle.'],
  },
];

function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

function parseJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 800_000) {
        reject(new Error('Request body too large'));
        request.destroy();
      }
    });
    request.on('end', () => {
      if (!body) return resolve({});
      try { return resolve(JSON.parse(body)); } catch (error) { return reject(error); }
    });
    request.on('error', reject);
  });
}

function normalizeText(value = '') {
  return String(value ?? '')
    .toLocaleLowerCase('tr')
    .replace(/[âîû]/g, (match) => ({ â: 'a', î: 'i', û: 'u' }[match] || match))
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9çğıöşü\s]/giu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/```(?:json)?/giu, '')
    .replace(/```/gu, '')
    .replace(/\s+/gu, ' ')
    .replace(/\s+([,.;:!?])/gu, '$1')
    .trim();
}

function ensureSentence(value = '') {
  const text = cleanText(value);
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function compactSentence(value = '', limit = 520) {
  const text = ensureSentence(value).replace(/\.{2,}|…/gu, '.');
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit).replace(/\s+\S*$/u, '').replace(/[,:;\-–—]+$/u, '').trim();
  return ensureSentence(cut);
}

function stableHash(value = '') {
  const text = normalizeText(value);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function pickBranch(branchFilter = 'random') {
  const raw = String(branchFilter || 'random').trim();
  if (raw && raw !== 'random' && raw !== 'Rastgele') return raw;
  return BRANCHES[Math.floor(Math.random() * BRANCHES.length)] || 'İç Hastalıkları';
}

function getOpenAIConfig() {
  const provider = String(process.env.AI_PROVIDER || 'openai').toLowerCase();
  const key = process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || '';
  const model = process.env.OPENAI_MODEL || process.env.DEFAULT_GENERATOR_MODEL || 'gpt-5.4-mini';
  const baseURL = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/u, '');
  const maxTokens = Number(process.env.OPENAI_MAX_OUTPUT_TOKENS || 1800);
  const timeoutMs = Number(process.env.OPENAI_PER_REQUEST_TIMEOUT_MS || 28000);
  return { enabled: provider === 'openai' && Boolean(key), key, model, baseURL, maxTokens, timeoutMs };
}

function buildSystemPrompt() {
  return [
    'You are KlinikIQ, an expert Turkish TUS question writer and clinical accuracy editor.',
    'Generate exactly one original, single-best-answer Turkish TUS spot question.',
    'Do not use examples. Do not copy the avoid list. Do not reveal the answer in title, stem, or data panels.',
    'Keep it simple: short clinical stem, five same-category options, one correct answer, concise feedback.',
    'The item must be scientifically correct, exam-oriented, and written in fluent academic Turkish.',
    'Return only valid JSON. No markdown, no commentary.',
  ].join(' ');
}

function buildUserPrompt({ branch, recentSummaries = [], rejectionReason = '' }) {
  const avoid = recentSummaries.slice(0, 8).map((item) => ({
    title: item.title || '',
    branch: item.branch || item.relatedBranch || '',
    topic: item.topic || item.subtopic || '',
    correct: item.correct || item.correctAnswer || item.correctAnswerConcept || '',
    fingerprint: item.fingerprint || item.contentSignature || item.optionSetSignature || '',
  }));

  return JSON.stringify({
    task: 'Produce one Turkish TUS spot question for KlinikIQ.',
    branch: branch || 'random',
    avoid_recent_questions: avoid,
    previous_rejection_reason: rejectionReason || undefined,
    rules: [
      'Use one question intent only: diagnosis, first_step, next_step, treatment, mechanism, test_interpretation, diagnostic_test, complication, prophylaxis, or ethics_or_forensic.',
      'If two options could both be clinically useful, narrow the question target or replace one option.',
      'Options must all belong to the same conceptual category.',
      'Evidence must come only from the stem, exam, vitals, or objective data you provide.',
      'Wrong-option feedback must explain why that option is not best in this case; avoid generic wording.',
      'Every sentence must be complete; no ellipsis, no cut-off words.',
      'Keep management steps only if relevant.',
    ],
    output_schema: {
      title: 'neutral short title, no answer leakage',
      branch: 'Turkish branch name',
      topic: 'short topic',
      learningTarget: 'one sentence',
      questionIntent: 'one of the listed intents',
      answerTarget: 'one of the listed intents',
      demographics: 'short patient line',
      setting: 'clinical setting',
      chiefComplaint: 'short presenting problem',
      stem: '80-150 Turkish words, no raw data repetition',
      history: ['2-3 short source-bound history clues'],
      exam: ['1-3 physical exam findings only'],
      vitals: { TA: '', Nabız: '', Solunum: '', Ateş: '', 'SpO₂': '' },
      objectiveData: [{ type: 'Laboratuvar|Seroloji|Görüntüleme|EKG|Mikrobiyoloji|Patoloji|Objektif veri', label: '', value: '' }],
      question: 'one clear question sentence',
      options: [{ id: 'A', text: '' }, { id: 'B', text: '' }, { id: 'C', text: '' }, { id: 'D', text: '' }, { id: 'E', text: '' }],
      correctAnswer: 'A|B|C|D|E',
      explanation: '2-4 sentences explaining why correct',
      evidenceChain: [{ type: 'Öykü|Muayene|Vital|Laboratuvar|Seroloji|Görüntüleme|EKG|Mikrobiyoloji|Mekanizma', clue: '', meaning: '', sourceQuote: '' }],
      examPearl: '1-2 concise exam-oriented sentences',
      managementSteps: ['0-4 short concrete steps'],
      optionRationales: { A: '', B: '', C: '', D: '', E: '' },
    },
  });
}

function extractJson(text = '') {
  const raw = String(text || '').trim();
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/iu);
  const candidate = fenced?.[1] || raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1);
  return JSON.parse(candidate);
}

function extractOpenAIText(payload = {}) {
  if (typeof payload.output_text === 'string' && payload.output_text.trim()) return payload.output_text;
  const chunks = [];
  (payload.output || []).forEach((item) => {
    (item.content || []).forEach((content) => {
      if (typeof content.text === 'string') chunks.push(content.text);
      if (typeof content.output_text === 'string') chunks.push(content.output_text);
    });
  });
  const message = payload.choices?.[0]?.message;
  if (typeof message?.content === 'string') chunks.push(message.content);
  return chunks.join('\n').trim();
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 28000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function callOpenAIChat({ systemPrompt, userPrompt, config }) {
  const response = await fetchWithTimeout(`${config.baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.key}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.65,
      max_completion_tokens: config.maxTokens,
    }),
  }, config.timeoutMs);

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = payload.error?.message || payload.message || response.statusText;
    throw new Error(`OpenAI chat failed: ${detail}`);
  }
  return extractJson(extractOpenAIText(payload));
}

async function callOpenAIResponses({ systemPrompt, userPrompt, config }) {
  const response = await fetchWithTimeout(`${config.baseURL}/responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.key}`,
    },
    body: JSON.stringify({
      model: config.model,
      input: [
        { role: 'system', content: [{ type: 'input_text', text: systemPrompt }] },
        { role: 'user', content: [{ type: 'input_text', text: userPrompt }] },
      ],
      temperature: 0.65,
      max_output_tokens: config.maxTokens,
    }),
  }, config.timeoutMs);

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = payload.error?.message || payload.message || response.statusText;
    throw new Error(`OpenAI responses failed: ${detail}`);
  }
  return extractJson(extractOpenAIText(payload));
}

async function callOpenAI({ systemPrompt, userPrompt, config }) {
  try {
    return await callOpenAIChat({ systemPrompt, userPrompt, config });
  } catch (chatError) {
    try {
      return await callOpenAIResponses({ systemPrompt, userPrompt, config });
    } catch (responsesError) {
      responsesError.message = `${responsesError.message}; chat fallback: ${chatError.message}`;
      throw responsesError;
    }
  }
}

function normalizeOptionList(options = []) {
  const normalized = [];
  (Array.isArray(options) ? options : []).forEach((option, index) => {
    const id = String(option?.id || OPTION_IDS[index] || '').trim().toUpperCase();
    const text = cleanText(typeof option === 'string' ? option : option?.text || '');
    if (OPTION_IDS.includes(id) && text) normalized.push({ id, text });
  });
  const byId = new Map();
  normalized.forEach((item) => byId.set(item.id, item));
  return OPTION_IDS.map((id) => byId.get(id)).filter(Boolean).slice(0, 5);
}

function detectTruncated(text = '') {
  const value = String(text || '').trim();
  if (!value) return true;
  if (/\.{2,}|…/u.test(value)) return true;
  if (/\b(?:ve|ile|ancak|çünkü|fakat|ama|bu nedenle|için|olarak)$/iu.test(value)) return true;
  if (/[a-zçğıöşü]{1,2}\.$/iu.test(value) && value.split(/\s+/u).length > 6) return true;
  return false;
}

function hasForbidden(text = '') {
  const normalized = normalizeText(text);
  return FORBIDDEN_FEEDBACK_PHRASES.some((phrase) => normalized.includes(normalizeText(phrase)));
}

function sourceTextForDraft(draft = {}) {
  return normalizeText([
    draft.stem,
    ...(Array.isArray(draft.history) ? draft.history : []),
    ...(Array.isArray(draft.exam) ? draft.exam : []),
    JSON.stringify(draft.vitals || {}),
    JSON.stringify(draft.objectiveData || []),
  ].join(' '));
}

function validateDraft(draft = {}, { requestedBranch = '', recentSummaries = [] } = {}) {
  const errors = [];
  const options = normalizeOptionList(draft.options);
  const correctId = String(draft.correctAnswer || '').trim().toUpperCase();
  const correctOption = options.find((option) => option.id === correctId);
  const answerText = correctOption?.text || '';
  const title = cleanText(draft.title || '');
  const branch = cleanText(draft.branch || draft.relatedBranch || '');
  const stem = cleanText(draft.stem || '');
  const question = cleanText(draft.question || '');
  const combined = [title, stem, question, draft.explanation, draft.examPearl, JSON.stringify(draft.optionRationales || {})].join(' ');

  if (title.length < 6 || title.length > 90) errors.push('title_length');
  if (stem.length < 80 || stem.length > 1100) errors.push('stem_length');
  if (question.length < 18 || question.length > 220) errors.push('question_length');
  if (options.length !== 5) errors.push('options_count');
  if (!correctOption) errors.push('correct_answer_missing');
  if (!ANSWER_TARGETS.includes(String(draft.answerTarget || draft.questionIntent || '').trim())) errors.push('answer_target_invalid');
  if (answerText && normalizeText(`${title} ${stem} ${question}`).includes(normalizeText(answerText))) errors.push('answer_leakage');
  if (hasForbidden(combined)) errors.push('generic_forbidden_feedback');
  if (detectTruncated(draft.explanation) || detectTruncated(draft.examPearl)) errors.push('truncated_core_text');
  if (options.some((option) => detectTruncated(option.text))) errors.push('truncated_option');

  const rationales = draft.optionRationales || draft.wrongOptionFeedback || {};
  OPTION_IDS.forEach((id) => {
    if (detectTruncated(rationales[id] || '')) errors.push(`rationale_${id}_missing_or_truncated`);
  });

  const evidence = Array.isArray(draft.evidenceChain) ? draft.evidenceChain.slice(0, 4) : [];
  if (evidence.length < 3) errors.push('evidence_too_short');
  const source = sourceTextForDraft(draft);
  const sourceBoundCount = evidence.filter((item) => {
    const clue = normalizeText(item?.clue || item?.sourceQuote || item?.text || item || '');
    if (!clue) return false;
    const words = clue.split(' ').filter((word) => word.length > 3).slice(0, 4);
    return words.some((word) => source.includes(word));
  }).length;
  if (sourceBoundCount < 2) errors.push('evidence_not_source_bound');

  const requested = String(requestedBranch || '').trim();
  if (requested && requested !== 'random' && requested !== 'Rastgele' && branch && normalizeText(branch) !== normalizeText(requested)) {
    const requestedRoot = normalizeText(requested).split(' ')[0];
    if (!normalizeText(branch).includes(requestedRoot) && !normalizeText(requested).includes(normalizeText(branch).split(' ')[0])) {
      errors.push('branch_mismatch');
    }
  }

  const newFingerprint = buildSemanticFingerprint({ ...draft, options, correctAnswer: correctId });
  const recentHit = recentSummaries.some((item) => {
    const recentFingerprint = item.fingerprint || item.semanticFingerprint || item.contentSignature || '';
    const sameFingerprint = recentFingerprint && normalizeText(recentFingerprint) === normalizeText(newFingerprint);
    const sameTitle = item.title && normalizeText(item.title) === normalizeText(title);
    const sameCorrect = item.correct && answerText && normalizeText(item.correct) === normalizeText(answerText);
    return sameFingerprint || sameTitle || (sameCorrect && recentSummaries.length < 3);
  });
  if (recentHit) errors.push('recent_duplicate');

  return { ok: errors.length === 0, errors, options, correctId, correctOption, semanticFingerprint: newFingerprint };
}

function normalizeVitals(vitals = {}) {
  const base = { TA: '', Nabız: '', Solunum: '', Ateş: '', 'SpO₂': '' };
  Object.entries(vitals || {}).forEach(([key, value]) => {
    const normalizedKey = key === 'Saturasyon' || key === 'SpO2' ? 'SpO₂' : key;
    if (Object.prototype.hasOwnProperty.call(base, normalizedKey)) base[normalizedKey] = cleanText(value);
  });
  return base;
}

function normalizeObjectiveData(items = []) {
  const seen = new Set();
  const out = [];
  (Array.isArray(items) ? items : []).forEach((item) => {
    const type = cleanText(item?.type || 'Objektif veri');
    const label = cleanText(item?.label || item?.name || '');
    const value = cleanText(item?.value || item?.result || item?.text || '');
    if (!label || !value) return;
    const key = normalizeText(`${type}|${label}|${value}`);
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ type, label, value });
  });
  return out.slice(0, 6);
}

function buildInvestigations(objectiveData = []) {
  return normalizeObjectiveData(objectiveData).map((item, index) => ({
    id: `ai-data-${index + 1}`,
    label: item.label,
    type: item.type,
    priority: 'support',
    summary: item.value,
    findings: [item.value],
    rows: [[item.label, item.value]],
  }));
}

function buildSemanticFingerprint(draft = {}) {
  const options = normalizeOptionList(draft.options).map((option) => option.text).sort().join('|');
  const correct = normalizeOptionList(draft.options).find((option) => option.id === String(draft.correctAnswer || '').toUpperCase())?.text || '';
  return `sem-${stableHash([
    draft.branch || draft.relatedBranch,
    draft.topic,
    draft.answerTarget || draft.questionIntent,
    draft.title,
    draft.question,
    correct,
    options,
  ].join('|'))}`;
}

function buildDifferentialComparison(options, correctId, optionRationales = {}, explanation = '') {
  const comparison = {};
  options.forEach((option) => {
    const rationale = optionRationales?.[option.id] || option.rationale || '';
    comparison[option.text] = {
      explanation: compactSentence(option.id === correctId ? (rationale || explanation) : rationale, 320),
      comparisonPoints: [],
    };
  });
  return comparison;
}

function makeQuestionFromDraft(draft = {}, meta = {}) {
  const options = meta.options || normalizeOptionList(draft.options);
  const correctId = meta.correctId || String(draft.correctAnswer || '').trim().toUpperCase();
  const correctOption = options.find((option) => option.id === correctId) || options[0];
  const branch = cleanText(draft.branch || draft.relatedBranch || meta.requestedBranch || 'TUS');
  const objectiveData = normalizeObjectiveData(draft.objectiveData || draft.compactObjectiveData || []);
  const vitals = normalizeVitals(draft.vitals || {});
  const investigations = buildInvestigations(objectiveData);
  const id = `ai-spot-${Date.now()}-${stableHash(`${draft.title}|${correctOption?.text}|${Math.random()}`)}`;
  const history = (Array.isArray(draft.history) ? draft.history : []).map(cleanText).filter(Boolean).slice(0, 4);
  const exam = (Array.isArray(draft.exam) ? draft.exam : []).map(cleanText).filter(Boolean).slice(0, 4);
  const evidence = (Array.isArray(draft.evidenceChain) ? draft.evidenceChain : []).slice(0, 4).map((item, index) => {
    if (typeof item === 'string') return { title: index === 0 ? 'Öykü' : 'Klinik ipucu', text: compactSentence(item, 180) };
    const type = cleanText(item?.type || item?.label || 'Klinik ipucu');
    const clue = cleanText(item?.clue || item?.sourceQuote || '');
    const meaning = cleanText(item?.meaning || item?.text || '');
    return { title: type, text: compactSentence(`${clue}${meaning ? `: ${meaning}` : ''}`, 210) };
  }).filter((item) => item.title && item.text);
  const rationales = draft.optionRationales || draft.wrongOptionFeedback || {};
  const explanation = compactSentence(draft.explanation || rationales[correctId] || '', 620);
  const examPearl = compactSentence(draft.examPearl || draft.teachingPoint || '', 260);
  const managementSteps = (Array.isArray(draft.managementSteps) ? draft.managementSteps : [])
    .map((step) => compactSentence(step, 180))
    .filter(Boolean)
    .slice(0, 4);
  const semanticFingerprint = meta.semanticFingerprint || buildSemanticFingerprint({ ...draft, options, correctAnswer: correctId });
  const contentSignature = `cs-${stableHash(`${branch}|${draft.title}|${draft.question}|${correctOption?.text}|${options.map((option) => option.text).sort().join('|')}`)}`;

  return {
    id,
    source: meta.fallback ? 'local-safe-fallback' : 'real-ai',
    caseType: 'ai-spot',
    branchId: 'tus-spot-olgular',
    branchName: branch,
    relatedBranch: branch,
    spotCategory: `AI Spot • ${branch}`,
    title: cleanText(draft.title),
    topic: cleanText(draft.topic || draft.subtopic || draft.learningTarget || ''),
    subtopic: cleanText(draft.subtopic || ''),
    difficulty: cleanText(draft.difficulty || 'Orta'),
    learningTarget: cleanText(draft.learningTarget || draft.topic || ''),
    answerTarget: cleanText(draft.answerTarget || draft.questionIntent || 'diagnosis'),
    questionType: cleanText(draft.questionIntent || draft.answerTarget || 'spot'),
    demographics: cleanText(draft.demographics || ''),
    setting: cleanText(draft.setting || ''),
    chiefComplaint: cleanText(draft.chiefComplaint || ''),
    stem: compactSentence(draft.stem || '', 1200),
    narrativeStem: compactSentence(draft.stem || '', 1200),
    stemMode: 'narrative',
    history,
    exam,
    vitals,
    investigations,
    findings: { history, exam, vitals, investigations },
    compactVitals: Object.entries(vitals).filter(([, value]) => value).map(([label, value]) => ({ label, value })),
    compactObjectiveData: objectiveData.map(({ type, label, value }) => ({ label, value, type })),
    question: cleanText(draft.question),
    options,
    correctAnswer: correctId,
    clinicalFocus: cleanText(draft.learningTarget || draft.topic || draft.question || ''),
    patientIntro: {
      profile: cleanText(draft.demographics || branch),
      presentation: cleanText(draft.chiefComplaint || draft.title || ''),
      riskContext: history.slice(0, 2),
      distinctiveClues: evidence.slice(0, 3).map((item) => item.text),
      historySummary: compactSentence(draft.stem || '', 420),
    },
    diagnosis: {
      correct: correctOption?.text || '',
      options: options.map((option) => option.text),
      explanation,
      nextStep: managementSteps[0] || 'Olgudaki veriler aynı karar düzlemindeki seçeneklerle karşılaştırılır.',
      pearls: [examPearl].filter(Boolean),
      answerFeedback: {
        whyCorrect: explanation,
        evidenceChain: evidence,
        pearls: [examPearl].filter(Boolean),
        clinicalPearls: [examPearl].filter(Boolean),
        differentialComparison: buildDifferentialComparison(options, correctId, rationales, explanation),
        managementSteps,
        learningOutcome: cleanText(draft.learningTarget || ''),
      },
    },
    contentSignature,
    semanticFingerprint,
    aiMeta: {
      generatedAt: Date.now(),
      provider: meta.provider || 'openai',
      model: meta.model || null,
      version: VERSION,
      fallback: Boolean(meta.fallback),
      validationErrors: meta.validationErrors || [],
      contentSignature,
      semanticFingerprint,
    },
    generatedAt: new Date().toISOString(),
  };
}

function convertFallbackDraft(fallback, requestedBranch = 'random') {
  const selected = { ...fallback };
  selected.options = fallback.options.map((text, index) => ({ id: OPTION_IDS[index], text }));
  selected.correctAnswer = OPTION_IDS[fallback.correctIndex || 0];
  selected.evidenceChain = fallback.evidence.map(([type, clue, meaning]) => ({ type, clue, meaning, sourceQuote: clue }));
  selected.optionRationales = Object.fromEntries(selected.options.map((option) => {
    if (option.id === selected.correctAnswer) return [option.id, selected.explanation];
    return [option.id, `${option.text} bu soruda ölçülen hedefi doğrudan karşılamaz; olgudaki veriler farklı bir önceliği işaret eder.`];
  }));
  return selected;
}

function pickFallback({ branch, recentSummaries = [] }) {
  const recentTitles = new Set(recentSummaries.map((item) => normalizeText(item.title || '')));
  const branchNorm = normalizeText(branch || '');
  const candidates = FALLBACK_DRAFTS.filter((draft) => {
    if (branch && branch !== 'random' && branch !== 'Rastgele') {
      const draftBranch = normalizeText(draft.branch);
      if (!draftBranch.includes(branchNorm.split(' ')[0]) && !branchNorm.includes(draftBranch.split(' ')[0])) return false;
    }
    return !recentTitles.has(normalizeText(draft.title));
  });
  const pool = candidates.length ? candidates : FALLBACK_DRAFTS.filter((draft) => !recentTitles.has(normalizeText(draft.title))) || FALLBACK_DRAFTS;
  return pool[Math.floor(Math.random() * pool.length)] || FALLBACK_DRAFTS[0];
}

async function generateRemoteDraft({ branch, recentSummaries = [] }) {
  const config = getOpenAIConfig();
  if (!config.enabled) throw new Error('OpenAI API key is not configured');
  const systemPrompt = buildSystemPrompt();
  let rejectionReason = '';
  const attempts = Math.max(1, Math.min(2, Number(process.env.REMOTE_AI_ATTEMPTS || 2)));
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const userPrompt = buildUserPrompt({ branch, recentSummaries, rejectionReason });
    const draft = await callOpenAI({ systemPrompt, userPrompt, config });
    const validation = validateDraft(draft, { requestedBranch: branch, recentSummaries });
    if (validation.ok) {
      return makeQuestionFromDraft(draft, {
        options: validation.options,
        correctId: validation.correctId,
        semanticFingerprint: validation.semanticFingerprint,
        provider: 'openai',
        model: config.model,
      });
    }
    rejectionReason = validation.errors.slice(0, 6).join(', ');
  }
  throw new Error(`Remote draft failed validation: ${rejectionReason || 'unknown'}`);
}

async function handler(request, response) {
  if (request.method && request.method !== 'POST') {
    sendJson(response, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  let body = {};
  try {
    body = await parseJsonBody(request);
  } catch {
    sendJson(response, 400, { ok: false, error: 'Invalid JSON body' });
    return;
  }

  const branch = pickBranch(body.branchFilter || body.branch || 'random');
  const recentSummaries = Array.isArray(body.recentQuestionSummaries) ? body.recentQuestionSummaries : [];
  const allowFallback = String(process.env.AI_ENABLE_SAFE_FALLBACK || 'true').toLowerCase() !== 'false';

  try {
    const question = await generateRemoteDraft({ branch, recentSummaries });
    sendJson(response, 200, {
      ok: true,
      provider: 'openai',
      fallback: false,
      usedRemoteAI: true,
      version: VERSION,
      question,
    });
  } catch (error) {
    if (!allowFallback) {
      sendJson(response, 503, {
        ok: false,
        error: 'AI question generation failed',
        detail: String(error?.message || error).slice(0, 240),
        version: VERSION,
      });
      return;
    }
    const fallbackDraft = convertFallbackDraft(pickFallback({ branch, recentSummaries }), branch);
    const validation = validateDraft(fallbackDraft, { requestedBranch: branch, recentSummaries: [] });
    const question = makeQuestionFromDraft(fallbackDraft, {
      options: validation.options,
      correctId: validation.correctId,
      semanticFingerprint: validation.semanticFingerprint,
      provider: 'local-safe-fallback',
      fallback: true,
      validationErrors: [String(error?.message || error).slice(0, 240)],
    });
    sendJson(response, 200, {
      ok: true,
      provider: 'local-safe-fallback',
      fallback: true,
      usedRemoteAI: false,
      version: VERSION,
      question,
      warning: String(error?.message || error).slice(0, 240),
    });
  }
}

export default handler;
