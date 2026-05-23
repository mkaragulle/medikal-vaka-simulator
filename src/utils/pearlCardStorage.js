import { normalizePearlCardFields } from './pearlCardContent.js';

export const PEARL_STORAGE_KEY = 'klinikiq-pearl-card-progress-v1';

export const defaultPearlState = {
  favoritePearlCardIds: [],
  wrongPearlCardIds: [],
  knownPearlCardIds: [],
  reviewPearlCardIds: [],
  customCatalogs: [],
  userPearlCards: [],
  hiddenPearlCardIds: [],
  recentStudyStarts: {},
};

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeIds(ids = []) {
  return Array.from(new Set((ids || []).map((id) => String(id || '').trim()).filter(Boolean)));
}

function normalizeString(value, fallback = '') {
  return String(value || fallback).trim();
}

function normalizeCatalogs(catalogs = []) {
  return (Array.isArray(catalogs) ? catalogs : []).map((catalog, index) => ({
    id: catalog.id || `catalog-${Date.now()}-${index}`,
    name: normalizeString(catalog.name, `Katalog ${index + 1}`) || `Katalog ${index + 1}`,
    description: normalizeString(catalog.description),
    cardIds: normalizeIds(catalog.cardIds),
    createdAt: catalog.createdAt || new Date().toISOString(),
    updatedAt: catalog.updatedAt || catalog.createdAt || new Date().toISOString(),
    lastStudiedAt: catalog.lastStudiedAt || '',
  }));
}

export function createUserPearlCardId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return `user-card-${crypto.randomUUID()}`;
  return `user-card-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeArrayText(value = []) {
  if (Array.isArray(value)) return Array.from(new Set(value.map((item) => normalizeString(item)).filter(Boolean)));
  return Array.from(new Set(String(value || '').split(',').map((item) => normalizeString(item)).filter(Boolean)));
}

export function normalizeUserPearlCard(card = {}, index = 0) {
  const now = new Date().toISOString();
  const structured = normalizePearlCardFields({
    ...card,
    front: normalizeString(card.front),
    back: normalizeString(card.back || card.answer),
    answer: normalizeString(card.answer || card.back),
    explanation: normalizeString(card.explanation),
    tusTip: normalizeString(card.tusTip),
    differentialNote: normalizeString(card.differentialNote),
  });
  return {
    id: card.id || `user-card-migrated-${index}-${Date.now()}`,
    source: 'user',
    createdAt: card.createdAt || now,
    updatedAt: card.updatedAt || card.createdAt || now,
    branchId: normalizeString(card.branchId, 'tus-spot-olgular') || 'tus-spot-olgular',
    subject: normalizeString(card.subject),
    topic: normalizeString(card.topic),
    front: structured.front,
    back: structured.back,
    answer: structured.answer,
    explanation: structured.explanation,
    tusTip: structured.tusTip,
    differentialNote: structured.differentialNote,
    keywords: normalizeArrayText(card.keywords),
    tags: normalizeArrayText(card.tags),
    difficulty: normalizeString(card.difficulty, 'orta') || 'orta',
    catalogIds: normalizeIds(card.catalogIds),
    appearedYears: Array.isArray(card.appearedYears) ? card.appearedYears.map((year) => String(year).trim()).filter(Boolean) : normalizeArrayText(card.appearedYears),
    isPastQuestionDerived: Boolean(card.isPastQuestionDerived),
    cardType: normalizeString(card.cardType, 'Kişisel kart') || 'Kişisel kart',
    status: normalizeString(card.status, 'new') || 'new',
  };
}

function normalizeUserCards(cards = []) {
  return (Array.isArray(cards) ? cards : [])
    .map(normalizeUserPearlCard)
    .filter((card) => card.front && card.back);
}

function normalizeRecentStudyStarts(value = {}) {
  if (!value || typeof value !== 'object') return {};
  return Object.fromEntries(Object.entries(value).map(([key, ids]) => [key, normalizeIds(ids).slice(0, 120)]));
}

export function normalizePearlState(value = {}) {
  return {
    favoritePearlCardIds: normalizeIds(value.favoritePearlCardIds),
    wrongPearlCardIds: normalizeIds(value.wrongPearlCardIds),
    knownPearlCardIds: normalizeIds(value.knownPearlCardIds),
    reviewPearlCardIds: normalizeIds(value.reviewPearlCardIds),
    customCatalogs: normalizeCatalogs(value.customCatalogs),
    userPearlCards: normalizeUserCards(value.userPearlCards),
    hiddenPearlCardIds: normalizeIds(value.hiddenPearlCardIds),
    recentStudyStarts: normalizeRecentStudyStarts(value.recentStudyStarts),
  };
}

export function loadPearlState() {
  if (typeof window === 'undefined') return defaultPearlState;
  return normalizePearlState(safeParse(window.localStorage.getItem(PEARL_STORAGE_KEY), defaultPearlState));
}

export function savePearlState(state) {
  const normalized = normalizePearlState(state);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(PEARL_STORAGE_KEY, JSON.stringify(normalized));
  }
  return normalized;
}

export function toggleId(ids = [], id) {
  const set = new Set(normalizeIds(ids));
  if (set.has(id)) set.delete(id);
  else set.add(id);
  return Array.from(set);
}

export function addId(ids = [], id) {
  return Array.from(new Set([...normalizeIds(ids), id].filter(Boolean)));
}

export function removeId(ids = [], id) {
  return normalizeIds(ids).filter((item) => item !== id);
}

export function upsertUserPearlCard(cards = [], nextCard = {}) {
  const normalized = normalizeUserPearlCard({ ...nextCard, updatedAt: new Date().toISOString() });
  const exists = (cards || []).some((card) => card.id === normalized.id);
  if (!exists) return [...normalizeUserCards(cards), normalized];
  return normalizeUserCards(cards).map((card) => (card.id === normalized.id ? { ...card, ...normalized } : card));
}

export function removeUserPearlCard(cards = [], cardId) {
  return normalizeUserCards(cards).filter((card) => card.id !== cardId);
}

export function markCatalogStudied(catalogs = [], catalogId) {
  if (!catalogId) return normalizeCatalogs(catalogs);
  const now = new Date().toISOString();
  return normalizeCatalogs(catalogs).map((catalog) => (
    catalog.id === catalogId ? { ...catalog, lastStudiedAt: now, updatedAt: now } : catalog
  ));
}

export function rememberStudyStart(recentStudyStarts = {}, key = 'all', cardIds = []) {
  const safeKey = normalizeString(key, 'all') || 'all';
  const normalizedStarts = normalizeRecentStudyStarts(recentStudyStarts);
  const nextIds = normalizeIds(cardIds).slice(0, 20);
  const previousIds = normalizedStarts[safeKey] || [];
  const mergedIds = [...nextIds, ...previousIds.filter((id) => !nextIds.includes(id))].slice(0, 120);
  return {
    ...normalizedStarts,
    [safeKey]: mergedIds,
  };
}
