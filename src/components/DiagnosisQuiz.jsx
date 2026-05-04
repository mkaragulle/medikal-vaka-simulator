import { useEffect, useMemo, useState } from 'react';
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

function buildTutorHint() {
  return {
    priority: 'Önce aciliyet düzeyini, hemodinamiyi ve başvuru bağlamını netleştir.',
    watch: ['Yakınma paterni', 'Semptom süresi', 'Vital bulgular'],
    reasoning: 'Seçenekleri tek bir bulguya göre değil, klinik verilerin oluşturduğu bütüncül paternle karşılaştır.',
  };
}

function AnswerOption({ option, index, selected, submitted, correctAnswer, onSelect, glossaryEnabled = true }) {
  const isSelected = selected === option;
  const stateClass = submitted
    ? option === correctAnswer
      ? 'correct'
      : isSelected
        ? 'wrong'
        : ''
    : isSelected
      ? 'selected'
      : '';

  const statusIcon = submitted && option === correctAnswer
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
      aria-label={`${OPTION_LETTERS[index] ?? index + 1}: ${option}`}
    >
      <span className="answer-letter">{OPTION_LETTERS[index] ?? index + 1}</span>
      <span className="answer-content">
        <span className="answer-title"><GlossaryText text={option} enabled={glossaryEnabled} /></span>
      </span>
      <span className="answer-status-icon">{statusIcon ? <Icon name={statusIcon} /> : null}</span>
    </button>
  );
}

function ExpertInsightCard({ hint }) {
  return (
    <section className="clinical-reasoning-card" aria-label="Klinik akıl yürütme desteği">
      <header className="clinical-reasoning-card-head">
        <span className="clinical-reasoning-main-icon" aria-hidden="true">
          <Icon name="Sparkles" size={18} strokeWidth={2.1} />
        </span>
        <strong>Klinik akıl yürütme desteği</strong>
      </header>

      <div className="clinical-reasoning-stack">
        <article className="clinical-reasoning-block clinical-reasoning-block-priority">
          <div className="clinical-reasoning-block-head">
            <span className="clinical-reasoning-section-icon" aria-hidden="true">
              <Icon name="Target" size={17} strokeWidth={2.05} />
            </span>
            <span className="clinical-reasoning-label">Öncelik</span>
          </div>
          <p><GlossaryText text={hint.priority} enabled /></p>
        </article>

        <article className="clinical-reasoning-block clinical-reasoning-block-evidence">
          <div className="clinical-reasoning-block-head">
            <span className="clinical-reasoning-section-icon" aria-hidden="true">
              <Icon name="Activity" size={17} strokeWidth={2.15} />
            </span>
            <span className="clinical-reasoning-label">Ayırt ettiren veriler</span>
          </div>
          <div className="clinical-reasoning-chip-row" aria-label="Ayırt ettiren veriler">
            {hint.watch.map((item) => (
              <span className="clinical-reasoning-chip" key={item}>
                <GlossaryText text={item} enabled />
              </span>
            ))}
          </div>
        </article>

        <article className="clinical-reasoning-block clinical-reasoning-block-logic">
          <div className="clinical-reasoning-block-head">
            <span className="clinical-reasoning-section-icon" aria-hidden="true">
              <Icon name="Brain" size={17} strokeWidth={2.05} />
            </span>
            <span className="clinical-reasoning-label">Karar mantığı</span>
          </div>
          <p><GlossaryText text={hint.reasoning} enabled /></p>
        </article>
      </div>
    </section>
  );
}


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
  const tutorHint = buildTutorHint();

  const handleSubmit = () => {
    if (!selected || submitted) return;
    onSubmitAnswer?.({ clinicalCase, selected, isCorrect });
    setSubmitted(true);
  };

  return (
    <section className="question-panel diagnostic-decision-panel" id="case-quiz" aria-label="Klinik karar sorusu">
      <div className="question-panel-head diagnostic-head">
        <div>
          <h2>En olası tanı</h2>
          <p>Olgu paternine en uygun seçeneği işaretle.</p>
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

      {tutorMode && !hardMode && !submitted && selected && !examMeta?.active ? <ExpertInsightCard hint={tutorHint} /> : null}

      {!hardMode && !examMeta?.active && !submitted && selected && orderedInvestigationIds.length === 0 ? (
        <div className="preanswer-investigation-nudge">
          Tanı seçmeden önce karar verdirici tetkikleri istemeyi düşünebilirsin.
        </div>
      ) : null}

      <div className="option-grid" role="group" aria-label="Tanı seçenekleri">
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
        <button className="btn btn-primary" type="button" disabled={!selected || submitted} onClick={handleSubmit}>
          {examMeta?.active ? 'Yanıtı kaydet' : 'Yanıtı değerlendir'}
        </button>

        {!examMeta?.active ? (
          <button className="btn btn-secondary" type="button" onClick={onRandomCase}>
            Yeni olgu
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
                <p className="feedback-answer">Doğru tanı ve gerekçe blok sonunda ayrıntılı gösterilecek.</p>
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

export default DiagnosisQuiz;
