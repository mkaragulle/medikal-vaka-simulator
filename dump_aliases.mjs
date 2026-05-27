import fs from 'fs';
import { getGlossaryTerms, normalizeGlossaryText } from './src/utils/glossary.js';
const terms = getGlossaryTerms();
const aliases = [];
for (const t of terms) {
  for (const a of [t.term, t.TurkishName, t.EnglishName, ...(Array.isArray(t.aliases) ? t.aliases : [])]) {
    if (a) aliases.push(normalizeGlossaryText(a));
  }
}
fs.writeFileSync('/mnt/data/v320_aliases.json', JSON.stringify(Array.from(new Set(aliases))));
fs.writeFileSync('/mnt/data/v320_terms.json', JSON.stringify(terms.map(t=>({term:t.term,id:t.id,aliases:t.aliases})), null, 2));
