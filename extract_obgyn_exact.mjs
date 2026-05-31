import { cases } from './src/data/cases.js';
import { TUS_PEARL_CARDS } from './src/data/tusPearlCards.js';
import { TUS_PEARL_OBGYN_FIRST64_TEXT_OVERRIDES } from './src/data/tusPearlObgynFirst64Overrides.js';
function rec(obj, path='', out=[]) {
  if (obj == null) return out;
  if (typeof obj === 'string') { if (obj.trim()) out.push({ path, text: obj }); return out; }
  if (Array.isArray(obj)) { obj.forEach((v,i)=>rec(v,`${path}[${i}]`,out)); return out; }
  if (typeof obj === 'object') { Object.entries(obj).forEach(([k,v])=>rec(v,path?`${path}.${k}`:k,out)); }
  return out;
}
const obgynCases=cases.filter(c=>String(c.relatedBranch||'').toLocaleLowerCase('tr').includes('kadın') || String(c.relatedBranch||'').toLocaleLowerCase('tr').includes('doğum'));
const obgynCards=TUS_PEARL_CARDS.filter(c=>String(c.subject||'').toLocaleLowerCase('tr').includes('kadın') || String(c.subject||'').toLocaleLowerCase('tr').includes('doğum'));
const overrides=TUS_PEARL_OBGYN_FIRST64_TEXT_OVERRIDES||{};
let texts=[];
for(const c of obgynCases) texts.push(...rec(c,`src/data/cases.js::${c.id||''}`));
for(const c of obgynCards) texts.push(...rec(c,`src/data/tusPearlCards.js::${c.id||''}`));
for(const [id,o] of Object.entries(overrides)) texts.push(...rec(o,`src/data/tusPearlObgynFirst64Overrides.js::${id}`));
import fs from 'fs';
fs.writeFileSync('/mnt/data/obgyn_exact_sources_v405.json',JSON.stringify({summary:{cases:obgynCases.length,cards:obgynCards.length,overrides:Object.keys(overrides).length,texts:texts.length},texts},null,2));
console.log(JSON.stringify({summary:{cases:obgynCases.length,cards:obgynCards.length,overrides:Object.keys(overrides).length,texts:texts.length}},null,2));
