import DiagnosisQuiz from './DiagnosisQuiz.jsx';
import GlossaryText from './GlossaryTooltip.jsx';
import { Icon, IconBadge } from './ui.jsx';
import { getDifficultyMeta } from '../utils/scoring.js';
import {
  buildAISpotContextLine,
  buildAISpotNarrativeStem,
  buildAISpotQuestionPrompt,
  buildSafeAISpotTitle,
  getAISpotPreviewDiagnostics,
  getAISpotSupportDataGroups,
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
        {items.map((item, index) => {
          const label = String(item.label || '');
          const value = String(item.value || '');
          const isLong = `${label} ${value}`.length > 34 || /[,;]/u.test(value);
          return (
            <div
              className={`ai-spot-compact-data-item ${isLong ? 'is-long' : ''}`.trim()}
              key={`${title}-${label}-${index}`}
              title={`${label}: ${value}`}
            >
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AISpotNarrativePanel({ question, hardMode = false, embedded = false }) {
  const title = buildSafeAISpotTitle(question);
  const contextLine = buildAISpotContextLine(question);
  const paragraphs = buildAISpotNarrativeStem(question);
  const supportDataGroups = getAISpotSupportDataGroups(question);
  const difficultyMeta = getDifficultyMeta(question.difficulty);
  const diagnostics = import.meta.env?.DEV ? getAISpotPreviewDiagnostics(question) : null;

  return (
    <section
      className={`ai-spot-narrative-card ${embedded ? 'is-embedded' : 'card-surface'}`.trim()}
      id="ai-spot-narrative"
      aria-label="AI TUS spot soru metni"
    >
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

      <div className={`ai-spot-narrative-content-grid ${supportDataGroups.length ? 'has-support-data' : 'no-support-data'}`.trim()}>
        <div className="ai-spot-narrative-reading-panel">
          {paragraphs.map((paragraph, index) => (
            <p key={`${question.id}-ai-narrative-${index}`}>
              <GlossaryText text={paragraph} enabled={!hardMode} />
            </p>
          ))}
        </div>

        {supportDataGroups.length ? (
          <aside className="ai-spot-support-data-panel" aria-label="Soruya ait destek veriler">
            {supportDataGroups.map((group) => (
              <CompactDataGroup key={group.title} title={group.title} items={group.items} />
            ))}
          </aside>
        ) : null}
      </div>

      {diagnostics ? (
        <div className="ai-spot-dev-diagnostics" aria-hidden="true">
          <span>paragraphs: {diagnostics.paragraphCount}</span>
          <span>words: {diagnostics.wordCount}</span>
          <span>support groups: {diagnostics.supportGroupCount}</span>
          <span>support items: {diagnostics.supportItemCount}</span>
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
  const questionPrompt = buildAISpotQuestionPrompt(question);

  return (
    <article className="case-player-shell ai-spot-player-shell">
      <section className="ai-spot-unified-panel card-surface" aria-label="AI ile üretilen TUS spot soru akışı">
        <AISpotNarrativePanel question={question} hardMode={hardMode} embedded />

        <div className="ai-spot-answer-flow" role="region" aria-label="Yanıt seçenekleri ve geri bildirim">
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
            hideSpotQuestionCallout
            questionPromptOverride={questionPrompt}
            questionHeadingOverride="Yanıt seçenekleri"
            questionSubtextOverride={questionPrompt || 'En uygun seçeneği işaretle.'}
          />
        </div>
      </section>
    </article>
  );
}

export default AISpotQuestionScreen;
