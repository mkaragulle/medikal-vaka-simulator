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
  const loose = options.find((option) => wanted.length >= 5 && (normalize(option.text).includes(wanted) || wanted.includes(normalize(option.text))));
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
  const physicalExam = normalizeItems(getByPaths(source, ['physicalExam', 'exam', 'muayene']) || []);
  const vitals = normalizeItems(getByPaths(source, ['vitals', 'compactVitals', 'cv']) || []);
  const objectiveData = normalizeItems(getByPaths(source, ['objectiveData', 'compactObjectiveData', 'co', 'supportingData']) || []);
  const clinicalStem = cleanText(getByPaths(source, ['clinicalStem', 'stem', 's', 'soruKoku', 'soruKökü', 'olgu', 'vaka', 'case', 'clinicalCase']) || '');
  const evidenceBasedReasoning = normalizeEvidence(getByPaths(source, ['evidenceBasedReasoning', 'evidenceChain', 'evidence', 'k']) || []);
  const relatedBranch = cleanText(getByPaths(source, ['branch', 'b', 'relatedBranch']) || branch);
  const explanation = cleanText(getByPaths(source, ['explanation', 'e', 'whyCorrect', 'aciklama', 'açıklama', 'rationale', 'gerekce', 'gerekçe']) || '');
  const sourceUseNote = cleanText(getByPaths(source, ['sourceUseNote', 'sourceNote']) || '');

  return {
    id: `ai-spot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    branch: relatedBranch,
    relatedBranch,
    difficulty: normalizeDifficulty(getByPaths(source, ['difficulty', 'd']) || difficulty),
    learningTarget: cleanText(getByPaths(source, ['learningTarget', 'lt', 'target']) || ''),
    answerTarget: cleanText(getByPaths(source, ['answerTarget', 'at', 'questionIntent', 'intent']) || 'diagnosis'),
    demographics: cleanText(getByPaths(source, ['demographics', 'dem']) || ''),
    setting: cleanText(getByPaths(source, ['setting', 'set']) || ''),
    chiefComplaint: cleanText(getByPaths(source, ['chiefComplaint', 'cc']) || ''),
    clinicalStem,
    stem: clinicalStem,
    physicalExam,
    compactVitals: vitals,
    vitals,
    compactObjectiveData: objectiveData,
    objectiveData,
    history: asArray(getByPaths(source, ['history', 'anamnesis', 'anamnez']) || []).map(cleanText).filter(Boolean),
    question: cleanText(getByPaths(source, ['question', 'q', 'soru', 'soruCumlesi', 'soruCümlesi']) || ''),
    options,
    correctAnswer,
    explanation,
    optionFeedback,
    wrongOptionFeedback: optionFeedback,
    evidenceBasedReasoning,
    evidenceChain: evidenceBasedReasoning,
    examPearl: cleanText(getByPaths(source, ['examPearl', 'pearl', 'p', 'teachingPoint']) || ''),
    sourceUseNote,
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
      sourceUseNote,
    },
  };
}

function assertRenderableQuestion(question = {}, { strictEducational = true } = {}) {
  const errors = [];
  if (!cleanText(question.stem || question.clinicalStem)) errors.push('soru kökü boş');
  if (!cleanText(question.question)) errors.push('soru cümlesi boş');
  if (!Array.isArray(question.options) || question.options.length !== 5) errors.push(`tam 5 seçenek yok (${question.options?.length || 0})`);
  if (!OPTION_IDS.includes(String(question.correctAnswer || '').toUpperCase())) errors.push(`correctAnswer A-E değil (${question.correctAnswer || 'boş'})`);
  if (!question.options?.some((option) => option.id === question.correctAnswer)) errors.push('correctAnswer seçeneklerle eşleşmiyor');
  if (strictEducational) {
    if (!cleanText(question.explanation)) errors.push('açıklama boş');
    const feedback = question.optionFeedback || question.wrongOptionFeedback || {};
    const missingFeedback = OPTION_IDS.filter((id) => !cleanText(feedback[id]));
    if (missingFeedback.length) errors.push(`seçenek geri bildirimi eksik (${missingFeedback.join(', ')})`);
  }
  if (errors.length) {
    const error = new Error(`AI çıktısı ekranda gösterilebilir TUS sorusu formatına çevrilemedi: ${errors.join('; ')}`);
    error.statusCode = 422;
    throw error;
  }
}


function sentenceList(value = '') {
  return cleanText(value).split(/(?<=[.!?])\s+/u).map((item) => item.trim()).filter(Boolean);
}

function wordCount(value = '') {
  const words = normalize(value).split(/\s+/u).filter((word) => word.length > 1);
  return words.length;
}

function itemToQualityText(item = '') {
  if (typeof item === 'string') return cleanText(item);
  if (item && typeof item === 'object') return cleanText([item.label, item.value, item.result, item.text, item.finding, item.meaning].filter(Boolean).join(' '));
  return '';
}

function itemArrayHasSubstance(items = [], minimum = 1) {
  return asArray(items).map(itemToQualityText).filter((text) => wordCount(text) >= 2).length >= minimum;
}

function looksLikeNonNarrativeStem(value = '') {
  const text = cleanText(value);
  if (!text) return true;
  const labelHits = (text.match(/\b(?:öykü|anamnez|fizik|muayene|laboratuvar|lab|cbc|hemogram|akut sorun|vital|tetkik|görüntüleme)\s*[:：]/giu) || []).length;
  if (labelHits >= 2) return true;
  if (labelHits && text.split(/[;；]/u).length >= 3) return true;
  if (/^(?:öykü|anamnez|fizik|muayene|laboratuvar|lab|cbc|hemogram|akut sorun)\s*[:：]/iu.test(text)) return true;
  const hasPatientFlow = /\b(?:başvur|getiril|yakınma|şikayet|sonra|önce|süredir|gündür|haftadır|aydır|giderek|başlamış|başladı|artmış|azalmış|devam etmiş|eşlik etmiş|kullanıyor|öyküsünde|daha önce|sonrasında|nedeniyle|değerlendiriliyor|yatırılıyor|izleniyor|ameliyata|poliklini|servis|acil)\b/iu.test(text);
  const looksLikeFactCard = text.split(/[;；]/u).length >= 2 && !hasPatientFlow;
  const mostlyTelegraphic = /^[^.!?]+;\s*[^.!?]+;\s*[^.!?]+/u.test(text);
  const tooShort = wordCount(text) < 25 || sentenceList(text).length < 2;
  return looksLikeFactCard || mostlyTelegraphic || tooShort;
}

function optionTextById(question = {}, id = '') {
  return question.options?.find((option) => option.id === id)?.text || '';
}

export function isBrokenOrTruncatedFeedback(value = '') {
  const text = cleanText(value);
  if (!text) return true;
  if (!/[.!?]$/u.test(text)) return true;
  if (/\b(?:ve|ile|için|çünkü|ancak|fakat|ama|bu|şu|olan|olarak|birlikte|nedeniyle|açısından|göre|karşılık|uyumlu|destekler|dışlar|elendi|elemek)\.?$/iu.test(text)) return true;
  if (/\b[A-Za-zÇĞİÖŞÜçğıöşü]\.$/u.test(text) && !/\b(?:A|B|C|D|E|H|T|B)\.$/u.test(text)) return true;
  if (/^(?:bu seçenek|bu şık|seçenek)\b[^.!?]{0,80}[.!?]?$/iu.test(text) && !/\b(?:çünkü|ancak|fakat|oysa|bu olguda|bu vakada|hangi durumda|tipik olarak|genellikle)\b/iu.test(text)) return true;
  if (/\b(?:incomplete|truncated|devamı|yarım|tamamlanamadı|bozuk metin)\b/iu.test(text)) return true;
  return false;
}

function containsLowQualityResidue(value = '') {
  const text = cleanText(value);
  return /\b(?:bu seçenek,? kökteki ana bulguları birlikte|ayırt ettirici açıklama üretilemedi|ayrıntılı açıklama eklenemedi|doğru seçenek budur|bu seçenek doğrudur|bu seçenek yanlıştır|placeholder|debug|sistem promptu|json çıktısı)\b/iu.test(text)
    || /^(?:doğru|yanlış|uygun değildir|uygun değil|çeldiricidir|akla gelebilir|kısmen doğru)[.!]?$/iu.test(text);
}

function hasCaseContext(value = '') {
  return /\b(?:bu olguda|bu vakada|burada|bu hastada|hastada|olgunun|vakanın|soru kökündeki|verilen|mevcut klinik|klinik tabloda|öyküde|muayenede|vital|tetkikte|laboratuvarda|görüntülemede)\b/iu.test(value);
}

function hasWhenCorrectTeaching(value = '') {
  return /\b(?:hangi durumda|ne zaman|genellikle|tipik olarak|daha çok|özellikle|beklenir|beklenmez|düşünülür|tercih edilir|endikedir|doğru olurdu|öncelik kazanır|uygun olurdu|kullanılır|tanısaldır|klasiktir|akla gelir)\b/iu.test(value);
}

function hasDifferentialContrast(value = '') {
  return /\b(?:ancak|fakat|ama|oysa|buna karşılık|bu nedenle|bu yüzden|ayırt|karışır|karışabilecek|dışlanır|geri planda|ön plana|destekler|desteklemez|uyumlu değildir|uyumludur|lehine|aleyhine|elendirir|eleştirir|eleyen|öne çıkaran)\b/iu.test(value);
}

function hasClinicalMeaning(value = '', optionText = '') {
  const text = normalize(value);
  const option = normalize(optionText);
  if (option && option.split(/\s+/u).some((word) => word.length >= 5 && text.includes(word))) return true;
  return /\b(?:tanı|tedavi|test|mekanizma|komplikasyon|bulgu|yaklaşım|endikasyon|kontrendikasyon|laboratuvar|görüntüleme|klinik|patofizyoloji|enfeksiyon|inflamasyon|cerrahi|farmakolojik|hormonal|metabolik)\b/iu.test(value);
}

export function isEducationalFeedback(value = '', optionText = '', question = {}, id = '') {
  const text = cleanText(value);
  const isCorrect = id && id === question.correctAnswer;
  if (!text || containsLowQualityResidue(text) || isBrokenOrTruncatedFeedback(text)) return false;
  const comparable = normalize(text);
  const optionComparable = normalize(optionText);
  if (optionComparable && (comparable === optionComparable || comparable === `${optionComparable} dogru` || comparable === `${optionComparable} yanlis`)) return false;
  const enoughSubstance = wordCount(text) >= (isCorrect ? 24 : 34) || sentenceList(text).length >= (isCorrect ? 2 : 3);
  if (!enoughSubstance) return false;
  if (!hasClinicalMeaning(text, optionText)) return false;
  if (!hasCaseContext(text)) return false;
  if (!hasDifferentialContrast(text)) return false;
  if (!isCorrect && !hasWhenCorrectTeaching(text)) return false;
  return true;
}

function isShallowExplanation(value = '') {
  const text = cleanText(value);
  if (!text) return true;
  if (isBrokenOrTruncatedFeedback(text)) return true;
  if (containsLowQualityResidue(text)) return true;
  const hasReasoning = /\b(?:çünkü|bu nedenle|bu olguda|bu vakada|ancak|fakat|oysa|ile uyumlu|destekler|beklenir|beklenmez|ayırt|tanı|tedavi|mekanizma|laboratuvar|görüntüleme|muayene|vital|patofizyoloji|klinik|mortalite|morbidite|endikasyon|kontrendikasyon|öncelik|histopatolojik|biyopsi|akım sitometri|cerrahi)\b/iu.test(text);
  return !hasReasoning || wordCount(text) < 40;
}

function questionLooksMixedTarget(questionText = '') {
  const text = normalize(questionText);
  const groups = [
    /\b(tani|hangisidir|olasi tani)\b/u,
    /\b(tedavi|yaklasim|basamak|ilk islem|sonraki adim|yapilmalidir)\b/u,
    /\b(test|tetkik|dogrulama|inceleme|goruntuleme)\b/u,
    /\b(mekanizma|patofizyoloji|enzim|reseptor)\b/u,
    /\b(komplikasyon|prognoz|beklenen|beklenmeyen)\b/u,
  ];
  return groups.filter((pattern) => pattern.test(text)).length >= 3;
}

function hasAnswerLeak(question = {}) {
  const correctText = optionTextById(question, question.correctAnswer);
  const answer = normalize(correctText);
  if (!answer || answer.length < 6) return false;
  const fields = [question.stem, question.clinicalStem, question.question, ...(question.evidenceChain || []), ...(question.evidenceBasedReasoning || [])]
    .map((item) => normalize(itemToQualityText(item)))
    .filter(Boolean);
  const answerWords = answer.split(/\s+/u).filter((word) => word.length >= 5);
  return fields.some((field) => field.includes(answer) || (answerWords.length >= 2 && answerWords.filter((word) => field.includes(word)).length >= Math.ceil(answerWords.length * 0.85)));
}

function evidenceHasReasoning(evidence = []) {
  const items = asArray(evidence).map(itemToQualityText).filter(Boolean);
  if (items.length < 2) return false;
  return items.some((item) => /\b(?:gösterir|destekler|düşündürür|uyumludur|neden olur|açıklar|lehinedir|aleyhinedir|önceliklendirir|dışlar|kanıtlar|işaret eder)\b/iu.test(item));
}

function findEducationalDefects(question = {}) {
  const defects = [];
  const stem = question.stem || question.clinicalStem || '';
  const feedback = question.optionFeedback || question.wrongOptionFeedback || {};
  const vitals = question.vitals || question.compactVitals || [];
  const objectiveData = question.objectiveData || question.compactObjectiveData || [];
  const evidence = question.evidenceBasedReasoning || question.evidenceChain || [];

  if (looksLikeNonNarrativeStem(stem)) defects.push('clinicalStem gerçek anamnez akışı taşımıyor; kısa veri fişi, tek satırlık özet veya başlıklı liste gibi duruyor.');
  if (!itemArrayHasSubstance(question.physicalExam || [], 1)) defects.push('physicalExam boş veya soru için klinik muayene bulgusu yetersiz.');
  if (!itemArrayHasSubstance(vitals, 3)) defects.push('vitals boş veya klinik ağırlığı gösterecek yeterli vital bulgu içermiyor.');
  if (!itemArrayHasSubstance(objectiveData, 1)) defects.push('objectiveData boş veya soruyu çözdürecek objektif veri içermiyor.');
  if (!cleanText(question.question) || questionLooksMixedTarget(question.question)) defects.push('question tek hedefli değil veya birden fazla karar alanını karıştırıyor.');
  if (!Array.isArray(question.options) || question.options.length !== 5) defects.push(`options tam beş adet değil (${question.options?.length || 0}).`);
  if (!OPTION_IDS.includes(String(question.correctAnswer || '').toUpperCase()) || !question.options?.some((option) => option.id === question.correctAnswer)) defects.push('correctAnswer A-E seçenekleriyle eşleşmiyor.');
  if (isShallowExplanation(question.explanation)) defects.push('explanation vaka özelinde yeterli klinik zincir, patofizyoloji/karar mantığı ve ayırıcı gerekçe vermiyor.');

  const missingFeedback = OPTION_IDS.filter((id) => !cleanText(feedback[id]));
  if (missingFeedback.length) defects.push(`optionFeedback eksik: ${missingFeedback.join(', ')}.`);
  const brokenFeedback = OPTION_IDS.filter((id) => cleanText(feedback[id]) && isBrokenOrTruncatedFeedback(feedback[id]));
  if (brokenFeedback.length) defects.push(`optionFeedback yarım/bozuk görünüyor: ${brokenFeedback.join(', ')}.`);
  const shallow = OPTION_IDS.filter((id) => cleanText(feedback[id]) && !isEducationalFeedback(feedback[id], optionTextById(question, id), question, id));
  if (shallow.length) defects.push(`optionFeedback yayınlanabilir öğreticilik düzeyinde değil: ${shallow.join(', ')}.`);

  if (!evidenceHasReasoning(evidence)) defects.push('evidenceBasedReasoning vaka verisi ile klinik anlamı bağlayan yeterli kanıt zinciri içermiyor.');
  if (hasAnswerLeak(question)) defects.push('answer leak riski var; doğru seçenek kök/kanıt alanlarında doğrudan veya biçimsel olarak ele veriliyor.');

  const optionTexts = question.options?.map((option) => cleanText(option.text)).filter(Boolean) || [];
  if (optionTexts.length === 5) {
    const average = optionTexts.reduce((sum, text) => sum + text.length, 0) / 5;
    const hasLongOutlier = optionTexts.some((text) => text.length > Math.max(150, average * 2.4));
    const duplicateOptions = new Set(optionTexts.map(normalize)).size !== optionTexts.length;
    if (hasLongOutlier) defects.push('seçeneklerden biri diğerlerine göre belirgin uzun ve answer leak riski oluşturuyor.');
    if (duplicateOptions) defects.push('seçeneklerde tekrar veya anlamca aynı görünen ifade var.');
  }
  return defects;
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
    optionFeedback: question.optionFeedback || question.wrongOptionFeedback || {},
    evidenceBasedReasoning: question.evidenceBasedReasoning || question.evidenceChain || [],
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
    assertRenderableQuestion(rewritten, { strictEducational: false });
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
    const finishReason = data?.choices?.[0]?.finish_reason || data?.status || '';
    const incompleteReason = data?.incomplete_details?.reason || data?.error?.message || '';
    if (/length|incomplete|max_output|max_tokens|content_filter/i.test(String(finishReason || incompleteReason))) {
      const error = new Error(`OpenAI çıktı tamamlanmadan kesildi: ${[finishReason, incompleteReason].filter(Boolean).join(' / ')}`);
      error.statusCode = 502;
      throw error;
    }
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
    repeatContext: body.repeatContext || body.lastReviewState || body.previousQuestionSummary || '',
  });

  try {
    const result = await callOpenAI(prompt);
    let question = normalizeGeneratedQuestion(result.payload, { branch, difficulty, model: result.model, mode: result.mode });
    assertRenderableQuestion(question, { strictEducational: false });
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
