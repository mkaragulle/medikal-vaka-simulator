import { rawCases } from './src/data/cases.js';
const ids=['new375','v241-peds-001-kucuk-bas-ve-yaygin-petesi','v241-peds-005-yavaslayan-buyume-hizi'];
for (const id of ids) {
 const c=rawCases.find(x=>x.id===id || x.id?.includes(id));
 console.log('---', id, c?.id, c?.title);
 if (c) console.log(JSON.stringify(c,null,2).slice(0,20000));
}
