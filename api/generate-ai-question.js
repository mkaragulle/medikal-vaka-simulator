import {
  OPTIMIZED_TUS_SYSTEM_PROMPT,
  buildRecentCompact,
  buildUserPrompt,
  normalizeDifficulty,
} from './tus-question-prompt.js';
import {
  defaultReasoningEffortForProfile,
  defaultVerbosityForProfile,
  envNumber,
  logAIUsage,
  resolveModelForScope,
} from './lib/ai-token-optimizer.js';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const PROMPT_VERSION = 'klinikiq-v420-simple-direct-tus';
const SCHEMA_VERSION = 'simple-ai-spot-v5-compact';
const TASK_NAME = 'tusSpotQuestion';

const ALLOWED_BRANCHES = [
  'Çocuk Sağlığı ve Hastalıkları',
  'Kadın Hastalıkları ve Doğum',
  'İç Hastalıkları',
  'Genel Cerrahi',
  'Tıbbi Mikrobiyoloji',
  'Tıbbi Farmakoloji',
  'Tıbbi Biyokimya',
  'Tıbbi Patoloji',
  'Fizyoloji',
  'Anatomi',
  'Histoloji ve Embriyoloji',
  'Küçük Stajlar',
];

const RESIDUE_PATTERN = /\b(?:A feedback|B feedback|C feedback|D feedback|E feedback|TUS ipucu\.?|öğrenme hedefi\s*:|hedeflenen ayırıcı\s*:|kısıtlama\s*:|gereken klinik soru\s*:|ek klinik verilerde|tetkik ve destekleyici bulgularda)\b/iu;

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
      if (body.length > 600_000) {
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

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/(?:\.\.\.|…)+/g, '')
    .trim();
}

function normalize(value = '') {
  return cleanText(value)
    .toLocaleLowerCase('tr')
    .replace(/[âîû]/g, (match) => ({ â: 'a', î: 'i', û: 'u' }[match] || match))
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9çğıöşü\s]/giu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
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

function stripResidue(value = '') {
  return cleanText(value)
    .replace(/^\s*[A-E]\s*\)\s*[A-E]\s*\)?\s*/iu, '')
    .replace(/^\s*[A-E]\s+feedback\s*[:：.-]?\s*/iu, '')
    .replace(/\b(?:öğrenme hedefi|hedeflenen ayırıcı|kısıtlama|gereken klinik soru)\s*[:：][^.?!]*(?:[.?!]|$)/giu, ' ')
    .replace(/\b(?:Ek klinik verilerde|Tetkik ve destekleyici bulgularda)\s*[:：]?\s*/giu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function standardizeTurkishMedicalText(value = '') {
  let text = stripResidue(value);
  const replacements = [
    [/\byonlendirme\b/giu, 'yönlendirme'], [/\byonlendir/giu, 'yönlendir'],
    [/\blife[-\s]?threatening\b/giu, 'yaşamı tehdit eden'], [/\bstemde\b/giu, 'soru kökünde'],
    [/\btherapeutic\b/giu, 'terapötik'], [/\bvaginal\b/giu, 'vajinal'], [/\bkontraendike\b/giu, 'kontrendike'],
    [/\birreversibl\b/giu, 'geri dönüşümsüz'], [/\bchylomikron\b/giu, 'şilomikron'], [/\bchylomicron\b/giu, 'şilomikron'],
    [/\bacinar\b/giu, 'asiner'], [/\bchemoresept[oö]r\b/giu, 'kemoreseptör'], [/\bkemoreseptor\b/giu, 'kemoreseptör'],
    [/\bcavern[oö]z\b/giu, 'kavernöz'], [/\bkranial\b/giu, 'kraniyal'], [/\btubul(?:us)?\b/giu, 'tübül'],
    [/\bglomerul\b/giu, 'glomerül'], [/\bdiffus\b/giu, 'diffüz'], [/\bembryolojik\b/giu, 'embriyolojik'],
    [/\binfeksiyon\b/giu, 'enfeksiyon'], [/\bakciğusda\b/giu, 'akciğerde'], [/\bprofılaktik\b/giu, 'profilaktik'],
    [/\bcontrastli\b/giu, 'kontrastlı'], [/\banjiografi\b/giu, 'anjiyografi'], [/\bnöral krista\b/giu, 'nöral krest'],
    [/\bintraivazöz\b/giu, 'intravenöz'], [/\baktiv\b/giu, 'aktif'], [/\bintraabdomenel\b/giu, 'intraabdominal'],
    [/\blaparatomi\b/giu, 'laparotomi'], [/\bspesifiktedir\b/giu, 'spesifiktir'], [/\bgösterür\b/giu, 'gösterir'],
    [/\btoplumsal kazanımlı pnömoni\b/giu, 'toplum kökenli pnömoni'], [/\bbilinç bulan hasta\b/giu, 'bilinci bulanık hasta'],
  ];
  replacements.forEach(([pattern, replacement]) => { text = text.replace(pattern, replacement); });
  return cleanText(text);
}

function chooseBranch(value = '') {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const raw = cleanText(rawValue || '');
  if (!raw || /^(random|rastgele)$/iu.test(raw)) return ALLOWED_BRANCHES[Math.floor(Math.random() * ALLOWED_BRANCHES.length)];
  return ALLOWED_BRANCHES.find((branch) => normalize(branch) === normalize(raw)) || raw;
}

function isEmptyLike(value = '') {
  const text = cleanText(value);
  return !text || /^[-–—:;.,]*$/u.test(text) || /^(boş|yok|belirtilmedi|null|undefined)$/iu.test(text);
}

function compactItems(items = [], max = 8) {
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
    if (isEmptyLike(label) || isEmptyLike(value) || RESIDUE_PATTERN.test(`${label} ${value}`)) return;
    const key = normalize(`${label} ${value}`);
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ label, value });
  });
  return out.slice(0, max);
}

function splitSentences(text = '') {
  return cleanText(text).split(/(?<=[.!?])\s+/u).map((item) => item.trim()).filter(Boolean);
}

function looksLikeObjectiveSentence(sentence = '') {
  const text = cleanText(sentence);
  if (!text) return false;
  if (/^(?:ek klinik verilerde|tetkik ve destekleyici bulgularda|laboratuvar|tetkiklerde|vital bulgu|serum|idrar|plazma|bt|mr|mri|usg|ekg|transvajinal|β-hcg|hcg)\b/iu.test(text)) return true;
  const hasUnit = /\b(?:mmol\/L|mEq\/L|mOsm\/kg|IU\/L|mg\/dL|ng\/mL|mmHg|%|cm|mm)\b/iu.test(text);
  const hasDataWord = /\b(?:serum|idrar|plazma|laktat|sodyum|osmolalite|trigliserid|troponin|hcg|β-hcg|bt|mr|mri|usg|ekg|doppler|kortizol|acth|renin|aldosteron)\b/iu.test(text);
  return hasUnit && hasDataWord;
}

function parseObjectiveSentence(sentence = '') {
  const cleaned = standardizeTurkishMedicalText(sentence)
    .replace(/^(?:ek klinik verilerde|tetkik ve destekleyici bulgularda|laboratuvar verileri|tetkiklerde|vital bulgu(?:lar)?|ek klinik veri)\s*[:：]?\s*/iu, '')
    .replace(/[.?!]$/u, '');
  return cleaned.split(/;|,(?=\s*(?:serum|idrar|plazma|kan|bt|mr|mri|usg|ekg|transvajinal|vital|servikal|troponin|laktat|hcg|β-hcg)\b)/iu)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const colon = part.match(/^([^:：=]{2,60})\s*[:：=]\s*(.+)$/u);
      if (colon) return { label: colon[1], value: colon[2] };
      const unit = part.match(/^(.{2,60}?)\s+([-+]?\d[\d.,]*\s*(?:mmol\/L|mEq\/L|mOsm\/kg|IU\/L|mg\/dL|ng\/mL|mmHg|%|cm|mm)\b.*)$/iu);
      if (unit) return { label: unit[1], value: unit[2] };
      return { label: 'Veri', value: part };
    });
}

function separateStemAndData(stem = '', currentData = []) {
  const story = [];
  const extracted = [];
  splitSentences(stem).forEach((sentence) => {
    if (looksLikeObjectiveSentence(sentence)) extracted.push(...parseObjectiveSentence(sentence));
    else story.push(sentence);
  });
  return { storyText: story.join(' '), objectiveData: compactItems([...currentData, ...extracted], 10) };
}

function normalizeOptions(raw = []) {
  const arr = Array.isArray(raw)
    ? raw
    : raw && typeof raw === 'object'
      ? OPTION_IDS.map((id) => raw[id] || raw[id.toLowerCase()] || raw[`option${id}`])
      : [];
  return OPTION_IDS.map((id, index) => {
    const source = arr.find((item) => typeof item === 'object' && String(item?.id || '').toUpperCase() === id) ?? arr[index];
    const rawText = typeof source === 'string' ? source : source?.text || source?.label || source?.value || '';
    const text = standardizeTurkishMedicalText(rawText).replace(/^\s*[A-E]\s*\)\s*/iu, '').trim();
    return { id, text };
  }).filter((option) => option.text);
}

function resolveCorrectId(payload = {}, options = []) {
  const raw = String(payload.c || payload.correctAnswer || payload.correct || payload.answer || '').trim().toUpperCase();
  if (OPTION_IDS.includes(raw)) return raw;
  const wanted = normalize(payload.c || payload.correctAnswer || payload.correct || payload.correctAnswerText || payload.answer || '');
  if (!wanted) return '';
  const exact = options.find((option) => normalize(option.text) === wanted);
  if (exact) return exact.id;
  const loose = options.find((option) => wanted.length >= 5 && (normalize(option.text).includes(wanted) || wanted.includes(normalize(option.text))));
  return loose?.id || '';
}

function feedbackObject(rawFeedback = [], correctId = 'A', explanation = '') {
  const arr = Array.isArray(rawFeedback)
    ? rawFeedback
    : OPTION_IDS.map((id) => rawFeedback?.[id] || rawFeedback?.[id.toLowerCase()] || rawFeedback?.[`option${id}`] || '');
  return OPTION_IDS.reduce((acc, id, index) => {
    const fallback = id === correctId
      ? explanation
      : 'Bu seçenek klinik olarak düşünülebilir; ancak olgudaki ayırt ettirici ipuçları doğru cevabı desteklemez.';
    acc[id] = ensureSentence(standardizeTurkishMedicalText(arr[index] || fallback));
    return acc;
  }, {});
}

function getJsonCandidate(text = '') {
  const trimmed = String(text || '').trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return fenced[1].trim();
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

function parseModelJson(text = '') {
  const candidate = getJsonCandidate(text);
  try {
    return JSON.parse(candidate);
  } catch {
    return JSON.parse(candidate.replace(/,\s*([}\]])/g, '$1').replace(/[\u0000-\u001F\u007F]+/g, ' '));
  }
}

function normalizeGeneratedQuestion(rawPayload = {}, { branch, difficulty, model, mode } = {}) {
  const payload = rawPayload?.question && typeof rawPayload.question === 'object' ? rawPayload.question : rawPayload;
  let compactVitals = compactItems(payload.cv || payload.compactVitals || payload.vitals || [], 5);
  let compactObjectiveData = compactItems(payload.co || payload.compactObjectiveData || payload.objectiveData || [], 10);
  const separated = separateStemAndData(payload.s || payload.stem || '', compactObjectiveData);
  compactObjectiveData = separated.objectiveData;

  const stemSource = separated.storyText || payload.s || payload.stem || '';
  const stem = ensureSentence(standardizeTurkishMedicalText(stemSource));
  const options = normalizeOptions(payload.o || payload.options);
  const correctAnswer = resolveCorrectId(payload, options);
  const explanation = ensureSentence(standardizeTurkishMedicalText(payload.e || payload.explanation || ''));

  return {
    id: `ai-spot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    relatedBranch: standardizeTurkishMedicalText(payload.b || payload.relatedBranch || branch),
    difficulty: normalizeDifficulty(payload.d || payload.difficulty || difficulty),
    learningTarget: standardizeTurkishMedicalText(payload.lt || payload.learningTarget || ''),
    answerTarget: cleanText(payload.at || payload.answerTarget || 'diagnosis'),
    demographics: standardizeTurkishMedicalText(payload.dem || payload.demographics || ''),
    setting: standardizeTurkishMedicalText(payload.set || payload.setting || ''),
    chiefComplaint: standardizeTurkishMedicalText(payload.cc || payload.chiefComplaint || ''),
    stem,
    compactVitals,
    compactObjectiveData,
    question: ensureQuestion(standardizeTurkishMedicalText(payload.q || payload.question || '')),
    options,
    correctAnswer,
    explanation,
    wrongOptionFeedback: feedbackObject(payload.f || payload.wrongOptionFeedback || payload.optionFeedback || {}, correctAnswer, explanation),
    evidenceChain: asArray(payload.k || payload.evidenceChain).map(standardizeTurkishMedicalText).filter(Boolean).slice(0, 2),
    examPearl: ensureSentence(standardizeTurkishMedicalText(payload.p || payload.examPearl || '')),
    managementSteps: asArray(payload.m || payload.managementSteps).map(standardizeTurkishMedicalText).filter(Boolean).slice(0, 3),
    provider: 'openai',
    openAIModel: model || '',
    openAIMode: mode || '',
    promptVersion: PROMPT_VERSION,
    schemaVersion: SCHEMA_VERSION,
    aiMeta: { provider: 'openai', remote: true, fallback: false, simplified: true },
  };
}

function assertStructuralQuestion(question = {}) {
  const errors = [];
  if (!cleanText(question.stem)) errors.push('soru kökü boş');
  if (!cleanText(question.question)) errors.push('soru cümlesi boş');
  if (!Array.isArray(question.options) || question.options.length !== 5) errors.push(`tam 5 seçenek yok (${question.options?.length || 0})`);
  if (!OPTION_IDS.includes(String(question.correctAnswer || '').toUpperCase())) errors.push(`correctAnswer A-E değil (${question.correctAnswer || 'boş'})`);
  if (!question.options?.some((option) => option.id === question.correctAnswer)) errors.push('correctAnswer seçeneklerle eşleşmiyor');
  if (!cleanText(question.explanation)) errors.push('açıklama boş');
  if (errors.length) {
    const error = new Error(`Model JSON döndürdü ama temel soru alanları eksik: ${errors.join('; ')}`);
    error.statusCode = 422;
    throw error;
  }
}

function extractChatText(payload = {}) {
  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) return content.map((item) => item?.text || item?.content || '').join('\n');
  return '';
}

function extractResponsesText(payload = {}) {
  if (typeof payload.output_text === 'string') return payload.output_text;
  const chunks = [];
  asArray(payload.output).forEach((item) => asArray(item.content).forEach((part) => {
    if (typeof part.text === 'string') chunks.push(part.text);
    if (typeof part.output_text === 'string') chunks.push(part.output_text);
  }));
  return chunks.join('\n');
}

function shouldUseResponsesApi(model = '', explicitStyle = '') {
  const style = String(explicitStyle || '').toLowerCase();
  if (style === 'responses' || style === 'response') return true;
  if (style === 'chat' || style === 'chat_completions') return false;
  return /^gpt-5/i.test(String(model || '')) || /^o\d/i.test(String(model || ''));
}

function modelSupportsReasoningEffort(model = '') {
  return /^gpt-5/i.test(String(model || '')) || /^o\d/i.test(String(model || ''));
}

function safeReasoningEffort(value = '') {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'minimal') return 'low';
  if (/^(none|low|medium|high|xhigh)$/.test(normalized)) return normalized;
  return 'low';
}

function safeVerbosity(value = '') {
  return /^(low|medium|high)$/i.test(String(value || '')) ? String(value).toLowerCase() : 'low';
}

function createAbortSignal(timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    const error = new Error(`TUS soru üretimi ${Math.round(timeoutMs / 1000)} saniye içinde tamamlanamadı.`);
    error.name = 'AbortError';
    error.statusCode = 504;
    try { controller.abort(error); } catch { controller.abort(); }
  }, timeoutMs);
  return { signal: controller.signal, cancel: () => clearTimeout(timeout) };
}

function isAbortLikeError(error) {
  return error?.name === 'AbortError' || /aborted|abort|signal is aborted|timeout|timed out/i.test(String(error?.message || error || ''));
}

async function callOpenAI(prompt) {
  const apiKey = process.env.TUS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const error = new Error('OPENAI_API_KEY tanımlı değil.');
    error.statusCode = 503;
    throw error;
  }

  const model = resolveModelForScope('TUS');
  const baseUrl = (process.env.TUS_OPENAI_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const timeoutMs = envNumber('TUS_OPENAI_PER_REQUEST_TIMEOUT_MS', envNumber('OPENAI_PER_REQUEST_TIMEOUT_MS', 75000));
  const outputLimit = envNumber('TUS_OPENAI_MAX_OUTPUT_TOKENS', envNumber('OPENAI_MAX_OUTPUT_TOKENS', 1100));
  const explicitStyle = process.env.TUS_OPENAI_API_STYLE || process.env.OPENAI_API_STYLE || '';
  const useResponses = shouldUseResponsesApi(model, explicitStyle);
  const style = useResponses ? 'responses' : 'chat';
  const reasoningEffort = safeReasoningEffort(process.env.TUS_OPENAI_REASONING_EFFORT || process.env.OPENAI_REASONING_EFFORT || defaultReasoningEffortForProfile('TUS'));
  const verbosity = safeVerbosity(process.env.TUS_OPENAI_VERBOSITY || process.env.OPENAI_VERBOSITY || defaultVerbosityForProfile('TUS'));
  const { signal, cancel } = createAbortSignal(timeoutMs);

  try {
    const body = useResponses
      ? {
          model,
          instructions: OPTIMIZED_TUS_SYSTEM_PROMPT,
          input: prompt,
          text: { format: { type: 'json_object' }, verbosity },
          ...(modelSupportsReasoningEffort(model) ? { reasoning: { effort: reasoningEffort } } : {}),
          max_output_tokens: outputLimit,
          store: false,
          truncation: 'auto',
        }
      : {
          model,
          messages: [
            { role: 'system', content: OPTIMIZED_TUS_SYSTEM_PROMPT },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_object' },
          max_completion_tokens: outputLimit,
        };
    if (!useResponses && modelSupportsReasoningEffort(model)) body.reasoning_effort = reasoningEffort;

    const endpoint = `${baseUrl}${useResponses ? '/responses' : '/chat/completions'}`;
    let res;
    try {
      res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify(body),
        signal,
      });
    } catch (error) {
      if (isAbortLikeError(error)) {
        const timeoutError = new Error('TUS soru üretimi zaman aşımına uğradı. Lütfen tekrar deneyin veya daha hızlı model/timeout ayarı kullanın.');
        timeoutError.statusCode = 504;
        throw timeoutError;
      }
      throw error;
    }

    const raw = await res.text();
    if (!res.ok) {
      const error = new Error(`OpenAI ${res.status}: ${raw.slice(0, 500)}`);
      error.statusCode = res.status;
      throw error;
    }
    const data = JSON.parse(raw || '{}');
    logAIUsage({ task: TASK_NAME, model: data.model || model, usage: data.usage || null, cached: false, apiStyle: style });
    const text = useResponses ? extractResponsesText(data) : extractChatText(data);
    if (!cleanText(text)) {
      const error = new Error('OpenAI boş çıktı döndürdü.');
      error.statusCode = 502;
      throw error;
    }
    return { payload: parseModelJson(text), model: data.model || model, mode: style };
  } finally {
    cancel();
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });

  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }

  const branch = chooseBranch(body.branchFilter || body.branch || 'Rastgele');
  const difficulty = normalizeDifficulty(body.difficulty || body.requestedDifficulty || body.aiDifficulty || 'Orta');
  const recentCompact = buildRecentCompact(asArray(body.recentQuestionSummaries).slice(0, 8));
  const prompt = buildUserPrompt({
    branch,
    target: body.target || body.answerTarget || '',
    difficulty,
    recentCompact,
    antiRepeatNonce: body.antiRepeatNonce || body.requestId || `${Date.now()}`,
  });

  try {
    const result = await callOpenAI(prompt);
    const question = normalizeGeneratedQuestion(result.payload, { branch, difficulty, model: result.model, mode: result.mode });
    assertStructuralQuestion(question);
    return sendJson(response, 200, { ok: true, provider: 'openai', fallback: false, repaired: false, question });
  } catch (error) {
    return sendJson(response, error?.statusCode || 502, {
      ok: false,
      provider: 'openai',
      fallback: false,
      error: error?.message || 'AI soru üretimi başarısız oldu.',
    });
  }
}
