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

const STUDY_SETS = [
  { id: 'all', label: 'Tüm kartlar' },
  { id: 'review', label: 'Tekrar bekleyen' },
  { id: 'wrong', label: 'Zorlandıklarım' },
  { id: 'favorites', label: 'Favoriler' },
  { id: 'past', label: 'Çıkmış bilgiler' },
  { id: 'known', label: 'Bildiklerim' },
  { id: 'catalog', label: 'Aktif katalog' },
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

function getBranchName(branchId) {
  const branch = branches.find((item) => item.id === branchId);
  return branch?.shortName || branch?.name || 'TUS';
}

function getCardById(cardId) {
  return TUS_PEARL_CARDS.find((card) => card.id === cardId) || null;
}

function TusPearlStudyScreen({
  initialFilter = 'all',
  initialBranchFilter = 'all',
  initialCatalogId = '',
  onBack,
}) {
  const [pearlState, setPearlState] = useState(() => loadPearlState());
  const [filter, setFilter] = useState(initialFilter === 'catalogs' ? 'catalog' : initialFilter || 'all');
  const [branchFilter, setBranchFilter] = useState(initialBranchFilter || 'all');
  const [activeCatalogId, setActiveCatalogId] = useState(initialCatalogId || '');
  const [viewMode, setViewMode] = useState(initialFilter === 'catalogs' ? 'catalogs' : 'study');
  const [catalogName, setCatalogName] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [librarySearch, setLibrarySearch] = useState('');
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

  const catalogCards = useMemo(() => (
    (activeCatalog?.cardIds || []).map(getCardById).filter(Boolean)
  ), [activeCatalog]);

  const searchableCards = useMemo(() => {
    const query = librarySearch.trim().toLocaleLowerCase('tr');
    const pool = TUS_PEARL_CARDS.filter((card) => !activeCatalog?.cardIds?.includes(card.id));
    if (!query) return pool.slice(0, 24);
    return pool.filter((card) => [card.front, card.back, card.subject, card.topic, ...(card.keywords || [])]
      .join(' ')
      .toLocaleLowerCase('tr')
      .includes(query)).slice(0, 32);
  }, [activeCatalog, librarySearch]);

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
    if (!activeCatalogId && pearlState.customCatalogs.length) setActiveCatalogId(pearlState.customCatalogs[0].id);
  }, [activeCatalogId, pearlState.customCatalogs]);

  useEffect(() => {
    setRenameValue(activeCatalog?.name || '');
  }, [activeCatalog?.id, activeCatalog?.name]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (viewMode !== 'study') return;
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
  }, [moveCard, viewMode]);

  function createCatalog({ includeActiveCard = false } = {}) {
    const name = catalogName.trim();
    if (!name) return;
    const catalog = {
      id: buildCatalogId(name),
      name,
      cardIds: includeActiveCard && activeCard ? [activeCard.id] : [],
      createdAt: new Date().toISOString(),
    };
    commitState((current) => ({ ...current, customCatalogs: [...(current.customCatalogs || []), catalog] }));
    setActiveCatalogId(catalog.id);
    setFilter('catalog');
    setCatalogName('');
  }

  function renameCatalog() {
    const name = renameValue.trim();
    if (!activeCatalog || !name) return;
    commitState((current) => ({
      ...current,
      customCatalogs: (current.customCatalogs || []).map((catalog) => (
        catalog.id === activeCatalog.id ? { ...catalog, name } : catalog
      )),
    }));
  }

  function deleteCatalog(catalogId) {
    commitState((current) => ({
      ...current,
      customCatalogs: (current.customCatalogs || []).filter((catalog) => catalog.id !== catalogId),
    }));
    const fallback = pearlState.customCatalogs.find((catalog) => catalog.id !== catalogId);
    setActiveCatalogId(fallback?.id || '');
    if (!fallback) setFilter('all');
  }

  function addCardToCatalog(cardId, catalogId = activeCatalogId) {
    if (!cardId || !catalogId) return;
    commitState((current) => ({
      ...current,
      customCatalogs: (current.customCatalogs || []).map((catalog) => (
        catalog.id === catalogId ? { ...catalog, cardIds: addId(catalog.cardIds, cardId) } : catalog
      )),
    }));
  }

  function removeCardFromCatalog(cardId, catalogId = activeCatalogId) {
    if (!cardId || !catalogId) return;
    commitState((current) => ({
      ...current,
      customCatalogs: (current.customCatalogs || []).map((catalog) => (
        catalog.id === catalogId ? { ...catalog, cardIds: removeId(catalog.cardIds, cardId) } : catalog
      )),
    }));
  }

  function toggleCatalogMembership() {
    if (!activeCard) return;
    if (!activeCatalogId) {
      setViewMode('catalogs');
      return;
    }
    if (activeCatalog?.cardIds?.includes(activeCard.id)) removeCardFromCatalog(activeCard.id);
    else addCardToCatalog(activeCard.id);
  }

  function handleLearningDecision(type) {
    if (!activeCard) return;
    if (type === 'known') {
      commitState((current) => ({
        ...current,
        knownPearlCardIds: addId(current.knownPearlCardIds, activeCard.id),
        wrongPearlCardIds: removeId(current.wrongPearlCardIds, activeCard.id),
        reviewPearlCardIds: removeId(current.reviewPearlCardIds, activeCard.id),
      }));
      moveCard(1);
      return;
    }
    if (type === 'review') {
      commitState((current) => ({ ...current, reviewPearlCardIds: addId(current.reviewPearlCardIds, activeCard.id) }));
      moveCard(1);
      return;
    }
    commitState((current) => ({
      ...current,
      wrongPearlCardIds: addId(current.wrongPearlCardIds, activeCard.id),
      reviewPearlCardIds: addId(current.reviewPearlCardIds, activeCard.id),
    }));
    moveCard(1);
  }

  function openCatalogForStudy(catalogId = activeCatalogId) {
    if (!catalogId) return;
    setActiveCatalogId(catalogId);
    setFilter('catalog');
    setBranchFilter('all');
    setViewMode('study');
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
          <h1>{viewMode === 'catalogs' ? 'Kataloglarım' : 'Hap Bilgi Çalış'}</h1>
          <span>{viewMode === 'catalogs' ? 'Kişisel setlerini oluştur, düzenle ve kart ekle.' : 'Tek kart, hızlı karar, aktif hatırlama.'}</span>
        </div>
        <div className="tus-pearl-study-progress" aria-label="Kart ilerlemesi">
          <strong>{viewMode === 'study' ? `${filteredCards.length ? currentIndex + 1 : 0} / ${filteredCards.length}` : `${pearlState.customCatalogs.length} katalog`}</strong>
          <div><span style={{ width: `${viewMode === 'study' ? progress : 100}%` }} /></div>
        </div>
      </header>

      <div className="tus-pearl-mode-switch card-surface" aria-label="Hap bilgi görünüm seçimi">
        <button type="button" className={viewMode === 'study' ? 'active' : ''} onClick={() => setViewMode('study')}>
          <Icon name="LayeredCards" />
          <span>Kart çalış</span>
        </button>
        <button type="button" className={viewMode === 'catalogs' ? 'active' : ''} onClick={() => setViewMode('catalogs')}>
          <Icon name="ClipboardList" />
          <span>Katalog yönet</span>
        </button>
      </div>

      {viewMode === 'catalogs' ? (
        <main className="tus-pearl-catalog-manager card-surface" aria-label="Katalog yönetimi">
          <aside className="tus-pearl-catalog-sidebar">
            <div className="tus-pearl-catalog-create-card">
              <strong>Yeni katalog</strong>
              <p>Farmakoloji ezber, son hafta tekrar veya yanlışlara özel set oluştur.</p>
              <div>
                <input value={catalogName} onChange={(event) => setCatalogName(event.target.value)} placeholder="Katalog adı" />
                <button type="button" className="btn btn-primary compact" onClick={() => createCatalog()}>Oluştur</button>
              </div>
            </div>
            <div className="tus-pearl-catalog-list" aria-label="Katalog listesi">
              {pearlState.customCatalogs.length ? pearlState.customCatalogs.map((catalog) => (
                <button
                  key={catalog.id}
                  type="button"
                  className={catalog.id === activeCatalogId ? 'active' : ''}
                  onClick={() => setActiveCatalogId(catalog.id)}
                >
                  <span><strong>{catalog.name}</strong><em>{catalog.cardIds.length} kart</em></span>
                  <Icon name="ArrowRight" size={16} />
                </button>
              )) : (
                <div className="tus-pearl-catalog-list-empty">
                  <Icon name="LayeredCards" />
                  <p>Henüz katalog yok. İlk setini oluşturunca burada görünecek.</p>
                </div>
              )}
            </div>
          </aside>

          <section className="tus-pearl-catalog-detail">
            {activeCatalog ? (
              <>
                <div className="tus-pearl-catalog-detail-head">
                  <div>
                    <p className="auth-eyebrow">Katalog detayı</p>
                    <h2>{activeCatalog.name}</h2>
                    <span>{catalogCards.length} kart · Bu seti filtre olarak çalışabilir veya düzenleyebilirsin.</span>
                  </div>
                  <div className="tus-pearl-catalog-detail-actions">
                    <button type="button" className="btn btn-primary compact" onClick={() => openCatalogForStudy(activeCatalog.id)} disabled={!catalogCards.length}>Bu seti çalış</button>
                    <button type="button" className="btn btn-secondary compact" onClick={() => deleteCatalog(activeCatalog.id)}>Sil</button>
                  </div>
                </div>

                <div className="tus-pearl-catalog-rename-row">
                  <input value={renameValue} onChange={(event) => setRenameValue(event.target.value)} aria-label="Katalog adını düzenle" />
                  <button type="button" className="btn btn-secondary compact" onClick={renameCatalog}>Yeniden adlandır</button>
                </div>

                <div className="tus-pearl-catalog-card-section">
                  <div className="tus-pearl-catalog-section-head">
                    <strong>Katalogdaki kartlar</strong>
                    <span>{catalogCards.length} kart</span>
                  </div>
                  {catalogCards.length ? (
                    <div className="tus-pearl-catalog-card-list">
                      {catalogCards.map((card) => (
                        <article key={card.id} className="tus-pearl-library-card in-catalog">
                          <div>
                            <span>{getBranchName(card.branchId)} · {card.cardType || 'Spot'}</span>
                            <strong>{card.front}</strong>
                            <p>{card.back}</p>
                          </div>
                          <button type="button" className="btn btn-icon quiet" onClick={() => removeCardFromCatalog(card.id)} aria-label="Kartı katalogdan çıkar">
                            <Icon name="X" />
                          </button>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="tus-pearl-study-empty compact">
                      <Icon name="LayeredCards" />
                      <strong>Bu katalog boş.</strong>
                      <p>Aşağıdaki kart kütüphanesinden ekleme yap.</p>
                    </div>
                  )}
                </div>

                <div className="tus-pearl-catalog-card-section">
                  <div className="tus-pearl-catalog-section-head">
                    <strong>Kart ekle</strong>
                    <span>Katalog dışında kalan kartlar</span>
                  </div>
                  <input className="tus-pearl-library-search" value={librarySearch} onChange={(event) => setLibrarySearch(event.target.value)} placeholder="Kart ara: sinir, farmakoloji, tuzak..." />
                  <div className="tus-pearl-catalog-card-list addable">
                    {searchableCards.map((card) => (
                      <article key={card.id} className="tus-pearl-library-card">
                        <div>
                          <span>{getBranchName(card.branchId)} · {card.cardType || 'Spot'}</span>
                          <strong>{card.front}</strong>
                        </div>
                        <button type="button" className="btn btn-secondary compact" onClick={() => addCardToCatalog(card.id)}>Ekle</button>
                      </article>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="tus-pearl-study-empty compact">
                <Icon name="LayeredCards" />
                <strong>Katalog seç veya oluştur.</strong>
                <p>Kendi tekrar setlerini oluşturduğunda içeriklerini buradan yönetebilirsin.</p>
              </div>
            )}
          </section>
        </main>
      ) : (
        <>
          <div className="tus-pearl-study-controls card-surface">
            <div className="tus-pearl-study-selects streamlined">
              <label>
                <span>Set</span>
                <select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Çalışma seti">
                  {STUDY_SETS.map((item) => (
                    <option key={item.id} value={item.id} disabled={item.id === 'catalog' && !pearlState.customCatalogs.length}>{item.label}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Branş</span>
                <select value={branchFilter} onChange={(event) => setBranchFilter(event.target.value)} aria-label="Branş filtresi">
                  <option value="all">Tüm branşlar</option>
                  {branchOptions.map((branch) => <option key={branch.id} value={branch.id}>{branch.shortName || branch.name} ({TUS_PEARL_CARD_STATS.byBranch[branch.id]})</option>)}
                </select>
              </label>
              <label>
                <span>Katalog</span>
                <select value={activeCatalogId} onChange={(event) => { setActiveCatalogId(event.target.value); if (event.target.value) setFilter('catalog'); }} aria-label="Katalog seç">
                  <option value="">Katalog seç</option>
                  {pearlState.customCatalogs.map((catalog) => <option key={catalog.id} value={catalog.id}>{catalog.name} ({catalog.cardIds.length})</option>)}
                </select>
              </label>
            </div>
            <button type="button" className="btn btn-secondary compact" onClick={() => setViewMode('catalogs')}>
              <Icon name="ClipboardList" />
              <span>Kataloglarım</span>
            </button>
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
                    <span className="tus-pearl-focus-meta minimal">
                      <em>{getBranchName(activeCard.branchId)}</em>
                      <em>{activeCard.cardType || 'Aktif hatırlama'}</em>
                      <em>{currentIndex + 1}/{filteredCards.length}</em>
                    </span>
                    <strong>{activeCard.front}</strong>
                    <span className="tus-pearl-focus-hint">Space veya karta tıkla</span>
                  </span>
                  <span className="tus-pearl-focus-face tus-pearl-focus-back">
                    <span className="tus-pearl-answer-label">Cevap</span>
                    <strong>{activeCard.back}</strong>
                    <p>{activeCard.explanation}</p>
                    {appearedLabel ? <span className="tus-pearl-focus-hint">{appearedLabel}</span> : null}
                  </span>
                </button>
              </article>
            ) : (
              <div className="tus-pearl-study-empty card-surface">
                <Icon name="LayeredCards" />
                <strong>Bu sette kart yok.</strong>
                <p>Seti değiştir, tüm kartlara dön veya kataloglarına kart ekle.</p>
                <button type="button" className="btn btn-secondary compact" onClick={() => setViewMode('catalogs')}>Katalogları yönet</button>
              </div>
            )}

            <button type="button" className="tus-pearl-side-nav" onClick={() => moveCard(1)} aria-label="Sonraki kart">›</button>
          </main>

          <footer className="tus-pearl-study-bottom card-surface">
            <div className="tus-pearl-study-primary-actions decision-actions">
              <button type="button" className={isKnown ? 'btn decision-btn known active' : 'btn decision-btn known'} onClick={() => handleLearningDecision('known')} disabled={!activeCard}>
                <Icon name="CheckCircle" />
                <span>Biliyorum</span>
              </button>
              <button type="button" className={isReview ? 'btn decision-btn review active' : 'btn decision-btn review'} onClick={() => handleLearningDecision('review')} disabled={!activeCard}>
                <Icon name="RotateCcw" />
                <span>Tekrar et</span>
              </button>
              <button type="button" className={isWrong ? 'btn decision-btn wrong active' : 'btn decision-btn wrong'} onClick={() => handleLearningDecision('wrong')} disabled={!activeCard}>
                <Icon name="XCircle" />
                <span>Zorlandım</span>
              </button>
            </div>

            <div className="tus-pearl-study-secondary-actions" aria-label="Kart organizasyon aksiyonları">
              <button type="button" className={isFavorite ? 'active' : ''} onClick={() => activeCard && commitState((current) => ({ ...current, favoritePearlCardIds: toggleId(current.favoritePearlCardIds, activeCard.id) }))} disabled={!activeCard}>
                <Icon name="Sparkles" size={15} />
                <span>{isFavorite ? 'Favoride' : 'Favori'}</span>
              </button>
              <select value={activeCatalogId} onChange={(event) => setActiveCatalogId(event.target.value)} aria-label="Aktif kart için katalog seç">
                <option value="">Katalog seç</option>
                {pearlState.customCatalogs.map((catalog) => <option key={catalog.id} value={catalog.id}>{catalog.name}</option>)}
              </select>
              <button type="button" className={isInCatalog ? 'active' : ''} onClick={toggleCatalogMembership} disabled={!activeCard}>
                <Icon name="LayeredCards" size={15} />
                <span>{isInCatalog ? 'Katalogda' : 'Kataloğa ekle'}</span>
              </button>
              {!pearlState.customCatalogs.length ? (
                <div className="tus-pearl-inline-catalog-create">
                  <input value={catalogName} onChange={(event) => setCatalogName(event.target.value)} placeholder="İlk katalog adı" />
                  <button type="button" onClick={() => createCatalog({ includeActiveCard: true })}>Oluştur</button>
                </div>
              ) : null}
            </div>
          </footer>
        </>
      )}
    </section>
  );
}

export default memo(TusPearlStudyScreen);
