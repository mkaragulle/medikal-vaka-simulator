export function getDifficultyMeta(difficulty = '') {
  const normalized = difficulty.toLocaleLowerCase('tr');

  if (normalized.includes('kritik')) {
    return { label: 'Kritik', points: 20, tone: 'critical' };
  }
  if (normalized.includes('zor') && normalized.includes('orta')) {
    return { label: 'Orta-zor', points: 18, tone: 'advanced' };
  }
  if (normalized.startsWith('zor')) {
    return { label: 'Zor', points: 19, tone: 'advanced' };
  }
  if (normalized.includes('acil')) {
    return { label: 'Acil', points: 17, tone: 'urgent' };
  }
  if (normalized.includes('temel-orta')) {
    return { label: 'Temel-orta', points: 12, tone: 'intermediate' };
  }
  if (normalized.startsWith('temel')) {
    return { label: 'Temel', points: 10, tone: 'foundation' };
  }
  if (normalized.includes('kolay') || normalized.includes('easy')) {
    return { label: 'Kolay', points: 10, tone: 'foundation' };
  }
  if (normalized.includes('orta') || normalized.includes('medium')) {
    return { label: 'Orta', points: 15, tone: 'intermediate' };
  }

  if (normalized.includes('zor') || normalized.includes('hard')) {
    return { label: 'Zor', points: 19, tone: 'advanced' };
  }

  return { label: 'Standart', points: 14, tone: 'intermediate' };
}

export function scoreAttempt(difficulty, isCorrect, currentStreak = 0) {
  const meta = getDifficultyMeta(difficulty);
  const nextStreak = isCorrect ? currentStreak + 1 : 0;
  const streakBonus = isCorrect ? Math.min(nextStreak - 1, 3) * 2 : 0;
  const earnedPoints = isCorrect ? meta.points + streakBonus : 0;

  return {
    difficultyMeta: meta,
    isCorrect,
    earnedPoints,
    possiblePoints: meta.points,
    streakBonus,
    nextStreak,
  };
}

export function calculateAccuracy(correct = 0, attempts = 0) {
  if (!attempts) return 0;
  return Math.round((correct / attempts) * 100);
}

export function formatPercent(value) {
  return `%${value}`;
}
