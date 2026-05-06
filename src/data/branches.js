export const STANDARD_BRANCHES = [
  {
    "id": "quick-case",
    "name": "HIZLI CASE",
    "shortName": "HIZLI CASE",
    "description": "Kısa öykü, hedefe yönelik muayene, gerekirse sınırlı tetkik ve hızlı klinik karar sorularıyla TUS odaklı mini olgu alanı. Adli yaklaşım, yönetim kararı, spot bilgi ve kısa klinik senaryolar bu bölümde yer alır.",
    "accent": "teal",
    "icon": "quick",
    "layout": "featured"
  },
  {
    "id": "anatomy",
    "name": "Anatomi",
    "shortName": "Anatomi",
    "description": "Bölgesel yapı, komşuluk ilişkileri, sinir-damar seyri ve klinik anatomik korelasyonlar.",
    "accent": "slate",
    "icon": "anatomy"
  },
  {
    "id": "physiology",
    "name": "Fizyoloji",
    "shortName": "Fizyoloji",
    "description": "Sistem işleyişi, homeostaz, temel mekanizmalar ve klinik fizyolojik yorumlar.",
    "accent": "rose",
    "icon": "physiology"
  },
  {
    "id": "histology-embryology",
    "name": "Histoloji ve Embriyoloji",
    "shortName": "Histoloji ve Embriyoloji",
    "description": "Doku yapısı, mikroskobik özellikler ve gelişimsel süreçlerin klinik yansımaları.",
    "accent": "violet",
    "icon": "histology"
  },
  {
    "id": "medical-biochemistry",
    "name": "Tıbbi Biyokimya",
    "shortName": "Tıbbi Biyokimya",
    "description": "Metabolik yollar, enzim bozuklukları, biyokimyasal tanı mantığı ve laboratuvar ilişkileri.",
    "accent": "blue",
    "icon": "biochemistry"
  },
  {
    "id": "medical-microbiology",
    "name": "Tıbbi Mikrobiyoloji",
    "shortName": "Tıbbi Mikrobiyoloji",
    "description": "Bakteri, virüs, mantar ve parazitlerin tanısal, klinik ve laboratuvar temelli değerlendirilmesi.",
    "accent": "lime",
    "icon": "microbiology"
  },
  {
    "id": "medical-pathology",
    "name": "Tıbbi Patoloji",
    "shortName": "Tıbbi Patoloji",
    "description": "Hastalıkların hücresel ve doku düzeyindeki temeli, morfolojik paternler ve klinik korelasyon.",
    "accent": "warning",
    "icon": "pathology"
  },
  {
    "id": "medical-pharmacology",
    "name": "Tıbbi Farmakoloji",
    "shortName": "Tıbbi Farmakoloji",
    "description": "İlaç etki mekanizmaları, yan etkiler, etkileşimler ve klinik tedavi kararlarının temeli.",
    "accent": "success",
    "icon": "pharmacology"
  },
  {
    "id": "internal-medicine",
    "name": "İç Hastalıkları",
    "shortName": "İç Hastalıkları",
    "description": "Dahili ayırıcı tanılar, metabolik ve sistemik hastalıklar, kardiyopulmoner ve iç organ temelli klinik kararlar.",
    "accent": "blue",
    "icon": "internal"
  },
  {
    "id": "pediatrics",
    "name": "Çocuk Sağlığı ve Hastalıkları",
    "shortName": "Çocuk Sağlığı ve Hastalıkları",
    "description": "Yaşa özgü değerlendirme, pediatrik aciller, büyüme-gelişme ve çocukluk çağı hastalıkları.",
    "accent": "sky",
    "icon": "peds"
  },
  {
    "id": "general-surgery",
    "name": "Genel Cerrahi",
    "shortName": "Genel Cerrahi",
    "description": "Akut batın, cerrahi yaklaşım, travma, zamanlama ve ameliyat gerektiren karar süreçleri.",
    "accent": "warning",
    "icon": "surgery"
  },
  {
    "id": "obstetrics-gynecology",
    "name": "Kadın Hastalıkları ve Doğum",
    "shortName": "Kadın Hastalıkları ve Doğum",
    "description": "Gebelik, obstetrik aciller, jinekolojik tablolar ve kadın sağlığına yönelik klinik yaklaşım.",
    "accent": "danger",
    "icon": "obgyn"
  },
  {
    "id": "minor-rotations",
    "name": "Küçük Stajlar",
    "shortName": "Küçük Stajlar",
    "description": "Nöroloji, psikiyatri, dermatoloji, KBB, göz, ortopedi, acil ve diğer kısa staj alanlarına ait yüksek verimli olgular.",
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

export const QUICK_CASE_BRANCH_ID = 'quick-case';

export const branches = STANDARD_BRANCHES;
