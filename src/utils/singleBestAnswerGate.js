export const SINGLE_BEST_ANSWER_GATE_VERSION = 'single-best-answer-gate-v1.0';

export const ANSWER_TARGETS = [
  'first_life_saving_step',
  'symptom_control',
  'mechanism_targeted_treatment',
  'definitive_treatment',
  'diagnostic_first_test',
  'confirmatory_test',
  'long_term_management',
  'complication_management',
  'prevention_or_prophylaxis',
  'mechanism_explanation',
];

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

const GENERIC_QUESTION_PATTERNS = [
  /\ben\s+uygun\s+tedavi\s+hangisidir\??\s*$/iu,
  /\ben\s+uygun\s+yakla[şs][ıi]m\s+hangisidir\??\s*$/iu,
  /\ben\s+uygun\s+antidot\s+hangisidir\??\s*$/iu,
  /\bhangi\s+se[çc]enek\s+do[ğg]rudur\??\s*$/iu,
  /\bne\s+yap[ıi]lmal[ıi]d[ıi]r\??\s*$/iu,
  /\bhangisi\s+verilmelidir\??\s*$/iu,
];

const ROLE_HINTS = {
  adjunct_correct_but_not_asked: [
    /\bdestek\b/iu,
    /\byard[ıi]mc[ıi]\b/iu,
    /\bok?sijen\b/iu,
    /\bs[ıi]v[ıi]\b/iu,
    /\banaljezi\b/iu,
    /\bsemptomatik\b/iu,
    /\bbronkodilat[öo]r\b/iu,
    /\bantihistaminik\b/iu,
    /\bkortikosteroid\b/iu,
    /\bmonitorizasyon\b/iu,
    /\bg[öo]zlem\b/iu,
  ],
  later_step: [
    /\bsonra\b/iu,
    /\bard[ıi]ndan\b/iu,
    /\bizlem\b/iu,
    /\buzun\s+d[öo]nem\b/iu,
    /\bidame\b/iu,
    /\bprofilaksi\b/iu,
    /\belektif\b/iu,
    /\bdefinitif\b/iu,
    /\bkesin\s+tedavi\b/iu,
    /\bkons[üu]ltasyon\b/iu,
    /\boperasyon\b/iu,
  ],
  contraindicated_or_harmful: [
    /\bkontrendike\b/iu,
    /\bzararl[ıi]\b/iu,
    /\bgeciktirir\b/iu,
    /\btek\s+ba[şs][ıi]na\s+izlem\b/iu,
    /\byaln[ıi]z\s+g[öo]zlem\b/iu,
  ],
};

function norm(text = '') {
  return String(text || '')
    .toLocaleLowerCase('tr')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9/%+\- ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function plain(value) {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(plain).filter(Boolean).join(' | ');
  if (value && typeof value === 'object') return Object.values(value).map(plain).filter(Boolean).join(' | ');
  return '';
}

function compactSentence(text = '', fallback = '', limit = 260) {
  const cleaned = String(text || fallback || '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/^[,.;:!\-\s]+|[,.;:!\-\s]+$/g, '')
    .trim();
  if (!cleaned) return fallback;
  return cleaned.length > limit ? `${cleaned.slice(0, limit - 1).trim()}…` : cleaned;
}

function getOptions(question = {}) {
  const raw = Array.isArray(question.options) ? question.options : [];
  return raw.map((item, index) => ({
    id: String(item?.id || OPTION_IDS[index] || '').toUpperCase(),
    text: typeof item === 'string' ? item : String(item?.text || item?.label || ''),
  })).filter((item) => item.id && item.text);
}

function getCorrectId(question = {}) {
  const id = String(question.correctAnswer || '').trim().toUpperCase();
  return OPTION_IDS.includes(id) ? id : '';
}

function getCorrectText(question = {}) {
  const correctId = getCorrectId(question);
  return getOptions(question).find((option) => option.id === correctId)?.text || question.correctAnswerText || '';
}

function inferOptionCategory(text = '') {
  const value = norm(text);
  if (/\b(test|tetkik|tarama|do[ğg]rulama|bt|mr|mrg|usg|ekg|kultur|kultur|pcr|seroloji|biyopsi|antikor|antijen|panel|kan gazi|idrar|görüntüleme|goruntuleme)\b/.test(value)) return 'test';
  if (/\b(tedavi|uygulamak|vermek|baslamak|başlamak|doz|inf[üu]zyon|intraven[öo]z|intram[üu]sk[üu]ler|oral|ila[çc]|antidot|antibiyotik|antiviral|antifungal|imm[üu]n|cerrahi|res[üu]sitasyon|replasman|stabilizasyon|profilaksi)\b/.test(value)) return 'treatment';
  if (/\b(mekanizma|patofizyoloji|resept[öo]r|enzim|inhibisyon|aktivasyon|mutasyon|transport|yolak|nekroz|apoptoz|hipersensitivite)\b/.test(value)) return 'mechanism';
  if (/\b(tan[ıi]|sendrom|hastal[ıi]k|enfeksiyon|toksidrom|komplikasyon|atak|alevlenme)\b/.test(value)) return 'diagnosis';
  return 'other';
}

function inferQuestionCategory(question = {}) {
  const q = norm(`${question.question || ''} ${question.learningTarget || ''}`);
  if (/mekanizma|patofizyoloji|a[çc][ıi]klar/.test(q)) return 'mechanism';
  if (/test|tetkik|tarama|do[ğg]rula|tan[ıi]y[ıi]\s+do[ğg]rulamak/.test(q)) return 'test';
  if (/tedavi|yakla[şs][ıi]m|m[üu]dahale|antidot|y[öo]netim|verilmelidir|ba[şs]lanmal[ıi]/.test(q)) return 'treatment';
  if (/tan[ıi]|etken|olası|d[üu][şs][üu]nd[üu]r[üu]r|ili[şs]kilidir/.test(q)) return 'diagnosis';
  return 'other';
}

export function inferAnswerTarget(question = {}) {
  const current = String(question.answerTarget || question.validationReport?.answerTarget || '').trim();
  if (ANSWER_TARGETS.includes(current)) return current;
  const q = norm(`${question.question || ''} ${question.learningTarget || ''} ${question.title || ''}`);
  const optionBundle = norm(getOptions(question).map((option) => option.text).join(' | '));
  if (/ilk\s+hayat|hayat[ıi]\s+tehdit|[öo]ncelikli|ilk\s+basamak|acil|ilk\s+m[üu]dahale|stabilizasyon/.test(q)) return 'first_life_saving_step';
  if (/semptom|yak[ıi]nma|kontrol/.test(q)) return 'symptom_control';
  if (/mekanizma|patofizyoloji|hedefleyen|etki\s+mekanizmas[ıi]|altta\s+yatan/.test(q)) return 'mechanism_explanation';
  if (/mekanizmaya\s+y[öo]nelik|[öo]zg[üu]l|antidot|nedene\s+y[öo]nelik/.test(q) || /antidot/.test(optionBundle)) return 'mechanism_targeted_treatment';
  if (/kesin|definitif|radikal/.test(q)) return 'definitive_treatment';
  if (/ilk\s+test|tarama|ilk\s+tetkik/.test(q)) return 'diagnostic_first_test';
  if (/do[ğg]rulay[ıi]c[ıi]|do[ğg]rulamak|kesin\s+tan[ıi]/.test(q)) return 'confirmatory_test';
  if (/uzun\s+d[öo]nem|izlem|idame/.test(q)) return 'long_term_management';
  if (/komplikasyon/.test(q)) return 'complication_management';
  if (/profilaksi|koruyucu|a[şs][ıi]|[öo]nleme/.test(q)) return 'prevention_or_prophylaxis';
  const category = inferQuestionCategory(question);
  if (category === 'treatment') return 'first_life_saving_step';
  if (category === 'test') return 'diagnostic_first_test';
  if (category === 'mechanism') return 'mechanism_explanation';
  return 'mechanism_explanation';
}

function isGenericQuestion(questionText = '') {
  const text = String(questionText || '').trim();
  const normalized = norm(text);
  return GENERIC_QUESTION_PATTERNS.some((regex) => regex.test(text))
    || /^(bu\s+olguda\s+)?en\s+uygun\s+(tedavi|yaklasim|antidot|secenek)\s+hangisidir\??$/.test(normalized)
    || /^hangi\s+secenek\s+dogrudur\??$/.test(normalized);
}

function targetToQuestionPrefix(target) {
  switch (target) {
    case 'first_life_saving_step': return 'Bu olguda öncelikle uygulanması gereken klinik müdahale hangisidir?';
    case 'symptom_control': return 'Bu olguda semptom kontrolü için en uygun seçenek hangisidir?';
    case 'mechanism_targeted_treatment': return 'Bu olguda altta yatan hedefe yönelik en uygun tedavi seçeneği hangisidir?';
    case 'definitive_treatment': return 'Bu olguda kesin tedavi seçeneği hangisidir?';
    case 'diagnostic_first_test': return 'Bu olguda ilk basamak tanısal değerlendirme için en uygun test hangisidir?';
    case 'confirmatory_test': return 'Bu olguda tanıyı doğrulamak için en uygun test hangisidir?';
    case 'long_term_management': return 'Bu olguda uzun dönem izlem veya idame yaklaşımı için en uygun seçenek hangisidir?';
    case 'complication_management': return 'Bu olguda komplikasyon yönetimi için en uygun seçenek hangisidir?';
    case 'prevention_or_prophylaxis': return 'Bu olguda koruyucu yaklaşım için en uygun seçenek hangisidir?';
    case 'mechanism_explanation': return 'Bu bulguları en iyi açıklayan mekanizma hangisidir?';
    default: return 'Bu olguda tek en iyi yanıtı belirleyen seçenek hangisidir?';
  }
}

function inferClinicalRoleForOption(question = {}, option = {}) {
  const correctId = getCorrectId(question);
  const explicit = question.optionClinicalRoles?.[option.id] || question.clinicalRoles?.[option.id];
  if (['primary_correct', 'adjunct_correct_but_not_asked', 'later_step', 'wrong_condition', 'unrelated', 'contraindicated_or_harmful'].includes(explicit)) return explicit;
  if (option.id === correctId) return 'primary_correct';
  const text = String(option.text || '');
  if (ROLE_HINTS.contraindicated_or_harmful.some((regex) => regex.test(text))) return 'contraindicated_or_harmful';
  if (ROLE_HINTS.adjunct_correct_but_not_asked.some((regex) => regex.test(text))) return 'adjunct_correct_but_not_asked';
  if (ROLE_HINTS.later_step.some((regex) => regex.test(text))) return 'later_step';
  const category = inferOptionCategory(text);
  const questionCategory = inferQuestionCategory(question);
  if (category !== 'other' && questionCategory !== 'other' && category !== questionCategory) return 'unrelated';
  return 'wrong_condition';
}

export function deriveOptionClinicalRoles(question = {}) {
  return Object.fromEntries(getOptions(question).map((option) => [option.id, inferClinicalRoleForOption(question, option)]));
}

function hasCoValidRisk(question = {}) {
  const roles = deriveOptionClinicalRoles(question);
  return Object.values(roles).some((role) => role === 'adjunct_correct_but_not_asked' || role === 'later_step');
}

function makeRoleAwareWrongFeedback({ optionText, role, target, existing = '' }) {
  const text = String(existing || '').trim();
  const generic = /farkl[ıi]\s+klinik\s+tabloda\s+uygun\s+olabilir|baz[ıi]\s+klinik\s+durumlarda\s+g[üu]ndeme\s+gelebilir|ana\s+ipu[çc]lar[ıi]n[ıi]\s+tek\s+ba[şs][ıi]na\s+a[çc][ıi]klamaz/iu.test(text);
  if (text && !generic && text.length >= 55) return compactSentence(text, '', 320);
  const targetText = targetToQuestionPrefix(target).replace(/\?$/, '').replace(/^Bu olguda\s*/iu, '').toLocaleLowerCase('tr');
  if (role === 'adjunct_correct_but_not_asked') {
    return compactSentence(`${optionText} bazı olgularda yardımcı rol oynayabilir; ancak verilen olguda soru ${targetText} düzeyini sorduğu için öncelikli yanıt değildir.`, '', 320);
  }
  if (role === 'later_step') {
    return compactSentence(`${optionText} sonraki basamakta veya seçilmiş koşullarda değerlendirilebilir; bu soruda istenen karar düzeyi için öncelikli seçenek değildir.`, '', 320);
  }
  if (role === 'contraindicated_or_harmful') {
    return compactSentence(`${optionText} bu karar düzeyinde uygun değildir; olgudaki öncelik güvenli ve doğrudan hedefe yönelik yaklaşımı gerektirir.`, '', 320);
  }
  if (role === 'unrelated') {
    return compactSentence(`${optionText} farklı bir karar kategorisine aittir; soru kökü aynı düzlemde tek bir klinik yanıt seçmeyi gerektirir.`, '', 320);
  }
  return compactSentence(`${optionText} ilişkili bir alternatif gibi görünse de verilen bulgular bu seçeneği tek en iyi yanıt yapacak düzeyde desteklemiyor.`, '', 320);
}

function sourceText(question = {}) {
  return plain({
    stem: question.stem,
    demographics: question.demographics,
    chiefComplaint: question.chiefComplaint,
    compactVitals: question.compactVitals,
    compactObjectiveData: question.compactObjectiveData,
    findings: question.findings,
  });
}

function tokenOverlap(a = '', b = '') {
  const sourceTokens = new Set(norm(a).split(' ').filter((token) => token.length > 3));
  const itemTokens = norm(b).split(' ').filter((token) => token.length > 3);
  if (!sourceTokens.size || !itemTokens.length) return 0;
  const hit = itemTokens.filter((token) => sourceTokens.has(token)).length;
  return hit / Math.max(1, Math.min(itemTokens.length, 8));
}

function buildFallbackEvidence(question = {}, target) {
  const evidence = [];
  const add = (label, value, meaning) => {
    const text = compactSentence(value);
    if (text && text.length > 6) evidence.push(`Veri: ${label ? `${label} ${text}` : text}. Anlamı: ${meaning}`);
  };
  (Array.isArray(question.compactObjectiveData) ? question.compactObjectiveData : []).slice(0, 2).forEach((item) => add(item.label, item.value, 'seçenekler arasındaki karar düzeyini daraltır.'));
  (Array.isArray(question.compactVitals) ? question.compactVitals : []).slice(0, 1).forEach((item) => add(item.label, item.value, 'klinik önceliğin belirlenmesine katkı sağlar.'));
  const exam = Array.isArray(question.findings?.exam) ? question.findings.exam : [];
  exam.slice(0, 1).forEach((item) => add('', item, 'fizik muayene bulgusuyla klinik yönü destekler.'));
  const history = Array.isArray(question.findings?.history) ? question.findings.history : [];
  history.slice(0, 1).forEach((item) => add('', item, 'öykü ile seçenek ayrımını güçlendirir.'));
  if (!evidence.length && question.stem) add('', question.stem.split('.').find((s) => s.trim().length > 20) || question.stem, 'soru kökünün hedeflediği karar düzeyini belirler.');
  while (evidence.length < 3) evidence.push(`Veri: Olgu kökündeki objektif bulgular. Anlamı: ${targetToQuestionPrefix(target).replace(/\?$/, '').toLocaleLowerCase('tr')} için seçenekler aynı eksende değerlendirilir.`);
  return evidence.slice(0, 4);
}

function normalizeEvidenceItem(item = '', source = '', target = 'mechanism_explanation') {
  let text = compactSentence(item, '', 300);
  if (!text) return '';
  text = text.replace(/^kan[ıi]t\s*\d+\s*[:.-]?\s*/iu, '').trim();
  if (/^veri\s*:/iu.test(text) && /anlam[ıi]\s*:/iu.test(text)) return text;
  const parts = text.split(/\s+-\s+|\s+→\s+|:\s+/).map((part) => part.trim()).filter(Boolean);
  const data = compactSentence(parts[0] || text, '', 140);
  const meaning = compactSentence(parts.slice(1).join(' ') || targetToQuestionPrefix(target).replace(/\?$/, '').toLocaleLowerCase('tr'), '', 150);
  if (source && tokenOverlap(source, data) < 0.12 && tokenOverlap(source, text) < 0.12) return '';
  return `Veri: ${data}. Anlamı: ${meaning}`;
}

export function applySingleBestAnswerStandard(question = {}) {
  const target = inferAnswerTarget(question);
  const roles = deriveOptionClinicalRoles(question);
  const options = getOptions(question);
  const repaired = {
    ...question,
    answerTarget: target,
    optionClinicalRoles: { ...(question.optionClinicalRoles || {}), ...roles },
  };

  if (isGenericQuestion(repaired.question) && (hasCoValidRisk(repaired) || inferQuestionCategory(repaired) !== 'diagnosis')) {
    repaired.question = targetToQuestionPrefix(target);
  }

  const wrong = { ...(repaired.wrongOptionFeedback || {}) };
  options.forEach((option) => {
    if (roles[option.id] === 'primary_correct') return;
    wrong[option.id] = makeRoleAwareWrongFeedback({ optionText: option.text, role: roles[option.id], target, existing: wrong[option.id] });
  });
  repaired.wrongOptionFeedback = wrong;

  const src = sourceText(repaired);
  const normalizedEvidence = (Array.isArray(repaired.evidenceChain) ? repaired.evidenceChain : [])
    .map((item) => normalizeEvidenceItem(item, src, target))
    .filter(Boolean);
  repaired.evidenceChain = Array.from(new Set(normalizedEvidence)).slice(0, 4);
  if (repaired.evidenceChain.length < 3) repaired.evidenceChain = buildFallbackEvidence(repaired, target);

  if (Array.isArray(repaired.managementSteps)) {
    repaired.managementSteps = repaired.managementSteps
      .map((item) => compactSentence(item, '', 220))
      .filter(Boolean)
      .slice(0, 4);
  }
  if (!Array.isArray(repaired.managementSteps) || repaired.managementSteps.length < 2) {
    repaired.managementSteps = [
      'Önce olgunun gerektirdiği acil klinik öncelik belirlenir.',
      'Soru kökünün hedeflediği karar düzeyine göre tek en uygun seçenek seçilir.',
      'Eş zamanlı veya sonraki basamaklar feedbackte ayrıştırılır.',
    ];
  }

  return repaired;
}

export function validateSingleBestAnswerGate(question = {}) {
  const errors = [];
  const warnings = [];
  const target = inferAnswerTarget(question);
  const roles = deriveOptionClinicalRoles(question);
  const questionText = String(question.question || '');
  const category = inferQuestionCategory(question);
  const options = getOptions(question);
  const correctText = getCorrectText(question);

  if (!ANSWER_TARGETS.includes(String(question.answerTarget || target))) errors.push('answerTarget geçerli karar düzeylerinden biri olmalı');
  if (isGenericQuestion(questionText) && (category === 'treatment' || category === 'test' || hasCoValidRisk(question))) {
    errors.push('soru kökü tek doğru cevabı zorunlu kılacak kadar dar değil');
  }

  const optionCategories = options.map((option) => inferOptionCategory(option.text)).filter((item) => item !== 'other');
  const dominant = optionCategories.sort((a, b) => optionCategories.filter((x) => x === b).length - optionCategories.filter((x) => x === a).length)[0];
  if (dominant && optionCategories.filter((item) => item !== dominant).length >= 2) errors.push('seçenekler aynı kavramsal karar düzleminde değil');

  const coValid = Object.entries(roles).filter(([, role]) => role === 'adjunct_correct_but_not_asked' || role === 'later_step');
  if (coValid.length && isGenericQuestion(questionText)) errors.push('aynı olguda birlikte veya ardışık kullanılabilecek seçenekler soru kökü daraltılmadan yarıştırılmış');

  const wrong = question.wrongOptionFeedback || {};
  Object.entries(roles).forEach(([id, role]) => {
    if (role === 'primary_correct') return;
    const text = String(wrong[id] || '').trim();
    if (/farkl[ıi]\s+klinik\s+tabloda\s+uygun\s+olabilir\.?\s*$/iu.test(text)) errors.push(`${id} feedback jenerik ve yanıltıcı: farklı klinik tablo kalıbı`);
    if (/ana\s+ipu[çc]lar[ıi]n[ıi]\s+tek\s+ba[şs][ıi]na\s+a[çc][ıi]klamaz\.?\s*$/iu.test(text)) errors.push(`${id} feedback tek başına boş genelleme içeriyor`);
    if ((role === 'adjunct_correct_but_not_asked' || role === 'later_step') && !/(yard[ıi]mc[ıi]|ek rol|sonraki|ard[ıi][şs][ıi]k|karar düzeyi|[öo]ncelikli|tek en iyi)/iu.test(text)) {
      errors.push(`${id} kısmen uygun seçenek nüanslı açıklanmamış`);
    }
  });

  const feedbackTexts = Object.entries(wrong).filter(([id]) => roles[id] !== 'primary_correct').map(([, text]) => norm(text));
  const counts = new Map();
  feedbackTexts.forEach((text) => {
    const key = text.split(' ').slice(0, 8).join(' ');
    if (key.length > 20) counts.set(key, (counts.get(key) || 0) + 1);
  });
  counts.forEach((count, key) => { if (count > 1) errors.push(`yanlış seçenek feedbackleri tekrar ediyor: ${key}`); });

  const src = sourceText(question);
  const evidence = Array.isArray(question.evidenceChain) ? question.evidenceChain : [];
  if (evidence.length < 3) errors.push('kanıt zinciri en az 3 source-bound madde içermeli');
  evidence.slice(0, 5).forEach((item, index) => {
    const text = String(item || '');
    if (!/^veri\s*:/iu.test(text) || !/anlam[ıi]\s*:/iu.test(text)) errors.push(`kanıt zinciri Veri/Anlam formatında değil: ${index + 1}`);
    const data = text.replace(/^veri\s*:/iu, '').split(/anlam[ıi]\s*:/iu)[0] || text;
    if (src && tokenOverlap(src, data) < 0.10 && !/olgu kökündeki objektif bulgular/iu.test(data)) warnings.push(`kanıt maddesi olgu verisine zayıf bağlı: ${index + 1}`);
  });

  if (correctText && correctText.length > 0) {
    const visible = norm(plain({ title: question.title, stem: question.stem, compactVitals: question.compactVitals, compactObjectiveData: question.compactObjectiveData }));
    const correctNorm = norm(correctText);
    if (correctNorm.length > 8 && visible.includes(correctNorm)) errors.push('cevap öncesi alanda doğru seçenek metni birebir geçiyor');
  }

  return {
    ok: errors.length === 0,
    errors: Array.from(new Set(errors)),
    warnings: Array.from(new Set(warnings)),
    answerTarget: target,
    optionClinicalRoles: roles,
    version: SINGLE_BEST_ANSWER_GATE_VERSION,
  };
}
