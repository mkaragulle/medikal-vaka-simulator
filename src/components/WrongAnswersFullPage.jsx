import { memo, useMemo, useState } from 'react';
import { Icon } from './ui.jsx';

function formatWrongDate(timestamp) {
  if (!timestamp) return '';
  try {
    return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(timestamp));
  } catch {
    return '';
  }
}

function WrongAnswersFullPage({ wrongAnswers = [], onBack, onOpenCase, onRemoveCase, onClearAll }) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase('tr');

  const filteredWrongAnswers = useMemo(() => {
    if (!normalizedQuery) return wrongAnswers;
    return wrongAnswers.filter((item) => {
      const haystack = [
        item.title,
        item.questionPreview,
        item.branchName,
      ].filter(Boolean).join(' ').toLocaleLowerCase('tr');
      return haystack.includes(normalizedQuery);
    });
  }, [wrongAnswers, normalizedQuery]);

  return (
    <section className="page-shell wrong-answers-full-page" aria-label="Tüm yanlış çözülenler">
      <section className="wrong-full-header card-surface">
        <button type="button" className="btn btn-secondary wrong-full-back-btn" onClick={onBack}>
          <Icon name="ArrowLeft" />
          <span>Kişisel tekrara dön</span>
        </button>
        <div className="wrong-full-title-block">
          <h1>Tüm yanlış çözülenler</h1>
          <p>Kaçırdığın klinik olguları tek ekranda gör, ara ve yeniden çöz.</p>
        </div>
        <div className="wrong-full-summary" aria-label="Toplam tekrar hedefi">
          <Icon name="Target" size={18} />
          <strong>{wrongAnswers.length}</strong>
          <span>tekrar hedefi</span>
        </div>
      </section>

      <section className="wrong-full-toolbar card-surface">
        <label className="wrong-full-search">
          <Icon name="Search" size={17} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Başlık, branş veya soru metni ara…"
          />
        </label>
        {wrongAnswers.length ? (
          <button type="button" className="btn btn-secondary compact" onClick={onClearAll}>
            <Icon name="Trash2" size={15} />
            <span>Tümünü temizle</span>
          </button>
        ) : null}
      </section>

      <section className="wrong-full-list card-surface" aria-label="Yanlış olgu listesi">
        {filteredWrongAnswers.length ? (
          filteredWrongAnswers.map((item) => {
            const displayTitle = item.title || item.questionPreview || 'Kayıtlı yanlış soru';
            const wrongDate = formatWrongDate(item.lastWrongAt || item.createdAt);
            return (
              <article className="wrong-full-card" key={item.caseId}>
                <div className="wrong-full-card-main">
                  <span className="wrong-answer-branch">
                    {item.branchName || 'Klinik branş'}
                  </span>
                  <h2>{displayTitle}</h2>
                  {item.questionPreview && item.questionPreview !== displayTitle ? <p>{item.questionPreview}</p> : null}
                  {wrongDate ? (
                    <div className="wrong-full-meta" aria-label="Son yanlış zamanı">
                      <span>Son yanlış: {wrongDate}</span>
                    </div>
                  ) : null}
                </div>
                <div className="wrong-full-card-actions">
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
          })
        ) : (
          <div className="wrong-full-empty">
            <Icon name="CheckCircle" />
            <strong>Gösterilecek yanlış kayıt yok.</strong>
            <p>Arama filtresini temizleyebilir veya yeni vaka çözerek listeyi doldurabilirsin.</p>
          </div>
        )}
      </section>
    </section>
  );
}

export default memo(WrongAnswersFullPage);
