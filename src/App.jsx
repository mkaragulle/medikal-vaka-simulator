import { useEffect, useMemo, useRef, useState } from 'react';
import './index.css';
import BranchSelector from './components/BranchSelector.jsx';
import CaseList from './components/CaseList.jsx';
import CasePlayer from './components/CasePlayer.jsx';
import HomeCommandCenter from './components/HomeCommandCenter.jsx';
import AuthPanel from './components/AuthPanel.jsx';
import WrongAnswersPanel from './components/WrongAnswersPanel.jsx';
import ExamResults from './components/ExamResults.jsx';
import { Icon, BrandMark, ThemeToggle, BranchTransitionVisual, branchIconById } from './components/ui.jsx';
import { branches } from './data/branches.js';
import { cases, getCaseById, getCasesByBranch } from './data/cases.js';
import { scoreAttempt, calculateAccuracy } from './utils/scoring.js';
import { pickRandom, shuffleArray } from './utils/randomize.js';
import { localBackend } from './services/localBackend.js';
import { isGoogleAuthConfigured, signInWithGoogle } from './services/googleAuth.js';

const STATS_STORAGE_KEY = 'klinikiq-session-stats-v2';
const EXAM_HISTORY_STORAGE_KEY = 'klinikiq-exam-history-v2';
const THEME_STORAGE_KEY = 'klinikiq-theme-v1';
const BRANCH_TRANSITION_MS = 1750;
const BRANCH_TRANSITION_FADE_MS = 280;
const USERS_STORAGE_KEY = 'klinikiq-auth-users-v1';
const CURRENT_USER_STORAGE_KEY = 'klinikiq-auth-current-user-v1';

const DEMO_CASE_IDS = [
  'cv-anterior-stemi-001',
  'im-dka-001',
  'neuro-mca-stroke-001',
  'ped-intussusception-001',
  'surg-appendicitis-001',
];

const DEMO_EXAM_TITLE = '5 vakalık ücretsiz demo blok';

const defaultStats = {
  attempts: 0,
  correct: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  accuracy: 0,
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

function App() {
  const [currentUser, setCurrentUser] = useState(() => sanitizeUser(loadCurrentUser()));
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [mode, setMode] = useState('study');
  const [hardMode, setHardMode] = useState(false);
  const [theme, setTheme] = useState(() => loadStoredValue(THEME_STORAGE_KEY, 'dark'));
  const [tutorMode, setTutorMode] = useState(true);
  const [sessionStats, setSessionStats] = useState(() => currentUser?.stats ?? loadStoredValue(STATS_STORAGE_KEY, defaultStats));
  const [examHistory, setExamHistory] = useState(() => currentUser?.examHistory ?? loadStoredValue(EXAM_HISTORY_STORAGE_KEY, []));
  const [wrongAnswers, setWrongAnswers] = useState(() => currentUser?.wrongAnswers ?? []);
  const [examState, setExamState] = useState(null);
  const [clockTick, setClockTick] = useState(Date.now());
  const [isCaseSidebarOpen, setIsCaseSidebarOpen] = useState(true);
  const [branchRouteTransition, setBranchRouteTransition] = useState(null);
  const branchRouteTimers = useRef([]);
  const isDemoUser = isDemoAccount(currentUser);

  const demoCases = useMemo(() => resolveDemoCases(), []);
  const accessibleCases = useMemo(() => (isDemoUser ? demoCases : cases), [isDemoUser, demoCases]);
  const accessibleCaseIds = useMemo(() => new Set(accessibleCases.map((clinicalCase) => clinicalCase.id)), [accessibleCases]);
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
    () => (selectedBranchId ? getCasesByBranch(selectedBranchId).filter((clinicalCase) => accessibleCaseIds.has(clinicalCase.id)) : []),
    [selectedBranchId, accessibleCaseIds],
  );

  const selectedCase = useMemo(() => {
    if (examState?.active) {
      const examCaseId = examState.caseIds[examState.currentIndex];
      if (!accessibleCaseIds.has(examCaseId)) return accessibleCases[0] ?? null;
      return getCaseById(examCaseId) ?? accessibleCases[0] ?? null;
    }
    if (!selectedCaseId) return branchCases[0] ?? null;
    if (!accessibleCaseIds.has(selectedCaseId)) return branchCases[0] ?? null;
    return getCaseById(selectedCaseId) ?? branchCases[0] ?? null;
  }, [selectedCaseId, branchCases, examState, accessibleCaseIds, accessibleCases]);

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);

    return { ok: true, message: '5 vakalık demo başlatıldı.' };
  };

  const handleLogout = () => {
    localBackend.remove(CURRENT_USER_STORAGE_KEY);
    setCurrentUser(null);
    setSessionStats(defaultStats);
    setExamHistory([]);
    setWrongAnswers([]);
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setExamState(null);
    setMode('study');
  };

  const addWrongAnswer = (clinicalCase, selected) => {
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
  };

  const removeWrongAnswer = (caseId) => {
    setWrongAnswers((current) => current.filter((entry) => entry.caseId !== caseId));
  };

  const clearWrongAnswers = () => setWrongAnswers([]);

  const openWrongCase = (caseId) => {
    const clinicalCase = getCaseById(caseId);
    if (!clinicalCase || !accessibleCaseIds.has(clinicalCase.id)) return;
    setMode('study');
    setExamState(null);
    setSelectedBranchId(clinicalCase.branchId);
    setSelectedCaseId(clinicalCase.id);
    setIsCaseSidebarOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    return () => {
      document.documentElement.classList.remove('klinikiq-auth-lock');
      document.body.classList.remove('klinikiq-auth-lock');
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
  }, []);

  const remainingSeconds = useMemo(() => {
    if (!examState?.active) return 0;
    const elapsed = Math.floor((clockTick - examState.startedAt) / 1000);
    return Math.max(0, examState.durationSeconds - elapsed);
  }, [examState, clockTick]);

  useEffect(() => {
    if (examState?.active && remainingSeconds === 0) {
      finalizeExam();
    }
  }, [examState?.active, remainingSeconds]);

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

  const clearBranchRouteTimers = () => {
    branchRouteTimers.current.forEach((timerId) => window.clearTimeout(timerId));
    branchRouteTimers.current = [];
  };

  const handleSelectBranch = (branchId) => {
    if (isDemoUser && !visibleBranches.some((branch) => branch.id === branchId)) return;
    const branchPool = getCasesByBranch(branchId).filter((clinicalCase) => accessibleCaseIds.has(clinicalCase.id));
    if (!branchPool.length) return;
    const branchMeta = resolveBranchById(branchId);

    clearBranchRouteTimers();
    setBranchRouteTransition({
      active: true,
      phase: 'selecting',
      branchId,
      iconName: branchIconById[branchId] ?? 'Activity',
      title: branchMeta?.name ?? branchMeta?.shortName ?? 'Klinik branş',
      caseCount: branchPool.length,
    });

    const selectTimer = window.setTimeout(() => {
      setSelectedBranchId(branchId);
      setSelectedCaseId(branchPool[0]?.id ?? null);
      setIsCaseSidebarOpen(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setBranchRouteTransition((current) => current ? { ...current, phase: 'reveal' } : null);
    }, BRANCH_TRANSITION_MS);

    const finishTimer = window.setTimeout(() => {
      setBranchRouteTransition(null);
    }, BRANCH_TRANSITION_MS + BRANCH_TRANSITION_FADE_MS);

    branchRouteTimers.current = [selectTimer, finishTimer];
  };

  const handleSelectCase = (caseId) => {
    if (!accessibleCaseIds.has(caseId)) return;
    setSelectedCaseId(caseId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRandomCase = () => {
    if (!branchCases.length) return;
    const nextCase = pickRandom(branchCases, selectedCaseId) ?? branchCases[0];
    setSelectedCaseId(nextCase.id);
  };

  const handleSubmitAnswer = ({ clinicalCase, selected, isCorrect }) => {
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
  };

  function startBlockExam(sourceCases = accessibleCases, title = isDemoUser ? DEMO_EXAM_TITLE : 'Genel klinik blok sınavı') {
    const safeSourceCases = (Array.isArray(sourceCases) ? sourceCases : accessibleCases)
      .filter((clinicalCase) => accessibleCaseIds.has(clinicalCase.id));
    const pool = isDemoUser
      ? accessibleCases
      : buildExamPool(safeSourceCases.length ? safeSourceCases : accessibleCases, 10, cases);
    if (!pool.length) return;
    setMode('exam');
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

  const goToNextExamCase = () => {
    setExamState((current) => {
      if (!current) return current;
      const nextIndex = Math.min(current.currentIndex + 1, current.caseIds.length - 1);
      return { ...current, currentIndex: nextIndex };
    });
  };

  const goToPreviousExamCase = () => {
    setExamState((current) => {
      if (!current) return current;
      const nextIndex = Math.max(current.currentIndex - 1, 0);
      return { ...current, currentIndex: nextIndex };
    });
  };

  function finalizeExam() {
    setExamState((current) => {
      if (!current?.active) return current;

      const elapsed = Math.floor((Date.now() - current.startedAt) / 1000);
      const timeUsedSeconds = Math.min(current.durationSeconds, elapsed);
      const review = current.caseIds
        .filter((caseId) => accessibleCaseIds.has(caseId))
        .map((caseId) => {
          const item = getCaseById(caseId);
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
        });

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
  }

  const resetExamToHome = () => {
    setExamState(null);
    setMode('study');
    setSelectedBranchId(null);
    setSelectedCaseId(null);
    setIsCaseSidebarOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <button className="nav-brand" type="button" onClick={resetExamToHome} aria-label="Ana ekrana dön">
          <span className="nav-brand-mark" aria-hidden="true"><BrandMark title="" /></span>
          <span className="nav-brand-copy"><strong>KlinikIQ</strong><small>TUS odaklı klinik olgu simülatörü</small></span>
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
          <span className="nav-user-chip" aria-label={`Kullanıcı ${currentUser.name}`}>
            <Icon name="User" />
            <span>{currentUser.name}</span>
          </span>
          <button type="button" className="nav-wrong-chip" onClick={() => { setSelectedBranchId(null); setSelectedCaseId(null); setExamState(null); setMode('study'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Yanlış çözülenler">
            <span>Yanlış</span>
            <strong>{visibleWrongAnswers.length}</strong>
          </button>
          <span className="nav-score-chip" aria-label={`Puan ${sessionStats.score}`}><span>Puan</span><strong>{sessionStats.score}</strong></span>
          <button type="button" className="btn btn-primary nav-cta" onClick={() => startBlockExam(accessibleCases, isDemoUser ? DEMO_EXAM_TITLE : 'Genel klinik blok sınavı')}>
            <Icon name="Timer" />
            <span>{isDemoUser ? 'Demo blok' : 'Blok sınav'}</span>
          </button>
          <ThemeToggle theme={theme} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} />
          <button type="button" className="btn btn-icon" onClick={handleLogout} aria-label="Çıkış yap">
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
            </div>
          </div>
        </div>
      ) : null}

      {examState?.result ? (
        <ExamResults
          result={examState.result}
          onRestart={() => startBlockExam(accessibleCases, isDemoUser ? DEMO_EXAM_TITLE : 'Genel klinik blok sınavı')}
          onHome={resetExamToHome}
        />
      ) : examState?.active && selectedCase ? (
        <section className="page-shell exam-active-shell">
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

          <div key={selectedCase.id} className="case-route-transition">
            <CasePlayer
              clinicalCase={selectedCase}
              branch={resolveBranchById(selectedCase.branchId)}
              mode="exam"
              onRandomCase={() => {}}
              onSubmitAnswer={handleSubmitAnswer}
              tutorMode={tutorMode}
              onToggleTutorMode={() => setTutorMode((current) => !current)}
              hardMode={hardMode}
              examMeta={{
                active: true,
                title: examState.title,
                currentIndex: examState.currentIndex,
                total: examState.caseIds.length,
                answers: examState.answers,
                remainingSeconds,
              }}
              onAdvanceExam={goToNextExamCase}
              onPreviousExam={goToPreviousExamCase}
              onFinishExam={finalizeExam}
            />
          </div>
        </section>
      ) : selectedBranch && selectedCase ? (
        <section className={`page-shell case-page-shell case-page-bottomrail ${branchRouteTransition?.phase === 'reveal' ? 'branch-route-reveal' : ''}`.trim()}>
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

            <div key={selectedCase.id} className="case-route-transition">
              <CasePlayer
                clinicalCase={selectedCase}
                branch={selectedBranch}
                mode={mode}
                onRandomCase={handleRandomCase}
                onSubmitAnswer={handleSubmitAnswer}
                tutorMode={tutorMode}
                onToggleTutorMode={() => setTutorMode((current) => !current)}
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
                <p>Bu hesap yalnızca 5 sabit demo vakasına erişebilir. Premium vaka havuzu, branş arşivi ve genel blok sınavları kapalıdır.</p>
              </div>
              <button type="button" className="btn btn-primary" onClick={() => startBlockExam(accessibleCases, DEMO_EXAM_TITLE)}>
                <Icon name="Timer" /> 5 vakalık demoyu başlat
              </button>
            </section>
          ) : null}
          <HomeCommandCenter
            mode={mode}
            onChangeMode={setMode}
            stats={sessionStats}
            leaderboardEntries={leaderboardEntries}
            onStartExam={() => startBlockExam(accessibleCases, isDemoUser ? DEMO_EXAM_TITLE : 'Genel klinik blok sınavı')}
            totalCases={accessibleCases.length}
            totalBranches={visibleBranches.length}
            examCount={examHistory.length}
          />
          <WrongAnswersPanel
            wrongAnswers={visibleWrongAnswers}
            onOpenCase={openWrongCase}
            onRemoveCase={removeWrongAnswer}
            onClearAll={clearWrongAnswers}
          />
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
