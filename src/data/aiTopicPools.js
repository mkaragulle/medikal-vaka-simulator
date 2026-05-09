export const AI_QUESTION_TYPE_POOL = [
  'diagnosis',
  'first-step-management',
  'test-interpretation',
  'mechanism',
  'complication',
  'differential-diagnosis',
];

export const AI_TOPIC_POOLS = Object.freeze({
  'tus-spot-olgular': [
    'Anafilaksi ilk yaklaşımı', 'Pulmoner emboli risk sınıflaması', 'Akut koroner sendrom EKG yorumu', 'Diyabetik ketoasidoz sıvı-insülin dengesi',
    'Menenjit ampirik tedavisi', 'Sepsis erken yaklaşımı', 'Acil inme tromboliz penceresi', 'Hiperkalemi EKG ve ilk tedavi',
    'Ektopik gebelik ayırıcı tanısı', 'Çocuk istismarı kırmızı bayrakları', 'Hepatit serolojisi yorumu', 'Antidot seçimi',
  ],
  anatomy: [
    'Brakiyal pleksus lezyonları', 'Karpal tünel anatomisi', 'Femoral kanal ve fıtık ayrımı', 'Kafa çiftleri klinik lokalizasyonu',
    'Koroner arter dominansı', 'Pelvik taban innervasyonu', 'Safra yolları anatomisi', 'Mediasten komşulukları',
    'Spinal kord traktları', 'Kan-beyin bariyeri anatomik temeli', 'İnguinal kanal sınırları', 'Orbita kas ve sinir ilişkileri',
  ],
  physiology: [
    'Asit-baz kompansasyonu', 'Renin-anjiyotensin-aldosteron sistemi', 'Kalp debisi ve Frank-Starling', 'Solunum fizyolojisi V/Q uyumsuzluğu',
    'Glomerüler filtrasyon düzenlenmesi', 'Aksiyon potansiyeli fazları', 'Tiroid hormon aksı', 'Kortizol geri bildirimi',
    'İnsülin-glukagon dengesi', 'Kas iğciği ve golgi tendon refleksi', 'Oksijen disosiyasyon eğrisi', 'Termoregülasyon',
  ],
  'histology-embryology': [
    'Nöral tüp defektleri', 'Faringeal ark anomalileri', 'Kalp septasyon kusurları', 'Böbrek gelişimi ve üreter tomurcuğu',
    'Plasenta bariyeri', 'Bağırsak rotasyon anomalileri', 'Akciğer gelişim evreleri', 'Gametogenez ve imprinting',
    'Epitel tipleri ve yerleşimleri', 'Bağ dokusu hücreleri', 'Karaciğer lobülü histolojisi', 'Glomerül filtrasyon bariyeri',
  ],
  'medical-biochemistry': [
    'Fenilketonüri ve aminoasit metabolizması', 'Üre siklusu bozuklukları', 'Glikojen depo hastalıkları', 'Pirüvat dehidrogenaz eksikliği',
    'Yağ asidi oksidasyon bozuklukları', 'Lesch-Nyhan sendromu', 'Hem sentezi ve porfiriler', 'Lipoprotein metabolizması',
    'DNA tamir mekanizmaları', 'Kollajen sentezi ve skorbüt', 'Oksidatif fosforilasyon inhibitörleri', 'Metabolik asidoz biyokimyası',
  ],
  'medical-microbiology': [
    'Stenotrophomonas maltophilia', 'Pseudomonas aeruginosa', 'Anaerop enfeksiyonlar', 'Hepatit serolojileri',
    'HIV fırsatçı enfeksiyonları', 'Tüberküloz tanı testleri', 'Meningokok profilaksisi', 'Streptococcus pneumoniae virülansı',
    'Staphylococcus aureus toksinleri', 'Clostridioides difficile yaklaşımı', 'Paraziter enfeksiyonlarda eozinofili', 'Candida ve Aspergillus ayrımı',
    'Beta-laktamaz ve direnç mekanizmaları', 'Kuduz temas sonrası profilaksi', 'TORCH enfeksiyonları', 'Kan kültürü kontaminasyon ayrımı',
  ],
  'medical-pathology': [
    'Koagülasyon ve likefaksiyon nekrozu ayrımı', 'Granülomatöz inflamasyon', 'Amiloidoz boyanma özellikleri', 'Displazi-karsinoma in situ ayrımı',
    'Tümör süpresör genler', 'Onkogen aktivasyonu', 'Apoptoz mekanizmaları', 'Reperfüzyon hasarı',
    'Hipersensitivite tipleri', 'Nefritik-nefrotik patern', 'Karaciğer yağlanması ve alkolik hepatit', 'Akut-kronik inflamasyon hücreleri',
  ],
  'medical-pharmacology': [
    'Organofosfat zehirlenmesi ve atropin-pralidoksim', 'Opioid toksisitesi ve nalokson', 'Benzodiazepin toksisitesi ve flumazenil', 'Parasetamol toksisitesi ve N-asetilsistein',
    'Beta-bloker ve kalsiyum kanal bloker zehirlenmesi', 'Aminoglikozid yan etkileri', 'Makrolid CYP etkileşimleri', 'ACE inhibitörü yan etkileri',
    'Antipsikotik ekstrapiramidal etkiler', 'Antiepileptik gebelik riskleri', 'Antikoagülan antidotları', 'Kemoterapi toksisiteleri',
  ],
  'internal-medicine': [
    'Akut koroner sendrom ilk yaklaşımı', 'Pulmoner emboli tanı ve tedavi', 'DKA ve HHS ayrımı', 'Hiponatremi yaklaşımı',
    'Hiperkalemi EKG ve tedavi', 'Addison krizi', 'Tiroid fırtınası', 'SLE aktivite takibi',
    'Nefritik ve nefrotik sendrom ayrımı', 'Pnömoni ağırlık değerlendirmesi', 'Üst gastrointestinal kanama', 'Demir eksikliği ve kronik hastalık anemisi',
    'Akut pankreatit şiddet bulguları', 'Siroz komplikasyonları', 'Primer hiperaldosteronizm', 'Feokromositoma tanısı',
  ],
  pediatrics: [
    'Kawasaki hastalığı', 'Hipertrofik pilor stenozu', 'Krup ve epiglottit ayrımı', 'Febril konvülziyon',
    'Nekrotizan enterokolit', 'Çocuk istismarı', 'Aşı kontrendikasyonları', 'Bronşiolit ve astım ayrımı',
    'İnvajinasyon', 'Yenidoğan sepsisi', 'Doğumsal kalp hastalıklarında siyanotik kriz', 'Henoch-Schönlein purpurası',
    'Akut romatizmal ateş', 'Minimal değişiklik hastalığı', 'Pediatrik dehidratasyon', 'Menenjit bulguları ve ampirik yaklaşım',
  ],
  'general-surgery': [
    'Akut apandisit', 'Akut kolesistit', 'Kolanjit Charcot triadı', 'Pankreatit komplikasyonları',
    'İnce bağırsak obstrüksiyonu', 'Perfore peptik ülser', 'Travma primer değerlendirme', 'Hemotoraks ve pnömotoraks',
    'Kompartman sendromu', 'Yanık sıvı resüsitasyonu', 'Meme kitlesi yaklaşımı', 'Kolorektal kanser taraması',
  ],
  'obstetrics-gynecology': [
    'Ektopik gebelik', 'Preeklampsi ve eklampsi', 'Plasenta previa-ablatio ayrımı', 'Postpartum kanama yaklaşımı',
    'Omuz distosisi', 'Rh uygunsuzluğu profilaksisi', 'Gestasyonel diyabet taraması', 'Pelvik inflamatuvar hastalık',
    'Over torsiyonu', 'Endometriozis', 'PCOS tanı kriterleri', 'Serviks kanseri taraması',
  ],
  'minor-rotations': [
    'Akut iskemik inme tromboliz', 'Subaraknoid kanama', 'Guillain-Barré sendromu', 'Myastenia gravis krizi',
    'Bipolar mani tedavisi', 'Nöroleptik malign sendrom', 'Stevens-Johnson sendromu', 'Melanom ABCDE bulguları',
    'Akut açı kapanması glokomu', 'Retina dekolmanı', 'Akut otitis media komplikasyonları', 'Septik artrit ve osteomiyelit ayrımı',
  ],
});

export function normalizeBranchKey(value = '') {
  const text = String(value || '').toLocaleLowerCase('tr').trim();
  const map = {
    rastgele: 'tus-spot-olgular',
    random: 'tus-spot-olgular',
    pediatri: 'pediatrics',
    'çocuk sağlığı ve hastalıkları': 'pediatrics',
    'cocuk sagligi ve hastaliklari': 'pediatrics',
    mikrobiyoloji: 'medical-microbiology',
    'tıbbi mikrobiyoloji': 'medical-microbiology',
    'tibbi mikrobiyoloji': 'medical-microbiology',
    farmakoloji: 'medical-pharmacology',
    'tıbbi farmakoloji': 'medical-pharmacology',
    'tibbi farmakoloji': 'medical-pharmacology',
    biyokimya: 'medical-biochemistry',
    'tıbbi biyokimya': 'medical-biochemistry',
    'tibbi biyokimya': 'medical-biochemistry',
    patoloji: 'medical-pathology',
    'tıbbi patoloji': 'medical-pathology',
    'tibbi patoloji': 'medical-pathology',
    dahiliye: 'internal-medicine',
    'iç hastalıkları': 'internal-medicine',
    'ic hastaliklari': 'internal-medicine',
    cerrahi: 'general-surgery',
    'genel cerrahi': 'general-surgery',
    kadın: 'obstetrics-gynecology',
    'kadın hastalıkları ve doğum': 'obstetrics-gynecology',
    'kadin hastaliklari ve dogum': 'obstetrics-gynecology',
  };
  return AI_TOPIC_POOLS[text] ? text : (map[text] || text || 'tus-spot-olgular');
}

export function getTopicPoolForBranch(branchFilter = 'random') {
  const key = normalizeBranchKey(branchFilter);
  if (AI_TOPIC_POOLS[key]?.length) return AI_TOPIC_POOLS[key];
  return AI_TOPIC_POOLS['tus-spot-olgular'];
}
