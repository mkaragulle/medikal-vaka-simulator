import { memo, useCallback, useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './ui.jsx';
import GlossaryText from './GlossaryTooltip.jsx';
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
import { buildPearlRepeatListItems, getPearlEmptyState } from '../utils/pearlRepeatLists.js';
import { getPearlBackContent } from '../utils/pearlCardContent.js';
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
  if (filter === 'review') return stateSets.reviewSet.has(card.id);
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


function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getMoreMenuPosition(triggerNode, options = {}) {
  if (typeof window === 'undefined' || !triggerNode) {
    return { placement: 'popover', top: 0, left: 0, width: options.width || 280 };
  }
  const margin = 12;
  const gap = options.gap ?? 8;
  const rect = triggerNode.getBoundingClientRect();
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1024;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 768;

  if (viewportWidth <= 640) {
    return {
      placement: 'sheet',
      left: margin,
      right: margin,
      bottom: 14,
      width: Math.max(0, viewportWidth - margin * 2),
    };
  }

  const maxAllowedWidth = Math.max(236, viewportWidth - margin * 2);
  const preferredWidth = options.width || 300;
  const width = Math.min(preferredWidth, maxAllowedWidth);
  const align = options.align || 'end';
  const preferredLeft = align === 'start' ? rect.left : rect.right - width;
  const left = clampNumber(preferredLeft, margin, Math.max(margin, viewportWidth - width - margin));
  const estimatedHeight = options.estimatedHeight || 236;
  const openBelowTop = rect.bottom + gap;
  const openAboveTop = rect.top - estimatedHeight - gap;
  const shouldOpenAbove = !options.preferBelow && openBelowTop + estimatedHeight > viewportHeight - margin && openAboveTop > margin;
  const top = shouldOpenAbove
    ? clampNumber(openAboveTop, margin, viewportHeight - margin - 80)
    : clampNumber(openBelowTop, margin, viewportHeight - margin - 80);

  return { placement: 'popover', top, left, width };
}

function getMoreMenuItemTitle(item) {
  if (item?.id === 'known') return 'Bildiğim Kartlar';
  if (item?.id === 'user') return 'Kendi Oluşturduğum Kartlarım';
  return item?.shortLabel || item?.label || '';
}

function getPrimaryRepeatDisplay(item) {
  const map = {
    all: { title: 'Tüm Kartları Gör', icon: 'LayeredCards' },
    favorites: { title: 'Favorilerim', icon: 'Sparkles' },
    wrong: { title: 'Zorlandıklarım', icon: 'AlertTriangle' },
    review: { title: 'Tekrar Edeceklerim', icon: 'RotateCcw' },
  };
  return map[item?.id] || { title: item?.shortLabel || item?.label || '', icon: item?.icon || 'LayeredCards' };
}

function PearlStudyMoreMenu({
  active = false,
  filter,
  viewMode,
  items = [],
  onOpenRepeatList,
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ placement: 'popover', top: 0, left: 0, width: 280 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const updatePosition = useCallback(() => {
    setPosition(getMoreMenuPosition(triggerRef.current, { align: 'start', width: 264, estimatedHeight: 156, preferBelow: true }));
  }, []);

  useLayoutEffect(() => {
    if (!open) return undefined;
    updatePosition();
    const frame = window.requestAnimationFrame(() => {
      updatePosition();
      const menuNode = menuRef.current;
      const triggerNode = triggerRef.current;
      if (!menuNode || !triggerNode || window.innerWidth <= 640) return;
      const margin = 12;
      const menuRect = menuNode.getBoundingClientRect();
      if (menuRect.bottom > window.innerHeight - margin) {
        setPosition((current) => ({
          ...current,
          top: Math.max(margin, window.innerHeight - margin - menuRect.height),
        }));
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event) => {
      const target = event.target;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const handleReposition = () => updatePosition();

    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [open, updatePosition]);

  function runAndClose(action) {
    setOpen(false);
    action?.();
  }

  const menu = open ? createPortal(
    <div
      ref={menuRef}
      id="pearl-study-more-menu"
      className={`pearl-study-more-panel pearl-study-more-popover pearl-study-other-panel ${position.placement === 'sheet' ? 'mobile-sheet' : ''}`}
      role="menu"
      aria-label="Diğer tekrar listeleri"
      style={position.placement === 'sheet'
        ? { left: position.left, right: position.right, bottom: position.bottom, width: 'auto' }
        : { top: position.top, left: position.left, width: position.width }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="menuitem"
          className={viewMode === 'study' && filter === item.filter ? 'active' : ''}
          onClick={() => runAndClose(() => onOpenRepeatList(item))}
        >
          <span>
            <strong>{getMoreMenuItemTitle(item)}</strong>
          </span>
          <Icon name={item.icon || 'LayeredCards'} size={15} />
        </button>
      ))}
    </div>,
    document.body,
  ) : null;

  const menuClassName = ['pearl-study-more-menu', active ? 'active' : '', open ? 'open' : ''].filter(Boolean).join(' ');

  return (
    <div className={menuClassName}>
      <button
        ref={triggerRef}
        type="button"
        className="pearl-study-more-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="pearl-study-more-menu"
        onClick={() => setOpen((current) => !current)}
      >
        <span>Diğer</span>
        <Icon name="ChevronDown" size={14} />
      </button>
      {menu}
    </div>
  );
}

function PearlStudyCatalogsMenu({
  catalogs = [],
  activeCatalogId = '',
  viewMode = 'study',
  onManageCatalogs,
  onOpenCatalog,
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ placement: 'popover', top: 0, left: 0, width: 300 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const updatePosition = useCallback(() => {
    setPosition(getMoreMenuPosition(triggerRef.current, {
      align: 'start',
      width: 248,
      estimatedHeight: catalogs.length ? 92 + Math.min(catalogs.length, 4) * 46 : 120,
      preferBelow: true,
    }));
  }, [catalogs.length]);

  useLayoutEffect(() => {
    if (!open) return undefined;
    updatePosition();
    const frame = window.requestAnimationFrame(() => {
      updatePosition();
      const menuNode = menuRef.current;
      const triggerNode = triggerRef.current;
      if (!menuNode || !triggerNode || window.innerWidth <= 640) return;
      const margin = 12;
      const menuRect = menuNode.getBoundingClientRect();
      if (menuRect.bottom > window.innerHeight - margin) {
        setPosition((current) => ({
          ...current,
          top: Math.max(margin, window.innerHeight - margin - menuRect.height),
        }));
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event) => {
      const target = event.target;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const handleReposition = () => updatePosition();

    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [open, updatePosition]);

  function runAndClose(action) {
    setOpen(false);
    action?.();
  }

  const menu = open ? createPortal(
    <div
      ref={menuRef}
      id="pearl-study-catalogs-menu"
      className={`pearl-study-more-panel pearl-study-more-popover pearl-study-catalogs-panel ${position.placement === 'sheet' ? 'mobile-sheet' : ''}`}
      role="menu"
      aria-label="Kataloglarım"
      style={position.placement === 'sheet'
        ? { left: position.left, right: position.right, bottom: position.bottom, width: 'auto' }
        : { top: position.top, left: position.left, width: position.width }}
    >
      <button
        type="button"
        role="menuitem"
        className={viewMode === 'catalogs' ? 'active' : ''}
        onClick={() => runAndClose(onManageCatalogs)}
      >
        <span>
          <strong>Katalogları Yönet</strong>
        </span>
        <Icon name="ClipboardList" size={15} />
      </button>

      <div className="pearl-study-more-divider" />

      {catalogs.length ? catalogs.map((catalog) => (
        <button
          key={catalog.id}
          type="button"
          role="menuitem"
          className={viewMode === 'study' && activeCatalogId === catalog.id ? 'active' : ''}
          onClick={() => runAndClose(() => onOpenCatalog(catalog.id))}
        >
          <span>
            <strong>{catalog.name}</strong>
          </span>
          <Icon name="ArrowRight" size={15} />
        </button>
      )) : (
        <button type="button" role="menuitem" onClick={() => runAndClose(onManageCatalogs)}>
          <span>
            <strong>Henüz katalog yok</strong>
            <em>İlk katalog setini oluşturmak için yönetim ekranını aç.</em>
          </span>
          <Icon name="ArrowRight" size={15} />
        </button>
      )}
    </div>,
    document.body,
  ) : null;

  const active = viewMode === 'catalogs' || (viewMode === 'study' && Boolean(activeCatalogId));
  const menuClassName = ['pearl-study-more-menu', 'pearl-study-catalogs-menu', active ? 'active' : '', open ? 'open' : ''].filter(Boolean).join(' ');

  return (
    <div className={menuClassName}>
      <button
        ref={triggerRef}
        type="button"
        className="pearl-study-more-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="pearl-study-catalogs-menu"
        onClick={() => setOpen((current) => !current)}
      >
        <span>Kataloglarım</span>
        <Icon name="ChevronDown" size={14} />
      </button>
      {menu}
    </div>
  );
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
  const [confirmDeleteState, setConfirmDeleteState] = useState({ open: false, card: null, context: 'library' });
  const [catalogMenuOpen, setCatalogMenuOpen] = useState(false);
  const [branchMenuOpen, setBranchMenuOpen] = useState(false);
  const [branchMenuPosition, setBranchMenuPosition] = useState({ placement: 'popover', top: 0, left: 0, width: 300 });
  const pointerStartX = useRef(null);
  const lastDeckSignature = useRef('');
  const branchMenuTriggerRef = useRef(null);
  const branchMenuRef = useRef(null);

  const hiddenSet = useMemo(() => toSet(pearlState.hiddenPearlCardIds), [pearlState.hiddenPearlCardIds]);
  const allCards = useMemo(() => ([...SYSTEM_PEARL_CARDS, ...(pearlState.userPearlCards || [])].filter((card) => !hiddenSet.has(card.id))), [hiddenSet, pearlState.userPearlCards]);
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
  const repeatListItems = useMemo(() => buildPearlRepeatListItems(pearlState, allCards), [allCards, pearlState]);
  const primaryRepeatItems = useMemo(() => repeatListItems.filter((item) => ['all', 'favorites', 'wrong', 'review'].includes(item.id)), [repeatListItems]);
  const secondaryRepeatItems = useMemo(() => repeatListItems.filter((item) => ['known', 'user'].includes(item.id)), [repeatListItems]);
  const isSecondaryListActive = ['known', 'user'].includes(filter);
  const emptyState = useMemo(() => getPearlEmptyState(filter), [filter]);
  const activeCardContent = useMemo(() => getPearlBackContent(activeCard || {}), [activeCard]);
  const activeFrontLength = String(activeCardContent.frontText || activeCard?.front || '').length;
  const activeBackLength = [
    activeCardContent.backText,
    activeCardContent.detailText,
    activeCardContent.tusTipText,
    activeCardContent.noteText,
  ].filter(Boolean).join(' ').length;
  const activeFrontDensityClass = activeFrontLength > 260
    ? 'pearl-text-density-xxl'
    : activeFrontLength > 190
      ? 'pearl-text-density-xl'
      : activeFrontLength > 130
        ? 'pearl-text-density-lg'
        : '';
  const activeBackDensityClass = activeBackLength > 520
    ? 'pearl-back-density-xxl'
    : activeBackLength > 380
      ? 'pearl-back-density-xl'
      : activeBackLength > 260
        ? 'pearl-back-density-lg'
        : '';
  const activeCardBranchName = activeCard ? getBranchName(activeCard.branchId) : 'TUS';
  const activeCardTopicLabel = activeCard?.subject || activeCard?.topic || 'Hap bilgi kartı';
  const activeCardTypeLabel = activeCard?.cardType || 'Spot kart';
  const activeCardSourceLabel = activeCard?.source === 'user' ? 'Kişisel kart' : 'Sistem kartı';
  const activeCardTagList = useMemo(() => {
    if (!activeCard) return [];
    return [...new Set([
      ...(activeCard.tags || []),
      ...(activeCard.keywords || []),
      ...(activeCard.appearedYears?.length ? ['Çıkmış bilgi'] : []),
    ])].slice(0, 3);
  }, [activeCard]);

  const catalogCards = useMemo(() => (
    (activeCatalog?.cardIds || []).map((id) => cardById.get(id)).filter(Boolean)
  ), [activeCatalog, cardById]);

  const deferredLibrarySearch = useDeferredValue(librarySearch);
  const librarySearchIndex = useMemo(() => allCards.map((card) => ({
    card,
    searchText: [card.front, card.back, card.subject, card.topic, card.source, ...(card.keywords || []), ...(card.tags || [])]
      .join(' ')
      .toLocaleLowerCase('tr'),
  })), [allCards]);

  const searchableCards = useMemo(() => {
    const query = deferredLibrarySearch.trim().toLocaleLowerCase('tr');
    const pool = librarySearchIndex.filter(({ card }) => {
      if (sourceLibraryFilter === 'user' && card.source !== 'user') return false;
      if (sourceLibraryFilter === 'system' && card.source === 'user') return false;
      return true;
    });
    if (!query) return pool.map(({ card }) => card);
    return pool.filter(({ searchText }) => searchText.includes(query)).map(({ card }) => card);
  }, [deferredLibrarySearch, librarySearchIndex, sourceLibraryFilter]);

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
      favoriteIds: favoriteSet,
      recentStartWindowSize: 20,
    });
    setStudySession(deck);
    setCurrentIndex(0);
    setFlipped(false);
    commitState((current) => ({
      ...current,
      recentStudyStarts: rememberStudyStart(current.recentStudyStarts, deckKey, deck.cardIds),
      customCatalogs: filter === 'catalog' ? markCatalogStudied(current.customCatalogs, activeCatalogId) : current.customCatalogs,
    }));
  }, [activeCatalogId, branchFilter, favoriteSet, filter, filteredCards, knownSet, pearlState.recentStudyStarts, reviewSet, wrongSet]);

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
    setBranchMenuOpen(false);
  }, [activeCard?.id, viewMode]);

  useEffect(() => {
    if (viewMode !== 'study') return undefined;
    const frame = window.requestAnimationFrame(() => {
      const scrollingElement = document.scrollingElement || document.documentElement;
      scrollingElement?.scrollTo?.({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.querySelector('.tus-pearl-study-shell')?.scrollTo?.({ top: 0, left: 0, behavior: 'auto' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeCatalogId, filter, viewMode]);


  const updateBranchMenuPosition = useCallback(() => {
    setBranchMenuPosition(getMoreMenuPosition(branchMenuTriggerRef.current, {
      align: 'end',
      width: 300,
      estimatedHeight: 360,
      preferBelow: true,
      gap: 10,
    }));
  }, []);

  useLayoutEffect(() => {
    if (!branchMenuOpen) return undefined;
    updateBranchMenuPosition();
    const frame = window.requestAnimationFrame(() => {
      updateBranchMenuPosition();
      const menuNode = branchMenuRef.current;
      if (!menuNode || window.innerWidth <= 640) return;
      const margin = 12;
      const menuRect = menuNode.getBoundingClientRect();
      if (menuRect.bottom > window.innerHeight - margin) {
        setBranchMenuPosition((current) => ({
          ...current,
          top: Math.max(margin, window.innerHeight - margin - menuRect.height),
        }));
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [branchMenuOpen, updateBranchMenuPosition]);

  useEffect(() => {
    if (!branchMenuOpen) return undefined;
    const handlePointerDown = (event) => {
      const target = event.target;
      if (branchMenuTriggerRef.current?.contains(target) || branchMenuRef.current?.contains(target)) return;
      setBranchMenuOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setBranchMenuOpen(false);
        branchMenuTriggerRef.current?.focus();
      }
    };
    const handleReposition = () => updateBranchMenuPosition();
    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [branchMenuOpen, updateBranchMenuPosition]);

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
      commitState((current) => ({
        ...current,
        reviewPearlCardIds: addId(current.reviewPearlCardIds, activeCard.id),
        knownPearlCardIds: removeId(current.knownPearlCardIds, activeCard.id),
      }));
      moveCard(1);
      return;
    }
    commitState((current) => ({
      ...current,
      wrongPearlCardIds: addId(current.wrongPearlCardIds, activeCard.id),
      reviewPearlCardIds: addId(current.reviewPearlCardIds, activeCard.id),
      knownPearlCardIds: removeId(current.knownPearlCardIds, activeCard.id),
    }));
    moveCard(1);
  }

  function openCatalogForStudy(catalogId = activeCatalogId) {
    if (!catalogId) return;
    const scrollingElement = document.scrollingElement || document.documentElement;
    scrollingElement?.scrollTo?.({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setActiveCatalogId(catalogId);
    setFilter('catalog');
    setBranchFilter('all');
    setViewMode('study');
    lastDeckSignature.current = '';
  }

  function openRepeatList(itemOrFilter) {
    const nextFilter = typeof itemOrFilter === 'string' ? itemOrFilter : itemOrFilter?.filter;
    if (!nextFilter) return;
    if (nextFilter === 'catalogs') {
      setViewMode('catalogs');
      return;
    }
    setViewMode('study');
    setFilter(nextFilter);
    setBranchFilter('all');
    if (nextFilter !== 'catalog') setActiveCatalogId((current) => current || pearlState.customCatalogs[0]?.id || '');
    lastDeckSignature.current = '';
  }

  function openEditor({ mode = 'create', card = null, defaultCatalogId = activeCatalogId || '' } = {}) {
    setEditorState({ open: true, mode, card, defaultCatalogId });
  }

  function closeEditor() {
    setEditorState({ open: false, mode: 'create', card: null, defaultCatalogId: '' });
  }

  function requestCardDelete(card, context = 'library') {
    if (!card) return;
    setConfirmDeleteState({ open: true, card, context });
  }

  function closeDeleteConfirm() {
    setConfirmDeleteState({ open: false, card: null, context: 'library' });
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

  function deleteCard(card) {
    if (!card?.id) return;
    commitState((current) => ({
      ...current,
      userPearlCards: card.source === 'user' ? removeUserPearlCard(current.userPearlCards, card.id) : current.userPearlCards,
      hiddenPearlCardIds: card.source === 'user' ? removeId(current.hiddenPearlCardIds, card.id) : addId(current.hiddenPearlCardIds, card.id),
      favoritePearlCardIds: removeId(current.favoritePearlCardIds, card.id),
      wrongPearlCardIds: removeId(current.wrongPearlCardIds, card.id),
      knownPearlCardIds: removeId(current.knownPearlCardIds, card.id),
      reviewPearlCardIds: removeId(current.reviewPearlCardIds, card.id),
      customCatalogs: (current.customCatalogs || []).map((catalog) => ({ ...catalog, cardIds: removeId(catalog.cardIds, card.id) })),
    }));
    if (editorState.card?.id === card.id) closeEditor();
    closeDeleteConfirm();
    setCatalogMenuOpen(false);
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

  const branchMenuPortal = branchMenuOpen ? createPortal(
    <div
      ref={branchMenuRef}
      id="pearl-study-branch-menu"
      className={`pearl-study-branch-menu pearl-study-branch-menu-portal ${branchMenuPosition.placement === 'sheet' ? 'mobile-sheet' : ''}`}
      role="listbox"
      aria-label="Branş seç"
      style={branchMenuPosition.placement === 'sheet'
        ? { left: branchMenuPosition.left, right: branchMenuPosition.right, bottom: branchMenuPosition.bottom, width: 'auto' }
        : { top: branchMenuPosition.top, left: branchMenuPosition.left, width: branchMenuPosition.width }}
    >
      {[{ id: 'all', shortName: 'Tüm branşlar' }, ...branchOptions].map((branch) => {
        const value = branch.id;
        const label = branch.shortName || branch.name;
        const active = branchFilter === value;
        return (
          <button
            key={value}
            type="button"
            role="option"
            aria-selected={active}
            className={active ? 'active' : ''}
            onClick={() => {
              setBranchFilter(value);
              setCurrentIndex(0);
              setFlipped(false);
              setBranchMenuOpen(false);
              lastDeckSignature.current = '';
            }}
          >
            <span>{label}</span>
            {active ? <Icon name="CheckCircle" size={15} /> : null}
          </button>
        );
      })}
    </div>,
    document.body,
  ) : null;

  return (
    <section
      className={[
        'page-shell',
        'tus-pearl-study-shell',
        viewMode === 'study' ? 'pearl-study-shell-mode-study' : 'pearl-study-shell-mode-catalogs',
        filter === 'catalog' ? 'pearl-study-shell-catalog-session' : '',
      ].filter(Boolean).join(' ')}
      aria-label="Hap Bilgi Kartları çalışma ekranı"
    >
      <header className="tus-pearl-study-top card-surface">
        <button type="button" className="branch-back-v8 pearl-study-return-v136" onClick={onBack} aria-label="Tekrar merkezine dön">
          <span className="pearl-study-back-icon" aria-hidden="true">
            <Icon name="ArrowRight" className="pearl-study-back-arrow" size={18} strokeWidth={2.35} />
          </span>
          <span>Tekrar merkezine dön</span>
        </button>
        <div className="tus-pearl-study-title">
          <h1>{viewMode === 'catalogs' ? 'Kataloglarım' : 'Hap Bilgi Çalış'}</h1>
        </div>
        {viewMode === 'study' ? (
          <div className="pearl-study-branch-filter pearl-study-branch-picker" aria-label="Hap kart branş filtresi">
            <div className="pearl-study-branch-menu-wrap">
              <button
                ref={branchMenuTriggerRef}
                type="button"
                className="pearl-study-branch-menu-trigger"
                onClick={() => setBranchMenuOpen((open) => !open)}
                aria-haspopup="listbox"
                aria-expanded={branchMenuOpen}
                aria-controls="pearl-study-branch-menu"
              >
                <strong>{branchFilter === 'all' ? 'Tüm branşlar' : getBranchName(branchFilter)}</strong>
                <Icon name="ChevronDown" size={15} />
              </button>
            </div>
          </div>
        ) : null}
        <div className="tus-pearl-study-progress" aria-label="Kart ilerlemesi">
          <strong>{viewMode === 'study' ? `${sessionCards.length ? currentIndex + 1 : 0} / ${sessionCards.length}` : `${pearlState.customCatalogs.length} katalog`}</strong>
          <div><span style={{ width: `${viewMode === 'study' ? progress : 100}%` }} /></div>
        </div>
      </header>
      {branchMenuPortal}

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
        </div>
      ) : (
        null
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
                return (
                  <button
                    key={catalog.id}
                    type="button"
                    className={catalog.id === activeCatalogId ? 'active' : ''}
                    onClick={() => setActiveCatalogId(catalog.id)}
                  >
                    <span>
                      <strong>{catalog.name}</strong>
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
                    <h2>{activeCatalog.name}</h2>
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
                        <article key={card.id} className="tus-pearl-library-card in-catalog catalog-card-row">
                          <div className="catalog-card-content">
                            <span className="catalog-card-branch">{getBranchName(card.branchId)}</span>
                            <strong className="catalog-card-question"><GlossaryText text={card.front} enabled revealMode="preAnswer" maxTerms={2} /></strong>
                          </div>
                          <div className="pearl-card-row-actions catalog-card-action">
                            {card.source === 'user' ? <button type="button" className="btn btn-secondary compact catalog-edit-action" onClick={() => openEditor({ mode: 'edit', card, defaultCatalogId: activeCatalog.id })}>Düzenle</button> : null}
                            <button type="button" className="btn btn-icon quiet catalog-delete-action" onClick={() => requestCardDelete(card, 'catalog-list')} aria-label="Kartı sil" title="Kartı sil">
                              <Icon name="Trash2" />
                            </button>
                            <button type="button" className="btn btn-icon quiet catalog-remove-action" onClick={() => removeCardFromCatalog(card.id)} aria-label="Kartı katalogdan çıkar" title="Katalogdan çıkar">
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
                      <article key={card.id} className="tus-pearl-library-card catalog-card-row">
                        <div className="catalog-card-content">
                          <span className="catalog-card-branch">{getBranchName(card.branchId)}</span>
                          <strong className="catalog-card-question"><GlossaryText text={card.front} enabled revealMode="preAnswer" maxTerms={2} /></strong>
                        </div>
                        <div className="pearl-card-row-actions catalog-card-action">
                          {card.source === 'user' ? <button type="button" className="btn btn-secondary compact catalog-edit-action" onClick={() => openEditor({ mode: 'edit', card, defaultCatalogId: activeCatalog.id })}>Düzenle</button> : null}
                          {activeCatalog?.cardIds?.includes(card.id) ? (
                            <button type="button" className="btn btn-secondary compact catalog-added-action" disabled>Eklendi</button>
                          ) : (
                            <button type="button" className="btn btn-secondary compact catalog-add-action" onClick={() => addCardToCatalog(card.id)}>Kataloğa ekle</button>
                          )}
                          <button type="button" className="btn btn-icon quiet catalog-delete-action" onClick={() => requestCardDelete(card, 'library-list')} aria-label="Kartı sil" title="Kartı sil">
                            <Icon name="Trash2" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="tus-pearl-study-empty compact actionable-empty">
                <Icon name="LayeredCards" />
                <strong>Katalog seç veya oluştur.</strong>
                <p>Kendi tekrar setlerini oluşturabilir veya tüm kart havuzuna dönebilirsin.</p>
                <div className="empty-action-row">
                  <button type="button" className="btn btn-primary compact" onClick={() => { setViewMode('study'); setFilter('all'); setBranchFilter('all'); lastDeckSignature.current = ''; }}>Tüm kartlara geç</button>
                </div>
              </div>
            )}
          </section>
        </main>
      ) : (
        <div className="pearl-study-workspace-v92">
          <section className="pearl-study-left-v92" aria-label="Kart çalışma alanı">
            <main className="tus-pearl-study-main pearl-study-stage pearl-study-stage-v92">
            <button type="button" className="tus-pearl-side-nav pearl-study-nav-button" onClick={() => moveCard(-1)} aria-label="Önceki kart">‹</button>

            <div className="pearl-study-spotlight">
              {activeCard ? (
                <article
                  className={`tus-pearl-focus-card card-surface pearl-study-premium-card ${activeFrontDensityClass} ${activeBackDensityClass} ${flipped ? 'is-flipped' : ''} motion-${motion}`.trim()}
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                >
                  <button type="button" className="tus-pearl-focus-flip" onClick={() => setFlipped((current) => !current)} aria-pressed={flipped}>
                    <span className="tus-pearl-focus-face tus-pearl-focus-front pearl-card-face">
                      <span className="pearl-card-question-block">
                        <strong><GlossaryText text={activeCardContent.frontText || activeCard.front} enabled revealMode="preAnswer" maxTerms={3} /></strong>
                      </span>

                      <span className="pearl-card-face-footer minimal">
                        <span className="pearl-card-branch-pill">{activeCardBranchName}</span>
                        <span className="pearl-card-progress-pill">{sessionCards.length ? `${currentIndex + 1} / ${sessionCards.length}` : '0 / 0'}</span>
                      </span>
                    </span>

                    <span className="tus-pearl-focus-face tus-pearl-focus-back pearl-card-face">
                      <span className="tus-pearl-back-stack focus pearl-back-premium-stack">
                        <span className="tus-pearl-answer-block focus pearl-answer-panel">
                          <span className="tus-pearl-back-kicker">Yanıt</span>
                          <strong className={activeCardContent.isCompactBack ? 'compact' : ''}><GlossaryText text={activeCardContent.backText} enabled revealMode="postAnswer" maxTerms={3} /></strong>
                        </span>
                        {activeCardContent.detailText ? (
                          <span className="tus-pearl-detail-block focus pearl-detail-panel">
                            <span className="tus-pearl-back-kicker muted">Kısa gerekçe</span>
                            <span className="tus-pearl-detail-text"><GlossaryText text={activeCardContent.detailText} enabled revealMode="postAnswer" maxTerms={3} /></span>
                          </span>
                        ) : null}
                        {activeCardContent.tusTipText ? (
                          <span className="tus-pearl-answer-chain focus pearl-tip-panel" role="note" aria-label="TUS ipucu">
                            <span className="tus-pearl-back-kicker muted">TUS ipucu</span>
                            <span><GlossaryText text={activeCardContent.tusTipText} enabled revealMode="postAnswer" maxTerms={3} /></span>
                          </span>
                        ) : null}
                        {activeCardContent.noteText ? (
                          <span className="tus-pearl-note-box focus pearl-note-panel" role="note" aria-label={activeCardContent.noteLabel || 'Ayırıcı not'}>
                            <span className="tus-pearl-note-box-label">{activeCardContent.noteLabel || 'Ayırıcı not'}</span>
                            <span className="tus-pearl-note-box-text"><GlossaryText text={activeCardContent.noteText} enabled revealMode="postAnswer" maxTerms={3} /></span>
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </button>
                </article>
              ) : (
                <div className="tus-pearl-study-empty card-surface personal-empty-state">
                  <Icon name={filter === 'catalog' ? 'ClipboardList' : emptyState.icon || 'LayeredCards'} />
                  <strong>{filter === 'catalog' ? 'Bu katalogda çalışılacak kart yok.' : emptyState.emptyTitle}</strong>
                  <p>{filter === 'catalog' ? 'Tüm kart havuzundan kart seçebilir veya bu kataloğa özel kendi kartını oluşturabilirsin.' : emptyState.emptyDescription}</p>
                  <div className="empty-action-row">
                    <button type="button" className="btn btn-primary compact" onClick={() => openRepeatList('all')}>Tüm kartları çalış</button>
                    {filter === 'catalog' ? (
                      <button type="button" className="btn btn-secondary compact" onClick={() => setViewMode('catalogs')}>Bu kataloğa kart ekle</button>
                    ) : null}
                    {filter !== 'catalog' ? (
                      <button type="button" className="btn btn-secondary compact" onClick={() => setViewMode('catalogs')}>Katalogları yönet</button>
                    ) : null}
                    <button type="button" className="btn btn-secondary compact" onClick={() => openEditor({ mode: 'create', defaultCatalogId: activeCatalogId })}>Kendi kartını oluştur</button>
                  </div>
                </div>
              )}

              <div className="pearl-study-answer-dock-v93" aria-label="Kart öğrenme kararı">
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
            </div>

            <button type="button" className="tus-pearl-side-nav pearl-study-nav-button" onClick={() => moveCard(1)} aria-label="Sonraki kart">›</button>
            </main>
          </section>

          <aside className="pearl-study-right-v92 pearl-study-control-panel-v93 card-surface" aria-label="Hap kart çalışma paneli">
            <section className="pearl-study-control-section-v93" aria-label="Tekrar araçları">
              <div className="pearl-study-section-title-v93">
                <Icon name="LayeredCards" size={16} />
                <span>Tekrar Araçları</span>
              </div>
              <nav className="pearl-study-tabs pearl-study-list-grid-v93 pearl-study-row-list-v97" aria-label="Ana tekrar araçları">
                {primaryRepeatItems.map((item) => {
                  const display = getPrimaryRepeatDisplay(item);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={viewMode === 'study' && filter === item.filter ? 'active' : ''}
                      onClick={() => openRepeatList(item)}
                    >
                      <Icon name={display.icon} size={16} />
                      <span>
                        <strong>{display.title}</strong>
                      </span>
                      <em>{item.count}</em>
                    </button>
                  );
                })}
              </nav>
            </section>

            <section className="pearl-study-control-section-v93" aria-label="Oturum kontrolleri">
              <div className="pearl-study-section-title-v93">
                <Icon name="RotateCcw" size={16} />
                <span>Oturum</span>
              </div>
              <div className="pearl-study-compact-actions pearl-study-session-actions-v93">
                <PearlStudyCatalogsMenu
                  catalogs={pearlState.customCatalogs}
                  activeCatalogId={activeCatalogId}
                  viewMode={viewMode}
                  onManageCatalogs={() => setViewMode('catalogs')}
                  onOpenCatalog={openCatalogForStudy}
                />

                <button type="button" className="btn btn-secondary compact pearl-reshuffle-button" onClick={() => rebuildStudySession(filteredCards)}>
                  <Icon name="RotateCcw" size={15} />
                  <span>Yeni sıra</span>
                </button>

                <PearlStudyMoreMenu
                  active={isSecondaryListActive}
                  filter={filter}
                  viewMode={viewMode}
                  items={secondaryRepeatItems}
                  onOpenRepeatList={openRepeatList}
                />
              </div>
            </section>

            <section className="pearl-study-control-section-v93 pearl-study-tools-section-v93" aria-label="Kart araçları">
              <div className="pearl-study-section-title-v93">
                <Icon name="Sparkles" size={16} />
                <span>Kart Araçları</span>
              </div>
              <div className="tus-pearl-study-secondary-actions pearl-study-secondary-grid pearl-study-tools-grid-v93" aria-label="Kart organizasyon aksiyonları">
                <button type="button" className={isFavorite ? 'active' : ''} onClick={() => activeCard && commitState((current) => ({ ...current, favoritePearlCardIds: toggleId(current.favoritePearlCardIds, activeCard.id) }))} disabled={!activeCard}>
                  <Icon name="Sparkles" size={15} />
                  <span><strong>{isFavorite ? 'Favoriden Çıkart' : 'Favoriye Ekle'}</strong></span>
                </button>
                <div className="pearl-catalog-popover-wrap">
                  <button type="button" className={isInAnyCatalog ? 'active' : ''} onClick={() => setCatalogMenuOpen((value) => !value)} disabled={!activeCard}>
                    <Icon name="LayeredCards" size={15} />
                    <span><strong>Kataloğa Ekle</strong></span>
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
                  <span><strong>Kendi Kartını Oluştur</strong></span>
                </button>
                {activeCard?.source === 'user' ? (
                  <>
                    <button type="button" onClick={() => openEditor({ mode: 'edit', card: activeCard, defaultCatalogId: activeCatalogId })}>
                      <Icon name="Notes" size={15} />
                      <span><strong>Kartı Düzenle</strong></span>
                    </button>
                    <button type="button" onClick={() => requestCardDelete(activeCard, 'study-tools')}>
                      <Icon name="Trash2" size={15} />
                      <span><strong>Kartı Sil</strong></span>
                    </button>
                  </>
                ) : activeCard ? (
                  <>
                    <button type="button" onClick={() => openEditor({ mode: 'copy', card: activeCard, defaultCatalogId: activeCatalogId })}>
                      <Icon name="User" size={15} />
                      <span><strong>Kendi Kartıma Kopyala</strong></span>
                    </button>
                    <button type="button" onClick={() => requestCardDelete(activeCard, 'study-tools')}>
                      <Icon name="Trash2" size={15} />
                      <span><strong>Kartı Sil</strong></span>
                    </button>
                  </>
                ) : null}
              </div>
            </section>
          </aside>
        </div>
      )}

      {confirmDeleteState.open && confirmDeleteState.card ? (
        <div className="pearl-confirm-overlay" role="presentation" onClick={closeDeleteConfirm}>
          <div className="pearl-confirm-dialog card-surface" role="alertdialog" aria-modal="true" aria-labelledby="pearl-delete-title" aria-describedby="pearl-delete-description" onClick={(event) => event.stopPropagation()}>
            <div className="pearl-confirm-dialog-head">
              <span className="pearl-confirm-icon" aria-hidden="true"><Icon name="Trash2" size={18} /></span>
              <div>
                <h3 id="pearl-delete-title">Kartı sil</h3>
                <p id="pearl-delete-description">
                  {confirmDeleteState.card.source === 'user'
                    ? 'Bu kişisel kart kalıcı olarak silinecek ve kayıtlı olduğu kataloglardan da kaldırılacak.'
                    : 'Bu sistem kartı senin görünümünden kaldırılacak; kataloglardan ve çalışma listelerinden de çıkarılacak.'}
                </p>
              </div>
            </div>
            <div className="pearl-confirm-card-preview">
              <span className="catalog-card-branch">{getBranchName(confirmDeleteState.card.branchId)}</span>
              <strong><GlossaryText text={confirmDeleteState.card.front} enabled revealMode="preAnswer" maxTerms={2} /></strong>
            </div>
            <div className="pearl-confirm-actions">
              <button type="button" className="btn btn-secondary compact" onClick={closeDeleteConfirm}>Vazgeç</button>
              <button type="button" className="btn btn-primary compact pearl-danger-button" onClick={() => deleteCard(confirmDeleteState.card)}>Sil</button>
            </div>
          </div>
        </div>
      ) : null}

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
