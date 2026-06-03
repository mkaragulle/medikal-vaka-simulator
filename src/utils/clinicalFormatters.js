const UNIT_CANONICAL = new Map([
  ['mmhg', 'mmHg'],
  ['dk', 'dk'],
  ['/dk', '/dk'],
  ['mg/dl', 'mg/dL'],
  ['g/dl', 'g/dL'],
  ['ng/ml', 'ng/mL'],
  ['ng/l', 'ng/L'],
  ['pg/ml', 'pg/mL'],
  ['µg/l', 'µg/L'],
  ['ug/l', 'µg/L'],
  ['mmol/l', 'mmol/L'],
  ['meq/l', 'mEq/L'],
  ['iu/l', 'IU/L'],
  ['u/l', 'U/L'],
  ['miu/l', 'mIU/L'],
  ['µiu/ml', 'µIU/mL'],
  ['uiu/ml', 'µIU/mL'],
  ['mm/saat', 'mm/saat'],
  ['g/g kreatinin', 'g/g kreatinin'],
  ['/mm³', '/mm³'],
  ['/mm3', '/mm³'],
  ['x10^3/µl', 'x10^3/µL'],
  ['x10^3/ul', 'x10^3/µL'],
]);

export function normalizeDecimalSpacing(text = '') {
  return String(text || '')
    .replace(/(\d)\s*[.,]\s+(\d)/g, '$1.$2')
    .replace(/(\d)\s*,\s*(\d)/g, '$1.$2')
    .replace(/(\d)\s*\.\s*(\d)/g, '$1.$2');
}

export function normalizeClinicalUnit(unit = '') {
  const raw = String(unit || '')
    .replace(/\s+/g, '')
    .replace(/μ/g, 'µ')
    .replace(/uL/g, 'µL')
    .replace(/uIU/g, 'µIU')
    .trim();
  const key = raw.toLocaleLowerCase('tr');
  return UNIT_CANONICAL.get(key) || raw
    .replace(/mmhg/i, 'mmHg')
    .replace(/mg\/dl/i, 'mg/dL')
    .replace(/g\/dl/i, 'g/dL')
    .replace(/ng\/ml/i, 'ng/mL')
    .replace(/ng\/l/i, 'ng/L')
    .replace(/pg\/ml/i, 'pg/mL')
    .replace(/mmol\/l/i, 'mmol/L')
    .replace(/meq\/l/i, 'mEq/L')
    .replace(/iu\/l/i, 'IU/L')
    .replace(/u\/l/i, 'U/L')
    .replace(/\/mm3/i, '/mm³')
    .replace(/\/uL/i, '/µL')
    .replace(/\/µl/i, '/µL');
}

export function sanitizeMeasurementText(text = '') {
  let value = normalizeDecimalSpacing(text)
    .replace(/g\/g\s*mg\/dL/gi, 'g/g')
    .replace(/mg\/mg/gi, 'g/g')
    .replace(/\/HPF\s*fL/gi, '/HPF')
    .replace(/\/HPF\/mm[³3]/gi, '/HPF')
    .replace(/mOsm\/kg\s*mmol\/L/gi, 'mOsm/kg')
    .replace(/ng\/L\s*mg\/dL/gi, 'ng/L')
    .replace(/pg\/mL\s*ng\/mL/gi, 'pg/mL')
    .replace(/mmHg\s*mmol\/L/gi, 'mmHg')
    .replace(/\bPH\b/g, 'pH')
    .replace(/\bSpO2\b/g, 'SpO₂')
    .replace(/\bHCO3-\b/g, 'HCO₃⁻')
    .replace(/\bNa\+\b/g, 'Na⁺')
    .replace(/\bK\+\b/g, 'K⁺')
    .replace(/\bCa\+\+\b/g, 'Ca²⁺')
    .replace(/\bK\s+ve\s+(?=\d)/giu, 'K⁺ ')
    .replace(/\bNa\s+ve\s+(?=\d)/giu, 'Na⁺ ')
    .replace(/\bCa\s+ve\s+(?=\d)/giu, 'Ca²⁺ ');

  value = value
    .replace(/\b(\d{2,3})\s*(?:veya|\/|-)\s*(\d{2,3})\s*mm\s*hg\b/giu, '$1/$2 mmHg')
    .replace(/\b(\d{2,3})\s+veya\s+(\d{2,3})\s*mmHg\b/giu, '$1/$2 mmHg')
    .replace(/\b(\d+(?:\.\d+)?)\s+veya\s+dk\b/giu, '$1/dk')
    .replace(/\b(\d+(?:\.\d+)?)\s+veya\s*%/giu, '%$1')
    .replace(/\b(\d+(?:\.\d+)?)\s*%/g, '%$1');

  value = value.replace(
    /\b(mg|g|ng|pg|µg|ug|mmol|mEq|mIU|µIU|uIU|IU|U|mm|cm|mL)\s+veya\s+(dL|L|mL|mm³|mm3|µL|uL|saat|dk|g kreatinin|g|FEU)\b/giu,
    (_, left, right) => normalizeClinicalUnit(`${left}/${right}`),
  );

  value = value.replace(
    /\b((?:[<>≤≥]=?\s*)?-?\d[\d.]*?(?:\s*[-–—]\s*-?\d[\d.]*)?)\s+veya\s+(mm³|mm3|µL|uL)/giu,
    (_, number, unit) => `${number.replace(/\s*[-–—]\s*/g, '–')}/${normalizeClinicalUnit(unit)}`,
  );

  value = value.replace(/\b(\d+(?:\.\d+)?)\s+veya\s+(mg\/dL|g\/dL|mmol\/L|mEq\/L|ng\/mL|ng\/L|pg\/mL|U\/L|IU\/L)\b/giu, '$1 $2');

  value = value
    .replace(/\bmm\s*\/\s*Hg\b/gi, 'mmHg')
    .replace(/\s*\/\s*/g, '/')
    .replace(/(\d)\/(dk|mm³|mm3|µL|uL)\b/gi, (_, number, unit) => `${number}/${normalizeClinicalUnit(unit)}`)
    .replace(/\b(mg\/dl|g\/dl|ng\/ml|ng\/l|pg\/ml|mmol\/l|meq\/l|iu\/l|u\/l|mIU\/l|µIU\/ml|uIU\/ml)\b/gi, (match) => normalizeClinicalUnit(match))
    .replace(/\b(\d+(?:\.\d+)?)\s*°\s*C(?:\s*C)?\b/gi, '$1 °C')
    .replace(/\b(\d+(?:\.\d+)?)\s*derece\b/giu, '$1 °C')
    .replace(/%\s+(?=\d)/g, '%')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/(?<!\d)\.(?=\S)/g, '. ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return value;
}

export function detectInvalidMeasurementFormat(text = '') {
  const value = String(text || '');
  return /\b\d+(?:[.,]\d+)?\s+veya\s+(dk|%|mmHg|mg|mEq|mmol|g|ng|pg|U|IU|mm³|µL)\b/iu.test(value)
    || /\b(mg|g|ng|pg|mmol|mEq|U|IU|mIU|µIU|mm)\s+veya\s+(dL|L|mL|saat|dk|mm³|µL|g kreatinin|FEU)\b/iu.test(value)
    || /\b\d{2,3}\s+veya\s+\d{2,3}\s*mmHg\b/iu.test(value)
    || /\b\d+[.,]\s+\d+\s*°C\b/iu.test(value);
}

export function parseVitalNumber(value = '') {
  const text = sanitizeMeasurementText(value).replace(',', '.');
  const match = text.match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const token = match[0];
  const parsed = Number.parseFloat(/^\d{1,3}(?:\.\d{3})+$/.test(token) ? token.replace(/\./g, '') : token);
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseSystolicBloodPressure(value = '') {
  const text = sanitizeMeasurementText(value);
  const match = text.match(/\b(\d{2,3})\s*\/\s*\d{2,3}\s*mmHg\b/i);
  return match ? Number.parseInt(match[1], 10) : null;
}

export function formatBloodPressure(systolic, diastolic) {
  const sys = Number.parseInt(String(systolic).replace(/[^0-9]/g, ''), 10);
  const dia = Number.parseInt(String(diastolic).replace(/[^0-9]/g, ''), 10);
  if (!Number.isFinite(sys) || !Number.isFinite(dia)) return '';
  return `${sys}/${dia} mmHg`;
}

export function formatHeartRate(value) {
  const number = parseVitalNumber(value);
  return number === null ? '' : `${number}/dk`;
}

export function formatRespiratoryRate(value) {
  const number = parseVitalNumber(value);
  return number === null ? '' : `${number}/dk`;
}

export function formatTemperature(value) {
  const number = parseVitalNumber(value);
  return number === null ? '' : `${number.toFixed(1).replace(/\.0$/, '.0')} °C`;
}

export function formatSpO2(value) {
  const number = parseVitalNumber(value);
  return number === null ? '' : `%${Math.round(number)}`;
}

export function calculateShockIndex(heartRate, systolicBP) {
  const pulse = typeof heartRate === 'number' ? heartRate : parseVitalNumber(heartRate);
  const systolic = typeof systolicBP === 'number' ? systolicBP : parseSystolicBloodPressure(systolicBP);
  if (!Number.isFinite(pulse) || !Number.isFinite(systolic) || systolic <= 0) return null;
  const value = pulse / systolic;
  return {
    value,
    formatted: value.toFixed(2),
    note: value >= 1 ? 'yüksek' : value >= 0.9 ? 'sınırda' : 'normal',
  };
}

export function formatShockIndex(heartRate, systolicBP) {
  const result = calculateShockIndex(heartRate, systolicBP);
  return result ? `${result.formatted} ${result.note}` : '';
}


function deriveShockIndexNote(value) {
  const number = Number.parseFloat(String(value || '').replace(',', '.'));
  if (!Number.isFinite(number)) return '';
  if (number >= 1) return 'yüksek';
  if (number >= 0.9) return 'sınırda';
  return 'normal';
}

function splitShockIndexAndEmbeddedPerfusion(value = '') {
  const cleaned = sanitizeMeasurementText(value);
  const numericMatch = cleaned.match(/^(\d+(?:\.\d+)?)(.*)$/u);
  if (!numericMatch) return { shockIndex: cleaned, perfusion: '' };

  const numericValue = numericMatch[1];
  let trailing = (numericMatch[2] || '').replace(/^\s*[;:,-]?\s*/u, '').trim();
  let explicitNote = '';
  const noteMatch = trailing.match(/^(yüksek|normal|sınırda|sinirda|düşük|dusuk)\b\s*(.*)$/iu);
  if (noteMatch) {
    explicitNote = noteMatch[1].trim();
    trailing = (noteMatch[2] || '').replace(/^\s*[;:,-]?\s*/u, '').trim();
  }

  if (!trailing) {
    return { shockIndex: `${numericValue} ${explicitNote || deriveShockIndexNote(numericValue)}`.trim(), perfusion: '' };
  }

  const perfusionStart = trailing.search(/\b(kapiller\s+dolum|periferik\s+perfüzyon|periferik\s+perfuzyon|mukoza|mukozalar|ekstremite|soğuk|soguk|soluk|nemli|kuru)\b/iu);
  if (perfusionStart === -1) {
    return { shockIndex: `${numericValue} ${explicitNote || trailing || deriveShockIndexNote(numericValue)}`.trim(), perfusion: '' };
  }

  const shockNoteCandidate = trailing.slice(0, perfusionStart).replace(/[;:,.-]+$/g, '').trim();
  const shockNote = explicitNote || (/^(yüksek|normal|sınırda|sinirda|düşük|dusuk)$/iu.test(shockNoteCandidate) ? shockNoteCandidate : deriveShockIndexNote(numericValue));
  const perfusion = trailing.slice(perfusionStart).replace(/^[;:,-]+\s*/g, '').trim();
  return {
    shockIndex: `${numericValue} ${shockNote}`.trim(),
    perfusion,
  };
}

export function formatLabValue(value, unit = '') {
  const cleanedValue = sanitizeMeasurementText(value);
  const cleanedUnit = normalizeClinicalUnit(unit);
  if (!cleanedUnit) return cleanedValue;
  return sanitizeMeasurementText(`${cleanedValue} ${cleanedUnit}`);
}

export function formatVitalMeasurement(label = '', value = '') {
  const normalizedLabel = String(label || '');
  const raw = sanitizeMeasurementText(value);
  if (!raw) return { primary: '—', unit: '', note: '', formatted: '—' };

  if (normalizedLabel === 'TA') {
    const match = raw.match(/^(\d{2,3})\s*\/\s*(\d{2,3})(?:\s*mmHg)?(?:\s+(.+))?$/i);
    if (match) {
      const formatted = formatBloodPressure(match[1], match[2]);
      return { primary: formatted.replace(/\s*mmHg$/, ''), unit: 'mmHg', note: match[3] || '', formatted };
    }
  }

  if (normalizedLabel === 'Nabız' || normalizedLabel === 'Solunum') {
    const match = raw.match(/^(\d+(?:\.\d+)?)(?:\s*\/\s*dk)?(?:\s+(.+))?$/i);
    if (match) {
      return { primary: match[1], unit: '/dk', note: match[2] || '', formatted: `${match[1]}/dk${match[2] ? ` ${match[2]}` : ''}` };
    }
  }

  if (normalizedLabel === 'Ateş') {
    const match = raw.match(/^(\d+(?:\.\d+)?)(?:\s*°C)?(?:\s+(.+))?$/i);
    if (match) {
      return { primary: match[1], unit: '°C', note: match[2] || '', formatted: `${match[1]} °C${match[2] ? ` ${match[2]}` : ''}` };
    }
  }

  if (normalizedLabel === 'SpO2') {
    const match = raw.match(/^%?\s*(\d+(?:\.\d+)?)(?:\s*%)?(?:[,\s]+(.+))?$/i);
    if (match) {
      return { primary: `%${match[1]}`, unit: '', note: match[2] || '', formatted: `%${match[1]}${match[2] ? ` ${match[2]}` : ''}` };
    }
  }

  if (normalizedLabel === 'Şok indeksi') {
    const split = splitShockIndexAndEmbeddedPerfusion(raw);
    const match = split.shockIndex.match(/^(\d+(?:\.\d+)?)(?:\s*[;:,-]?\s*(.+))?$/u);
    if (match) {
      const note = (match[2] || '').trim() || deriveShockIndexNote(match[1]);
      return { primary: match[1], unit: '', note, formatted: `${match[1]} ${note}`.trim() };
    }
  }

  if (normalizedLabel === 'Perfüzyon') {
    const semicolonSplit = raw.match(/^(.{1,46}?)(?:\s*[;:]\s+)(.+)$/);
    if (semicolonSplit) {
      return {
        primary: semicolonSplit[1].trim(),
        unit: '',
        note: semicolonSplit[2].trim(),
        formatted: raw,
      };
    }

    const capillarySplit = raw.match(/^(kapiller dolum\s*(?:[<≤>]\s*)?\d+(?:\.\d+)?\s*(?:sn|saniye|s))(?:[,;:]?\s+(.+))?$/iu);
    if (capillarySplit) {
      return {
        primary: capillarySplit[1].trim(),
        unit: '',
        note: (capillarySplit[2] || '').trim(),
        formatted: raw,
      };
    }

    const commaSplit = raw.match(/^(kapiller dolum\s+[^,;:]{1,28})(?:[,;:]\s+(.+))$/iu);
    if (commaSplit) {
      return {
        primary: commaSplit[1].trim(),
        unit: '',
        note: commaSplit[2].trim(),
        formatted: raw,
      };
    }
  }

  const punctuationSplit = raw.match(/^(.{1,44}?)(?:\s*[;:]\s+)(.+)$/);
  if (punctuationSplit) {
    return {
      primary: punctuationSplit[1].trim(),
      unit: '',
      note: punctuationSplit[2].trim(),
      formatted: raw,
    };
  }

  return { primary: raw, unit: '', note: '', formatted: raw };
}

function canonicalVitalKey(key = '') {
  const normalized = String(key || '')
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
  if (/^(ta|kan basinci|tansiyon|blood pressure)$/.test(normalized)) return 'TA';
  if (/^(nabiz|pulse|heart rate|kalp hizi)$/.test(normalized)) return 'Nabız';
  if (/^(solunum|solunum sayisi|rr|respiratory rate|respiratory)$/.test(normalized)) return 'Solunum';
  if (/^(spo2|spo 2|oksijen saturasyonu|oksijen sat)$/.test(normalized)) return 'SpO2';
  if (/^(ates|temperature|temp)$/.test(normalized)) return 'Ateş';
  if (/^(sok indeksi|shock index|shockindex)$/.test(normalized)) return 'Şok indeksi';
  if (/^(perfuzyon|perfuzyon gostergesi|perfuzyon bulgulari|kapiller dolum|capillary refill)$/.test(normalized)) return 'Perfüzyon';
  return key;
}

export function sanitizeVitalsObject(vitals = {}) {
  const normalizedEntries = Object.entries(vitals || {}).map(([rawKey, value]) => [canonicalVitalKey(rawKey), value]);
  const output = {};
  normalizedEntries.forEach(([key, value]) => {
    if (key === 'TA') {
      const display = formatVitalMeasurement('TA', value);
      output[key] = display.formatted === '—' ? sanitizeMeasurementText(value) : display.formatted;
      return;
    }
    if (key === 'Şok indeksi') {
      const split = splitShockIndexAndEmbeddedPerfusion(value);
      const display = formatVitalMeasurement(key, split.shockIndex);
      output[key] = display.formatted === '—' ? sanitizeMeasurementText(split.shockIndex) : display.formatted;
      if (split.perfusion && !output.Perfüzyon) {
        output.Perfüzyon = sanitizeMeasurementText(split.perfusion);
      }
      return;
    }
    if (key === 'Nabız' || key === 'Solunum' || key === 'Ateş' || key === 'SpO2') {
      const display = formatVitalMeasurement(key, value);
      output[key] = display.formatted === '—' ? sanitizeMeasurementText(value) : display.formatted;
      return;
    }
    output[key] = sanitizeMeasurementText(value);
  });
  return output;
}
