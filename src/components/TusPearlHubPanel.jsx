import { memo, useMemo, useState } from 'react';
import { Icon } from './ui.jsx';
import { TUS_PEARL_CARDS } from '../data/tusPearlCards.js';
import { branches } from '../data/branches.js';
import {
  addId,
  defaultPearlState,
  loadPearlState,
  savePearlState,
  upsertUserPearlCard,
} from '../utils/pearlCardStorage.js';
import TusPearlCardEditor from './TusPearlCardEditor.jsx';
import './tusPearlCards.css';

const SYSTEM_PEARL_CARDS = TUS_PEARL_CARDS.map((card) => ({ ...card, source: 'system' }));

const DASHBOARD_ACTIONS = [
  { id: 'review', label: 'Hızlı tekrar başlat', description: '5 dakikalık karışık oturum', icon: 'Zap', primary: true },
  { id: 'add-card', label: 'Kart ekle', description: 'Kendi notunu karta çevir', icon: 'Notes' },
  { id: 'catalogs', label: 'Kataloglarım', description: 'Setlerini aç ve yönet', icon: 'ClipboardList' },
  { id: 'all', label: 'Tüm kartları gör', description: 'Hazır ve kişisel kartlar', icon: 'LayeredCards' },
];

function toSet(ids = []) {
  return new Set(ids || []);
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
  const [editorOpen, setEditorOpen] = useState(false);

  const allCards = useMemo(() => [...SYSTEM_PEARL_CARDS, ...(pearlState.userPearlCards || [])], [pearlState.userPearlCards]);
  const favoriteSet = useMemo(() => toSet(pearlState.favoritePearlCardIds), [pearlState.favoritePearlCardIds]);
  const wrongSet = useMemo(() => toSet(pearlState.wrongPearlCardIds), [pearlState.wrongPearlCardIds]);
  const reviewSet = useMemo(() => toSet(pearlState.reviewPearlCardIds), [pearlState.reviewPearlCardIds]);
  const weakBranch = useMemo(() => buildWeakBranchSummary(wrongAnswers), [wrongAnswers]);
  const dueCount = new Set([...wrongSet, ...reviewSet]).size;

  function commitState(updater) {
    setPearlState((current) => savePearlState(updater(current || defaultPearlState)));
  }

  function handleAction(action) {
    if (action.id === 'add-card') {
      setEditorOpen(true);
      return;
    }
    if (action.id === 'catalogs') {
      onOpenStudy?.({ filter: 'catalogs', branchFilter: 'all' });
      return;
    }
    if (action.id === 'all') {
      onOpenStudy?.({ filter: 'all', branchFilter: 'all' });
      return;
    }
    onOpenStudy?.({ filter: action.id, branchFilter: action.id === 'review' ? weakBranch?.branchId || 'all' : 'all' });
  }

  function saveUserCard(card, { catalogId = '' } = {}) {
    commitState((current) => ({
      ...current,
      userPearlCards: upsertUserPearlCard(current.userPearlCards, { ...card, catalogIds: catalogId ? addId(card.catalogIds, catalogId) : card.catalogIds }),
      customCatalogs: (current.customCatalogs || []).map((catalog) => (
        catalog.id === catalogId ? { ...catalog, cardIds: addId(catalog.cardIds, card.id), updatedAt: new Date().toISOString() } : catalog
      )),
    }));
    setEditorOpen(false);
  }

  const stats = [
    { label: 'Toplam kart', value: allCards.length },
    { label: 'Favori', value: favoriteSet.size },
    { label: 'Zorlandığın', value: wrongSet.size },
    { label: 'Katalog', value: pearlState.customCatalogs?.length || 0 },
  ];

  return (
    <section className="tus-pearl-hub-panel card-surface" aria-label="Hap Bilgi Kartları hızlı tekrar paneli">
      <div className="tus-pearl-hub-ambient" aria-hidden="true" />
      <header className="tus-pearl-hub-head">
        <div>
          <p className="auth-eyebrow">TUS tekrarı</p>
          <h2>Hap Bilgi Kartları</h2>
          <span>5 dakikalık TUS tekrarları, kişisel kartlar ve kataloglar.</span>
        </div>
        <span className="tus-pearl-hub-icon" aria-hidden="true"><Icon name="LayeredCards" /></span>
      </header>

      <div className="tus-pearl-hub-stats" aria-label="Hap kart istatistikleri">
        {stats.map((stat) => <span key={stat.label}><b>{stat.value}</b>{stat.label}</span>)}
      </div>

      <div className={`pearl-bridge-callout compact ${weakBranch ? '' : 'soft'}`.trim()}>
        <Icon name={weakBranch ? 'Target' : 'Sparkles'} />
        <p>{weakBranch ? <><strong>{weakBranch.branchName}</strong> hatalarını hap kartlarla güçlendir.</> : 'Zorlandığın kartlarla kısa bir tekrar başlat.'}</p>
        <button type="button" className="btn btn-secondary compact" onClick={() => onOpenStudy?.({ filter: 'wrong', branchFilter: weakBranch?.branchId || 'all' })} disabled={!dueCount && !weakBranch}>
          Zorlandıklarımı çalış
        </button>
      </div>

      <div className="tus-pearl-action-grid" aria-label="Hap bilgi hızlı girişleri">
        {DASHBOARD_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            className={action.primary ? 'primary' : ''}
            onClick={() => handleAction(action)}
          >
            <Icon name={action.icon} size={18} />
            <span><strong>{action.label}</strong><em>{action.description}</em></span>
          </button>
        ))}
      </div>

      <div className="tus-pearl-hub-footnote">
        <Icon name="Sparkles" size={16} />
        <span>Katalog oluşturma ve kart seçimi ayrı ekranda yapılır; çalışma ekranı sadece karta odaklanır.</span>
      </div>


      <TusPearlCardEditor
        open={editorOpen}
        mode="create"
        defaultCatalogId=""
        catalogs={pearlState.customCatalogs}
        existingCards={allCards}
        onClose={() => setEditorOpen(false)}
        onSave={saveUserCard}
      />
    </section>
  );
}

export default memo(TusPearlHubPanel);
