import { memo, useMemo, useState } from 'react';
import { Icon } from './ui.jsx';
import { TUS_PEARL_CARDS, TUS_PEARL_CARD_STATS } from '../data/tusPearlCards.js';
import { branches } from '../data/branches.js';
import {
  addId,
  defaultPearlState,
  loadPearlState,
  savePearlState,
} from '../utils/pearlCardStorage.js';
import './tusPearlCards.css';

const QUICK_FILTERS = [
  { id: 'all', label: 'Tüm kartlar' },
  { id: 'favorites', label: 'Favoriler' },
  { id: 'wrong', label: 'Zorlandıklarım' },
  { id: 'review', label: 'Bugün tekrar et' },
  { id: 'known', label: 'Bildiklerim' },
  { id: 'past', label: 'Çıkmış bilgiler' },
];

function toSet(ids = []) {
  return new Set(ids || []);
}

function buildCatalogId(name) {
  return `catalog-${name.toLocaleLowerCase('tr').replace(/[^a-z0-9ığüşöçİĞÜŞÖÇ]+/giu, '-').replace(/^-|-$/g, '') || 'tekrar'}-${Date.now()}`;
}

function buildWeakBranchSummary(wrongAnswers = []) {
  const counts = wrongAnswers.reduce((accumulator, item) => {
    if (!item.branchId) return accumulator;
    accumulator[item.branchId] = (accumulator[item.branchId] || 0) + (item.attempts || 1);
    return accumulator;
  }, {});

  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (!top) return null;
  const branch = branches.find((item) => item.id === top[0]);
  return {
    branchId: top[0],
    branchName: branch?.shortName || branch?.name || 'ilgili branş',
    count: top[1],
  };
}

function TusPearlHubPanel({ wrongAnswers = [], onOpenStudy }) {
  const [pearlState, setPearlState] = useState(() => loadPearlState());
  const [catalogName, setCatalogName] = useState('');
  const [activeCatalogId, setActiveCatalogId] = useState(pearlState.customCatalogs?.[0]?.id || '');

  const favoriteSet = useMemo(() => toSet(pearlState.favoritePearlCardIds), [pearlState.favoritePearlCardIds]);
  const wrongSet = useMemo(() => toSet(pearlState.wrongPearlCardIds), [pearlState.wrongPearlCardIds]);
  const knownSet = useMemo(() => toSet(pearlState.knownPearlCardIds), [pearlState.knownPearlCardIds]);
  const reviewSet = useMemo(() => toSet(pearlState.reviewPearlCardIds), [pearlState.reviewPearlCardIds]);
  const weakBranch = useMemo(() => buildWeakBranchSummary(wrongAnswers), [wrongAnswers]);

  const recommendedCards = useMemo(() => {
    const wrongBranchCards = weakBranch
      ? TUS_PEARL_CARDS.filter((card) => card.branchId === weakBranch.branchId)
      : [];
    const reviewCards = TUS_PEARL_CARDS.filter((card) => reviewSet.has(card.id) || wrongSet.has(card.id));
    const highYieldCards = TUS_PEARL_CARDS.filter((card) => card.isHighYield);
    const pool = [...wrongBranchCards, ...reviewCards, ...highYieldCards];
    const seen = new Set();
    return pool.filter((card) => {
      if (seen.has(card.id)) return false;
      seen.add(card.id);
      return true;
    }).slice(0, 4);
  }, [reviewSet, weakBranch, wrongSet]);

  function commitState(updater) {
    setPearlState((current) => savePearlState(updater(current || defaultPearlState)));
  }

  function createCatalog() {
    const name = catalogName.trim();
    if (!name) return;
    const catalog = { id: buildCatalogId(name), name, cardIds: [], createdAt: new Date().toISOString() };
    commitState((current) => ({ ...current, customCatalogs: [...(current.customCatalogs || []), catalog] }));
    setActiveCatalogId(catalog.id);
    setCatalogName('');
  }

  function addRecommendedToCatalog() {
    if (!activeCatalogId || !recommendedCards.length) return;
    commitState((current) => ({
      ...current,
      customCatalogs: (current.customCatalogs || []).map((catalog) => (
        catalog.id === activeCatalogId
          ? { ...catalog, cardIds: recommendedCards.reduce((ids, card) => addId(ids, card.id), catalog.cardIds || []) }
          : catalog
      )),
    }));
  }

  const activeCatalog = pearlState.customCatalogs?.find((catalog) => catalog.id === activeCatalogId);
  const dueCount = new Set([...wrongSet, ...reviewSet]).size;

  return (
    <section className="tus-pearl-hub-panel card-surface" aria-label="Hap Bilgi Kartları hızlı tekrar paneli">
      <div className="tus-pearl-hub-ambient" aria-hidden="true" />
      <header className="tus-pearl-hub-head">
        <div>
          <p className="auth-eyebrow">Aktif hatırlama</p>
          <h2>Hap Bilgi Kartları</h2>
          <span>Kısa tekrar, sınav tuzağı ve anahtar kelime kartlarını yanlışlarınla aynı çalışma akışında tut.</span>
        </div>
        <span className="tus-pearl-hub-icon" aria-hidden="true"><Icon name="LayeredCards" /></span>
      </header>

      <div className="tus-pearl-hub-stats" aria-label="Hap kart istatistikleri">
        <span><b>{TUS_PEARL_CARDS.length}</b> toplam kart</span>
        <span><b>{favoriteSet.size}</b> favori</span>
        <span><b>{wrongSet.size}</b> zorlandığın</span>
        <span><b>{dueCount}</b> tekrar bekleyen</span>
      </div>

      {weakBranch ? (
        <div className="pearl-bridge-callout">
          <Icon name="Target" />
          <p><strong>{weakBranch.branchName}</strong> içinde {weakBranch.count} hata öne çıkıyor. İlgili hap kartlarla 5 dakikalık hedefli tekrar başlat.</p>
        </div>
      ) : (
        <div className="pearl-bridge-callout soft">
          <Icon name="Sparkles" />
          <p>Yanlışların oluşmadan da yüksek verimli TUS spotlarıyla kısa tekrar yapabilirsin.</p>
        </div>
      )}

      <div className="tus-pearl-hub-chip-row" aria-label="Hap kart hızlı filtreleri">
        {QUICK_FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => onOpenStudy?.({ filter: filter.id, branchFilter: weakBranch?.branchId || 'all' })}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="tus-pearl-preview-stack" aria-label="Önerilen hap bilgi kartları">
        {recommendedCards.slice(0, 3).map((card) => (
          <article key={card.id} className="tus-pearl-preview-card">
            <div>
              <span>{card.subject} · {card.cardType || 'Spot'}</span>
              <strong>{card.front}</strong>
            </div>
            <Icon name="ArrowRight" size={17} />
          </article>
        ))}
      </div>

      <div className="tus-pearl-catalog-mini">
        <div>
          <strong>Kendi kataloğunu oluştur</strong>
          <p>Farmakoloji ezber, son hafta tekrar veya en çok karıştırdıkların gibi kişisel setler kur.</p>
        </div>
        <div className="tus-pearl-catalog-mini-controls">
          <input value={catalogName} onChange={(event) => setCatalogName(event.target.value)} placeholder="Katalog adı" />
          <button type="button" className="btn btn-secondary compact" onClick={createCatalog}>Oluştur</button>
        </div>
        {pearlState.customCatalogs?.length ? (
          <div className="tus-pearl-catalog-select-row">
            <select value={activeCatalogId} onChange={(event) => setActiveCatalogId(event.target.value)} aria-label="Hap bilgi kataloğu seç">
              {pearlState.customCatalogs.map((catalog) => <option key={catalog.id} value={catalog.id}>{catalog.name} ({catalog.cardIds.length})</option>)}
            </select>
            <button type="button" className="btn btn-secondary compact" onClick={addRecommendedToCatalog} disabled={!activeCatalog}>Önerileri ekle</button>
          </div>
        ) : null}
      </div>

      <div className="tus-pearl-hub-actions">
        <button type="button" className="btn btn-primary" onClick={() => onOpenStudy?.({ filter: dueCount ? 'review' : 'all', branchFilter: weakBranch?.branchId || 'all' })}>
          <Icon name="LayeredCards" />
          <span>Hızlı tekrar başlat</span>
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => onOpenStudy?.({ filter: 'favorites', branchFilter: 'all' })}>
          <Icon name="Sparkles" />
          <span>Favoriler</span>
        </button>
      </div>
    </section>
  );
}

export default memo(TusPearlHubPanel);
