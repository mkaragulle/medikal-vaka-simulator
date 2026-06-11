import crypto from 'node:crypto';

const outputCache = new Map();
const DEFAULT_OUTPUT_CACHE_TTL_MS = 30 * 60 * 1000;

function envFlag(name, defaultValue = false) {
  const raw = process.env[name];
  if (raw === undefined || raw === null || String(raw).trim() === '') return defaultValue;
  return /^(1|true|yes|on)$/i.test(String(raw).trim());
}

function envNumber(name, fallback) {
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

export function compactSourceText(text = '', maxChars = 12000) {
  const clean = safeString(text);
  if (!clean || clean.length <= maxChars) return clean;
  const segment = Math.max(800, Math.floor(maxChars / 3));
  const head = clean.slice(0, segment);
  const middleStart = Math.max(0, Math.floor(clean.length / 2) - Math.floor(segment / 2));
  const middle = clean.slice(middleStart, middleStart + segment);
  const tail = clean.slice(Math.max(0, clean.length - segment));
  return [head, '[... kaynak metnin orta bölümü ...]', middle, '[... kaynak metnin son bölümü ...]', tail].join('\n\n').slice(0, maxChars + 250);
}

export function compactMaterialSources(files = [], maxTotalChars = 16000) {
  const readableFiles = (Array.isArray(files) ? files : [])
    .map((file, index) => ({
      index,
      text: safeString(file?.cleanedExtractedText || file?.text || file?.content || ''),
    }))
    .filter((file) => file.text);
  if (!readableFiles.length) return '';
  const perFile = Math.max(3000, Math.floor(Number(maxTotalChars || 16000) / readableFiles.length));
  return readableFiles
    .map((file) => `Kaynak Bölüm ${file.index + 1}:\n${compactSourceText(file.text, perFile)}`)
    .join('\n\n---\n\n')
    .slice(0, Number(maxTotalChars || 16000) + readableFiles.length * 80)
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

function usageMetric(usage = {}, ...paths) {
  for (const path of paths) {
    const value = path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), usage);
    if (Number.isFinite(Number(value))) return Number(value);
  }
  return 0;
}

export function logAIUsage({ task = 'unknown', model = '', usage = null, cached = false, apiStyle = '' } = {}) {
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
    cacheHit: Boolean(cached),
  }));
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
