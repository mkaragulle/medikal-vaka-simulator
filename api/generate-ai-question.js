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
const PROMPT_VERSION = 'klinikiq-v419-branch-only-no-topic-steering';
const SCHEMA_VERSION = 'simple-ai-spot-v4-compact';
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

const FORBIDDEN_RESIDUE = /\b(?:A feedback|B feedback|C feedback|D feedback|E feedback|TUS ipucu\.?|öğrenme hedefi\s*:|hedeflenen ayırıcı\s*:|kısıtlama\s*:|gereken klinik soru\s*:|ek klinik verilerde|tetkik ve destekleyici bulgularda)\b/iu;
const PATIENT_DATA_TERMS = [
  'bt', 'mr', 'mri', 'usg', 'doppler', 'anjiyo', 'anjiyografi', 'laktat', 'sodyum', 'na', 'potasyum', 'kalsiyum',
  'trigliserid', 'troponin', 'd-dimer', 'hco3', 'ph', 'pco2', 'po2', 'osmolalite', 'osmolarite', 'ggt', 'ast', 'alt',
  'kreatinin', 'trombosit', 'hemoglobin', 'hb', 'wbc', 'crp', 'pct', 'prokalsitonin', 'galaktomannan', 'arr', 'renin',
  'aldosteron', 'kortizol', 'acth', 'grade', 'evre', 'çap', 'cm', 'mm', 'invazyon', 'metastaz', 'peritonit', 'dvt',
  'asidorezistans', 'filament', 'hcg', 'β-hcg', 'aaST', 'nekroz', 'gaz', 'oklüzyon', 'stenoz', 'dilatasyon',
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
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/(?:\.\.\.|…)+/g, '')
    .trim();
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
  let text = cleanText(value);
  text = text
    .replace(/^\s*[A-E]\s*\)\s*[A-E]\s*\)?\s*/iu, '')
    .replace(/^\s*[A-E]\s+feedback\s*[:：.-]?\s*/iu, '')
    .replace(/^\s*(?:Doğru cevap|Seçimin|TUS ipucu|Temel mantık|Mekanizma ve sınav mantığı)\s*[:：.-]?\s*$/iu, '')
    .replace(/\b(?:öğrenme hedefi|hedeflenen ayırıcı|kısıtlama|gereken klinik soru)\s*[:：][^.?!]*(?:[.?!]|$)/giu, ' ')
    .replace(/\b(?:Ek klinik verilerde|Tetkik ve destekleyici bulgularda)\s*[:：]?\s*/giu, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text;
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

function normalize(value = '') {
  return cleanText(value)
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/[âîû]/g, (match) => ({ â: 'a', î: 'i', û: 'u' }[match] || match))
    .replace(/[^a-z0-9çğıöşü\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function chooseBranch(value = '') {
  const raw = cleanText(value || '');
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
    if (isEmptyLike(label) || isEmptyLike(value) || FORBIDDEN_RESIDUE.test(`${label} ${value}`)) return;
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
  const hits = [
    /\b(?:serum|idrar|plazma|laktat|sodyum|osmolalite|trigliserid|troponin|hcg|β-hcg|bt|mr|mri|usg|ekg|doppler|kortizol|acth|renin|aldosteron)\b/iu,
    /\b(?:mmol\/L|mEq\/L|mOsm\/kg|IU\/L|mg\/dL|ng\/mL|mmHg|%)\b/iu,
    /[:：=]/u,
  ].filter((pattern) => pattern.test(text)).length;
  return hits >= 2;
}

function parseObjectiveSentence(sentence = '') {
  const cleaned = standardizeTurkishMedicalText(sentence)
    .replace(/^(?:ek klinik verilerde|tetkik ve destekleyici bulgularda|laboratuvar verileri|tetkiklerde|vital bulgu(?:lar)?|ek klinik veri)\s*[:：]?\s*/iu, '')
    .replace(/[.?!]$/u, '');
  return cleaned.split(/;|,(?=\s*(?:serum|idrar|plazma|kan|bt|mr|mri|usg|ekg|transvajinal|vital|servikal|troponin|laktat|hcg|β-hcg)\b)/iu)
    .map((part) => part.trim())
    .map((part) => {
      if (!part) return null;
      const colon = part.match(/^([^:：=]{2,60})\s*[:：=]\s*(.+)$/u);
      if (colon) return { label: colon[1], value: colon[2] };
      const unit = part.match(/^(.{2,60}?)\s+([-+]?\d[\d.,]*\s*(?:mmol\/L|mEq\/L|mOsm\/kg|IU\/L|mg\/dL|ng\/mL|mmHg|%|cm|mm)\b.*)$/iu);
      if (unit) return { label: unit[1], value: unit[2] };
      const status = part.match(/^(.{2,60}?)\s+(stabil|os kapalı|yok|var|normal|düşük|yüksek|pozitif|negatif)$/iu);
      if (status) return { label: status[1], value: status[2] };
      return { label: 'Veri', value: part };
    })
    .filter(Boolean);
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

function buildStoryStem(payload = {}, { branch = '', compactVitals = [], compactObjectiveData = [] } = {}) {
  let stem = standardizeTurkishMedicalText(payload.s || payload.stem || '');
  stem = stem
    .replace(/\b(?:öğrenme hedefi|hedeflenen ayırıcı|kısıtlama|gereken klinik soru)\s*[:：][^.?!]*(?:[.?!]|$)/giu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (stem && !looksLikeObjectiveSentence(stem) && !FORBIDDEN_RESIDUE.test(stem)) return stem;

  const dem = standardizeTurkishMedicalText(payload.dem || payload.demographics || 'Hasta');
  const setting = standardizeTurkishMedicalText(payload.set || payload.setting || 'klinik değerlendirmede');
  const complaint = standardizeTurkishMedicalText(payload.cc || payload.chiefComplaint || 'yakınmaları');
  const branchText = standardizeTurkishMedicalText(payload.b || payload.relatedBranch || branch || 'TUS');
  const lowerSetting = setting ? setting.charAt(0).toLocaleLowerCase('tr') + setting.slice(1) : 'klinik değerlendirmede';
  const intro = `${dem}, ${complaint} nedeniyle ${lowerSetting} değerlendirilmektedir.`;
  const context = /kadın hastalıkları|doğum/iu.test(branchText)
    ? 'Gebelik durumu, muayene bulguları ve objektif veriler birlikte yorumlanarak izlem planlanacaktır.'
    : 'Öykü, muayene ve objektif veriler birlikte yorumlanarak klinik karar verilecektir.';
  return `${intro} ${context}`;
}

function normalizeOptions(raw = []) {
  const arr = Array.isArray(raw)
    ? raw
    : raw && typeof raw === 'object'
      ? OPTION_IDS.map((id) => raw[id] || raw[id.toLowerCase()] || raw[`option${id}`])
      : [];
  return OPTION_IDS.map((id, index) => {
    const source = arr.find((item) => typeof item === 'object' && String(item?.id || '').toUpperCase() === id) ?? arr[index];
    let text = standardizeTurkishMedicalText(typeof source === 'string' ? source : source?.text || source?.label || source?.value || '');
    text = text.replace(/^\s*[A-E]\s*\)\s*/iu, '').trim();
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
      : 'Bu seçenek aynı karar alanında düşünülebilir; ancak olgudaki ayırt ettirici ipuçları başka seçeneği destekler.';
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
    const repaired = candidate
      .replace(/,\s*([}\]])/g, '$1')
      .replace(/[\u0000-\u001F\u007F]+/g, ' ');
    return JSON.parse(repaired);
  }
}

function normalizeGeneratedQuestion(payload = {}, { branch, difficulty, model, mode, repaired = false } = {}) {
  let compactVitals = compactItems(payload.cv || payload.compactVitals || payload.vitals || [], 5);
  let compactObjectiveData = compactItems(payload.co || payload.compactObjectiveData || payload.objectiveData || [], 8);
  const separated = separateStemAndData(payload.s || payload.stem || '', compactObjectiveData);
  compactObjectiveData = separated.objectiveData;
  const stemPayload = { ...payload, s: separated.storyText || payload.s || payload.stem || '' };
  const storyStem = buildStoryStem(stemPayload, { branch, compactVitals, compactObjectiveData });
  const options = normalizeOptions(payload.o || payload.options);
  const correctAnswer = resolveCorrectId(payload, options);
  const explanation = ensureSentence(standardizeTurkishMedicalText(payload.e || payload.explanation || ''));

  const question = {
    id: `ai-spot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    relatedBranch: standardizeTurkishMedicalText(payload.b || payload.relatedBranch || branch),
    difficulty: normalizeDifficulty(payload.d || payload.difficulty || difficulty),
    learningTarget: standardizeTurkishMedicalText(payload.lt || payload.learningTarget || ''),
    answerTarget: cleanText(payload.at || payload.answerTarget || 'diagnosis'),
    demographics: standardizeTurkishMedicalText(payload.dem || payload.demographics || ''),
    setting: standardizeTurkishMedicalText(payload.set || payload.setting || ''),
    chiefComplaint: standardizeTurkishMedicalText(payload.cc || payload.chiefComplaint || ''),
    stem: ensureSentence(storyStem),
    compactVitals,
    compactObjectiveData,
    question: ensureQuestion(standardizeTurkishMedicalText(payload.q || payload.question || '')),
    options,
    correctAnswer,
    explanation,
    wrongOptionFeedback: feedbackObject(payload.f || payload.wrongOptionFeedback || payload.optionFeedback || {}, correctAnswer, explanation),
    evidenceChain: asArray(payload.k || payload.evidenceChain).map(standardizeTurkishMedicalText).filter(Boolean).slice(0, 3),
    examPearl: ensureSentence(standardizeTurkishMedicalText(payload.p || payload.examPearl || '')),
    managementSteps: asArray(payload.m || payload.managementSteps).map(standardizeTurkishMedicalText).filter(Boolean).slice(0, 3),
    provider: 'openai',
    openAIModel: model || '',
    openAIMode: mode || '',
    promptVersion: PROMPT_VERSION,
    schemaVersion: SCHEMA_VERSION,
    aiMeta: { provider: 'openai', remote: true, fallback: false, repaired, simplified: true },
  };

  if (!question.relatedBranch) question.relatedBranch = branch;
  if (!question.difficulty) question.difficulty = normalizeDifficulty(difficulty);
  if (!question.answerTarget) question.answerTarget = 'diagnosis';
  if (!question.examPearl) question.examPearl = 'Soru kökündeki karar verdirici ipucu doğru cevabın anahtarıdır.';
  question.evidenceChain = question.evidenceChain.filter((item) => !FORBIDDEN_RESIDUE.test(item));
  return question;
}

function visibleCaseText(question = {}) {
  return normalize([
    question.stem,
    ...asArray(question.compactVitals).flatMap((item) => [item.label, item.value]),
    ...asArray(question.compactObjectiveData).flatMap((item) => [item.label, item.value]),
  ].filter(Boolean).join(' '));
}

function explanationText(question = {}) {
  return [
    question.explanation,
    question.examPearl,
    ...Object.values(question.wrongOptionFeedback || {}),
    ...asArray(question.evidenceChain),
  ].filter(Boolean).join(' ');
}

function dataTermsIn(text = '') {
  const normalized = normalize(text);
  return PATIENT_DATA_TERMS.filter((term) => {
    const normalizedTerm = normalize(term);
    if (normalizedTerm.length <= 2) return new RegExp(`\\b${normalizedTerm}\\b`, 'u').test(normalized);
    return normalized.includes(normalizedTerm);
  });
}

function hasAnswerLeak(question = {}) {
  const correct = question.options.find((option) => option.id === question.correctAnswer)?.text || '';
  const correctNorm = normalize(correct);
  if (correctNorm.length < 6) return false;
  const riskyText = normalize([question.stem, question.learningTarget].filter(Boolean).join(' '));
  if (riskyText.includes(correctNorm)) return true;
  const words = correctNorm.split(/\s+/u).filter((word) => word.length >= 5);
  if (words.length < 2) return false;
  return words.filter((word) => riskyText.includes(word)).length >= Math.ceil(words.length * 0.8);
}

function optionLengthLeak(question = {}) {
  const options = asArray(question.options);
  const correct = options.find((option) => option.id === question.correctAnswer);
  if (!correct) return false;
  const lengths = options.map((option) => cleanText(option.text).length).filter(Boolean);
  const avgWrong = lengths.filter((_, index) => options[index]?.id !== question.correctAnswer).reduce((a, b) => a + b, 0) / Math.max(1, options.length - 1);
  return cleanText(correct.text).length > Math.max(90, avgWrong * 1.75);
}

function findRepairableDefects(question = {}) {
  const defects = [];
  const finalText = [question.stem, question.question, question.explanation, question.examPearl, ...Object.values(question.wrongOptionFeedback || {}), ...question.options.map((option) => option.text)].join(' ');
  if (FORBIDDEN_RESIDUE.test(finalText)) defects.push('İç rehber/debug/placeholder kalıntısı var.');
  if (looksLikeObjectiveSentence(question.stem)) defects.push('Soru kökü hikâye değil, ham veri listesi gibi duruyor.');
  const visible = visibleCaseText(question);
  const feedbackTerms = dataTermsIn(explanationText(question));
  const missingTerms = feedbackTerms.filter((term) => !visible.includes(normalize(term)));
  if (missingTerms.length) defects.push(`Feedbackte kökte/veri panelinde görünmeyen hasta-özel veri var: ${missingTerms.slice(0, 4).join(', ')}.`);
  if (hasAnswerLeak(question)) defects.push('Soru kökü veya öğrenme hedefi doğru cevabı fazla açık veriyor.');
  if (optionLengthLeak(question)) defects.push('Doğru seçenek diğer seçeneklerden belirgin uzun.');
  // Advisory-style medical nuance checks should not trigger a second AI call.
  // Keep this repair pass only for visible product defects such as hidden patient data,
  // placeholders, story/data mixing, answer leak or option-length leak.
  return defects.slice(0, 5);
}

function assertStructuralQuestion(question = {}) {
  const errors = [];
  if (!cleanText(question.stem)) errors.push('soru kökü boş');
  if (!cleanText(question.question)) errors.push('soru cümlesi boş');
  if (!Array.isArray(question.options) || question.options.length !== 5) errors.push(`tam 5 seçenek yok (${question.options?.length || 0})`);
  if (!OPTION_IDS.includes(String(question.correctAnswer || '').toUpperCase())) errors.push(`correctAnswer A-E değil (${question.correctAnswer || 'boş'})`);
  if (!question.options.some((option) => option.id === question.correctAnswer)) errors.push('correctAnswer seçeneklerle eşleşmiyor');
  if (!cleanText(question.explanation)) errors.push('açıklama boş');
  if (errors.length) {
    const error = new Error(`Model JSON döndü ama temel soru alanları eksik: ${errors.join('; ')}`);
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

function createAbortSignal(timeoutMs, label = 'OpenAI isteği') {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    const error = new Error(`${label} ${Math.round(timeoutMs / 1000)} saniye içinde tamamlanamadı.`);
    error.name = 'AbortError';
    error.statusCode = 504;
    try { controller.abort(error); } catch { controller.abort(); }
  }, timeoutMs);
  return { signal: controller.signal, cancel: () => clearTimeout(timeout) };
}

function isAbortLikeError(error) {
  return error?.name === 'AbortError'
    || /aborted|abort|signal is aborted|timeout|timed out/i.test(String(error?.message || error || ''));
}

async function callOpenAI(prompt, { systemPrompt = OPTIMIZED_TUS_SYSTEM_PROMPT, maxTokens = null, purpose = TASK_NAME } = {}) {
  const apiKey = process.env.TUS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const error = new Error('OPENAI_API_KEY tanımlı değil. Yerel fallback kapalıdır.');
    error.statusCode = 503;
    throw error;
  }

  const model = resolveModelForScope('TUS');
  const baseUrl = (process.env.TUS_OPENAI_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const timeoutMs = envNumber('TUS_OPENAI_PER_REQUEST_TIMEOUT_MS', envNumber('OPENAI_PER_REQUEST_TIMEOUT_MS', 75000));
  const outputLimit = maxTokens || envNumber('TUS_OPENAI_MAX_OUTPUT_TOKENS', envNumber('OPENAI_MAX_OUTPUT_TOKENS', 1100));
  const explicitStyle = process.env.TUS_OPENAI_API_STYLE || process.env.OPENAI_API_STYLE || '';
  const useResponses = shouldUseResponsesApi(model, explicitStyle);
  const style = useResponses ? 'responses' : 'chat';
  const reasoningEffort = safeReasoningEffort(process.env.TUS_OPENAI_REASONING_EFFORT || process.env.OPENAI_REASONING_EFFORT || defaultReasoningEffortForProfile('TUS'));
  const verbosity = safeVerbosity(process.env.TUS_OPENAI_VERBOSITY || process.env.OPENAI_VERBOSITY || defaultVerbosityForProfile('TUS'));
  const { signal, cancel } = createAbortSignal(timeoutMs, purpose === TASK_NAME ? 'TUS soru üretimi' : 'TUS soru düzeltme');

  try {
    const body = useResponses
      ? {
          model,
          instructions: systemPrompt,
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
            { role: 'system', content: systemPrompt },
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
        const timeoutError = new Error(`${purpose === TASK_NAME ? 'TUS soru üretimi' : 'TUS soru düzeltme'} zaman aşımına uğradı. Model yanıtı tamamlayamadı; lütfen tekrar deneyin veya daha hızlı model/timeout ayarı kullanın.`);
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
    logAIUsage({ task: purpose, model: data.model || model, usage: data.usage || null, cached: false, apiStyle: style });
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

function compactPayloadFromQuestion(question = {}) {
  return {
    b: question.relatedBranch,
    d: question.difficulty,
    lt: question.learningTarget,
    at: question.answerTarget,
    dem: question.demographics,
    set: question.setting,
    cc: question.chiefComplaint,
    s: question.stem,
    cv: question.compactVitals,
    co: question.compactObjectiveData,
    q: question.question,
    o: question.options.map((option) => option.text),
    c: question.correctAnswer,
    e: question.explanation,
    f: OPTION_IDS.map((id) => question.wrongOptionFeedback?.[id] || ''),
    k: question.evidenceChain,
    p: question.examPearl,
    m: question.managementSteps || [],
  };
}

const REPAIR_SYSTEM_PROMPT = `Mevcut Türkçe TUS soru JSON'unu yeniden üretmeden düzelt. Sadece geçerli kompakt JSON döndür. Kök hikâye gibi aksın; ham lab/vital/görüntüleme verilerini cv/co'ya ayır. Feedbackte kökte/cv/co'da olmayan hasta-özel veriyi ya köke/veri paneline ekle ya feedbackten çıkar. İç rehber/debug/placeholder kalıntılarını sil. Şıkları benzer uzunlukta tut. Türkçe tıp dilini düzelt. Doğru cevabı yalnızca tıbben zorunluysa değiştir.`;

async function maybeRepairQuestion(question, defects, context) {
  const repairEnabled = String(process.env.TUS_AI_ENABLE_REPAIR ?? 'true').toLowerCase() !== 'false';
  if (!repairEnabled || !defects.length) return question;
  const prompt = `Sorunlar: ${defects.join(' | ')}\nJSON: ${JSON.stringify(compactPayloadFromQuestion(question))}`;
  try {
    const result = await callOpenAI(prompt, { systemPrompt: REPAIR_SYSTEM_PROMPT, maxTokens: envNumber('TUS_OPENAI_REPAIR_MAX_OUTPUT_TOKENS', 800), purpose: `${TASK_NAME}:repair` });
    const repaired = normalizeGeneratedQuestion(result.payload, { ...context, model: result.model, mode: result.mode, repaired: true });
    assertStructuralQuestion(repaired);
    repaired.aiMeta = { ...(repaired.aiMeta || {}), repaired: true, repairDefects: defects.slice(0, 5) };
    return repaired;
  } catch (error) {
    question.aiMeta = { ...(question.aiMeta || {}), repairFailed: true, repairError: error?.message || String(error), repairDefects: defects.slice(0, 5) };
    return question;
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
    let question = normalizeGeneratedQuestion(result.payload, { branch, difficulty, model: result.model, mode: result.mode });
    assertStructuralQuestion(question);
    const defects = findRepairableDefects(question);
    question = await maybeRepairQuestion(question, defects, { branch, difficulty, model: result.model, mode: result.mode });
    assertStructuralQuestion(question);
    const remainingDefects = findRepairableDefects(question);
    question.aiMeta = { ...(question.aiMeta || {}), qualityWarnings: remainingDefects.slice(0, 5), promptVersion: PROMPT_VERSION };
    return sendJson(response, 200, { ok: true, provider: 'openai', fallback: false, repaired: Boolean(question.aiMeta?.repaired), question });
  } catch (error) {
    return sendJson(response, error?.statusCode || 502, {
      ok: false,
      provider: 'openai',
      fallback: false,
      error: error?.message || 'AI soru üretimi başarısız oldu.',
    });
  }
}
