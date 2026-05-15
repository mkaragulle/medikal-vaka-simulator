import { Icon } from './ui.jsx';

function WrongAnswersPanel({ wrongAnswers = [], onOpenCase, onRemoveCase, onClearAll, onOpenPearlStudy }) {
  const hasItems = wrongAnswers.length > 0;
  const visibleItems = wrongAnswers.slice(0, 6);
  const hiddenCount = Math.max(0, wrongAnswers.length - visibleItems.length);

  return (
    <section className="wrong-answers-panel card-surface" aria-label="Yanlış çözülenler listesi">
      <header className="wrong-answers-head">
        <div className="review-panel-title">
          <span className="review-panel-icon danger" aria-hidden="true"><Icon name="RotateCcw" /></span>
          <div>
            <h2>Yanlış çözülenler</h2>
            <p>Kaçırdığın olguları kısa ve hedefli tekrar et.</p>
          </div>
        </div>
        {hasItems ? (
          <button className="wrong-clear-btn" type="button" onClick={onClearAll}>
            <Icon name="Trash2" size={15} />
            <span>Listemi temizle</span>
          </button>
        ) : null}
      </header>

      {hasItems ? (
        <div className="wrong-answers-list">
          {visibleItems.map((item) => (
            <article className="wrong-answer-card" key={item.caseId}>
              <div className="wrong-answer-main">
                <span className="wrong-answer-branch">{item.branchName || 'Klinik branş'}</span>
                <h3>{item.title}</h3>
              </div>
              <div className="wrong-answer-actions">
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
          {hiddenCount ? <span className="wrong-answer-more">+{hiddenCount} kayıt daha listende saklanıyor.</span> : null}
        </div>
      ) : (
        <div className="wrong-answers-empty">
          <span className="wrong-answers-empty-icon"><Icon name="CheckCircle" /></span>
          <div>
            <strong>Şimdilik temiz.</strong>
            <p>Yeni yanlışlar otomatik eklenir. Şimdi hap kartlarla kısa tekrar başlatabilirsin.</p>
            <button type="button" className="btn btn-secondary compact" onClick={() => onOpenPearlStudy?.({ filter: 'all', branchFilter: 'all' })}>
              <Icon name="LayeredCards" />
              <span>Hap kartlarla tekrar başlat</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default WrongAnswersPanel;
