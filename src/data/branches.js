export const STANDARD_BRANCHES = [
  {
    "id": "tus-spot-olgular",
    "name": "TUS Spot Olgular",
    "shortName": "TUS Spot Olgular",
    "description": "Kısa ve karar odaklı sorularla TUS’ta sık yoklanan tanı, tedavi, tetkik ve spot bilgileri hızlıca pekiştir.",
    "transitionTagline": "Kısa sürede yüksek verimli TUS karar pratiği.",
    "accent": "teal",
    "icon": "spot",
    "layout": "featured"
  },
  {
    "id": "anatomy",
    "name": "Anatomi",
    "shortName": "Anatomi",
    "description": "Anatomik yapıları, komşulukları ve sinir-damar ilişkilerini klinik sorularla netleştir.",
    "transitionTagline": "Yapıyı tanı, komşuluğu kur, klinik bağlantıyı gör.",
    "accent": "slate",
    "icon": "anatomy"
  },
  {
    "id": "physiology",
    "name": "Fizyoloji",
    "shortName": "Fizyoloji",
    "description": "Sistemlerin nasıl çalıştığını, homeostazı ve temel mekanizmaları klinik yorumla birlikte öğren.",
    "transitionTagline": "Sistem işleyişini ritim, denge ve yanıt üzerinden oku.",
    "accent": "rose",
    "icon": "physiology"
  },
  {
    "id": "histology-embryology",
    "name": "Histoloji ve Embriyoloji",
    "shortName": "Histoloji ve Embriyoloji",
    "description": "Doku özelliklerini, mikroskobik yapıları ve gelişim süreçlerini klinik bağlantılarıyla tekrar et.",
    "transitionTagline": "Mikro yapıdan gelişimsel klinik ipucuna ilerle.",
    "accent": "violet",
    "icon": "histology"
  },
  {
    "id": "medical-biochemistry",
    "name": "Tıbbi Biyokimya",
    "shortName": "Tıbbi Biyokimya",
    "description": "Metabolik yolları, enzim bozukluklarını ve laboratuvar mantığını tanıya götüren ipuçlarıyla çalış.",
    "transitionTagline": "Moleküler ipuçlarından klinik yoruma uzanan yol.",
    "accent": "blue",
    "icon": "biochemistry"
  },
  {
    "id": "medical-microbiology",
    "name": "Tıbbi Mikrobiyoloji",
    "shortName": "Tıbbi Mikrobiyoloji",
    "description": "Etkenleri, virülans mekanizmalarını, tanı testlerini ve tedaviye yön veren ayrımları pekiştir.",
    "transitionTagline": "Etkeni tanı, bulaşı düşün, doğru yaklaşımı seç.",
    "accent": "lime",
    "icon": "microbiology"
  },
  {
    "id": "medical-pathology",
    "name": "Tıbbi Patoloji",
    "shortName": "Tıbbi Patoloji",
    "description": "Hastalıkların hücresel temelini, morfolojik paternleri ve klinikle ilişkisini anlaşılır biçimde çalış.",
    "transitionTagline": "Doku paternini yorumla, hastalığın temelini kavra.",
    "accent": "warning",
    "icon": "pathology"
  },
  {
    "id": "medical-pharmacology",
    "name": "Tıbbi Farmakoloji",
    "shortName": "Tıbbi Farmakoloji",
    "description": "İlaç mekanizmalarını, yan etkileri, etkileşimleri ve tedavi seçimlerini sınav odaklı tekrar et.",
    "transitionTagline": "İlaç etkisini mekanizma, yan etki ve karar üzerinden çöz.",
    "accent": "success",
    "icon": "pharmacology"
  },
  {
    "id": "internal-medicine",
    "name": "İç Hastalıkları",
    "shortName": "İç Hastalıkları",
    "description": "Dahili hastalıklarda ayırıcı tanı, laboratuvar yorumu ve sistem temelli klinik karar pratiği yap.",
    "transitionTagline": "Sistemik düşün, önceliği belirle, kliniği bir araya getir.",
    "accent": "blue",
    "icon": "internal"
  },
  {
    "id": "pediatrics",
    "name": "Çocuk Sağlığı ve Hastalıkları",
    "shortName": "Çocuk Sağlığı ve Hastalıkları",
    "description": "Pediatrik tabloları; yaşa özgü bulgular, aciller, büyüme-gelişme ve tedavi yaklaşımıyla ele al.",
    "transitionTagline": "Yaşa özgü ipuçlarıyla güvenli pediatrik karar ver.",
    "accent": "sky",
    "icon": "peds"
  },
  {
    "id": "general-surgery",
    "name": "Genel Cerrahi",
    "shortName": "Genel Cerrahi",
    "description": "Akut batın, travma, cerrahi endikasyon ve zamanlama kararlarını pratik olgularla güçlendir.",
    "transitionTagline": "Hızlı karar, doğru zamanlama, net cerrahi yaklaşım.",
    "accent": "warning",
    "icon": "surgery"
  },
  {
    "id": "obstetrics-gynecology",
    "name": "Kadın Hastalıkları ve Doğum",
    "shortName": "Kadın Hastalıkları ve Doğum",
    "description": "Gebelik, obstetrik aciller, jinekolojik problemler ve kadın sağlığı yaklaşımını klinik kararlarla tekrar et.",
    "transitionTagline": "Anne-fetal güvenlik, jinekolojik karar ve doğru öncelik.",
    "accent": "danger",
    "icon": "obgyn"
  },
  {
    "id": "minor-rotations",
    "name": "Küçük Stajlar",
    "shortName": "Küçük Stajlar",
    "description": "Kısa staj branşlarında sık sorulan yüksek verimli tanı, tedavi ve ayırıcı noktaları hızlıca pekiştir.",
    "transitionTagline": "Çoklu staj bilgisini kompakt klinik karara dönüştür.",
    "accent": "slate",
    "icon": "minor"
  }
];

export const BRANCH_NAME_BY_ID = Object.freeze(
  STANDARD_BRANCHES.reduce((acc, branch) => {
    acc[branch.id] = branch.name;
    return acc;
  }, {}),
);

export const BRANCH_DESCRIPTION_BY_ID = Object.freeze(
  STANDARD_BRANCHES.reduce((acc, branch) => {
    acc[branch.id] = branch.description;
    return acc;
  }, {}),
);

export const TUS_SPOT_BRANCH_ID = 'tus-spot-olgular';
export const SPOT_CASE_BRANCH_ID = TUS_SPOT_BRANCH_ID;
export const LEGACY_QUICK_CASE_BRANCH_ID = TUS_SPOT_BRANCH_ID; // Backward-compatible alias value for old persisted data.

export const branches = STANDARD_BRANCHES;
