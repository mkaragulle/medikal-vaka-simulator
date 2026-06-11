import {
  OPTIMIZED_TUS_SYSTEM_PROMPT,
  buildRecentCompact,
  buildUserPrompt,
  normalizeDifficulty,
} from '../server/prompts/tus-question-prompt.js';
import { applyCostProfileToMaxTokens, buildOutputCacheKey, buildPromptCacheConfig, buildQuestionBankKey, callOpenAIWithPromptCacheFallback, addQuestionToBank, defaultModelForScope, defaultReasoningEffortForProfile, defaultVerbosityForProfile, detailModeForProfile, envFlag, getAICostProfile, getDurableCachedOutput, getQuestionBankItems, logAIUsage, resolveModelForScope, setDurableCachedOutput, withInFlightDedupe } from '../server/lib/ai-token-optimizer.js';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const PROMPT_VERSION = 'klinikiq-clean-tus-spot-v40-balanced-clinical-quality-gate';
const SCHEMA_VERSION = 'simple-ai-spot-v2';
const SYSTEM_PROMPT = OPTIMIZED_TUS_SYSTEM_PROMPT;
const TASK_NAME = 'tusSpotQuestion';

function currentTusModel() {
  return resolveModelForScope('TUS');
}

function useQuestionBank() {
  return envFlag('KLINIKIQ_AI_QUESTION_BANK', true);
}


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
  /bu klinik hedef için uygundur/iu,
  /^\s*(?:n|h)\.?\s*$/iu,
  /^\s*tanıyı destekler\.?\s*$/iu,
  /^\s*nonspesifiktir\.?\s*$/iu,
  /^\s*spesifik değildir\.?\s*$/iu,
  /^\s*destekleyicidir\.?\s*$/iu,
  /^\s*yetersizdir\.?\s*$/iu,
  /doğru seçenek/iu,
  /doğru cevap/iu,
  /bu seçenek doğrudur/iu,
  /bu seçenek doğrudur çünkü/iu,
  /hedeflenen karar/iu,
  /klinik hedef/iu,
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

function isAnatomyFeedbackContext(question = {}) {
  const text = normalize([
    question.relatedBranch,
    question.learningTarget,
    question.answerTarget,
    question.question,
    question.stem,
  ].filter(Boolean).join(' '));
  return /anatomi|sinir|nervus|nerve|pleksus|pleksusu|kanal|foramen|innervasyon|duyu kaybi|motor defisit|kas gucsuzlugu/.test(text);
}

function hasIsolatedFeedbackAbbreviation(text = '', question = {}) {
  const value = cleanText(text);
  if (!value) return true;
  if (/^\s*(?:n|h|m)\.?\s*$/iu.test(value)) return true;
  if (/^\s*[A-ZÇĞİÖŞÜa-zçğıöşü]\.?\s*$/u.test(value)) return true;
  if (/^\s*(?:N|n)\.\s*[A-ZÇĞİÖŞÜa-zçğıöşü-]*\.?\s*$/u.test(value)) return true;
  if (isAnatomyFeedbackContext(question) && /\b(?:N|n)\.\s*[A-ZÇĞİÖŞÜa-zçğıöşü-]+/u.test(value)) return true;
  if (isAnatomyFeedbackContext(question) && /\b(?:m|M)\.\s*[A-ZÇĞİÖŞÜa-zçğıöşü-]+/u.test(value)) return true;
  return false;
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
  if (!correctFeedback || isGenericFeedback(correctFeedback) || hasIsolatedFeedbackAbbreviation(correctFeedback, question)) errors.push('doğru seçenek açıklaması eksik veya zayıf');
  options.forEach((option) => {
    const feedback = getFeedbackText(question, option.id);
    if (!feedback) errors.push(`seçenek ${option.id} feedback eksik`);
    else if (isGenericFeedback(feedback) || hasIsolatedFeedbackAbbreviation(feedback, question)) errors.push(`seçenek ${option.id} feedback eksik veya zayıf`);
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


function wordCount(value = '') {
  return cleanText(value).split(/\s+/u).filter(Boolean).length;
}

function richSentenceCount(value = '') {
  const text = cleanText(value);
  if (!text) return 0;
  const punctuated = text.split(/(?<=[.!?])\s+/u).map((item) => item.trim()).filter(Boolean).length;
  if (punctuated >= 2) return punctuated;
  // Fallback for long Turkish clinical sentences separated by semicolons/commas.
  return text.split(/\s*(?:;)\s*/u).map((item) => item.trim()).filter((item) => wordCount(item) >= 8).length || 1;
}

function isBasicScienceBranch(branch = '') {
  const value = normalize(branch);
  return /anatomi|histoloji|embriyoloji|biyokimya|fizyoloji/.test(value);
}

function countClinicalCueGroups(question = {}) {
  const text = normalize([
    question.demographics,
    question.setting,
    question.chiefComplaint,
    question.stem,
  ].filter(Boolean).join(' '));

  const groups = [
    /\b(?:\d+\s*(?:yaş|yas|aylık|aylik|günlük|gunluk|haftalık|haftalik)|yenidogan|yenidoğan|bebek|çocuk|cocuk|ergen|kadın|kadin|erkek|gebe|postpartum)\b/u,
    /\b(?:saat|gün|gun|hafta|ay|yıl|yildir|gündür|gundur|başlayan|baslayan|sonra|önce|once|akut|kronik|tekrarlayan|uzun süren|uzun suren)\b/u,
    /\b(?:ateş|ates|ağrı|agri|öksürük|oksuruk|dispne|nefes darlığı|nefes darligi|kusma|ishal|sarılık|sarilik|ödem|odem|döküntü|dokuntu|kanama|nöbet|nobet|senkop|halsizlik|kilo kaybı|kilo kaybi|emme güçlüğü|emme guclugu|beslenememe|baş ağrısı|bas agrisi|çarpıntı|carpinti)\b/u,
    /\b(?:muayene|oskulasyon|palpasyon|defans|rebound|ral|ronkus|wheezing|hışıltı|hisilti|üfürüm|ufurum|hepatomegali|splenomegali|lenfadenopati|döküntü|dokuntu|bilinç|bilinc|letarji|hipotoni|rijidite|trismus|ödem|odem|solunum sıkıntısı|solunum sikintisi)\b/u,
    /\b(?:tansiyon|kan basıncı|kan basinci|nabız|nabiz|taşikardi|tasikardi|bradikardi|solunum sayısı|solunum sayisi|spo2|spo₂|satürasyon|saturasyon|ateşi|atesi|hipotansiyon|hipoksi|şok|sok)\b/u,
    /\b(?:hemoglobin|lökosit|lokosit|trombosit|crp|sedimentasyon|glukoz|sodyum|potasyum|kalsiyum|kreatinin|üre|ure|ast|alt|bilirubin|troponin|ph|hco3|pco2|po2|laktat|amonyak|keton|proteinüri|proteinuri|hematüri|hematuri|mmol|mg\/dl|iu\/l|µmol|umol|z-skor|z skor)\b/u,
    /\b(?:grafi|akciğer grafisi|akciger grafisi|ultrason|usg|bt|mr|mrg|ekg|eko|ekokardiyografi|biyopsi|kültür|kultur|pcr|seroloji|idrar tahlili|periferik yayma|tomografi)\b/u,
    /\b(?:öyküsünde|oykusunde|aile öyküsü|aile oykusu|travma|ilaç|ilac|aşı|asi|temas|seyahat|prematüre|premature|doğum|dogum|gebelik|ameliyat|operasyon|risk faktörü|risk faktoru)\b/u,
    /\b(?:yok|saptanmadı|saptanmadi|tariflemiyor|eşlik etmiyor|eslik etmiyor|normal|negatif|stabil|hipoksi yok|solunum sıkıntısı yok|solunum sikintisi yok)\b/u,
  ];

  return groups.reduce((count, pattern) => count + (pattern.test(text) ? 1 : 0), 0);
}

function hasSufficientClinicalVignette(question = {}) {
  const errors = [];
  const branch = cleanText(question.relatedBranch || '');
  const stem = cleanText(question.stem || '');
  const combined = cleanText([
    question.demographics,
    question.setting,
    question.chiefComplaint,
    stem,
  ].filter(Boolean).join(' '));
  const basicScience = isBasicScienceBranch(branch);
  const stemWords = wordCount(stem);
  const totalWords = wordCount(combined);
  const minStemWords = basicScience ? 28 : 42;
  const minTotalWords = basicScience ? 36 : 55;
  const minCueGroups = basicScience ? 2 : 3;

  if (stemWords < minStemWords || totalWords < minTotalWords) {
    errors.push('klinik olgu yetersiz: ana metin çözülebilirlik için çok kısa');
  }
  if (richSentenceCount(stem) < 2) {
    errors.push('klinik olgu yetersiz: ana metin en az iki tam cümle içermeli');
  }

  const hasPatientContext = /\b(?:\d+\s*(?:yaş|yas|aylık|aylik|günlük|gunluk|haftalık|haftalik)|yenidoğan|yenidogan|bebek|çocuk|cocuk|ergen|kadın|kadin|erkek|hasta|gebe)\b/iu.test(combined);
  if (!hasPatientContext) {
    errors.push('klinik olgu yetersiz: yaş/cinsiyet veya hasta bağlamı eksik');
  }

  const cueGroups = countClinicalCueGroups(question);
  if (cueGroups < minCueGroups) {
    errors.push('klinik olgu yetersiz: ayırt ettirici klinik ipucu sayısı az');
  }

  const questionText = normalize(question.question || '');
  const requiresDecisionContext = /tedavi|müdahale|mudahale|yaklaşım|yaklasim|ilk|acil|öncelikli|oncelikli|tanı|tani|test|tetkik|doğrula|dogrula|yönetim|yonetim|hangisi/.test(questionText);
  const hasDecisionData = /ateş|ates|ağrı|agri|muayene|laboratuvar|grafi|usg|bt|mr|ekg|eko|kültür|kultur|pcr|seroloji|ph|hco3|glukoz|sodyum|potasyum|kreatinin|troponin|laktat|amonyak|hipotansiyon|hipoksi|bilinç|bilinc|nöbet|nobet|stabil|şok|sok|z-skor|z skor|risk|kontrendikasyon|doz|düzey|duzey|değer|deger|pozitif|negatif/iu.test(combined);
  if (requiresDecisionContext && !hasDecisionData) {
    errors.push('klinik olgu yetersiz: soruyu çözdürecek laboratuvar/muayene/görüntüleme veya karar verdirici veri eksik');
  }

  const isTreatmentQuestion = /tedavi|müdahale|mudahale|yaklaşım|yaklasim|ilk|acil|öncelikli|oncelikli|yönetim|yonetim|profilaksi/.test(questionText);
  const hasTreatmentTimingOrSeverity = /stabil|unstabil|hipotansiyon|şok|sok|hipoksi|solunum sıkıntısı|solunum sikintisi|bilinç|bilinc|nöbet|nobet|ağır|agir|hafif|orta|yüksek|yuksek|düşük|dusuk|hızla|hizla|saat|gün|gun|hafta|başlangıç|baslangic|sonra|önce|once|risk|kontrendikasyon|düzey|duzey|mg\/dl|mmol|µmol|umol|z-skor|z skor|başlanmış|baslanmis|yanıt|yanit/.test(normalize(combined));
  if (isTreatmentQuestion && !hasTreatmentTimingOrSeverity) {
    errors.push('klinik olgu yetersiz: tedavi/ilk yaklaşım için şiddet, stabilite, zamanlama veya eşik bilgisi eksik');
  }

  return errors;
}

function hasEvidenceBasedOnVisibleStem(question = {}) {
  const visible = normalize([
    question.demographics,
    question.setting,
    question.chiefComplaint,
    question.stem,
  ].filter(Boolean).join(' '));
  const evidence = asArray(question.evidenceChain).map((item) => normalize(item)).filter(Boolean);
  if (evidence.length !== 3) return false;
  const clinicalTokens = /ateş|ates|ağrı|agri|muayene|laboratuvar|grafi|bt|mr|usg|ekg|eko|kültür|kultur|pcr|seroloji|sodyum|potasyum|glukoz|ph|hco3|amonyak|troponin|laktat|hipotansiyon|hipoksi|nöbet|nobet|bilinç|bilinc|öykü|oyku|z-skor|z skor|mmol|mg\/dl|µmol|umol/;
  return evidence.every((item) => {
    if (!clinicalTokens.test(item)) return true;
    const words = item.split(/\s+/u).filter((word) => word.length >= 5 && !/^(bulgu|olgu|hasta|klinik|destekler|uyumludur|gösterir|gosterir|nedeniyle|birlikte)$/u.test(word));
    return words.some((word) => visible.includes(word));
  });
}


function validateQuestion(question = {}, recentQuestionSummaries = []) {
  const errors = [];
  const options = normalizeOptions(question.options);
  const correctId = String(question.correctAnswer || '').trim().toUpperCase();
  const correctText = getCorrectText({ ...question, options });
  const allText = collectStrings(question).join(' | ');

  if (!question.relatedBranch || cleanText(question.relatedBranch).length < 3) errors.push('branch eksik');
  if (!question.stem || cleanText(question.stem).split(/\s+/).length < 25) errors.push('stem çok kısa');
  if (isGenericOrPlaceholderStem(question.stem)) errors.push('stem placeholder veya klinik bağlamdan yoksun');
  if (!hasVisibleClinicalPattern(question)) errors.push('soru kökünde görünür klinik patern yok');
  errors.push(...hasSufficientClinicalVignette(question));
  if (!hasEvidenceBasedOnVisibleStem(question)) errors.push('kanıt zinciri ana metindeki görünür verilere dayanmıyor');
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
  if (hasImpossibleClinicalValue(question)) errors.push('imkansız veya bozuk klinik değer/ifade var');
  if (hasMalformedTurkishClinicalWording(question)) errors.push('bozuk Türkçe veya makine çevirisi klinik ifade var');
  if (hasAmbiguousHyperammonemiaEmergencyTarget(question)) errors.push('hiperamonyemi acil tedavi sorusunda eşik/şiddet/zamanlama bilgisi eksik');
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


function formatInlineClinicalData(items = [], prefix = '') {
  const rows = asArray(items)
    .map((item) => {
      if (typeof item === 'string') return cleanText(item);
      const label = cleanText(item?.label || item?.name || item?.parameter || item?.title || '');
      const value = cleanText(item?.value || item?.result || item?.text || item?.finding || '');
      if (!label && !value) return '';
      if (!value) return label;
      return `${label}: ${value}`;
    })
    .filter(Boolean)
    .filter((line) => !/^(görüntüleme|destekleyici veriler|laboratuvar|fizik muayene|eko|ekokardiyografi)$/iu.test(line));
  if (!rows.length) return '';
  return ensureSentence(`${prefix}${rows.join('; ')}`);
}

function integrateCompactDataIntoStem(stem = '', vitals = [], objectiveData = []) {
  const base = ensureSentence(stem || '');
  const vitalSentence = formatInlineClinicalData(vitals, 'Ek klinik verilerde ');
  const objectiveSentence = formatInlineClinicalData(objectiveData, 'Tetkik ve destekleyici bulgularda ');
  return [base, vitalSentence, objectiveSentence]
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}


function isGenericOrPlaceholderStem(stem = '') {
  const value = normalize(stem);
  if (!value) return true;
  const wordCount = cleanText(stem).split(/\s+/).filter(Boolean).length;
  if (wordCount < 32) return true;
  return [
    /kisa klinik baglam/,
    /karar verdirici bulgular birlikte degerlendirilir/,
    /klinik veriler birlikte degerlendirilir/,
    /bu bulgulara gore$/,
    /bu olguda en uygun secenek hangisidir$/,
    /kisa klinik olgu verileri/,
    /hasta degerlendirilir$/,
  ].some((pattern) => pattern.test(value));
}

function hasVisibleClinicalPattern(question = {}) {
  const stem = cleanText(question.stem || '');
  const branch = normalize(question.relatedBranch || '');
  const questionText = normalize(question.question || '');
  const combined = normalize([question.demographics, question.setting, question.chiefComplaint, question.stem].filter(Boolean).join(' '));
  const hasAgeOrPatient = /\b(?:yaş|yas|aylık|aylik|günlük|gunluk|haftalık|haftalik|yenidoğan|yenidogan|bebek|çocuk|cocuk|ergen|kadın|kadin|erkek|hasta|geb[eelikli]*)\b/.test(combined);
  const hasClinicalFinding = /ateş|ates|ağrı|agri|öksürük|oksuruk|dispne|kusma|ishal|ödem|odem|döküntü|dokuntu|kanama|sarılık|sarilik|nöbet|nobet|halsizlik|kilo|büyüme|buyume|muayene|hipotansiyon|taşikardi|tasikardi|laboratuvar|sodyum|potasyum|glukoz|ph|hco3|kreatinin|lökosit|lokosit|trombosit|hemoglobin|troponin|ekg|usg|bt|mr|grafi|biyopsi|kültür|kultur|öykü|oyku/.test(combined);
  const asksFromFindings = /bu bulgulara gore|bu olguda|verilen bulgular|asagidaki testlerden|hangi test|hangi tedavi|hangi tani|hangisi/.test(questionText);
  if (asksFromFindings && (!hasAgeOrPatient || !hasClinicalFinding)) return false;
  if (/cocuk sagligi|pediatri/.test(branch) && !/(aylık|aylik|yaş|yas|günlük|gunluk|yenidoğan|yenidogan|bebek|çocuk|cocuk|ergen)/iu.test(stem)) return false;
  return true;
}

function hasImpossibleClinicalValue(question = {}) {
  const text = collectStrings(question).join(' | ');
  const normalized = cleanText(text);

  const feverMatches = [...normalized.matchAll(/(?:ateş|ates|sıcaklık|sicaklik)[^0-9-]{0,24}(-?\d{1,2}(?:[.,]\d)?)/giu)];
  for (const match of feverMatches) {
    const value = Number.parseFloat(String(match[1]).replace(',', '.'));
    if (Number.isFinite(value) && (value < 30 || value > 45)) return true;
  }

  const spo2Matches = [...normalized.matchAll(/(?:spo₂|spo2|satürasyon|saturasyon)[^0-9]{0,24}%?\s*(\d{1,3})/giu)];
  for (const match of spo2Matches) {
    const value = Number.parseFloat(match[1]);
    if (Number.isFinite(value) && (value < 40 || value > 100)) return true;
  }

  if (/\byapılanmada\b|\byapilanmada\b|\bsağ koroner arter Z-skoru 3\b.*\bZ-skoru 3\.5\b/iu.test(normalized)) return true;
  if (/(?:ekokardiyografi|eko|bt|mr|usg|laboratuvar|destekleyici veriler)\s*[|;]\s*(?:ekokardiyografi|eko|bt|mr|usg|laboratuvar|destekleyici veriler)/iu.test(normalized)) return true;
  return false;
}


function hasMalformedTurkishClinicalWording(question = {}) {
  const rawText = collectStrings(question).join(' | ');
  const value = normalize(rawText);
  const forbidden = [
    /yogunlasma kaybi/,
    /konsantrasyon kaybi/,
    /konsantre olma kaybi/,
    /hasta degerlendirildi(?:\.|$)/,
    /klinik veriler birlikte degerlendirilir/,
    /karar verdirici bulgular birlikte degerlendirilir/,
    /kisa klinik baglam/,
    /amonyak seviyesinin yol acacagi norotoksisite/,
  ];
  if (forbidden.some((pattern) => pattern.test(value))) return true;

  const sentences = cleanText(rawText).split(/(?<=[.!?])\s+/u).map((item) => item.trim()).filter(Boolean);
  return sentences.some((sentence) => {
    const normalizedSentence = normalize(sentence);
    if (!normalizedSentence) return false;
    if (/\b(?:sikayet|bulgu|tetkik|muayene|laboratuvar|goruntuleme)\b\s*[:|]\s*$/u.test(normalizedSentence)) return true;
    if (/\b(?:nedeniyle|ile|ve|veya|fakat|ancak|olarak|sonucu)\s*$/u.test(normalizedSentence)) return true;
    return false;
  });
}

function hasAmbiguousHyperammonemiaEmergencyTarget(question = {}) {
  const rawText = collectStrings(question).join(' | ');
  const value = normalize(rawText);
  const stem = normalize([question.stem, question.compactVitals, question.compactObjectiveData].filter(Boolean).join(' | '));
  const questionText = normalize(question.question || '');
  const optionsText = normalize(asArray(question.options).map((option) => typeof option === 'string' ? option : option?.text || '').join(' | '));

  const isHyperammonemia = /hiperamonyemi|amonyak|ure siklus|urea siklus|ornitin transkarbamilaz|karbamoil fosfat|n asetilglutamat|nags/.test(value);
  if (!isHyperammonemia) return false;

  const asksEmergencyChoice = /acil|en hizli|ilk|oncelikli|tedavi|mudahale|yonetim|azaltacak|dusurecek|giderecek/.test(questionText);
  const hasDialysisOption = /hemodiyaliz|diyaliz|hemofiltrasyon|peritoneal diyaliz/.test(optionsText);
  const hasScavengerOption = /benzoat|fenilbutirat|fenilasetat|nitrojen scavenger|azot baglayici/.test(optionsText);
  const hasAnticatabolicOption = /dekstroz|glukoz|lipid|protein kes|protein alimini kes/.test(optionsText);
  const comparesTreatmentBundle = [hasDialysisOption, hasScavengerOption, hasAnticatabolicOption].filter(Boolean).length >= 2;
  if (!asksEmergencyChoice && !comparesTreatmentBundle) return false;

  const hasAmmoniaValue = /amonyak[^0-9<>]{0,40}(?:>|≥|>=)?\s*\d{2,4}|\d{2,4}\s*(?:umol|µmol|mikromol|μmol)\s*\/\s*l[^|.]{0,40}amonyak/u.test(rawText.toLocaleLowerCase('tr'));
  const hasSevereNeuro = /koma|nobet|ensefalopati|bilinc bulanikligi|bilinc degisikligi|letarji|somnolans|hipotoni|serebral odem|deserebrasyon|solunum depresyonu/.test(stem);
  const hasVeryHighQualifier = /cok yuksek amonyak|agir hiperamonyemi|ciddi hiperamonyemi|hizla yukselen amonyak|tedaviye ragmen yukselen|agir ensefalopati/.test(stem);
  const hasTimingContext = /protein alimi kesil|dekstroz baslan|azot baglayici|sodyum benzoat|fenilbutirat|ilk destek tedavisine ragmen|baslangic tedavisine ragmen/.test(stem);

  if (/en hizli|hemodiyaliz|diyaliz|nörotoksisite|norotoksisite/.test(value) && !(hasAmmoniaValue || hasVeryHighQualifier) && !hasSevereNeuro) return true;
  if (comparesTreatmentBundle && asksEmergencyChoice && !(hasAmmoniaValue || hasVeryHighQualifier || hasTimingContext)) return true;
  return false;
}

function sanitizeQuestion(question = {}, branch, requestedDifficulty = '') {
  const options = normalizeOptions(question.options);
  const correctId = String(question.correctAnswer || '').trim().toUpperCase();
  const correctText = options.find((item) => item.id === correctId)?.text || options[0]?.text || '';
  const answerTarget = cleanText(question.answerTarget || question.questionIntent || '');
  const allowManagementSteps = isManagementTarget(answerTarget);
  const rawCompactVitals = compactItems(question.compactVitals || question.vitals || [], 5);
  const rawCompactObjectiveData = compactItems(question.compactObjectiveData || question.objectiveData || [], 8);
  const integratedStem = integrateCompactDataIntoStem(question.stem, rawCompactVitals, rawCompactObjectiveData);
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
    stem: isGenericOrPlaceholderStem(integratedStem) ? '' : integratedStem,
    compactVitals: [],
    compactObjectiveData: [],
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
  if (!sanitized.evidenceChain.length) {
    sanitized.evidenceChain = [sanitized.stem, ...sanitized.compactObjectiveData.map((item) => `${item.label}: ${item.value}`)]
      .map(ensureSentence)
      .filter(Boolean)
      .slice(0, 3);
  }
  while (sanitized.evidenceChain.length < 3) {
    sanitized.evidenceChain.push('Olgu kökü, seçenekler arasında tek en iyi yanıt seçmeyi gerektirir.');
  }
  OPTION_IDS.forEach((id) => {
    if (!cleanText(sanitized.wrongOptionFeedback[id])) {
      sanitized.wrongOptionFeedback[id] = id === sanitized.correctAnswer
        ? ensureSentence(sanitized.explanation || `${correctText} bu olguda en uygun yanıttır`)
        : 'Bu seçenek bu olgudaki ana karar noktasını doğru seçenek kadar iyi karşılamaz.';
    }
  });
  if (!cleanText(sanitized.examPearl)) sanitized.examPearl = 'Soru kökünde verilen ayırt ettirici ipuçları, seçenekleri aynı karar ekseninde karşılaştırarak kullanılmalıdır.';
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

function tusQuestionDetailMode() {
  const mode = detailModeForProfile('TUS');
  return mode === 'concise' ? 'standard' : mode;
}

function buildPrompt({ branch, target, difficulty = 'Orta', recentQuestionSummaries = [], attempt = 1, antiRepeatNonce = '', detailMode = tusQuestionDetailMode() }) {
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
    detailMode,
  });
}

function createAbortSignal(timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return { signal: controller.signal, cancel: () => clearTimeout(timeout) };
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
  return /^(low|medium|high)$/i.test(String(value || '')) ? String(value).toLowerCase() : 'medium';
}

async function callOpenAI(prompt, { detailMode = tusQuestionDetailMode() } = {}) {
  const apiKey = process.env.TUS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  const model = currentTusModel();
  const baseUrl = (process.env.TUS_OPENAI_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const timeoutMs = Number(process.env.TUS_OPENAI_PER_REQUEST_TIMEOUT_MS || process.env.OPENAI_PER_REQUEST_TIMEOUT_MS || 25000);
  const requestedMaxTokens = Number(process.env.TUS_OPENAI_MAX_OUTPUT_TOKENS || process.env.OPENAI_MAX_OUTPUT_TOKENS || 0);
  const maxTokens = requestedMaxTokens > 0 ? requestedMaxTokens : applyCostProfileToMaxTokens('TUS', TASK_NAME, 2400);
  const explicitStyle = process.env.TUS_OPENAI_API_STYLE || process.env.OPENAI_API_STYLE || '';
  const useResponses = shouldUseResponsesApi(model, explicitStyle);
  const style = useResponses ? 'responses' : 'chat';
  const reasoningEffort = safeReasoningEffort(process.env.TUS_OPENAI_REASONING_EFFORT || process.env.OPENAI_REASONING_EFFORT || defaultReasoningEffortForProfile('TUS'));
  const verbosity = safeVerbosity(process.env.TUS_OPENAI_VERBOSITY || process.env.OPENAI_VERBOSITY || defaultVerbosityForProfile('TUS'));
  const { signal, cancel } = createAbortSignal(timeoutMs);
  try {
    const promptCacheConfig = buildPromptCacheConfig('TUS', TASK_NAME, PROMPT_VERSION);
    const body = useResponses
      ? {
          model,
          instructions: SYSTEM_PROMPT,
          input: prompt,
          text: { format: { type: 'json_object' }, verbosity },
          ...(modelSupportsReasoningEffort(model) ? { reasoning: { effort: reasoningEffort } } : {}),
          max_output_tokens: maxTokens,
          store: false,
          truncation: 'auto',
          ...promptCacheConfig,
        }
      : {
          model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_object' },
          max_completion_tokens: maxTokens,
          ...promptCacheConfig,
        };
    if (!useResponses && modelSupportsReasoningEffort(model)) {
      body.reasoning_effort = reasoningEffort;
    }
    const apiResult = await callOpenAIWithPromptCacheFallback({
      body,
      endpointType: useResponses ? 'responses' : 'chat_completions',
      task: TASK_NAME,
      openai: (bodyToSend) => fetch(`${baseUrl}${useResponses ? '/responses' : '/chat/completions'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify(bodyToSend),
        signal,
      }),
    });
    if (!apiResult.ok) {
      const error = new Error(`OpenAI ${apiResult.status}: ${String(apiResult.text || '').slice(0, 500)}`);
      error.status = apiResult.status;
      throw error;
    }
    const data = JSON.parse(apiResult.text || '{}');
    logAIUsage({ task: TASK_NAME, model: data.model || model, usage: data.usage || null, cached: false, apiStyle: style });
    const text = useResponses ? extractResponsesText(data) : extractChatText(data);
    if (!String(text || '').trim()) {
      const reason = data?.incomplete_details?.reason || data?.status || 'empty_output';
      throw new Error(`OpenAI boş çıktı döndürdü (${reason}). Output token limitini artırın veya reasoning effort değerini low/none kullanın.`);
    }
    const question = parseModelJson(text);
    return { question, model: data.model || model, mode: style };
  } finally {
    cancel();
  }
}

async function generateRemote({ branch, target, difficulty, recentQuestionSummaries, attempt, antiRepeatNonce, detailMode = tusQuestionDetailMode() }) {
  const prompt = buildPrompt({ branch, target, difficulty, recentQuestionSummaries, attempt, antiRepeatNonce, detailMode });
  const result = await callOpenAI(prompt, { detailMode });
  if (!result) throw new Error('OPENAI_API_KEY tanımlı değil; AI üretim yapılamadı.');
  const sanitized = sanitizeQuestion(result.question, branch, difficulty);
  sanitized.provider = 'openai';
  sanitized.openAIModel = result.model;
  sanitized.openAIMode = result.mode;
  sanitized.promptVersion = PROMPT_VERSION;
  sanitized.schemaVersion = SCHEMA_VERSION;
  sanitized.aiMeta = { ...(sanitized.aiMeta || {}), costProfile: getAICostProfile('TUS'), detailMode };
  const validation = validateQuestion(sanitized, recentQuestionSummaries);
  if (!validation.ok) {
    // V398 balanced gate:
    // Hard-block only errors that make the question unsafe, structurally invalid,
    // impossible to solve from the stem, malformed, or answer-leaking.
    // Educational polish issues are kept as quality notes so live AI generation
    // does not collapse into safe local fallback on every request.
    const hardBlockingErrors = validation.errors.filter((message) =>
      /branch eksik|stem çok kısa|stem placeholder|görünür klinik patern yok|klinik olgu yetersiz|soruyu çözdürecek|question net soru cümlesi değil|tam 5 seçenek yok|correctAnswer A-E değil|correctAnswer seçeneklerle eşleşmiyor|soru kökü\/veri paneli doğru cevabı ele veriyor|veri paneli yön\/değişim cevabını fazla ele veriyor|fizyoloji sorusunda veri paneli sonucu belirleyen yorumu doğrudan veriyor|kanıt zinciri doğru cevabı doğrudan söylüyor|kesik veya üç noktalı metin var|eksik veya tamamlanmamış objektif veri değeri var|imkansız veya bozuk klinik değer|bozuk Türkçe veya makine çevirisi|hiperamonyemi acil tedavi sorusunda/iu.test(message)
    );

    if (hardBlockingErrors.length) {
      const error = new Error(hardBlockingErrors.join('; '));
      error.validationErrors = hardBlockingErrors;
      error.question = sanitized;
      throw error;
    }

    sanitized.qualityNotes = validation.errors;
    sanitized.qualityGate = 'passed-with-editorial-notes';
  } else {
    sanitized.qualityGate = 'strict-passed';
  }
  return sanitized;
}


function questionMatchesRecent(question = {}, recentQuestionSummaries = []) {
  const signature = normalize(question.semanticFingerprint || question.id || '');
  const correct = normalize(getCorrectText(question));
  const target = normalize(question.learningTarget || question.answerTarget || question.question || '');
  return asArray(recentQuestionSummaries).some((item) => {
    const itemSignature = normalize(item.semanticFingerprint || item.id || item.questionId || '');
    if (signature && itemSignature && signature === itemSignature) return true;
    const itemCorrect = normalize(item.correct || item.correctAnswerText || item.correctAnswer || '');
    const itemTarget = normalize(item.learningTarget || item.answerTarget || item.question || '');
    return Boolean(correct && itemCorrect && correct === itemCorrect && target && itemTarget && target === itemTarget);
  });
}

async function getReusableBankQuestion({ branch, target, difficulty, recentQuestionSummaries }) {
  if (!useQuestionBank()) return null;
  const model = currentTusModel();
  const bankKey = buildQuestionBankKey({ scope: 'TUS', branch, difficulty, target, promptVersion: PROMPT_VERSION, model });
  const items = await getQuestionBankItems(bankKey, { maxItems: 40 });
  const reusable = items.find((item) => {
    if (questionMatchesRecent(item, recentQuestionSummaries)) return false;
    const candidate = sanitizeQuestion({ ...item, id: `ai-spot-bank-check-${Date.now()}` }, branch, difficulty);
    const validation = validateQuestion(candidate, recentQuestionSummaries);
    if (validation.ok) return true;
    return !validation.errors.some((message) =>
      /branch eksik|stem çok kısa|stem placeholder|görünür klinik patern yok|klinik olgu yetersiz|question net soru cümlesi değil|tam 5 seçenek yok|correctAnswer A-E değil|correctAnswer seçeneklerle eşleşmiyor|soru kökü\/veri paneli doğru cevabı ele veriyor|kesik veya üç noktalı metin var|eksik veya tamamlanmamış objektif veri değeri var|imkansız veya bozuk klinik değer|bozuk Türkçe veya makine çevirisi|hiperamonyemi acil tedavi sorusunda/iu.test(message)
    );
  });
  if (!reusable) return null;
  const cloned = sanitizeQuestion({ ...reusable, id: `ai-spot-bank-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }, branch, difficulty);
  cloned.provider = 'openai-question-bank';
  cloned.cached = true;
  cloned.openAIModel = reusable.openAIModel || model;
  cloned.promptVersion = reusable.promptVersion || PROMPT_VERSION;
  cloned.schemaVersion = reusable.schemaVersion || SCHEMA_VERSION;
  cloned.aiMeta = { ...(cloned.aiMeta || {}), questionBank: true, cached: true };
  return cloned;
}

async function storeReusableQuestion({ branch, target, difficulty, question }) {
  if (!useQuestionBank() || !question || question.fallback) return false;
  const model = question.openAIModel || currentTusModel();
  const bankKey = buildQuestionBankKey({ scope: 'TUS', branch, difficulty, target, promptVersion: PROMPT_VERSION, model });
  return addQuestionToBank(bankKey, question);
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  let body;
  try { body = await parseJsonBody(request); } catch { return sendJson(response, 400, { ok: false, error: 'Invalid JSON body' }); }

  const branch = chooseBranch(body.branchFilter);
  const requestedDifficulty = normalizeDifficulty(body.difficulty || body.requestedDifficulty || body.aiDifficulty || 'Orta');
  const recentQuestionSummaries = asArray(body.recentQuestionSummaries).slice(0, 12);
  const remoteAttempts = Math.max(1, Math.min(3, Number(process.env.REMOTE_AI_ATTEMPTS || process.env.TUS_REMOTE_AI_ATTEMPTS || 3)));
  const errors = [];
  const target = body.target || body.answerTarget || '';
  const model = currentTusModel();
  const oneShotCacheKey = buildOutputCacheKey({
    scope: 'TUS',
    task: TASK_NAME,
    promptVersion: PROMPT_VERSION,
    model,
    sourceFingerprint: `${branch}:${requestedDifficulty}:${target || 'general'}`,
    extra: { recent: recentQuestionSummaries.map((item) => item?.semanticFingerprint || item?.id || item?.learningTarget || '').slice(0, 6) },
  });

  return await withInFlightDedupe(oneShotCacheKey, async () => {
    const reusable = await getReusableBankQuestion({ branch, target, difficulty: requestedDifficulty, recentQuestionSummaries });
    if (reusable) {
      logAIUsage({ task: `${TASK_NAME}:questionBank`, model: reusable.openAIModel || model, cached: true, apiStyle: 'question_bank' });
      return sendJson(response, 200, {
        ok: true,
        provider: 'openai-question-bank',
        cached: true,
        fallback: false,
        question: reusable,
      });
    }

    const cachedPayload = await getDurableCachedOutput(oneShotCacheKey);
    if (cachedPayload?.question && !questionMatchesRecent(cachedPayload.question, recentQuestionSummaries)) {
      logAIUsage({ task: `${TASK_NAME}:outputCache`, model: cachedPayload.question.openAIModel || model, cached: true, apiStyle: 'output_cache' });
      return sendJson(response, 200, { ok: true, cached: true, fallback: false, provider: cachedPayload.provider || 'openai-output-cache', question: cachedPayload.question });
    }

    if (!envFlag('KLINIKIQ_LIVE_TUS_AI', true)) {
      const question = fallbackQuestion({ branchFilter: branch, difficulty: requestedDifficulty, recentQuestionSummaries });
      question.provider = 'local-cost-safe-bank';
      question.fallback = true;
      question.aiMeta = { ...(question.aiMeta || {}), liveAIDisabled: true, costProfile: getAICostProfile('TUS') };
      return sendJson(response, 200, { ok: true, provider: 'local-cost-safe-bank', fallback: true, safeFallback: true, question });
    }

    const detailMode = tusQuestionDetailMode();
    for (let attempt = 1; attempt <= remoteAttempts; attempt += 1) {
    try {
      const question = await generateRemote({ branch, target, difficulty: requestedDifficulty, recentQuestionSummaries, attempt, antiRepeatNonce: body.antiRepeatNonce, detailMode });
        await storeReusableQuestion({ branch, target, difficulty: requestedDifficulty, question });
        await setDurableCachedOutput(oneShotCacheKey, { provider: 'openai-output-cache', question });
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
  });
}

