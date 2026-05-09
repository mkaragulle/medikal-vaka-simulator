import { shuffleArray } from './randomize.js';
import { makeQuestionSignature, makeQuestionTopicSignature, normalizeQuestionText } from './aiQuestionHistory.js';
import { cases } from '../data/cases.js';
import { attachQuestionDedupeFields, createAIQuestionId, validateQuestionNovelty } from './questionDeduplication.js';
import { validateBranchFit } from './aiBranchRules.js';
import { detectInvalidMeasurementFormat, sanitizeMeasurementText, sanitizeVitalsObject } from './clinicalFormatters.js';
import { repairAIQuestionQuality, validateAIQuestionQuality } from './aiQuestionQualityGate.js';
import { normalizeInvestigationLabResults, validateInvestigationLabCompleteness, hasIncompleteLabResultText } from './clinicalValueFormatters.js';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

function cleanClinicalSummaryItem(value = '') {
  return sanitizeMeasurementText(String(value || ''))
    .replace(/\s+/g, ' ')
    .replace(/^(Karar verdirici ipucu|Destekleyici kanıt|Ayırt ettirici ipucu|Ayırt ettirici bulgu|Klinik patern|Tanısal ayrım|Sınav notu|TUS kırmızı bayrağı|Destekleyici bulgu|Ana kanıt|Kritik ipucu|karar verdirici patern)\s*[:：-]\s*/iu, '')
    .replace(/\s*(\.{3}|…)\s*/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/(?<!\d)\.(?=\S)/g, '. ')
    .replace(/\s*\/\s*/g, '/')
    .replace(/[\s,;:.]+$/u, '')
    .trim();
}

function uniqueSummaryItems(items = [], max = 4) {
  const seen = new Set();
  const out = [];
  items.map(cleanClinicalSummaryItem).filter(Boolean).forEach((item) => {
    const key = item.toLocaleLowerCase('tr');
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  });
  return out.slice(0, max);
}

function buildValidatedAIRiskContext(payload = {}, history = []) {
  const branch = String(payload.relatedBranch || '').toLocaleLowerCase('tr');
  const target = String(payload.learningTarget || '').toLocaleLowerCase('tr');
  const allText = `${branch} ${target} ${payload.title || ''} ${payload.stem || ''}`.toLocaleLowerCase('tr');
  if (/kawasaki|koroner|konjonktivit|mukozal|dudak/.test(allText)) {
    return ['Beş günden uzun süren ateş', 'Mukokutanöz bulguların eşlik etmesi', 'Koroner arter tutulumu riski'];
  }
  if (/pediatri|çocuk|yenidoğan|bebek/.test(branch + ' ' + target)) {
    return ['Ateş, beslenme ve bilinç değişikliğinin birlikte izlenmesi', 'Aşılanma ve temas öyküsünün sorgulanması'];
  }
  if (/mikrobiyoloji|enfeksiyon|hiv|hepatit|tüberküloz|sepsis|bakteri|viral/.test(branch + ' ' + target)) {
    return ['Temas öyküsü veya örnek türünün yorumu değiştirmesi', 'Bağışıklık durumunun etken ayrımına etkisi'];
  }
  if (/farmakoloji|ilaç|toksin|zehir|yan etki|antidot/.test(branch + ' ' + target)) {
    return ['İlaç veya toksin maruziyeti öyküsü', 'Doz ve zaman ilişkisinin klinik tabloyu belirlemesi'];
  }
  return uniqueSummaryItems([history[0], 'Öykü ve muayene bulgularının birlikte yorumlanması'], 2);
}
const DIRECT_LEAK_PHRASES = [
  'tanısını doğrular',
  'tanısını koydurur',
  'ile uyumludur',
  'kesin tanıdır',
  'tanı:',
  'diagnosis:',
];


const RAW_AI_FORBIDDEN_PATTERNS = [
  /Beklenen ana ipuçları bu tabloda baskın değildir/iu,
  /Karar .{0,80} yönünde güçlenir/iu,
  /Ancak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır/iu,
  /Laboratuvar paterni\.?/iu,
  /Kanıt\s*[2-4]/iu,
  /Objektif bulguların karar basamağını desteklemesi/iu,
  /Doğru yanıta götüren ana bulgudur/iu,
  /İlk karar\.?/iu,
  /Tedavi önceliği\.?/iu,
  /Bu veri klinik bağlamda değerlendirilir/iu,
  /Nedeniyle Ameliyathane/iu,
  /Morfolojik patern\.\s*Morfolojik patern/iu,
  /sağlayarak\.\s*$/iu,
];

function collectPayloadStrings(value, output = []) {
  if (typeof value === 'string') output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectPayloadStrings(item, output));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectPayloadStrings(item, output));
  return output;
}

function hasPerioperativeAnaphylaxisConflict(payload = {}, options = [], correctOption = null) {
  const bundle = normalizeQuestionText(collectPayloadStrings(payload).join(' '));
  const correct = normalizeQuestionText(correctOption?.text || '');
  const isPerioperative = /anestezi|ameliyathane|perioperatif|induksiyon|cerrahi/.test(bundle)
    && /anafil|bronkospazm|hipotansiyon|urtiker|spo/.test(bundle);
  if (!isPerioperative) return false;
  const asksManagement = /ilk|tedavi|yonetim|yaklasim|acil|müdahale|mudahale/.test(normalizeQuestionText(payload.question || payload.learningTarget || ''));
  if (!asksManagement) return false;
  const hasBundle = /tetikleyici|ajan.*durdur|oksijen|hava yolu|sivi|kristaloid|adrenalin|epinefrin|iv/.test(correct)
    && /adrenalin|epinefrin/.test(correct);
  const isOnlyIm = /\bim\b|intramuskuler|intramüsküler|kas ici/.test(correct) && !/iv|oksijen|sivi|tetikleyici|hava yolu|hemodinamik/.test(correct);
  return isOnlyIm || !hasBundle;
}

function stripAnswerLeak(text = '', correctText = '') {
  if (!text || !correctText) return text || '';
  const escaped = String(correctText).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return String(text).replace(new RegExp(escaped, 'gi'), 'karar verdirici patern');
}

function toOptionText(option) {
  return typeof option === 'string' ? option : option?.text;
}

function normalizeOptions(options = []) {
  return options
    .map((option, index) => ({
      id: option?.id || OPTION_IDS[index] || String(index + 1),
      text: toOptionText(option),
    }))
    .filter((option) => option.text && String(option.text).trim().length > 1)
    .slice(0, 5);
}

export function validateAIQuestionPayload(payload = {}) {
  const errors = [];
  const warnings = [];
  const options = normalizeOptions(payload.options);
  const correctAnswer = String(payload.correctAnswer || '').trim().toUpperCase();
  const correctOption = options.find((option) => option.id.toUpperCase() === correctAnswer);

  if (!payload.title || String(payload.title).trim().length < 6) errors.push('title eksik veya çok kısa');
  if (!payload.stem || String(payload.stem).trim().length < 40) errors.push('stem eksik veya çok kısa');
  if (!payload.question || String(payload.question).trim().length < 16) errors.push('question eksik veya çok kısa');
  if (options.length !== 5) errors.push('tam 5 seçenek gerekli');
  if (!correctOption) errors.push('correctAnswer A-E seçenekleriyle eşleşmiyor');
  if (!payload.explanation || String(payload.explanation).trim().length < 60) errors.push('explanation eksik veya çok kısa');
  if (!Array.isArray(payload.evidenceChain) || payload.evidenceChain.length < 3) errors.push('evidenceChain en az 3 madde olmalı');
  if (!payload.examPearl || String(payload.examPearl).trim().length < 20) errors.push('examPearl eksik veya çok kısa');
  warnings.push(...assessNarrativeReadability(payload));

  const wrongFeedback = payload.wrongOptionFeedback || {};
  options.forEach((option) => {
    if (option.id.toUpperCase() !== correctAnswer && !wrongFeedback[option.id]) {
      errors.push(`${option.id} yanlış seçenek feedbacki eksik`);
    }
  });

  const correctText = correctOption?.text || '';
  const investigationText = JSON.stringify(payload.findings?.investigations || payload.investigations || []);
  const normalizedInvestigationText = normalizeQuestionText(investigationText);
  const normalizedCorrectText = normalizeQuestionText(correctText);
  if (normalizedCorrectText && normalizedInvestigationText.includes(normalizedCorrectText)) {
    warnings.push('tetkik metni doğru cevabı birebir içeriyor; ekranda maskeleme uygulanacak');
  }
  if (detectInvalidMeasurementFormat(investigationText) || detectInvalidMeasurementFormat(JSON.stringify(payload.findings?.vitals || payload.vitals || {}))) {
    errors.push('ölçüm/vital formatı tıbbi standarda uygun değil');
  }

  const investigationItems = payload.findings?.investigations || payload.investigations || [];
  investigationItems.forEach((investigation) => {
    const labValidation = validateInvestigationLabCompleteness(investigation);
    if (!labValidation.ok) errors.push(...labValidation.errors.map((error) => `laboratuvar sonucu eksik: ${error}`));
  });
  if (hasIncompleteLabResultText(investigationText)) {
    errors.push('tetkik sonucunda birim/referans içermeyen laboratuvar ifadesi var');
  }

  DIRECT_LEAK_PHRASES.forEach((phrase) => {
    if (normalizeQuestionText(investigationText).includes(normalizeQuestionText(phrase))) {
      warnings.push(`tetkik yorumunda direkt tanı dili var: ${phrase}`);
    }
  });

  collectPayloadStrings(payload).forEach((text) => {
    RAW_AI_FORBIDDEN_PATTERNS.forEach((pattern) => {
      if (pattern.test(String(text || ''))) warnings.push(`repair öncesi yasaklı AI metni: ${String(text || '').slice(0, 100)}`);
    });
    if (/wheezing/i.test(String(text || ''))) errors.push('gereksiz İngilizce terim: wheezing');
  });
  if (hasPerioperativeAnaphylaxisConflict(payload, options, correctOption)) {
    warnings.push('repair öncesi perioperatif anafilaksi cevabı eksik veya genel IM adrenalin kalıbına indirgenmiş');
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    normalizedOptions: options,
  };
}


function normalizeCompactClinicalData(items = [], max = 6) {
  const seen = new Set();
  const out = [];
  (Array.isArray(items) ? items : []).forEach((item) => {
    const label = sanitizeMeasurementText(String(item?.label || item?.name || item?.parameter || '').trim());
    const value = sanitizeMeasurementText(String(item?.value || item?.result || item?.text || '').trim())
      .replace(/,\s*referans\s*[^,.;]+(?:,\s*(?:yüksek|düşük|normal|patolojik|pozitif|negatif))?/giu, '')
      .trim();
    if (!label || !value) return;
    const key = normalizeQuestionText(`${label} ${value}`);
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ label, value });
  });
  return out.slice(0, max);
}

function assessNarrativeReadability(payload = {}) {
  const warnings = [];
  const stem = sanitizeMeasurementText(payload.narrativeStem || payload.primaryStem || payload.stem || '');
  const wordCount = stem.split(/\s+/).filter(Boolean).length;
  if (wordCount > 240) warnings.push('stem 240 kelimeyi aşıyor; TUS spot için kısaltılacak');
  if (/\b\d+\s*gw\b|\b\d+\s*g\s*w\b/iu.test(stem)) warnings.push('gebelik haftası kısaltması normalize edilecek');
  if (/\b\d+\s+gün\s+yaşındaki\b/iu.test(stem)) warnings.push('yaş ifadesi TUS Türkçesine normalize edilecek');
  const denseVitalLabels = ['kan basıncı', 'nabız', 'solunum', 'ateş', 'spo'].filter((label) => stem.toLocaleLowerCase('tr').includes(label)).length;
  if (denseVitalLabels >= 4) warnings.push('vital bulgular paragrafta yoğun verilmiş; kompakt kutu sunumu kullanılacak');
  if (/referans\s+[^.?!]{20,}/iu.test(stem)) warnings.push('referans aralıkları soru metnini boğuyor; ön yüzde sadeleştirilecek');
  if (/Profil:|Başvuru:|Risk bağlamı:|Ayırt ettirici ipuçları:|Klinik gerekçe:|Kanıt zinciri:/iu.test(stem)) {
    warnings.push('legacy kart başlığı soru köküne sızmış; temizlenecek');
  }
  return warnings;
}

function buildDifferentialComparisonFromPayload(payload, correctText, options) {
  const feedback = payload.wrongOptionFeedback || {};
  return options.reduce((accumulator, option) => {
    if (option.text === correctText) return accumulator;
    const explanation = feedback[option.id] || `${option.text}, bu olgudaki karar verdirici ipuçlarını ${correctText} kadar iyi açıklamaz.`;
    accumulator[option.text] = {
      explanation,
      comparisonPoints: [
        explanation,
        `Olgudaki öykü, muayene ve objektif veri birlikte ${correctText} lehine daha güçlüdür.`,
      ],
    };
    return accumulator;
  }, {});
}

function normalizeInvestigation(item, index, correctText) {
  const summary = stripAnswerLeak(item?.summary || item?.result || '', correctText);
  const findings = Array.isArray(item?.findings)
    ? item.findings.map((finding) => sanitizeMeasurementText(stripAnswerLeak(finding, correctText)))
    : [];
  return normalizeInvestigationLabResults({
    id: item?.id || `remote-ai-investigation-${index + 1}`,
    label: sanitizeMeasurementText(item?.label || item?.name || `Tetkik ${index + 1}`),
    type: item?.type || 'lab',
    priority: item?.priority || (index === 0 ? 'essential' : 'useful'),
    summary: sanitizeMeasurementText(summary),
    findings,
    rows: item?.rows,
    interpretation: 'Sonuç, öykü ve muayene bulgularıyla birlikte değerlendirilir.',
  });
}

export function normalizeGeneratedAIQuestion(payload = {}) {
  const validation = validateAIQuestionPayload(payload);
  if (!validation.ok) {
    const error = new Error(`AI question schema invalid: ${validation.errors.join('; ')}`);
    error.validation = validation;
    throw error;
  }

  const options = validation.normalizedOptions;
  const correctId = String(payload.correctAnswer || '').trim().toUpperCase();
  const correctText = options.find((option) => option.id.toUpperCase() === correctId)?.text;
  const rawInvestigations = payload.findings?.investigations || payload.investigations || [];
  const history = Array.isArray(payload.findings?.history) ? payload.findings.history : [];
  const exam = Array.isArray(payload.findings?.exam) ? payload.findings.exam : [];
  const vitals = sanitizeVitalsObject(payload.findings?.vitals || payload.vitals || {});

  const safeRemoteId = String(payload.id || '').startsWith('ai-spot')
    ? payload.id
    : createAIQuestionId('ai-spot-remote');

  const normalized = {
    id: safeRemoteId,
    seedId: payload.seedId || null,
    source: payload.source || 'real-ai',
    caseType: 'ai-spot',
    branchId: 'tus-spot-olgular',
    branchName: payload.relatedBranch || 'AI TUS Spot',
    title: sanitizeMeasurementText(payload.title),
    relatedBranch: payload.relatedBranch || 'TUS Spot Olgular',
    spotCategory: `AI Spot • ${payload.relatedBranch || 'TUS'}`,
    difficulty: payload.difficulty || 'Orta-Zor',
    learningTarget: sanitizeMeasurementText(payload.learningTarget),
    demographics: sanitizeMeasurementText(payload.demographics || 'TUS adayı için kısa klinik bağlam'),
    setting: sanitizeMeasurementText(payload.setting || 'Kısa klinik pratik'),
    chiefComplaint: sanitizeMeasurementText(payload.chiefComplaint || payload.learningTarget),
    stem: sanitizeMeasurementText(payload.narrativeStem || payload.stem),
    narrativeStem: sanitizeMeasurementText(payload.narrativeStem || payload.primaryStem || payload.stem),
    stemMode: 'narrative',
    history: history.map(sanitizeMeasurementText),
    exam: exam.map(sanitizeMeasurementText),
    vitals,
    investigations: rawInvestigations.map((item, index) => normalizeInvestigation(item, index, correctText)),
    findings: { history: history.map(sanitizeMeasurementText), exam: exam.map(sanitizeMeasurementText), vitals, investigations: rawInvestigations.map((item, index) => normalizeInvestigation(item, index, correctText)) },
    options,
    correctAnswer: correctId,
    question: sanitizeMeasurementText(payload.question),
    questionType: payload.questionType || 'spot',
    clinicalFocus: payload.learningTarget,
    compactVitals: normalizeCompactClinicalData(payload.compactVitals || payload.cv || [], 5),
    compactObjectiveData: normalizeCompactClinicalData(payload.compactObjectiveData || payload.compactObjective || payload.co || [], 10),
    managementSequence: { enabled: false, showInSpot: false, steps: [] },
    patientIntro: {
      profile: payload.demographics || payload.relatedBranch || 'AI AI soru üretimi',
      presentation: payload.chiefComplaint || payload.title,
      riskContext: buildValidatedAIRiskContext(payload, history),
      distinctiveClues: uniqueSummaryItems(payload.evidenceChain?.slice(0, 4) || [], 4),
      historySummary: sanitizeMeasurementText(payload.narrativeStem || payload.primaryStem || payload.stem),
    },
    diagnosis: {
      correct: correctText,
      options: shuffleArray(options.map((option) => option.text)),
      explanation: payload.explanation,
      nextStep: payload.nextStep || 'Olgudaki somut ipuçlarını seçeneklerle karşılaştır.',
      pearls: [payload.examPearl].filter(Boolean),
      answerFeedback: {
        whyCorrect: payload.explanation,
        evidenceChain: payload.evidenceChain || [],
        pearls: [payload.examPearl].filter(Boolean),
        clinicalPearls: [payload.examPearl].filter(Boolean),
        differentialComparison: buildDifferentialComparisonFromPayload(payload, correctText, options),
        managementSteps: payload.managementSteps || [
          'Öykü, muayene ve vital bulguları birlikte değerlendir.',
          'Objektif tetkik verilerini klinik tabloyla ilişkilendir.',
          'Alternatif seçenekleri olgudaki somut bulgularla ele.',
        ],
        learningOutcome: payload.learningTarget,
      },
    },
    aiMeta: {
      generatedAt: Date.now(),
      generator: payload.source || 'real-ai-provider',
      schemaVersion: 'ai-spot-v2',
      signature: null,
      topicSignature: null,
      validationWarnings: validation.warnings,
      provider: payload.provider || null,
    },
  };

  const repaired = repairAIQuestionQuality(normalized);
  attachQuestionDedupeFields(repaired);
  repaired.generatedAt = new Date(repaired.aiMeta.generatedAt).toISOString();
  return repaired;
}

export function validateAIQuestionCase(question = {}, recentSignatures = [], options = {}) {
  const errors = [];
  const embeddedCases = options.embeddedCases || cases;
  const recentContext = options.context || { recentSignatures, recentIds: [], recentQuestionSummaries: [] };

  if (!question?.id) errors.push('id yok');
  if (!String(question?.id || '').startsWith('ai-spot')) errors.push('AI sorusu için bağımsız ai-spot ID kullanılmalı');
  if (question?.sourceCaseId || question?.aiMeta?.sourceCaseId) errors.push('AI sorusu mevcut vaka ID bilgisini doğrudan taşımamalı');
  if (!question?.diagnosis?.correct) errors.push('doğru cevap metni yok');
  if (!Array.isArray(question?.diagnosis?.options) || question.diagnosis.options.length < 4) errors.push('en az 4 seçenek gerekli');
  if (!question?.diagnosis?.options?.includes(question?.diagnosis?.correct)) errors.push('doğru cevap seçenekler içinde değil');
  if (!question?.diagnosis?.answerFeedback?.whyCorrect) errors.push('klinik gerekçe yok');
  if (!Array.isArray(question?.diagnosis?.answerFeedback?.evidenceChain) || question.diagnosis.answerFeedback.evidenceChain.length < 3) errors.push('kanıt zinciri yetersiz');
  if (!question?.contentSignature && !question?.generationSignature && !question?.aiMeta?.contentSignature && !question?.aiMeta?.signature) errors.push('contentSignature eksik');

  const skipSemanticNovelty = Boolean(options.skipSemanticNovelty || options.trustRemoteAi);
  const novelty = skipSemanticNovelty
    ? { ok: true, errors: [], embeddedOverlap: null }
    : validateQuestionNovelty(question, { context: recentContext, embeddedCases });
  if (!novelty.ok) errors.push(...novelty.errors);

  const branchFit = validateBranchFit(question, options.requestedBranch || question.relatedBranch || question.branchName);
  if (!branchFit.ok) errors.push(...branchFit.errors.map((error) => `branch-fit:${error}`));

  if (!options.skipQuality) {
    const quality = validateAIQuestionQuality(question, { requestedBranch: options.requestedBranch || question.relatedBranch || question.branchName });
    if (!quality.ok) errors.push(...quality.errors.map((error) => `quality:${error}`));
  }

  attachQuestionDedupeFields(question);
  const signature = question.contentSignature || makeQuestionSignature(question);
  const topicSignature = question.topicSignature || question.aiMeta?.topicSignature || makeQuestionTopicSignature(question);
  if (!skipSemanticNovelty && recentSignatures.includes(signature)) errors.push('yakın geçmişte aynı contentSignature üretildi');

  return { ok: errors.length === 0, errors: Array.from(new Set(errors)), signature, topicSignature, contentSignature: signature, embeddedOverlap: novelty.embeddedOverlap || null };
}
