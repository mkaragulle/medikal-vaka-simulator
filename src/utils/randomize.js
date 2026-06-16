export function shuffleArray(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function pickRandom(items, excludeId) {
  const pool = excludeId ? items.filter((item) => item.id !== excludeId) : items;
  if (!pool.length) return items[0] ?? null;
  return pool[Math.floor(Math.random() * pool.length)];
}
