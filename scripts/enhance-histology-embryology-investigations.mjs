import fs from 'node:fs';
import path from 'node:path';
import { rawCases } from '../src/data/cases.js';

const repoRoot = process.cwd();
const casesPath = path.join(repoRoot, 'src/data/cases.js');
const reportPath = path.join(repoRoot, 'quality-reports/KlinikIQ_HISTOLOGY_EMBRYOLOGY_INVESTIGATION_LAYER_REPORT.json');
const technicalReportPath = path.join(repoRoot, 'quality-reports/KlinikIQ_HISTOLOGY_EMBRYOLOGY_INVESTIGATION_LAYER_TECHNICAL_REPORT.txt');

function rows(values) {
  return values;
}

function img(caseItem, matcher) {
  const inv = (caseItem.investigations || []).find((item) => matcher.test(`${item.id || ''} ${item.label || ''} ${item.title || ''}`));
  return inv?.imageIds ? [...inv.imageIds] : [];
}

function inv({
  id,
  title,
  type = 'clinical',
  category = 'clinicalAssessment',
  priority = 'useful',
  tag = 'Destekleyici bulgu',
  score = 2,
  summary,
  values = [],
  imageIds = [],
}) {
  const cleanSummary = summary || '';
  return {
    id,
    label: title,
    title,
    type,
    priority,
    subtype: title,
    summary: cleanSummary,
    clinicalMeaning: cleanSummary,
    result: {
      title,
      summary: cleanSummary,
      interpretation: cleanSummary,
      values: rows(values),
      rows: rows(values),
    },
    rows: rows(values),
    postAnswerExplanation: cleanSummary,
    interpretation: cleanSummary,
    category,
    testTypeCategory: category,
    testValueLabel: tag,
    educationalValue: tag,
    clinicalPriorityLabel: tag,
    scoreValue: score,
    scoreImpact: score,
    inlineFeedback: cleanSummary,
    explanationAfterAnswer: cleanSummary,
    ...(imageIds.length ? { imageIds } : {}),
  };
}

const updateMap = {
  'v168-new-053-yenidoganda-santral-siyanoz': (c) => [
    inv({ id: 'klinik-siyanoz-ufurum-fallot-1', title: 'Yenidoğan siyanoz ve kardiyak muayene', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Santral siyanozun solunum bulgularıyla tamamen açıklanamaması ve sert sistolik üfürüm, çıkış yolu ilişkili konjenital kalp hastalığı için ilk klinik basamağı oluşturur.', values: [['Santral siyanoz', 'Oda havasında belirgin ve kalıcı', 'Yenidoğanda hızla düzelmesi beklenir', 'Kritik ipucu'], ['Üfürüm', 'Sert sistolik üfürüm', 'Belirgin üfürüm beklenmez', 'Anormal']] }),
    inv({ id: 'pre-postduktal-saturasyon-1', title: 'Pre/postduktal oksijen satürasyonu', type: 'clinical', category: 'bedside', priority: 'essential', tag: 'İlk basamak veri', score: 2, summary: 'Düşük pre ve postduktal satürasyon, primer akciğer hastalığından çok karışım veya çıkış yolu anomalisi yapan kardiyak süreci düşündürür.', values: [['Sağ el SpO₂', '%79', 'Yenidoğanda genellikle >%94', 'Düşük'], ['Alt ekstremite SpO₂', '%77', 'Pre/postduktal fark klinikle yorumlanır', 'Düşük']] }),
    inv({ id: 'akciger-grafisi-kalp-silueti-1', title: 'Akciğer grafisi', type: 'xray', category: 'imaging', priority: 'useful', tag: 'Destekleyici bulgu', score: 2, summary: 'Azalmış pulmoner vaskülarite ve konjenital kalp hastalığıyla uyumlu kalp silüeti, ekokardiyografi öncesi destekleyici hemodinamik ipucu sağlar.', values: [['Pulmoner vaskülarite', 'Azalmış görünüm', 'Yaşa göre simetrik vaskülarite', 'Anormal'], ['Kalp silüeti', 'Konjenital kalp hastalığıyla uyumlu', 'Normal kardiyak kontur', 'Destekleyici']] }),
    inv({ id: 'ekokardiyografi-fallot-1', title: 'Ekokardiyografi', type: 'echo', category: 'cardiac', priority: 'essential', tag: 'Hedefli görüntüleme', score: 4, summary: 'Ventriküler septal defekt, pulmoner çıkış yolu darlığı ve aortun septum üzerinde yer değiştirmesi konotrunkal hizalanma kusurunu mekanizma düzeyinde kurdurur.', values: [['Ventriküler septum', 'Geniş subaortik defekt', 'Septum bütün olmalı', 'Patolojik'], ['Sağ ventrikül çıkış yolu', 'Pulmoner darlık', 'Darlık beklenmez', 'Patolojik'], ['Aort yerleşimi', 'Septum üzerinde binici konum', 'Sol ventrikül çıkışıyla hizalı olmalı', 'Patolojik']], imageIds: img(c, /ekokardiyografi/i) }),
  ],

  'v172-new-071-cocukta-agrisiz-alt-gastrointestinal-kanama': (c) => [
    inv({ id: 'perianal-batin-degerlendirme-meckel-1', title: 'Perianal ve batın değerlendirmesi', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Perianal kanama odağı ve akut batın bulgusu olmaması, ağrısız intraluminal alt gastrointestinal kanama kaynağı aramayı daha anlamlı hale getirir.', values: [['Perianal muayene', 'Fissür, travma veya hemoroidal odak yok', 'Lokal kanama odağı saptanmamalı', 'Dışlatıcı'], ['Batın', 'Yumuşak; defans/rebound yok', 'Akut batın bulgusu olmamalı', 'Stabil']] }),
    inv({ id: 'hemoglobin-demir-paneli-meckel-1', title: 'Hemoglobin ve demir durumu', type: 'lab', category: 'laboratory', priority: 'useful', tag: 'Destekleyici veri', score: 2, summary: 'Mikrositer anemi eğilimi tekrarlayan mukozal kanamayı destekler; ancak embriyolojik kalıntının yerini belirlemek için hedefli nükleer görüntüleme gerekir.', values: [['Hemoglobin', '9.8 g/dL', '11.5–14.5 g/dL', 'Düşük'], ['MCV', '73 fL', '75–87 fL', 'Sınırda düşük'], ['Ferritin', '10 ng/mL', '>15 ng/mL', 'Düşük']] }),
    inv({ id: 'abdominal-usg-meckel-ayirici-1', title: 'Abdominal ultrasonografi', type: 'ultrasound', category: 'imaging', priority: 'situational', tag: 'Ayırıcıyı daraltır', score: 2, summary: 'Ultrasonografi invajinasyon veya belirgin kitle lehine güçlü bulgu göstermediğinde ağrısız kanama odağı için ektopik mukoza içeren kalıntı araştırması öne çıkar.', values: [['İnvajinasyon bulgusu', 'Saptanmadı', 'Saptanmamalı', 'Negatif'], ['Kitle/serbest sıvı', 'Belirgin patoloji yok', 'Yok', 'Destekleyici']] }),
    inv({ id: 'tc99m-perteknetat-meckel-1', title: 'Teknesyum-99m perteknetat sintigrafisi', type: 'nuclear', category: 'imaging', priority: 'essential', tag: 'Doğrulayıcı test', score: 4, summary: 'Ektopik gastrik mukozaya özgü tutulum, ağrısız kanamanın embriyonik kanal kalıntısı kaynaklı olabileceğini gösteren hedefli doğrulayıcı veridir.', values: [['Tutulum paterni', 'Sağ alt kadranda odaksal aktivite artışı', 'Patolojik odak beklenmez', 'Pozitif'], ['Klinik anlam', 'Ektopik gastrik mukoza içeren ileal odak lehine', 'Normal dağılım beklenir', 'Kritik ipucu']], imageIds: img(c, /perteknetat|sintigrafi/i) }),
  ],

  'v172-new-078-yenidoganda-hipokalsemik-nobet': (c) => [
    inv({ id: 'dismorfizm-kardiyak-degerlendirme-digeorge-1', title: 'Klinik dismorfizm ve kardiyak değerlendirme', type: 'clinical', category: 'clinicalAssessment', priority: 'useful', tag: 'Temel değerlendirme', score: 1, summary: 'Hipokalsemik nöbete eşlik eden yüz/boyun bulguları veya konotrunkal üfürüm, faringeal poş gelişim kusurunu klinik bağlama yerleştirir.', values: [['Nöbet bağlamı', 'Hipokalsemiyle uyumlu nöbet', 'Metabolik neden araştırılmalı', 'Kritik'], ['Kardiyak oskültasyon', 'Konotrunkal anomali düşündüren üfürüm olabilir', 'Belirgin üfürüm beklenmez', 'Destekleyici']] }),
    inv({ id: 'kalsiyum-pth-paneli-digeorge-1', title: 'Kalsiyum-PTH paneli', type: 'lab', category: 'laboratory', priority: 'essential', tag: 'Kritik ipucu', score: 3, summary: 'Düşük kalsiyumla birlikte yetersiz PTH yanıtı, paratiroid gelişim basamağındaki bozukluğu düşündürür.', values: [['Total kalsiyum', '6.4 mg/dL', '8.8–10.8 mg/dL', 'Düşük'], ['PTH', 'Düşük/uygunsuz normal', 'Hipokalsemide yükselmesi beklenir', 'Uygunsuz']] }),
    inv({ id: 't-hucre-paneli-digeorge-1', title: 'Lenfosit alt grupları', type: 'lab', category: 'laboratory', priority: 'useful', tag: 'Mekanizma ipucu', score: 3, summary: 'T hücre azalması, timus gelişimindeki eşlik eden bozukluğu göstererek üçüncü-dördüncü faringeal poş bağlantısını güçlendirir.', values: [['CD3+ T hücresi', 'Azalmış', 'Yaşa göre normal aralık', 'Düşük'], ['B hücre sayısı', 'Görece korunmuş', 'Yaşa göre değişir', 'Destekleyici']] }),
    inv({ id: 'ekokardiyografi-konotrunkal-digeorge-1', title: 'Ekokardiyografi', type: 'echo', category: 'cardiac', priority: 'situational', tag: 'Komplikasyon taraması', score: 3, summary: 'Konotrunkal anomalilerin araştırılması, faringeal poş ve nöral krest ilişkili gelişimsel etkilenmeyi organ düzeyinde değerlendirir.', values: [['Çıkış yolu anatomisi', 'Konotrunkal anomali açısından değerlendirildi', 'Normal hizalanma beklenir', 'Taramaya değer'], ['Hemodinamik etki', 'Klinik bulgularla birlikte yorumlanır', '—', 'İzlem']] }),
  ],

  'v173-new-081-yenidoganda-mekonyum-cikaramama': (c) => [
    inv({ id: 'yenidogan-batin-rektal-degerlendirme-hirschsprung-1', title: 'Batın ve rektal değerlendirme', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Mekonyum gecikmesi, distansiyon ve rektal boşluk paterni distal bağırsak motilite/innervasyon sorununu ilk basamakta düşündürür.', values: [['Mekonyum çıkışı', 'İlk 48 saatte gecikmiş', 'İlk 24–48 saatte beklenir', 'Anormal'], ['Batın', 'Distansiyon mevcut', 'Belirgin distansiyon beklenmez', 'Destekleyici']] }),
    inv({ id: 'direkt-batin-grafisi-hirschsprung-1', title: 'Direkt batın grafisi', type: 'xray', category: 'imaging', priority: 'useful', tag: 'İlk görüntüleme', score: 2, summary: 'Bağırsak gaz dağılımı ve distal obstrüksiyon paterni değerlendirilir; bu basamak kontrastlı inceleme ve biyopsi kararını yönlendirir.', values: [['Bağırsak gazı', 'Distansiyon ve distal gaz azalması', 'Normal gaz dağılımı beklenir', 'Anormal']] }),
    inv({ id: 'kontrastli-kolon-grafisi-hirschsprung-1', title: 'Kontrastlı kolon grafisi', type: 'xray', category: 'imaging', priority: 'essential', tag: 'Anatomik lokalizasyon', score: 3, summary: 'Dar distal segment ve proksimal genişleme geçiş zonunu göstererek aganglionik segmentin olası düzeyini anatomik olarak sınırlar.', values: [['Distal kolon', 'Dar segment', 'Normal kalibrasyon beklenir', 'Patolojik'], ['Proksimal kolon', 'Genişleme mevcut', 'Belirgin genişleme beklenmez', 'Patolojik']] }),
    inv({ id: 'rektal-suction-biyopsisi-hirschsprung-1', title: 'Rektal suction biyopsisi', type: 'pathology', category: 'pathology', priority: 'essential', tag: 'Doğrulayıcı test', score: 5, summary: 'Submukozal ve myenterik pleksuslarda ganglion hücresi yokluğu, distal bağırsak nöral krest göç kusurunu histolojik olarak doğrular.', values: [['Ganglion hücresi', 'Submukozal/myenterik pleksusta izlenmiyor', 'Ganglion hücresi görülmeli', 'Patolojik'], ['Sinir lifleri', 'Hipertrofik sinir lifleri', 'Belirgin hipertrofi beklenmez', 'Destekleyici']], imageIds: img(c, /biyopsi/i) }),
  ],

  'v173-new-082-beslenmeyle-artan-solunum-sikintisi': (c) => [
    inv({ id: 'beslenme-gozlemi-tef-1', title: 'Beslenme sırasında klinik gözlem', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Beslenmeyle öksürük, sekresyon artışı ve solunum sıkıntısının belirginleşmesi, ön bağırsak ayrılma kusuruna bağlı hava-sindirim yolu ilişkisini düşündürür.', values: [['Beslenme denemesi', 'Öksürük ve sekresyon artışı', 'Beslenmeyle solunum kötüleşmemeli', 'Kritik ipucu'], ['Aspirasyon bulgusu', 'Tekrarlayan desatürasyon eğilimi', 'Beklenmez', 'Anormal']] }),
    inv({ id: 'og-ng-sonda-denemesi-tef-1', title: 'Orogastrik/nazogastrik sonda ilerletme denemesi', type: 'clinical', category: 'bedside', priority: 'essential', tag: 'İlk basamak veri', score: 2, summary: 'Sondanın mideye ilerlememesi veya üst poşta kıvrılması, özofagus devamlılığının bozulduğunu gösteren düşük eşikli objektif veridir.', values: [['Sonda ilerleyişi', 'Mideye ilerlemiyor; üst poşta kıvrılıyor', 'Mideye ilerlemesi beklenir', 'Anormal']] }),
    inv({ id: 'torakoabdominal-grafi-tef-1', title: 'Torakoabdominal direkt grafi', type: 'xray', category: 'imaging', priority: 'essential', tag: 'Hedefli görüntüleme', score: 4, summary: 'Üst özofageal poşta kıvrılan sonda ve abdominal gaz paterni, trakeoözofageal ayrılma kusurunun tipini yorumlamaya yardım eder.', values: [['Sonda ucu', 'Üst mediastende kıvrılmış', 'Mideye ulaşmalı', 'Patolojik'], ['Abdominal gaz', 'Gaz mevcut', 'Fistül tipine göre değişir', 'Mekanizma ipucu']], imageIds: img(c, /grafi/i) }),
    inv({ id: 'vacterl-baslangic-degerlendirme-tef-1', title: 'VACTERL açısından başlangıç değerlendirmesi', type: 'clinical', category: 'clinicalAssessment', priority: 'situational', tag: 'Komplikasyon taraması', score: 2, summary: 'Eşlik eden vertebral, anal, kardiyak, renal veya ekstremite anomalilerinin taranması, ön bağırsak gelişim kusurunun sendromik bağlamını değerlendirmek için kullanılır.', values: [['Kardiyak/renal tarama', 'Eşlik eden anomali açısından planlandı', 'TEF olgularında taranabilir', 'İzlem için değerli']] }),
  ],

  'v174-new-091-yenidoganda-surekli-ufurum': (c) => [
    inv({ id: 'ufurum-nabiz-pda-1', title: 'Kardiyak oskültasyon ve nabız basıncı', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Sürekli makine tarzı üfürüm ve geniş nabız basıncı, fetal damar bağlantısının postnatal dönemde kapanmadığını düşündüren ilk klinik verilerdir.', values: [['Üfürüm', 'Sürekli makine tarzı', 'Belirgin sürekli üfürüm beklenmez', 'Kritik ipucu'], ['Nabız basıncı', 'Genişlemiş', 'Yaşa göre dar-normal olmalı', 'Destekleyici']] }),
    inv({ id: 'prepost-spo2-pda-1', title: 'Pre/postduktal SpO₂ ve hemodinami', type: 'clinical', category: 'bedside', priority: 'useful', tag: 'İlk basamak veri', score: 2, summary: 'Oksijenasyon ve periferik perfüzyonun izlenmesi şantın klinik etkisini değerlendirir; tek başına duktusu göstermez.', values: [['Preduktal SpO₂', '%94', '>94 beklenir', 'Sınırda'], ['Postduktal SpO₂', '%93', 'Preduktal değere yakın olmalı', 'İzlem'], ['Periferik nabız', 'Belirgin/sıçrayıcı', 'Normal amplitüd beklenir', 'Destekleyici']] }),
    inv({ id: 'akciger-grafisi-pda-1', title: 'Akciğer grafisi', type: 'xray', category: 'imaging', priority: 'situational', tag: 'Destekleyici bulgu', score: 2, summary: 'Pulmoner vasküler belirginlik veya kardiyomegali, duktal şantın hacim yükü oluşturduğunu destekleyebilir; tanısal doğrulama ekokardiyografiyle yapılır.', values: [['Pulmoner vaskülarite', 'Hafif artmış', 'Yaşa göre normal olabilir', 'Destekleyici'], ['Kalp boyutu', 'Sınırda kardiyomegali', 'Normal boyut beklenir', 'İzlem']] }),
    inv({ id: 'ekokardiyografi-pda-1', title: 'Ekokardiyografi', type: 'echo', category: 'cardiac', priority: 'essential', tag: 'Doğrulayıcı test', score: 4, summary: 'Aort ile pulmoner arter arasında devam eden bağlantı ve soldan sağa akım, duktus arteriozusun kapanma/regresyon basamağındaki yetersizliği gösterir.', values: [['Duktal bağlantı', 'Aort-pulmoner arter arasında açık kanal', 'Postnatal kapanma beklenir', 'Patolojik'], ['Akım yönü', 'Soldan sağa şant', 'Şant olmamalı', 'Hemodinamik veri']], imageIds: img(c, /ekokardiyografi/i) }),
  ],

  'v174-new-092-yenidoganda-safrali-kusma': (c) => [
    inv({ id: 'safrali-kusma-batin-degerlendirme-1', title: 'Yenidoğan batın değerlendirmesi', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Safralı kusma ve distansiyon, yenidoğanda mekanik obstrüksiyon/volvulus riskini ilk aşamada düşündüren düşük eşikli klinik veridir.', values: [['Kusma tipi', 'Safralı', 'Yenidoğanda acil değerlendirme gerektirir', 'Kritik'], ['Batın', 'Distansiyon eğilimi', 'Belirgin distansiyon beklenmez', 'Destekleyici']] }),
    inv({ id: 'direkt-batin-grafisi-malrotasyon-1', title: 'Direkt batın grafisi', type: 'xray', category: 'imaging', priority: 'useful', tag: 'İlk görüntüleme', score: 2, summary: 'Gaz dağılımı obstrüksiyon şiddetini ve aciliyetini gösterir; malrotasyonu kesinleştirmek için üst gastrointestinal kontrast inceleme gerekir.', values: [['Gaz dağılımı', 'Proksimal distansiyon; distal gaz azlığı', 'Normal dağılım beklenir', 'Anormal']] }),
    inv({ id: 'ust-gis-kontrast-malrotasyon-1', title: 'Üst gastrointestinal kontrast grafi', type: 'xray', category: 'imaging', priority: 'essential', tag: 'Hedefli görüntüleme', score: 4, summary: 'Duodenojejunal bileşkenin normal sol üst yerleşimde izlenmemesi, orta bağırsak rotasyon/fiksasyon kusurunu anatomik olarak gösterir.', values: [['Duodenojejunal bileşke', 'Orta hattın sağında/aşağıda', 'Sol üst kadranda olmalı', 'Patolojik'], ['Kontrast geçişi', 'Volvulus açısından kuşkulu akış paterni', 'Serbest geçiş beklenir', 'Kritik']] }),
    inv({ id: 'abdominal-doppler-malrotasyon-1', title: 'Abdominal Doppler ultrasonografi', type: 'ultrasound', category: 'imaging', priority: 'useful', tag: 'Komplikasyon taraması', score: 3, summary: 'Mezenterik damar ilişkisi ve whirlpool bulgusu, volvulus riskini ve acil cerrahi gereksinimini değerlendirmeye yardım eder.', values: [['SMA/SMV ilişkisi', 'Anormal ilişki/whirlpool açısından kuşkulu', 'Normal anatomik ilişki beklenir', 'Kritik ipucu']] }),
  ],

  'v175-new-101-lateral-boyun-kitlesi': (c) => [
    inv({ id: 'lateral-boyun-fizik-muayene-1', title: 'Boyun kitle lokalizasyon muayenesi', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Kitle orta hatta değil sternokleidomastoid ön kenarı boyunca lateraldeyse, faringeal yarık kalıntısı olasılığı anatomik lokalizasyon üzerinden güçlenir.', values: [['Lokalizasyon', 'Sternokleidomastoid ön kenarı boyunca lateral kistik kitle', 'Orta hat/hyoid hareketi beklenmez', 'Kritik ipucu'], ['Enfeksiyon bulgusu', 'Akut kızarıklık yok', 'Klinikle değişir', 'Stabil']] }),
    inv({ id: 'boyun-usg-brankial-1', title: 'Boyun ultrasonografisi', type: 'ultrasound', category: 'imaging', priority: 'essential', tag: 'Anatomik lokalizasyon', score: 3, summary: 'Lateral kistik lezyonun derin boyun yapılarıyla ilişkisi, faringeal yarık kalıntısı olasılığını doğrudan isim vermeden anatomik düzlemde destekler.', values: [['Lezyon yapısı', 'Düzgün sınırlı kistik lezyon', 'Solid kitle beklenmez', 'Uyumlu'], ['Yerleşim', 'Lateral boyun; SCM ön komşuluğu', 'Orta hat beklenmez', 'Mekanizma ipucu']], imageIds: img(c, /boyun/i) }),
    inv({ id: 'boyun-mr-cerrahi-planlama-brankial-1', title: 'Boyun MR/BT cerrahi planlama', type: 'mri', category: 'imaging', priority: 'situational', tag: 'Cerrahi planlama', score: 3, summary: 'Derin uzanım, damar-sinir komşuluğu veya enfeksiyon şüphesi varsa kesitsel görüntüleme cerrahi sınırları planlamak için değer kazanır.', values: [['Derin uzanım', 'Büyük damar komşuluğu açısından değerlendirilebilir', 'Komplike değilse şart değildir', 'Durumsal']] }),
  ],

  'v175-new-102-prenatal-taramada-yuksek-alfa-fetoprotein': (c) => [
    inv({ id: 'gebelik-haftasi-prenatal-baglam-ntd-1', title: 'Gebelik haftası ve tarama bağlamı', type: 'clinical', category: 'prenatal', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'AFP yorumu ancak gebelik haftasıyla birlikte anlamlıdır; stabil maternal durum hedefli fetal değerlendirmeye geçmeye olanak verir.', values: [['Gebelik haftası', '24. hafta ile uyumlu kayıt', 'Tarama haftasına göre yorumlanmalı', 'Bağlam verisi'], ['Maternal durum', 'Kanama/kontraksiyon yok; hemodinami stabil', 'Acil maternal patoloji olmamalı', 'Stabil']] }),
    inv({ id: 'maternal-serum-afp-ntd-1', title: 'Maternal serum AFP', type: 'lab', category: 'prenatal', priority: 'essential', tag: 'Prenatal tarama', score: 3, summary: 'Gebelik haftasına göre yüksek maternal AFP açık fetal doku defekti olasılığını artırır; defektin yeri ve kapsamı için hedefli fetal ultrasonografi gerekir.', values: [['Maternal serum AFP', 'Gebelik haftasına göre yüksek', 'Gebelik haftasına göre beklenen aralık', 'Yüksek']] }),
    inv({ id: 'detayli-fetal-usg-ntd-1', title: 'Detaylı fetal ultrasonografi', type: 'ultrasound', category: 'imaging', priority: 'essential', tag: 'Hedefli görüntüleme', score: 4, summary: 'Lumbosakral bölgede posterior ark defekti ve keseleşme ile uyumlu görünüm, açık spinal defektin anatomik seviyesini gösterir.', values: [['Spinal seviye', 'Lumbosakral posterior ark defekti', 'Vertebral ark bütünlüğü beklenir', 'Patolojik'], ['Keseleşme', 'Posterior orta hatta keseleşme', 'Keseleşme beklenmez', 'Anatomik ipucu']], imageIds: img(c, /ultrason/i) }),
    inv({ id: 'amniyon-sivisi-afp-ache-ntd-1', title: 'Amniyon sıvısı AFP/asetilkolinesteraz', type: 'lab', category: 'prenatal', priority: 'essential', tag: 'Doğrulayıcı test', score: 5, summary: 'Amniyotik sıvıda AFP artışı ve asetilkolinesteraz pozitifliği açık fetal doku defekti olasılığını doğrulayıcı düzeyde güçlendirir; bu test toksikoloji değil prenatal tanı verisidir.', values: [['Amniyon sıvısı AFP', 'Artmış', 'Gebelik haftasına göre düşük/negatif beklenir', 'Yüksek'], ['Asetilkolinesteraz', 'Pozitif', 'Negatif beklenir', 'Pozitif']] }),
  ],

  'v177-new-126-yenidoganda-agir-solunum-sikintisi': (c) => [
    inv({ id: 'yenidogan-solunum-batin-degerlendirme-cdh-1', title: 'Solunum ve torakoabdominal muayene', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Tek taraflı solunum seslerinde azalma, toraksta barsak sesi ve skafoid karın diyafram gelişim kusuruna bağlı organ yer değiştirmesini klinik olarak düşündürür.', values: [['Sol hemitoraks', 'Solunum sesleri azalmış; barsak sesi duyuluyor', 'Toraksta barsak sesi olmamalı', 'Kritik'], ['Karın', 'Skafoid görünüm', 'Yenidoğanda belirgin çöküklük beklenmez', 'Destekleyici']] }),
    inv({ id: 'arter-kan-gazi-cdh-1', title: 'Arter kan gazı', type: 'bloodGas', category: 'respiratory', priority: 'essential', tag: 'İlk basamak veri', score: 2, summary: 'Hipoksemi ve hiperkapni, toraks içi organ basısı ve akciğer hipoplazisinin solunum yetmezliği düzeyindeki etkisini gösterir.', values: [['pH', '7.25', '7.35–7.45', 'Düşük'], ['PaO₂', '46 mmHg', '80–100 mmHg', 'Düşük'], ['PaCO₂', '58 mmHg', '35–45 mmHg', 'Yüksek']] }),
    inv({ id: 'torakoabdominal-grafi-cdh-1', title: 'Torakoabdominal direkt grafi', type: 'xray', category: 'imaging', priority: 'essential', tag: 'Hedefli görüntüleme', score: 4, summary: 'Toraks içinde barsak ansları, mediastinal itilmeye eşlik eden karın gaz azalmasıyla birlikte diyafram kapanma kusurunun anatomik sonucunu gösterir.', values: [['Toraks', 'Sol hemitoraksta barsak ansları', 'Akciğer alanında barsak ansı olmamalı', 'Patolojik'], ['Mediasten', 'Karşı tarafa itilmiş', 'Orta hatta olmalı', 'Kritik'], ['Karın gazı', 'Azalmış', 'Yaşa göre beklenen dağılım', 'Destekleyici']], imageIds: img(c, /grafi/i) }),
    inv({ id: 'ekokardiyografi-pulmoner-hipertansiyon-cdh-1', title: 'Ekokardiyografi / pulmoner basınç değerlendirmesi', type: 'echo', category: 'cardiac', priority: 'situational', tag: 'Komplikasyon taraması', score: 3, summary: 'Ağır olgularda pulmoner hipertansiyon ve kardiyak yüklenme değerlendirmesi postnatal yönetim riskini belirler; embriyolojik tanıyı tek başına koydurmaz.', values: [['Pulmoner basınç', 'Yüksek risk açısından değerlendirildi', 'Normal basınç beklenir', 'İzlem için değerli']] }),
  ],

  'v178-new-136-skrotumda-ele-gelmeyen-testis': (c) => [
    inv({ id: 'skrotal-inguinal-fizik-muayene-kriptorsidizm-1', title: 'Skrotal ve inguinal fizik muayene', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Boş hemiskrotum ve inguinal kanalda palpe edilen testis, testis iniş yolunda duraklamayı görüntüleme öncesi klinik olarak lokalize eder.', values: [['Sağ hemiskrotum', 'Hipoplastik ve boş', 'Testis skrotumda palpe edilmeli', 'Anormal'], ['Palpasyon', 'Sağ testis inguinal kanalda', 'Skrotal yerleşim beklenir', 'Anatomik ipucu']] }),
    inv({ id: 'inguinoskrotal-usg-kriptorsidizm-1', title: 'İnguinoskrotal ultrasonografi', type: 'ultrasound', category: 'imaging', priority: 'useful', tag: 'Anatomik lokalizasyon', score: 3, summary: 'Testisin inguinal kanalda gösterilmesi iniş yolunun skrotuma ulaşmadığını destekler; gelişimsel bağlantı gubernakulum aracılı iniş sürecidir.', values: [['Testis lokalizasyonu', 'Sağ inguinal kanalda', 'Skrotumda beklenir', 'Patolojik'], ['Sol testis', 'Skrotumda', 'Skrotal yerleşim', 'Uyumlu']], imageIds: img(c, /ultrason/i) }),
  ],

  'v183-new-189-yenidoganda-mekonyum-cikaramama': (c) => [
    inv({ id: 'yenidogan-batin-rektal-degerlendirme-hirschsprung-2', title: 'Batın ve rektal değerlendirme', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Mekonyum çıkaramama, distansiyon ve distal boşluk paterni distal bağırsak innervasyon kusurunu düşündüren ilk klinik basamaktır.', values: [['Mekonyum', 'Gecikmiş/çıkmamış', 'İlk 24–48 saatte beklenir', 'Anormal'], ['Rektal muayene', 'Boş rektum ve gaz/dışkı boşalması olabilir', 'Klinikle yorumlanır', 'Destekleyici']] }),
    inv({ id: 'direkt-batin-grafisi-hirschsprung-2', title: 'Direkt batın grafisi', type: 'xray', category: 'imaging', priority: 'useful', tag: 'İlk görüntüleme', score: 2, summary: 'Proksimal bağırsak distansiyonu distal geçiş sorununu destekler ve kontrastlı kolon incelemesine geçiş için temel objektif veri sağlar.', values: [['Gaz dağılımı', 'Proksimal distansiyon; distal gaz azlığı', 'Normal dağılım beklenir', 'Anormal']] }),
    inv({ id: 'kontrastli-kolon-grafisi-hirschsprung-2', title: 'Kontrastlı kolon grafisi', type: 'xray', category: 'imaging', priority: 'essential', tag: 'Anatomik lokalizasyon', score: 3, summary: 'Geçiş zonu distal aganglionik segmentin olası düzeyini gösterir; kesin doğrulama histolojik ganglion hücresi değerlendirmesiyle yapılır.', values: [['Geçiş zonu', 'Dar distal segment ve proksimal genişleme', 'Kalibrasyon farkı beklenmez', 'Patolojik']] }),
    inv({ id: 'rektal-biyopsi-hirschsprung-2', title: 'Rektal biyopsi', type: 'pathology', category: 'pathology', priority: 'essential', tag: 'Doğrulayıcı test', score: 5, summary: 'Ganglion hücrelerinin yokluğu, nöral krest hücrelerinin distal bağırsak pleksuslarına ulaşamamasıyla ilişkili histolojik doğrulamadır.', values: [['Submukozal pleksus', 'Ganglion hücresi izlenmiyor', 'Ganglion hücresi görülmeli', 'Patolojik'], ['Sinir lifleri', 'Belirginleşmiş/hipertrofik', 'Belirgin hipertrofi beklenmez', 'Destekleyici']], imageIds: img(c, /biyopsi/i) }),
  ],

  'v184-new-195-nazal-biyopsi-ve-epitel-tipi': (c) => [
    inv({ id: 'nazal-mukoza-klinik-degerlendirme-1', title: 'Nazal mukoza klinik değerlendirmesi', type: 'clinical', category: 'clinicalAssessment', priority: 'useful', tag: 'Temel değerlendirme', score: 1, summary: 'Soluk-ödemli nazal mukoza ve pürülan akıntı olmaması, biyopsi yorumunu kronik inflamasyon/kitle yerine mukozal epitel tipi bağlamında değerlendirir.', values: [['Mukoza görünümü', 'Soluk ve ödemli', 'Mevsimsel rinitte görülebilir', 'Uyumlu'], ['Pürülan akıntı/kitle', 'Saptanmadı', 'Saptanmamalı', 'Dışlatıcı']] }),
    inv({ id: 'nazal-mukoza-biyopsisi-epitel-1', title: 'Nazal mukoza biyopsisi', type: 'pathology', category: 'pathology', priority: 'essential', tag: 'Histolojik yapı', score: 4, summary: 'Silli prizmatik hücreler, goblet hücreleri ve yalancı çok katlı görünüm üst solunum yolu mukozasının histolojik organizasyonunu gösterir.', values: [['Epitel organizasyonu', 'Yalancı çok katlı görünüm', 'Tek katlı/çok katlı ayrımı klinikle yorumlanır', 'Histolojik ipucu'], ['Hücre özellikleri', 'Silli prizmatik hücreler ve goblet hücreleri', 'Mukozal savunma elemanları beklenir', 'Uyumlu'], ['Bazal membran', 'Epitel-stroma sınırı korunmuş', 'İnvazyon beklenmez', 'Destekleyici']], imageIds: img(c, /biyopsi/i) }),
  ],

  'v185-new-207-agrisiz-alt-gastrointestinal-kanama': (c) => [
    inv({ id: 'perianal-batin-degerlendirme-meckel-2', title: 'Perianal ve batın değerlendirmesi', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Ağrısız rektal kanamada perianal odak ve akut batın bulgusu yoksa, intraluminal embriyonik kalıntı kaynaklı kanama olasılığı sistematik olarak araştırılır.', values: [['Perianal odak', 'Fissür veya travma yok', 'Lokal odak yokluğu beklenir', 'Dışlatıcı'], ['Batın', 'Yumuşak; peritonit yok', 'Akut batın bulgusu olmamalı', 'Stabil']] }),
    inv({ id: 'hemoglobin-meckel-2', title: 'Hemoglobin', type: 'lab', category: 'laboratory', priority: 'useful', tag: 'Destekleyici veri', score: 2, summary: 'Hemoglobin düşüklüğü kanamanın klinik etkisini gösterir; kaynak lokalizasyonu için hedefli görüntüleme gerekir.', values: [['Hemoglobin', '10.1 g/dL', '11.5–14.5 g/dL', 'Düşük']] }),
    inv({ id: 'tc99m-perteknetat-meckel-2', title: 'Teknesyum-99m perteknetat sintigrafisi', type: 'nuclear', category: 'imaging', priority: 'essential', tag: 'Doğrulayıcı test', score: 4, summary: 'Ektopik gastrik mukoza tutulumunun gösterilmesi, ileal embriyonik kanal kalıntısına bağlı ağrısız kanamayı destekleyen hedefli testtir.', values: [['Tutulum', 'Sağ alt kadranda odaksal aktivite artışı', 'Odaksal tutulum beklenmez', 'Pozitif']], imageIds: img(c, /sintigrafi|perteknetat/i) }),
  ],

  'v185-new-208-yenidoganda-hipokalsemi-ve-enfeksiyon-egilimi': (c) => [
    inv({ id: 'klinik-degerlendirme-digeorge-2', title: 'Hipokalsemi ve enfeksiyon eğilimi değerlendirmesi', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Hipokalsemi bulgularına tekrarlayan enfeksiyon eğiliminin eşlik etmesi, paratiroid ve timus gelişimini birlikte düşündüren ilk klinik kombinasyondur.', values: [['Nöromüsküler bulgu', 'Tetani/nöbet eğilimi', 'Hipokalsemide görülebilir', 'Kritik'], ['Enfeksiyon öyküsü', 'Tekrarlayan viral/fungal enfeksiyon eğilimi', 'Beklenmez', 'Destekleyici']] }),
    inv({ id: 'kalsiyum-pth-digeorge-2', title: 'Kalsiyum-PTH değerlendirmesi', type: 'lab', category: 'laboratory', priority: 'essential', tag: 'Kritik ipucu', score: 3, summary: 'Düşük kalsiyuma rağmen PTH yanıtının yetersiz olması, paratiroid gelişim bozukluğunu laboratuvar düzeyinde destekler.', values: [['Kalsiyum', '6.7 mg/dL', '8.8–10.8 mg/dL', 'Düşük'], ['PTH', 'Düşük/uygunsuz normal', 'Hipokalsemide yükselmesi beklenir', 'Uygunsuz']] }),
    inv({ id: 't-hucre-paneli-digeorge-2', title: 'T hücre paneli', type: 'lab', category: 'laboratory', priority: 'useful', tag: 'Mekanizma ipucu', score: 3, summary: 'T hücre azalması timik gelişim etkilenmesini gösterir ve üçüncü-dördüncü faringeal poş kaynaklı birleşik tabloyu destekler.', values: [['CD3+ T hücresi', 'Azalmış', 'Yaşa göre normal', 'Düşük'], ['İmmünoglobulin düzeyi', 'Klinikle birlikte yorumlanır', 'Yaşa göre değişir', 'Destekleyici']] }),
    inv({ id: 'ekokardiyografi-digeorge-2', title: 'Ekokardiyografi', type: 'echo', category: 'cardiac', priority: 'situational', tag: 'Komplikasyon taraması', score: 3, summary: 'Eşlik eden konotrunkal kardiyak anomalilerin taranması, faringeal poş/nöral krest ilişkili gelişimsel etkilenme bağlamında değerlidir.', values: [['Çıkış yolu anatomisi', 'Eşlik eden anomali açısından değerlendirildi', 'Normal hizalanma beklenir', 'Taramaya değer']] }),
  ],

  'v185-new-209-premature-bebekte-solunum-sikintisi': (c) => [
    inv({ id: 'prematurite-solunum-degerlendirme-rds-1', title: 'Prematürite ve solunum çabası değerlendirmesi', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Prematüriteyle birlikte takipne, inleme ve çekilmeler surfaktan eksikliğine bağlı alveoler stabilite sorununu klinik düzeyde düşündürür.', values: [['Gebelik yaşı', 'Prematüre', 'Term doğumda risk daha düşüktür', 'Risk faktörü'], ['Solunum eforu', 'İnleme ve interkostal çekilme', 'Belirgin efor beklenmez', 'Anormal']] }),
    inv({ id: 'kan-gazi-rds-1', title: 'Kan gazı', type: 'bloodGas', category: 'respiratory', priority: 'essential', tag: 'İlk basamak veri', score: 2, summary: 'Hipoksemi ve asidoz eğilimi alveoler kollaps ve gaz değişim bozukluğunun fonksiyonel sonucunu gösterir.', values: [['pH', '7.29', '7.35–7.45', 'Düşük'], ['PaO₂', '52 mmHg', '80–100 mmHg', 'Düşük'], ['PaCO₂', '50 mmHg', '35–45 mmHg', 'Yüksek']] }),
    inv({ id: 'akciger-grafisi-rds-1', title: 'Akciğer grafisi', type: 'xray', category: 'imaging', priority: 'essential', tag: 'Hedefli görüntüleme', score: 3, summary: 'Retikülogranüler görünüm ve düşük akciğer hacmi, surfaktan eksikliğine bağlı alveol kollapsını destekleyen görüntüleme paternidir.', values: [['Akciğer hacmi', 'Azalmış', 'Yaşa göre havalanma beklenir', 'Düşük'], ['Parankim', 'Diffüz retikülogranüler görünüm', 'Homojen havalanma beklenir', 'Patolojik']], imageIds: img(c, /grafi/i) }),
  ],

  'v187-new-243-yenidoganda-lumbosakral-kese': (c) => [
    inv({ id: 'lumbosakral-kese-fizik-muayene-1', title: 'Lumbosakral kese fizik muayenesi', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Orta hatta membranla kaplı lumbosakral kese, posterior nöral tüp kapanma defektini düşündüren temel anatomik ipucudur; keseye bası uygulanmadan değerlendirilmelidir.', values: [['Kese lokalizasyonu', 'Lumbosakral orta hat', 'Orta hatta kese beklenmez', 'Kritik ipucu'], ['Deri örtüsü', 'Membranla kaplı hassas kese', 'Kapalı cilt bütünlüğü beklenir', 'Anormal']] }),
    inv({ id: 'alt-ekstremite-norolojik-degerlendirme-ntd-1', title: 'Alt ekstremite nörolojik değerlendirme', type: 'clinical', category: 'neurologic', priority: 'essential', tag: 'Komplikasyon taraması', score: 2, summary: 'Motor hareket, refleksler ve anal sfinkter tonusu kesenin sinir dokusuyla ilişkisini ve fonksiyonel etkilenme düzeyini gösterir.', values: [['Alt ekstremite hareketi', 'Azalmış/asimetrik olabilir', 'Simetrik hareket beklenir', 'Fonksiyonel ipucu'], ['Anal sfinkter tonusu', 'Azalma açısından değerlendirildi', 'Normal tonus beklenir', 'Komplikasyon taraması']] }),
    inv({ id: 'prenatal-tarama-bilgisi-ntd-yenidoğan-1', title: 'Prenatal tarama bilgisi', type: 'lab', category: 'prenatal', priority: 'useful', tag: 'Destekleyici veri', score: 2, summary: 'Geçmişte yüksek maternal AFP bildirilmesi açık fetal doku defekti olasılığını destekler; yenidoğanda ana karar fizik muayene ve spinal görüntüleme ile verilir.', values: [['Maternal serum AFP', 'Prenatal izlemede yüksek bildirilmiş', 'Gebelik haftasına göre yorumlanmalı', 'Destekleyici']] }),
    inv({ id: 'spinal-mrg-ntd-yenidoğan-1', title: 'Spinal MRG', type: 'mri', category: 'imaging', priority: 'essential', tag: 'Cerrahi planlama', score: 4, summary: 'Kesenin meninks, sinir kökü ve spinal kordla ilişkisi cerrahi planlama ve nörolojik riskin belirlenmesi için anatomik olarak değerlendirilir.', values: [['Kese içeriği', 'Meninks ve nöral doku ilişkisi değerlendirildi', 'Nöral doku içermemesi beklenir', 'Anatomik ipucu'], ['Spinal kanal ilişkisi', 'Posterior ark defektiyle devamlılık', 'Ark bütünlüğü beklenir', 'Patolojik']], imageIds: img(c, /spinal|görüntüleme|mrg/i) }),
    inv({ id: 'kraniyal-usg-hidrosefali-chiari-ntd-1', title: 'Kraniyal ultrasonografi', type: 'ultrasound', category: 'imaging', priority: 'useful', tag: 'Komplikasyon taraması', score: 3, summary: 'Hidrosefali veya Chiari II eşlikçiliği açık spinal disrafizmde yönetimi değiştirebileceği için postnatal komplikasyon taramasında değerlidir.', values: [['Ventrikül boyutu', 'Hidrosefali açısından değerlendirildi', 'Normal ventrikül boyutu beklenir', 'İzlem'], ['Arka çukur bulgusu', 'Chiari II eşlikçiliği açısından tarandı', 'Eşlikçi bulgu olmamalı', 'Komplikasyon taraması']] }),
  ],

  'v187-new-244-hormonal-uretim-bolgesinin-belirlenmesi': (c) => [
    inv({ id: 'hipertansiyon-hipokalemi-klinik-adrenal-1', title: 'Hipertansiyon ve hipokalemi klinik değerlendirmesi', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Dirençli hipertansiyon ve kas güçsüzlüğüyle seyreden hipokalemi, mineralokortikoid fazlalığı için ilk klinik yönlendirici veridir.', values: [['Kan basıncı', 'Kontrolsüz yüksek seyir', 'Yaşa göre normal olmalı', 'Anormal'], ['Kas semptomu', 'Güçsüzlük/kramp', 'Hipokalemide görülebilir', 'Destekleyici']] }),
    inv({ id: 'aldosteron-renin-paneli-1', title: 'Aldosteron-renin paneli', type: 'lab', category: 'laboratory', priority: 'essential', tag: 'Kritik ipucu', score: 3, summary: 'Yüksek aldosteron, baskılı renin ve hipokalemi mineralokortikoid fazlalığını gösterir; üretim bölgesi adrenal korteks tabakalarının histolojik bilgisiyle ilişkilendirilir.', values: [['Aldosteron', 'Yüksek', 'Klinik bağlama göre normal aralık', 'Yüksek'], ['Renin', 'Baskılı', 'Primer fazlalıkta baskılanır', 'Düşük'], ['Potasyum', '2.9 mmol/L', '3.5–5.0 mmol/L', 'Düşük']] }),
    inv({ id: 'adrenal-korteks-histoloji-semasi-1', title: 'Adrenal korteks histoloji şeması/biyopsi yorumu', type: 'pathology', category: 'pathology', priority: 'useful', tag: 'Histolojik yapı', score: 4, summary: 'Kapsül altındaki dış kortikal tabakanın hücre düzeni mineralokortikoid sentez bölgesiyle ilişkilidir; öğrencinin korteks tabakalarını dıştan içe eşleştirmesi beklenir.', values: [['Kortikal tabaka', 'Kapsül altında dış yerleşimli hücre kümeleri', 'Adrenal korteks zonları dıştan içe ayrılır', 'Histolojik ipucu'], ['Fonksiyonel bağlam', 'Mineralokortikoid sentez paterniyle uyumlu', 'Hormon üretimi tabakaya göre değişir', 'Mekanizma ipucu']], imageIds: img(c, /adrenal|histoloji/i) }),
  ],

  'v188-new-260-karacigerde-fagositik-hucre': (c) => [
    inv({ id: 'karaciger-klinik-lab-baglam-1', title: 'Karaciğer klinik ve biyokimya bağlamı', type: 'lab', category: 'laboratory', priority: 'useful', tag: 'Destekleyici veri', score: 1, summary: 'Karaciğer hastalığı izlemi biyopsinin neden alındığını açıklar; hücre tipi ayrımı için asıl değer mikroskobik sinüzoid değerlendirmesindedir.', values: [['AST/ALT', 'Kronik hastalık izlemiyle uyumlu değişkenlik', 'Klinik bağlama göre yorumlanır', 'Destekleyici'], ['Bilirubin', 'Belirgin akut kolestaz yok', 'Referans içinde olabilir', 'Bağlam verisi']] }),
    inv({ id: 'karaciger-biyopsisi-kupffer-1', title: 'Karaciğer biyopsisi', type: 'pathology', category: 'pathology', priority: 'essential', tag: 'Histolojik yapı', score: 4, summary: 'Sinüzoid lümeninde yerleşen CD68 pozitif fagositik hücreler, karaciğerin rezidan makrofaj popülasyonunu tanımak için temel histolojik veridir.', values: [['Lokalizasyon', 'Hepatosit kordonları arasında sinüzoid lümeni', 'Sinüzoid yapısı seçilmeli', 'Anatomik ipucu'], ['İmmün belirteç', 'CD68 pozitif fagositik hücreler', 'Makrofaj belirteci beklenir', 'Histolojik ipucu']], imageIds: img(c, /biyopsi/i) }),
  ],

  'v188-new-261-yenidoganda-siyanoz-ve-tek-buyuk-damar-cikisi': (c) => [
    inv({ id: 'siyanoz-ufurum-trunkus-1', title: 'Yenidoğan siyanoz ve kardiyak muayene', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Doğumdan sonra süren siyanoz ve kardiyak üfürüm, büyük damar çıkışı ve septasyon kusuru açısından hedefli değerlendirmeyi başlatır.', values: [['Santral siyanoz', 'Kalıcı', 'Düzelmesi beklenir', 'Kritik'], ['Üfürüm', 'Sistolik/karma üfürüm duyulabilir', 'Belirgin üfürüm beklenmez', 'Destekleyici']] }),
    inv({ id: 'oksijen-saturasyonu-trunkus-1', title: 'Oksijen satürasyonu izlemi', type: 'clinical', category: 'bedside', priority: 'essential', tag: 'İlk basamak veri', score: 2, summary: 'Persistan düşük satürasyon karışım fizyolojisini gösterir; anatomik düzey ekokardiyografiyle netleştirilir.', values: [['SpO₂', '%78–82 aralığında', '>94 beklenir', 'Düşük'], ['Oksijene yanıt', 'Kısmi/sınırlı', 'Belirgin düzelme beklenir', 'Kritik ipucu']] }),
    inv({ id: 'akciger-grafisi-trunkus-1', title: 'Akciğer grafisi', type: 'xray', category: 'imaging', priority: 'situational', tag: 'Destekleyici bulgu', score: 2, summary: 'Pulmoner vasküler görünüm ve kardiyak silüet şant fizyolojisinin etkisini gösterir; tek başına çıkış damar anatomisini belirlemez.', values: [['Pulmoner vaskülarite', 'Artmış/karma akım paterni', 'Yaşa göre normal olmalı', 'Destekleyici']] }),
    inv({ id: 'ekokardiyografi-trunkus-1', title: 'Ekokardiyografi', type: 'echo', category: 'cardiac', priority: 'essential', tag: 'Hedefli görüntüleme', score: 4, summary: 'Tek büyük arteriyel çıkış ve ventriküler septal defekt, aortopulmoner septasyonun tamamlanmadığını anatomik düzeyde gösterir.', values: [['Büyük damar çıkışı', 'Tek trunkal çıkış izleniyor', 'Aort ve pulmoner arter ayrılmalı', 'Patolojik'], ['Ventriküler septum', 'Eşlik eden VSD', 'Septum bütün olmalı', 'Patolojik']], imageIds: img(c, /ekokardiyografi/i) }),
  ],

  'v189-new-277-yenidoganda-surekli-ufurum': (c) => [
    inv({ id: 'ufurum-pda-pge2-1', title: 'Sürekli üfürüm ve periferik nabız değerlendirmesi', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Prematüre bebekte sürekli üfürüm ve belirgin periferik nabızlar, duktal açıklığın postnatal dönemde sürdüğünü düşündüren ilk bulgulardır.', values: [['Üfürüm', 'Sürekli makine tarzı', 'Belirgin sürekli üfürüm beklenmez', 'Kritik ipucu'], ['Periferik nabız', 'Belirgin/sıçrayıcı', 'Normal amplitüd beklenir', 'Destekleyici']] }),
    inv({ id: 'nabiz-basinc-spo2-pda-pge2-1', title: 'Nabız basıncı ve oksijenasyon izlemi', type: 'clinical', category: 'bedside', priority: 'useful', tag: 'İlk basamak veri', score: 2, summary: 'Geniş nabız basıncı ve oksijenasyon izlemi şantın hemodinamik etkisini gösterir; duktal anatomiyi doğrudan göstermez.', values: [['Nabız basıncı', 'Geniş', 'Yaşa göre normal olmalı', 'Destekleyici'], ['SpO₂', 'Sınırda düşük/izlemde', 'Term yenidoğanda yüksek beklenir', 'İzlem']] }),
    inv({ id: 'eko-pda-pge2-1', title: 'Ekokardiyografi', type: 'echo', category: 'cardiac', priority: 'essential', tag: 'Doğrulayıcı test', score: 4, summary: 'Aort ile pulmoner arter arasındaki açık kanal ve soldan sağa akım, fetal dolaşım yapısının kapanma basamağındaki yetersizliği gösterir.', values: [['Duktal kanal', 'Aort-pulmoner arter arasında açık bağlantı', 'Postnatal kapanma beklenir', 'Açık'], ['Akım', 'Soldan sağa şant', 'Şant olmamalı', 'Hemodinamik veri']], imageIds: img(c, /ekokardiyografi/i) }),
  ],

  'v189-new-278-emilim-yuzeyinin-histolojik-temeli': (c) => [
    inv({ id: 'malabsorpsiyon-klinik-lab-baglam-1', title: 'Malabsorpsiyon klinik ve laboratuvar bağlamı', type: 'lab', category: 'laboratory', priority: 'useful', tag: 'Destekleyici veri', score: 1, summary: 'Kilo kaybı, yağlı dışkılama ve eksiklik bulguları emilim yüzeyi sorununu düşündürür; histolojik yapı ayrımı için duodenal mukozanın mikroskopisi gerekir.', values: [['Hemoglobin/ferritin', 'Eksiklik eğilimi olabilir', 'Yaşa göre normal beklenir', 'Destekleyici'], ['Dışkı yağ içeriği', 'Artış açısından değerlendirilebilir', 'Artmamalı', 'İzlem']] }),
    inv({ id: 'duodenum-biyopsisi-mikrovillus-1', title: 'Duodenum biyopsisi', type: 'pathology', category: 'pathology', priority: 'essential', tag: 'Histolojik yapı', score: 4, summary: 'Enterositlerin apikal fırçamsı kenarı, yüzey alanını artıran mikroskobik çıkıntıların organizasyonunu gösterir ve emilim kapasitesiyle doğrudan ilişkilidir.', values: [['Apikal yüzey', 'Fırçamsı kenar belirgin', 'Apikal özelleşme beklenir', 'Histolojik ipucu'], ['Emilim yüzeyi', 'Apikal çıkıntılarla artmış', 'Yüzey alanı artırıcı yapı beklenir', 'Mekanizma ipucu']], imageIds: img(c, /biyopsi/i) }),
  ],

  'v189-new-279-yenidoganda-solunum-sikintisi-ve-barsak-sesleri': (c) => [
    inv({ id: 'solunum-toraks-batin-cdh-2', title: 'Solunum ve torakoabdominal muayene', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Sol hemitoraksta solunum seslerinin azalması, toraksta barsak sesi ve skafoid karın abdominal içeriğin toraksa yer değiştirdiğini düşündürür.', values: [['Toraks oskültasyonu', 'Solunum sesi az; barsak sesi duyuluyor', 'Barsak sesi toraksta olmamalı', 'Kritik'], ['Karın', 'Skafoid', 'Normal karın konturu beklenir', 'Destekleyici']] }),
    inv({ id: 'spo2-kan-gazi-cdh-2', title: 'Oksijenasyon / kan gazı değerlendirmesi', type: 'bloodGas', category: 'respiratory', priority: 'useful', tag: 'İlk basamak veri', score: 2, summary: 'Hipoksemi ve solunum yetmezliği bulguları, toraks içi bası ve akciğer gelişim etkilenmesinin fonksiyonel sonucunu gösterir.', values: [['SpO₂', '%82, oda havasında', '>94 beklenir', 'Düşük'], ['PaCO₂', '55 mmHg', '35–45 mmHg', 'Yüksek']] }),
    inv({ id: 'torakoabdominal-grafi-cdh-2', title: 'Torakoabdominal direkt grafi', type: 'xray', category: 'imaging', priority: 'essential', tag: 'Hedefli görüntüleme', score: 4, summary: 'Toraks içinde barsak ansları ve mediastinal şift, pleuroperitoneal membran kapanma kusurunun anatomik sonucunu gösteren hedefli görüntüleme bulgusudur.', values: [['Toraks', 'Barsak ansları sol hemitoraksta', 'Toraksta barsak ansı beklenmez', 'Patolojik'], ['Mediasten', 'Karşı tarafa itilmiş', 'Orta hatta olmalı', 'Kritik']], imageIds: img(c, /grafi/i) }),
  ],

  'v194-new-312-dil-hareketiyle-yukselen-boyun-kitlesi': (c) => [
    inv({ id: 'orta-hat-boyun-kitle-muayene-1', title: 'Orta hat boyun kitle muayenesi', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Hyoid komşuluğunda orta hat kitle ve dil çıkarma/yutkunma ile yukarı hareket, tiroid iniş yolu boyunca kalan bir gelişimsel bağlantıyı düşündürür.', values: [['Lokalizasyon', 'Hyoid komşuluğunda orta hat', 'Lateral yerleşim beklenmez', 'Kritik ipucu'], ['Hareket', 'Dil çıkarma/yutkunma ile yükseliyor', 'Boyun kitlelerinde değişken', 'Mekanizma ipucu']] }),
    inv({ id: 'boyun-usg-tiroglossal-1', title: 'Boyun ultrasonografisi', type: 'ultrasound', category: 'imaging', priority: 'essential', tag: 'Anatomik lokalizasyon', score: 3, summary: 'Orta hat kistik lezyonun hyoid komşuluğu ve normal yerleşimli tiroid dokusuyla birlikte görülmesi, tiroid iniş yolu kalıntısı lehine anatomik destek sağlar.', values: [['Kitle', 'Hyoid komşuluğunda orta hatta kistik lezyon', 'Kistik lezyon beklenmez', 'Patolojik'], ['Tiroid dokusu', 'Normal boyun yerleşiminde izlenir', 'Normal yerleşim beklenir', 'Korunmuş']], imageIds: img(c, /boyun/i) }),
    inv({ id: 'tiroid-fonksiyon-tiroglossal-1', title: 'Tiroid fonksiyon / ektopik tiroid dışlama', type: 'lab', category: 'laboratory', priority: 'situational', tag: 'Cerrahi planlama', score: 2, summary: 'Cerrahi planlama öncesi normal yerleşimli ve işlevsel tiroid dokusunun varlığı doğrulanır; bu veri kistin embriyolojik kökenini tek başına kanıtlamaz.', values: [['TSH/serbest T4', 'Yaşa göre referans içinde', 'Referans içinde beklenir', 'Uyumlu'], ['Normal tiroid dokusu', 'USG ile gösterildi', 'Boyunda normal yerleşim beklenir', 'Cerrahi öncesi değerli']] }),
  ],

  'v194-new-313-testis-biyopsisinde-destek-hucresi': (c) => [
    inv({ id: 'semen-analizi-sertoli-1', title: 'Semen analizi ve klinik bağlam', type: 'lab', category: 'laboratory', priority: 'useful', tag: 'Destekleyici veri', score: 1, summary: 'Oligospermi, seminifer tübül işlevinin klinik sonucunu gösterir; destek hücresinin kimliği ve görevi histolojik değerlendirmeyle ilişkilendirilir.', values: [['Sperm sayısı', 'Oligospermi', 'Referans aralığında beklenir', 'Düşük'], ['Akut enfeksiyon bulgusu', 'Yok', 'Yok', 'Dışlatıcı']] }),
    inv({ id: 'testis-biyopsisi-sertoli-1', title: 'Testis biyopsisi', type: 'pathology', category: 'pathology', priority: 'essential', tag: 'Histolojik yapı', score: 4, summary: 'Seminifer tübül içinde bazal laminadan lümene uzanan destek hücreleri ve gelişen germ hücreleriyle ilişkileri, kan-testis bariyeri işlevini anlamak için temel mikroskobik veridir.', values: [['Hücre lokalizasyonu', 'Bazal laminadan lümene uzanan destek hücreleri', 'Seminifer tübül destek hücreleri beklenir', 'Histolojik ipucu'], ['Germ hücre ilişkisi', 'Gelişen germ hücreleriyle yakın temas', 'Spermatogenezi destekleyen ilişki beklenir', 'Mekanizma ipucu']], imageIds: img(c, /biyopsi/i) }),
  ],

  'v194-new-314-erken-gebelikte-trofoblast-islevi': (c) => [
    inv({ id: 'erken-gebelik-klinik-baglam-trofoblast-1', title: 'Erken gebelik klinik bağlamı', type: 'clinical', category: 'prenatal', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Son adet tarihine göre erken gebelik, stabil hemodinami ve akut batın bulgusu olmaması biyokimyasal gebelik izlemini ve yerleşim değerlendirmesini anlamlı kılar.', values: [['Klinik durum', 'Kanama, şiddetli ağrı veya instabilite yok', 'Acil patoloji olmamalı', 'Stabil'], ['Gebelik yaşı', 'Erken gebelik haftasıyla uyumlu', 'SAT/USG ile birlikte yorumlanır', 'Bağlam verisi']] }),
    inv({ id: 'seri-beta-hcg-trofoblast-1', title: 'Seri beta-hCG', type: 'lab', category: 'prenatal', priority: 'essential', tag: 'Kritik ipucu', score: 3, summary: 'Erken gebelikte hCG üretiminin başlıca kaynağı sinsityotrofoblasttır; seri artış gebeliğin biyokimyasal olarak sürdüğünü gösterir ancak implantasyon yerini tek başına belirlemez.', values: [['Beta-hCG', '48 saatte beklenen düzeyde artış', 'Erken gebelikte seri artış beklenir', 'Uyumlu'], ['Birim yorumu', 'mIU/mL cinsinden seri ölçümle izlenir', 'Tek ölçüm sınırlıdır', 'İzlem']] }),
    inv({ id: 'transvajinal-usg-erken-gebelik-1', title: 'Transvajinal ultrasonografi', type: 'ultrasound', category: 'prenatal', priority: 'essential', tag: 'Yerleşim değerlendirir', score: 3, summary: 'Uterin kavite içinde gebelik kesesi görülmesi intrauterin yerleşimle uyumludur; bu bulgu patolojik değil, beta-hCG sonucu için beklenen anatomik bağlamdır.', values: [['Gebelik kesesi', 'Uterin kavite içinde izlendi', 'İntrauterin yerleşim beklenir', 'Uyumlu'], ['Adneksiyal kitle/serbest sıvı', 'Saptanmadı', 'Saptanmamalı', 'Ektopik lehine değil']] }),
    inv({ id: 'progesteron-korpus-luteum-trofoblast-1', title: 'Progesteron / korpus luteum desteği', type: 'lab', category: 'laboratory', priority: 'situational', tag: 'Mekanizma ipucu', score: 2, summary: 'hCG’nin korpus luteumu destekleyerek progesteron üretimini sürdürmesi erken gebelik devamlılığıyla ilişkilidir; bu yardımcı veri trofoblast işlevini fizyolojik bağlama yerleştirir.', values: [['Progesteron', 'Erken gebelikle uyumlu düzey', 'Gebelik haftasına göre yorumlanır', 'Destekleyici']] }),
  ],

  'v195-new-341-katekolamin-salgilayan-hucre-kokeni': (c) => [
    inv({ id: 'atak-sirasinda-hemodinami-kromaffin-1', title: 'Atak sırasında hemodinamik değerlendirme', type: 'clinical', category: 'clinicalAssessment', priority: 'useful', tag: 'Temel değerlendirme', score: 1, summary: 'Paroksismal baş ağrısı, terleme, çarpıntı ve hipertansiyon atakları adrenal medulla kaynaklı katekolamin fazlalığını klinik bağlama taşır.', values: [['Atak bulguları', 'Terleme, çarpıntı ve baş ağrısı', 'Tekrarlayan atak beklenmez', 'Kritik ipucu'], ['Kan basıncı', 'Atak sırasında yüksek', 'Yaşa göre normal olmalı', 'Anormal']] }),
    inv({ id: 'katekolamin-metabolitleri-kromaffin-1', title: 'Katekolamin metabolitleri', type: 'lab', category: 'laboratory', priority: 'essential', tag: 'Kritik ipucu', score: 3, summary: 'Metanefrin/normetanefrin yüksekliği adrenal medulla kromaffin hücre aktivitesini destekler; embriyolojik köken için hücre tipinin gelişim bilgisi yorumlanmalıdır.', values: [['Plazma metanefrin', 'Yüksek', 'Referans içinde beklenir', 'Yüksek'], ['Normetanefrin', 'Yüksek', 'Referans içinde beklenir', 'Yüksek']] }),
    inv({ id: 'adrenal-mr-kromaffin-1', title: 'Adrenal BT/MR görüntüleme', type: 'mri', category: 'imaging', priority: 'useful', tag: 'Anatomik lokalizasyon', score: 3, summary: 'Lezyonun adrenal medulla yerleşimli gösterilmesi, katekolamin salgılayan hücre popülasyonunun anatomik kaynağını belirler.', values: [['Lezyon lokalizasyonu', 'Adrenal medulla düzeyinde kitle', 'Kitle beklenmez', 'Anatomik ipucu']] }),
    inv({ id: 'adrenal-patoloji-kromaffin-1', title: 'Adrenal patoloji', type: 'pathology', category: 'pathology', priority: 'essential', tag: 'Histolojik yapı', score: 4, summary: 'Kromaffin hücre morfolojisinin ve medulla yerleşiminin gösterilmesi hücre tipini tanımlar; köken bilgisi öğrencinin nöral krest gelişimiyle kuracağı mekanik bağlantıdır.', values: [['Hücre tipi', 'Kromaffin hücreleriyle uyumlu morfoloji', 'Adrenal medullada beklenen hücre tipi', 'Histolojik ipucu'], ['Yerleşim', 'Adrenal medulla', 'Korteksten ayrı değerlendirilir', 'Anatomik lokalizasyon']], imageIds: img(c, /patoloji/i) }),
  ],

  'v195-new-342-tekrarlayan-kirik-ve-mavi-sklera': (c) => [
    inv({ id: 'bag-dokusu-klinik-degerlendirme-oi-1', title: 'Bağ dokusu klinik değerlendirmesi', type: 'clinical', category: 'clinicalAssessment', priority: 'essential', tag: 'Temel değerlendirme', score: 1, summary: 'Düşük travmalı kırıklar, mavi sklera ve dentin bulguları aynı bağ dokusu protein bozukluğuna işaret eden klinik birlikteliktir.', values: [['Sklera', 'Mavimsi görünüm', 'Normal beyaz sklera beklenir', 'Kritik ipucu'], ['Kırık öyküsü', 'Düşük travmayla tekrarlayan', 'Tekrarlayıcı kırık beklenmez', 'Anormal'], ['Dentin', 'Kırılganlık/deformite açısından değerlendirildi', 'Normal yapı beklenir', 'Destekleyici']] }),
    inv({ id: 'kalsiyum-fosfor-alp-oi-1', title: 'Kalsiyum-fosfor-ALP paneli', type: 'lab', category: 'laboratory', priority: 'situational', tag: 'Ayırıcıyı daraltır', score: 2, summary: 'Mineral metabolizmasının belirgin bozulmaması, kırık eğilimini primer mineral eksikliğinden çok kollajen matriks kusuru bağlamında yorumlamaya yardım eder.', values: [['Kalsiyum', 'Referans içinde', 'Yaşa göre normal', 'Normal'], ['Fosfor', 'Referans içinde', 'Yaşa göre normal', 'Normal'], ['ALP', 'Yaşa göre belirgin patolojik artış yok', 'Yaşa göre değişir', 'Destekleyici']] }),
    inv({ id: 'kemik-grafileri-oi-1', title: 'Kemik grafileri', type: 'xray', category: 'imaging', priority: 'essential', tag: 'Hedefli görüntüleme', score: 3, summary: 'Osteopeni ve farklı iyileşme evrelerindeki kırıklar bağ dokusu matriks dayanıklılığındaki bozukluğu gösterir.', values: [['Kemik mineral görünümü', 'Osteopeni', 'Yaşa göre normal yoğunluk beklenir', 'Anormal'], ['Kırıklar', 'Farklı iyileşme evrelerinde eski kırıklar', 'Tekrarlayıcı kırık beklenmez', 'Destekleyici']], imageIds: img(c, /grafi/i) }),
    inv({ id: 'kollajen-genetik-degerlendirme-oi-1', title: 'Kollajen/genetik değerlendirme', type: 'lab', category: 'laboratory', priority: 'essential', tag: 'Doğrulayıcı test', score: 4, summary: 'COL1A1/COL1A2 ilişkili bozukluk, kemik, sklera ve dentinde baskın olan fibriller kollajen yapısının neden etkilendiğini moleküler düzeyde açıklar.', values: [['Moleküler inceleme', 'COL1A1/COL1A2 ilişkili varyant açısından pozitif/uyumlu', 'Patojenik varyant beklenmez', 'Doğrulayıcı'], ['Doku ilişkisi', 'Kemik-sklera-dentin tutulumu birlikte', 'Tek doku tutulumu beklenmez', 'Mekanizma ipucu']] }),
  ],
};

const report = {
  generatedAt: new Date().toISOString(),
  scope: 'Only histology-embryology standard cases with investigation layers were modified.',
  modifiedCaseIds: [],
  untouchedHistologyEmbryologyIds: [],
  skippedNoInvestigationIds: [],
  investigationCounts: {},
  notes: [],
};

for (const c of rawCases) {
  const isHist = c.branchId === 'histology-embryology' || /Histoloji|Embriyoloji/i.test(c.relatedBranch || '');
  if (!isHist) continue;
  if (typeof updateMap[c.id] === 'function') {
    const oldCount = (c.investigations || []).length;
    c.investigations = updateMap[c.id](c);
    c.preserveInvestigationOrder = true;
    report.modifiedCaseIds.push(c.id);
    report.investigationCounts[c.id] = { before: oldCount, after: c.investigations.length };
  } else if (!Array.isArray(c.investigations) || c.investigations.length === 0) {
    report.skippedNoInvestigationIds.push(c.id);
  } else {
    report.untouchedHistologyEmbryologyIds.push(c.id);
  }
}

report.notes.push('Prenatal AFP/AChE item is explicitly categorized as prenatal, not toxicology.');
report.notes.push('All modified investigation cards include short value tags and scoreValue/scoreImpact without changing answer options.');
report.notes.push('Trophoblast hCG source wording is corrected to Turkish “sinsityotrofoblast” in investigation feedback.');

const source = fs.readFileSync(casesPath, 'utf8');
const prefix = source.slice(0, source.indexOf('export const rawCases = '));
const suffixStart = source.indexOf('\n\nexport const cases =');
if (suffixStart === -1) throw new Error('Could not locate cases export suffix.');
const suffix = source.slice(suffixStart);
const serialized = `${prefix}export const rawCases = ${JSON.stringify(rawCases, null, 2)};${suffix}`;
fs.writeFileSync(casesPath, serialized);
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
fs.writeFileSync(technicalReportPath, [
  'KlinikIQ Histoloji ve Embriyoloji tetkik/objektif veri katmanı güncellemesi',
  `Güncellenen vaka sayısı: ${report.modifiedCaseIds.length}`,
  `Tetkiksiz / vaka dışı spot kayıt olarak atlanan kayıt sayısı: ${report.skippedNoInvestigationIds.length}`,
  'Kapsam: Yalnızca branchId=histology-embryology veya relatedBranch Histoloji/Embriyoloji olan kayıtlar.',
  'Uygulanan değişiklikler: basitten komplekse tetkik akışı, prenatal/postnatal değerlendirme sırası, kısa test değer etiketi, scoreValue/scoreImpact, kategori düzeltmeleri ve kısa yorumların mekanizma odaklı temizlenmesi.',
  'Koruma: Tanı seçenekleri, doğru cevap metni, optionFeedback ve genel vaka schema alanları korunmuştur; yalnızca tetkik katmanı ve preserveInvestigationOrder alanı güncellenmiştir.',
].join('\n'));

console.log(JSON.stringify(report, null, 2));
