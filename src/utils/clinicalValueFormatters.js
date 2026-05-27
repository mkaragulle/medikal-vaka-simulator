import { sanitizeMeasurementText } from './clinicalFormatters.js';

const LAB_STANDARDS = [
  ['Lökosit',['lökosit','lokosit','wbc','beyaz küre'],'/mm³','4.000–10.000/mm³','15.000/mm³','3.200/mm³','8.000/mm³','Nötrofil baskınlığı eşlik ediyorsa bakteriyel enfeksiyon lehine destekleyicidir.'],
  ['Mutlak nötrofil',['mutlak nötrofil','anc'],'/mm³','>1.500/mm³','8.500/mm³','280/mm³','3.000/mm³','Ağır nötropeni enfeksiyon riskini belirgin artırır.'],
  ['Nötrofil',['nötrofil','notrofil'],'%','%40–70','%84','%28','%60','Nötrofil baskınlığı akut bakteriyel inflamasyon lehine destekleyicidir.'],
  ['Lenfosit',['lenfosit'],'/mm³','1.000–4.800/mm³','5.400/mm³','800/mm³','2.200/mm³',''],
  ['Hemoglobin',['hemoglobin','hb'],'g/dL','12–16 g/dL','17.8 g/dL','9.2 g/dL','13.6 g/dL','Anemi oksijen taşıma kapasitesini azaltır.'],
  ['Trombosit',['trombosit','plt'],'/mm³','150.000–400.000/mm³','520.000/mm³','80.000/mm³','260.000/mm³','Trombositopeni kanama riski açısından önemlidir.'],
  ['CRP',['crp','c-reaktif protein'],'mg/L','<5 mg/L','86 mg/L','','2 mg/L','Akut inflamatuvar yanıtı destekler.'],
  ['ESR',['esr','sedimentasyon'],'mm/saat','<20 mm/saat','78 mm/saat','','10 mm/saat',''],
  ['Prokalsitonin',['prokalsitonin'],'ng/mL','<0.05 ng/mL','8.6 ng/mL','','0.03 ng/mL','Bakteriyel sepsis olasılığını destekler.'],
  ['Sodyum',['sodyum','na','na+','na⁺'],'mmol/L','135–145 mmol/L','151 mmol/L','128 mmol/L','140 mmol/L',''],
  ['Potasyum',['potasyum','k','k+','k⁺'],'mEq/L','3.5–5.1 mEq/L','7.0 mEq/L','3.2 mEq/L','4.2 mEq/L','Potasyum bozukluğu aritmi riski açısından önemlidir.'],
  ['Klor',['klor','cl','cl-','cl⁻'],'mmol/L','98–106 mmol/L','112 mmol/L','88 mmol/L','102 mmol/L',''],
  ['HCO₃⁻',['bikarbonat','hco3','hco3-','hco₃⁻'],'mmol/L','22–26 mmol/L','34 mmol/L','8 mmol/L','24 mmol/L',''],
  ['Glukoz',['glukoz','kan şekeri','kan sekeri'],'mg/dL','70–100 mg/dL','412 mg/dL','56 mg/dL','92 mg/dL','Glukoz sapması metabolik bozukluğu destekler.'],
  ['Kreatinin',['kreatinin'],'mg/dL','0.6–1.2 mg/dL','1.8 mg/dL','','0.9 mg/dL',''],
  ['Kalsiyum',['kalsiyum','ca','ca+','ca²+'],'mg/dL','8.5–10.5 mg/dL','11.2 mg/dL','8.0 mg/dL','9.4 mg/dL',''],
  ['MCV',['mcv','ortalama eritrosit hacmi'],'fL','80–100 fL','110 fL','72 fL','88 fL','Makrositoz megaloblastik süreci destekleyebilir.'],
  ['Trigliserid',['trigliserid','tg'],'mg/dL','<150 mg/dL','420 mg/dL','','110 mg/dL',''],
  ['Ürik asit',['ürik asit','urik asit'],'mg/dL','2–5.5 mg/dL','8.2 mg/dL','','4.2 mg/dL',''],
  ['LDL kolesterol',['ldl','ldl kolesterol'],'mg/dL','<100 mg/dL','220 mg/dL','','85 mg/dL',''],
  ['Üre',['üre','ure','bun'],'mg/dL','10–50 mg/dL','74 mg/dL','','28 mg/dL',''],
  ['AST',['ast'],'U/L','<35 U/L','96 U/L','','24 U/L',''],
  ['ALT',['alt'],'U/L','<45 U/L','128 U/L','','28 U/L',''],
  ['ALP',['alp','alkalen fosfataz'],'U/L','40–130 U/L','220 U/L','','82 U/L',''],
  ['GGT',['ggt'],'U/L','<55 U/L','180 U/L','','32 U/L',''],
  ['Total bilirubin',['total bilirubin'],'mg/dL','0.2–1.2 mg/dL','4.2 mg/dL','','0.8 mg/dL',''],
  ['Direkt bilirubin',['direkt bilirubin'],'mg/dL','<0.3 mg/dL','2.8 mg/dL','','0.1 mg/dL',''],
  ['Lipaz',['lipaz'],'U/L','<60 U/L','420 U/L','','32 U/L',''],
  ['Amilaz',['amilaz'],'U/L','30–110 U/L','310 U/L','','70 U/L',''],
  ['Hs-Troponin I',['hs-troponin i','troponin i','troponin'],'ng/L','<34 ng/L','188 ng/L','','12 ng/L','Miyokart hasarını destekler; EKG ve klinikle birlikte yorumlanır.'],
  ['CK-MB',['ck-mb','ck mb'],'ng/mL','<5 ng/mL','23 ng/mL','','2 ng/mL',''],
  ['D-dimer',['d-dimer','d dimer'],'ng/mL FEU','<500 ng/mL FEU','2.400 ng/mL FEU','','280 ng/mL FEU','Tromboembolik süreç için destekleyicidir; klinik olasılıkla birlikte yorumlanır.'],
  ['NT-proBNP',['nt-probnp','nt probnp','bnp'],'pg/mL','Yaşa göre değişir; <300 pg/mL düşük olasılık','6.400 pg/mL','','120 pg/mL',''],
  ['Laktat',['laktat'],'mmol/L','0.5–2.2 mmol/L','4.2 mmol/L','','1.2 mmol/L','Doku hipoperfüzyonu veya hipoksi lehine kritik bulgudur.'],
  ['pH',['ph','pH'],'','7.35–7.45','7.52','7.18','7.40',''],
  ['PaO₂',['pao2','pao₂'],'mmHg','80–100 mmHg','','56 mmHg','92 mmHg',''],
  ['PaCO₂',['paco2','paco₂'],'mmHg','35–45 mmHg','62 mmHg','31 mmHg','40 mmHg',''],
  ['Baz açığı',['baz açığı','baz acigi','base deficit'],'mmol/L','-2 – +2 mmol/L','','-15 mmol/L','0 mmol/L',''],
  ['INR',['inr'],'','0.8–1.2','1.9','','1.0',''],
  ['PT',['pt'],'sn','11–14 sn','18 sn','','12 sn',''],
  ['aPTT',['aptt','aPTT'],'sn','25–35 sn','54 sn','','30 sn',''],
  ['Ferritin',['ferritin'],'ng/mL','30–300 ng/mL','680 ng/mL','8 ng/mL','120 ng/mL',''],
  ['Transferrin satürasyonu',['transferrin satürasyonu','transferrin saturasyonu','transferrin sat'],'%','%20–45','%72','%8','%30',''],
  ['TSH',['tsh'],'µIU/mL','0.4–4.0 µIU/mL','9.2 µIU/mL','0.02 µIU/mL','1.8 µIU/mL',''],
  ['Serbest T4',['serbest t4','ft4'],'ng/dL','0.8–1.8 ng/dL','2.4 ng/dL','0.5 ng/dL','1.2 ng/dL',''],
  ['Serum beta-hCG',['beta-hcg','β-hcg','serum beta-hcg'],'mIU/mL','Negatif veya <5 mIU/mL','2.400 mIU/mL','','<5 mIU/mL',''],
  ['HbA1c',['hba1c','hbA1c'],'%','<%5.7','%8.1','','%5.3',''],
  ['Proteinüri',['proteinüri','proteinuri'],'mg/gün','<150 mg/gün','1.800 mg/gün','','<150 mg/gün',''],
  ['BOS lökosit',['bos lökosit','bos lokosit'],'/mm³','0–5/mm³','850/mm³','','0–5/mm³',''],
  ['BOS protein',['bos protein'],'mg/dL','15–45 mg/dL','180 mg/dL','','32 mg/dL',''],
  ['BOS glukoz',['bos glukoz'],'mg/dL','45–80 mg/dL','','28 mg/dL','60 mg/dL',''],
  ['Açılış basıncı',['açılış basıncı','acilis basinci'],'cmH₂O','6–20 cmH₂O','32 cmH₂O','','14 cmH₂O',''],
  ['CD4',['cd4'],'/µL','>500/µL','','120/µL','700/µL',''],
  ['Total homosistein',['total homosistein','homosistein'],'µmol/L','5–15 µmol/L','126 µmol/L','','9 µmol/L',''],
  ['Metiyonin',['metiyonin'],'µmol/L','10–45 µmol/L','96 µmol/L','','24 µmol/L',''],
  ['Anti-tetanos IgG',['anti-tetanos igg'],'IU/mL','>0.1 IU/mL','','0.03 IU/mL','0.8 IU/mL',''],
  ['Kolinesteraz aktivitesi',['kolinesteraz'],'%','%70–120','','%28','%90',''],
  ['Etanol',['etanol'],'mg/dL','<10 mg/dL','18 mg/dL','','<10 mg/dL',''],
  ['GALT aktivitesi',['galt aktivitesi'],'%','Normal aktivite','%10 altında','','Normal','Düşük GALT aktivitesi klasik galaktozemi lehinedir.'],
  ['Galaktoz-1-fosfat',['galaktoz-1-fosfat'],'mg/dL','Düşük veya negatif','7.0 mg/dL','','Negatif',''],
].map(([parameter, keys, unit, reference, highValue, lowValue, normalValue, comment]) => ({ parameter, keys, unit, reference, highValue, lowValue, normalValue, comment }));

export const LAB_REFERENCE_STANDARDS = LAB_STANDARDS;

function strip(text = '') {
  return String(text || '').toLocaleLowerCase('tr')
    .replace(/ı/g, 'i').replace(/İ/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/β/g, 'beta').replace(/₂/g, '2').replace(/₃/g, '3').replace(/⁺/g, '+').replace(/⁻/g, '-')
    .replace(/[^a-z0-9+\- ]+/g, ' ').replace(/\s+/g, ' ').trim();
}
function tokens(text = '') { return strip(text).split(/\s+/).filter(Boolean); }

export function findLabStandard(parameter = '') {
  const n = strip(parameter); if (!n) return null;
  const tok = tokens(parameter);
  for (const std of LAB_STANDARDS) {
    for (const key of std.keys) {
      const k = strip(key);
      if (/^[a-z]{1,3}\+?$/.test(k) || k.length <= 3) {
        if (n === k || tok.includes(k)) return std;
      } else if (n === k || n.includes(k) || k.includes(n)) return std;
    }
  }
  return null;
}

export function normalizeLabUnit(text = '') {
  return String(text || '').replace(/μ/g, 'µ').replace(/uL/g, 'µL').replace(/uIU/g, 'µIU')
    .replace(/mg\s*ve\s*dL/giu, 'mg/dL').replace(/µmol\s+veya\s+L/giu, 'µmol/L').replace(/µSv\s+veya\s+saat/giu, 'µSv/saat')
    .replace(/\bveya\s+(dL|L|mL|saat|HPF|dk|mm³|mm3|µL|uL)\b/giu, '/$1')
    .replace(/\/uL/gi, '/µL').replace(/\/µL\/mm³|\/uL\/mm³|\/µL\/mm3|\/mm³\/µL/gi, '/mm³').replace(/ng\/mL\s+ng\/L/gi, 'ng/mL').replace(/\/mm3/gi, '/mm³')
    .replace(/meq\/l/gi, 'mEq/L').replace(/mmol\/l/gi, 'mmol/L').replace(/mg\/dl/gi, 'mg/dL').replace(/g\/dl/gi, 'g/dL')
    .replace(/ng\/ml/gi, 'ng/mL').replace(/ng\/l/gi, 'ng/L').replace(/pg\/ml/gi, 'pg/mL').replace(/iu\/ml/gi, 'IU/mL').replace(/iu\/l/gi, 'IU/L').replace(/u\/l/gi, 'U/L')
    .replace(/\s*\/\s*/g, '/').replace(/\s+/g, ' ').trim();
}
export function normalizeLabText(text = '') {
  return sanitizeMeasurementText(String(text || ''))
    .replace(/\bHCO3-?\b/gi, 'HCO₃⁻').replace(/\bPaO2\b/g, 'PaO₂').replace(/\bPaCO2\b/g, 'PaCO₂').replace(/\bSpO2\b/g, 'SpO₂')
    .replace(/\b(\d+(?:[.,]\d+)?)\s*mg\s+ve\s*dL\b/giu, '$1 mg/dL')
    .replace(/\b(\d+(?:[.,]\d+)?)\s*µmol\s+veya\s+L\b/giu, '$1 µmol/L')
    .replace(/\b(\d+(?:[.,]\d+)?)\s*µSv\s+veya\s+saat\b/giu, '$1 µSv/saat')
    .replace(/(\d)\s+veya\s+(HPF|saat|dL|L|mL|mm³|mm3|µL|uL)\b/giu, (_, n, u) => `${n}/${normalizeLabUnit(u)}`)
    .replace(/(\d)\s*[-–—]\s*(\d)\s+veya\s+(HPF|saat|dL|L|mL|mm³|mm3|µL|uL)\b/giu, (_, a, b, u) => `${a}–${b}/${normalizeLabUnit(u)}`)
    .replace(/(\d)\s*[-–—]\s*(\d)/g, '$1–$2')
    .replace(/\b(\d+)\.\s+(?=[A-Za-zÇĞİÖŞÜçğıöşüµ%])/g, '$1 ')
    .replace(/\s+/g, ' ').trim();
}
function parseNumber(value = '') { const m = String(value || '').replace(',', '.').match(/-?\d+(?:\.\d+)?/); if (!m) return null; const token = /^\d{1,3}(?:\.\d{3})+(?:\.\d+)?$/.test(m[0]) ? m[0].replace(/\./g, '') : m[0]; const n = Number.parseFloat(token); return Number.isFinite(n) ? n : null; }
function refNums(reference = '') { return (String(reference || '').replace(/,/g, '.').match(/-?\d+(?:\.\d+)?/g) || []).map((x) => Number.parseFloat(/^\d{1,3}(?:\.\d{3})+$/.test(x) ? x.replace(/\./g, '') : x)).filter(Number.isFinite); }
export function inferLabStatus(value = '', reference = '', note = '') {
  const n = strip(note); if (/kritik|cok dusuk|cok yuksek|yuksek|dusuk|pozitif|negatif|normal|referans icinde|beklenen|anormal|mssa/.test(n)) return note;
  const v = strip(value), r = strip(reference);
  if (/pozitif|saptandi|ureme var|var/.test(v) && /negatif|olmama|olmamal|saptanmamali|ureme olmamali|yok/.test(r)) return 'Pozitif';
  if (/negatif|saptanmadi|ureme yok|yok|duyarli/.test(v) && /negatif|olmama|olmamal|saptanmamali|ureme olmamali|yok|direnc saptanmamasi/.test(r)) return 'Normal';
  if (/yuksek|artmis|artis/.test(v)) return 'Yüksek'; if (/dusuk|azalmis/.test(v)) return 'Düşük';
  const val = parseNumber(value); if (val === null) return note || 'Bilgi';
  const nums = refNums(reference);
  if (/^</.test(String(reference).trim()) && nums.length) return val < nums[0] ? 'Referans içinde' : 'Yüksek';
  if (/^>/.test(String(reference).trim()) && nums.length) return val > nums[0] ? 'Referans içinde' : 'Düşük';
  if (nums.length >= 2 && /[-–—]/.test(reference)) { const [lo, hi] = nums[0] <= nums[1] ? [nums[0], nums[1]] : [nums[1], nums[0]]; if (val < lo) return 'Düşük'; if (val > hi) return 'Yüksek'; return 'Referans içinde'; }
  return note || 'Bilgi';
}
function chooseDefault(std, requested = '') { const s = strip(requested); if (/dusuk|azalmis/.test(s)) return std.lowValue || std.normalValue || ''; if (/normal|referans|negatif|beklenen/.test(s)) return std.normalValue || std.lowValue || std.highValue || ''; return std.highValue || std.lowValue || std.normalValue || ''; }
function addUnit(value = '', std = null) {
  let text = normalizeLabText(value).replace(/^(\d+(?:\.\d+)?)\.$/, '$1');
  if (!std || !std.unit || !text || /negatif|pozitif|üreme|ureme|saptan|normal|yok|duyarlı|direnç/i.test(text)) return text;
  if (std.parameter === 'Lökosit') { const n = parseNumber(text); if (/^\d{1,2}(?:\.\d)?$/.test(text) && n !== null) return n % 1 ? `${String(n).replace('.', '.')}00/mm³` : `${n}.000/mm³`; }
  if (std.parameter === 'Trombosit') { const n = parseNumber(text); if (/^\d{1,3}$/.test(text) && n !== null && n < 1000) return `${n}.000/mm³`; }
  if ((std.parameter === 'Nötrofil' || std.parameter === 'Transferrin satürasyonu') && /^\d{1,2}$/.test(text)) return `%${text}`;
  const unitEquivalent = (std.unit === '/mm³' && /\/(?:µL|mm³)/i.test(text)) || (std.unit === 'ng/L' && /ng\/mL/i.test(text)) || (std.unit === 'mEq/L' && /mmol\/L/i.test(text)) || (std.unit === 'mmol/L' && /mEq\/L/i.test(text));
  if (!unitEquivalent && !new RegExp(std.unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(text) && /\d/.test(text)) return `${text} ${std.unit}`.trim();
  return text;
}
function qualitativeReference(parameter = '') { if (/kültür|kultur|üreme/i.test(parameter)) return 'Üreme olmamalı'; if (/anti-|hbsag|hiv|vdrl|rpr|pcr|antijen|antikor|seroloji|coombs|nitrit|keton|protein|kan/i.test(parameter)) return 'Negatif'; if (/yayma|mikroskopi/i.test(parameter)) return 'Patolojik bulgu saptanmamalı'; return ''; }

function hasExplicitLabMeasurement(text = '') {
  const source = normalizeLabText(text || '');
  return /\d/.test(source) && /(?:mg\/dL|mg\/L|g\/dL|mmol\/L|mEq\/L|ng\/mL|ng\/L|pg\/mL|µIU\/mL|mIU\/mL|U\/L|IU\/L|mmHg|\/mm³|\/mm3|\/µL|%|µmol\/L|mm\/saat|sn|cmH₂O|cmH2O|mIU\/mL|IU\/mL|fL|pg|titre|titer|^\s*[<>≤≥]?\s*\d)/i.test(source);
}
function isQualitativeLabPlaceholder(text = '') {
  const value = strip(text || '');
  return !value
    || /^(belirgin\s+)?(yuksek|dusuk|artmis|azalmis|pozitif|negatif|anormal|normal|kritik)(?:\s+saptandi|\s+bulgu|\s+izlendi|\s+bulundu)?\.?$/i.test(value)
    || /^(hafif|orta|agir|ciddi)\s+(yuksek|dusuk|artmis|azalmis)\.?$/i.test(value);
}
function isGenericLabNote(text = '') {
  const value = strip(text || '');
  return !value || /^(anormal\s+bulgu|normal\s+bulgu|bulgu|bilgi|objektif\s+sonuc)\.?$/i.test(value);
}
function splitMisplacedReferencePayload(reference = '') {
  const raw = normalizeLabText(reference || '').replace(/\s+/g, ' ').trim();
  if (!raw) return null;

  const explicitRefMatch = raw.match(/^(.+?)(?:\s*[;,|]\s*)?(?:Referans|Ref\.?|Normal(?:\s+aralık)?|Beklenen)\s*[:：]\s*(.+)$/iu);
  if (explicitRefMatch) {
    const misplacedValue = explicitRefMatch[1].replace(/[;,|]\s*$/, '').trim();
    const realReference = explicitRefMatch[2].trim();
    if (hasExplicitLabMeasurement(misplacedValue) && realReference) {
      return { misplacedValue, realReference };
    }
  }

  const semicolonParts = raw.split(/\s*[;|]\s*/).map((part) => part.trim()).filter(Boolean);
  if (semicolonParts.length >= 2 && hasExplicitLabMeasurement(semicolonParts[0])) {
    const possibleReference = semicolonParts.slice(1).join('; ').replace(/^(?:Referans|Ref\.?|Normal(?:\s+aralık)?|Beklenen)\s*[:：]\s*/iu, '').trim();
    if (possibleReference) return { misplacedValue: semicolonParts[0], realReference: possibleReference };
  }

  return null;
}

export function normalizeLabResultRow(row = {}, context = {}) {
  const r = Array.isArray(row) ? { parameter: row[0], value: row[1], reference: row[2], note: row[3] } : { parameter: row.parameter, value: row.value, reference: row.reference, note: row.note || row.interpretation };
  let parameter = normalizeLabText(r.parameter || ''), value = normalizeLabText(r.value || ''), reference = normalizeLabText(r.reference || ''), note = normalizeLabText(r.note || '');
  if (!parameter && !value && !reference && !note) return { parameter, value, reference, note };

  const misplacedReferencePayload = splitMisplacedReferencePayload(reference);
  if (misplacedReferencePayload && (!hasExplicitLabMeasurement(value) || isQualitativeLabPlaceholder(value))) {
    if (value && (isGenericLabNote(note) || !note)) note = value;
    value = misplacedReferencePayload.misplacedValue;
    reference = misplacedReferencePayload.realReference;
  } else if (misplacedReferencePayload) {
    reference = misplacedReferencePayload.realReference;
  }

  const std = findLabStandard(parameter || context.label || context.summary || '');
  if (std) { parameter = parameter || std.parameter; const placeholder = !value || /^(yuksek|hafif yuksek|sinirda|dusuk|hafif dusuk|artmis|azalmis)$/i.test(strip(value)); if (placeholder) value = chooseDefault(std, value || note || context.summary || ''); value = addUnit(value, std); if (!reference || reference === '—' || /yaşa göre değişir/i.test(reference)) reference = std.reference;
    if (reference && std.unit && /\d/.test(reference)) { const refEquivalent = (std.unit === '/mm³' && /\/(?:µL|mm³)/i.test(reference)) || (std.unit === 'ng/L' && /ng\/mL/i.test(reference)) || (std.unit === 'mEq/L' && /mmol\/L/i.test(reference)) || (std.unit === 'mmol/L' && /mEq\/L/i.test(reference)); if (!refEquivalent && !new RegExp(std.unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(reference)) reference = `${reference} ${std.unit}`; }
    note = inferLabStatus(value, reference, note || value); }
  else { value = normalizeLabUnit(value); reference = normalizeLabUnit(reference) || qualitativeReference(parameter) || reference; note = inferLabStatus(value, reference, note); }
  return { parameter, value, reference, note };
}
export const repairIncompleteLabResult = normalizeLabResultRow;
export function formatLabValue(parameter, value, unit = '', reference = '') { const std = findLabStandard(parameter); const formattedValue = addUnit(unit ? `${value} ${unit}` : value, std); const formattedReference = normalizeLabText(reference || std?.reference || qualitativeReference(parameter) || ''); return { parameter: normalizeLabText(parameter || std?.parameter || ''), value: formattedValue, reference: formattedReference, status: inferLabStatus(formattedValue, formattedReference) }; }
export function validateLabResultCompleteness(row = {}, context = {}) {
  const normalized = normalizeLabResultRow(row, context), errors = [], std = findLabStandard(normalized.parameter || context.label || '');
  const hasNumber = /\d/.test(normalized.value || ''); const unitPattern = /%|\/mm³|\/µL|mg\/dL|mg\/L|mmol\/L|mEq\/L|ng\/mL|ng\/L|pg\/mL|U\/L|IU\/L|mmHg|sn|cmH₂O|µmol\/L|g\/dL|g\/gün|mIU\/mL|µSv\/saat|mg\/gün|fL/;
  const hasUnit = !std?.unit || new RegExp(std.unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(normalized.value || '') || unitPattern.test(normalized.value || '');
  if (!normalized.parameter) errors.push('parametre eksik'); if (!normalized.value) errors.push('sonuç eksik'); if (!normalized.reference) errors.push('referans eksik'); if (!normalized.note) errors.push('durum eksik'); if (hasNumber && !hasUnit && std?.unit) errors.push('birim eksik');
  if (/\b(?:lökosit|lokosit|wbc|crp|d-dimer|troponin|potasyum|sodyum|glukoz|kreatinin|hemoglobin|hb|trombosit)\s*:?\s*\d+(?:[.,]\d+)?\.?$/iu.test(`${normalized.parameter} ${normalized.value}`)) errors.push('eksik sayısal laboratuvar ifadesi');
  return { ok: errors.length === 0, errors, row: normalized };
}
export function improveLabTitle(label = '', rows = []) { const clean = normalizeLabText(label || ''); if (!clean || /^(laboratuvar bulgusu|laboratuvar sonucu|kan testi|ek veri|klinik değerlendirme)$/iu.test(clean)) { const p = rows.map((row) => Array.isArray(row) ? row[0] : row.parameter).join(' '); if (/lökosit|nötrofil|hemoglobin|trombosit/i.test(p)) return 'Tam kan sayımı'; if (/crp|esr|sedimentasyon|prokalsitonin/i.test(p)) return 'Enflamasyon belirteçleri'; if (/sodyum|potasyum|klor|hco/i.test(p)) return 'Elektrolit paneli'; if (/troponin|ck-mb/i.test(p)) return 'Kardiyak belirteçler'; if (/d-dimer|inr|pt|aptt|fibrinojen/i.test(p)) return 'Koagülasyon testleri'; if (/ph|pao|paco|baz açığı|laktat/i.test(p)) return 'Arter kan gazı'; return 'Laboratuvar paneli'; } return clean; }
function extractLabRowsFromText(text = '', context = {}) { const source = normalizeLabText(text), rows = []; LAB_STANDARDS.forEach((std) => { std.keys.forEach((key) => { const e = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); const rx = new RegExp(`\\b${e}\\b\\s*:?\\s*([<>]?\\d+(?:[.,]\\d+)?(?:\\.\\d{3})?(?:\\s*(?:mg/dL|mg/L|g/dL|mmol/L|mEq/L|ng/mL|ng/L|pg/mL|µIU/mL|mIU/mL|U/L|IU/L|mmHg|/mm³|/µL|%|µmol/L|mm/saat))?)`, 'iu'); const m = source.match(rx); if (m && !rows.some((row) => row.parameter === std.parameter)) rows.push(normalizeLabResultRow({ parameter: std.parameter, value: m[1], reference: std.reference }, context)); const qrx = new RegExp(`\\b${e}\\b[^.]{0,24}\\b(yüksek|düşük|artmış|azalmış|pozitif|negatif)\\b`, 'iu'); const qm = source.match(qrx); if (qm && !rows.some((row) => row.parameter === std.parameter)) rows.push(normalizeLabResultRow({ parameter: std.parameter, value: qm[1], reference: std.reference }, context)); }); }); return rows; }
export function buildLabSummary(rows = []) { const normalized = rows.map((row) => normalizeLabResultRow(row)); const abnormal = normalized.filter((row) => /yüksek|düşük|kritik|pozitif|anormal/i.test(row.note || '')).slice(0, 3); const selected = abnormal.length ? abnormal : normalized.slice(0, 3); return selected.length ? `${selected.map((row) => `${row.parameter}: ${row.value} (${row.note})`).join('. ')}.` : ''; }
export function buildLabFindings(rows = []) { const normalized = rows.map((row) => normalizeLabResultRow(row)); const out = []; normalized.forEach((row) => { if (/yüksek|düşük|kritik|pozitif|anormal/i.test(row.note || '')) { const std = findLabStandard(row.parameter); out.push(`${row.parameter}: ${row.value} (referans ${row.reference}) — ${row.note}.${std?.comment ? ` ${std.comment}` : ''}`); } }); return out.length ? out.slice(0, 4) : normalized.slice(0, 2).map((row) => `${row.parameter}: ${row.value} (referans ${row.reference}) — ${row.note}.`); }
export function normalizeInvestigationLabResults(investigation = {}) { const type = String(investigation.type || '').toLowerCase(), label = String(investigation.label || investigation.name || ''); const isLabLike = /lab|laboratory|urine|culture|toxicology|serology|hematology|biochemistry/.test(type) || /kan|tam kan|hemogram|biyokimya|laboratuvar|crp|troponin|d-dimer|elektrolit|seroloji|idrar|bos|kültür|kultur|hormon|toksikoloji|koagülasyon|glukoz|keton|laktat|hemoglobin|mcv/i.test(label); if (!isLabLike) return investigation; const rows = Array.isArray(investigation.rows) && investigation.rows.length ? investigation.rows.map((row) => normalizeLabResultRow(row, { label, type, summary: investigation.summary })) : extractLabRowsFromText(investigation.summary || investigation.result || '', { label, type }); if (!rows.length) return investigation; const compactRows = rows.map((row) => [row.parameter, row.value, row.reference, row.note]); return { ...investigation, label: improveLabTitle(label, compactRows), type: investigation.type || 'Lab', rows: compactRows, summary: buildLabSummary(compactRows), findings: buildLabFindings(compactRows) }; }
export function validateInvestigationLabCompleteness(investigation = {}) { const repaired = normalizeInvestigationLabResults(investigation), errors = []; (repaired.rows || []).forEach((row, index) => { const validation = validateLabResultCompleteness(row, { label: repaired.label, type: repaired.type }); if (!validation.ok) errors.push(`${repaired.label || 'Tetkik'} satır ${index + 1}: ${validation.errors.join(', ')}`); }); return { ok: errors.length === 0, errors, investigation: repaired }; }
export function hasIncompleteLabResultText(text = '') { const value = normalizeLabText(text); return /\b(?:Lökosit|WBC|CRP|D-dimer|Troponin|Potasyum|Sodyum|Glukoz|Kreatinin|Hemoglobin|Hb|Trombosit|Laktat)\s*:?\s*\d+(?:[.,]\d+)?\.?\s*$/iu.test(value) || /\b(?:CRP|D-dimer|Troponin|Glukoz|AST|ALT|Laktat|Potasyum|Sodyum)\s+(?:yüksek|düşük|pozitif|artmış)\b/iu.test(value) || /\b(?:pH|Lökosit|WBC|D-dimer|Hemoglobin|Trombosit|Potasyum)\s*:?\s*\d+\.$/u.test(value); }
