import fs from 'fs';
import { rawCases } from './src/data/cases.js';

function clean(s='') { return String(s||'').replace(/\s+/g,' ').replace(/\s+([,.;:!?])/g,'$1').trim(); }
function lower(s=''){return String(s||'').toLowerCase('tr')}
function has(h, arr){h=lower(h); return arr.some(x=>h.includes(lower(x)));}
function split(s=''){return clean(s).split(/(?<=[.!?])\s+/).map(clean).filter(Boolean)}
function inv(id,label,type,purpose,summary,interpretation,values=[]){return {id,label,type,priority:'essential',subtype:'',purpose,summary,clinicalMeaning:interpretation,result:{title:label,summary,interpretation,values},postAnswerExplanation:interpretation}}
function key(c){return `${c.title} ${c.diagnosis?.correct} ${c.stem}`}

function examBetter(c){
 const h=lower(key(c));
 if (has(h,['vibrio cholerae','kolera','bol sulu kansız ishal'])) return ['Hasta belirgin dehidratedir; mukozalar kuru, gözler çökük ve cilt turgoru azalmıştır.', 'Karın yumuşaktır; kanlı dışkı veya belirgin peritoneal irritasyon bulgusu yoktur.'];
 if (has(h,['cmv retiniti','gansiklovir'])) return ['Oftalmoskopide retina boyunca beyaz nekrotizan odaklar ve hemorajiler izlenir.', 'Tedavi sonrası ateş odağı olmadan lökopeni gelişmesi ilaç toksisitesini düşündürür.'];
 if (has(h,['hcv pozitif','iğne batması'])) return ['İğne batması yüzeyel ama kanla kontaminedir; yara hemen yıkanmıştır.', 'Cerrahta sarılık, ateş veya sistemik bulgu yoktur; olay temas sonrası değerlendirme aşamasındadır.'];
 if (has(h,['clostridioides','psödomembranöz'])) return ['Hasta dehidratasyona eğilimlidir; batında yaygın kramp tarzı hassasiyet vardır.', 'Peritoneal irritasyon yoktur; antibiyotik kullanımı sonrası sulu ishal ön plandadır.'];
 if (has(h,['pneumocystis','hipoksemik interstisyel'])) return ['Hasta takipneiktir; oskültasyon bulguları belirgin olmayabilir.', 'Oksijen satürasyonu eforla düşer; oral kandidiyazis eşlik edebilir.'];
 if (has(h,['candida albicans','germ tüp'])) return ['Mukozada silinebilir beyaz plaklar ve eritemli zemin izlenir.', 'Sistemik toksisite yoktur; örnek doğrudan mikolojik incelemeye uygundur.'];
 if (has(h,['borrelia','lyme'])) return ['Kene tutunma yerinde genişleyen halka şeklinde eritemli plak vardır.', 'Meningeal irritasyon veya artrit bulgusu bu erken evrede belirgin değildir.'];
 if (has(h,['brucella'])) return ['Ateş dalgalı seyreder; hepatosplenomegali ve yaygın kas-eklem hassasiyeti olabilir.', 'Pastörize edilmemiş süt ürünü ve hayvancılık öyküsü sorgulanır.'];
 if (has(h,['entamoeba'])) return ['Sağ üst kadranda hassasiyet ve ateş vardır; kanlı mukuslu dışkı öyküsü eşlik eder.', 'Karaciğer hassasiyeti bağırsak dışı tutulum açısından uyarıcıdır.'];
 if (has(h,['yersinia'])) return ['Talasemi ve deferoksamin öyküsü olan çocuk toksik görünümlüdür.', 'İshal ve ateşle birlikte sepsis bulguları izlenir.'];
 if (has(h,['scid','ağır kombine immün'])) return ['Bebekte yaygın moniliazis, pnömoni bulguları ve büyüme geriliği vardır.', 'Lenf dokusu belirgin değildir; ağır enfeksiyonlara rağmen lenfosit sayısı düşüktür.'];
 if (has(h,['spinal musküler','werdnig'])) return ['Bebekte belirgin hipotoni, dil fasikülasyonu ve arefleksi vardır.', 'Duyu muayenesi korunmuş görünür; kreatin kinaz belirgin yüksek değildir.'];
 if (has(h,['itp','trombositopenik'])) return ['Çocuk iyi görünümlüdür; peteşi-purpura dışında muayene doğaldır.', 'Lenfadenopati, hepatosplenomegali veya kemik ağrısı saptanmaz.'];
 if (has(h,['coombs negatif','fetomaternal'])) return ['Bebek soluktur; hepatosplenomegali, hidrops veya kanama odağı saptanmaz.', 'Periferik yaymada hemoliz bulgusu yoktur.'];
 if (has(h,['bronşiolit'])) return ['İnfant takipneiktir; subkostal çekilme, yaygın hışıltı ve ince raller vardır.', 'Beslenme sırasında yorulma vardır; bakteriyel toksik görünüm belirgin değildir.'];
 if (has(h,['otitis media','akut otitis'])) return ['Otoskopide timpan membran hiperemik, opak ve bombeleşmiş görünür.', 'Mastoid hassasiyet veya meningeal irritasyon bulgusu yoktur.'];
 if (has(h,['akut apandisit'])) return ['Sağ alt kadranda hassasiyet ve rebound vardır; psoas/obturator irritasyon bulguları değerlendirilebilir.', 'Ağrının periumbilikal bölgeden sağ alt kadrana göçmesi muayeneyle desteklenir.'];
 if (has(h,['akut kolesistit'])) return ['Sağ üst kadranda hassasiyet ve sonografik Murphy bulgusu vardır.', 'Sarılık belirgin değilse koledok taşı/kolanjit olasılığı daha geride kalır.'];
 if (has(h,['mezenter iskemi'])) return ['Ağrı şiddeti fizik muayenedeki hassasiyetten belirgin fazladır.', 'İleri evrede peritonit bulguları gelişebilir; atriyal fibrilasyon veya vasküler risk sorgulanır.'];
 if (has(h,['over torsiyonu'])) return ['Alt batında tek taraflı belirgin hassasiyet vardır; ateş ve pürülan akıntı yoktur.', 'Büyümüş adneksiyal kitle palpasyonla ağrılıdır.'];
 if (has(h,['akut açı kapanması'])) return ['Göz kızarık ve ağrılıdır; kornea ödemli, pupil orta genişlikte ve ışığa zayıf yanıtlıdır.', 'Bulantı-kusma eşlik edebilir; görme bulanıklığı ani başlamıştır.'];
 if (has(h,['retina dekolmanı'])) return ['Görme alanında perde inmesi tariflenir; ağrı ve dış göz kızarıklığı yoktur.', 'Fundus değerlendirmesinde retina elevasyonu izlenebilir.'];
 if (has(h,['kompartman'])) return ['Etkilenen ekstremite kompartmanı gergin ve ağrılıdır; pasif germe ağrıyı artırır.', 'Distal nabızların alınması tanıyı dışlamaz; parestezi eşlik edebilir.'];
 if (has(h,['organofosfat'])) return ['Miyozis, bronkore, salivasyon, terleme ve bradikardi kolinerjik toksidromu destekler.', 'Fasikülasyon ve solunum sekresyonu solunum yetmezliği riski oluşturur.'];
 if (has(h,['opioid'])) return ['Bilinç baskılanması, miyozis ve solunum depresyonu birlikte saptanır.', 'Travma bulgusu yoksa opioid toksidromu öncelikli düşünülür.'];
 if (has(h,['beta bloker'])) return ['Hasta bradikardik ve hipotansiftir; cilt soğuk, mental durum dalgalıdır.', 'Hipoglisemi eşlik edebilir; bronkospazm beta bloker tipine göre görülebilir.'];
 if (has(h,['malign hipertermi'])) return ['Anestezi sırasında hızla yükselen end-tidal CO₂, kas rijiditesi ve hipertermi izlenir.', 'Taşikardi ve metabolik asidoz gelişir.'];
 if (has(h,['baroreseptör'])) return ['Ayağa kalkınca kısa süreli baş dönmesi olur; birkaç saniye içinde nabız artar.', 'Ortotatik hipotansiyon kalıcı değildir; refleks taşikardi yanıtı korunmuştur.'];
 const current=(c.exam||[]).filter(Boolean);
 if (current.length && !current.join(' ').match(/Muayene,|hedef sistem|Vital bulgular/)) return current;
 const stemPhys=split(c.stem).filter(s=>/muayene|saptan|izlen|duyul|bulun|vardır|yoktur|hassas|ödem|döküntü|raller|üfürüm|defisit|peteşi|purpura|ikter|stridor|wheezing|hışıltı|kitle|ağrı/i.test(s));
 if(stemPhys.length) return stemPhys.slice(0,2);
 return [`Hasta ${c.demographics || 'klinik başvuru'} profiline uygun şekilde değerlendirilir; belirgin acil instabilite olup olmadığı kaydedilir.`, `${c.title} için beklenen odak bulgular muayenede araştırılır ve ayırıcı tanılarla karşılaştırılır.`];
}

function investigationsBetter(c){
 const h=lower(key(c)); const correct=c.diagnosis?.correct || c.title;
 if (has(h,['vibrio cholerae','kolera','bol sulu kansız ishal'])) return [inv('stool-dark-field','Dışkı karanlık alan mikroskobisi ve kültürü','microbiology','Sulu ishal etkenini ve hareket paternini göstermek.','Çok hızlı hareketli, eğri gram negatif basiller görülür; kültürde oksidaz pozitif üreme olur.','Yıldız kayması tarzı hareket ve oksidaz pozitiflik Vibrio cholerae lehinedir.', [['Karanlık alan','Hızlı hareketli eğri basil','Yok','Pozitif'],['Oksidaz','Pozitif','Negatif','Destekleyici']]), inv('cholera-electrolyte','Elektrolitler ve böbrek fonksiyonu','lab','Dehidratasyonun ağırlığını değerlendirmek.','Hemokonsantrasyon ve prerenal azotemi saptanır.','Öncelik hızlı sıvı-elektrolit replasmanıdır.', [['Sodyum','150 mEq/L','135–145','Yüksek'], ['Kreatinin','1,7 mg/dL','0,6–1,2','Yüksek']])];
 if (has(h,['cmv retiniti','gansiklovir'])) return [inv('fundus-cmv','Dilate fundus muayenesi','eye','Retinit paternini değerlendirmek.','Retinada nekrotizan beyaz lezyonlar ve hemorajiler izlenir.','AIDS hastasında CMV retiniti tanısını destekler.', [['Retina','Nekroz + hemoraji','Normal','Anormal']]), inv('ganciclovir-cbc','Tam kan sayımı','lab','Gansiklovir ilişkili kemik iliği baskılanmasını izlemek.','Nötropeni ve lökopeni gelişmiştir.','Lökopeni gelişirse foskarnet alternatif olabilir.', [['Lökosit','900/mm³','4.000–10.000','Düşük'], ['Nötrofil','500/mm³','>1.500','Düşük']])];
 if (has(h,['hcv pozitif','iğne batması'])) return [inv('hcv-baseline','Temas sonrası anti-HCV ve ALT','lab','Sağlık çalışanının başlangıç durumunu belgelemek.','Başlangıç anti-HCV ve ALT kaydedilir.','Profilaktik aşı/immünglobulin yoktur; serolojik ve RNA izlemi yapılır.', [['Anti-HCV','Negatif','Negatif','Başlangıç'], ['ALT','32 U/L','<40','Normal']]), inv('hcv-rna-follow','2–4. hafta HCV RNA','lab','Erken bulaşın moleküler olarak saptanması.','Kontrolde HCV RNA istenir.','Erken RNA takibi temas sonrası uygun yaklaşımdır.', [['HCV RNA','Takipte bakılacak','Negatif','İzlem']])];
 if (has(h,['clostridioides','psödomembranöz'])) return [inv('cdiff-toxin','Dışkıda C. difficile toksin/NAAT','microbiology','Antibiyotik ilişkili kolitin etkenini göstermek.','Toksin/NAAT pozitif saptanır.','Antibiyotik sonrası sulu ishalle birlikte C. difficile tanısını destekler.', [['Toksin/NAAT','Pozitif','Negatif','Kritik']]), inv('cdiff-cbc','Hemogram ve albumin','lab','Ağır kolit bulgularını değerlendirmek.','Lökositoz ve hipoalbüminemi olabilir.','Hastalık şiddetini belirlemeye yardım eder.', [['Lökosit','18.600/mm³','4.000–10.000','Yüksek'], ['Albumin','2,9 g/dL','3,5–5,0','Düşük']])];
 if (has(h,['pneumocystis'])) return [inv('pcp-abg','Arter kan gazı ve LDH','lab','Hipoksemi ve doku hasarı düzeyini değerlendirmek.','PaO₂ düşüktür ve LDH yükselmiştir.','HIV hastasında interstisyel pnömoniyle birlikte PCP lehinedir.', [['PaO₂','58 mmHg','80–100','Düşük'], ['LDH','520 U/L','<250','Yüksek']]), inv('pcp-imaging','Akciğer grafisi/BT','imaging','İnterstisyel pnömoni paternini göstermek.','Bilateral difüz interstisyel infiltrasyon izlenir.','Pneumocystis jirovecii pnömonisini destekler.', [['Akciğer','Bilateral interstisyel infiltrasyon','Normal','Anormal']])];
 const current=c.availableInvestigations||[];
 if(current.length && !JSON.stringify(current).match(/Hedef|Tanıyla uyumlu|Klinik tabloya uygun|Ana parametre|Ayırt ettirici bulgu/)) return current;
 if (c.relatedBranch === 'Tıbbi Mikrobiyoloji') return [inv('micro-sample','Örnek mikroskobisi, kültür veya seroloji','microbiology','Öyküdeki temas ve enfeksiyon odağına göre etkeni göstermek.','Etkeni düşündüren özgül mikroskobik, kültürel veya serolojik bulgu saptanır.','Sonuç, öyküdeki maruziyet ve muayene bulgularıyla birlikte yorumlandığında '+correct+' olasılığını güçlendirir.', [['Etken bulgusu',correct,'Negatif','Pozitif']]), inv('micro-severity','Hemogram, CRP ve organ fonksiyonları','lab','Enfeksiyonun sistemik etkisini ve tedavi güvenliğini değerlendirmek.','İnflamasyon veya organ etkilenimini gösteren destekleyici değişiklikler vardır.','Ağır hastada tedavi, kültür sonucu beklenmeden klinik önceliğe göre başlanır.', [['Lökosit','14.800/mm³','4.000–10.000','Yüksek'], ['CRP','68 mg/L','<5','Yüksek']])];
 if (c.relatedBranch === 'Tıbbi Patoloji') return [inv('path-morphology','Biyopsi mikroskopisi','pathology','Lezyonun temel morfolojik paternini göstermek.','Mikroskopide '+correct+' ile uyumlu ayırt ettirici morfoloji izlenir.','Tanı, morfolojik patern ve gerekirse destekleyici boyalarla kurulur.', [['Morfoloji',correct,'Normal doku','Anormal']]), inv('path-special','Özel boya veya immünohistokimya','pathology','Benzer lezyonları birbirinden ayırmak.','Destekleyici boya/immünohistokimya sonucu tanıyı güçlendirir.','Tek başına klinik öykü değil, doku bulgusu belirleyicidir.', [['Destekleyici test','Pozitif','Negatif','Destekleyici']])];
 if (c.relatedBranch === 'Tıbbi Farmakoloji') return [inv('pharm-bedside','EKG, vital bulgular ve toksidrom değerlendirmesi','toxicology','İlaç etkisinin kalp, solunum ve bilinç üzerindeki sonucunu görmek.','Maruziyetle uyumlu vital veya EKG değişikliği vardır.','Tedavi veya antidot seçimi klinik şiddete göre yapılır.', [['Maruziyet', 'Öyküyle uyumlu', 'Yok', 'Destekleyici'], ['Vital/EKG','Etkilenmiş','Normal','Anormal']]), inv('pharm-lab','Biyokimya, kan gazı ve ilaç düzeyi','lab','Organ hasarı ve metabolik bozukluğu değerlendirmek.','Tedaviyi yönlendiren biyokimyasal anormallik saptanır.','Antidot kararı sonuçlar beklenmeden klinik şiddetle verilebilir.', [['pH/enzim/ilaç düzeyi','Etkilenmiş','Normal','Anormal']])];
 return current.map(x=>{
   const y=JSON.parse(JSON.stringify(x));
   y.label=clean(y.label).replace(/^Hedef /,'').replace('Uygun görüntüleme/laboratuvar','Görüntüleme veya laboratuvar sonucu').replace('Hedef mikrobiyolojik inceleme','Örnek mikroskobisi/kültürü').replace('Hedef tanısal inceleme','Ayırıcı tanı testi').replace('Hedef laboratuvar paneli','Laboratuvar paneli');
   y.purpose=clean(y.purpose).replace(/Öykü ve muayenede öne çıkan sistemi objektif olarak değerlendirmek\.?/,'Öyküde öne çıkan klinik soruyu ölçülebilir veriyle desteklemek.').replace(/Benzer seçenekleri ayıran bulguyu göstermek\.?/,'Benzer tanı ve yaklaşımları ayıran objektif bulguyu göstermek.');
   y.summary=clean(y.summary).replace(/Tanıyla uyumlu/g, correct).replace(/Klinik tabloya uygun/g, 'Olguyu açıklayan').replace(/tanıyı destekleyen ölçülebilir anormallik saptanır/i, `${correct} lehine ölçülebilir anormallik saptanır`).replace(/Ayırıcı tanıyı daraltan özgül bulgu saptanır/i, `${correct} lehine ayırt ettirici bulgu saptanır`);
   y.clinicalMeaning=clean(y.clinicalMeaning).replace(/Tanıyla uyumlu/g, correct).replace(/hedef /gi,'').replace(/objektif veri sağlar/i,'kararı destekler');
   if(y.result){ y.result.title=y.label; y.result.summary=y.summary; y.result.interpretation=y.clinicalMeaning; y.result.values=(y.result.values||[]).map(row=>row.map(cell=>clean(cell).replace(/Tanıyla uyumlu/g, correct).replace(/Ana parametre/g,'Karar parametresi').replace(/Ayırt ettirici bulgu/g,'Ayırıcı bulgu'))); }
   return y;
 });
}

function introBetter(c, exam, invs){
 const intro={...(c.patientIntro||{})};
 const h=lower(key(c)); const correct=c.diagnosis?.correct||c.title;
 if ((intro.distinctiveClues||[]).join(' ').match(/Muayene,|hedef sistem|Tanıyla uyumlu|Hedef/)) {
   intro.distinctiveClues=[exam[0], invs[0]?.summary].filter(Boolean).slice(0,2);
 }
 if ((intro.riskContext||[]).join(' ').match(/aynı klinik yönde|zamanlama, klinik stabilite|klinik önceliği/)) {
   if (has(h,['anemi','demir'])) intro.riskContext=['Menoraji ve pika öyküsü kronik demir kaybını düşündürür.', 'Mikrositoz ve ferritin düşüklüğü talasemi taşıyıcılığı veya kronik hastalık anemisinden ayrımı sağlar.'];
   else if (c.relatedBranch==='Tıbbi Mikrobiyoloji') intro.riskContext=['Maruziyet öyküsü, inkübasyon süresi ve örnek türü etken ayrımında belirleyicidir.', 'Dehidratasyon, sepsis veya immünsüpresyon varlığı tedavi aciliyetini artırır.'];
   else if (c.relatedBranch==='Tıbbi Farmakoloji') intro.riskContext=['İlacın dozu, alım zamanı ve hedef organ etkisi antidot kararını belirler.', 'Hava yolu, solunum, dolaşım ve ritim bozukluğu önce güvenlik açısından değerlendirilir.'];
   else intro.riskContext=[`${correct} olasılığı, öyküdeki baskın bulgu ile objektif veri aynı yönde olduğunda güçlenir.`, 'Acil tedavi gerektiren kırmızı bayraklar ilk değerlendirmede dışlanır.'];
 }
 return intro;
}

function rebuildFeedback(c){
 const correct=c.diagnosis?.correct; const opts=c.diagnosis?.options||[]; const intro=c.patientIntro||{}; const invs=c.availableInvestigations||[]; const exam=c.exam||[];
 const why=`${intro.historySummary} ${exam[0]||''} ${invs[0]?.label||'Tanısal inceleme'} sonucunda ${invs[0]?.summary||'kararı destekleyen bulgu saptanır'}. Bu bütünlük ${correct} yanıtını en uygun seçenek yapar.`;
 const templates=[
  (opt)=>`${opt} seçeneği için beklenen ana bulgu bu olguda baskın değildir; öykü ve objektif veriler ${correct} lehine daha tutarlıdır.`,
  (opt)=>`${opt}, ayırıcı tanıda düşünülebilir; fakat muayene ve tetkik sonucu bu seçeneği birincil yanıt yapacak patern göstermemektedir.`,
  (opt)=>`${opt} bu vakadaki zamanlama, fizik muayene ve laboratuvar/görüntüleme verilerini ${correct} kadar iyi açıklamaz.`,
  (opt)=>`${opt} yaklaşımı seçilseydi ek bulgu veya farklı tetkik sonucu beklenirdi; mevcut veriler ${correct} kararını destekler.`
 ];
 const whyWrong={}; opts.forEach((opt,idx)=>{whyWrong[opt]=opt===correct?why:templates[idx%templates.length](opt)});
 const evidence=[{title:'Öykü',text:intro.historySummary},{title:'Muayene',text:exam[0]||''},{title:'Tetkik',text:invs[0]?.summary||''}];
 const pearls=[{label:'Karar verdiren ipucu', text:(intro.distinctiveClues||[])[0]||exam[0]||''},{label:'Objektif destek', text:invs[0]?.summary||''}];
 const differentials=Object.fromEntries(opts.map((opt,idx)=>[opt,{explanation:whyWrong[opt],comparisonPoints:[(intro.distinctiveClues||[])[0],exam[0],invs[0]?.summary].filter(Boolean).slice(0,3)}]));
 c.diagnosis.explanation=why; c.diagnosis.pearls=pearls; c.diagnosis.answerFeedback={...(c.diagnosis.answerFeedback||{}),whyCorrect:why,evidenceChain:evidence,pearls,whyWrong,differentialComparison:differentials,differentials,learningOutcome:`Bu vaka, ${correct} kararını öykü, muayene ve seçilmiş tetkik verileriyle kurmayı öğretir.`};
}

const out=rawCases.map((c)=>{
 const nc=JSON.parse(JSON.stringify(c));
 nc.exam=examBetter(nc);
 nc.availableInvestigations=investigationsBetter(nc);
 nc.patientIntro=introBetter(nc,nc.exam,nc.availableInvestigations);
 nc.stem=nc.patientIntro.historySummary;
 rebuildFeedback(nc);
 return nc;
});
const output = `import { applyTusLanguageStandardToCase } from '../utils/tusLanguageStandard.js';\n\nexport const rawCases = ${JSON.stringify(out,null,2)};\n\nconst sanitizedCases = rawCases.map(applyTusLanguageStandardToCase);\n\nexport const cases = sanitizedCases;\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
fs.writeFileSync('src/data/cases.js', output);
