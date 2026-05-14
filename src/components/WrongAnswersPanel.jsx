import { Icon } from './ui.jsx';

function WrongAnswersPanel({ wrongAnswers = [], onOpenCase, onRemoveCase, onClearAll, onOpenPearlStudy }) {
  const hasItems = wrongAnswers.length > 0;
  const visibleItems = wrongAnswers.slice(0, 5);
  const hiddenCount = Math.max(0, wrongAnswers.length - visibleItems.length);

  return (
    <section className="wrong-answers-panel card-surface wrong-answers-panel-refined" aria-label="Yanlış çözülenler listesi">
      <header className="wrong-answers-head refined">
        <div>
          <span className="panel-kicker">Yeniden bakılacaklar</span>
          <h2>Yanlış çözülenler</h2>
        </div>
        {hasItems ? (
          <button className="wrong-clear-btn refined" type="button" onClick={onClearAll}>
            <Icon name="Trash2" size={15} />
            <span>Temizle</span>
          </button>
        ) : null}
      </header>

      {hasItems ? (
        <div className="wrong-answers-list refined">
          {visibleItems.map((item) => (
            <article className="wrong-answer-card refined" key={item.caseId}>
              <div className="wrong-answer-main refined">
                <span className="wrong-answer-branch refined">{item.branchName || 'Klinik branş'}</span>
                <h3>{item.title}</h3>
                <small>{item.attempts || 1} kez yanlış</small>
              </div>
              <div className="wrong-answer-actions refined">
                <button className="btn btn-primary compact" type="button" onClick={() => onOpenCase(item.caseId)}>
                  <Icon name="RotateCcw" />
                  <span>Tekrar çöz</span>
                </button>
                <button className="btn btn-icon quiet" type="button" onClick={() => onRemoveCase(item.caseId)} aria-label="Listeden çıkar">
                  <Icon name="X" />
                </button>
              </div>
            </article>
          ))}
          {hiddenCount ? <span className="wrong-answer-more refined">+{hiddenCount} olgu daha listede hazır bekliyor.</span> : null}
        </div>
      ) : (
        <div className="wrong-answers-empty refined">
          <span className="wrong-answers-empty-icon"><Icon name="CheckCircle" /></span>
          <div>
            <strong>Burada bekleyen yanlışın yok.</strong>
            <p>Yeni yanlışlar otomatik eklenir. İstersen şimdi kısa bir hap kart turu açabilirsin.</p>
            <button type="button" className="btn btn-secondary compact" onClick={() => onOpenPearlStudy?.({ filter: 'all', branchFilter: 'all' })}>
              <Icon name="LayeredCards" />
              <span>Hap kart turu aç</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default WrongAnswersPanel;
