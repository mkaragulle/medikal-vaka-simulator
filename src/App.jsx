import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './index.css';
import './styles/klinikiq-system.css';
import './styles/klinikiq-refine.css';
import './styles/klinikiq-dark-mode-system.css';
import BranchSelector from './components/BranchSelector.jsx';
import CaseList from './components/CaseList.jsx';
import WrongAnswersFullPage from './components/WrongAnswersFullPage.jsx';
import HomeCommandCenter from './components/HomeCommandCenter.jsx';
import AuthPanel from './components/AuthPanel.jsx';
import { Icon, BrandMark, ThemeToggle, BranchTransitionVisual, branchIconById } from './components/ui.jsx';
import { branches } from './data/branches.js';
import { cases, getCaseById } from './data/cases.js';
import { scoreAttempt, calculateAccuracy } from './utils/scoring.js';
import { pickRandom, shuffleArray } from './utils/randomize.js';
import { localBackend } from './services/localBackend.js';
import { createAIQuestion } from './services/aiQuestionService.js';
import { listAIQuestionBranches } from './utils/aiQuestionGenerator.js';
import { isGoogleAuthConfigured, signInWithGoogle } from './services/googleAuth.js';

const CasePlayer = lazy(() => import('./components/CasePlayer.jsx'));
const KomiteModeWorkspace = lazy(() => import('./components/KomiteModeWorkspace.jsx'));
const StudyReviewHub = lazy(() => import('./components/StudyReviewHub.jsx'));
const TusPearlStudyScreen = lazy(() => import('./components/TusPearlStudyScreen.jsx'));
const ExamResults = lazy(() => import('./components/ExamResults.jsx'));
const AIGeneratedQuestionView = lazy(() => import('./components/AIGeneratedQuestionView.jsx'));

const STATS_STORAGE_KEY = 'klinikiq-session-stats-v2';
const EXAM_HISTORY_STORAGE_KEY = 'klinikiq-exam-history-v2';
const THEME_STORAGE_KEY = 'klinikiq-theme-v1';
const AI_PRACTICE_STATS_STORAGE_KEY = 'klinikiq-ai-practice-stats-v1';
const AI_BRANCH_FILTER_STORAGE_KEY = 'klinikiq-ai-branch-filter-v1';
const AI_DIFFICULTY_STORAGE_KEY = 'klinikiq-ai-difficulty-v1';
const BRANCH_TRANSITION_MS = 560;
const BRANCH_TRANSITION_FADE_MS = 150;
const USERS_STORAGE_KEY = 'klinikiq-auth-users-v1';
const CURRENT_USER_STORAGE_KEY = 'klinikiq-auth-current-user-v1';
const PRODUCT_MODE_STORAGE_KEY = 'klinikiq-product-mode-v1';
const SOLVED_CASES_STORAGE_KEY = 'klinikiq-solved-cases-v1';
const BRANCH_DIFFICULTY_OPTIONS = ['Kolay', 'Orta', 'Zor', 'Acil'];

const DEMO_CASE_IDS = [
  'tus-spot-forensic-stab-wound-001',
  'cv-anterior-stemi-001',
  'im-dka-001',
  'neuro-mca-stroke-001',
  'ped-intussusception-001',
  'surg-appendicitis-001',
];

const DEMO_EXAM_TITLE = `${DEMO_CASE_IDS.length} vakalık ücretsiz demo blok`;

const defaultStats = {
  attempts: 0,
  correct: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  accuracy: 0,
  trend: [],
};

const defaultAIPracticeStats = {
  attempts: 0,
  correct: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
};

const defaultAIPracticeState = {
  active: false,
  question: null,
  loading: false,
  error: null,
  generationSource: null,
  usedRemoteAI: false,
  fallback: false,
};

function loadStoredValue(key, fallback) {
  return localBackend.read(key, fallback);
}

function normalizeEmail(email = '') {
  return String(email).trim().toLocaleLowerCase('tr');
}

function buildUserId(email = '') {
  return normalizeEmail(email).replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || `user-${Date.now()}`;
}

function loadUsers() {
  return localBackend.read(USERS_STORAGE_KEY, []);
}

function saveUsers(users) {
  localBackend.write(USERS_STORAGE_KEY, users);
}

function loadCurrentUser() {
  const currentUserId = localBackend.read(CURRENT_USER_STORAGE_KEY, null);
  if (!currentUserId) return null;
  return loadUsers().find((user) => user.id === currentUserId) ?? null;
}

function sanitizeUser(user) {
  if (!user) return null;
  return {
    ...user,
    stats: user.stats ?? defaultStats,
    examHistory: Array.isArray(user.examHistory) ? user.examHistory : [],
    wrongAnswers: Array.isArray(user.wrongAnswers) ? user.wrongAnswers : [],
    solvedCaseIds: Array.isArray(user.solvedCaseIds) ? user.solvedCaseIds : [],
  };
}

function isDemoAccount(user) {
  return Boolean(user?.isDemo || user?.provider === 'demo');
}

function resolveDemoCases() {
  return DEMO_CASE_IDS.map((caseId) => getCaseById(caseId)).filter(Boolean);
}

function buildExamPool(sourceCases = [], maxQuestionCount = 10, fallbackCases = cases) {
  const safeSource = Array.isArray(sourceCases) ? sourceCases.filter(Boolean) : [];
  const safeFallback = Array.isArray(fallbackCases) ? fallbackCases.filter(Boolean) : [];
  const targetCount = Math.min(maxQuestionCount, Math.max(safeSource.length, safeFallback.length));
  const primary = shuffleArray(safeSource).slice(0, Math.min(targetCount, safeSource.length));
  if (primary.length >= targetCount) return primary;

  const usedIds = new Set(primary.map((item) => item.id));
  const backup = shuffleArray(safeFallback)
    .filter((item) => !usedIds.has(item.id))
    .slice(0, targetCount - primary.length);
  return [...primary, ...backup];
}

function resolveBranchById(branchId) {
  return branches.find((branch) => branch.id === branchId) ?? null;
}

function getUserMotionPreference() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scrollToTopSmart({ smooth = false } = {}) {
  if (typeof window === 'undefined') return;
  const behavior = smooth && !getUserMotionPreference() ? 'smooth' : 'auto';
  window.scrollTo({ top: 0, behavior });
}

function buildAccessibleCaseIndex(accessibleCases = []) {
  const byId = new Map();
  const byBranchId = new Map();

  accessibleCases.forEach((clinicalCase) => {
    byId.set(clinicalCase.id, clinicalCase);
    if (!byBranchId.has(clinicalCase.branchId)) byBranchId.set(clinicalCase.branchId, []);
    byBranchId.get(clinicalCase.branchId).push(clinicalCase);
  });

  return { byId, byBranchId, ids: new Set(byId.keys()) };
}

const AI_WRONG_ANSWER_SOURCE = 'ai-generated-question';

function isAIWrongAnswerEntry(entry) {
  return Boolean(
    entry?.sourceType === AI_WRONG_ANSWER_SOURCE
      || entry?.questionSnapshot
      || String(entry?.caseId || '').startsWith('ai-spot')
      || entry?.branchId === 'tus-spot-olgular',
  );
}

function toPlainStoredQuestion(clinicalCase) {
  try {
    return JSON.parse(JSON.stringify(clinicalCase));
  } catch {
    return null;
  }
}

function compactText(value = '', limit = 150) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).replace(/\s+\S*$/u, '').trim()}…`;
}


function normalizeSearchText(value = '') {
  return String(value || '')
    .toLocaleLowerCase('tr')
    .replace(/[ıİ]/g, 'i')
    .replace(/[şŞ]/g, 's')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9β₂αğüşöçıİŞĞÜÖÇ\s-]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function collectCaseSearchText(value, bucket = []) {
  if (value == null) return bucket;
  if (typeof value === 'string' || typeof value === 'number') {
    const text = String(value).trim();
    if (text) bucket.push(text);
    return bucket;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectCaseSearchText(item, bucket));
    return bucket;
  }
  if (typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => {
      if (['id', 'branchId', 'caseType'].includes(key)) return;
      collectCaseSearchText(item, bucket);
    });
  }
  return bucket;
}

function getCaseSearchTitle(clinicalCase = {}) {
  return compactText(
    clinicalCase.cardTitle
      || clinicalCase.listTitle
      || clinicalCase.menuTitle
      || clinicalCase.displayTitle
      || clinicalCase.title
      || clinicalCase.learningTarget
      || clinicalCase.clinicalFocus
      || clinicalCase.question
      || clinicalCase.diagnosis?.question
      || '',
    120,
  );
}

function getCaseSearchScore(clinicalCase = {}, rawQuery = '') {
  const query = normalizeSearchText(rawQuery);
  if (!query) return 1;

  const tokens = query.split(' ').filter((token) => token.length > 1);
  if (!tokens.length) return 1;

  const titleText = normalizeSearchText(getCaseSearchTitle(clinicalCase));
  const keywordText = normalizeSearchText([
    clinicalCase.keywords,
    clinicalCase.searchKeywords,
    clinicalCase.tags,
    clinicalCase.learningTarget,
    clinicalCase.clinicalFocus,
    clinicalCase.relatedBranch,
    clinicalCase.branchName,
  ].flat(Infinity).filter(Boolean).join(' '));
  const questionText = normalizeSearchText([clinicalCase.question, clinicalCase.stem, clinicalCase.narrativeStem, clinicalCase.diagnosis?.question].filter(Boolean).join(' '));
  const fullText = normalizeSearchText(collectCaseSearchText(clinicalCase).join(' '));

  if (!fullText) return 0;
  if (!tokens.every((token) => fullText.includes(token))) return 0;

  let score = 10;
  if (titleText.includes(query)) score += 90;
  if (questionText.includes(query)) score += 70;
  if (keywordText.includes(query)) score += 60;
  tokens.forEach((token) => {
    if (titleText.includes(token)) score += 18;
    if (keywordText.includes(token)) score += 14;
    if (questionText.includes(token)) score += 12;
  });
  return score;
}

function filterCasesBySearch(caseItems = [], query = '') {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return caseItems;

  return caseItems
    .map((clinicalCase, index) => ({ clinicalCase, index, score: getCaseSearchScore(clinicalCase, normalizedQuery) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => (b.score - a.score) || (a.index - b.index))
    .map((item) => item.clinicalCase);
}

function normalizeBranchDifficulty(value = '') {
  const normalized = String(value || '').toLocaleLowerCase('tr');
  if (normalized.includes('acil') || normalized.includes('urgent')) return 'Acil';
  if (normalized.includes('zor') || normalized.includes('hard') || normalized.includes('kritik')) return 'Zor';
  if (normalized.includes('kolay') || normalized.includes('easy') || normalized.includes('temel')) return 'Kolay';
  if (normalized.includes('orta') || normalized.includes('medium')) return 'Orta';
  return 'Orta';
}

function matchesBranchDifficulty(clinicalCase = {}, filter = 'all') {
  if (!filter || filter === 'all') return true;
  return normalizeBranchDifficulty(clinicalCase.difficultyTag || clinicalCase.difficulty) === filter;
}

function buildDifficultyCountsForCases(caseItems = []) {
  const counts = Object.fromEntries(BRANCH_DIFFICULTY_OPTIONS.map((option) => [option, 0]));
  caseItems.forEach((clinicalCase) => {
    const level = normalizeBranchDifficulty(clinicalCase.difficultyTag || clinicalCase.difficulty);
    if (Object.prototype.hasOwnProperty.call(counts, level)) counts[level] += 1;
  });
  return counts;
}

function sortCasesBySolvedStatus(caseItems = [], solvedSet = new Set()) {
  return caseItems
    .map((clinicalCase, index) => ({ clinicalCase, index, isSolved: solvedSet.has(clinicalCase.id) }))
    .sort((a, b) => {
      if (a.isSolved !== b.isSolved) return a.isSolved ? 1 : -1;
      return a.index - b.index;
    })
    .map(({ clinicalCase }) => clinicalCase);
}

function buildAIWrongQuestionPreview(clinicalCase = {}) {
  return compactText(
    clinicalCase.question
      || clinicalCase.clinicalFocus
      || clinicalCase.stem
      || clinicalCase.narrativeStem
      || clinicalCase.patientIntro?.historySummary
      || 'AI tarafından üretilen TUS spot sorusu.',
    160,
  );
}

function buildAIWrongTitle(clinicalCase = {}) {
  const branch = clinicalCase.relatedBranch || clinicalCase.branchName || 'TUS';
  const target = compactText(clinicalCase.learningTarget || clinicalCase.clinicalFocus || clinicalCase.question || '', 86);
  return target || `${branch} · AI TUS spot sorusu`;
}



function RouteFallback({ label = 'Arayüz hazırlanıyor…' }) {
  return (
    <section className="route-fallback card-surface" role="status" aria-live="polite">
      <span className="route-fallback-spinner" aria-hidden="true" />
      <strong>{label}</strong>
    </section>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(() => sanitizeUser(loadCurrentUser()));
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [branchDifficultyFilter, setBranchDifficultyFilter] = useState('all');
  const [bottomCaseSearchQuery, setBottomCaseSearchQuery] = useState('');
  const [mode, setMode] = useState('study');
  const [hardMode, setHardMode] = useState(false);
  const [theme, setTheme] = useState(() => loadStoredValue(THEME_STORAGE_KEY, 'light'));
  const [tutorMode, setTutorMode] = useState(true);
  const [sessionStats, setSessionStats] = useState(() => currentUser?.stats ?? loadStoredValue(STATS_STORAGE_KEY, defaultStats));
  const [examHistory, setExamHistory] = useState(() => currentUser?.examHistory ?? loadStoredValue(EXAM_HISTORY_STORAGE_KEY, []));
  const [wrongAnswers, setWrongAnswers] = useState(() => currentUser?.wrongAnswers ?? []);
  const [wrongAnswersPageOpen, setWrongAnswersPageOpen] = useState(false);
  const [solvedCaseIds, setSolvedCaseIds] = useState(() => currentUser?.solvedCaseIds ?? loadStoredValue(SOLVED_CASES_STORAGE_KEY, []));
  const [aiPracticeStats, setAIPracticeStats] = useState(() => loadStoredValue(AI_PRACTICE_STATS_STORAGE_KEY, defaultAIPracticeStats));
  const [aiPracticeState, setAIPracticeState] = useState(defaultAIPracticeState);
  const [pearlStudyState, setPearlStudyState] = useState({ active: false, filter: 'all', branchFilter: 'all', catalogId: '' });
  const [aiBranchFilter, setAIBranchFilter] = useState(() => loadStoredValue(AI_BRANCH_FILTER_STORAGE_KEY, 'random'));
  const [aiDifficulty, setAIDifficulty] = useState(() => loadStoredValue(AI_DIFFICULTY_STORAGE_KEY, 'Orta'));
  const [examState, setExamState] = useState(null);
  const [productMode, setProductMode] = useState(() => loadStoredValue(PRODUCT_MODE_STORAGE_KEY, 'tus'));
  const [clockTick, setClockTick] = useState(Date.now());
  const [isCaseSidebarOpen, setIsCaseSidebarOpen] = useState(true);
  const [branchRouteTransition, setBranchRouteTransition] = useState(null);
  const branchRouteTimers = useRef([]);
  const aiQuestionTimer = useRef(null);
  const latestAIQuestionRequestId = useRef(0);
  const isDemoUser = isDemoAccount(currentUser);

  function clearAIQuestionTimer() {
    latestAIQuestionRequestId.current += 1;
    if (aiQuestionTimer.current) {
      window.clearTimeout(aiQuestionTimer.current);
      aiQuestionTimer.current = null;
    }
  }

  const demoCases = useMemo(() => resolveDemoCases(), []);
  const accessibleCases = useMemo(() => (isDemoUser ? demoCases : cases), [isDemoUser, demoCases]);
  const accessibleCaseIndex = useMemo(() => buildAccessibleCaseIndex(accessibleCases), [accessibleCases]);
  const accessibleCaseIds = accessibleCaseIndex.ids;
  const solvedCaseIdSet = useMemo(() => new Set(solvedCaseIds), [solvedCaseIds]);
  const visibleBranches = useMemo(() => {
    if (!isDemoUser) return branches;
    const branchIds = new Set(accessibleCases.map((clinicalCase) => clinicalCase.branchId));
    return branches.filter((branch) => branchIds.has(branch.id));
  }, [accessibleCases, isDemoUser]);

  const selectedBranch = useMemo(
    () => (selectedBranchId ? resolveBranchById(selectedBranchId) : null),
    [selectedBranchId],
  );

  const rawBranchCases = useMemo(
    () => (selectedBranchId ? accessibleCaseIndex.byBranchId.get(selectedBranchId) ?? [] : []),
    [selectedBranchId, accessibleCaseIndex],
  );

  const branchCases = useMemo(
    () => sortCasesBySolvedStatus(rawBranchCases, solvedCaseIdSet),
    [rawBranchCases, solvedCaseIdSet],
  );

  const branchDifficultyCounts = useMemo(
    () => buildDifficultyCountsForCases(branchCases),
    [branchCases],
  );

  const filteredBranchCases = useMemo(
    () => branchCases.filter((clinicalCase) => matchesBranchDifficulty(clinicalCase, branchDifficultyFilter)),
    [branchCases, branchDifficultyFilter],
  );

  const activeBranchCasePool = filteredBranchCases.length ? filteredBranchCases : branchCases;

  const searchedBranchCasePool = useMemo(
    () => filterCasesBySearch(activeBranchCasePool, bottomCaseSearchQuery),
    [activeBranchCasePool, bottomCaseSearchQuery],
  );

  const hasBottomCaseSearch = Boolean(normalizeSearchText(bottomCaseSearchQuery));

  const selectedCase = useMemo(() => {
    if (examState?.active) {
      const examCaseId = examState.caseIds[examState.currentIndex];
      if (!accessibleCaseIds.has(examCaseId)) return accessibleCases[0] ?? null;
      return accessibleCaseIndex.byId.get(examCaseId) ?? accessibleCases[0] ?? null;
    }
    if (!selectedCaseId) return activeBranchCasePool[0] ?? null;
    if (!accessibleCaseIds.has(selectedCaseId)) return activeBranchCasePool[0] ?? null;
    const candidate = accessibleCaseIndex.byId.get(selectedCaseId);
    if (candidate && activeBranchCasePool.some((clinicalCase) => clinicalCase.id === candidate.id)) return candidate;
    return activeBranchCasePool[0] ?? null;
  }, [selectedCaseId, activeBranchCasePool, examState, accessibleCaseIds, accessibleCases, accessibleCaseIndex]);

  const persistCurrentUser = (patch) => {
    setCurrentUser((current) => {
      if (!current?.id) return current;
      const users = loadUsers();
      const userIndex = users.findIndex((user) => user.id === current.id);
      if (userIndex < 0) return current;
      const nextUser = sanitizeUser({ ...users[userIndex], ...patch });
      const nextUsers = [...users];
      nextUsers[userIndex] = nextUser;
      saveUsers(nextUsers);
      localBackend.write(CURRENT_USER_STORAGE_KEY, nextUser.id);
      return nextUser;
    });
  };

  useEffect(() => {
    if (!currentUser?.id) return;
    persistCurrentUser({ stats: sessionStats });
  }, [sessionStats, currentUser?.id]);

  useEffect(() => {
    if (!currentUser?.id) return;
    persistCurrentUser({ examHistory });
  }, [examHistory, currentUser?.id]);

  useEffect(() => {
    if (!currentUser?.id) return;
    persistCurrentUser({ wrongAnswers });
  }, [wrongAnswers, currentUser?.id]);

  useEffect(() => {
    localBackend.write(SOLVED_CASES_STORAGE_KEY, solvedCaseIds);
    if (!currentUser?.id) return;
    persistCurrentUser({ solvedCaseIds });
  }, [solvedCaseIds, currentUser?.id]);

  useEffect(() => {
    localBackend.write(AI_PRACTICE_STATS_STORAGE_KEY, aiPracticeStats);
  }, [aiPracticeStats]);

  useEffect(() => {
    localBackend.write(AI_BRANCH_FILTER_STORAGE_KEY, aiBranchFilter);
  }, [aiBranchFilter]);

  useEffect(() => {
    localBackend.write(AI_DIFFICULTY_STORAGE_KEY, aiDifficulty);
  }, [aiDifficulty]);

  useEffect(() => {
    localBackend.write(PRODUCT_MODE_STORAGE_KEY, productMode);
  }, [productMode]);

  const handleRegister = ({ name, email, password, confirmPassword }) => {
    const normalizedEmail = normalizeEmail(email);
    const displayName = String(name || '').trim();
    if (!displayName) return { ok: false, message: 'Ad soyad alanı boş olamaz.' };
    if (!normalizedEmail || !normalizedEmail.includes('@')) return { ok: false, message: 'Geçerli bir e-posta yazmalısın.' };
    if (String(password || '').length < 4) return { ok: false, message: 'Şifre en az 4 karakter olmalı.' };
    if (password !== confirmPassword) return { ok: false, message: 'Şifreler eşleşmiyor.' };

    const users = loadUsers();
    if (users.some((user) => normalizeEmail(user.email) === normalizedEmail)) {
      return { ok: false, message: 'Bu e-posta ile kayıtlı bir hesap zaten var.' };
    }

    const newUser = sanitizeUser({
      id: buildUserId(normalizedEmail),
      name: displayName,
      email: normalizedEmail,
      password,
      createdAt: Date.now(),
      stats: defaultStats,
      examHistory: [],
      wrongAnswers: [],
    });

    saveUsers([...users, newUser]);
    localBackend.write(CURRENT_USER_STORAGE_KEY, newUser.id);
    setCurrentUser(newUser);
    setSessionStats(newUser.stats);
    setExamHistory([]);
    setWrongAnswers([]);
    setSolvedCaseIds([]);
    setAIPracticeState(defaultAIPracticeState);
    closePearlStudy();
    setWrongAnswersPageOpen(false);
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setExamState(null);
    setMode('study');
    return { ok: true, message: 'Kayıt oluşturuldu.' };
  };

  const handleLogin = ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);
    const user = sanitizeUser(loadUsers().find((item) => normalizeEmail(item.email) === normalizedEmail));
    if (!user || user.password !== password) {
      return { ok: false, message: 'E-posta veya şifre hatalı.' };
    }

    localBackend.write(CURRENT_USER_STORAGE_KEY, user.id);
    setCurrentUser(user);
    setSessionStats(user.stats ?? defaultStats);
    setExamHistory(user.examHistory ?? []);
    setWrongAnswers(user.wrongAnswers ?? []);
    setSolvedCaseIds(user.solvedCaseIds ?? []);
    setAIPracticeState(defaultAIPracticeState);
    closePearlStudy();
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setExamState(null);
    setMode('study');
    return { ok: true, message: 'Giriş başarılı.' };
  };


  const activateUserSession = (user) => {
    localBackend.write(CURRENT_USER_STORAGE_KEY, user.id);
    setCurrentUser(user);
    setSessionStats(user.stats ?? defaultStats);
    setExamHistory(user.examHistory ?? []);
    setWrongAnswers(user.wrongAnswers ?? []);
    setSolvedCaseIds(user.solvedCaseIds ?? []);
    setAIPracticeState(defaultAIPracticeState);
    closePearlStudy();
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setExamState(null);
    setMode('study');
  };

  const handleGoogleLogin = async () => {
    if (!isGoogleAuthConfigured()) {
      return {
        ok: false,
        message: 'Google girişi hazır değil. Vercel Environment Variables içine Firebase bilgilerini eklemelisin.',
      };
    }

    const result = await signInWithGoogle();
    if (!result.ok) return result;

    const profile = result.profile;
    const normalizedEmail = normalizeEmail(profile.email);
    const users = loadUsers();
    const existingIndex = users.findIndex((item) => normalizeEmail(item.email) === normalizedEmail);
    const baseUser = existingIndex >= 0 ? sanitizeUser(users[existingIndex]) : null;

    const googleUser = sanitizeUser({
      ...(baseUser ?? {}),
      id: baseUser?.id ?? buildUserId(normalizedEmail),
      name: profile.name || baseUser?.name || normalizedEmail.split('@')[0],
      email: normalizedEmail,
      provider: 'google',
      googleUid: profile.googleUid,
      photoURL: profile.photoURL,
      createdAt: baseUser?.createdAt ?? Date.now(),
      lastLoginAt: Date.now(),
      stats: baseUser?.stats ?? defaultStats,
      examHistory: baseUser?.examHistory ?? [],
      wrongAnswers: baseUser?.wrongAnswers ?? [],
    });

    const nextUsers = existingIndex >= 0 ? [...users] : [...users, googleUser];
    if (existingIndex >= 0) nextUsers[existingIndex] = googleUser;
    saveUsers(nextUsers);
    activateUserSession(googleUser);
    return { ok: true, message: 'Google ile giriş başarılı.' };
  };

  const handleDemoStart = () => {
    const demoEmail = 'demo@klinikiq.pro';
    const users = loadUsers();
    const existingIndex = users.findIndex((item) => normalizeEmail(item.email) === demoEmail);
    const baseUser = existingIndex >= 0 ? sanitizeUser(users[existingIndex]) : null;

    const demoUser = sanitizeUser({
      ...(baseUser ?? {}),
      id: baseUser?.id ?? buildUserId(demoEmail),
      name: baseUser?.name ?? 'Demo Kullanıcı',
      email: demoEmail,
      password: baseUser?.password ?? 'demo1234',
      provider: 'demo',
      isDemo: true,
      createdAt: baseUser?.createdAt ?? Date.now(),
      lastLoginAt: Date.now(),
      stats: defaultStats,
      examHistory: [],
      wrongAnswers: [],
    });

    const nextUsers = existingIndex >= 0 ? [...users] : [...users, demoUser];
    if (existingIndex >= 0) nextUsers[existingIndex] = demoUser;
    saveUsers(nextUsers);
    activateUserSession(demoUser);
    closePearlStudy();

    window.setTimeout(() => {
      const demoPool = resolveDemoCases();
      setMode('exam');
      setIsCaseSidebarOpen(true);
      setExamState({
        active: true,
        title: DEMO_EXAM_TITLE,
        caseIds: demoPool.map((item) => item.id),
        currentIndex: 0,
        answers: {},
        durationSeconds: demoPool.length * 90,
        startedAt: Date.now(),
      });
      setSelectedBranchId(null);
      setSelectedCaseId(null);
      setAIPracticeState(defaultAIPracticeState);
      scrollToTopSmart({ smooth: false });
    }, 0);

    return { ok: true, message: '5 vakalık demo başlatıldı.' };
  };

  const handleLogout = () => {
    localBackend.remove(CURRENT_USER_STORAGE_KEY);
    setCurrentUser(null);
    setSessionStats(defaultStats);
    setExamHistory([]);
    setWrongAnswers([]);
    setSolvedCaseIds([]);
    setAIPracticeState(defaultAIPracticeState);
    closePearlStudy();
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setExamState(null);
    setMode('study');
  };

  const addWrongAnswer = useCallback((clinicalCase, selected) => {
    if (!clinicalCase?.id) return;
    const isAIQuestion = clinicalCase.caseType === 'ai-spot' || clinicalCase.branchId === 'tus-spot-olgular';
    const branch = isAIQuestion ? null : resolveBranchById(clinicalCase.branchId);
    const questionSnapshot = isAIQuestion ? toPlainStoredQuestion(clinicalCase) : null;
    const item = {
      caseId: clinicalCase.id,
      title: isAIQuestion ? buildAIWrongTitle(clinicalCase) : clinicalCase.title,
      branchId: clinicalCase.branchId,
      branchName: isAIQuestion
        ? `AI üretim · ${clinicalCase.relatedBranch || clinicalCase.branchName || 'TUS'}`
        : branch?.name ?? 'Klinik branş',
      sourceType: isAIQuestion ? AI_WRONG_ANSWER_SOURCE : 'embedded-case',
      selected,
      correctAnswer: clinicalCase.diagnosis?.correct,
      difficulty: clinicalCase.difficulty,
      lastWrongAt: Date.now(),
      ...(isAIQuestion ? {
        questionSnapshot,
        questionPreview: buildAIWrongQuestionPreview(clinicalCase),
        optionCount: Array.isArray(clinicalCase.diagnosis?.options) ? clinicalCase.diagnosis.options.length : 0,
        feedbackPreserved: Boolean(clinicalCase.diagnosis?.answerFeedback || clinicalCase.answerFeedback || clinicalCase.diagnosis?.explanation),
      } : {}),
    };

    setWrongAnswers((current) => {
      const existing = current.find((entry) => entry.caseId === clinicalCase.id);
      if (existing) {
        return [
          { ...existing, ...item, attempts: (existing.attempts || 1) + 1 },
          ...current.filter((entry) => entry.caseId !== clinicalCase.id),
        ];
      }
      return [{ ...item, attempts: 1, createdAt: Date.now() }, ...current].slice(0, 80);
    });
  }, []);

  const removeWrongAnswer = (caseIdOrEntry) => {
    const caseId = typeof caseIdOrEntry === 'object' ? caseIdOrEntry?.caseId : caseIdOrEntry;
    setWrongAnswers((current) => current.filter((entry) => entry.caseId !== caseId));
  };

  const clearWrongAnswers = () => setWrongAnswers([]);

  const openWrongCase = (caseIdOrEntry) => {
    const wrongAnswerEntry = typeof caseIdOrEntry === 'object'
      ? caseIdOrEntry
      : wrongAnswers.find((entry) => entry.caseId === caseIdOrEntry);

    setWrongAnswersPageOpen(false);

    if (isAIWrongAnswerEntry(wrongAnswerEntry)) {
      const restoredQuestion = wrongAnswerEntry?.questionSnapshot;
      if (!restoredQuestion?.diagnosis?.options?.length || !restoredQuestion?.diagnosis?.correct) return;
      clearAIQuestionTimer();
      closePearlStudy();
      setMode('study');
      setExamState(null);
      setSelectedBranchId(null);
      setSelectedCaseId(null);
      setIsCaseSidebarOpen(true);
      setAIPracticeState({
        active: true,
        question: { ...restoredQuestion, id: restoredQuestion.id || wrongAnswerEntry.caseId },
        loading: false,
        error: null,
        generationSource: 'Kişisel tekrar arşivi',
        usedRemoteAI: Boolean(restoredQuestion.aiMeta?.remote),
        fallback: Boolean(restoredQuestion.aiMeta?.fallback),
      });
      scrollToTopSmart({ smooth: false });
      return;
    }

    const caseId = typeof caseIdOrEntry === 'object' ? caseIdOrEntry?.caseId : caseIdOrEntry;
    const clinicalCase = getCaseById(caseId);
    if (!clinicalCase || !accessibleCaseIds.has(clinicalCase.id)) return;
    clearAIQuestionTimer();
    setAIPracticeState(defaultAIPracticeState);
    closePearlStudy();
    setWrongAnswersPageOpen(false);
    setMode('study');
    setExamState(null);
    setSelectedBranchId(clinicalCase.branchId);
    setSelectedCaseId(clinicalCase.id);
    setIsCaseSidebarOpen(true);
    scrollToTopSmart({ smooth: false });
  };

  useEffect(() => {
    if (currentUser?.id) return;
    localBackend.write(STATS_STORAGE_KEY, sessionStats);
  }, [sessionStats, currentUser?.id]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localBackend.write(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const shouldLockAuth = !currentUser;
    document.documentElement.classList.toggle('klinikiq-auth-lock', shouldLockAuth);
    document.body.classList.toggle('klinikiq-auth-lock', shouldLockAuth);

    if (shouldLockAuth) {
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100dvh';
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh';
      document.body.style.maxHeight = '100dvh';
      document.body.style.position = 'relative';
    } else {
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.maxHeight = '';
      document.body.style.position = '';
    }

    return () => {
      document.documentElement.classList.remove('klinikiq-auth-lock');
      document.body.classList.remove('klinikiq-auth-lock');
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.maxHeight = '';
      document.body.style.position = '';
    };
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?.id) return;
    localBackend.write(EXAM_HISTORY_STORAGE_KEY, examHistory);
  }, [examHistory, currentUser?.id]);

  useEffect(() => {
    setBottomCaseSearchQuery('');
  }, [selectedBranchId]);

  useEffect(() => {
    if (!selectedBranchId) return;
    if (!visibleBranches.some((branch) => branch.id === selectedBranchId)) {
      setSelectedBranchId(null);
      setSelectedCaseId(null);
      return;
    }
    if (!activeBranchCasePool.some((clinicalCase) => clinicalCase.id === selectedCaseId)) {
      setSelectedCaseId(activeBranchCasePool[0]?.id ?? null);
    }
  }, [selectedBranchId, activeBranchCasePool, selectedCaseId, visibleBranches]);

  useEffect(() => {
    if (!examState?.active) return undefined;
    const interval = window.setInterval(() => setClockTick(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [examState?.active]);

  useEffect(() => () => {
    branchRouteTimers.current.forEach((timerId) => window.clearTimeout(timerId));
    if (aiQuestionTimer.current) window.clearTimeout(aiQuestionTimer.current);
  }, []);

  const remainingSeconds = useMemo(() => {
    if (!examState?.active) return 0;
    const elapsed = Math.floor((clockTick - examState.startedAt) / 1000);
    return Math.max(0, examState.durationSeconds - elapsed);
  }, [examState, clockTick]);

  const leaderboardEntries = useMemo(() => {
    const entries = [];
    if (sessionStats.attempts) {
      entries.push({
        label: 'Toplam puan',
        subtext: `${sessionStats.attempts} olgu · %${Math.round(sessionStats.accuracy)} doğruluk`,
        value: sessionStats.score,
      });
    }

    if (sessionStats.bestStreak) {
      entries.push({
        label: 'En iyi seri',
        subtext: 'Art arda doğru yanıt',
        value: sessionStats.bestStreak,
      });
    }

    if (examHistory.length) {
      const bestExam = [...examHistory].sort((a, b) => b.score - a.score)[0];
      entries.push({
        label: 'En iyi blok sınav',
        subtext: `${bestExam.correct}/${bestExam.total} doğru · %${bestExam.accuracy}`,
        value: bestExam.score,
      });
    }

    return entries.slice(0, 3);
  }, [examHistory, sessionStats]);

  const visibleWrongAnswers = useMemo(() => (
    isDemoUser
      ? wrongAnswers.filter((entry) => isAIWrongAnswerEntry(entry) || accessibleCaseIds.has(entry.caseId))
      : wrongAnswers
  ), [wrongAnswers, isDemoUser, accessibleCaseIds]);

  const aiQuestionBranches = useMemo(() => listAIQuestionBranches(), []);

  const activeExamCaseMeta = useMemo(() => (examState?.active ? {
    active: true,
    title: examState.title,
    currentIndex: examState.currentIndex,
    total: examState.caseIds.length,
    answers: examState.answers,
  } : null), [examState?.active, examState?.title, examState?.currentIndex, examState?.caseIds, examState?.answers]);

  const noopRandomCase = useCallback(() => {}, []);
  const handleToggleTutorMode = useCallback(() => setTutorMode((current) => !current), []);

  const closePearlStudy = useCallback(() => {
    setPearlStudyState({ active: false, filter: 'all', branchFilter: 'all', catalogId: '' });
  }, []);

  const openPearlStudy = useCallback(({ filter = 'all', branchFilter = 'all', catalogId = '' } = {}) => {
    clearAIQuestionTimer();
    setExamState(null);
    setAIPracticeState(defaultAIPracticeState);
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setWrongAnswersPageOpen(false);
    setMode('study');
    setPearlStudyState({ active: true, filter, branchFilter, catalogId });
    scrollToTopSmart({ smooth: false });
  }, []);

  const openAllWrongAnswers = useCallback(() => {
    clearAIQuestionTimer();
    closePearlStudy();
    setExamState(null);
    setAIPracticeState(defaultAIPracticeState);
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setMode('study');
    setWrongAnswersPageOpen(true);
    scrollToTopSmart({ smooth: false });
  }, [closePearlStudy]);

  const closeAllWrongAnswers = useCallback(() => {
    setWrongAnswersPageOpen(false);
    window.setTimeout(() => {
      const wrongPanel = document.getElementById('wrong-answers-section');
      if (wrongPanel) wrongPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  }, []);

  const clearBranchRouteTimers = useCallback(() => {
    branchRouteTimers.current.forEach((timerId) => window.clearTimeout(timerId));
    branchRouteTimers.current = [];
  }, []);

  const handleSelectBranch = useCallback((branchId) => {
    clearAIQuestionTimer();
    setAIPracticeState(defaultAIPracticeState);
    closePearlStudy();
    setWrongAnswersPageOpen(false);
    if (isDemoUser && !visibleBranches.some((branch) => branch.id === branchId)) return;
    const rawBranchPool = accessibleCaseIndex.byBranchId.get(branchId) ?? [];
    const branchPool = sortCasesBySolvedStatus(rawBranchPool, solvedCaseIdSet);
    if (!branchPool.length) return;
    const branchMeta = resolveBranchById(branchId);

    clearBranchRouteTimers();
    setBranchRouteTransition({
      active: true,
      phase: 'selecting',
      branchId,
      iconName: branchIconById[branchId] ?? 'Activity',
      title: branchMeta?.name ?? branchMeta?.shortName ?? 'Klinik branş',
      subtitle: branchMeta?.transitionTagline ?? branchMeta?.description ?? '',
      caseCount: branchPool.length,
    });

    const selectTimer = window.setTimeout(() => {
      setBranchDifficultyFilter('all');
      setSelectedBranchId(branchId);
      setSelectedCaseId(branchPool[0]?.id ?? null);
      setIsCaseSidebarOpen(true);
      scrollToTopSmart({ smooth: false });
      setBranchRouteTransition((current) => current ? { ...current, phase: 'reveal' } : null);
    }, BRANCH_TRANSITION_MS);

    const finishTimer = window.setTimeout(() => {
      setBranchRouteTransition(null);
    }, BRANCH_TRANSITION_MS + BRANCH_TRANSITION_FADE_MS);

    branchRouteTimers.current = [selectTimer, finishTimer];
  }, [accessibleCaseIndex, clearBranchRouteTimers, closePearlStudy, isDemoUser, solvedCaseIdSet, visibleBranches]);

  const handleSelectCase = useCallback((caseId) => {
    if (!accessibleCaseIds.has(caseId)) return;
    setSelectedCaseId(caseId);
    scrollToTopSmart({ smooth: false });
  }, [accessibleCaseIds]);

  const handleRandomCase = useCallback(() => {
    if (!activeBranchCasePool.length) return;
    const unsolvedPool = activeBranchCasePool.filter((clinicalCase) => !solvedCaseIdSet.has(clinicalCase.id));
    const preferredPool = unsolvedPool.length ? unsolvedPool : activeBranchCasePool;
    const nextCase = pickRandom(preferredPool, selectedCaseId) ?? preferredPool[0];
    setSelectedCaseId(nextCase.id);
    scrollToTopSmart({ smooth: false });
  }, [activeBranchCasePool, selectedCaseId, solvedCaseIdSet]);


  const handleBranchDifficultyFilterChange = useCallback((nextFilter) => {
    if (nextFilter !== 'all') {
      const nextCount = branchDifficultyCounts[nextFilter] || 0;
      if (nextCount < 1) return;
    }
    const normalizedFilter = nextFilter === 'all' ? 'all' : nextFilter;
    setBranchDifficultyFilter((current) => current === normalizedFilter ? 'all' : normalizedFilter);
    window.setTimeout(() => scrollToTopSmart({ smooth: false }), 0);
  }, [branchDifficultyCounts]);

  const markCaseSolved = useCallback((caseId) => {
    if (!caseId) return;
    setSolvedCaseIds((current) => (current.includes(caseId) ? current : [...current, caseId]));
  }, []);

  const handleSubmitAnswer = useCallback(({ clinicalCase, selected, isCorrect }) => {
    const existingExamAnswer = examState?.active ? examState.answers?.[clinicalCase.id] : null;
    if (existingExamAnswer) return existingExamAnswer.attemptResult;

    markCaseSolved(clinicalCase.id);
    const scored = scoreAttempt(clinicalCase.difficulty, isCorrect, sessionStats.streak);

    if (!isCorrect) {
      addWrongAnswer(clinicalCase, selected);
    }

    setSessionStats((current) => {
      const attempts = current.attempts + 1;
      const correct = current.correct + (isCorrect ? 1 : 0);
      const score = current.score + scored.earnedPoints;
      const streak = scored.nextStreak;
      const bestStreak = Math.max(current.bestStreak, streak);
      const accuracy = calculateAccuracy(correct, attempts);
      const trend = [
        ...(Array.isArray(current.trend) ? current.trend : []),
        {
          attempts,
          correct,
          score,
          streak,
          bestStreak,
          accuracy,
          earnedPoints: scored.earnedPoints,
          isCorrect,
          timestamp: Date.now(),
        },
      ].slice(-12);

      return {
        attempts,
        correct,
        score,
        streak,
        bestStreak,
        accuracy,
        trend,
      };
    });

    if (examState?.active) {
      setExamState((current) => ({
        ...current,
        answers: {
          ...current.answers,
          [clinicalCase.id]: {
            caseId: clinicalCase.id,
            selected,
            isCorrect,
            attemptResult: scored,
          },
        },
      }));
    }

    return scored;
  }, [addWrongAnswer, examState, markCaseSolved, sessionStats.streak]);


  const generateNextAIQuestion = useCallback((previousQuestionId = null, branchFilterOverride = aiBranchFilter, difficultyOverride = aiDifficulty) => {
    clearAIQuestionTimer();
    const requestId = latestAIQuestionRequestId.current + 1;
    latestAIQuestionRequestId.current = requestId;
    setAIPracticeState((current) => ({
      ...current,
      active: true,
      question: current.question,
      loading: true,
      error: null,
      generationSource: null,
      usedRemoteAI: false,
      fallback: false,
    }));

    aiQuestionTimer.current = window.setTimeout(async () => {
      try {
        const result = await createAIQuestion({ previousQuestionId, branchFilter: branchFilterOverride, difficulty: difficultyOverride });
        if (latestAIQuestionRequestId.current !== requestId) return;
        setAIPracticeState({
          active: true,
          question: result.question,
          loading: false,
          error: result.ok ? null : (result.error || new Error('AI question generation failed')),
          generationSource: result.source || result.question?.source || null,
          usedRemoteAI: Boolean(result.usedRemoteAI),
          fallback: Boolean(result.fallback),
        });
      } catch (error) {
        if (latestAIQuestionRequestId.current !== requestId) return;
        setAIPracticeState((current) => ({
          ...current,
          active: true,
          loading: false,
          error,
          generationSource: null,
          usedRemoteAI: false,
          fallback: false,
        }));
      } finally {
        if (latestAIQuestionRequestId.current === requestId) aiQuestionTimer.current = null;
      }
    }, 420);
  }, [aiBranchFilter, aiDifficulty]);

  const handleStartAIPractice = useCallback(() => {
    clearAIQuestionTimer();
    latestAIQuestionRequestId.current += 1;
    setMode('study');
    setExamState(null);
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setIsCaseSidebarOpen(true);
    closePearlStudy();
    setWrongAnswersPageOpen(false);
    setAIPracticeState({
      ...defaultAIPracticeState,
      active: true,
    });
    scrollToTopSmart({ smooth: false });
  }, [closePearlStudy]);

  const handleGenerateNextAIQuestion = useCallback(() => {
    generateNextAIQuestion(aiPracticeState.question?.id ?? null, aiBranchFilter, aiDifficulty);
    scrollToTopSmart({ smooth: false });
  }, [aiBranchFilter, aiDifficulty, aiPracticeState.question?.id, generateNextAIQuestion]);

  const handleAIBranchFilterChange = useCallback((nextFilter) => {
    setAIBranchFilter(nextFilter);
    localBackend.write(AI_BRANCH_FILTER_STORAGE_KEY, nextFilter);
    clearAIQuestionTimer();
    latestAIQuestionRequestId.current += 1;
    setAIPracticeState((current) => ({
      ...current,
      active: true,
      question: null,
      loading: false,
      error: null,
      generationSource: null,
      usedRemoteAI: false,
      fallback: false,
    }));
  }, []);


  const handleAIDifficultyChange = useCallback((nextDifficulty) => {
    const normalizedDifficulty = ['Kolay', 'Orta', 'Zor'].includes(nextDifficulty) ? nextDifficulty : 'Orta';
    setAIDifficulty(normalizedDifficulty);
    localBackend.write(AI_DIFFICULTY_STORAGE_KEY, normalizedDifficulty);
    clearAIQuestionTimer();
    latestAIQuestionRequestId.current += 1;
    setAIPracticeState((current) => ({
      ...current,
      active: true,
      question: null,
      loading: false,
      error: null,
      generationSource: null,
      usedRemoteAI: false,
      fallback: false,
    }));
  }, []);

  const handleSubmitAIAnswer = useCallback(({ clinicalCase, selected, isCorrect }) => {
    const scored = scoreAttempt(clinicalCase.difficulty, isCorrect, aiPracticeStats.streak);
    const earnedPoints = isCorrect ? 5 : 0;

    if (!isCorrect) {
      addWrongAnswer(clinicalCase, selected);
    }

    setAIPracticeStats((current) => {
      const attempts = current.attempts + 1;
      const correct = current.correct + (isCorrect ? 1 : 0);
      const streak = isCorrect ? current.streak + 1 : 0;
      const bestStreak = Math.max(current.bestStreak || 0, streak);
      return {
        attempts,
        correct,
        streak,
        bestStreak,
        score: current.score + earnedPoints,
      };
    });

    return { ...scored, earnedPoints, nextStreak: isCorrect ? aiPracticeStats.streak + 1 : 0 };
  }, [addWrongAnswer, aiPracticeStats.streak]);

  function startBlockExam(sourceCases = accessibleCases, title = isDemoUser ? DEMO_EXAM_TITLE : 'Genel klinik blok sınavı') {
    const safeSourceCases = (Array.isArray(sourceCases) ? sourceCases : accessibleCases)
      .filter((clinicalCase) => accessibleCaseIds.has(clinicalCase.id));
    const pool = isDemoUser
      ? accessibleCases
      : buildExamPool(safeSourceCases.length ? safeSourceCases : accessibleCases, 10, cases);
    if (!pool.length) return;
    clearAIQuestionTimer();
    setMode('exam');
    setAIPracticeState(defaultAIPracticeState);
    closePearlStudy();
    setIsCaseSidebarOpen(true);
    setExamState({
      active: true,
      title,
      caseIds: pool.map((item) => item.id),
      currentIndex: 0,
      answers: {},
      durationSeconds: pool.length * 90,
      startedAt: Date.now(),
    });
    setSelectedBranchId(null);
    setSelectedCaseId(null);
  }

  const goToNextExamCase = useCallback(() => {
    setExamState((current) => {
      if (!current) return current;
      const nextIndex = Math.min(current.currentIndex + 1, current.caseIds.length - 1);
      return { ...current, currentIndex: nextIndex };
    });
  }, []);

  const goToPreviousExamCase = useCallback(() => {
    setExamState((current) => {
      if (!current) return current;
      const nextIndex = Math.max(current.currentIndex - 1, 0);
      return { ...current, currentIndex: nextIndex };
    });
  }, []);

  const finalizeExam = useCallback(() => {
    setExamState((current) => {
      if (!current?.active) return current;

      const elapsed = Math.floor((Date.now() - current.startedAt) / 1000);
      const timeUsedSeconds = Math.min(current.durationSeconds, elapsed);
      const review = current.caseIds
        .filter((caseId) => accessibleCaseIds.has(caseId))
        .map((caseId) => {
          const item = accessibleCaseIndex.byId.get(caseId);
          if (!item) return null;
          const branch = resolveBranchById(item.branchId);
          const answer = current.answers[caseId];
          return {
            caseId,
            title: item.title,
            branchId: item.branchId,
            branchName: branch?.name ?? 'Klinik branş',
            selected: answer?.selected ?? null,
            isCorrect: answer?.isCorrect ?? false,
            correctAnswer: item.diagnosis.correct,
            earnedPoints: answer?.attemptResult?.earnedPoints ?? 0,
          };
        })
        .filter(Boolean);

      const total = review.length;
      const correct = review.filter((item) => item.isCorrect).length;
      const score = review.reduce((sum, item) => sum + item.earnedPoints, 0);
      const accuracy = total ? Math.round((correct / total) * 100) : 0;

      const branchBreakdown = Object.values(review.reduce((accumulator, item) => {
        if (!accumulator[item.branchId]) {
          accumulator[item.branchId] = {
            branchId: item.branchId,
            branchName: item.branchName,
            total: 0,
            correct: 0,
          };
        }
        accumulator[item.branchId].total += 1;
        accumulator[item.branchId].correct += item.isCorrect ? 1 : 0;
        return accumulator;
      }, {})).map((item) => ({
        ...item,
        accuracy: item.total ? Math.round((item.correct / item.total) * 100) : 0,
      }));

      const result = {
        id: Date.now(),
        title: current.title,
        total,
        correct,
        score,
        accuracy,
        timeUsedSeconds,
        durationSeconds: current.durationSeconds,
        branchBreakdown,
        review,
      };

      setExamHistory((history) => [result, ...history].slice(0, 12));
      return { active: false, result };
    });
  }, [accessibleCaseIds, accessibleCaseIndex]);

  useEffect(() => {
    if (examState?.active && remainingSeconds === 0) {
      finalizeExam();
    }
  }, [examState?.active, remainingSeconds, finalizeExam]);

  const resetExamToHome = () => {
    setProductMode('tus');
    clearAIQuestionTimer();
    setExamState(null);
    setAIPracticeState(defaultAIPracticeState);
    closePearlStudy();
    setWrongAnswersPageOpen(false);
    setMode('study');
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setIsCaseSidebarOpen(true);
    scrollToTopSmart({ smooth: false });
  };

  const switchProductMode = (nextMode) => {
    if (nextMode === productMode) return;
    clearAIQuestionTimer();
    setProductMode(nextMode);
    setAIPracticeState(defaultAIPracticeState);
    setExamState(null);
    closePearlStudy();
    setWrongAnswersPageOpen(false);
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setMode('study');
    scrollToTopSmart({ smooth: false });
  };

  if (!currentUser) {
    return (
      <main className="app-shell premium-shell" data-theme={theme}>
        <AuthPanel
          onLogin={handleLogin}
          onRegister={handleRegister}
          onGoogleLogin={handleGoogleLogin}
          onDemoStart={handleDemoStart}
          theme={theme}
          onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
        />
      </main>
    );
  }

  return (
    <main className="app-shell premium-shell" data-theme={theme}>
      <nav className="top-shell-nav global-topbar-v55" aria-label="KlinikIQ üst gezinme">
        <button className="nav-brand nav-brand-icon-only global-nav-brand-v55" type="button" onClick={resetExamToHome} aria-label="KlinikIQ ana ekrana dön" title="KlinikIQ">
          <span className="nav-brand-mark nav-brand-mark-pulse" aria-hidden="true"><BrandMark title="" /></span>
          <strong className="nav-brand-wordmark">KlinikIQ</strong>
        </button>

        <div className="segmented-control product-mode-switch global-product-switch-v55" aria-label="Ürün modu seçimi">
          <button
            type="button"
            className={productMode === 'komite' ? 'active' : ''}
            onClick={() => switchProductMode('komite')}
            aria-pressed={productMode === 'komite'}
          >
            <span>Komite</span>
          </button>
          <button
            type="button"
            className={productMode === 'tus' ? 'active' : ''}
            onClick={() => switchProductMode('tus')}
            aria-pressed={productMode === 'tus'}
          >
            <span>TUS</span>
          </button>
        </div>

        {productMode === 'tus' ? (
          <div className="segmented-control nav-mode-switch global-context-switch-v55" aria-label="TUS çalışma modu seçimi">
            <button
              type="button"
              className={mode === 'study' && !examState?.active ? 'active' : ''}
              onClick={resetExamToHome}
              aria-pressed={mode === 'study' && !examState?.active}
            >
              <Icon name="Lightbulb" />
              <span>Öğrenme</span>
            </button>
            <button
              type="button"
              className={mode === 'exam' || examState?.active ? 'active' : ''}
              onClick={() => setMode('exam')}
              aria-pressed={mode === 'exam' || examState?.active}
            >
              <Icon name="ClipboardList" />
              <span>Sınav</span>
            </button>
            <button
              type="button"
              className={hardMode ? 'active hard-mode-tab hard-mode-active' : 'hard-mode-tab'}
              onClick={() => setHardMode((current) => !current)}
              aria-pressed={hardMode}
              title="Referans değerleri ve ipuçları azaltılır"
            >
              <Icon name="TrendUp" />
              <span>Zor</span>
            </button>
          </div>
        ) : (
          <div className="segmented-control nav-mode-switch global-context-switch-v55 komite-context-switch" aria-label="Komite çalışma bağlamı">
            <button type="button" className="active" aria-pressed="true"><Icon name="Notes" /><span>Materyal</span></button>
            <button type="button" aria-pressed="false" disabled><Icon name="BookOpen" /><span>Ders</span></button>
            <button type="button" aria-pressed="false" disabled><Icon name="LayeredCards" /><span>Kartlar</span></button>
          </div>
        )}

        <div className="nav-actions global-nav-actions-v55" aria-label="Oturum eylemleri">
          <span className="nav-user-chip nav-user-card nav-user-icon-only" aria-label={`Kullanıcı ${currentUser.name}`} title={currentUser.name}>
            <Icon name="User" />
          </span>
          <button
            type="button"
            className="nav-wrong-chip nav-stat-chip"
            onClick={() => {
              clearAIQuestionTimer();
              setSelectedBranchId(null);
              setSelectedCaseId(null);
              setExamState(null);
              setAIPracticeState(defaultAIPracticeState);
              closePearlStudy();
              setWrongAnswersPageOpen(false);
              setMode('study');
              window.setTimeout(() => {
                const wrongPanel = document.getElementById('wrong-answers-section');
                if (wrongPanel) {
                  wrongPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  scrollToTopSmart({ smooth: false });
                }
              }, 80);
            }}
            aria-label="Yanlış çözülenler"
            title="Yanlış çözülenler"
          >
            <Icon name="RotateCcw" />
            <span>Yanlış</span>
            <strong>{visibleWrongAnswers.length}</strong>
          </button>
          <span className="nav-score-chip nav-stat-chip" aria-label={`Puan ${sessionStats.score}`} title={`Puan ${sessionStats.score}`}>
            <Icon name="Trophy" />
            <span>Puan</span>
            <strong>{sessionStats.score}</strong>
          </span>
          <button type="button" className="btn btn-primary btn-icon nav-cta nav-cta-icon-only" onClick={() => startBlockExam(accessibleCases, isDemoUser ? DEMO_EXAM_TITLE : 'Genel klinik blok sınavı')} title={isDemoUser ? 'Demo blok başlat' : 'Blok sınav başlat'} aria-label={isDemoUser ? 'Demo blok başlat' : 'Blok sınav başlat'}>
            <Icon name="Timer" />
          </button>
          <ThemeToggle
            theme={theme}
            onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
            variant="navIcon"
            className="nav-theme-toggle"
          />
          <button type="button" className="btn btn-icon nav-logout-btn" onClick={handleLogout} aria-label="Çıkış yap" title="Çıkış yap">
            <Icon name="LogIn" />
          </button>
        </div>
      </nav>

      {branchRouteTransition?.active ? (
        <div className={`branch-route-overlay ${branchRouteTransition.phase} branch-route-${branchRouteTransition.branchId || 'default'}`.trim()} aria-hidden="true">
          <div className="branch-route-stage">
            <div
              className={`branch-route-hero route-icon-${branchRouteTransition.branchId || 'default'}`.trim()}
              data-branch={branchRouteTransition.branchId || 'default'}
            >
              <span className="branch-route-ring ring-one" />
              <span className="branch-route-ring ring-two" />
              <span className="branch-route-glow" />
              <span className="branch-route-orb">
                <BranchTransitionVisual
                  branchId={branchRouteTransition.branchId || 'default'}
                  iconName={branchRouteTransition.iconName || 'Activity'}
                />
              </span>
            </div>
            <div className="branch-route-copy solo">
              <strong>{branchRouteTransition.title}</strong>
              {branchRouteTransition.subtitle ? <span>{branchRouteTransition.subtitle}</span> : null}
            </div>
          </div>
        </div>
      ) : null}

      {productMode === 'komite' ? (
        <Suspense fallback={<RouteFallback label="Komite arayüzü hazırlanıyor…" />}>
          <KomiteModeWorkspace currentUser={currentUser} />
        </Suspense>
      ) : wrongAnswersPageOpen ? (
        <WrongAnswersFullPage
          wrongAnswers={visibleWrongAnswers}
          onBack={closeAllWrongAnswers}
          onOpenCase={openWrongCase}
          onRemoveCase={removeWrongAnswer}
          onClearAll={clearWrongAnswers}
        />
      ) : pearlStudyState.active ? (
        <Suspense fallback={<RouteFallback label="Hap kart arayüzü hazırlanıyor…" />}>
          <TusPearlStudyScreen
            initialFilter={pearlStudyState.filter}
            initialBranchFilter={pearlStudyState.branchFilter}
            initialCatalogId={pearlStudyState.catalogId}
            onBack={resetExamToHome}
          />
        </Suspense>
      ) : aiPracticeState.active ? (
        <Suspense fallback={<RouteFallback label="AI soru arayüzü hazırlanıyor…" />}>
          <AIGeneratedQuestionView
          question={aiPracticeState.question}
          loading={aiPracticeState.loading}
          error={aiPracticeState.error}
          aiStats={aiPracticeStats}
          generationSource={aiPracticeState.generationSource}
          usedRemoteAI={aiPracticeState.usedRemoteAI}
          fallback={aiPracticeState.fallback}
          branchFilter={aiBranchFilter}
          branchOptions={aiQuestionBranches}
          difficulty={aiDifficulty}
          onChangeDifficulty={handleAIDifficultyChange}
          onChangeBranchFilter={handleAIBranchFilterChange}
          onGenerateQuestion={handleGenerateNextAIQuestion}
          onSubmitAnswer={handleSubmitAIAnswer}
          onBackHome={resetExamToHome}
          tutorMode={tutorMode}
          onToggleTutorMode={handleToggleTutorMode}
          hardMode={hardMode}
          />
        </Suspense>
      ) : examState?.result ? (
        <Suspense fallback={<RouteFallback label="Sonuç ekranı hazırlanıyor…" />}>
          <ExamResults
          result={examState.result}
          onRestart={() => startBlockExam(accessibleCases, isDemoUser ? DEMO_EXAM_TITLE : 'Genel klinik blok sınavı')}
            onHome={resetExamToHome}
          />
        </Suspense>
      ) : examState?.active && selectedCase ? (
        <section className="page-shell exam-active-shell stable-case-page-shell">
          <section className="exam-banner-card card-surface">
            <div>
              <h2>{examState.title}</h2>
              <p>
                Soru {examState.currentIndex + 1} / {examState.caseIds.length} · Kalan süre{' '}
                {Math.floor(remainingSeconds / 60)}:{String(remainingSeconds % 60).padStart(2, '0')}
              </p>
            </div>
            <button type="button" className="btn btn-secondary" onClick={finalizeExam}>Bloku bitir</button>
          </section>

          <div className="case-route-transition" data-case-id={selectedCase.id}>
            <Suspense fallback={<RouteFallback label="Vaka ekranı hazırlanıyor…" />}>
              <CasePlayer
                clinicalCase={selectedCase}
                branch={resolveBranchById(selectedCase.branchId)}
                mode="exam"
                onRandomCase={noopRandomCase}
                onSubmitAnswer={handleSubmitAnswer}
                tutorMode={tutorMode}
                onToggleTutorMode={handleToggleTutorMode}
                hardMode={hardMode}
                isSolved={solvedCaseIdSet.has(selectedCase.id)}
                examMeta={activeExamCaseMeta}
                onAdvanceExam={goToNextExamCase}
                onPreviousExam={goToPreviousExamCase}
                onFinishExam={finalizeExam}
              />
            </Suspense>
          </div>
        </section>
      ) : selectedBranch && selectedCase ? (
        <section className="page-shell case-page-shell case-page-bottomrail stable-case-page-shell">
          <section className="content-layout full-width-content-layout">
            <section className="branch-header-v8 card-surface">
              <div className="branch-header-v8-main">
                <button className="branch-back-v8" type="button" onClick={() => { setWrongAnswersPageOpen(false); setSelectedBranchId(null); setBranchDifficultyFilter('all'); }}>
                  <span aria-hidden="true">←</span>
                  <span>Branşlara dön</span>
                </button>
                <div className="branch-header-text">
                  <h2>{selectedBranch.name}</h2>
                </div>
              </div>
              <div className="branch-inline-actions">
                <div className="branch-difficulty-filter" role="group" aria-label="Zorluk filtresi">
                  <button
                    type="button"
                    className={['difficulty-filter-pill', 'difficulty-all', branchDifficultyFilter === 'all' ? 'active' : ''].filter(Boolean).join(' ')}
                    onClick={() => handleBranchDifficultyFilterChange('all')}
                    aria-pressed={branchDifficultyFilter === 'all'}
                  >
                    Tümü
                  </button>
                  {BRANCH_DIFFICULTY_OPTIONS.map((difficultyOption) => {
                    const optionCount = branchDifficultyCounts[difficultyOption] || 0;
                    const disabled = optionCount < 1;
                    return (
                      <button
                        key={difficultyOption}
                        type="button"
                        className={[
                          'difficulty-filter-pill',
                          `difficulty-${difficultyOption.toLocaleLowerCase('tr')}`,
                          branchDifficultyFilter === difficultyOption ? 'active' : '',
                        ].filter(Boolean).join(' ')}
                        onClick={() => handleBranchDifficultyFilterChange(difficultyOption)}
                        disabled={disabled}
                        aria-pressed={branchDifficultyFilter === difficultyOption}
                        title={`${difficultyOption}: ${optionCount} olgu`}
                      >
                        {difficultyOption}
                      </button>
                    );
                  })}
                </div>
                <span className="branch-case-count">
                  {branchDifficultyFilter === 'all'
                    ? `${branchCases.length} olgu`
                    : `${activeBranchCasePool.length}/${branchCases.length} olgu`}
                </span>
                <button type="button" className="btn btn-primary" onClick={() => startBlockExam(activeBranchCasePool, isDemoUser ? DEMO_EXAM_TITLE : `${selectedBranch.name} blok sınavı`)} disabled={!activeBranchCasePool.length}>
                  {isDemoUser ? 'Demo bloku aç' : 'Branş bloku oluştur'}
                </button>
              </div>
            </section>

            <div className="case-route-transition" data-case-id={selectedCase.id}>
              <Suspense fallback={<RouteFallback label="Vaka ekranı hazırlanıyor…" />}>
                <CasePlayer
                  clinicalCase={selectedCase}
                  branch={selectedBranch}
                  mode={mode}
                  onRandomCase={handleRandomCase}
                  onSubmitAnswer={handleSubmitAnswer}
                  tutorMode={tutorMode}
                  onToggleTutorMode={handleToggleTutorMode}
                  hardMode={hardMode}
                  isSolved={solvedCaseIdSet.has(selectedCase.id)}
                />
              </Suspense>
            </div>

            <section className="bottom-case-browser card-surface">
              <div className="bottom-case-browser-head">
                <div>
                  <h3>Diğer olgular</h3>
                </div>
                <div className="bottom-case-browser-tools">
                  <div className={`bottom-case-search ${bottomCaseSearchQuery ? 'has-value' : ''}`.trim()} role="search">
                    <span className="bottom-case-search-icon" aria-hidden="true"><Icon name="Search" /></span>
                    <input
                      type="text"
                      value={bottomCaseSearchQuery}
                      onChange={(event) => setBottomCaseSearchQuery(event.target.value)}
                      placeholder="Olgu, tanı veya terim ara"
                      autoComplete="off"
                      aria-label="Diğer olgular içinde ara"
                    />
                    {bottomCaseSearchQuery ? (
                      <button type="button" className="bottom-case-search-clear" onClick={() => setBottomCaseSearchQuery('')} aria-label="Aramayı temizle">
                        <Icon name="X" />
                      </button>
                    ) : null}
                  </div>
                  <span className="bottom-case-browser-count">
                    {hasBottomCaseSearch ? `${searchedBranchCasePool.length}/${activeBranchCasePool.length} olgu` : `${activeBranchCasePool.length} olgu`}
                  </span>
                </div>
              </div>
              {hasBottomCaseSearch && searchedBranchCasePool.length === 0 ? (
                <div className="bottom-case-search-empty" role="status">
                  <strong>Sonuç bulunamadı.</strong>
                  <span>Başlık, soru kökü, anahtar terim ve açıklama alanlarında eşleşme aranıyor.</span>
                </div>
              ) : (
                <CaseList cases={searchedBranchCasePool} selectedCaseId={selectedCase.id} onSelectCase={handleSelectCase} layout="horizontal" solvedCaseIds={solvedCaseIdSet} />
              )}
            </section>
          </section>
        </section>
      ) : (
        <section className="page-shell home-page-shell minimal-home-shell">
          {isDemoUser ? (
            <section className="demo-access-banner card-surface" aria-label="Demo sürüm bilgisi">
              <div>
                <strong>Ücretsiz demo sürüm</strong>
                <p>Bu hesap yalnızca {demoCases.length} sabit demo vakasına erişebilir. Premium vaka havuzu, branş arşivi ve genel blok sınavları kapalıdır.</p>
              </div>
              <button type="button" className="btn btn-primary" onClick={() => startBlockExam(accessibleCases, DEMO_EXAM_TITLE)}>
                <Icon name="Timer" /> {demoCases.length} vakalık demoyu başlat
              </button>
            </section>
          ) : null}
          <HomeCommandCenter
            mode={mode}
            onChangeMode={setMode}
            stats={sessionStats}
            leaderboardEntries={leaderboardEntries}
            wrongAnswers={visibleWrongAnswers}
            onStartExam={() => startBlockExam(accessibleCases, isDemoUser ? DEMO_EXAM_TITLE : 'Genel klinik blok sınavı')}
            onStartAIQuestion={handleStartAIPractice}
            totalCases={accessibleCases.length}
            totalBranches={visibleBranches.length}
            examCount={examHistory.length}
          />
          <section id="wrong-answers-section" className="study-review-anchor section-anchor" aria-label="Yanlışlar ve hap bilgi tekrar merkezi">
            <Suspense fallback={<RouteFallback label="Tekrar merkezi hazırlanıyor…" />}>
              <StudyReviewHub
                wrongAnswers={visibleWrongAnswers}
                onOpenCase={openWrongCase}
                onRemoveCase={removeWrongAnswer}
                onClearAll={clearWrongAnswers}
                onOpenPearlStudy={openPearlStudy}
                onOpenAllWrongAnswers={openAllWrongAnswers}
              />
            </Suspense>
          </section>
          <BranchSelector
            branches={visibleBranches}
            cases={accessibleCases}
            onSelectBranch={handleSelectBranch}
            launchingBranchId={branchRouteTransition?.phase === 'selecting' ? branchRouteTransition.branchId : null}
            isTransitioning={Boolean(branchRouteTransition?.active)}
          />
        </section>
      )}
    </main>
  );
}

export default App;
