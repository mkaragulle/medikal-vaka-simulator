import { getGlossaryTerms, normalizeGlossaryText } from './src/utils/glossary.js';
const active=getGlossaryTerms();
const norms=new Set();
for (const t of active) { [t.term, ...(t.aliases||[])].forEach(x=>x&&norms.add(normalizeGlossaryText(x))); }
const candidates = `Ektopik gebelik
Rüptüre ektopik gebelik
Gebeliği bilinmeyen lokalizasyon
Seri beta-hCG
Diskriminatuvar zon
Transvajinal ultrasonografi
İntrauterin kese
Adneksiyal kitle
Hemoperitoneum
Metotreksat tedavisi
Salpenjektomi
Dilatasyon küretaj
Spontan abortus
Missed abortus
Septik abortus
Molar gebelik
Hidatidiform mol
Komplet mol
Parsiyel mol
Gestasyonel trofoblastik neoplazi
Koryokarsinom
Theca lutein kisti
Hiperemezis gravidarum
Rh izoimmünizasyonu
Anti-D immünoglobulin
Kleihauer-Betke testi
İndirekt Coombs testi
Preeklampsi
Ağır özellikli preeklampsi
Eklampsi
HELLP sendromu
Magnezyum sülfat
Hidralazin
Labetalol
Nifedipin
Proteinüri
Uteroplasental yetmezlik
İntrauterin gelişme kısıtlılığı
Oligohidramnios
Polihidramnios
Plasenta previa
Plasenta dekolmanı
Vasa previa
Plasenta akreata spektrumu
Uterin atoni
Postpartum kanama
Bakri balon
B-Lynch sütürü
Uterin inversiyon
Uterin rüptür
Omuz distosisi
McRoberts manevrası
Suprapubik bası
Turtle sign
Koryoamniyonit
Preterm eylem
Preterm erken membran rüptürü
Tokoliz
Kortikosteroid fetal akciğer maturasyonu
Nöroprotektif magnezyum sülfat
Grup B streptokok profilaksisi
Bishop skoru
Doğum indüksiyonu
Amniyotomi
Non-stres test
Biyofizik profil
Geç deselerasyon
Erken deselerasyon
Değişken deselerasyon
Umbilikal arter Doppler
Gestasyonel diyabet
Oral glukoz tolerans testi
Makrozomi
Polikistik over sendromu
Rotterdam kriterleri
Hirsutizm
Anovulasyon
Primer amenore
Sekonder amenore
Asherman sendromu
Hipotalamik amenore
Prematür over yetmezliği
Hiperprolaktinemi
Galaktore
Endometriozis
Endometrioma
Adenomyozis
Leiomyom
Submüköz miyom
Endometrial hiperplazi
Anormal uterin kanama
PALM-COEIN sınıflaması
Endometrial biyopsi
Postmenopozal kanama
Servikal intraepitelyal neoplazi
HPV 16/18
Pap smear
Kolposkopi
LEEP
Serviks kanseri
Endometrium kanseri
Over kanseri
CA-125
BRCA1/2
Granüloza hücreli tümör
Sertoli-Leydig hücreli tümör
Disgerminom
Yolk sac tümörü
Krukenberg tümörü
Ovaryan torsiyon
Adneksiyal torsiyon
Tuboovaryan apse
Pelvik inflamatuvar hastalık
Servisit
Bakteriyel vajinozis
Trichomonas vajiniti
Vulvovajinal kandidiyazis
Atrofik vajinit
Liken sklerozus
Bartholin apsesi
Stress üriner inkontinans
Urge inkontinans
Pelvik organ prolapsusu
Sistosel
Rektosel
Rahim sarkması
Pudendal sinir bloğu
Histerektomi
Myomektomi
Konizasyon
Antenatal takip
Fetal kalp hızı trasesi
Kategori III fetal kalp hızı
Acil sezaryen
İkizden ikize transfüzyon sendromu
Monokoryonik ikiz
Loşi
Puerperal mastit
Endometrit
Puerperal sepsis
Laktasyon amenoresi
Sheehan sendromu
Fetal baş angajmanı
İstasyon
Efacement
Servikal dilatasyon
Aktif doğum eylemi
Latent faz
Partograf
Operatif vajinal doğum
Vakum ekstraksiyon
Forseps doğum
Epizyotomi
Üçüncü derece perine yırtığı
Dördüncü derece perine yırtığı
Amniyon sıvı embolisi
DIC obstetrik
Kord prolapsusu
Malprezentasyon
Makat geliş
Eksternal sefalik versiyon
Fetal fibronectin
Servikal uzunluk
Serklaj
Nuchal translucency
PAPP-A
Serbest beta-hCG
Üçlü tarama testi
Dörtlü tarama testi
NIPT
Amniyosentez
Koryon villus örneklemesi
Rh uygunsuzluğu
Fetomaternal hemoraji
Hidrops fetalis
Nonimmün hidrops
İmmün hidrops
Umbilikal kord gazı
Apgar skoru
Tocolytic therapy
Betametazon
Dinoproston
Misoprostol doğum indüksiyonu
Oksitosin
Terbutalin
Atosiban
Endometrial polip
Endometriyal karsinom
Seröz over karsinomu
Müsinöz over tümörü
Dermoid kist
Matür kistik teratom
Hiperandrojenizm
Virilizasyon
Korpus luteum kisti
Fonksiyonel over kisti
Mittelschmerz
Dismenore
Disparoni
Vajinismus
Premenstrüel sendrom
Menoraji
Metroraji
Oligomenore
Amenore
Müllerian agenezi
Mayer-Rokitansky-Küster-Hauser sendromu
Turner sendromu amenore
Imperfore hymen
Transvers vajinal septum
Gestasyonel hipertansiyon
Kronik hipertansiyon gebelikte
Süperempoze preeklampsi
Pulmoner ödem gebelikte
Karaciğer kapsül ağrısı preeklampsi
Uterin taşisistoli
Meconium-stained amniotic fluid
Mekonyum aspirasyon riski
Breech presentation
Placenta accreta
Placenta increta
Placenta percreta
Cervical motion tenderness
Chandelier sign
` .trim().split('\n').map(x=>x.trim()).filter(Boolean);
for(const c of candidates){
 const n=normalizeGlossaryText(c);
 if(!norms.has(n)) console.log('MISSING', c, '|', n); else console.log('EXISTS', c);
}
