import { memo, useMemo, useState } from 'react';
import { Icon } from './ui.jsx';
import { TUS_PEARL_CARDS } from '../data/tusPearlCards.js';
import { branches } from '../data/branches.js';
import {
  addId,
  defaultPearlState,
  loadPearlState,
  savePearlState,
} from '../utils/pearlCardStorage.js';
import './tusPearlCards.css';

const DASHBOARD_ACTIONS = [
  { id: 'review', label: 'Hızlı tekrar başlat', description: 'Bekleyen ve zorlandığın kartlar', icon: 'Zap', primary: true },
  { id: 'wrong', label: 'Zorlandıklarımı çalış', description: 'Karıştırdığın spotlar', icon: 'Target' },
  { id: 'favorites', label: 'Favorileri aç', description: 'İşaretlediğin kritik kartlar', icon: 'Sparkles' },
  { id: 'past', label: 'Çıkmış bilgileri aç', description: 'Sınav sinyali güçlü bilgiler', icon: 'BookOpen' },
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
  const reviewSet = useMemo(() => toSet(pearlState.reviewPearlCardIds), [pearlState.reviewPearlCardIds]);
  const weakBranch = useMemo(() => buildWeakBranchSummary(wrongAnswers), [wrongAnswers]);
  const dueCount = new Set([...wrongSet, ...reviewSet]).size;

  const recommendedCards = useMemo(() => {
    const wrongBranchCards = weakBranch
      ? TUS_PEARL_CARDS.filter((card) => card.branchId === weakBranch.branchId)
      : [];
    const reviewCards = TUS_PEARL_CARDS.filter((card) => reviewSet.has(card.id) || wrongSet.has(card.id));
    const highYieldCards = TUS_PEARL_CARDS.filter((card) => card.isHighYield);
    const pool = [...wrongBranchCards, ...reviewCards, ...highYieldCards, ...TUS_PEARL_CARDS];
    const seen = new Set();
    return pool.filter((card) => {
      if (seen.has(card.id)) return false;
      seen.add(card.id);
      return true;
    }).slice(0, 3);
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
  const stats = [
    { label: 'Toplam kart', value: TUS_PEARL_CARDS.length },
    { label: 'Favori', value: favoriteSet.size },
    { label: 'Zorlandığın', value: wrongSet.size },
    { label: 'Tekrar bekleyen', value: dueCount },
  ];

  return (
    <section className="tus-pearl-hub-panel card-surface" aria-label="Hap Bilgi Kartları hızlı tekrar paneli">
      <div className="tus-pearl-hub-ambient" aria-hidden="true" />
      <header className="tus-pearl-hub-head">
        <div>
          <p className="auth-eyebrow">Aktif hatırlama</p>
          <h2>Hap Bilgi Kartları</h2>
          <span>5 dakikalık spot tekrarlar, favoriler ve kişisel kataloglar tek giriş yüzünde.</span>
        </div>
        <span className="tus-pearl-hub-icon" aria-hidden="true"><Icon name="LayeredCards" /></span>
      </header>

      <div className="tus-pearl-hub-stats" aria-label="Hap kart istatistikleri">
        {stats.map((stat) => <span key={stat.label}><b>{stat.value}</b>{stat.label}</span>)}
      </div>

      <div className={`pearl-bridge-callout ${weakBranch ? '' : 'soft'}`.trim()}>
        <Icon name={weakBranch ? 'Target' : 'Sparkles'} />
        {weakBranch ? (
          <p><strong>{weakBranch.branchName}</strong> içinde {weakBranch.count} hata öne çıkıyor. Bu branşa yakın hap kartlarla hedefli tekrar başlat.</p>
        ) : (
          <p>Yanlışların oluşmadan da yüksek verimli TUS spotlarıyla kısa tekrar yapabilirsin.</p>
        )}
      </div>

      <div className="tus-pearl-action-grid" aria-label="Hap bilgi hızlı girişleri">
        {DASHBOARD_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            className={action.primary ? 'primary' : ''}
            onClick={() => onOpenStudy?.({ filter: action.id, branchFilter: action.id === 'review' ? weakBranch?.branchId || 'all' : 'all' })}
          >
            <Icon name={action.icon} size={18} />
            <span><strong>{action.label}</strong><em>{action.description}</em></span>
          </button>
        ))}
      </div>

      <div className="tus-pearl-preview-stack compact" aria-label="Önerilen hap bilgi kartları">
        {recommendedCards.map((card) => (
          <button
            key={card.id}
            type="button"
            className="tus-pearl-preview-card"
            onClick={() => onOpenStudy?.({ filter: 'all', branchFilter: card.branchId })}
          >
            <div>
              <span>{card.subject} · {card.cardType || 'Spot'}</span>
              <strong>{card.front}</strong>
            </div>
            <Icon name="ArrowRight" size={17} />
          </button>
        ))}
      </div>

      <div className="tus-pearl-catalog-mini">
        <div className="tus-pearl-catalog-mini-head">
          <div>
            <strong>Kataloglarım</strong>
            <p>Kendi tekrar setini oluştur; sonra içine girip kart ekle veya çıkar.</p>
          </div>
          <button type="button" className="btn btn-secondary compact" onClick={() => onOpenStudy?.({ filter: 'catalogs', branchFilter: 'all', catalogId: activeCatalogId })}>
            Yönet
          </button>
        </div>
        <div className="tus-pearl-catalog-mini-controls">
          <input value={catalogName} onChange={(event) => setCatalogName(event.target.value)} placeholder="Katalog adı: Son hafta tekrar" />
          <button type="button" className="btn btn-secondary compact" onClick={createCatalog}>Oluştur</button>
        </div>
        {pearlState.customCatalogs?.length ? (
          <div className="tus-pearl-catalog-select-row">
            <select value={activeCatalogId} onChange={(event) => setActiveCatalogId(event.target.value)} aria-label="Hap bilgi kataloğu seç">
              {pearlState.customCatalogs.map((catalog) => <option key={catalog.id} value={catalog.id}>{catalog.name} ({catalog.cardIds.length})</option>)}
            </select>
            <button type="button" className="btn btn-primary compact" onClick={() => onOpenStudy?.({ filter: 'catalog', branchFilter: 'all', catalogId: activeCatalogId })} disabled={!activeCatalog}>Aç</button>
            <button type="button" className="btn btn-secondary compact" onClick={addRecommendedToCatalog} disabled={!activeCatalog}>Önerileri ekle</button>
          </div>
        ) : (
          <span className="tus-pearl-catalog-empty-line">Henüz katalog yok. İlk setini oluşturduğunda burada kalıcı görünür.</span>
        )}
      </div>
    </section>
  );
}

export default memo(TusPearlHubPanel);
