// V388: keeps the physical examination panel focused on true exam findings.
// Some legacy cases contain broken vital fragments such as "8°C’dir." after
// automatic text normalization. Those fragments are removed at data-load and
// render time so they never appear as physical examination bullets.

function normalizeExamText(value = '') {
  return String(value || '')
    .replace(/\u00a0/g, ' ')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeExamInput(exam = []) {
  if (Array.isArray(exam)) return exam;
  if (typeof exam === 'string') {
    const normalized = normalizeExamText(exam);
    if (!normalized) return [];
    return normalized
      .split(/(?<=[.!?])\s+/u)
      .map((finding) => finding.trim())
      .filter(Boolean);
  }
  return [];
}

function hasAnyVitals(vitals = {}) {
  return Boolean(vitals && Object.values(vitals).some((value) => String(value || '').trim()));
}

function hasClinicalExamContent(text = '') {
  return /\b(?:kulak\s+muayenesinde|orofarenks|tonsil|kapiller\s+dolum|lenfadenopati|hepatosplenomegali|batın|akciğer|kardiyak|üfürüm|cilt|döküntü|peteşi|purpura|ekimoz|ödem|hassasiyet|defans|rebound|fissür|eklem|kalça|diz|genital|nörolojik|görme|pupil|sklera|mukoza|dehidrat|kitle|raller|wheezing|hışıltı|soluk|toksik|letarjik|ikterik|distandü|artrit)\b/iu.test(text);
}

function sentenceCaseTurkish(text = '') {
  const clean = text.trim();
  if (!clean) return '';
  return clean.charAt(0).toLocaleUpperCase('tr') + clean.slice(1);
}

function stripLeadingVitalClausePreservingClinicalText(finding = '') {
  const text = normalizeExamText(finding);
  const parts = text.split(/,\s+/u);
  if (parts.length < 2) return text;
  const first = parts[0].toLocaleLowerCase('tr');
  const firstIsVital = first.startsWith('vücut sıcaklığı')
    || first.startsWith('kan basıncı')
    || first.startsWith('nabız ')
    || first.startsWith('kalp hızı')
    || first.startsWith('solunum sayısı')
    || first.startsWith('oksijen satürasyonu')
    || first.startsWith('pulse oksimetre satürasyonu');
  if (!firstIsVital) return text;

  let rest = parts.slice(1).join(', ').trim();
  rest = rest
    .replace(/^(?:nabız|kalp hızı)\s+\d+\s*\/dk(?:['’]?dır)?\s*(?:ve|,)\s*/iu, '')
    .replace(/^solunum sayısı\s+\d+\s*\/dk(?:['’]?dır)?\s*(?:ve|,)\s*/iu, '')
    .replace(/^oksijen satürasyonu\s+(?:oda havasında\s+)?%?\d+(?:[-–]\d+)?(?:['’]?dır)?\s*(?:ve|,)\s*/iu, '');
  return hasClinicalExamContent(rest) ? sentenceCaseTurkish(rest) : text;
}

export function isBrokenTemperatureFragment(finding = '') {
  const text = stripLeadingVitalClausePreservingClinicalText(finding).replace(/[.!?]+$/u, '').trim();
  if (!text) return true;

  // Broken leftovers created from values like "36.8°C’dir." -> "8°C’dir."
  return /^\d{1,2}(?:[.,]\d+)?\s*°\s*C(?:'?(?:dir|dır|dur|dür))?$/iu.test(text)
    || /^\d{1,2}(?:[.,]\d+)?\s*C(?:'?(?:dir|dır|dur|dür))?$/iu.test(text);
}

export function isVitalsOnlyExamFinding(finding = '', vitals = {}) {
  const text = stripLeadingVitalClausePreservingClinicalText(finding).replace(/[.!?]+$/u, '').trim();
  if (!text) return true;
  if (isBrokenTemperatureFragment(text)) return true;

  const lower = text.toLocaleLowerCase('tr');
  const caseHasVitals = hasAnyVitals(vitals);

  // Do not hide actual pulse/perfusion examination signs.
  if (/\b(?:distal|periferik|femoral|karotis|pedal)\s+nabızlar?\b/iu.test(lower)) return false;
  if (/\bnabız\s+basıncı\b/iu.test(lower)) return false;
  if (/\bkapiller\s+dolum\b/iu.test(lower) && !/^vücut\s+sıcaklığı\b/iu.test(lower)) return false;

  // Pure vital-sign sentences should live in the vital grid, not in the exam bullet list.
  const startsAsVitalSentence = lower.startsWith('vücut sıcaklığı')
    || lower.startsWith('kan basıncı')
    || lower.startsWith('solunum sayısı')
    || lower.startsWith('kalp hızı')
    || /^nabız\s+\d/iu.test(lower)
    || lower.startsWith('oksijen satürasyonu')
    || lower.startsWith('pulse oksimetre satürasyonu')
    || /^ateşi\s+\d/iu.test(lower)
    || /^muayene\s+sırasında\s+ateşi\s+\d/iu.test(lower);
  if (startsAsVitalSentence && !hasClinicalExamContent(lower)) return caseHasVitals || /(?:mmhg|\/dk|°\s*c|%|normaldir|normal|yüksek|düşük)$/iu.test(lower);

  const onlyVitalTokens = /^(?:(?:ta|kan\s+basıncı|nabız|kalp\s+hızı|solunum(?:\s+sayısı)?|spo2|oksijen\s+satürasyonu|vücut\s+sıcaklığı|ateş|kapiller\s+dolum)\s*[:=]?\s*)?[\d,./%\s°c]+(?:mmhg|\/dk|saniye|sn|%)?(?:\s*(?:ve|,|;)\s*(?:ta|kan\s+basıncı|nabız|kalp\s+hızı|solunum(?:\s+sayısı)?|spo2|oksijen\s+satürasyonu|vücut\s+sıcaklığı|ateş|kapiller\s+dolum)\s*[:=]?\s*[\d,./%\s°c]+(?:mmhg|\/dk|saniye|sn|%)?)*$/iu.test(lower);
  if (onlyVitalTokens) return true;

  return false;
}

export function sanitizeClinicalExamFindings(exam = [], vitals = {}) {
  const examItems = normalizeExamInput(exam);
  const seen = new Set();

  return examItems
    .map((finding) => stripLeadingVitalClausePreservingClinicalText(finding))
    .filter((finding) => finding && !isVitalsOnlyExamFinding(finding, vitals))
    .map((finding) => finding.replace(/\s+([,.;:])/g, '$1').replace(/\.{2,}$/u, '.').trim())
    .filter((finding) => {
      const key = finding.toLocaleLowerCase('tr').replace(/[.;]+$/u, '').trim();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export function sanitizeClinicalCaseExam(clinicalCase = {}) {
  const cleanExam = sanitizeClinicalExamFindings(clinicalCase.exam, clinicalCase.vitals);
  const cleanFindingsExam = clinicalCase.findings?.exam
    ? sanitizeClinicalExamFindings(clinicalCase.findings.exam, clinicalCase.vitals)
    : undefined;

  if (cleanExam === clinicalCase.exam && cleanFindingsExam === clinicalCase.findings?.exam) return clinicalCase;

  return {
    ...clinicalCase,
    exam: cleanExam,
    findings: clinicalCase.findings
      ? {
          ...clinicalCase.findings,
          ...(cleanFindingsExam ? { exam: cleanFindingsExam } : {}),
        }
      : clinicalCase.findings,
  };
}
