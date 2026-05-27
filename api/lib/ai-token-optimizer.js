// KlinikIQ AI token optimization helpers.
// This layer keeps medical/educational quality prompts intact while reducing
// repeated payload, repeated OpenAI work, and retry cost.

const DEFAULT_CACHE_TTL_MS = 30 * 60 * 1000;
const MAX_CACHE_ITEMS = 40;
const HASH_PREFIX = 'kiq';

function normalizeForHash(value = '') {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase('tr');
}

export function stableHash(value = '') {
  const text = normalizeForHash(value);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `${HASH_PREFIX}_${(hash >>> 0).toString(36)}`;
}

function envFlag(name, fallback = true) {
  const raw = process.env[name];
  if (raw === undefined || raw === null || raw === '') return fallback;
  return !/^(0|false|no|off)$/i.test(String(raw).trim());
}

function envNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function globalCache() {
  if (!globalThis.__KLINIKIQ_AI_TOKEN_CACHE__) globalThis.__KLINIKIQ_AI_TOKEN_CACHE__ = new Map();
  return globalThis.__KLINIKIQ_AI_TOKEN_CACHE__;
}

function trimCache(cache) {
  const now = Date.now();
  for (const [key, entry] of cache.entries()) {
    if (!entry || entry.expiresAt <= now) cache.delete(key);
  }
  if (cache.size <= MAX_CACHE_ITEMS) return;
  const sorted = [...cache.entries()].sort((a, b) => (a[1]?.createdAt || 0) - (b[1]?.createdAt || 0));
  sorted.slice(0, Math.max(0, cache.size - MAX_CACHE_ITEMS)).forEach(([key]) => cache.delete(key));
}

export function getCachedGeneration(cacheKey = '') {
  if (!envFlag('KLINIKIQ_AI_OUTPUT_CACHE', true)) return null;
  const key = String(cacheKey || '').trim();
  if (!key) return null;
  const cache = globalCache();
  trimCache(cache);
  const entry = cache.get(key);
  if (!entry || entry.expiresAt <= Date.now()) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

export function setCachedGeneration(cacheKey = '', value, ttlMs = envNumber('KLINIKIQ_AI_OUTPUT_CACHE_TTL_MS', DEFAULT_CACHE_TTL_MS)) {
  if (!envFlag('KLINIKIQ_AI_OUTPUT_CACHE', true)) return;
  const key = String(cacheKey || '').trim();
  if (!key || value === undefined || value === null) return;
  const cache = globalCache();
  trimCache(cache);
  cache.set(key, { value, createdAt: Date.now(), expiresAt: Date.now() + ttlMs });
}

export function buildGenerationCacheKey({ scope = 'KOMITE', task = 'unknown', promptVersion = 'v1', model = '', sourceFingerprint = '', extra = '' } = {}) {
  const fingerprint = String(sourceFingerprint || '').trim() || stableHash(extra || `${scope}:${task}`);
  return [scope, task, promptVersion, model, fingerprint, stableHash(extra || '')].map((part) => String(part || '').replace(/\s+/g, '-')).join(':');
}

export function getSourceFingerprintFromBody(body = {}) {
  return String(
    body.sourceFingerprint ||
    body.studyContext?.sourceFingerprint ||
    body.context?.sourceFingerprint ||
    body.sourceManifest?.sourceFingerprint ||
    body.studyContext?.sourceManifest?.sourceFingerprint ||
    ''
  ).trim();
}

export function compactTextWindow(text = '', maxChars = 12000) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean || clean.length <= maxChars) return clean;
  const part = Math.max(800, Math.floor(maxChars / 3));
  const start = clean.slice(0, part);
  const middleStart = Math.max(0, Math.floor(clean.length / 2) - Math.floor(part / 2));
  const middle = clean.slice(middleStart, middleStart + part);
  const end = clean.slice(Math.max(0, clean.length - part));
  return [start, middle, end].join('\n\n[... kaynak metnin orta/son bölümü korunarak kompaktlandı ...]\n\n');
}

export function sourceTextFromMaterialPacket(packet = {}, maxTotalChars = 14000) {
  const files = Array.isArray(packet.files)
    ? packet.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim())
    : [];
  if (!files.length) return '';

  const safeMax = Math.max(4000, Number(maxTotalChars) || 14000);
  const separator = '\n\n';
  const perFile = Math.max(900, Math.floor((safeMax - separator.length * Math.max(0, files.length - 1)) / files.length));
  const chunks = [];
  let used = 0;

  for (const file of files) {
    const text = String(file.cleanedExtractedText || file.text || '').trim();
    const remaining = safeMax - used - (chunks.length ? separator.length : 0);
    if (remaining <= 0) break;
    const windowSize = Math.min(perFile, remaining);
    const compact = compactTextWindow(text, windowSize);
    if (!compact) continue;
    chunks.push(compact);
    used += compact.length + (chunks.length > 1 ? separator.length : 0);
  }

  return chunks.join(separator).slice(0, safeMax).trim();
}

export function buildPromptCacheFields({ scope = 'KOMITE', task = 'default', promptVersion = 'v1', sourceFingerprint = '' } = {}) {
  if (!envFlag('OPENAI_PROMPT_CACHE_KEY', true)) return {};
  const retention = process.env.OPENAI_PROMPT_CACHE_RETENTION || process.env.KLINIKIQ_PROMPT_CACHE_RETENTION || '24h';
  const key = [
    'klinikiq',
    String(scope || 'ai').toLowerCase(),
    String(task || 'task').toLowerCase(),
    String(promptVersion || 'v1').toLowerCase(),
    sourceFingerprint ? stableHash(sourceFingerprint) : 'global',
  ].join(':');
  return {
    prompt_cache_key: key.slice(0, 200),
    prompt_cache_retention: retention,
  };
}

export function stripPromptCacheFields(body = {}) {
  if (!body || typeof body !== 'object') return body;
  const clone = { ...body };
  delete clone.prompt_cache_key;
  delete clone.prompt_cache_retention;
  return clone;
}

export function isPromptCacheParamError(errorText = '') {
  return /prompt_cache_key|prompt_cache_retention|unknown parameter|unrecognized.*prompt_cache/i.test(String(errorText || ''));
}

export function extractTokenUsage(usage = {}) {
  const input = usage.input_tokens ?? usage.prompt_tokens ?? 0;
  const output = usage.output_tokens ?? usage.completion_tokens ?? 0;
  const cached = usage.input_tokens_details?.cached_tokens ?? usage.prompt_tokens_details?.cached_tokens ?? 0;
  const reasoning = usage.output_tokens_details?.reasoning_tokens ?? usage.completion_tokens_details?.reasoning_tokens ?? 0;
  return {
    inputTokens: Number(input) || 0,
    outputTokens: Number(output) || 0,
    cachedInputTokens: Number(cached) || 0,
    reasoningTokens: Number(reasoning) || 0,
  };
}

export function logAIUsage({ scope = 'AI', task = 'unknown', model = '', apiStyle = '', usage = null, sourceFingerprint = '', cacheHit = false } = {}) {
  if (!envFlag('KLINIKIQ_AI_USAGE_LOGS', true)) return;
  const tokenUsage = extractTokenUsage(usage || {});
  // No user text, no prompt body, no API key is logged.
  console.info('[KlinikIQ AI usage]', JSON.stringify({
    scope,
    task,
    model,
    apiStyle,
    cacheHit: Boolean(cacheHit),
    sourceFingerprint: sourceFingerprint ? stableHash(sourceFingerprint) : '',
    ...tokenUsage,
  }));
}
