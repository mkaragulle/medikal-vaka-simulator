import { applyCostProfileToMaxTokens, buildPromptCacheConfig, callOpenAIWithPromptCacheFallback, defaultModelForScope, defaultReasoningEffortForProfile, defaultVerbosityForProfile, getAICostProfile, logAIUsage, resolveModelForScope } from './ai-token-optimizer.js';
import { runQuestionQualityGate } from './question-quality-gate.js';
export function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}


export function getPacketFiles(body = {}) {
  return Array.isArray(body.materialPacket?.files) ? body.materialPacket.files : [];
}

export function verifyCurrentSourceManifest(body = {}) {
  const manifest = body.sourceManifest || body.studyContext?.sourceManifest || body.context?.sourceManifest || null;
  const fingerprint = body.sourceFingerprint || body.studyContext?.sourceFingerprint || body.context?.sourceFingerprint || '';
  const files = getPacketFiles(body);
  const errors = [];
  if (!manifest || typeof manifest !== 'object') errors.push('sourceManifest missing');
  if (manifest && fingerprint && manifest.sourceFingerprint !== fingerprint) errors.push('sourceManifest fingerprint mismatch');
  if (manifest && Number(manifest.fileCount || 0) !== files.length) errors.push('sourceManifest file count mismatch');
  const hasReadablePacketText = files.some((file) => String(file.cleanedExtractedText || file.text || '').trim());
  if (!hasReadablePacketText) errors.push('No active source content in current material packet');
  return { ok: errors.length === 0, errors, manifest, fingerprint };
}

export function parseJsonBody(request, maxBytes = 5_000_000) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > maxBytes) {
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

function stripCodeFence(value = '') {
  const text = String(value || '').trim();
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  return fenced ? fenced.trim() : text;
}

function extractJsonCandidate(value = '') {
  const text = stripCodeFence(value);
  const firstObject = text.indexOf('{');
  const lastObject = text.lastIndexOf('}');
  if (firstObject >= 0 && lastObject > firstObject) return text.slice(firstObject, lastObject + 1).trim();
  const firstArray = text.indexOf('[');
  const lastArray = text.lastIndexOf(']');
  if (firstArray >= 0 && lastArray > firstArray) return text.slice(firstArray, lastArray + 1).trim();
  return text;
}

function insertMissingCommasOutsideStrings(value = '') {
  const source = String(value || '');
  let out = '';
  let inString = false;
  let escaped = false;
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i];
    out += ch;
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === '}' || ch === ']') {
      let j = i + 1;
      while (j < source.length && /\s/.test(source[j])) j += 1;
      // Most malformed AI JSON failures here are arrays like: [{...}\n{...}]
      // Insert the missing comma only when the next meaningful token starts a new object/array/string item.
      if (j < source.length && (source[j] === '{' || source[j] === '[' || source[j] === '"')) {
        let k = i - 1;
        while (k >= 0 && /\s/.test(source[k])) k -= 1;
        if (source[j] !== ',' && source[j] !== '}' && source[j] !== ']' && source[k] !== ',') out += ',';
      }
    }
  }
  return out;
}

function repairJsonCandidate(value = '') {
  return insertMissingCommasOutsideStrings(value)
    .replace(/[\u0000-\u001F]+/g, ' ')
    .replace(/,\s*([}\]])/g, '$1')
    .trim();
}

export function parseModelJson(text = '') {
  const candidate = extractJsonCandidate(text);
  if (!candidate) {
    const error = new Error('AI boş yanıt döndürdü.');
    error.code = 'ai_empty_json';
    error.status = 502;
    throw error;
  }

  const attempts = [candidate, repairJsonCandidate(candidate)];
  let lastError = null;
  for (const attempt of attempts) {
    try { return JSON.parse(attempt); } catch (error) { lastError = error; }
  }

  const error = new Error('AI yanıtı geçerli JSON olarak tamamlanamadı. Lütfen tekrar deneyin; kaynak dosya korunuyor ve eski oturum içeriği kullanılmıyor.');
  error.code = 'ai_invalid_json';
  error.status = 502;
  error.details = lastError?.message || '';
  throw error;
}

function extractChatText(data) {
  const choice = data?.choices?.[0] || {};
  const content = choice?.message?.content ?? choice?.text ?? '';
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.map((part) => {
      if (typeof part === 'string') return part;
      if (part?.type === 'text' && typeof part?.text === 'string') return part.text;
      if (part?.type === 'output_text' && typeof part?.text === 'string') return part.text;
      if (typeof part?.content === 'string') return part.content;
      return '';
    }).filter(Boolean).join('\n');
  }
  return '';
}

function extractTextValue(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value?.text === 'string') return value.text;
  if (typeof value?.value === 'string') return value.value;
  if (typeof value?.content === 'string') return value.content;
  if (Array.isArray(value)) return value.map(extractTextValue).filter(Boolean).join('\n');
  if (typeof value === 'object') {
    const nested = [value.output_text, value.text, value.value, value.content, value.message];
    return nested.map(extractTextValue).filter(Boolean).join('\n');
  }
  return '';
}

function extractResponsesText(data) {
  const direct = extractTextValue(data?.output_text);
  if (direct) return direct;
  const parts = [];
  for (const item of data?.output || []) {
    const itemText = extractTextValue(item?.content);
    if (itemText) parts.push(itemText);
    const messageText = extractTextValue(item?.message);
    if (messageText) parts.push(messageText);
  }
  return parts.filter(Boolean).join('\n');
}

function firstEnv(...keys) {
  for (const key of keys) {
    const value = process.env[key];
    if (value !== undefined && String(value).trim() !== '') return String(value).trim();
  }
  return '';
}

function firstNumber(defaultValue, ...keys) {
  for (const key of keys) {
    const raw = process.env[key];
    if (raw !== undefined && String(raw).trim() !== '') {
      const value = Number(raw);
      if (Number.isFinite(value) && value > 0) return value;
    }
  }
  return defaultValue;
}

function supportsReasoningEffort(model = '') {
  const normalized = String(model || '').trim().toLowerCase().replace(/^openai\//u, '');
  return normalized.startsWith('gpt-5') || /^o\d/u.test(normalized) || normalized.startsWith('o-');
}

function normalizeReasoningEffort(value = '', defaultValue = 'low') {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'minimal') return 'low';
  if (/^(none|low|medium|high|xhigh)$/.test(normalized)) return normalized;
  return defaultValue;
}

function buildChatCompletionBody({ model, systemPrompt, userPrompt, jsonSchema, effectiveMaxTokens, reasoningEffort }) {
  const body = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: jsonSchema ? { type: 'json_schema', json_schema: jsonSchema } : { type: 'json_object' },
    max_completion_tokens: effectiveMaxTokens,
  };
  if (supportsReasoningEffort(model) && reasoningEffort) {
    body.reasoning_effort = normalizeReasoningEffort(reasoningEffort);
  }
  return body;
}

function toResponsesTextFormat(jsonSchema = null) {
  if (!jsonSchema) return { type: 'json_object' };
  return {
    type: 'json_schema',
    name: jsonSchema.name || 'komite_json_response',
    strict: jsonSchema.strict !== false,
    schema: jsonSchema.schema || jsonSchema,
  };
}

function buildResponsesBody({ model, systemPrompt, userPrompt, jsonSchema, effectiveMaxTokens, reasoningEffort, verbosity }) {
  const body = {
    model,
    instructions: systemPrompt,
    input: userPrompt,
    max_output_tokens: effectiveMaxTokens,
    text: {
      format: toResponsesTextFormat(jsonSchema),
      verbosity: /^(low|medium|high)$/i.test(verbosity || '') ? verbosity.toLowerCase() : 'medium',
    },
    truncation: 'auto',
  };
  if (supportsReasoningEffort(model) && reasoningEffort) {
    body.reasoning = { effort: normalizeReasoningEffort(reasoningEffort) };
  }
  return body;
}


function buildChatTextBody({ model, systemPrompt, userPrompt, effectiveMaxTokens, reasoningEffort }) {
  const body = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_completion_tokens: effectiveMaxTokens,
  };
  if (supportsReasoningEffort(model) && reasoningEffort) {
    body.reasoning_effort = normalizeReasoningEffort(reasoningEffort);
  }
  return body;
}

function buildResponsesTextBody({ model, systemPrompt, userPrompt, effectiveMaxTokens, reasoningEffort, verbosity }) {
  const body = {
    model,
    instructions: systemPrompt,
    input: userPrompt,
    max_output_tokens: effectiveMaxTokens,
    text: {
      verbosity: /^(low|medium|high)$/i.test(verbosity || '') ? verbosity.toLowerCase() : 'medium',
    },
    truncation: 'auto',
  };
  if (supportsReasoningEffort(model) && reasoningEffort) {
    body.reasoning = { effort: normalizeReasoningEffort(reasoningEffort) };
  }
  return body;
}

function wantsResponsesApi(model = '', explicitStyle = '') {
  const style = String(explicitStyle || '').toLowerCase();
  if (style === 'responses' || style === 'response') return true;
  if (style === 'chat' || style === 'chat_completions') return false;
  return supportsReasoningEffort(model);
}


function applyCostProfilePromptInstruction(scope = 'KOMITE', task = 'default', userPrompt = '') {
  const profile = getAICostProfile(scope);
  if (profile === 'quality') return userPrompt;
  const isLesson = String(task || '').toLowerCase() === 'lesson';
  const isQuestions = String(task || '').toLowerCase() === 'materialquestions';
  const isFlashcards = String(task || '').toLowerCase() === 'materialflashcards';
  const instruction = isLesson
    ? 'COST/LATENCY MODE: Produce a compact but complete lesson. Prioritize high-yield mechanisms, causal flow, exam traps and clinical relevance. Avoid filler, repeated explanations and long introductions. Use concise paragraphs.'
    : isQuestions
      ? 'COST/LATENCY MODE: Produce complete valid JSON, but keep stems, explanations and optionFeedback concise. Do not remove optionFeedback; make each feedback one strong option-specific teaching sentence. Avoid filler and repeated wording.'
      : isFlashcards
        ? 'COST/LATENCY MODE: Produce complete valid JSON, but keep each flashcard concise, active recall-focused and non-repetitive. Avoid long explanations unless essential.'
        : 'COST/LATENCY MODE: Return complete valid JSON with concise, high-yield wording. Avoid filler and repetition.';
  return `${instruction}\n\n${userPrompt}`;
}

function describeIncompleteResponse(data = {}) {
  const reason = data?.incomplete_details?.reason || data?.status || '';
  if (reason === 'max_output_tokens') {
    return 'AI yanıtı çıktı token limitine takıldı. KOMITE_LESSON_MAX_OUTPUT_TOKENS değerini artırın veya KOMITE_MAX_SOURCE_CHARS değerini düşürün.';
  }
  if (reason === 'content_filter') return 'AI yanıtı güvenlik filtresi nedeniyle tamamlanamadı.';
  return 'AI geçerli metin üretmeden yanıtı tamamladı.';
}

function parseOpenAIJsonOrThrow(text = '', data = {}) {
  if (String(text || '').trim()) return parseModelJson(text);
  const error = new Error(describeIncompleteResponse(data));
  error.code = 'ai_empty_output';
  error.status = 502;
  error.details = {
    status: data?.status || '',
    incompleteReason: data?.incomplete_details?.reason || '',
    outputTypes: Array.isArray(data?.output) ? data.output.map((item) => item?.type).filter(Boolean) : [],
    usage: data?.usage || null,
  };
  throw error;
}

export async function callOpenAIJson({ systemPrompt, userPrompt, maxTokens = 2500, jsonSchema = null, scope = 'KOMITE', task = 'komiteJson', promptVersion = 'v1' } = {}) {
  const envPrefix = String(scope || 'KOMITE').toUpperCase();
  const apiKey = firstEnv(`${envPrefix}_OPENAI_API_KEY`, 'OPENAI_API_KEY');
  if (!apiKey) {
    const error = new Error(`${envPrefix}_OPENAI_API_KEY or OPENAI_API_KEY is not configured`);
    error.code = 'missing_api_key';
    throw error;
  }

  const provider = firstEnv(`${envPrefix}_AI_PROVIDER`, 'AI_PROVIDER') || 'openai';
  if (provider !== 'openai') {
    const error = new Error(`Unsupported AI provider for ${envPrefix}: ${provider}`);
    error.code = 'unsupported_provider';
    throw error;
  }

  const model = resolveModelForScope(envPrefix);
  const baseUrl = (firstEnv(`${envPrefix}_OPENAI_BASE_URL`, 'OPENAI_BASE_URL') || 'https://api.openai.com/v1').replace(/\/$/, '');
  const timeoutMs = firstNumber(240_000, `${envPrefix}_AI_TIMEOUT_MS`, `${envPrefix}_OPENAI_TIMEOUT_MS`, 'AI_TIMEOUT_MS');
  const effectiveMaxTokens = firstNumber(applyCostProfileToMaxTokens(envPrefix, task, maxTokens), `${envPrefix}_OPENAI_MAX_OUTPUT_TOKENS`);
  const apiStyle = firstEnv(`${envPrefix}_OPENAI_API_STYLE`, 'OPENAI_API_STYLE');
  const useResponses = wantsResponsesApi(model, apiStyle);
  const rawReasoningEffort = firstEnv(`${envPrefix}_OPENAI_REASONING_EFFORT`, `${envPrefix}_REASONING_EFFORT`, 'OPENAI_REASONING_EFFORT') || (useResponses ? defaultReasoningEffortForProfile(envPrefix) : '');
  const reasoningEffort = rawReasoningEffort ? normalizeReasoningEffort(rawReasoningEffort) : '';
  const verbosity = firstEnv(`${envPrefix}_OPENAI_VERBOSITY`, `${envPrefix}_AI_VERBOSITY`, 'OPENAI_VERBOSITY') || defaultVerbosityForProfile(envPrefix);
  const effectiveUserPrompt = applyCostProfilePromptInstruction(envPrefix, task, userPrompt);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = useResponses ? `${baseUrl}/responses` : `${baseUrl}/chat/completions`;
    const promptCacheConfig = buildPromptCacheConfig(scope, task, promptVersion);
    const requestBody = useResponses
      ? { ...buildResponsesBody({ model, systemPrompt, userPrompt: effectiveUserPrompt, jsonSchema, effectiveMaxTokens, reasoningEffort, verbosity }), ...promptCacheConfig }
      : { ...buildChatCompletionBody({ model, systemPrompt, userPrompt: effectiveUserPrompt, jsonSchema, effectiveMaxTokens, reasoningEffort }), ...promptCacheConfig };
    const result = await callOpenAIWithPromptCacheFallback({
      body: requestBody,
      endpointType: useResponses ? 'responses' : 'chat_completions',
      task,
      openai: (bodyToSend) => fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        signal: controller.signal,
        body: JSON.stringify(bodyToSend),
      }),
    });
    if (!result.ok) {
      const error = new Error(`OpenAI ${result.status}: ${String(result.text || '').slice(0, 500)}`);
      error.status = result.status;
      throw error;
    }
    const data = JSON.parse(result.text || '{}');
    const text = useResponses ? extractResponsesText(data) : (extractChatText(data) || extractResponsesText(data));
    const apiStyleName = useResponses ? 'responses' : 'chat_completions';
    logAIUsage({ task, model: data.model || model, usage: data.usage || null, cached: false, apiStyle: apiStyleName });
    return { json: parseOpenAIJsonOrThrow(text, data), model: data.model || model, apiStyle: apiStyleName, usage: data.usage || null, promptCacheFallback: result.cacheFallback };
  } catch (error) {
    if (error?.name === 'AbortError' || /aborted/i.test(String(error?.message || ''))) {
      const timeoutError = new Error('AI yanıtı belirtilen süre içinde tamamlanamadı. Dosya metni korunuyor; daha hızlı bir KOMITE modeli seçin, KOMITE zaman aşımı değerini artırın veya çok büyük dosyada kaynak uzunluğu limitini düşürün.');
      timeoutError.code = 'ai_timeout';
      timeoutError.status = 504;
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}


export async function callOpenAIText({ systemPrompt, userPrompt, maxTokens = 3000, scope = 'KOMITE', task = 'komiteText', promptVersion = 'v1' } = {}) {
  const envPrefix = String(scope || 'KOMITE').toUpperCase();
  const apiKey = firstEnv(`${envPrefix}_OPENAI_API_KEY`, 'OPENAI_API_KEY');
  if (!apiKey) {
    const error = new Error(`${envPrefix}_OPENAI_API_KEY or OPENAI_API_KEY is not configured`);
    error.code = 'missing_api_key';
    throw error;
  }

  const provider = firstEnv(`${envPrefix}_AI_PROVIDER`, 'AI_PROVIDER') || 'openai';
  if (provider !== 'openai') {
    const error = new Error(`Unsupported AI provider for ${envPrefix}: ${provider}`);
    error.code = 'unsupported_provider';
    throw error;
  }

  const model = resolveModelForScope(envPrefix);
  const baseUrl = (firstEnv(`${envPrefix}_OPENAI_BASE_URL`, 'OPENAI_BASE_URL') || 'https://api.openai.com/v1').replace(/\/$/, '');
  const timeoutMs = firstNumber(240_000, `${envPrefix}_AI_TIMEOUT_MS`, `${envPrefix}_OPENAI_TIMEOUT_MS`, 'AI_TIMEOUT_MS');
  const effectiveMaxTokens = firstNumber(applyCostProfileToMaxTokens(envPrefix, task, maxTokens), `${envPrefix}_OPENAI_MAX_OUTPUT_TOKENS`);
  const apiStyle = firstEnv(`${envPrefix}_OPENAI_API_STYLE`, 'OPENAI_API_STYLE');
  const useResponses = wantsResponsesApi(model, apiStyle);
  const rawReasoningEffort = firstEnv(`${envPrefix}_OPENAI_REASONING_EFFORT`, `${envPrefix}_REASONING_EFFORT`, 'OPENAI_REASONING_EFFORT') || (useResponses ? defaultReasoningEffortForProfile(envPrefix) : '');
  const reasoningEffort = rawReasoningEffort ? normalizeReasoningEffort(rawReasoningEffort) : '';
  const verbosity = firstEnv(`${envPrefix}_OPENAI_VERBOSITY`, `${envPrefix}_AI_VERBOSITY`, 'OPENAI_VERBOSITY') || defaultVerbosityForProfile(envPrefix);
  const effectiveUserPrompt = applyCostProfilePromptInstruction(envPrefix, task, userPrompt);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = useResponses ? `${baseUrl}/responses` : `${baseUrl}/chat/completions`;
    const promptCacheConfig = buildPromptCacheConfig(scope, task, promptVersion);
    const requestBody = useResponses
      ? { ...buildResponsesTextBody({ model, systemPrompt, userPrompt: effectiveUserPrompt, effectiveMaxTokens, reasoningEffort, verbosity }), ...promptCacheConfig }
      : { ...buildChatTextBody({ model, systemPrompt, userPrompt: effectiveUserPrompt, effectiveMaxTokens, reasoningEffort }), ...promptCacheConfig };
    const result = await callOpenAIWithPromptCacheFallback({
      body: requestBody,
      endpointType: useResponses ? 'responses' : 'chat_completions',
      task,
      openai: (bodyToSend) => fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        signal: controller.signal,
        body: JSON.stringify(bodyToSend),
      }),
    });
    if (!result.ok) {
      const error = new Error(`OpenAI ${result.status}: ${String(result.text || '').slice(0, 500)}`);
      error.status = result.status;
      throw error;
    }
    const data = JSON.parse(result.text || '{}');
    const text = useResponses ? extractResponsesText(data) : (extractChatText(data) || extractResponsesText(data));
    const cleanText = String(text || '').trim();
    const apiStyleName = useResponses ? 'responses' : 'chat_completions';
    logAIUsage({ task, model: data.model || model, usage: data.usage || null, cached: false, apiStyle: apiStyleName });
    if (cleanText) {
      return { text: cleanText, model: data.model || model, apiStyle: apiStyleName, usage: data.usage || null, status: data.status || '', promptCacheFallback: result.cacheFallback };
    }
    const error = new Error(describeIncompleteResponse(data));
    error.code = 'ai_empty_output';
    error.status = 502;
    error.details = { status: data?.status || '', incompleteReason: data?.incomplete_details?.reason || '', usage: data?.usage || null };
    throw error;
  } catch (error) {
    if (error?.name === 'AbortError' || /aborted/i.test(String(error?.message || ''))) {
      const timeoutError = new Error('AI yanıtı belirtilen süre içinde tamamlanamadı. Dosya metni korunuyor; daha hızlı bir KOMITE modeli seçin, KOMITE zaman aşımı değerini artırın veya çok büyük dosyada kaynak uzunluğu limitini düşürün.');
      timeoutError.code = 'ai_timeout';
      timeoutError.status = 504;
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}


function flattenText(value) {
  try { return JSON.stringify(value || {}); } catch { return String(value || ''); }
}

function findGlobalQualityErrors(output = {}) {
  const text = flattenText(output);
  const errors = [];
  const bannedPatterns = [
    [/materyaldeki ilişkili kavram/iu, 'Anlamsız “materyaldeki ilişkili kavram” etiketi var.'],
    [/slayt\s*→/iu, 'Slayt ok işaretli ham içerik var.'],
    [/sayfa\s*→/iu, 'Sayfa ok işaretli ham içerik var.'],
    [/\b(?:slayt|sayfa)\s*\d+\b/iu, 'Slayt/sayfa numarası öğretim içeriğine girmiş.'],
    [/\b\w+\.(pdf|pptx|ppt|docx)\b/iu, 'Ham dosya adı öğretim içeriğine girmiş.'],
    [/prof\.?\s*dr\.?|doç\.?\s*dr\.?|öğr\.?\s*gör\.?/iu, 'Öğretim üyesi adı/unvanı içerik alanına girmiş olabilir.'],
  ];
  bannedPatterns.forEach(([pattern, message]) => { if (pattern.test(text)) errors.push(message); });
  const genericCount = (text.match(/klinik bağlamda değerlendirilir|materyal kapsamında önemlidir|bu konu sınavlarda sorulabilir|öğrenciler için önemlidir/giu) || []).length;
  if (genericCount >= 2) errors.push('Tekrarlayan jenerik dolgu ifadeler var.');
  return errors;
}

function hasDateLikeText(value = '') {
  return /\b(19|20)\d{2}\b|\b\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\b/u.test(String(value || ''));
}

export function validateQuestionsShape(output = {}) {
  const questions = Array.isArray(output.questions) ? output.questions : [];
  const errors = findGlobalQualityErrors(output);
  const blockingErrors = [...errors];
  const repairableErrors = [];
  const warnings = [];
  const addBlocking = (message) => {
    errors.push(message);
    blockingErrors.push(message);
  };
  const addRepairable = (message) => {
    errors.push(message);
    repairableErrors.push(message);
  };
  if (questions.length !== 10) addBlocking('Tam 10 soru yok.');
  questions.forEach((question, index) => {
    if (!Array.isArray(question.options) || question.options.length !== 5) addBlocking(`${index + 1}. soruda 5 seçenek yok.`);
    const optionIds = (question.options || []).map((option) => String(option.id || '').trim()).sort().join('');
    if (optionIds && optionIds !== 'ABCDE') addBlocking(`${index + 1}. soruda A-E seçenek kimlikleri eksik veya hatalı.`);
    if (!['A', 'B', 'C', 'D', 'E'].includes(String(question.correctOptionId || ''))) addBlocking(`${index + 1}. soruda correctOptionId geçersiz.`);
    ['A', 'B', 'C', 'D', 'E'].forEach((id) => {
      const feedback = String(question.optionFeedback?.[id] || '').trim();
      if (!feedback || feedback.length < 18 || /^(yanlış|doğru|bu seçenek doğrudur)\.?$/iu.test(feedback)) addRepairable(`${index + 1}. soruda ${id} feedback zayıf.`);
      if (/\b[NHnm]\.?\s*$/u.test(feedback) || /\bN\.\s/u.test(feedback)) addRepairable(`${index + 1}. soruda kısaltılmış anatomi feedbacki var.`);
    });
    const gate = runQuestionQualityGate(question, { version: 'komite-common-question-quality-gate' });
    gate.blockingErrors.forEach((message) => {
      addBlocking(`${index + 1}. soruda bloklayıcı kalite hatası: ${message}`);
    });
    gate.repairableErrors.forEach((message) => {
      addRepairable(`${index + 1}. soruda onarılabilir kalite hatası: ${message}`);
    });
    gate.warnings.forEach((message) => {
      warnings.push(`${index + 1}. soruda kalite uyarısı: ${message}`);
    });
  });
  return {
    ok: errors.length === 0,
    errors: Array.from(new Set(errors)),
    blockingErrors: Array.from(new Set(blockingErrors)),
    repairableErrors: Array.from(new Set(repairableErrors)),
    warnings: Array.from(new Set(warnings)),
  };
}

export function validateFlashcardsShape(output = {}) {
  const deck = output.deck?.cards ? output.deck : output;
  const cards = Array.isArray(deck.cards) ? deck.cards : [];
  const errors = findGlobalQualityErrors(output);
  if (cards.length < 8) errors.push('Yeterli kart yok.');
  cards.forEach((card, index) => {
    const front = String(card.front || '').trim();
    const explanation = String(card.explanation || '').trim();
    if (!front.endsWith('?')) errors.push(`${index + 1}. kart önü aktif soru değil.`);
    if (/Materyalde geçen|Bu kart|slaytta geçen|ayrıştırılan gerçek metne dayanır/iu.test(`${front} ${explanation}`)) errors.push(`${index + 1}. kart meta veya kopya ifade içeriyor.`);
    const back = String(card.back || '').trim();
    if (!back) errors.push(`${index + 1}. kart arkası boş.`);
    if (back.split(/\s+/).length < 3) errors.push(`${index + 1}. kart arkası keyword-only görünüyor.`);
    if (!explanation) errors.push(`${index + 1}. kart açıklaması boş.`);
  });
  return { ok: errors.length === 0, errors };
}

export function validateLessonShape(output = {}, context = {}) {
  const warnings = findGlobalQualityErrors(output);
  const sections = Array.isArray(output.sections) && output.sections.length
    ? output.sections
    : (Array.isArray(output.lessonSections) ? output.lessonSections : output.coreExplanation);
  const title = String(output.title || output.academicTitle || '').trim();

  // Keep this validator intentionally permissive. It should protect only against a completely
  // unusable response, not block a current-source lesson because a section is short, a title is
  // imperfect, or a source page marker appeared in the model's JSON.
  const errors = [];
  if (!title && (!Array.isArray(sections) || sections.length === 0) && !String(output.bigPicture || output.overview || output.shortIntro || '').trim()) {
    errors.push('AI boş veya kullanılamaz ders çıktısı döndürdü.');
  }

  const filesUploadedCount = Number(context.filesUploadedCount || 0);
  const filesAnalyzedCount = Number(output.sourceCoverage?.filesAnalyzedCount || output.sourceCoverage?.filesAnalyzed || 0);
  if (filesUploadedCount > 1 && filesAnalyzedCount > 0 && filesAnalyzedCount < filesUploadedCount) {
    warnings.push('Çoklu dosya kapsamı eksik görünüyor.');
  }

  return { ok: errors.length === 0, errors, warnings };
}
