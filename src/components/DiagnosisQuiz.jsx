import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { shuffleArray } from '../utils/randomize.js';
import { getDifficultyMeta } from '../utils/scoring.js';
import { Icon, IconBadge } from './ui.jsx';
import AnswerFeedbackPanel from './AnswerFeedbackPanel.jsx';
import GlossaryText from './GlossaryTooltip.jsx';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

function buildOptions(options, correct) {
  const unique = Array.from(new Set(options));
  const shuffled = shuffleArray(unique);
  if (shuffled[0] === correct && shuffled.length > 1) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
}

const AnswerOption = memo(function AnswerOption({ option, index, selected, submitted, correctAnswer, onSelect, glossaryEnabled = true }) {
  const isSelected = selected === option;
  const isCorrectOption = option === correctAnswer;
  const stateClass = submitted
    ? isCorrectOption
      ? 'correct solved'
      : isSelected
        ? 'wrong solved'
        : 'answered-neutral solved'
    : isSelected
      ? 'selected'
      : 'idle';

  const statusLabel = submitted
    ? isCorrectOption
      ? 'Doğru yanıt'
      : isSelected
        ? 'Seçimin yanlış'
        : ''
    : isSelected
      ? 'Seçildi'
      : '';

  const statusIcon = submitted && isCorrectOption
    ? 'CheckCircle'
    : submitted && isSelected
      ? 'XCircle'
      : null;

  return (
    <button
      type="button"
      className={`answer-option ${stateClass}`.trim()}
      onClick={() => onSelect(option)}
      disabled={submitted}
      aria-pressed={isSelected}
      aria-label={`${OPTION_LETTERS[index] ?? index + 1}: ${option}${statusLabel ? `, ${statusLabel}` : ''}`}
      data-answer-state={stateClass}
    >
      <span className="answer-letter">{OPTION_LETTERS[index] ?? index + 1}</span>
      <span className="answer-content">
        <span className="answer-title"><GlossaryText text={option} enabled={glossaryEnabled} /></span>
        {statusLabel ? <span className="answer-state-label">{statusLabel}</span> : null}
      </span>
      <span className="answer-status-icon" aria-hidden="true">
        {statusIcon ? <Icon name={statusIcon} /> : <span className="answer-radio-dot" />}
      </span>
    </button>
  );
});


function DiagnosisQuiz({
  clinicalCase,
  onRandomCase,
  onSubmitAnswer,
  tutorMode = false,
  examMeta = null,
  onAdvanceExam,
  onPreviousExam,
  onFinishExam,
  existingAnswer = null,
  orderedInvestigationIds = [],
  investigationOrders = [],
  hardMode = false,
  randomActionLabel = 'Yeni vaka çöz',
  hideSpotQuestionCallout = false,
  questionPromptOverride = '',
  questionHeadingOverride = '',
  questionSubtextOverride = '',
}) {
  const [selected, setSelected] = useState(existingAnswer?.selected ?? null);
  const [submitted, setSubmitted] = useState(Boolean(existingAnswer));

  const options = useMemo(
    () => buildOptions(clinicalCase.diagnosis.options, clinicalCase.diagnosis.correct),
    [clinicalCase.id],
  );

  useEffect(() => {
    setSelected(existingAnswer?.selected ?? null);
    setSubmitted(Boolean(existingAnswer));
  }, [clinicalCase.id, existingAnswer]);

  const difficultyMeta = getDifficultyMeta(clinicalCase.difficulty);
  const isCorrect = selected === clinicalCase.diagnosis.correct;
  const isStrictExam = examMeta?.active && !tutorMode;
  const answeredCount = examMeta?.active ? Object.keys(examMeta.answers || {}).length : 0;
  const progressWidth = examMeta?.active
    ? `${Math.round(((examMeta.currentIndex + 1) / examMeta.total) * 100)}%`
    : '0%';
  const isSpotCase = clinicalCase.caseType === 'spot' || clinicalCase.branchId === 'tus-spot-olgular';
  const questionPrompt = questionPromptOverride || clinicalCase.question || clinicalCase.diagnosis?.question || '';
  const defaultQuestionHeading = isSpotCase ? (clinicalCase.questionType === 'diagnosis' ? 'TUS spot tanı sorusu' : clinicalCase.questionType === 'test' ? 'TUS spot tetkik sorusu' : clinicalCase.questionType === 'treatment' ? 'TUS spot tedavi sorusu' : 'TUS spot karar sorusu') : 'En olası tanı';
  const questionHeading = questionHeadingOverride || defaultQuestionHeading;
  const defaultQuestionSubtext = isSpotCase
    ? (submitted && clinicalCase.clinicalFocus
      ? clinicalCase.clinicalFocus
      : 'Kısa TUS olgusunda öykü, muayene ve objektif verileri yorumlayarak en doğru yanıtı seç.')
    : 'Olgu paternine en uygun seçeneği işaretle.';
  const questionSubtext = questionSubtextOverride || defaultQuestionSubtext;
  const showInlineQuestionStem = isSpotCase && Boolean(questionPrompt) && hideSpotQuestionCallout;

  const handleSubmit = useCallback(() => {
    if (!selected || submitted) return;
    onSubmitAnswer?.({ clinicalCase, selected, isCorrect });
    setSubmitted(true);
  }, [clinicalCase, isCorrect, onSubmitAnswer, selected, submitted]);

  return (
    <section className="question-panel diagnostic-decision-panel" id="case-quiz" aria-label="Klinik karar sorusu">
      <div className="question-panel-head diagnostic-head">
        <div>
          <h2>{questionHeading}</h2>
          <p><GlossaryText text={questionSubtext} enabled={!hardMode && !examMeta?.active} /></p>
        </div>

        <div className="question-score-chip compact-meta-pill">
          <span>{examMeta?.active ? `${examMeta.currentIndex + 1}/${examMeta.total}` : '1 soru'}</span>
          <strong>{difficultyMeta.points} p</strong>
        </div>
      </div>

      {examMeta?.active ? (
        <div className="exam-progress-box">
          <div className="exam-progress-top">
            <span>Blok ilerlemesi</span>
            <strong>{answeredCount}/{examMeta.total} yanıt</strong>
          </div>
          <div className="exam-progress-track">
            <span style={{ width: progressWidth }} />
          </div>
        </div>
      ) : null}


      {!isSpotCase && investigationOrders.length > 0 && !hardMode && !examMeta?.active && !submitted && selected && orderedInvestigationIds.length === 0 ? (
        <div className="preanswer-investigation-nudge">
          Tanı seçmeden önce karar verdirici tetkikleri istemeyi düşünebilirsin.
        </div>
      ) : null}

      {showInlineQuestionStem ? (
        <div className="ai-spot-inline-question-stem" role="note" aria-label="Soru kökü">
          <span className="ai-spot-inline-question-stem-label">Soru kökü</span>
          <strong><GlossaryText text={questionPrompt} enabled={!hardMode && !examMeta?.active} /></strong>
        </div>
      ) : null}

      {isSpotCase && questionPrompt && !hideSpotQuestionCallout ? (
        <div className="tus-spot-olgular-question-callout" role="note">
          <Icon name="Target" size={16} />
          <strong><GlossaryText text={questionPrompt} enabled={!hardMode && !examMeta?.active} /></strong>
        </div>
      ) : null}

      <div className="option-grid" role="group" aria-label={isSpotCase ? 'TUS spot seçenekleri' : 'Tanı seçenekleri'}>
        {options.map((option, index) => (
          <AnswerOption
            key={option}
            option={option}
            index={index}
            selected={selected}
            submitted={submitted}
            correctAnswer={clinicalCase.diagnosis.correct}
            onSelect={setSelected}
            glossaryEnabled={!hardMode && !examMeta?.active}
          />
        ))}
      </div>

      <div className="quiz-actions">
        <button
          className={`btn answer-evaluate-btn ${submitted ? 'is-complete' : 'btn-primary'}`.trim()}
          type="button"
          disabled={!selected || submitted}
          onClick={handleSubmit}
        >
          <Icon name="TrendUp" />
          <span>{examMeta?.active ? 'Yanıtı kaydet' : 'Yanıtı değerlendir'}</span>
        </button>

        {!examMeta?.active ? (
          <button className="btn btn-secondary answer-next-case-btn" type="button" onClick={onRandomCase}>
            <Icon name="RotateCcw" />
            <span>{randomActionLabel}</span>
            <Icon name="ArrowRight" className="answer-next-case-arrow" />
          </button>
        ) : null}
      </div>

      {submitted ? (
        isStrictExam ? (
          <div className="feedback exam-feedback-compact">
            <div className="feedback-header">
              <IconBadge icon="CheckCircle" tone="blue" size="sm" />
              <div>
                <span className="feedback-badge neutral">Yanıt kaydedildi</span>
                <p className="feedback-answer">Doğru yanıt ve gerekçe blok sonunda ayrıntılı gösterilecek.</p>
              </div>
            </div>

            <div className="exam-nav-actions">
              <button type="button" className="btn btn-secondary" onClick={onPreviousExam} disabled={!examMeta?.hasPrevious}>Önceki olgu</button>
              {examMeta?.hasNext ? (
                <button type="button" className="btn btn-primary" onClick={onAdvanceExam}>Sonraki olgu</button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={onFinishExam}>Bloku tamamla</button>
              )}
            </div>
          </div>
        ) : (
          <AnswerFeedbackPanel
            clinicalCase={clinicalCase}
            selected={selected}
            isCorrect={isCorrect}
            difficultyMeta={difficultyMeta}
            hardMode={hardMode}
          >
            {examMeta?.active ? (
              <div className="exam-nav-actions">
                <button type="button" className="btn btn-secondary" onClick={onPreviousExam} disabled={!examMeta?.hasPrevious}>Önceki olgu</button>
                {examMeta?.hasNext ? (
                  <button type="button" className="btn btn-primary" onClick={onAdvanceExam}>Sonraki olgu</button>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={onFinishExam}>Bloku tamamla</button>
                )}
              </div>
            ) : null}
          </AnswerFeedbackPanel>
        )
      ) : null}
    </section>
  );
}

export default memo(DiagnosisQuiz);
