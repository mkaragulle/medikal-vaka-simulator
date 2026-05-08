import { memo, useMemo, useState } from 'react';
import TusPearlCard from './TusPearlCard.jsx';
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
import './tusPearlCards.css';

const FILTERS = [
  { id: 'all', label: 'Tüm kartlar' },
  { id: 'favorites', label: 'Favorilerim' },
  { id: 'wrong', label: 'Yanlış yaptıklarım' },
  { id: 'review', label: 'Tekrar listem' },
  { id: 'known', label: 'Bildiklerim' },
  { id: 'past', label: 'Çıkmış bilgiler' },
];

function toSet(ids = []) {
  return new Set(ids || []);
}

function cardMatchesSearch(card, searchTerm) {
  if (!searchTerm) return true;
  const haystack = [card.front, card.back, card.explanation, card.subject, card.topic, ...(card.keywords || [])]
    .join(' ')
    .toLocaleLowerCase('tr');
  return haystack.includes(searchTerm.toLocaleLowerCase('tr'));
}

function buildCatalogId(name) {
  return `catalog-${name.toLocaleLowerCase('tr').replace(/[^a-z0-9ığüşöçİĞÜŞÖÇ]+/giu, '-').replace(/^-|-$/g, '') || 'tekrar'}-${Date.now()}`;
}

function TusPearlDeck({ cards = TUS_PEARL_CARDS, compact = false }) {
  const [pearlState, setPearlState] = useState(() => loadPearlState());
  const [filter, setFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(compact ? 12 : 24);
  const [catalogName, setCatalogName] = useState('');
  const [activeCatalogId, setActiveCatalogId] = useState('');

  const favoriteSet = useMemo(() => toSet(pearlState.favoritePearlCardIds), [pearlState.favoritePearlCardIds]);
  const wrongSet = useMemo(() => toSet(pearlState.wrongPearlCardIds), [pearlState.wrongPearlCardIds]);
  const knownSet = useMemo(() => toSet(pearlState.knownPearlCardIds), [pearlState.knownPearlCardIds]);
  const reviewSet = useMemo(() => toSet(pearlState.reviewPearlCardIds), [pearlState.reviewPearlCardIds]);

  const activeCatalog = useMemo(
    () => pearlState.customCatalogs.find((catalog) => catalog.id === activeCatalogId) || null,
    [activeCatalogId, pearlState.customCatalogs],
  );

  function commitState(updater) {
    setPearlState((current) => savePearlState(updater(current || defaultPearlState)));
  }

  const filteredCards = useMemo(() => cards.filter((card) => {
    if (branchFilter !== 'all' && card.branchId !== branchFilter) return false;
    if (!cardMatchesSearch(card, search)) return false;
    if (filter === 'favorites') return favoriteSet.has(card.id);
    if (filter === 'wrong') return wrongSet.has(card.id);
    if (filter === 'known') return knownSet.has(card.id);
    if (filter === 'review') return reviewSet.has(card.id);
    if (filter === 'past') return card.appearedYears?.length || card.isPastQuestionDerived;
    if (filter === 'catalog') return activeCatalog?.cardIds?.includes(card.id);
    return true;
  }), [activeCatalog, branchFilter, cards, favoriteSet, filter, knownSet, reviewSet, search, wrongSet]);

  const visibleCards = filteredCards.slice(0, visibleCount);
  const branchOptions = useMemo(() => branches.filter((branch) => TUS_PEARL_CARD_STATS.byBranch[branch.id]), []);

  function createCatalog() {
    const name = catalogName.trim();
    if (!name) return;
    const catalog = { id: buildCatalogId(name), name, cardIds: [], createdAt: new Date().toISOString() };
    commitState((current) => ({ ...current, customCatalogs: [...(current.customCatalogs || []), catalog] }));
    setActiveCatalogId(catalog.id);
    setFilter('catalog');
    setCatalogName('');
  }

  function addToCatalog(cardId) {
    if (!activeCatalogId) {
      const fallback = pearlState.customCatalogs[0];
      if (fallback) setActiveCatalogId(fallback.id);
      return;
    }
    commitState((current) => ({
      ...current,
      customCatalogs: (current.customCatalogs || []).map((catalog) => (
        catalog.id === activeCatalogId ? { ...catalog, cardIds: addId(catalog.cardIds, cardId) } : catalog
      )),
    }));
  }

  function removeFromCatalog(cardId) {
    if (!activeCatalogId) return;
    commitState((current) => ({
      ...current,
      customCatalogs: (current.customCatalogs || []).map((catalog) => (
        catalog.id === activeCatalogId ? { ...catalog, cardIds: removeId(catalog.cardIds, cardId) } : catalog
      )),
    }));
  }

  return (
    <section className="tus-pearl-deck card-surface" aria-label="Hap Bilgi Kartları">
      <div className="tus-pearl-deck-head">
        <div>
          <span className="case-eyebrow">Hızlı TUS tekrarı</span>
          <h2>Hap Bilgi Kartları</h2>
          <p>TUS için hızlı tekrar, aktif hatırlama, anahtar kelime ve sınav tuzağı kartları.</p>
        </div>
        <div className="tus-pearl-stats" aria-label="Hap bilgi istatistikleri">
          <span><b>{cards.length}</b> kart</span>
          <span><b>{favoriteSet.size}</b> favori</span>
          <span><b>{wrongSet.size}</b> yanlış</span>
          <span><b>{reviewSet.size}</b> tekrar</span>
        </div>
      </div>

      <div className="tus-pearl-toolbar">
        <label className="tus-pearl-search">
          <Icon name="Search" size={16} />
          <input value={search} onChange={(event) => { setSearch(event.target.value); setVisibleCount(compact ? 12 : 24); }} placeholder="Kart, konu veya anahtar kelime ara" />
        </label>
        <select value={branchFilter} onChange={(event) => { setBranchFilter(event.target.value); setVisibleCount(compact ? 12 : 24); }} aria-label="Branşa göre filtrele">
          <option value="all">Tüm branşlar</option>
          {branchOptions.map((branch) => <option key={branch.id} value={branch.id}>{branch.shortName || branch.name} ({TUS_PEARL_CARD_STATS.byBranch[branch.id]})</option>)}
        </select>
      </div>

      <div className="tus-pearl-filter-row" aria-label="Kart filtreleri">
        {FILTERS.map((item) => (
          <button key={item.id} type="button" className={filter === item.id ? 'active' : ''} onClick={() => { setFilter(item.id); setVisibleCount(compact ? 12 : 24); }}>
            {item.label}
          </button>
        ))}
        {pearlState.customCatalogs.length ? (
          <button type="button" className={filter === 'catalog' ? 'active' : ''} onClick={() => setFilter('catalog')}>Katalog</button>
        ) : null}
      </div>

      <div className="tus-pearl-catalog-row">
        <div className="catalog-create-box">
          <input value={catalogName} onChange={(event) => setCatalogName(event.target.value)} placeholder="Yeni katalog adı: Farmakoloji ezber" />
          <button type="button" className="btn btn-secondary compact" onClick={createCatalog}>Katalog oluştur</button>
        </div>
        {pearlState.customCatalogs.length ? (
          <select value={activeCatalogId} onChange={(event) => { setActiveCatalogId(event.target.value); setFilter('catalog'); }} aria-label="Aktif katalog seç">
            <option value="">Katalog seç</option>
            {pearlState.customCatalogs.map((catalog) => <option key={catalog.id} value={catalog.id}>{catalog.name} ({catalog.cardIds.length})</option>)}
          </select>
        ) : null}
      </div>

      <div className="tus-pearl-card-grid" aria-label="Hap bilgi kart listesi">
        {visibleCards.map((card) => (
          <TusPearlCard
            key={card.id}
            card={card}
            isFavorite={favoriteSet.has(card.id)}
            isWrong={wrongSet.has(card.id)}
            isKnown={knownSet.has(card.id)}
            isReview={reviewSet.has(card.id)}
            isInCatalog={Boolean(activeCatalog?.cardIds?.includes(card.id))}
            onToggleFavorite={(cardId) => commitState((current) => ({ ...current, favoritePearlCardIds: toggleId(current.favoritePearlCardIds, cardId) }))}
            onMarkWrong={(cardId) => commitState((current) => ({ ...current, wrongPearlCardIds: toggleId(current.wrongPearlCardIds, cardId), reviewPearlCardIds: addId(current.reviewPearlCardIds, cardId) }))}
            onMarkKnown={(cardId) => commitState((current) => ({ ...current, knownPearlCardIds: toggleId(current.knownPearlCardIds, cardId), wrongPearlCardIds: removeId(current.wrongPearlCardIds, cardId) }))}
            onToggleReview={(cardId) => commitState((current) => ({ ...current, reviewPearlCardIds: toggleId(current.reviewPearlCardIds, cardId) }))}
            onAddToCatalog={addToCatalog}
            onRemoveFromCatalog={removeFromCatalog}
          />
        ))}
      </div>

      {!visibleCards.length ? (
        <div className="tus-pearl-empty-state">
          <strong>Bu filtrede kart yok.</strong>
          <p>Farklı bir branş seçebilir, aramayı temizleyebilir veya yeni katalog oluşturabilirsin.</p>
        </div>
      ) : null}

      <div className="tus-pearl-deck-footer">
        <span>{filteredCards.length} kart içinden {visibleCards.length} kart gösteriliyor.</span>
        {visibleCards.length < filteredCards.length ? (
          <button type="button" className="btn btn-primary compact" onClick={() => setVisibleCount((count) => count + 24)}>Daha fazla kart göster</button>
        ) : null}
      </div>
    </section>
  );
}

export default memo(TusPearlDeck);
