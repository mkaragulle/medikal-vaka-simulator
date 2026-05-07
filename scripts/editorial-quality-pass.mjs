import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const casesPath = path.join(root, 'src/data/cases.js');
const { cases } = await import(`${pathToFileURL(casesPath).href}?v=${Date.now()}`);

const WEAK_PREFIX_RE = /^(Karar verdirici ipucu|Karar verdiren ipucu|Destekleyici kanıt|Ayırt ettirici ipucu|Ayırt ettirici bulgu|Klinik patern|Tanısal ayrım|TUS kırmızı bayrağı|Ana kanıt|Kritik ipucu|Olgu verisi|Ek destek|Mekanizma|İlk tedavi|İlk adım|Klinik olasılığı belirle)\s*[:：-]\s*/iu;
const META_RE = /(öğrenme hedefi|doğru seçenek verilen|yanıt ekseni|yüzeysel anahtar kelime|gömülü vaka|generator|AI spot|bu soru|çeldirici)/iu;
const BROKEN_END_RE = /(Bu nedenle en iyi yanıt\.?|açısından değerlendirilir\.?|yorumlanmalıdır\.?|ile uyumludur ve\.?|tanısını\.?)$/iu;
const CLINICAL_HINT_WORDS = /(ateş|ağrı|eritem|ödem|dispne|göğüs|karın|kusma|ishal|döküntü|senkop|travma|kanama|hipotansiyon|taşikardi|hipoksemi|laboratuvar|ekg|bt|mr|usg|grafi|seroloji|kültür|pcr|troponin|lökosit|crp|bilirubin|glukoz|ph|hco3|tanı|tedavi|etken|reseptör|enzim|mutasyon|hormon|histoloji|biyopsi|menenjit|pnömoni|erizipel|diabetes|ketoasidoz|emboli|tamponad|diseksiyon|kawasaki|asfiksi|hipotermi)/iu;

function normalizeWhitespace(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/’/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,.;:!?])(?=\S)/g, '$1 ')
    .replace(/pH\s+(\d+)\.\s+(\d+)/giu, 'pH $1.$2')
    .trim();
}

function ensureSentence(value = '') {
  const text = normalizeWhitespace(value).replace(/[,:;\-–—\s]+$/u, '').trim();
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function firstUpper(value = '') {
  const text = normalizeWhitespace(value);
  if (!text) return '';
  return text.charAt(0).toLocaleUpperCase('tr') + text.slice(1);
}

function cleanSemicolons(value = '') {
  // Metni ağırlaştıran noktalı virgülleri doğal cümle sınırlarına çevirir.
  return normalizeWhitespace(value)
    .replace(/;\s*/g, '. ')
    .replace(/\.\s*\.\s*/g, '. ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanDashes(value = '') {
  return normalizeWhitespace(value)
    .replace(/\s+[-–—]\s+(bu olguda elenir|bu tabloda elenir)/giu, ' $1')
    .replace(/\s*\+\s*/g, ' ve ')
    .replace(/\s*\/\s*/g, ' veya ')
    .replace(/Erysipelas/giu, 'Erizipel')
    .replace(/diffüz/giu, 'yaygın')
    .replace(/\bHİE\.\s*doğru/giu, 'HİE doğru')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripWeakPrefix(value = '') {
  return normalizeWhitespace(value).replace(WEAK_PREFIX_RE, '').trim();
}

function removeMetaLanguage(value = '') {
  return cleanDashes(cleanSemicolons(stripWeakPrefix(value)))
    .replace(/\bçeldiriciler\b/giu, 'alternatifler')
    .replace(/\bçeldiriciyi\b/giu, 'alternatifi')
    .replace(/\bçeldirici\b/giu, 'alternatif')
    .replace(/\bverilen öğrenme hedefiyle en tutarlı yanıt eksenini oluşturur\b/giu, 'olgudaki somut bulgularla en iyi örtüşür')
    .replace(/\bdoğru seçenek\b/giu, 'uygun yanıt')
    .replace(/\byanıt ekseni\b/giu, 'klinik karar')
    .replace(/\böğrenme hedefi\b/giu, 'klinik bilgi')
    .replace(/\bklinik bağlamda\b/giu, 'bu tabloda')
    .replace(/\bklinik değerlendirme için ek veri sağlar\b/giu, 'objektif destek sağlar')
    .replace(/\bBu spot olguda\b/giu, 'Bu olguda')
    .replace(/\bPatern ve mekanizma birlikte yorumlanmalıdır\.?/giu, 'Bulgular birlikte değerlendirildiğinde klinik karar netleşir.')
    .replace(/\bBu istem mevcut tabloda anlam kazanır\.?/giu, 'Sonuç öykü ve muayene bulgularıyla birlikte yorumlanır.')
    .replace(/\s+/g, ' ')
    .trim();
}

function compactSentences(value = '', maxSentences = 4, maxLength = 680) {
  const cleaned = removeMetaLanguage(value);
  const sentences = cleaned.split(/(?<=[.!?])\s+/u).map((s) => s.trim()).filter(Boolean);
  let text = (sentences.length ? sentences.slice(0, maxSentences).join(' ') : cleaned).trim();
  if (text.length > maxLength) {
    text = text.slice(0, maxLength).replace(/\s+\S*$/u, '').replace(/[,:;\-–—]+$/u, '').trim();
  }
  return ensureSentence(firstUpper(text));
}

function normalizeCorrect(correct = '') {
  return normalizeWhitespace(correct)
    .replace(/\s*[-–—]\s*/g, ' ve ')
    .replace(/\s+/g, ' ')
    .trim();
}

function removeBestAnswerSentence(text = '') {
  return normalizeWhitespace(text)
    .replace(/\s*Bu nedenle en iyi yanıt\s+[^.]+?\s+seçeneğidir\.?/giu, '')
    .replace(/\s*Bu nedenle en uygun yanıt\s+[^.]+?\s+seçeneğidir\.?/giu, '')
    .replace(/\s*Bu nedenle en iyi yanıt\.?/giu, '')
    .trim();
}

function buildWhyCorrect(caseItem, previousText = '') {
  const correct = caseItem.diagnosis?.correct || caseItem.diagnosis?.answerFeedback?.correctDiagnosis || 'doğru yanıt';
  const base = removeBestAnswerSentence(previousText || caseItem.diagnosis?.explanation || '');
  const clue = getMainClue(caseItem);
  const cleanedBase = compactSentences(base, 3, 520).replace(/\.$/u, '');
  const correctNatural = normalizeCorrect(correct);
  const closing = `Bu nedenle en uygun seçim ${correctNatural} olur.`;
  if (cleanedBase && cleanedBase.length > 40 && !META_RE.test(cleanedBase)) {
    return compactSentences(`${cleanedBase}. ${closing}`, 4, 680);
  }
  if (clue) {
    return compactSentences(`${clue} olgudaki karar verdirici bulgudur. Bu bulgu öykü, muayene ve objektif verilerle birlikte değerlendirildiğinde ${correctNatural} daha güçlü açıklama sağlar. ${closing}`, 4, 680);
  }
  return compactSentences(`Olgudaki öykü, muayene ve objektif veriler birlikte değerlendirildiğinde ${correctNatural} diğer olasılıklardan daha güçlü açıklama sağlar. ${closing}`, 3, 560);
}

function inferEvidenceTitle(text = '', index = 0) {
  const t = normalizeWhitespace(text).toLocaleLowerCase('tr');
  if (/ekg|st segment|derivasyon|ritim|qrs|qt|troponin/.test(t)) return 'EKG ve kardiyak veri';
  if (/bt|mrg|mr |usg|grafi|radyografi|tomografi|görüntüleme/.test(t)) return 'Görüntüleme bulgusu';
  if (/crp|esr|sedimentasyon|lökosit|hemoglobin|trombosit|glukoz|ph\b|hco3|bilirubin|seroloji|kültür|pcr|antikor|antijen|enzim|marker|lipaz|ferritin/.test(t)) return 'Laboratuvar paterni';
  if (/muayene|oskültasyon|defans|rebound|eritem|döküntü|üfürüm|ral|ödem|nörolojik|ense|tonus|nabız|basınç/.test(t)) return 'Muayene bulgusu';
  if (/öykü|travma|maruziyet|seyahat|temas|gebelik|doğum|aile|sigara|ilaç|beslenme|aşı/.test(t)) return 'Öykü ipucu';
  if (/tedavi|başla|ilk tercih|penisilin|antibiyotik|cerrahi|reperfüzyon|hipotermi|antidot/.test(t)) return 'Tedavi önceliği';
  if (/enzim|reseptör|gen|mutasyon|yolak|hormon|metabolizma|histoloji|morfoloji/.test(t)) return 'Mekanizma';
  return index === 0 ? 'Klinik ipucu' : 'Destekleyen bulgu';
}

function itemText(item) {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return item.text || item.summary || item.explanation || item.description || item.label || item.title || '';
}

function dedupeItems(items, max = 5) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const text = normalizeWhitespace(itemText(item));
    if (!text || text.length < 5) continue;
    const key = text.toLocaleLowerCase('tr').replace(/[.!?]/g, '');
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
    if (out.length >= max) break;
  }
  return out;
}

function normalizeEvidenceItem(item, index) {
  const text = compactSentences(itemText(item), 1, 190).replace(/^Başvuru:\s*/iu, '').replace(/^Muayene:\s*/iu, '').replace(/^Tetkik:\s*/iu, '');
  if (!text) return null;
  const oldTitle = typeof item === 'object' ? normalizeWhitespace(item.title || item.label || '') : '';
  let title = oldTitle && !WEAK_PREFIX_RE.test(oldTitle) && !/^(Karar verdirici ipucu|Destekleyici kanıt|Ayırt ettirici ipucu|Kanıt \d+)$/iu.test(oldTitle)
    ? oldTitle
    : inferEvidenceTitle(text, index);
  title = title.replace(/[:;.]$/u, '').trim();
  return { title, text };
}

function normalizePearlItem(item, index) {
  const text = compactSentences(itemText(item), 2, 210);
  if (!text) return null;
  let label = typeof item === 'object' ? normalizeWhitespace(item.label || item.title || '') : '';
  if (!label || /^(İlk adım|Ayırt ettirici ipucu|Karar verdirici ipucu|TUS kırmızı bayrağı)$/iu.test(label)) {
    label = index === 0 ? 'Sınav bilgisi' : index === 1 ? 'Ayırıcı nokta' : 'Klinik not';
  }
  label = label.replace(/[:;.]$/u, '').trim();
  return { label, text };
}

function normalizeManagementItem(item, index) {
  const text = compactSentences(itemText(item), 1, 190);
  if (!text) return null;
  let title = typeof item === 'object' ? normalizeWhitespace(item.title || item.label || '') : '';
  if (!title || /^(Klinik patern|İlk tedavi|İlk adım)$/iu.test(title)) {
    if (/stabil|abc|hava yolu|solunum|dolaşım|glukoz|nöbet/i.test(text)) title = 'Stabilizasyon';
    else if (/tedavi|başla|ver|antibiyotik|insülin|penisilin|cerrahi|hipotermi|antidot|reperfüzyon/i.test(text)) title = 'Tedavi önceliği';
    else if (/tetkik|ekg|bt|mr|usg|kültür|seroloji|laboratuvar/i.test(text)) title = 'Tanısal doğrulama';
    else title = index === 0 ? 'İlk karar' : 'İzlem';
  }
  return { title: title.replace(/[:;.]$/u, '').trim(), text };
}

function getMainClue(caseItem) {
  const candidates = [
    caseItem.diagnosis?.answerFeedback?.spotClue,
    caseItem.spotClue,
    caseItem.patientIntro?.priorityFocus,
    ...(Array.isArray(caseItem.patientIntro?.distinctiveClues) ? caseItem.patientIntro.distinctiveClues : []),
    ...(Array.isArray(caseItem.diagnosis?.answerFeedback?.evidenceChain) ? caseItem.diagnosis.answerFeedback.evidenceChain.map(itemText) : []),
    caseItem.clinicalFocus,
    caseItem.chiefComplaint,
  ];
  for (const candidate of candidates) {
    const text = compactSentences(candidate, 1, 190).replace(/^(.{1,42}):\s*/u, '$2');
    if (text && text.length > 12 && !META_RE.test(text)) return text.replace(/\.$/u, '');
  }
  return '';
}

function buildWrongExplanation(caseItem, optionText = '', previous = '') {
  const correct = normalizeCorrect(caseItem.diagnosis?.correct || caseItem.diagnosis?.answerFeedback?.correctDiagnosis || 'uygun yanıt');
  const clue = getMainClue(caseItem);
  const option = normalizeWhitespace(optionText);

  // Önce mevcut açıklamadaki gerçekten yararlı cümleleri koru.
  const useful = removeMetaLanguage(previous)
    .replace(new RegExp(`${option.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\s+bu olguda elenir\s*:?`, 'iu'), '')
    .replace(/Karar verdiren ipucu[^.]+\./giu, '')
    .replace(/doğru yanıt[^.]+olmalıdır\.?/giu, '')
    .trim();

  if (useful && useful.length >= 65 && !/bu olguda elenir|Karar verdiren ipucu|doğru yanıt/i.test(useful)) {
    return compactSentences(useful, 3, 420);
  }
  const clueSentence = clue ? `${clue} bu olguda daha belirleyicidir.` : `Olgudaki ana bulgular ${correct} lehine daha güçlüdür.`;
  if (/eritrazma/i.test(option)) {
    return 'Eritrazma genellikle intertriginöz bölgelerde kahverengi-kırmızı plaklarla seyreder ve Wood lambasında mercan kırmızısı floresans verebilir. Bu olgudaki akut, sıcak ve keskin sınırlı eritem erizipel lehinedir.';
  }
  if (/selülit/i.test(option)) {
    return 'Selülitte eritem sınırları genellikle daha belirsiz ve yaygın olur. Bu olgudaki keskin sınırlı, sıcak yüzeyel eritem erizipel paternine daha yakındır.';
  }
  if (/fronkül|furonkül/i.test(option)) {
    return 'Fronkül kıl folikülü kaynaklı, lokalize nodül veya apse görünümüyle beklenir. Bu olguda yaygın ve keskin sınırlı yüzeyel eritem ön plandadır.';
  }
  return compactSentences(`${option} benzer başlıklarda düşünülebilir; ancak ${clueSentence} Bu seçenek ${correct} için beklenen temel paternin önceliğini açıklamaz.`, 3, 440);
}

function cleanSummaryItem(value = '') {
  const text = compactSentences(value, 1, 180)
    .replace(/^(Karar verdirici|Destekleyici|Ayırt ettirici)\s+/iu, '')
    .replace(/\.{3}|…/g, '')
    .trim();
  if (!text || META_RE.test(text)) return '';
  return text;
}

function normalizeInvestigation(inv) {
  if (!inv || typeof inv !== 'object') return inv;
  const out = { ...inv };
  if (out.summary) out.summary = compactSentences(out.summary, 2, 260);
  if (out.interpretation) out.interpretation = compactSentences(out.interpretation, 1, 180)
    .replace(/^Sonuç, öykü ve muayene bulgularıyla birlikte değerlendirilir\.$/u, 'Sonuç, öykü ve muayene bulgularının aynı yönde olup olmadığını gösterir.');
  if (Array.isArray(out.findings)) out.findings = dedupeItems(out.findings.map((f) => compactSentences(f, 1, 180)), 4);
  if (Array.isArray(out.rows)) {
    out.rows = out.rows.map((row) => Array.isArray(row) ? row.map((cell) => typeof cell === 'string' ? normalizeWhitespace(cell).replace(/\s*;\s*/g, ', ') : cell) : row);
  }
  return out;
}

function processCase(caseItem) {
  const before = JSON.stringify(caseItem);
  const c = structuredClone(caseItem);

  // Birincil görünür alanlar
  ['title','difficulty','clinicalFocus','demographics','setting','chiefComplaint','stem','question','learningTarget','spotClue','trap'].forEach((key) => {
    if (typeof c[key] === 'string') c[key] = compactSentences(c[key], key === 'stem' ? 4 : 2, key === 'stem' ? 760 : 240);
  });
  if (Array.isArray(c.exam)) c.exam = dedupeItems(c.exam.map((x) => compactSentences(x, 1, 220)), 10);
  if (Array.isArray(c.history)) c.history = dedupeItems(c.history.map((x) => compactSentences(x, 1, 220)), 10);
  if (Array.isArray(c.investigations)) c.investigations = c.investigations.map(normalizeInvestigation);
  if (c.findings?.investigations && Array.isArray(c.findings.investigations)) c.findings.investigations = c.findings.investigations.map(normalizeInvestigation);

  if (c.patientIntro && typeof c.patientIntro === 'object') {
    ['profile','presentation','historySummary','priorityFocus'].forEach((key) => {
      if (typeof c.patientIntro[key] === 'string') c.patientIntro[key] = compactSentences(c.patientIntro[key], key === 'historySummary' ? 3 : 1, key === 'historySummary' ? 380 : 230);
    });
    if (Array.isArray(c.patientIntro.riskContext)) c.patientIntro.riskContext = dedupeItems(c.patientIntro.riskContext.map(cleanSummaryItem), 4).filter(Boolean);
    if (Array.isArray(c.patientIntro.distinctiveClues)) c.patientIntro.distinctiveClues = dedupeItems(c.patientIntro.distinctiveClues.map(cleanSummaryItem), 5).filter(Boolean);
  }

  if (c.diagnosis && typeof c.diagnosis === 'object') {
    if (typeof c.diagnosis.explanation === 'string') c.diagnosis.explanation = buildWhyCorrect(c, c.diagnosis.explanation);
    if (Array.isArray(c.diagnosis.pearls)) c.diagnosis.pearls = dedupeItems(c.diagnosis.pearls.map((p, i) => normalizePearlItem(p, i)).filter(Boolean), 4);
    if (typeof c.diagnosis.nextStep === 'string') c.diagnosis.nextStep = compactSentences(c.diagnosis.nextStep, 3, 440);

    const fb = c.diagnosis.answerFeedback;
    if (fb && typeof fb === 'object') {
      if (typeof fb.whyCorrect === 'string') fb.whyCorrect = buildWhyCorrect(c, fb.whyCorrect);
      if (typeof fb.learningOutcome === 'string') fb.learningOutcome = compactSentences(fb.learningOutcome, 1, 230);
      if (typeof fb.spotClue === 'string') fb.spotClue = cleanSummaryItem(fb.spotClue);
      if (typeof fb.trap === 'string') fb.trap = compactSentences(fb.trap, 1, 230);
      if (Array.isArray(fb.evidenceChain)) fb.evidenceChain = dedupeItems(fb.evidenceChain.map((item, i) => normalizeEvidenceItem(item, i)).filter(Boolean), 5);
      if (Array.isArray(fb.clinicalPearls)) fb.clinicalPearls = dedupeItems(fb.clinicalPearls.map((item, i) => normalizePearlItem(item, i)).filter(Boolean), 4);
      if (Array.isArray(fb.pearls)) fb.pearls = dedupeItems(fb.pearls.map((item, i) => normalizePearlItem(item, i)).filter(Boolean), 4);
      if (Array.isArray(fb.managementSteps)) fb.managementSteps = dedupeItems(fb.managementSteps.map((item, i) => normalizeManagementItem(item, i)).filter(Boolean), 4);
      if (Array.isArray(fb.management)) fb.management = dedupeItems(fb.management.map((item, i) => normalizeManagementItem(item, i)).filter(Boolean), 4);
      if (fb.whyWrong && typeof fb.whyWrong === 'object' && !Array.isArray(fb.whyWrong)) {
        Object.keys(fb.whyWrong).forEach((option) => { fb.whyWrong[option] = buildWrongExplanation(c, option, fb.whyWrong[option]); });
      }
      if (fb.differentialComparison && typeof fb.differentialComparison === 'object') {
        Object.entries(fb.differentialComparison).forEach(([option, value]) => {
          if (value && typeof value === 'object') {
            value.explanation = buildWrongExplanation(c, option, value.explanation || fb.whyWrong?.[option] || '');
            value.comparisonPoints = dedupeItems((value.comparisonPoints || []).map((point) => compactSentences(point, 1, 160)), 3);
          }
        });
      }
    }
  }

  const after = JSON.stringify(c);
  return { case: c, changed: before !== after };
}

const processed = cases.map(processCase);
const updatedCases = processed.map((item) => item.case);
const changedCases = processed.filter((item) => item.changed).length;
let feedbackRewritten = 0;
let wrongFeedbackRewritten = 0;
let evidenceRewritten = 0;
let investigationTouched = 0;
for (const c of updatedCases) {
  if (c.diagnosis?.answerFeedback?.whyCorrect) feedbackRewritten += 1;
  const ww = c.diagnosis?.answerFeedback?.whyWrong;
  if (ww && typeof ww === 'object') wrongFeedbackRewritten += Object.keys(ww).length;
  const dc = c.diagnosis?.answerFeedback?.differentialComparison;
  if (dc && typeof dc === 'object') wrongFeedbackRewritten += Object.keys(dc).length;
  evidenceRewritten += c.diagnosis?.answerFeedback?.evidenceChain?.length || 0;
  investigationTouched += c.investigations?.length || 0;
}

const content = `export const cases = ${JSON.stringify(updatedCases, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
fs.writeFileSync(casesPath, content);

const allText = JSON.stringify(updatedCases);
const report = {
  generatedAt: new Date().toISOString(),
  embeddedCasesReviewed: updatedCases.length,
  embeddedCasesChanged: changedCases,
  answerFeedbackBlocksRewritten: feedbackRewritten,
  wrongAndDifferentialFeedbackItemsRewritten: wrongFeedbackRewritten,
  evidenceItemsNormalized: evidenceRewritten,
  investigationsReviewed: investigationTouched,
  residualPhraseCounts: {
    bestAnswerPhrase: (allText.match(/Bu nedenle en iyi yanıt/giu) || []).length,
    weakEvidenceTitles: (allText.match(/Karar verdirici ipucu|Destekleyici kanıt|Ayırt ettirici ipucu/giu) || []).length,
    eliminatedTemplate: (allText.match(/bu olguda elenir:/giu) || []).length,
    metaDistractorLanguage: (allText.match(/çeldirici/giu) || []).length,
    ellipsis: (allText.match(/\.\.\.|…/gu) || []).length,
    semicolons: (allText.match(/;/gu) || []).length,
    brokenSentenceEndings: (allText.match(BROKEN_END_RE) || []).length,
  },
};
fs.writeFileSync(path.join(root, 'EDITORIAL_QUALITY_PASS_REPORT.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
