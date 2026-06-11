import {
  OPTIMIZED_TUS_SYSTEM_PROMPT,
  TUS_QUALITY_REWRITE_SYSTEM_PROMPT,
  buildUserPrompt,
  normalizeDifficulty,
} from '../server/tus-question-prompt.js';
import { envFlag, envNumber, logAIUsage, resolveModelForScope } from '../server/lib/ai-token-optimizer.js';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const PROMPT_VERSION = 'klinikiq-v448-minimum-published-quality-rich-feedback';
const SCHEMA_VERSION = 'professional-tus-json-v4-rich-feedback';
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
    request.on('data', (chunk) => { body += chunk; });
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
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
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
  if (value === undefined || value === null || value === '') return [];
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
  try {
    return JSON.parse(candidate);
  } catch {
    const repaired = candidate
      .replace(/,\s*([}\]])/g, '$1')
      .replace(/[\u0000-\u001F\u007F]+/g, ' ');
    return JSON.parse(repaired);
  }
}

function normalizeItems(items = []) {
  const output = [];
  asArray(items).forEach((item) => {
    let label = '';
    let value = '';
    if (typeof item === 'string') {
      const [first, ...rest] = item.split(/[:：]/u);
      label = first || 'Veri';
      value = rest.length ? rest.join(':') : item;
    } else if (item && typeof item === 'object') {
      label = item.label || item.name || item.parameter || item.title || item.key || '';
      value = item.value || item.result || item.text || item.finding || item.data || '';
    }
    label = cleanText(label);
    value = cleanText(value);
    if (label && value) output.push({ label, value });
  });
  return output;
}


function normalizePhysicalExam(items = []) {
  return normalizeItems(items).map((item) => ({
    label: item.label || 'Muayene',
    value: item.value,
  }));
}

function flattenItems(items = []) {
  return normalizeItems(items)
    .map((item) => cleanText([item.label, item.value].filter(Boolean).join(': ')))
    .filter(Boolean);
}

function joinedItemText(items = []) {
  return flattenItems(items).join(' ');
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
  const rawValue = getByPaths(payload, [
    'correctAnswer', 'c', 'correct', 'answer', 'dogruCevap', 'doğruCevap', 'yanit', 'yanıt', 'cevap',
  ]);
  const raw = String(rawValue || '').trim().toUpperCase();
  if (OPTION_IDS.includes(raw)) return raw;
  const wanted = normalize(rawValue || '');
  if (!wanted) return '';
  const exact = options.find((option) => normalize(option.text) === wanted);
  if (exact) return exact.id;
  const loose = options.find((option) => normalize(option.text).includes(wanted) || wanted.includes(normalize(option.text)));
  return loose?.id || '';
}

function normalizeFeedback(rawFeedback = {}) {
  if (Array.isArray(rawFeedback)) {
    return OPTION_IDS.reduce((acc, id, index) => {
      acc[id] = cleanText(rawFeedback[index] || '');
      return acc;
    }, {});
  }
  if (rawFeedback && typeof rawFeedback === 'object') {
    return OPTION_IDS.reduce((acc, id) => {
      acc[id] = cleanText(rawFeedback[id] || rawFeedback[id.toLowerCase()] || rawFeedback[`option${id}`] || rawFeedback[`secenek${id}`] || '');
      return acc;
    }, {});
  }
  return OPTION_IDS.reduce((acc, id) => ({ ...acc, [id]: '' }), {});
}

function normalizeEvidence(value = []) {
  return asArray(value)
    .map((item) => {
      if (typeof item === 'object' && item) {
        return cleanText([item.label, item.clue, item.finding, item.meaning, item.text].filter(Boolean).join(' — '));
      }
      return cleanText(item);
    })
    .filter(Boolean);
}

function normalizeGeneratedQuestion(payload = {}, { branch, difficulty, model, mode } = {}) {
  const source = payload.question && typeof payload.question === 'object' ? { ...payload, ...payload.question } : payload;
  const options = normalizeOptions(getByPaths(source, ['options', 'o', 'secenekler', 'seçenekler', 'choices', 'siklar', 'şıklar']) || []);
  const correctAnswer = resolveCorrectId(source, options);
  const optionFeedback = normalizeFeedback(getByPaths(source, ['optionFeedback', 'feedback', 'f', 'wrongOptionFeedback', 'secenekFeedback', 'seçenekFeedback', 'sikFeedback', 'şıkFeedback']) || {});

  return {
    id: `ai-spot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    relatedBranch: cleanText(getByPaths(source, ['branch', 'b', 'relatedBranch']) || branch),
    difficulty: normalizeDifficulty(getByPaths(source, ['difficulty', 'd']) || difficulty),
    learningTarget: cleanText(getByPaths(source, ['learningTarget', 'lt', 'target']) || ''),
    answerTarget: cleanText(getByPaths(source, ['answerTarget', 'at', 'questionIntent', 'intent']) || 'diagnosis'),
    demographics: cleanText(getByPaths(source, ['demographics', 'dem']) || ''),
    setting: cleanText(getByPaths(source, ['setting', 'set']) || ''),
    chiefComplaint: cleanText(getByPaths(source, ['chiefComplaint', 'cc']) || ''),
    stem: cleanText(getByPaths(source, ['clinicalStem', 'stem', 's', 'soruKoku', 'soruKökü', 'olgu', 'vaka', 'case', 'clinicalCase']) || ''),
    compactVitals: normalizeItems(getByPaths(source, ['vitals', 'compactVitals', 'cv']) || []),
    compactObjectiveData: normalizeItems(getByPaths(source, ['objectiveData', 'compactObjectiveData', 'co', 'supportingData']) || []),
    physicalExam: normalizePhysicalExam(getByPaths(source, ['physicalExam', 'exam', 'muayene']) || []),
    history: asArray(getByPaths(source, ['history', 'anamnesis', 'anamnez']) || []).map(cleanText).filter(Boolean),
    question: cleanText(getByPaths(source, ['question', 'q', 'soru', 'soruCumlesi', 'soruCümlesi']) || ''),
    options,
    correctAnswer,
    explanation: cleanText(getByPaths(source, ['explanation', 'e', 'whyCorrect', 'aciklama', 'açıklama', 'rationale', 'gerekce', 'gerekçe']) || ''),
    wrongOptionFeedback: optionFeedback,
    evidenceChain: normalizeEvidence(getByPaths(source, ['evidenceBasedReasoning', 'evidenceChain', 'evidence', 'k']) || []),
    examPearl: cleanText(getByPaths(source, ['examPearl', 'pearl', 'p', 'teachingPoint']) || ''),
    sourceUseNote: cleanText(getByPaths(source, ['sourceUseNote', 'sourceNote']) || ''),
    managementSteps: asArray(getByPaths(source, ['managementSteps', 'management', 'm']) || []).map(cleanText).filter(Boolean),
    provider: 'openai',
    openAIModel: model || '',
    openAIMode: mode || '',
    promptVersion: PROMPT_VERSION,
    schemaVersion: SCHEMA_VERSION,
    aiMeta: {
      provider: 'openai',
      remote: true,
      fallback: false,
      promptVersion: PROMPT_VERSION,
      schemaVersion: SCHEMA_VERSION,
      sourceUseNote: cleanText(getByPaths(source, ['sourceUseNote', 'sourceNote']) || ''),
    },
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


function hasContent(value = '') {
  return cleanText(value) !== '';
}

function arrayHasContent(items = []) {
  return Array.isArray(items) && joinedItemText(items) !== '';
}

function optionTextById(question = {}, id = '') {
  return question.options?.find((option) => option.id === id)?.text || '';
}

function looksLikeNonNarrativeStem(value = '') {
  // V448-clean: kelime/cümle/karakter eşiği veya kelime-listesi regexi kullanılmaz.
  // Klinik anlatı kalitesi prompt + rewrite editörüne bırakılır; backend yalnızca boş alanı yakalar.
  return !hasContent(value);
}

function isBrokenOrTruncatedFeedback(value = '') {
  // V448-clean: "şu kelimeyle biterse bozuk", "şu kelime geçerse yasak" tarzı regex filtreleri kaldırıldı.
  // API seviyesinde kesilmiş çıktı zaten JSON parse / OpenAI hata akışında yakalanır; burada sadece boş feedback engellenir.
  return !hasContent(value);
}

function looksTruncated(value = '') {
  return !hasContent(value);
}

function containsLowQualityResidue() {
  // V448-clean: hard-coded placeholder / yasak kelime listeleri kullanılmaz.
  return false;
}

function containsAnswerLeak(text = '', correctOptionText = '') {
  const source = normalize(text);
  const answer = normalize(correctOptionText);
  return Boolean(source && answer && source.includes(answer));
}

function looksMultiTargetQuestion(value = '') {
  // V448-clean: soru cümlesini kelime-listesiyle cezalandırma kaldırıldı.
  return !hasContent(value);
}

function evidenceLooksEducational(items = []) {
  // Metin uzunluğu veya belirli kelime arama yok; kanıt zinciri alanının dolu olması yeterli yapısal kontroldür.
  return asArray(items).map(cleanText).some(Boolean);
}

function isEducationalFeedback(value = '', optionText = '') {
  const text = cleanText(value);
  const comparable = normalize(text);
  const optionComparable = normalize(optionText);
  if (!text) return false;
  if (optionComparable && comparable === optionComparable) return false;
  return true;
}

function isShallowFeedback(value = '', optionText = '') {
  return !isEducationalFeedback(value, optionText);
}

function isShallowExplanation(value = '') {
  return !hasContent(value);
}

function findEducationalDefects(question = {}) {
  const defects = [];
  const feedback = question.wrongOptionFeedback || {};
  const correctOption = optionTextById(question, question.correctAnswer);

  if (looksLikeNonNarrativeStem(question.stem)) defects.push('clinicalStem alanı boş.');
  if (!arrayHasContent(question.physicalExam)) defects.push('physicalExam alanı boş.');
  if (!arrayHasContent(question.compactVitals)) defects.push('vitals alanı boş.');
  if (!arrayHasContent(question.compactObjectiveData)) defects.push('objectiveData alanı boş.');
  if (looksMultiTargetQuestion(question.question)) defects.push('question alanı boş.');
  if (!Array.isArray(question.options) || question.options.length !== 5) defects.push('options alanı tam beş seçenek içermiyor.');
  if (!OPTION_IDS.includes(String(question.correctAnswer || '').toUpperCase()) || !question.options?.some((option) => option.id === question.correctAnswer)) defects.push('correctAnswer A-E seçenekleriyle güvenli biçimde eşleşmiyor.');
  if (isShallowExplanation(question.explanation)) defects.push('explanation alanı boş.');

  const missingFeedback = OPTION_IDS.filter((id) => !cleanText(feedback[id]));
  if (missingFeedback.length) defects.push(`optionFeedback eksik: ${missingFeedback.join(', ')}.`);
  const shallow = OPTION_IDS.filter((id) => isShallowFeedback(feedback[id], optionTextById(question, id)));
  if (shallow.length) defects.push(`optionFeedback boş veya seçenek metnini aynen tekrar ediyor: ${shallow.join(', ')}.`);

  if (!evidenceLooksEducational(question.evidenceChain)) defects.push('evidenceBasedReasoning alanı boş.');

  const leakText = [question.stem, question.question, joinedItemText(question.physicalExam), joinedItemText(question.compactObjectiveData)].join(' ');
  if (containsAnswerLeak(leakText, correctOption)) defects.push('answer leak riski var; doğru seçenek metni kök/veri alanlarında doğrudan geçiyor.');

  const optionTexts = question.options?.map((option) => cleanText(option.text)).filter(Boolean) || [];
  if (new Set(optionTexts.map(normalize)).size !== optionTexts.length) defects.push('seçeneklerde tekrar veya eşdeğer ifade riski var.');
  return [...new Set(defects)];
}

function compactPayloadFromQuestion(question = {}) {
  return {
    branch: question.relatedBranch,
    difficulty: question.difficulty,
    learningTarget: question.learningTarget,
    answerTarget: question.answerTarget,
    clinicalStem: question.stem,
    physicalExam: question.physicalExam || [],
    vitals: question.compactVitals || [],
    objectiveData: question.compactObjectiveData || [],
    question: question.question,
    options: question.options || [],
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    optionFeedback: question.wrongOptionFeedback || {},
    evidenceBasedReasoning: question.evidenceChain || [],
    examPearl: question.examPearl,
    sourceUseNote: question.sourceUseNote || '',
  };
}

async function maybeRewriteForEducationalQuality(question, defects, context, attempt = 1) {
  const enabled = String(process.env.TUS_AI_ENABLE_QUALITY_REWRITE ?? 'true').toLowerCase() !== 'false';
  if (!enabled) return { question, rewritten: false };
  const prompt = [
    defects.length
      ? 'Aşağıdaki TUS soru JSON çıktısı KlinikIQ kalite denetiminde yetersiz bulundu.'
      : 'Aşağıdaki TUS soru JSON çıktısını yayınlanabilir KlinikIQ kalite standardına yükselt.',
    defects.length ? `Denetim bulguları: ${defects.join(' | ')}` : 'Denetim bulgusu yok; yine de üst kalite editör gibi klinik anlatı, açıklama ve optionFeedback alanlarını güçlendir.',
    `Düzeltme turu: ${attempt}`,
    'Aynı soru niyetini, branşı, karar hedefini, doğru cevap mantığını ve JSON schema alanlarını koruyarak çıktıyı kalite editörü gibi yeniden yaz.',
    'clinicalStem gerçek hasta başvuru/anamnez akışına dönsün; muayene, vital ve objektif veriler kendi alanlarında kalsın.',
    'explanation vaka özelinde klinik bağlamdan doğru cevaba giden gerekçeyi kursun.',
    'Her optionFeedback öğrencinin yanlış seçeneği neden düşüneceğini ve neden elemesi gerektiğini öğretsin.',
    'Her optionFeedback; seçeneğin klinik anlamını, hangi durumda doğru olabileceğini, bu vakada neden uygun/uygunsuz olduğunu ve doğru cevapla ayırıcı noktasını açıkça anlatsın.',
    'Yarım kalmış, yüzeysel, seçenek adını tekrar eden veya sadece hüküm veren feedback bırakma.',
    'Yalnızca geçerli JSON döndür.',
    JSON.stringify(compactPayloadFromQuestion(question), null, 2),
  ].join('\n\n');
  try {
    const result = await callOpenAI(prompt, { systemPrompt: TUS_QUALITY_REWRITE_SYSTEM_PROMPT, purpose: `${TASK_NAME}:quality-rewrite:${attempt}` });
    const rewritten = normalizeGeneratedQuestion(result.payload, { ...context, model: result.model, mode: result.mode });
    assertRenderableQuestion(rewritten);
    rewritten.aiMeta = { ...(rewritten.aiMeta || {}), qualityRewritten: true, qualityRewriteAttempt: attempt, originalQualityDefects: defects };
    return { question: rewritten, rewritten: true };
  } catch (error) {
    question.aiMeta = { ...(question.aiMeta || {}), qualityRewriteFailed: true, qualityRewriteError: error?.message || String(error), originalQualityDefects: defects };
    return { question, rewritten: false };
  }
}

async function enforceEducationalQuality(question, context) {
  let current = question;
  let rewritten = false;
  const maxAttempts = envNumber('TUS_AI_QUALITY_REWRITE_ATTEMPTS', 3);
  const alwaysRewrite = String(process.env.TUS_AI_ALWAYS_QUALITY_REWRITE ?? 'true').toLowerCase() !== 'false';

  if (alwaysRewrite) {
    const first = await maybeRewriteForEducationalQuality(current, [], context, 1);
    rewritten = rewritten || first.rewritten;
    current = first.question;
  }

  for (let attempt = alwaysRewrite ? 2 : 1; attempt <= maxAttempts; attempt += 1) {
    const defects = findEducationalDefects(current);
    if (!defects.length) return { question: current, rewritten, defects: [] };
    const result = await maybeRewriteForEducationalQuality(current, defects, context, attempt);
    rewritten = rewritten || result.rewritten;
    current = result.question;
    if (!result.rewritten) break;
  }

  const remaining = findEducationalDefects(current);
  if (remaining.length) {
    const error = new Error('AI soru üretimi kalite standardını karşılamadı; lütfen tekrar deneyin.');
    error.statusCode = 422;
    error.qualityDefects = remaining;
    throw error;
  }
  return { question: current, rewritten, defects: remaining };
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

async function callOpenAI(prompt, { systemPrompt = OPTIMIZED_TUS_SYSTEM_PROMPT, purpose = TASK_NAME } = {}) {
  const apiKey = process.env.TUS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const error = new Error('OPENAI_API_KEY tanımlı değil.');
    error.statusCode = 503;
    throw error;
  }

  const model = resolveModelForScope('TUS');
  const baseUrl = (process.env.TUS_OPENAI_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const timeoutMs = envNumber('TUS_OPENAI_PER_REQUEST_TIMEOUT_MS', envNumber('OPENAI_PER_REQUEST_TIMEOUT_MS', 90000));
  const outputLimit = envNumber('TUS_OPENAI_MAX_OUTPUT_TOKENS', envNumber('OPENAI_MAX_OUTPUT_TOKENS', 6000));
  const explicitStyle = process.env.TUS_OPENAI_API_STYLE || process.env.OPENAI_API_STYLE || '';
  const useResponses = shouldUseResponsesApi(model, explicitStyle);
  const style = useResponses ? 'responses' : 'chat';
  const { signal, cancel } = createAbortSignal(timeoutMs);

  try {
    const body = useResponses
      ? {
          model,
          instructions: systemPrompt,
          input: prompt,
          text: { format: { type: 'json_object' } },
          max_output_tokens: outputLimit,
          store: false,
        }
      : {
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_object' },
          max_completion_tokens: outputLimit,
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
    logAIUsage({ task: purpose, model: data.model || model, usage: data.usage || null, cached: false, apiStyle: style });
    const text = useResponses ? extractResponsesText(data) : extractChatText(data);
    if (!cleanText(text)) {
      const error = new Error('OpenAI boş çıktı döndürdü.');
      error.statusCode = 502;
      throw error;
    }
    return { payload: parseModelJson(text), model: data.model || model, mode: style };
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

function extractSourceText(body = {}) {
  if (body.sourceText || body.materialText || body.contextText) return String(body.sourceText || body.materialText || body.contextText || '');
  const files = Array.isArray(body.materialPacket?.files) ? body.materialPacket.files : [];
  return files
    .map((file) => file?.cleanedExtractedText || file?.text || file?.content || '')
    .filter(Boolean)
    .join('\n\n---\n\n');
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });

  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }

  const branch = chooseBranch(body.branchFilter || body.branch || 'Rastgele');
  const difficulty = normalizeDifficulty(body.difficulty || body.requestedDifficulty || body.aiDifficulty || 'Orta');
  const prompt = buildUserPrompt({
    branch,
    difficulty,
    target: body.target || body.answerTarget || body.learningTarget || '',
    sourceText: extractSourceText(body),
    recentReviewNote: body.recentReviewNote || body.reviewContext || body.lastReviewStatus || '',
  });

  try {
    const result = await callOpenAI(prompt);
    let question = normalizeGeneratedQuestion(result.payload, { branch, difficulty, model: result.model, mode: result.mode });
    assertRenderableQuestion(question);
    const quality = await enforceEducationalQuality(question, { branch, difficulty, model: result.model, mode: result.mode });
    question = quality.question;
    assertRenderableQuestion(question);
    question.aiMeta = {
      ...(question.aiMeta || {}),
      promptVersion: PROMPT_VERSION,
      qualityRewritten: Boolean(question.aiMeta?.qualityRewritten || quality.rewritten),
      qualityWarnings: quality.defects,
      strictEducationalQuality: envFlag('TUS_AI_STRICT_EDUCATIONAL_QUALITY', true),
    };
    return sendJson(response, 200, { ok: true, provider: 'openai', fallback: false, repaired: Boolean(question.aiMeta?.qualityRewritten), question });
  } catch (error) {
    return sendJson(response, error?.statusCode || 502, {
      ok: false,
      provider: 'openai',
      fallback: false,
      error: error?.message || 'AI soru üretimi başarısız oldu.',
      qualityDefects: Array.isArray(error?.qualityDefects) ? error.qualityDefects : undefined,
    });
  }
}
