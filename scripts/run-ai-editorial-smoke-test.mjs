import { AI_QUESTION_SEEDS } from '../src/data/aiQuestionSeeds.js';
import { AI_BRANCH_TEMPLATE_SEEDS } from '../src/data/aiBranchQuestionTemplates.js';
import { AI_SYNTHETIC_FALLBACK_SEEDS } from '../src/data/aiSyntheticFallbackTemplates.js';
import { buildAIQuestionCase } from '../src/utils/aiQuestionGenerator.js';

const BAD_TEXT_PATTERN = /Morfolojik patern\s*[:.]|Morfolojik patern\.\s*Morfolojik patern|karar verdirici paternyla|likefaksiyon nekrozuyla|kısa TUS pratiğinde ele alınır|Klinik değerlendirme için ek veri|Objektif karar verisi|verilen öğrenme hedefi|yanıt ekseni|öğrenci ayırt eder|Sonuçlar tek bir tanı adını yazmaz|benzer seçenekleri ayıran ana patern|dikkat çeker\.\s*$|tanısını\.\s*$/iu;
const INLINE_LABEL_PATTERN = /^(Morfolojik patern|Sınav incisi|Sınav notu|Ayırıcı nokta|Karar verdirici ipucu|Destekleyici kanıt|Olgu verisi|Ek destek|Laboratuvar paterni|Görüntüleme bulgusu|Fizik muayene bulgusu|Başvuru yakınması)\s*[:：|\-]/iu;
const PLACEHOLDER_INVESTIGATION_PATTERN = /Klinik değerlendirme için ek veri|Objektif karar verisi|tanıyı doğrudan söylemeden|başvuru bulgusu tanısal ayrımda|Objektif bulgu klinik kararı destekler/iu;
const REPEATED_PHRASE_PATTERN = /\b(Morfolojik patern|Sınav incisi|Ayırt ettirici ipucu|Klinik gerekçe|Mekanizma özeti)\b[.!?:]?\s+\1\b/iu;

const pool = [...AI_QUESTION_SEEDS, ...AI_BRANCH_TEMPLATE_SEEDS, ...AI_SYNTHETIC_FALLBACK_SEEDS];

function collectVisibleText(value, output = [], key = '', seen = new WeakSet()) {
  const ignoredKeys = new Set([
    'id', 'seedId', 'source', 'branchId', 'type', 'priority', 'correctAnswer', 'schemaVersion', 'generator',
    'provider', 'generatedAt', 'contentSignature', 'generationSignature', 'topicSignature', 'semanticFingerprint',
    'dedupeKey', 'optionSetSignature', 'license', 'imageUrl', 'sourceUrl', 'score', 'aiMeta', 'metadata',
  ]);
  if (ignoredKeys.has(key)) return output;
  if (typeof value === 'string') output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectVisibleText(item, output, key, seen));
  else if (value && typeof value === 'object') {
    if (seen.has(value)) return output;
    seen.add(value);
    Object.entries(value).forEach(([childKey, item]) => collectVisibleText(item, output, childKey, seen));
  }
  return output;
}

function inspectQuestion(question) {
  const texts = collectVisibleText(question);
  const badTexts = texts.filter((text) => BAD_TEXT_PATTERN.test(text) || INLINE_LABEL_PATTERN.test(text) || REPEATED_PHRASE_PATTERN.test(text));
  const placeholderInvestigations = (question.investigations || []).filter((item) => {
    const bundle = [item.label, item.summary, ...(item.findings || []), ...(item.rows || []).flat()].join(' ');
    return PLACEHOLDER_INVESTIGATION_PATTERN.test(bundle);
  });
  const basicScience = /patoloji|fizyoloji|biyokimya|farmakoloji|mikrobiyoloji|anatomi|histoloji|embriyoloji/iu.test(
    [question.relatedBranch, question.branchName, question.spotCategory].join(' ')
  );
  const fakeBasicScienceLab = basicScience && (question.investigations || []).some((item) => {
    const label = `${item.label || ''} ${item.type || ''}`;
    const bundle = [label, item.summary, ...(item.findings || []), ...(item.rows || []).flat()].join(' ');
    return /laboratuvar|lab/iu.test(label) && !/\d|pozitif|negatif|saptandı|saptanmadı|üreme|histopatoloji|biyopsi|nekroz|inflamasyon|proteinüri|glukoz|enzim|hormon/iu.test(bundle);
  });
  return {
    ok: badTexts.length === 0 && placeholderInvestigations.length === 0 && !fakeBasicScienceLab,
    badTexts: badTexts.slice(0, 5),
    placeholderInvestigations: placeholderInvestigations.map((item) => item.label),
    fakeBasicScienceLab,
  };
}

const results = [];
let failed = 0;
for (let i = 0; i < 50; i += 1) {
  const seed = pool[i % pool.length];
  const question = buildAIQuestionCase(seed, {
    generatedId: `ai-spot-editorial-test-${i + 1}`,
    attempt: i,
    context: { recentSignatures: [], recentIds: [], recentQuestionSummaries: [] },
    branchFilter: seed.relatedBranch || 'random',
  });
  const inspection = inspectQuestion(question);
  if (!inspection.ok) failed += 1;
  results.push({
    no: i + 1,
    ok: inspection.ok,
    title: question.title,
    branch: question.relatedBranch,
    correct: question.diagnosis?.correct,
    investigationCount: question.investigations?.length || 0,
    badTexts: inspection.badTexts,
    placeholderInvestigations: inspection.placeholderInvestigations,
    fakeBasicScienceLab: inspection.fakeBasicScienceLab,
  });
}

const report = {
  testName: 'AI editorial quality smoke test',
  total: results.length,
  passed: results.length - failed,
  failed,
  checkedRules: [
    'yasaklı morfolojik patern/placeholder/meta kalıpları',
    'inline label prefixleri',
    'başlık/cümle tekrarları',
    'boş veya placeholder tetkik kartları',
    'temel bilim sorularında sahte laboratuvar kartı',
  ],
  results,
};
console.log(JSON.stringify(report, null, 2));
process.exit(failed > 0 ? 1 : 0);
