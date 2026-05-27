import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import DiagnosisQuiz from './DiagnosisQuiz.jsx';
import InvestigationPanel from './InvestigationPanel.jsx';
import ManagementSequencePanel from './ManagementSequencePanel.jsx';
import AccordionItem from './AccordionItem.jsx';
import CaseToolsPanel from './CaseToolsPanel.jsx';
import { Icon, IconBadge } from './ui.jsx';
import GlossaryText from './GlossaryTooltip.jsx';
import {
  buildNonRevealingFocus,
  formatFindingLine,
  toDisplayPhrase,
  toSentence,
} from '../utils/displayText.js';
import { getDifficultyMeta } from '../utils/scoring.js';
import { sanitizeClinicalExamFindings } from '../utils/clinicalExamSanitizer.js';
import { buildInvestigationOrders } from '../utils/investigationOrders.js';
import { formatAppearedYears, resolveExamSignal } from '../utils/examMeta.js';
import './tusPearlCards.css';
import {
  calculateShockIndex,
  formatVitalMeasurement,
  parseSystolicBloodPressure,
  parseVitalNumber,
  sanitizeMeasurementText,
  sanitizeVitalsObject,
} from '../utils/clinicalFormatters.js';

const SECTION_NAV_ITEMS = [
  { id: 'case-story', label: 'Öykü', icon: 'ClipboardList' },
  { id: 'case-exam', label: 'Muayene', icon: 'Activity' },
  { id: 'case-investigations', label: 'Tetkik', icon: 'Search' },
  { id: 'case-management', label: 'Yönetim', icon: 'Target' },
];

const vitalLabels = {
  TA: 'Kan basıncı',
  Nabız: 'Nabız',
  Solunum: 'Solunum',
  SpO2: 'SpO₂',
  Ateş: 'Ateş',
  'Şok indeksi': 'Şok indeksi',
};

const vitalIcons = {
  TA: 'Gauge',
  Nabız: 'Activity',
  Solunum: 'Wind',
  SpO2: 'Droplets',
  Ateş: 'Thermometer',
  'Şok indeksi': 'Target',
};


function ExamSignalBox({ signal, compact = false }) {
  if (!signal?.hasContent) return null;
  const yearsLabel = formatAppearedYears(signal);
  const hasHiddenTeaching = Boolean(signal.spotPearl || signal.examTrap || signal.keywords?.length);
  return (
    <section className={`exam-signal-box ${compact ? 'compact' : ''}`.trim()} aria-label="TUS belirteç kutusu">
      <div className="exam-signal-top">
        <span className="exam-signal-label"><Icon name="Sparkles" size={15} /> TUS işareti</span>
        <span className="exam-signal-chip-row">
          {yearsLabel ? <span className="exam-signal-chip past">{yearsLabel}</span> : null}
          {signal.appearanceCount > 1 ? <span className="exam-signal-chip">{signal.appearanceCount} kez sorulmuş</span> : null}
          {hasHiddenTeaching ? <span className="exam-signal-chip">Yanıt sonrası açılır</span> : null}
        </span>
      </div>
      {hasHiddenTeaching ? (
        <p className="exam-signal-pearl">Spot bilgi, anahtar kelimeler ve sınav tuzağı yanıt işaretlendikten sonra feedback panelinde gösterilir.</p>
      ) : null}
    </section>
  );
}

function buildExamNarrative(exam = []) {
  if (!exam.length) return 'Belirgin anormal fizik muayene bulgusu saptanmamaktadır.';
  if (exam.length === 1) return `Fizik muayenede ${formatFindingLine(exam[0]).toLocaleLowerCase('tr')}`;

  const normalized = exam.map((finding) => {
    const cleaned = finding.trim().replace(/[.;]+$/, '');
    return cleaned.charAt(0).toLocaleLowerCase('tr') + cleaned.slice(1);
  });

  const last = normalized[normalized.length - 1];
  const initial = normalized.slice(0, -1);
  return `Fizik muayenede ${initial.join(', ')} ve ${last} saptanmaktadır.`;
}

function splitSentences(text = '') {
  const parts = text.match(/[^.!?]+[.!?]?/g) || [text];
  return parts.map((part) => part.trim()).filter(Boolean);
}

function normalizeForComparison(text = '') {
  return String(text)
    .toLocaleLowerCase('tr')
    .replace(/[.;:,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildStoryParts(clinicalCase) {
  const parts = splitSentences(buildProfessionalStory(clinicalCase));
  const demographics = normalizeForComparison(clinicalCase.demographics);
  const complaint = normalizeForComparison(clinicalCase.chiefComplaint);
  const setting = normalizeForComparison(clinicalCase.setting);

  const filtered = parts.filter((part, index) => {
    const normalized = normalizeForComparison(part);
    const repeatsProfile = demographics && normalized.includes(demographics);
    const repeatsComplaint = complaint && normalized.includes(complaint);
    const repeatsSetting = setting && normalized.includes(setting);
    return !(index === 0 && (repeatsProfile || repeatsComplaint || repeatsSetting));
  });

  return filtered.length ? filtered : parts;
}

function sentenceCase(text = '') {
  const trimmed = String(text).trim();
  if (!trimmed) return '';
  return trimmed.charAt(0).toLocaleLowerCase('tr') + trimmed.slice(1);
}

function buildProfessionalStory(clinicalCase) {
  return clinicalCase.stem;
}

function buildVitalDisplay(label, value = '') {
  return formatVitalMeasurement(label, value);
}

function buildDerivedVitalEntries(vitals = {}) {
  const normalizedVitals = sanitizeVitalsObject(vitals);
  const hasAnyVital = Object.values(normalizedVitals || {}).some((value) => String(value || '').trim());
  if (!hasAnyVital) return [];

  const orderedBase = ['TA', 'Nabız', 'Solunum', 'SpO2', 'Ateş']
    .filter((key) => normalizedVitals[key] !== undefined && String(normalizedVitals[key] || '').trim())
    .map((key) => [key, normalizedVitals[key]]);

  const explicitShockIndex = normalizedVitals['Şok indeksi'];
  if (explicitShockIndex && String(explicitShockIndex || '').trim()) {
    orderedBase.push(['Şok indeksi', explicitShockIndex]);
  } else {
    const shockIndex = calculateShockIndex(normalizedVitals.Nabız, normalizedVitals.TA);
    if (shockIndex) {
      orderedBase.push(['Şok indeksi', `${shockIndex.formatted} ${shockIndex.note}`]);
    }
  }

  const extraEntries = Object.entries(normalizedVitals)
    .filter(([key, value]) => !['TA', 'Nabız', 'Solunum', 'SpO2', 'Ateş', 'Şok indeksi'].includes(key) && String(value || '').trim())
    .map(([key, value]) => [key, sanitizeMeasurementText(value)]);
  return [...orderedBase, ...extraEntries];
}

function getVitalStatus(label, value = '') {
  const cleaned = sanitizeMeasurementText(value);
  const number = parseVitalNumber(cleaned);

  if (label === 'TA') {
    const systolic = parseSystolicBloodPressure(cleaned);
    return systolic !== null && (systolic >= 140 || systolic < 90) ? 'warning' : 'neutral';
  }
  if (label === 'Nabız') return number !== null && (number >= 100 || number <= 50) ? 'warning' : 'normal';
  if (label === 'SpO2') return number !== null && number < 94 ? 'danger' : number !== null && number < 96 ? 'warning' : 'normal';
  if (label === 'Ateş') return number !== null && (number >= 38 || number < 35) ? 'warning' : 'normal';
  if (label === 'Şok indeksi') return number !== null && number >= 1 ? 'danger' : number !== null && number >= 0.9 ? 'warning' : 'normal';

  return 'neutral';
}

function extractClinicalChips(clinicalCase) {
  const source = `${clinicalCase.stem} ${clinicalCase.chiefComplaint} ${clinicalCase.exam?.join(' ')}`
    .toLocaleLowerCase('tr');

  const rules = [
    ['Hipertansiyon', /hipertansiyon|yüksek tansiyon/],
    ['Dislipidemi', /dislipidemi|hiperlipidemi/],
    ['Sigara öyküsü', /sigara|paket-yıl/],
    ['Diyabet', /diyabet|diabetes/],
    ['Ateş', /ateş|febril/],
    ['Dispne', /dispne|nefes darlığı/],
    ['Senkop', /senkop|bayılma/],
    ['Nitro ile rahatlama yok', /nitrat sonrası belirgin rahatlama olmamıştır/],
    ['Soğuk terleme', /soğuk terleme/],
    ['Bulantı', /bulantı/],
    ['Kusma', /kusma/],
    ['Dispne', /dispne|nefes darlığı/],
    ['Senkop', /senkop|bayılma/],
    ['Hışıltı', /hışıltı|wheezing/],
    ['Fokal güç kaybı', /güçsüzlük|kuvvet kaybı|hemiparezi|pleji/],
    ['Konuşma bozukluğu', /afazi|konuşma bozukluğu/],
    ['Hematemez', /hematemez|kanlı kusma/],
    ['Melena', /melena|siyah dışkı/],
  ];

  const chips = rules.filter(([, pattern]) => pattern.test(source)).map(([label]) => label);
  return Array.from(new Set(chips)).slice(0, 6);
}

function extractPatientRiskChips(clinicalCase) {
  const source = `${clinicalCase.stem} ${clinicalCase.chiefComplaint} ${clinicalCase.exam?.join(' ')}`
    .toLocaleLowerCase('tr');
  const rules = [
    ['Hipertansiyon', /hipertansiyon|yüksek tansiyon/],
    ['Diyabet', /diyabet|diabetes/],
    ['Dislipidemi', /dislipidemi|hiperlipidemi/],
    ['Sigara öyküsü', /sigara|paket-yıl/],
    ['Antikoagülan kullanımı', /warfarin|antikoagülan|doak|heparin/],
    ['İmmünsüpresyon', /immünsüpres|hiv|kemoterapi|steroid/],
    ['Cerrahi öykü', /ameliyat|operasyon|cerrahi/],
    ['Seyahat öyküsü', /seyahat|ziyaret|kamp/],
    ['Gebelik/postpartum', /gebelik|postpartum|lohusa/],
  ];
  return Array.from(new Set(rules.filter(([, pattern]) => pattern.test(source)).map(([label]) => label))).slice(0, 4);
}

function extractPatientClueChips(clinicalCase) {
  const source = `${clinicalCase.stem} ${clinicalCase.chiefComplaint} ${clinicalCase.exam?.join(' ')}`
    .toLocaleLowerCase('tr');
  const rules = [
    ['Soğuk terleme', /soğuk terleme/],
    ['Bulantı', /bulantı/],
    ['Kusma', /kusma/],
    ['Dispne', /dispne|nefes darlığı/],
    ['Senkop', /senkop|bayılma/],
    ['Nitro ile rahatlama yok', /nitrat sonrası belirgin rahatlama olmamıştır/],
    ['Fokal güç kaybı', /güçsüzlük|kuvvet kaybı|hemiparezi|pleji/],
    ['Konuşma bozukluğu', /afazi|konuşma bozukluğu/],
    ['Hematemez', /hematemez|kanlı kusma/],
    ['Melena', /melena|siyah dışkı/],
    ['Ateş', /ateş|febril/],
    ['Hışıltı', /hışıltı|wheezing/],
    ['Sarılık', /sarılık|ikter/],
    ['Peteşi/purpura', /peteşi|purpura/],
  ];
  return Array.from(new Set(rules.filter(([, pattern]) => pattern.test(source)).map(([label]) => label))).slice(0, 5);
}

function buildFocusSentence(clinicalCase) {
  const complaint = `${clinicalCase.chiefComplaint || ''} ${clinicalCase.stem || ''}`.toLocaleLowerCase('tr');
  if (/göğüs|retrosternal|çarpıntı|senkop/.test(complaint)) {
    return 'Hemodinamik durum, EKG verisi ve tedavi güvenliği birlikte değerlendirilmelidir.';
  }
  if (/güçsüzlük|konuşma|nöbet|baş ağrısı|bilinç/.test(complaint)) {
    return 'Nörolojik defisitin zamanı, taklitçiler ve görüntüleme bulguları birlikte değerlendirilmelidir.';
  }
  if (/hematemez|melena|karın|kusma|ishal|sarılık/.test(complaint)) {
    return 'Kanama, sıvı durumu ve organ fonksiyonları aynı klinik çerçevede değerlendirilmelidir.';
  }
  if (/ateş|öksürük|balgam|dispne|solunum/.test(complaint)) {
    return 'Solunum durumu, enfeksiyon bulguları ve stabilizasyon gereksinimi birlikte değerlendirilmelidir.';
  }
  return 'Öykü, muayene ve objektif veriler tek klinik problem etrafında birleştirilmelidir.';
}


function normalizePatientSummaryText(value = '') {
  let text = sanitizeMeasurementText(String(value || '')).replace(/\s+/g, ' ').trim();
  if (!text) return '';

  const letters = text.replace(/[^A-Za-zÇĞİÖŞÜçğıöşü]/g, '');
  const upperLetters = (letters.match(/[A-ZÇĞİÖŞÜ]/g) || []).length;
  const lowerLetters = (letters.match(/[a-zçğıöşü]/g) || []).length;
  const looksUppercase = letters.length >= 4 && upperLetters > 0 && lowerLetters / Math.max(letters.length, 1) < 0.18;

  if (looksUppercase) {
    text = text.toLocaleLowerCase('tr');

    const protectedTerms = [
      'TUS', 'EKG', 'BT', 'MR', 'USG', 'EEG', 'EMG', 'PCR', 'CRP', 'CK', 'CK-MB', 'LDH',
      'AST', 'ALT', 'ALP', 'GGT', 'BUN', 'TSH', 'T3', 'T4', 'INR', 'PT', 'aPTT', 'HbA1c',
      'Hb', 'SpO2', 'SpO₂', 'HIV', 'HBV', 'HCV', 'HBsAg', 'Anti-HCV', 'ANA', 'ANCA',
      'BOS', 'DKA', 'KOAH', 'ARDS', 'DNA', 'RNA', 'IgA', 'IgG', 'IgM', 'IgE', 'LDL', 'HDL',
      'VLDL', 'ACE', 'ARB', 'NSAİİ', 'SSRI', 'TCA', 'IV', 'IM', 'SC', 'PO', 'ARDS', 'ARDS',
    ];

    protectedTerms.forEach((term) => {
      const lower = term.toLocaleLowerCase('tr');
      const escaped = lower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      text = text.replace(new RegExp(`(^|[^A-Za-zÇĞİÖŞÜçğıöşü0-9])(${escaped})(?=$|[^A-Za-zÇĞİÖŞÜçğıöşü0-9])`, 'giu'), `$1${term}`);
    });
  }

  text = text.replace(/(^|[.!?]\s+)([a-zçğıöşü])/g, (match, prefix, letter) => `${prefix}${letter.toLocaleUpperCase('tr-TR')}`);
  return text;
}

function normalizeSummaryItems(value) {
  if (Array.isArray(value)) return value.map((item) => normalizePatientSummaryText(toDisplayPhrase(item))).filter(Boolean);
  if (typeof value === 'string' && value.trim()) return [normalizePatientSummaryText(toDisplayPhrase(value))];
  return [];
}

function compactClinicalText(value = '', maxLength = 170) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text || text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const naturalBreak = Math.max(cut.lastIndexOf(';'), cut.lastIndexOf(','), cut.lastIndexOf('.'), cut.lastIndexOf(' '));
  const safeCut = cut.slice(0, naturalBreak > 90 ? naturalBreak : maxLength).trim();
  return safeCut.replace(/[\s,;:.-]+$/u, '');
}

function cleanPatientSummaryBullet(value = '') {
  return sanitizeMeasurementText(String(value || ''))
    .replace(/\s+/g, ' ')
    .replace(/^(Karar verdirici ipucu|Destekleyici kanıt|Ayırt ettirici ipucu|Ayırt ettirici bulgu|Klinik patern|Tanısal ayrım|TUS kırmızı bayrağı|Ana kanıt|Kritik ipucu|karar verdirici patern|Destekleyici bulgu)\s*[:：-]\s*/iu, '')
    .replace(/\s*(\.{3}|…)\s*/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/(?<!\d)\.(?=\S)/g, '. ')
    .replace(/\s*\/\s*/g, '/')
    .replace(/\bve\s+ve\b/giu, 've')
    .replace(/\bve\s+veya\b/giu, 'veya')
    .replace(/\s{2,}/g, ' ')
    .replace(/[\s,;:.]+$/u, '')
    .trim();
}

function splitLongSummaryItem(item = '') {
  const clean = cleanPatientSummaryBullet(item);
  if (!clean || clean.length <= 118) return clean ? [clean] : [];

  const parts = clean
    .split(/;\s+|,\s+(?=[A-ZÇĞİÖŞÜ0-9])/u)
    .map((part) => cleanPatientSummaryBullet(part))
    .filter((part) => part.length >= 10);

  if (parts.length >= 2 && parts.every((part) => part.length <= 105)) return parts.slice(0, 2);
  return [compactClinicalText(clean, 132)];
}

function limitSummaryItems(items = [], maxItems = 4, maxLength = null) {
  const cleaned = items
    .flatMap((item) => splitLongSummaryItem(item))
    .filter(Boolean)
    .map((item) => (maxLength ? compactClinicalText(item, maxLength) : item));

  return Array.from(new Set(cleaned)).slice(0, maxItems);
}

function compactSentence(value = '', maxLength = 220) {
  const first = splitSentences(value)[0] || String(value || '').trim();
  return compactClinicalText(toSentence(first), maxLength);
}

function richFeedbackText(item) {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return [item.label || item.title, item.text || item.summary || item.explanation || item.description]
    .filter(Boolean)
    .join(': ');
}

function buildClinicalTip(clinicalCase, clueItems = []) {
  const pearls = clinicalCase.diagnosis?.answerFeedback?.pearls || clinicalCase.diagnosis?.pearls || [];
  if (pearls.length) return compactSentence(richFeedbackText(pearls[0]), 170);

  const learningOutcome = clinicalCase.diagnosis?.answerFeedback?.learningOutcome;
  if (learningOutcome) return compactSentence(richFeedbackText(learningOutcome), 170);

  if (clueItems.length) {
    return compactSentence(`${richFeedbackText(clueItems[0])} tanısal ayrımı güçlendiren ana klinik ipucudur.`, 170);
  }

  return 'Tek bulguya değil, öykü-muayene-tetkik uyumuna göre karar ver.';
}

function summaryRowKind(label = '') {
  const normalized = label.toLocaleLowerCase('tr');
  if (normalized.includes('profil')) return 'profile';
  if (normalized.includes('başvuru')) return 'presentation';
  if (normalized.includes('risk')) return 'risk';
  if (normalized.includes('ipucu')) return 'clues';
  return 'default';
}

function summaryIconName(kind = '') {
  const normalized = String(kind || '').toLocaleLowerCase('tr');
  if (normalized.includes('profile')) return 'User';
  if (normalized.includes('presentation')) return 'ClipboardList';
  if (normalized.includes('risk')) return 'ShieldCheck';
  if (normalized.includes('clues')) return 'Target';
  return 'BookOpen';
}

function splitProfileText(value = '') {
  const parts = String(value || '')
    .split(/\s*[·•]\s*/)
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    primary: parts[0] || String(value || '').trim(),
    secondary: parts.slice(1).join(' · '),
  };
}

function PatientSummaryItems({ items = [], enabled = true, revealMode = 'preAnswer' }) {
  if (!items.length) return null;

  return (
    <ul className="summary-clinical-mini-list refined-summary-bullet-list clinical-readable-list">
      {items.map((item) => (
        <li key={item}>
          <span className="summary-clinical-mini-copy clinical-readable-copy">
            <GlossaryText text={item} enabled={enabled} revealMode={revealMode} maxTerms={9} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function buildPatientSummary(clinicalCase) {
  const intro = clinicalCase.patientIntro || {};
  const demographics = toDisplayPhrase(clinicalCase.demographics);
  const complaint = toDisplayPhrase(clinicalCase.chiefComplaint);
  const setting = toDisplayPhrase(clinicalCase.setting);
  const fallbackStory = buildStoryParts(clinicalCase).join(' ');
  const riskItems = limitSummaryItems(
    normalizeSummaryItems(intro.riskContext).length
      ? normalizeSummaryItems(intro.riskContext)
      : extractPatientRiskChips(clinicalCase),
    4,
    null,
  );
  const clueItems = limitSummaryItems(
    normalizeSummaryItems(intro.distinctiveClues).length
      ? normalizeSummaryItems(intro.distinctiveClues)
      : extractPatientClueChips(clinicalCase),
    4,
    null,
  );
  const profileText = normalizePatientSummaryText(intro.profile || [demographics, setting].filter(Boolean).join(' · '));
  const presentationText = normalizePatientSummaryText(intro.presentation || complaint);
  const historyParts = splitSentences(intro.historySummary || fallbackStory)
    .slice(0, 4)
    .map((part) => normalizePatientSummaryText(part));

  return {
    rows: [
      { kind: 'profile', label: 'Profil', value: profileText },
      { kind: 'presentation', label: 'Başvuru', value: presentationText },
    ],
    history: historyParts.length ? historyParts : [normalizePatientSummaryText(compactSentence(fallbackStory, 190))],
  };
}

function buildHemodynamicSummary(vitals = {}) {
  const normalizedVitals = sanitizeVitalsObject(vitals);
  const notes = [];
  const systolic = parseSystolicBloodPressure(normalizedVitals.TA || '');
  const pulse = parseVitalNumber(normalizedVitals.Nabız || '');
  const sat = parseVitalNumber(normalizedVitals.SpO2 || '');
  const temperature = parseVitalNumber(normalizedVitals.Ateş || '');

  if (systolic !== null) {
    if (systolic >= 180) notes.push('kan basıncı belirgin yüksek');
    else if (systolic >= 140) notes.push('kan basıncı yüksek');
    else if (systolic < 90) notes.push('hipotansif eğilim var');
    else notes.push('kan basıncı korunmuş');
  }

  if (pulse !== null) {
    if (pulse >= 100) notes.push('nabız hızlı');
    else if (pulse <= 50) notes.push('nabız yavaş');
    else notes.push('nabız aralığı stabil');
  }

  if (sat !== null) {
    notes.push(sat < 94 ? 'oksijenizasyon sınırda' : 'oksijenizasyon korunmuş');
  }

  if (temperature !== null) {
    notes.push(temperature >= 38 ? 'ateş yüksekliği var' : 'ateş yüksekliği yok');
  }

  return notes.length
    ? `${notes[0].charAt(0).toLocaleUpperCase('tr') + notes[0].slice(1)}; ${notes.slice(1).join(', ')}.`
    : 'Vaka verisinde ek vital yorumu girilmemiştir.';
}

function expandExamFinding(finding = '') {
  const text = formatFindingLine(finding).replace(/[.]+$/, '');
  return `${text}.`;
}

function VitalCard({ label, value, glossaryEnabled = true }) {
  const status = getVitalStatus(label, value);
  const display = buildVitalDisplay(label, value);

  return (
    <article className={`vital-card ${status}`} data-vital={label} data-has-note={display.note ? 'true' : 'false'}>
      <IconBadge
        icon={vitalIcons[label] ?? 'Activity'}
        tone={
          status === 'danger'
            ? 'danger'
            : status === 'warning'
              ? 'warning'
              : status === 'normal'
                ? 'success'
                : 'slate'
        }
        size="sm"
      />
      <div className="vital-copy">
        <span className="vital-label">{vitalLabels[label] ?? label}</span>
        <div className="vital-reading">
          <strong className="vital-value">
            <span className="vital-value-main">{display.primary}</span>
            {display.unit ? <span className="vital-value-unit">{display.unit}</span> : null}
          </strong>
          {display.note ? <span className="vital-note">{display.note}</span> : null}
        </div>
      </div>
    </article>
  );
}

function CaseSectionNav({ activeSection, onJump, items = SECTION_NAV_ITEMS }) {
  return (
    <nav className="case-section-nav card-surface professional-section-nav" aria-label="Olgu bölüm navigasyonu">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={activeSection === item.id ? 'section-nav-btn active' : 'section-nav-btn'}
          onClick={() => onJump(item.id)}
          aria-current={activeSection === item.id ? 'page' : undefined}
        >
          <Icon name={item.icon} size={16} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function getStickyOffset() {
  const topShellNav = document.querySelector('.top-shell-nav');
  const sectionNav = document.querySelector('.case-section-nav');

  const topNavHeight = topShellNav?.offsetHeight ?? 0;
  const sectionNavHeight = sectionNav?.offsetHeight ?? 0;

  return topNavHeight + sectionNavHeight + 28;
}


function ClinicalExamVisuals({ images = [], glossaryEnabled = true, glossaryRevealMode = 'preAnswer', revealCaption = true }) {
  const clinicalImages = (images || []).filter((image) => image?.modality === 'clinical' && (image.thumbnailUrl || image.imageUrl));
  if (!clinicalImages.length) return null;

  return (
    <div className="ordered-image-grid inline-result-image-grid clinical-exam-image-grid" aria-label="Fizik muayene görselleri">
      {clinicalImages.map((image) => {
        const captionText = revealCaption
          ? (image.title || image.parameter || 'Fizik muayene görseli')
          : 'Fizik muayene görseli';

        return (
          <figure key={`${image.id || image.title}-${image.imageUrl || image.thumbnailUrl}`} className="ordered-image-card inline-result-image-card clinical-exam-image-card">
            <div className="ordered-image-frame inline-result-image-frame">
              <img
                src={image.thumbnailUrl || image.imageUrl}
                alt={image.alt || image.title || 'Fizik muayene görseli'}
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  if (image.imageUrl && event.currentTarget.src !== image.imageUrl) {
                    event.currentTarget.src = image.imageUrl;
                  }
                }}
              />
              <a href={image.imageUrl || image.thumbnailUrl} target="_blank" rel="noreferrer" aria-label="Görseli yeni sekmede aç">
                <Icon name="Search" size={16} />
              </a>
            </div>
            <figcaption>
              <strong><GlossaryText text={captionText} enabled={glossaryEnabled && revealCaption} revealMode={glossaryRevealMode} maxTerms={5} /></strong>
              {!revealCaption ? <span>Önce görsel muayene bulgusunu kendin yorumla.</span> : null}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

function ClinicalVisualHelpGate({ open, onToggle }) {
  return (
    <div className="visual-interpretation-gate clinical-visual-gate">
      <div className="visual-interpretation-copy">
        <strong>Önce fizik muayene görselini değerlendir</strong>
        <p>Lezyonun dağılımı, rengi, sınırı, morfolojisi ve eşlik eden muayene ipuçlarını kendin yorumladıktan sonra sistem yorumunu açabilirsin.</p>
      </div>
      <button
        type="button"
        className={`visual-help-button ${open ? 'active' : ''}`.trim()}
        onClick={onToggle}
        aria-expanded={open}
      >
        <Icon name={open ? 'EyeOff' : 'Sparkles'} size={15} />
        {open ? 'Yorumu Gizle' : 'Yardım Al'}
      </button>
    </div>
  );
}


const CLINICAL_VISUAL_FINDING_KEYWORDS = [
  'dökünt', 'purpur', 'peteşi', 'peteşiy', 'ekimoz', 'hematom', 'morarma',
  'eritem', 'kızarıklık', 'makül', 'papül', 'vezikül', 'bül', 'püstül',
  'ülser', 'erozyon', 'skuam', 'deskuam', 'plak', 'nodül', 'krust', 'kabuk',
  'nekroz', 'gangren', 'lezyon', 'ürtiker', 'eksantem', 'enantem',
  'telenjiektazi', 'hiperpigment', 'hipopigment', 'pigment', 'siyanoz',
  'ikter', 'sarılık', 'solukluk', 'ödem', 'şişlik', 'deformite', 'asimetri',
  'basmakla solmayan', 'blanching', 'non-blanching', 'palpabl purpura',
  'deride', 'ciltte', 'mukozada'
];

const CLINICAL_VISUAL_FALSE_POSITIVE_KEYWORDS = [
  'letarjik', 'bilinç', 'oryantasyon', 'koopere', 'ajite', 'konfüze',
  'ense sertliği', 'kernig', 'brudzinski', 'meningeal', 'fokal nörolojik',
  'motor', 'duyu', 'refleks', 'oskültasyon', 'ral', 'ronküs', 'wheezing',
  'üfürüm', 's1', 's2', 'batın', 'defans', 'rebound', 'hassasiyet',
  'hepatomegali', 'splenomegali', 'kostovertebral', 'nabız', 'tansiyon',
  'takipne', 'dispne', 'stridor', 'tonsil', 'farenks', 'lenfadenopati'
];

function normalizeClinicalExamFindingText(value) {
  return String(value || '')
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
}

function findingIncludesAny(text, keywords) {
  const normalized = normalizeClinicalExamFindingText(text);
  return keywords.some((keyword) => normalized.includes(normalizeClinicalExamFindingText(keyword)));
}

function isClinicalVisualExamFinding(finding) {
  const text = String(finding || '').trim();
  if (!text) return false;

  const hasVisualSignal = findingIncludesAny(text, CLINICAL_VISUAL_FINDING_KEYWORDS);
  if (!hasVisualSignal) return false;

  const hasFalsePositiveOnly = findingIncludesAny(text, CLINICAL_VISUAL_FALSE_POSITIVE_KEYWORDS)
    && !findingIncludesAny(text, [
      'dökünt', 'purpur', 'peteşi', 'ekimoz', 'eritem', 'makül', 'papül', 'vezikül',
      'bül', 'püstül', 'ülser', 'skuam', 'plak', 'lezyon', 'basmakla solmayan',
      'siyanoz', 'ikter', 'sarılık', 'ödem', 'şişlik', 'deformite', 'morarma'
    ]);

  return !hasFalsePositiveOnly;
}

function splitClinicalExamFindingsForVisualGate(examFindings = [], hasClinicalVisuals = false) {
  const cleaned = Array.isArray(examFindings)
    ? examFindings.map((finding) => String(finding || '').trim()).filter(Boolean)
    : [];

  if (!hasClinicalVisuals) {
    return { visible: cleaned, visualGated: [] };
  }

  return cleaned.reduce((acc, finding) => {
    if (isClinicalVisualExamFinding(finding)) {
      acc.visualGated.push(finding);
    } else {
      acc.visible.push(finding);
    }
    return acc;
  }, { visible: [], visualGated: [] });
}

function CasePlayer({
  clinicalCase,
  branch,
  mode = 'study',
  onRandomCase,
  onSubmitAnswer,
  tutorMode,
  onToggleTutorMode,
  hardMode = false,
  isSolved = false,
  examMeta = null,
  onAdvanceExam,
  onPreviousExam,
  onFinishExam,
  randomActionLabel = 'Yeni vaka çöz',
  heroActionLabel = 'Yeni vaka çöz',
}) {
  const displayFocus = useMemo(() => buildNonRevealingFocus(clinicalCase), [clinicalCase]);
  const difficultyMeta = useMemo(() => getDifficultyMeta(clinicalCase.difficulty), [clinicalCase.difficulty]);
  const difficultyLabel = isSolved ? `${difficultyMeta.label}-Çözüldü` : difficultyMeta.label;
  const sanitizedExamFindings = useMemo(() => sanitizeClinicalExamFindings(clinicalCase.exam, clinicalCase.vitals), [clinicalCase.exam, clinicalCase.vitals]);
  const patientSummary = useMemo(() => buildPatientSummary(clinicalCase), [clinicalCase]);
  const caseExamSignal = useMemo(() => resolveExamSignal(clinicalCase), [clinicalCase]);
  const vitalEntries = useMemo(() => buildDerivedVitalEntries(clinicalCase.vitals), [clinicalCase.vitals]);
  const investigationOrders = useMemo(() => buildInvestigationOrders(clinicalCase), [clinicalCase]);
  const isSpotCase = clinicalCase.caseType === 'spot' || clinicalCase.branchId === 'tus-spot-olgular';
  const caseGlossaryEnabled = !hardMode;
  const hasExamData = sanitizedExamFindings.some((finding) => String(finding || '').trim());
  const hasClinicalExamVisuals = (clinicalCase.images || []).some((image) => image?.modality === 'clinical' && (image.thumbnailUrl || image.imageUrl));
  const clinicalExamVisualGate = useMemo(
    () => splitClinicalExamFindingsForVisualGate(sanitizedExamFindings, hasClinicalExamVisuals),
    [sanitizedExamFindings, hasClinicalExamVisuals]
  );
  const hasVisualGatedClinicalExamFindings = clinicalExamVisualGate.visualGated.length > 0;
  const hasImmediatelyVisibleClinicalExamFindings = clinicalExamVisualGate.visible.length > 0;
  const hasVitalData = vitalEntries.length > 0;
  const showExamPanel = !isSpotCase || hasExamData || hasVitalData || hasClinicalExamVisuals;
  const hasInvestigationOrders = investigationOrders.length > 0;
  const showInvestigationPanel = hasInvestigationOrders;
  const hasExplicitManagementSteps = Array.isArray(clinicalCase.managementSequence?.steps)
    ? clinicalCase.managementSequence.steps.length > 0
    : true;
  const showManagementPanel = clinicalCase.managementSequence?.enabled !== false
    && hasExplicitManagementSteps
    && (!isSpotCase || clinicalCase.managementSequence?.showInSpot === true);
  const visibleSectionItems = useMemo(() => SECTION_NAV_ITEMS.filter((item) => {
    if (item.id === 'case-exam') return showExamPanel;
    if (item.id === 'case-investigations') return showInvestigationPanel;
    if (item.id === 'case-management') return showManagementPanel;
    return true;
  }), [showExamPanel, showInvestigationPanel, showManagementPanel]);
  const heroEyebrow = useMemo(() => (isSpotCase
    ? `TUS Spot Olgular • ${clinicalCase.spotCategory || 'TUS spot'}`
    : `${branch.shortName ?? branch.name} • ${toDisplayPhrase(clinicalCase.setting)}`), [branch.name, branch.shortName, clinicalCase.setting, clinicalCase.spotCategory, isSpotCase]);
  const [orderedInvestigationIds, setOrderedInvestigationIds] = useState([]);
  const [locallyAnsweredCaseId, setLocallyAnsweredCaseId] = useState(null);
  const [showClinicalExamHelp, setShowClinicalExamHelp] = useState(false);
  useEffect(() => {
    setShowClinicalExamHelp(false);
  }, [clinicalCase.id]);

  const isStrictExamMode = Boolean(examMeta?.active && !tutorMode);
  const caseHasAnsweredState = isSolved || locallyAnsweredCaseId === clinicalCase.id || Boolean(examMeta?.answers?.[clinicalCase.id]);
  const caseGlossaryRevealMode = caseHasAnsweredState && !isStrictExamMode ? 'postAnswer' : 'preAnswer';

  const [highlighted, setHighlighted] = useState({});
  const [activeHighlighter, setActiveHighlighter] = useState('yellow');
  const [activeSection, setActiveSection] = useState('case-story');
  const activeSectionRef = useRef('case-story');

  const storyRef = useRef(null);
  const examRef = useRef(null);
  const ordersRef = useRef(null);
  const managementRef = useRef(null);

  const sectionRefs = useMemo(() => ({
    'case-story': storyRef,
    'case-exam': examRef,
    'case-investigations': ordersRef,
    'case-management': managementRef,
  }), []);

  useEffect(() => {
    setHighlighted({});
    setOrderedInvestigationIds([]);
    setLocallyAnsweredCaseId(null);
    activeSectionRef.current = 'case-story';
    setActiveSection('case-story');
  }, [clinicalCase.id]);

  useEffect(() => {
    let frame = 0;
    let lastUpdateAt = 0;
    const SCROLL_SPY_THROTTLE_MS = 96;

    const setActiveSectionIfChanged = (id) => {
      if (!id || activeSectionRef.current === id) return;
      activeSectionRef.current = id;
      setActiveSection(id);
    };

    const updateActiveSection = () => {
      frame = 0;
      const offset = getStickyOffset();
      const probeLine = offset + 18;

      const candidates = visibleSectionItems
        .map((item) => {
          const element = sectionRefs[item.id]?.current;
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return { id: item.id, top: rect.top, bottom: rect.bottom, distance: Math.abs(rect.top - probeLine) };
        })
        .filter(Boolean);

      if (!candidates.length) return;

      const containing = candidates.find((item) => item.top <= probeLine && item.bottom > probeLine);
      if (containing) {
        setActiveSectionIfChanged(containing.id);
        return;
      }

      const passed = candidates.filter((item) => item.top <= probeLine).pop();
      if (passed) {
        setActiveSectionIfChanged(passed.id);
        return;
      }

      const nearest = candidates.sort((a, b) => a.distance - b.distance)[0];
      if (nearest?.id) setActiveSectionIfChanged(nearest.id);
    };

    const requestUpdate = () => {
      if (frame) return;
      const now = window.performance?.now?.() || Date.now();
      if (now - lastUpdateAt < SCROLL_SPY_THROTTLE_MS) {
        frame = window.setTimeout(() => {
          frame = 0;
          lastUpdateAt = window.performance?.now?.() || Date.now();
          updateActiveSection();
        }, SCROLL_SPY_THROTTLE_MS);
        return;
      }
      frame = window.requestAnimationFrame(() => {
        lastUpdateAt = window.performance?.now?.() || Date.now();
        updateActiveSection();
      });
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame?.(frame);
        window.clearTimeout?.(frame);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [clinicalCase.id, sectionRefs, visibleSectionItems]);

  const toggleHighlight = useCallback((index) => {
    setHighlighted((current) => {
      if (current[index]) {
        const next = { ...current };
        delete next[index];
        return next;
      }
      return { ...current, [index]: activeHighlighter };
    });
  }, [activeHighlighter]);

  const scrollToSection = useCallback((id) => {
    const target = sectionRefs[id]?.current;
    if (!target) return;

    activeSectionRef.current = id;
    setActiveSection(id);

    const absoluteTop = target.getBoundingClientRect().top + window.scrollY;
    const offset = getStickyOffset();
    window.scrollTo({ top: Math.max(absoluteTop - offset, 0), behavior: 'auto' });
  }, [sectionRefs]);

  const handleOrderInvestigation = useCallback((id) => {
    setOrderedInvestigationIds((current) => current.includes(id) ? current : [...current, id]);
  }, []);

  const handleSubmitAnswerWithGlossaryReveal = useCallback((payload) => {
    setLocallyAnsweredCaseId(clinicalCase.id);
    onSubmitAnswer?.(payload);
  }, [clinicalCase.id, onSubmitAnswer]);


  const examPanelMeta = useMemo(() => (examMeta?.active
    ? { ...examMeta, hasPrevious: examMeta.currentIndex > 0, hasNext: examMeta.currentIndex < examMeta.total - 1 }
    : null), [examMeta]);

  const existingAnswer = useMemo(() => examMeta?.answers?.[clinicalCase.id] ?? null, [clinicalCase.id, examMeta]);

  if (isSpotCase) {
    return (
      <article className="clinical-case qbank-case tus-spot-bank-case" data-branch={branch.id} data-case-type="spot" data-mode={mode} data-hard-mode={hardMode ? 'true' : 'false'}>
        <section className="qbank-shell professional-qbank-shell tus-spot-bank-shell" aria-label="TUS spot soru bankası">
          <div className="tus-spot-bank-main ai-spot-answer-flow">
            <DiagnosisQuiz
              clinicalCase={clinicalCase}
              onRandomCase={onRandomCase}
              onSubmitAnswer={handleSubmitAnswerWithGlossaryReveal}
              tutorMode={tutorMode}
              examMeta={examPanelMeta}
              onAdvanceExam={onAdvanceExam}
              onPreviousExam={onPreviousExam}
              onFinishExam={onFinishExam}
              existingAnswer={existingAnswer}
              orderedInvestigationIds={orderedInvestigationIds}
              investigationOrders={investigationOrders}
              hardMode={hardMode}
              randomActionLabel={randomActionLabel}
            />
          </div>
        </section>
      </article>
    );
  }

  return (
    <article className="clinical-case qbank-case" data-branch={branch.id} data-case-type={isSpotCase ? 'spot' : 'standard'} data-mode={mode} data-hard-mode={hardMode ? 'true' : 'false'}>
      <section className="qbank-shell professional-qbank-shell">
        <div className="qbank-main-column expanded-main-column">
          <CaseSectionNav activeSection={activeSection} onJump={scrollToSection} items={visibleSectionItems} />

          <section className="case-hero-card card-surface professional-case-hero section-anchor" id="case-story" ref={storyRef} data-section="case-story">
            <div className="case-hero-topline">
              <span className="case-eyebrow">{heroEyebrow}</span>
              <div className="qbank-actions">
                <span className={`case-hero-meta difficulty-tag-pill ${difficultyMeta.tone} ${isSolved ? 'is-solved' : ''}`}>{difficultyLabel} · {difficultyMeta.points}p</span>
                {!examMeta?.active ? (
                  <button className="btn btn-secondary compact case-refresh-btn" type="button" onClick={onRandomCase}>{heroActionLabel}</button>
                ) : null}
              </div>
            </div>

            <div className="case-hero-main clean-case-hero-main">
              <div className="case-title-copy">
                <h1><GlossaryText text={clinicalCase.title} enabled={caseGlossaryEnabled} revealMode={caseGlossaryRevealMode} maxTerms={9} /></h1>
                <ExamSignalBox signal={caseExamSignal} compact={isSpotCase} />
                <div className="patient-summary-card professional-patient-summary-card clinical-summary-card premium-reference-summary-card">
                  {/* Hasta özeti, referans görseldeki tek, premium ve okunabilir klinik çerçeve tasarımına göre yeniden düzenlendi. */}
                  <header className="patient-summary-head compact-summary-head premium-summary-head">
                    <span className="patient-summary-main-icon" aria-hidden="true">
                      <Icon name="Stethoscope" size={28} strokeWidth={1.95} />
                    </span>
                    <div className="patient-summary-head-copy">
                      <strong>Olgu sunumu</strong>
                    </div>
                  </header>

                  <div className="patient-summary-grid structured-patient-summary-grid unified-summary-grid">
                    {patientSummary.rows.map((row) => {
                      const rowKind = row.kind || summaryRowKind(row.label);
                      const profileCopy = rowKind === 'profile' ? splitProfileText(row.value) : null;
                      return (
                        <section key={row.label} className={`summary-detail-card summary-detail-card--${rowKind}${row.items ? ' risk-chip-card' : ''}`}>
                          <span className="summary-detail-icon" aria-hidden="true">
                            <Icon name={summaryIconName(rowKind)} size={27} strokeWidth={1.92} />
                          </span>
                          <div className="summary-detail-copy">
                            <span className="summary-detail-label">{row.label.toLocaleUpperCase('tr')}</span>
                            {row.items ? (
                              row.items.length ? (
                                <PatientSummaryItems items={row.items} enabled={caseGlossaryEnabled} revealMode={caseGlossaryRevealMode} maxTerms={9} />
                              ) : <p>{row.fallback}</p>
                            ) : profileCopy ? (
                              <p className="summary-profile-copy">
                                <strong><GlossaryText text={profileCopy.primary} enabled={caseGlossaryEnabled} revealMode={caseGlossaryRevealMode} maxTerms={9} /></strong>
                                {profileCopy.secondary ? <small><GlossaryText text={profileCopy.secondary} enabled={caseGlossaryEnabled} revealMode={caseGlossaryRevealMode} maxTerms={9} /></small> : null}
                              </p>
                            ) : (
                              <p><GlossaryText text={row.value} enabled={caseGlossaryEnabled} revealMode={caseGlossaryRevealMode} maxTerms={9} /></p>
                            )}
                          </div>
                        </section>
                      );
                    })}
                  </div>

                  <section className="patient-summary-story-block unified-history-block" aria-label="Hasta öyküsü">
                    <span className="summary-wide-icon summary-wide-icon--history" aria-hidden="true">
                      <Icon name="Notes" size={27} strokeWidth={1.9} />
                    </span>
                    <div className="summary-wide-content">
                      <div className="summary-story-label">
                        <span>HASTA ÖYKÜSÜ</span>
                      </div>
                      <div className="summary-story-text">
                        {patientSummary.history.map((part, index) => (
                          <span
                            key={`${clinicalCase.id}-summary-story-${index}`}
                            role="button"
                            tabIndex={0}
                            className={highlighted[index] ? `stem-sentence highlighted hl-${highlighted[index]}` : 'stem-sentence'}
                            onClick={() => toggleHighlight(index)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                toggleHighlight(index);
                              }
                            }}
                            aria-label={`${activeHighlighter} rengiyle öykü cümlesini vurgula`}
                          >
                            <GlossaryText text={toSentence(part)} enabled={caseGlossaryEnabled} revealMode={caseGlossaryRevealMode} maxTerms={9} />
                          </span>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>

          <div className="qbank-content-stack professional-content-stack">
            {showExamPanel ? (
              <section className="clinical-data-card card-surface section-anchor" id="case-exam" ref={examRef} data-section="case-exam">
                <div className="panel-title-row compact refined-section-heading">
                  <div><h2>Fizik Muayene ve Vital Bulgular</h2><p>Hastada doğrudan gözlenen ve muayenede saptanan bulgular.</p></div>
                </div>

                {hasVitalData ? (
                  <div className="vitals-grid professional-vitals-grid">
                    {vitalEntries.map(([label, value]) => (
                      <VitalCard key={label} label={label} value={value} glossaryEnabled={!hardMode && !examMeta?.active} />
                    ))}
                  </div>
                ) : null}

                {hasExamData || hasClinicalExamVisuals ? (
                  <div className="qbank-accordion-stack">
                    <AccordionItem
                      defaultOpen
                      prefix={<Icon name="Stethoscope" />}
                      title="Fizik muayene"
                    >
                      <div className="detail-block exam-finding-block">
                        {hasClinicalExamVisuals ? (
                          <>
                            <ClinicalExamVisuals
                              images={clinicalCase.images || []}
                              glossaryEnabled={caseGlossaryEnabled}
                              glossaryRevealMode={caseGlossaryRevealMode}
                              revealCaption={showClinicalExamHelp || !hasVisualGatedClinicalExamFindings}
                            />
                            {hasVisualGatedClinicalExamFindings ? (
                              <ClinicalVisualHelpGate open={showClinicalExamHelp} onToggle={() => setShowClinicalExamHelp((current) => !current)} />
                            ) : null}
                          </>
                        ) : null}
                        {hasExamData && (!hasClinicalExamVisuals || hasImmediatelyVisibleClinicalExamFindings) ? (
                          <div className={hasClinicalExamVisuals ? 'clinical-exam-visible-findings' : ''}>
                            {hasClinicalExamVisuals && hasVisualGatedClinicalExamFindings ? (
                              <span className="visual-interpretation-heading always-visible-exam-heading"><Icon name="Stethoscope" size={13} /> Görsel dışı fizik muayene bulguları</span>
                            ) : null}
                            <ul className="clean-list dense scientific-finding-list">
                              {(hasClinicalExamVisuals ? clinicalExamVisualGate.visible : sanitizedExamFindings).map((finding) => (
                                <li key={finding}><GlossaryText text={expandExamFinding(finding)} enabled={caseGlossaryEnabled} revealMode={caseGlossaryRevealMode} maxTerms={9} /></li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {hasClinicalExamVisuals && hasVisualGatedClinicalExamFindings && showClinicalExamHelp ? (
                          <div className="visual-scientific-interpretation revealed clinical-exam-interpretation">
                            <span className="visual-interpretation-heading"><Icon name="Notes" size={13} /> Görsel ile ilişkili muayene yorumu</span>
                            <ul className="clean-list dense scientific-finding-list">
                              {clinicalExamVisualGate.visualGated.map((finding) => (
                                <li key={finding}><GlossaryText text={expandExamFinding(finding)} enabled={caseGlossaryEnabled} revealMode={caseGlossaryRevealMode} maxTerms={9} /></li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </AccordionItem>
                  </div>
                ) : null}
              </section>
            ) : null}

            {showInvestigationPanel ? (
              <section id="case-investigations" className="section-anchor" ref={ordersRef} data-section="case-investigations">
                <InvestigationPanel
                  clinicalCase={clinicalCase}
                  mode={examMeta?.active ? 'exam' : mode}
                  hardMode={hardMode}
                  orderedInvestigationIds={orderedInvestigationIds}
                  onOrderInvestigation={handleOrderInvestigation}
                  orders={investigationOrders}
                  glossaryRevealMode={caseGlossaryRevealMode}
                />
              </section>
            ) : null}

            {showManagementPanel ? (
              <section id="case-management" className="section-anchor" ref={managementRef} data-section="case-management">
                <ManagementSequencePanel clinicalCase={clinicalCase} mode={examMeta?.active ? 'exam' : mode} hardMode={hardMode} glossaryRevealMode={caseGlossaryRevealMode} />
              </section>
            ) : null}
          </div>
        </div>

        <aside className="qbank-side-column professional-right-column">
          <div
            className="right-workspace-shell card-surface"
            tabIndex={0}
            role="region"
            aria-label="Klinik çalışma araçları ve tanı paneli"
          >
            {!examMeta?.active && !isSpotCase ? (
              <CaseToolsPanel
                clinicalCase={clinicalCase}
                tutorMode={tutorMode}
                onToggleTutorMode={onToggleTutorMode}
                highlightCount={Object.keys(highlighted).length}
                onClearHighlights={() => setHighlighted({})}
                examMeta={examPanelMeta}
                activeHighlighter={activeHighlighter}
                onChangeHighlighter={setActiveHighlighter}
                hardMode={hardMode}
              />
            ) : null}
            <DiagnosisQuiz
              clinicalCase={clinicalCase}
              onRandomCase={onRandomCase}
              onSubmitAnswer={handleSubmitAnswerWithGlossaryReveal}
              tutorMode={tutorMode}
              examMeta={examPanelMeta}
              onAdvanceExam={onAdvanceExam}
              onPreviousExam={onPreviousExam}
              onFinishExam={onFinishExam}
              existingAnswer={existingAnswer}
              orderedInvestigationIds={orderedInvestigationIds}
              investigationOrders={investigationOrders}
              hardMode={hardMode}
              randomActionLabel={randomActionLabel}
            />
          </div>
        </aside>
      </section>
    </article>
  );
}

export default memo(CasePlayer);
