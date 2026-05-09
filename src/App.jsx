import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './index.css';
import './styles/klinikiq-system.css';
import './styles/klinikiq-refine.css';
import BranchSelector from './components/BranchSelector.jsx';
import CaseList from './components/CaseList.jsx';
import CasePlayer from './components/CasePlayer.jsx';
import HomeCommandCenter from './components/HomeCommandCenter.jsx';
import AuthPanel from './components/AuthPanel.jsx';
import StudyReviewHub from './components/StudyReviewHub.jsx';
import TusPearlStudyScreen from './components/TusPearlStudyScreen.jsx';
import ExamResults from './components/ExamResults.jsx';
import AIGeneratedQuestionView from './components/AIGeneratedQuestionView.jsx';
import { Icon, BrandMark, ThemeToggle, BranchTransitionVisual, branchIconById } from './components/ui.jsx';
import { branches } from './data/branches.js';
import { cases, getCaseById } from './data/cases.js';
import { scoreAttempt, calculateAccuracy } from './utils/scoring.js';
import { pickRandom, shuffleArray } from './utils/randomize.js';
import { localBackend } from './services/localBackend.js';
import { createAIQuestion } from './services/aiQuestionService.js';
import { listAIQuestionBranches } from './utils/aiQuestionGenerator.js';
import { isGoogleAuthConfigured, signInWithGoogle } from './services/googleAuth.js';

const STATS_STORAGE_KEY = 'klinikiq-session-stats-v2';
const EXAM_HISTORY_STORAGE_KEY = 'klinikiq-exam-history-v2';
const THEME_STORAGE_KEY = 'klinikiq-theme-v1';
const AI_PRACTICE_STATS_STORAGE_KEY = 'klinikiq-ai-practice-stats-v1';
const AI_BRANCH_FILTER_STORAGE_KEY = 'klinikiq-ai-branch-filter-v1';
const BRANCH_TRANSITION_MS = 920;
const BRANCH_TRANSITION_FADE_MS = 180;
const USERS_STORAGE_KEY = 'klinikiq-auth-users-v1';
const CURRENT_USER_STORAGE_KEY = 'klinikiq-auth-current-user-v1';

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


function App() {
  const [currentUser, setCurrentUser] = useState(() => sanitizeUser(loadCurrentUser()));
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [mode, setMode] = useState('study');
  const [hardMode, setHardMode] = useState(false);
  const [theme, setTheme] = useState(() => loadStoredValue(THEME_STORAGE_KEY, 'light'));
  const [tutorMode, setTutorMode] = useState(true);
  const [sessionStats, setSessionStats] = useState(() => currentUser?.stats ?? loadStoredValue(STATS_STORAGE_KEY, defaultStats));
  const [examHistory, setExamHistory] = useState(() => currentUser?.examHistory ?? loadStoredValue(EXAM_HISTORY_STORAGE_KEY, []));
  const [wrongAnswers, setWrongAnswers] = useState(() => currentUser?.wrongAnswers ?? []);
  const [aiPracticeStats, setAIPracticeStats] = useState(() => loadStoredValue(AI_PRACTICE_STATS_STORAGE_KEY, defaultAIPracticeStats));
  const [aiPracticeState, setAIPracticeState] = useState(defaultAIPracticeState);
  const [pearlStudyState, setPearlStudyState] = useState({ active: false, filter: 'all', branchFilter: 'all', catalogId: '' });
  const [aiBranchFilter, setAIBranchFilter] = useState(() => loadStoredValue(AI_BRANCH_FILTER_STORAGE_KEY, 'random'));
  const [examState, setExamState] = useState(null);
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
  const visibleBranches = useMemo(() => {
    if (!isDemoUser) return branches;
    const branchIds = new Set(accessibleCases.map((clinicalCase) => clinicalCase.branchId));
    return branches.filter((branch) => branchIds.has(branch.id));
  }, [accessibleCases, isDemoUser]);

  const selectedBranch = useMemo(
    () => (selectedBranchId ? resolveBranchById(selectedBranchId) : null),
    [selectedBranchId],
  );

  const branchCases = useMemo(
    () => (selectedBranchId ? accessibleCaseIndex.byBranchId.get(selectedBranchId) ?? [] : []),
    [selectedBranchId, accessibleCaseIndex],
  );

  const selectedCase = useMemo(() => {
    if (examState?.active) {
      const examCaseId = examState.caseIds[examState.currentIndex];
      if (!accessibleCaseIds.has(examCaseId)) return accessibleCases[0] ?? null;
      return accessibleCaseIndex.byId.get(examCaseId) ?? accessibleCases[0] ?? null;
    }
    if (!selectedCaseId) return branchCases[0] ?? null;
    if (!accessibleCaseIds.has(selectedCaseId)) return branchCases[0] ?? null;
    return accessibleCaseIndex.byId.get(selectedCaseId) ?? branchCases[0] ?? null;
  }, [selectedCaseId, branchCases, examState, accessibleCaseIds, accessibleCases, accessibleCaseIndex]);

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
    localBackend.write(AI_PRACTICE_STATS_STORAGE_KEY, aiPracticeStats);
  }, [aiPracticeStats]);

  useEffect(() => {
    localBackend.write(AI_BRANCH_FILTER_STORAGE_KEY, aiBranchFilter);
  }, [aiBranchFilter]);

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
    setAIPracticeState(defaultAIPracticeState);
    closePearlStudy();
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
    setAIPracticeState(defaultAIPracticeState);
    closePearlStudy();
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setExamState(null);
    setMode('study');
  };

  const addWrongAnswer = useCallback((clinicalCase, selected) => {
    const branch = resolveBranchById(clinicalCase.branchId);
    const item = {
      caseId: clinicalCase.id,
      title: clinicalCase.title,
      branchId: clinicalCase.branchId,
      branchName: branch?.name ?? 'Klinik branş',
      selected,
      correctAnswer: clinicalCase.diagnosis.correct,
      difficulty: clinicalCase.difficulty,
      lastWrongAt: Date.now(),
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

  const removeWrongAnswer = (caseId) => {
    setWrongAnswers((current) => current.filter((entry) => entry.caseId !== caseId));
  };

  const clearWrongAnswers = () => setWrongAnswers([]);

  const openWrongCase = (caseId) => {
    const clinicalCase = getCaseById(caseId);
    if (!clinicalCase || !accessibleCaseIds.has(clinicalCase.id)) return;
    clearAIQuestionTimer();
    setAIPracticeState(defaultAIPracticeState);
    closePearlStudy();
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
    if (!selectedBranchId) return;
    if (!visibleBranches.some((branch) => branch.id === selectedBranchId)) {
      setSelectedBranchId(null);
      setSelectedCaseId(null);
      return;
    }
    if (!branchCases.some((clinicalCase) => clinicalCase.id === selectedCaseId)) {
      setSelectedCaseId(branchCases[0]?.id ?? null);
    }
  }, [selectedBranchId, branchCases, selectedCaseId, visibleBranches]);

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
    isDemoUser ? wrongAnswers.filter((entry) => accessibleCaseIds.has(entry.caseId)) : wrongAnswers
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
    setMode('study');
    setPearlStudyState({ active: true, filter, branchFilter, catalogId });
    scrollToTopSmart({ smooth: false });
  }, []);

  const clearBranchRouteTimers = useCallback(() => {
    branchRouteTimers.current.forEach((timerId) => window.clearTimeout(timerId));
    branchRouteTimers.current = [];
  }, []);

  const handleSelectBranch = useCallback((branchId) => {
    clearAIQuestionTimer();
    setAIPracticeState(defaultAIPracticeState);
    closePearlStudy();
    if (isDemoUser && !visibleBranches.some((branch) => branch.id === branchId)) return;
    const branchPool = accessibleCaseIndex.byBranchId.get(branchId) ?? [];
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
  }, [accessibleCaseIndex, clearBranchRouteTimers, closePearlStudy, isDemoUser, visibleBranches]);

  const handleSelectCase = useCallback((caseId) => {
    if (!accessibleCaseIds.has(caseId)) return;
    setSelectedCaseId(caseId);
    scrollToTopSmart({ smooth: false });
  }, [accessibleCaseIds]);

  const handleRandomCase = useCallback(() => {
    if (!branchCases.length) return;
    const nextCase = pickRandom(branchCases, selectedCaseId) ?? branchCases[0];
    setSelectedCaseId(nextCase.id);
    scrollToTopSmart({ smooth: false });
  }, [branchCases, selectedCaseId]);

  const handleSubmitAnswer = useCallback(({ clinicalCase, selected, isCorrect }) => {
    const existingExamAnswer = examState?.active ? examState.answers?.[clinicalCase.id] : null;
    if (existingExamAnswer) return existingExamAnswer.attemptResult;

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
      return {
        attempts,
        correct,
        score,
        streak,
        bestStreak,
        accuracy: calculateAccuracy(correct, attempts),
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
  }, [addWrongAnswer, examState, sessionStats.streak]);


  const generateNextAIQuestion = useCallback((previousQuestionId = null, branchFilterOverride = aiBranchFilter) => {
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
        const result = await createAIQuestion({ previousQuestionId, branchFilter: branchFilterOverride });
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
  }, [aiBranchFilter]);

  const handleStartAIPractice = useCallback(() => {
    clearAIQuestionTimer();
    setMode('study');
    setExamState(null);
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setIsCaseSidebarOpen(true);
    closePearlStudy();
    generateNextAIQuestion(aiPracticeState.question?.id ?? null, aiBranchFilter);
    scrollToTopSmart({ smooth: false });
  }, [aiBranchFilter, aiPracticeState.question?.id, closePearlStudy, generateNextAIQuestion]);

  const handleGenerateNextAIQuestion = useCallback(() => {
    generateNextAIQuestion(aiPracticeState.question?.id ?? null, aiBranchFilter);
    scrollToTopSmart({ smooth: false });
  }, [aiBranchFilter, aiPracticeState.question?.id, closePearlStudy, generateNextAIQuestion]);

  const handleAIBranchFilterChange = useCallback((nextFilter) => {
    setAIBranchFilter(nextFilter);
    generateNextAIQuestion(null, nextFilter);
    scrollToTopSmart({ smooth: false });
  }, [generateNextAIQuestion]);

  const handleSubmitAIAnswer = useCallback(({ clinicalCase, selected, isCorrect }) => {
    const scored = scoreAttempt(clinicalCase.difficulty, isCorrect, aiPracticeStats.streak);
    const earnedPoints = isCorrect ? 5 : 0;

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
  }, [aiPracticeStats.streak]);

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
    clearAIQuestionTimer();
    setExamState(null);
    setAIPracticeState(defaultAIPracticeState);
    closePearlStudy();
    setMode('study');
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setIsCaseSidebarOpen(true);
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
      <nav className="top-shell-nav" aria-label="KlinikIQ üst gezinme">
        <button className="nav-brand nav-brand-icon-only" type="button" onClick={resetExamToHome} aria-label="KlinikIQ ana ekrana dön" title="KlinikIQ">
          <span className="nav-brand-mark nav-brand-mark-pulse" aria-hidden="true"><BrandMark title="" /></span>
        </button>
        <div className="segmented-control nav-mode-switch" aria-label="Öğrenme modu seçimi">
          <button
            type="button"
            className={mode === 'study' && !examState?.active ? 'active' : ''}
            onClick={resetExamToHome}
            aria-pressed={mode === 'study' && !examState?.active}
          >
            Öğrenme modu
          </button>
          <button
            type="button"
            className={mode === 'exam' || examState?.active ? 'active' : ''}
            onClick={() => setMode('exam')}
            aria-pressed={mode === 'exam' || examState?.active}
          >
            Sınav modu
          </button>
          <button
            type="button"
            className={hardMode ? 'active hard-mode-active' : ''}
            onClick={() => setHardMode((current) => !current)}
            aria-pressed={hardMode}
            title="Referans değerleri ve ipuçları azaltılır"
          >
            Zor mod
          </button>
        </div>
        <div className="nav-actions" aria-label="Oturum eylemleri">
          <span className="nav-user-chip nav-user-card" aria-label={`Kullanıcı ${currentUser.name}`} title={currentUser.name}>
            <Icon name="User" />
            <span className="nav-user-name">{currentUser.name}</span>
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
          <button type="button" className="btn btn-primary nav-cta" onClick={() => startBlockExam(accessibleCases, isDemoUser ? DEMO_EXAM_TITLE : 'Genel klinik blok sınavı')}>
            <Icon name="Timer" />
            <span>{isDemoUser ? 'Demo blok' : 'Blok sınav'}</span>
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

      {pearlStudyState.active ? (
        <TusPearlStudyScreen
          initialFilter={pearlStudyState.filter}
          initialBranchFilter={pearlStudyState.branchFilter}
          initialCatalogId={pearlStudyState.catalogId}
          onBack={resetExamToHome}
        />
      ) : aiPracticeState.active ? (
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
          onChangeBranchFilter={handleAIBranchFilterChange}
          onGenerateQuestion={handleGenerateNextAIQuestion}
          onSubmitAnswer={handleSubmitAIAnswer}
          onBackHome={resetExamToHome}
          tutorMode={tutorMode}
          onToggleTutorMode={handleToggleTutorMode}
          hardMode={hardMode}
        />
      ) : examState?.result ? (
        <ExamResults
          result={examState.result}
          onRestart={() => startBlockExam(accessibleCases, isDemoUser ? DEMO_EXAM_TITLE : 'Genel klinik blok sınavı')}
          onHome={resetExamToHome}
        />
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
            <CasePlayer
              clinicalCase={selectedCase}
              branch={resolveBranchById(selectedCase.branchId)}
              mode="exam"
              onRandomCase={noopRandomCase}
              onSubmitAnswer={handleSubmitAnswer}
              tutorMode={tutorMode}
              onToggleTutorMode={handleToggleTutorMode}
              hardMode={hardMode}
              examMeta={activeExamCaseMeta}
              onAdvanceExam={goToNextExamCase}
              onPreviousExam={goToPreviousExamCase}
              onFinishExam={finalizeExam}
            />
          </div>
        </section>
      ) : selectedBranch && selectedCase ? (
        <section className="page-shell case-page-shell case-page-bottomrail stable-case-page-shell">
          <section className="content-layout full-width-content-layout">
            <section className="branch-header-v8 card-surface">
              <div className="branch-header-v8-main">
                <button className="branch-back-v8" type="button" onClick={() => setSelectedBranchId(null)}>
                  <span aria-hidden="true">←</span>
                  <span>Branşlara dön</span>
                </button>
                <div className="branch-header-text">
                  <h2>{selectedBranch.name}</h2>
                  <p>{selectedBranch.description}</p>
                </div>
              </div>
              <div className="branch-inline-actions">
                <span className="branch-case-count">{branchCases.length} olgu</span>
                <button type="button" className="btn btn-primary" onClick={() => startBlockExam(branchCases, isDemoUser ? DEMO_EXAM_TITLE : `${selectedBranch.name} blok sınavı`)}>
                  {isDemoUser ? 'Demo bloku aç' : 'Branş bloku oluştur'}
                </button>
              </div>
            </section>

            <div className="case-route-transition" data-case-id={selectedCase.id}>
              <CasePlayer
                clinicalCase={selectedCase}
                branch={selectedBranch}
                mode={mode}
                onRandomCase={handleRandomCase}
                onSubmitAnswer={handleSubmitAnswer}
                tutorMode={tutorMode}
                onToggleTutorMode={handleToggleTutorMode}
                hardMode={hardMode}
              />
            </div>

            <section className="bottom-case-browser card-surface">
              <div className="bottom-case-browser-head">
                <div>
                  <h3>Diğer olgular</h3>
                </div>
                <span className="bottom-case-browser-count">{branchCases.length} olgu</span>
              </div>
              <CaseList cases={branchCases} selectedCaseId={selectedCase.id} onSelectCase={handleSelectCase} layout="horizontal" />
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
            <StudyReviewHub
              wrongAnswers={visibleWrongAnswers}
              onOpenCase={openWrongCase}
              onRemoveCase={removeWrongAnswer}
              onClearAll={clearWrongAnswers}
              onOpenPearlStudy={openPearlStudy}
            />
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
