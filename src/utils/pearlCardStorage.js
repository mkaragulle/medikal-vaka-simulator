export const PEARL_STORAGE_KEY = 'klinikiq-pearl-card-progress-v1';

export const defaultPearlState = {
  favoritePearlCardIds: [],
  wrongPearlCardIds: [],
  knownPearlCardIds: [],
  reviewPearlCardIds: [],
  customCatalogs: [],
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

function normalizeCatalogs(catalogs = []) {
  return (Array.isArray(catalogs) ? catalogs : []).map((catalog, index) => ({
    id: catalog.id || `catalog-${Date.now()}-${index}`,
    name: String(catalog.name || `Katalog ${index + 1}`).trim() || `Katalog ${index + 1}`,
    cardIds: normalizeIds(catalog.cardIds),
    createdAt: catalog.createdAt || new Date().toISOString(),
  }));
}

export function normalizePearlState(value = {}) {
  return {
    favoritePearlCardIds: normalizeIds(value.favoritePearlCardIds),
    wrongPearlCardIds: normalizeIds(value.wrongPearlCardIds),
    knownPearlCardIds: normalizeIds(value.knownPearlCardIds),
    reviewPearlCardIds: normalizeIds(value.reviewPearlCardIds),
    customCatalogs: normalizeCatalogs(value.customCatalogs),
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
