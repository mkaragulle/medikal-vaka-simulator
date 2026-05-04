import { Icon } from './ui.jsx';

function WrongAnswersPanel({ wrongAnswers = [], onOpenCase, onRemoveCase, onClearAll }) {
  const hasItems = wrongAnswers.length > 0;

  return (
    <section className="wrong-answers-panel card-surface" aria-label="Yanlış çözülenler listesi">
      <header className="wrong-answers-head">
        <div>
          <p className="auth-eyebrow">Kişisel tekrar listesi</p>
          <h2>Yanlış çözülenler</h2>
          <span>
            {hasItems
              ? `${wrongAnswers.length} olgu tekrar çözülmeyi bekliyor.`
              : 'Yanlış yaptığın sorular burada otomatik birikir.'}
          </span>
        </div>
        {hasItems ? (
          <button className="btn btn-secondary" type="button" onClick={onClearAll}>
            <Icon name="Trash2" />
            <span>Listeyi temizle</span>
          </button>
        ) : null}
      </header>

      {hasItems ? (
        <div className="wrong-answers-list">
          {wrongAnswers.map((item) => (
            <article className="wrong-answer-card" key={item.caseId}>
              <div className="wrong-answer-main">
                <span className="wrong-answer-branch">{item.branchName}</span>
                <h3>{item.title}</h3>
                <p>
                  Seçilen: <strong>{item.selected}</strong> · Doğru: <strong>{item.correctAnswer}</strong>
                </p>
                <small>{item.attempts || 1} kez yanlış · {item.difficulty}</small>
              </div>
              <div className="wrong-answer-actions">
                <button className="btn btn-primary" type="button" onClick={() => onOpenCase(item.caseId)}>
                  <Icon name="RotateCcw" />
                  <span>Tekrar çöz</span>
                </button>
                <button className="btn btn-icon" type="button" onClick={() => onRemoveCase(item.caseId)} aria-label="Listeden çıkar">
                  <Icon name="X" />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="wrong-answers-empty">
          <Icon name="CheckCircle" />
          <div>
            <strong>Şimdilik temiz.</strong>
            <p>Bir soruyu yanlış çözdüğünde olgu otomatik olarak bu listeye eklenecek.</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default WrongAnswersPanel;
