import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const outputCache = new Map();
const DEFAULT_OUTPUT_CACHE_TTL_MS = 30 * 60 * 1000;

export function envFlag(name, defaultValue = false) {
  const raw = process.env[name];
  if (raw === undefined || raw === null || String(raw).trim() === '') return defaultValue;
  return /^(1|true|yes|on)$/i.test(String(raw).trim());
}

export function envNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function safeString(value = '') {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stableSortObject(value) {
  if (Array.isArray(value)) return value.map(stableSortObject);
  if (value && typeof value === 'object') {
    return Object.keys(value).sort().reduce((acc, key) => {
      const item = value[key];
      if (typeof item === 'function' || item === undefined) return acc;
      acc[key] = stableSortObject(item);
      return acc;
    }, {});
  }
  if (typeof value === 'string') return safeString(value);
  return value ?? null;
}

export function normalizeForFingerprint(value) {
  try {
    return JSON.stringify(stableSortObject(value));
  } catch {
    return safeString(value);
  }
}

function sha256(value = '') {
  return crypto.createHash('sha256').update(String(value || '')).digest('hex');
}

export function createSourceFingerprint(value) {
  return `src_${sha256(normalizeForFingerprint(value)).slice(0, 32)}`;
}

function normalizeForSourceRank(value = '') {
  return safeString(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
}

function splitSourceSentences(text = '') {
  return safeString(text)
    .replace(/(\d)\.(\d)/g, '$1<dot>$2')
    .split(/(?<=[.!?])\s+|\n+/u)
    .map((sentence) => sentence.replace(/<dot>/g, '.').trim())
    .filter((sentence) => sentence.length >= 35 && sentence.length <= 520);
}

const SOURCE_CONTEXT_PATTERNS = [
  /\b(?:hipotansiyon|preload|infarkt|nitrat|v4r|st\s+elevasyonu|troponin|reperf)\b/u,
  /\b(?:tani|tanisal|tedavi|yaklasim|yonetim|ilk basamak|profilaksi|kontrendikasyon|komplikasyon)\b/u,
  /\b(?:ayirici|klinik|olgu|semptom|bulgu|muayene|oyku|risk|maruziyet|travma|gebelik|yenidogan|pediatrik)\b/u,
  /\b(?:laboratuvar|trombosit|lokosit|hemoglobin|glukoz|sodyum|potasyum|kreatinin|ph|hco3|laktat|troponin|enzim|bilirubin|proteinuri|hematuri)\b/u,
  /\b(?:hipotansiyon|hipertansiyon|hipoksi|saturasyon|preload|afterload|infarkt|iskemi|st elevasyonu|v4r|nitrat|reperfizyon|reperfuzyon)\b/u,
  /\b(?:goruntuleme|bt|mrg|mr|usg|ultrason|grafi|ekg|eko|patoloji|biyopsi|kultur|pcr|gram)\b/u,
  /\b(?:mekanizma|reseptor|enzim|gen|mutasyon|protein|hormon|feedback|inhibe|aktive|substrat|urun)\b/u,
  /\b(?:sinav|tus|final|ipucu|tuzak|sik|klasik|patognomonik|tipik|beklenir)\b/u,
  /\b(?:mmhg|mg\/dl|mg\/l|u\/l|iu\/l|meq\/l|mmol\/l|ng\/ml|pg\/ml|%|<|>|≥|≤)\b/u,
];

const TASK_CONTEXT_BONUS = {
  materialquestions: /\b(?:ayirici|soru|secenek|celdirici|tani|tedavi|test|mekanizma|komplikasyon|bulgu|laboratuvar|klinik)\b/u,
  materialflashcards: /\b(?:tanim|mekanizma|enzim|reseptor|anahtar|ipucu|hatirla|klasik|sik)\b/u,
  materialanalysis: /\b(?:konu|alt konu|kavram|mekanizma|klinik|sinav|hedef|ozet)\b/u,
  lesson: /\b(?:mekanizma|klinik|sinav|tani|tedavi|ayirici|temel|kavram|baglanti)\b/u,
};

function sourceTaskKey(task = '') {
  return normalizeForSourceRank(task).replace(/[^a-z0-9]/g, '');
}

function scoreSourceSentence(sentence = '', task = '') {
  const normalized = normalizeForSourceRank(sentence);
  let score = 0;
  SOURCE_CONTEXT_PATTERNS.forEach((pattern) => { if (pattern.test(normalized)) score += 2; });
  const taskPattern = TASK_CONTEXT_BONUS[sourceTaskKey(task)];
  if (taskPattern?.test(normalized)) score += 3;
  if (/\d/.test(sentence) && /(?:mg|mmol|meq|u\/l|mmhg|hafta|gun|ay|yil|%|<|>)/i.test(sentence)) score += 2;
  if (sentence.length >= 70 && sentence.length <= 260) score += 1;
  if (/^(?:kaynak|sayfa|slayt|file|dosya)\b/i.test(normalized)) score -= 3;
  return score;
}

function buildTaskAwareSourceDigest(clean = '', maxChars = 12000, task = '') {
  const sentences = splitSourceSentences(clean);
  if (sentences.length < 8) return '';
  const scored = sentences
    .map((sentence, index) => ({ sentence, index, score: scoreSourceSentence(sentence, task) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);
  const selected = new Map();
  const targetChars = Math.max(1000, Math.floor(Number(maxChars || 12000) * 0.86));
  let used = 0;
  for (const item of scored) {
    if (selected.has(item.index)) continue;
    if (used + item.sentence.length > targetChars && selected.size >= 8) continue;
    selected.set(item.index, item.sentence);
    used += item.sentence.length + 1;
    if (used >= targetChars) break;
  }
  const topScore = scored[0]?.score || 0;
  if (selected.size < 6 && topScore < 2) return '';
  return Array.from(selected.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([, sentence]) => sentence)
    .join(' ')
    .slice(0, maxChars)
    .trim();
}

export function compactSourceText(text = '', maxChars = 12000, options = {}) {
  const clean = safeString(text);
  if (!clean || clean.length <= maxChars) return clean;
  const digest = buildTaskAwareSourceDigest(clean, maxChars, options.task || '');
  if (digest && digest.length >= Math.min(160, maxChars * 0.2)) return digest;
  const segment = Math.max(800, Math.floor(maxChars / 3));
  const head = clean.slice(0, segment);
  const middleStart = Math.max(0, Math.floor(clean.length / 2) - Math.floor(segment / 2));
  const middle = clean.slice(middleStart, middleStart + segment);
  const tail = clean.slice(Math.max(0, clean.length - segment));
  return [head, '[... kaynak metnin orta bölümü ...]', middle, '[... kaynak metnin son bölümü ...]', tail].join('\n\n').slice(0, maxChars + 250);
}

export function compactMaterialSources(files = [], maxTotalChars = 16000, options = {}) {
  const readableFiles = (Array.isArray(files) ? files : [])
    .map((file, index) => ({
      index,
      text: safeString(file?.cleanedExtractedText || file?.text || file?.content || ''),
    }))
    .filter((file) => file.text);
  if (!readableFiles.length) return '';
  const totalBudget = Number(maxTotalChars || 16000);
  const perFile = Math.min(totalBudget, Math.max(3000, Math.floor(totalBudget / readableFiles.length)));
  return readableFiles
    .map((file) => `Kaynak Bölüm ${file.index + 1}:\n${compactSourceText(file.text, perFile, { task: options.task || '' })}`)
    .join('\n\n---\n\n')
    .slice(0, totalBudget + readableFiles.length * 80)
    .trim();
}

function sanitizeCachePart(value = '') {
  return safeString(value).toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'default';
}

export function buildPromptCacheConfig(scope = 'klinikiq', task = 'default', promptVersion = 'v1') {
  if (!envFlag('OPENAI_PROMPT_CACHE_KEY', false)) return {};
  const config = {
    prompt_cache_key: `klinikiq:${sanitizeCachePart(scope)}:${sanitizeCachePart(task)}:${sanitizeCachePart(promptVersion)}`,
  };
  const retention = safeString(process.env.OPENAI_PROMPT_CACHE_RETENTION || '24h');
  if (retention) config.prompt_cache_retention = retention;
  return config;
}

export function buildOutputCacheKey({ scope = 'klinikiq', task = 'default', promptVersion = 'v1', model = '', sourceFingerprint = '', extra = {} } = {}) {
  const raw = normalizeForFingerprint({ scope, task, promptVersion, model, sourceFingerprint, extra });
  return `aiout_${sha256(raw)}`;
}

export function shouldUseOutputCache() {
  return envFlag('KLINIKIQ_AI_OUTPUT_CACHE', true);
}

export function getCachedOutput(cacheKey) {
  if (!shouldUseOutputCache() || !cacheKey) return null;
  const item = outputCache.get(cacheKey);
  if (!item) return null;
  if (item.expiresAt <= Date.now()) {
    outputCache.delete(cacheKey);
    return null;
  }
  return item.value;
}

export function setCachedOutput(cacheKey, value, ttlMs = envNumber('KLINIKIQ_AI_OUTPUT_CACHE_TTL_MS', DEFAULT_OUTPUT_CACHE_TTL_MS)) {
  if (!shouldUseOutputCache() || !cacheKey || value === undefined || value === null) return false;
  outputCache.set(cacheKey, { value, expiresAt: Date.now() + Number(ttlMs || DEFAULT_OUTPUT_CACHE_TTL_MS) });
  if (outputCache.size > 200) {
    const now = Date.now();
    for (const [key, item] of outputCache.entries()) {
      if (item.expiresAt <= now || outputCache.size > 160) outputCache.delete(key);
    }
  }
  return true;
}



// KlinikIQ aggressive cost/latency profile helpers.
// These helpers intentionally reduce live-generation cost without changing stored schema.
// They cap output size, default to faster/cheaper models when no explicit model is set,
// and keep high-detail generation available via env overrides.
export function getAICostProfile(scope = 'GENERAL') {
  const prefix = String(scope || 'GENERAL').toUpperCase();
  const raw = process.env[`${prefix}_AI_COST_PROFILE`] || process.env.KLINIKIQ_AI_COST_PROFILE || 'balanced';
  const value = safeString(raw).toLowerCase();
  if (['quality', 'high', 'full'].includes(value)) return 'quality';
  if (['balanced', 'standard'].includes(value)) return 'balanced';
  return 'ultra';
}

export function defaultModelForScope(scope = 'GENERAL') {
  const prefix = String(scope || 'GENERAL').toUpperCase();
  const profile = getAICostProfile(prefix);
  const fastModel = process.env[`${prefix}_OPENAI_FAST_MODEL`] || process.env.OPENAI_FAST_MODEL || 'gpt-4.1-mini';
  const qualityModel = process.env[`${prefix}_OPENAI_QUALITY_MODEL`] || process.env.OPENAI_QUALITY_MODEL || 'gpt-4.1-mini';
  return profile === 'quality' ? qualityModel : fastModel;
}


export function resolveModelForScope(scope = 'GENERAL') {
  const prefix = String(scope || 'GENERAL').toUpperCase();
  const profile = getAICostProfile(prefix);
  const fastModel = process.env[`${prefix}_OPENAI_FAST_MODEL`] || process.env.OPENAI_FAST_MODEL || defaultModelForScope(prefix);
  const exactModel = process.env[`${prefix}_OPENAI_MODEL`] || process.env.OPENAI_MODEL || process.env.DEFAULT_GENERATOR_MODEL || '';
  const forceFastDefault = profile !== 'quality';
  const forceFast = envFlag(`${prefix}_FORCE_FAST_MODEL`, envFlag('KLINIKIQ_FORCE_FAST_MODEL', forceFastDefault));
  if (forceFast && profile !== 'quality') return fastModel;
  return exactModel || defaultModelForScope(prefix);
}

export function defaultReasoningEffortForProfile(scope = 'GENERAL') {
  const profile = getAICostProfile(scope);
  if (profile === 'quality') return 'low';
  return 'low';
}

export function defaultVerbosityForProfile(scope = 'GENERAL') {
  const profile = getAICostProfile(scope);
  return profile === 'quality' ? 'medium' : 'low';
}

export function applyCostProfileToMaxTokens(scope = 'GENERAL', task = 'default', fallback = 2000) {
  const base = Math.max(256, Number(fallback || 2000));
  if (envFlag('KLINIKIQ_AI_DISABLE_COST_CAPS', false)) return base;
  const profile = getAICostProfile(scope);
  const taskName = safeString(task).toLowerCase();
  const explicit = Number(process.env[`KLINIKIQ_${safeString(scope).toUpperCase()}_${safeString(task).toUpperCase()}_MAX_OUTPUT_TOKENS`]);
  if (Number.isFinite(explicit) && explicit > 0) return explicit;

  const caps = {
    ultra: {
      tusspotquestion: 3600,
      materialanalysis: 950,
      materialflashcards: 2200,
      materialquestions: 3400,
      lesson: 2800,
      default: Math.ceil(base * 0.58),
    },
    balanced: {
      tusspotquestion: 4200,
      materialanalysis: 1300,
      materialflashcards: 2400,
      materialquestions: 3400,
      lesson: 3600,
      default: Math.ceil(base * 0.78),
    },
    quality: {
      default: base,
    },
  };
  const profileCaps = caps[profile] || caps.ultra;
  return Math.max(600, Math.min(base, profileCaps[taskName] || profileCaps.default || base));
}

export function resolveSourceCharLimit(envName = '', fallback = 12000, scope = 'GENERAL', task = 'default') {
  const explicit = Number(process.env[envName]);
  if (Number.isFinite(explicit) && explicit > 0) return explicit;
  if (envFlag('KLINIKIQ_AI_DISABLE_COST_CAPS', false)) return Number(fallback || 12000);
  const profile = getAICostProfile(scope);
  const taskName = safeString(task).toLowerCase();
  const base = Number(fallback || 12000);
  const caps = {
    ultra: {
      materialanalysis: 6000,
      materialflashcards: 6500,
      materialquestions: 7500,
      lesson: 9000,
      default: Math.ceil(base * 0.55),
    },
    balanced: {
      materialanalysis: 8500,
      materialflashcards: 9500,
      materialquestions: 11000,
      lesson: 12500,
      default: Math.ceil(base * 0.75),
    },
    quality: { default: base },
  };
  const selected = caps[profile] || caps.ultra;
  return Math.max(2500, Math.min(base, selected[taskName] || selected.default || base));
}

export function detailModeForProfile(scope = 'GENERAL') {
  const prefix = String(scope || 'GENERAL').toUpperCase();
  const raw = process.env[`${prefix}_AI_OUTPUT_DETAIL_MODE`] || process.env.KLINIKIQ_AI_OUTPUT_DETAIL_MODE || '';
  const normalized = safeString(raw).toLowerCase();
  if (['full', 'detailed', 'quality'].includes(normalized)) return 'full';
  if (['standard', 'balanced'].includes(normalized)) return 'standard';
  if (['minimal', 'concise', 'fast'].includes(normalized)) return 'concise';
  return getAICostProfile(scope) === 'ultra' ? 'concise' : 'standard';
}

function usageMetric(usage = {}, ...paths) {
  for (const path of paths) {
    const value = path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), usage);
    if (Number.isFinite(Number(value))) return Number(value);
  }
  return 0;
}

export function logAIUsage({
  task = 'unknown',
  model = '',
  usage = null,
  cached = false,
  apiStyle = '',
  promptVersion = '',
  sourceFingerprint = '',
  retryCount = 0,
  repairCall = false,
  cacheWrite = false,
  finalOutput = false,
  validator = null,
  quality = null,
  fallbackReason = '',
  durationMs = 0,
} = {}) {
  if (!envFlag('KLINIKIQ_AI_USAGE_LOGS', true)) return;
  const safeUsage = usage || {};
  const inputTokens = usageMetric(safeUsage, 'input_tokens', 'prompt_tokens');
  const outputTokens = usageMetric(safeUsage, 'output_tokens', 'completion_tokens');
  const cachedInputTokens = usageMetric(safeUsage, 'input_tokens_details.cached_tokens', 'prompt_tokens_details.cached_tokens');
  const reasoningTokens = usageMetric(safeUsage, 'output_tokens_details.reasoning_tokens', 'completion_tokens_details.reasoning_tokens');
  const totalTokens = usageMetric(safeUsage, 'total_tokens') || inputTokens + outputTokens;
  console.info('[KlinikIQ AI Usage]', JSON.stringify({
    task: safeString(task),
    model: safeString(model),
    apiStyle: safeString(apiStyle),
    inputTokens,
    outputTokens,
    cachedInputTokens,
    reasoningTokens,
    totalTokens,
    estimatedCostUsd: estimateOpenAICostUsd({ usage: safeUsage }),
    cacheHit: Boolean(cached),
    cacheWrite: Boolean(cacheWrite),
    promptVersion: safeString(promptVersion),
    sourceFingerprint: safeString(sourceFingerprint),
    retryCount: Number(retryCount || 0),
    repairCall: Boolean(repairCall),
    finalOutput: Boolean(finalOutput),
    validator,
    quality,
    fallbackReason: safeString(fallbackReason),
    durationMs: Number(durationMs || 0),
  }));
}


const inFlightJobs = new Map();
const durableCacheMemory = new Map();
const DEFAULT_DURABLE_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const DEFAULT_QUESTION_BANK_TTL_MS = 14 * 24 * 60 * 60 * 1000;

function cacheRootDir() {
  return process.env.KLINIKIQ_AI_CACHE_DIR || path.join(os.tmpdir(), 'klinikiq-ai-cache');
}

function durableCacheFilePath(key = '') {
  const safeKey = sha256(key).slice(0, 48);
  return path.join(cacheRootDir(), `${safeKey}.json`);
}

function nowMs() {
  return Date.now();
}

function safeJsonStringify(value) {
  try { return JSON.stringify(value); } catch { return JSON.stringify(null); }
}

function getKvRestConfig() {
  const url = safeString(process.env.KLINIKIQ_KV_REST_API_URL || process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '');
  const token = safeString(process.env.KLINIKIQ_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '');
  if (!url || !token || typeof fetch !== 'function') return null;
  return { url: url.replace(/\/$/u, ''), token };
}

async function kvCommand(command, ...args) {
  const config = getKvRestConfig();
  if (!config) return null;
  try {
    const response = await fetch(config.url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([command, ...args]),
    });
    if (!response.ok) return null;
    const data = await response.json().catch(() => null);
    if (data && Object.prototype.hasOwnProperty.call(data, 'result')) return data.result;
    return data;
  } catch {
    return null;
  }
}

export function buildDurableCacheKey({ scope = 'klinikiq', task = 'default', promptVersion = 'v1', model = '', sourceFingerprint = '', extra = {} } = {}) {
  return buildOutputCacheKey({ scope, task, promptVersion, model, sourceFingerprint, extra });
}

export async function getDurableCachedOutput(cacheKey) {
  if (!shouldUseOutputCache() || !cacheKey) return null;

  const memoryItem = durableCacheMemory.get(cacheKey) || outputCache.get(cacheKey);
  if (memoryItem) {
    const expiresAt = Number(memoryItem.expiresAt || 0);
    if (!expiresAt || expiresAt > nowMs()) return memoryItem.value;
    durableCacheMemory.delete(cacheKey);
    outputCache.delete(cacheKey);
  }

  const kvResult = await kvCommand('GET', cacheKey);
  if (typeof kvResult === 'string' && kvResult) {
    try {
      const parsed = JSON.parse(kvResult);
      const expiresAt = Number(parsed?.expiresAt || 0);
      if (!expiresAt || expiresAt > nowMs()) {
        durableCacheMemory.set(cacheKey, { value: parsed.value, expiresAt });
        return parsed.value;
      }
    } catch { /* ignore invalid KV cache */ }
  }

  try {
    const raw = await fs.readFile(durableCacheFilePath(cacheKey), 'utf8');
    const parsed = JSON.parse(raw);
    const expiresAt = Number(parsed?.expiresAt || 0);
    if (expiresAt && expiresAt <= nowMs()) {
      await fs.unlink(durableCacheFilePath(cacheKey)).catch(() => {});
      return null;
    }
    durableCacheMemory.set(cacheKey, { value: parsed.value, expiresAt });
    return parsed.value;
  } catch {
    return null;
  }
}

export async function setDurableCachedOutput(cacheKey, value, ttlMs = envNumber('KLINIKIQ_AI_OUTPUT_CACHE_TTL_MS', DEFAULT_DURABLE_CACHE_TTL_MS)) {
  if (!shouldUseOutputCache() || !cacheKey || value === undefined || value === null) return false;
  const expiresAt = nowMs() + Number(ttlMs || DEFAULT_DURABLE_CACHE_TTL_MS);
  const payload = { value, expiresAt, createdAt: nowMs() };
  durableCacheMemory.set(cacheKey, { value, expiresAt });
  setCachedOutput(cacheKey, value, ttlMs);

  const ttlSeconds = Math.max(1, Math.floor(Number(ttlMs || DEFAULT_DURABLE_CACHE_TTL_MS) / 1000));
  void kvCommand('SET', cacheKey, safeJsonStringify(payload), 'EX', ttlSeconds);

  try {
    await fs.mkdir(cacheRootDir(), { recursive: true });
    await fs.writeFile(durableCacheFilePath(cacheKey), JSON.stringify(payload), 'utf8');
  } catch {
    // Filesystem cache is best-effort on serverless platforms.
  }
  return true;
}

export async function withInFlightDedupe(jobKey, worker) {
  if (!jobKey || typeof worker !== 'function') return worker();
  if (inFlightJobs.has(jobKey)) return inFlightJobs.get(jobKey);
  const promise = Promise.resolve().then(worker).finally(() => inFlightJobs.delete(jobKey));
  inFlightJobs.set(jobKey, promise);
  return promise;
}

function compactQuestionForBank(question = {}) {
  if (!question || typeof question !== 'object') return null;
  return {
    ...question,
    cachedFromQuestionBank: true,
    aiMeta: {
      ...(question.aiMeta || {}),
      questionBank: true,
    },
  };
}

export function buildQuestionBankKey({ scope = 'TUS', branch = '', difficulty = '', target = '', promptVersion = 'v1', model = '' } = {}) {
  const targetText = safeString(target || 'general').toLowerCase().slice(0, 120) || 'general';
  const raw = normalizeForFingerprint({ scope, branch: safeString(branch), difficulty: safeString(difficulty), target: targetText, promptVersion, model });
  return `qbank_${sha256(raw).slice(0, 48)}`;
}

export async function getQuestionBankItems(bankKey, { maxItems = 20 } = {}) {
  const cached = await getDurableCachedOutput(bankKey);
  const items = Array.isArray(cached?.items) ? cached.items : [];
  return items.slice(0, Math.max(1, Number(maxItems || 20))).map(compactQuestionForBank).filter(Boolean);
}

export async function addQuestionToBank(bankKey, question, { maxItems = 60, ttlMs = envNumber('KLINIKIQ_AI_QUESTION_BANK_TTL_MS', DEFAULT_QUESTION_BANK_TTL_MS) } = {}) {
  if (!bankKey || !question || typeof question !== 'object') return false;
  const current = await getDurableCachedOutput(bankKey);
  const items = Array.isArray(current?.items) ? current.items : [];
  const signature = safeString(question.semanticFingerprint || question.id || createSourceFingerprint(question));
  const nextItem = { ...question, bankedAt: nowMs(), semanticFingerprint: question.semanticFingerprint || signature };
  const filtered = items.filter((item) => safeString(item?.semanticFingerprint || item?.id) !== signature);
  const next = [nextItem, ...filtered].slice(0, Math.max(1, Number(maxItems || 60)));
  return setDurableCachedOutput(bankKey, { items: next, updatedAt: nowMs() }, ttlMs);
}

export function estimateOpenAICostUsd({ usage = {}, inputPerMillion = Number(process.env.KLINIKIQ_AI_INPUT_USD_PER_MILLION || 0), outputPerMillion = Number(process.env.KLINIKIQ_AI_OUTPUT_USD_PER_MILLION || 0) } = {}) {
  const inputTokens = usageMetric(usage || {}, 'input_tokens', 'prompt_tokens');
  const outputTokens = usageMetric(usage || {}, 'output_tokens', 'completion_tokens');
  if (!inputPerMillion && !outputPerMillion) return 0;
  return Number(((inputTokens / 1_000_000) * inputPerMillion + (outputTokens / 1_000_000) * outputPerMillion).toFixed(6));
}

function hasPromptCacheParams(body = {}) {
  return Object.prototype.hasOwnProperty.call(body, 'prompt_cache_key') || Object.prototype.hasOwnProperty.call(body, 'prompt_cache_retention');
}

function withoutPromptCacheParams(body = {}) {
  const next = { ...body };
  delete next.prompt_cache_key;
  delete next.prompt_cache_retention;
  return next;
}

function isUnsupportedPromptCacheError(status, text = '') {
  const value = safeString(text).toLowerCase();
  return Number(status) >= 400 && Number(status) < 500 && /(prompt_cache_key|prompt_cache_retention|unknown parameter|unrecognized|unsupported parameter|invalid request|unexpected keyword)/i.test(value);
}

export async function callOpenAIWithPromptCacheFallback({ openai, body, endpointType = 'responses', task = 'unknown' } = {}) {
  if (typeof openai !== 'function') throw new Error('OpenAI caller function is required.');
  const attempt = async (requestBody, cacheFallback = false) => {
    const response = await openai(requestBody);
    const text = await response.text();
    return { ok: response.ok, status: response.status, text, cacheFallback, endpointType, task };
  };

  const first = await attempt(body, false);
  if (first.ok || !hasPromptCacheParams(body) || !isUnsupportedPromptCacheError(first.status, first.text)) return first;

  console.warn('[KlinikIQ AI Cache] prompt cache params unsupported by current endpoint/SDK; retrying without cache params.', JSON.stringify({ task: safeString(task), endpointType: safeString(endpointType), status: first.status }));
  return attempt(withoutPromptCacheParams(body), true);
}
