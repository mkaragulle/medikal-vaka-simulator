import fs from 'fs';
import { getGlossaryTerms, normalizeGlossaryText } from './src/utils/glossary.js';
const terms=getGlossaryTerms();
const arr=[];
for(const e of terms){for(const x of [e.id,e.term,e.canonicalTerm,e.displayTerm,...(e.aliases||[])].filter(Boolean)){arr.push(normalizeGlossaryText(x));}}
fs.writeFileSync('/mnt/data/glossary_norms.json', JSON.stringify([...new Set(arr)], null, 2), 'utf8');
console.log(terms.length, arr.length);
