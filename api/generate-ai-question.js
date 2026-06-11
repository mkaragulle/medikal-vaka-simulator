import {
  OPTIMIZED_TUS_SYSTEM_PROMPT,
  buildUserPrompt,
  normalizeDifficulty,
} from '../server/tus-question-prompt.js';
import { envFlag, envNumber, logAIUsage, resolveModelForScope } from '../server/lib/ai-token-optimizer.js';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const PROMPT_VERSION = 'klinikiq-v443-promptless-source-read';
const SCHEMA_VERSION = 'simple-ai-spot-v14-promptless';
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
    .replace(/```(?:json)?|```/giu, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
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

function chooseBranch(value = '') {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const raw = cleanText(rawValue || '');
  if (!raw || /^(random|rastgele)$/iu.test(raw)) return ALLOWED_BRANCHES[Math.floor(Math.random() * ALLOWED_BRANCHES.length)];
  return ALLOWED_BRANCHES.find((branch) => normalize(branch) === normalize(raw)) || raw;
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function getByPaths(payload = {}, paths = []) {
  for (const path of paths) {
    const parts = String(path).split('.');
    let current = payload;
    for (const part of parts) current = current?.[part];
    if (current !== undefined && current !== null && cleanText(current) !== '') return current;
  }
  return undefined;
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
  try { return JSON.parse(candidate); } catch {
    return JSON.parse(candidate.replace(/,\s*([}\]])/g, '$1').replace(/[\u0000-\u001F\u007F]+/g, ' '));
  }
}

function normalizeOptions(raw = []) {
  const arr = Array.isArray(raw)
    ? raw
    : raw && typeof raw === 'object'
      ? OPTION_IDS.map((id) => raw[id] || raw[id.toLowerCase()] || raw[`option${id}`] || raw[`secenek${id}`])
      : [];

  return OPTION_IDS.map((id, index) => {
    const source = arr.find((item) => typeof item === 'object' && String(item?.id || item?.harf || '').toUpperCase() === id) ?? arr[index];
    const rawText = typeof source === 'string' ? source : source?.text || source?.label || source?.value || source?.metin || '';
    const text = cleanText(rawText).replace(/^\s*[A-E]\s*[).:-]\s*/iu, '').trim();
    return { id, text };
  }).filter((option) => option.text);
}

function resolveCorrectId(payload = {}, options = []) {
  const rawValue = getByPaths(payload, ['c', 'correctAnswer', 'correct', 'answer', 'dogruCevap', 'doğruCevap', 'yanit', 'yanıt', 'cevap']);
  const raw = String(rawValue || '').trim().toUpperCase();
  if (OPTION_IDS.includes(raw)) return raw;
  const wanted = normalize(rawValue || '');
  if (!wanted) return '';
  const exact = options.find((option) => normalize(option.text) === wanted);
  if (exact) return exact.id;
  const loose = options.find((option) => wanted.length >= 5 && (normalize(option.text).includes(wanted) || wanted.includes(normalize(option.text))));
  return loose?.id || '';
}

function normalizeFeedback(rawFeedback = []) {
  if (Array.isArray(rawFeedback)) return OPTION_IDS.reduce((acc, id, index) => ({ ...acc, [id]: cleanText(rawFeedback[index] || '') }), {});
  if (rawFeedback && typeof rawFeedback === 'object') {
    return OPTION_IDS.reduce((acc, id) => ({
      ...acc,
      [id]: cleanText(rawFeedback[id] || rawFeedback[id.toLowerCase()] || rawFeedback[`option${id}`] || rawFeedback[`secenek${id}`] || ''),
    }), {});
  }
  return OPTION_IDS.reduce((acc, id) => ({ ...acc, [id]: '' }), {});
}

function normalizeGeneratedQuestion(payload = {}, { branch, difficulty, model, mode } = {}) {
  const source = payload.question && typeof payload.question === 'object' ? { ...payload, ...payload.question } : payload;
  const stem = cleanText(getByPaths(source, ['s', 'stem', 'soruKoku', 'soruKökü', 'soru_koku', 'soru_kökü', 'olgu', 'vaka', 'case', 'clinicalCase']) || '');
  const questionText = cleanText(getByPaths(source, ['q', 'question', 'soru', 'soruCumlesi', 'soruCümlesi', 'soru_cumlesi', 'soru_cümlesi']) || '');
  const rawOptions = getByPaths(source, ['o', 'options', 'secenekler', 'seçenekler', 'choices', 'siklar', 'şıklar']) || [];
  const options = normalizeOptions(rawOptions);
  const correctAnswer = resolveCorrectId(source, options);
  const explanation = cleanText(getByPaths(source, ['e', 'explanation', 'aciklama', 'açıklama', 'rationale', 'gerekce', 'gerekçe']) || '');
  const feedback = normalizeFeedback(getByPaths(source, ['f', 'feedback', 'optionFeedback', 'wrongOptionFeedback', 'secenekFeedback', 'seçenekFeedback', 'sikFeedback', 'şıkFeedback']) || []);

  return {
    id: `ai-spot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    relatedBranch: cleanText(source.b || source.relatedBranch || branch),
    difficulty: normalizeDifficulty(source.d || source.difficulty || difficulty),
    learningTarget: '',
    answerTarget: cleanText(source.at || source.answerTarget || 'diagnosis'),
    demographics: '',
    setting: '',
    chiefComplaint: '',
    stem,
    compactVitals: [],
    compactObjectiveData: [],
    question: questionText,
    options,
    correctAnswer,
    explanation,
    wrongOptionFeedback: feedback,
    evidenceChain: [],
    examPearl: '',
    managementSteps: [],
    provider: 'openai',
    openAIModel: model || '',
    openAIMode: mode || '',
    promptVersion: PROMPT_VERSION,
    schemaVersion: SCHEMA_VERSION,
    aiMeta: { provider: 'openai', remote: true, fallback: false, promptless: true, sourceRequired: true },
  };
}

function assertRenderableQuestion(question = {}) {
  const errors = [];
  if (!cleanText(question.stem)) errors.push('soru kökü boş');
  if (!cleanText(question.question)) errors.push('soru cümlesi boş');
  if (!Array.isArray(question.options) || question.options.length !== 5) errors.push(`tam 5 seçenek yok (${question.options?.length || 0})`);
  if (!OPTION_IDS.includes(String(question.correctAnswer || '').toUpperCase())) errors.push(`correctAnswer A-E değil (${question.correctAnswer || 'boş'})`);
  if (!question.options?.some((option) => option.id === question.correctAnswer)) errors.push('correctAnswer seçeneklerle eşleşmiyor');
  if (errors.length) {
    const error = new Error(`AI çıktısı ekranda gösterilebilir TUS sorusu formatına çevrilemedi: ${errors.join('; ')}`);
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

function isOfficialOpenAIBaseUrl(baseUrl = '') {
  return /\/\/api\.openai\.com\/v1$/i.test(String(baseUrl || '').replace(/\/$/, ''));
}

function sourceCheckEnabled(baseUrl = '', useResponses = false) {
  if (!envFlag('TUS_ENABLE_SCIENTIFIC_SOURCE_CHECK', true)) return false;
  if (!useResponses) return false;
  if (envFlag('TUS_FORCE_SOURCE_CHECK_ON_NON_OPENAI_BASE_URL', false)) return true;
  return isOfficialOpenAIBaseUrl(baseUrl);
}

function sourceCheckRequired(baseUrl = '', useResponses = false) {
  if (!envFlag('TUS_REQUIRE_SCIENTIFIC_SOURCE_CHECK', true)) return false;
  return sourceCheckEnabled(baseUrl, useResponses);
}

function extractResponseSourceMeta(payload = {}) {
  const output = Array.isArray(payload.output) ? payload.output : [];
  const usedWebSearch = output.some((item) => /web_search/i.test(String(item?.type || item?.name || '')));
  const urls = [];
  const walk = (value) => {
    if (!value) return;
    if (Array.isArray(value)) return value.forEach(walk);
    if (typeof value === 'object') {
      const url = value.url || value.uri || value.source_url;
      if (typeof url === 'string' && /^https?:\/\//i.test(url)) urls.push(url);
      Object.values(value).forEach(walk);
    }
  };
  walk(output);
  return { usedWebSearch, sourceUrls: [...new Set(urls)].slice(0, 8) };
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

async function callOpenAI(prompt) {
  const apiKey = process.env.TUS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const error = new Error('OPENAI_API_KEY tanımlı değil.');
    error.statusCode = 503;
    throw error;
  }

  const model = resolveModelForScope('TUS');
  const baseUrl = (process.env.TUS_OPENAI_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const timeoutMs = envNumber('TUS_OPENAI_PER_REQUEST_TIMEOUT_MS', envNumber('OPENAI_PER_REQUEST_TIMEOUT_MS', 60000));
  const explicitStyle = process.env.TUS_OPENAI_API_STYLE || process.env.OPENAI_API_STYLE || '';
  const useResponses = shouldUseResponsesApi(model, explicitStyle) || envFlag('TUS_ENABLE_SCIENTIFIC_SOURCE_CHECK', true);
  const style = useResponses ? 'responses' : 'chat';
  const enableScientificSourceCheck = sourceCheckEnabled(baseUrl, useResponses);
  const requireScientificSourceCheck = sourceCheckRequired(baseUrl, useResponses);
  const { signal, cancel } = createAbortSignal(timeoutMs);

  try {
    const body = useResponses
      ? {
          model,
          instructions: OPTIMIZED_TUS_SYSTEM_PROMPT,
          input: prompt,
          text: { format: { type: 'json_object' } },
          ...(enableScientificSourceCheck ? { tools: [{ type: process.env.TUS_OPENAI_WEB_SEARCH_TOOL_TYPE || 'web_search' }] } : {}),
          ...(enableScientificSourceCheck ? { tool_choice: process.env.TUS_OPENAI_WEB_SEARCH_TOOL_CHOICE || 'required' } : {}),
          store: false,
        }
      : {
          model,
          messages: [
            { role: 'system', content: OPTIMIZED_TUS_SYSTEM_PROMPT },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_object' },
        };

    const endpoint = `${baseUrl}${useResponses ? '/responses' : '/chat/completions'}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(body),
      signal,
    });
    const raw = await res.text();
    if (!res.ok) {
      const error = new Error(`OpenAI ${res.status}: ${raw}`);
      error.statusCode = res.status;
      throw error;
    }
    const data = JSON.parse(raw || '{}');
    const sourceMeta = useResponses ? extractResponseSourceMeta(data) : { usedWebSearch: false, sourceUrls: [] };
    if (requireScientificSourceCheck && !sourceMeta.usedWebSearch) {
      const error = new Error('Bilimsel kaynak okuma/web search gerçekleşmeden soru üretilmedi.');
      error.statusCode = 502;
      throw error;
    }
    logAIUsage({ task: TASK_NAME, model: data.model || model, usage: data.usage || null, cached: false, apiStyle: style, sourceChecked: Boolean(enableScientificSourceCheck && sourceMeta.usedWebSearch) });
    const text = useResponses ? extractResponsesText(data) : extractChatText(data);
    if (!cleanText(text)) {
      const error = new Error('OpenAI boş çıktı döndürdü.');
      error.statusCode = 502;
      throw error;
    }
    return { payload: parseModelJson(text), model: data.model || model, mode: style, sourceChecked: Boolean(enableScientificSourceCheck && sourceMeta.usedWebSearch), sourceUrls: sourceMeta.sourceUrls, scientificSourceCheckEnabled: enableScientificSourceCheck };
  } catch (error) {
    if (/aborted|abort|timeout|timed out/i.test(String(error?.message || error))) {
      const timeoutError = new Error('TUS soru üretimi zaman aşımına uğradı. Lütfen tekrar deneyin.');
      timeoutError.statusCode = 504;
      throw timeoutError;
    }
    throw error;
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
  const prompt = buildUserPrompt({ branch, difficulty });

  try {
    const result = await callOpenAI(prompt);
    const question = normalizeGeneratedQuestion(result.payload, { branch, difficulty, model: result.model, mode: result.mode });
    question.aiMeta = { ...(question.aiMeta || {}), sourceChecked: result.sourceChecked, scientificSourceCheckEnabled: result.scientificSourceCheckEnabled, sourceUrls: result.sourceUrls };
    assertRenderableQuestion(question);
    return sendJson(response, 200, { ok: true, provider: 'openai', fallback: false, repaired: false, sourceChecked: result.sourceChecked, sourceUrls: result.sourceUrls, question });
  } catch (error) {
    return sendJson(response, error?.statusCode || 502, {
      ok: false,
      provider: 'openai',
      fallback: false,
      error: error?.message || 'AI soru üretimi başarısız oldu.',
    });
  }
}
