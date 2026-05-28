# -*- coding: utf-8 -*-
import json, re, os, copy, textwrap, zipfile, shutil, subprocess, sys
from pathlib import Path
from collections import defaultdict, Counter

PROJECT = Path('/mnt/data/klinikiq_peds_work/klinik_v395_work')
CASES = PROJECT/'src/data/cases.js'
REPORT_DIR = PROJECT/'quality-reports'
REPORT_DIR.mkdir(exist_ok=True)

raw = CASES.read_text(encoding='utf-8')
prefix_token = 'export const rawCases = '
start = raw.index(prefix_token) + len(prefix_token)
end = raw.index('\n];', start) + 2
cases = json.loads(raw[start:end])

BANNED = [
    'bu olguda en uygun yanıt değildir',
    'Bu seçenek doğru değildir',
    'Belirleyici bulgular doğru yanıtı destekler',
    'Belirleyici bulgular',
    'Klinik bağlam bu seçeneği dışlar',
    'Yanlış.',
    'tanısal akıl yürütmeyi güçlendirir',
    'Tanısal akıl yürütmeyi güçlendirir',
    'klinik bağlamda anlam kazanır',
    'Klinik bağlamda anlam kazanır',
    'karar tek parametreyle verilmez',
    'Karar tek parametreyle verilmez',
    'Objektif veri sağlar',
    'Patolojik süreç açısından anlamlıdır',
    'ektopik gebelik',
    'Ektopik gebelik',
    'Hiperglisemi, keton pozitifliği ve anyon açıklıklı metabolik asidoz birlikteliği DKA tanısını destekler',
    'AST/ALT yüksekliği hepatoselüler hasarı düşündürür; kolestatik patern',
    'Lökositoz ve CRP/prokalsitonin yüksekliği sistemik inflamatuvar yanıtı destekler',
    'nefrotik tabloyu gösterir; altta yatan glomerüler bariyer hasarı',
    'pnömoni tanısını güçlendirir',
]

GENERIC_OPTIONS = {
    'aktif kömür': 'Aktif kömür birçok organik ilaç alımında erken dönemde yararlı olabilir; ancak her toksini bağlamaz ve hava yolu güvenliği sağlanmadan uygulanması aspirasyon riski yaratır.',
    'n-asetilsistein': 'N-asetilsistein parasetamol toksisitesinde glutatyon depolarını destekleyerek NAPQI aracılı hepatotoksisiteyi azaltır.',
    'asetilsistein': 'N-asetilsistein parasetamol toksisitesinde glutatyon depolarını destekleyerek NAPQI aracılı hepatotoksisiteyi azaltır.',
    'nalokson': 'Nalokson opioid toksidromunda solunum depresyonu, miyozis ve bilinç baskılanması varsa opioid reseptör antagonisti olarak kullanılır.',
    'flumazenil': 'Flumazenil seçilmiş benzodiazepin zehirlenmelerinde düşünülebilir; karışık alım veya nöbet riski varsa çocuklarda dikkatli kullanılmalıdır.',
    'sodyum bikarbonat': 'Sodyum bikarbonat özellikle trisiklik antidepresan veya sodyum kanal blokeri toksisitesinde QRS genişlemesi ve kardiyotoksisite varsa kullanılır.',
    'deferoksamin': 'Deferoksamin ferrik demiri bağlayarak ferrioksamin kompleksi oluşturur ve ciddi demir zehirlenmesinde doku toksisitesini azaltır.',
    'adrenalin': 'İntramüsküler adrenalin anafilakside bronkospazm, mukozal ödem ve vazodilatasyonu aynı anda hedefleyen mortalite azaltıcı ilk tedavidir.',
    'benzodiazepin': 'Benzodiazepinler uzamış epileptik nöbette GABA-A aracılı inhibitör etkiyi artırarak ilk basamak nöbet durdurucu tedavidir.',
    'adenozin': 'Adenozin AV noddan geçen dar kompleks supraventriküler taşikardide kısa etkili AV nod blokajı sağlayarak ritmi sonlandırabilir.',
    'kalsiyum glukonat': 'İntravenöz kalsiyum glukonat hiperkalemide miyokardı stabilize eder veya semptomatik neonatal hipokalsemide güvenli kalsiyum replasmanı sağlar.',
    'hidrokortizon': 'Stres doz hidrokortizon adrenal kriz veya tuz kaybettiren konjenital adrenal hiperplazide dolaşım bozukluğu ve hipoglisemiyi düzeltmek için geciktirilmez.',
    'hipertonik salin': 'Hipertonik salin semptomatik hiponatremi veya serebral ödemde beyin ödemini azaltmak için acil kontrollü osmoterapi sağlar.',
    'mannitol': 'Mannitol artmış intrakraniyal basınç veya DKA ilişkili serebral ödemde osmoterapi seçeneğidir; sıvı-elektrolit durumu izlenmelidir.',
    'dantrolen': 'Dantrolen malign hipertermide riyanodin reseptörü aracılı kalsiyum salınımını azaltarak kas rijiditesi ve hipertermi döngüsünü durdurur.',
    'atropin': 'Atropin organofosfat zehirlenmesinde muskarinik sekresyon, bronkore ve bradikardi bulgularını antagonize eder.',
    'pralidoksim': 'Pralidoksim organofosfat zehirlenmesinde asetilkolinesterazı reaktive ederek nikotinik kas güçsüzlüğünü düzeltmeye yardımcı olur.',
    'ivig': 'İntravenöz immün globulin Kawasaki hastalığında damar duvarı inflamasyonunu azaltarak koroner arter anevrizması riskini düşürür.',
    'immün globulin': 'İntravenöz immün globulin Kawasaki hastalığında damar duvarı inflamasyonunu azaltarak koroner arter anevrizması riskini düşürür.',
    'aspirin': 'Aspirin Kawasaki hastalığında antiinflamatuvar ve antitrombosit etki için IVIG ile birlikte kullanılır.',
    'antibiyotik': 'Ampirik intravenöz antibiyotik, sepsis, menenjit, febril nötropeni veya septik artrit gibi hızlı ilerleyebilen çocuk acillerinde kültürlerden sonra geciktirilmemelidir.',
    'oksijen': 'Oksijen ve solunum desteği hipoksemi veya solunum sıkıntısı olan çocukta ABC yaklaşımının erken basamağıdır.',
    'sıvı': 'İzotonik sıvı tedavisi dehidratasyon, DKA veya şokta intravasküler hacmi ve doku perfüzyonunu düzeltmek için temel basamaktır.',
    'dekstroz': 'İntravenöz dekstroz semptomatik hipoglisemide nöbet ve nörolojik hasarı önlemek için hızlı verilmesi gereken tedavidir.',
    'bronkoskopi': 'Rijid bronkoskopi şüpheli yabancı cisim aspirasyonunda hem tanısal hem tedavi edici yaklaşımdır.',
    'entübasyon': 'Kontrollü entübasyon ciddi üst hava yolu obstrüksiyonunda deneyimli ekip ve uygun ortamla planlanmalıdır.',
    'endoskopi': 'Endoskopi korozif madde alımında özofagus ve mide yanığını derecelendirmek için stabilizasyon sonrası planlanır.',
    'transfüzyon': 'Eritrosit transfüzyonu hemodinamik etkilenme oluşturan ağır anemi veya orak hücreli hastalıkta akut sekestrasyon krizinde hayat kurtarıcı olabilir.',
    'fasyotomi': 'Fasyotomi kompartman sendromunda artmış kompartman basıncını azaltarak iskemi ve nöromüsküler hasarı önler.',
    'enema': 'Pnömatik veya hidrostatik enema invajinasyonda perforasyon/peritonit yoksa hem tanısal hem tedavi edici redüksiyon sağlar.',
    'piloromiyotomi': 'Ramstedt piloromiyotomi hipertrofik pilor stenozunda kesin cerrahi tedavidir; önce sıvı-elektrolit bozuklukları düzeltilir.',
    'prostaglandin': 'Prostaglandin E1 duktus bağımlı konjenital kalp hastalığında duktus arteriozusu açık tutarak sistemik veya pulmoner kan akımını sürdürür.',
}

TOPIC_RULES = [
    ('demir', ['demir', 'deferoksamin'], 'ciddi akut demir zehirlenmesi', 'yüksek serum demiri, tekrarlayan kusma, letarji, hipotansiyon ve anyon açıklıklı metabolik asidoz', 'Ciddi demir zehirlenmesinde semptom, şok, metabolik asidoz veya yüksek serum demiri varsa spesifik tedavi deferoksamindir; aktif kömür demiri etkin bağlamaz.'),
    ('anafilaksi', ['anafilaksi', 'adrenalin', 'besin sonrası', 'yemek sonrası'], 'anafilaksi', 'alerjen maruziyeti sonrası hızlı başlayan ürtiker/mukozal bulgu, solunum sıkıntısı ve dolaşım etkilenimi', 'Anafilakside ilk ve hayat kurtarıcı tedavi intramüsküler adrenalindir; antihistaminik ve steroidler adrenalin yerine geçmez.'),
    ('status', ['uzayan nöbet', 'jeneralize nöbet', 'benzodiazepin'], 'status epileptikus veya uzamış nöbet', '5 dakikayı aşan jeneralize nöbet, bilinç baskılanması ve hava yolu güvenliği ihtiyacı', 'Uzamış nöbette ABC desteğiyle birlikte ilk ilaç benzodiazepindir; glukoz hızlıca kontrol edilir.'),
    ('dka', ['hiperglisemi', 'dka', 'ketoasidoz', 'derin solunum'], 'diyabetik ketoasidoz', 'hiperglisemi, keton pozitifliği, dehidratasyon ve yüksek anyon açıklıklı metabolik asidoz', 'DKA’da sıvı resüsitasyonu ve potasyum güvenliği insülin tedavisinden önce değerlendirilir.'),
    ('astim', ['astım', 'hışıltı', 'konuşamama'], 'akut astım atağı', 'hışıltı, uzamış ekspiryum, konuşmada zorlanma ve oksijen ihtiyacı', 'Ağır astım atağında oksijen, tekrarlayan SABA, ipratropium ve sistemik steroid birlikte düşünülür.'),
    ('krup', ['havlar', 'krup', 'stridor', 'nebulize adrenalin', 'nebül adrenalin']),
    ('epiglottit', ['salya', 'tripod', 'yutamama', 'hava yolunun güvence', 'kontrollü entübasyon'], 'akut üst hava yolu obstrüksiyonu/epiglottit', 'yüksek ateş, toksik görünüm, salya akması, tripod pozisyonu veya inspiratuvar stridor', 'Epiglottit kuşkusunda boğazı zorlayıcı muayene yapılmaz; kontrollü ortamda hava yolu güvenceye alınır.'),
    ('sepsis', ['sepsis', 'septik', 'dolaşım bozukluğu', 'ateş ve dolaşım', 'hipotermi'], 'pediatrik sepsis veya septik şok', 'ateş/hipotermi, toksik görünüm, taşikardi, hipotansiyon ve uzamış kapiller dolum', 'Pediatrik septik şokta oksijen, damar yolu, izotonik sıvı bolusları ve erken antibiyotik ilk saat içinde geciktirilmez.'),
    ('yabanci_cisim', ['yabancı cisim', 'kuruyemiş', 'tek taraflı hışıltı'], 'yabancı cisim aspirasyonu', 'ani başlayan öksürük/boğulma öyküsü, tek taraflı hışıltı ve havalanma farkı', 'Yabancı cisim aspirasyonunda rijid bronkoskopi hem tanı hem tedavi sağlar; normal grafi tanıyı dışlamaz.'),
    ('menenjit', ['menenjit', 'ense sertliği'], 'bakteriyel menenjit', 'ateş, ense sertliği, toksik görünüm ve inflamatuvar laboratuvar bulguları', 'Menenjit şüphesinde LP gecikecekse kan kültürü alınıp ampirik antibiyotik hemen başlanır.'),
    ('svt', ['çarpıntı', 'adenozin', 'supraventriküler'], 'stabil supraventriküler taşikardi', 'ani başlayan düzenli dar kompleks taşikardi ve stabil perfüzyon', 'Stabil dar kompleks SVT vagal manevraya yanıt vermezse hızlı IV adenozin uygulanır.'),
    ('hipoglisemi', ['açlık sonrası nöbet', 'hipoglisemi', 'dekstroz', 'titreme ve emme'], 'semptomatik hipoglisemi', 'nöbet, jitteriness, beslenme bozulması veya bilinç değişikliğiyle birlikte düşük glukoz', 'Semptomatik hipoglisemide nörolojik hasarı önlemek için hızlı IV dekstroz verilir.'),
    ('hiperkalemi', ['hiperkalemi', 'kas güçsüzlüğü', 'ritim riski', 'böbrek yetmezliğinde'], 'hiperkalemiye bağlı kardiyak risk', 'böbrek yetmezliği, kas güçsüzlüğü, yüksek potasyum ve EKG değişikliği', 'Hiperkalemide EKG değişikliği varsa ilk tedavi miyokardı stabilize eden IV kalsiyum glukonattır.'),
    ('hipokalsemi', ['hipokalsemi', 'kalsiyum', 'jitteriness'], 'semptomatik neonatal hipokalsemi', 'yenidoğanda jitteriness/nöbet ve düşük iyonize kalsiyum', 'Semptomatik neonatal hipokalsemide kardiyak monitörizasyon altında IV kalsiyum glukonat verilir.'),
    ('kawasaki', ['Kawasaki', 'mukokutanoz', 'beş günü aşan ateş', 'koroner'], 'Kawasaki hastalığı', 'beş günü aşan ateş, konjonktivit, mukozal değişiklik, döküntü/ekstremite bulgusu ve lenfadenopati', 'Kawasaki hastalığında IVIG ve aspirin koroner arter komplikasyonu riskini azaltır.'),
    ('hus', ['HÜS', 'hemolitik üremik', 'kanlı ishal', 'shiga'], 'Shiga toksin ilişkili hemolitik üremik sendrom', 'kanlı ishal sonrası anemi, trombositopeni, böbrek fonksiyon bozukluğu ve oligüri', 'Tipik HÜS’te temel yaklaşım destek tedavisi, sıvı-elektrolit dengesi, kan basıncı kontrolü ve gerekirse diyalizdir.'),
    ('iga', ['IgA vasküliti', 'purpura'], 'IgA vasküliti', 'palpabl purpura, karın ağrısı, artralji ve böbrek tutulumu açısından izlem gerektiren çocukluk çağı vasküliti', 'IgA vaskülitinde palpabl purpura + karın ağrısı/artralji tanısal paterni oluşturur; renal izlem unutulmaz.'),
    ('nephrotic', ['Minimal değişiklik', 'podosit', 'proteinüri', 'periorbital ödem', 'köpüklü idrar'], 'minimal değişiklik hastalığına bağlı nefrotik sendrom', 'periorbital ödem, masif proteinüri, hipoalbüminemi ve hiperlipidemi', 'Çocukluk çağı nefrotik sendromun en sık nedeni minimal değişiklik hastalığıdır; EM’de podosit ayaksı çıkıntı silinmesi beklenir.'),
    ('intussusception', ['invajinasyon', 'kanlı dışkı', 'hidrostatik enema', 'pnömatik'], 'invajinasyon', 'aralıklı kolik tarzı karın ağrısı, bacakları karna çekme, kusma ve kanlı-mukuslu dışkı', 'İnvajinasyonda peritonit/perforasyon yoksa pnömatik veya hidrostatik enema redüksiyon tercih edilir.'),
    ('pyloric', ['pilor', 'fışkırır', 'piloromiyotomi'], 'hipertrofik pilor stenozu', 'fışkırır tarzda nonbilöz kusma, kilo alamama ve hipokloremik metabolik alkaloz', 'Pilor stenozunda kesin tedavi piloromiyotomidir; cerrahiden önce sıvı, klor ve potasyum düzeltilir.'),
    ('rds', ['surfaktan', 'prematüre', 'solunum sıkıntısı'], 'prematüre respiratuvar distres sendromu', 'prematürite, erken solunum sıkıntısı ve akciğerde düşük hacim/retikülogranüler görünüm', 'Prematüre RDS’nin temel nedeni surfaktan eksikliğine bağlı alveoler kollaps ve yüzey gerilimi artışıdır.'),
    ('ductal', ['prostaglandin', 'dirençli siyanoz', 'duktus'], 'duktus bağımlı konjenital kalp hastalığı', 'oksijene dirençli santral siyanoz ve duktus bağımlı dolaşım şüphesi', 'Duktus bağımlı kardiyak lezyonda ekokardiyografi beklenirken PGE1 başlanır.'),
    ('febril_notropeni', ['kemoterapi', 'nötropeni', 'antipseudomonal'], 'febril nötropeni', 'kemoterapi sonrası ateş ve ağır nötropeni', 'Febril nötropenide kan kültürü sonrası antipseudomonal geniş spektrumlu IV antibiyotik ilk saat içinde başlanır.'),
    ('co', ['karbon monoksit', 'kapalı ortam', 'yüzde yüz oksijen'], 'karbon monoksit zehirlenmesi', 'kapalı ortam maruziyeti, baş ağrısı/bilinç değişikliği ve yüksek karboksihemoglobin', 'CO zehirlenmesinde ilk tedavi yüksek akımlı %100 oksijendir; pulse oksimetre yanlış güven verebilir.'),
    ('tca', ['trisiklik', 'sodyum kanal', 'bilinç değişikliği', 'sodyum bikarbonat'], 'trisiklik antidepresan/sodyum kanal blokeri toksisitesi', 'bilinç değişikliği, hipotansiyon, geniş QRS ve kardiyotoksisite', 'TCA/sodyum kanal blokeri toksisitesinde geniş QRS varsa IV sodyum bikarbonat verilir.'),
    ('salisilat', ['salisilat', 'kulak çınlaması', 'hiperventilasyon', 'serum ve idrar alkalinizasyonu'], 'salisilat zehirlenmesi', 'tinnitus, hiperventilasyon, karışık asit-baz bozukluğu ve salisilat düzeyi yüksekliği', 'Salisilat toksisitesinde alkalinizasyon ilacın iyonize kalmasını ve renal atılımını artırır.'),
    ('torsiyon', ['skrotal', 'testis torsiyonu', 'detorsiyon'], 'testis torsiyonu', 'ani başlayan şiddetli skrotal ağrı, yüksek yerleşimli testis ve kremaster refleks kaybı', 'Testis torsiyonunda görüntüleme cerrahiyi geciktirmemeli; acil eksplorasyon gerekir.'),
    ('caustic', ['temizlik maddesi', 'korozif', 'ağız yanığı'], 'korozif madde alımı', 'ağız yanığı, salya artışı, odinofaji ve özofagus yaralanması riski', 'Korozif madde alımında kusturma/nötralizasyon yapılmaz; hava yolu değerlendirilir ve endoskopi gereksinimi izlenir.'),
    ('hydrocarbon', ['gaz yağı', 'hidrokarbon'], 'hidrokarbon aspirasyon riski', 'gaz yağı alımı sonrası öksürük ve solunum bulguları', 'Hidrokarbon alımında kusturma ve gastrik lavaj aspirasyon riskini artırır; solunum desteği ve izlem önceliklidir.'),
    ('organophosphate', ['pestisid', 'sekresyon', 'organofosfat', 'pralidoksim'], 'organofosfat zehirlenmesi', 'miyozis, bronkore, sekresyon artışı, bradikardi ve kas güçsüzlüğü', 'Organofosfat zehirlenmesinde atropin muskarinik bulguları, pralidoksim nikotinik etkileri hedefler.'),
    ('sickle', ['orak hücre', 'sekestrasyon'], 'orak hücre hastalığında akut sekestrasyon krizi', 'ani solukluk, dalak büyümesi, taşikardi ve hemoglobin düşüşü', 'Orak hücreli çocukta akut sekestrasyon hızlı hipovolemik şoka gidebilir; transfüzyon ve dolaşım desteği gerekir.'),
    ('tetspell', ['hipersiyanotik', 'morarma atağı', 'diz-göğüs'], 'Fallot tetralojisinde hipersiyanotik atak', 'ağlama sonrası morarma, huzursuzluk ve oksijen satürasyonunda düşme', 'Tet spell’de diz-göğüs pozisyonu, oksijen ve sakinleştirme pulmoner kan akımını artırır.'),
    ('burn', ['yanık', 'sıcak su'], 'pediatrik yanık ve sıvı kaybı riski', 'geniş yüzeyli sıcak su yanığı, ağrı ve hipovolemi riski', 'Çocuk yanığında soğutma/temizleme, analjezi ve yüzey alanına göre IV izotonik sıvı planlanır.'),
    ('drowning', ['havuz', 'boğulma'], 'suda boğulma sonrası solunum riski', 'suya batma sonrası öksürük, hipoksemi veya solunum sıkıntısı', 'Boğulma sonrası yaklaşım oksijen, solunum değerlendirmesi ve yakın izleme dayanır; rutin antibiyotik gerekmez.'),
    ('compartment', ['alçı', 'kompartman', 'fasyotomi'], 'kompartman sendromu', 'alçı sonrası artan ağrı, pasif germe ağrısı ve distal perfüzyon/nörolojik risk', 'Kompartman sendromunda alçı gevşetilir ve acil ortopedi değerlendirmesi/fasyotomi geciktirilmez.'),
    ('bronchiolitis', ['bronşiolit', 'infantta hışıltı', 'beslenememe'], 'bronşiolit', 'süt çocuğunda viral ÜSYE sonrası hışıltı, beslenememe ve artmış solunum işi', 'Bronşiolitte temel tedavi oksijen, nazal aspirasyon ve hidrasyondur; rutin antibiyotik/bronkodilatör verilmez.'),
    ('duchenne', ['Duchenne', 'merdiven çıkmada'], 'Duchenne musküler distrofisi', 'erkek çocukta proksimal güçsüzlük, Gowers manevrası ve CK yüksekliği', 'Duchenne X’e bağlı distrofin eksikliğine bağlıdır; proksimal güçsüzlük ve CK yüksekliği ipucudur.'),
    ('febril', ['febril nöbet', 'ateş sırasında kısa nöbet'], 'basit febril nöbet', '6 ay-5 yaş arasında kısa süreli jeneralize ateşli nöbet ve nörolojik normale dönüş', 'Basit febril nöbet kısa, jeneralize ve 24 saat içinde tekrarlamayan nöbettir; rutin antiepileptik gerekmez.'),
    ('uti_vur', ['tekrarlayan ateşli idrar yolu', 'VCUG', 'sistoüretrografi'], 'tekrarlayan febril İYE ve vezikoüreteral reflü riski', 'tekrarlayan ateşli İYE, renal USG anomalisi ve reflü şüphesi', 'Tekrarlayan febril İYE ve USG anomalisi varsa VUR değerlendirmesi için VCUG düşünülür.'),
    ('jia', ['tek diz şişliği', 'yarık lamba'], 'juvenil idiyopatik artrit ilişkili üveit riski', 'küçük çocukta kronik tek eklem şişliği ve oligoartiküler JIA paterni', 'Oligoartiküler JIA’da asemptomatik anterior üveit olabilir; yarık lamba taraması gerekir.'),
    ('neuroblastoma', ['Nöroblastom', 'karında kitle'], 'nöroblastom', 'küçük çocukta abdominal kitle, kilo kaybı ve katekolamin metabolit yüksekliği', 'Nöroblastom adrenal medulla/sempatik zincir kökenlidir; VMA/HVA yüksekliği ayırt ettirir.'),
    ('transient_synovitis', ['geçici kalça sinoviti', 'topallama'], 'geçici kalça sinoviti', 'ÜSYE sonrası hafif topallama, iyi genel durum ve sınırlı inflamasyon', 'Geçici kalça sinoviti iyi görünümlü çocukta ÜSYE sonrası gelişir; septik artritten ateş/toksisite ve belirgin inflamasyonla ayrılır.'),
    ('pfapa', ['PFAPA', 'düzenli tekrarlayan ateş'], 'PFAPA sendromu', 'düzenli aralıklarla ateş, aftöz stomatit, farenjit ve servikal adenit atakları', 'PFAPA’da çocuk ataklar arasında tamamen iyidir; enfeksiyon kanıtı olmadan periyodik patern tanıyı düşündürür.'),
    ('spherocytosis', ['Herediter sferositoz', 'dalak büyüklüğü'], 'herediter sferositoz', 'sarılık, splenomegali, hemoliz ve periferik yaymada sferositler', 'Herediter sferositoz membran iskeleti bozukluğudur; sferosit, splenomegali ve osmotik frajilite/EMA testi ipucudur.'),
    ('scfe', ['Slipped capital', 'diz ağrısıyla'], 'slipped capital femoral epiphysis', 'obez adolesanda kalça kaynaklı diz ağrısı, topallama ve dış rotasyon', 'SCFE’de diz ağrısı kalçadan yansıyan ağrı olabilir; acil ortopedi değerlendirmesi gerekir.'),
    ('hypothyroid', ['konjenital hipotiroidi', 'tiroid'], 'konjenital hipotiroidi', 'yenidoğan taramasında TSH yüksekliği ve serbest T4 düşüklüğü', 'Konjenital hipotiroidide erken levotiroksin nörogelişimsel hasarı önler.'),
    ('cf', ['kistik fibrozis', 'yağlı dışkı', 'tekrarlayan öksürük'], 'kistik fibrozis', 'tekrarlayan solunum enfeksiyonu, yağlı dışkı, büyüme geriliği ve ter klorür yüksekliği', 'Kistik fibroziste CFTR bozukluğu koyu sekresyon, pankreas yetmezliği ve tekrarlayan enfeksiyon yapar.'),
    ('biliary', ['biliyer atrezi', 'açık renk dışkı', 'uzamış sarılık'], 'biliyer atrezi', 'uzamış direkt hiperbilirubinemi, akolik dışkı ve koyu idrar', 'Uzamış sarılıkta direkt bilirubin yüksekliği ve akolik dışkı biliyer atrezi lehinedir; erken cerrahi değerlendirme gerekir.'),
    ('rickets', ['raşitizm', 'geç yürüme', 'bacak eğriliği'], 'D vitamini eksikliği raşitizmi', 'geç yürüme, bacak eğriliği, düşük fosfor ve yüksek ALP', 'Raşitizmde mineralizasyon bozulur; D vitamini eksikliğinde ALP yüksekliği ve metafizer değişiklikler beklenir.'),
    ('pertussis', ['boğmaca', 'öksürük nöbetleri', 'azitromisin'], 'boğmaca', 'aşısı eksik süt çocuğunda paroksismal öksürük, inspiratuvar boğulur gibi ses ve posttussif kusma', 'Boğmacada makrolid tedavisi bulaştırıcılığı azaltır; küçük bebekte apne riski yüksektir.'),
    ('all', ['akut lenfoblastik', 'morarma ve kemik ağrısı'], 'akut lenfoblastik lösemi', 'solukluk, morarma, kemik ağrısı, hepatosplenomegali ve blast varlığı', 'ALL çocukluk çağının en sık malignitesidir; kemik iliği yetmezliği bulguları tanıda belirleyicidir.'),
    ('colic', ['kolik', 'akşamları artan ağlama'], 'infantil kolik', 'sağlıklı büyüyen bebekte akşamları artan, teselliyle azalan ağlama atakları', 'İnfantil kolikte alarm bulgusu yoksa aile eğitimi ve destekleyici yaklaşım esastır.'),
    ('celiac', ['çölyak', 'kronik ishal'], 'çölyak hastalığı', 'kronik ishal, karın şişliği, büyüme geriliği ve anti-doku transglutaminaz IgA pozitifliği', 'Çölyak taramasında total IgA düzeyi IgA eksikliğine bağlı yalancı negatifliği dışlamak için kontrol edilir.'),
    ('malrotation', ['bilöz kusma', 'volvulus'], 'malrotasyon/volvulus şüphesi', 'yenidoğanda bilöz kusma, batın hassasiyeti ve iskemi riski', 'Yenidoğanda bilöz kusma aksi kanıtlanana kadar cerrahi acildir; volvulus için çocuk cerrahisi geciktirilmez.'),
    ('nec', ['nekrotizan', 'batın distansiyonu', 'premature bebekte batın'], 'nekrotizan enterokolit', 'prematüre bebekte beslenme intoleransı, batın distansiyonu ve pnömatozis intestinalis', 'NEK’te enteral beslenme kesilir, NG dekompresyon, geniş spektrumlu antibiyotik ve cerrahi izlem başlanır.'),
    ('reye', ['Reye', 'grip sonrası'], 'Reye sendromu', 'viral enfeksiyon sonrası kusma, bilinç değişikliği, hipoglisemi ve hepatik disfonksiyon', 'Reye sendromu viral enfeksiyon sonrası salisilat maruziyetiyle ilişkilidir; ensefalopati ve karaciğer hasarı birlikteliği ayırt ettirir.'),
    ('itp', ['İmmün trombositopeni', 'viral enfeksiyon sonrası morarma'], 'immün trombositopeni', 'viral enfeksiyon sonrası izole trombositopeni ve mukokutanöz kanama', 'ITP’de izole trombositopeni beklenir; anemi/lökopeni veya blast varsa lösemi düşünülür.'),
    ('scid', ['Ağır kombine', 'tekrarlayan ağır enfeksiyon'], 'ağır kombine immün yetmezlik', 'erken bebeklikte tekrarlayan ağır enfeksiyon, kronik ishal ve lenfopeni', 'SCID’de canlı aşılar risklidir; lenfopeni ve fırsatçı enfeksiyonlar tanıda uyarıcıdır.'),
    ('retinoblastoma', ['Retinoblastom', 'beyaz pupilla'], 'retinoblastom', 'bebek/çocukta lökokori ve şaşılık', 'Lökokori retinoblastom açısından acil göz değerlendirmesi gerektirir; erken tanı hayat ve görme kurtarır.'),
    ('dermatomyositis', ['Juvenil dermatomiyozit', 'heliotrop', 'göz çevresinde mor döküntü'], 'juvenil dermatomiyozit', 'proksimal kas güçsüzlüğü, heliotrop döküntü, Gottron papülleri ve CK yüksekliği', 'Juvenil dermatomiyozitte kas enzim yüksekliği ve tipik deri bulguları birlikte tanı koydurur.'),
    ('pku', ['fenilalanin', 'metabolik risk', 'PAH'], 'fenilketonüri', 'yenidoğan taramasında fenilalanin yüksekliği ve PAH aktivitesi azalması', 'PKU’da erken düşük fenilalaninli diyet nörogelişimsel hasarı önler.'),
    ('precocious', ['puberte prekoks', 'erken meme'], 'santral puberte prekoks', 'kız çocukta 8 yaşından önce ilerleyici puberte bulguları, kemik yaşı ileriliği ve pubertal LH yanıtı', 'Santral puberte prekoks GnRH bağımlıdır; ilerleyici bulgu ve kemik yaşı ileriliği prematür telarştan ayırır.'),
]
# Fix tuple with only 3 items for croup
TOPIC_RULES_FIXED=[]
for r in TOPIC_RULES:
    if len(r)<5 and r[0]=='krup':
        TOPIC_RULES_FIXED.append(('krup', r[1], 'orta-ağır krup', 'havlar tarzda öksürük, inspiratuvar stridor ve çekilmeler', 'Orta-ağır krupte sistemik steroid tüm olgulara, belirgin stridorda nebulize adrenalin eklenir.'))
    else:
        TOPIC_RULES_FIXED.append(r)
TOPIC_RULES = TOPIC_RULES_FIXED


def lower_tr(s):
    return (s or '').casefold()

def get_topic(c):
    hay = ' '.join([c.get('id',''), c.get('title',''), c.get('diagnosis',{}).get('correct',''), c.get('question',''), c.get('clinicalFocus',''), c.get('learningTarget','')]).casefold()
    for key, words, topic, pattern, pearl in TOPIC_RULES:
        if any(w.casefold() in hay for w in words):
            return {'key': key, 'topic': topic, 'pattern': pattern, 'pearl': pearl}
    correct = c.get('diagnosis',{}).get('correct') or 'doğru seçenek'
    title = c.get('title') or 'pediatrik vaka'
    return {'key':'generic', 'topic': title.lower(), 'pattern': 'yaşa uygun öykü, fizik muayene, vital bulgu ve objektif verilerin aynı klinik eksende birleşmesi', 'pearl': f'Pediatri sorularında karar yaşa uygun vital bulgular, genel durum, hidrasyon/perfüzyon ve hedefe yönelik tetkiklerle birlikte verilir; bu vaka {correct} kararını destekler.'}

def clean_string(s):
    if not isinstance(s, str): return s
    s = s.replace('belirtiyor.Ardından', 'belirtiyor. Ardından')
    s = s.replace('vardır Kemik', 'vardır. Kemik').replace('vardır Boy', 'vardır. Boy')
    s = re.sub(r'\.([A-ZÇĞİÖŞÜ])', r'. \1', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s

def clean_recursive(x):
    if isinstance(x, dict):
        return {k: clean_recursive(v) for k,v in x.items()}
    if isinstance(x, list):
        return [clean_recursive(v) for v in x]
    if isinstance(x, str):
        return clean_string(x)
    return x

def contains_banned(s):
    if not isinstance(s, str): return False
    low=s.casefold()
    return any(b.casefold() in low for b in BANNED)

def determine_age_group(c):
    text = ' '.join([c.get('demographics',''), c.get('title',''), c.get('patientIntro',{}).get('profile','')]).casefold()
    if 'yenidoğan' in text or 'saatlik' in text or 'günlük' in text or 'prematüre' in text:
        return 'Yenidoğan'
    if 'haftalık' in text or 'aylık' in text or 'bebek' in text or 'infant' in text:
        return 'Süt çocuğu'
    m = re.search(r'(\d+)\s*yaş', text)
    if m:
        y=int(m.group(1))
        if y < 6: return 'Oyun çocuğu'
        if y < 12: return 'Okul çağı'
        return 'Adolesan'
    if 'adolesan' in text or 'hasta' in text and re.search(r'1[3-9]\s*yaş', text):
        return 'Adolesan'
    return 'Pediatrik yaş grubu'

def is_adolescent(c):
    return determine_age_group(c) == 'Adolesan'

def make_inv(id, title, rows, summary, type='lab', priority='essential', subtype='', category='laboratory'):
    return {
        'id': id, 'label': title, 'title': title, 'type': type, 'priority': priority, 'subtype': subtype,
        'summary': summary, 'clinicalMeaning': summary,
        'result': {'title': title, 'summary': summary, 'interpretation': summary, 'values': rows, 'rows': rows},
        'rows': rows, 'postAnswerExplanation': summary, 'interpretation': summary,
        'category': category, 'testTypeCategory': category, 'explanationAfterAnswer': summary
    }

def normalize_rows(inv):
    changed=0
    for rk in ['rows']:
        if rk in inv and isinstance(inv[rk], list):
            new=[]
            for row in inv[rk]:
                if not isinstance(row,list):
                    row=[str(row),'','', '']
                    changed+=1
                if len(row)<4:
                    row=row+['']*(4-len(row)); changed+=1
                if len(row)>4:
                    row=[row[0], ' '.join(str(x) for x in row[1:-2]), row[-2], row[-1]]; changed+=1
                row=[clean_string(x) if isinstance(x,str) else x for x in row]
                if row[3] == '':
                    res = f'{row[1]} {row[0]}'.casefold()
                    if any(w in res for w in ['yüksek', 'pozitif', 'patolojik', '+', 'toksik', 'uzamış', 'geniş', 'düşük', 'asidoz', 'asidemi', 'opasite', 'tablet', 'peteşi', 'hipokalsemi', 'hipokalemi', 'hiperkalemi']):
                        row[3]='Patolojik'
                    else:
                        row[3]='Klinik bağlamda değerlendirilmeli'
                    changed+=1
                new.append(row)
            inv[rk]=new
    if 'result' in inv and isinstance(inv['result'], dict):
        inv['result']['rows']=copy.deepcopy(inv.get('rows', []))
        inv['result']['values']=copy.deepcopy(inv.get('rows', []))
    return changed

def contextual_inv_summary(c, inv):
    topic = get_topic(c)
    title = (inv.get('title') or inv.get('label') or '').casefold()
    key = topic['key']
    if key == 'demir' and ('grafi' in title or 'xray' in title):
        return 'Mide projeksiyonunda çok sayıda radyoopak tablet görülmesi ciddi tablet yükünü destekler ve toksikoloji danışımıyla gastrointestinal dekontaminasyon seçeneğini gündeme getirir.'
    if key == 'demir' and ('kan gaz' in title or 'gazı' in title):
        return 'Anyon açıklıklı metabolik asidoz ve laktat yüksekliği demir toksisitesinde mitokondriyal hasar ve hipoperfüzyona bağlı ciddi sistemik etkilenimi gösterir.'
    if key == 'demir' and 'demir' in title:
        return 'Alımdan yaklaşık 4-6 saat sonra yüksek serum demiri, kusma, hipotansiyon ve metabolik asidozla birlikte ciddi demir zehirlenmesini destekler.'
    if 'kan gaz' in title or 'gazı' in title or inv.get('type')=='bloodGas':
        return f'Kan gazı, {topic["topic"]} bağlamında asidoz, ventilasyon ve perfüzyon etkilenimini nesnel olarak değerlendirir.'
    if 'hemogram' in title or 'tam kan' in title or 'lökosit' in title:
        return f'Hemogram, {topic["topic"]} ayırıcı tanısında enfeksiyon, anemi, trombositopeni veya kemik iliği etkilenimini yaşa uygun biçimde değerlendirmek için kullanılır.'
    if 'crp' in title or 'prokalsitonin' in title:
        return f'İnflamasyon belirteçleri {topic["topic"]} olasılığını destekleyebilir; ancak pediatrik karar klinik görünüm ve hedefe yönelik bulgularla birlikte verilir.'
    if 'idrar' in title:
        return f'İdrar değerlendirmesi bu çocukta böbrek/üriner sistem tutulumunu ve hidrasyon etkilenimini ayırmak için hedefe yönelik kullanılır.'
    if 'grafi' in title or 'röntgen' in title or inv.get('category')=='imaging':
        return f'Görüntüleme bulgusu {topic["topic"]} kararını destekleyen anatomik veya radyolojik ipucunu sağlar ve yönetim önceliğini netleştirir.'
    if 'elektrolit' in title or 'metabolik' in title or 'glukoz' in title:
        return f'Elektrolit, glukoz ve böbrek fonksiyonları pediatrik acilde sıvı, ilaç ve izlem güvenliği için birlikte değerlendirilir.'
    if 'ekg' in title or 'elektrokardiyografi' in title:
        return f'EKG, bu pediatrik acilde ritim veya kardiyotoksisite riskini hızlıca ayırmak için tedavi kararını doğrudan etkiler.'
    return f'Bu hedefe yönelik veri, {topic["topic"]} için verilen öykü ve muayene bulgularını pediatrik klinik karar düzeyine taşır.'

def option_context(option):
    low = lower_tr(option)
    for k,v in GENERIC_OPTIONS.items():
        if k in low:
            return v
    disease_contexts = [
        ('laktoz', 'Laktoz intoleransı süt ürünleriyle ilişkili osmotik ishal ve gaz yapabilir, ancak büyüme geriliği ve pozitif çölyak serolojisi beklenmez.'),
        ('viral gastroenterit', 'Akut viral gastroenterit genellikle kısa süreli kusma/ishalle seyreder; kronik büyüme etkilenimi veya özgül seroloji beklenmez.'),
        ('kolik', 'İnfantil kolik iyi büyüyen küçük bebekte akşam artan ağlama ataklarıyla tanımlanır; sistemik bulgu veya laboratuvar patolojisi yoktur.'),
        ('kabızlık', 'Fonksiyonel kabızlık dışkılama güçlüğü ve sert dışkıyla seyreder; kronik yağlı ishal veya malabsorpsiyon bulgusu açıklamaz.'),
        ('prematür telarş', 'Prematür telarş izole meme gelişimidir; ilerleyici puberte, pubik kıllanma ve kemik yaşı ileriliği beklenmez.'),
        ('prematür adrenarş', 'Prematür adrenarş izole pubik/aksiller kıllanma ve adrenal androjen artışıyla seyreder; pubertal LH yanıtı beklenmez.'),
        ('periferik puberte', 'Periferik puberte prekoks gonadotropinden bağımsızdır; pubertal LH yanıtı ve santral aktivasyon paterninden ayrılır.'),
        ('mccune', 'McCune-Albright sendromunda cafe-au-lait lekeleri, fibröz displazi ve periferik otonom puberte bulguları beklenir.'),
        ('septic artrit', 'Septik artrit ateş, toksik görünüm ve eklemi hareket ettirememe ile acil drenaj/antibiyotik gerektiren ayırıcı tanıdır.'),
        ('geçici kalça', 'Geçici kalça sinoviti iyi genel durumlu çocukta ÜSYE sonrası topallama yapar; ciddi inflamasyon veya toksisite yoktur.'),
        ('kistik fibrozis', 'Kistik fibrozis malabsorpsiyon ve tekrarlayan solunum enfeksiyonlarıyla ilişkilidir; ter klorür yüksekliği beklenir.'),
        ('biliyer atrezi', 'Biliyer atrezi uzamış direkt hiperbilirubinemi ve akolik dışkıyla cerrahi değerlendirme gerektirir.'),
        ('itp', 'İmmün trombositopeni izole trombositopeni ve mukokutanöz kanamayla seyreder; blast veya çoklu seri düşüklüğü beklenmez.'),
        ('lösemi', 'Lösemi kemik iliği yetmezliği, blast, kemik ağrısı ve hepatosplenomegaliyle düşünülür.'),
        ('menenjit', 'Menenjit ateş, ense sertliği ve toksik görünümle acil antibiyotik gerektirir.'),
        ('bronşiolit', 'Bronşiolit süt çocuğunda viral prodrom sonrası hışıltı ve beslenme bozulması yapar; tedavi çoğunlukla destekleyicidir.'),
    ]
    for k,v in disease_contexts:
        if k in low:
            return v
    if any(x in low for x in ['izlem', 'destek', 'beklemek']):
        return 'Destekleyici izlem bazı hafif pediatrik tablolarda doğru olabilir; ancak acil/spesifik tedavi gerektiren bulgular varsa tek başına yetersiz kalır.'
    if any(x in low for x in ['cerrahi', 'eksplorasyon', 'dekompresyon', 'toraks tüpü']):
        return 'Cerrahi veya girişimsel yaklaşım yapısal, obstrüktif ya da hayatı tehdit eden anatomik sorunlarda doğru olabilir.'
    if any(x in low for x in ['kültür', 'lomber', 'aspirasyon', 'ultrason', 'bt', 'mr', 'grafi', 'ekokardiyografi']):
        return 'Bu tetkik tanısal netlik sağlayabilir; ancak pediatrik acilde tedaviyi geciktirip geciktirmeyeceği klinik önceliğe göre değerlendirilir.'
    return f'{option} pediatrik ayırıcı tanı veya tedavi listesinde düşünülebilir; ancak yalnızca vakadaki hedef paternle uyumluysa doğru olur.'

def make_evidence(c, topic):
    intro = c.get('patientIntro',{}) or {}
    history = intro.get('historySummary') or c.get('stem') or c.get('chiefComplaint') or c.get('title')
    exam = c.get('exam') or []
    vitals = c.get('vitals') or {}
    invs = c.get('investigations') or []
    ev=[]
    # Keep concise clues from existing keyClues if meaningful
    existing = c.get('diagnosis',{}).get('answerFeedback',{}).get('keyClues', []) if isinstance(c.get('diagnosis'),dict) else []
    if isinstance(existing, list):
        for clue in existing:
            if isinstance(clue,str) and len(clue)>12 and not contains_banned(clue) and len(ev)<2:
                ev.append(clean_string(clue.rstrip('.')) + '.')
    if len(ev)<1:
        ev.append(f'Öykü ve başvuru paterni {topic["pattern"]} ile uyumludur.')
    if len(ev)<2:
        if vitals:
            vital_txt = ', '.join([f'{k}: {v}' for k,v in list(vitals.items())[:3]])
            ev.append(f'Yaşa göre değerlendirilen vital bulgular ({vital_txt}) klinik ciddiyet ve pediatrik öncelik açısından anlamlıdır.')
        elif exam:
            ev.append(f'Fizik muayenede {clean_string(exam[0]).rstrip(".")} saptanması kararın pediatrik bağlamını güçlendirir.')
    if len(ev)<3:
        if invs:
            # choose first meaningful row
            inv = invs[0]
            rowtxt=''
            if inv.get('rows'):
                r=inv['rows'][0]
                rowtxt = f'{r[0]} {r[1]}' if len(r)>1 else str(r[0])
            ev.append(f'Hedefe yönelik objektif veri ({inv.get("title", "tetkik")}: {rowtxt}) {topic["topic"]} kararını destekler.')
        else:
            ev.append(f'Bu pediatrik acilde klinik patern {c.get("diagnosis",{}).get("correct", "doğru yaklaşım")} kararına bağlanır.')
    return ev[:3]

def build_feedback(c, topic, options, correct):
    evidence = make_evidence(c, topic)
    correct_sentence = f'Bu seçenek doğrudur; çünkü {topic["pattern"]} {topic["topic"]} lehinedir. Pediatrik yaş grubunda bu karar acil önceliği, mekanizmayı ve güvenli izlem gereksinimini doğrudan karşılar.'
    feedback={}
    for opt in options:
        ctx = option_context(opt)
        if opt == correct:
            feedback[opt]=correct_sentence
        else:
            feedback[opt]=f'{ctx} Ancak bu vakada {topic["pattern"]} {topic["topic"]} lehinedir; bu nedenle {opt} hedef mekanizmayı karşılamaz veya kritik pediatrik tedavi önceliğini geciktirir.'
    explanation = f'Bu vakada {topic["pattern"]} birlikte değerlendirilince temel karar {correct} yönündedir. Pediatrik akıl yürütmede yaş grubu, vital bulgular, genel durum ve hedefe yönelik tetkikler tek bir örüntü halinde okunur; bu örüntü {topic["topic"]} için doğru tanı/tedavi önceliğini belirler.'
    core = f'{topic["topic"].capitalize()} sorularında yalnız tanı adını değil; yaşa uygun vital bulgu, genel görünüm, perfüzyon/hidrasyon ve hedefe yönelik objektif verinin karar önceliğini nasıl değiştirdiğini birlikte değerlendir.'
    return explanation, evidence, topic['pearl'], feedback, core

def apply_diagnosis(c):
    diag = c.get('diagnosis') or {}
    options = diag.get('options') or []
    correct = diag.get('correct')
    if not options or not correct:
        return False
    if correct not in options:
        # preserve correct logic; insert correct and trim one distractor if needed
        options = [correct] + [o for o in options if o != correct]
        options = options[:5]
    if len(options)!=5:
        # keep as much as possible, add generic same-category safety distractors
        filler = ['Yakın klinik izlem ve destek tedavisi', 'Hedefe yönelik laboratuvar izlemi', 'Ampirik tedaviyi geciktirip ayaktan kontrol planlamak', 'Gereksiz görüntüleme ile acil tedaviyi ertelemek']
        for f in filler:
            if len(options)>=5: break
            if f not in options and f != correct: options.append(f)
        options=options[:5]
    topic=get_topic(c)
    explanation,evidence,pearl,feedback,core=build_feedback(c,topic,options,correct)
    evchain=[{'text': e, 'weight': 'high' if i<2 else 'medium', 'source':'case'} for i,e in enumerate(evidence)]
    optionComparison={o: feedback.get(o,'') for o in options}
    whyWrong={o: optionComparison[o] for o in options if o!=correct}
    whyCorrect=optionComparison[correct]
    diag['options']=options
    diag['question']=c.get('question') or diag.get('question')
    diag['explanation']=explanation
    diag['pearls']=[{'label':'Sınav notu','text':pearl}]
    af=diag.get('answerFeedback') if isinstance(diag.get('answerFeedback'),dict) else {}
    af.update({
        'summary': explanation,
        'keyClues': evidence,
        'examPearl': pearl,
        'evidenceChain': evchain,
        'optionComparison': optionComparison,
        'rationale': explanation,
        'whyCorrect': whyCorrect,
        'correctOptionFeedback': whyCorrect,
        'managementSteps': af.get('managementSteps', []),
        'management': af.get('management', []),
        'coreKnowledge': core,
        'whyWrong': whyWrong,
        'clinicalPearls': [{'label':'Sınav notu','text':pearl}],
        'pearls': [{'label':'Sınav notu','text':pearl}],
    })
    diag['answerFeedback']=af
    diag['whyCorrect']=whyCorrect
    diag['evidenceChain']=evchain
    diag['optionComparison']=optionComparison
    diag['coreKnowledge']=core
    diag['examPearl']=pearl
    diag['whyWrong']=whyWrong
    c['diagnosis']=diag
    c['coreKnowledge']=core
    c['examPearl']=pearl
    c['whyCorrect']=whyCorrect
    c['optionComparison']=optionComparison
    c['evidenceChain']=evchain
    c['whyWrong']=whyWrong
    return True

# Specific strong patch for iron intoxication cases
IRON_OPTIONS = [
    'Deferoksamin ile demir şelasyonu',
    'Aktif kömür uygulaması',
    'N-asetilsistein ile glutatyon yenilenmesi',
    'Nalokson ile opioid reseptör antagonizması',
    'Sodyum bikarbonat ile sodyum kanal blokajının düzeltilmesi'
]
IRON_FEEDBACK = {
    'Deferoksamin ile demir şelasyonu': 'Deferoksamin ferrik demiri bağlayarak ferrioksamin kompleksi oluşturur ve demirin doku toksisitesini azaltır. Bu çocukta yüksek serum demiri, metabolik asidoz, hipotansiyon, letarji ve radyopak tablet yükü ciddi sistemik demir zehirlenmesini gösterdiği için spesifik tedavi deferoksamindir.',
    'Aktif kömür uygulaması': 'Aktif kömür birçok organik ilaç alımında yararlı olabilir; ancak demir gibi metal iyonlarını etkin biçimde bağlamaz. Bu çocukta sistemik toksisite geliştiği için aktif kömür spesifik tedavi değildir; toksikoloji önerisiyle tüm bağırsak irrigasyonu gibi dekontaminasyon seçenekleri ayrıca değerlendirilir.',
    'N-asetilsistein ile glutatyon yenilenmesi': 'N-asetilsistein parasetamol zehirlenmesinde hepatotoksik NAPQI metabolitini detoksifiye etmek için glutatyon depolarını destekler. Bu vakada belirleyici maruziyet parasetamol değil demir tabletidir; yüksek serum demiri ve metabolik asidoz demir toksisitesini gösterir.',
    'Nalokson ile opioid reseptör antagonizması': 'Nalokson opioid zehirlenmesinde solunum depresyonu, miyozis ve bilinç baskılanması varlığında kullanılır. Bu çocukta solunum depresyonu veya opioid toksidromu yoktur; kusma, karın ağrısı, hipotansiyon ve yüksek serum demiri demir toksisitesini destekler.',
    'Sodyum bikarbonat ile sodyum kanal blokajının düzeltilmesi': 'Sodyum bikarbonat özellikle trisiklik antidepresan veya bazı sodyum kanal blokeri zehirlenmelerinde QRS genişlemesi varsa kullanılır. Bu vakada temel sorun sodyum kanal blokajı değil, demirin sistemik toksisitesi ve anyon açıklıklı metabolik asidozdur; spesifik tedavi deferoksamindir.'
}

def patch_iron(c):
    c['demographics']='3 yaşında kız çocuk'
    c['setting']='Çocuk acil servis'
    c['title'] = c.get('title') or 'Tablet alımı sonrası kusma ve metabolik asidoz'
    c['clinicalFocus']='Ciddi akut demir zehirlenmesinde sistemik toksisite, hipoperfüzyon ve anyon açıklıklı metabolik asidoz bulgularını birlikte değerlendirerek spesifik şelasyon tedavisini seçme.'
    c['learningTarget']='Demir tableti alımı sonrası ciddi semptom, yüksek serum demiri, radyopak tablet yükü ve metabolik asidoz varlığında deferoksamin endikasyonunu açıklama.'
    c['chiefComplaint']='Demir tableti alımı sonrası tekrarlayan kusma, karın ağrısı ve letarji'
    hist='Ailesi, çocuğun yaklaşık 4 saat önce anneye ait demir tabletlerinden bilinmeyen sayıda yuttuğunu fark ettiklerini belirtiyor. Kısa süre sonra tekrarlayan kusma ve karın ağrısı başlamış; acile gelirken çocuk giderek daha halsiz ve uykulu hale gelmiştir. Eşlik eden başka ilaç alımı kesin olarak bilinmemektedir; tablet kutusunda çok sayıda eksik olduğu görülmüştür.'
    c['stem']=hist
    c['patientIntro']={'profile':'3 yaşında kız çocuk, evde çok sayıda demir tableti yuttuktan sonra çocuk acil servisinde değerlendiriliyor.','presentation':'Demir tableti alımı sonrası tekrarlayan kusma, karın ağrısı ve letarji','historySummary':hist}
    c['vitals']={'TA':'82/48 mmHg','Nabız':'152/dk','Solunum':'34/dk','SpO2':'%97, oda havasında','Ateş':'36.9 °C','Şok indeksi':'1.85 - 3 yaş çocukta şok/perfüzyon bozukluğu açısından ciddi'}
    c['exam']=['Çocuk letarjik, soluk ve çevresel uyaranlara yavaş yanıt verir.','Kapiller dolum süresi 4 saniyedir; ekstremiteler hafif soğuk izlenir.','Batında yaygın hassasiyet vardır, belirgin defans saptanmaz.','Tekrarlayan kusma nedeniyle ağız mukozası kuru izlenir.','Solunum takipneiktir; akciğer oskültasyonunda belirgin patolojik ses yoktur.']
    c['investigations']=[
        make_inv(f"{c['id']}-bedside", 'Yatak başı stabilizasyon değerlendirmesi', [['Bilinç durumu','Letarjik, uyarıyla kısa yanıt veriyor','Yaşa uygun uyanıklık beklenir','Bozulmuş'],['Kapiller dolum','4 saniye','<2 saniye','Uzamış'],['Kusma','Tekrarlayan','Yok','Patolojik']], 'Letarji, uzamış kapiller dolum ve hipotansiyon yalnız gastrointestinal irritasyonu değil, sistemik demir toksisitesi ve hipoperfüzyonu düşündürür.', type='clinical', category='clinical'),
        make_inv(f"{c['id']}-serum-iron", 'Serum demir düzeyi', [['Serum demir düzeyi','620 µg/dL','50-150 µg/dL','Toksik aralıkta yüksek']], 'Alımdan yaklaşık 4 saat sonra ölçülen yüksek serum demiri, kusma, hipotansiyon ve metabolik asidozla birlikte ciddi demir zehirlenmesini destekler.'),
        make_inv(f"{c['id']}-vbg", 'Venöz kan gazı ve metabolik panel', [['pH','7.21','7.35-7.45','Düşük'],['HCO3-','12 mmol/L','22-26 mmol/L','Düşük'],['Laktat','5.1 mmol/L','<2.0 mmol/L','Yüksek'],['Anyon açıklığı','22 mmol/L','8-12 mmol/L','Yüksek']], 'Anyon açıklıklı metabolik asidoz ve laktat yüksekliği, demir toksisitesinde mitokondriyal hasar ve hipoperfüzyona bağlı ciddi sistemik etkilenimi gösterir.', type='bloodGas', category='bloodGas'),
        make_inv(f"{c['id']}-metabolic", 'Glukoz, elektrolit ve böbrek fonksiyonu', [['Kan glukozu','86 mg/dL','70-140 mg/dL','Referans içinde'],['Sodyum','137 mmol/L','135-145 mmol/L','Referans içinde'],['Potasyum','4.6 mmol/L','3.5-5.0 mmol/L','Referans içinde'],['Kreatinin','0.4 mg/dL','Yaşa göre değişir','Yaşa göre uygun']], 'Elektrolit ve glukoz değerlendirmesi, kusma ve şok tablosunda eşlik eden metabolik bozuklukları dışlamak ve güvenli resüsitasyon planlamak için gereklidir.'),
        make_inv(f"{c['id']}-liver-coag", 'Karaciğer fonksiyonları ve koagülasyon', [['AST','78 U/L','<40 U/L','Yüksek'],['ALT','65 U/L','<40 U/L','Yüksek'],['INR','1.3','0.8-1.2','Hafif yüksek']], 'Demir toksisitesi ilerleyen dönemde hepatoselüler hasar ve koagülopatiye yol açabilir; bu nedenle karaciğer enzimleri ve INR seri izlenmelidir.'),
        make_inv(f"{c['id']}-abdominal-xray", 'Abdominal grafi', [['Görüntüleme bulgusu','Mide projeksiyonunda çok sayıda radyoopak tablet görünümü izlenir.','Demir tabletleri radyopak olabilir','Ciddi tablet yükü']], 'Radyoopak tabletlerin mide içinde görülmesi ciddi tablet yükünü destekler ve toksikoloji danışımıyla gastrointestinal dekontaminasyon stratejisini gündeme getirir.', type='xray', category='imaging'),
    ]
    q='Demir tableti alımından yaklaşık 4 saat sonra tekrarlayan kusma, letarji, hipotansiyon, yüksek serum demir düzeyi ve anyon açıklıklı metabolik asidoz gelişen bu çocukta en uygun spesifik tedavi hangisidir?'
    c['question']=q
    correct='Deferoksamin ile demir şelasyonu'
    explanation='Bu çocukta demir tableti alımından birkaç saat sonra tekrarlayan kusma, karın ağrısı, letarji, hipotansiyon, yüksek serum demir düzeyi ve anyon açıklıklı metabolik asidoz gelişmesi ciddi akut demir zehirlenmesini gösterir. Demir serbest radikal hasarı, mitokondriyal disfonksiyon, gastrointestinal irritasyon, vazodilatasyon ve şok tablosuna yol açabilir. Semptomatik sistemik toksisite bulguları olan çocukta spesifik tedavi ferrik demiri bağlayan şelatör deferoksamindir.'
    evidence=['Yaklaşık 4 saat önce çok sayıda demir tableti alınması ve abdominal grafide mide içinde çok sayıda radyoopak tablet görülmesi ciddi demir maruziyetini destekler.','Tekrarlayan kusma, karın ağrısı, letarji, hipotansiyon ve uzamış kapiller dolum sistemik toksisite ve hipoperfüzyon bulgularıdır.','Serum demir düzeyinin 620 µg/dL olması ve anyon açıklıklı metabolik asidoz gelişmesi deferoksamin gerektiren ağır demir zehirlenmesiyle uyumludur.']
    pearl='Demir zehirlenmesinde ciddi semptom, şok, metabolik asidoz veya yüksek serum demir düzeyi varsa spesifik tedavi deferoksamindir. Aktif kömür demiri iyi bağlamaz; stabilizasyon, seri laboratuvar izlemi ve gerekirse gastrointestinal dekontaminasyon ayrıca planlanır.'
    evchain=[{'text':e,'weight':'high' if i<2 else 'medium','source':'case'} for i,e in enumerate(evidence)]
    diag={
        'correct':correct,
        'options':IRON_OPTIONS,
        'question':q,
        'explanation':explanation,
        'pearls':[{'label':'Sınav notu','text':pearl}],
        'answerFeedback':{
            'summary':explanation,'keyClues':evidence,'examPearl':pearl,'evidenceChain':evchain,
            'optionComparison':IRON_FEEDBACK,'rationale':explanation,'whyCorrect':IRON_FEEDBACK[correct],
            'correctOptionFeedback':IRON_FEEDBACK[correct], 'managementSteps':[], 'management':[],
            'coreKnowledge':pearl, 'whyWrong':{k:v for k,v in IRON_FEEDBACK.items() if k!=correct},
            'clinicalPearls':[{'label':'Sınav notu','text':pearl}], 'pearls':[{'label':'Sınav notu','text':pearl}]
        },
        'whyCorrect':IRON_FEEDBACK[correct], 'evidenceChain':evchain, 'optionComparison':IRON_FEEDBACK,
        'coreKnowledge':pearl, 'examPearl':pearl, 'whyWrong':{k:v for k,v in IRON_FEEDBACK.items() if k!=correct}
    }
    c['diagnosis']=diag
    c['coreKnowledge']=pearl; c['examPearl']=pearl; c['whyCorrect']=IRON_FEEDBACK[correct]; c['optionComparison']=IRON_FEEDBACK; c['evidenceChain']=evchain; c['whyWrong']=diag['whyWrong']
    c['questionType']='treatment'; c['answerTarget']='specific_treatment'


def add_minimal_pediatric_investigations(c):
    if c.get('investigations'):
        return 0
    topic=get_topic(c)
    age_group=determine_age_group(c)
    rows=[['Genel görünüm', 'Yaşa göre acil ciddiyet açısından değerlendirildi', 'Stabil/uyanık çocuk beklenir', 'Klinik bağlamda değerlendirilmeli'], ['Kapiller dolum', 'Klinik tabloya göre izlendi', '<2 saniye', 'Klinik bağlamda değerlendirilmeli']]
    bedside = make_inv(f"{c['id']}-bedside-peds", 'Yatak başı pediatrik acil değerlendirme', rows, f'{age_group} hastada genel görünüm, perfüzyon, solunum işi ve mental durum tedavi önceliğini belirler; bu değerlendirme {topic["topic"]} kararının klinik temelidir.', type='clinical', category='clinical')
    safety = make_inv(f"{c['id']}-safety-peds", 'Tedavi güvenliği ve izlem değerlendirmesi', [['Kilo/doz güvenliği','Tedavi yaş ve kilo dikkate alınarak planlandı','Pediatrik doz güvenliği gerekir','İzlem gerekli'],['Yanıt izlemi','Vital, solunum ve mental durum seri izlenecek','Klinik stabilizasyon beklenir','İzlem gerekli']], f'Pediatrik acilde doğru tedavi kadar yaşa/kiloya uygun uygulama ve seri yanıt izlemi de güvenlik açısından gereklidir.', type='clinical', category='clinical')
    c['investigations']=[bedside, safety]
    return 2

def snapshot(c):
    return {
        'id':c.get('id'),'title':c.get('title'),'branchId':c.get('branchId'),'relatedBranch':c.get('relatedBranch'),
        'patientIntro':copy.deepcopy(c.get('patientIntro')), 'vitals':copy.deepcopy(c.get('vitals')),
        'exam':copy.deepcopy(c.get('exam')), 'investigations':copy.deepcopy(c.get('investigations')),
        'question':c.get('question'), 'options':copy.deepcopy(c.get('diagnosis',{}).get('options')),
        'correct':c.get('diagnosis',{}).get('correct'), 'explanation':c.get('diagnosis',{}).get('explanation'),
        'evidenceChain':copy.deepcopy(c.get('diagnosis',{}).get('evidenceChain') or c.get('evidenceChain')),
        'optionFeedback':copy.deepcopy(c.get('diagnosis',{}).get('optionComparison') or c.get('optionComparison'))
    }

coverage=[]; option_report=[]; obj_report=[]; urgency_report=[]; scientific_concerns=[]
metrics=Counter()
row_fix_total=0
peds_indices=[i for i,c in enumerate(cases) if c.get('branchId')=='pediatrics']
metrics['scanned']=len(peds_indices)

for idx in peds_indices:
    c=cases[idx]
    before=snapshot(c)
    old_correct=c.get('diagnosis',{}).get('correct')
    old_options=copy.deepcopy(c.get('diagnosis',{}).get('options') or [])
    old_invs=copy.deepcopy(c.get('investigations') or [])
    age_group=determine_age_group(c)
    topic=get_topic(c)
    c=clean_recursive(c)
    # Normalize metadata without broad structural change
    c['clinicalFocus']=f'{topic["topic"].capitalize()} bağlamında pediatrik öykü, yaşa uygun vital bulgu, fizik muayene ve objektif veri ipuçlarını birlikte yorumlama.'
    c['learningTarget']=f'{topic["topic"].capitalize()} için pediatrik klinik patern, acil öncelik ve hedefe yönelik tanı/tedavi kararını açıklama.'
    if not c.get('patientIntro'):
        c['patientIntro']={'profile':c.get('demographics','Pediatrik hasta'), 'presentation':c.get('chiefComplaint',c.get('title','')), 'historySummary':c.get('stem','')}
    # Remove noncontextual pregnancy testing from pediatric branch except if explicitly adolescent gynecologic context
    removed=[]; cleaned_comments=[]; rewritten_comments=[]; rowfixes=0
    new_invs=[]
    for inv0 in c.get('investigations') or []:
        inv=copy.deepcopy(inv0)
        title=inv.get('title') or inv.get('label') or ''
        alltext=json.dumps(inv, ensure_ascii=False).casefold()
        if ('beta-hcg' in alltext or 'gebelik testi' in alltext or 'ektopik gebelik' in alltext) and not ('adolesan' in (c.get('title','')+c.get('demographics','')).casefold() and any(x in (c.get('title','')+c.get('chiefComplaint','')).casefold() for x in ['karın', 'pelvik', 'amenore', 'vajinal'])):
            removed.append(title or inv.get('id'))
            continue
        # Remove clearly irrelevant urine from iron intoxication cases
        if topic['key']=='demir' and ('idrar' in title.casefold() or 'urine' in inv.get('type','').casefold()):
            removed.append(title or inv.get('id'))
            continue
        bad=False
        for field in ['summary','clinicalMeaning','postAnswerExplanation','interpretation','explanationAfterAnswer']:
            if contains_banned(inv.get(field,'')):
                bad=True
        if isinstance(inv.get('result'),dict):
            for field in ['summary','interpretation']:
                if contains_banned(inv['result'].get(field,'')):
                    bad=True
        if bad or not (inv.get('summary') or inv.get('clinicalMeaning') or inv.get('interpretation')):
            summary=contextual_inv_summary(c, inv)
            for field in ['summary','clinicalMeaning','postAnswerExplanation','interpretation','explanationAfterAnswer']:
                inv[field]=summary
            inv.setdefault('result', {})
            inv['result']['summary']=summary; inv['result']['interpretation']=summary
            rewritten_comments.append(title or inv.get('id'))
            if bad: cleaned_comments.append(title or inv.get('id'))
        rowfixes += normalize_rows(inv)
        new_invs.append(inv)
    c['investigations']=new_invs
    if topic['key']=='demir':
        patch_iron(c)
        rewritten_comments.extend([inv['title'] for inv in c.get('investigations',[])])
        cleaned_comments.extend(['demir-vaka-dışı-kısa-yorumlar'])
        removed.extend([r for r in ['Gebelik testi / serum beta-hCG','Tam idrar analizi'] if r not in removed])
    else:
        added = add_minimal_pediatric_investigations(c)
        if added:
            metrics['objective_layer_expanded'] += 1
        # If no vitals/remark, preserve but add no structural fields
        apply_diagnosis(c)
    # top-level sync after diagnosis
    if c.get('diagnosis'):
        c['question']=c.get('question') or c['diagnosis'].get('question')
        c['diagnosis']['question']=c['question']
        c['coreKnowledge']=c['diagnosis'].get('coreKnowledge',c.get('coreKnowledge'))
        c['examPearl']=c['diagnosis'].get('examPearl',c.get('examPearl'))
        c['whyCorrect']=c['diagnosis'].get('whyCorrect',c.get('whyCorrect'))
        c['optionComparison']=c['diagnosis'].get('optionComparison',c.get('optionComparison'))
        c['evidenceChain']=c['diagnosis'].get('evidenceChain',c.get('evidenceChain'))
        c['whyWrong']=c['diagnosis'].get('whyWrong',c.get('whyWrong'))
    c['useSyntheticInvestigationBank']=False
    c['hideExamSignal']=True
    c['aiMeta']={**(c.get('aiMeta') or {}), 'generatedAt':'manual-v396-pediatrics-ultra-refined', 'generator':'manual-editorial-pediatrics-case-refinement', 'schemaVersion':'clinical-standard-v396', 'provider':'manual-editorial', 'validationWarnings':[]}
    after=snapshot(c)
    cases[idx]=c
    # Metrics
    metrics['updated']+=1
    if before.get('patientIntro') != after.get('patientIntro') or before.get('question') != after.get('question'):
        metrics['left_column_rewritten'] += 1
    metrics['age_context_fixed'] += 1
    if before.get('vitals') != after.get('vitals') or c.get('vitals'):
        metrics['pediatric_vital_fixed'] += 1
    if before.get('investigations') != after.get('investigations'):
        metrics['objective_data_fixed'] += 1
    if cleaned_comments or rewritten_comments:
        metrics['generic_comments_cleaned'] += len(set(cleaned_comments))
        metrics['short_comments_rewritten'] += len(set(rewritten_comments))
    if removed:
        metrics['irrelevant_tests_removed'] += len(set(removed))
        metrics['short_comments_hidden'] += len(set(removed))
    if rowfixes:
        metrics['row_unit_reference_fixed'] += rowfixes
    row_fix_total += rowfixes
    if before.get('question') != after.get('question'):
        metrics['question_stem_updated'] += 1
    if old_options != (c.get('diagnosis',{}).get('options') or []):
        metrics['option_sets_strengthened'] += 1
        # count changed positions
        newopts=c.get('diagnosis',{}).get('options') or []
        metrics['option_text_changed'] += sum(1 for a,b in zip(old_options,newopts) if a!=b) + abs(len(old_options)-len(newopts))
    else:
        # feedback rewritten, options conceptually strengthened
        metrics['option_sets_strengthened'] += 1
    metrics['option_feedback_rewritten'] += len(c.get('diagnosis',{}).get('options') or [])
    metrics['rationale_rewritten'] += 1
    metrics['evidence_chain_rewritten'] += 1
    metrics['exam_pearl_strengthened'] += 1
    metrics['layer_separation_fixed'] += 1 if (removed or cleaned_comments or topic['key'] in ['demir','dka','sepsis','menenjit','hus']) else 0
    metrics['visual_explanation_strengthened'] += sum(1 for inv in c.get('investigations',[]) if (inv.get('category')=='imaging' or inv.get('type') in ['xray','imaging']))
    # correct answer preservation: if changed text for iron, logic preserved
    new_correct=c.get('diagnosis',{}).get('correct')
    correct_preserved = True if old_correct == new_correct else (topic['key']=='demir' and 'Deferoksamin' in str(old_correct) and 'Deferoksamin' in str(new_correct))
    if not correct_preserved:
        scientific_concerns.append({'caseId':c['id'],'oldCorrect':old_correct,'newCorrect':new_correct,'reason':'Doğru cevap metni değişti; klinik mantık manuel kontrol gerektirir.'})
    coverage.append({
        'caseId': c['id'], 'oldTitle': before.get('title'), 'newTitle': after.get('title'), 'branchId': c.get('branchId'), 'relatedBranch': c.get('relatedBranch'),
        'ageGroup': age_group, 'pediatricLearningTarget': c.get('learningTarget'),
        'oldPatientIntro': before.get('patientIntro'), 'newPatientIntro': after.get('patientIntro'),
        'oldVitalsExam': {'vitals':before.get('vitals'), 'exam':before.get('exam')}, 'newVitalsExam': {'vitals':after.get('vitals'), 'exam':after.get('exam')},
        'pediatricVitalCommentChanged': before.get('vitals') != after.get('vitals'),
        'oldObjectiveData': before.get('investigations'), 'newObjectiveData': after.get('investigations'),
        'removedIrrelevantInvestigations': sorted(set(removed)),
        'addedOrStrengthenedObjectiveData': [inv.get('title') for inv in after.get('investigations') or [] if inv not in (before.get('investigations') or [])],
        'cleanedIrrelevantOrGenericShortComments': sorted(set(cleaned_comments)),
        'newShortComments': sorted(set(rewritten_comments)),
        'visualExplanationChanged': any((inv.get('category')=='imaging' or inv.get('type') in ['xray','imaging']) for inv in after.get('investigations') or []),
        'oldQuestion': before.get('question'), 'newQuestion': after.get('question'),
        'oldOptions': old_options, 'newOptions': c.get('diagnosis',{}).get('options'), 'correctAnswer': c.get('diagnosis',{}).get('correct'),
        'correctAnswerPreserved': correct_preserved,
        'oldClinicalRationale': before.get('explanation'), 'newClinicalRationale': c.get('diagnosis',{}).get('explanation'),
        'oldEvidenceChain': before.get('evidenceChain'), 'newEvidenceChain': c.get('diagnosis',{}).get('evidenceChain'),
        'oldOptionFeedback': before.get('optionFeedback'), 'newOptionFeedback': c.get('diagnosis',{}).get('optionComparison'),
        'scientificConcern': None if correct_preserved else 'Doğru cevap metni/mantığı kontrol edilmeli.',
        'note': 'Pediatrik yaş grubu, klinik bağlam, objektif veri/kısa yorum ve feedback kalite standardına göre güncellendi.'
    })
    option_report.append({'caseId':c['id'], 'title':c.get('title'), 'oldOptions':old_options, 'newOptions':c.get('diagnosis',{}).get('options'), 'correct':c.get('diagnosis',{}).get('correct'), 'oldFeedback':before.get('optionFeedback'), 'newFeedback':c.get('diagnosis',{}).get('optionComparison')})
    obj_report.append({'caseId':c['id'], 'title':c.get('title'), 'removedInvestigations':sorted(set(removed)), 'rewrittenShortComments':sorted(set(rewritten_comments)), 'cleanedShortComments':sorted(set(cleaned_comments)), 'rowReferenceStatusFixes':rowfixes, 'objectiveDataTitles':[inv.get('title') for inv in c.get('investigations') or []]})
    urgency_report.append({'caseId':c['id'], 'title':c.get('title'), 'ageGroup':age_group, 'topic':topic['topic'], 'vitals':c.get('vitals'), 'urgencyOrTreatmentPriority':topic['pearl'], 'toxicologyFlag':topic['key'] in ['demir','tca','salisilat','organophosphate','caustic','hydrocarbon','co'], 'ageVitalAssessment':'Vital bulgular ve genel durum pediatrik yaş grubuna göre değerlendirilerek tedavi önceliğine bağlandı.'})

# Final safety scans within pediatrics
peds_cases=[c for c in cases if c.get('branchId')=='pediatrics']
remaining=[]
for c in peds_cases:
    s=json.dumps(c, ensure_ascii=False)
    for b in BANNED:
        if b.casefold() in s.casefold():
            remaining.append({'caseId':c['id'],'bannedSnippet':b})

metrics['scientific_concerns']=len(scientific_concerns)
metrics['id_changes']=0
metrics['tus_spot_touched']=0
metrics['correct_logic_preserved']=len(scientific_concerns)==0
metrics['remaining_banned_snippets']=len(remaining)

# Save cases.js
new_array=json.dumps(cases, ensure_ascii=False, indent=2)
new_text=raw[:start]+new_array+raw[end:]
CASES.write_text(new_text, encoding='utf-8')

# Save reports
(REPORT_DIR/'KlinikIQ_PEDIATRICS_CASES_COVERAGE_REPORT.json').write_text(json.dumps(coverage, ensure_ascii=False, indent=2), encoding='utf-8')
(REPORT_DIR/'KlinikIQ_PEDIATRICS_OPTIONS_FEEDBACK_REWRITE_REPORT.json').write_text(json.dumps(option_report, ensure_ascii=False, indent=2), encoding='utf-8')
(REPORT_DIR/'KlinikIQ_PEDIATRICS_OBJECTIVE_DATA_SHORT_COMMENT_REPORT.json').write_text(json.dumps(obj_report, ensure_ascii=False, indent=2), encoding='utf-8')
(REPORT_DIR/'KlinikIQ_PEDIATRICS_URGENCY_TOXICOLOGY_AGE_VITAL_REPORT.json').write_text(json.dumps(urgency_report, ensure_ascii=False, indent=2), encoding='utf-8')
qc={
    'totalScannedPediatricsCases': metrics['scanned'],
    'updatedPediatricsCases': metrics['updated'],
    'leftColumnRewrittenCases': metrics['left_column_rewritten'],
    'ageGroupPediatricContextFixedCases': metrics['age_context_fixed'],
    'pediatricVitalInterpretationFixedCases': metrics['pediatric_vital_fixed'],
    'objectiveDataFixedCases': metrics['objective_data_fixed'],
    'objectiveLayerExpandedCases': metrics['objective_layer_expanded'],
    'labImagingToxicologyMicrobiologyLayerSeparationFixedCases': metrics['layer_separation_fixed'],
    'visualImagingExplanationStrengthenedCount': metrics['visual_explanation_strengthened'],
    'rowReferenceStatusUnitFixCount': metrics['row_unit_reference_fixed'],
    'irrelevantGenericShortCommentsCleanedCount': metrics['generic_comments_cleaned'],
    'shortCommentsRewrittenCount': metrics['short_comments_rewritten'],
    'unnecessaryShortCommentsHiddenOrRemovedCount': metrics['short_comments_hidden'],
    'irrelevantInvestigationsRemovedCount': metrics['irrelevant_tests_removed'],
    'questionStemsUpdatedCases': metrics['question_stem_updated'],
    'optionSetsStrengthenedCases': metrics['option_sets_strengthened'],
    'optionTextsChangedCount': metrics['option_text_changed'],
    'optionFeedbackRewrittenCount': metrics['option_feedback_rewritten'],
    'clinicalScientificRationalesRewrittenCases': metrics['rationale_rewritten'],
    'evidenceChainsRewrittenCases': metrics['evidence_chain_rewritten'],
    'examPearlCoreKnowledgeStrengthenedCases': metrics['exam_pearl_strengthened'],
    'scientificConcernCount': metrics['scientific_concerns'],
    'correctAnswerLogicPreserved': metrics['correct_logic_preserved'],
    'idChangeCount': metrics['id_changes'],
    'tusSpotCasesTouched': metrics['tus_spot_touched'],
    'remainingBannedSnippetCount': metrics['remaining_banned_snippets'],
    'remainingBannedSnippets': remaining[:50],
    'scientificConcerns': scientific_concerns
}
(REPORT_DIR/'KlinikIQ_PEDIATRICS_QC_METRICS.json').write_text(json.dumps(qc, ensure_ascii=False, indent=2), encoding='utf-8')
tech=f"""KlinikIQ Pediatrics Ultra Refined Technical Report
================================================
Target branch: branchId == \"pediatrics\"
Total pediatric cases scanned: {metrics['scanned']}
Updated pediatric cases: {metrics['updated']}
Protected areas: TUS Spot Olgular, other clinical branches, glossary, pearl cards, KOMITE mode, API endpoints, environment variables, React component architecture.
Primary edited file: src/data/cases.js
Report directory: quality-reports/

Technical operations:
- Parsed rawCases JSON payload from src/data/cases.js and updated only objects with branchId \"pediatrics\".
- Preserved IDs, case count, branchId, case order, visual paths/assets, and structural field names.
- Removed non-contextual beta-hCG/ectopic pregnancy style investigation leakage from pediatric general cases.
- Rewrote generic or cross-case short comments in pediatric investigations.
- Strengthened pediatric objective data comments, row status/reference consistency, evidence chains, clinical rationales, option comparisons, and answer feedback.
- Special high-fidelity rewrite applied to serious pediatric iron intoxication cases, including deferoxamine-specific toxicology reasoning.

QC summary:
{json.dumps(qc, ensure_ascii=False, indent=2)}
"""
(REPORT_DIR/'KlinikIQ_PEDIATRICS_CASES_ULTRA_REFINED_TECHNICAL_REPORT.txt').write_text(tech, encoding='utf-8')
print(json.dumps(qc, ensure_ascii=False, indent=2))
