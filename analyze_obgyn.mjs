import { cases } from './src/data/cases.js';
import { TUS_PEARL_CARDS } from './src/data/tusPearlCards.js';
import { TUS_PEARL_OBGYN_FIRST64_TEXT_OVERRIDES } from './src/data/tusPearlObgynFirst64Overrides.js';
function rec(obj, path='', out=[]) {
  if (obj == null) return out;
  if (typeof obj === 'string') { if(obj.trim()) out.push({path,text:obj}); return out; }
  if (Array.isArray(obj)) { obj.forEach((v,i)=>rec(v,`${path}[${i}]`,out)); return out; }
  if (typeof obj === 'object') { Object.entries(obj).forEach(([k,v])=>rec(v,path?`${path}.${k}`:k,out)); }
  return out;
}
const keys=['kadın','doğum','jinek','obst','geb','uter','ovary','over','serviks','plasenta','fetal','fetus','adneks','vajin','endomet','preeklampsi','eklampsi','partum','amenore','pelvik','meme'];
const obgynCases=cases.filter(c=>{
  const s=JSON.stringify(c).toLocaleLowerCase('tr');
  return (c.relatedBranch||'').toLocaleLowerCase('tr').includes('kadın') || keys.some(k=>s.includes(k));
});
const obgynCards=TUS_PEARL_CARDS.filter(c=>{
  const s=JSON.stringify(c).toLocaleLowerCase('tr');
  return (c.subject||'').toLocaleLowerCase('tr').includes('kadın') || keys.some(k=>s.includes(k));
});
const overrides=Object.values(TUS_PEARL_OBGYN_FIRST64_TEXT_OVERRIDES||{});
console.log(JSON.stringify({cases:obgynCases.length,cards:obgynCards.length,overrides:overrides.length},null,2));
let texts=[];
for(const c of obgynCases) texts.push(...rec(c,`cases.${c.id||''}`));
for(const c of obgynCards) texts.push(...rec(c,`tusPearlCards.${c.id||''}`));
for(const [id,o] of Object.entries(TUS_PEARL_OBGYN_FIRST64_TEXT_OVERRIDES||{})) texts.push(...rec(o,`tusPearlObgynFirst64Overrides.${id}`));
console.log('texts',texts.length);
// Count occurrences of curated keyword bank
const terms=[
'Rüptüre ektopik gebelik','Ektopik gebelik','Gebeliği bilinmeyen lokalizasyon','Seri beta-hCG','Diskriminatuvar zon','Transvajinal ultrasonografi','İntrauterin kese','Adneksiyal kitle','Hemoperitoneum','Metotreksat tedavisi','Salpenjektomi','Dilatasyon küretaj','Spontan abortus','Missed abortus','Septik abortus','Molar gebelik','Hidatidiform mol','Komplet mol','Parsiyel mol','Gestasyonel trofoblastik neoplazi','Koryokarsinom','Theca lutein kisti','Gebelikte hiperemezis','Hiperemezis gravidarum','Rh izoimmünizasyonu','Anti-D immünoglobulin','Kleihauer-Betke testi','İndirekt Coombs testi','Preeklampsi','Ağır özellikli preeklampsi','Eklampsi','HELLP sendromu','Magnezyum sülfat','Hidralazin','Labetalol','Nifedipin','Proteinüri','Uteroplasental yetmezlik','İntrauterin gelişme kısıtlılığı','Oligohidramnios','Polihidramnios','Plasenta previa','Plasenta dekolmanı','Vasa previa','Plasenta akreata spektrumu','Uterin atoni','Postpartum kanama','Bakri balon','B-Lynch sütürü','Uterin inversiyon','Uterin rüptür','Omuz distosisi','McRoberts manevrası','Suprapubik bası','Turtle sign','Koryoamniyonit','Preterm eylem','Preterm erken membran rüptürü','Tokoliz','Kortikosteroid fetal akciğer maturasyonu','Nöroprotektif magnezyum sülfat','Grup B streptokok profilaksisi','Bishop skoru','Indüksiyon','Amniyotomi','Non-stres test','Biyofizik profil','Geç deselerasyon','Değişken deselerasyon','Umbilikal arter Doppler','Gestasyonel diyabet','Oral glukoz tolerans testi','Makrozomi','Polikistik over sendromu','Rotterdam kriterleri','Hirsutizm','Anovulasyon','Primer amenore','Sekonder amenore','Asherman sendromu','Hipotalamik amenore','Prematür over yetmezliği','Hiperprolaktinemi','Galaktore','Endometriozis','Endometrioma','Adenomyozis','Leiomyom','Submüköz miyom','Endometrial hiperplazi','Anormal uterin kanama','PALM-COEIN','Endometrial biyopsi','Postmenopozal kanama','Servikal intraepitelyal neoplazi','HPV 16/18','Pap smear','Kolposkopi','LEEP','Serviks kanseri','Endometrium kanseri','Over kanseri','CA-125','BRCA1/2','Granüloza hücreli tümör','Sertoli-Leydig hücreli tümör','Disgerminom','Yolk sac tümörü','Krukenberg tümörü','Ovarian torsiyon','Adneksiyal torsiyon','Tuboovaryan apse','Pelvik inflamatuvar hastalık','Servisit','Bakteriyel vajinozis','Trichomonas vajiniti','Vulvovajinal kandidiyazis','Atrofik vajinit','Liken sklerozus','Bartholin apsesi','Stress üriner inkontinans','Urge inkontinans','Pelvik organ prolapsusu','Sistosel','Rektosel','Rahim sarkması','Pudendal sinir bloğu','Histerektomi','Myomektomi','Konizasyon','Adneksiyal kitle','Antenatal takip','Fetal kalp hızı trasesi','Kategori III fetal kalp hızı','Acil sezaryen','İkizden ikize transfüzyon sendromu','Monokoryonik ikiz','Rhogam','Loşi','Puerperal mastit','Endometrit','Puerperal sepsis','Laktasyon amenoresi','Emzirme mastiti','Sheehan sendromu'
];
const norm=s=>s.toLocaleLowerCase('tr').replace(/ı/g,'i').replace(/İ/g,'i').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ö/g,'o').replace(/ç/g,'c');
const all=texts.map(t=>({path:t.path,text:t.text,n:norm(t.text)}));
const counts=[];
for (const term of terms){
 const n=norm(term);
 const hits=all.filter(x=>x.n.includes(n));
 if(hits.length) counts.push({term,count:hits.length,examples:hits.slice(0,2)});
}
counts.sort((a,b)=>b.count-a.count);
console.log(JSON.stringify(counts.slice(0,200),null,2));
// dump all source texts to file
import fs from 'fs';
fs.writeFileSync('/mnt/data/obgyn_sources_v405.json',JSON.stringify({summary:{cases:obgynCases.length,cards:obgynCards.length,overrides:overrides.length,texts:texts.length},texts},null,2));
