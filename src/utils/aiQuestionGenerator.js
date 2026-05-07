import { AI_QUESTION_SEEDS } from '../data/aiQuestionSeeds.js';
import { AI_BRANCH_TEMPLATE_SEEDS } from '../data/aiBranchQuestionTemplates.js';
import { cases } from '../data/cases.js';
import { branches } from '../data/branches.js';
import { shuffleArray } from './randomize.js';
import {
  buildRecentQuestionContext,
  makeQuestionSignature,
  makeQuestionTopicSignature,
  makeSeedSignature,
  normalizeQuestionText,
  stableHash,
} from './aiQuestionHistory.js';
import { validateAIQuestionCase } from './validateAIQuestion.js';
import { createAIQuestionId, makeOptionSetSignature, toPlainText } from './questionDeduplication.js';
import {
  branchFilterMatchesSeed,
  buildBranchAwareStem,
  buildBranchExamDefaults,
  buildBranchRiskContext,
  buildBranchVitals,
  getAIQuestionBranchOptions,
  getBranchControlledProfile,
  getBranchRuleForSeed,
  sanitizeAIQuestionTitle,
} from './aiBranchRules.js';

const AI_BRANCH_ID = 'tus-spot-olgular';
const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const CASE_CONCEPT_LIMIT = 220;
const MAX_GENERATION_ATTEMPTS = 180;
const BRANCH_NAME_BY_ID = Object.fromEntries((branches || []).map((branch) => [branch.id, branch.name || branch.shortName || branch.id]));

const FALLBACK_DISTRACTORS_BY_BRANCH = {
  'Tıbbi Mikrobiyoloji': ['Geçirilmiş enfeksiyon paterni', 'Aşı sonrası bağışıklık paterni', 'Kronik taşıyıcılık paterni', 'Reaktivasyon paterni', 'Kontaminasyon lehine sonuç'],
  'Tıbbi Farmakoloji': ['Nalokson', 'Flumazenil', 'N-asetilsistein', 'Fomepizol', 'Dantrolen', 'Metilen mavisi'],
  'Tıbbi Biyokimya': ['Fenilalanin hidroksilaz defekti', 'Ornitin transkarbamilaz defekti', 'Propionil-CoA karboksilaz defekti', 'Homogentizat oksidaz defekti', 'Pirüvat dehidrogenaz defekti'],
  'İç Hastalıkları': ['Sekonder endokrin yetmezlik', 'Akut enfeksiyöz tablo', 'Primer hiperaldosteronizm', 'Uygunsuz ADH sendromu', 'Fonksiyonel yakınma paterni'],
  'Çocuk Sağlığı ve Hastalıkları': ['Epiglotit', 'Yabancı cisim aspirasyonu', 'Bronşiolit', 'Astım atağı', 'Bakteriyel trakeit'],
  'Kadın Hastalıkları ve Doğum': ['Normal intrauterin gebelik', 'Tam abortus', 'Molar gebelik', 'Korpus luteum kisti rüptürü', 'Pelvik inflamatuvar hastalık'],
  default: ['Yakın klinik çeldirici', 'Farklı mekanizmalı benzer tablo', 'Geçirilmiş hastalık paterni', 'Akut komplikasyon dışı durum', 'Normal varyant'],
};

const SCENARIO_OPENERS = [
  'Kısa TUS pratiğinde değerlendirilen hastada',
  'Acil karar basamağına getirilen olguda',
  'Poliklinik değerlendirmesinde ayırıcı tanı gerektiren tabloda',
  'Nöbetçi hekimin hızlı yorumlaması gereken spot olguda',
  'Temel bilim bilgisinin klinik paternle birleştirildiği soruda',
  'Klinik karar toplantısında tartışılan kısa olguda',
];

const QUESTION_ANGLES = [
  {
    id: 'pattern',
    label: 'patern yorumu',
    question: 'Bu kısa klinik patern ve objektif veriler birlikte düşünüldüğünde en uygun seçenek hangisidir?',
    stemCue: 'öykü, muayene ve seçilmiş objektif veriler tek bir karar ekseninde birleştirilmelidir',
  },
  {
    id: 'first-step',
    label: 'ilk yaklaşım',
    question: 'Bu hasta için TUS mantığında en doğru ilk yaklaşım veya hedef seçenek hangisidir?',
    stemCue: 'öncelik doğru tanısal/terapötik basamağı geciktirmeden seçmektir',
  },
  {
    id: 'mechanism',
    label: 'mekanizma bağlantısı',
    question: 'Bu tablonun temel mekanizmasını veya ayırt ettirici bilgisini en iyi karşılayan seçenek hangisidir?',
    stemCue: 'soru, ezber isimden çok mekanizma ile klinik ipucunu eşleştirmeyi gerektirir',
  },
  {
    id: 'differential',
    label: 'çeldirici ayrımı',
    question: 'Benzer seçenekler arasından bu olguyu en iyi açıklayan yanıt hangisidir?',
    stemCue: 'çeldiriciler aynı kategori içinde tutulmuştur ve karar tek ayırt ettirici ipucuna dayanır',
  },
  {
    id: 'lab',
    label: 'tetkik yorumu',
    question: 'Verilen tetkik ve klinik bağlam birlikte yorumlandığında en güçlü sonuç hangisidir?',
    stemCue: 'tetkik sonucu tanıyı doğrudan yazmaz; adaydan patern yorumu beklenir',
  },
];

const DEMOGRAPHIC_POOL = [
  '19 yaş kadın', '23 yaş erkek', '31 yaş kadın', '37 yaş erkek', '44 yaş kadın', '52 yaş erkek',
  '61 yaş kadın', '68 yaş erkek', '2 yaş çocuk', '9 yaş çocuk', '10 günlük yenidoğan', '16 yaş ergen',
];

const SETTING_POOL = ['Acil servis', 'Dahiliye polikliniği', 'Çocuk acil', 'Aile hekimliği başvurusu', 'Servis konsültasyonu', 'Yoğun bakım ön değerlendirmesi'];

function richItemText(item = '') {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return [item.title || item.label, item.text || item.summary || item.explanation || item.description]
    .filter(Boolean)
    .join(': ');
}

function uniqueStrings(items = []) {
  return Array.from(new Set(items.map((item) => String(richItemText(item) || '').replace(/\s+/g, ' ').trim()).filter(Boolean)));
}

function branchTextOfSeed(seed) {
  return `${seed.relatedBranch || ''} ${seed.spotCategory || ''} ${seed.branchId || ''}`.toLocaleLowerCase('tr');
}

function optionTextById(seed, optionId) {
  return seed.options.find((option) => option.id === optionId)?.text || seed.options[0]?.text || '';
}

function getCaseAnswerFeedback(clinicalCase = {}) {
  return clinicalCase.diagnosis?.answerFeedback || clinicalCase.answerFeedback || {};
}

function getBranchName(clinicalCase = {}) {
  return clinicalCase.relatedBranch || BRANCH_NAME_BY_ID[clinicalCase.branchId] || clinicalCase.branchId || 'TUS Spot Olgular';
}

function compactLearningTarget(text = '', fallback = '') {
  const cleaned = String(text || fallback || '')
    .replace(/\s+/g, ' ')
    .replace(/\bBu nedenle\b.*$/i, '')
    .trim();
  return cleaned || 'Karar verdirici klinik paternin benzer çeldiricilerden ayrılması';
}

function collectBranchDiagnosisPool(branchId) {
  return uniqueStrings(
    cases
      .filter((item) => item.branchId === branchId)
      .map((item) => item.diagnosis?.correct)
      .filter(Boolean),
  );
}

function collectGlobalDiagnosisPool() {
  return uniqueStrings(cases.map((item) => item.diagnosis?.correct).filter(Boolean));
}

function selectDeterministic(items = [], key = '', count = 1) {
  if (!items.length) return [];
  const start = parseInt(stableHash(key).replace(/^q/, ''), 36) % items.length;
  const selected = [];
  for (let offset = 0; offset < items.length && selected.length < count; offset += 1) {
    selected.push(items[(start + offset) % items.length]);
  }
  return selected;
}

function buildCaseDerivedOptions(clinicalCase, relatedBranch) {
  const correct = clinicalCase.diagnosis?.correct;
  if (!correct) return null;
  const branchPool = collectBranchDiagnosisPool(clinicalCase.branchId).filter((item) => normalizeQuestionText(item) !== normalizeQuestionText(correct));
  const globalPool = collectGlobalDiagnosisPool().filter((item) => normalizeQuestionText(item) !== normalizeQuestionText(correct));
  const fallbackPool = FALLBACK_DISTRACTORS_BY_BRANCH[relatedBranch] || FALLBACK_DISTRACTORS_BY_BRANCH.default;
  const distractors = uniqueStrings([
    ...selectDeterministic(branchPool, `${clinicalCase.id}-branch`, 7),
    ...selectDeterministic(globalPool, `${clinicalCase.id}-global`, 5),
    ...fallbackPool,
  ]).filter((item) => normalizeQuestionText(item) !== normalizeQuestionText(correct));

  const finalTexts = uniqueStrings([correct, ...distractors]).slice(0, 5);
  if (finalTexts.length < 5) return null;
  return finalTexts.map((text, index) => ({ id: OPTION_IDS[index], text }));
}

function abstractCaseEvidence(clinicalCase = {}) {
  const feedback = getCaseAnswerFeedback(clinicalCase);
  const pearls = uniqueStrings([
    ...(Array.isArray(feedback.pearls) ? feedback.pearls : []),
    ...(Array.isArray(clinicalCase.diagnosis?.pearls) ? clinicalCase.diagnosis.pearls : []),
    feedback.learningOutcome,
    clinicalCase.clinicalFocus,
    clinicalCase.examNote,
    clinicalCase.spotPearl,
  ]).slice(0, 4);
  return pearls.length ? pearls : [clinicalCase.clinicalFocus || clinicalCase.title].filter(Boolean);
}

function buildCaseDerivedSeed(clinicalCase) {
  const relatedBranch = getBranchName(clinicalCase);
  const options = buildCaseDerivedOptions(clinicalCase, relatedBranch);
  if (!options) return null;

  const feedback = getCaseAnswerFeedback(clinicalCase);
  const learningTarget = compactLearningTarget(
    feedback.learningOutcome || clinicalCase.clinicalFocus,
    clinicalCase.diagnosis?.explanation || clinicalCase.title,
  );

  return {
    seedId: `ai-concept-${stableHash(`${clinicalCase.id}|${learningTarget}|${clinicalCase.diagnosis?.correct}`)}`,
    conceptOriginId: clinicalCase.id,
    source: 'embedded-case-concept-only',
    title: clinicalCase.chiefComplaint || clinicalCase.patientIntro?.presentation || `${relatedBranch} spot karar sorusu`,
    relatedBranch,
    branchId: AI_BRANCH_ID,
    originalBranchId: clinicalCase.branchId,
    spotCategory: `AI Spot • ${relatedBranch}`,
    difficulty: clinicalCase.difficulty?.includes('Acil') ? 'Zor' : (clinicalCase.difficulty || 'Orta-Zor'),
    learningTarget,
    correctConcept: clinicalCase.diagnosis?.correct,
    demographics: null,
    setting: null,
    chiefComplaint: null,
    stem: null,
    exam: [],
    vitals: {},
    investigations: [],
    question: null,
    questionType: 'spot',
    options,
    correctAnswer: 'A',
    explanation: clinicalCase.diagnosis?.explanation || feedback.whyCorrect || `${clinicalCase.diagnosis?.correct} seçeneği verilen öğrenme hedefini en doğrudan açıklar; diğer seçenekler aynı başlıkta güçlü çeldirici olsa da karar verdirici paternle tam örtüşmez.`,
    wrongOptionFeedback: {},
    evidenceConcepts: abstractCaseEvidence(clinicalCase),
    examPearl: toPlainText((feedback.pearls || clinicalCase.diagnosis?.pearls || [])[0]) || learningTarget,
    managementSteps: [],
  };
}

let cachedCaseDerivedSeeds = null;

export function buildCaseDerivedAISeeds() {
  if (cachedCaseDerivedSeeds) return cachedCaseDerivedSeeds;
  cachedCaseDerivedSeeds = cases
    .map(buildCaseDerivedSeed)
    .filter(Boolean)
    .slice(0, CASE_CONCEPT_LIMIT);
  return cachedCaseDerivedSeeds;
}

function getEligibleSeeds(branchFilter = 'random') {
  const normalizedFilter = String(branchFilter || 'random').toLocaleLowerCase('tr');
  const allSeeds = [...AI_QUESTION_SEEDS, ...AI_BRANCH_TEMPLATE_SEEDS, ...buildCaseDerivedAISeeds()];
  if (normalizedFilter === 'random' || normalizedFilter === 'rastgele') return allSeeds;
  const filtered = allSeeds.filter((seed) => branchFilterMatchesSeed(seed, branchFilter));
  return filtered.length ? filtered : [...AI_QUESTION_SEEDS, ...AI_BRANCH_TEMPLATE_SEEDS].filter((seed) => branchFilterMatchesSeed(seed, branchFilter));
}

function previousSeedIdFromContext(previousQuestionId = '', context = {}) {
  const historyItem = (context.recentQuestionSummaries || []).find((item) => item.id === previousQuestionId);
  return historyItem?.seedId || null;
}

function scoreSeedNovelty(seed, context, previousQuestionId) {
  const seedSignature = makeSeedSignature(seed);
  const sourceKey = seed.seedId;
  let score = Math.random();
  if (sourceKey === previousSeedIdFromContext(previousQuestionId, context)) score -= 100;
  if (context.recentIds?.includes(sourceKey)) score -= 80;
  if (context.recentSignatures?.includes(seedSignature)) score -= 50;
  if (seed.source === 'embedded-case-concept-only') score += 0.2;
  if (seed.difficulty?.toLocaleLowerCase('tr').includes('zor')) score += 0.06;
  return score;
}

function rankSeedsByNovelty(pool, { previousQuestionId = null, context = buildRecentQuestionContext() } = {}) {
  return shuffleArray(pool)
    .sort((a, b) => scoreSeedNovelty(b, context, previousQuestionId) - scoreSeedNovelty(a, context, previousQuestionId));
}

function buildVariantProfile(seed, attempt = 0, context = {}, branchFilter = '') {
  const variantKey = `${seed.seedId}|${Date.now()}|${Math.random()}|${attempt}|${context.recentSignatures?.length || 0}`;
  const numeric = parseInt(stableHash(variantKey).replace(/^q/, ''), 36);
  const branchProfile = getBranchControlledProfile(seed, attempt, context, branchFilter);
  return {
    angle: QUESTION_ANGLES[numeric % QUESTION_ANGLES.length],
    opener: SCENARIO_OPENERS[(numeric + attempt) % SCENARIO_OPENERS.length],
    demographic: branchProfile.demographic,
    setting: branchProfile.setting,
    presentation: branchProfile.presentation,
    titleCue: branchProfile.titleCue,
    rule: branchProfile.rule,
    variantNo: (numeric % 997) + 1,
    answerShift: numeric % OPTION_IDS.length,
  };
}

function maskCorrectConcept(text = '', correctText = '') {
  if (!text || !correctText) return text || '';
  const escaped = String(correctText).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return String(text).replace(new RegExp(escaped, 'gi'), 'karar verdirici patern');
}

function buildStem(seed, profile, correctText) {
  const controlledStem = buildBranchAwareStem(seed, profile, profile.angle, correctText);
  if (seed.source === 'embedded-case-concept-only') return controlledStem;

  const baseStem = String(seed.stem || '').replace(new RegExp(String(correctText || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), 'karar verdirici patern');
  const branchRule = getBranchRuleForSeed(seed);
  if (branchRule?.id === 'pediatrics' && /\b([2-9][0-9])\s*yaş\b|erişkin|yaşlı/i.test(baseStem)) return controlledStem;
  if (branchRule?.id === 'obstetrics-gynecology' && /\berkek\b|prostat|testis/i.test(baseStem)) return controlledStem;
  return `${baseStem} Bu varyantta ${profile.angle.stemCue}.`.replace(/\s+/g, ' ').trim();
}

function normalizeOptionObjects(options = []) {
  return options
    .map((option, index) => ({ id: OPTION_IDS[index] || option.id || String(index + 1), text: String(option.text || option || '').trim() }))
    .filter((option) => option.text)
    .slice(0, 5);
}

function buildBalancedOptions(seed, profile) {
  const correctText = seed.correctConcept || optionTextById(seed, seed.correctAnswer);
  const rawOptions = normalizeOptionObjects(seed.options);
  const correctOption = rawOptions.find((option) => normalizeQuestionText(option.text) === normalizeQuestionText(correctText)) || rawOptions.find((option) => option.id === seed.correctAnswer) || rawOptions[0];
  const distractors = rawOptions.filter((option) => normalizeQuestionText(option.text) !== normalizeQuestionText(correctOption?.text));
  const optionTexts = uniqueStrings([correctOption?.text, ...shuffleArray(distractors.map((item) => item.text))]).slice(0, 5);
  const completeTexts = optionTexts.length === 5 ? optionTexts : uniqueStrings([...optionTexts, ...(FALLBACK_DISTRACTORS_BY_BRANCH[seed.relatedBranch] || FALLBACK_DISTRACTORS_BY_BRANCH.default)]).slice(0, 5);

  const correct = correctOption?.text || completeTexts[0];
  const remaining = shuffleArray(completeTexts.filter((text) => normalizeQuestionText(text) !== normalizeQuestionText(correct)));
  const finalTexts = [...remaining.slice(0, profile.answerShift), correct, ...remaining.slice(profile.answerShift)].slice(0, 5);
  while (finalTexts.length < 5) {
    const fallback = (FALLBACK_DISTRACTORS_BY_BRANCH[seed.relatedBranch] || FALLBACK_DISTRACTORS_BY_BRANCH.default)
      .find((item) => !finalTexts.some((text) => normalizeQuestionText(text) === normalizeQuestionText(item)));
    if (!fallback) break;
    finalTexts.push(fallback);
  }

  return finalTexts.slice(0, 5).map((text, index) => ({ id: OPTION_IDS[index], text }));
}

function buildEvidenceChain(seed, profile, correctText) {
  if (seed.source === 'embedded-case-concept-only') {
    const concepts = uniqueStrings(seed.evidenceConcepts || [])
      .map((item) => maskCorrectConcept(item, correctText))
      .slice(0, 3);
    const maskedLearningTarget = maskCorrectConcept(seed.learningTarget, correctText);
    return [
      `${seed.relatedBranch || 'Bu branş'} sorusunda ana karar, tek öğrenme hedefinin doğru yorumlanmasına dayanır.`,
      concepts[0] || `${maskedLearningTarget} bilgisi seçenekler arasında ayırıcı rol oynar.`,
      'Çeldiriciler aynı klinik/temel bilim kategorisinde tutulduğu için yüzeysel anahtar kelimeyle değil paternle karar verilmelidir.',
      'Doğru seçenek, verilen öğrenme hedefiyle en tutarlı yanıt eksenini oluşturur.',
    ];
  }
  return uniqueStrings(seed.evidenceChain || []).map((item) => maskCorrectConcept(item, correctText)).slice(0, 5);
}

function cleanClinicalSummaryItem(value = '') {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/^(Karar verdirici ipucu|Destekleyici kanıt|Ayırt ettirici ipucu|Ayırt ettirici bulgu|Klinik patern|Tanısal ayrım|Sınav notu|TUS kırmızı bayrağı|Destekleyici bulgu|Ana kanıt|Kritik ipucu|karar verdirici patern)\s*[:：-]\s*/iu, '')
    .replace(/\s*(\.{3}|…)\s*/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,.;:!?])(?=\S)/g, '$1 ')
    .replace(/\s*\/\s*/g, ' veya ')
    .replace(/[\s,;:.]+$/u, '')
    .trim();
}

function uniqueSummaryItems(items = [], max = 4) {
  const seen = new Set();
  const out = [];
  items.map(cleanClinicalSummaryItem).filter(Boolean).forEach((item) => {
    const key = normalizeQuestionText(item);
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  });
  return out.slice(0, max);
}

function buildAIRiskContext(seed, profile) {
  return uniqueSummaryItems(buildBranchRiskContext(seed, profile), 3);
}

function buildAIClueItems(evidenceChain = [], seed = {}, correctText = '') {
  return uniqueSummaryItems([
    ...(evidenceChain || []),
    `${correctText} seçeneğini destekleyen ana patern`,
    seed.examPearl || seed.learningTarget,
  ], 4);
}

function buildInvestigation(item, index, correctText = '') {
  const strip = (text = '') => {
    if (!text || !correctText) return text || '';
    const escaped = String(correctText).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return String(text).replace(new RegExp(escaped, 'gi'), 'karar verdirici patern');
  };
  return {
    id: item.id || `ai-investigation-${index + 1}`,
    label: item.label || `Tetkik ${index + 1}`,
    type: item.type || 'lab',
    priority: item.priority || (index === 0 ? 'essential' : 'useful'),
    rows: Array.isArray(item.rows) ? item.rows : undefined,
    summary: strip(item.summary || ''),
    findings: Array.isArray(item.findings) ? item.findings.map(strip) : [],
    interpretation: 'Objektif sonuçlar tanıyı doğrudan söylemeden klinik yorum gerektirir.',
  };
}

function buildSyntheticInvestigation(seed, profile, correctText = '') {
  return [{
    id: `ai-synthetic-pattern-${profile.variantNo}`,
    label: profile.angle.id === 'lab' ? 'Hedefli tetkik paterni' : 'Klinik karar verisi',
    type: profile.angle.id === 'mechanism' ? 'mechanism' : 'lab',
    priority: 'essential',
    summary: 'Sonuçlar tek bir tanı adını yazmaz; patern, mekanizma ve çeldirici ayrımı birlikte yorumlanmalıdır.',
    findings: [
      `${seed.relatedBranch || 'TUS'} başlığında karar verdirici eksen: ${maskCorrectConcept(seed.learningTarget, correctText)}.`,
      'Bulgular seçenekler arasında doğrudan ezber değil klinik akıl yürütme gerektirir.',
    ],
    interpretation: 'Yanıtı açık etmeden patern yorumlaması beklenir.',
  }];
}

function buildWrongFeedback(options, correctText, seed) {
  return options.reduce((accumulator, option) => {
    if (normalizeQuestionText(option.text) === normalizeQuestionText(correctText)) return accumulator;
    const seeded = seed.wrongOptionFeedback?.[option.id];
    accumulator[option.id] = seeded || `${option.text} güçlü bir çeldiricidir; ancak ${seed.learningTarget} eksenindeki karar verdirici bilgi bu seçeneği doğru yanıttan ayırır.`;
    return accumulator;
  }, {});
}

function buildDifferentialComparison(options, correctText, wrongOptionFeedback, seed) {
  return options.reduce((accumulator, option) => {
    if (normalizeQuestionText(option.text) === normalizeQuestionText(correctText)) return accumulator;
    accumulator[option.text] = {
      explanation: wrongOptionFeedback[option.id] || `${option.text} bu klinik bağlamda düşünülebilir; ancak temel patern ${correctText} lehinedir.`,
      comparisonPoints: [
        `${option.text} benzer kategori içinde yer alır; fakat ana ipucunu tam açıklamaz.`,
        `${correctText} seçeneği ${seed.learningTarget} bilgisini doğrudan karşılar.`,
        'TUS sorusunda doğru ayrım, çeldiricinin değil karar verdirici bulgunun takip edilmesiyle yapılır.',
      ],
    };
    return accumulator;
  }, {});
}

function buildManagementSteps(seed, profile) {
  if (Array.isArray(seed.managementSteps) && seed.managementSteps.length) {
    return seed.managementSteps.map(richItemText).filter(Boolean).slice(0, 4);
  }
  return [
    'Önce ana klinik/temel bilim paternini belirle.',
    'Seçenekleri aynı kategori içinde karşılaştır ve direkt tanı adı arama.',
    `${profile.angle.label} açısından karar verdirici ipucunu doğru yanıtla eşleştir.`,
  ];
}

export function buildAIQuestionCase(seed, { generatedId = createAIQuestionId(), source = 'local-template-generator', attempt = 0, context = {}, branchFilter = '' } = {}) {
  const profile = buildVariantProfile(seed, attempt, context, branchFilter);
  const options = buildBalancedOptions(seed, profile);
  const correctText = seed.correctConcept || optionTextById(seed, seed.correctAnswer) || options[0]?.text;
  const correctOption = options.find((option) => normalizeQuestionText(option.text) === normalizeQuestionText(correctText)) || options[0];
  const normalizedCorrectText = correctOption.text;
  const evidenceChain = buildEvidenceChain(seed, profile, normalizedCorrectText);
  const wrongOptionFeedback = buildWrongFeedback(options, normalizedCorrectText, seed);
  const titleBase = sanitizeAIQuestionTitle(seed.title, {
    seed,
    profile,
    rule: profile.rule,
    key: `${seed.seedId}|${profile.variantNo}|${profile.angle.id}`,
  });
  const questionPrompt = seed.question && seed.source !== 'embedded-case-concept-only'
    ? `${profile.angle.question}`
    : profile.angle.question;
  const stem = buildStem(seed, profile, normalizedCorrectText);
  const investigations = seed.source === 'embedded-case-concept-only'
    ? buildSyntheticInvestigation(seed, profile, normalizedCorrectText)
    : (seed.investigations || []).map((item, index) => buildInvestigation(item, index, normalizedCorrectText));
  const diagnosisOptions = options.map((option) => option.text);
  const optionSet = makeOptionSetSignature(options);
  const generationSignatureSeed = stableHash([
    seed.seedId,
    profile.angle.id,
    profile.variantNo,
    titleBase,
    stem,
    questionPrompt,
    normalizedCorrectText,
    optionSet,
  ].join(' | '));

  const question = {
    id: generatedId,
    seedId: seed.seedId,
    source,
    caseType: 'ai-spot',
    branchId: AI_BRANCH_ID,
    branchName: seed.relatedBranch || 'TUS Spot Olgular',
    title: titleBase,
    relatedBranch: seed.relatedBranch || 'TUS Spot Olgular',
    spotCategory: seed.spotCategory || `AI Spot • ${seed.relatedBranch || 'TUS'}`,
    difficulty: seed.difficulty || 'Orta-Zor',
    learningTarget: seed.learningTarget,
    demographics: profile.demographic,
    setting: profile.setting,
    chiefComplaint: profile.presentation || seed.chiefComplaint || titleBase,
    stem,
    exam: Array.isArray(seed.exam) && seed.exam.length ? seed.exam : [
      ...buildBranchExamDefaults(seed, profile),
    ],
    vitals: Object.keys(seed.vitals || {}).length ? seed.vitals : buildBranchVitals(seed, profile),
    investigations,
    question: questionPrompt,
    questionType: profile.angle.id === 'first-step' ? 'treatment' : profile.angle.id === 'lab' ? 'test' : profile.angle.id === 'mechanism' ? 'spot' : 'diagnosis',
    clinicalFocus: seed.learningTarget,
    findings: {
      history: [stem],
      exam: Array.isArray(seed.exam) && seed.exam.length ? seed.exam : buildBranchExamDefaults(seed, profile),
      vitals: Object.keys(seed.vitals || {}).length ? seed.vitals : buildBranchVitals(seed, profile),
      investigations,
    },
    options,
    correctAnswer: correctOption.id,
    explanation: seed.source === 'embedded-case-concept-only'
      ? `${normalizedCorrectText} seçeneği, bu yeni oluşturulan AI spot sorusunda hedeflenen öğrenme çıktısıyla en uyumlu yanıttır. Olguda seçenekler aynı kategori içinde tutulur; karar, gömülü vakadaki metni tekrar etmekten değil ${seed.learningTarget} bilgisini yeni bağlama uygulamaktan gelir.`
      : seed.explanation,
    evidenceChain,
    examPearls: [seed.examPearl || seed.learningTarget],
    wrongOptionFeedback,
    generationSignature: generationSignatureSeed,
    generatedAt: new Date().toISOString(),
    managementSequence: { enabled: false, showInSpot: false, steps: [] },
    patientIntro: {
      profile: [profile.demographic, profile.setting].filter(Boolean).join(' · '),
      presentation: profile.presentation || seed.chiefComplaint || titleBase,
      riskContext: buildAIRiskContext(seed, profile),
      distinctiveClues: buildAIClueItems(evidenceChain, seed, normalizedCorrectText),
      historySummary: stem,
    },
    diagnosis: {
      correct: normalizedCorrectText,
      options: diagnosisOptions,
      explanation: seed.explanation,
      nextStep: seed.nextStep || 'Yanıt sonrası kanıt zincirini tekrar ederek benzer çeldiricileri ayır.',
      pearls: [seed.examPearl || seed.learningTarget].filter(Boolean),
      answerFeedback: {
        whyCorrect: seed.source === 'embedded-case-concept-only'
          ? `${normalizedCorrectText} doğru yanıttır; çünkü verilen yeni senaryo ${seed.learningTarget} öğrenme hedefini ölçer ve çeldiriciler aynı klinik/temel bilim ailesinde kalsa da ana paternle tam örtüşmez.`
          : seed.explanation,
        evidenceChain,
        pearls: [seed.examPearl || seed.learningTarget].filter(Boolean),
        clinicalPearls: [seed.examPearl || seed.learningTarget].filter(Boolean),
        differentialComparison: buildDifferentialComparison(options, normalizedCorrectText, wrongOptionFeedback, seed),
        whyWrong: Object.fromEntries(options
          .filter((option) => normalizeQuestionText(option.text) !== normalizeQuestionText(normalizedCorrectText))
          .map((option) => [option.text, wrongOptionFeedback[option.id]])),
        managementSteps: buildManagementSteps(seed, profile),
        learningOutcome: seed.learningTarget,
      },
    },
    aiMeta: {
      generatedAt: Date.now(),
      generator: source,
      schemaVersion: 'ai-spot-v3-independent-generator',
      sourceSeedId: seed.seedId,
      sourceConceptOnly: seed.source === 'embedded-case-concept-only',
      sourceCaseId: null,
      conceptOriginHash: seed.conceptOriginId ? stableHash(seed.conceptOriginId) : null,
      signature: null,
      topicSignature: null,
      generationSignature: generationSignatureSeed,
      optionSetSignature: optionSet,
      variantAngle: profile.angle.id,
      variantNo: profile.variantNo,
    },
  };

  question.aiMeta.signature = makeQuestionSignature(question);
  question.aiMeta.topicSignature = makeQuestionTopicSignature(question);
  question.generationSignature = question.aiMeta.signature;
  return question;
}

function pickCandidateSeeds(pool, context, previousQuestionId) {
  const ranked = rankSeedsByNovelty(pool, { previousQuestionId, context });
  const fresh = ranked.filter((seed) => {
    const signature = makeSeedSignature(seed);
    return !context.recentIds?.includes(seed.seedId) && !context.recentSignatures?.includes(signature);
  });
  return fresh.length ? fresh : ranked;
}

export function generateAIQuestion({ previousQuestionId = null, branchFilter = 'random', context = buildRecentQuestionContext() } = {}) {
  const pool = getEligibleSeeds(branchFilter);
  const candidates = pickCandidateSeeds(pool, context, previousQuestionId);
  const errors = [];

  for (let attempt = 0; attempt < Math.min(MAX_GENERATION_ATTEMPTS, candidates.length * 4); attempt += 1) {
    const seed = candidates[attempt % candidates.length] || AI_QUESTION_SEEDS[0];
    const question = buildAIQuestionCase(seed, {
      source: seed.source === 'embedded-case-concept-only' ? 'concept-template-local-generator' : 'curated-template-local-generator',
      attempt,
      context,
      branchFilter,
    });
    const validation = validateAIQuestionCase(question, context.recentSignatures, { embeddedCases: cases, context, requestedBranch: branchFilter });
    if (validation.ok) return question;
    errors.push({ seedId: seed.seedId, errors: validation.errors });
  }

  const curatedPool = [...AI_QUESTION_SEEDS, ...AI_BRANCH_TEMPLATE_SEEDS, ...buildCaseDerivedAISeeds()].filter((seed) => branchFilterMatchesSeed(seed, branchFilter));
  for (let attempt = 0; attempt < Math.max(12, curatedPool.length * 3); attempt += 1) {
    const seed = curatedPool[attempt % curatedPool.length];
    if (!seed) break;
    const question = buildAIQuestionCase(seed, {
      source: 'curated-template-safe-fallback',
      attempt: attempt + 500,
      context,
      branchFilter,
    });
    const validation = validateAIQuestionCase(question, context.recentSignatures, { embeddedCases: cases, context, requestedBranch: branchFilter });
    if (validation.ok) return question;
    errors.push({ seedId: seed.seedId, errors: validation.errors });
  }

  const error = new Error('AI local generator could not create a non-duplicate question without copying embedded cases.');
  error.generationErrors = errors.slice(-12);
  throw error;
}

export function listAIQuestionBranches() {
  return getAIQuestionBranchOptions();
}
