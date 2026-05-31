import { getGlossaryTerms, normalizeGlossaryText } from './src/utils/glossary.js';
const terms=getGlossaryTerms();
let norms=[];
for(const t of terms){ for(const x of [t.term,...(t.aliases||[])]) if(x) norms.push(normalizeGlossaryText(x)); }
import fs from 'fs'; fs.writeFileSync('/mnt/data/obgyn_active_norms_v405.json', JSON.stringify([...new Set(norms)],null,2)); console.log(terms.length, norms.length);
