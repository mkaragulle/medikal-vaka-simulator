const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const PROMPT_VERSION = 'klinikiq-simple-tus-v3-feedback-tight';
const SCHEMA_VERSION = 'simple-ai-spot-v1';

const ALLOWED_BRANCHES = [
  'İç Hastalıkları',
  'Çocuk Sağlığı ve Hastalıkları',
  'Genel Cerrahi',
  'Kadın Hastalıkları ve Doğum',
  'Nöroloji',
  'Kardiyoloji',
  'Tıbbi Mikrobiyoloji',
  'Tıbbi Farmakoloji',
  'Acil Tıp',
  'Romatoloji',
  'Göğüs Hastalıkları',
  'Ortopedi',
  'Anatomi',
  'Histoloji ve Embriyoloji',
  'Tıbbi Biyokimya',
  'Tıbbi Patoloji',
];

const ANSWER_TARGETS = [
  'diagnosis',
  'first_step',
  'next_step',
  'treatment',
  'diagnostic_test',
  'lab_interpretation',
  'mechanism',
  'complication',
  'prevention',
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

function normalize(value = '') {
  return cleanText(value)
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/[âîû]/g, (match) => ({ â: 'a', î: 'i', û: 'u' }[match] || match))
    .replace(/[^a-z0-9çğıöşü\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stableHash(value = '') {
  const text = normalize(value);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `q${(hash >>> 0).toString(36)}`;
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function chooseBranch(branchFilter = 'random') {
  const raw = String(branchFilter || 'random').trim();
  if (!raw || ['random', 'rastgele', 'Rastgele'].includes(raw)) {
    return ALLOWED_BRANCHES[Math.floor(Math.random() * ALLOWED_BRANCHES.length)];
  }
  return raw;
}

function normalizeOptions(rawOptions = []) {
  const arr = Array.isArray(rawOptions) ? rawOptions : [];
  return OPTION_IDS.map((id, index) => {
    const source = arr.find((item) => String(item?.id || '').toUpperCase() === id) ?? arr[index];
    const text = cleanText(typeof source === 'string' ? source : source?.text || source?.label || '');
    return { id, text };
  }).filter((item) => item.text);
}

function compactItems(items = [], max = 8) {
  const seen = new Set();
  const out = [];
  asArray(items).forEach((item) => {
    const label = cleanText(typeof item === 'string' ? item.split(/[:：]/u)[0] : item?.label || item?.name || item?.parameter || item?.title || '');
    const value = cleanText(typeof item === 'string' ? item.split(/[:：]/u).slice(1).join(':') : item?.value || item?.result || item?.text || '');
    if (!label || !value) return;
    const key = normalize(`${label} ${value}`);
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ label, value });
  });
  return out.slice(0, max);
}

function makeSignature(question = {}) {
  const options = normalizeOptions(question.options).map((item) => item.text).sort().join(' | ');
  const correct = normalizeOptions(question.options).find((item) => item.id === String(question.correctAnswer || '').toUpperCase())?.text || '';
  return `simple-${stableHash([
    question.relatedBranch,
    question.title,
    question.learningTarget,
    question.stem,
    question.question,
    correct,
    options,
  ].filter(Boolean).join(' :: '))}`;
}

function getCorrectText(question = {}) {
  const options = normalizeOptions(question.options);
  const correctId = String(question.correctAnswer || '').trim().toUpperCase();
  return options.find((item) => item.id === correctId)?.text || '';
}


function containsAnswerLeak(text = '', correct = '') {
  const value = normalize(text);
  const answer = normalize(correct);
  if (!value || !answer || answer.length < 5) return false;
  if (value.includes(answer)) return true;
  const answerWords = answer.split(/\s+/u).filter((word) => word.length >= 4);
  if (answerWords.length >= 2) {
    const hits = answerWords.filter((word) => value.includes(word)).length;
    return hits >= Math.ceil(answerWords.length * 0.8);
  }
  return false;
}

function getPreAnswerDataText(question = {}) {
  return [
    question.title,
    question.stem,
    question.question,
    ...compactItems(question.compactVitals || question.vitals || [], 5).flatMap((item) => [item.label, item.value]),
    ...compactItems(question.compactObjectiveData || question.objectiveData || [], 8).flatMap((item) => [item.label, item.value]),
  ].filter(Boolean).join(' | ');
}

function hasDuplicateFeedbackSentences(question = {}) {
  const pieces = [
    question.explanation,
    question.examPearl,
    ...asArray(question.evidenceChain),
    ...Object.values(question.wrongOptionFeedback || {}),
  ].filter(Boolean);
  const seen = new Set();
  for (const piece of pieces) {
    const sentences = cleanText(piece).split(/(?<=[.!?])\s+/u).map(normalize).filter((sentence) => sentence.length > 24);
    for (const sentence of sentences) {
      if (seen.has(sentence)) return true;
      seen.add(sentence);
    }
  }
  return false;
}

function isManagementTarget(answerTarget = '') {
  return /^(first_step|next_step|treatment|prevention)$/iu.test(cleanText(answerTarget));
}

function collectStrings(value, output = []) {
  if (typeof value === 'string') output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, output));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectStrings(item, output));
  return output;
}


function stripFeedbackLabel(value = '') {
  return cleanText(value)
    .replace(/^(?:TUS\s*ipucu|Spot\s*bilgi|Hap\s*bilgi|Sınav\s*notu)\s*[:：-]\s*/iu, '')
    .trim();
}

function words(value = '') {
  return normalize(value).split(/\s+/u).filter((word) => word.length >= 4);
}

const TITLE_STOP_WORDS = new Set(['klinik', 'olgu', 'oluda', 'soru', 'tus', 'spot', 'yorum', 'yorumu', 'karar', 'degerlendirme', 'paterni', 'yaklasim', 'uygun', 'hasta', 'hastada', 'verisi']);

function titleLooksDetached(question = {}, title = '') {
  const titleWords = words(title).filter((word) => !TITLE_STOP_WORDS.has(word));
  if (!titleWords.length) return false;
  const context = normalize([
    question.chiefComplaint,
    question.setting,
    question.stem,
    ...compactItems(question.compactVitals || question.vitals || [], 5).flatMap((item) => [item.label, item.value]),
    ...compactItems(question.compactObjectiveData || question.objectiveData || [], 8).flatMap((item) => [item.label, item.value]),
  ].filter(Boolean).join(' '));
  if (!context) return false;
  const overlap = titleWords.filter((word) => context.includes(word)).length;
  if (overlap > 0) return false;
  // Very broad non-spoiler titles may not share exact words, but stale titles usually contain a specific unrelated clinical object.
  return titleWords.length >= 2 && !/(laboratuvar|objektif|vital|elektrolit|mekanizma|anatomik|patolojik|farmakolojik|mikrobiyolojik)/iu.test(title);
}

function makeSafeTitle(question = {}, correctText = '') {
  const complaint = cleanText(question.chiefComplaint || '');
  if (complaint && complaint.length >= 4 && !containsAnswerLeak(complaint, correctText)) return complaint.replace(/[.!?]+$/u, '');
  const stemFirst = cleanText(question.stem || '').split(/(?<=[.!?])\s+/u)[0] || '';
  const match = stemFirst.match(/(?:nedeniyle|ile)\s+başvur/iu) ? stemFirst.replace(/^(?:\d+\s*yaşında|erişkin|çocuk|kadın|erkek|hasta)[^,]*,?\s*/iu, '') : '';
  if (match && match.length >= 8 && !containsAnswerLeak(match, correctText)) return truncateTitle(match);
  if (compactItems(question.compactObjectiveData || [], 8).length) return 'Objektif veri yorumu';
  if (compactItems(question.compactVitals || [], 5).length) return 'Vital bulgularla klinik değerlendirme';
  return 'Klinik karar sorusu';
}

function truncateTitle(value = '') {
  const text = cleanText(value).replace(/\s+nedeniyle.*$/iu, '').replace(/\s+ile\s+başvur.*$/iu, '').replace(/[.!?]+$/u, '');
  return text.length > 64 ? `${text.slice(0, 61).replace(/\s+\S*$/u, '')}` : text;
}

function isBasicScienceBranch(branch = '') {
  return /anatomi|histoloji|embriyoloji|biyokimya|patoloji|farmakoloji|mikrobiyoloji|temel bilim/iu.test(cleanText(branch));
}

function selectAnswerTarget(branch = '') {
  const value = normalize(branch);
  if (/anatomi/.test(value)) return Math.random() < 0.75 ? 'mechanism' : 'complication';
  if (/histoloji|embriyoloji/.test(value)) return Math.random() < 0.7 ? 'mechanism' : 'diagnosis';
  if (/biyokimya/.test(value)) return Math.random() < 0.65 ? 'mechanism' : 'lab_interpretation';
  if (/patoloji/.test(value)) return Math.random() < 0.75 ? 'diagnosis' : 'mechanism';
  if (/farmakoloji/.test(value)) return Math.random() < 0.6 ? 'mechanism' : 'treatment';
  return ANSWER_TARGETS[Math.floor(Math.random() * ANSWER_TARGETS.length)];
}

function isBranchTargetMismatch(branch = '', target = '') {
  const b = normalize(branch);
  const t = normalize(target);
  if (/anatomi/.test(b) && /(diagnostic_test|lab_interpretation|treatment|first_step|next_step|prevention)/i.test(target)) return true;
  if (/(histoloji|embriyoloji|biyokimya|patoloji)/.test(b) && /(first_step|next_step|treatment|prevention)/i.test(target)) return true;
  return false;
}

function numericValue(value = '') {
  const match = String(value || '').replace(',', '.').match(/-?\d+(?:\.\d+)?/u);
  return match ? Number(match[0]) : null;
}

function detectCaseFacts(question = {}) {
  const facts = { lowK: false, highK: false, lowBP: false, highBP: false, fever: false, afebrile: false };
  const items = [...compactItems(question.compactVitals || question.vitals || [], 8), ...compactItems(question.compactObjectiveData || question.objectiveData || [], 12)];
  items.forEach((item) => {
    const label = normalize(item.label);
    const value = normalize(item.value);
    const raw = `${item.label} ${item.value}`;
    const n = numericValue(item.value);
    if (/\b(k|potasyum|potassium)\b/.test(label) || /hipo(?:k|potas)|hiper(?:k|potas)/.test(value)) {
      if (n !== null && n < 3.5) facts.lowK = true;
      if (n !== null && n > 5.5) facts.highK = true;
      if (/hipokalemi|potasyum dusuk|k dusuk/.test(value)) facts.lowK = true;
      if (/hiperkalemi|potasyum yuksek|k yuksek/.test(value)) facts.highK = true;
    }
    if (/^ta$|kan basinci|tansiyon/.test(label)) {
      const bp = String(item.value || '').match(/(\d{2,3})\s*\/\s*(\d{2,3})/u);
      if (bp) {
        const sys = Number(bp[1]);
        const dia = Number(bp[2]);
        if (sys < 90 || dia < 60) facts.lowBP = true;
        if (sys >= 140 || dia >= 90) facts.highBP = true;
      }
    }
    if (/ates|ateş|sicaklik|sıcaklık/.test(label)) {
      if (n !== null && n >= 38) facts.fever = true;
      if (/afebril|ates yok|ateş yok/.test(value)) facts.afebrile = true;
    }
    if (/afebril|ateşsiz/.test(normalize(raw))) facts.afebrile = true;
  });
  return facts;
}

function hasFeedbackContradiction(question = {}) {
  const facts = detectCaseFacts(question);
  const feedbackText = normalize([
    question.explanation,
    question.examPearl,
    ...asArray(question.evidenceChain),
    ...Object.values(question.wrongOptionFeedback || {}),
    ...asArray(question.managementSteps),
  ].filter(Boolean).join(' '));
  if (!feedbackText) return false;
  if (facts.lowK && /(k\s*yuksek|potasyum\s*yuksek|hiperkalemi)/.test(feedbackText)) return true;
  if (facts.highK && /(k\s*dusuk|potasyum\s*dusuk|hipokalemi)/.test(feedbackText)) return true;
  if (facts.highBP && /(hipotansiyon|ta\s*dusuk|kan basinci\s*dusuk)/.test(feedbackText)) return true;
  if (facts.lowBP && /(hipertansiyon|ta\s*yuksek|kan basinci\s*yuksek)/.test(feedbackText)) return true;
  if (facts.fever && /(afebril|ates\s*yok|ateş\s*yok)/.test(feedbackText)) return true;
  if (facts.afebrile && /(yuksek\s*ates|yüksek\s*ateş|febril|atesi\s*yuksek|ateşi\s*yüksek)/.test(feedbackText)) return true;
  return false;
}

function hasBrokenSentence(text = '') {
  const value = cleanText(text);
  if (!value) return false;
  if (hasTruncatedText(value)) return true;
  const fragments = value.split(/(?<=[.!?])\s+/u).filter(Boolean);
  return fragments.some((fragment) => {
    const f = fragment.replace(/[.!?]+$/u, '').trim();
    if (/^(?:bu nedenle|ekokardiyografi|sistemik tedavi bu|bu tedavi|bu seçenek)$/iu.test(f)) return true;
    if (/\b(?:bu nedenle|ekokardiyografi|sistemik tedavi bu|bu tedavi)\s*$/iu.test(f)) return true;
    return false;
  });
}

function hasMissingUnit(item = {}) {
  const label = normalize(item.label);
  const value = cleanText(item.value);
  const n = numericValue(value);
  if (n === null) return false;
  if (/hemoglobin|\bhb\b/.test(label)) return !/g\s*\/\s*dL|g\/dl/iu.test(value);
  if (/trombosit|platelet/.test(label)) return !/(\/mm|\/µL|\/uL|x\s*10|bin\/µL|bin\/uL)/iu.test(value);
  if (/lokosit|lökosit|wbc/.test(label)) return !/(\/mm|\/µL|\/uL|x\s*10|bin\/µL|bin\/uL)/iu.test(value);
  if (/ates|ateş|sicaklik|sıcaklık/.test(label)) return !/°\s*C|C\b|santigrat/iu.test(value);
  if (/^ta$|kan basinci|tansiyon/.test(label)) return !/mm\s*Hg/iu.test(value);
  if (/nabiz|nabız|kalp hizi|kalp hızı/.test(label)) return !/(\/dk|dk|bpm)/iu.test(value);
  if (/solunum/.test(label)) return !/(\/dk|dk|bpm)/iu.test(value);
  if (/spo2|spo₂|saturasyon|satürasyon/.test(label)) return !/%/u.test(value);
  if (/kreatinin|glukoz|glucose|üre|ure|crp|bilirubin|ast|alt|troponin/.test(label)) return !/(mg\/dL|mg\/dl|mg\/L|U\/L|ng\/L|ng\/mL|µmol\/L|umol\/L)/u.test(value);
  if (/laktat|lactate|sodyum|na|potasyum|k\+|klor|bikarbonat/.test(label)) return !/(mmol\/L|mEq\/L|mmol\/l|mEq\/l)/u.test(value);
  return false;
}

function hasPathologyTargetProblem(question = {}) {
  const branch = normalize(question.relatedBranch || '');
  if (!/patoloji/.test(branch)) return false;
  const context = normalize([question.stem, question.question, ...compactItems(question.compactObjectiveData || [], 8).flatMap((item) => [item.label, item.value])].join(' '));
  const correct = normalize(getCorrectText(question));
  if (/^(tumor|tümör|kitle|lokal nuks egilimi|lokal nüks eğilimi)$/iu.test(cleanText(getCorrectText(question)))) return true;
  const mentionsGeneric = /(tumor|tümör|kitle|neoplazi|nuks|nüks)/.test(context);
  const hasMorphology = /(morfoloji|histoloji|mikroskop|nekroz|pleomorf|mitoz|gland|keratin|granulom|granülom|atipi|invazyon|kapsul|kapsül|stromal|hücre|hucre|boyanma|immünohistokimya|immunohistokimya)/.test(context);
  return mentionsGeneric && !hasMorphology && correct.length < 8;
}

const FORBIDDEN_PHRASES = [
  /farklı klinik tabloda uygun olabilir/iu,
  /olgudaki ana ipuçlarını tek başına açıklamaz/iu,
  /klinik bağlamda değerlendirilir/iu,
  /bu nedenle doğru cevap budur/iu,
  /kanıt\s*[1-9]/iu,
  /verilen öğrenme hedefi/iu,
  /yanıt ekseni/iu,
  /bu alternatifin eksik kaldığı karar noktas/i,
  /seçenekler arasındaki karar düzeyini daraltır/iu,
  /^\s*yanlıştır\b/iu,
  /doğru cevaba götür/iu,
  /doğru yanıta götür/iu,
  /cevap .* içinde yer al/iu,
];

function hasTruncatedText(text = '') {
  const value = cleanText(text);
  if (!value) return false;
  if (/\.{3}|…/u.test(text)) return true;
  if (/\b(?:ve|veya|ile|çünkü|ancak|fakat|bu nedenle|olarak|için)$/iu.test(value)) return true;
  if (/\b[a-zçğıöşü]{1,2}\.$/iu.test(value) && value.length > 40) return true;
  return false;
}

function optionCategory(text = '') {
  const value = normalize(text);
  if (/tedavi|vermek|baslamak|uygulamak|cerrahi|antibiyotik|antidot|oksijen|sivi|rehidratasyon|insulin|glukoz|adrenalin|epinefrin|antikoagulan|kortikosteroid|immunglobulin|diyaliz/.test(value)) return 'treatment';
  if (/test|tetkik|olcumu|seroloji|kultur|pcr|bt|mr|usg|ekg|grafi|biyopsi|tarama|panel|enzim|marker/.test(value)) return 'test';
  if (/mekanizma|reseptor|inhibisyon|aktivasyon|transport|kotransport|enzim|kanal|patofizyoloji|yan etki/.test(value)) return 'mechanism';
  if (/enfeksiyonu|sendromu|hastaligi|tanisi|pnomoni|menenjit|ketoasidoz|konvulziyon|anemi|tiroidit|embol|infarkt|sepsis|sok|astim|sle|lupus|hepatit/.test(value)) return 'diagnosis';
  return 'other';
}

function validateQuestion(question = {}, recentQuestionSummaries = []) {
  const errors = [];
  const options = normalizeOptions(question.options);
  const correctId = String(question.correctAnswer || '').trim().toUpperCase();
  const correctText = getCorrectText({ ...question, options });
  const allText = collectStrings(question).join(' | ');

  if (!question.title || cleanText(question.title).length < 4) errors.push('title eksik');
  if (!question.relatedBranch || cleanText(question.relatedBranch).length < 3) errors.push('branch eksik');
  if (!question.stem || cleanText(question.stem).split(/\s+/).length < 25) errors.push('stem çok kısa');
  if (!question.question || !/\?$/u.test(ensureQuestion(question.question))) errors.push('question net soru cümlesi değil');
  if (options.length !== 5) errors.push('tam 5 seçenek yok');
  if (!OPTION_IDS.includes(correctId)) errors.push('correctAnswer A-E değil');
  if (!correctText) errors.push('correctAnswer seçeneklerle eşleşmiyor');
  if (!question.explanation || cleanText(question.explanation).length < 45) errors.push('explanation yetersiz');
  if (!Array.isArray(question.evidenceChain) || question.evidenceChain.length < 3) errors.push('evidenceChain yetersiz');
  if (!question.examPearl || cleanText(question.examPearl).length < 20) errors.push('examPearl yetersiz');
  if (hasBrokenSentence(allText)) errors.push('kesik veya tamamlanmamış cümle var');
  FORBIDDEN_PHRASES.forEach((pattern) => {
    if (pattern.test(allText)) errors.push('jenerik/yasak feedback kalıbı var');
  });

  if (correctText && containsAnswerLeak(question.title, correctText)) errors.push('başlık doğru cevabı ele veriyor');
  if (titleLooksDetached(question, question.title)) errors.push('başlık vaka verisiyle uyumsuz görünüyor');
  if (correctText && containsAnswerLeak(getPreAnswerDataText({ ...question, title: '' }), correctText)) errors.push('soru kökü/veri paneli doğru cevabı ele veriyor');
  if (asArray(question.evidenceChain).some((item) => containsAnswerLeak(item, correctText))) errors.push('kanıt zinciri doğru cevabı doğrudan söylüyor');
  if (hasDuplicateFeedbackSentences(question)) errors.push('feedback içinde tekrar eden cümle var');
  if (!isManagementTarget(question.answerTarget) && asArray(question.managementSteps).length) errors.push('bu soru tipinde yönetim basamağı gereksiz');
  if (isBranchTargetMismatch(question.relatedBranch, question.answerTarget)) errors.push('branş ile soru hedefi uyumsuz');
  if (hasFeedbackContradiction(question)) errors.push('feedback vaka verisiyle çelişiyor');
  if ([...compactItems(question.compactVitals || question.vitals || [], 6), ...compactItems(question.compactObjectiveData || question.objectiveData || [], 10)].some(hasMissingUnit)) errors.push('laboratuvar/vital değerlerinde birim eksik');
  if (hasPathologyTargetProblem(question)) errors.push('patoloji sorusunda tanısal hedef veya morfoloji belirsiz');
  if (/^(?:TUS\s*ipucu|Spot\s*bilgi|Hap\s*bilgi|Sınav\s*notu)\s*[:：-]/iu.test(cleanText(question.examPearl || ''))) errors.push('TUS ipucu alanında çift başlık var');

  const categories = options.map((option) => optionCategory(option.text)).filter((category) => category !== 'other');
  const dominant = categories.sort((a, b) => categories.filter((x) => x === b).length - categories.filter((x) => x === a).length)[0];
  if (dominant && categories.filter((category) => category !== dominant).length >= 2) errors.push('seçenekler aynı kavramsal kategoride değil');

  const titleNorm = normalize(question.title);
  const correctNorm = normalize(correctText);
  const optionSetNorm = normalize(options.map((item) => item.text).sort().join(' | '));
  const stemNorm = normalize(question.stem);
  asArray(recentQuestionSummaries).slice(0, 12).forEach((recent) => {
    if (titleNorm && normalize(recent.title) === titleNorm) errors.push('yakın geçmişte aynı başlık var');
    if (correctNorm && normalize(recent.correct || recent.correctAnswer) === correctNorm && optionSetNorm && normalize(asArray(recent.optionTexts).slice().sort().join(' | ') || recent.optionSetSignature) === optionSetNorm) errors.push('yakın geçmişte aynı doğru cevap ve seçenek seti var');
    const recentStem = normalize(recent.stem || recent.normalizedStem || '');
    if (stemNorm.length > 100 && recentStem.length > 100 && (stemNorm.includes(recentStem.slice(0, 100)) || recentStem.includes(stemNorm.slice(0, 100)))) errors.push('yakın geçmişte aynı soru kökü var');
  });

  const quality = question.quality || question.selfCheck || {};
  ['scientificallySound', 'singleBestAnswer', 'optionsSameCategory', 'noAnswerLeakage', 'completeSentences'].forEach((key) => {
    if (quality[key] === false) errors.push(`model self-check failed: ${key}`);
  });

  return { ok: errors.length === 0, errors: Array.from(new Set(errors)), options, correctText };
}

function sanitizeQuestion(question = {}, branch) {
  const options = normalizeOptions(question.options);
  const correctId = String(question.correctAnswer || '').trim().toUpperCase();
  const correctText = options.find((item) => item.id === correctId)?.text || options[0]?.text || '';
  const answerTarget = cleanText(question.answerTarget || question.questionIntent || 'single_best_answer');
  const allowManagementSteps = isManagementTarget(answerTarget);
  const sanitized = {
    id: cleanText(question.id) || `ai-spot-openai-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    source: 'real-ai',
    caseType: 'ai-spot',
    title: cleanText(question.title),
    relatedBranch: cleanText(question.relatedBranch || branch),
    difficulty: cleanText(question.difficulty || 'Orta'),
    learningTarget: cleanText(question.learningTarget || 'TUS düzeyinde tek karar noktasını yorumlama.'),
    answerTarget,
    demographics: cleanText(question.demographics || ''),
    setting: cleanText(question.setting || 'Klinik değerlendirme'),
    chiefComplaint: cleanText(question.chiefComplaint || question.title || ''),
    stem: ensureSentence(question.stem),
    compactVitals: compactItems(question.compactVitals || question.vitals || [], 5),
    compactObjectiveData: compactItems(question.compactObjectiveData || question.objectiveData || [], 8),
    question: ensureQuestion(question.question),
    options,
    correctAnswer: OPTION_IDS.includes(correctId) ? correctId : (options[0]?.id || 'A'),
    explanation: ensureSentence(question.explanation),
    wrongOptionFeedback: OPTION_IDS.reduce((acc, id) => {
      acc[id] = ensureSentence(question.wrongOptionFeedback?.[id] || question.optionRationales?.[id] || (id === correctId ? `Bu seçenek olgudaki verilerle en iyi uyumludur.` : `Bu seçenek bu soru hedefi için tek en iyi yanıt değildir.`));
      return acc;
    }, {}),
    evidenceChain: asArray(question.evidenceChain).map(ensureSentence).filter(Boolean).slice(0, 4),
    examPearl: ensureSentence(stripFeedbackLabel(question.examPearl || question.teachingPoint)),
    managementSteps: allowManagementSteps ? asArray(question.managementSteps).map(ensureSentence).filter(Boolean).slice(0, 3) : [],
    quality: question.quality || question.selfCheck || {},
  };
  if (titleLooksDetached(sanitized, sanitized.title)) sanitized.title = makeSafeTitle(sanitized, correctText);
  sanitized.examPearl = ensureSentence(stripFeedbackLabel(sanitized.examPearl));
  sanitized.evidenceChain = sanitized.evidenceChain.filter((item) => !hasBrokenSentence(item)).slice(0, 3);
  sanitized.correctAnswerText = correctText;
  sanitized.semanticFingerprint = makeSignature(sanitized);
  return sanitized;
}

const FALLBACK_BANK = [

  {
    title: 'El bileğinde duyu ve motor kayıp', relatedBranch: 'Anatomi', difficulty: 'Orta', learningTarget: 'Sinir, kas ve duyu alanı ilişkisini yorumlama.', answerTarget: 'mechanism', demographics: 'Erişkin hasta', setting: 'Travma sonrası değerlendirme', chiefComplaint: 'El bileğinde duyu ve motor kayıp', stem: 'Erişkin hasta el bileği düzeyinde kesici travma sonrası başvurur. Başparmak opozisyonunda belirgin zayıflık vardır. İlk üç parmak palmar yüzde duyu azalması saptanır. Ön kol proksimal kas gücü korunmuştur.', compactVitals: [], compactObjectiveData: [], question: 'Bu bulgular en çok hangi anatomik yapının hasarı ile uyumludur?', options: [{ id: 'A', text: 'Median sinir' }, { id: 'B', text: 'Ulnar sinir' }, { id: 'C', text: 'Radial sinir' }, { id: 'D', text: 'Musculocutaneous sinir' }, { id: 'E', text: 'Aksiller sinir' }], correctAnswer: 'A', explanation: 'Başparmak opozisyon zayıflığı ve ilk üç parmak palmar yüzde duyu azalması median sinirin el bileği düzeyindeki dağılımıyla uyumludur. Proksimal ön kol kaslarının korunması lezyonun daha distal yerleşimli olduğunu düşündürür.', wrongOptionFeedback: { A: 'Bu seçenek motor ve duyu dağılımını birlikte açıklar.', B: 'Ulnar sinir daha çok interosseöz kaslar ve beşinci parmak duyusu ile ilişkilidir.', C: 'Radial sinir el bileği ekstansiyonu ve dorsal duyu alanıyla öne çıkar.', D: 'Musculocutaneous sinir ön kol fleksiyonu ve lateral ön kol duyusuyla ilişkilidir.', E: 'Aksiller sinir deltoid fonksiyonu ve omuz lateral duyusuyla ilişkilidir.' }, evidenceChain: ['Başparmak opozisyonu zayıftır.', 'İlk üç parmak palmar duyusu azalmıştır.', 'Proksimal ön kol kas gücü korunmuştur.'], examPearl: 'Median sinir el bileğinde thenar motor fonksiyon ve lateral palmar duyu ile ayırt edilir.', managementSteps: [] },
  {
    title: 'Morfolojik tümör paterni', relatedBranch: 'Tıbbi Patoloji', difficulty: 'Orta', learningTarget: 'Morfolojik patern üzerinden patolojik antiteyi tanıma.', answerTarget: 'diagnosis', demographics: 'Erişkin hasta', setting: 'Patoloji değerlendirmesi', chiefComplaint: 'Tiroid nodülü', stem: 'Erişkin hastada tiroid nodülü nedeniyle ince iğne aspirasyonu yapılır. Preparatta nükleer çentiklenme, optik berrak nükleuslar ve psammoma cisimcikleri tariflenir. Kapsül invazyonu bilgisi verilmemiştir.', compactVitals: [], compactObjectiveData: [{ label: 'Sitoloji', value: 'Nükleer çentiklenme, optik berrak nükleuslar ve psammoma cisimcikleri' }], question: 'Bu morfolojik patern en çok hangi patolojik antiteyi destekler?', options: [{ id: 'A', text: 'Papiller tiroid karsinomu' }, { id: 'B', text: 'Foliküler adenom' }, { id: 'C', text: 'Medüller tiroid karsinomu' }, { id: 'D', text: 'Anaplastik tiroid karsinomu' }, { id: 'E', text: 'Hashimoto tiroiditi' }], correctAnswer: 'A', explanation: 'Optik berrak nükleus, nükleer çentiklenme ve psammoma cisimcikleri papiller tiroid karsinomu için klasik morfolojik ipuçlarıdır. Kapsül veya damar invazyonu daha çok foliküler lezyon ayrımında belirleyicidir.', wrongOptionFeedback: { A: 'Bu seçenek verilen nükleer morfoloji ve psammoma cisimcikleriyle uyumludur.', B: 'Foliküler adenomda tanı kapsül ve damar invazyonunun yokluğuyla ilişkilidir; burada papiller nükleer özellikler baskındır.', C: 'Medüller karsinomda C hücre kökeni ve amiloid stroma beklenir.', D: 'Anaplastik karsinom belirgin pleomorfizm ve agresif klinikle öne çıkar.', E: 'Hashimoto tiroiditi lenfoid infiltrasyon ve germinal merkezlerle ilişkilidir.' }, evidenceChain: ['Optik berrak nükleuslar tariflenmiştir.', 'Nükleer çentiklenme vardır.', 'Psammoma cisimcikleri belirtilmiştir.'], examPearl: 'Papiller tiroid karsinomunda tanı nükleer özelliklerle kurulur; psammoma cisimcikleri destekleyicidir.', managementSteps: [] },
  {
    title: 'Vitamin eksikliğinde biyokimyasal ipucu', relatedBranch: 'Tıbbi Biyokimya', difficulty: 'Kolay', learningTarget: 'Klasik biyokimyasal kofaktör bilgisini tanıma.', answerTarget: 'mechanism', demographics: 'Erişkin hasta', setting: 'Poliklinik', chiefComplaint: 'Makrositik anemi bulguları', stem: 'Erişkin hastada yorgunluk ve makrositik anemi saptanır. Nörolojik bulgu tariflenmez. Diyette yeşil yapraklı sebze alımının belirgin az olduğu öğrenilir.', compactObjectiveData: [{ label: 'Hemoglobin', value: '10.2 g/dL' }, { label: 'MCV', value: '112 fL' }], question: 'Bu tabloyla ilişkili temel biyokimyasal işlev hangisidir?', options: [{ id: 'A', text: 'Tek karbon transfer reaksiyonları' }, { id: 'B', text: 'Gamma-karboksilasyon reaksiyonları' }, { id: 'C', text: 'Oksidatif fosforilasyonun ayrılması' }, { id: 'D', text: 'Heme demirinin indirgenmesi' }, { id: 'E', text: 'Steroid hormon sentezinin inhibisyonu' }], correctAnswer: 'A', explanation: 'Folat tek karbon transfer reaksiyonlarında görev alır ve DNA sentezi için gereklidir. Eksikliğinde makrositik anemi gelişebilir; nörolojik bulgu olmaması B12 eksikliğinden ayırmada destekleyicidir.', wrongOptionFeedback: { A: 'Bu seçenek folatın temel biyokimyasal rolünü açıklar.', B: 'Gamma-karboksilasyon K vitamini ile ilişkilidir.', C: 'Oksidatif fosforilasyon ayrılması bu klinik paternin temel açıklaması değildir.', D: 'Heme demiri indirgenmesi C vitamini ve demir metabolizması bağlamında düşünülür.', E: 'Steroid sentezi inhibisyonu folat eksikliğini açıklamaz.' }, evidenceChain: ['Makrositik anemi vardır.', 'Yeşil yapraklı sebze alımı düşüktür.', 'Nörolojik bulgu tariflenmemiştir.'], examPearl: 'Folat tek karbon metabolizması ve DNA sentezi için gereklidir; eksikliği makrositik anemi yapar.', managementSteps: [] },
  {
    title: 'Laboratuvar paterni yorumu', relatedBranch: 'İç Hastalıkları', difficulty: 'Orta', learningTarget: 'Laboratuvar verisini klinik bağlamla birlikte yorumlama.', answerTarget: 'lab_interpretation', demographics: 'Erişkin hasta', setting: 'Acil servis', chiefComplaint: 'Halsizlik', stem: 'Erişkin hasta son günlerde artan halsizlik ve dikkat azalması nedeniyle değerlendirilir. Öyküde sıvı alımında azalma vardır. Muayenede belirgin fokal nörolojik defisit saptanmaz.', compactObjectiveData: [{ label: 'Serum sodyum', value: '122 mEq/L' }, { label: 'Serum osmolalitesi', value: 'Düşük' }], question: 'Bu olgudaki laboratuvar paternini en iyi açıklayan seçenek hangisidir?', options: [{ id: 'A', text: 'Hipotonik hiponatremi' }, { id: 'B', text: 'Hipertonik hiponatremi' }, { id: 'C', text: 'İzotonik psödohiponatremi' }, { id: 'D', text: 'Hipernatremik dehidratasyon' }, { id: 'E', text: 'Primer hiperkalemi' }], correctAnswer: 'A', explanation: 'Düşük sodyum düzeyine düşük serum osmolalitesinin eşlik etmesi hipotonik hiponatremiyi destekler. Sonraki ayrım volüm durumu ve idrar elektrolitleriyle yapılır.', wrongOptionFeedback: { A: 'Bu seçenek düşük osmolalite ile birlikte gerçek hipotonik tabloyu açıklar.', B: 'Bu seçenek osmotik olarak aktif ek solüt varlığında düşünülür; burada düşük osmolalite verilmiştir.', C: 'Psödohiponatremide serum osmolalitesi genellikle normaldir; bu veri burada desteklenmez.', D: 'Hipernatremik tabloda serum sodyumu yüksek beklenir; burada düşük sodyum vardır.', E: 'Potasyum bozukluğu bu panelin ana açıklaması değildir.' }, evidenceChain: ['Serum sodyumu düşüktür.', 'Serum osmolalitesi düşüktür.', 'Bilinç değişikliği semptomatik tabloyu destekler.'], examPearl: 'Hiponatremi yorumunda ilk ayrım serum osmolalitesidir; düşük osmolalite gerçek hipotonik hiponatremiyi gösterir.', managementSteps: [] },
  {
    title: 'Pediatrik perfüzyon değerlendirmesi', relatedBranch: 'Çocuk Sağlığı ve Hastalıkları', difficulty: 'Orta', learningTarget: 'Pediatrik acilde risk bulgularını ayırt etme.', answerTarget: 'first_step', demographics: 'Küçük çocuk', setting: 'Çocuk acil', chiefComplaint: 'Ateş ve halsizlik', stem: 'Küçük çocuk ateş ve beslenmede azalma nedeniyle acile getirilir. Aile çocuğun son saatlerde daha halsiz olduğunu belirtir. Muayenede kapiller dolum süresi uzamış ve cilt turgoru azalmıştır.', compactVitals: [{ label: 'Ateş', value: '39 °C' }, { label: 'Nabız', value: 'Taşikardik' }], question: 'Bu olguda öncelikle değerlendirilmesi gereken klinik öncelik hangisidir?', options: [{ id: 'A', text: 'Perfüzyon ve hidrasyon durumu' }, { id: 'B', text: 'Uzun dönem büyüme izlemi' }, { id: 'C', text: 'Rutin aşı takvimi planı' }, { id: 'D', text: 'Elektif dermatoloji değerlendirmesi' }, { id: 'E', text: 'Okul çağı psikososyal taraması' }], correctAnswer: 'A', explanation: 'Ateşli çocukta halsizlik, uzamış kapiller dolum ve turgor azalması dolaşım ve hidrasyon değerlendirmesini öncelikli kılar. Diğer seçenekler akut acil karar düzeyini karşılamaz.', wrongOptionFeedback: { A: 'Bu seçenek akut risk değerlendirmesinin merkezindedir.', B: 'Büyüme izlemi önemlidir; ancak akut perfüzyon bulguları varken ilk öncelik değildir.', C: 'Aşı takvimi koruyucu sağlık başlığıdır; bu acil başvurunun ilk kararını açıklamaz.', D: 'Elektif değerlendirme akut sistemik bulguların önüne geçmez.', E: 'Psikososyal tarama bu akut perfüzyon sorununu yanıtlamaz.' }, evidenceChain: ['Beslenme azalmıştır.', 'Kapiller dolum süresi uzamıştır.', 'Cilt turgoru azalmıştır.'], examPearl: 'Pediatrik acilde genel durum ve perfüzyon bulguları tanısal ayrıntılardan önce değerlendirilir.', managementSteps: ['Hava yolu, solunum ve dolaşım hızlıca değerlendirilir.', 'Perfüzyon ve hidrasyon bulgularına göre sıvı planı yapılır.'] },
];

function fallbackQuestion({ branchFilter, recentQuestionSummaries }) {
  const branch = chooseBranch(branchFilter);
  const recentTitles = new Set(asArray(recentQuestionSummaries).map((item) => normalize(item.title || '')));
  const candidates = FALLBACK_BANK.filter((item) => normalize(branchFilter).includes(normalize(item.relatedBranch)) || normalize(item.relatedBranch).includes(normalize(branchFilter)) || ['random', 'rastgele', ''].includes(normalize(branchFilter)));
  const pool = candidates.length ? candidates : FALLBACK_BANK;
  const selected = pool.find((item) => !recentTitles.has(normalize(item.title))) || pool[Math.floor(Math.random() * pool.length)];
  return sanitizeQuestion({ ...selected, id: `ai-spot-fallback-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }, branch);
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
  return JSON.parse(getJsonCandidate(text));
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

function buildPrompt({ branch, recentQuestionSummaries = [], attempt = 1, antiRepeatNonce = '' }) {
  const recent = asArray(recentQuestionSummaries).slice(0, 8).map((item, index) => `${index + 1}) ${item.branch || ''} | ${item.title || ''} | ${item.correct || ''}`).join('\n') || 'Yok';
  const target = selectAnswerTarget(branch);
  return `KlinikIQ için tek bir Türkçe TUS spot sorusu üret.
Rolün: deneyimli hekim, TUS soru yazarı ve tıbbi dil editörü.

Branş: ${branch}
Bu denemedeki soru hedefi: ${target}
Çeşitlilik anahtarı: ${antiRepeatNonce || Date.now()}-${attempt}

Yakın geçmişte üretilenler yalnızca tekrar etmemen için veriliyor; örnek alma, kopyalama, parafrazlama yapma:
${recent}

Kurallar:
- Tek köklü, tek doğru cevaplı, TUS tarzında kısa klinik soru yaz.
- Her soruda yalnız tek öğrenme hedefi olsun: tanı, test, tedavi, mekanizma veya komplikasyon hedeflerini karıştırma.
- Başlık vaka ile birebir uyumlu olsun; eski/başka sorudan kalmış gibi duran başlık yazma. Başlık ana klinik durumu yansıtsın ama tanı, etken, komplikasyon, mekanizma veya doğru laboratuvar bulgusunu doğrudan ele vermesin.
- Soru kökü veya veri paneli doğru cevabı aynen tekrar etmesin; verilen bulgu sorulacaksa yorumu sorulsun.
- “İlk yaklaşım”, “ilk ilaç”, “tanıyı destekleyen test”, “doğrulama testi” ve “tarama testi” ifadelerini bilimsel anlamına uygun kullan. Acil tedavide laboratuvar sonucu bekletme. “En uygun” birden fazla doğru seçenek doğuruyorsa kökü uzun etkili, antibiyotik öncesi, doğrulama testi, ilk ilaç gibi ifadelerle daralt.
- Seçenekler aynı kategoride olsun; tanı sorusunda tanılar, test sorusunda testler, tedavi sorusunda tedaviler, mekanizma sorusunda mekanizmalar ver.
- Fizik muayene, vital, laboratuvar, EKG ve görüntüleme verilerini birbirine karıştırma. Hemoglobin, trombosit, lökosit, pH, ateş, TA, SpO₂, elektrolit ve biyokimya değerlerinde klinik birim yaz.
- EKG yoksa EKG paterni, laboratuvar yoksa laboratuvar bulgusu, tedavi sorusu değilse tedavi adımı/yönetim dili kullanma.
- Etik-hukuki soru üretme; zorunluysa hasta rızası, karar verme kapasitesi, anonimleştirme, etik kurul ve kişisel sağlık verisi kavramlarını karıştırma.
- Branş ve hedef uyumlu olsun: Anatomi çoğunlukla sinir-kas-yapı ilişkisini sorar; test seçimi/elektrofizyoloji yorumu gerekiyorsa uygun klinik branş seç. Patoloji sorusunda antite net olmalı; morfoloji veya klinik bağlam antiteyi desteklemeli. Klasik bilgi sorularında gereksiz uzun vaka yazma.
- Feedback formatı kısa olsun: klinik/bilimsel gerekçe 2-4 cümle, TUS ipucu tek satır, kanıt zinciri 3 kısa vaka ipucu, seçenek karşılaştırması kısa ve özgül. TUS ipucu alanına “TUS ipucu:” veya “Spot bilgi:” gibi ikinci başlık yazma.
- Kanıt zinciri doğru cevabı doğrudan tekrar etmesin; yalnız vakadaki ipuçlarını göstersin.
- “Yanlıştır” diye başlayan tekrarlı cümleler ve jenerik kalıplar kullanma.
- Feedbackte otomatik kısa notlar vaka verisiyle çelişmesin; hipokalemide K yüksek, hipertansiyonda hipotansiyon gibi ters ifadeler kullanma. Yarım cümle, eksik değer, tekrar eden veri satırı veya bozuk Türkçe bırakma.
- Eğer bilimsel doğruluktan emin değilsen daha temel ve güvenli bir TUS konusu seç.

Sadece geçerli JSON döndür. Markdown yok.
JSON alanları:
{
  "title":"cevabı ele vermeyen kısa başlık",
  "relatedBranch":"${branch}",
  "difficulty":"Kolay|Orta|Zor",
  "learningTarget":"tek öğrenme hedefi",
  "answerTarget":"${target}",
  "demographics":"yaş-cinsiyet kısa ifade",
  "setting":"klinik ortam",
  "chiefComplaint":"başvuru nedeni",
  "stem":"4-7 cümlelik klinik olgu; soru cümlesi burada yok",
  "compactVitals":[{"label":"TA","value":"..."}],
  "compactObjectiveData":[{"label":"test adı","value":"sonuç"}],
  "question":"tek ve net soru cümlesi",
  "options":[{"id":"A","text":"..."},{"id":"B","text":"..."},{"id":"C","text":"..."},{"id":"D","text":"..."},{"id":"E","text":"..."}],
  "correctAnswer":"A",
  "explanation":"Klinik/Bilimsel gerekçe: doğru cevabı 2-4 cümleyle açıkla; tekrar yapma",
  "wrongOptionFeedback":{"A":"...","B":"...","C":"...","D":"...","E":"..."},
  "evidenceChain":["vakadaki somut ipucu","vakadaki somut ipucu","vakadaki somut ipucu"],
  "examPearl":"tek satırlık yüksek verimli karar ipucu; başlık etiketi yazma",
  "managementSteps":["yalnız ilk yaklaşım/tedavi sorularında gerekli kısa basamak"],
  "quality":{"scientificallySound":true,"singleBestAnswer":true,"optionsSameCategory":true,"noAnswerLeakage":true,"completeSentences":true}
}`;
}

function createAbortSignal(timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return { signal: controller.signal, cancel: () => clearTimeout(timeout) };
}

async function callOpenAI(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  const model = process.env.OPENAI_MODEL || process.env.DEFAULT_GENERATOR_MODEL || 'gpt-4o-mini';
  const baseUrl = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const timeoutMs = Number(process.env.OPENAI_PER_REQUEST_TIMEOUT_MS || 25000);
  const maxTokens = Number(process.env.OPENAI_MAX_OUTPUT_TOKENS || 1800);
  const style = String(process.env.OPENAI_API_STYLE || 'chat').toLowerCase();
  const { signal, cancel } = createAbortSignal(timeoutMs);
  try {
    const body = style === 'responses'
      ? {
          model,
          input: [
            { role: 'system', content: 'You write concise, medically accurate Turkish TUS questions. Return only valid JSON.' },
            { role: 'user', content: prompt },
          ],
          text: { format: { type: 'json_object' } },
          max_output_tokens: maxTokens,
          store: false,
        }
      : {
          model,
          messages: [
            { role: 'system', content: 'You write concise, medically accurate Turkish TUS questions. Return only valid JSON.' },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_object' },
          max_completion_tokens: maxTokens,
        };
    const response = await fetch(`${baseUrl}${style === 'responses' ? '/responses' : '/chat/completions'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(body),
      signal,
    });
    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(`OpenAI ${response.status}: ${errorText.slice(0, 500)}`);
      error.status = response.status;
      throw error;
    }
    const data = await response.json();
    const text = style === 'responses' ? extractResponsesText(data) : extractChatText(data);
    const question = parseModelJson(text);
    return { question, model: data.model || model, mode: style };
  } finally {
    cancel();
  }
}

async function generateRemote({ branch, recentQuestionSummaries, attempt, antiRepeatNonce }) {
  const prompt = buildPrompt({ branch, recentQuestionSummaries, attempt, antiRepeatNonce });
  const result = await callOpenAI(prompt);
  if (!result) throw new Error('OPENAI_API_KEY tanımlı değil; güvenli yerel fallback kullanılacak.');
  const sanitized = sanitizeQuestion(result.question, branch);
  sanitized.provider = 'openai';
  sanitized.openAIModel = result.model;
  sanitized.openAIMode = result.mode;
  sanitized.promptVersion = PROMPT_VERSION;
  sanitized.schemaVersion = SCHEMA_VERSION;
  const validation = validateQuestion(sanitized, recentQuestionSummaries);
  if (!validation.ok) {
    const error = new Error(validation.errors.join('; '));
    error.validationErrors = validation.errors;
    error.question = sanitized;
    throw error;
  }
  return sanitized;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }

  const branch = chooseBranch(body.branchFilter);
  const recentQuestionSummaries = asArray(body.recentQuestionSummaries).slice(0, 12);
  const remoteAttempts = Math.max(1, Math.min(2, Number(process.env.REMOTE_AI_ATTEMPTS || 1)));
  const errors = [];

  for (let attempt = 1; attempt <= remoteAttempts; attempt += 1) {
    try {
      const question = await generateRemote({ branch, recentQuestionSummaries, attempt, antiRepeatNonce: body.antiRepeatNonce });
      return sendJson(response, 200, {
        ok: true,
        provider: 'openai',
        fallback: false,
        question,
      });
    } catch (error) {
      errors.push(error?.message || String(error));
    }
  }

  if (String(process.env.AI_ENABLE_SAFE_FALLBACK || 'true').toLowerCase() !== 'false') {
    const question = fallbackQuestion({ branchFilter: branch, recentQuestionSummaries });
    question.provider = 'local-safe-fallback';
    question.fallback = true;
    return sendJson(response, 200, {
      ok: true,
      provider: 'local-safe-fallback',
      fallback: true,
      safeFallback: true,
      error: errors[0] || null,
      question,
    });
  }

  return sendJson(response, 502, { ok: false, error: 'AI question generation failed', attempts: errors.slice(0, 3) });
}
