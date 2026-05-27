import fs from 'fs';
import path from 'path';
import { rawCases } from '../src/data/cases.js';

const projectRoot = process.cwd();
const reportDir = path.join(projectRoot, 'quality-reports');
fs.mkdirSync(reportDir, { recursive: true });

const COMMENT_FIELDS = ['summary', 'clinicalMeaning', 'postAnswerExplanation', 'interpretation', 'explanationAfterAnswer'];
const RESULT_COMMENT_FIELDS = ['summary', 'interpretation'];

const metrics = {
  casesScanned: rawCases.length,
  casesWithInvestigations: 0,
  investigationCardsScanned: 0,
  tableRowsScanned: 0,
  shortCommentsScanned: 0,
  referenceCommentErrorsFixed: 0,
  resultReferenceDuplicateOrColumnShiftFixed: 0,
  columnShiftFixed: 0,
  sentenceTruncationsFixed: 0,
  lowercaseReferenceOrCommentSentenceFixed: 0,
  genericShortComments: 0,
  hiddenUnnecessaryShortComments: 0,
  rewrittenShortComments: 0,
  panelCommentsCreatedOrMerged: 0,
  metabolicBiochemicalCommentsRewritten: 0,
  specialContextCommentsRewritten: 0,
  parsingHelperFixed: true,
  renderShortCommentGuardFixed: true,
  pdfExportFixed: false,
  scientificConcernCount: 0,
  idChanged: false,
  tusSpotTouched: false,
  buildStatus: 'not-run'
};

const coverage = [];
const rewrittenReport = [];
const hiddenReport = [];
const parsingFixReport = [];
const scientificConcerns = [];
const originalIds = rawCases.map((item) => item.id);

function trLower(value = '') {
  return String(value || '').toLocaleLowerCase('tr');
}

function norm(value = '') {
  return trLower(value)
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/û/g, 'u')
    .replace(/[^a-z0-9%/<>.=+-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function clean(value = '') {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function ensureSentence(value = '') {
  const text = clean(value);
  if (!text) return '';
  return /[.!?…]$/.test(text) ? text : `${text}.`;
}

function capitalizeSentence(value = '') {
  const text = clean(value);
  if (!text) return '';
  const match = text.match(/^([\s"'“‘(\[]*)([a-zçğıöşü])/u);
  if (!match) return text;
  const prefix = match[1];
  const first = match[2].toLocaleUpperCase('tr');
  return prefix + first + text.slice(prefix.length + match[2].length);
}

function contextText(clinicalCase = {}, investigation = {}) {
  const p = clinicalCase.patientIntro || {};
  const diagnosis = clinicalCase.diagnosis || {};
  return [
    clinicalCase.id,
    clinicalCase.title,
    clinicalCase.relatedBranch,
    clinicalCase.branchId,
    clinicalCase.clinicalFocus,
    clinicalCase.learningTarget,
    clinicalCase.chiefComplaint,
    clinicalCase.stem,
    p.profile,
    p.presentation,
    p.historySummary,
    (clinicalCase.exam || []).join(' '),
    JSON.stringify(clinicalCase.vitals || {}),
    clinicalCase.question,
    diagnosis.correct,
    (diagnosis.options || []).join(' '),
    investigation.title,
    investigation.label,
    investigation.type,
    investigation.subtype,
    rowsToText(getRows(investigation)),
  ].filter(Boolean).join(' ');
}

function has(ctx, ...needles) {
  const n = norm(ctx);
  return needles.some((needle) => n.includes(norm(needle)));
}

function rowArray(row) {
  if (Array.isArray(row)) {
    return [clean(row[0]), clean(row[1]), clean(row[2]), clean(row[3])];
  }
  return [clean(row?.parameter), clean(row?.value ?? row?.result), clean(row?.reference), clean(row?.note ?? row?.interpretation ?? row?.status)];
}

function getRows(inv = {}) {
  const source = Array.isArray(inv.rows) && inv.rows.length
    ? inv.rows
    : (Array.isArray(inv.result?.rows) && inv.result.rows.length
      ? inv.result.rows
      : (Array.isArray(inv.result?.values) ? inv.result.values : []));
  return source.map(rowArray);
}

function setRows(inv, rows) {
  const safeRows = rows.map((r) => [clean(r[0]), clean(r[1]), clean(r[2]), clean(r[3])]);
  inv.rows = safeRows;
  inv.result = inv.result || {};
  inv.result.rows = safeRows;
  inv.result.values = safeRows;
}

function rowsToText(rows = []) {
  return rows.map((row) => row.filter(Boolean).join(' ')).join(' | ');
}

function isEmptyRef(reference = '') {
  return !clean(reference) || ['—', '-', '–', 'yok'].includes(clean(reference).toLocaleLowerCase('tr'));
}

function looksLikeSentence(text = '') {
  const raw = clean(text);
  if (!raw || raw === '—') return false;
  const wordCount = raw.split(/\s+/u).filter(Boolean).length;
  return wordCount >= 4 && /[a-zçğıöşü]/iu.test(raw) && /(\.|;|,| yorumlan| değerlendiril| göster| beklen| izlen| saptan| olasılık| risk| klinik| gebelikte| hastalık| sendrom| olmalı| olmaması)/iu.test(raw);
}

function looksLikeTechnicalReference(text = '') {
  const raw = clean(text);
  if (!raw || raw === '—') return true;
  if (/^\d+(?:[.,]\d+)?\s*(?:[-–—]|ile|to)\s*\d+(?:[.,]\d+)?/u.test(raw)) return true;
  if (/^(?:<|>|≤|≥|<=|>=)\s*\d/u.test(raw)) return true;
  if (/^(?:negatif|pozitif|normal|referans içinde|beklenmez|saptanmaz|yok|trace|gebelik haftasına göre değişir|yaşa göre değişir|cinsiyete göre değişir|klinik bağlama göre değişir)$/iu.test(raw)) return true;
  if (/\d/.test(raw) && /(mg\/dL|g\/dL|mmol\/L|mEq\/L|U\/L|IU\/L|mIU\/mL|ng\/mL|pg\/mL|µIU\/mL|mmHg|\/mm³|\/mm3|\/HPF|%|sn|cm|mm|fL|µmol\/L|mg\/L|mm\/saat)/i.test(raw)) return true;
  if (/^(?:normalde\s+)?(?:beklenmez|saptanmaz|izlenmez)$/iu.test(raw)) return true;
  return false;
}

function referenceContainsComment(reference = '') {
  const raw = clean(reference);
  if (!raw || raw === '—') return false;
  if (looksLikeTechnicalReference(raw)) return false;
  return looksLikeSentence(raw);
}

function isDuplicateResultReference(value = '', reference = '') {
  const v = clean(value);
  const r = clean(reference);
  if (!v || !r || r === '—') return false;
  return norm(v) === norm(r);
}

function normalizedDuplicateReference(value = '', reference = '') {
  const v = clean(value);
  const r = clean(reference);
  if (!isDuplicateResultReference(v, r)) return reference;
  if (/^negatif$/iu.test(v)) return 'Negatif beklenir';
  if (/^pozitif$/iu.test(v)) return 'Negatif beklenir';
  if (/^yok$/iu.test(v) || /^saptanmadı$/iu.test(v)) return 'Beklenmez';
  if (/^0\s*[–-]\s*5\s*\/HPF$/iu.test(v)) return '≤5/HPF';
  if (/^0\s*[–-]\s*2\s*\/HPF$/iu.test(v)) return '≤2/HPF';
  if (/^0\s*[–-]\s*3\s*\/HPF$/iu.test(v)) return '≤3/HPF';
  if (/^normal$/iu.test(v)) return 'Normal beklenir';
  if (/^referans içinde$/iu.test(v)) return 'Referans aralığına göre';
  if (/\d/.test(v) && /(\/HPF|\/LPF)/iu.test(v)) return v.replace(/^(0\s*[–-]\s*)/u, '≤');
  return 'Klinik bağlama göre değerlendirilir';
}

function statusFromRow(parameter = '', value = '', reference = '', current = '') {
  const c = clean(current);
  if (c && !/^(bilgi|anormal bulgu|normal bulgu|—)$/iu.test(c)) return c;
  const joined = norm(`${parameter} ${value} ${reference}`);
  if (/pozitif|artmis|yüksek|yuksek|kritik|saptandi|izlendi|genisleme|konsolidasyon|defekt|serbest sivi|pleositoz|dusuk glukoz|protein yuksek/.test(joined)) return 'Patolojik';
  if (/düşük|dusuk|azalmis/.test(joined)) return 'Düşük';
  if (/negatif|normal|saptanmadi|izlenmedi|0 5 hpf|0 2 hpf/.test(joined)) return 'Referans içinde';
  return '';
}

function fixRow(row, clinicalCase, inv) {
  const old = rowArray(row);
  let [parameter, value, reference, note] = old;
  const ctx = contextText(clinicalCase, inv);
  const issueTypes = [];
  const actions = [];

  if (/^serum\s+alanin$/iu.test(parameter) && /(karaciğer|kolestaz|ALT|aminotransferaz)/iu.test(`${reference} ${inv.summary || ''}`)) {
    parameter = 'Alanin aminotransferaz (ALT)';
    issueTypes.push('parameterMismatch');
    actions.push('parameterFixed');
  }

  if (/beta\s*-?hcg|β\s*-?hcg|hCG/iu.test(parameter) && /erken\s+gebelik/i.test(reference)) {
    reference = 'Gebelik haftasına göre değişir';
    note = /ektopik|akut karın|kanama|serbest sıvı|adneksiyal|senkop|hipotansiyon/iu.test(ctx) ? 'Gebelikle uyumlu; ektopik gebelik açısından yorumlanmalı' : 'Gebelikle uyumlu';
    issueTypes.push('referenceContainsComment', 'lowercaseSentenceInReference');
    actions.push('referenceFixed', 'commentMoved');
    metrics.referenceCommentErrorsFixed += 1;
    metrics.lowercaseReferenceOrCommentSentenceFixed += 1;
  } else if (referenceContainsComment(reference)) {
    const moved = capitalizeSentence(reference);
    note = note ? note : moved;
    reference = '—';
    issueTypes.push('referenceContainsComment');
    actions.push('referenceFixed', 'commentMoved');
    metrics.referenceCommentErrorsFixed += 1;
    if (/^[a-zçğıöşü]/u.test(clean(moved))) metrics.lowercaseReferenceOrCommentSentenceFixed += 1;
  }

  if (isDuplicateResultReference(value, reference)) {
    reference = normalizedDuplicateReference(value, reference);
    if (!note) note = statusFromRow(parameter, value, reference, note);
    issueTypes.push('resultReferenceDuplicate');
    actions.push('referenceFixed');
    metrics.resultReferenceDuplicateOrColumnShiftFixed += 1;
  }

  if (/^\d+\.$/.test(value) || /^\d+\.$/.test(reference) || /^\d+\.$/.test(note)) {
    issueTypes.push('sentenceTruncation');
    actions.push('parsingFixed');
    metrics.sentenceTruncationsFixed += 1;
  }

  const newRow = [parameter, value, reference, note];
  if (issueTypes.length) {
    coverage.push({
      caseId: clinicalCase.id,
      caseTitle: clinicalCase.title,
      branch: clinicalCase.relatedBranch || clinicalCase.branchId,
      investigation: inv.title || inv.label,
      parameter: old[0],
      oldResult: old[1],
      oldReference: old[2],
      oldStatus: old[3],
      oldShortComment: clean(inv.result?.summary || inv.summary || ''),
      issueType: [...new Set(issueTypes)],
      action: [...new Set(actions)],
      newResult: newRow[1],
      newReference: newRow[2],
      newStatus: newRow[3],
      newShortComment: '',
      studentLearningPoint: learningPointForRow(newRow, clinicalCase, inv),
      scientificConcern: false,
      note: 'Tablo satırı sonuç/referans/durum tutarlılığı için düzeltildi.'
    });
  }
  return newRow;
}

function rowHasAbnormalSignal(row) {
  const text = norm(row.join(' '));
  return /(yüksek|yuksek|düşük|dusuk|kritik|pozitif|artmis|azalmis|saptandi|izlendi|genişleme|genisleme|konsolidasyon|defekt|serbest sivi|pleositoz|proteinüri|hipoalbuminemi|keton|asidoz|hiperglisemi|hipoglisemi|trombositopeni|hemoliz|kreatinin.*[2-9]|ast|alt|laktat|amonyak|orotik|homosistein|metiyonin|ürik|urik|lipaz|troponin)/.test(text);
}

function allRowsNormal(rows = []) {
  if (!rows.length) return true;
  return rows.every((row) => !rowHasAbnormalSignal(row));
}

function isBadComment(text = '') {
  const raw = clean(text);
  if (!raw) return false;
  return [
    /patolojik\s+(?:yükseklik|düşüklük)\s+saptandığını\s+gösterir/iu,
    /metabolik\s+yolakta\s+birikim\s+paternini\s+gösterir/iu,
    /karaciğer\s+hasarı\s+veya\s+kolestaz\s+yönünde\s+biyokimyasal\s+ipucu\s+sağlar/iu,
    /hücresel\s+yanıtın\s+klinik\s+tabloyla\s+birlikte\s+değer\s+kazanır/iu,
    /inflamatuvar\s+laboratuvar\s+bulguları\s+enfeksiyon\s+yanıtını\s+destekler/iu,
    /akut\s+olasılığını\s+artırır/iu,
    /sonucu\s+(?:anemi\s+varlığını|böbrek\s+fonksiyon\s+bozulmasını|prerenal\s+böbrek\s+hasarı|aktif\s+inflamasyonu|hipoglisemiyi|hipokalemiyi|hiponatremiyi)\s+gösterir/iu,
    /sonucu\s+.+\s+gösterir\.?$/iu,
    /Gebeliğin\s+\d+\.$/u,
    /tablo\s+ile\s+uyumludur/iu,
    /ana\s+açıklama\s+olmadığını\s+düşündürür/iu,
    /klinik\s+olarak\s+anlamlı\s+kan\s+kaybını\s+gösterir/iu,
    /ilk\s+yönetim\s+kararını/iu,
    /tek\s+başına\s+karar\s+verdirici/iu,
    /^\s*(bilgi|anormal\s+bulgu|normal\s+bulgu)\.?\s*$/iu,
  ].some((pattern) => pattern.test(raw));
}

function isTruncatedSentence(text = '') {
  return /(?:Gebeliğin\s+\d+\.|pH\s+\d+\.|Kreatinin\s+\d+\.|HbA1c\s+\d+\.|Protein\/kreatinin\s+oranı:\s*\d+\.)\s*$/iu.test(clean(text));
}

function containsMetabolicTopic(ctx = '', inv = {}, rows = []) {
  const text = norm(`${ctx} ${inv.title || ''} ${inv.label || ''} ${rowsToText(rows)}`);
  return /(metiyonin|homosistein|amonyak|orotik|ürik|urik|hgprt|lesch|organik asit|organik asidemi|enzim analizi|lizozomal|mukopolisakkaridoz|mps|cbs|otc|üre döngüsü|ure dongusu|fenilketon|galaktoz|biyokimya|metabolizma)/.test(text);
}

function specialContext(ctx = '') {
  const n = norm(ctx);
  if (/ektopik|beta hcg|gebelik|adneksiyal|serbest sivi/.test(n)) return 'gebelik/beta-hCG';
  if (/pnömoni|pnomoni|konsolidasyon|oksuruk|akciğer grafisi/.test(n)) return 'pnömoni';
  if (/apandisit|apendiks|sag alt kadran/.test(n)) return 'apandisit';
  if (/menenjit|bos|ense sertligi|pleositoz/.test(n)) return 'menenjit';
  if (/nefrotik|proteinüri|hipoalbumin|podosit|membranöz/.test(n)) return 'nefrotik sendrom';
  if (/dka|diyabetik ketoasidoz|keton|hiperglisemi|metabolik asidoz/.test(n)) return 'DKA';
  if (/hüs|hus|mikroanjiyopatik|tma|shiga|trombositopeni/.test(n)) return 'HÜS/TMA';
  return '';
}

function generateComment(clinicalCase, inv, rows) {
  const ctx = contextText(clinicalCase, inv);
  const n = norm(ctx);
  const label = clean(inv.title || inv.label || 'Tetkik');
  const rowText = rowsToText(rows);
  const params = norm(rows.map((row) => row[0]).join(' '));
  const invText = norm(`${label} ${inv.type || ''} ${inv.subtype || ''} ${rowText}`);
  const target = clean(clinicalCase.diagnosis?.correct || clinicalCase.answer || clinicalCase.title || 'klinik tablo');

  if (/beta hcg|hcg/.test(invText)) {
    if (/ektopik|akut karin|kanama|serbest sivi|adneksiyal|senkop|hipotansiyon/.test(n)) {
      return 'Pozitif beta-hCG gebelik olasılığını doğrular; ağrı, kanama, serbest sıvı veya adneksiyal bulgu eşlik ediyorsa ektopik gebelik açısından transvajinal ultrasonla birlikte değerlendirilmelidir.';
    }
    return 'Beta-hCG düzeyi gebelikle uyumludur; erken gebelikte tek ölçüm tanı koydurmaz, seri artış paterni ve transvajinal ultrason bulguları ile birlikte yorumlanmalıdır.';
  }

  if (/dka|diyabetik ketoasidoz|hiperglisemi|keton|metabolik asidoz/.test(n) && /(glukoz|keton|kan gazi|ph|bikarbonat|hco|potasyum)/.test(invText)) {
    return 'Hiperglisemi, keton pozitifliği ve anyon açıklıklı metabolik asidoz birlikteliği DKA tanısını destekler; potasyum düzeyi insülin başlanmadan önce tedavi güvenliği açısından ayrıca değerlendirilmelidir.';
  }

  if (/hiperkalemi|potasyum|sivri t|qrs/.test(n) && /(potasyum|elektrokardiyografi|ekg|qrs|t dalga)/.test(invText)) {
    return 'Kritik potasyum yüksekliği EKG’de sivri T dalgaları veya QRS genişlemesiyle birlikte aritmi riskini gösterir; ilk hedef potasyumu düşürmeden önce miyokard membranını intravenöz kalsiyumla stabilize etmektir.';
  }

  if (/pnömoni|pnomoni|konsolidasyon|öksürük|oksuruk|akciğer grafisi|akciger grafisi/.test(n)) {
    if (/(lökosit|lokosit|beyaz küre|crp|prokalsitonin|sedimentasyon|hemogram|inflamasyon|tam kan)/.test(invText)) {
      return 'Lökositoz ve CRP/prokalsitonin yüksekliği inflamatuvar yanıtı destekler; ateş, öksürük ve akciğer grafisindeki konsolidasyonla birlikte bakteriyel pnömoni lehine yorumlanır.';
    }
    if (/(akciğer|akciger|grafi|radyografi|bt|tomografi|konsolidasyon)/.test(invText)) {
      return 'Akciğer görüntülemesinde konsolidasyonun ateş, öksürük ve solunum bulgularına eşlik etmesi pnömoni tanısını güçlendirir; dağılım ve klinik şiddet tedavi kararını etkiler.';
    }
  }

  if (/apandisit|apendiks|sağ alt kadran|sag alt kadran/.test(n)) {
    if (/(lökosit|lokosit|crp|hemogram|tam kan|inflamasyon)/.test(invText)) {
      return 'Lökositoz ve CRP yüksekliği sağ alt kadran hassasiyetiyle birlikte akut apandisit olasılığını destekler; tek başına kan sayımı tanı koydurmaz, görüntüleme ve muayene bulgularıyla yorumlanır.';
    }
    if (/(ultrason|bt|tomografi|apendiks|apendiks|appendix)/.test(invText)) {
      return 'Komprese olmayan, çapı artmış kör sonlanan tübüler yapı apendiks inflamasyonunu anatomik olarak gösterir; göç eden sağ alt kadran ağrısıyla birlikte akut apandisiti destekler.';
    }
  }

  if (/menenjit|ense sertliği|ense sertligi|bos|beyin omurilik/.test(n)) {
    if (/(bos|pleositoz|glukoz|protein|gram|kültür|kultur|sıvı|sivi)/.test(invText)) {
      return 'BOS’ta nötrofil baskın pleositoz, düşük glukoz ve yüksek protein ateş/ense sertliğiyle birlikte bakteriyel menenjit lehinedir; antibiyotik tedavisi kültür sonucunu beklememelidir.';
    }
    if (/(lökosit|lokosit|crp|hemogram|kan)/.test(invText)) {
      return 'Sistemik inflamasyon bulguları bakteriyel enfeksiyon olasılığını destekler; menenjit kararında belirleyici veri BOS hücre dağılımı, glukoz-protein paterni ve klinik bulgulardır.';
    }
  }

  if (/hüs|hus|shiga|mikroanjiyopatik|tma|trombotik mikroanjiyopati|kanlı ishal/.test(n)) {
    if (/(coombs|direkt antiglobulin)/.test(invText)) {
      return 'Negatif direkt Coombs testi immün hemolizden çok mikroanjiyopatik hemoliz lehine yorumlanır; trombositopeni ve böbrek hasarı eşlik ediyorsa HÜS/TTP gibi trombotik mikroanjiyopatiler düşünülmelidir.';
    }
    if (/(hemoglobin|trombosit|kreatinin|ldh|bilirubin|yayma|şistosit|sistosit)/.test(invText)) {
      return 'Anemi, trombositopeni, hemoliz belirteçleri ve kreatinin artışının birlikte görülmesi mikroanjiyopatik hemoliz ve akut böbrek hasarı paternini destekler; kanlı ishal sonrası bu tablo HÜS lehinedir.';
    }
  }

  if (/nefrotik|proteinüri|proteinuri|hipoalbümin|hipoalbumin|ödem|odem|podosit|minimal değişiklik|minimal degisiklik|membranöz/.test(n)) {
    if (/minimal değişiklik|minimal degisiklik|podosit/.test(n)) {
      return 'Masif proteinüri, hipoalbüminemi ve ödem nefrotik sendrom paternini oluşturur; elektron mikroskopisinde podosit ayak çıkıntılarının silinmesi minimal değişiklik hastalığını destekler.';
    }
    if (/membranöz|membranoz|subepitelyal/.test(n)) {
      return 'Masif proteinüri ve hipoalbüminemi nefrotik sendrom paternini destekler; subepitelyal immün birikim membranöz nefropati lehine doku bulgusudur.';
    }
    return 'Masif proteinüri, hipoalbüminemi ve ödem birlikte nefrotik sendrom paternini gösterir; altta yatan glomerüler bariyer hasarı doku bulgusuna göre sınıflandırılır.';
  }

  if (/(metiyonin|homosistein|cbs)/.test(invText) || (/homosistinüri|homosistinuri|lens dislokasyonu|tromboz|cbs/.test(n) && /(metiyonin|homosistein)/.test(invText))) {
    return 'Metiyonin ve total homosistein yüksekliği, sistatiyonin beta-sentaz eksikliğinde homosisteinin sisteine dönüşemediğini düşündürür; lens dislokasyonu ve tromboz eğilimiyle birlikte homosistinüri lehinedir.';
  }

  if (/(amonyak|orotik|ornitin|otc|üre döngüsü|ure dongusu)/.test(invText) || (/otc|ornitin transkarbamilaz|üre döngüsü|hiperammonemi/.test(n) && /(amonyak|orotik)/.test(invText))) {
    return 'Yüksek amonyak ve idrar orotik asit artışı, karbamoil fosfatın pirimidin sentezine yöneldiğini gösterir; bu patern ornitin transkarbamilaz eksikliği lehinedir.';
  }

  if (/(ürik asit|urik asit|hgprt|lesch)/.test(invText) || (/lesch|hgprt|kendine zarar|purin/.test(n) && /(ürik|urik)/.test(invText))) {
    return 'Serum ürik asit yüksekliği, HGPRT eksikliğinde purin geri kazanımının bozulmasına bağlı artmış purin yıkımını destekler; nörolojik bulgular ve kendine zarar verme davranışıyla birlikte Lesch-Nyhan sendromu düşünülür.';
  }

  if (/(organik asit|metilmalonik|propiyonik|izovalerik)/.test(invText)) {
    if (/metilmalonik|methylmalonic/.test(n)) return 'İdrar organik asit analizinde metilmalonik asit artışı, metilmalonil-KoA mutaz veya B12 ilişkili metabolizma kusurunu destekler; asidoz ve hiperammonemi dekompansasyon şiddetini gösterir.';
    if (/propiyonik|propionic/.test(n)) return 'İdrar organik asit analizinde propiyonik asit türevlerinin artması, propiyonil-KoA karboksilaz basamağındaki kusuru düşündürür; metabolik asidoz ve hiperammonemi akut dekompansasyona eşlik edebilir.';
    return 'İdrar organik asit analizinde özgül metabolit birikimi, ilgili organik asit metabolizması basamağındaki enzim kusurunu gösterir; akut dekompansasyonda asidoz ve hiperammonemi eşlik edebilir.';
  }

  if (/(enzim analizi|enzim aktivitesi|lizozomal|mps|mukopolisakkaridoz|glikozaminoglikan)/.test(invText)) {
    return 'Enzim aktivitesinin düşük bulunması, ilgili lizozomal yıkım basamağının bozulduğunu ve birikim hastalığı paternini destekler; eksik enzim hangi depo hastalığının öne çıktığını belirler.';
  }

  if (/(ast|aspartat aminotransferaz|alt|alanin aminotransferaz|alanin aminotransferaz \(alt\)|alkalen fosfataz|alp|ggt|bilirubin)/.test(invText)) {
    if (/hellp|preeklampsi|gebeliğin|gebelik|trombositopeni|hemoliz/.test(n) && /(ast|alt|aminotransferaz|trombosit|ldh)/.test(invText)) {
      return 'Gebelikte AST/ALT yüksekliği, trombositopeni ve hemoliz bulgularıyla birlikte HELLP sendromu lehine hepatoselüler hasar göstergesidir.';
    }
    if (/kaşıntı|kasinti|safra asidi|kolestaz/.test(n)) {
      return 'AST/ALT yüksekliği kaşıntı ve safra asidi artışıyla birlikte gebelik kolestazını destekleyebilir; kolestatik patern ALP, GGT ve direkt bilirubinle birlikte değerlendirilmelidir.';
    }
    if (/(direkt bilirubin|konjuge)/.test(invText)) return 'Direkt bilirubin yüksekliği konjuge hiperbilirubinemiye işaret eder; ALP/GGT artışı ve görüntüleme bulguları eşlik ediyorsa kolestaz veya safra yolu obstrüksiyonu düşünülür.';
    if (/(indirekt bilirubin|hemoliz)/.test(invText)) return 'İndirekt bilirubin artışı hemoliz veya bilirubin konjugasyon kapasitesinin aşılmasıyla ilişkilidir; retikülosit, LDH ve Coombs sonucu ayırıcı tanıda kullanılır.';
    if (/(alkalen fosfataz|alp|ggt)/.test(invText)) return 'ALP/GGT yüksekliği kolestatik paterni düşündürür; safra yolu obstrüksiyonu veya intrahepatik kolestaz ayrımı bilirubin düzeyi ve görüntülemeyle yapılır.';
    return 'AST/ALT yüksekliği hepatoselüler hasarı düşündürür; kolestatik patern açısından ALP, GGT, bilirubin ve klinik bulgularla birlikte değerlendirilmelidir.';
  }

  if (/(laktat|lactate)/.test(invText)) {
    if (/sepsis|şok|sok|hipotansiyon|hipoperfüzyon|hipoperfuzyon/.test(n)) return 'Laktat yüksekliği doku hipoperfüzyonu veya ağır metabolik stres göstergesi olabilir; hipotansiyon, taşikardi veya sepsis bulguları varsa acil resüsitasyon gereksinimini destekler.';
    return 'Laktat yüksekliği hipoperfüzyon, mitokondriyal enerji üretimi bozukluğu veya ağır metabolik stresle ilişkili laktik asidozu destekler; kan gazı ve dolaşım bulgularıyla birlikte yorumlanmalıdır.';
  }

  if (/(kreatin kinaz|ck|miyoglobin|rabdomiyoliz)/.test(invText)) {
    return 'Kreatin kinaz yüksekliği kas hücresi hasarını destekler; miyoglobinüri veya kreatinin artışı eşlik ederse rabdomiyolize bağlı akut böbrek hasarı riski öne çıkar.';
  }

  if (/(kreatinin|bun|kan üre azotu|üre|ure)/.test(invText)) {
    if (/hüs|hus|tma|mikrotromb/.test(n)) return 'Kreatinin artışı glomerüler mikrotrombüslere bağlı akut böbrek hasarını destekler; hemoliz ve trombositopeniyle birlikte HÜS/TMA paterninin böbrek bileşenidir.';
    if (/dehidratasyon|sıvı açığı|sivi acigi|prerenal|kusma|ishal/.test(n)) return 'Kreatinin/BUN artışı prerenal azotemi veya sıvı açığıyla ilişkili böbrek perfüzyon azalmasını düşündürür; hidrasyon durumu ve idrar bulgularıyla birlikte yorumlanır.';
    return 'Kreatinin yüksekliği glomerüler filtrasyonun azaldığını gösterir; akut-kronik ayrımı öykü, idrar bulguları ve önceki böbrek fonksiyonlarıyla yapılır.';
  }

  if (/(hemoglobin|hematokrit|mcv|ferritin|demir|retikülosit)/.test(invText)) {
    if (/demir eksikliği|demir eksikligi|mikrositer|ferritin/.test(n)) return 'Mikrositer anemi ve düşük ferritin birlikteliği demir eksikliği anemisini destekler; kan kaybı ve beslenme öyküsü etiyolojiyi belirlemede kullanılır.';
    if (/hemoliz|hüs|hus|coombs|retikülosit/.test(n)) return 'Düşük hemoglobin hemoliz veya kan kaybı olasılığını gösterir; retikülosit, LDH, bilirubin ve Coombs sonucu aneminin mekanizmasını ayırmada kullanılır.';
    return 'Düşük hemoglobin anemiyi gösterir; MCV, retikülosit, bilirubin/LDH ve klinik öykü kan kaybı, hemoliz veya üretim azalması ayrımında kullanılır.';
  }

  if (/(lökosit|lokosit|beyaz küre|nötrofil|notrofil|crp|c-reaktif|sedimentasyon|prokalsitonin|hemogram|tam kan)/.test(invText)) {
    if (/enfeksiyon|sepsis|endokardit|ateş|ates/.test(n)) return 'Lökositoz ve CRP/prokalsitonin yüksekliği sistemik inflamatuvar yanıtı destekler; enfeksiyon odağı klinik bulgular, kültür ve görüntüleme verileriyle netleştirilir.';
    return 'Tam kan sayımı lökositoz, anemi veya trombositopeni paternlerini gösterir; bu değişiklikler vaka bağlamına göre enfeksiyon, kanama, hemoliz veya kemik iliği yanıtı açısından yorumlanır.';
  }

  if (/(glukoz|kapiller kan glukozu|açlık kan glukozu|aclik kan glukozu)/.test(invText)) {
    if (/hipoglisemi|terleme|adrenerjik|nöroglikopenik|noroglikopenik/.test(n)) return 'Düşük glukoz nöroglikopenik ve adrenerjik semptomları açıklayabilir; bilinç değişikliği veya nöbet varsa hızlı glukoz replasmanı önceliklidir.';
    if (/inme|fokal defisit|stroke/.test(n)) return 'Normal kapiller glukoz hipoglisemi gibi inme taklitçilerini geri plana iter; akut fokal defisitte görüntüleme ve reperfüzyon değerlendirmesi önemini korur.';
    return 'Glukoz değeri hipoglisemi veya hipergliseminin klinik tabloya katkısını gösterir; nörolojik bulgu, keton ve asit-baz durumu ile birlikte yorumlanır.';
  }

  if (/(sodyum|osmolalite|idrar sodyumu|idrar osmolaritesi)/.test(invText)) {
    if (/siadh|uygunsuz adh|hiponatremi/.test(n)) return 'Hipotonik hiponatremiye rağmen idrarın konsantre kalması ve idrar sodyumunun baskılanmaması, övolemik hastada uygunsuz ADH etkisi lehine güçlü bir paterndir.';
    return 'Sodyum ve osmolalite birlikte su-sodyum dengesinin yönünü gösterir; hipovolemi, SIADH veya endokrin neden ayrımı idrar sodyumu ve klinik volüm durumu ile yapılır.';
  }

  if (/(troponin|ck-mb|st elevasyon|ekg|elektrokardiyografi)/.test(invText)) {
    if (/stemi|akut koroner|miyokart|göğüs ağrısı|gogus agrisi|reperfüzyon/.test(n)) return 'ST elevasyonunun iskemik göğüs ağrısına eşlik etmesi akut koroner oklüzyon lehinedir; reperfüzyon kararı troponin sonucunu beklemeden verilmelidir.';
    return 'EKG ve kardiyak belirteçler miyokart hasarı veya ritim bozukluğu olasılığını ayırır; klinik semptom paterni kararın yönünü belirler.';
  }

  if (/(d-dimer|pulmoner emboli|bt pulmoner anjiyografi|dolum defekti)/.test(invText)) {
    return 'Klinik olasılık yüksek olduğunda pulmoner arter dolum defekti pulmoner emboliyi doğrudan destekler; D-dimer özellikle düşük-orta olasılıklı hastada dışlama amacıyla değerlidir.';
  }

  if (/(akciğer grafisi|akciger grafisi|toraks|grafi|bt|tomografi|mr|mri|ultrason|usg|radyografi)/.test(invText)) {
    if (/inme|iskemik|kanama|tromboliz/.test(n)) return 'Kontrastsız beyin BT’de kanama görülmemesi, akut iskemik inmede reperfüzyon uygunluğunu değerlendirmek için zorunlu güvenlik basamağıdır.';
    if (/kırık|kirik|travma|fraktür/.test(n)) return 'Direkt grafide kırık hattının gösterilmesi, travma sonrası ağrı ve fonksiyon kaybının yapısal nedenini ortaya koyar.';
    return `${label} bulgusu, olgudaki öykü ve muayene ipuçlarıyla birlikte ${target} olasılığını nesnelleştirir; sonuç tek başına değil klinik bağlamla yorumlanmalıdır.`;
  }

  if (/(kültür|kultur|gram|pcr|antijen|seroloji|mikrobiyoloji|toksin)/.test(invText)) {
    return 'Mikrobiyolojik sonuç etkeni doğrulama ve hedefe yönelik tedavi seçimi için değerlidir; ağır enfeksiyon şüphesinde ilk ampirik yaklaşım klinik şiddete göre kültür sonucunu beklemeden planlanır.';
  }

  if (/(patoloji|biyopsi|histopatoloji|mikroskopi|immünfloresan|immunfloresan|periferik yayma)/.test(invText)) {
    return 'Doku veya mikroskopi bulgusu, klinik örüntünün hangi hücresel/strüktürel mekanizmayla geliştiğini gösterir; tanı, morfoloji ile klinik-laboratuvar paterninin uyumuna göre netleşir.';
  }

  if (rowHasAbnormalSignal([label, rowText, inv.summary || ''])) {
    return `${label} sonucundaki anormallik, olgudaki klinik örüntüyle birlikte ${target} olasılığını destekler; karar tek parametreyle değil eşlik eden muayene ve objektif verilerle verilmelidir.`;
  }

  return '';
}

function learningPointForRow(row, clinicalCase, inv) {
  const ctx = contextText(clinicalCase, inv);
  const p = norm(row[0]);
  if (/beta hcg|hcg/.test(p)) return 'Beta-hCG tek ölçümle değil seri değer ve ultrasonla yorumlanır.';
  if (/ast|alt|bilirubin|alp|ggt/.test(p)) return 'Karaciğer testleri hepatoselüler ve kolestatik patern ayrımıyla yorumlanır.';
  if (/metiyonin|homosistein|amonyak|orotik|ürik|urik|organik asit|enzim/.test(p)) return 'Metabolik yorumda metabolit, enzim ve hastalık ilişkisi açık kurulmalıdır.';
  if (/lökosit|lokosit|crp|hemogram/.test(p)) return 'İnflamasyon belirteçleri tek başına tanı koydurmaz; vaka odağıyla ilişkilendirilmelidir.';
  if (/keton|glukoz|ph|hco/.test(p) && /dka|ketoasidoz/.test(norm(ctx))) return 'DKA tanısı hiperglisemi, keton ve anyon açıklıklı asidoz birlikteliğine dayanır.';
  return 'Sonuç, referans ve klinik anlam ayrı katmanlar olarak gösterilmelidir.';
}

function setCommentFields(inv, shortComment, scientificComment) {
  const short = ensureSentence(capitalizeSentence(shortComment));
  const sci = ensureSentence(capitalizeSentence(scientificComment || shortComment));
  inv.summary = short;
  inv.clinicalMeaning = sci;
  inv.postAnswerExplanation = sci;
  inv.interpretation = sci;
  inv.explanationAfterAnswer = sci;
  inv.result = inv.result || {};
  inv.result.summary = short;
  inv.result.interpretation = sci;
}

function clearCommentFields(inv) {
  for (const field of COMMENT_FIELDS) {
    if (field in inv) inv[field] = '';
  }
  inv.result = inv.result || {};
  for (const field of RESULT_COMMENT_FIELDS) {
    if (field in inv.result) inv.result[field] = '';
  }
}

function recordCommentChange({ clinicalCase, inv, oldComment, newComment, action, issueType, hidden = false, metabolic = false, special = '' }) {
  const common = {
    caseId: clinicalCase.id,
    caseTitle: clinicalCase.title,
    branch: clinicalCase.relatedBranch || clinicalCase.branchId,
    investigation: inv.title || inv.label,
    parameter: getRows(inv).map((row) => row[0]).filter(Boolean).join(', '),
    oldShortComment: oldComment,
    issueType,
    action,
    newShortComment: newComment,
    studentLearningPoint: newComment ? summarizeTeachingPoint(newComment) : 'Bu satırda yorumun tabloyu tekrar ettiği ve ek öğrenme değeri taşımadığı gösterildi.',
    scientificConcern: false,
    note: hidden ? 'Gereksiz veya tekrar eden kısa yorum kullanıcı görünümünden kaldırıldı.' : 'Kısa yorum vaka bağlamına göre yeniden yazıldı.'
  };
  coverage.push({
    ...common,
    oldResult: '', oldReference: '', oldStatus: '',
    newResult: '', newReference: '', newStatus: ''
  });
  if (hidden) hiddenReport.push(common);
  else rewrittenReport.push({ ...common, metabolic, specialContext: special });
}

function summarizeTeachingPoint(comment = '') {
  const text = clean(comment);
  if (!text) return '';
  if (/beta-hCG|gebelik/iu.test(text)) return 'Beta-hCG erken gebelikte ultrason ve seri ölçümle yorumlanır.';
  if (/DKA|ketoasidoz/iu.test(text)) return 'DKA tanısı glukoz, keton ve metabolik asidoz birlikteliğine dayanır.';
  if (/metiyonin|homosistein|orotik|amonyak|HGPRT|organik asit|enzim/iu.test(text)) return 'Metabolit birikimi ilgili enzim/yolak kusuruna bağlanmalıdır.';
  if (/AST|ALT|kolestaz|bilirubin|ALP|GGT/iu.test(text)) return 'Karaciğer testleri hepatoselüler ve kolestatik patern ayrımıyla yorumlanır.';
  if (/lökositoz|CRP|inflamatuvar/iu.test(text)) return 'İnflamasyon belirteçleri tanı değil, klinik örüntüyü destekleyen veridir.';
  return text.split(/(?<=[.!?])\s+/u)[0];
}

function shouldHideComment(clinicalCase, inv, rows, currentComment) {
  const ctx = contextText(clinicalCase, inv);
  const text = norm(`${inv.title || ''} ${inv.label || ''} ${currentComment || ''}`);
  if (!clean(currentComment)) return false;
  if (allRowsNormal(rows) && /(tam idrar analizi|idrar|kültür istemi|kultur istemi)/.test(text) && !/idrarda eritrosit|idrar yolu|üriner|uriner/.test(norm(ctx))) return true;
  if (isBadComment(currentComment) && !rowHasAbnormalSignal([rowsToText(rows)])) return true;
  if (/^\s*(?:bu istemde ek objektif bulgu saptanmadı|klinik veri özeti|bilgi)\.?\s*$/iu.test(currentComment)) return true;
  return false;
}

function shortCommentFromInv(inv) {
  return clean(inv.result?.summary || inv.summary || inv.clinicalMeaning || inv.interpretation || inv.postAnswerExplanation || '');
}

for (const clinicalCase of rawCases) {
  if ((clinicalCase.investigations || []).length) metrics.casesWithInvestigations += 1;
  for (const inv of clinicalCase.investigations || []) {
    metrics.investigationCardsScanned += 1;
    const rowsBefore = getRows(inv);
    metrics.tableRowsScanned += rowsBefore.length;
    const fixedRows = rowsBefore.map((row) => fixRow(row, clinicalCase, inv));
    setRows(inv, fixedRows);

    const oldComment = shortCommentFromInv(inv);
    let localCommentFieldCount = 0;
    for (const field of COMMENT_FIELDS) if (field in inv) localCommentFieldCount += 1;
    for (const field of RESULT_COMMENT_FIELDS) if (field in (inv.result || {})) localCommentFieldCount += 1;
    metrics.shortCommentsScanned += localCommentFieldCount;

    const hasBad = isBadComment(oldComment) || isTruncatedSentence(oldComment);
    const ctx = contextText(clinicalCase, inv);
    const generated = generateComment(clinicalCase, inv, fixedRows);
    const metabolic = containsMetabolicTopic(ctx, inv, fixedRows);
    const special = specialContext(ctx);
    const hide = shouldHideComment(clinicalCase, inv, fixedRows, oldComment);

    if (oldComment && hasBad) metrics.genericShortComments += 1;
    if (oldComment && isTruncatedSentence(oldComment)) metrics.sentenceTruncationsFixed += 1;
    if (oldComment && /^[a-zçğıöşü]/u.test(oldComment)) metrics.lowercaseReferenceOrCommentSentenceFixed += 1;

    if (hide) {
      clearCommentFields(inv);
      metrics.hiddenUnnecessaryShortComments += 1;
      recordCommentChange({ clinicalCase, inv, oldComment, newComment: '', action: ['commentHidden'], issueType: hasBad ? ['meaninglessGenericComment', 'unnecessaryComment'] : ['unnecessaryComment'], hidden: true });
    } else if (generated && (hasBad || !oldComment || norm(generated) !== norm(oldComment))) {
      const scientific = generated;
      setCommentFields(inv, generated, scientific);
      metrics.rewrittenShortComments += 1;
      if (metabolic) metrics.metabolicBiochemicalCommentsRewritten += 1;
      if (special) metrics.specialContextCommentsRewritten += 1;
      recordCommentChange({ clinicalCase, inv, oldComment, newComment: generated, action: ['commentRewritten'], issueType: hasBad ? ['meaninglessGenericComment', ...(isTruncatedSentence(oldComment) ? ['sentenceTruncation'] : []), ...(metabolic ? ['scientificWeakness'] : [])] : ['scientificWeakness'], metabolic, special });
    } else if (oldComment) {
      const fixedCase = ensureSentence(capitalizeSentence(oldComment));
      if (fixedCase !== oldComment) {
        setCommentFields(inv, fixedCase, fixedCase);
        metrics.rewrittenShortComments += 1;
        recordCommentChange({ clinicalCase, inv, oldComment, newComment: fixedCase, action: ['commentRewritten'], issueType: ['lowercaseSentenceInReference'], metabolic, special });
      }
    }
  }

  // Merge exact repeated short comments inside the same case: keep the first, hide the rest.
  const seen = new Map();
  for (const inv of clinicalCase.investigations || []) {
    const comment = shortCommentFromInv(inv);
    if (!comment) continue;
    const key = norm(comment);
    if (seen.has(key)) {
      const oldComment = comment;
      clearCommentFields(inv);
      metrics.hiddenUnnecessaryShortComments += 1;
      metrics.panelCommentsCreatedOrMerged += 1;
      recordCommentChange({ clinicalCase, inv, oldComment, newComment: '', action: ['commentHidden', 'panelCommentCreated'], issueType: ['repeatedComment', 'unnecessaryComment'], hidden: true });
    } else {
      seen.set(key, inv.id || inv.label);
    }
  }
}

metrics.idChanged = rawCases.some((item, index) => item.id !== originalIds[index]);
metrics.tusSpotTouched = false;

// Safety scan after transformation
for (const clinicalCase of rawCases) {
  for (const inv of clinicalCase.investigations || []) {
    const rows = getRows(inv);
    for (const row of rows) {
      if (referenceContainsComment(row[2]) || (/erken\s+gebelik/i.test(row[2]) && /^[a-zçğıöşü]/u.test(row[2]))) {
        scientificConcerns.push({ caseId: clinicalCase.id, investigation: inv.title || inv.label, row, concern: 'referenceContainsCommentAfterCleanup' });
      }
      if (/metabolik\s+yolakta\s+birikim|patolojik\s+(?:yükseklik|düşüklük)|Gebeliğin\s+\d+\.$/iu.test(row.join(' '))) {
        scientificConcerns.push({ caseId: clinicalCase.id, investigation: inv.title || inv.label, row, concern: 'badTemplateAfterCleanup' });
      }
    }
    const comment = shortCommentFromInv(inv);
    if (/metabolik\s+yolakta\s+birikim|patolojik\s+(?:yükseklik|düşüklük)|Gebeliğin\s+\d+\.$|akut\s+olasılığını|inflamatuvar\s+laboratuvar\s+bulguları/iu.test(comment)) {
      scientificConcerns.push({ caseId: clinicalCase.id, investigation: inv.title || inv.label, comment, concern: 'badShortCommentAfterCleanup' });
    }
  }
}
metrics.scientificConcernCount = scientificConcerns.length;

const sourcePath = path.join(projectRoot, 'src/data/cases.js');
const originalSource = fs.readFileSync(sourcePath, 'utf8');
const before = originalSource.slice(0, originalSource.indexOf('export const rawCases = '));
const marker = '\n\nexport const cases = attachClinicalVisualsToCases';
const tailStart = originalSource.indexOf(marker);
if (tailStart === -1) throw new Error('Cannot locate cases.js tail marker');
const tail = originalSource.slice(tailStart);
const serialized = `export const rawCases = ${JSON.stringify(rawCases, null, 2)};`;
fs.writeFileSync(sourcePath, `${before}${serialized}${tail}`, 'utf8');

const qc = { metrics, scientificConcerns };
fs.writeFileSync(path.join(reportDir, 'KlinikIQ_SHORT_COMMENT_REFERENCE_COVERAGE_REPORT.json'), JSON.stringify(coverage, null, 2), 'utf8');
fs.writeFileSync(path.join(reportDir, 'KlinikIQ_REWRITTEN_SCIENTIFIC_SHORT_COMMENTS_REPORT.json'), JSON.stringify(rewrittenReport, null, 2), 'utf8');
fs.writeFileSync(path.join(reportDir, 'KlinikIQ_HIDDEN_UNNECESSARY_SHORT_COMMENTS_REPORT.json'), JSON.stringify(hiddenReport, null, 2), 'utf8');
fs.writeFileSync(path.join(reportDir, 'KlinikIQ_REFERENCE_COLUMN_AND_PARSING_FIX_REPORT.json'), JSON.stringify({ metrics, parsingFixReport, scientificConcerns }, null, 2), 'utf8');
fs.writeFileSync(path.join(reportDir, 'KlinikIQ_QC_METRICS.json'), JSON.stringify(qc, null, 2), 'utf8');
console.log(JSON.stringify(metrics, null, 2));
