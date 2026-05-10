const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const PROMPT_VERSION = 'klinikiq-simple-tus-v9-user-prompt-specific-feedback';
const SCHEMA_VERSION = 'simple-ai-spot-v1';

const SYSTEM_PROMPT = `You are KlinikIQ’s medical question-generation engine.

Write one concise, medically accurate Turkish TUS-style single-best-answer question. The output language must be professional Turkish with correct medical terminology, spelling, grammar and real TUS exam style.

Do not create or expose a visible title. Always keep title as an empty string.

Core rules:
- One question = one learning target only.
- The branch, stem, data fields, options, correct answer and feedback must all point to the same target.
- Do not leak the answer in the title, stem or data fields.
- Do not ask for a result, test, diagnosis or mechanism that is already directly given in the case.
- Do not add unnecessary vitals, labs, imaging or microbiology data.
- Keep data fields clean, complete, correctly labeled and non-repetitive.
- Use only one clearly correct answer; options must belong to the same category.
- Never use generic option feedback. Every option explanation must be specific, educational and tied to the option and the case.
- Evidence chain must contain only concrete clues explicitly present in the stem or data fields. Do not invent or infer extra findings.
- Evidence chain items must be plain Turkish clue sentences only; do not add labels such as “clinical clue”, “lab finding” or “ECG pattern”.
- Avoid vague, generic, duplicated, contradictory or unfinished feedback.
- If the chosen branch or target creates ambiguity, switch to a safer, single-answer TUS target within the requested branch.
- Return only valid JSON. No markdown, no comments, no extra text.`

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

function selectPromptTarget(branch = '') {
  const value = normalize(branch);
  if (/anatomi/.test(value)) return 'mechanism';
  if (/histoloji|embriyoloji/.test(value)) return 'mechanism';
  if (/biyokimya/.test(value)) return Math.random() < 0.5 ? 'mechanism' : 'lab_interpretation';
  if (/patoloji/.test(value)) return 'diagnosis';
  return ANSWER_TARGETS[Math.floor(Math.random() * ANSWER_TARGETS.length)];
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

  if (!question.relatedBranch || cleanText(question.relatedBranch).length < 3) errors.push('branch eksik');
  if (!question.stem || cleanText(question.stem).split(/\s+/).length < 25) errors.push('stem çok kısa');
  if (!question.question || !/\?$/u.test(ensureQuestion(question.question))) errors.push('question net soru cümlesi değil');
  if (options.length !== 5) errors.push('tam 5 seçenek yok');
  if (!OPTION_IDS.includes(correctId)) errors.push('correctAnswer A-E değil');
  if (!correctText) errors.push('correctAnswer seçeneklerle eşleşmiyor');
  if (!question.explanation || cleanText(question.explanation).length < 45) errors.push('explanation yetersiz');
  if (!Array.isArray(question.evidenceChain) || question.evidenceChain.length < 3) errors.push('evidenceChain yetersiz');
  if (!question.examPearl || cleanText(question.examPearl).length < 20) errors.push('examPearl yetersiz');
  if (hasTruncatedText(allText)) errors.push('kesik veya üç noktalı metin var');
  FORBIDDEN_PHRASES.forEach((pattern) => {
    if (pattern.test(allText)) errors.push('jenerik/yasak feedback kalıbı var');
  });

  if (correctText && containsAnswerLeak(getPreAnswerDataText({ ...question, title: '' }), correctText)) errors.push('soru kökü/veri paneli doğru cevabı ele veriyor');
  if (asArray(question.evidenceChain).some((item) => containsAnswerLeak(item, correctText))) errors.push('kanıt zinciri doğru cevabı doğrudan söylüyor');
  if (hasDuplicateFeedbackSentences(question)) errors.push('feedback içinde tekrar eden cümle var');
  if (!isManagementTarget(question.answerTarget) && asArray(question.managementSteps).length) errors.push('bu soru tipinde yönetim basamağı gereksiz');

  const categories = options.map((option) => optionCategory(option.text)).filter((category) => category !== 'other');
  const dominant = categories.sort((a, b) => categories.filter((x) => x === b).length - categories.filter((x) => x === a).length)[0];
  if (dominant && categories.filter((category) => category !== dominant).length >= 2) errors.push('seçenekler aynı kavramsal kategoride değil');

  const titleNorm = normalize(question.title || '');
  const correctNorm = normalize(correctText);
  const optionSetNorm = normalize(options.map((item) => item.text).sort().join(' | '));
  const stemNorm = normalize(question.stem);
  asArray(recentQuestionSummaries).slice(0, 12).forEach((recent) => {
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
    title: '',
    relatedBranch: cleanText(question.relatedBranch || branch),
    difficulty: cleanText(question.difficulty || 'Orta'),
    learningTarget: cleanText(question.learningTarget || 'TUS düzeyinde tek karar noktasını yorumlama.'),
    answerTarget,
    demographics: cleanText(question.demographics || ''),
    setting: cleanText(question.setting || 'Klinik değerlendirme'),
    chiefComplaint: cleanText(question.chiefComplaint || ''),
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
  sanitized.correctAnswerText = correctText;
  sanitized.semanticFingerprint = makeSignature(sanitized);
  return sanitized;
}

const FALLBACK_BANK = [
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
  const target = selectPromptTarget(branch);
  return `Generate one Turkish TUS spot question for KlinikIQ.

Role: senior physician, TUS item writer, medical editor and quality controller.

Branch: ${branch}
Target type: ${target}
Anti-repeat key: ${antiRepeatNonce || Date.now()}-${attempt}

Recent generations are provided only to prevent repetition. Do not copy, imitate, paraphrase or use them as examples:
${recent}

Task:
Create one short, professional, single-best-answer Turkish TUS question that feels close to the real TUS style.

Essential item-writing rules:
1. Use exactly one learning target: diagnosis, test, treatment, mechanism, complication or a branch-appropriate basic science concept. Do not mix targets.
2. Keep the item branch-appropriate. If the requested target does not fit the branch, choose a safer target that fits the branch.
3. Do not produce a visible question title. Set "title" to "".
4. The stem and data fields must not repeat the same information. Do not give a test result, diagnosis, mechanism or defining finding and then ask the user to choose that same thing.
5. Use only necessary data. Remove irrelevant hemogram, vitals, labs, imaging or microbiology unless they help reasoning without revealing the answer.
6. Data must be placed in the correct field:
   - symptoms and history in the stem,
   - vital signs in compactVitals,
   - labs, imaging, microbiology, pathology and exam findings in compactObjectiveData with clear labels.
   Never label a lab as microbiology, exam as imaging, or non-ECG data as ECG.
7. All values must be complete and formatted with units when appropriate.
8. Options must be the same type. Do not mix diagnoses, tests, drugs, mechanisms and procedures in the same option set.
9. If more than one option could be clinically reasonable, narrow the question wording or change the options before returning JSON.
10. Use “first step”, “first drug”, “screening test”, “confirmatory test”, “supportive test”, “replacement”, “prophylaxis”, “treatment”, “most common”, “most serious” and “most feared” only when scientifically correct.
11. For pathology questions, the entity must be specific and supported by morphology or relevant clinical context. Avoid vague “tumor/mass/recurrence-prone lesion” wording.
12. For anatomy questions, prefer structure–nerve–muscle–function relationships. Avoid diagnostic test interpretation unless the branch really fits.
13. Avoid ethics/legal questions unless explicitly requested.

Feedback rules:
1. explanation: Write 2-3 concise Turkish sentences explaining the medical reasoning behind the correct answer. It must be case-specific and scientifically clear.
2. examPearl: Write one short Turkish decision sentence that links the key clue to the correct concept. Do not write isolated data or a raw keyword.
3. evidenceChain: Write exactly 3 short Turkish sentences. Each sentence must be a concrete clue explicitly present in the stem or data fields. Do not add labels, do not invent new findings, and do not directly repeat the correct answer.
4. wrongOptionFeedback: Write one specific, educational sentence for every option. The correct option feedback must briefly explain why it fits. Wrong option feedback must briefly explain why that option is eliminated. No option feedback may be generic.
5. managementSteps: Fill only when the question asks treatment, first step, emergency approach or management. Otherwise return [].
6. No duplicate sentences, no unfinished sentences, no template remnants and no contradiction with case data.

Before returning, silently check:
- medically correct
- one best answer
- no answer leakage
- branch-target alignment
- options same category
- complete values and units
- correct field labels
- no repeated data
- no invented evidenceChain clue
- no generic option feedback
- no duplicated feedback
- no unfinished or broken Turkish
- examPearl is a real decision sentence

Return only valid JSON. No markdown.

JSON schema:
{
  "title": "",
  "relatedBranch": "${branch}",
  "difficulty": "Kolay|Orta|Zor",
  "learningTarget": "single precise learning target in Turkish",
  "answerTarget": "${target}",
  "demographics": "short age-sex phrase in Turkish",
  "setting": "clinical setting in Turkish",
  "chiefComplaint": "main presentation in Turkish",
  "stem": "3-6 sentence Turkish clinical stem; do not repeat data panel results verbatim",
  "compactVitals": [
    {"label": "TA", "value": "..."}
  ],
  "compactObjectiveData": [
    {"label": "clean test/exam/imaging/microbiology/pathology label", "value": "complete result with unit if needed"}
  ],
  "question": "one clear Turkish question sentence",
  "options": [
    {"id": "A", "text": "..."},
    {"id": "B", "text": "..."},
    {"id": "C", "text": "..."},
    {"id": "D", "text": "..."},
    {"id": "E", "text": "..."}
  ],
  "correctAnswer": "A",
  "explanation": "2-3 concise Turkish sentences; specific clinical/scientific reasoning only",
  "wrongOptionFeedback": {
    "A": "one specific, educational sentence tied to this option and the case; state why it fits or why it is eliminated",
    "B": "one specific, educational sentence tied to this option and the case; state why it fits or why it is eliminated",
    "C": "one specific, educational sentence tied to this option and the case; state why it fits or why it is eliminated",
    "D": "one specific, educational sentence tied to this option and the case; state why it fits or why it is eliminated",
    "E": "one specific, educational sentence tied to this option and the case; state why it fits or why it is eliminated"
  },
  "evidenceChain": [
    "plain case clue sentence; no label",
    "plain case clue sentence; no label",
    "plain case clue sentence; no label"
  ],
  "examPearl": "one high-yield Turkish decision sentence",
  "managementSteps": [],
  "quality": {
    "scientificallySound": true,
    "singleBestAnswer": true,
    "optionsSameCategory": true,
    "noAnswerLeakage": true,
    "completeSentences": true
  }
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
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt },
          ],
          text: { format: { type: 'json_object' } },
          max_output_tokens: maxTokens,
          store: false,
        }
      : {
          model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
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
  if (!result) throw new Error('OPENAI_API_KEY tanımlı değil; AI üretim yapılamadı.');
  const sanitized = sanitizeQuestion(result.question, branch);
  sanitized.provider = 'openai';
  sanitized.openAIModel = result.model;
  sanitized.openAIMode = result.mode;
  sanitized.promptVersion = PROMPT_VERSION;
  sanitized.schemaVersion = SCHEMA_VERSION;
  const validation = validateQuestion(sanitized, recentQuestionSummaries);
  if (!validation.ok) {
    const criticalErrors = validation.errors.filter((message) =>
      /branch eksik|stem çok kısa|question net|tam 5 seçenek|correctAnswer|soru kökü\/veri paneli doğru cevabı ele veriyor|kanıt zinciri doğru cevabı doğrudan söylüyor/iu.test(message)
    );
    if (criticalErrors.length) {
      const error = new Error(criticalErrors.join('; '));
      error.validationErrors = criticalErrors;
      error.question = sanitized;
      throw error;
    }
    sanitized.qualityNotes = validation.errors;
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

  if (String(process.env.AI_ENABLE_SAFE_FALLBACK || 'false').toLowerCase() === 'true') {
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
