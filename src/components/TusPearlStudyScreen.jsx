import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from './ui.jsx';
import { TUS_PEARL_CARDS, TUS_PEARL_CARD_STATS } from '../data/tusPearlCards.js';
import { branches } from '../data/branches.js';
import {
  addId,
  defaultPearlState,
  loadPearlState,
  markCatalogStudied,
  rememberStudyStart,
  removeId,
  removeUserPearlCard,
  savePearlState,
  toggleId,
  upsertUserPearlCard,
} from '../utils/pearlCardStorage.js';
import { buildStudyDeck } from '../utils/pearlDeckShuffle.js';
import TusPearlCardEditor from './TusPearlCardEditor.jsx';
import './tusPearlCards.css';

const SYSTEM_PEARL_CARDS = TUS_PEARL_CARDS.map((card) => ({ ...card, source: 'system' }));

const STUDY_SETS = [
  { id: 'all', label: 'Tüm kartlar' },
  { id: 'system', label: 'Sistem kartları' },
  { id: 'user', label: 'Kendi kartlarım' },
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
  if (filter === 'user') return card.source === 'user';
  if (filter === 'system') return card.source !== 'user';
  return true;
}

function getBranchName(branchId) {
  const branch = branches.find((item) => item.id === branchId);
  return branch?.shortName || branch?.name || 'TUS';
}

function makeDeckKey(filter, branchFilter, activeCatalogId) {
  if (filter === 'catalog') return `catalog_${activeCatalogId || 'none'}`;
  return `${filter || 'all'}_${branchFilter || 'all'}`;
}

function resolveModeLabel(filter, branchFilter, activeCatalog) {
  if (filter === 'catalog' && activeCatalog) return activeCatalog.name;
  const set = STUDY_SETS.find((item) => item.id === filter)?.label || 'Tüm kartlar';
  if (branchFilter && branchFilter !== 'all') return `${set} · ${getBranchName(branchFilter)}`;
  return set;
}

function formatDateLabel(value) {
  if (!value) return 'Henüz çalışılmadı';
  const delta = Date.now() - new Date(value).getTime();
  if (!Number.isFinite(delta)) return 'Henüz çalışılmadı';
  const days = Math.max(0, Math.floor(delta / 86400000));
  if (days === 0) return 'Bugün çalışıldı';
  if (days === 1) return 'Dün çalışıldı';
  return `${days} gün önce çalışıldı`;
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
  const [catalogDescription, setCatalogDescription] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [librarySearch, setLibrarySearch] = useState('');
  const [sourceLibraryFilter, setSourceLibraryFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [motion, setMotion] = useState('idle');
  const [studySession, setStudySession] = useState(null);
  const [editorState, setEditorState] = useState({ open: false, mode: 'create', card: null, defaultCatalogId: '' });
  const [catalogMenuOpen, setCatalogMenuOpen] = useState(false);
  const pointerStartX = useRef(null);
  const lastDeckSignature = useRef('');

  const allCards = useMemo(() => [...SYSTEM_PEARL_CARDS, ...(pearlState.userPearlCards || [])], [pearlState.userPearlCards]);
  const cardById = useMemo(() => new Map(allCards.map((card) => [card.id, card])), [allCards]);
  const favoriteSet = useMemo(() => toSet(pearlState.favoritePearlCardIds), [pearlState.favoritePearlCardIds]);
  const wrongSet = useMemo(() => toSet(pearlState.wrongPearlCardIds), [pearlState.wrongPearlCardIds]);
  const knownSet = useMemo(() => toSet(pearlState.knownPearlCardIds), [pearlState.knownPearlCardIds]);
  const reviewSet = useMemo(() => toSet(pearlState.reviewPearlCardIds), [pearlState.reviewPearlCardIds]);
  const activeCatalog = useMemo(
    () => pearlState.customCatalogs.find((catalog) => catalog.id === activeCatalogId) || null,
    [activeCatalogId, pearlState.customCatalogs],
  );
  const stateSets = useMemo(() => ({ favoriteSet, wrongSet, knownSet, reviewSet }), [favoriteSet, knownSet, reviewSet, wrongSet]);
  const branchOptions = useMemo(() => branches.filter((branch) => TUS_PEARL_CARD_STATS.byBranch[branch.id] || allCards.some((card) => card.branchId === branch.id)), [allCards]);

  const filteredCards = useMemo(() => allCards.filter((card) => {
    if (branchFilter !== 'all' && card.branchId !== branchFilter) return false;
    return cardMatchesFilter(card, filter, stateSets, activeCatalog);
  }), [activeCatalog, allCards, branchFilter, filter, stateSets]);

  const sessionCards = useMemo(() => {
    const ids = studySession?.cardIds || [];
    const filteredIdSet = new Set(filteredCards.map((card) => card.id));
    const mapped = ids.map((id) => cardById.get(id)).filter((card) => card && filteredIdSet.has(card.id));
    if (mapped.length) return mapped;
    return filteredCards;
  }, [cardById, filteredCards, studySession]);

  const activeCard = sessionCards[currentIndex] || null;
  const progress = sessionCards.length ? Math.round(((currentIndex + 1) / sessionCards.length) * 100) : 0;
  const isFavorite = activeCard ? favoriteSet.has(activeCard.id) : false;
  const isWrong = activeCard ? wrongSet.has(activeCard.id) : false;
  const isKnown = activeCard ? knownSet.has(activeCard.id) : false;
  const isReview = activeCard ? reviewSet.has(activeCard.id) : false;
  const isInCatalog = Boolean(activeCard && activeCatalog?.cardIds?.includes(activeCard.id));
  const cardCatalogs = useMemo(() => pearlState.customCatalogs.filter((catalog) => activeCard && catalog.cardIds?.includes(activeCard.id)), [activeCard, pearlState.customCatalogs]);
  const isInAnyCatalog = cardCatalogs.length > 0;
  const modeLabel = resolveModeLabel(filter, branchFilter, activeCatalog);

  const catalogCards = useMemo(() => (
    (activeCatalog?.cardIds || []).map((id) => cardById.get(id)).filter(Boolean)
  ), [activeCatalog, cardById]);

  const searchableCards = useMemo(() => {
    const query = librarySearch.trim().toLocaleLowerCase('tr');
    const pool = allCards.filter((card) => {
      if (sourceLibraryFilter === 'user' && card.source !== 'user') return false;
      if (sourceLibraryFilter === 'system' && card.source === 'user') return false;
      return true;
    });
    if (!query) return pool.slice(0, 36);
    return pool.filter((card) => [card.front, card.back, card.subject, card.topic, card.source, ...(card.keywords || []), ...(card.tags || [])]
      .join(' ')
      .toLocaleLowerCase('tr')
      .includes(query)).slice(0, 48);
  }, [activeCatalog, allCards, librarySearch, sourceLibraryFilter]);

  function commitState(updater) {
    setPearlState((current) => savePearlState(updater(current || defaultPearlState)));
  }

  const rebuildStudySession = useCallback((cards = filteredCards) => {
    const deckKey = makeDeckKey(filter, branchFilter, activeCatalogId);
    const seed = `${deckKey}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const deck = buildStudyDeck(cards, {
      mode: filter,
      sourceFilter: branchFilter,
      recentStarts: pearlState.recentStudyStarts?.[deckKey] || [],
      maxSameTopicStreak: 1,
      maxSameBranchStreak: 2,
      seed,
      wrongIds: wrongSet,
      reviewIds: reviewSet,
      knownIds: knownSet,
    });
    setStudySession(deck);
    setCurrentIndex(0);
    setFlipped(false);
    commitState((current) => ({
      ...current,
      recentStudyStarts: rememberStudyStart(current.recentStudyStarts, deckKey, deck.cardIds),
      customCatalogs: filter === 'catalog' ? markCatalogStudied(current.customCatalogs, activeCatalogId) : current.customCatalogs,
    }));
  }, [activeCatalogId, branchFilter, filter, filteredCards, knownSet, pearlState.recentStudyStarts, reviewSet, wrongSet]);

  useEffect(() => {
    if (!activeCatalogId && pearlState.customCatalogs.length) setActiveCatalogId(pearlState.customCatalogs[0].id);
  }, [activeCatalogId, pearlState.customCatalogs]);

  useEffect(() => {
    setRenameValue(activeCatalog?.name || '');
    setCatalogDescription(activeCatalog?.description || '');
  }, [activeCatalog?.description, activeCatalog?.id, activeCatalog?.name]);

  useEffect(() => {
    const signature = [filter, branchFilter, activeCatalogId, filteredCards.map((card) => card.id).join('|')].join('::');
    if (viewMode !== 'study' || lastDeckSignature.current === signature) return;
    lastDeckSignature.current = signature;
    rebuildStudySession(filteredCards);
  }, [activeCatalogId, branchFilter, filter, filteredCards, rebuildStudySession, viewMode]);

  useEffect(() => {
    if (!sessionCards.length) return;
    if (currentIndex >= sessionCards.length) setCurrentIndex(0);
  }, [currentIndex, sessionCards.length]);

  useEffect(() => {
    setCatalogMenuOpen(false);
  }, [activeCard?.id, viewMode]);

  const moveCard = useCallback((direction) => {
    if (!sessionCards.length) return;
    setMotion(direction > 0 ? 'next' : 'prev');
    setFlipped(false);
    setCurrentIndex((current) => {
      const next = direction > 0 ? current + 1 : current - 1;
      if (next < 0) return sessionCards.length - 1;
      if (next >= sessionCards.length) return 0;
      return next;
    });
    window.setTimeout(() => setMotion('idle'), 180);
  }, [sessionCards.length]);

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
      description: catalogDescription.trim(),
      cardIds: includeActiveCard && activeCard ? [activeCard.id] : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastStudiedAt: '',
    };
    commitState((current) => ({ ...current, customCatalogs: [...(current.customCatalogs || []), catalog] }));
    setActiveCatalogId(catalog.id);
    setFilter('catalog');
    setCatalogName('');
    setCatalogDescription('');
  }

  function renameCatalog() {
    const name = renameValue.trim();
    if (!activeCatalog || !name) return;
    commitState((current) => ({
      ...current,
      customCatalogs: (current.customCatalogs || []).map((catalog) => (
        catalog.id === activeCatalog.id ? { ...catalog, name, description: catalogDescription.trim(), updatedAt: new Date().toISOString() } : catalog
      )),
    }));
  }

  function deleteCatalog(catalogId) {
    commitState((current) => ({
      ...current,
      customCatalogs: (current.customCatalogs || []).filter((catalog) => catalog.id !== catalogId),
      userPearlCards: (current.userPearlCards || []).map((card) => ({ ...card, catalogIds: removeId(card.catalogIds, catalogId) })),
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
        catalog.id === catalogId ? { ...catalog, cardIds: addId(catalog.cardIds, cardId), updatedAt: new Date().toISOString() } : catalog
      )),
      userPearlCards: (current.userPearlCards || []).map((card) => (
        card.id === cardId ? { ...card, catalogIds: addId(card.catalogIds, catalogId), updatedAt: new Date().toISOString() } : card
      )),
    }));
  }

  function removeCardFromCatalog(cardId, catalogId = activeCatalogId) {
    if (!cardId || !catalogId) return;
    commitState((current) => ({
      ...current,
      customCatalogs: (current.customCatalogs || []).map((catalog) => (
        catalog.id === catalogId ? { ...catalog, cardIds: removeId(catalog.cardIds, cardId), updatedAt: new Date().toISOString() } : catalog
      )),
      userPearlCards: (current.userPearlCards || []).map((card) => (
        card.id === cardId ? { ...card, catalogIds: removeId(card.catalogIds, catalogId), updatedAt: new Date().toISOString() } : card
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
    lastDeckSignature.current = '';
  }

  function openEditor({ mode = 'create', card = null, defaultCatalogId = activeCatalogId || '' } = {}) {
    setEditorState({ open: true, mode, card, defaultCatalogId });
  }

  function closeEditor() {
    setEditorState({ open: false, mode: 'create', card: null, defaultCatalogId: '' });
  }

  function saveUserCard(card, { catalogId = '' } = {}) {
    commitState((current) => {
      const nextCatalogs = (current.customCatalogs || []).map((catalog) => (
        catalog.id === catalogId ? { ...catalog, cardIds: addId(catalog.cardIds, card.id), updatedAt: new Date().toISOString() } : catalog
      ));
      return {
        ...current,
        userPearlCards: upsertUserPearlCard(current.userPearlCards, { ...card, catalogIds: catalogId ? addId(card.catalogIds, catalogId) : card.catalogIds }),
        customCatalogs: nextCatalogs,
      };
    });
    closeEditor();
    setFilter('user');
    setBranchFilter('all');
    lastDeckSignature.current = '';
  }

  function deleteUserCard(cardId) {
    commitState((current) => ({
      ...current,
      userPearlCards: removeUserPearlCard(current.userPearlCards, cardId),
      favoritePearlCardIds: removeId(current.favoritePearlCardIds, cardId),
      wrongPearlCardIds: removeId(current.wrongPearlCardIds, cardId),
      knownPearlCardIds: removeId(current.knownPearlCardIds, cardId),
      reviewPearlCardIds: removeId(current.reviewPearlCardIds, cardId),
      customCatalogs: (current.customCatalogs || []).map((catalog) => ({ ...catalog, cardIds: removeId(catalog.cardIds, cardId) })),
    }));
    lastDeckSignature.current = '';
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
          <span>{viewMode === 'catalogs' ? 'Kişisel setlerini oluştur, düzenle ve kart ekle.' : `${modeLabel} · dengeli karışık oturum.`}</span>
        </div>
        <div className="tus-pearl-study-progress" aria-label="Kart ilerlemesi">
          <strong>{viewMode === 'study' ? `${sessionCards.length ? currentIndex + 1 : 0} / ${sessionCards.length}` : `${pearlState.customCatalogs.length} katalog`}</strong>
          <div><span style={{ width: `${viewMode === 'study' ? progress : 100}%` }} /></div>
        </div>
      </header>

      {viewMode === 'catalogs' ? (
        <div className="tus-pearl-mode-switch card-surface compact-mode-switch" aria-label="Katalog yönetimi üst aksiyonları">
          <button type="button" onClick={() => { setViewMode('study'); setFilter('all'); setBranchFilter('all'); lastDeckSignature.current = ''; }}>
            <Icon name="LayeredCards" />
            <span>Hızlı tekrar</span>
          </button>
          <button type="button" className="active" onClick={() => setViewMode('catalogs')}>
            <Icon name="ClipboardList" />
            <span>Kataloglarım</span>
          </button>
          <button type="button" onClick={() => openEditor({ mode: 'create', defaultCatalogId: activeCatalogId })}>
            <Icon name="Notes" />
            <span>Kart ekle</span>
          </button>
        </div>
      ) : (
        <div className="pearl-study-quickbar card-surface" aria-label="Çalışma ekranı hızlı aksiyonları">
          <span><strong>{modeLabel}</strong><em>{sessionCards.length} kartlık karışık deck</em></span>
          <div>
            <button type="button" className="btn btn-secondary compact" onClick={() => rebuildStudySession(filteredCards)}>Yeni sıra</button>
            <button type="button" className="btn btn-secondary compact" onClick={() => { setFilter('all'); setBranchFilter('all'); lastDeckSignature.current = ''; }}>Tüm kartlar</button>
            <button type="button" className="btn btn-secondary compact" onClick={() => openEditor({ mode: 'create', defaultCatalogId: activeCatalogId })}>Kart ekle</button>
            <button type="button" className="btn btn-secondary compact" onClick={() => setViewMode('catalogs')}>Kataloglarım</button>
          </div>
        </div>
      )}

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
              {pearlState.customCatalogs.length ? pearlState.customCatalogs.map((catalog) => {
                const catalogWrongCount = (catalog.cardIds || []).filter((id) => wrongSet.has(id)).length;
                const userCount = (catalog.cardIds || []).filter((id) => cardById.get(id)?.source === 'user').length;
                return (
                  <button
                    key={catalog.id}
                    type="button"
                    className={catalog.id === activeCatalogId ? 'active' : ''}
                    onClick={() => setActiveCatalogId(catalog.id)}
                  >
                    <span>
                      <strong>{catalog.name}</strong>
                      <em>{catalog.cardIds.length} kart · {catalogWrongCount} zorlandığın · {userCount} kişisel</em>
                      <em>{formatDateLabel(catalog.lastStudiedAt)}</em>
                    </span>
                    <Icon name="ArrowRight" size={16} />
                  </button>
                );
              }) : (
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
                    <span>{catalogCards.length} kart · {catalogCards.filter((card) => card.source === 'user').length} kişisel · {formatDateLabel(activeCatalog.lastStudiedAt)}</span>
                  </div>
                  <div className="tus-pearl-catalog-detail-actions">
                    <button type="button" className="btn btn-primary compact" onClick={() => openCatalogForStudy(activeCatalog.id)} disabled={!catalogCards.length}>Bu seti çalış</button>
                    <button type="button" className="btn btn-secondary compact" onClick={() => openEditor({ mode: 'create', defaultCatalogId: activeCatalog.id })}>Kataloğa yeni kart</button>
                    <button type="button" className="btn btn-secondary compact" onClick={() => deleteCatalog(activeCatalog.id)}>Sil</button>
                  </div>
                </div>

                <div className="tus-pearl-catalog-rename-row catalog-rename-extended">
                  <input value={renameValue} onChange={(event) => setRenameValue(event.target.value)} aria-label="Katalog adını düzenle" />
                  <input value={catalogDescription} onChange={(event) => setCatalogDescription(event.target.value)} placeholder="Kısa açıklama" aria-label="Katalog açıklaması" />
                  <button type="button" className="btn btn-secondary compact" onClick={renameCatalog}>Kaydet</button>
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
                            <span>{card.source === 'user' ? 'Kişisel kart' : 'Sistem kartı'} · {getBranchName(card.branchId)} · {card.cardType || 'Spot'}</span>
                            <strong>{card.front}</strong>
                            <p>{card.back}</p>
                          </div>
                          <div className="pearl-card-row-actions">
                            {card.source === 'user' ? <button type="button" className="btn btn-secondary compact" onClick={() => openEditor({ mode: 'edit', card, defaultCatalogId: activeCatalog.id })}>Düzenle</button> : null}
                            <button type="button" className="btn btn-icon quiet" onClick={() => removeCardFromCatalog(card.id)} aria-label="Kartı katalogdan çıkar">
                              <Icon name="X" />
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="tus-pearl-study-empty compact actionable-empty">
                      <Icon name="LayeredCards" />
                      <strong>Bu katalogda henüz kart yok.</strong>
                      <p>Tüm kart havuzundan hazır kart ekleyebilir veya bu kataloğa özel kendi kartını oluşturabilirsin.</p>
                      <div className="empty-action-row">
                        <a href="#catalog-card-library" className="btn btn-primary compact">Tüm kartlardan ekle</a>
                        <button type="button" className="btn btn-secondary compact" onClick={() => openEditor({ mode: 'create', defaultCatalogId: activeCatalog.id })}>Yeni kart oluştur</button>
                      </div>
                    </div>
                  )}
                </div>

                <div id="catalog-card-library" className="tus-pearl-catalog-card-section catalog-card-library">
                  <div className="tus-pearl-catalog-section-head">
                    <strong>Tüm kartlardan ekle</strong>
                    <span>Sistem ve kişisel kartlar</span>
                  </div>
                  <div className="pearl-library-toolbar">
                    <input className="tus-pearl-library-search" value={librarySearch} onChange={(event) => setLibrarySearch(event.target.value)} placeholder="Kart ara: sinir, farmakoloji, tuzak..." />
                    <select value={sourceLibraryFilter} onChange={(event) => setSourceLibraryFilter(event.target.value)} aria-label="Kart kaynağı filtresi">
                      <option value="all">Tüm kaynaklar</option>
                      <option value="system">Sistem kartları</option>
                      <option value="user">Kendi kartlarım</option>
                    </select>
                    <button type="button" className="btn btn-primary compact" onClick={() => openEditor({ mode: 'create', defaultCatalogId: activeCatalog.id })}>Yeni kart</button>
                  </div>
                  <div className="tus-pearl-catalog-card-list addable">
                    {searchableCards.map((card) => (
                      <article key={card.id} className="tus-pearl-library-card">
                        <div>
                          <span>{card.source === 'user' ? 'Kişisel kart' : 'Sistem kartı'} · {getBranchName(card.branchId)} · {card.cardType || 'Spot'}</span>
                          <strong>{card.front}</strong>
                        </div>
                        <div className="pearl-card-row-actions">
                          {card.source === 'user' ? <button type="button" className="btn btn-secondary compact" onClick={() => openEditor({ mode: 'edit', card, defaultCatalogId: activeCatalog.id })}>Düzenle</button> : null}
                          {activeCatalog?.cardIds?.includes(card.id) ? (
                            <button type="button" className="btn btn-secondary compact" disabled>Eklendi</button>
                          ) : (
                            <button type="button" className="btn btn-secondary compact" onClick={() => addCardToCatalog(card.id)}>Kataloğa ekle</button>
                          )}
                        </div>
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
                    <strong>{activeCard.front}</strong>
                  </span>
                  <span className="tus-pearl-focus-face tus-pearl-focus-back">
                    <strong>{activeCard.back}</strong>
                    {activeCard.explanation ? <p>{activeCard.explanation}</p> : null}
                  </span>
                </button>
              </article>
            ) : (
              <div className="tus-pearl-study-empty card-surface">
                <Icon name="LayeredCards" />
                <strong>{filter === 'catalog' ? 'Bu katalogda çalışılacak kart yok.' : 'Bu sette kart yok.'}</strong>
                <p>{filter === 'catalog' ? 'Tüm kart havuzundan ekleme yapabilir veya kendi kartını oluşturabilirsin.' : 'Filtreyi temizleyip tüm kartlara dönebilir veya yeni kart ekleyebilirsin.'}</p>
                <div className="empty-action-row">
                  <button type="button" className="btn btn-primary compact" onClick={() => { setFilter('all'); setBranchFilter('all'); lastDeckSignature.current = ''; }}>Tüm kartlara dön</button>
                  <button type="button" className="btn btn-secondary compact" onClick={() => setViewMode('catalogs')}>{filter === 'catalog' ? 'Kataloğa kart ekle' : 'Kataloglarım'}</button>
                  <button type="button" className="btn btn-secondary compact" onClick={() => openEditor({ mode: 'create', defaultCatalogId: activeCatalogId })}>Yeni kart oluştur</button>
                </div>
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
              <div className="pearl-catalog-popover-wrap">
                <button type="button" className={isInAnyCatalog ? 'active' : ''} onClick={() => setCatalogMenuOpen((value) => !value)} disabled={!activeCard}>
                  <Icon name="LayeredCards" size={15} />
                  <span>{isInAnyCatalog ? 'Katalogda' : 'Kataloğa ekle'}</span>
                </button>
                {catalogMenuOpen ? (
                  <div className="pearl-catalog-popover" role="menu">
                    {pearlState.customCatalogs.length ? pearlState.customCatalogs.map((catalog) => {
                      const alreadyAdded = activeCard ? catalog.cardIds?.includes(activeCard.id) : false;
                      return (
                        <button key={catalog.id} type="button" className={alreadyAdded ? 'active' : ''} onClick={() => { if (activeCard && !alreadyAdded) addCardToCatalog(activeCard.id, catalog.id); setActiveCatalogId(catalog.id); setCatalogMenuOpen(false); }}>
                          <span>{catalog.name}</span>
                          <em>{alreadyAdded ? 'Eklendi' : 'Ekle'}</em>
                        </button>
                      );
                    }) : (
                      <button type="button" onClick={() => { setViewMode('catalogs'); setCatalogMenuOpen(false); }}>Önce katalog oluştur</button>
                    )}
                  </div>
                ) : null}
              </div>
              <button type="button" onClick={() => openEditor({ mode: 'create', defaultCatalogId: activeCatalogId })}>
                <Icon name="Notes" size={15} />
                <span>Kart ekle</span>
              </button>
              {activeCard?.source === 'user' ? (
                <>
                  <button type="button" onClick={() => openEditor({ mode: 'edit', card: activeCard, defaultCatalogId: activeCatalogId })}>
                    <Icon name="Notes" size={15} />
                    <span>Düzenle</span>
                  </button>
                  <button type="button" onClick={() => deleteUserCard(activeCard.id)}>
                    <Icon name="Trash2" size={15} />
                    <span>Sil</span>
                  </button>
                </>
              ) : activeCard ? (
                <button type="button" onClick={() => openEditor({ mode: 'copy', card: activeCard, defaultCatalogId: activeCatalogId })}>
                  <Icon name="User" size={15} />
                  <span>Kendi kartıma kopyala</span>
                </button>
              ) : null}
            </div>
          </footer>
        </>
      )}

      <TusPearlCardEditor
        open={editorState.open}
        mode={editorState.mode}
        initialCard={editorState.card}
        defaultCatalogId={editorState.defaultCatalogId}
        catalogs={pearlState.customCatalogs}
        existingCards={allCards}
        onClose={closeEditor}
        onSave={saveUserCard}
      />
    </section>
  );
}

export default memo(TusPearlStudyScreen);
