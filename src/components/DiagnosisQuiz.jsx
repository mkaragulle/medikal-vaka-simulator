import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { shuffleArray } from '../utils/randomize.js';
import { getDifficultyMeta } from '../utils/scoring.js';
import { Icon, IconBadge } from './ui.jsx';
import AnswerFeedbackPanel from './AnswerFeedbackPanel.jsx';
import GlossaryText from './GlossaryTooltip.jsx';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

function buildOptions(options, correct, shouldShuffle = false) {
  const unique = Array.from(new Set(options));
  if (!shouldShuffle) return unique;
  const shuffled = shuffleArray(unique);
  if (shuffled[0] === correct && shuffled.length > 1) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
}

const ROMAN_MARKER_PATTERN = /(?:^|\s)(I{1,3}|IV|V|VI{0,3}|IX|X)[.)]\s+/g;

function parseRomanQuestionStem(text = '') {
  const source = String(text || '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!source) return null;

  const matches = Array.from(source.matchAll(ROMAN_MARKER_PATTERN));
  if (matches.length < 2) return null;

  const items = matches.map((match, index) => {
    const marker = match[1];
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? source.length;
    const textValue = source.slice(start, end).trim();
    return { marker, text: textValue };
  }).filter((item) => item.text);

  if (items.length < 2) return null;

  const intro = source.slice(0, matches[0].index).trim();
  return { intro, items };
}

function FormattedQuestionStem({ text = '', glossaryEnabled = true, revealMode = 'preAnswer', maxTerms = 8 }) {
  const formatted = useMemo(() => parseRomanQuestionStem(text), [text]);

  if (!formatted) {
    return <GlossaryText text={text} enabled={glossaryEnabled} revealMode={revealMode} maxTerms={maxTerms} />;
  }

  return (
    <span className="formatted-question-stem has-roman-items">
      {formatted.intro ? (
        <span className="formatted-question-intro">
          <GlossaryText text={formatted.intro} enabled={glossaryEnabled} revealMode={revealMode} maxTerms={maxTerms} />
        </span>
      ) : null}
      <span className="formatted-question-roman-list" role="list" aria-label="Numaralandırılmış önermeler">
        {formatted.items.map((item) => (
          <span className="formatted-question-roman-row" role="listitem" key={`${item.marker}-${item.text}`}>
            <span className="formatted-question-roman-marker">{item.marker}.</span>
            <span className="formatted-question-roman-text">
              <GlossaryText text={item.text} enabled={glossaryEnabled} revealMode={revealMode} maxTerms={maxTerms} />
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}

function parseOptionFlow(text = '') {
  const source = String(text || '').replace(/\s+/g, ' ').trim();
  if (!source) return null;

  const segments = source
    .split(/\s*(?:→|->|➜|⇒)\s*/g)
    .map((part) => part.trim())
    .filter(Boolean);

  if (segments.length < 3) return null;
  return segments;
}

const AnswerOption = memo(function AnswerOption({ option, index, isSelected, submitted, isCorrectOption, onSelect, glossaryEnabled = true, revealMode = 'preAnswer' }) {
  const flowSegments = useMemo(() => parseOptionFlow(option), [option]);
  const isFlowOption = Array.isArray(flowSegments) && flowSegments.length > 0;
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
      className={`answer-option ${isFlowOption ? 'flow-option' : ''} ${stateClass}`.trim()}
      onClick={() => onSelect(option)}
      disabled={submitted}
      aria-pressed={isSelected}
      aria-label={`${OPTION_LETTERS[index] ?? index + 1}: ${option}${statusLabel ? `, ${statusLabel}` : ''}`}
      data-answer-state={stateClass}
    >
      <span className="answer-letter">{OPTION_LETTERS[index] ?? index + 1}</span>
      <span className={`answer-content ${isFlowOption ? 'has-flow' : ''}`.trim()}>
        {isFlowOption ? (
          <span className="answer-flow" role="list" aria-label="Nedensel seçenek akışı">
            {flowSegments.map((segment, segmentIndex) => (
              <span className="answer-flow-item" key={`${segmentIndex}-${segment}`}>
                <span className="answer-flow-segment" role="listitem">
                  <GlossaryText text={segment} enabled={glossaryEnabled} revealMode={revealMode} maxTerms={6} />
                </span>
                {segmentIndex < flowSegments.length - 1 ? (
                  <span className="answer-flow-arrow" aria-hidden="true">→</span>
                ) : null}
              </span>
            ))}
          </span>
        ) : (
          <span className="answer-title"><GlossaryText text={option} enabled={glossaryEnabled} revealMode={revealMode} maxTerms={6} /></span>
        )}
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
  questionStemOverride = '',
  questionHeadingOverride = '',
  questionSubtextOverride = '',
  hideQuestionScoreChip = false,
  hideQuestionHeader = false,
  hideInlineQuestionStemLabel = false,
  hideQuestionStem = false,
}) {
  const [selected, setSelected] = useState(existingAnswer?.selected ?? null);
  const [submitted, setSubmitted] = useState(Boolean(existingAnswer));

  const options = useMemo(
    () => buildOptions(
      clinicalCase.diagnosis.options,
      clinicalCase.diagnosis.correct,
      clinicalCase.shuffleOptions === true,
    ),
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
  const questionStem = hideQuestionStem ? '' : (questionStemOverride || clinicalCase.question || clinicalCase.diagnosis?.question || '');
  const normalizedQuestionType = String(clinicalCase.questionType || clinicalCase.answerTarget || '').toLocaleLowerCase('tr');
  const defaultQuestionHeading = normalizedQuestionType === 'test' || normalizedQuestionType === 'diagnostic_test'
    ? (isSpotCase ? 'TUS spot tetkik sorusu' : 'Tetkik / tanı testi')
    : normalizedQuestionType === 'treatment' || normalizedQuestionType === 'first_step' || normalizedQuestionType === 'next_step'
      ? (isSpotCase ? 'TUS spot tedavi sorusu' : 'Klinik yaklaşım')
      : normalizedQuestionType === 'mechanism'
        ? 'Mekanizma sorusu'
        : normalizedQuestionType === 'pathology'
          ? 'Patoloji sorusu'
          : normalizedQuestionType === 'anatomy'
            ? 'Anatomi sorusu'
            : normalizedQuestionType === 'pathogen'
              ? 'Etken sorusu'
              : isSpotCase
                ? 'TUS spot tanı sorusu'
                : 'Klinik karar';
  const questionHeading = questionHeadingOverride || defaultQuestionHeading;
  const defaultQuestionSubtext = isSpotCase
    ? (submitted && clinicalCase.clinicalFocus
      ? clinicalCase.clinicalFocus
      : '')
    : '';
  const questionSubtext = questionSubtextOverride || defaultQuestionSubtext;
  const showInlineQuestionStem = Boolean(questionStem) && hideSpotQuestionCallout;
  const glossaryRevealMode = submitted && !isStrictExam ? 'postAnswer' : 'preAnswer';
  const glossaryEnabled = !hardMode;

  const handleSubmit = useCallback(() => {
    if (!selected || submitted) return;
    onSubmitAnswer?.({ clinicalCase, selected, isCorrect });
    setSubmitted(true);
  }, [clinicalCase, isCorrect, onSubmitAnswer, selected, submitted]);

  return (
    <section className="question-panel diagnostic-decision-panel" id="case-quiz" aria-label="Klinik karar sorusu">
      {!hideQuestionHeader ? (
        <div className="question-panel-head diagnostic-head">
          <div>
            <h2>{questionHeading}</h2>
            {questionSubtext ? (
              <p>
                <FormattedQuestionStem text={questionSubtext} glossaryEnabled={glossaryEnabled} revealMode={glossaryRevealMode} />
              </p>
            ) : null}
          </div>

          {!hideQuestionScoreChip ? (
            <div className="question-score-chip compact-meta-pill single-score-chip">
              <strong>{difficultyMeta.points} Puan</strong>
            </div>
          ) : null}
        </div>
      ) : null}

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
        <div className={`tus-spot-inline-question-stem ${hideInlineQuestionStemLabel ? 'label-hidden' : ''}`.trim()} role="note" aria-label="Soru kökü">
          {!hideInlineQuestionStemLabel ? <span className="tus-spot-inline-question-stem-label">Soru kökü</span> : null}
          <strong>
            <FormattedQuestionStem text={questionStem} glossaryEnabled={glossaryEnabled} revealMode={glossaryRevealMode} />
          </strong>
        </div>
      ) : null}

      {questionStem && !hideSpotQuestionCallout ? (
        <div className="tus-spot-olgular-question-callout" role="note">
          <Icon name="Target" size={16} />
          <strong>
            <FormattedQuestionStem text={questionStem} glossaryEnabled={glossaryEnabled} revealMode={glossaryRevealMode} />
          </strong>
        </div>
      ) : null}

      <div className="option-grid" role="group" aria-label={isSpotCase ? 'TUS spot seçenekleri' : 'Tanı seçenekleri'}>
        {options.map((option, index) => (
          <AnswerOption
            key={option}
            option={option}
            index={index}
            isSelected={selected === option}
            submitted={submitted}
            isCorrectOption={option === clinicalCase.diagnosis.correct}
            onSelect={setSelected}
            glossaryEnabled={glossaryEnabled}
            revealMode={glossaryRevealMode}
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
          <span className="quiz-action-btn-inner">
            <Icon name="TrendUp" />
            <span>{examMeta?.active ? 'Yanıtı kaydet' : 'Yanıtı değerlendir'}</span>
          </span>
        </button>

        {!examMeta?.active ? (
          <button className="btn btn-secondary answer-next-case-btn" type="button" onClick={onRandomCase}>
            <span className="quiz-action-btn-inner">
              <Icon name="RotateCcw" />
              <span>{randomActionLabel}</span>
            </span>
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
