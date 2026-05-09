import { memo, useState } from 'react';
import { Icon } from './ui.jsx';
import { formatAppearedYears, resolveExamSignal } from '../utils/examMeta.js';
import { getPearlBackContent } from '../utils/pearlCardContent.js';

function TusPearlCard({
  card,
  isFavorite = false,
  isWrong = false,
  isKnown = false,
  isReview = false,
  isInCatalog = false,
  onToggleFavorite,
  onMarkWrong,
  onMarkKnown,
  onToggleReview,
  onAddToCatalog,
  onRemoveFromCatalog,
}) {
  const [flipped, setFlipped] = useState(false);
  const signal = resolveExamSignal(card);
  const appearedLabel = formatAppearedYears(signal);
  const { leadText, backText, detailText, noteLabel, noteText, isCompactBack } = getPearlBackContent(card);

  return (
    <article className={`tus-pearl-card ${flipped ? 'is-flipped' : ''}`.trim()} data-branch={card.branchId}>
      <button type="button" className="tus-pearl-card-flip" onClick={() => setFlipped((current) => !current)} aria-pressed={flipped}>
        <span className="tus-pearl-card-face tus-pearl-card-front">
          <strong>{card.front}</strong>
          <span className="tus-pearl-hint">Cevabı görmek için tıkla</span>
        </span>
        <span className="tus-pearl-card-face tus-pearl-card-back">
          {leadText ? <span className="tus-pearl-answer-chain">{leadText}</span> : null}
          <strong className={isCompactBack ? 'compact' : ''}>{backText}</strong>
          {detailText ? <p>{detailText}</p> : null}
          {noteText ? (
            <span className="tus-pearl-note-box" role="note" aria-label={noteLabel || 'Önemli not'}>
              <span className="tus-pearl-note-box-label">{noteLabel || 'Önemli not'}</span>
              <span className="tus-pearl-note-box-text">{noteText}</span>
            </span>
          ) : null}
        </span>
      </button>

      <div className="tus-pearl-badge-row" aria-label="Kart belirteçleri">
        {appearedLabel ? <span className="tus-pearl-badge past">{appearedLabel}</span> : null}
        {card.isHighYield ? <span className="tus-pearl-badge">Yüksek verim</span> : null}
        {isWrong ? <span className="tus-pearl-badge warn">Yanlış listende</span> : null}
      </div>

      <div className="tus-pearl-actions" aria-label="Kart aksiyonları">
        <button type="button" className={isFavorite ? 'active' : ''} onClick={() => onToggleFavorite?.(card.id)} title="Favorilere ekle">
          <Icon name="Sparkles" size={15} /> Favori
        </button>
        <button type="button" className={isWrong ? 'active wrong' : ''} onClick={() => onMarkWrong?.(card.id)} title="Yanlış yaptım">
          <Icon name="XCircle" size={15} /> Yanlış
        </button>
        <button type="button" className={isKnown ? 'active known' : ''} onClick={() => onMarkKnown?.(card.id)} title="Biliyorum">
          <Icon name="CheckCircle" size={15} /> Biliyorum
        </button>
        <button type="button" className={isReview ? 'active review' : ''} onClick={() => onToggleReview?.(card.id)} title="Tekrar listeme al">
          <Icon name="RotateCcw" size={15} /> Tekrar
        </button>
        <button
          type="button"
          className={isInCatalog ? 'active review' : ''}
          onClick={() => (isInCatalog ? onRemoveFromCatalog?.(card.id) : onAddToCatalog?.(card.id))}
          title={isInCatalog ? 'Katalogdan çıkar' : 'Kataloğa ekle'}
        >
          <Icon name="LayeredCards" size={15} /> {isInCatalog ? 'Çıkar' : 'Katalog'}
        </button>
      </div>
    </article>
  );
}

export default memo(TusPearlCard);
