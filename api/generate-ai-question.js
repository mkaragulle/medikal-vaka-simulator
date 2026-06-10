import {
  OPTIMIZED_TUS_SYSTEM_PROMPT,
  buildUserPrompt,
  normalizeDifficulty,
} from './tus-question-prompt.js';
import { envNumber, logAIUsage, resolveModelForScope } from './lib/ai-token-optimizer.js';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const PROMPT_VERSION = 'klinikiq-v438-professional-no-content-limits';
const SCHEMA_VERSION = 'simple-ai-spot-v13-no-content-limits';
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

function normalizeMedicalTurkish(value = '') {
  return String(value ?? '')
    .replace(/\bacil\s*[-‑]?\s*CoA\b/giu, 'açil-CoA')
    .replace(/\bacylcarnitine\b/giu, 'açilkarnitin')
    .replace(/\bdicarboksilik\b/giu, 'dikarboksilik')
    .replace(/\basidüre\b/giu, 'asidüri')
    .replace(/\btandem\s+mas\s+spektrometrisi\b/giu, 'tandem kütle spektrometrisi')
    .replace(/\bfasting\b/giu, 'açlık')
    .replace(/\blife[-\s]?threatening\b/giu, 'yaşamı tehdit eden')
    .replace(/\bsole\s+bekleme\b/giu, 'tek başına bekleme')
    .replace(/\bvaginal\b/giu, 'vajinal')
    .replace(/\bmyometriyum\b/giu, 'miyometriyum')
    .replace(/\bmyometrium\b/giu, 'miyometriyum')
    .replace(/\btransvaginal\b/giu, 'transvajinal')
    .replace(/\bmethotrexate\b/giu, 'metotreksat')
    .replace(/\bgranulomatöz\b/giu, 'granülomatöz')
    .replace(/\bpercentil(?:i)?\b/giu, 'persentil')
    .replace(/\bpersistente\b/giu, 'persistan')
    .replace(/\bİnhclusion\b/gu, 'Inclusion')
    .replace(/\bİnclusion\b/gu, 'Inclusion')
    .replace(/\binklüzyon\s+body\s+miyopatisi\b/giu, 'inklüzyon cisimcikli miyozit')
    .replace(/\bPolimyozitis\b/giu, 'Polimiyozit')
    .replace(/\bDermatomyozitis\b/giu, 'Dermatomiyozit')
    .replace(/\bMyastenia\b/giu, 'Miyastenia')
    .replace(/\bquadriceps\b/giu, 'kuadriseps')
    .replace(/\bfluktüan\b/giu, 'dalgalanan')
    .replace(/\bkranial\b/giu, 'kraniyal')
    .replace(/\bsensoryal\b/giu, 'duyusal')
    .replace(/\bthorax\b/giu, 'toraks')
    .replace(/\borsal\s+intercostal\b/giu, 'dorsal interkostal')
    .replace(/\bDorsal\s+intercostal\b/gu, 'Dorsal interkostal')
    .replace(/\bFresh\s+frozen\s+plasma\b/giu, 'taze donmuş plazma')
    .replace(/\bCT\s+angiografi\b/giu, 'BT anjiyografi')
    .replace(/\bexploratif\b/giu, 'eksploratif')
    .replace(/\bmesenterik\b/giu, 'mezenterik')
    .replace(/\bproximal\b/giu, 'proksimal')
    .replace(/\brekannalizasyon\b/giu, 'rekanalizasyon')
    .replace(/\bvasopresör\b/giu, 'vazopressör')
    .replace(/\bdiffuse\b/giu, 'yaygın')
    .replace(/\bpürsüz yüksek INR\b/giu, 'belirgin yüksek INR')
    .replace(/\byaşinde\b/giu, 'yaşında')
    .replace(/\bpersistens\b/giu, 'persistan')
    .replace(/\bdekolerasyon\b/giu, 'deselerasyon')
    .replace(/\btocolizis\b/giu, 'tokoliz')
    .replace(/\baraknoid yüz\b/giu, 'dismorfik yüz görünümü')
    .replace(/\bİmmunoglobulin\b/gu, 'İmmünoglobulin')
    .replace(/\bimmunoglobulin\b/giu, 'immünoglobulin')
    .replace(/\beczema\b/giu, 'egzama')
    .replace(/\brekürren\b/giu, 'tekrarlayan')
    .replace(/\babsolute lymphocyte count\b/giu, 'mutlak lenfosit sayısı')
    .replace(/\bplatelet count\b/giu, 'trombosit sayısı')
    .replace(/\btrombozitoz\b/giu, 'trombositopeni')
    .replace(/\banion\s*gap\b/giu, 'anyon açıklığı')
    .replace(/\baminoasit\b/giu, 'amino asit')
    .replace(/\bNH3\b/gu, 'amonyak')
    .replace(/\bcreatinine\b/giu, 'kreatinin')
    .replace(/\bhipokalseüri\b/giu, 'hipokalsiüri')
    .replace(/\bdistal\s+tubulus(?:ta|ta)?\b/giu, 'distal tübülde')
    .replace(/\btubulus\b/giu, 'tübül')
    .replace(/\bsupressed\s+renin\b/giu, 'baskılanmış renin')
    .replace(/\bretine\s+plasenta\b/giu, 'retansiyone plasenta')
    .replace(/\blacerasyon\b/giu, 'laserasyon')
    .replace(/\bmidline\b/giu, 'orta hatta')
    .replace(/\bGenelize\b/gu, 'Yaygın')
    .replace(/\bgenelize\b/gu, 'yaygın')
    .replace(/\bhemitiroidectomy\b/giu, 'hemitiroidektomi')
    .replace(/\binferior\s+thyroid\s+arter\b/giu, 'inferior tiroid arter')
    .replace(/\btekrarlayan\s+laringeal\s+sinir\b/giu, 'rekürren laringeal sinir')
    .replace(/\bperitonitis\b/giu, 'peritonit')
    .replace(/\bCT[-\s]?angio\b/giu, 'BT anjiyografi')
    .replace(/\bcil\s+laparotomi\b/giu, 'acil laparotomi');
}

function cleanText(value = '') {
  return normalizeMedicalTurkish(value)
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\u00a0/g, ' ')
    .replace(/```(?:json)?|```/giu, ' ')
    .replace(/\b(?:Doğru\s+cevap|Seçimin|Açıklama)\s*[:：-]?\s*/giu, ' ')
    .replace(/\b[A-E]\s*(?:geri\s*bildirim|feedback|gerekçe)\s*[:：.-]?\s*/giu, ' ')
    .replace(/^\s*[A-E]\s*\)\s*(?:doğru|yanlış)\s*[:：.-]?\s*/iu, '')
    .replace(/^\s*(?:doğru|yanlış)\s*[:：.-]?\s*/iu, '')
    .replace(/\b([A-E])\s*\)\s*\1\s*\)?\s*/giu, '$1) ')
    .replace(/\b([A-E])\s*:\s*\(\s*(?:Doğru|Yanlış)\s*\)\s*/giu, '')
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

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function uniqueSentences(value = '') {
  const seen = new Set();
  return cleanText(value)
    .split(/(?<=[.!?])\s+/u)
    .map(ensureSentence)
    .filter((sentence) => {
      const key = normalize(sentence);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join(' ')
    .trim();
}

function splitSentences(value = '') {
  return cleanText(value).split(/(?<=[.!?])\s+/u).map((s) => cleanText(s)).filter(Boolean);
}

function looksBrokenSentence(sentence = '') {
  const text = cleanText(sentence);
  if (!text) return true;
  const words = text.split(/\s+/u);
  const last = (words[words.length - 1] || '').replace(/[.!?]+$/u, '');
  if (/\b(?:ve|veya|ile|için|olarak|fakat|ancak|çünkü|z)$/iu.test(last)) return true;
  if (last.length <= 1) return true;
  if (words.length < 3 && !/[.!?]$/u.test(text)) return true;
  if (/[,:;]\s*$/u.test(text)) return true;
  if (/\(\s*$|\[\s*$/u.test(text)) return true;
  return false;
}

function cleanBrokenSentences(value = '') {
  const sentences = splitSentences(value)
    .map((sentence) => ensureSentence(sentence.replace(/[,:;\s]+$/u, '')))
    .filter((sentence) => !looksBrokenSentence(sentence));
  return uniqueSentences(sentences.join(' '));
}

function keyTerms(value = '') {
  return [...new Set(contentTokens(value).filter((word) => word.length >= 5))];
}

function optionSelfSupport(feedback = '', optionText = '') {
  const terms = keyTerms(optionText);
  if (!terms.length) return 0;
  const fb = normalize(feedback);
  return terms.filter((term) => fb.includes(term)).length / terms.length;
}

function detectFeedbackDrift(feedback = '', currentOption = {}, allOptions = []) {
  const own = optionSelfSupport(feedback, currentOption.text);
  const other = allOptions
    .filter((option) => option.id !== currentOption.id)
    .map((option) => optionSelfSupport(feedback, option.text))
    .sort((a, b) => b - a)[0] || 0;
  return other >= 0.5 && other > own + 0.2;
}

function isBadFeedbackText(value = '') {
  const text = cleanText(value);
  const norm = normalize(text);
  if (!text) return true;
  if (/\b(?:geri bildirim|feedback|gerekçe|açıklama)\b/iu.test(text)) return true;
  if (/birlikte\s+z\.?$/iu.test(text) || /\bz\.?$/iu.test(text)) return true;
  if (/üretilemedi|placeholder|lorem|undefined|null/iu.test(text)) return true;
  return false;
}

function fallbackFeedback(id = '', correctId = '') {
  return id === correctId
    ? 'Bu seçenek kökteki bulgularla en uyumlu yanıttır.'
    : 'Bu seçenek kökteki klinik, laboratuvar veya anatomik örüntüyü en iyi açıklamaz.';
}

function compactReason(value = '') {
  const sentence = cleanBrokenSentences(cleanFeedback(value));
  if (isBadFeedbackText(sentence)) return '';
  return sentence.replace(/[.!?]$/u, '');
}

function composeFeedback(id = '', correctId = '', reason = '') {
  const r = compactReason(reason);
  if (id === correctId) {
    return ensureSentence(r || 'Bu seçenek kökteki bulgularla en uyumlu yanıttır');
  }
  return ensureSentence(r || 'Bu seçenek kökteki klinik, laboratuvar veya anatomik örüntüyü en iyi açıklamaz');
}


function cleanFeedback(value = '') {
  return cleanText(value)
    .replace(/^\s*[A-E]\s*\)?\s*(?:geri\s*bildirim|feedback|gerekçe)\s*[:：.-]?\s*/iu, '')
    .replace(/^\s*[A-E]\s*\)\s*(?:doğru|yanlış)\s*[:：.-]?\s*/iu, '')
    .replace(/^\s*(?:doğru|yanlış)\s*[:：.-]?\s*/iu, '')
    .replace(/^\s*(?:seçimin|doğru\s+cevap|açıklama)\s*[:：.-]?\s*/iu, '')
    .trim();
}


const COMMON_TR_WORDS = new Set('ve veya ile için olan olarak hasta hastada bu şu bir daha çok en ise ancak çünkü nedenle göre olguda seçenek doğru yanlış tanı tedavi test bulgu klinik saptanır değildir beklenir düşündürür destekler'.split(' '));

function contentTokens(value = '') {
  return normalize(value).split(/\s+/u).filter((word) => word.length >= 4 && !COMMON_TR_WORDS.has(word));
}

function isEvidenceSentence(sentence = '') {
  return /\b(?:yüksek|düşük|artmış|azalmış|pozitif|negatif|saptan|izlen|görül|bulun|mevcut|yok|normal|patolojik|belirgin|değer|sonuç|laboratuvar|görüntüleme|BT|MR|USG|kan|idrar|serum|plazma|ferritin|laktat|kreatinin|lenfosit|trombosit|glukoz|keton|antikoru|biyopsi|Doppler|röntgen|grafi)\b/iu.test(sentence)
    || /\d/.test(sentence);
}

function stemSupportRatio(sentence = '', visibleText = '') {
  const visible = new Set(contentTokens(visibleText));
  const tokens = [...new Set(contentTokens(sentence))];
  if (!tokens.length) return 1;
  const supported = tokens.filter((token) => visible.has(token)).length;
  return supported / tokens.length;
}

function pruneUnsupportedEvidence(text = '', visibleText = '', fallback = '') {
  const sentences = cleanText(text).split(/(?<=[.!?])\s+/u).map(cleanFeedback).filter(Boolean);
  const kept = sentences.filter((sentence) => !isEvidenceSentence(sentence) || stemSupportRatio(sentence, visibleText) >= 0.25);
  const result = uniqueSentences(kept.join(' '));
  return result || fallback || uniqueSentences(text);
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
    const text = cleanText(rawText).replace(/^\s*[A-E]\s*\)\s*/iu, '').trim();
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

function feedbackObject(rawReasons = [], correctId = 'A', explanation = '', options = [], visibleText = '') {
  const source = rawReasons && typeof rawReasons === 'object' && !Array.isArray(rawReasons)
    ? OPTION_IDS.map((id) => rawReasons?.[id] || rawReasons?.[id.toLowerCase()] || rawReasons?.[`option${id}`] || '')
    : asArray(rawReasons);
  return OPTION_IDS.reduce((acc, id, index) => {
    const option = options.find((item) => item.id === id) || { id, text: '' };
    let reason = source[index] || '';
    if (!reason && id === correctId) reason = explanation;
    let text = composeFeedback(id, correctId, reason);
    if (detectFeedbackDrift(text, option, options)) text = fallbackFeedback(id, correctId);
    if (isBadFeedbackText(text)) text = fallbackFeedback(id, correctId);
    acc[id] = ensureSentence(text);
    return acc;
  }, {});
}

function compactItems(items = []) {
  return asArray(items)
    .map((item) => {
      if (typeof item === 'string') {
        const [label, ...rest] = item.split(/[:：]/u);
        return { label: cleanText(label), value: cleanText(rest.join(':')) };
      }
      return { label: cleanText(item?.label || item?.name || item?.parameter || item?.title || ''), value: cleanText(item?.value || item?.result || item?.text || '') };
    })
    .filter((item) => item.label && item.value);
}

function formatPanelDataForStem(items = []) {
  return items.map((item) => `${item.label}: ${item.value}`).filter(Boolean).join('; ');
}

function addVisibleDataToStem(stem = '', compactVitals = [], compactObjectiveData = []) {
  let text = cleanText(stem);
  const visible = normalize(text);
  const missing = [...compactItems(compactVitals), ...compactItems(compactObjectiveData)].filter((item) => {
    const label = normalize(item.label);
    const value = normalize(item.value);
    return label && value && !(visible.includes(label) && visible.includes(value));
  });
  const line = formatPanelDataForStem(missing);
  return line ? `${text} Değerlendirmede ${line} saptanır.` : text;
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

function normalizeGeneratedQuestion(payload = {}, { branch, difficulty, model, mode } = {}) {
  const options = normalizeOptions(payload.o || payload.options).map((option) => ({ ...option, text: ensureSentence(option.text).replace(/[.!?]$/u, '') }));
  const correctAnswer = resolveCorrectId(payload, options);
  const vitals = compactItems(payload.cv || payload.compactVitals || payload.vitals || []);
  const objective = compactItems(payload.co || payload.compactObjectiveData || payload.objectiveData || []);
  const stem = ensureSentence(cleanBrokenSentences(uniqueSentences(addVisibleDataToStem(payload.s || payload.stem || '', vitals, objective))));
  const visibleText = [stem, ...options.map((option) => option.text)].join(' ');
  const explanationRaw = payload.e || payload.explanation || '';
  const explanation = ensureSentence(cleanBrokenSentences(explanationRaw) || 'Bu yanıt kökteki bulgularla en uyumlu seçenektir.');
  const reasonSource = payload.r || payload.reasons || payload.f || payload.wrongOptionFeedback || payload.optionFeedback || {};
  const feedback = feedbackObject(reasonSource, correctAnswer, explanation, options, visibleText);
  return {
    id: `ai-spot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    relatedBranch: cleanText(payload.b || payload.relatedBranch || branch),
    difficulty: normalizeDifficulty(payload.d || payload.difficulty || difficulty),
    learningTarget: '',
    answerTarget: cleanText(payload.at || payload.answerTarget || 'diagnosis'),
    demographics: '',
    setting: '',
    chiefComplaint: '',
    stem,
    compactVitals: [],
    compactObjectiveData: [],
    question: ensureQuestion(payload.q || payload.question || ''),
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
    aiMeta: { provider: 'openai', remote: true, fallback: false, simplified: true, noContentLengthRules: true, deterministicQC: true },
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
  const rawOutputLimit = Number(process.env.TUS_OPENAI_MAX_OUTPUT_TOKENS || process.env.OPENAI_MAX_OUTPUT_TOKENS || 0);
  const outputLimit = Number.isFinite(rawOutputLimit) && rawOutputLimit > 0 ? rawOutputLimit : null;
  const explicitStyle = process.env.TUS_OPENAI_API_STYLE || process.env.OPENAI_API_STYLE || '';
  const useResponses = shouldUseResponsesApi(model, explicitStyle);
  const style = useResponses ? 'responses' : 'chat';
  const { signal, cancel } = createAbortSignal(timeoutMs);

  try {
    const body = useResponses
      ? {
          model,
          instructions: OPTIMIZED_TUS_SYSTEM_PROMPT,
          input: prompt,
          text: { format: { type: 'json_object' } },
          ...(modelSupportsReasoningEffort(model) ? { reasoning: { effort: 'low' } } : {}),
          ...(outputLimit ? { max_output_tokens: outputLimit } : {}),
          store: false,
        }
      : {
          model,
          messages: [
            { role: 'system', content: OPTIMIZED_TUS_SYSTEM_PROMPT },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_object' },
          ...(outputLimit ? { max_completion_tokens: outputLimit } : {}),
          ...(modelSupportsReasoningEffort(model) ? { reasoning_effort: 'low' } : {}),
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
    logAIUsage({ task: TASK_NAME, model: data.model || model, usage: data.usage || null, cached: false, apiStyle: style });
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

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });

  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }

  const branch = chooseBranch(body.branchFilter || body.branch || 'Rastgele');
  const difficulty = normalizeDifficulty(body.difficulty || body.requestedDifficulty || body.aiDifficulty || 'Orta');
  const prompt = buildUserPrompt({ branch, difficulty, variationSeed: Math.random().toString(36).slice(2, 8) });

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
