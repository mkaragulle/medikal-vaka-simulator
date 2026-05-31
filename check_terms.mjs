import { getGlossaryTerms, normalizeGlossaryText } from './src/utils/glossary.js';
const terms=getGlossaryTerms();
const set=new Set();
for(const e of terms){[e.term,e.canonicalTerm,e.displayTerm,...(e.aliases||[])].filter(Boolean).forEach(x=>set.add(normalizeGlossaryText(x)))}
const q=process.argv.slice(2);
for(const t of q){console.log(t, set.has(normalizeGlossaryText(t))?'EXISTS':'MISSING')}
