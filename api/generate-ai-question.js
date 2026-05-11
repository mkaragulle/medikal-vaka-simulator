import {
  OPTIMIZED_TUS_SYSTEM_PROMPT,
  buildRecentCompact,
  buildUserPrompt,
  normalizeDifficulty,
} from './tus-question-prompt.js';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const PROMPT_VERSION = 'klinikiq-clean-tus-spot-v30-clinical-rewrite-pass';
const SCHEMA_VERSION = 'simple-ai-spot-v2';
const SYSTEM_PROMPT = OPTIMIZED_TUS_SYSTEM_PROMPT;

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
    question.stem,
    question.question,
    ...compactItems(question.compactVitals || question.vitals || [], 5).flatMap((item) => [item.label, item.value]),
    ...compactItems(question.compactObjectiveData || question.objectiveData || [], 8).flatMap((item) => [item.label, item.value]),
  ].filter(Boolean).join(' | ');
}

function isDirectionalAnswer(text = '') {
  const value = normalize(text);
  if (!value || value.length > 40) return false;
  return /^(artar|artis olur|artmistir|azalir|azalis olur|azalmistir|degismez|degisiklik olmaz|normal kalir)$/iu.test(value);
}

function isDirectionChangeQuestion(question = {}) {
  const text = normalize([question.question, question.learningTarget, question.answerTarget].filter(Boolean).join(' '));
  return /nasil degisir|beklenen degisiklik|ne olur|artar mi|azalir mi|degismez mi|artim hacmi|kalp debisi|debi|filtrasyon|sekresyon|emilim|rezorpsiyon|basinc|hacim|konsantrasyon/.test(text);
}

function hasObjectiveDirectionLeak(question = {}, correctText = '') {
  if (!isDirectionalAnswer(correctText) || !isDirectionChangeQuestion(question)) return false;
  const objectiveItems = compactItems(question.compactObjectiveData || question.objectiveData || [], 8);
  if (!objectiveItems.length) return false;
  const objectiveText = normalize(objectiveItems.map((item) => `${item.label} ${item.value}`).join(' | '));
  const correct = normalize(correctText);
  if (/^artar|^artis|^artmis/.test(correct) && /arttigi|artmis|artar|artis|yukselmis|yuksek|fazla|artmi/.test(objectiveText)) return true;
  if (/^azalir|^azalis|^azalmis/.test(correct) && /azaldigi|azalmis|azalir|azalis|dusmus|dusuk|azalmi/.test(objectiveText)) return true;
  if (/^degismez|^degisiklik olmaz|^normal kalir/.test(correct) && /normal|korunmus|degismez|degisiklik yok/.test(objectiveText)) return true;
  return false;
}

function hasPhysiologyDeterminantPanel(question = {}) {
  const text = normalize([
    question.relatedBranch,
    question.learningTarget,
    question.answerTarget,
    question.question,
  ].filter(Boolean).join(' '));
  if (!/fizyoloji|physiology|mekanizma|mechanism|artim hacmi|stroke volume|kalp debisi|frank starling|preload|afterload|venoz donus/.test(text)) return false;
  const objectiveText = normalize(compactItems(question.compactObjectiveData || question.objectiveData || [], 8).map((item) => `${item.label} ${item.value}`).join(' | '));
  if (!objectiveText) return false;
  const determinant = /dolum|preload|afterload|kontraktilite|venoz donus|miyokard|ejeksiyon|komplians|basinc|hacim/.test(objectiveText);
  const interpretive = /arttigi|azaldigi|artmis|azalmis|normal oldugu|korundugu|yuksek|dusuk|artis|azalis/.test(objectiveText);
  return determinant && interpretive && isDirectionChangeQuestion(question);
}

function isMechanismDirectionTarget(question = {}) {
  const text = normalize([
    question.learningTarget,
    question.answerTarget,
    question.question,
  ].filter(Boolean).join(' '));
  return /mekanizma|mechanism|neden|patofizyoloji|prensip|principle|yorum|interpretation|yorumlama/.test(text);
}

function hasUnwantedDirectionOnlyQuestion(question = {}, correctText = '') {
  if (!isDirectionalAnswer(correctText) || !isDirectionChangeQuestion(question)) return false;
  return !isMechanismDirectionTarget(question);
}

function hasIncompleteObjectiveData(question = {}) {
  const items = compactItems(question.compactObjectiveData || question.objectiveData || [], 8);
  return items.some((item) => {
    const label = cleanText(item.label);
    const value = cleanText(item.value);
    if (!label || !value) return true;
    if (hasTruncatedText(`${label} ${value}`)) return true;
    if (normalize(label) === normalize(value)) return true;
    if (value.length < 3) return true;
    if (/^[<>~≈]?\d+(?:[.,]\d+)?$/u.test(value)) return true;
    if (/^[-–—:;,/]+$/u.test(value)) return true;
    return false;
  });
}

function hasDuplicateFeedbackSentences(question = {}) {
  const pieces = [
    question.explanation,
    question.examPearl,
    ...asArray(question.evidenceChain),
    ...Object.values(question.wrongOptionFeedback || question.optionFeedback || {}),
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
  return /^(first_step|next_step|treatment|prevention|management|emergency|emergency_approach|initial_management)$/iu.test(cleanText(answerTarget));
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
  /hedeflenen karar/iu,
  /hedeflenen klinik karar/iu,
  /klinik hedef/iu,
  /hedefi(?:ni)? .*karşılar/iu,
  /tanısal yönü öne çıkarır/iu,
  /ile birlikte değerlendirildiğinde .*hedef/iu,
  /destekler ile birlikte değerlendirildiğinde/iu,
  /^\s*(?:yanlış|doğru|uygun|uygun değildir)\.?\s*$/iu,
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
  /bu tabloda/iu,
  /verilerle en iyi uyumludur/iu,
  /tek en iyi yanıt değildir/iu,
  /diğer seçeneklerden ayrılır/iu,
  /olgudaki veriler birlikte değerlendirildiğinde/iu,
  /bu seçenek bu soru hedefi/iu,
];

function hasTruncatedText(text = '') {
  const value = cleanText(text);
  if (!value) return false;
  if (/\.{3}|…/u.test(text)) return true;
  if (/\b(?:ve|veya|ile|çünkü|ancak|fakat|bu nedenle|olarak|için)$/iu.test(value)) return true;
  if (/\b[a-zçğıöşü]{1,2}\.$/iu.test(value) && value.length > 40) return true;
  return false;
}

function sentenceCount(text = '') {
  return cleanText(text).split(/(?<=[.!?])\s+/u).map((item) => item.trim()).filter(Boolean).length;
}

function getFeedbackText(question = {}, id = '') {
  return cleanText(question.wrongOptionFeedback?.[id] || question.optionFeedback?.[id] || question.optionRationales?.[id] || '');
}

function hasMechanismLanguage(text = '') {
  return /patofizyoloji|mekanizma|reseptör|reseptor|agonist|antagonist|enzim|kanal|pompa|transport|kotransport|inhib|aktiv|blok|sentez|metabolizma|feedback|hormon|kompleman|koagülasyon|koagulasyon|membran|iyon|affinite|afinite|farmakolojik|fizyolojik|biyokimyasal/iu.test(cleanText(text));
}

function isMechanismSensitive(question = {}) {
  return /mechanism|mekanizma|farmakoloji|fizyoloji|biyokimya|ilaç|ilac|enzim|reseptör|reseptor/iu.test([
    question.answerTarget,
    question.relatedBranch,
    question.learningTarget,
    question.question,
  ].filter(Boolean).join(' '));
}

function hasDecisionLanguage(text = '') {
  return /ilk|öncel|acil|stabil|hava yolu|solunum|dolaşım|hemodinami|kültür|kultur|beklenmeden|geciktirilmez|kontrendike|endike|ayırıcı|ayirici|dışlanır|dislanir|doğrular|dogrular|destekler|gösterir|gosterir|beklenir|düşündürür|dusundurur|açıklar|aciklar/iu.test(cleanText(text));
}

function isBroadQuestionWording(questionText = '') {
  return /en önemli|en uygun|ilk yaklaşım|ilk müdahale|öncelikli|komplikasyon|ciddi seyir|risk göstergesi|marker|belirteç/iu.test(cleanText(questionText));
}

function hasClinicalContext(question = {}) {
  const text = cleanText([question.stem, question.question, question.setting].filter(Boolean).join(' '));
  return /acil|ilk|başlangıç|baslangic|stabil|hemodinami|tanı|tani|tedavi|izlem|tarama|profilaksi|gebelik|çocuk|erişkin|postop|travma|zehirlenme|saat|gün|hafta|akut|kronik/iu.test(text);
}

function isGenericFeedback(text = '') {
  const value = cleanText(text);
  if (!value || value.length < 28) return true;
  if (hasTruncatedText(value)) return true;
  return FORBIDDEN_PHRASES.some((pattern) => pattern.test(value));
}

function hasWrongOptionContrast(text = '') {
  const value = cleanText(text);
  // Keep this as a quality signal, not a hard blocker. Good Turkish feedback may be
  // concise and still useful without using a fixed phrase such as "bu olguda".
  const hasContrastConnector = /burada|bu olguda|bu vakada|oysa|ancak|fakat|ama|verilen|eşlik etmez|eslik etmez|desteklenmez|uymaz|yoktur|değildir|degildir|öncelik değildir|oncelik degildir/iu.test(value);
  const hasUseCaseOrClinicalCue = /düşünülür|dusunulur|beklenir|uygundur|seçilir|secilir|kullanılır|kullanilir|önceliklidir|endikedir|doğru olur|dogru olur|tipiktir|görülür|gorulur|tanıda|tedavide|izlemde|tarama|profilaksi|acilde|stabil|şok|sok|hipotansiyon|ateş|ates|ağrı|agri|laboratuvar|ekg|grafi|seroloji|kültür|kultur/iu.test(value);
  return value.length >= 45 && (hasContrastConnector || hasUseCaseOrClinicalCue);
}

function hasFeedbackQuality(question = {}, options = [], correctId = '') {
  const errors = [];
  const correctFeedback = getFeedbackText(question, correctId);
  if (!correctFeedback || isGenericFeedback(correctFeedback)) errors.push('doğru seçenek açıklaması eksik veya zayıf');
  options.forEach((option) => {
    const feedback = getFeedbackText(question, option.id);
    if (!feedback) errors.push(`seçenek ${option.id} feedback eksik`);
    else if (option.id !== correctId && isGenericFeedback(feedback)) errors.push(`seçenek ${option.id} feedback eksik veya zayıf`);
  });
  return { ok: errors.length === 0, errors };
}

function hasPearlQuality(text = '') {
  const value = cleanText(text);
  if (value.length < 25 || value.length > 240) return false;
  if (isGenericFeedback(value)) return false;
  // A pearl should be memorable, but lack of a specific keyword must not kill generation.
  return hasMechanismLanguage(value) || hasDecisionLanguage(value) || /→|=|:|ise|daima|önce|sonra|en çok|tipik/iu.test(value);
}

function hasExplanationQuality(question = {}, correctText = '') {
  const explanation = cleanText(question.explanation);
  if (explanation.length < 60 || sentenceCount(explanation) < 1 || isGenericFeedback(explanation)) return false;
  if (hasTruncatedText(explanation)) return false;
  if (isMechanismSensitive(question)) return hasMechanismLanguage(explanation) || hasMechanismLanguage(question.examPearl);
  return true;
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
  if (!Array.isArray(question.evidenceChain) || question.evidenceChain.length !== 3) errors.push('evidenceChain tam 3 cümle değil');
  if (!question.examPearl || cleanText(question.examPearl).length < 20) errors.push('examPearl yetersiz');
  if (hasTruncatedText(allText)) errors.push('kesik veya üç noktalı metin var');
  if (!hasExplanationQuality(question, correctText)) errors.push('doğru cevap açıklaması klinik/mekanistik gerekçe içermiyor');
  if (!hasPearlQuality(question.examPearl)) errors.push('TUS ipucu karar cümlesi değil');
  const feedbackQuality = hasFeedbackQuality(question, options, correctId);
  if (!feedbackQuality.ok) errors.push(...feedbackQuality.errors);
  if (isMechanismSensitive(question) && !hasMechanismLanguage([question.explanation, question.examPearl, question.wrongOptionFeedback?.[correctId], question.optionFeedback?.[correctId]].filter(Boolean).join(' '))) errors.push('mekanizma hassasiyeti zayıf');
  if (isBroadQuestionWording(question.question) && !hasClinicalContext(question)) errors.push('soru hedefi geniş, klinik bağlam daraltılmamış');
  FORBIDDEN_PHRASES.forEach((pattern) => {
    if (pattern.test(allText)) errors.push('jenerik/yasak feedback kalıbı var');
  });

  if (correctText && containsAnswerLeak(getPreAnswerDataText(question), correctText)) errors.push('soru kökü/veri paneli doğru cevabı ele veriyor');
  if (hasObjectiveDirectionLeak(question, correctText)) errors.push('veri paneli yön/değişim cevabını fazla ele veriyor');
  if (hasPhysiologyDeterminantPanel(question)) errors.push('fizyoloji sorusunda veri paneli sonucu belirleyen yorumu doğrudan veriyor');
  if (hasUnwantedDirectionOnlyQuestion(question, correctText)) errors.push('basit artar/azalır/değişmez sorusu mekanizma hedefi olmadan üretilmiş');
  if (hasIncompleteObjectiveData(question)) errors.push('eksik veya tamamlanmamış objektif veri değeri var');
  if (asArray(question.evidenceChain).some((item) => containsAnswerLeak(item, correctText))) errors.push('kanıt zinciri doğru cevabı doğrudan söylüyor');
  if (hasDuplicateFeedbackSentences(question)) errors.push('feedback içinde tekrar eden cümle var');
  if (!isManagementTarget(question.answerTarget) && asArray(question.managementSteps).length) errors.push('bu soru tipinde yönetim basamağı gereksiz');

  const categories = options.map((option) => optionCategory(option.text)).filter((category) => category !== 'other');
  const dominant = categories.sort((a, b) => categories.filter((x) => x === b).length - categories.filter((x) => x === a).length)[0];
  if (dominant && categories.filter((category) => category !== dominant).length >= 2) errors.push('seçenekler aynı kavramsal kategoride değil');

  const correctNorm = normalize(correctText);
  const optionSetNorm = normalize(options.map((item) => item.text).sort().join(' | '));
  const stemNorm = normalize(question.stem);
  const currentTargetNorm = normalize([question.relatedBranch, question.answerTarget, question.learningTarget, correctText].filter(Boolean).join(' | '));
  asArray(recentQuestionSummaries).slice(0, 12).forEach((recent) => {
    const recentBranch = normalize(recent.branch || recent.relatedBranch || recent.branchName || '');
    const sameBranch = !recentBranch || !normalize(question.relatedBranch) || recentBranch === normalize(question.relatedBranch);
    const recentCorrect = normalize(recent.correct || recent.correctAnswer || recent.correctAnswerText || '');
    if (correctNorm && recentCorrect === correctNorm && optionSetNorm && normalize(asArray(recent.optionTexts).slice().sort().join(' | ') || recent.optionSetSignature) === optionSetNorm) errors.push('yakın geçmişte aynı doğru cevap ve seçenek seti var');
    const recentStem = normalize(recent.stem || recent.normalizedStem || '');
    if (stemNorm.length > 100 && recentStem.length > 100 && (stemNorm.includes(recentStem.slice(0, 100)) || recentStem.includes(stemNorm.slice(0, 100)))) errors.push('yakın geçmişte aynı soru kökü var');
    const recentTargetNorm = normalize([recent.branch || recent.relatedBranch, recent.answerTarget || recent.questionType, recent.learningTarget, recent.correct || recent.correctAnswer || recent.correctAnswerText].filter(Boolean).join(' | '));
    if (sameBranch && correctNorm && recentCorrect === correctNorm && currentTargetNorm && recentTargetNorm && (currentTargetNorm.includes(recentTargetNorm) || recentTargetNorm.includes(currentTargetNorm))) errors.push('yakın geçmişte aynı öğrenme hedefi var');
  });

  return { ok: errors.length === 0, errors: Array.from(new Set(errors)), options, correctText };
}

function sanitizeQuestion(question = {}, branch, requestedDifficulty = '') {
  const options = normalizeOptions(question.options);
  const correctId = String(question.correctAnswer || '').trim().toUpperCase();
  const correctText = options.find((item) => item.id === correctId)?.text || options[0]?.text || '';
  const answerTarget = cleanText(question.answerTarget || question.questionIntent || '');
  const allowManagementSteps = isManagementTarget(answerTarget);
  const sanitized = {
    id: cleanText(question.id) || `ai-spot-openai-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    source: 'real-ai',
    caseType: 'ai-spot',
    relatedBranch: cleanText(question.relatedBranch || branch),
    difficulty: normalizeDifficulty(requestedDifficulty || question.difficulty || 'Orta'),
    learningTarget: cleanText(question.learningTarget || ''),
    answerTarget,
    demographics: cleanText(question.demographics || ''),
    setting: cleanText(question.setting || ''),
    chiefComplaint: cleanText(question.chiefComplaint || ''),
    stem: ensureSentence(question.stem),
    compactVitals: compactItems(question.compactVitals || question.vitals || [], 5),
    compactObjectiveData: compactItems(question.compactObjectiveData || question.objectiveData || [], 8),
    question: ensureQuestion(question.question),
    options,
    correctAnswer: OPTION_IDS.includes(correctId) ? correctId : (options[0]?.id || 'A'),
    explanation: ensureSentence(question.explanation || question.whyCorrect || ''),
    wrongOptionFeedback: OPTION_IDS.reduce((acc, id) => {
      const rawFeedback = question.wrongOptionFeedback?.[id] || question.optionFeedback?.[id] || question.optionRationales?.[id] || '';
      const fallbackFeedback = id === correctId ? (question.explanation || question.whyCorrect || '') : '';
      acc[id] = ensureSentence(rawFeedback || fallbackFeedback);
      return acc;
    }, {}),
    evidenceChain: asArray(question.evidenceChain).map(ensureSentence).filter(Boolean).slice(0, 3),
    examPearl: ensureSentence(stripFeedbackLabel(question.examPearl || question.teachingPoint)),
    managementSteps: allowManagementSteps ? asArray(question.managementSteps).map(ensureSentence).filter(Boolean).slice(0, 3) : [],
  };
  sanitized.correctAnswerText = correctText;
  sanitized.semanticFingerprint = makeSignature(sanitized);
  return sanitized;
}

const FALLBACK_BANK = [
  {
    relatedBranch: 'İç Hastalıkları', difficulty: 'Orta', learningTarget: 'Laboratuvar verisini klinik bağlamla birlikte yorumlama.', answerTarget: 'lab_interpretation', demographics: 'Erişkin hasta', setting: 'Acil servis', chiefComplaint: 'Halsizlik', stem: 'Erişkin hasta son günlerde artan halsizlik ve dikkat azalması nedeniyle değerlendirilir. Öyküde sıvı alımında azalma vardır. Muayenede belirgin fokal nörolojik defisit saptanmaz.', compactObjectiveData: [{ label: 'Serum sodyum', value: '122 mEq/L' }, { label: 'Serum osmolalitesi', value: 'Düşük' }], question: 'Bu olgudaki laboratuvar paternini en iyi açıklayan seçenek hangisidir?', options: [{ id: 'A', text: 'Hipotonik hiponatremi' }, { id: 'B', text: 'Hipertonik hiponatremi' }, { id: 'C', text: 'İzotonik psödohiponatremi' }, { id: 'D', text: 'Hipernatremik dehidratasyon' }, { id: 'E', text: 'Primer hiperkalemi' }], correctAnswer: 'A', explanation: 'Düşük sodyum düzeyine düşük serum osmolalitesinin eşlik etmesi hipotonik hiponatremiyi destekler. Sonraki ayrım volüm durumu ve idrar elektrolitleriyle yapılır.', wrongOptionFeedback: { A: 'Bu seçenek düşük osmolalite ile birlikte gerçek hipotonik tabloyu açıklar.', B: 'Bu seçenek osmotik olarak aktif ek solüt varlığında düşünülür; burada düşük osmolalite verilmiştir.', C: 'Psödohiponatremide serum osmolalitesi genellikle normaldir; bu veri burada desteklenmez.', D: 'Hipernatremik tabloda serum sodyumu yüksek beklenir; burada düşük sodyum vardır.', E: 'Potasyum bozukluğu bu panelin ana açıklaması değildir.' }, evidenceChain: ['Serum sodyumu düşüktür.', 'Serum osmolalitesi düşüktür.', 'Bilinç değişikliği semptomatik tabloyu destekler.'], examPearl: 'Hiponatremi yorumunda ilk ayrım serum osmolalitesidir; düşük osmolalite gerçek hipotonik hiponatremiyi gösterir.', managementSteps: [] },
  {
    relatedBranch: 'Çocuk Sağlığı ve Hastalıkları', difficulty: 'Orta', learningTarget: 'Pediatrik acilde risk bulgularını ayırt etme.', answerTarget: 'first_step', demographics: 'Küçük çocuk', setting: 'Çocuk acil', chiefComplaint: 'Ateş ve halsizlik', stem: 'Küçük çocuk ateş ve beslenmede azalma nedeniyle acile getirilir. Aile çocuğun son saatlerde daha halsiz olduğunu belirtir. Muayenede kapiller dolum süresi uzamış ve cilt turgoru azalmıştır.', compactVitals: [{ label: 'Ateş', value: '39 °C' }, { label: 'Nabız', value: 'Taşikardik' }], question: 'Bu olguda öncelikle değerlendirilmesi gereken klinik öncelik hangisidir?', options: [{ id: 'A', text: 'Perfüzyon ve hidrasyon durumu' }, { id: 'B', text: 'Uzun dönem büyüme izlemi' }, { id: 'C', text: 'Rutin aşı takvimi planı' }, { id: 'D', text: 'Elektif dermatoloji değerlendirmesi' }, { id: 'E', text: 'Okul çağı psikososyal taraması' }], correctAnswer: 'A', explanation: 'Ateşli çocukta halsizlik, uzamış kapiller dolum ve turgor azalması dolaşım ve hidrasyon değerlendirmesini öncelikli kılar. Diğer seçenekler akut acil karar düzeyini karşılamaz.', wrongOptionFeedback: { A: 'Bu seçenek akut risk değerlendirmesinin merkezindedir.', B: 'Büyüme izlemi önemlidir; ancak akut perfüzyon bulguları varken ilk öncelik değildir.', C: 'Aşı takvimi koruyucu sağlık başlığıdır; bu acil başvurunun ilk kararını açıklamaz.', D: 'Elektif değerlendirme akut sistemik bulguların önüne geçmez.', E: 'Psikososyal tarama bu akut perfüzyon sorununu yanıtlamaz.' }, evidenceChain: ['Beslenme azalmıştır.', 'Kapiller dolum süresi uzamıştır.', 'Cilt turgoru azalmıştır.'], examPearl: 'Pediatrik acilde genel durum ve perfüzyon bulguları tanısal ayrıntılardan önce değerlendirilir.', managementSteps: ['Hava yolu, solunum ve dolaşım hızlıca değerlendirilir.', 'Perfüzyon ve hidrasyon bulgularına göre sıvı planı yapılır.'] },
];

function fallbackQuestion({ branchFilter, difficulty = 'Orta', recentQuestionSummaries }) {
  const branch = chooseBranch(branchFilter);
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const recentCorrectAnswers = new Set(asArray(recentQuestionSummaries).map((item) => normalize(item.correct || item.correctAnswer || item.correctAnswerText || '')));
  const candidates = FALLBACK_BANK.filter((item) => normalize(branchFilter).includes(normalize(item.relatedBranch)) || normalize(item.relatedBranch).includes(normalize(branchFilter)) || ['random', 'rastgele', ''].includes(normalize(branchFilter)));
  const pool = candidates.length ? candidates : FALLBACK_BANK;
  const selected = pool.find((item) => !recentCorrectAnswers.has(normalize(getCorrectText(item)))) || pool[Math.floor(Math.random() * pool.length)];
  return sanitizeQuestion({ ...selected, difficulty: selectedDifficulty, id: `ai-spot-fallback-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }, branch, selectedDifficulty);
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

function buildPrompt({ branch, target, difficulty = 'Orta', recentQuestionSummaries = [], attempt = 1, antiRepeatNonce = '' }) {
  const answerTarget = cleanText(target || '');
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const recentCompact = buildRecentCompact(recentQuestionSummaries);
  return buildUserPrompt({
    branch,
    target: answerTarget,
    difficulty: selectedDifficulty,
    recentCompact,
    attempt,
    antiRepeatNonce: antiRepeatNonce || Date.now(),
  });
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

async function generateRemote({ branch, target, difficulty, recentQuestionSummaries, attempt, antiRepeatNonce }) {
  const prompt = buildPrompt({ branch, target, difficulty, recentQuestionSummaries, attempt, antiRepeatNonce });
  const result = await callOpenAI(prompt);
  if (!result) throw new Error('OPENAI_API_KEY tanımlı değil; AI üretim yapılamadı.');
  const sanitized = sanitizeQuestion(result.question, branch, difficulty);
  sanitized.provider = 'openai';
  sanitized.openAIModel = result.model;
  sanitized.openAIMode = result.mode;
  sanitized.promptVersion = PROMPT_VERSION;
  sanitized.schemaVersion = SCHEMA_VERSION;
  const validation = validateQuestion(sanitized, recentQuestionSummaries);
  if (!validation.ok) {
    // Balanced gate: block only unsafe/structural failures. Pedagogic improvements
    // such as non-ideal feedback, weak pearl, broad wording, or near-repeat are kept
    // as quality notes so the UI still receives a usable question instead of failing.
    const blockingErrors = validation.errors.filter((message) =>
      /branch eksik|stem çok kısa|question net soru cümlesi değil|tam 5 seçenek yok|correctAnswer A-E değil|correctAnswer seçeneklerle eşleşmiyor|explanation yetersiz|doğru cevap açıklaması eksik veya zayıf|feedback eksik|feedback eksik veya zayıf|evidenceChain tam 3|examPearl yetersiz|soru kökü\/veri paneli doğru cevabı ele veriyor|veri paneli yön\/değişim cevabını fazla ele veriyor|fizyoloji sorusunda veri paneli sonucu belirleyen yorumu doğrudan veriyor|kanıt zinciri doğru cevabı doğrudan söylüyor|kesik veya üç noktalı metin var|eksik veya tamamlanmamış objektif veri değeri var|basit artar\/azalır\/değişmez sorusu mekanizma hedefi olmadan üretilmiş/iu.test(message)
    );
    if (blockingErrors.length) {
      const error = new Error(blockingErrors.join('; '));
      error.validationErrors = blockingErrors;
      error.question = sanitized;
      throw error;
    }
    sanitized.qualityNotes = validation.errors;
    sanitized.qualityGate = 'passed-with-notes';
  } else {
    sanitized.qualityGate = 'passed';
  }
  return sanitized;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }

  const branch = chooseBranch(body.branchFilter);
  const requestedDifficulty = normalizeDifficulty(body.difficulty || body.requestedDifficulty || body.aiDifficulty || 'Orta');
  const recentQuestionSummaries = asArray(body.recentQuestionSummaries).slice(0, 12);
  const remoteAttempts = Math.max(1, Math.min(2, Number(process.env.REMOTE_AI_ATTEMPTS || 2)));
  const errors = [];

  for (let attempt = 1; attempt <= remoteAttempts; attempt += 1) {
    try {
      const question = await generateRemote({ branch, target: body.target || body.answerTarget, difficulty: requestedDifficulty, recentQuestionSummaries, attempt, antiRepeatNonce: body.antiRepeatNonce });
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

  if (String(process.env.AI_ENABLE_SAFE_FALLBACK || 'true').toLowerCase() === 'true') {
    const question = fallbackQuestion({ branchFilter: branch, difficulty: requestedDifficulty, recentQuestionSummaries });
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
