import { repairScientificAccuracy, scientificAccuracyGate } from '../src/utils/clinicalScientificAccuracyGate.js';
import { applyTusLanguageStandardToQuestion } from '../src/utils/tusLanguageStandard.js';
import { applyFeedbackQualityStandardToQuestion, validateFeedbackQualityStandard, FEEDBACK_QUALITY_STANDARD_VERSION } from '../src/utils/feedbackQualityStandard.js';
import { applySingleBestAnswerStandard, validateSingleBestAnswerGate, inferAnswerTarget, deriveOptionClinicalRoles, SINGLE_BEST_ANSWER_GATE_VERSION, ANSWER_TARGETS } from '../src/utils/singleBestAnswerGate.js';
import { applyFinalAIQuestionSafetyStandard, validateFinalAIQuestionSafetyGate, FINAL_AI_QUESTION_SAFETY_VERSION } from '../src/utils/finalAIQuestionSafetyGate.js';
import { validateClinicalCoherenceHardGate } from '../src/utils/clinicalCoherenceHardGate.js';
import { generateAIQuestion } from '../src/utils/aiQuestionGenerator.js';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const PROMPT_VERSION = 'klinikiq-tus-hybrid-v4.5-final-safety-gate';
const SCHEMA_VERSION = 'ai-spot-json-schema-v3.4-final-safety';
const RULE_VERSION = 'clinical-gate-v3.6-final-safety';


const TUS_LANGUAGE_STANDARD_PROMPT = `
TUS DİL VE MADDE YAZIM STANDARDI:
- Soru kökü akademik klinik Türkçe ile yazılır; demografik bağlam, başvuru yakınması, süre, ayırt ettirici öykü, muayene ve gerekiyorsa objektif veri doğal sırayla verilir.
- Tek soru tek ölçme hedefine odaklanır: tanı, tedavi, tetkik, mekanizma, risk sınıflaması, komplikasyon veya yönetim basamağı karıştırılmaz.
- Başlık, stem, compactObjectiveData, tetkik summary/findings ve hasta özeti doğru cevabı açıkça söylemez; cevap öncesi alanlarda yorum değil objektif veri verilir.
- Beş seçenek aynı kavramsal kategoridedir; seçenekler arası uzunluk ve ayrıntı dengeli tutulur. Hiçbiri, hepsi veya yukarıdakilerin hepsi kullanılmaz.
- En az iki seçenek yakın ve savunulabilir alternatif olmalıdır; klinik karar sorularında ilk basamak, sonraki basamak ve destek yaklaşımı ayrımı doğru kurulmalıdır.
- Yanlış seçenek feedbacki boş genelleme yapmaz; seçeneğin neden cazip görünebileceğini ve bu olguda hangi somut ipucuyla elendiğini kısa açıklar.
- Klinik gerekçe, kanıt zinciri, TUS işareti, yönetim ve seçenek karşılaştırması farklı işlev görür; aynı cümle farklı alanlarda tekrar edilmez.
- Hap bilgi bağımsız aktif hatırlama kartıdır. Kaynak soru kullanıcıya gösterilmiyorsa meta-sınav ifadeleri kullanılmaz; ön yüz doğrudan cevaplanabilir kısa soru, arka yüz kısa yanıt ve sınav mantığıyla kurulur.
- High-risk klinik kararlarda model serbest yorum yapmaz; ilk/öncelikli basamak deterministik klinik kural ve bilimsel kalite kapısına göre seçilir.
- Türkçe tıbbi terminoloji tutarlı yazılır; birimler eksiksizdir; yarım cümle, gündelik ifade, mekanik başlık kırıntısı ve şablon feedback kullanılmaz.`;

const TUS_FORBIDDEN_EXPRESSION_LIST = [
  'Klinik bağlamda değerlendirilir',
  'Bu tabloda baskın değildir',
  'Karar verdirici patern',
  'Morfolojik patern',
  'Beklenen ana ipuçları',
  'İlk karar',
  'Tedavi önceliği',
  'Doğru yanıta götüren ana bulgudur',
  'Ancak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır',
  'Hangi tedavi yöntemi ilk sırada uygulanmalıdır',
  'Farklı klinik tabloda uygun olabilir',
  'Olgudaki ana ipuçlarını tek başına açıklamaz',
  'Bazı klinik durumlarda gündeme gelebilir',
];

const AI_QUESTION_JSON_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'id',
    'source',
    'caseType',
    'title',
    'relatedBranch',
    'difficulty',
    'learningTarget',
    'answerTarget',
    'demographics',
    'setting',
    'chiefComplaint',
    'stem',
    'compactVitals',
    'compactObjectiveData',
    'findings',
    'question',
    'options',
    'correctAnswer',
    'optionClinicalRoles',
    'explanation',
    'wrongOptionFeedback',
    'evidenceChain',
    'examPearl',
    'managementSteps',
    'nextQuestionSeed',
  ],
  properties: {
    id: { type: 'string' },
    source: { type: 'string', enum: ['real-ai'] },
    caseType: { type: 'string', enum: ['ai-spot'] },
    title: { type: 'string' },
    relatedBranch: { type: 'string' },
    difficulty: { type: 'string' },
    learningTarget: { type: 'string' },
    answerTarget: { type: 'string', enum: ANSWER_TARGETS },
    demographics: { type: 'string' },
    setting: { type: 'string' },
    chiefComplaint: { type: 'string' },
    stem: { type: 'string' },
    compactVitals: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['label', 'value'],
        properties: { label: { type: 'string' }, value: { type: 'string' } },
      },
    },
    compactObjectiveData: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['label', 'value'],
        properties: { label: { type: 'string' }, value: { type: 'string' } },
      },
    },
    findings: {
      type: 'object',
      additionalProperties: false,
      required: ['history', 'exam', 'vitals', 'investigations'],
      properties: {
        history: { type: 'array', items: { type: 'string' } },
        exam: { type: 'array', items: { type: 'string' } },
        vitals: {
          type: 'object',
          additionalProperties: false,
          required: ['TA', 'Nabız', 'Solunum', 'Ateş', 'SpO₂'],
          properties: {
            TA: { type: 'string' },
            'Nabız': { type: 'string' },
            Solunum: { type: 'string' },
            'Ateş': { type: 'string' },
            'SpO₂': { type: 'string' },
          },
        },
        investigations: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['id', 'label', 'type', 'priority', 'summary', 'findings', 'rows'],
            properties: {
              id: { type: 'string' },
              label: { type: 'string' },
              type: { type: 'string' },
              priority: { type: 'string' },
              summary: { type: 'string' },
              findings: { type: 'array', items: { type: 'string' } },
              rows: {
                type: 'array',
                items: {
                  type: 'array',
                  items: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    question: { type: 'string' },
    options: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'text'],
        properties: {
          id: { type: 'string', enum: OPTION_IDS },
          text: { type: 'string' },
        },
      },
    },
    correctAnswer: { type: 'string', enum: OPTION_IDS },
    optionClinicalRoles: {
      type: 'object',
      additionalProperties: false,
      required: OPTION_IDS,
      properties: Object.fromEntries(OPTION_IDS.map((id) => [id, { type: 'string', enum: ['primary_correct', 'adjunct_correct_but_not_asked', 'later_step', 'wrong_condition', 'unrelated', 'contraindicated_or_harmful'] }])),
    },
    explanation: { type: 'string' },
    wrongOptionFeedback: {
      type: 'object',
      additionalProperties: false,
      required: OPTION_IDS,
      properties: Object.fromEntries(OPTION_IDS.map((id) => [id, { type: 'string' }])),
    },
    evidenceChain: { type: 'array', items: { type: 'string' } },
    examPearl: { type: 'string' },
    managementSteps: { type: 'array', items: { type: 'string' } },
    nextQuestionSeed: { type: 'string' },
  },
};

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
      if (body.length > 1_000_000) {
        reject(new Error('Request body too large'));
        request.destroy();
      }
    });
    request.on('end', () => {
      if (!body) return resolve({});
      try {
        return resolve(JSON.parse(body));
      } catch (error) {
        return reject(error);
      }
    });
    request.on('error', reject);
  });
}

function getJsonCandidateFromText(text = '') {
  const trimmed = String(text || '').trim();
  if (!trimmed) return '';
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return fenced[1].trim();
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

function extractJsonFromText(text = '') {
  const candidate = getJsonCandidateFromText(text);
  if (!candidate) throw new Error('No JSON object found in model response');
  return JSON.parse(candidate);
}

function summarizeJsonParseError(error) {
  const message = String(error?.message || error || 'JSON parse failed');
  return message.replace(/\s+/g, ' ').slice(0, 220);
}

function extractOpenAIText(payload = {}) {
  if (typeof payload.output_text === 'string' && payload.output_text.trim()) return payload.output_text;
  const chunks = [];
  (payload.output || []).forEach((item) => {
    (item.content || []).forEach((content) => {
      if (typeof content.text === 'string') chunks.push(content.text);
      if (typeof content.output_text === 'string') chunks.push(content.output_text);
    });
  });
  const text = chunks.join('\n').trim();
  if (!text) throw new Error('OpenAI response did not contain output_text');
  return text;
}


function extractChatCompletionText(payload = {}, providerName = 'chat-completion-provider') {
  const message = payload?.choices?.[0]?.message;
  const content = message?.content;

  if (typeof content === 'string' && content.trim()) return content;

  if (Array.isArray(content)) {
    const text = content
      .map((part) => {
        if (typeof part === 'string') return part;
        if (typeof part?.text === 'string') return part.text;
        if (typeof part?.content === 'string') return part.content;
        return '';
      })
      .join('\n')
      .trim();
    if (text) return text;
  }

  const fallbackText = [message?.reasoning, message?.reasoning_content]
    .filter((item) => typeof item === 'string' && item.trim())
    .join('\n')
    .trim();
  if (fallbackText) return fallbackText;

  throw new Error(`${providerName} response did not contain message.content`);
}

function parseBooleanEnv(name, defaultValue = false) {
  const value = process.env[name];
  if (value === undefined || value === null || value === '') return defaultValue;
  return ['1', 'true', 'yes', 'on'].includes(String(value).trim().toLowerCase());
}

function parseCsvEnv(name) {
  return String(process.env[name] || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function getEnvModel(...names) {
  for (const name of names) {
    const value = String(process.env[name] || '').trim();
    if (value) return value;
  }
  return '';
}

function estimateTokenCount(value = '') {
  const text = typeof value === 'string' ? value : JSON.stringify(value || {});
  if (!text) return 0;
  // Turkish medical text averages roughly 3.5-4.5 chars/token. This is a logging estimate,
  // not billing truth; provider usage fields should override it when available.
  return Math.ceil(String(text).length / 4);
}

function estimateCostUsd({ provider = '', model = '', inputTokens = 0, outputTokens = 0 } = {}) {
  const key = `${provider}:${model}`.toLowerCase();
  const configured = Number(process.env.AI_ESTIMATED_COST_PER_1K_TOKENS_USD || 0);
  if (Number.isFinite(configured) && configured > 0) return Number((((inputTokens + outputTokens) / 1000) * configured).toFixed(6));
  if (key.includes(':free')) return 0;
  return null;
}

function buildAIUsageLog({ provider, model, prompt, question, startedAt, validatorVerdict, repairCount = 0, rejectionReason = null, duplicateScore = null, leakageDetected = false, highRiskRuleTriggered = [], turkishQualityIssue = false } = {}) {
  const inputTokens = estimateTokenCount(prompt);
  const outputTokens = estimateTokenCount(question);
  return {
    requestId: question?.nextQuestionSeed || question?.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    provider: provider || question?.provider || 'remote-ai',
    model: model || question?.openRouterModel || question?.model || null,
    promptVersion: PROMPT_VERSION,
    schemaVersion: SCHEMA_VERSION,
    ruleVersion: RULE_VERSION,
    branch: question?.relatedBranch || null,
    topic: question?.learningTarget || null,
    questionType: question?.questionType || null,
    inputTokens,
    outputTokens,
    estimatedCost: estimateCostUsd({ provider: provider || question?.provider, model: model || question?.openRouterModel, inputTokens, outputTokens }),
    latencyMs: startedAt ? Date.now() - startedAt : null,
    validatorVerdict,
    repairCount,
    rejectionReason,
    duplicateScore,
    leakageDetected: Boolean(leakageDetected),
    highRiskRuleTriggered,
    turkishQualityIssue: Boolean(turkishQualityIssue),
    finalAccepted: validatorVerdict === 'accepted',
  };
}

function runServerMedicalQualityGate(question = {}) {
  if (parseBooleanEnv('AI_SIMPLE_TUS_PIPELINE', true)) {
    const cleaned = standardizeRemoteQuestionText(question);
    const hardCoherence = validateClinicalCoherenceHardGate(cleaned);
    const scientific = scientificAccuracyGate(cleaned);
    const finalSafety = validateFinalAIQuestionSafetyGate(cleaned);
    const feedbackQuality = validateFeedbackQualityStandard(cleaned);
    const singleBest = validateSingleBestAnswerGate(cleaned);

    const fatalScientificErrors = (scientific.errors || []).filter((error) => (
      /hyperkalemia|hiperkalemi|pulmonary|embol|anafil|sepsis|dka|stroke|inme|menenjit|status|self-consistency|score-gate|fatal|wrong-correct|option-gate/i.test(error)
    ));
    const finalBlockingErrors = (finalSafety.errors || []).filter((error) => (
      /truncation|ellipsis|generic|spoiler|double|option|label|evidence|forbidden|clinical-contamination|cross-topic/i.test(error)
    ));

    const errors = Array.from(new Set([
      ...fatalScientificErrors,
      ...(hardCoherence.errors || []).map((error) => `hard-coherence:${error}`),
      ...finalBlockingErrors.map((error) => `final-safety:${error}`),
    ]));

    return {
      ok: errors.length === 0,
      question: cleaned,
      repairCount: 0,
      errors,
      warnings: Array.from(new Set([
        ...(scientific.warnings || []),
        ...(feedbackQuality.ok ? [] : (feedbackQuality.errors || []).map((error) => `feedback-quality:${error}`)),
        ...(singleBest.ok ? [] : (singleBest.errors || []).map((error) => `single-best-answer:${error}`)),
        ...(finalSafety.warnings || []).map((warning) => `final-safety:${warning}`),
      ])).slice(0, 12),
      matchedRules: [...(scientific.matchedRules || []), ...(hardCoherence.ok ? [] : ['clinical-coherence-hard-gate'])],
      scoreSystems: scientific.scoreSystems || [],
      feedbackStandardVersion: FEEDBACK_QUALITY_STANDARD_VERSION,
      singleBestAnswerVersion: SINGLE_BEST_ANSWER_GATE_VERSION,
      finalSafetyVersion: FINAL_AI_QUESTION_SAFETY_VERSION,
      answerTarget: cleaned.answerTarget || inferAnswerTarget(cleaned),
      optionClinicalRoles: cleaned.optionClinicalRoles || deriveOptionClinicalRoles(cleaned),
      semanticFingerprint: cleaned.semanticFingerprint,
    };
  }

  const before = JSON.stringify(question);
  const hardBefore = validateClinicalCoherenceHardGate(question);
  if (!hardBefore.ok) {
    return {
      ok: false,
      question,
      repairCount: 0,
      errors: (hardBefore.errors || []).map((error) => `hard-coherence:${error}`),
      warnings: [],
      matchedRules: ['clinical-coherence-hard-gate'],
      scoreSystems: [],
      feedbackStandardVersion: FEEDBACK_QUALITY_STANDARD_VERSION,
      singleBestAnswerVersion: SINGLE_BEST_ANSWER_GATE_VERSION,
      finalSafetyVersion: FINAL_AI_QUESTION_SAFETY_VERSION,
    };
  }
  const clinicallyRepaired = applyTusLanguageStandardToQuestion(repairScientificAccuracy(question));
  const feedbackRepaired = applyFeedbackQualityStandardToQuestion(clinicallyRepaired);
  const singleBestRepaired = applySingleBestAnswerStandard(feedbackRepaired);
  const repaired = applyFinalAIQuestionSafetyStandard(singleBestRepaired);
  const repairCount = before === JSON.stringify(repaired) ? 0 : 1;
  const scientific = scientificAccuracyGate(repaired);
  const feedbackQuality = validateFeedbackQualityStandard(repaired);
  const singleBest = validateSingleBestAnswerGate(repaired);
  const finalSafety = validateFinalAIQuestionSafetyGate(repaired);
  const hardCoherence = validateClinicalCoherenceHardGate(repaired);
  const fatalErrors = scientific.errors.filter((error) => /hyperkalemia|hiperkalemi|pulmonary|embol|anafil|sepsis|dka|stroke|inme|menenjit|status|self-consistency|score-gate|option-gate/i.test(error));
  const feedbackErrors = feedbackQuality.ok ? [] : feedbackQuality.errors.map((error) => `feedback-quality:${error}`);
  const singleBestErrors = singleBest.ok ? [] : singleBest.errors.map((error) => `single-best-answer:${error}`);
  const finalSafetyErrors = finalSafety.ok ? [] : finalSafety.errors.map((error) => `final-safety:${error}`);
  const hardCoherenceErrors = hardCoherence.ok ? [] : hardCoherence.errors.map((error) => `hard-coherence:${error}`);
  return {
    ok: scientific.ok && feedbackQuality.ok && singleBest.ok && finalSafety.ok && hardCoherence.ok && fatalErrors.length === 0,
    question: repaired,
    repairCount,
    errors: Array.from(new Set([...(scientific.errors || []), ...feedbackErrors, ...singleBestErrors, ...finalSafetyErrors, ...hardCoherenceErrors])),
    warnings: Array.from(new Set([...(scientific.warnings || []), ...(singleBest.warnings || []).map((warning) => `single-best-answer:${warning}`), ...(finalSafety.warnings || []).map((warning) => `final-safety:${warning}`)])),
    matchedRules: [...(scientific.matchedRules || []), ...(singleBest.ok ? [] : ['single-best-answer-gate']), ...(finalSafety.ok ? [] : ['final-ai-question-safety-gate']), ...(hardCoherence.ok ? [] : ['clinical-coherence-hard-gate'])],
    scoreSystems: scientific.scoreSystems || [],
    feedbackStandardVersion: FEEDBACK_QUALITY_STANDARD_VERSION,
    singleBestAnswerVersion: SINGLE_BEST_ANSWER_GATE_VERSION,
    finalSafetyVersion: FINAL_AI_QUESTION_SAFETY_VERSION,
    answerTarget: finalSafety.answerTarget || singleBest.answerTarget,
    optionClinicalRoles: finalSafety.optionClinicalRoles || singleBest.optionClinicalRoles,
    semanticFingerprint: finalSafety.semanticFingerprint || repaired.semanticFingerprint,
  };
}
function getJsonContractPrompt() {
  return `
Zorunlu JSON kontratı:
{
  "id": "string",
  "source": "real-ai",
  "caseType": "ai-spot",
  "title": "string",
  "relatedBranch": "string",
  "difficulty": "string",
  "learningTarget": "string",
  "answerTarget": "first_life_saving_step|symptom_control|mechanism_targeted_treatment|definitive_treatment|diagnostic_first_test|confirmatory_test|long_term_management|complication_management|prevention_or_prophylaxis|mechanism_explanation",
  "demographics": "string",
  "setting": "string",
  "chiefComplaint": "string",
  "stem": "string",
  "compactVitals": [{ "label": "vital_label", "value": "vital_value" }],
  "compactObjectiveData": [{ "label": "data_label", "value": "data_value" }],
  "findings": {
    "history": ["string"],
    "exam": ["string"],
    "vitals": { "TA": "", "Nabız": "", "Solunum": "", "Ateş": "", "SpO₂": "" },
    "investigations": [
      {
        "id": "string",
        "label": "string",
        "type": "string",
        "priority": "karar verdirici|yardımcı|düşük öncelikli|durumsal",
        "summary": "string",
        "findings": ["string"],
        "rows": [["parameter_label", "result_with_unit", "reference_or_expected", "status"]]
      }
    ]
  },
  "question": "string",
  "options": [
    { "id": "A", "text": "string" },
    { "id": "B", "text": "string" },
    { "id": "C", "text": "string" },
    { "id": "D", "text": "string" },
    { "id": "E", "text": "string" }
  ],
  "correctAnswer": "A|B|C|D|E",
  "optionClinicalRoles": { "A": "primary_correct|adjunct_correct_but_not_asked|later_step|wrong_condition|unrelated|contraindicated_or_harmful", "B": "...", "C": "...", "D": "...", "E": "..." },
  "explanation": "string",
  "wrongOptionFeedback": { "A": "string", "B": "string", "C": "string", "D": "string", "E": "string" },
  "evidenceChain": ["string", "string", "string"],
  "examPearl": "string",
  "managementSteps": ["string", "string"],
  "nextQuestionSeed": "string"
}
JSON dışında tek karakter bile yazma.`;
}

const REMOTE_FORBIDDEN_TEXT_PATTERNS = [
  /hastanın durumu değerlendirilir/iu,
  /Tedavi önceliği\.*/iu,
  /İlk karar\.*/iu,
  /hangi tedavi yöntemi ilk sırada uygulanmalıdır/iu,
  /Ancak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır/iu,
  /doğru cevabı destekleyen ana ipucudur/iu,
  /Doğru yanıta götüren ana bulgudur/iu,
  /Bu tabloda baskın değildir/iu,
  /Klinik bağlamda değerlendirilir/iu,
  /Morfolojik patern\s*[.:]\s*Morfolojik patern/iu,
  /Morfolojik patern\s*[:：]/iu,
  /karar verdirici paternyla/iu,
  /likefaksiyon nekrozuyla/iu,
  /kısa TUS pratiğinde ele alınır/iu,
  /Klinik değerlendirme için ek veri/iu,
  /Objektif karar verisi/iu,
  /verilen öğrenme hedefi/iu,
  /yanıt ekseni/iu,
  /öğrenci ayırt eder/iu,
  /Sonuçlar tek bir tanı adını yazmaz/iu,
  /Patern ve mekanizma birlikte yorumlanmalıdır/iu,
  /dikkat çeker\.\s*$/iu,
  /tanısını\.\s*$/iu,
  /farkl[ıi]\s+klinik\s+tabloda\s+uygun\s+olabilir/iu,
  /olgudaki\s+ana\s+ipu[çc]lar[ıi]n[ıi]\s+tek\s+ba[şs][ıi]na\s+a[çc][ıi]klamaz/iu,
  /baz[ıi]\s+klinik\s+durumlarda\s+g[üu]ndeme\s+gelebilir/iu,
];

function collectText(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectText(item, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectText(item, out));
  return out;
}


function normalizeRemoteTusText(text = '') {
  return String(text || '')
    .replace(/\bİlk karar\b/giu, 'Öncelikli yaklaşım')
    .replace(/\bTedavi önceliği\b/giu, 'Tedavi basamağı')
    .replace(/\bklinik bağlamda değerlendirilir\b/giu, 'öykü ve objektif bulgularla birlikte yorumlanır')
    .replace(/\bfarklı klinik tabloda uygun olabilir\b/giu, 'bu karar düzeyi için tek en iyi yanıt değildir')
    .replace(/\bolgudaki ana ipuçlarını tek başına açıklamaz\b/giu, 'bu karar düzeyini tek başına karşılamaz')
    .replace(/\bbazı klinik durumlarda gündeme gelebilir\b/giu, 'seçilmiş koşullarda değerlendirilebilir')
    .replace(/\bDoğru yanıta götüren ana bulgudur\b/giu, 'Seçenekler arasındaki ayrımı belirginleştirir')
    .replace(/\bdoğru yanıta götüren ana bulgudur\b/giu, 'seçenekler arasındaki ayrımı belirginleştirir')
    .replace(/\bAncak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır\b/giu, 'Ancak bu olgudaki ayırt ettirici bulgularla desteklenmemektedir')
    .replace(/\bwheezing\b/giu, 'hışıltılı solunum')
    .replace(/\binsulin\s*\+\s*glucose\b/giu, 'intravenöz insülin + glukoz')
    .replace(/\s+/g, ' ')
    .trim();
}

function standardizeRemoteQuestionText(value) {
  if (typeof value === 'string') return normalizeRemoteTusText(value);
  if (Array.isArray(value)) return value.map(standardizeRemoteQuestionText);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, standardizeRemoteQuestionText(item)]));
  }
  return value;
}

function inferRemoteOptionCategory(text = '') {
  const value = normalizeRemoteText(text);
  if (/tanisi|sendromu|hastaligi|enfeksiyonu|embolisi|infarktu|pnomoni|menenjit|sepsis|ketoasidoz|bronshiolit|kawasaki|addison|graves|tiroidit/.test(value)) return 'diagnosis';
  if (/tedavi|baslamak|uygulamak|vermek|iv|im|oral|adrenalin|insulin|glukoz|antibiyotik|antikoagulasyon|oksijen|sivi|kalsiyum|glukonat|aspirin|pci|tromboliz|debridman/.test(value)) return 'treatment';
  if (/testi|tetkik|bt|mr|mrg|usg|ekg|kultur|pcr|seroloji|biyopsi|anjiyografi|troponin|manometri|antijen|coombs|kan gazi/.test(value)) return 'test';
  if (/mekanizma|reseptor|enzim|inhibisyon|aktivasyon|mutasyon|transport|nekroz|apoptoz|yolak|patofizyoloji/.test(value)) return 'mechanism';
  return 'other';
}

function validateRemoteOptionHomogeneity(question = {}) {
  const errors = [];
  const options = normalizeOptionObjects(question.options || question.o);
  if (options.length !== 5) return ['option-quality: beş seçenek bulunmalı'];
  const categories = options.map((option) => inferRemoteOptionCategory(option.text));
  const meaningful = categories.filter((category) => category !== 'other');
  const dominant = meaningful.sort((a, b) => meaningful.filter((x) => x === b).length - meaningful.filter((x) => x === a).length)[0];
  const mixedCount = dominant ? categories.filter((category) => category !== dominant && category !== 'other').length : 0;
  if (!dominant || mixedCount >= 2) errors.push(`option-quality: seçenekler aynı kavramsal kategoride değil (${categories.join(', ')})`);
  if (options.some((option) => /hiçbiri|hepsi|yukarıdakilerin hepsi|tümü/iu.test(option.text))) errors.push('option-quality: TUS standardında hepsi/hiçbiri seçeneği kullanılmaz');
  const lengths = options.map((option) => String(option.text || '').length).filter(Boolean);
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  if (min > 0 && max / min > 3.2) errors.push('option-quality: seçenek uzunlukları doğru cevabı ele verecek kadar dengesiz');
  return errors;
}

function getVisiblePreAnswerText(question = {}) {
  return collectText({
    title: question.title,
    demographics: question.demographics,
    setting: question.setting,
    chiefComplaint: question.chiefComplaint,
    stem: question.stem,
    compactVitals: question.compactVitals,
    compactObjectiveData: question.compactObjectiveData,
    findings: question.findings,
  }).join(' | ');
}

function validateRemoteAnswerLeakage(question = {}) {
  const errors = [];
  const visible = normalizeRemoteText(getVisiblePreAnswerText(question));
  const correct = normalizeRemoteText(getRemoteCorrectText(question));
  if (correct && correct.length > 5 && visible.includes(correct)) errors.push('answer-leakage: doğru cevap cevap öncesi alanda birebir geçiyor');
  if (/tanisini dogrular|tanisini koydurur|ile uyumludur|kesin tanidir|tanidir\b|ilk basamak.*olmalidir/.test(visible)) {
    errors.push('answer-leakage: cevap öncesi alanda yorumlayıcı tanı/tedavi dili var');
  }
  return errors;
}

function validateRemoteTusExamLanguage(question = {}) {
  const errors = [];
  const stem = String(question.stem || question.s || '').trim();
  const questionText = String(question.question || question.q || '').trim();
  if (/Profil:|Başvuru:|Risk bağlamı:|Ayırt ettirici ipuçları:|Klinik gerekçe:|Kanıt zinciri:/iu.test(stem)) errors.push('exam-language: soru köküne legacy kart başlığı sızmış');
  if (/hangi\s+tedavi\s+yöntemi\s+ilk\s+sırada\s+uygulanmalıdır\.?$/iu.test(questionText)) errors.push('exam-language: soru cümlesi gündelik/eksik sınav dili taşıyor');
  if (!/(en olası|en uygun|öncelikle|ilk|beklenen|hangisidir|hangisi|kullanılmaz|beklenmez|değildir)/iu.test(questionText)) errors.push('exam-language: ölçme hedefini belirleyen net TUS yönlendirmesi yok');
  const words = stem.split(/\s+/).filter(Boolean).length;
  if (words > 230) errors.push('exam-language: TUS spot kökü gereksiz uzun');
  return errors;
}

function validateRemoteEditorialQuality(question = {}) {
  const errors = [];
  const texts = collectText(question);
  if (parseBooleanEnv('AI_SIMPLE_TUS_PIPELINE', true)) {
    texts.forEach((text) => {
      const normalized = String(text || '').replace(/\s+/g, ' ').trim();
      if (!normalized) return;
      REMOTE_FORBIDDEN_TEXT_PATTERNS.forEach((pattern) => {
        if (pattern.test(normalized)) errors.push(`forbidden editorial text: ${normalized.slice(0, 120)}`);
      });
      if (/\.\.\.|…/u.test(normalized)) errors.push(`truncated text: ${normalized.slice(0, 120)}`);
    });
    errors.push(...validateRemoteClinicalCoherence(question));
    errors.push(...validateRemoteOptionHomogeneity(question));
    errors.push(...validateRemoteAnswerLeakage(question));
    errors.push(...validateRemoteTusExamLanguage(question));
    const hardCoherence = validateClinicalCoherenceHardGate(question);
    if (!hardCoherence.ok) errors.push(...hardCoherence.errors.map((error) => `hard-coherence:${error}`));
    return { ok: errors.length === 0, errors: Array.from(new Set(errors)) };
  }
  texts.forEach((text) => {
    const normalized = String(text || '').replace(/\s+/g, ' ').trim();
    if (!normalized) return;
    REMOTE_FORBIDDEN_TEXT_PATTERNS.forEach((pattern) => {
      if (pattern.test(normalized)) errors.push(`forbidden editorial text: ${normalized.slice(0, 120)}`);
    });
    if (/\b([A-Za-zÇĞİÖŞÜçğıöşü]{4,})\b[.!?]?\s+\1\b/iu.test(normalized)) {
      errors.push(`repeated text: ${normalized.slice(0, 120)}`);
    }
  });
  const investigations = question?.findings?.investigations || question?.investigations || [];
  investigations.forEach((item, index) => {
    const label = String(item?.label || '').trim();
    const summary = String(item?.summary || '').trim();
    const rows = Array.isArray(item?.rows) ? item.rows : [];
    if (/laboratuvar|lab/i.test(label) && rows.length === 0 && !/\d|pozitif|negatif|saptandı|saptanmadı|üreme/i.test(summary)) {
      errors.push(`placeholder lab investigation at ${index + 1}`);
    }
  });
  errors.push(...validateRemoteClinicalCoherence(question));
  errors.push(...validateRemoteOptionHomogeneity(question));
  errors.push(...validateRemoteAnswerLeakage(question));
  errors.push(...validateRemoteTusExamLanguage(question));
  const feedbackQuality = validateFeedbackQualityStandard(question);
  if (!feedbackQuality.ok) errors.push(...feedbackQuality.errors.map((error) => `feedback-quality:${error}`));
  const singleBest = validateSingleBestAnswerGate(question);
  if (!singleBest.ok) errors.push(...singleBest.errors.map((error) => `single-best-answer:${error}`));
  const finalSafety = validateFinalAIQuestionSafetyGate(question);
  if (!finalSafety.ok) errors.push(...finalSafety.errors.map((error) => `final-safety:${error}`));
  const hardCoherence = validateClinicalCoherenceHardGate(question);
  if (!hardCoherence.ok) errors.push(...hardCoherence.errors.map((error) => `hard-coherence:${error}`));
  return { ok: errors.length === 0, errors: Array.from(new Set(errors)) };
}

function normalizeRemoteText(text = '') {
  return String(text || '')
    .toLocaleLowerCase('tr')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9/% ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}


function getRemoteCorrectText(question = {}) {
  const correctId = String(question.correctAnswer || question.c || '').trim().toUpperCase();
  const options = Array.isArray(question.options || question.o) ? (question.options || question.o) : [];
  const option = options.find((item, index) => {
    const id = typeof item === 'object' ? item.id : OPTION_IDS[index];
    return String(id || '').toUpperCase() === correctId;
  });
  return typeof option === 'string' ? option : (option?.text || option?.label || question.correctAnswerText || '');
}

function makeRemoteOptionSetSignature(question = {}) {
  const options = normalizeOptionObjects(question.options || question.o);
  const payload = options.map((item) => normalizeRemoteText(item.text)).sort((a, b) => a.localeCompare(b, 'tr')).join(' | ');
  return payload;
}

function tokenizeRemoteContent(value = '') {
  const stopWords = new Set(['ve', 'veya', 'ile', 'icin', 'olan', 'olarak', 'hasta', 'olgu', 'olguda', 'klinik', 'soru', 'yanit', 'dogru', 'secenek', 'tus', 'spot', 'hangi', 'temel', 'uygun', 'degerlendirilir']);
  return normalizeRemoteText(value).split(' ').filter((token) => token.length > 2 && !stopWords.has(token));
}

function remoteSimilarity(a = '', b = '') {
  const setA = new Set(tokenizeRemoteContent(a));
  const setB = new Set(tokenizeRemoteContent(b));
  if (!setA.size || !setB.size) return 0;
  let intersection = 0;
  setA.forEach((token) => { if (setB.has(token)) intersection += 1; });
  const union = new Set([...setA, ...setB]).size || 1;
  const containment = intersection / Math.min(setA.size, setB.size);
  return Math.max(intersection / union, containment * 0.86);
}

function normalizeClientQuestionText(value = '') {
  return String(value ?? '')
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/[âîû]/g, (match) => ({ â: 'a', î: 'i', û: 'u' }[match] || match))
    .replace(/[^a-z0-9çğıöşü\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function remoteStableHash(value = '') {
  const text = normalizeClientQuestionText(value);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `q${(hash >>> 0).toString(36)}`;
}

function makeRemoteOptionSetHash(question = {}) {
  const optionTexts = normalizeOptionObjects(question.options || question.o)
    .map((item) => normalizeClientQuestionText(item.text))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, 'tr'));
  return optionTexts.length ? remoteStableHash(optionTexts.join(' | ')) : '';
}

function makeRemoteContentSignature(question = {}) {
  return `cs-${remoteStableHash([
    question.relatedBranch || question.b,
    question.learningTarget || question.topic || question.title,
    question.answerTarget || question.questionType,
    question.title,
    question.demographics,
    question.chiefComplaint,
    question.stem,
    question.question,
    getRemoteCorrectText(question),
    makeRemoteOptionSetSignature(question),
    collectText(question.evidenceChain || []).join(' '),
    question.examPearl,
  ].filter(Boolean).join(' :: '))}`;
}

function buildRemoteCandidateText(question = {}) {
  return normalizeRemoteText([
    question.relatedBranch || question.b,
    question.title || question.t,
    question.learningTarget || question.lt,
    question.demographics || question.d,
    question.chiefComplaint || question.cc,
    question.stem || question.s,
    question.question || question.q,
    getRemoteCorrectText(question),
    makeRemoteOptionSetSignature(question),
    collectText(question.findings || {}).join(' '),
    collectText(question.evidenceChain || question.k || []).join(' '),
    question.examPearl || question.p,
  ].filter(Boolean).join(' | '));
}

function validateRemoteDiversity(question = {}, context = {}) {
  const recent = Array.isArray(context.recentQuestionSummaries) ? context.recentQuestionSummaries.slice(0, 50) : [];
  const recentSignatures = Array.isArray(context.recentSignatures) ? context.recentSignatures.map(String) : [];
  const forbiddenOptionSets = Array.isArray(context.forbiddenOptionSets) ? context.forbiddenOptionSets.map(String) : [];
  const candidateCorrect = normalizeRemoteText(getRemoteCorrectText(question));
  const candidateOptions = makeRemoteOptionSetSignature(question);
  const candidateOptionSetHash = makeRemoteOptionSetHash(question);
  const candidateContentSignature = question.contentSignature || makeRemoteContentSignature(question);
  const candidateSemantic = question.semanticFingerprint || `sem-${remoteStableHash(buildRemoteCandidateText(question))}`;
  const candidateText = buildRemoteCandidateText(question);
  const candidateTitle = normalizeRemoteText(question.title || question.t || '');
  const candidateTopic = normalizeRemoteText(context.selectedTopic || question.learningTarget || question.title || question.t || '');
  const candidateType = normalizeRemoteText(context.questionType || question.questionType || question.answerTarget || '');

  if (candidateContentSignature && recentSignatures.includes(candidateContentSignature)) {
    return { passed: false, reason: 'same_signature', similarTo: candidateContentSignature, score: 1 };
  }
  if (candidateSemantic && recentSignatures.includes(candidateSemantic)) {
    return { passed: false, reason: 'same_semantic_fingerprint', similarTo: candidateSemantic, score: 1 };
  }
  if (candidateOptionSetHash && forbiddenOptionSets.includes(candidateOptionSetHash)) {
    return { passed: false, reason: 'forbidden_option_set_duplicate', similarTo: candidateOptionSetHash, score: 0.97 };
  }

  if (!recent.length) return { passed: true };

  const immediate = recent[0] || {};
  if (candidateCorrect && candidateCorrect === normalizeRemoteText(immediate.correct || immediate.normalizedCorrect || '')) {
    return { passed: false, reason: 'same_correct_answer_back_to_back', similarTo: immediate.id, score: 0.9 };
  }

  const recentTopics = recent.slice(0, 10).map((item) => normalizeRemoteText(item.topic || item.title || item.learningTarget || '')).filter(Boolean);
  if (candidateTopic && recentTopics.slice(0, 3).includes(candidateTopic)) {
    return { passed: false, reason: 'same_topic_recently', similarTo: recent[0]?.id, score: 0.88 };
  }

  for (const item of recent) {
    const itemCorrect = normalizeRemoteText(item.correct || item.normalizedCorrect || '');
    const itemOptionHash = String(item.optionSetSignature || '').trim();
    const itemOptionTexts = Array.isArray(item.optionTexts) ? item.optionTexts.map(normalizeRemoteText).sort((a, b) => a.localeCompare(b, 'tr')).join(' | ') : '';
    const itemOptions = itemOptionTexts || itemOptionHash;
    const itemText = normalizeRemoteText(item.combinedText || [item.branch, item.title, item.learningTarget, item.correct, itemOptionTexts].filter(Boolean).join(' | '));
    const itemTitle = normalizeRemoteText(item.title || item.normalizedTitle || '');
    const itemType = normalizeRemoteText(item.questionType || item.answerTarget || '');
    const sameCorrect = candidateCorrect && itemCorrect === candidateCorrect;
    const sameOptions = Boolean(candidateOptions && itemOptions && (itemOptions.includes(candidateOptions) || candidateOptions.includes(itemOptions) || (candidateOptionSetHash && itemOptionHash === candidateOptionSetHash)));
    const sameType = !candidateType || !itemType || candidateType === itemType;
    const textSimilarity = remoteSimilarity(candidateText, itemText);
    const titleSimilarity = remoteSimilarity(candidateTitle, itemTitle);
    if (sameCorrect && sameOptions) return { passed: false, reason: 'option_set_duplicate', similarTo: item.id, score: Math.max(textSimilarity, 0.98) };
    if (sameCorrect && textSimilarity >= 0.78) return { passed: false, reason: 'same_answer_semantic_repeat', similarTo: item.id, score: textSimilarity };
    if (sameType && textSimilarity >= 0.86) return { passed: false, reason: 'semantic_near_duplicate', similarTo: item.id, score: textSimilarity };
    if (titleSimilarity >= 0.9 && (sameCorrect || textSimilarity >= 0.7)) return { passed: false, reason: 'same_title_answer_target', similarTo: item.id, score: Math.max(titleSimilarity, textSimilarity) };
  }
  return { passed: true };
}

function validateRemoteClinicalCoherence(question = {}) {
  const errors = [];
  const texts = collectText(question);
  const bundle = normalizeRemoteText(texts.join(' '));
  const correctOption = (question.options || []).find((option) => String(option.id || '').toUpperCase() === String(question.correctAnswer || '').toUpperCase());
  const correct = normalizeRemoteText(correctOption?.text || '');
  const asksManagement = /ilk|tedavi|yonetim|yaklasim|acil|mudahale|ilac/.test(normalizeRemoteText(`${question.question || ''} ${question.learningTarget || ''}`));
  const isPerioperativeAnaphylaxis = /anestezi|ameliyathane|perioperatif|induksiyon|cerrahi|monitorize/.test(bundle)
    && /anafil|bronkospazm|hipotansiyon|urtiker|spo/.test(bundle);
  if (isPerioperativeAnaphylaxis && asksManagement) {
    const hasBundle = /tetikleyici|ajan.*durdur|oksijen|hava yolu|sivi|kristaloid|adrenalin|epinefrin|iv/.test(correct)
      && /adrenalin|epinefrin/.test(correct)
      && /oksijen|hava yolu/.test(correct)
      && /sivi|kristaloid|iv/.test(correct);
    const isOnlyIm = /im|intramuskuler|kas ici/.test(correct) && !/iv|oksijen|sivi|tetikleyici|hava yolu|hemodinamik/.test(correct);
    if (isOnlyIm || !hasBundle) {
      errors.push('perioperative anaphylaxis answer is not context-sensitive enough');
    }
  }
  return errors;
}

function validateRawQuestion(question = {}) {
  const errors = [];
  const options = Array.isArray(question.options) ? question.options : [];
  const correctAnswer = String(question.correctAnswer || '').trim().toUpperCase();
  const optionIds = new Set(options.map((option) => String(option.id || '').toUpperCase()));

  if (!question.title) errors.push('title missing');
  if (!question.stem || String(question.stem).length < 40) errors.push('stem missing or too short');
  if (!question.question || String(question.question).length < 16) errors.push('question missing or too short');
  if (options.length !== 5) errors.push('exactly 5 options required');
  if (!OPTION_IDS.includes(correctAnswer) || !optionIds.has(correctAnswer)) errors.push('correctAnswer must match A-E option id');
  if (!question.explanation || String(question.explanation).length < 60) errors.push('explanation missing or too short');
  if (!Array.isArray(question.evidenceChain) || question.evidenceChain.length < 3) errors.push('evidenceChain requires at least 3 items');
  if (!question.examPearl) errors.push('examPearl missing');
  if (!ANSWER_TARGETS.includes(String(question.answerTarget || ''))) errors.push('answerTarget missing or invalid');
  if (!question.optionClinicalRoles || typeof question.optionClinicalRoles !== 'object') errors.push('optionClinicalRoles missing');

  const wrong = question.wrongOptionFeedback || {};
  options.forEach((option) => {
    const id = String(option.id || '').toUpperCase();
    if (id !== correctAnswer && !wrong[id]) errors.push(`wrong feedback missing for ${id}`);
  });

  return { ok: errors.length === 0, errors };
}


function buildSimpleTusPrompt({ branchFilter = 'Rastgele', recentQuestionSummaries = [], recentTopics = [], recentCorrectAnswers = [], selectedTopic = '', selectedSubtopic = '', questionType = '', seed = '', previousTopicWindow = [], attempt = 1, antiRepeatNonce = '' }) {
  const recentList = recentQuestionSummaries
    .slice(0, 12)
    .map((item, index) => {
      const target = item.answerTarget || item.questionType || '';
      return `${index + 1}. ${[item.branch || 'TUS', item.title, item.correct, target].filter(Boolean).join(' | ')}`;
    })
    .join('\n');

  const forbiddenConcepts = uniqueNonEmpty([
    ...recentQuestionSummaries.slice(0, 12).flatMap((item) => [item.title, item.correct, item.learningTarget, item.topic, item.subtopic]),
    ...recentTopics,
    ...recentCorrectAnswers,
  ]).slice(0, 24).join('; ');

  const requestedBranch = branchFilter && branchFilter !== 'random' ? branchFilter : 'Rastgele TUS branşı';
  const requestedFocus = selectedSubtopic || selectedTopic || questionType || 'yeni ve farklı bir TUS karar noktası';

  return `KlinikIQ için tek bir yeni Türkçe TUS spot sorusu üret.

AMAÇ
- Kısa, bilimsel, öğretici, tek doğru cevaplı bir TUS maddesi yaz.
- Klinik örnek kopyalama; son üretimleri yalnız tekrar yasağı olarak kullan.
- JSON dışında hiçbir metin yazma.

İSTEK
- Branş: ${requestedBranch}
- Odak: ${requestedFocus}
- Deneme: ${attempt}
- Çeşitlilik anahtarı: ${seed || antiRepeatNonce || Date.now()}

YAKIN ÜRETİMLER - KOPYALAMA / PARAFRAZLAMA YASAK
${recentList || 'Yok.'}

YASAK KAVRAMLAR
${forbiddenConcepts || 'Yok.'}

ZORUNLU MADDE STANDARDI
1. Tek ölçme hedefi seç ve answerTarget alanına yaz: first_life_saving_step, symptom_control, mechanism_targeted_treatment, definitive_treatment, diagnostic_first_test, confirmatory_test, long_term_management, complication_management, prevention_or_prophylaxis veya mechanism_explanation.
2. Stem yalnız olgu anlatımıdır; soru cümlesini stem içine yazma. 4-7 kısa cümle yeterlidir.
3. Question alanı tek ve net cümle olmalı; hedefi açıkça daraltmalı. Belirsiz 'en uygun yaklaşım' dilini tek başına kullanma.
4. Beş seçenek aynı kavramsal kategoride olmalı. Tanı, tedavi, test ve mekanizma seçeneklerini aynı soruda karıştırma.
5. Doğru cevap gerçekten tek en iyi cevap olmalı. Aynı olguda birlikte uygulanabilecek iki seçeneği yarıştırma.
6. compactVitals ve compactObjectiveData yalnız gerekliyse doldur. Tek satır tek veri olsun; aynı veriyi tekrar etme, yorum veya tanı cümlesi yazma.
7. findings alanı kalite kontrol içindir; kritik veri stem veya destek panelinde de anlaşılır olmalı.
8. explanation 2-3 tamamlanmış cümle olsun; doğru cevabı tekrar etmek yerine klinik mantığı açıkla.
9. evidenceChain 3 madde olsun. Her madde şu biçime yakın yazılsın: 'Etiket — kısa ipucu. Anlamı: kısa klinik anlam.' Olguda olmayan veri ekleme.
10. examPearl 1 kısa TUS ipucu olsun; explanation cümlesini kopyalama.
11. managementSteps yalnız yönetim değeri varsa 2-3 somut basamak içersin; mekanizma/tanı sorusunda boş yönetim listesi olabilir.
12. wrongOptionFeedback içinde A-E bulunmalı. Her açıklama seçenek özelinde ve 1-2 kısa cümle olmalı.

YASAK DİL
- 'farklı klinik tabloda uygun olabilir'
- 'olgudaki ana ipuçlarını tek başına açıklamaz'
- 'ilişkili bir alternatif gibi görünse de'
- 'tek en iyi yanıt yapacak düzeyde desteklemez'
- 'bu karar düzeyinde öncelikli yanıtı karşılamadığı için'
- 'klinik bağlamda değerlendirilir'
- 'seçenekler arasındaki temel ayrımı gösterir'
- 'Kanıt 1', 'Kanıt 2'
- üç nokta, yarım cümle, kesik kelime

ÇIKTI
- Yalnız geçerli JSON döndür.
- Tüm alanlar Türkçe kullanıcı metni içersin.
- source='real-ai', caseType='ai-spot' olsun.`;
}

function buildPrompt({ branchFilter = 'Rastgele', recentQuestionSummaries = [], recentTopics = [], recentCorrectAnswers = [], selectedTopic = '', selectedSubtopic = '', questionType = '', seed = '', previousTopicWindow = [], attempt = 1, antiRepeatNonce = '' }) {
  if (parseBooleanEnv('AI_SIMPLE_TUS_PROMPT', true)) {
    return buildSimpleTusPrompt({ branchFilter, recentQuestionSummaries, recentTopics, recentCorrectAnswers, selectedTopic, selectedSubtopic, questionType, seed, previousTopicWindow, attempt, antiRepeatNonce });
  }
  const recentList = recentQuestionSummaries
    .slice(0, 22)
    .map((item, index) => `${index + 1}. ${item.branch || 'TUS'} | başlık: ${item.title || ''} | doğru: ${item.correct || ''}`)
    .join('\n');

  const forbiddenTopics = uniqueNonEmpty([
    ...recentQuestionSummaries.slice(0, 22).map((item) => [item.topic || item.title, item.correct].filter(Boolean).join(' / ')),
    ...recentTopics,
    ...recentCorrectAnswers,
  ]).join('; ');

  const previousWindow = Array.isArray(previousTopicWindow)
    ? previousTopicWindow.slice(0, 10).map((item, index) => `${index + 1}. ${item.topic || ''} | ${item.questionType || ''} | ${item.correct || ''}`).join('\n')
    : '';

  return `${TUS_LANGUAGE_STANDARD_PROMPT}

Sen KlinikIQ için çalışan kıdemli TUS soru yazarı, klinik içerik editörü, ölçme-değerlendirme uzmanı ve Türkçe tıbbi terminoloji denetleyicisisin.

Görev: Tek bir yeni TUS odaklı, kısa klinik spot soru üret. Soru Türkçe olmalı, bilimsel olarak doğru olmalı, profesyonel sınav dili taşımalı ve JSON dışında hiçbir açıklama döndürmemelisin.

FEEDBACK KALİTE STANDARDI:
- explanation alanı 2-4 cümlelik Klinik Gerekçe gibi yazılır; doğru yanıtı tekrar etmek yerine olgudaki ipuçlarını neden-sonuç ilişkisiyle bağlar.
- evidenceChain 3-5 somut ipucu içerir; her madde yalnız bulguyu kopyalamaz, klinik anlamını kısa gösterir. Kanıt 1/Kanıt 2 gibi mekanik metin yazma.
- examPearl kısa TUS işareti olmalıdır; klinik gerekçeyi kopyalamaz, benzer sorularda işe yarayan ayırt ettirici karar mantığını verir.
- managementSteps yalnız yönetim gerektiren sorularda klinik öncelik sırasını verir; tanısal doğrulama, stabilizasyon, ilk tedavi ve sonraki basamak karıştırılmaz.
- wrongOptionFeedback seçenek özelinde yazılır; boş genelleme yapmaz, aynı cümleyi farklı seçeneklerde tekrar etmez ve uygun yanıt adını gereksiz yinelemez.
- Cevap sonrası açıklamalar kısa, doğal, tamamlanmış cümlelerden oluşur; yarım cümle, otomatik şablon, meta-soru dili ve mekanik etiket kullanılmaz.

TEK-EN-İYİ-YANIT STANDARDI:
- answerTarget alanını mutlaka doldur: first_life_saving_step, symptom_control, mechanism_targeted_treatment, definitive_treatment, diagnostic_first_test, confirmatory_test, long_term_management, complication_management, prevention_or_prophylaxis veya mechanism_explanation.
- Soru kökü doğru cevabı bu answerTarget düzeyinde tekilleştirmelidir. Yalnız “en uygun tedavi/yaklaşım/antidot” veya “hangi seçenek doğrudur” gibi geniş ifade kullanma.
- Aynı olguda birlikte veya ardışık kullanılabilecek seçenekleri tek doğruymuş gibi yarıştırma. Gerekirse question alanını hedefe göre daralt, seçenekleri aynı karar düzlemine çek veya doğru seçeneği gerçek kombinasyon olarak yaz.
- optionClinicalRoles alanında her şık için rol ver: primary_correct, adjunct_correct_but_not_asked, later_step, wrong_condition, unrelated veya contraindicated_or_harmful.
- Klinik olarak kısmen uygun olan yanlış seçenekleri “farklı klinik tabloda uygun olabilir” diye yanlışlama. Bu seçenek yardımcı, ek veya sonraki basamaksa bunu dürüstçe belirt; ancak neden bu soru düzeyinde tek en iyi yanıt olmadığını açıkla.
- evidenceChain maddeleri “Veri: [gerçek veri tipi] — [kısa ipucu]. Anlamı: [klinik karar anlamı].” formatına uygun olmalı; olguda yazmayan bulgu, laboratuvar, görüntüleme veya semptom uydurma.
- Cevap sonrası feedbackte “farklı klinik tabloda uygun olabilir”, “ana ipuçlarını tek başına açıklamaz”, “klinik bağlamda değerlendirilir” gibi jenerik cümleler kullanma. Her yanlış seçenek için tıbbi rolünü ve bu karar düzeyinde neden elendiğini açıkla.
- Açıklama, seçenek feedbacki, hap bilgi, kanıt zinciri ve yönetim alanlarında aynı cümleyi tekrar etme. Cümleler tamamlanmış olmalı; kelime kırpıntısı, üç nokta, bağlaçla biten metin veya yarım ifade yazma.
- Soru kullanıcıya gösterilmeden final kalite kapısından geçecektir: double-correct risk, option category mismatch, source-bound evidence, spoiler, generic feedback ve truncation hatası olan çıktı reddedilir.

Branş isteği: ${branchFilter || 'Rastgele'}
Bu denemede seçilecek ana konu: ${selectedTopic || selectedSubtopic || 'Klinik olarak farklı yeni konu seç'}
Bu denemede soru tipi: ${questionType || 'tanı/tedavi/tetkik/mekanizma eksenlerinden biri'}
Çeşitlilik seed: ${seed || antiRepeatNonce || Date.now()}
Üretim denemesi: ${attempt}
Çeşitlilik anahtarı: ${antiRepeatNonce || Date.now()}

Yakın zamanda üretilen sorular:
${recentList || 'Henüz yok.'}
Bu liste örnek değildir; listedeki soru kökü, başlık, yaş-cinsiyet, seçenek seti, doğru cevap veya klinik karar noktasını kopyalama/parafrazlama. Liste yalnızca yasak tekrar penceresidir.

Son konu penceresi:
${previousWindow || 'Henüz yok.'}

YASAK konu/doğru cevap listesi:
${forbiddenTopics || 'Henüz yok.'}

Kesin kurallar:
- Ön yüzde sol tarafta gösterilecek klinik metin stem alanıdır; stem yalnız olgu/vaka anlatımı olmalı, son soru cümlesini içermez.
- stem gerçek TUS soru kökü gibi olmalı: demografik veri → şikâyet/süre → ayırt ettirici öykü → fizik muayene → objektif veri sırasını izlesin. 3-6 cümle, genellikle 80-150 kelime; kompleks olguda en fazla 220 kelime. Klinik vaka raporu gibi uzatma.
- Vital bulgu her soruda zorunlu değildir. Yalnız klinik karar için gerekli olduğunda ver; gereksiz vital seti üretme.
- Vital bulgular sayısal olarak önemliyse stem içine uzun liste halinde yığma; compactVitals alanına kısa label/value çiftleri koy. Stem içinde gerekirse 'hipotansif ve taşikardik' gibi kısa ifade kullan.
- Laboratuvar, seroloji, kültür, EKG, görüntüleme veya patoloji verileri gerekiyorsa stem içinde uzun ham panel listesi yazma; çoklu değerleri compactObjectiveData alanına kısa label/value şeklinde koy. Stemte yalnız klinik bağlam kalsın; soru cümlesini question alanına yaz. Referans aralıklarını stem içine yığma.
- compactObjectiveData maddeleri tek parametre = tek değer mantığında olmalı. Aynı parametreyi veya aynı sonucu farklı satırlarda tekrar etme; birleşik değer yazma, gerekiyorsa ayrı kısa satırlara böl. Label ve value okunabilir uzunlukta olmalı; üç nokta, kısaltılmış kırpıntı, “Anormal/Normal” statü eki veya yorum cümlesi ekleme.
- Aynı veri iki yerde tekrar edilmez: compactVitals veya compactObjectiveData içine koyduğun sayısal/objektif değeri stem içinde liste halinde yeniden yazma. Stem içinde gerekiyorsa yalnız kısa nitel klinik vurgu kullan.
- stem içine gerekli öykü ve kısa klinik bağlamı doğal TUS soru akışıyla ekle; çoklu vital/lab/seroloji/EKG panelini compactVitals veya compactObjectiveData alanına taşı. Kullanıcı ayrı hasta özeti, risk bağlamı veya tetkik kartı açmayacak.
- findings alanları yalnız internal kalite kontrol içindir; stem olmadan cevaplanamayacak kritik veri findings içinde yalnız bırakılmamalıdır.
- stem içinde Profil:, Başvuru:, Risk bağlamı:, Ayırt ettirici ipuçları:, Klinik gerekçe:, Kanıt zinciri:, Sınav notu: gibi başlık kırıntıları kullanma.
- stem içinde doğru cevabı, doğru tanıyı veya post-answer öğretici cümleyi açık etme; yalnız soru çözmek için gerekli objektif veriyi ver.
- title kısa ve nötr olmalı; tanıyı, etkeni, doğru tedaviyi veya doğru cevabı başlıkta söyleme.
- Bu denemede verilen ana konudan şaşma; ama yakın listedeki konu, başlık, doğru cevap, klinik odak veya aynı serolojik/tetkik paternini tekrar etme.
- Yasak listedeki hastalık, mekanizma, antidot, enzim, seroloji paterni, ilaç etki mekanizması veya doğru cevabı yeniden kullanma.
- Aynı hastalık kullanılacaksa soru açısı kesin değişsin: tanı yerine ilk tedavi, tetkik yorumu, komplikasyon, mekanizma veya yönetim basamağı sor.
- Deneme 2 veya sonrası ise önceki denemeden tamamen farklı branş alt konusu ve farklı doğru cevap seç; yalnız şık sırasını değiştirmek yeni soru sayılmaz.
- question alanı şıkların üzerinde gösterilecek tek ve net soru cümlesidir. Stem içinde bu soru cümlesini tekrar etme; aynı soru iki kez görünmemelidir.
- Tek bir ana klinik odak olsun.
- 5 seçenek üret: A, B, C, D, E.
- Tüm seçenekler aynı kavramsal kategoride olsun; tanı sorusunda yalnız tanılar, tedavi sorusunda yalnız tedaviler, tetkik sorusunda yalnız tetkikler, mekanizma sorusunda yalnız mekanizmalar bulunmalı.
- En az iki güçlü, klinik olarak yakın seçenek ve klinik karar sorularında mümkünse bir önce/sonra algoritma basamağı tuzağı olsun.
- Tetkik sonucunda doğru tanı/cevap cümle olarak yazılmasın.
- Tetkik yorumu “... tanısını doğrular”, “... ile uyumludur”, “kesin tanıdır” gibi direkt tanı dili kullanmasın.
- Sayısal laboratuvar/tetkik sonucu internal findings.rows içinde verilecekse şu formatı kullan: ["parameter_label", "result_with_unit", "reference_or_expected", "status"].
- Stem veya compactObjectiveData içinde referans aralığı yazma; yalnız klinik karar için gerekli olan değer ve birimi ver.
- compactObjectiveData içinde doğru cevabı açıkça adlandıran etken/tanı/tedavi etiketi kullanma; cevap öncesi panel objektif veri verir, yorumu feedbacke bırakır.
- Birimsiz, belirsiz veya yalnız 'yüksek/düşük/pozitif' biçiminde kalan sonuç yazma; objektif veri gerekiyorsa değer, birim ve nitelik net olsun. Nitel sonuç kaçınılmazsa label belirsiz kalmayacak kadar açıklayıcı, value ise kısa olmalıdır.
- Nitel sonuçlarda referans “negatif”, “üreme olmamalı”, “saptanmamalı” veya “normal iletim” gibi beklenen değerle yazılmalıdır.
- Doğru cevap, verilen objektif veriler yorumlanarak bulunmalı.
- Her yanlış seçenek için kısa ama öğretici feedback yaz; seçenek hangi durumda doğru olabilir, bu olguda hangi ayırt ettirici ipucuyla elenir açık olsun.
- explanation 2-4 cümlelik Klinik Gerekçe kalitesinde olmalı; doğru cevabı gereksiz biçimde tekrar tekrar adlandırma.
- evidenceChain 3-5 somut olgu ipucundan oluşmalı; meta cümle veya öğrenme çıktısı yazma.
- examPearl tek bir kısa Sınav notu olmalı; Klinik Gerekçe cümlesini kopyalama. Bir kırmızı bayrak, sık tuzak, ilk adım veya ayırt ettirici marker ver; 1-2 cümleyi aşma.
- AI hap bilgi veya pearl üretiminde normal kart tipinde şu ifadeler kesin yasaktır: "sorusunda", "bu soruda", "soru kökünde", "doğru cevaba götüren", "doğru cevabı destekleyen", "doğru şık", "yanlış şık", "seçeneklerde", "şıklarda", "kaynak soruda", "cevap anahtarı". Kaynak soru gerçekten gösterilmiyorsa bunları aktif hatırlama diline çevir: "TUS’ta", "klinik tabloda", "bu patern için", "ayırt ettirici bulgu".
- keyWords/keywords en fazla 3 kısa chip değerinde olmalı; aynı kavramı tekrar etme. 'IM önerisi', 'Epinefrin 0.3 mg', '3 mg', uzun cümle veya Klinik Gerekçe ile aynı metni chip olarak yazma.
- Klinik gerekçe, sınav notu, kanıt zinciri ve seçenek feedbackleri ayrı işlev görmeli; aynı cümle veya aynı bilgi blokları farklı alanlarda tekrar edilmemeli.
- managementSteps 2-4 kısa ilk yaklaşım/yönetim basamağı içermeli; temel bilim sorusunda mekanistik yaklaşım notu gibi yaz.
- Acil yönetim sorularında bağlamı ayır; tek ilaç, ilk yaklaşım, stabilizasyon, destek tedavisi ve sonraki basamak aynı şeymiş gibi yazılmamalıdır.
- Yönetim sorusunda doğru cevap tek bir müdahale değilse seçenek, gerçek ilk yaklaşım paketini kapsamalıdır; soru tek müdahaleyi soruyorsa kök bunu açıkça sınırlandırmalıdır.
- Fizik muayeneye laboratuvar, EKG, görüntüleme, seroloji veya kan gazı sonucu yazma; muayene yalnız inspeksiyon, palpasyon, perküsyon ve oskültasyon bulgularından oluşsun.
- Gereksiz İngilizce, bozuk kısaltma, yanlış birim boşluğu veya tekrarlı eş anlamlı kullanım yazma; Türkçe tıbbi terminoloji ve ölçüm formatı standart olmalıdır.
- Hasta öyküsü doğal cümle olmalı; 'Nedeniyle Ameliyathane', 'Ameliyathane.' gibi kopuk parçalar yazma.
- Şu ifadeleri asla yazma: "Beklenen ana ipuçları bu tabloda baskın değildir", "Karar ... yönünde güçlenir", "Ancak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır", "Laboratuvar paterni", "Kanıt 2", "Kanıt 3", "Kanıt 4", "Objektif bulguların karar basamağını desteklemesi", "Doğru yanıta götüren ana bulgudur", "İlk karar", "Tedavi önceliği", "Bu veri klinik bağlamda değerlendirilir", "Nedeniyle Ameliyathane", "Morfolojik patern:", "Morfolojik patern. Morfolojik patern", "karar verdirici paternyla", "likefaksiyon nekrozuyla", "kısa TUS pratiğinde ele alınır", "Klinik değerlendirme için ek veri", "Objektif karar verisi", "verilen öğrenme hedefi", "yanıt ekseni".
- Temel bilim/mekanizma sorusunda gerçek objektif veri yoksa findings.investigations boş dizi olsun; "Laboratuvar" placeholder kartı üretme.
- Patoloji sorularında teori cümlesini laboratuvar sonucu gibi gösterme. Gerekirse yalnız histopatolojik değerlendirme kullan.
- Ayırt ettirici ipuçları ve evidenceChain madde metinlerinde "Etiket: açıklama" yapısı kullanma; doğrudan doğal cümle yaz.
- JSON şemasındaki tüm alanları doldur. source her zaman "real-ai", caseType her zaman "ai-spot" olsun.
- High-risk durumlarda doğru cevap algoritmik öncelikle kilitlenmelidir; doğru ama sonraki basamak olan seçenek ilk tedavi yapılamaz.
- JSON değerlerini kısa tut: stem 2-4 doğal TUS soru cümlesi veya en fazla 2 kısa paragraf hissi veren tek metin olmalı; explanation 2-4 cümle, her feedback en fazla 1-2 cümle, evidenceChain 3-4 madde, managementSteps 2-3 madde.
- JSON string değerlerinin içinde kaçışsız çift tırnak kullanma. Gerekirse tek tırnak veya parantez kullan.
- JSON çıktısını yarıda kesme; son karakter mutlaka kapanış süslü parantezi olsun.
- Şu zayıf sınav dili ifadeleri hiçbir alanda kullanılmaz: ${TUS_FORBIDDEN_EXPRESSION_LIST.join(', ')}.
- wrongOptionFeedback içinde A, B, C, D, E anahtarlarının tamamı bulunsun; doğru seçenek için de kısa doğru gerekçesi yazabilirsin.`;
}

async function sendOpenAIRequest({ baseUrl, apiKey, path, body }) {
  const timeoutMs = Number(process.env.OPENAI_PER_REQUEST_TIMEOUT_MS || 28000);
  const { signal, cancel } = createAbortSignal(timeoutMs);
  try {
    const openAIResponse = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      signal,
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      const error = new Error(`OpenAI request failed with ${openAIResponse.status}: ${errorText.slice(0, 800)}`);
      error.status = openAIResponse.status;
      error.raw = errorText;
      throw error;
    }

    return openAIResponse.json();
  } catch (error) {
    if (error?.name === 'AbortError') {
      const timeoutError = new Error(`OpenAI request timed out after ${timeoutMs} ms`);
      timeoutError.status = 504;
      throw timeoutError;
    }
    throw error;
  } finally {
    cancel();
  }
}

async function callOpenAIQuestion(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = getEnvModel('OPENAI_MODEL', 'DEFAULT_GENERATOR_MODEL') || 'gpt-4o-mini';
  const baseUrl = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const maxOutputTokens = Number(process.env.OPENAI_MAX_OUTPUT_TOKENS || 2600);
  const systemPrompt = 'You are a senior Turkish TUS exam item writer and clinical editor for KlinikIQ. Return exactly one medically accurate Turkish question as valid JSON. Do not include Markdown or commentary outside JSON.';
  const errors = [];

  const responsesStrictBody = {
    model,
    input: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'klinikiq_ai_spot_question',
        strict: true,
        schema: AI_QUESTION_JSON_SCHEMA,
      },
    },
    max_output_tokens: maxOutputTokens,
    store: false,
  };

  const responsesJsonObjectBody = {
    model,
    input: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `${prompt}\n\n${getJsonContractPrompt()}` },
    ],
    text: { format: { type: 'json_object' } },
    max_output_tokens: maxOutputTokens,
    store: false,
  };

  const chatStrictBody = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'klinikiq_ai_spot_question',
        strict: true,
        schema: AI_QUESTION_JSON_SCHEMA,
      },
    },
    max_completion_tokens: maxOutputTokens,
  };

  const chatJsonObjectBody = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `${prompt}\n\n${getJsonContractPrompt()}` },
    ],
    response_format: { type: 'json_object' },
    max_completion_tokens: maxOutputTokens,
  };

  if (process.env.OPENAI_TEMPERATURE) {
    const temperature = Number(process.env.OPENAI_TEMPERATURE);
    responsesStrictBody.temperature = temperature;
    responsesJsonObjectBody.temperature = temperature;
    chatStrictBody.temperature = temperature;
    chatJsonObjectBody.temperature = temperature;
  }
  if (process.env.OPENAI_TOP_P) {
    const topP = Number(process.env.OPENAI_TOP_P);
    responsesStrictBody.top_p = topP;
    responsesJsonObjectBody.top_p = topP;
    chatStrictBody.top_p = topP;
    chatJsonObjectBody.top_p = topP;
  }

  const attempts = [
    { label: 'responses-json-schema', path: '/responses', body: responsesStrictBody, extractor: extractOpenAIText },
    { label: 'responses-json-object', path: '/responses', body: responsesJsonObjectBody, extractor: extractOpenAIText },
    { label: 'chat-json-schema', path: '/chat/completions', body: chatStrictBody, extractor: (data) => extractChatCompletionText(data, 'OpenAI chat completions') },
    { label: 'chat-json-object', path: '/chat/completions', body: chatJsonObjectBody, extractor: (data) => extractChatCompletionText(data, 'OpenAI chat completions') },
  ];

  for (const attempt of attempts) {
    try {
      const data = await sendOpenAIRequest({ baseUrl, apiKey, path: attempt.path, body: attempt.body });
      const modelText = attempt.extractor(data);
      const question = extractJsonFromText(modelText);
      question.id = `ai-spot-real-openai-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      question.source = 'real-ai';
      question.provider = 'openai';
      question.openAIModel = data?.model || model;
      question.openAIMode = attempt.label;
      return question;
    } catch (error) {
      errors.push(`${attempt.label}: ${summarizeProviderError(error)}`);
      const status = Number(error?.status || 0);
      if ([401, 403, 404, 429, 504].includes(status)) break;
    }
  }

  const error = new Error(`OpenAI failed after ${attempts.length} attempt(s): ${errors.join(' || ')}`);
  error.status = 502;
  throw error;
}


function uniqueNonEmpty(items = []) {
  return Array.from(new Set(items.map((item) => String(item || '').trim()).filter(Boolean)));
}

function isOpenRouterFreeMode() {
  return parseBooleanEnv('OPENROUTER_FREE_MODEL_MODE', true);
}

function isBlockedSlowOpenRouterModel(model = '') {
  const value = String(model || '').trim().toLowerCase();
  if (!value) return false;

  const allowSlowModels = parseBooleanEnv('OPENROUTER_ALLOW_SLOW_MODELS', false);
  if (allowSlowModels) return false;

  // Free workflow intentionally uses OpenRouter :free models. Do not block them in free mode.
  if (isOpenRouterFreeMode() && value.includes(':free')) return false;

  const explicitBlockList = uniqueNonEmpty([
    ...parseCsvEnv('OPENROUTER_BLOCKED_MODELS'),
    'openai/gpt-oss-120b:free',
    'gpt-oss-120b',
  ]).map((item) => item.toLowerCase());

  return explicitBlockList.some((blocked) => value === blocked || value.includes(blocked));
}

function getOpenRouterModelCandidates() {
  const freeDefault = 'openai/gpt-oss-120b:free';
  const paidFastDefault = getEnvModel('DEFAULT_GENERATOR_MODEL', 'CHEAP_DRAFT_MODEL') || 'google/gemini-2.5-flash-lite';
  const defaultModel = isOpenRouterFreeMode() ? (getEnvModel('CHEAP_DRAFT_MODEL') || freeDefault) : paidFastDefault;
  const primary = getEnvModel('OPENROUTER_MODEL', 'DEFAULT_GENERATOR_MODEL', 'CHEAP_DRAFT_MODEL') || defaultModel;
  const configured = [
    ...parseCsvEnv('OPENROUTER_MODELS'),
    ...parseCsvEnv('OPENROUTER_FALLBACK_MODELS'),
  ];

  const candidates = uniqueNonEmpty([primary, ...configured, defaultModel])
    .filter((model) => !isBlockedSlowOpenRouterModel(model));

  const safeCandidates = candidates.length ? candidates : [defaultModel];
  const maxAttempts = Math.max(1, Number(process.env.OPENROUTER_MAX_MODEL_ATTEMPTS || 1));
  return safeCandidates.slice(0, maxAttempts);
}

function createAbortSignal(timeoutMs) {
  if (!timeoutMs || timeoutMs <= 0 || typeof AbortController === 'undefined') {
    return { signal: undefined, cancel: () => {} };
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    cancel: () => clearTimeout(timeoutId),
  };
}

function summarizeProviderError(error) {
  const message = String(error?.message || error || 'unknown error').replace(/\s+/g, ' ').trim();
  return message.slice(0, 420);
}


function parseAffordableTokenLimit(text = '') {
  const match = String(text || '').match(/can only afford\s+(\d+)/i);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function shortText(value = '', fallback = '', limit = 180) {
  const maxLength = Math.max(40, Number(limit) || 180);
  const text = String(value || fallback || '').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength).replace(/\s+\S*$/u, '').replace(/[,:;–—\-\s]+$/u, '').trim();
  return /[.!?]$/u.test(cut) ? cut : `${cut}.`;
}

function inferChiefComplaint(question = {}) {
  return shortText(question.chiefComplaint || question.chief || question.title || question.learningTarget, 'Klinik karar sorusu');
}

function normalizeOptionObjects(options = []) {
  const raw = Array.isArray(options) ? options : [];
  const optionTexts = raw.map((item) => {
    if (typeof item === 'string') return item;
    return item?.text || item?.label || '';
  });
  while (optionTexts.length < 5) optionTexts.push(`Seçenek ${OPTION_IDS[optionTexts.length]}`);
  return OPTION_IDS.map((id, index) => ({ id, text: shortText(optionTexts[index], `Seçenek ${id}`) }));
}

function ensureEvidenceChain(question = {}) {
  const existing = Array.isArray(question.evidenceChain) ? question.evidenceChain : [];
  const clues = [
    ...existing,
    ...(Array.isArray(question.keyClues) ? question.keyClues : []),
    ...(Array.isArray(question?.findings?.history) ? question.findings.history : []),
    ...(Array.isArray(question?.findings?.exam) ? question.findings.exam : []),
  ].map((item) => shortText(item)).filter(Boolean);

  const stem = shortText(question.stem, 'Olgu kökü doğru yanıta götüren temel klinik bağlamı verir.');
  const explanation = shortText(question.explanation, 'Uygun yanıt, öykü ve objektif bulguların birlikte yorumlanmasıyla seçilir.');
  const fallback = [stem, explanation, shortText(question.learningTarget, 'Soru tek bir TUS öğrenme hedefine odaklanır.')];
  return uniqueNonEmpty([...clues, ...fallback]).slice(0, 4).concat(fallback).slice(0, 3);
}

function ensureWrongOptionFeedback(question = {}) {
  const options = normalizeOptionObjects(question.options);
  const correctAnswer = OPTION_IDS.includes(String(question.correctAnswer || '').toUpperCase())
    ? String(question.correctAnswer || '').toUpperCase()
    : 'A';
  const existing = question.wrongOptionFeedback && typeof question.wrongOptionFeedback === 'object' ? question.wrongOptionFeedback : {};
  const correctText = options.find((option) => option.id === correctAnswer)?.text || 'doğru seçenek';
  return Object.fromEntries(options.map((option) => {
    const current = shortText(existing[option.id]);
    if (current) return [option.id, current];
    if (option.id === correctAnswer) return [option.id, `Doğru. Olgudaki ana ipuçları ${correctText} seçeneğini destekler.`];
    return [option.id, `${option.text} bazı benzer bulgularla karışabilir; ancak olgudaki ayırt ettirici ipuçları uygun seçeneği daha güçlü destekler.`];
  }));
}

function completeRemoteQuestion(question = {}, context = {}) {
  question = standardizeRemoteQuestionText(question);
  const now = Date.now();
  const options = normalizeOptionObjects(question.options || question.o);
  const correctAnswer = OPTION_IDS.includes(String(question.correctAnswer || question.c || '').toUpperCase())
    ? String(question.correctAnswer || question.c || '').toUpperCase()
    : 'A';
  const findings = question.findings && typeof question.findings === 'object' ? question.findings : {};
  const completed = {
    ...question,
    id: question.id || `ai-spot-real-remote-${now}-${Math.random().toString(36).slice(2, 8)}`,
    source: 'real-ai',
    caseType: 'ai-spot',
    title: shortText(question.title || question.t, 'Yeni TUS Spot Olgu'),
    relatedBranch: shortText(question.relatedBranch || question.b || context.branchFilter || 'TUS Spot Olgular'),
    difficulty: shortText(question.difficulty, 'medium'),
    learningTarget: shortText(question.learningTarget || question.lt, question.title || question.t || 'Klinik karar verme'),
    answerTarget: ANSWER_TARGETS.includes(String(question.answerTarget || '').trim()) ? String(question.answerTarget).trim() : inferAnswerTarget({ ...question, options, correctAnswer, question: question.question || question.q }),
    demographics: shortText(question.demographics || question.d, 'Hasta'),
    setting: shortText(question.setting, 'Klinik değerlendirme'),
    chiefComplaint: inferChiefComplaint(question),
    stem: shortText(question.narrativeStem || question.stem || question.s, 'Kısa klinik olgu verileri aynı kategorideki seçenekler arasında karar vermeyi gerektirir.', 900),
    narrativeStem: shortText(question.narrativeStem || question.stem || question.s, 'Kısa klinik olgu verileri aynı kategorideki seçenekler arasında karar vermeyi gerektirir.', 900),
    compactVitals: Array.isArray(question.compactVitals || question.cv) ? (question.compactVitals || question.cv).slice(0, 5) : [],
    compactObjectiveData: Array.isArray(question.compactObjectiveData || question.co) ? (question.compactObjectiveData || question.co).slice(0, 10) : [],
    stemMode: 'narrative',
    findings: {
      history: Array.isArray(findings.history) ? findings.history.map(shortText).filter(Boolean).slice(0, 4) : [],
      exam: Array.isArray(findings.exam) ? findings.exam.map(shortText).filter(Boolean).slice(0, 3) : [],
      vitals: {
        TA: findings?.vitals?.TA || 'Stabil',
        'Nabız': findings?.vitals?.['Nabız'] || 'Normal aralıkta',
        Solunum: findings?.vitals?.Solunum || 'Normal aralıkta',
        'Ateş': findings?.vitals?.['Ateş'] || 'Afebril',
        'SpO₂': findings?.vitals?.['SpO₂'] || 'Normal',
      },
      investigations: Array.isArray(findings.investigations) ? findings.investigations : [],
    },
    question: shortText(question.question || question.q, 'Bu olguda en uygun seçenek hangisidir?'),
    options,
    correctAnswer,
    explanation: shortText(question.explanation || question.e, 'Uygun yanıt, olgudaki klinik ipuçlarının birlikte yorumlanmasıyla seçilir.'),
    evidenceChain: ensureEvidenceChain(question),
    examPearl: shortText(question.examPearl || question.p, 'TUS sorularında ayırt ettirici ipucu, benzer seçenekler arasında en uygun yanıtı belirler.'),
    managementSteps: Array.isArray(question.managementSteps) && question.managementSteps.length
      ? question.managementSteps.map(shortText).filter(Boolean).slice(0, 3)
      : ['Acil bulgu varsa önce stabilizasyon sağlanır.', 'Seçenekler olgudaki objektif verilerle karşılaştırılır.'],
    nextQuestionSeed: shortText(question.nextQuestionSeed, `${now}-${Math.random().toString(36).slice(2, 10)}`),
  };
  completed.optionClinicalRoles = { ...deriveOptionClinicalRoles(completed), ...(question.optionClinicalRoles || {}) };
  completed.wrongOptionFeedback = ensureWrongOptionFeedback(completed);
  return completed;
}

function expandCompactQuestion(compact = {}, context = {}, providerMeta = {}) {
  const options = Array.isArray(compact.o) ? compact.o : compact.options;
  const expanded = completeRemoteQuestion({
    title: compact.t || compact.title,
    relatedBranch: compact.b || compact.relatedBranch || context.branchFilter,
    learningTarget: compact.lt || compact.learningTarget,
    demographics: compact.d || compact.demographics,
    stem: compact.s || compact.stem,
    question: compact.q || compact.question,
    options,
    correctAnswer: compact.c || compact.correctAnswer,
    explanation: compact.e || compact.explanation,
    keyClues: compact.k || compact.keyClues,
    evidenceChain: compact.k || compact.evidenceChain,
    examPearl: compact.p || compact.examPearl,
    answerTarget: compact.answerTarget,
    optionClinicalRoles: compact.optionClinicalRoles,
    chiefComplaint: compact.cc || compact.chiefComplaint,
    compactVitals: compact.cv || compact.compactVitals,
    compactObjectiveData: compact.co || compact.compactObjectiveData,
  }, context);
  expanded.remoteCompactMode = true;
  Object.assign(expanded, providerMeta);
  return expanded;
}

function buildCompactOpenRouterPrompt(originalPrompt = '', context = {}) {
  const branch = context?.branchFilter || 'TUS Spot Olgular';
  const recent = Array.isArray(context?.recentQuestionSummaries)
    ? context.recentQuestionSummaries.slice(0, 10).map((item) => [item.topic || item.title, item.correct, item.questionType].filter(Boolean).join(' / ')).filter(Boolean).join('; ')
    : '';
  const selectedTopic = context?.selectedTopic || context?.selectedSubtopic || 'farklı yeni klinik konu';
  const questionType = context?.questionType || 'farklı soru tipi';
  const seed = context?.seed || Date.now();

  if (isOpenRouterFreeMode()) {
    return `KlinikIQ için Türkçe, ÖSYM/TUS diline yakın tek klinik spot soru üret. Branş: ${branch}. Seçilecek konu: ${selectedTopic}. Soru tipi: ${questionType}. Seed: ${seed}. Yakın tekrar etme: ${recent || 'yok'}.

Sadece şu kısa JSON objesini döndür:
{
  "t":"cevabı ele vermeyen nötr başlık",
  "b":"istenen branş",
  "lt":"tek ölçme hedefi",
  "d":"yaş-cinsiyet bağlamı",
  "s":"3-6 cümlelik gerçek TUS soru kökü; soru cümlesi burada tekrar edilmez",
  "cv":[{"label":"vital_label","value":"vital_value"}],
  "co":[{"label":"objective_data_label","value":"objective_data_value"}],
  "q":"tek ve daraltılmış soru cümlesi",
  "o":["A seçeneği","B seçeneği","C seçeneği","D seçeneği","E seçeneği"],
  "c":"A",
  "e":"2-3 cümle klinik gerekçe",
  "k":["somut ipucu","somut ipucu","somut ipucu"],
  "p":"1 kısa TUS notu"
}

Bu iskelet örnek klinik içerik değildir; hiçbir değerini kopyalama. Kurallar: JSON dışında yazma. Akademik klinik Türkçe kullan; stem demografi→şikâyet/süre→öykü→FM→objektif veri→karar mantığını izlesin. High-risk ilk tedavi sorularında algoritmik önceliği kilitle. Verilen seçilecek konuya uy. Yakındaki konu/doğru cevap/şık setini tekrar etme. Yalnız şık sırası değişikliği yapma. s alanı gerçek TUS soru kökü gibi 3-6 cümle olmalı; gereksiz vital seti verme, referans aralıklarını s içine yığma. Vital veya lab sayıları kritikse cv/co alanlarını kısa label/value olarak doldur, ama cv/co boş kalabilir. Gerekli kültür/muayene/görüntüleme verilerini doğal metne yedir. Başlıkta ve s içinde doğru cevabı açık etme. Profil/Risk bağlamı/Ayırt ettirici ipuçları gibi başlıklar yazma. Seçenekler aynı kavramsal kategoriden olsun; hepsi/hiçbiri kullanma. Doğru yanıt c alanındaki A-E harfiyle eşleşsin. e klinik gerekçe, p ise tek kısa sınav notu gibi yazılsın; e ve p aynı cümleyi kopyalamasın. k dizisi en fazla 3 kısa chip değerinde ipucu içersin; 'IM önerisi', uzun cümle veya tekrar chip yazma. Tıbbi olarak hatalı bilgi yazma. Çift tırnakları metin içinde kullanma. Maksimum 650 token.`;
  }

  return `${originalPrompt}

DÜŞÜK TOKEN MODU: Tam şema üretme. Yalnızca şu KISA JSON objesini döndür ve her stringi çok kısa tut:
{"t":"nötr başlık","b":"branş","lt":"tek hedef","d":"demografi","s":"3-6 cümle TUS kökü","cv":[],"co":[],"q":"daraltılmış soru","o":["A","B","C","D","E"],"c":"A","e":"gerekçe","k":["ipucu","ipucu","ipucu"],"p":"not"}
JSON dışında tek karakter yazma. Çift tırnakları metin içinde kullanma. En fazla 300 token.`;
}

async function callOpenRouterQuestion(prompt, context = {}) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  const baseUrl = (process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1').replace(/\/$/, '');
  const maxTokens = Number(process.env.OPENROUTER_MAX_TOKENS || process.env.OPENROUTER_MAX_OUTPUT_TOKENS || (isOpenRouterFreeMode() ? 850 : 900));
  const temperature = Number(process.env.OPENROUTER_TEMPERATURE || 0.82);
  const topP = Number(process.env.OPENROUTER_TOP_P || 0.92);
  const frequencyPenalty = Number(process.env.OPENROUTER_FREQUENCY_PENALTY || 0.25);
  const presencePenalty = Number(process.env.OPENROUTER_PRESENCE_PENALTY || 0.2);
  const useJsonMode = parseBooleanEnv('OPENROUTER_USE_JSON_MODE', true);
  const enableReasoning = parseBooleanEnv('OPENROUTER_REASONING_ENABLED', false);
  const excludeReasoning = parseBooleanEnv('OPENROUTER_REASONING_EXCLUDE', true);
  const perModelTimeoutMs = Number(process.env.OPENROUTER_PER_MODEL_TIMEOUT_MS || (isOpenRouterFreeMode() ? 52000 : 16000));
  const modelCandidates = getOpenRouterModelCandidates();
  const systemPrompt = [
    'You are a senior Turkish TUS exam item writer, clinical editor, and medical terminology reviewer for KlinikIQ.',
    'Return exactly one complete valid JSON object. Do not use Markdown. Do not include commentary outside JSON.',
    'Keep strings concise. Do not reveal chain-of-thought or reasoning. Put only final educational content into JSON fields.',
  ].join(' ');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  const referer = process.env.OPENROUTER_SITE_URL || process.env.SITE_URL || process.env.VERCEL_URL;
  const title = process.env.OPENROUTER_APP_TITLE || 'KlinikIQ';
  if (referer) headers['HTTP-Referer'] = String(referer).startsWith('http') ? String(referer) : `https://${referer}`;
  if (title) headers['X-OpenRouter-Title'] = title;

  function buildOpenRouterBody(model, overrides = {}) {
    const body = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `${prompt}\n\n${getJsonContractPrompt()}` },
      ],
      temperature,
      top_p: topP,
      max_tokens: maxTokens,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
      ...overrides,
    };

    if (useJsonMode && overrides.response_format !== null) body.response_format = { type: 'json_object' };
    if (enableReasoning) body.reasoning = { enabled: true, exclude: excludeReasoning };
    if (overrides.response_format === null) delete body.response_format;
    return body;
  }

  async function sendOpenRouterRequest(body) {
    const { signal, cancel } = createAbortSignal(perModelTimeoutMs);
    try {
      const openRouterResponse = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal,
      });

      if (!openRouterResponse.ok) {
        const errorText = await openRouterResponse.text();
        const error = new Error(`OpenRouter request failed with ${openRouterResponse.status}: ${errorText.slice(0, 500)}`);
        error.status = openRouterResponse.status;
        error.raw = errorText;
        throw error;
      }

      return openRouterResponse.json();
    } catch (error) {
      if (error?.name === 'AbortError') {
        const timeoutError = new Error(`OpenRouter model timed out after ${perModelTimeoutMs} ms`);
        timeoutError.status = 504;
        throw timeoutError;
      }
      throw error;
    } finally {
      cancel();
    }
  }

  async function repairMalformedOpenRouterJson(rawText, parseError, repairModel) {
    if (!parseBooleanEnv('OPENROUTER_REPAIR_JSON_ON_PARSE_ERROR', true)) throw parseError;

    const candidate = getJsonCandidateFromText(rawText).slice(0, 18000);
    const selectedRepairModel = getEnvModel('JSON_REPAIR_MODEL', 'OPENROUTER_REPAIR_MODEL') || repairModel;
    const repairMaxTokens = Number(process.env.OPENROUTER_REPAIR_MAX_TOKENS || 2600);
    const repairBody = {
      model: selectedRepairModel,
      messages: [
        {
          role: 'system',
          content: 'You repair malformed JSON for a Turkish medical exam app. Return only one complete valid JSON object. Do not add Markdown or commentary.',
        },
        {
          role: 'user',
          content: [
            'Aşağıdaki model çıktısı JSON parse hatası verdi. İçeriği değiştirmeden, eksik kaçışları/kapanışları düzelterek KlinikIQ kontratına uygun tek geçerli JSON objesi döndür.',
            `Parse hatası: ${summarizeJsonParseError(parseError)}`,
            getJsonContractPrompt(),
            'Bozuk JSON metni:',
            candidate,
          ].join('\n\n'),
        },
      ],
      temperature: 0,
      top_p: 0.2,
      max_tokens: repairMaxTokens,
    };

    if (useJsonMode) repairBody.response_format = { type: 'json_object' };
    const repairData = await sendOpenRouterRequest(repairBody);
    return extractChatCompletionText(repairData, 'OpenRouter JSON repair');
  }


  async function requestCompactQuestion(model, error) {
    if (!parseBooleanEnv('OPENROUTER_COMPACT_ON_402', true)) throw error;
    const affordable = parseAffordableTokenLimit(error?.raw || error?.message || '');
    const configuredCompactMaxTokens = Number(process.env.OPENROUTER_COMPACT_MAX_TOKENS || (isOpenRouterFreeMode() ? 750 : 320));
    const compactMaxTokens = Math.max(220, affordable ? Math.min(configuredCompactMaxTokens, affordable) : configuredCompactMaxTokens);
    const compactBody = {
      model,
      messages: [
        { role: 'system', content: 'Return only one tiny valid JSON object for a Turkish medical exam question. No Markdown. No reasoning text.' },
        { role: 'user', content: buildCompactOpenRouterPrompt(prompt, context) },
      ],
      temperature: Math.max(0.72, Math.min(temperature, 0.88)),
      top_p: Math.max(0.86, Math.min(topP, 0.95)),
      max_tokens: compactMaxTokens,
    };
    if (useJsonMode) compactBody.response_format = { type: 'json_object' };
    const data = await sendOpenRouterRequest(compactBody);
    const modelText = extractChatCompletionText(data, 'OpenRouter compact');
    const compactJson = extractJsonFromText(modelText);
    return expandCompactQuestion(compactJson, context, {
      id: `ai-spot-real-openrouter-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      provider: 'openrouter',
      openRouterModel: data?.model || model,
      openRouterCompactMaxTokens: compactMaxTokens,
    });
  }

  const errors = [];

  for (const [index, model] of modelCandidates.entries()) {
    const modelTemperature = index === 0 ? temperature : Math.min(temperature, 0.45);
    const forceCompactForFreeModel = isOpenRouterFreeMode() || String(model || '').includes(':free');

    if (forceCompactForFreeModel) {
      try {
        return await requestCompactQuestion(model, {});
      } catch (compactError) {
        errors.push(`${model} compact-first: ${summarizeProviderError(compactError)}`);
      }
    }

    const primaryBody = buildOpenRouterBody(model, { temperature: modelTemperature });

    const bodiesToTry = [primaryBody];
    if (useJsonMode) bodiesToTry.push(buildOpenRouterBody(model, { temperature: modelTemperature, response_format: null }));

    for (const body of bodiesToTry) {
      try {
        const data = await sendOpenRouterRequest(body);
        const modelText = extractChatCompletionText(data, 'OpenRouter');
        let question;
        let repairedMalformedJson = false;
        try {
          question = extractJsonFromText(modelText);
        } catch (parseError) {
          const repairedText = await repairMalformedOpenRouterJson(modelText, parseError, model);
          question = extractJsonFromText(repairedText);
          repairedMalformedJson = true;
        }
        question.id = `ai-spot-real-openrouter-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        question.source = 'real-ai';
        question.provider = 'openrouter';
        question.openRouterModel = data?.model || model;
        question.openRouterAttempt = index + 1;
        if (repairedMalformedJson) question.remoteRepairUsed = true;
        return question;
      } catch (error) {
        if (Number(error?.status) === 402) {
          try {
            return await requestCompactQuestion(model, error);
          } catch (compactError) {
            errors.push(`${model} compact: ${summarizeProviderError(compactError)}`);
          }
        }
        errors.push(`${model}: ${summarizeProviderError(error)}`);
        const isJsonModeCompatibilityError = error?.status === 400 && /response_format|json_schema|json_object|structured/i.test(error?.raw || error?.message || '');
        if (!isJsonModeCompatibilityError && error?.status && [401, 403].includes(Number(error.status))) {
          break;
        }
      }
    }
  }

  const error = new Error(`OpenRouter failed after ${modelCandidates.length} model attempt(s): ${errors.join(' || ')}`);
  error.status = 502;
  throw error;
}

async function callGeminiQuestion(prompt) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) return null;

  const model = getEnvModel('GEMINI_MODEL', 'DEFAULT_GENERATOR_MODEL', 'CHEAP_DRAFT_MODEL') || 'gemini-1.5-flash';
  const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      generationConfig: {
        temperature: 0.92,
        topP: 0.92,
        maxOutputTokens: 2400,
        responseMimeType: 'application/json',
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!geminiResponse.ok) {
    const errorText = await geminiResponse.text();
    const error = new Error(`Gemini request failed with ${geminiResponse.status}: ${errorText.slice(0, 500)}`);
    error.status = geminiResponse.status;
    throw error;
  }

  const data = await geminiResponse.json();
  const modelText = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('\n') || '';
  const question = extractJsonFromText(modelText);
  question.id = `ai-spot-real-gemini-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  question.source = 'real-ai';
  question.provider = 'gemini';
  return question;
}

function selectProviderStatus() {
  return {
    hasOpenRouter: Boolean(process.env.OPENROUTER_API_KEY),
    hasOpenAI: Boolean(process.env.OPENAI_API_KEY),
    hasGemini: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY),
  };
}

function buildProviderOrder(preferredProvider) {
  const explicitProvider = String(preferredProvider || process.env.AI_PROVIDER || '').trim().toLowerCase();
  const inferredProvider = process.env.OPENAI_API_KEY ? 'openai'
    : process.env.OPENROUTER_API_KEY ? 'openrouter'
      : (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) ? 'gemini'
        : 'openai';
  const preferred = explicitProvider || inferredProvider;
  const all = ['openai', 'openrouter', 'gemini'];
  if (!all.includes(preferred)) return all;
  return [preferred, ...all.filter((provider) => provider !== preferred)];
}

async function generateWithAvailableProvider(prompt, context = {}) {
  const providerStatus = selectProviderStatus();
  const providerOrder = buildProviderOrder(process.env.AI_PROVIDER);
  const errors = [];

  for (const provider of providerOrder) {
    try {
      if (provider === 'openrouter' && providerStatus.hasOpenRouter) return await callOpenRouterQuestion(prompt, context);
      if (provider === 'openai' && providerStatus.hasOpenAI) return await callOpenAIQuestion(prompt);
      if (provider === 'gemini' && providerStatus.hasGemini) return await callGeminiQuestion(prompt);
    } catch (error) {
      errors.push(`${provider}: ${error?.message || error}`);
    }
  }

  if (!providerStatus.hasOpenRouter && !providerStatus.hasOpenAI && !providerStatus.hasGemini) {
    const error = new Error('Missing server-side AI API key. Set OPENROUTER_API_KEY, OPENAI_API_KEY or GEMINI_API_KEY in the deployment environment.');
    error.status = 503;
    throw error;
  }

  const error = new Error(errors.join(' | ') || 'Remote AI providers failed');
  error.status = 502;
  throw error;
}



function buildServerLocalContext(context = {}, attempt = 0) {
  const recentQuestionSummaries = Array.isArray(context.recentQuestionSummaries) ? context.recentQuestionSummaries : [];
  const recentSignatures = Array.isArray(context.recentSignatures) ? context.recentSignatures : [];
  const recentIds = Array.isArray(context.recentIds) ? context.recentIds : [];
  return {
    ...context,
    recentIds: recentIds.slice(0, 120),
    recentSignatures: recentSignatures.slice(0, 220),
    recentQuestionSummaries: recentQuestionSummaries.slice(0, Math.max(10, 50 - attempt * 6)),
  };
}

function pickLocalGeneratedFallbackQuestion(context = {}, attemptErrors = []) {
  const branch = context.branchFilter || context.relatedBranch || context.branch || 'random';
  const attempts = Math.max(10, Number(process.env.AI_LOCAL_SERVER_FALLBACK_ATTEMPTS || 14));
  const errors = [];
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const localContext = buildServerLocalContext(context, attempt);
      const branchForAttempt = attempt >= Math.ceil(attempts * 0.7) ? 'random' : branch;
      const candidate = generateAIQuestion({
        previousQuestionId: context.previousQuestionId || null,
        branchFilter: branchForAttempt,
        context: localContext,
      });
      const question = completeRemoteQuestion({ ...candidate, id: candidate.id || `ai-spot-local-server-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }, context);
      const medicalGate = runServerMedicalQualityGate(question);
      const repaired = medicalGate.question;
      const rawValidation = validateRawQuestion(repaired);
      const editorialValidation = validateRemoteEditorialQuality(repaired);
      const diversityValidation = validateRemoteDiversity(repaired, context);
      if (medicalGate.ok && rawValidation.ok && editorialValidation.ok && diversityValidation.passed) {
        return {
          question: repaired,
          medicalGate,
          rawValidation,
          editorialValidation,
          diversityValidation,
          bypassedDiversity: false,
          localGeneratedFallback: true,
          attemptErrors: [...attemptErrors, ...errors].slice(-8),
        };
      }
      errors.push(`local fallback ${attempt + 1}: ${[
        medicalGate.ok ? '' : medicalGate.errors.slice(0, 2).join('; '),
        rawValidation.ok ? '' : rawValidation.errors.slice(0, 2).join('; '),
        editorialValidation.ok ? '' : editorialValidation.errors.slice(0, 2).join('; '),
        diversityValidation.passed ? '' : diversityValidation.reason,
      ].filter(Boolean).join(' | ')}`);
    } catch (error) {
      errors.push(`local fallback ${attempt + 1}: ${summarizeProviderError(error)}`);
    }
  }

  // Last-resort local generation must never reuse the static examples that were only intended as
  // emergency data. It deliberately uses a clean history window and then still runs the medical,
  // raw and editorial gates so cross-topic contamination cannot be rendered.
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      const relaxedContext = { recentIds: [], recentSignatures: [], recentQuestionSummaries: [] };
      const relaxedBranch = attempt < 3 ? branch : 'random';
      const candidate = generateAIQuestion({
        previousQuestionId: null,
        branchFilter: relaxedBranch,
        context: relaxedContext,
      });
      const question = completeRemoteQuestion({ ...candidate, id: candidate.id || `ai-spot-local-relaxed-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }, context);
      const medicalGate = runServerMedicalQualityGate(question);
      const repaired = medicalGate.question;
      const rawValidation = validateRawQuestion(repaired);
      const editorialValidation = validateRemoteEditorialQuality(repaired);
      if (medicalGate.ok && rawValidation.ok && editorialValidation.ok) {
        return {
          question: repaired,
          medicalGate,
          rawValidation,
          editorialValidation,
          diversityValidation: { passed: true, reason: 'relaxed-local-last-resort' },
          bypassedDiversity: false,
          localGeneratedFallback: true,
          relaxedLocalFallback: true,
          attemptErrors: [...attemptErrors, ...errors].slice(-8),
        };
      }
    } catch (error) {
      errors.push(`relaxed local fallback ${attempt + 1}: ${summarizeProviderError(error)}`);
    }
  }

  return null;
}

const SAFE_FALLBACK_QUESTION_POOL = [
  {
    title: 'EKG bulgusu olan elektrolit bozukluğu',
    relatedBranch: 'İç Hastalıkları',
    learningTarget: 'EKG bulgulu hiperkalemide ilk tedavi basamağı',
    demographics: '67 yaşında erkek hasta',
    setting: 'Acil servis',
    chiefComplaint: 'Halsizlik ve çarpıntı',
    stem: 'Kronik böbrek hastalığı olan 67 yaşında erkek hasta halsizlik, çarpıntı ve kas güçsüzlüğü nedeniyle acil servise başvuruyor. Son haftalarda potasyum tutucu diüretik kullandığı öğreniliyor. Monitörizasyon sırasında geniş QRS kompleksleri ve sivri T dalgaları izleniyor. Bilinci açık ancak belirgin kas güçsüzlüğü mevcut.',
    compactVitals: [{ label: 'TA', value: '108/64 mmHg' }, { label: 'Nabız', value: '104/dk' }],
    compactObjectiveData: [{ label: 'Serum K⁺', value: '6.8 mEq/L' }, { label: 'EKG', value: 'Sivri T dalgaları ve QRS genişlemesi' }],
    question: 'Bu hastada en uygun ilk tedavi seçeneği hangisidir?',
    options: [
      { id: 'A', text: 'İntravenöz kalsiyum glukonat uygulamak' },
      { id: 'B', text: 'İntravenöz insülin + glukoz başlamak' },
      { id: 'C', text: 'Nebül salbutamol uygulamak' },
      { id: 'D', text: 'Sodyum bikarbonat infüzyonu vermek' },
      { id: 'E', text: 'Acil hemodiyaliz planlamak' },
    ],
    correctAnswer: 'A',
    explanation: 'EKG değişikliği olan ciddi hiperkalemide ilk hedef kardiyak membranı stabilize etmektir. Bu nedenle ilk basamak intravenöz kalsiyum glukonattır; potasyumu hücre içine kaydıran tedaviler bundan sonra eklenir.',
    wrongOptionFeedback: {
      A: 'Doğru. EKG bulgulu ciddi hiperkalemide ilk basamak kardiyak membran stabilizasyonudur.',
      B: 'İntravenöz insülin + glukoz potasyumu hücre içine kaydırır; ancak EKG değişikliği varken kalsiyumdan sonra uygulanır.',
      C: 'Beta-agonist tedavi yardımcı olabilir; kardiyak membran stabilizasyonunun yerine geçmez.',
      D: 'Sodyum bikarbonat belirgin asidoz varsa yardımcıdır; bu tabloda ilk basamak değildir.',
      E: 'Hemodiyaliz potasyumu uzaklaştırır; fakat akut EKG değişikliğinde önce membran stabilize edilir.',
    },
    evidenceChain: ['Serum K⁺ düzeyinin 6.8 mEq/L olması', 'Sivri T dalgaları ve QRS genişlemesi', 'Potasyum tutucu diüretik kullanımı ve böbrek hastalığı öyküsü'],
    examPearl: 'Hiperkalemi + EKG değişikliği varsa ilk işlem intravenöz kalsiyumdur; insülin + glukoz sonraki potasyum kaydırıcı basamaktır.',
    managementSteps: ['Monitörizasyon ve damar yolu sağlanır.', 'İntravenöz kalsiyum glukonat uygulanır.', 'Ardından potasyumu düşüren ve uzaklaştıran tedaviler planlanır.'],
  },
  {
    title: 'Akut sistemik alerjik reaksiyon',
    relatedBranch: 'Acil Tıp',
    learningTarget: 'Anafilakside ilk hayat kurtarıcı tedavi',
    demographics: '24 yaşında kadın hasta',
    setting: 'Acil servis',
    chiefComplaint: 'Nefes darlığı ve yaygın döküntü',
    stem: 'Yirmi dört yaşında kadın hasta, arı sokmasından kısa süre sonra gelişen yaygın kaşıntılı döküntü ve nefes darlığı nedeniyle acil servise getiriliyor. Muayenede dudaklarda hafif şişlik, yaygın ürtiker ve hışıltılı solunum saptanıyor. Hasta huzursuz görünümde ve konuşurken zorlanıyor.',
    compactVitals: [{ label: 'TA', value: '82/48 mmHg' }, { label: 'SpO₂', value: '%91' }],
    compactObjectiveData: [],
    question: 'Bu hastada öncelikli hayat kurtarıcı tedavi hangisidir?',
    options: [
      { id: 'A', text: 'İntramüsküler adrenalin uygulamak' },
      { id: 'B', text: 'Oral antihistaminik vermek' },
      { id: 'C', text: 'İnhale kısa etkili bronkodilatör uygulamak' },
      { id: 'D', text: 'İntravenöz kortikosteroid başlamak' },
      { id: 'E', text: 'Gözlem altında yalnız oksijen vermek' },
    ],
    correctAnswer: 'A',
    explanation: 'Hipotansiyon, mukozal tutulum, ürtiker ve solunum bulguları sistemik ciddi alerjik reaksiyonu gösterir. Bu tabloda hayat kurtarıcı ilk tedavi intramüsküler adrenalindir; antihistaminik ve steroid destek tedavidir.',
    wrongOptionFeedback: {
      A: 'Doğru. Solunum bulgusu ve hipotansiyon varsa ilk ilaç intramüsküler adrenalindir.',
      B: 'Antihistaminikler kaşıntı ve ürtikeri azaltabilir; hipotansiyon ve bronkospazmı tek başına düzelten ilk tedavi değildir.',
      C: 'Bronkodilatör hışıltılı solunuma yardımcı olabilir; sistemik reaksiyonda adrenalin yerine geçmez.',
      D: 'Kortikosteroid geç faz bulgular için destek sağlar; akut hayat kurtarıcı ilk ilaç değildir.',
      E: 'Oksijen destekleyicidir; hipotansiyon ve hava yolu riski olan hastada tek başına yeterli değildir.',
    },
    evidenceChain: ['Arı sokması sonrası kısa sürede sistemik bulgu gelişmesi', 'Yaygın ürtiker ve dudak şişliği', 'Hipotansiyon ve hışıltılı solunum'],
    examPearl: 'Anafilakside ilk hayat kurtarıcı ilaç adrenalindir; antihistaminik ve steroid adrenalin yerine kullanılmaz.',
    managementSteps: ['İntramüsküler adrenalin uygulanır.', 'Hava yolu, oksijen ve damar yolu desteği sağlanır.', 'Kristaloid sıvı ve destek tedaviler klinik yanıta göre eklenir.'],
  },
  {
    title: 'Devam eden jeneralize nöbet',
    relatedBranch: 'Nöroloji',
    learningTarget: 'Status epileptikusta ilk ilaç basamağı',
    demographics: '36 yaşında erkek hasta',
    setting: 'Acil servis',
    chiefComplaint: 'Uzamış nöbet',
    stem: 'Otuz altı yaşında erkek hasta, yaklaşık 8 dakikadır süren jeneralize tonik-klonik nöbet nedeniyle acil servise getiriliyor. Yakınları bilinen epilepsi öyküsü olduğunu ve son günlerde ilaçlarını aksattığını belirtiyor. Hava yolu açıklığı değerlendirilirken nöbet aktivitesi devam ediyor.',
    compactVitals: [{ label: 'SpO₂', value: '%94' }, { label: 'Nabız', value: '118/dk' }],
    compactObjectiveData: [{ label: 'Kapiller glukoz', value: '96 mg/dL' }],
    question: 'Bu hastada en uygun ilk ilaç tedavisi hangisidir?',
    options: [
      { id: 'A', text: 'İntravenöz benzodiazepin uygulamak' },
      { id: 'B', text: 'Fenitoin yüklemesi yapmak' },
      { id: 'C', text: 'Levetirasetam yüklemesi yapmak' },
      { id: 'D', text: 'Valproat infüzyonu başlamak' },
      { id: 'E', text: 'Profilaktik antibiyotik başlamak' },
    ],
    correctAnswer: 'A',
    explanation: 'Beş dakikadan uzun süren jeneralize nöbet status epileptikus kabul edilir. İlk ilaç basamağı benzodiazepindir; ikinci basamak antiepileptik yükleme nöbet kontrolünden sonra gündeme gelir.',
    wrongOptionFeedback: {
      A: 'Doğru. Devam eden status epileptikusta ilk ilaç benzodiazepindir.',
      B: 'Fenitoin ikinci basamak yükleme seçeneklerinden biridir; benzodiazepinden önce verilmez.',
      C: 'Levetirasetam ikinci basamakta kullanılabilir; akut ilk basamak değildir.',
      D: 'Valproat bazı hastalarda yükleme için seçilebilir; ilk müdahale benzodiazepindir.',
      E: 'Antibiyotik yalnız enfeksiyon şüphesi varsa gerekir; devam eden nöbeti durdurmaz.',
    },
    evidenceChain: ['Nöbetin 8 dakikadır sürmesi', 'Jeneralize tonik-klonik nöbet aktivitesinin devam etmesi', 'Hipogliseminin dışlanmış olması'],
    examPearl: 'Status epileptikusta ilaç sırası benzodiazepin, ardından ikinci basamak antiepileptik yüklemedir.',
    managementSteps: ['ABC ve glukoz değerlendirilir.', 'İntravenöz benzodiazepin uygulanır.', 'Devam ederse ikinci basamak antiepileptik yükleme yapılır.'],
  },
  {
    title: 'Septik şokla başvuran hasta',
    relatedBranch: 'İç Hastalıkları',
    learningTarget: 'Septik şokta erken yaklaşım',
    demographics: '72 yaşında erkek hasta',
    setting: 'Acil servis',
    chiefComplaint: 'Ateş ve bilinç bulanıklığı',
    stem: 'Yetmiş iki yaşında erkek hasta, iki gündür süren ateş, öksürük ve giderek artan halsizlik nedeniyle acil servise getiriliyor. Muayenede konfüzyon, soğuk ekstremiteler ve sağ bazalde belirgin raller saptanıyor. Hasta son saatlerde belirgin olarak daha letarjik hale gelmiş.',
    compactVitals: [{ label: 'TA', value: '78/46 mmHg' }, { label: 'Ateş', value: '38.8 °C' }, { label: 'SpO₂', value: '%90' }],
    compactObjectiveData: [{ label: 'Laktat', value: '4.3 mmol/L' }, { label: 'Lökosit', value: '18.400/mm³' }],
    question: 'Bu hastada en uygun ilk yaklaşım hangisidir?',
    options: [
      { id: 'A', text: 'Geniş spektrumlu antibiyotik ve 30 mL/kg kristaloid başlamak' },
      { id: 'B', text: 'Yalnız ateş kontrolü ve oral sıvı önermek' },
      { id: 'C', text: 'Antibiyotik öncesi kesin kültür sonucunu beklemek' },
      { id: 'D', text: 'Sadece düşük doz steroid tedavisi başlamak' },
      { id: 'E', text: 'Rutin poliklinik kontrolü planlamak' },
    ],
    correctAnswer: 'A',
    explanation: 'Hipotansiyon, yüksek laktat ve enfeksiyon odağı septik şoku düşündürür. Erken yaklaşımda kültürler geciktirmeden alınır, geniş spektrumlu antibiyotik başlanır ve kristaloid sıvı resüsitasyonu yapılır.',
    wrongOptionFeedback: {
      A: 'Doğru. Septik şokta antibiyotik ve kristaloid sıvı geciktirilmeden başlanır.',
      B: 'Bu yaklaşım stabil hafif enfeksiyon için düşünülebilir; hipotansiyon ve yüksek laktat olan hastada yetersizdir.',
      C: 'Kültür alınır ancak sonuç beklenerek antibiyotik geciktirilmez.',
      D: 'Steroid dirençli şokta düşünülebilir; ilk basamak antibiyotik ve sıvı resüsitasyonudur.',
      E: 'Hipotansiyon ve organ hipoperfüzyonu acil tedavi gerektirir.',
    },
    evidenceChain: ['TA değerinin 78/46 mmHg olması', 'Laktat düzeyinin 4.3 mmol/L ölçülmesi', 'Ateş, raller ve lökositozla enfeksiyon odağı bulunması'],
    examPearl: 'Septik şokta erken antibiyotik ve 30 mL/kg kristaloid birlikte düşünülür; kültür sonucu beklenerek tedavi geciktirilmez.',
    managementSteps: ['Kan kültürleri geciktirmeden alınır.', 'Geniş spektrumlu antibiyotik ve kristaloid sıvı başlanır.', 'Hipotansiyon sürerse vazopressör değerlendirilir.'],
  },
  {
    title: 'SLE izleminde alevlenme şüphesi',
    relatedBranch: 'Romatoloji',
    learningTarget: 'SLE aktivite belirteçleri',
    demographics: '29 yaşında kadın hasta',
    setting: 'Poliklinik',
    chiefComplaint: 'Eklem ağrısı ve köpüklü idrar',
    stem: 'Sistemik lupus eritematozus tanısıyla izlenen 29 yaşında kadın hasta, son haftalarda artan halsizlik, eklem ağrısı ve köpüklü idrar yakınmasıyla başvuruyor. Muayenede hafif pretibial ödem ve el küçük eklemlerinde hassasiyet saptanıyor. Hekim hastalık aktivitesini destekleyecek laboratuvar paternini değerlendirmek istiyor.',
    compactVitals: [],
    compactObjectiveData: [{ label: 'Tam idrar tetkiki', value: 'Proteinüri ve mikroskopik hematüri' }],
    question: 'SLE aktivitesini destekleyen en uygun laboratuvar testi kombinasyonu hangisidir?',
    options: [
      { id: 'A', text: 'Anti-dsDNA testi ve C3/C4 ölçümü' },
      { id: 'B', text: 'ANA tarama testi ve eritrosit sedimentasyon hızı' },
      { id: 'C', text: 'Romatoid faktör testi ve anti-CCP ölçümü' },
      { id: 'D', text: 'HLA-B27 testi ve sakroiliak görüntüleme' },
      { id: 'E', text: 'Anti-mitokondriyal antikor testi ve ALP ölçümü' },
    ],
    correctAnswer: 'A',
    explanation: 'SLE aktivitesi özellikle anti-dsDNA artışı ve kompleman tüketimiyle desteklenir. Proteinüri ve hematüri varlığında bu patern lupus nefriti alevlenmesi açısından değerlidir.',
    wrongOptionFeedback: {
      A: 'Doğru. Anti-dsDNA artışı ve C3/C4 düşüklüğü SLE aktivitesini destekler.',
      B: 'ANA tarama için duyarlıdır; aktivite takibinde anti-dsDNA ve kompleman kadar belirleyici değildir.',
      C: 'Bu testler romatoid artrit eksenindedir; lupus aktivitesini izlemek için temel kombinasyon değildir.',
      D: 'HLA-B27 spondiloartritlerde kullanılır; SLE alevlenmesini göstermez.',
      E: 'Anti-mitokondriyal antikor primer biliyer kolanjit ile ilişkilidir; lupus aktivite takibi için uygun değildir.',
    },
    evidenceChain: ['Bilinen SLE öyküsü olması', 'Proteinüri ve mikroskopik hematüri bulunması', 'Eklem yakınmaları ve ödemle alevlenme şüphesi gelişmesi'],
    examPearl: 'SLE aktivite takibinde anti-dsDNA artışı ve C3/C4 düşüklüğü birlikte değerlidir; ANA daha çok tarama duyarlılığı ile öne çıkar.',
    managementSteps: ['İdrar ve böbrek fonksiyonları birlikte değerlendirilir.', 'Anti-dsDNA ve kompleman düzeyleri istenir.', 'Nefrit şüphesinde uzman değerlendirmesi planlanır.'],
  },
  {
    title: 'Kolinjik toksidrom bulguları',
    relatedBranch: 'Acil Tıp',
    learningTarget: 'Organofosfat zehirlenmesinde antidot yaklaşımı',
    demographics: '41 yaşında erkek hasta',
    setting: 'Acil servis',
    chiefComplaint: 'Terleme ve nefes darlığı',
    stem: 'Kırk bir yaşında erkek hasta, tarım ilacı temasından sonra gelişen aşırı terleme, salivasyon, karın krampları ve nefes darlığı nedeniyle acil servise getiriliyor. Muayenede miyozis, bronkore ve yaygın sekresyon artışı saptanıyor. Hasta yoğun kimyasal koku ile getirilmiş ve giysilerinde sıvı kalıntıları görülüyor.',
    compactVitals: [{ label: 'Nabız', value: '52/dk' }, { label: 'SpO₂', value: '%89' }],
    compactObjectiveData: [],
    question: 'Bu hastada en uygun antidot yaklaşımı hangisidir?',
    options: [
      { id: 'A', text: 'Atropin ve pralidoksim uygulamak' },
      { id: 'B', text: 'Nalokson uygulamak' },
      { id: 'C', text: 'N-asetilsistein başlamak' },
      { id: 'D', text: 'Flumazenil uygulamak' },
      { id: 'E', text: 'Fomepizol başlamak' },
    ],
    correctAnswer: 'A',
    explanation: 'Miyozis, bronkore, bradikardi ve sekresyon artışı kolinerjik toksidromu düşündürür. Organofosfat temasında atropin muskarinik bulguları kontrol eder, pralidoksim asetilkolinesteraz reaktivasyonu için kullanılır.',
    wrongOptionFeedback: {
      A: 'Doğru. Organofosfat zehirlenmesinde atropin ve pralidoksim birlikte düşünülür.',
      B: 'Nalokson opioid toksidromunda solunum depresyonu ve miyozis için kullanılır; belirgin bronkore ve salivasyon bu tabloya uymaz.',
      C: 'N-asetilsistein asetaminofen toksisitesinde kullanılır; kolinerjik toksidrom antidotu değildir.',
      D: 'Flumazenil benzodiazepin etkisini geri çevirebilir; organofosfat temasında uygun değildir.',
      E: 'Fomepizol metanol veya etilen glikol zehirlenmesinde kullanılır; bu bulgularla öncelikli değildir.',
    },
    evidenceChain: ['Tarım ilacı teması öyküsü', 'Miyozis, bronkore ve salivasyon artışı', 'Bradikardi ve hipoksemi eşlik etmesi'],
    examPearl: 'Organofosfat zehirlenmesinde DUMBBELSS tipi kolinerjik bulgular atropin + pralidoksim yaklaşımını düşündürür.',
    managementSteps: ['Kontamine giysiler çıkarılır ve dekontaminasyon yapılır.', 'Hava yolu ve oksijen desteği sağlanır.', 'Atropin ve pralidoksim klinik yanıta göre uygulanır.'],
  },
];

function pickSafeFallbackQuestion(context = {}, attemptErrors = []) {
  const localGenerated = pickLocalGeneratedFallbackQuestion(context, attemptErrors);
  if (localGenerated) return localGenerated;
  const localFallbackError = new Error('Local generated fallback rejected all candidates before static example pool was used');
  localFallbackError.status = 409;
  localFallbackError.attemptErrors = attemptErrors;
  throw localFallbackError;

  const branch = normalizeRemoteText(context.branchFilter || context.relatedBranch || context.branch || '');
  const selectedTopic = normalizeRemoteText(context.selectedTopic || context.selectedSubtopic || context.learningTarget || '');
  const seedText = `${context.seed || ''} ${context.antiRepeatNonce || ''} ${Date.now()}`;
  const seedNumber = seedText.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const scored = SAFE_FALLBACK_QUESTION_POOL.map((item, index) => {
    const itemBundle = normalizeRemoteText(`${item.relatedBranch} ${item.learningTarget} ${item.title}`);
    let score = 0;
    if (branch && itemBundle.includes(branch)) score += 8;
    if (/pediatri|cocuk|çocuk/.test(branch) && /status|nobet|nöbet/.test(itemBundle)) score += 4;
    if (/noroloji|nöroloji/.test(branch) && /status|nobet|nöbet/.test(itemBundle)) score += 6;
    if (/acil/.test(branch) && /anafil|toksidrom|septik/.test(itemBundle)) score += 5;
    if (/enfeksiyon/.test(branch) && /septik/.test(itemBundle)) score += 5;
    if (/romatoloji|ic hastaliklari|iç hastalıkları/.test(branch) && /sle|hiperkalemi|septik/.test(itemBundle)) score += 3;
    if (selectedTopic && remoteSimilarity(selectedTopic, itemBundle) > 0.22) score += 4;
    return { item, score, index };
  }).sort((a, b) => (b.score - a.score) || (((a.index + seedNumber) % SAFE_FALLBACK_QUESTION_POOL.length) - ((b.index + seedNumber) % SAFE_FALLBACK_QUESTION_POOL.length)));

  const topScore = scored[0]?.score || 0;
  const ordered = topScore > 0
    ? scored
    : [...scored.slice(seedNumber % scored.length), ...scored.slice(0, seedNumber % scored.length)];
  for (const candidate of ordered.map((entry) => entry.item)) {
    const question = completeRemoteQuestion({ ...candidate, id: `ai-spot-safe-fallback-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }, context);
    const medicalGate = runServerMedicalQualityGate(question);
    const repaired = medicalGate.question;
    const rawValidation = validateRawQuestion(repaired);
    const editorialValidation = validateRemoteEditorialQuality(repaired);
    const diversityValidation = validateRemoteDiversity(repaired, context);
    if (medicalGate.ok && rawValidation.ok && editorialValidation.ok && diversityValidation.passed) {
      return { question: repaired, medicalGate, rawValidation, editorialValidation, diversityValidation, bypassedDiversity: false };
    }
  }

  const relaxedPool = ordered.map((entry) => entry.item);
  for (const candidate of relaxedPool) {
    const question = completeRemoteQuestion({ ...candidate, id: `ai-spot-safe-fallback-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }, context);
    const medicalGate = runServerMedicalQualityGate(question);
    const repaired = medicalGate.question;
    const rawValidation = validateRawQuestion(repaired);
    const editorialValidation = validateRemoteEditorialQuality(repaired);
    const diversityValidation = validateRemoteDiversity(repaired, context);
    if (medicalGate.ok && rawValidation.ok && editorialValidation.ok && diversityValidation.passed) {
      return {
        question: repaired,
        medicalGate,
        rawValidation,
        editorialValidation,
        diversityValidation,
        bypassedDiversity: false,
        relaxedFallback: true,
        attemptErrors,
      };
    }
  }

  const error = new Error('Safe fallback pool rejected all candidates by diversity gate');
  error.status = 409;
  error.attemptErrors = attemptErrors;
  throw error;
}

function buildSafeFallbackResponsePayload({ body = {}, attemptErrors = [], startedAt = Date.now() } = {}) {
  const fallback = pickSafeFallbackQuestion(body, attemptErrors);
  const question = fallback.question;
  question.provider = 'local-safe-fallback';
  question.aiMeta = {
    ...(question.aiMeta || {}),
    promptVersion: PROMPT_VERSION,
    schemaVersion: SCHEMA_VERSION,
    ruleVersion: RULE_VERSION,
    safeFallback: true,
    fallbackReason: attemptErrors.slice(-3),
    serverMedicalGate: {
      ok: fallback.medicalGate?.ok !== false,
      repaired: Boolean(fallback.medicalGate?.repairCount),
      matchedRules: fallback.medicalGate?.matchedRules || [],
      warnings: (fallback.medicalGate?.warnings || []).slice(0, 6),
    },
    diversityBypassed: Boolean(fallback.bypassedDiversity),
  };

  const usageLog = buildAIUsageLog({
    provider: 'local-safe-fallback',
    model: 'deterministic-curated-pool',
    prompt: JSON.stringify({ branchFilter: body.branchFilter, selectedTopic: body.selectedTopic, selectedSubtopic: body.selectedSubtopic }),
    question,
    startedAt,
    validatorVerdict: 'accepted',
    repairCount: fallback.medicalGate?.repairCount || 0,
    duplicateScore: fallback.diversityValidation?.score || null,
    leakageDetected: false,
    highRiskRuleTriggered: fallback.medicalGate?.matchedRules || [],
    turkishQualityIssue: false,
  });

  return {
    ok: true,
    provider: 'local-safe-fallback',
    fallback: true,
    remoteAttempt: 0,
    safeFallback: true,
    fallbackNotice: 'Remote model veya kalite kapıları uygun soru döndürmediği için doğrulanmış yerel TUS spot soru havuzundan güvenli soru üretildi.',
    promptVersion: PROMPT_VERSION,
    schemaVersion: SCHEMA_VERSION,
    ruleVersion: RULE_VERSION,
    usageLog,
    question,
  };
}

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    response.statusCode = 204;
    response.end();
    return;
  }

  if (request.method !== 'POST') {
    return sendJson(response, 405, { ok: false, error: 'Method not allowed' });
  }

  const attemptErrors = [];

  try {
    const body = await parseJsonBody(request);
    const remoteAttempts = Math.max(4, Number(process.env.REMOTE_AI_ATTEMPTS || process.env.OPENROUTER_REMOTE_ATTEMPTS || 5));
    let diversityRejectedCount = 0;
    let nearDuplicateRejectedCount = 0;

    for (let remoteAttempt = 1; remoteAttempt <= remoteAttempts; remoteAttempt += 1) {
      try {
        const prompt = buildPrompt({
          ...body,
          attempt: Number(body?.attempt || 1) + remoteAttempt - 1,
          antiRepeatNonce: body?.antiRepeatNonce || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        });
        const startedAt = Date.now();
        const rawQuestion = await generateWithAvailableProvider(prompt, body);
        let question = completeRemoteQuestion(rawQuestion, body);

        const medicalGate = runServerMedicalQualityGate(question);
        question = medicalGate.question;
        if (!medicalGate.ok) {
          const usageLog = buildAIUsageLog({
            provider: question.provider || rawQuestion?.provider,
            model: question.openRouterModel || rawQuestion?.openRouterModel,
            prompt,
            question,
            startedAt,
            validatorVerdict: 'rejected-medical-gate',
            repairCount: medicalGate.repairCount,
            rejectionReason: medicalGate.errors.slice(0, 3).join('; '),
            highRiskRuleTriggered: medicalGate.matchedRules,
            turkishQualityIssue: medicalGate.errors.some((error) => /turkish|türkçe|dil/i.test(error)),
          });
          attemptErrors.push(`remote attempt ${remoteAttempt}: medical gate failed: ${medicalGate.errors.slice(0, 4).join('; ')}`);
          if (parseBooleanEnv('AI_DEBUG_USAGE_LOGS', false)) console.info('[KlinikIQ AI usage]', usageLog);
          continue;
        }
        question.aiMeta = {
          ...(question.aiMeta || {}),
          promptVersion: PROMPT_VERSION,
          schemaVersion: SCHEMA_VERSION,
          ruleVersion: RULE_VERSION,
          serverMedicalGate: {
            ok: medicalGate.ok,
            repaired: medicalGate.repairCount > 0,
            matchedRules: medicalGate.matchedRules,
            warnings: medicalGate.warnings.slice(0, 6),
          },
        };

        const diversityValidation = validateRemoteDiversity(question, body);
        if (!diversityValidation.passed) {
          diversityRejectedCount += 1;
          if (/near|semantic|option|topic|correct/i.test(diversityValidation.reason || '')) nearDuplicateRejectedCount += 1;
          attemptErrors.push(`remote attempt ${remoteAttempt}: diversity validation failed: ${diversityValidation.reason} (${diversityValidation.score || 0})`);
          continue;
        }

        const validation = validateRawQuestion(question);
        const editorialValidation = validateRemoteEditorialQuality(question);
        if (!editorialValidation.ok) {
          attemptErrors.push(`remote attempt ${remoteAttempt}: editorial validation failed: ${editorialValidation.errors.slice(0, 4).join('; ')}`);
          continue;
        }

        if (!validation.ok) {
          attemptErrors.push(`remote attempt ${remoteAttempt}: schema validation failed: ${validation.errors.slice(0, 4).join('; ')}`);
          continue;
        }

        const usageLog = buildAIUsageLog({
          provider: question.provider || rawQuestion?.provider || 'remote-ai',
          model: question.openRouterModel || rawQuestion?.openRouterModel || null,
          prompt,
          question,
          startedAt,
          validatorVerdict: 'accepted',
          repairCount: medicalGate.repairCount,
          duplicateScore: diversityValidation.score || null,
          leakageDetected: editorialValidation.errors?.some((error) => /answer-leakage/i.test(error)),
          highRiskRuleTriggered: medicalGate.matchedRules,
          turkishQualityIssue: editorialValidation.errors?.some((error) => /exam-language|forbidden editorial|türkçe|turkish/i.test(error)),
        });
        if (parseBooleanEnv('AI_DEBUG_USAGE_LOGS', false)) console.info('[KlinikIQ AI usage]', usageLog);

        return sendJson(response, 200, {
          ok: true,
          provider: question.provider || 'remote-ai',
          fallback: false,
          safeFallback: false,
          remoteAttempt,
          diversityRejectedCount,
          nearDuplicateRejectedCount,
          temperature: Number(process.env.OPENROUTER_TEMPERATURE || 0.82),
          promptVersion: PROMPT_VERSION,
          schemaVersion: SCHEMA_VERSION,
          ruleVersion: RULE_VERSION,
          usageLog,
          question,
        });
      } catch (error) {
        attemptErrors.push(`remote attempt ${remoteAttempt}: ${summarizeProviderError(error)}`);
      }
    }

    if (parseBooleanEnv('AI_ENABLE_SAFE_FALLBACK', true)) {
      const fallbackPayload = buildSafeFallbackResponsePayload({ body, attemptErrors, startedAt: Date.now() });
      if (parseBooleanEnv('AI_DEBUG_USAGE_LOGS', false)) console.info('[KlinikIQ AI safe fallback]', fallbackPayload.usageLog);
      return sendJson(response, 200, fallbackPayload);
    }

    const error = new Error(attemptErrors.join(' | ') || 'Remote AI providers failed');
    error.status = 502;
    throw error;
  } catch (error) {
    const status = error?.status && Number(error.status) >= 400 ? Number(error.status) : 500;
    return sendJson(response, status, {
      ok: false,
      error: error?.message || 'AI question generation failed',
      attempts: attemptErrors.slice(-6),
    });
  }
}
