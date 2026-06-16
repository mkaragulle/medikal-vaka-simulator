import { memo, useMemo, useState } from 'react';
import { Icon } from './ui.jsx';

function isTusGeneratorWrongAnswer(item) {
  return Boolean(
    item?.sourceType === 'legacy-generated-question'
      || item?.questionSnapshot
      || String(item?.caseId || '').startsWith('tus-spot')
      || item?.branchId === 'tus-spot-olgular',
  );
}

function formatWrongDate(timestamp) {
  if (!timestamp) return '';
  try {
    return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(timestamp));
  } catch {
    return '';
  }
}

function cleanGeneratedBranchLabel(value = '') {
  return String(value || '').replace(/\s*·\s*soru kaydı\s*$/iu, '').trim();
}

function isGenericGeneratedTitle(value = '') {
  const normalized = String(value || '').trim().toLocaleLowerCase('tr');
  return ['tanı', 'tedavi', 'mekanizma', 'evre', 'evreleme', 'etken', 'test', 'tetkik', 'yaklaşım', 'tus sorusu'].includes(normalized);
}

function buildWrongDisplayTitle(item = {}, isLegacyTusQuestion = false) {
  const rawTitle = String(item.title || '').trim();
  if (isLegacyTusQuestion && isGenericGeneratedTitle(rawTitle) && item.questionPreview) {
    return item.questionPreview;
  }
  return rawTitle || item.questionPreview || 'Kayıtlı yanlış soru';
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
    <section className="page-shell wrong-answers-full-page" aria-label="Tüm Yanlış Çözülenler">
      <section className="wrong-full-header card-surface">
        <button type="button" className="btn btn-secondary wrong-full-back-btn" onClick={onBack}>
          <Icon name="ArrowLeft" />
          <span>Kişisel tekrara dön</span>
        </button>
        <div className="wrong-full-title-block">
          <h1>Tüm Yanlış Çözülenler</h1>
        </div>
        <div className="wrong-full-summary" aria-label="Toplam tekrar hedefi">
          <Icon name="Target" size={18} />
          <strong>{wrongAnswers.length}</strong>
          <span>Tekrar Hedefi</span>
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
            const isLegacyTusQuestion = isTusGeneratorWrongAnswer(item);
            const displayTitle = buildWrongDisplayTitle(item, isLegacyTusQuestion);
            const wrongDate = formatWrongDate(item.lastWrongAt || item.createdAt);
            return (
              <article className={`wrong-full-card ${isLegacyTusQuestion ? 'is-legacy-generated' : ''}`.trim()} key={item.caseId}>
                <div className="wrong-full-card-main">
                  <span className={`wrong-answer-branch ${isLegacyTusQuestion ? 'legacy-generated' : ''}`.trim()}>
                    {isLegacyTusQuestion ? <Icon name="Sparkles" size={13} /> : null}
                    {cleanGeneratedBranchLabel(item.branchName) || (isLegacyTusQuestion ? 'TUS soru' : 'Klinik branş')}
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
