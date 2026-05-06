import { useEffect, useMemo, useRef, useState } from 'react';
import DiagnosisQuiz from './DiagnosisQuiz.jsx';
import InvestigationPanel from './InvestigationPanel.jsx';
import ManagementSequencePanel from './ManagementSequencePanel.jsx';
import AccordionItem from './AccordionItem.jsx';
import CaseToolsPanel from './CaseToolsPanel.jsx';
import { ClinicalCallout, Icon, IconBadge } from './ui.jsx';
import GlossaryText from './GlossaryTooltip.jsx';
import {
  buildNonRevealingFocus,
  formatFindingLine,
  toDisplayPhrase,
  toSentence,
} from '../utils/displayText.js';
import { getDifficultyMeta } from '../utils/scoring.js';
import { buildInvestigationOrders } from '../utils/investigationOrders.js';

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
  const raw = String(value).replace(/\s+/g, ' ').trim();
  if (!raw) return { primary: '—', unit: '', note: '' };

  if (label === 'TA') {
    const match = raw.match(/^(\d+\s*\/\s*\d+)(?:\s*(mmhg))?(?:\s+(.+))?$/i);
    if (match) {
      return {
        primary: match[1].replace(/\s+/g, ''),
        unit: match[2] ? 'mmHg' : '',
        note: match[3] || '',
      };
    }
  }

  if (label === 'Ateş') {
    const match = raw.match(/^(\d+(?:[.,]\d+)?)(?:\s*(°?\s*[CFKcfk]))?(?:\s+(.+))?$/);
    if (match) {
      const normalizedUnit = match[2]
        ? match[2].replace(/\s+/g, '').replace(/^C$/i, '°C').replace(/^F$/i, '°F').toUpperCase()
        : '';
      return {
        primary: match[1],
        unit: normalizedUnit,
        note: match[3] || '',
      };
    }
  }

  if (label === 'Nabız' || label === 'Solunum') {
    const match = raw.match(/^(\d+(?:[.,]\d+)?)(\s*\/\s*[A-Za-zÇĞİÖŞÜçğıöşü]+)?(?:\s+(.+))?$/);
    if (match) {
      const normalizedUnit = match[2]
        ? match[2].replace(/\s+/g, '').replace(/^\/dk$/i, '/dk')
        : '';
      return {
        primary: match[1],
        unit: normalizedUnit,
        note: match[3] || '',
      };
    }
  }

  if (label === 'SpO2') {
    const match = raw.match(/^(%\s*\d+(?:[.,]\d+)?)(?:\s+(.+))?$/);
    if (match) {
      return {
        primary: match[1].replace(/\s+/g, ''),
        unit: '',
        note: match[2] || '',
      };
    }
  }

  if (label === 'Şok indeksi') {
    const match = raw.match(/^(\d+(?:[.,]\d+)?)(?:\s+(.+))?$/);
    if (match) {
      return {
        primary: match[1],
        unit: '',
        note: match[2] || '',
      };
    }
  }

  return { primary: raw, unit: '', note: '' };
}

function buildDerivedVitalEntries(vitals = {}) {
  const orderedBase = ['TA', 'Nabız', 'Solunum', 'SpO2', 'Ateş']
    .filter((key) => vitals[key] !== undefined)
    .map((key) => [key, vitals[key]]);

  const bp = String(vitals.TA || '');
  const hr = String(vitals.Nabız || '');
  const systolic = parseFloat(bp.split('/')[0]?.replace(/[^0-9.]/g, ''));
  const pulse = parseFloat(hr.replace(/[^0-9.]/g, ''));

  if (!Number.isNaN(systolic) && !Number.isNaN(pulse) && systolic > 0) {
    const shockIndex = pulse / systolic;
    const rounded = shockIndex.toFixed(2);
    let note = 'normal';
    if (shockIndex >= 1) note = 'yüksek';
    else if (shockIndex >= 0.9) note = 'sınırda';
    orderedBase.push(['Şok indeksi', `${rounded} ${note}`]);
  } else {
    orderedBase.push(['Şok indeksi', '—']);
  }

  const extraEntries = Object.entries(vitals).filter(([key]) => !['TA', 'Nabız', 'Solunum', 'SpO2', 'Ateş'].includes(key));
  return [...orderedBase, ...extraEntries];
}

function getVitalStatus(label, value = '') {
  const normalized = String(value).replace(',', '.');
  const number = parseFloat(normalized.replace(/[^0-9.]/g, ''));

  if (label === 'TA') {
    return /1[5-9][0-9]|2[0-9][0-9]|9[0-9]\/|8[0-9]\//.test(value) ? 'warning' : 'neutral';
  }
  if (label === 'Nabız') return number >= 100 || number <= 50 ? 'warning' : 'normal';
  if (label === 'SpO2') return number < 94 ? 'danger' : number < 96 ? 'warning' : 'normal';
  if (label === 'Ateş') return number >= 38 || number < 35 ? 'warning' : 'normal';
  if (label === 'Şok indeksi') return number >= 1 ? 'danger' : number >= 0.9 ? 'warning' : 'normal';

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

function buildPatientSummary(clinicalCase) {
  const demographics = toDisplayPhrase(clinicalCase.demographics);
  const complaint = toDisplayPhrase(clinicalCase.chiefComplaint);
  const setting = toDisplayPhrase(clinicalCase.setting);
  const riskChips = extractPatientRiskChips(clinicalCase);
  const clueChips = extractPatientClueChips(clinicalCase);

  return {
    rows: [
      { label: 'Profil', value: [demographics, setting].filter(Boolean).join(' · ') },
      { label: 'Başvuru', value: complaint },
      { label: 'Risk bağlamı', chips: riskChips, fallback: 'Belirgin risk bilgisi verilmemiş.' },
      { label: 'Ayırt edici ipuçları', chips: clueChips, fallback: 'Ek ipuçları öykü ve muayeneden çıkarılmalıdır.' },
    ],
    focus: buildFocusSentence(clinicalCase),
  };
}

function buildHemodynamicSummary(vitals = {}) {
  const notes = [];
  const bp = vitals.TA || '';
  const hr = String(vitals.Nabız || '');
  const spo2 = String(vitals.SpO2 || '');
  const temp = String(vitals.Ateş || '');

  const systolic = parseFloat(bp.split('/')[0]);
  if (!Number.isNaN(systolic)) {
    if (systolic >= 180) notes.push('kan basıncı belirgin yüksek');
    else if (systolic >= 140) notes.push('kan basıncı yüksek');
    else if (systolic < 90) notes.push('hipotansif eğilim var');
    else notes.push('kan basıncı korunmuş');
  }

  const pulse = parseFloat(hr.replace(/[^0-9.]/g, ''));
  if (!Number.isNaN(pulse)) {
    if (pulse >= 100) notes.push('nabız hızlı');
    else if (pulse <= 50) notes.push('nabız yavaş');
    else notes.push('nabız aralığı stabil');
  }

  const sat = parseFloat(spo2.replace(/[^0-9.]/g, ''));
  if (!Number.isNaN(sat)) {
    notes.push(sat < 94 ? 'oksijenizasyon sınırda' : 'oksijenizasyon korunmuş');
  }

  const t = parseFloat(temp.replace(/[^0-9.]/g, ''));
  if (!Number.isNaN(t)) {
    notes.push(t >= 38 ? 'ateş yüksekliği var' : 'ateş yüksekliği yok');
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

function CaseNarrative({
  clinicalCase,
  storyParts,
  highlighted,
  activeHighlighter,
  toggleHighlight,
  glossaryEnabled = true,
}) {
  const chips = extractClinicalChips(clinicalCase);

  return (
    <section className="case-narrative-card card-surface professional-story-card">
      <div className="case-section-heading refined-section-heading">
        <div>
          <h2>Klinik öykü</h2>
        </div>
      </div>

      <div className="stem-highlight-wrap professional-story-text">
        {storyParts.map((part, index) => (
          <span
            key={`${clinicalCase.id}-story-${index}`}
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
            aria-label={`${activeHighlighter} rengiyle cümleyi vurgula`}
          >
            <GlossaryText text={toSentence(part)} enabled={glossaryEnabled} />
          </span>
        ))}
      </div>
    </section>
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

function CasePlayer({
  clinicalCase,
  branch,
  mode = 'study',
  onRandomCase,
  onSubmitAnswer,
  tutorMode,
  onToggleTutorMode,
  hardMode = false,
  examMeta = null,
  onAdvanceExam,
  onPreviousExam,
  onFinishExam,
}) {
  const displayFocus = buildNonRevealingFocus(clinicalCase);
  const difficultyMeta = getDifficultyMeta(clinicalCase.difficulty);
  const storyParts = useMemo(() => buildStoryParts(clinicalCase), [clinicalCase]);
  const patientSummary = useMemo(() => buildPatientSummary(clinicalCase), [clinicalCase]);
  const hemodynamicSummary = useMemo(() => buildHemodynamicSummary(clinicalCase.vitals), [clinicalCase]);
  const vitalEntries = useMemo(() => buildDerivedVitalEntries(clinicalCase.vitals), [clinicalCase]);
  const investigationOrders = useMemo(() => buildInvestigationOrders(clinicalCase), [clinicalCase]);
  const isSpotCase = clinicalCase.caseType === 'spot' || clinicalCase.branchId === 'tus-spot-olgular';
  const hasInvestigationOrders = investigationOrders.length > 0;
  const showInvestigationPanel = !isSpotCase || hasInvestigationOrders;
  const showManagementPanel = !isSpotCase && clinicalCase.managementSequence?.enabled !== false;
  const visibleSectionItems = useMemo(() => SECTION_NAV_ITEMS.filter((item) => {
    if (item.id === 'case-investigations') return showInvestigationPanel;
    if (item.id === 'case-management') return showManagementPanel;
    return true;
  }), [showInvestigationPanel, showManagementPanel]);
  const heroEyebrow = isSpotCase
    ? `TUS Spot Olgular • ${clinicalCase.spotCategory || 'TUS spot'}`
    : `${branch.shortName ?? branch.name} • ${toDisplayPhrase(clinicalCase.setting)}`;
  const [orderedInvestigationIds, setOrderedInvestigationIds] = useState([]);

  const [highlighted, setHighlighted] = useState({});
  const [activeHighlighter, setActiveHighlighter] = useState('yellow');
  const [activeSection, setActiveSection] = useState('case-story');

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
    setActiveSection('case-story');
  }, [clinicalCase.id]);

  useEffect(() => {
    let frame = 0;

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
        setActiveSection(containing.id);
        return;
      }

      const passed = candidates.filter((item) => item.top <= probeLine).pop();
      if (passed) {
        setActiveSection(passed.id);
        return;
      }

      const nearest = candidates.sort((a, b) => a.distance - b.distance)[0];
      if (nearest?.id) setActiveSection(nearest.id);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [clinicalCase.id, sectionRefs, visibleSectionItems]);

  const toggleHighlight = (index) => {
    setHighlighted((current) => {
      if (current[index]) {
        const next = { ...current };
        delete next[index];
        return next;
      }
      return { ...current, [index]: activeHighlighter };
    });
  };

  const scrollToSection = (id) => {
    const target = sectionRefs[id]?.current;
    if (!target) return;

    setActiveSection(id);

    const absoluteTop = target.getBoundingClientRect().top + window.scrollY;
    const offset = getStickyOffset();
    window.scrollTo({ top: Math.max(absoluteTop - offset, 0), behavior: 'smooth' });
  };

  const handleOrderInvestigation = (id) => {
    setOrderedInvestigationIds((current) => current.includes(id) ? current : [...current, id]);
  };


  const examPanelMeta = examMeta?.active
    ? { ...examMeta, hasPrevious: examMeta.currentIndex > 0, hasNext: examMeta.currentIndex < examMeta.total - 1 }
    : null;

  const existingAnswer = examMeta?.answers?.[clinicalCase.id] ?? null;

  return (
    <article className="clinical-case qbank-case" data-branch={branch.id} data-case-type={isSpotCase ? 'spot' : 'standard'} data-mode={mode} data-hard-mode={hardMode ? 'true' : 'false'}>
      <section className="qbank-shell professional-qbank-shell">
        <div className="qbank-main-column expanded-main-column">
          <CaseSectionNav activeSection={activeSection} onJump={scrollToSection} items={visibleSectionItems} />

          <section className="case-hero-card card-surface professional-case-hero section-anchor" id="case-story" ref={storyRef} data-section="case-story">
            <div className="case-hero-topline">
              <span className="case-eyebrow">{heroEyebrow}</span>
              <div className="qbank-actions">
                <span className={`case-hero-meta ${difficultyMeta.tone}`}>{difficultyMeta.label} · {difficultyMeta.points}p</span>
                {!examMeta?.active ? (
                  <button className="btn btn-secondary compact case-refresh-btn" type="button" onClick={onRandomCase}>Yeni vaka çöz</button>
                ) : null}
              </div>
            </div>

            <div className="case-hero-main clean-case-hero-main">
              <div className="case-title-copy">
                <h1><GlossaryText text={clinicalCase.title} enabled={!hardMode && !examMeta?.active} /></h1>
                <p><GlossaryText text={displayFocus} enabled={!hardMode && !examMeta?.active} /></p>
                <div className="patient-summary-card professional-patient-summary-card clinical-summary-card">
                  {/* cognitive-load: tekrar eden küçük bilgi kartları tek structured hasta özetinde toplandı */}
                  <header className="patient-summary-head compact-summary-head premium-summary-head">
                    <IconBadge icon="ClipboardList" tone="accent" size="sm" />
                    <div>
                      <strong>Hasta özeti</strong>
                      <p>Olgunun temel klinik çerçevesi</p>
                    </div>
                  </header>

                  <div className="patient-summary-grid structured-patient-summary-grid">
                    {patientSummary.rows.map((row) => (
                      <section key={row.label} className={row.chips ? 'summary-detail-card risk-chip-card' : 'summary-detail-card'}>
                        <span>{row.label}</span>
                        {row.chips ? (
                          row.chips.length ? (
                            <div className="summary-risk-chip-row">
                              {row.chips.map((chip) => <em key={chip}>{chip}</em>)}
                            </div>
                          ) : <p>{row.fallback}</p>
                        ) : (
                          <p>{row.value}</p>
                        )}
                      </section>
                    ))}
                  </div>

                  <aside className="patient-summary-focus-strip refined-focus-callout">
                    <Icon name="Target" size={16} />
                    <div>
                      <span>Öncelikli klinik odak</span>
                      <p>{patientSummary.focus}</p>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </section>

          <div className="qbank-content-stack professional-content-stack">
            <CaseNarrative
              clinicalCase={clinicalCase}
              storyParts={storyParts}
              highlighted={highlighted}
              activeHighlighter={activeHighlighter}
              toggleHighlight={toggleHighlight}
              glossaryEnabled={!hardMode && !examMeta?.active}
            />

            <section className="clinical-data-card card-surface section-anchor" id="case-exam" ref={examRef} data-section="case-exam">
              <div className="panel-title-row compact refined-section-heading">
                <div><h2>Muayene ve vital bulgular</h2></div>
              </div>

              <div className="vitals-grid professional-vitals-grid">
                {vitalEntries.map(([label, value]) => (
                  <VitalCard key={label} label={label} value={value} glossaryEnabled={!hardMode && !examMeta?.active} />
                ))}
              </div>

              <div className="qbank-accordion-stack">
                <AccordionItem
                  defaultOpen
                  prefix={<Icon name="Stethoscope" />}
                  badge="Objektif veri"
                  title="Fizik muayene"
                >
                  {clinicalCase.exam?.length ? (
                    <div className="detail-block exam-finding-block">
                      <ul className="clean-list dense scientific-finding-list">
                        {clinicalCase.exam.map((finding) => <li key={finding}><GlossaryText text={expandExamFinding(finding)} enabled={!hardMode && !examMeta?.active} /></li>)}
                      </ul>
                    </div>
                  ) : (
                    <p className="detail-copy">Belirgin anormal fizik muayene bulgusu saptanmamaktadır.</p>
                  )}

                  {!examMeta?.active ? (
                    <details className="spoiler-disclosure neutral-disclosure">
                      <summary>Yorumu göster</summary>
                      <div className="detail-block scientific-summary-block">
                        <h4>Hemodinamik değerlendirme</h4>
                        <p><GlossaryText text={hemodynamicSummary} enabled={!hardMode && !examMeta?.active} /></p>
                      </div>
                    </details>
                  ) : null}
                </AccordionItem>
              </div>
            </section>

            {showInvestigationPanel ? (
              <section id="case-investigations" className="section-anchor" ref={ordersRef} data-section="case-investigations">
                <InvestigationPanel
                  clinicalCase={clinicalCase}
                  mode={examMeta?.active ? 'exam' : mode}
                  hardMode={hardMode}
                  orderedInvestigationIds={orderedInvestigationIds}
                  onOrderInvestigation={handleOrderInvestigation}
                />
              </section>
            ) : null}

            {showManagementPanel ? (
              <section id="case-management" className="section-anchor" ref={managementRef} data-section="case-management">
                <ManagementSequencePanel clinicalCase={clinicalCase} mode={examMeta?.active ? 'exam' : mode} hardMode={hardMode} />
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
              onSubmitAnswer={onSubmitAnswer}
              tutorMode={tutorMode}
              examMeta={examPanelMeta}
              onAdvanceExam={onAdvanceExam}
              onPreviousExam={onPreviousExam}
              onFinishExam={onFinishExam}
              existingAnswer={existingAnswer}
              orderedInvestigationIds={orderedInvestigationIds}
              investigationOrders={investigationOrders}
              hardMode={hardMode}
            />
          </div>
        </aside>
      </section>
    </article>
  );
}

export default CasePlayer;
