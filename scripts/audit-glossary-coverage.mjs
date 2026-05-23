import { cases } from '../src/data/cases.js';
import { TUS_PEARL_CARDS } from '../src/data/tusPearlCards.js';
import { getGlossaryTerms, normalizeGlossaryText } from '../src/utils/glossary.js';

function collectStrings(value, out = []) {
  if (value == null) return out;
  if (typeof value === 'string') {
    if (value.trim()) out.push(value.trim());
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectStrings(item, out));
    return out;
  }
  if (typeof value === 'object') {
    Object.values(value).forEach((item) => collectStrings(item, out));
  }
  return out;
}

const glossary = getGlossaryTerms();
const normalizedAliases = new Set(glossary.flatMap((entry) => entry.normalizedAliases || []));
const curatedPatterns = [
  /(?:sağ|sol)\s+[a-zçğıöşü]+(?:\s+[a-zçğıöşü]+){0,3}/giu,
  /(?:aktif|pasif)\s+[a-zçğıöşü]+(?:\s+[a-zçğıöşü]+){0,2}/giu,
  /(?:postoperatif|preoperatif|akut|kronik)\s+[a-zçğıöşü]+(?:\s+[a-zçğıöşü]+){0,3}/giu,
  /[A-ZÇĞİÖŞÜ]{2,6}(?:\/[A-ZÇĞİÖŞÜ]{2,6})?\s+[a-zçğıöşü]+/gu,
  /[a-zçğıöşü]+\s+(?:ultrasonografi|tomografi|biyopsi|eksplorasyon|insizyon|hassasiyet|defisit|kaybı|yüksekliği|kalınlaşması|tutulumu|asidoz|sendromu)/giu,
];

const texts = [
  ...cases.flatMap((item) => collectStrings(item).map((text) => ({ source: `case:${item.id}`, text }))),
  ...TUS_PEARL_CARDS.flatMap((item) => collectStrings(item).map((text) => ({ source: `card:${item.id}`, text }))),
];

const NOISY_CANDIDATE_PATTERNS = [/\b(?:KlinikIQ|TUS|IQ yüksek|spot|extra|puan|yanıt|soru|aktif hatırlama|çekirdek|seçki)\b/iu];

const candidates = new Map();
for (const row of texts) {
  for (const pattern of curatedPatterns) {
    pattern.lastIndex = 0;
    for (const match of row.text.matchAll(pattern)) {
      const phrase = String(match[0] || '').replace(/\s+/g, ' ').trim();
      const normalized = normalizeGlossaryText(phrase);
      if (normalized.length < 5 || normalizedAliases.has(normalized)) continue;
      if (NOISY_CANDIDATE_PATTERNS.some((noise) => noise.test(phrase))) continue;
      const current = candidates.get(normalized) || { phrase, count: 0, examples: [] };
      current.count += 1;
      if (current.examples.length < 3) current.examples.push(row.source);
      candidates.set(normalized, current);
    }
  }
}

console.log(JSON.stringify({
  glossaryTerms: glossary.length,
  scannedCaseCount: cases.length,
  scannedFlashcardCount: TUS_PEARL_CARDS.length,
  uncoveredHighSignalCandidates: Array.from(candidates.values()).sort((a, b) => b.count - a.count).slice(0, 120),
}, null, 2));
