import DiagnosisQuiz from './DiagnosisQuiz.jsx';
import GlossaryText from './GlossaryTooltip.jsx';
import { Icon, IconBadge } from './ui.jsx';
import { getDifficultyMeta } from '../utils/scoring.js';
import {
  buildAISpotContextLine,
  buildAISpotNarrativeStem,
  buildSafeAISpotTitle,
  getAISpotCompactObjectiveData,
  getAISpotCompactVitals,
  getAISpotPreviewDiagnostics,
} from '../utils/aiSpotNarrative.js';

const AI_SPOT_BRANCH = {
  id: 'tus-spot-olgular',
  name: 'AI ile Üretilen TUS Spot Sorusu',
  shortName: 'AI Spot',
  description: 'Tek köklü, paragraf temelli TUS spot sorusu.',
};

function AISpotMetaBadge({ icon, children, tone = 'teal' }) {
  return (
    <span className={`ai-spot-narrative-badge ${tone}`.trim()}>
      <Icon name={icon} size={14} />
      {children}
    </span>
  );
}

function CompactDataGroup({ title, items = [] }) {
  if (!items.length) return null;
  return (
    <div className="ai-spot-compact-data-group" aria-label={title}>
      <div className="ai-spot-compact-data-title">{title}</div>
      <div className="ai-spot-compact-data-grid">
        {items.map((item, index) => (
          <div className="ai-spot-compact-data-item" key={`${title}-${item.label}-${index}`}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function AISpotNarrativePanel({ question, hardMode = false }) {
  const title = buildSafeAISpotTitle(question);
  const contextLine = buildAISpotContextLine(question);
  const paragraphs = buildAISpotNarrativeStem(question);
  const compactVitals = getAISpotCompactVitals(question);
  const compactObjectiveData = getAISpotCompactObjectiveData(question);
  const difficultyMeta = getDifficultyMeta(question.difficulty);
  const diagnostics = import.meta.env?.DEV ? getAISpotPreviewDiagnostics(question) : null;

  return (
    <section className="ai-spot-narrative-card card-surface" id="ai-spot-narrative" aria-label="AI TUS spot soru metni">
      <div className="ai-spot-narrative-topline">
        <div className="ai-spot-narrative-badges" aria-label="Soru üst bilgisi">
          <AISpotMetaBadge icon="Sparkles">TUS Spot Olgular · AI Spot</AISpotMetaBadge>
          <AISpotMetaBadge icon="Stethoscope" tone="blue">{question.relatedBranch || question.branchName || 'TUS'}</AISpotMetaBadge>
          <AISpotMetaBadge icon="Trophy" tone="amber">{difficultyMeta.label} · {difficultyMeta.points}p</AISpotMetaBadge>
        </div>
      </div>

      <div className="ai-spot-narrative-heading">
        <IconBadge icon="ClipboardList" tone="teal" size="lg" />
        <div>
          <span className="ai-spot-narrative-eyebrow">Tek akışlı soru kökü</span>
          <h1><GlossaryText text={title} enabled={!hardMode} /></h1>
          <p><GlossaryText text={contextLine} enabled={!hardMode} /></p>
        </div>
      </div>

      <div className="ai-spot-narrative-reading-panel">
        {paragraphs.map((paragraph, index) => (
          <p key={`${question.id}-ai-narrative-${index}`}>
            <GlossaryText text={paragraph} enabled={!hardMode} />
          </p>
        ))}
      </div>

      {(compactVitals.length || compactObjectiveData.length) ? (
        <div className="ai-spot-compact-data-shell">
          <CompactDataGroup title="Vital bulgular" items={compactVitals} />
          <CompactDataGroup title="Objektif veriler" items={compactObjectiveData} />
        </div>
      ) : null}

      <div className="ai-spot-narrative-footer" aria-hidden="true">
        <span><Icon name="ShieldCheck" size={15} /> Cevap öncesi yalnızca soru kökü gösterilir.</span>
      </div>

      {diagnostics ? (
        <div className="ai-spot-dev-diagnostics" aria-hidden="true">
          <span>paragraphs: {diagnostics.paragraphCount}</span>
          <span>words: {diagnostics.wordCount}</span>
          <span>vitals: {diagnostics.compactVitalsCount}</span>
          <span>objective: {diagnostics.compactObjectiveCount}</span>
          <span>legacy labels: {diagnostics.hasLegacyBoxLabels ? 'yes' : 'no'}</span>
          <span>correct in stem: {diagnostics.containsCorrectAnswerText ? 'yes' : 'no'}</span>
        </div>
      ) : null}
    </section>
  );
}

function AISpotQuestionScreen({
  question,
  onGenerateQuestion,
  onSubmitAnswer,
  tutorMode,
  hardMode = false,
  randomActionLabel = 'Yeni AI sorusu üret',
}) {
  return (
    <article className="case-player-shell ai-spot-player-shell">
      <section className="qbank-layout-grid professional-qbank-layout ai-spot-narrative-layout">
        <div className="qbank-main-column ai-spot-main-column">
          <AISpotNarrativePanel question={question} hardMode={hardMode} />
        </div>

        <aside className="qbank-side-column professional-right-column ai-spot-side-column">
          <div
            className="right-workspace-shell card-surface ai-spot-answer-shell"
            tabIndex={0}
            role="region"
            aria-label="AI TUS spot cevap paneli"
          >
            <DiagnosisQuiz
              clinicalCase={question}
              branch={AI_SPOT_BRANCH}
              mode="study"
              onRandomCase={onGenerateQuestion}
              onSubmitAnswer={onSubmitAnswer}
              tutorMode={tutorMode}
              orderedInvestigationIds={[]}
              investigationOrders={[]}
              hardMode={hardMode}
              randomActionLabel={randomActionLabel}
            />
          </div>
        </aside>
      </section>
    </article>
  );
}

export default AISpotQuestionScreen;
