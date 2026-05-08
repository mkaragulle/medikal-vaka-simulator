import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from './ui.jsx';
import { TUS_PEARL_CARDS, TUS_PEARL_CARD_STATS } from '../data/tusPearlCards.js';
import { branches } from '../data/branches.js';
import {
  addId,
  defaultPearlState,
  loadPearlState,
  removeId,
  savePearlState,
  toggleId,
} from '../utils/pearlCardStorage.js';
import { formatAppearedYears, resolveExamSignal } from '../utils/examMeta.js';
import './tusPearlCards.css';

const STUDY_FILTERS = [
  { id: 'all', label: 'Tüm kartlar' },
  { id: 'favorites', label: 'Favoriler' },
  { id: 'wrong', label: 'Zorlandıklarım' },
  { id: 'review', label: 'Tekrar et' },
  { id: 'known', label: 'Bildiklerim' },
  { id: 'past', label: 'Çıkmış bilgiler' },
  { id: 'catalog', label: 'Katalog' },
];

function toSet(ids = []) {
  return new Set(ids || []);
}

function buildCatalogId(name) {
  return `catalog-${name.toLocaleLowerCase('tr').replace(/[^a-z0-9ığüşöçİĞÜŞÖÇ]+/giu, '-').replace(/^-|-$/g, '') || 'tekrar'}-${Date.now()}`;
}

function cardMatchesFilter(card, filter, stateSets, activeCatalog) {
  if (filter === 'favorites') return stateSets.favoriteSet.has(card.id);
  if (filter === 'wrong') return stateSets.wrongSet.has(card.id);
  if (filter === 'review') return stateSets.reviewSet.has(card.id) || stateSets.wrongSet.has(card.id);
  if (filter === 'known') return stateSets.knownSet.has(card.id);
  if (filter === 'past') return card.appearedYears?.length || card.isPastQuestionDerived;
  if (filter === 'catalog') return activeCatalog?.cardIds?.includes(card.id);
  return true;
}

function TusPearlStudyScreen({
  initialFilter = 'all',
  initialBranchFilter = 'all',
  initialCatalogId = '',
  onBack,
}) {
  const [pearlState, setPearlState] = useState(() => loadPearlState());
  const [filter, setFilter] = useState(initialFilter || 'all');
  const [branchFilter, setBranchFilter] = useState(initialBranchFilter || 'all');
  const [activeCatalogId, setActiveCatalogId] = useState(initialCatalogId || '');
  const [catalogName, setCatalogName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [motion, setMotion] = useState('idle');
  const pointerStartX = useRef(null);

  const favoriteSet = useMemo(() => toSet(pearlState.favoritePearlCardIds), [pearlState.favoritePearlCardIds]);
  const wrongSet = useMemo(() => toSet(pearlState.wrongPearlCardIds), [pearlState.wrongPearlCardIds]);
  const knownSet = useMemo(() => toSet(pearlState.knownPearlCardIds), [pearlState.knownPearlCardIds]);
  const reviewSet = useMemo(() => toSet(pearlState.reviewPearlCardIds), [pearlState.reviewPearlCardIds]);
  const activeCatalog = useMemo(
    () => pearlState.customCatalogs.find((catalog) => catalog.id === activeCatalogId) || null,
    [activeCatalogId, pearlState.customCatalogs],
  );
  const stateSets = useMemo(() => ({ favoriteSet, wrongSet, knownSet, reviewSet }), [favoriteSet, knownSet, reviewSet, wrongSet]);

  const branchOptions = useMemo(() => branches.filter((branch) => TUS_PEARL_CARD_STATS.byBranch[branch.id]), []);

  const filteredCards = useMemo(() => TUS_PEARL_CARDS.filter((card) => {
    if (branchFilter !== 'all' && card.branchId !== branchFilter) return false;
    return cardMatchesFilter(card, filter, stateSets, activeCatalog);
  }), [activeCatalog, branchFilter, filter, stateSets]);

  const activeCard = filteredCards[currentIndex] || null;
  const progress = filteredCards.length ? Math.round(((currentIndex + 1) / filteredCards.length) * 100) : 0;
  const signal = activeCard ? resolveExamSignal(activeCard) : null;
  const appearedLabel = signal ? formatAppearedYears(signal) : '';
  const isFavorite = activeCard ? favoriteSet.has(activeCard.id) : false;
  const isWrong = activeCard ? wrongSet.has(activeCard.id) : false;
  const isKnown = activeCard ? knownSet.has(activeCard.id) : false;
  const isReview = activeCard ? reviewSet.has(activeCard.id) : false;
  const isInCatalog = Boolean(activeCard && activeCatalog?.cardIds?.includes(activeCard.id));

  function commitState(updater) {
    setPearlState((current) => savePearlState(updater(current || defaultPearlState)));
  }

  const moveCard = useCallback((direction) => {
    if (!filteredCards.length) return;
    setMotion(direction > 0 ? 'next' : 'prev');
    setFlipped(false);
    setCurrentIndex((current) => {
      const next = direction > 0 ? current + 1 : current - 1;
      if (next < 0) return filteredCards.length - 1;
      if (next >= filteredCards.length) return 0;
      return next;
    });
    window.setTimeout(() => setMotion('idle'), 180);
  }, [filteredCards.length]);

  useEffect(() => {
    setCurrentIndex(0);
    setFlipped(false);
  }, [filter, branchFilter, activeCatalogId]);

  useEffect(() => {
    if (!filteredCards.length) return;
    if (currentIndex >= filteredCards.length) setCurrentIndex(0);
  }, [currentIndex, filteredCards.length]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.target?.tagName === 'INPUT' || event.target?.tagName === 'SELECT' || event.target?.tagName === 'TEXTAREA') return;
      if (event.key === 'ArrowRight') moveCard(1);
      if (event.key === 'ArrowLeft') moveCard(-1);
      if (event.key === ' ') {
        event.preventDefault();
        setFlipped((current) => !current);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveCard]);

  function createCatalog() {
    const name = catalogName.trim();
    if (!name) return;
    const catalog = { id: buildCatalogId(name), name, cardIds: activeCard ? [activeCard.id] : [], createdAt: new Date().toISOString() };
    commitState((current) => ({ ...current, customCatalogs: [...(current.customCatalogs || []), catalog] }));
    setActiveCatalogId(catalog.id);
    setFilter('catalog');
    setCatalogName('');
  }

  function toggleCatalogMembership() {
    if (!activeCard) return;
    if (!activeCatalogId) {
      const fallback = pearlState.customCatalogs[0];
      if (fallback) setActiveCatalogId(fallback.id);
      return;
    }
    commitState((current) => ({
      ...current,
      customCatalogs: (current.customCatalogs || []).map((catalog) => (
        catalog.id === activeCatalogId
          ? { ...catalog, cardIds: catalog.cardIds?.includes(activeCard.id) ? removeId(catalog.cardIds, activeCard.id) : addId(catalog.cardIds, activeCard.id) }
          : catalog
      )),
    }));
  }

  function handlePointerDown(event) {
    pointerStartX.current = event.clientX;
  }

  function handlePointerUp(event) {
    if (pointerStartX.current === null) return;
    const delta = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(delta) < 64) return;
    moveCard(delta < 0 ? 1 : -1);
  }

  return (
    <section className="page-shell tus-pearl-study-shell" aria-label="Hap Bilgi Kartları çalışma ekranı">
      <header className="tus-pearl-study-top card-surface">
        <button type="button" className="branch-back-v8" onClick={onBack}>
          <span aria-hidden="true">←</span>
          <span>Tekrar merkezine dön</span>
        </button>
        <div className="tus-pearl-study-title">
          <p className="auth-eyebrow">Hızlı TUS tekrarı</p>
          <h1>Hap Bilgi Kartları</h1>
          <span>Aktif hatırlama ile kısa, vurucu ve anahtar kelime odaklı tekrar yap.</span>
        </div>
        <div className="tus-pearl-study-progress" aria-label="Kart ilerlemesi">
          <strong>{filteredCards.length ? currentIndex + 1 : 0} / {filteredCards.length}</strong>
          <div><span style={{ width: `${progress}%` }} /></div>
        </div>
      </header>

      <div className="tus-pearl-study-controls card-surface">
        <div className="tus-pearl-study-filter-row" aria-label="Çalışma filtresi">
          {STUDY_FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={filter === item.id ? 'active' : ''}
              onClick={() => setFilter(item.id)}
              disabled={item.id === 'catalog' && !pearlState.customCatalogs.length}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="tus-pearl-study-selects">
          <select value={branchFilter} onChange={(event) => setBranchFilter(event.target.value)} aria-label="Branş filtresi">
            <option value="all">Tüm branşlar</option>
            {branchOptions.map((branch) => <option key={branch.id} value={branch.id}>{branch.shortName || branch.name} ({TUS_PEARL_CARD_STATS.byBranch[branch.id]})</option>)}
          </select>
          <select value={activeCatalogId} onChange={(event) => { setActiveCatalogId(event.target.value); if (event.target.value) setFilter('catalog'); }} aria-label="Katalog seç">
            <option value="">Katalog seç</option>
            {pearlState.customCatalogs.map((catalog) => <option key={catalog.id} value={catalog.id}>{catalog.name} ({catalog.cardIds.length})</option>)}
          </select>
        </div>
      </div>

      <main className="tus-pearl-study-main">
        <button type="button" className="tus-pearl-side-nav" onClick={() => moveCard(-1)} aria-label="Önceki kart">‹</button>

        {activeCard ? (
          <article
            className={`tus-pearl-focus-card card-surface ${flipped ? 'is-flipped' : ''} motion-${motion}`.trim()}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            <button type="button" className="tus-pearl-focus-flip" onClick={() => setFlipped((current) => !current)} aria-pressed={flipped}>
              <span className="tus-pearl-focus-face tus-pearl-focus-front">
                <span className="tus-pearl-focus-meta">
                  <em>{activeCard.subject}</em>
                  <em>{activeCard.cardType || 'Spot bilgi'}</em>
                  {appearedLabel ? <em>{appearedLabel}</em> : null}
                </span>
                <strong>{activeCard.front}</strong>
                <span className="tus-pearl-focus-hint">Kartı çevir: space veya tıkla</span>
              </span>
              <span className="tus-pearl-focus-face tus-pearl-focus-back">
                <span className="tus-pearl-answer-label">Cevap</span>
                <strong>{activeCard.back}</strong>
                <p>{activeCard.explanation}</p>
                {activeCard.keywords?.length ? (
                  <span className="tus-pearl-focus-keywords">
                    {activeCard.keywords.slice(0, 5).map((keyword) => <em key={keyword}>{keyword}</em>)}
                  </span>
                ) : null}
              </span>
            </button>
          </article>
        ) : (
          <div className="tus-pearl-study-empty card-surface">
            <Icon name="LayeredCards" />
            <strong>Bu sette kart yok.</strong>
            <p>Filtreyi değiştir, tüm kartlara dön veya yeni bir katalog oluştur.</p>
          </div>
        )}

        <button type="button" className="tus-pearl-side-nav" onClick={() => moveCard(1)} aria-label="Sonraki kart">›</button>
      </main>

      <footer className="tus-pearl-study-bottom card-surface">
        <div className="tus-pearl-study-primary-actions">
          <button type="button" className="btn btn-secondary" onClick={() => moveCard(-1)}><span aria-hidden="true">←</span> Önceki</button>
          <button type="button" className="btn btn-primary" onClick={() => setFlipped((current) => !current)}><Icon name="RotateCcw" /> Kartı çevir</button>
          <button type="button" className="btn btn-secondary" onClick={() => moveCard(1)}>Sonraki <span aria-hidden="true">→</span></button>
        </div>

        {activeCard ? (
          <div className="tus-pearl-study-status-actions" aria-label="Kart durum aksiyonları">
            <button type="button" className={isFavorite ? 'active' : ''} onClick={() => commitState((current) => ({ ...current, favoritePearlCardIds: toggleId(current.favoritePearlCardIds, activeCard.id) }))}><Icon name="Sparkles" size={15} /> Favori</button>
            <button type="button" className={isKnown ? 'active known' : ''} onClick={() => commitState((current) => ({ ...current, knownPearlCardIds: toggleId(current.knownPearlCardIds, activeCard.id), wrongPearlCardIds: removeId(current.wrongPearlCardIds, activeCard.id) }))}><Icon name="CheckCircle" size={15} /> Biliyorum</button>
            <button type="button" className={isReview ? 'active review' : ''} onClick={() => commitState((current) => ({ ...current, reviewPearlCardIds: toggleId(current.reviewPearlCardIds, activeCard.id) }))}><Icon name="RotateCcw" size={15} /> Tekrar et</button>
            <button type="button" className={isWrong ? 'active wrong' : ''} onClick={() => commitState((current) => ({ ...current, wrongPearlCardIds: toggleId(current.wrongPearlCardIds, activeCard.id), reviewPearlCardIds: addId(current.reviewPearlCardIds, activeCard.id) }))}><Icon name="XCircle" size={15} /> Zorlandım</button>
            <button type="button" className={isInCatalog ? 'active catalog' : ''} onClick={toggleCatalogMembership}><Icon name="LayeredCards" size={15} /> {isInCatalog ? 'Katalogda' : 'Kataloğa ekle'}</button>
          </div>
        ) : null}

        <div className="tus-pearl-study-catalog-create">
          <input value={catalogName} onChange={(event) => setCatalogName(event.target.value)} placeholder="Yeni katalog: Son hafta tekrar" />
          <button type="button" className="btn btn-secondary compact" onClick={createCatalog}>Katalog oluştur</button>
        </div>
      </footer>
    </section>
  );
}

export default memo(TusPearlStudyScreen);
