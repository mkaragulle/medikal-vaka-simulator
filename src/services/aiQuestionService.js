const runtimeEnv = import.meta.env || {};
const ENABLE_REAL_AI = String(runtimeEnv.VITE_ENABLE_REAL_AI || 'true').toLowerCase() !== 'false';
const AI_ENDPOINT = runtimeEnv.VITE_AI_QUESTION_ENDPOINT || '/api/generate-ai-question';
const AI_REQUEST_TIMEOUT_MS = Math.max(15000, Number(runtimeEnv.VITE_AI_REQUEST_TIMEOUT_MS || 55000));
const STORAGE_KEY = 'klinikiq.ai.recentQuestions.v3';
const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

function normalizeText(value = '') {
  return String(value ?? '')
    .toLocaleLowerCase('tr')
    .replace(/[âîû]/g, (match) => ({ â: 'a', î: 'i', û: 'u' }[match] || match))
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9çğıöşü\s]/giu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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

function safeReadRecent() {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.slice(0, 20) : [];
  } catch {
    return [];
  }
}

function safeWriteRecent(items = []) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 20)));
  } catch {
    // localStorage may be unavailable; question generation should still work.
  }
}

function extractOptionTexts(question = {}) {
  if (Array.isArray(question.diagnosis?.options)) return question.diagnosis.options.filter(Boolean);
  if (Array.isArray(question.options)) return question.options.map((option) => option?.text || option).filter(Boolean);
  return [];
}

function extractCorrectText(question = {}) {
  if (question.diagnosis?.correct) return question.diagnosis.correct;
  const correctId = String(question.correctAnswer || '').toUpperCase();
  return (question.options || []).find((option) => String(option?.id || '').toUpperCase() === correctId)?.text || '';
}

function buildQuestionFingerprint(question = {}) {
  const options = extractOptionTexts(question).map(normalizeText).sort().join('|');
  return question.semanticFingerprint
    || question.contentSignature
    || `sem-${stableHash([
      question.relatedBranch || question.branchName || '',
      question.topic || question.subtopic || '',
      question.answerTarget || question.questionType || '',
      question.title || '',
      question.question || '',
      extractCorrectText(question),
      options,
    ].join('|'))}`;
}

function summarizeQuestion(question = {}) {
  const optionSetSignature = stableHash(extractOptionTexts(question).map(normalizeText).sort().join('|'));
  return {
    id: question.id || buildQuestionFingerprint(question),
    title: question.title || '',
    branch: question.relatedBranch || question.branchName || '',
    topic: question.topic || question.subtopic || question.learningTarget || '',
    answerTarget: question.answerTarget || question.questionType || '',
    correct: extractCorrectText(question),
    fingerprint: buildQuestionFingerprint(question),
    optionSetSignature,
    createdAt: Date.now(),
  };
}

function rememberQuestion(question = {}) {
  const recent = safeReadRecent();
  const summary = summarizeQuestion(question);
  const filtered = recent.filter((item) => item.id !== summary.id && item.fingerprint !== summary.fingerprint);
  safeWriteRecent([summary, ...filtered]);
  return summary;
}

function hasRecentDuplicate(question = {}, recent = safeReadRecent()) {
  const summary = summarizeQuestion(question);
  return recent.some((item) => {
    if (item.fingerprint && item.fingerprint === summary.fingerprint) return true;
    if (normalizeText(item.title) && normalizeText(item.title) === normalizeText(summary.title)) return true;
    if (item.optionSetSignature && item.optionSetSignature === summary.optionSetSignature) return true;
    return false;
  });
}

function withTimeout(ms = AI_REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), ms);
  return { controller, timeoutId };
}

function makeRequestId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

async function requestRemoteQuestion({ previousQuestionId, branchFilter }) {
  if (!ENABLE_REAL_AI || typeof window === 'undefined') throw new Error('Real AI is disabled');
  const recent = safeReadRecent();
  const { controller, timeoutId } = withTimeout();
  try {
    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        previousQuestionId,
        branchFilter,
        recentQuestionSummaries: recent.slice(0, 10),
        requestId: makeRequestId(),
      }),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload?.ok || !payload?.question) {
      const message = payload?.error || payload?.detail || response.statusText || 'AI endpoint failed';
      throw new Error(message);
    }
    const question = payload.question;
    question.aiMeta = {
      ...(question.aiMeta || {}),
      provider: payload.provider || question.aiMeta?.provider || 'openai',
      fallback: Boolean(payload.fallback),
      usedRemoteAI: Boolean(payload.usedRemoteAI),
      serviceVersion: 'klinikiq-client-ai-reset-v1.0',
    };
    question.source = payload.fallback ? 'local-safe-fallback' : 'real-ai';
    if (hasRecentDuplicate(question, recent) && !payload.fallback) {
      throw new Error('AI returned a near-duplicate question');
    }
    rememberQuestion(question);
    return {
      ok: true,
      question,
      source: payload.provider || question.source || 'real-ai',
      usedRemoteAI: !payload.fallback,
      fallback: Boolean(payload.fallback),
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

const CLIENT_FALLBACKS = [
  {
    branch: 'Tıbbi Farmakoloji',
    title: 'İlaç yan etkisi tanıma',
    topic: 'Farmakoloji',
    correct: 'Sorumlu ilacı kesmek ve destek tedavisi planlamak',
    options: [
      'Sorumlu ilacı kesmek ve destek tedavisi planlamak',
      'Aynı ilacı daha yüksek dozda sürdürmek',
      'Yakınmayı yalnız psikojenik kabul etmek',
      'Rutin yıllık kontrol önermek',
      'Tedaviyi hiçbir değerlendirme yapmadan değiştirmemek',
    ],
    stem: 'Yeni başlanan bir tedaviden kısa süre sonra beklenmeyen sistemik yakınmaları gelişen hasta değerlendirilir. Bulgular ilaç zamanı ile uyumludur ve başka bir akut neden öyküde öne çıkmamaktadır. Klinik karar, olası ilaç ilişkisini güvenli biçimde yönetmeye yöneliktir.',
    question: 'Bu hastada en uygun güvenli yaklaşım hangisidir?',
    explanation: 'Yeni yakınmaların ilaçla zamansal ilişkisi öncelikle ilaç güvenliği açısından değerlendirilmelidir. Sorumlu olabilecek ilacı kesmek ve destek tedavisi planlamak, gereksiz doz artırımı veya gecikmiş değerlendirmeden daha güvenlidir.',
    pearl: 'İlaç güvenliği sorularında zaman ilişkisi, doz değişikliği ve alternatif nedenler birlikte değerlendirilir.',
  },
  {
    branch: 'Tıbbi Mikrobiyoloji',
    title: 'Test yorumu',
    topic: 'Mikrobiyoloji',
    correct: 'Test sonucunu klinik zamanlama ile birlikte yorumlamak',
    options: [
      'Test sonucunu klinik zamanlama ile birlikte yorumlamak',
      'Tek negatif sonucu tüm olasılıkları dışlamak için yeterli görmek',
      'Pozitifliği her durumda aktif hastalık kabul etmek',
      'Örnek türünü değerlendirmeden sonuç vermek',
      'Klinik bulguları tamamen yok saymak',
    ],
    stem: 'Enfeksiyon şüphesiyle değerlendirilen hastada tanısal test sonucu elde edilmiştir. Sonucun anlamı, örneğin alındığı dönem ve klinik bulgularla birlikte değişebilmektedir. Hekim test sonucunu tek başına değil, klinik bağlam içinde yorumlamak istemektedir.',
    question: 'Bu test sonucunu değerlendirirken en doğru yaklaşım hangisidir?',
    explanation: 'Mikrobiyolojik testler örnek türü, zamanlama ve klinik olasılıkla birlikte anlam kazanır. Tek bir sonucu bağlamdan koparmak yanlış dışlama veya yanlış tanı riskini artırır.',
    pearl: 'Test yorumunda klinik olasılık, örnek zamanı ve testin neyi gösterdiği birlikte düşünülür.',
  },
];

function makeClientFallbackQuestion({ branchFilter = 'random' } = {}) {
  const recent = safeReadRecent();
  const requested = String(branchFilter || 'random');
  const pool = CLIENT_FALLBACKS.filter((item) => requested === 'random' || requested === 'Rastgele' || normalizeText(item.branch).includes(normalizeText(requested).split(' ')[0]));
  const selected = (pool.length ? pool : CLIENT_FALLBACKS).find((item) => !recent.some((recentItem) => normalizeText(recentItem.title) === normalizeText(item.title))) || CLIENT_FALLBACKS[Math.floor(Math.random() * CLIENT_FALLBACKS.length)];
  const id = `ai-spot-client-fallback-${Date.now()}-${stableHash(selected.title)}`;
  const question = {
    id,
    source: 'client-safe-fallback',
    caseType: 'ai-spot',
    branchId: 'tus-spot-olgular',
    branchName: selected.branch,
    relatedBranch: selected.branch,
    spotCategory: `AI Spot • ${selected.branch}`,
    title: selected.title,
    topic: selected.topic,
    difficulty: 'Orta',
    learningTarget: selected.topic,
    answerTarget: 'next_step',
    questionType: 'next_step',
    demographics: 'Kısa TUS klinik bağlamı',
    setting: 'Klinik değerlendirme',
    chiefComplaint: selected.title,
    stem: selected.stem,
    narrativeStem: selected.stem,
    stemMode: 'narrative',
    history: [],
    exam: [],
    vitals: {},
    investigations: [],
    findings: { history: [], exam: [], vitals: {}, investigations: [] },
    compactVitals: [],
    compactObjectiveData: [],
    question: selected.question,
    diagnosis: {
      correct: selected.correct,
      options: selected.options,
      explanation: selected.explanation,
      nextStep: selected.correct,
      pearls: [selected.pearl],
      answerFeedback: {
        whyCorrect: selected.explanation,
        evidenceChain: [{ title: 'Klinik bağlam', text: 'Soru tek bir karar hedefini ölçer.' }, { title: 'Güvenlik', text: 'Yanıt klinik güvenliği önceleyen seçenektir.' }, { title: 'Sınav mantığı', text: 'Bağlamdan kopuk seçenekler elenir.' }],
        pearls: [selected.pearl],
        clinicalPearls: [selected.pearl],
        differentialComparison: Object.fromEntries(selected.options.map((option) => [option, { explanation: option === selected.correct ? selected.explanation : `${option} bu soruda ölçülen güvenli karar hedefini doğrudan karşılamaz.`, comparisonPoints: [] }])),
        managementSteps: [],
      },
    },
    semanticFingerprint: `sem-${stableHash(`${selected.branch}|${selected.title}|${selected.correct}`)}`,
    contentSignature: `cs-${stableHash(`${selected.title}|${selected.options.join('|')}`)}`,
    aiMeta: { provider: 'client-safe-fallback', fallback: true, generatedAt: Date.now() },
    generatedAt: new Date().toISOString(),
  };
  rememberQuestion(question);
  return question;
}

export async function createAIQuestion({ previousQuestionId = null, branchFilter = 'random' } = {}) {
  try {
    return await requestRemoteQuestion({ previousQuestionId, branchFilter });
  } catch (error) {
    const question = makeClientFallbackQuestion({ branchFilter });
    return {
      ok: true,
      question,
      source: 'client-safe-fallback',
      usedRemoteAI: false,
      fallback: true,
      error,
    };
  }
}

export function getAIServiceMode() {
  return ENABLE_REAL_AI ? 'simple-openai-single-call-with-safe-fallback' : 'client-safe-fallback-only';
}
