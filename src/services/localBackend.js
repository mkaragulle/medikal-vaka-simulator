const PREFIX = 'medsim-pro:';

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

export const localBackend = {
  read(name, fallback) {
    if (typeof window === 'undefined') return fallback;
    return safeParse(window.localStorage.getItem(key(name)), fallback);
  },

  write(name, value) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key(name), JSON.stringify(value));
  },

  remove(name) {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key(name));
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
