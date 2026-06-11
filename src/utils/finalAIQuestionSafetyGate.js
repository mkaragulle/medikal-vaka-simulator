const TR_LOCALE = 'tr';

export const FINAL_AI_QUESTION_SAFETY_VERSION = 'final-ai-question-safety-v1.0-topic-agnostic';
export const OPTION_ROLES = ['primary_correct', 'adjunct_correct_but_not_asked', 'later_step', 'wrong_condition', 'unrelated', 'contraindicated_or_harmful'];

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const TERMINAL_PUNCTUATION = /[.!?]$/u;
const BROKEN_END = /(?:^|\s)(?:ve|veya|ile|ama|ancak|çünkü|bu nedenle|için|açısından|olarak|ederek|yaparak|sağlayarak|tanısını|paternini|basamağını|r|a)$/iu;
const TRUNCATED_WORD = /(?:\b(?:asetilkolinestera|intraven|intramusk|hemodinam|stabilizas|resüsitas|görüntülem|laboratuva|seroloj|mikrobiyoloj)\.?$|[a-zçğıöşü]{3,}\.\.\.$)/iu;
const GENERIC_BAD_PATTERNS = [
  /farkl[ıi]\s+klinik\s+tabloda\s+uygun\s+olabilir/iu,
  /baz[ıi]\s+klinik\s+durumlarda\s+g[üu]ndeme\s+gelebilir/iu,
  /olgudaki\s+ana\s+ipu[çc]lar[ıi]n[ıi]\s+tek\s+ba[şs][ıi]na\s+a[çc][ıi]klamaz/iu,
  /lehine\s+daha\s+g[üu][çc]l[üu]\s+ve\s+[öo]ncelikli\s+kan[ıi]t\s+olu[şs]turur/iu,
  /bu\s+alternatifin\s+eksik\s+kald[ıi][ğg][ıi]\s+karar\s+noktas[ıi]n[ıi]\s+g[öo]sterir/iu,
  /klinik\s+ba[ğg]lamda\s+de[ğg]erlendirilir/iu,
  /tedavi\s+klinik\s+yan[ıi]ta\s+g[öo]re\s+d[üu]zenlenir/iu,
  /uygun\s+antidot\s+verilmelidir/iu,
  /destek\s+tedaviler\s+uygulan[ıi]r/iu,
  /bu\s+se[çc]enek\s+uygun\s+de[ğg]ildir\.?$/iu,
  /bu\s+nedenle\s+do[ğg]ru\s+cevap\s+budur/iu,
  /objektif\s+bulgular[ıi]n\s+karar\s+basama[ğg][ıi]n[ıi]\s+desteklemesi/iu,
  /beklenen\s+ana\s+ipu[çc]lar[ıi]/iu,
  /yan[ıi]t\s+ekseni/iu,
  /verilen\s+[öo][ğg]renme\s+hedefi/iu,
  /ili[şs]kili\s+bir\s+alternatif\s+gibi\s+g[öo]r[üu]nse/iu,
  /tek\s+en\s+iyi\s+yan[ıi]t\s+yapacak\s+d[üu]zeyde\s+desteklemez/iu,
  /bu\s+karar\s+d[üu]zeyinde\s+[öo]ncelikli\s+yan[ıi]t[ıi]\s+kar[şs][ıi]lamad[ıi][ğg][ıi]/iu,
  /se[çc]enekler\s+aras[ıi]ndaki\s+temel\s+ayr[ıi]m[ıi]\s+g[öo]sterir/iu,
];

const PREANSWER_SPOILER_PATTERNS = [
  /tan[ıi]s[ıi]n[ıi]\s+do[ğg]rular/iu,
  /tan[ıi]s[ıi]\s+koydurur/iu,
  /ile\s+uyumludur/iu,
  /kesin\s+tan[ıi]d[ıi]r/iu,
  /ilk\s+(?:tedavi|ila[çc]|m[üu]dahale)\s+[^.?!]{0,60}(?:olmal[ıi]d[ıi]r|verilir|uygulan[ıi]r)/iu,
  /bu\s+bulgular\s+[^.?!]{0,70}\s+d[üu][şs][üu]nd[üu]r[üu]r/iu,
];

const STOPWORDS = new Set(['ve', 'veya', 'ile', 'icin', 'için', 'olan', 'olarak', 'hasta', 'hastada', 'olgu', 'olguda', 'klinik', 'soru', 'yanit', 'yanıt', 'dogru', 'doğru', 'cevap', 'secenek', 'seçenek', 'en', 'uygun', 'ilk', 'hangi', 'hangisidir', 'nedir', 'tus', 'spot', 'bu', 'veri', 'anlamı', 'anlami', 'öykü', 'oyku', 'muayene', 'bulgu', 'vital', 'laboratuvar', 'çocuk', 'cocuk', 'erkek', 'kadın', 'kadin', 'yaş', 'yas']);

function normalizeSpaces(value = '') {
  return String(value ?? '')
    .replace(/[“”]/gu, '"')
    .replace(/[‘’]/gu, "'")
    .replace(/\s+/gu, ' ')
    .replace(/\s+([,.;:!?])/gu, '$1')
    .replace(/([,;:!?])(?=\S)/gu, '$1 ')
    .replace(/(^|[.!?]\s+)(?:Da|De|da|de)\s+(?=[a-zçğıöşü0-9%/>])/gu, '$1Bu tabloda ')
    .replace(/\b(?:Da|De)\s+(?=renin\/aldosteron\b)/gu, 'Bu tabloda ')
    .trim();
}


function protectSentenceAbbreviations(value = '') {
  return String(value || '')
    .replace(/\b([A-ZÇĞİÖŞÜ])\.\s+(?=[A-ZÇĞİÖŞÜa-zçğıöşü])/gu, '$1<abbr-dot> ')
    .replace(/\b(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)\.\s+(?=(?:sinir|Sinir|kranial|Kranial|[A-ZÇĞİÖŞÜa-zçğıöşü]))/gu, '$1<roman-dot> ');
}

function restoreSentenceAbbreviations(value = '') {
  return String(value || '').replace(/<abbr-dot>/g, '.').replace(/<roman-dot>/g, '.');
}

function asciiKey(value = '') {
  return normalizeSpaces(value)
    .toLocaleLowerCase(TR_LOCALE)
    .replace(/[ıİ]/gu, 'i')
    .replace(/[ğĞ]/gu, 'g')
    .replace(/[üÜ]/gu, 'u')
    .replace(/[şŞ]/gu, 's')
    .replace(/[öÖ]/gu, 'o')
    .replace(/[çÇ]/gu, 'c')
    .replace(/[^a-z0-9+/% ]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

function tokens(value = '') {
  return asciiKey(value).split(' ').filter((token) => token.length > 2 && !STOPWORDS.has(token));
}

function similarity(left = '', right = '') {
  const a = new Set(tokens(left));
  const b = new Set(tokens(right));
  if (!a.size || !b.size) return 0;
  let hit = 0;
  a.forEach((token) => { if (b.has(token)) hit += 1; });
  const containment = hit / Math.min(a.size, b.size);
  const union = new Set([...a, ...b]).size || 1;
  return Math.max(hit / union, containment * 0.84);
}

function sentenceCase(value = '') {
  const text = normalizeSpaces(value).replace(/[,:;|\-–—\s]+$/u, '').trim();
  if (!text) return '';
  return text.charAt(0).toLocaleUpperCase(TR_LOCALE) + text.slice(1);
}

function ensureSentence(value = '') {
  const text = sentenceCase(value);
  if (!text) return '';
  return TERMINAL_PUNCTUATION.test(text) ? text : `${text}.`;
}

function ensureQuestion(value = '') {
  const text = sentenceCase(value).replace(/[.]+$/u, '');
  if (!text) return 'Bu olguda tek en iyi yanıt aşağıdakilerden hangisidir?';
  return /\?$/u.test(text) ? text : `${text}?`;
}

function splitSentences(value = '') {
  const text = protectSentenceAbbreviations(normalizeSpaces(value));
  if (!text) return [];
  return text
    .split(/(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜ0-9])/u)
    .map((item) => restoreSentenceAbbreviations(item).trim())
    .filter(Boolean);
}

export function removeDuplicateSentences(text = '', { threshold = 0.88, maxSentences = Infinity, limit = Infinity } = {}) {
  const output = [];
  splitSentences(text).forEach((sentence) => {
    const clean = ensureSentence(sentence);
    if (!clean) return;
    if (output.some((item) => similarity(item, clean) >= threshold)) return;
    output.push(clean);
  });
  return ensureSentence((Number.isFinite(maxSentences) ? output.slice(0, maxSentences) : output).join(' ').trim() || text);
}

export function detectTruncatedText(text = '') {
  const clean = normalizeSpaces(text);
  if (!clean) return { truncated: true, reason: 'empty' };
  const terminal = clean.replace(/[.!?]$/u, '').trim();
  if (/\.{2,}|…/u.test(clean)) return { truncated: true, reason: 'ellipsis' };
  if (BROKEN_END.test(terminal)) return { truncated: true, reason: 'broken-ending' };
  if (TRUNCATED_WORD.test(clean)) return { truncated: true, reason: 'cut-word' };
  // Turkish words can end with a single Latin letter when Unicode word-boundary handling is imperfect.
  // Treat only a standalone final one-letter token as suspicious.
  if (/\s[a-zçğıöşü]\.?$/iu.test(terminal) && clean.length > 30) return { truncated: true, reason: 'single-letter-ending' };
  // Missing final punctuation is repaired by ensureSentence(); it is only fatal when the ending itself looks clipped.
  if (!TERMINAL_PUNCTUATION.test(clean) && clean.length > 180 && /[,;:–—-]\s*\S{0,24}$/u.test(clean)) return { truncated: true, reason: 'missing-terminal-punctuation' };
  return { truncated: false, reason: null };
}

function stripGenericPhrases(value = '') {
  let text = normalizeSpaces(value);
  GENERIC_BAD_PATTERNS.forEach((pattern) => {
    text = text.replace(pattern, ' ').replace(/\s+/gu, ' ').trim();
  });
  return normalizeSpaces(text);
}

function hasGenericFeedback(value = '') {
  return GENERIC_BAD_PATTERNS.some((pattern) => pattern.test(String(value || '')));
}

function optionList(question = {}) {
  return (Array.isArray(question.options) ? question.options : [])
    .map((option, index) => ({
      id: String(option?.id || OPTION_IDS[index] || '').toUpperCase(),
      text: normalizeSpaces(option?.text || option || ''),
    }))
    .filter((option) => option.id && option.text);
}

function correctId(question = {}) {
  return String(question.correctAnswer || question.c || '').toUpperCase();
}

function correctText(question = {}) {
  const id = correctId(question);
  return optionList(question).find((option) => option.id === id)?.text || String(question.correctAnswerText || question.diagnosis?.correct || '');
}

function inferOptionCategory(text = '') {
  const value = asciiKey(text);
  if (/\b(test|tetkik|tarama|dogrulama|bt|mr|mrg|usg|ekg|kultur|pcr|seroloji|biyopsi|antikor|antijen|panel|kan gazi|idrar|goruntuleme)\b/.test(value)) return 'test';
  if (/\b(tedavi|uygulamak|vermek|baslamak|baslatmak|doz|infuzyon|intravenoz|intramuskuler|oral|ilac|antidot|antibiyotik|antiviral|antifungal|cerrahi|resusitasyon|replasman|stabilizasyon|profilaksi|adrenalin|insulin|oksijen|sivi|destek|izlem|gozlem|mudahale|yaklasim|karar|basamak)\b/.test(value)) return 'treatment';
  if (/\b(mekanizma|patofizyoloji|reseptor|enzim|inhibisyon|aktivasyon|mutasyon|transport|yolak|nekroz|apoptoz|hipersensitivite|aracili)\b/.test(value)) return 'mechanism';
  if (/\b(tani|sendrom|hastalik|enfeksiyon|toksidrom|komplikasyon|atak|alevlenme|kanser|tumor|yetmezlik)\b/.test(value)) return 'diagnosis';
  if (/\b(etken|virus|bakteri|parazit|mantar|kok|basil|gondii|virusu)\b/.test(value)) return 'agent';
  return 'other';
}

function inferQuestionIntent(question = {}) {
  const q = asciiKey([question.question, question.learningTarget, question.questionIntent, question.answerTarget].filter(Boolean).join(' '));
  if (/ilk hayat|hayati tehdit|oncelikle|ilk basamak|ilk mudahale|acil|stabilizasyon/.test(q)) return 'first_life_saving_step';
  if (/laboratuvar.*(test|kombinasyon|belirtec|marker)|testi.*kombinasyon|seroloji.*yorum|tetkik.*yorum|marker.*izlem/.test(q)) return 'diagnostic_first_test';
  if (/mekanizmaya yonelik|altta yatan|nedene yonelik|ozgul tedavi|antidot/.test(q)) return 'mechanism_targeted_treatment';
  if (/semptom|kontrol/.test(q)) return 'symptom_control';
  if (/kesin|definitif/.test(q)) return 'definitive_treatment';
  if (/ilk test|ilk tetkik|tarama/.test(q)) return 'diagnostic_first_test';
  if (/dogrulamak|dogrulayici|kesin tani/.test(q)) return 'confirmatory_test';
  if (/uzun donem|idame|izlem/.test(q)) return 'long_term_management';
  if (/komplikasyon/.test(q)) return 'complication_management';
  if (/profilaksi|korunma|koruyucu|asi/.test(q)) return 'prevention_or_prophylaxis';
  if (/mekanizma|patofizyoloji|etki mekanizmasi|aciklayan/.test(q)) return 'mechanism_explanation';
  if (/tani|olasi|dusundurur|etken|iliskilendirilen/.test(q)) return 'diagnosis';
  const categories = optionList(question).map((option) => inferOptionCategory(option.text)).filter((category) => category !== 'other');
  if (categories.length) {
    const dominant = categories.sort((a, b) => categories.filter((x) => x === b).length - categories.filter((x) => x === a).length)[0];
    if (dominant === 'treatment') return 'first_life_saving_step';
    if (dominant === 'test') return 'diagnostic_first_test';
    if (dominant === 'mechanism') return 'mechanism_explanation';
    if (dominant === 'agent') return 'diagnosis';
  }
  return 'diagnosis';
}

function targetQuestionText(target = 'diagnosis') {
  switch (target) {
    case 'first_life_saving_step': return 'Bu olguda öncelikle uygulanması gereken ilk klinik müdahale hangisidir?';
    case 'symptom_control': return 'Bu olguda semptom kontrolü için en uygun seçenek hangisidir?';
    case 'mechanism_targeted_treatment': return 'Bu olguda altta yatan mekanizmayı hedefleyen en uygun tedavi hangisidir?';
    case 'definitive_treatment': return 'Bu olguda kesin tedavi seçeneği hangisidir?';
    case 'diagnostic_first_test': return 'Bu olguda ilk tanısal değerlendirme için en uygun test hangisidir?';
    case 'confirmatory_test': return 'Bu olguda tanıyı doğrulamak için en uygun test hangisidir?';
    case 'long_term_management': return 'Bu olguda uzun dönem izlem veya idame yaklaşımı için en uygun seçenek hangisidir?';
    case 'complication_management': return 'Bu olguda komplikasyon yönetimi için en uygun seçenek hangisidir?';
    case 'prevention_or_prophylaxis': return 'Bu olguda korunma veya profilaksi için en uygun seçenek hangisidir?';
    case 'mechanism_explanation': return 'Bu bulguları en iyi açıklayan mekanizma hangisidir?';
    case 'diagnosis':
    default: return 'Bu olguda en olası tanı veya etken hangisidir?';
  }
}


function coerceAnswerTarget(question = {}) {
  const inferred = inferQuestionIntent({ ...question, answerTarget: '' });
  const explicit = String(question.answerTarget || '').trim();
  if (!explicit) return inferred;
  const q = asciiKey([question.question, question.learningTarget].filter(Boolean).join(' '));
  const explicitKey = asciiKey(explicit);
  const questionAsksTest = /laboratuvar|test|tetkik|seroloji|marker|belirtec|kombinasyon/.test(q);
  const questionAsksMechanism = /mekanizma|patofizyoloji|aciklayan|transport|reseptor|enzim/.test(q);
  const questionAsksTreatment = /tedavi|ilac|antidot|mudahale|yaklasim|basamak|uygulama/.test(q);
  const incompatibleLongTerm = explicitKey.includes('long_term') && (questionAsksTest || questionAsksMechanism || questionAsksTreatment);
  if (incompatibleLongTerm) return inferred;
  if (questionAsksTest && !/test|diagnostic|confirmatory/.test(explicitKey)) return inferred;
  if (questionAsksMechanism && !/mechanism/.test(explicitKey)) return inferred;
  if (questionAsksTreatment && /diagnosis|long_term/.test(explicitKey)) return inferred;
  return explicit;
}

function isGenericQuestionText(value = '') {
  const q = asciiKey(value);
  return /^(bu\s+olguda\s+|bu\s+hastada\s+)?en\s+uygun\s+(tedavi|yaklasim|antidot|secenek)\s+hangisidir$/.test(q)
    || /^hangi\s+secenek\s+dogrudur$/.test(q)
    || /^bu\s+hastada\s+ne\s+yapilmalidir$/.test(q)
    || /^hangisi\s+verilmelidir$/.test(q)
    || /^uygun\s+(antidot|tedavi|yaklasim)\s+hangisidir$/.test(q);
}

function inferRole(question = {}, option = {}) {
  const explicit = question.optionClinicalRoles?.[option.id] || question.clinicalRoles?.[option.id];
  if (OPTION_ROLES.includes(explicit)) return explicit;
  if (option.id === correctId(question)) return 'primary_correct';
  const text = asciiKey(option.text);
  if (/kontrendike|zararli|sakincali|riskini artirir|geciktirir/.test(text)) return 'contraindicated_or_harmful';
  if (/destek|yardimci|semptomatik|oksijen|sivi|analjezi|antiemetik|antihistaminik|bronkodilatat/.test(text)) return 'adjunct_correct_but_not_asked';
  if (/sonraki|idame|uzun donem|izlem|taburculuk|kontrol|elektif|kesin tedavi|cerrahi/.test(text)) return 'later_step';
  const optionCategory = inferOptionCategory(option.text);
  const questionCategory = inferOptionCategory(targetQuestionText(inferQuestionIntent(question)));
  if (optionCategory !== 'other' && questionCategory !== 'other' && optionCategory !== questionCategory) return 'unrelated';
  return 'wrong_condition';
}

function deriveRoles(question = {}) {
  const out = {};
  optionList(question).forEach((option) => { out[option.id] = inferRole(question, option); });
  return out;
}

function roleAwareFeedback(optionText = '', role = 'wrong_condition', target = 'diagnosis', existing = '') {
  const cleanedExisting = removeDuplicateSentences(stripGenericPhrases(existing), { maxSentences: 2, limit: 300 });
  if (cleanedExisting && cleanedExisting.length >= 58 && !hasGenericFeedback(cleanedExisting) && !detectTruncatedText(cleanedExisting).truncated) return cleanedExisting;
  const targetPhrase = targetQuestionText(target).replace(/\?$/u, '').replace(/^Bu olguda\s*/iu, '').replace(/^Bu bulguları\s*/iu, 'bulguları ').toLocaleLowerCase(TR_LOCALE);
  if (role === 'primary_correct') return ensureSentence(`${optionText} belirleyici ipuçlarını en doğrudan açıklar ve ${targetPhrase} hedefini karşılar`);
  if (role === 'adjunct_correct_but_not_asked') return ensureSentence(`${optionText} bazı olgularda yardımcı rol oynayabilir; ancak verilen olguda soru ${targetPhrase} düzeyini sorduğu için öncelikli yanıt değildir`);
  if (role === 'later_step') return ensureSentence(`${optionText} sonraki basamakta veya seçilmiş koşullarda değerlendirilebilir; bu soruda istenen karar düzeyi için öncelikli seçenek değildir`);
  if (role === 'contraindicated_or_harmful') return ensureSentence(`${optionText} bu karar düzeyinde uygun değildir; olgudaki öncelik güvenli ve doğrudan hedefe yönelik yaklaşımı gerektirir`);
  if (role === 'unrelated') return ensureSentence(`${optionText} farklı bir kavramsal düzleme aittir; soru kökü aynı kategoride tek bir klinik yanıt seçmeyi gerektirir`);
  return ensureSentence(`${optionText} bazı klinik durumlarda düşünülebilir; ancak olgudaki belirleyici veriler bu seçeneğin beklenen kullanım alanını desteklemez`);
}

function classifyEvidenceType(text = '') {
  const value = normalizeSpaces(text);
  if (/\b(?:TA|kan bas[ıi]nc[ıi]|nab[ıi]z|solunum say[ıi]s[ıi]|ate[şs]|SpO₂|spo2|GKS|bilin[çc])\b/iu.test(value)) return 'Vital';
  if (/\b(?:inspeksiyon|palpasyon|perküsyon|oskültasyon|hassasiyet|raller|wheezing|hışıltılı|defans|rebound|üfürüm|matite|ekspansiyon|solunum sesleri|kapiller dolum|mukoza|gözyaşı|gozyaşı|ödem|huzursuz)\b/iu.test(value)) return 'Muayene';
  if (/\b(?:lökosit|wbc|crp|ph|hco₃|laktat|glukoz|kreatinin|troponin|d-dimer|hemoglobin|platelet|trombosit|alt|ast|bilirubin|na⁺|k⁺|idrar|proteinüri|hematüri|mg\/dL|mEq\/L|mmol\/L|\/mm³|\/µL)\b/iu.test(value)) return 'Laboratuvar';
  if (/\b(?:IgM|IgG|HBsAg|anti-|avidite|ANA|Anti-dsDNA|C3|C4|kompleman|antikor|antijen)\b/iu.test(value)) return 'Seroloji';
  if (/\b(?:kültür|kultur|gram|PCR|oksidaz|DNaz|duyarl[ıi]l[ıi]k|diren[çc])\b/iu.test(value)) return 'Mikrobiyoloji';
  if (/\b(?:grafi|USG|ultrasonografi|BT|MR|tomografi|anjiyografi|radyografi|ekokardiyografi|görüntüleme)\b/iu.test(value)) return 'Görüntüleme';
  if (/\b(?:EKG|ST|QRS|PR|QT|ritim|blok|aritmi|taşikardi|bradikardi)\b/iu.test(value)) return 'EKG';
  if (/\b(?:resept[öo]r|enzim|mekanizma|patofizyoloji|mutasyon|yolak|inhibisyon|aktivasyon)\b/iu.test(value)) return 'Mekanizma';
  return 'Öykü';
}

function sourceBundle(question = {}) {
  return normalizeSpaces([
    question.stem,
    question.narrativeStem,
    question.demographics,
    question.chiefComplaint,
    JSON.stringify(question.compactVitals || []),
    JSON.stringify(question.compactObjectiveData || []),
    JSON.stringify(question.findings || {}),
  ].filter(Boolean).join(' '));
}

function extractEvidenceText(item = '') {
  const raw = typeof item === 'string' ? item : `${item?.type || item?.label || item?.title || ''} ${item?.clue || item?.text || item?.meaning || item?.summary || ''}`;
  let text = normalizeSpaces(raw)
    .replace(/^kan[ıi]t\s*\d+\s*[:：.-]?\s*/iu, '')
    .replace(/^veri\s*[.:：-]\s*/iu, '')
    .replace(/\s*anlam[ıi]\s*[:：].*$/iu, '')
    .replace(/^(?:Öykü|Muayene|Vital|Laboratuvar|Seroloji|Görüntüleme|EKG|Mikrobiyoloji|Mekanizma)\s*[:：|-]\s*/iu, '')
    .replace(/^(?:Öykü|Muayene|Vital|Laboratuvar|Seroloji|Görüntüleme|EKG|Mikrobiyoloji|Mekanizma)\s*[—-]\s*/iu, '')
    .replace(/^(?:Öykü|Muayene|Vital|Laboratuvar|Seroloji|Görüntüleme|EKG|Mikrobiyoloji|Mekanizma)\s+/iu, '')
    .trim();
  return removeDuplicateSentences(text, { maxSentences: 1, limit: 145 });
}

function makeEvidenceMeaning(type = 'Öykü', target = 'diagnosis') {
  if (target.includes('test')) return `${type.toLocaleLowerCase(TR_LOCALE)} verisi tanısal karar düzeyini daraltır.`;
  if (target.includes('treatment') || target.includes('step')) return `${type.toLocaleLowerCase(TR_LOCALE)} verisi müdahale önceliğini belirler.`;
  if (target.includes('mechanism')) return `${type.toLocaleLowerCase(TR_LOCALE)} verisi mekanizma ayrımına katkı sağlar.`;
  return `${type.toLocaleLowerCase(TR_LOCALE)} verisi seçenekler arasındaki klinik ayrımı güçlendirir.`;
}

function sourceBound(item = '', source = '') {
  const clue = extractEvidenceText(item);
  if (!clue || !source) return false;
  if (/olgu k[öo]k[üu]ndeki|objektif bulgular|klinik veriler|hangi .* hangisidir|se[çc]enekler aras[ıi]/iu.test(clue)) return false;
  const clueKey = asciiKey(clue);
  const sourceKey = asciiKey(source);
  const numericTokens = (clue.match(/\b\d+(?:[.,]\d+)?\b/gu) || []).map(asciiKey).filter(Boolean);
  if (numericTokens.length && numericTokens.some((token) => !sourceKey.includes(token))) return false;
  if (numericTokens.length && /\b(ta|spo|spo2|nabiz|ate[sş]|solunum|gks|laktat|ph|hco3|glukoz|kreatinin|sodyum|potasyum)\b/i.test(clueKey)) return true;
  const clueTokens = tokens(clue)
    .filter((token) => token.length > 3 && !STOPWORDS.has(token))
    .slice(0, 8);
  if (!clueTokens.length) return false;
  const hits = clueTokens.filter((token) => sourceKey.includes(token));
  if (hits.length >= 2) return true;
  if (hits.length === 1 && (numericTokens.length || clueTokens.length <= 2) && similarity(clueKey, sourceKey) >= 0.18) return true;
  return false;
}

function buildEvidenceFallback(question = {}, target = 'diagnosis') {
  const evidence = [];
  const add = (text) => {
    const clue = extractEvidenceText(text);
    if (!clue || evidence.some((item) => similarity(item, clue) > 0.74)) return;
    const type = classifyEvidenceType(clue);
    evidence.push(`Veri: ${type} — ${clue.replace(/[.!?]$/u, '')}. Anlamı: ${makeEvidenceMeaning(type, target)}`);
  };
  (Array.isArray(question.compactObjectiveData) ? question.compactObjectiveData : []).slice(0, 3).forEach((item) => add(`${item.label}: ${item.value}`));
  (Array.isArray(question.compactVitals) ? question.compactVitals : []).slice(0, 2).forEach((item) => add(`${item.label}: ${item.value}`));
  (Array.isArray(question.findings?.exam) ? question.findings.exam : []).slice(0, 2).forEach(add);
  (Array.isArray(question.findings?.history) ? question.findings.history : []).slice(0, 2).forEach(add);
  splitSentences(question.stem || '').slice(0, 3).forEach(add);
  return evidence.slice(0, 4);
}

export function normalizeEvidenceLabels(evidenceChain = [], question = {}) {
  const target = inferQuestionIntent(question);
  const source = sourceBundle(question);
  const normalized = [];
  (Array.isArray(evidenceChain) ? evidenceChain : []).forEach((item) => {
    const clue = extractEvidenceText(item);
    if (!clue || clue.length < 8) return;
    if (source && !sourceBound(clue, source)) return;
    const type = classifyEvidenceType(clue);
    const meaningMatch = String(item || '').match(/anlam[ıi]\s*[:：]\s*(.+)$/iu);
    const rawMeaning = meaningMatch?.[1] ? removeDuplicateSentences(meaningMatch[1], { maxSentences: 1, limit: 150 }) : makeEvidenceMeaning(type, target);
    const line = `Veri: ${type} — ${clue.replace(/[.!?]$/u, '')}. Anlamı: ${rawMeaning.replace(/[.!?]$/u, '')}.`;
    if (normalized.some((existing) => similarity(existing, line) > 0.78)) return;
    normalized.push(line);
  });
  const fallback = buildEvidenceFallback(question, target);
  fallback.forEach((item) => {
    if (normalized.length >= 4) return;
    if (!normalized.some((existing) => similarity(existing, item) > 0.78)) normalized.push(item);
  });
  return normalized.slice(0, 4);
}

function normalizeDataLabel(label = '') {
  return normalizeSpaces(label)
    .replace(/(?:\.{2,}|…)+/gu, '')
    .replace(/^özgül\s+(Ig[GM])$/iu, '$1')
    .replace(/^serolojik?\s+veri(?:ler)?$/iu, 'Seroloji')
    .replace(/^objektif\s+veri(?:ler)?$/iu, 'Objektif veri')
    .trim();
}

function normalizeDataValue(value = '') {
  return normalizeSpaces(value)
    .replace(/(?:\.{2,}|…)+/gu, '')
    .replace(/(?:\s*[—–-]\s*)?(?:anormal|normal|patolojik)\.?$/giu, '')
    .replace(/,\s*(?:yüksek|düşük|normal|patolojik|pozitif|negatif|artmış|azalmış)$/giu, '')
    .replace(/\bile\s+uyumludur\b.*$/giu, '')
    .trim();
}

function compactDataKey(item = {}) {
  return asciiKey(`${item.label || ''}|${item.value || ''}`)
    .replace(/\b(?:anormal|normal|yuksek|dusuk|pozitif|negatif|patolojik)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeCompactData(items = [], max = 10) {
  const out = [];
  const seen = new Set();
  (Array.isArray(items) ? items : []).forEach((item) => {
    const label = normalizeDataLabel(item?.label || item?.name || item?.title || '');
    const value = normalizeDataValue(item?.value || item?.result || item?.text || '');
    if (!label || !value) return;
    if (/^(?:veri|bulgu|sonuç|değer)$/iu.test(label) && value.length > 50) return;
    const candidate = { label, value };
    const key = compactDataKey(candidate);
    if (!key || seen.has(key)) return;
    if (out.some((existing) => similarity(`${existing.label} ${existing.value}`, `${label} ${value}`) > 0.86)) return;
    seen.add(key);
    out.push(candidate);
  });
  return out.slice(0, max);
}

export function normalizeDataPanels(question = {}) {
  const repaired = { ...question };
  repaired.compactVitals = normalizeCompactData(repaired.compactVitals || [], 5);
  repaired.compactObjectiveData = normalizeCompactData(repaired.compactObjectiveData || [], 10);
  const investigations = Array.isArray(repaired.findings?.investigations) ? repaired.findings.investigations : Array.isArray(repaired.investigations) ? repaired.investigations : [];
  const cleanInvestigations = investigations.map((item, index) => {
    const label = normalizeDataLabel(item?.label || item?.title || `Tetkik ${index + 1}`);
    const summary = normalizeDataValue(item?.summary || item?.result || '');
    const findings = (Array.isArray(item?.findings) ? item.findings : [])
      .map((finding) => normalizeDataValue(finding))
      .filter((finding) => finding && !PREANSWER_SPOILER_PATTERNS.some((pattern) => pattern.test(finding)))
      .filter((finding, idx, list) => list.findIndex((other) => similarity(other, finding) > 0.86) === idx)
      .slice(0, 4);
    const rows = (Array.isArray(item?.rows) ? item.rows : [])
      .filter(Array.isArray)
      .map((row) => row.map((cell) => normalizeDataValue(cell)).filter(Boolean))
      .filter((row) => row.length >= 2);
    return { ...item, id: item?.id || `investigation-${index + 1}`, label, summary, findings, rows };
  }).filter((item) => item.label && (item.summary || item.findings.length || item.rows.length));
  repaired.investigations = cleanInvestigations;
  repaired.findings = { ...(repaired.findings || {}), investigations: cleanInvestigations };
  return repaired;
}

export function buildSemanticFingerprint(question = {}) {
  const options = optionList(question);
  const optionSet = options.map((option) => asciiKey(option.text)).sort().join('|');
  const payload = [
    question.relatedBranch || question.branchName || question.branchId,
    question.topic || question.subtopic || question.learningTarget,
    inferQuestionIntent(question),
    correctText(question),
    question.chiefComplaint,
    question.demographics,
    question.stem,
    optionSet,
  ].filter(Boolean).join(' :: ');
  let hash = 2166136261;
  const text = asciiKey(payload);
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `fp-${(hash >>> 0).toString(36)}`;
}

export function validateOptionCategoryConsistency(options = []) {
  const categories = optionList({ options }).map((option) => inferOptionCategory(option.text)).filter((item) => item !== 'other');
  // Diagnosis/etiology-style options are often proper nouns and may not match keyword categories.
  // Unknown categories are therefore not a fatal issue; explicit mixed categories are.
  if (categories.length < 3) return { ok: true, categories, dominant: categories[0] || 'undetermined', reason: null, underdetermined: true };
  const counts = categories.reduce((acc, category) => ({ ...acc, [category]: (acc[category] || 0) + 1 }), {});
  const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const mismatchCount = categories.filter((category) => category !== dominant).length;
  return { ok: mismatchCount <= 1, categories, dominant, reason: mismatchCount <= 1 ? null : 'option-category-mismatch' };
}

export function detectDoubleCorrectOptions(question = {}) {
  const roles = deriveRoles(question);
  const risky = Object.entries(roles).filter(([, role]) => role === 'adjunct_correct_but_not_asked' || role === 'later_step');
  const generic = isGenericQuestionText(question.question || '');
  const hasRisk = risky.length > 0 && generic;
  return { hasRisk, riskyOptionIds: risky.map(([id]) => id), roles, genericQuestion: generic };
}

export function validateQuestionIntent(question = {}) {
  const target = coerceAnswerTarget(question);
  const inferred = inferQuestionIntent({ ...question, answerTarget: '' });
  const optionCategory = validateOptionCategoryConsistency(question.options || []);
  const q = question.question || '';
  const errors = [];
  if (isGenericQuestionText(q) && String(target || '').match(/treatment|step|test|management|prophylaxis|control/iu)) errors.push('question-intent-generic');
  if (question.answerTarget && target !== question.answerTarget && inferred !== question.answerTarget) errors.push('answer-target-question-mismatch');
  if (!optionCategory.ok) errors.push(optionCategory.reason || 'option-category-mismatch');
  return { ok: errors.length === 0, errors, target, optionCategory };
}

function preAnswerText(question = {}) {
  return normalizeSpaces([
    question.stem,
    question.narrativeStem,
    question.demographics,
    question.setting,
    question.chiefComplaint,
    JSON.stringify(question.compactVitals || []),
    JSON.stringify(question.compactObjectiveData || []),
    JSON.stringify(question.findings?.history || []),
    JSON.stringify(question.findings?.exam || []),
  ].filter(Boolean).join(' '));
}

export function validateNoSpoilerBeforeAnswer(question = {}) {
  const errors = [];
  const visible = preAnswerText(question);
  const correct = correctText(question);
  if (correct && correct.length > 5 && asciiKey(visible).includes(asciiKey(correct))) errors.push('preanswer-correct-answer-leakage');
  PREANSWER_SPOILER_PATTERNS.forEach((pattern) => {
    if (pattern.test(visible)) errors.push('preanswer-interpretive-spoiler-language');
  });
  return { ok: errors.length === 0, errors: Array.from(new Set(errors)) };
}

function sanitizeTextField(value = '', { limit = Infinity, maxSentences = Infinity } = {}) {
  const withoutGeneric = stripGenericPhrases(value);
  const cleaned = removeDuplicateSentences(withoutGeneric, { limit, maxSentences });
  const trunc = detectTruncatedText(cleaned);
  if (!cleaned || trunc.truncated) return '';
  return cleaned;
}

function isQuestionLikeStemFragment(value = '') {
  const text = normalizeSpaces(value);
  const key = asciiKey(text);
  const hasDecisionCue = /\b(?:hangi|hangisidir|hangisi|nedir|en uygun|en olasi|en duyarli|ilk|sonraki|kesin tani|tanisal|laboratuvar|test|tetkik|inceleme|yaklasim|tedavi|mudahale|mekanizma|komplikasyon)\b/u.test(key);
  const hasCaseCue = /\b(?:bu olguda|bu hastada|bu bebekte|bu cocukta|bu prezentasyonda|bu tabloda|asagidakilerden)\b/u.test(key);
  return (hasCaseCue && hasDecisionCue) || (/\?$/.test(text) && hasDecisionCue) || /\b(?:yapilmasi gereken|istenmesi gereken|bakilmasi gereken|secilmesi gereken)\.?$/iu.test(key);
}

function stripQuestionLikeTailFromStem(stem = '') {
  const sentences = splitSentences(stem);
  if (!sentences.length) return normalizeSpaces(stem);
  const kept = sentences.filter((sentence, index) => !(index === sentences.length - 1 && isQuestionLikeStemFragment(sentence)));
  return normalizeSpaces(kept.join(' ') || stem);
}

function shouldKeepManagement(question = {}) {
  const intent = inferQuestionIntent(question);
  return /treatment|step|management|prophylaxis|control|complication/i.test(intent);
}

export function applyFinalAIQuestionSafetyStandard(question = {}) {
  const target = coerceAnswerTarget(question);
  let repaired = normalizeDataPanels({ ...question, answerTarget: target });
  const roles = deriveRoles(repaired);
  repaired.optionClinicalRoles = { ...(repaired.optionClinicalRoles || {}), ...roles };

  repaired.stem = stripQuestionLikeTailFromStem(repaired.stem || repaired.narrativeStem || repaired.patientIntro?.historySummary || '');
  repaired.narrativeStem = stripQuestionLikeTailFromStem(repaired.narrativeStem || repaired.stem || '');
  if (repaired.patientIntro?.historySummary) repaired.patientIntro.historySummary = stripQuestionLikeTailFromStem(repaired.patientIntro.historySummary);

  if (isGenericQuestionText(repaired.question || '') && detectDoubleCorrectOptions(repaired).riskyOptionIds.length) {
    repaired.question = targetQuestionText(target);
  } else {
    repaired.question = ensureQuestion(repaired.question || targetQuestionText(target));
  }

  repaired.explanation = sanitizeTextField(repaired.explanation || repaired.diagnosis?.answerFeedback?.whyCorrect || repaired.diagnosis?.explanation || '')
    || ensureSentence(`Olgudaki veriler ${targetQuestionText(target).replace(/\?$/u, '').toLocaleLowerCase(TR_LOCALE)} hedefini tek bir seçenek üzerinde toplar`);
  repaired.examPearl = sanitizeTextField(repaired.examPearl || repaired.examPearls?.[0] || repaired.diagnosis?.answerFeedback?.pearls?.[0] || '')
    || ensureSentence('TUS tipi sorularda karar, tek bir ezber cümlesinden çok ipuçlarının aynı klinik hedefte birleşmesiyle verilir');
  repaired.examPearls = [repaired.examPearl];

  const wrong = { ...(repaired.wrongOptionFeedback || {}) };
  optionList(repaired).forEach((option) => {
    wrong[option.id] = roleAwareFeedback(option.text, roles[option.id], target, wrong[option.id]);
  });
  repaired.wrongOptionFeedback = wrong;
  repaired.evidenceChain = normalizeEvidenceLabels(repaired.evidenceChain || repaired.diagnosis?.answerFeedback?.evidenceChain || [], repaired);

  if (shouldKeepManagement(repaired)) {
    const steps = (Array.isArray(repaired.managementSteps) ? repaired.managementSteps : repaired.diagnosis?.answerFeedback?.managementSteps || [])
      .map((step) => sanitizeTextField(typeof step === 'string' ? step : `${step?.title || ''} ${step?.text || step?.description || ''}`))
      .filter(Boolean)
      .filter((step, index, list) => list.findIndex((other) => similarity(other, step) > 0.86) === index)
      .slice(0, 4);
    repaired.managementSteps = steps.length ? steps : [
      'Önce hastanın acil klinik önceliği güvenli biçimde değerlendirilir.',
      'Soru kökünün hedeflediği karar düzeyine karşılık gelen seçenek seçilir.',
    ];
  } else {
    repaired.managementSteps = [];
  }

  const answerFeedback = repaired.diagnosis?.answerFeedback || {};
  repaired.diagnosis = {
    ...(repaired.diagnosis || {}),
    explanation: repaired.explanation,
    answerFeedback: {
      ...answerFeedback,
      whyCorrect: repaired.explanation,
      evidenceChain: repaired.evidenceChain,
      pearls: [repaired.examPearl],
      clinicalPearls: [repaired.examPearl],
      managementSteps: repaired.managementSteps,
      whyWrong: Object.fromEntries(optionList(repaired).filter((option) => option.id !== correctId(repaired)).map((option) => [option.text, repaired.wrongOptionFeedback[option.id]])),
    },
  };

  repaired.semanticFingerprint = repaired.semanticFingerprint || buildSemanticFingerprint(repaired);
  const finalFlags = validateFinalAIQuestionSafetyGate(repaired, { soft: true });
  repaired.qualityFlags = {
    ...(repaired.qualityFlags || {}),
    duplicateRisk: false,
    ambiguityRisk: finalFlags.errors.some((error) => /intent|generic|double-correct|ambiguous/iu.test(error)),
    doubleCorrectRisk: finalFlags.errors.some((error) => /double-correct/iu.test(error)),
    truncationRisk: finalFlags.errors.some((error) => /truncated/iu.test(error)),
    genericFeedbackRisk: finalFlags.errors.some((error) => /generic-feedback/iu.test(error)),
    labelMismatchRisk: finalFlags.errors.some((error) => /evidence/iu.test(error)),
    spoilerRisk: finalFlags.errors.some((error) => /spoiler|leakage/iu.test(error)),
    scientificRisk: false,
    optionCategoryMismatchRisk: finalFlags.errors.some((error) => /option-category/iu.test(error)),
    finalSafetyVersion: FINAL_AI_QUESTION_SAFETY_VERSION,
  };
  return repaired;
}

export function validateFinalAIQuestionSafetyGate(question = {}, { soft = false } = {}) {
  const errors = [];
  const warnings = [];
  const intent = validateQuestionIntent(question);
  const doubleCorrect = detectDoubleCorrectOptions(question);
  const spoiler = validateNoSpoilerBeforeAnswer(question);

  if (!intent.ok) errors.push(...intent.errors);
  if (doubleCorrect.hasRisk) errors.push(`double-correct-risk:${doubleCorrect.riskyOptionIds.join(',')}`);
  if (!spoiler.ok) errors.push(...spoiler.errors.map((error) => `spoiler:${error}`));

  const texts = [];
  const collect = (value) => {
    if (typeof value === 'string') texts.push(value);
    else if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === 'object') Object.values(value).forEach(collect);
  };
  collect({ explanation: question.explanation, examPearl: question.examPearl, wrongOptionFeedback: question.wrongOptionFeedback, evidenceChain: question.evidenceChain, managementSteps: question.managementSteps, answerFeedback: question.diagnosis?.answerFeedback });
  texts.forEach((text) => {
    const clean = normalizeSpaces(text);
    if (!clean) return;
    if (hasGenericFeedback(clean)) errors.push(`generic-feedback:${clean.slice(0, 90)}`);
    const trunc = detectTruncatedText(clean);
    if (trunc.truncated) errors.push(`truncated-text:${trunc.reason}:${clean.slice(0, 90)}`);
  });

  const evidence = Array.isArray(question.evidenceChain) ? question.evidenceChain : [];
  if (evidence.length < 3) errors.push('evidence-too-short');
  evidence.slice(0, 5).forEach((item, index) => {
    if (!/^Veri:\s*(?:Öykü|Muayene|Vital|Laboratuvar|Seroloji|Görüntüleme|EKG|Mikrobiyoloji|Mekanizma)\s*—\s*/u.test(String(item || '')) || !/Anlam[ıi]:/u.test(String(item || ''))) {
      errors.push(`evidence-label-format:${index + 1}`);
    }
    if (!soft && !sourceBound(item, sourceBundle(question))) errors.push(`evidence-source-weak:${index + 1}`);
  });

  const wrong = question.wrongOptionFeedback || {};
  const wrongTexts = Object.entries(wrong).filter(([id]) => id !== correctId(question)).map(([, text]) => normalizeSpaces(text));
  for (let i = 0; i < wrongTexts.length; i += 1) {
    for (let j = i + 1; j < wrongTexts.length; j += 1) {
      if (similarity(wrongTexts[i], wrongTexts[j]) > 0.90) errors.push(`feedback-repetition:${i + 1}-${j + 1}`);
    }
  }

  return {
    ok: errors.length === 0,
    errors: Array.from(new Set(errors)),
    warnings: Array.from(new Set(warnings)),
    answerTarget: intent.target,
    optionClinicalRoles: doubleCorrect.roles,
    semanticFingerprint: question.semanticFingerprint || buildSemanticFingerprint(question),
    version: FINAL_AI_QUESTION_SAFETY_VERSION,
  };
}

export function runFinalAIQuestionSafetyGate(question = {}) {
  const repaired = applyFinalAIQuestionSafetyStandard(question);
  const validation = validateFinalAIQuestionSafetyGate(repaired);
  return { ...validation, question: repaired };
}
