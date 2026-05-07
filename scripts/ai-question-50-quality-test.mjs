import fs from 'node:fs';
import { generateAIQuestion } from '../src/utils/aiQuestionGenerator.js';
import { clearAIQuestionHistory } from '../src/utils/aiQuestionHistory.js';
import { validateAIQuestionQuality } from '../src/utils/aiQuestionQualityGate.js';

const TOTAL = Number(process.env.AI_QA_TOTAL || 50);
const MAX_TOTAL_ATTEMPTS = TOTAL * 4;
const branchCycle = [
  'Rastgele', 'Çocuk Sağlığı ve Hastalıkları', 'Kadın Hastalıkları ve Doğum', 'İç Hastalıkları', 'Genel Cerrahi',
  'Tıbbi Mikrobiyoloji', 'Tıbbi Farmakoloji', 'Tıbbi Biyokimya', 'Tıbbi Patoloji', 'Fizyoloji', 'Anatomi',
  'Histoloji ve Embriyoloji', 'Küçük Stajlar',
];
const forbiddenPatterns = [
  /Morfolojik\s+patern/iu, /Morfolojik\s+patern\.\s*Morfolojik\s+patern/iu, /karar\s+verdirici\s+patern(?:le|yla|i|in|:)?/iu,
  /paternyla/iu, /\blikefaksiyon\b(?!\s+nekroz)/iu, /kısa\s+TUS\s+pratiğinde\s+ele\s+alınır/iu,
  /Klinik\s+değerlendirme\s+için\s+ek\s+veri/iu, /Objektif\s+karar\s+verisi/iu, /Bu\s+veri\s+klinik\s+bağlamda\s+değerlendirilir/iu,
  /Patern\s+ve\s+mekanizma\s+birlikte\s+yorumlanmalıdır/iu, /Verilen\s+öğrenme\s+hedefiyle\s+uyumludur/iu,
  /Doğru\s+seçenek\s+yanıt\s+eksenini\s+oluşturur/iu, /Öğrenci\s+ayırt\s+eder/iu, /Sonuçlar\s+tek\s+tanı\s+adını\s+yazmaz/iu,
  /\b(Ayırıcı\s+nokta|Mekanizma|İlk\s+adım|Karar\s+verdirici\s+ipucu|Destekleyici\s+kanıt|Başvuru\s+yakınması|Laboratuvar\s+paterni|Görüntüleme\s+bulgusu|Fizik\s+muayene\s+bulgusu|Sınav\s+incisi|TUS\s+tuzağı)\s*[:|]/iu,
  /\b(dikkat\s+çeker|tanısını|patern\s+tanısını)\.?$/iu,
];
const labObjectivePattern = /(\d|mg\/dL|mg\/L|g\/dL|mmol\/L|mEq\/L|U\/L|IU\/L|ng\/mL|\/mm³|\/µL|%|mmHg|izlenir|saptanır|saptandı|pozitif|negatif|yüksek|düşük|üreme|PCR|kültür|seroloji|histopatoloji|biyopsi|nekrotik|nötrofilik|kontrastlanan|lezyon|fraktür)/iu;
const labLikeType = /^(lab|urine|culture|toxicology)$/iu;
const labLikeText = /(laboratuvar|hemogram|tam kan|biyokimya|elektrolit|kan gazı|crp|troponin|d[- ]?dimer|seroloji|kültür|idrar|bos|glukoz|kreatinin|lökosit|wbc)/iu;
function collectVisibleStrings(value, output = [], key = '') {
  const skip = new Set(['id', 'source', 'caseType', 'correctAnswer', 'provider', 'type', 'priority', 'generatedAt']);
  if (skip.has(key)) return output;
  if (typeof value === 'string') output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectVisibleStrings(item, output, key));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([childKey, item]) => collectVisibleStrings(item, output, childKey));
  return output;
}
function hasRepeatedSentence(text = '') {
  const cleaned = String(text).replace(/\s+/g, ' ').trim();
  if (!cleaned) return false;
  const sentences = cleaned.split(/(?<=[.!?])\s+/u).map((sentence) => sentence.toLocaleLowerCase('tr-TR').replace(/[.!?]+$/u, '').trim()).filter((sentence) => sentence.length > 16);
  return new Set(sentences).size < sentences.length || /(\b[\p{L}ÇĞİÖŞÜçğıöşü]{4,}(?:\s+[\p{L}ÇĞİÖŞÜçğıöşü]{4,}){0,3})\s+\1\b/iu.test(cleaned);
}
function checkInvestigations(question) {
  const errors = [];
  const investigations = question?.investigations || question?.findings?.investigations || [];
  investigations.forEach((item, index) => {
    const visible = collectVisibleStrings(item).join(' ');
    const rows = Array.isArray(item?.rows) ? item.rows : [];
    const labLike = labLikeType.test(String(item?.type || '')) || labLikeText.test(`${item?.label || ''} ${item?.title || ''} ${item?.summary || ''}`);
    if (/Klinik değerlendirme için ek veri|Objektif karar verisi|Bu veri klinik bağlamda değerlendirilir|Morfolojik patern/iu.test(visible)) errors.push(`placeholder/yasaklı tetkik metni ${index + 1}`);
    if (labLike && !rows.length && !labObjectivePattern.test(visible)) errors.push(`laboratuvar/tetkik kartı objektif veri içermiyor ${index + 1}`);
  });
  return errors;
}
clearAIQuestionHistory();
const results = [];
const skippedAttempts = [];
for (let attempt = 0; results.length < TOTAL && attempt < MAX_TOTAL_ATTEMPTS; attempt += 1) {
  const requestedBranch = branchCycle[attempt % branchCycle.length];
  try {
    const question = generateAIQuestion({ branchFilter: requestedBranch, context: { recentIds: [], recentSignatures: [], recentQuestionSummaries: [] } });
    const visible = collectVisibleStrings(question);
    const allText = visible.join('\n');
    const localErrors = [];
    forbiddenPatterns.forEach((pattern) => { if (pattern.test(allText)) localErrors.push(`yasaklı örüntü: ${pattern}`); });
    visible.forEach((text) => { if (hasRepeatedSentence(text)) localErrors.push(`tekrar eden ifade: ${String(text).slice(0, 90)}`); });
    localErrors.push(...checkInvestigations(question));
    const quality = validateAIQuestionQuality(question, { requestedBranch });
    const errors = Array.from(new Set([...localErrors, ...quality.errors.map((error) => `quality:${error}`)]));
    const row = {
      no: results.length + 1, branch: requestedBranch, title: question.title,
      correct: question.diagnosis?.correct || question.correctAnswer,
      investigationCount: (question.investigations || question.findings?.investigations || []).length,
      ok: errors.length === 0, errors, warnings: quality.warnings.slice(0, 8), id: question.id,
    };
    if (!row.ok) { skippedAttempts.push({ branch: requestedBranch, errors }); console.log(`skip ${attempt + 1}/${MAX_TOTAL_ATTEMPTS} ${requestedBranch} — ${errors[0]}`); continue; }
    results.push(row);
    console.log(`${row.no}/${TOTAL} ${requestedBranch} PASS — ${row.title}`);
  } catch (error) {
    skippedAttempts.push({ branch: requestedBranch, errors: [error?.message || String(error)] });
    console.log(`skip ${attempt + 1}/${MAX_TOTAL_ATTEMPTS} ${requestedBranch} — ${error?.message || error}`);
  }
}
const failures = results.length === TOTAL ? [] : [{ no: results.length + 1, branch: 'QA harness', ok: false, title: '', errors: [`Only ${results.length}/${TOTAL} valid questions generated before attempt limit`] }];
const report = { total: TOTAL, passed: results.length, failed: failures.length, generatedAt: new Date().toISOString(), forbiddenPatternCount: forbiddenPatterns.length, skippedAttempts: skippedAttempts.length, skippedAttemptDetails: skippedAttempts.slice(0, 20), failures, results };
fs.writeFileSync('AI_QUESTION_50_QUALITY_TEST_RESULT.json', JSON.stringify(report, null, 2));
const lines = ['# AI Question 50 Quality Test Result', '', `- Total generated questions: ${report.total}`, `- Passed: ${report.passed}`, `- Failed: ${report.failed}`, `- Skipped attempts before pass: ${report.skippedAttempts}`, `- Generated at: ${report.generatedAt}`, '', '## Branch Coverage', '', ...results.map((item) => `- ${item.no}. ${item.branch} — PASS — ${item.title}`), '', '## Failure Details', '', ...(failures.length ? failures.flatMap((item) => [`### ${item.no}. ${item.branch}`, ...(item.errors || []).map((error) => `- ${error}`), '']) : ['No failures.'])];
fs.writeFileSync('AI_QUESTION_50_QUALITY_TEST_RESULT.md', `${lines.join('\n')}\n`);
if (failures.length) { console.error(`AI QA failed: ${failures.length}/${TOTAL}`); process.exit(1); }
console.log(`AI QA passed: ${results.length}/${TOTAL}`);
