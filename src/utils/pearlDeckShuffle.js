function hashSeed(seed = Date.now()) {
  const input = String(seed);
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  let value = hashSeed(seed);
  return function random() {
    value += 0x6D2B79F5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function fisherYatesShuffle(items = [], seed = Date.now()) {
  const random = typeof seed === 'function' ? seed : mulberry32(seed);
  const output = [...items];
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  }
  return output;
}

function normalizeKey(value, fallback = 'genel') {
  return String(value || fallback)
    .trim()
    .toLocaleLowerCase('tr')
    .replace(/\s+/g, ' ') || fallback;
}

export function normalizeCardTopic(card = {}) {
  return normalizeKey(card.topic || card.subject || card.cardType || card.front, 'genel');
}

export function normalizeCardBranch(card = {}) {
  return normalizeKey(card.branchId || card.subject, 'genel');
}

function normalizeCardSubject(card = {}) {
  return normalizeKey(card.subject || card.topic || card.cardType || card.branchId, 'genel');
}

function getTagKeys(card = {}) {
  const tags = [...(card.tags || []), ...(card.keywords || [])]
    .map((item) => normalizeKey(item))
    .filter(Boolean);
  return tags.length ? Array.from(new Set(tags)).slice(0, 4) : [normalizeCardTopic(card)];
}

function getPrimaryTag(card = {}) {
  return getTagKeys(card)[0] || normalizeCardTopic(card);
}

function toSet(value) {
  if (value instanceof Set) return value;
  return new Set(Array.isArray(value) ? value : []);
}

export function getCardWeight(card = {}, userState = {}) {
  const wrongIds = toSet(userState.wrongIds);
  const reviewIds = toSet(userState.reviewIds);
  const knownIds = toSet(userState.knownIds);
  const favoriteIds = toSet(userState.favoriteIds);

  let weight = 1;
  if (wrongIds.has(card.id)) weight = Math.max(weight, 2.0);
  if (reviewIds.has(card.id)) weight = Math.max(weight, 1.7);
  if (favoriteIds.has(card.id)) weight = Math.max(weight, 1.2);
  if (knownIds.has(card.id)) weight = Math.min(weight, 0.5);
  if (card.status === 'new') weight = Math.max(weight, 1.0);
  if (card.source === 'user') weight += 0.08;
  return Math.max(0.35, Math.min(2.25, weight));
}

function makeSessionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return `study-session-${crypto.randomUUID()}`;
  return `study-session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function countTrailing(deck, keyGetter, candidate = null) {
  if (!deck.length) return 0;
  const key = candidate ? keyGetter(candidate) : keyGetter(deck[deck.length - 1]);
  let count = 0;
  for (let index = deck.length - 1; index >= 0; index -= 1) {
    if (keyGetter(deck[index]) !== key) break;
    count += 1;
  }
  return count;
}

function hasEnoughAlternative(groups, deck, candidate, keyGetter) {
  const candidateKey = keyGetter(candidate);
  return groups.some((group) => group.cards.some((card) => keyGetter(card) !== candidateKey && !wouldViolateStrict(deck, card, { maxSameTopicStreak: 1, maxSameBranchStreak: 99, maxSameTagStreak: 99 })));
}

function wouldViolateStrict(deck, candidate, options) {
  if (!deck.length || !candidate) return false;
  const {
    maxSameTopicStreak = 1,
    maxSameBranchStreak = 2,
    maxSameTagStreak = 2,
  } = options;

  if (countTrailing(deck, normalizeCardTopic, candidate) >= maxSameTopicStreak) return true;
  if (countTrailing(deck, normalizeCardBranch, candidate) >= maxSameBranchStreak) return true;
  if (countTrailing(deck, getPrimaryTag, candidate) >= maxSameTagStreak) return true;
  return false;
}

function wouldViolate(deck, candidate, groups, options) {
  if (!wouldViolateStrict(deck, candidate, options)) return false;

  const topicBlocked = countTrailing(deck, normalizeCardTopic, candidate) >= (options.maxSameTopicStreak ?? 1);
  const branchBlocked = countTrailing(deck, normalizeCardBranch, candidate) >= (options.maxSameBranchStreak ?? 2);
  const tagBlocked = countTrailing(deck, getPrimaryTag, candidate) >= (options.maxSameTagStreak ?? 2);

  if (topicBlocked && hasEnoughAlternative(groups, deck, candidate, normalizeCardTopic)) return true;
  if (branchBlocked && hasEnoughAlternative(groups, deck, candidate, normalizeCardBranch)) return true;
  if (tagBlocked && hasEnoughAlternative(groups, deck, candidate, getPrimaryTag)) return true;

  return false;
}

function makeGroupKey(card) {
  return `${normalizeCardTopic(card)}__${normalizeCardBranch(card)}`;
}

function buildGroups(cards, random, context) {
  const groups = new Map();
  cards.forEach((card) => {
    const groupKey = makeGroupKey(card);
    const current = groups.get(groupKey) || {
      key: groupKey,
      topic: normalizeCardTopic(card),
      branch: normalizeCardBranch(card),
      subject: normalizeCardSubject(card),
      cards: [],
    };
    current.cards.push(card);
    groups.set(groupKey, current);
  });

  return fisherYatesShuffle(Array.from(groups.values()), random).map((group) => ({
    ...group,
    cards: fisherYatesShuffle(group.cards, random)
      .map((card) => ({
        card,
        weight: getCardWeight(card, context.weightContext),
        recentPenalty: context.recentStartsSet.has(card.id) ? -2.2 : 0,
        jitter: random(),
      }))
      .sort((a, b) => (((b.weight - 1) * 0.18) + b.recentPenalty + b.jitter) - (((a.weight - 1) * 0.18) + a.recentPenalty + a.jitter))
      .map((entry) => entry.card),
  }));
}

function recentStartPenalty(card, deckIndex, options) {
  const windowSize = options.recentStartWindowSize ?? 20;
  if (!options.recentStartsSet?.has(card.id)) return 0;
  if (deckIndex < Math.min(windowSize, options.nonRecentCount || 0)) return -7.5;
  if (deckIndex < windowSize) return -3.5;
  return -0.35;
}

function getBranchSpacingPenalty(deck, candidate) {
  const candidateBranch = normalizeCardBranch(candidate);
  const lastThree = deck.slice(-3);
  return lastThree.reduce((penalty, card, index) => (
    normalizeCardBranch(card) === candidateBranch ? penalty - (0.85 / (lastThree.length - index)) : penalty
  ), 0);
}

function getTopicSpacingPenalty(deck, candidate) {
  const candidateTopic = normalizeCardTopic(candidate);
  const lastFive = deck.slice(-5);
  return lastFive.reduce((penalty, card, index) => (
    normalizeCardTopic(card) === candidateTopic ? penalty - (1.45 / (lastFive.length - index)) : penalty
  ), 0);
}

function chooseGroup(groups, deck, random, options) {
  const available = groups
    .filter((group) => group.cards.length)
    .map((group) => ({ group, candidate: group.cards[0] }));

  if (!available.length) return null;

  const strictPool = available.filter(({ candidate }) => !wouldViolate(deck, candidate, groups, options));
  const pool = strictPool.length ? strictPool : available;

  const scored = pool.map(({ group, candidate }) => {
    const groupSizeBonus = Math.log(group.cards.length + 1) * 0.42;
    const weightBonus = (getCardWeight(candidate, options.weightContext) - 1) * 0.28;
    const recentPenalty = recentStartPenalty(candidate, deck.length, options);
    const topicPenalty = getTopicSpacingPenalty(deck, candidate);
    const branchPenalty = getBranchSpacingPenalty(deck, candidate);
    const subjectPenalty = deck.slice(-3).some((card) => normalizeCardSubject(card) === group.subject) ? -0.55 : 0;
    return {
      group,
      score: random() + groupSizeBonus + weightBonus + recentPenalty + topicPenalty + branchPenalty + subjectPenalty,
    };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].group;
}

function canSwapInto(deck, index, candidate, options) {
  const before = deck.slice(Math.max(0, index - 3), index);
  const after = deck.slice(index + 1, Math.min(deck.length, index + 4));
  if (wouldViolateStrict(before, candidate, options)) return false;
  if (after.length && normalizeCardTopic(candidate) === normalizeCardTopic(after[0]) && options.maxSameTopicStreak <= 1) return false;
  if (after.length && normalizeCardBranch(candidate) === normalizeCardBranch(after[0]) && countTrailing([candidate], normalizeCardBranch, after[0]) >= options.maxSameBranchStreak) return false;
  return true;
}

function avoidRecentStarts(deck, recentStartsSet, options) {
  if (!recentStartsSet?.size || deck.length < 24) return deck;
  const output = [...deck];
  const windowSize = Math.min(options.recentStartWindowSize ?? 20, output.length);
  const nonRecentInDeck = output.filter((card) => !recentStartsSet.has(card.id)).length;
  if (nonRecentInDeck < Math.min(windowSize, 8)) return output;

  for (let index = 0; index < windowSize; index += 1) {
    if (!recentStartsSet.has(output[index].id)) continue;
    const swapIndex = output.findIndex((card, candidateIndex) => (
      candidateIndex >= windowSize
      && !recentStartsSet.has(card.id)
      && canSwapInto(output, index, card, options)
    ));
    if (swapIndex > -1) {
      [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
    }
  }
  return output;
}

function maxLocalStreak(cards, keyGetter, from = 0, to = cards.length - 1) {
  const start = Math.max(0, from);
  const end = Math.min(cards.length - 1, to);
  let maxStreak = 0;
  let previousKey = null;
  let streak = 0;
  for (let index = start; index <= end; index += 1) {
    const key = keyGetter(cards[index]);
    if (key === previousKey) streak += 1;
    else {
      previousKey = key;
      streak = 1;
    }
    maxStreak = Math.max(maxStreak, streak);
  }
  return maxStreak;
}

function hasBadLocalStreak(cards, index, options) {
  const radius = Math.max(options.maxSameBranchStreak ?? 2, options.maxSameTopicStreak ?? 1, options.maxSameTagStreak ?? 2) + 3;
  const from = Math.max(0, index - radius);
  const to = Math.min(cards.length - 1, index + radius);
  return (
    maxLocalStreak(cards, normalizeCardTopic, from, to) > (options.maxSameTopicStreak ?? 1)
    || maxLocalStreak(cards, normalizeCardBranch, from, to) > (options.maxSameBranchStreak ?? 2)
    || maxLocalStreak(cards, getPrimaryTag, from, to) > (options.maxSameTagStreak ?? 2)
  );
}

function wouldSwapImprove(cards, index, swapIndex, options) {
  if (index === swapIndex) return false;
  const output = [...cards];
  [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  return !hasBadLocalStreak(output, index, options) && !hasBadLocalStreak(output, swapIndex, options);
}

function smoothStreaks(deck, options) {
  if (deck.length < 4) return deck;
  const output = [...deck];
  const passes = 3;
  for (let pass = 0; pass < passes; pass += 1) {
    let changed = false;
    for (let index = 1; index < output.length; index += 1) {
      if (!hasBadLocalStreak(output, index, options)) continue;
      const currentTopic = normalizeCardTopic(output[index]);
      const currentBranch = normalizeCardBranch(output[index]);
      const currentTag = getPrimaryTag(output[index]);
      const candidateIndices = [
        ...output.map((_, candidateIndex) => candidateIndex).filter((candidateIndex) => candidateIndex > index),
        ...output.map((_, candidateIndex) => candidateIndex).filter((candidateIndex) => candidateIndex < index),
      ];
      const swapIndex = candidateIndices.find((candidateIndex) => {
        const card = output[candidateIndex];
        return (
          normalizeCardTopic(card) !== currentTopic
          && normalizeCardBranch(card) !== currentBranch
          && getPrimaryTag(card) !== currentTag
          && wouldSwapImprove(output, index, candidateIndex, options)
        );
      });
      if (swapIndex > -1) {
        [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
        changed = true;
      }
    }
    if (!changed) break;
  }
  return output;
}

function spreadBranches(deck, random, options) {
  if (deck.length < 4) return deck;
  const queues = new Map();
  deck.forEach((card) => {
    const branch = normalizeCardBranch(card);
    if (!queues.has(branch)) queues.set(branch, []);
    queues.get(branch).push(card);
  });

  const output = [];
  const total = deck.length;
  while (output.length < total) {
    const available = Array.from(queues.entries())
      .filter(([, cards]) => cards.length)
      .map(([branch, cards]) => ({ branch, candidate: cards[0], remaining: cards.length }));
    if (!available.length) break;

    const strict = available.filter(({ candidate }) => !wouldViolateStrict(output, candidate, options));
    const pool = strict.length ? strict : available;
    const scored = pool.map((entry) => {
      const recentPenalty = options.recentStartsSet?.has(entry.candidate.id) && output.length < (options.recentStartWindowSize ?? 20) ? -80 : 0;
      return {
        ...entry,
        score: (entry.remaining * 1.15) + (random() * 0.12) + getBranchSpacingPenalty(output, entry.candidate) + getTopicSpacingPenalty(output, entry.candidate) + recentPenalty,
      };
    });
    scored.sort((a, b) => b.score - a.score);
    const selected = scored[0];
    output.push(queues.get(selected.branch).shift());
  }
  return output;
}

function dedupeCards(cards = []) {
  return Array.from(new Map((cards || []).filter((card) => card?.id).map((card) => [card.id, card])).values());
}

export function analyzeDeckQuality(cards = [], options = {}) {
  const firstWindow = options.firstWindow ?? 20;
  const maxSameTopicStreak = options.maxSameTopicStreak ?? 1;
  const maxSameBranchStreak = options.maxSameBranchStreak ?? 2;
  let maxTopicStreak = 0;
  let maxBranchStreak = 0;
  let topicStreakViolations = 0;
  let branchStreakViolations = 0;

  cards.forEach((card, index) => {
    const topicStreak = countTrailing(cards.slice(0, index + 1), normalizeCardTopic);
    const branchStreak = countTrailing(cards.slice(0, index + 1), normalizeCardBranch);
    maxTopicStreak = Math.max(maxTopicStreak, topicStreak);
    maxBranchStreak = Math.max(maxBranchStreak, branchStreak);
    if (topicStreak > maxSameTopicStreak) topicStreakViolations += 1;
    if (branchStreak > maxSameBranchStreak) branchStreakViolations += 1;
  });

  return {
    total: cards.length,
    uniqueTopics: new Set(cards.map(normalizeCardTopic)).size,
    uniqueBranches: new Set(cards.map(normalizeCardBranch)).size,
    firstWindowIds: cards.slice(0, firstWindow).map((card) => card.id),
    firstWindowTopics: cards.slice(0, firstWindow).map(normalizeCardTopic),
    maxTopicStreak,
    maxBranchStreak,
    topicStreakViolations,
    branchStreakViolations,
  };
}

export function buildStudyDeck(cards = [], options = {}) {
  const {
    mode = 'all',
    sourceFilter = 'all',
    recentStarts = [],
    maxSameTopicStreak = 1,
    maxSameBranchStreak = 2,
    maxSameTagStreak = 2,
    maxDeckSize = null,
    seed = `${Date.now()}-${Math.random()}`,
    wrongIds = new Set(),
    reviewIds = new Set(),
    knownIds = new Set(),
    favoriteIds = new Set(),
    recentStartWindowSize = 20,
  } = options;

  const uniqueCards = dedupeCards(cards);
  const random = mulberry32(seed);
  const recentStartsSet = new Set(Array.isArray(recentStarts) ? recentStarts : []);
  const nonRecentCount = uniqueCards.filter((card) => !recentStartsSet.has(card.id)).length;
  const weightContext = { wrongIds, reviewIds, knownIds, favoriteIds };
  const groups = buildGroups(uniqueCards, random, { recentStartsSet, weightContext });
  const deck = [];

  while (groups.some((group) => group.cards.length)) {
    const group = chooseGroup(groups, deck, random, {
      maxSameTopicStreak,
      maxSameBranchStreak,
      maxSameTagStreak,
      recentStartsSet,
      recentStartWindowSize,
      nonRecentCount,
      weightContext,
    });
    if (!group) break;
    deck.push(group.cards.shift());
    if (maxDeckSize && deck.length >= maxDeckSize) break;
  }

  const polished = avoidRecentStarts(deck, recentStartsSet, {
    maxSameTopicStreak,
    maxSameBranchStreak,
    maxSameTagStreak,
    recentStartWindowSize,
    weightContext,
  });
  const branchSpread = spreadBranches(polished, random, {
    maxSameTopicStreak,
    maxSameBranchStreak,
    maxSameTagStreak,
    recentStartsSet,
    recentStartWindowSize,
  });
  const balanced = smoothStreaks(branchSpread, {
    maxSameTopicStreak,
    maxSameBranchStreak,
    maxSameTagStreak,
  });

  return {
    id: makeSessionId(),
    createdAt: Date.now(),
    mode,
    sourceFilter,
    seed: String(seed),
    cardIds: balanced.map((card) => card.id),
    currentIndex: 0,
  };
}
