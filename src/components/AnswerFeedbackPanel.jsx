import { Icon, IconBadge } from './ui.jsx';
import GlossaryText from './GlossaryTooltip.jsx';

const MAX_EVIDENCE_ITEMS = 4;
const MAX_PEARL_ITEMS = 3;
const MAX_MANAGEMENT_ITEMS = 3;

const GENERIC_COMPARISON_PATTERNS = [
  /belirleyici klinik bulgular doğru tanı lehine/i,
  /seçeneğin beklenen tipik bulguları/i,
  /ilk yönetim doğru tanının aciliyetine göre/i,
];

function normalizeText(value = '') {
  return String(value)
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

function trimTrailingPunctuation(value = '') {
  return normalizeText(value).replace(/[.;:]$/u, '');
}

function capitalizeSentence(value = '') {
  const text = normalizeText(value);
  if (!text) return '';
  return text.charAt(0).toLocaleUpperCase('tr') + text.slice(1);
}

function ensureSentence(value = '') {
  const text = capitalizeSentence(normalizeText(value));
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function truncateSentence(value = '', limit = 190) {
  const text = normalizeText(value);
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit).replace(/\s+\S*$/u, '').trim();
  return `${cut}…`;
}

function unique(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    const text = normalizeText(item);
    if (!text || seen.has(text.toLocaleLowerCase('tr'))) return false;
    seen.add(text.toLocaleLowerCase('tr'));
    return true;
  });
}

function splitIntoSentences(text = '') {
  return normalizeText(text)
    .split(/(?<=[.!?])\s+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function splitActionItems(text = '') {
  const normalized = normalizeText(text);
  if (!normalized) return [];

  const semicolonParts = normalized.split(/;\s*/u).map(trimTrailingPunctuation).filter(Boolean);
  if (semicolonParts.length > 1) return semicolonParts;

  const sentenceParts = splitIntoSentences(normalized).map(trimTrailingPunctuation).filter(Boolean);
  if (sentenceParts.length > 1) return sentenceParts;

  return normalized
    .split(/,\s+(?=(?:intravenöz|oral|acil|ritim|hemodinami|hasta|tedavi|cerrahi|antibiyotik|antikoagülasyon|aspirin|görüntüleme|izlem|kontrendikasyon|mekanik|reperfüzyon)\b)/iu)
    .map(trimTrailingPunctuation)
    .filter(Boolean);
}

function getFeedback(clinicalCase) {
  return clinicalCase.diagnosis?.answerFeedback || clinicalCase.answerFeedback || {};
}

function pickClinicalMeta(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  if (feedback.shortDiagnosisMeta) return normalizeText(feedback.shortDiagnosisMeta);
  if (feedback.diagnosisMeta) return normalizeText(feedback.diagnosisMeta);

  const focus = normalizeText(clinicalCase.clinicalFocus || '');
  if (focus) return focus.split(/[,.;]/u)[0].trim();
  return normalizeText(clinicalCase.setting || 'Klinik karar verme');
}

function deriveWhyCorrect(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  if (feedback.whyCorrect) return feedback.whyCorrect;

  const explanation = normalizeText(clinicalCase.diagnosis?.explanation || '');
  const firstSentence = splitIntoSentences(explanation)[0] || explanation;
  return truncateSentence(firstSentence || `${clinicalCase.diagnosis?.correct} olgudaki klinik ve tetkik paternini en iyi açıklar.`, 270);
}

function deriveWhyWrong(clinicalCase, selectedOption, differential) {
  const feedback = getFeedback(clinicalCase);

  if (typeof feedback.whyWrong === 'string') return feedback.whyWrong;
  if (selectedOption && feedback.whyWrong && typeof feedback.whyWrong === 'object' && feedback.whyWrong[selectedOption]) {
    return feedback.whyWrong[selectedOption];
  }

  if (differential?.explanation) return differential.explanation;

  const correctDiagnosis = feedback.correctDiagnosis || clinicalCase.diagnosis?.correct || 'doğru tanı';
  if (selectedOption) {
    return `${selectedOption} bu olguda ayırıcı tanıda düşünülebilir; ancak temel klinik bulgular, zamanlama ve tetkik paterni ${correctDiagnosis} lehine daha güçlüdür.`;
  }

  return `Seçilen yanıt, olgunun ana klinik ve tetkik paternini ${correctDiagnosis} kadar iyi açıklamaz.`;
}

function cleanEvidenceText(item = '') {
  const text = normalizeText(item)
    .replace(/^Başvuru:\s*/iu, '')
    .replace(/^Muayene:\s*/iu, '')
    .replace(/^Tetkik:\s*/iu, '');
  return truncateSentence(text, 185);
}

function deriveEvidenceChain(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  if (Array.isArray(feedback.evidenceChain) && feedback.evidenceChain.length) {
    return unique(feedback.evidenceChain)
      .slice(0, MAX_EVIDENCE_ITEMS)
      .map(cleanEvidenceText);
  }

  const items = [];
  if (clinicalCase.chiefComplaint) {
    items.push(`${trimTrailingPunctuation(clinicalCase.chiefComplaint)} başvurunun temel klinik problemini oluşturur`);
  }

  if (Array.isArray(clinicalCase.exam) && clinicalCase.exam.length) {
    items.push(trimTrailingPunctuation(clinicalCase.exam[0]));
  }

  const highYieldInvestigations = (clinicalCase.investigations || [])
    .map((investigation) => {
      const finding = investigation.summary || investigation.findings?.[0] || '';
      if (!finding) return null;
      return `${investigation.label} bulgusu: ${trimTrailingPunctuation(finding)}`;
    })
    .filter(Boolean);

  items.push(...highYieldInvestigations.slice(0, 3));

  const explanationSentences = splitIntoSentences(clinicalCase.diagnosis?.explanation || '');
  if (explanationSentences[1]) items.push(trimTrailingPunctuation(explanationSentences[1]));

  return unique(items)
    .slice(0, MAX_EVIDENCE_ITEMS)
    .map(cleanEvidenceText);
}

function derivePearls(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const pearls = feedback.clinicalPearls || feedback.pearls || clinicalCase.diagnosis?.pearls || [];
  return unique(pearls).slice(0, MAX_PEARL_ITEMS).map((item) => truncateSentence(item, 160));
}

function deriveManagementSteps(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const management = feedback.managementSteps || feedback.management;
  if (Array.isArray(management) && management.length) {
    return unique(management)
      .slice(0, MAX_MANAGEMENT_ITEMS)
      .map((item) => trimTrailingPunctuation(item));
  }

  const nextStep = clinicalCase.diagnosis?.nextStep || '';
  const steps = splitActionItems(nextStep);
  if (steps.length) return unique(steps).slice(0, MAX_MANAGEMENT_ITEMS);
  return nextStep ? [trimTrailingPunctuation(nextStep)] : ['İlk basamağı klinik aciliyet ve hedef organ riski üzerinden planla'];
}

function normalizeDifferentialItem(item) {
  if (!item) return null;
  if (typeof item === 'string') return { explanation: item, comparisonPoints: [] };
  return {
    explanation: item.explanation || item.summary || '',
    comparisonPoints: item.comparisonPoints || item.points || [],
  };
}

function isGenericComparisonPoint(point = '') {
  return GENERIC_COMPARISON_PATTERNS.some((pattern) => pattern.test(point));
}

function buildNaturalComparisonPoints(clinicalCase, selectedOption, evidenceChain = []) {
  const keyInvestigation = (clinicalCase.investigations || []).find((item) => item.summary || item.findings?.length);
  const points = [
    `${selectedOption} klinik ayırıcı tanıda yer alabilir`,
    evidenceChain[0] || null,
    keyInvestigation ? `${keyInvestigation.label} bulguları ayırıcı tanıyı daraltır` : null,
    'İlk yönetim, aciliyet ve hedef organ riski üzerinden belirlenir',
  ];

  return unique(points.filter(Boolean)).slice(0, 4).map((item) => truncateSentence(item, 145));
}

function buildDifferential(clinicalCase, selectedOption, evidenceChain = []) {
  if (!selectedOption || selectedOption === clinicalCase.diagnosis?.correct) return null;

  const feedback = getFeedback(clinicalCase);
  const differentialMap = feedback.differentialComparison || feedback.differentials || feedback.differentialExplanations || clinicalCase.diagnosis?.differentials || {};
  const explicit = normalizeDifferentialItem(differentialMap[selectedOption]);

  if (explicit) {
    const nonGenericPoints = unique(explicit.comparisonPoints || []).filter((point) => !isGenericComparisonPoint(point));
    return {
      option: selectedOption,
      explanation: explicit.explanation || `${selectedOption} ayırıcı tanıda yer alabilir; ancak karar verdirici bulgular farklı bir yönü destekler.`,
      comparisonPoints: (nonGenericPoints.length ? nonGenericPoints : buildNaturalComparisonPoints(clinicalCase, selectedOption, evidenceChain)).slice(0, 4),
    };
  }

  return {
    option: selectedOption,
    explanation: `${selectedOption} ayırıcı tanıda yer alabilir; ancak zamanlama, muayene ve ilk tetkik verileri bu seçeneği geri planda bırakır.`,
    comparisonPoints: buildNaturalComparisonPoints(clinicalCase, selectedOption, evidenceChain),
  };
}

function FeedbackSection({ icon, tone = 'blue', eyebrow, title, children, className = '' }) {
  return (
    <section className={`feedback-card ${className}`.trim()}>
      <header className="feedback-card-head">
        <IconBadge icon={icon} tone={tone} size="sm" />
        <div>
          {eyebrow ? <span>{eyebrow}</span> : null}
          <h4>{title}</h4>
        </div>
      </header>
      {children}
    </section>
  );
}

function ResultSummary({ isCorrect, diagnosis, points, diagnosisMeta, glossaryEnabled = true, isSpotCase = false }) {
  const statusTone = isCorrect ? 'success' : 'danger';
  return (
    <header className={`answer-feedback-summary ${statusTone}`}>
      <div className="answer-feedback-status-icon">
        <Icon name={isCorrect ? 'CheckCircle' : 'XCircle'} />
      </div>
      <div className="answer-feedback-summary-copy">
        <span className={`feedback-status-pill ${statusTone}`}>{isCorrect ? 'Doğru' : 'Yanlış'}</span>
        <h3>{isCorrect ? (isSpotCase ? 'Karar doğru seçildi' : 'Tanı doğru seçildi') : (isSpotCase ? 'Seçilen yanıt doğru değil' : 'Seçilen tanı doğru değil')}</h3>
        {isCorrect ? <p><GlossaryText text={diagnosis} enabled={glossaryEnabled} /></p> : <p>{isSpotCase ? 'Doğru yanıt ve seçilen seçenek aşağıda karşılaştırılmıştır.' : 'Doğru yanıt ve seçilen tanı aşağıda karşılaştırılmıştır.'}</p>}
        {isCorrect && diagnosisMeta ? <small><GlossaryText text={diagnosisMeta} enabled={glossaryEnabled} /></small> : null}
      </div>
      <div className="answer-feedback-meta-row" aria-label="Yanıt özeti">
        {isCorrect ? <span>Vaka puanı: {points} p</span> : <span>{isSpotCase ? 'Yanıt puanı: 0' : 'Tanı puanı: 0'}</span>}
      </div>
    </header>
  );
}

function DiagnosisSummaryCard({ diagnosis, diagnosisMeta }) {
  return (
    <FeedbackSection icon="Target" tone="success" eyebrow={isSpotCase ? 'Doğru seçenek' : 'Tanısal sonuç'} title={isSpotCase ? 'Doğru yanıt' : 'Doğru tanı'} className="diagnosis-summary-card">
      <div className="diagnosis-name-card">
        <strong><GlossaryText text={diagnosis} enabled={glossaryEnabled} /></strong>
        {diagnosisMeta ? <span>{diagnosisMeta}</span> : null}
      </div>
    </FeedbackSection>
  );
}

function DiagnosisComparisonCard({ diagnosis, selected, glossaryEnabled = true, isSpotCase = false }) {
  return (
    <section className="diagnosis-comparison-card" aria-label="Doğru tanı ve seçilen tanı karşılaştırması">
      <div className="diagnosis-compare-item correct">
        <span>{isSpotCase ? 'Doğru yanıt' : 'Doğru tanı'}</span>
        <strong><GlossaryText text={diagnosis} enabled={glossaryEnabled} /></strong>
      </div>
      <div className="diagnosis-compare-item wrong">
        <span>{isSpotCase ? 'Seçilen yanıt' : 'Seçilen tanı'}</span>
        <strong><GlossaryText text={selected} enabled={glossaryEnabled} /></strong>
      </div>
    </section>
  );
}

function ReasoningEvidenceCard({ reasoningText, evidenceChain, isCorrect = true, glossaryEnabled = true }) {
  return (
    <FeedbackSection
      icon={isCorrect ? 'Brain' : 'AlertTriangle'}
      tone={isCorrect ? 'blue' : 'warning'}
      eyebrow="Klinik gerekçe"
      title={isCorrect ? 'Neden doğru?' : 'Neden yanlış?'}
      className="reasoning-evidence-card"
    >
      <p className="feedback-body-copy"><GlossaryText text={ensureSentence(reasoningText)} enabled={glossaryEnabled} /></p>
      {evidenceChain.length ? (
        <div className="evidence-chain-box">
          <span>Kanıt zinciri</span>
          <ol className="evidence-chain-list">
            {evidenceChain.map((item, index) => (
              <li key={`${item}-${index}`}>
                <b>{index + 1}</b>
                <p><GlossaryText text={ensureSentence(item)} enabled={glossaryEnabled} /></p>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </FeedbackSection>
  );
}

function ClinicalPearlsList({ pearls, glossaryEnabled = true }) {
  if (!pearls.length) return null;
  return (
    <FeedbackSection icon="Sparkles" tone="accent" eyebrow="Sınav notu" title="Kritik ipuçları" className="clinical-pearls-card">
      <div className="clinical-pearl-list">
        {pearls.map((pearl, index) => (
          <div className="clinical-pearl-item" key={`${pearl}-${index}`}>
            <span aria-hidden="true" />
            <p><GlossaryText text={ensureSentence(pearl)} enabled={glossaryEnabled} /></p>
          </div>
        ))}
      </div>
    </FeedbackSection>
  );
}

function DifferentialComparisonCard({ differential, glossaryEnabled = true, isSpotCase = false }) {
  if (!differential) return null;
  return (
    <FeedbackSection icon="AlertTriangle" tone="warning" eyebrow="Ayırıcı tanı" title={isSpotCase ? 'Seçenek karşılaştırması' : 'Ayırıcı tanı karşılaştırması'} className="differential-comparison-card">
      <div className="differential-option-chip"><span>{isSpotCase ? 'Seçilen yanıt:' : 'Seçilen tanı:'}</span> <GlossaryText text={differential.option} enabled={glossaryEnabled} /></div>
      <p className="feedback-body-copy"><GlossaryText text={ensureSentence(differential.explanation)} enabled={glossaryEnabled} /></p>
      {differential.comparisonPoints?.length ? (
        <ul className="comparison-point-list">
          {differential.comparisonPoints.slice(0, 4).map((point, index) => <li key={`${point}-${index}`}><GlossaryText text={ensureSentence(point)} enabled={glossaryEnabled} /></li>)}
        </ul>
      ) : null}
    </FeedbackSection>
  );
}

function FeedbackManagementCard({ managementSteps, glossaryEnabled = true }) {
  return (
    <FeedbackSection icon="Timer" tone="warning" eyebrow="Yönetim" title="İlk yönetim basamağı" className="feedback-management-card">
      <div className="management-action-list">
        {managementSteps.map((step, index) => (
          <div className="management-action-item" key={`${step}-${index}`}>
            <b>{index + 1}</b>
            <p><GlossaryText text={ensureSentence(step)} enabled={glossaryEnabled} /></p>
          </div>
        ))}
      </div>
    </FeedbackSection>
  );
}

function AnswerFeedbackPanel({
  clinicalCase,
  selected,
  isCorrect,
  difficultyMeta,
  children,
  hardMode = false,
}) {
  const feedback = getFeedback(clinicalCase);
  const selectedDiagnosis = feedback.selectedDiagnosis || selected;
  const whyCorrect = deriveWhyCorrect(clinicalCase);
  const evidenceChain = deriveEvidenceChain(clinicalCase);
  const pearls = derivePearls(clinicalCase);
  const differential = buildDifferential(clinicalCase, selectedDiagnosis, evidenceChain);
  const whyWrong = deriveWhyWrong(clinicalCase, selectedDiagnosis, differential);
  const reasoningText = isCorrect ? whyCorrect : whyWrong;
  const managementSteps = deriveManagementSteps(clinicalCase);
  const glossaryEnabled = !hardMode;
  const isSpotCase = clinicalCase.caseType === 'spot' || clinicalCase.branchId === 'tus-spot-olgular';

  return (
    <div className={`feedback answer-feedback-panel ${isCorrect ? 'success' : 'danger'}`} aria-live="polite">
      <div className="answer-feedback-grid">
        <ReasoningEvidenceCard
          reasoningText={reasoningText}
          evidenceChain={evidenceChain}
          isCorrect={isCorrect}
          glossaryEnabled={glossaryEnabled}
        />
        <ClinicalPearlsList pearls={pearls} glossaryEnabled={glossaryEnabled} />
        <DifferentialComparisonCard differential={differential} glossaryEnabled={glossaryEnabled} isSpotCase={isSpotCase} />
        <FeedbackManagementCard managementSteps={managementSteps} glossaryEnabled={glossaryEnabled} />
      </div>

      {children ? <div className="answer-feedback-actions">{children}</div> : null}
    </div>
  );
}

export default AnswerFeedbackPanel;
