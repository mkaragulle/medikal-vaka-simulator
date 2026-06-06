import { memo, useEffect, useMemo, useState } from 'react';
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
import { buildPearlRepeatListItems, getPearlRepeatListCounts } from '../utils/pearlRepeatLists.js';
import './tusPearlCards.css';

const SYSTEM_PEARL_CARDS = TUS_PEARL_CARDS.map((card) => ({ ...card, source: 'system' }));

const DASHBOARD_ACTIONS = [
  { id: 'quick', label: 'Hızlı tekrar', description: 'Dengeli kart oturumu', icon: 'Zap', primary: true },
  { id: 'wrong', label: 'Zorlandıklarım', description: 'Eksikleri öne al', icon: 'Target' },
  { id: 'all', label: 'Tüm kartlar', description: 'Kart arşivini aç', icon: 'LayeredCards' },
  { id: 'catalogs', label: 'Kataloglar', description: 'Setleri yönet', icon: 'ClipboardList' },
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

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const refreshPearlState = () => {
      setPearlState(loadPearlState());
    };

    window.addEventListener('klinikiq:pearl-state-updated', refreshPearlState);
    window.addEventListener('storage', refreshPearlState);

    return () => {
      window.removeEventListener('klinikiq:pearl-state-updated', refreshPearlState);
      window.removeEventListener('storage', refreshPearlState);
    };
  }, []);

  const repeatListItems = useMemo(() => buildPearlRepeatListItems(pearlState, allCards), [allCards, pearlState]);
  const repeatCounts = useMemo(() => getPearlRepeatListCounts(pearlState, allCards), [allCards, pearlState]);

  function openRepeatList(item) {
    if (item.id === 'catalogs') {
      onOpenStudy?.({ filter: 'catalogs', branchFilter: 'all' });
      return;
    }
    onOpenStudy?.({ filter: item.filter, branchFilter: 'all' });
  }

  function handleAction(action) {
    if (action.id === 'quick') {
      onOpenStudy?.({ filter: 'all', branchFilter: 'all' });
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
    { label: 'Toplam', value: repeatCounts.all },
    { label: 'Favori', value: repeatCounts.favorites },
    { label: 'Tekrar', value: repeatCounts.review },
    { label: 'Zor', value: repeatCounts.wrong },
    { label: 'Katalog', value: repeatCounts.catalogs },
  ];

  return (
    <section className="tus-pearl-hub-panel card-surface" aria-label="Hap Bilgi Kartları hızlı tekrar paneli">
      <div className="tus-pearl-hub-ambient" aria-hidden="true" />
      <header className="tus-pearl-hub-head">
        <div className="review-panel-title">
          <span className="review-panel-icon" aria-hidden="true"><Icon name="LayeredCards" /></span>
          <div>
            <h2>Hap Bilgi Kartları</h2>
            <p>Hızlı tekrar, zorlandığın kartlar ve kataloglar tek yerde.</p>
          </div>
        </div>
        <button type="button" className="btn btn-secondary compact" onClick={() => onOpenStudy?.({ filter: 'all', branchFilter: 'all' })}>
          Tüm kartlar
        </button>
      </header>

      <div className="tus-pearl-hub-stats" aria-label="Hap kart istatistikleri">
        {stats.map((stat) => (
          <span key={stat.label}>
            <b>{stat.value}</b>
            <em>{stat.label}</em>
          </span>
        ))}
      </div>

      <div className={`pearl-bridge-callout compact ${weakBranch ? '' : 'soft'}`.trim()}>
        <Icon name={weakBranch ? 'Target' : 'Sparkles'} />
        <p>{weakBranch ? <><strong>{weakBranch.branchName}</strong> için kaçırdığın noktaları hap kartlarla pekiştir.</> : 'Zorlandığın kartları kısa ve hedefli bir oturumda çalış.'}</p>
        <button type="button" className="btn btn-secondary compact" onClick={() => onOpenStudy?.({ filter: 'wrong', branchFilter: weakBranch?.branchId || 'all' })} disabled={!dueCount && !weakBranch}>
          Çalış
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

      <div className="tus-pearl-repeat-center" aria-label="Kişisel tekrar listelerin">
        <div className="tus-pearl-repeat-center-head">
          <div>
            <strong>Kişisel listeler</strong>
            <span>İşaretlediğin kartlara tek tıkla geri dön.</span>
          </div>
          <button type="button" className="btn btn-secondary compact" onClick={() => onOpenStudy?.({ filter: 'all', branchFilter: 'all' })}>Tümünü aç</button>
        </div>
        <div className="tus-pearl-repeat-list">
          {repeatListItems.filter((item) => item.id !== 'all').map((item) => (
            <button key={item.id} type="button" onClick={() => openRepeatList(item)}>
              <span className="repeat-list-icon"><Icon name={item.icon} size={16} /></span>
              <span className="repeat-list-copy"><strong>{item.label}</strong><em>{item.description}</em></span>
              <span className="repeat-list-count">{item.countLabel}</span>
              <span className="repeat-list-action">{item.actionLabel}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tus-pearl-own-card-mini" aria-label="Kendi hap bilgi kartların">
        <div>
          <strong>Kendi kartların</strong>
          <span>Yeni öğrendiğin bilgileri kişisel karta dönüştür; çalışma akışını bölmeden sakla.</span>
        </div>
        <div>
          <button type="button" className="btn btn-secondary compact" onClick={() => setEditorOpen(true)}>Oluştur</button>
          <button type="button" className="btn btn-secondary compact quiet" onClick={() => onOpenStudy?.({ filter: 'user', branchFilter: 'all' })}>Kendi kartlarım</button>
        </div>
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
