import { Icon } from './ui.jsx';

function isAIWrongAnswer(item) {
  return Boolean(
    item?.sourceType === 'ai-generated-question'
      || item?.questionSnapshot
      || String(item?.caseId || '').startsWith('ai-spot')
      || item?.branchId === 'tus-spot-olgular',
  );
}

function WrongAnswersPanel({ wrongAnswers = [], onOpenCase, onRemoveCase, onClearAll, onOpenPearlStudy, onOpenAllWrongAnswers }) {
  const hasItems = wrongAnswers.length > 0;
  const visibleItems = wrongAnswers.slice(0, 9);
  const hiddenCount = Math.max(0, wrongAnswers.length - visibleItems.length);

  return (
    <section className="wrong-answers-panel card-surface" aria-label="Yanlış çözülenler listesi">
      <header className="wrong-answers-head">
        <div className="review-panel-title">
          <span className="review-panel-icon danger" aria-hidden="true"><Icon name="RotateCcw" /></span>
          <div>
            <h2>Yanlış çözülenler</h2>
          </div>
        </div>
        {hasItems ? (
          <button className="wrong-clear-btn" type="button" onClick={onClearAll}>
            <Icon name="Trash2" size={15} />
            <span>Temizle</span>
          </button>
        ) : null}
      </header>

      {hasItems ? (
        <div className="wrong-answers-list">
          {visibleItems.map((item) => {
            const isAI = isAIWrongAnswer(item);
            const displayTitle = item.title || item.questionPreview || 'Kayıtlı yanlış soru';
            return (
              <article className={`wrong-answer-card ${isAI ? 'is-ai-generated' : ''}`.trim()} key={item.caseId}>
                <div className="wrong-answer-main">
                  <span className={`wrong-answer-branch ${isAI ? 'ai-generated' : ''}`.trim()}>
                    {isAI ? <Icon name="Sparkles" size={13} /> : null}
                    {item.branchName || (isAI ? 'AI üretim' : 'Klinik branş')}
                  </span>
                  <h3>{displayTitle}</h3>
                  {isAI && item.questionPreview && item.questionPreview !== displayTitle ? (
                    <small>{item.questionPreview}</small>
                  ) : null}
                </div>
                <div className="wrong-answer-actions">
                  <button className="btn btn-primary compact" type="button" onClick={() => onOpenCase(item)}>
                    <Icon name="RotateCcw" />
                    <span>Tekrar çöz</span>
                  </button>
                  <button className="btn btn-icon quiet" type="button" onClick={() => onRemoveCase(item)} aria-label="Listeden çıkar">
                    <Icon name="X" />
                  </button>
                </div>
              </article>
            );
          })}
          {hiddenCount ? (
            <div className="wrong-answer-more-row">
              <span className="wrong-answer-more">+{hiddenCount} kayıt daha listende saklanıyor.</span>
              <button type="button" className="wrong-answer-view-all-btn" onClick={onOpenAllWrongAnswers}>
                <Icon name="ArrowRight" size={15} />
                <span>Tüm Yanlışları Gör</span>
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="wrong-answers-empty">
          <span className="wrong-answers-empty-icon"><Icon name="CheckCircle" /></span>
          <div>
            <strong>Şimdilik temiz.</strong>
            <p>Gömülü olgularda ve AI tarafından üretilen TUS sorularında yaptığın yanlışlar otomatik eklenir.</p>
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
