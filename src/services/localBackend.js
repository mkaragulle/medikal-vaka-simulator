const PREFIX = 'klinikiq:';

const memoryValues = new Map();
const pendingWrites = new Map();
let pendingFlushTimer = 0;
let pendingIdleFlushId = 0;
let flushListenersAttached = false;

function key(name) {
  return `${PREFIX}${name}`;
}

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function persistPendingWrites() {
  if (typeof window === 'undefined') return;
  if (pendingIdleFlushId && typeof window.cancelIdleCallback === 'function') {
    window.cancelIdleCallback(pendingIdleFlushId);
  }
  if (pendingFlushTimer) window.clearTimeout(pendingFlushTimer);
  pendingIdleFlushId = 0;
  pendingFlushTimer = 0;

  if (!pendingWrites.size) return;
  const writes = Array.from(pendingWrites.entries());
  pendingWrites.clear();

  writes.forEach(([storageKey, value]) => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // Private browsing/quota failures should never break UI interaction.
    }
  });
}

function ensureFlushListeners() {
  if (typeof window === 'undefined' || flushListenersAttached) return;
  flushListenersAttached = true;
  window.addEventListener('pagehide', persistPendingWrites, { capture: true });
  window.addEventListener('beforeunload', persistPendingWrites, { capture: true });
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') persistPendingWrites();
    }, { capture: true });
  }
}

function schedulePersist() {
  if (typeof window === 'undefined') return;
  ensureFlushListeners();

  if (pendingIdleFlushId && typeof window.cancelIdleCallback === 'function') {
    window.cancelIdleCallback(pendingIdleFlushId);
  }
  if (pendingFlushTimer) window.clearTimeout(pendingFlushTimer);

  if (typeof window.requestIdleCallback === 'function') {
    pendingIdleFlushId = window.requestIdleCallback(() => {
      pendingIdleFlushId = 0;
      persistPendingWrites();
    }, { timeout: 1200 });
  } else {
    pendingFlushTimer = window.setTimeout(() => {
      pendingFlushTimer = 0;
      persistPendingWrites();
    }, 120);
  }
}

export const localBackend = {
  read(name, fallback) {
    if (typeof window === 'undefined') return fallback;
    const storageKey = key(name);
    if (memoryValues.has(storageKey)) return memoryValues.get(storageKey);
    const parsed = safeParse(window.localStorage.getItem(storageKey), fallback);
    memoryValues.set(storageKey, parsed);
    return parsed;
  },

  write(name, value) {
    if (typeof window === 'undefined') return;
    const storageKey = key(name);
    memoryValues.set(storageKey, value);
    pendingWrites.set(storageKey, value);
    schedulePersist();
  },

  remove(name) {
    if (typeof window === 'undefined') return;
    const storageKey = key(name);
    memoryValues.delete(storageKey);
    pendingWrites.delete(storageKey);
    window.localStorage.removeItem(storageKey);
  },

  flush() {
    persistPendingWrites();
  },

  readNote(caseId) {
    return this.read(`notes:${caseId}`, '');
  },

  writeNote(caseId, note) {
    this.write(`notes:${caseId}`, note);
  },

  readExamHistory() {
    return this.read('exam-history', []);
  },

  writeExamHistory(history) {
    this.write('exam-history', history);
  },

  readSessionStats(fallback) {
    return this.read('session-stats', fallback);
  },

  writeSessionStats(stats) {
    this.write('session-stats', stats);
  },

  readTheme() {
    return this.read('theme', 'dark');
  },

  writeTheme(theme) {
    this.write('theme', theme);
  },
};
