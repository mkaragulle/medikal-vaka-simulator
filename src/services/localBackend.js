const PREFIX = 'klinikiq:';

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

const pendingWrites = new Map();
let flushListenersAttached = false;

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function writePayload(storageKey, payload) {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(storageKey, payload);
  } catch {
    // Storage can be unavailable in private mode or quota-limited contexts.
  }
}

function attachFlushListeners() {
  if (!canUseStorage() || flushListenersAttached) return;
  flushListenersAttached = true;
  const flush = () => localBackend.flushDeferredWrites();
  window.addEventListener('pagehide', flush, { capture: true });
  window.addEventListener('beforeunload', flush, { capture: true });
  document?.addEventListener?.('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  }, { capture: true });
}

export const localBackend = {
  read(name, fallback) {
    if (!canUseStorage()) return fallback;
    const storageKey = key(name);
    const pending = pendingWrites.get(storageKey);
    return safeParse(pending?.payload ?? window.localStorage.getItem(storageKey), fallback);
  },

  write(name, value) {
    if (!canUseStorage()) return;
    const storageKey = key(name);
    const pending = pendingWrites.get(storageKey);
    if (pending?.timer) window.clearTimeout(pending.timer);
    if (pending?.idleId && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(pending.idleId);
    pendingWrites.delete(storageKey);
    writePayload(storageKey, JSON.stringify(value));
  },

  writeDeferred(name, value, { delay = 90, timeout = 900 } = {}) {
    if (!canUseStorage()) return;
    attachFlushListeners();
    const storageKey = key(name);
    const previous = pendingWrites.get(storageKey);
    if (previous?.timer) window.clearTimeout(previous.timer);
    if (previous?.idleId && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(previous.idleId);

    const payload = JSON.stringify(value);
    const flushOne = () => {
      const current = pendingWrites.get(storageKey);
      if (!current) return;
      if (current.timer) window.clearTimeout(current.timer);
      if (current.idleId && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(current.idleId);
      pendingWrites.delete(storageKey);
      writePayload(storageKey, current.payload);
    };

    const next = { payload, timer: 0, idleId: 0 };
    pendingWrites.set(storageKey, next);

    if (typeof window.requestIdleCallback === 'function') {
      next.idleId = window.requestIdleCallback(flushOne, { timeout });
    } else {
      next.timer = window.setTimeout(flushOne, delay);
    }
  },

  flushDeferredWrites() {
    if (!canUseStorage()) return;
    for (const [storageKey, pending] of pendingWrites.entries()) {
      if (pending.timer) window.clearTimeout(pending.timer);
      if (pending.idleId && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(pending.idleId);
      writePayload(storageKey, pending.payload);
      pendingWrites.delete(storageKey);
    }
  },

  remove(name) {
    if (!canUseStorage()) return;
    const storageKey = key(name);
    const pending = pendingWrites.get(storageKey);
    if (pending?.timer) window.clearTimeout(pending.timer);
    if (pending?.idleId && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(pending.idleId);
    pendingWrites.delete(storageKey);
    window.localStorage.removeItem(storageKey);
  },

  readNote(caseId) {
    return this.read(`notes:${caseId}`, '');
  },

  writeNote(caseId, note) {
    this.writeDeferred(`notes:${caseId}`, note, { delay: 120, timeout: 700 });
  },

  readExamHistory() {
    return this.read('exam-history', []);
  },

  writeExamHistory(history) {
    this.writeDeferred('exam-history', history);
  },

  readSessionStats(fallback) {
    return this.read('session-stats', fallback);
  },

  writeSessionStats(stats) {
    this.writeDeferred('session-stats', stats);
  },

  readTheme() {
    return this.read('theme', 'dark');
  },

  writeTheme(theme) {
    this.write('theme', theme);
  },
};
