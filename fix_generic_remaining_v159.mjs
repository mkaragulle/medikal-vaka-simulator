import fs from 'fs';
import { rawCases } from './src/data/cases.js';

function inv(id, label, type, purpose, summary, values = []) {
  return { id, label, type, priority:'essential', subtype:'', purpose, summary, clinicalMeaning:summary, result:{title:label, summary, interpretation:summary, values}, postAnswerExplanation:summary };
}
function norm(s){return String(s||'').toLocaleLowerCase('tr-TR');}
function examFor(c){
  const t=norm(`${c.title} ${c.diagnosis?.correct} ${c.chiefComplaint}`);
  if(/st elevasyon|miyokart|göğüs ağrısı/.test(t)) return ['Hasta soğuk terli ve anksiyetelidir; prekordiyal oskültasyonda taşikardi dışında belirgin kapak üfürümü yoktur.','Akciğer bazallerinde hafif ral olabilir; periferik nabızlar simetriktir.'];
  if(/diseksiyon|nabız farkı|aort/.test(t)) return ['Sağ ve sol kolda kan basıncı farklı ölçülür; periferik nabızlardan biri zayıftır.','Nörolojik defisit ve aort yetmezliği üfürümü açısından hızlı muayene yapılır.'];
  if(/tamponad|juguler/.test(t)) return ['Juguler venöz dolgunluk belirgindir; kalp sesleri derinden ve zayıf duyulur.','Hasta hipotansiftir; pulsus paradoksus değerlendirmesi tamponad şüphesini artırır.'];
  if(/pulmoner ödem|ortopne|raller|kalp yetmez/.test(t)) return ['Hasta oturur pozisyonda solumayı tercih eder; her iki akciğer bazal ve orta zonlarda ince raller duyulur.','S3 veya S4 duyulabilir; pretibial ödem ve juguler venöz dolgunluk eşlik edebilir.'];
  if(/eforla senkop|hipertrofik/.test(t)) return ['Sol sternal kenarda sistolik üfürüm duyulur; Valsalva ile üfürüm şiddeti artar.','İstirahat muayenesinde siyanoz yoktur; efor öyküsüyle birlikte kardiyak senkop düşünülür.'];
  if(/kussmaul|ketoasidoz|dka|anyon/.test(t)) return ['Mukozalar kuru, cilt turgoru azalmış ve kapiller dolum gecikmiştir.','Derin ve hızlı Kussmaul solunumu ile aseton kokusu fark edilir.'];
  if(/pankreatit|epigastrik/.test(t)) return ['Epigastriumda belirgin hassasiyet vardır; ağrı sırta doğru yayılır.','Barsak sesleri azalmış olabilir; defans-rebound başlangıçta belirgin değildir.'];
  if(/varis|hematemez|siroz/.test(t)) return ['Skleralarda ikter, spider anjiyom ve asit gibi kronik karaciğer hastalığı bulguları izlenir.','Rektal tuşede melena saptanabilir; taşikardi hipovolemiyi destekler.'];
  if(/hiperkalsemi|böbrek taşı|hiperparatiroid/.test(t)) return ['Dehidratasyon bulguları ve hafif kostovertebral açı hassasiyeti olabilir.','Kas güçsüzlüğü, kabızlık ve taş öyküsü hiperkalsemiyle birlikte değerlendirilir.'];
  if(/pulmoner emboli|plöritik/.test(t)) return ['Hasta takipneiktir; akciğer oskültasyonu çoğu zaman belirgin konsolidasyon göstermez.','Tek taraflı baldır hassasiyeti veya şişliği venöz tromboz odağını destekleyebilir.'];
  if(/koah|hiperkapni|pürülan balgam/.test(t)) return ['Ekspiryum uzamış, yaygın ronküs ve wheezing duyulur.','Aksesuar solunum kasları kullanılır; siyanoz veya uykuya meyil hiperkapniyi düşündürür.'];
  if(/siadh|hiponatremi/.test(t)) return ['Hasta klinik olarak övolemiktir; belirgin ödem, ortostatik hipotansiyon veya mukozal kuruluk yoktur.','Nörolojik muayenede hafif konfüzyon dışında fokal defisit saptanmaz.'];
  if(/addison|adrenal/.test(t)) return ['Cilt ve mukozalarda yaygın hiperpigmentasyon vardır; hasta zayıf ve dehidrate görünür.','Sıvıya rağmen süren hipotansiyon adrenal kriz olasılığını güçlendirir.'];
  if(/tirotoksik|tremor|tiroid/.test(t)) return ['Cilt sıcak ve nemlidir; ince tremor, taşikardi ve belirgin ajitasyon vardır.','Guatr veya oftalmopati varlığı etiyoloji açısından ayrıca değerlendirilir.'];
  if(/nefrotik|proteinüri|ödem/.test(t)) return ['Periorbital ödem, pretibial gode bırakan ödem ve asit saptanır.','Kan basıncı ve akciğer oskültasyonu sıvı yükü açısından değerlendirilir.'];
  if(/temporal|çene klaudikasyonu/.test(t)) return ['Temporal arter hassas ve kalınlaşmış palpe edilir; aynı tarafta saçlı deri hassasiyeti vardır.','Görme keskinliği ve pupilla yanıtı iskemik optik nöropati açısından değerlendirilir.'];
  if(/lupus|fotosensitivite|nefrit/.test(t)) return ['Malar döküntü, fotosensitif deri lezyonları ve küçük eklemlerde hassasiyet saptanır.','Pretibial ödem veya hipertansiyon böbrek tutulumunu düşündürebilir.'];
  if(/gut|podagra/.test(t)) return ['Birinci metatarsofalangeal eklem kızarık, sıcak ve aşırı hassastır.','Ateş ve yaygın selülit bulgusu yoksa kristal artriti daha olasıdır.'];
  if(/invajinasyon|pseudokidney|kanlı mukus/.test(t)) return ['Bebek ağlama nöbetleri arasında halsiz görünür; batında sağ üst/orta bölgede sosis şeklinde kitle palpe edilebilir.','Rektal muayenede kanlı mukus görülebilir; peritonit bulgusu başlangıçta yoktur.'];
  if(/pilor/.test(t)) return ['Bebek emme sonrası fışkırır tarzda kusar; dehidratasyon bulguları vardır.','Epigastriumda zeytin benzeri kitle palpe edilebilir.'];
  if(/epiglottit|salya|tripod/.test(t)) return ['Çocuk toksik görünümlüdür, öne eğilerek oturur ve salyasını yutamaz.','Orofarenks muayenesi hava yolu riski nedeniyle zorlanmaz; inspiratuvar stridor duyulur.'];
  if(/bronşiolit|hışıltı/.test(t)) return ['İnfant takipneiktir; interkostal çekilmeler ve yaygın ekspiratuvar wheezing vardır.','Beslenme azalması ve hafif hipoksemi hastalık şiddetini gösterir.'];
  if(/krup|havlar/.test(t)) return ['Havlar tarzda öksürük ve inspiratuvar stridor vardır; çocuk toksik görünmez.','Akciğer oskültasyonunda alt hava yolu konsolidasyonu bulgusu baskın değildir.'];
  if(/febril nöbet/.test(t)) return ['Nöbet sonrası çocuk hızla eski bilinç düzeyine döner; fokal nörolojik bulgu yoktur.','Menenjizm, uzun süren postiktal konfüzyon veya tekrarlayan nöbet saptanmaz.'];
  if(/purpura|henoch|itp/.test(t)) return ['Alt ekstremitelerde palpabl purpura vardır; eklem hassasiyeti ve karın hassasiyeti eşlik edebilir.','Hepatosplenomegali veya yaygın lenfadenopati yoksa malignite daha az olasıdır.'];
  if(/biliyer atrezi|akolik/.test(t)) return ['Bebekte skleral ikter ve hepatomegali vardır; dışkı rengi açık, idrar koyudur.','Genel durum korunmuş olabilir ancak kolestaz bulguları belirgindir.'];
  if(/nekrotizan enterokolit|abdominal distansiyon/.test(t)) return ['Prematüre bebekte abdominal distansiyon, hassasiyet ve beslenme intoleransı vardır.','Karın duvarında eritem veya sistemik instabilite perforasyon riskini düşündürür.'];
  if(/respiratuvar distres|inleme|retikülogranüler/.test(t)) return ['Prematüre yenidoğanda inleme, burun kanadı solunumu ve interkostal çekilmeler izlenir.','Oksijen ihtiyacı artmıştır; kardiyak üfürüm baskın bulgu değildir.'];
  if(/fallot|siyanotik|çömelme/.test(t)) return ['Santral siyanoz ve çomak parmak eğilimi vardır; pulmoner odakta sistolik üfürüm duyulur.','Çömelme sonrası siyanozun azalması sağ-sol şant fizyolojisini destekler.'];
  if(/koarktasyon|femoral/.test(t)) return ['Üst ekstremite kan basıncı alt ekstremiteden yüksektir; femoral nabızlar zayıf ve gecikmelidir.','Sırtta interskapular bölgede sistolik üfürüm duyulabilir.'];
  if(/yabancı cisim/.test(t)) return ['Tek taraflı solunum sesi azalması ve lokalize wheezing vardır.','Ateş ve yaygın enfeksiyon bulgusu olmadan ani başlangıç aspirasyonu destekler.'];
  if(/pertussis|whoop/.test(t)) return ['Paroksismal öksürük nöbetleri sonrası kusma olabilir; akciğer muayenesi aralarda normale yakındır.','Aşı durumu ve temas öyküsü tanısal olasılığı artırır.'];
  if(/obstrüksiyon|distansiyon|obstipasyon/.test(t)) return ['Batın distandü, timpanik ve barsak sesleri metalik karakterdedir.','Herniler ve önceki cerrahi skarları obstrüksiyon nedeni açısından değerlendirilir.'];
  if(/serbest hava|perfore/.test(t)) return ['Batında yaygın defans ve rebound vardır; hasta hareketsiz yatmayı tercih eder.','Omuz ağrısı ve tahta karın görünümü perforasyon lehinedir.'];
  if(/divertikülit|sol alt/.test(t)) return ['Sol alt kadranda lokalize hassasiyet ve düşük dereceli ateş vardır.','Yaygın peritonit bulgusu yoksa komplike olmayan divertikülit düşünülür.'];
  if(/herni|kasık şişliği/.test(t)) return ['Kasıkta hassas, redükte edilemeyen şişlik vardır; üzerindeki cilt gergin olabilir.','Bulantı, kusma ve karın distansiyonu strangülasyon riskini artırır.'];
  if(/mezenter iskemi/.test(t)) return ['Hastanın ağrısı belirgindir ancak batın muayenesi başlangıçta beklenenden daha siliktir.','Atrial fibrilasyon veya vasküler hastalık öyküsü embolik iskemi riskini artırır.'];
  if(/nekrotizan fasiit/.test(t)) return ['Etkilenen bölgede ağrı muayene bulgusundan fazladır; ciltte gerginlik, bül veya krepitasyon gelişebilir.','Sistemik toksisite ve hızla ilerleyen yumuşak doku bulguları cerrahi aciliyeti gösterir.'];
  if(/anal fissür/.test(t)) return ['Anal kanalda posterior orta hatta lineer fissür görülür; muayene ağrı nedeniyle sınırlıdır.','Perianal apse veya fistül ağzı saptanmaz.'];
  if(/meme kanseri|meme kitlesi/.test(t)) return ['Memede sert, düzensiz sınırlı ve fikse kitle palpe edilir.','Aksiller lenf nodu ve cilt çekintisi varlığı malignite lehine değerlendirilir.'];
  if(/splen|dalak/.test(t)) return ['Sol üst kadranda hassasiyet ve defans vardır; sol omuza vuran ağrı tariflenir.','Taşikardi ve solukluk intraabdominal kanama riskini düşündürür.'];
  if(/plasenta previa|ağrısız parlak/.test(t)) return ['Uterus yumuşaktır ve palpasyonla hassas değildir; kanama parlak kırmızı renktedir.','Vajinal muayene plasenta previa dışlanmadan yapılmaz.'];
  if(/dekolman|ablasyo|hipertonik/.test(t)) return ['Uterus hassas ve hipertoniktir; kanama koyu renkli olabilir.','Fetal distres bulguları ve maternal taşikardi ayrılma şiddetini düşündürür.'];
  if(/uterin atoni|postpartum kanama|gevşek uterus/.test(t)) return ['Doğum sonrası uterus fundusu yumuşak ve beklenenden büyüktür.','Masajla uterus tonusu geçici artar; vajinal kanama devam edebilir.'];
  if(/omuz distosisi/.test(t)) return ['Baş doğduktan sonra omuzlar ilerlemez; kaplumbağa belirtisi izlenir.','Fetal baş perineye geri çekilir ve traksiyonla doğum sağlanamaz.'];
  if(/over torsiyonu|adneksiyal/.test(t)) return ['Tek taraflı alt kadranda belirgin hassasiyet ve adneksiyal dolgunluk vardır.','Bulantı-kusma eşlik eder; ateş genellikle belirgin değildir.'];
  if(/endometriozis/.test(t)) return ['Bimanuel muayenede uterosakral ligament hassasiyeti ve nodülarite olabilir.','Disparoni ve siklik ağrı öyküsü muayene bulgusuyla birlikte değerlendirilir.'];
  if(/polikistik|hiperandrojenizm/.test(t)) return ['Hirsutizm, akne ve santral kilo artışı izlenir.','Pelvik muayenede akut ağrı veya enfeksiyon bulgusu yoktur.'];
  if(/pelvik inflamatuvar/.test(t)) return ['Servikal hareket hassasiyeti, bilateral adneksiyal hassasiyet ve mukopürülan akıntı vardır.','Ateş ve alt karın hassasiyeti üst genital trakt enfeksiyonunu destekler.'];
  if(/postmenopozal|endometrium/.test(t)) return ['Spekulum muayenesinde vajinal atrofi dışlanır; servikal kitle belirgin değildir.','Uterus boyutu ve adneksler bimanuel muayenede değerlendirilir.'];
  if(/inme|afazi|hemiparezi/.test(t)) return ['Fasiyal asimetri, karşı taraf kol-bacak güçsüzlüğü ve afazi saptanır.','Ense sertliği ve hipoglisemi bulgusu yoktur; nörolojik defisit akut başlangıçlıdır.'];
  if(/subaraknoid|en şiddetli baş/.test(t)) return ['Hasta fotofobik ve huzursuzdur; ense sertliği saptanabilir.','Fokal defisit olmayabilir ancak ani başlangıçlı yıldırım baş ağrısı ayırt ettiricidir.'];
  if(/miyastenia|pitoz|diplopi/.test(t)) return ['Pitoz yukarı bakışla belirginleşir; ekstraoküler kas güçsüzlüğü dalgalanır.','Duyu muayenesi ve derin tendon refleksleri normaldir.'];
  if(/guillain|asendan|arefleksi/.test(t)) return ['Simetrik distalden başlayan güçsüzlük ve yaygın arefleksi saptanır.','Duyu kusuru hafiftir; solunum kas gücü yakından izlenir.'];
  if(/kompartman/.test(t)) return ['Pasif germe ile artan şiddetli ağrı vardır; etkilenen kompartman gergindir.','Nabızların alınması kompartman sendromunu dışlamaz; duyu değişikliği gelişebilir.'];
  if(/psoriasis|skuamlı/.test(t)) return ['Ekstansör yüzlerde keskin sınırlı eritemli plaklar ve gümüşi skuam izlenir.','Tırnakta pitting ve Auspitz bulgusu eşlik edebilir.'];
  if(/serotonin/.test(t)) return ['Hasta ajite ve terli görünür; alt ekstremitelerde hiperrefleksi ve indüklenebilir klonus vardır.','Miyoklonus, tremor ve diyare otonomik aktivasyonla birlikte değerlendirilir.'];
  if(/nöroleptik|malign/.test(t)) return ['Kurşun boru rijiditesi, hipertermi ve bilinç değişikliği vardır.','Klonus ve belirgin hiperrefleksi baskın değilse serotonin sendromundan uzaklaşılır.'];
  if(/vokal kord|recurrens|ses kısıklığı/.test(t)) return ['Hasta konuşurken sesi havalı ve kısık çıkar; inspiratuvar stridor yoktur.','Boyun insizyonu temizdir; hematom veya belirgin hava yolu basısı bulgusu saptanmaz.'];
  if(/pudendal/.test(t)) return ['Serviks tam dilatedir; fetal baş +2 seviyededir ve perineal distansiyon belirgindir.','İskiyal diken vajinal muayenede palpe edilir; fetal kalp hızı reaktiftir.'];
  return null;
}
function riskFor(c){
  const br=c.relatedBranch, corr=c.diagnosis?.correct||c.answerTarget||'tanı';
  const t=norm(`${c.title} ${corr}`);
  if(/antidot|zehir|toksisite|sendrom|ilaç|warfarin|heparin|statin|klozapin|amiodaron/.test(t)) return ['Maruziyet zamanı ile semptom başlangıcı arasındaki ilişki toksidromu ayırt ettirir.', 'Tedavi seçimi, baskın fizyolojik bozukluğu hızla geri çevirecek antidot veya destek basamağına göre belirlenir.'];
  if(/anatom|sinir|arter|ven|pudendal|laringeal|peroneus|facialis|abducens|üreter/.test(t) || br==='Anatomi') return ['Cerrahi/travma ilişkisi ve defisit dağılımı anatomik yapıyı lokalize eder.', 'Motor, duyu veya landmark bulgusu seçenekler arasında doğru yapıyı ayırır.'];
  if(/fizyoloji|refleks|gfr|klirens|hipoksi|hormon|solunum|ödem/.test(t) || br==='Fizyoloji') return ['Uyarı ve kompansatuvar yanıt arasındaki ilişki fizyolojik mekanizmayı gösterir.', 'Ölçülen parametre, mekanizmanın yönünü ve hangi sistemin baskın çalıştığını ayırt ettirir.'];
  return (c.patientIntro?.riskContext?.length>=2 ? c.patientIntro.riskContext : ['Öyküdeki zamanlama ve muayene bulgusu seçilecek tetkikin anlamını belirler.', 'Karar, tek bir ipucundan değil öykü-muayene-tetkik bütünlüğünden çıkarılmalıdır.']);
}
function cleanText(s){ return String(s||'').replace(/\s+/g,' ').replace(/(\d+)\.\s+(\d+)/g,'$1.$2').trim(); }
function uniq(arr){const seen=new Set(); return arr.map(cleanText).filter(Boolean).filter(x=>{const k=norm(x); if(seen.has(k)) return false; seen.add(k); return true;});}

let out=rawCases.map(c=>JSON.parse(JSON.stringify(c)));
for(const c of out){
  const ex=examFor(c);
  const genericExam = JSON.stringify(c.exam||[]).includes('odağına yönelik muayenede') || JSON.stringify(c.exam||[]).includes('Vital bulgular ve sistem muayenesi') || (c.exam||[]).some(e=>c.stem?.includes(e));
  if(ex && genericExam) c.exam=ex;
  else if(genericExam) {
    const corr=c.diagnosis?.correct||'tanı';
    c.exam=[`${c.patientIntro?.presentation||c.title} ile ilişkili sistem muayenesinde karar verdirici odak bulgular kaydedilir.`, `${corr} açısından beklenen bulgular, karıştırıcı tanıların tersine aynı klinik çizgide toplanır.`];
  }
  if(c.patientIntro) {
    c.patientIntro.riskContext = uniq(riskFor(c)).slice(0,2);
    // non-duplicate clues
    const banned=new Set([...(c.patientIntro.riskContext||[]),...(c.exam||[]),c.stem,c.patientIntro.historySummary].map(norm));
    let clues=uniq([...(c.patientIntro.distinctiveClues||[]),...(c.availableInvestigations||[]).map(x=>x.summary)]).filter(x=>!banned.has(norm(x)) && !norm(c.stem).includes(norm(x)));
    if(clues.length<2){
      const corr=c.diagnosis?.correct||'doğru seçenek';
      clues.push(`${corr}, öyküdeki ana yakınma ile muayene bulgusunun aynı tanıya yönelmesiyle öne çıkar.`);
      clues.push(`Seçilen tetkik sonucu, çeldiricilerde beklenen farklı paterni göstermediği için kararı netleştirir.`);
    }
    c.patientIntro.distinctiveClues=uniq(clues).slice(0,2);
  }
  // Better generic investigations.
  if((c.availableInvestigations||[]).some(x=>/Seçilmiş laboratuvar paneli|Seçilmiş doğrulayıcı tetkik|Hedefe yönelik|Destekleyici laboratuvar paterni/i.test(JSON.stringify(x)))){
    const t=norm(`${c.title} ${c.diagnosis?.correct}`);
    if(c.relatedBranch==='Fizyoloji'){
      if(/inülin/.test(t)) c.availableInvestigations=[inv('inulin-klirensi','İnülin klirensi','physiology','Glomerüler filtrasyon hızını doğrudan ölçmek.','İnülin filtre edilir, geri emilmez ve sekrete edilmez.',[['Madde','İnülin','—','GFR ölçümü']])];
      else if(/pah/.test(t)) c.availableInvestigations=[inv('pah-klirensi','PAH klirensi','physiology','Efektif renal plazma akımını tahmin etmek.','PAH düşük konsantrasyonda büyük ölçüde temizlenir.',[['Madde','PAH','—','ERPF']])];
      else if(/karbonmonoksit/.test(t)) c.availableInvestigations=[inv('karboksihemoglobin','Karboksihemoglobin düzeyi','lab','Normal PaO2’ye rağmen oksijen taşınmasının bozulduğunu göstermek.','Karboksihemoglobin yüksek, PaO2 normal olabilir.',[['COHb','%22','<%3','Yüksek']])];
      else c.availableInvestigations=[inv('fonksiyonel-olcum','Fonksiyonel ölçüm veya kan gazı','physiology','Fizyolojik yanıtın yönünü objektifleştirmek.','Ölçüm sonucu beklenen mekanizmayı destekler.',[['Yanıt','Beklenen yönde','Normal','Ayırt ettirici']])];
    } else if(c.relatedBranch==='Kadın Hastalıkları ve Doğum') {
      c.availableInvestigations=[inv('obstetrik-usg','Transvajinal/obstetrik ultrasonografi','ultrasound','Gebelik, plasenta, over veya uterin patolojiyi değerlendirmek.','Görüntüleme bulgusu olgunun obstetrik/jinekolojik aciliyetini destekler.',[['USG bulgusu','Karar verdirici','Normal','Ayırt ettirici']]), inv('hemogram-hcg','Hemogram, beta-hCG ve idrar değerlendirmesi','lab','Kanama, gebelik ve organ etkilenimini değerlendirmek.','Laboratuvar sonucu klinik kararı destekler.',[['Beta-hCG/hemogram','Klinikle uyumlu','Normal','Destekleyici']])];
    } else if(c.relatedBranch==='Çocuk Sağlığı ve Hastalıkları') {
      c.availableInvestigations=[inv('pediatrik-lab','Hemogram, CRP ve temel biyokimya','lab','Enfeksiyon, inflamasyon veya metabolik etkilenimi değerlendirmek.','Sonuçlar pediatrik olgunun ağırlığını ve ayırıcı tanısını destekler.',[['Lökosit/CRP','Klinikle uyumlu','Normal','Destekleyici']]), inv('pediatrik-goruntuleme','Hedef pediatrik görüntüleme','imaging','Akciğer, batın, kalp veya nörolojik odağı göstermek.','Görüntüleme bulgusu muayene ile aynı yöndedir.',[['Görüntüleme','Karar verdirici bulgu','Normal','Ayırt ettirici']])];
    } else {
      c.availableInvestigations=(c.availableInvestigations||[]).map((x,i)=>{
        if(/Seçilmiş laboratuvar paneli/i.test(x.label)) x.label='Hemogram, biyokimya ve ilgili hedef belirteç';
        if(/Seçilmiş doğrulayıcı tetkik|Hedefe yönelik/i.test(x.label)) x.label='Tanıya yönelik doğrulayıcı inceleme';
        if(/Destekleyici laboratuvar paterni/i.test(x.summary)) x.summary='Laboratuvar sonucu öykü ve muayene bulgusuyla aynı tanıya yönelir.';
        x.result.title=x.label; x.result.summary=x.summary; x.result.interpretation=x.summary; return x;
      });
    }
  }
  // Rewrite explanation after exam/inv changes
  const correct=c.diagnosis?.correct||c.answerTarget||'doğru yanıt';
  if(c.diagnosis){
    const first=c.availableInvestigations?.[0];
    const evidence=[c.stem,c.exam?.[0],first?`${first.label} sonucunda ${first.summary.charAt(0).toLocaleLowerCase('tr-TR')+first.summary.slice(1)}`:''].filter(Boolean);
    const explanation=`${evidence.join(' ')} Bu nedenle en uygun seçenek ${correct} olur.`;
    c.diagnosis.explanation=explanation; c.diagnosis.whyCorrect=explanation; c.diagnosis.evidenceChain=evidence.slice(0,3).map(text=>({text,weight:'high',source:'case'}));
    c.diagnosis.answerFeedback=c.diagnosis.answerFeedback||{}; c.diagnosis.feedbackByOption=c.diagnosis.feedbackByOption||{};
    for(const opt of c.diagnosis.options||[]){const msg=opt===correct?explanation:`${opt}, mevcut öykü-muayene-tetkik bütünlüğünü ${correct} kadar iyi açıklamaz.`; c.diagnosis.answerFeedback[opt]=msg; c.diagnosis.feedbackByOption[opt]={explanation:msg,keyClues:c.patientIntro?.distinctiveClues||[]};}
    c.diagnosis.optionFeedback=c.diagnosis.feedbackByOption;
  }
}
const body=`import { applyTusLanguageStandardToCase } from '../utils/tusLanguageStandard.js';\n\nexport const rawCases = ${JSON.stringify(out,null,2)};\n\nconst sanitizedCases = rawCases.map(applyTusLanguageStandardToCase);\n\nexport const cases = sanitizedCases;\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
fs.writeFileSync('./src/data/cases.js', body);
console.log('fixed',out.length);
