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
  return String(value || fallback).trim().toLocaleLowerCase('tr') || fallback;
}

function getTopicKey(card) {
  return normalizeKey(card.topic || card.subject || card.cardType || card.front, 'genel');
}

function getBranchKey(card) {
  return normalizeKey(card.branchId || card.subject, 'genel');
}

function getTagKeys(card) {
  const tags = [...(card.tags || []), ...(card.keywords || [])].map((item) => normalizeKey(item)).filter(Boolean);
  return tags.length ? tags : [getTopicKey(card)];
}

function getWeight(card, { wrongIds, reviewIds, knownIds }) {
  let weight = 1;
  if (reviewIds?.has(card.id)) weight += 0.5;
  if (wrongIds?.has(card.id)) weight += 1.15;
  if (knownIds?.has(card.id)) weight -= 0.45;
  if (card.source === 'user') weight += 0.12;
  return Math.max(0.35, weight);
}

function countStreak(deck, getKey) {
  if (!deck.length) return 0;
  const key = getKey(deck[deck.length - 1]);
  let count = 0;
  for (let index = deck.length - 1; index >= 0; index -= 1) {
    if (getKey(deck[index]) !== key) break;
    count += 1;
  }
  return count;
}

function violatesStreak(deck, candidate, { maxSameTopicStreak, maxSameBranchStreak }) {
  if (!deck.length) return false;
  const last = deck[deck.length - 1];
  if (getTopicKey(last) === getTopicKey(candidate) && countStreak(deck, getTopicKey) >= maxSameTopicStreak) return true;
  if (getBranchKey(last) === getBranchKey(candidate) && countStreak(deck, getBranchKey) >= maxSameBranchStreak) return true;
  const lastTags = new Set(getTagKeys(last));
  const sharesDominantTag = getTagKeys(candidate).some((tag) => lastTags.has(tag));
  return sharesDominantTag && getTopicKey(last) === getTopicKey(candidate) && maxSameTopicStreak <= 1;
}

function makeGroupKey(card) {
  return `${getTopicKey(card)}__${getBranchKey(card)}`;
}

function buildGroups(cards, random, weightContext) {
  const groups = new Map();
  cards.forEach((card) => {
    const groupKey = makeGroupKey(card);
    const current = groups.get(groupKey) || { key: groupKey, topic: getTopicKey(card), branch: getBranchKey(card), cards: [] };
    current.cards.push({ card, score: getWeight(card, weightContext) + random() });
    groups.set(groupKey, current);
  });

  return Array.from(groups.values()).map((group) => ({
    ...group,
    cards: fisherYatesShuffle(group.cards, random).sort((a, b) => b.score - a.score).map((entry) => entry.card),
  }));
}

function chooseGroup(groups, deck, random, options) {
  const candidates = groups
    .filter((group) => group.cards.length)
    .map((group) => ({ group, candidate: group.cards[0] }))
    .filter(({ candidate }) => !violatesStreak(deck, candidate, options));

  const pool = candidates.length ? candidates : groups.filter((group) => group.cards.length).map((group) => ({ group, candidate: group.cards[0] }));
  if (!pool.length) return null;

  const scored = pool.map(({ group, candidate }) => {
    const recentPenalty = options.recentStartsSet?.has(candidate.id) && deck.length < 12 ? -3 : 0;
    const topicPenalty = deck.length && getTopicKey(deck[deck.length - 1]) === group.topic ? -1.4 : 0;
    const branchPenalty = deck.length && getBranchKey(deck[deck.length - 1]) === group.branch ? -0.55 : 0;
    const weightBonus = getWeight(candidate, options.weightContext) * 0.9;
    const sizeBonus = Math.log(group.cards.length + 1) * 0.35;
    return { group, score: random() + weightBonus + sizeBonus + recentPenalty + topicPenalty + branchPenalty };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0].group;
}

function moveRecentStartsDown(deck, recentStartsSet, options) {
  if (!recentStartsSet?.size || deck.length < 16) return deck;
  const output = [...deck];
  const limit = Math.min(12, output.length);
  for (let index = 0; index < limit; index += 1) {
    if (!recentStartsSet.has(output[index].id)) continue;
    const swapIndex = output.findIndex((card, candidateIndex) => (
      candidateIndex >= limit
      && !recentStartsSet.has(card.id)
      && !violatesStreak(output.slice(Math.max(0, index - 2), index), card, options)
    ));
    if (swapIndex > -1) [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  }
  return output;
}

export function buildStudyDeck(cards = [], options = {}) {
  const {
    mode = 'all',
    sourceFilter = 'all',
    recentStarts = [],
    maxSameTopicStreak = 1,
    maxSameBranchStreak = 2,
    seed = `${Date.now()}-${Math.random()}`,
    wrongIds = new Set(),
    reviewIds = new Set(),
    knownIds = new Set(),
  } = options;

  const uniqueCards = Array.from(new Map((cards || []).filter(Boolean).map((card) => [card.id, card])).values());
  const random = mulberry32(seed);
  const recentStartsSet = new Set(recentStarts || []);
  const weightContext = { wrongIds, reviewIds, knownIds };
  const groups = buildGroups(uniqueCards, random, weightContext);
  const deck = [];

  while (groups.some((group) => group.cards.length)) {
    const group = chooseGroup(groups, deck, random, {
      maxSameTopicStreak,
      maxSameBranchStreak,
      recentStartsSet,
      weightContext,
    });
    if (!group) break;
    deck.push(group.cards.shift());
  }

  const polished = moveRecentStartsDown(deck, recentStartsSet, {
    maxSameTopicStreak,
    maxSameBranchStreak,
    recentStartsSet,
    weightContext,
  });

  return {
    id: `study-session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
    mode,
    sourceFilter,
    seed: String(seed),
    cardIds: polished.map((card) => card.id),
  };
}
