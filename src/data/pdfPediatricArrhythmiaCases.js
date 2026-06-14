import { attachClinicalVisualsToCases } from '../utils/clinicalVisuals.js';
import { clinicalVisualManifest } from './clinicalVisualManifest.js';

// Pediatric arrhythmia cases transformed from the uploaded PDF.
// The content is deliberately paraphrased and structured for KlinikIQ's interactive case schema.

const SOURCE_LABEL = 'PDF dönüşümü · Arrhythmias in Children';

const definitions = [
  {
    "id": "pdf-peds-arrhythmia-newborn-sinus-bradycardia-001",
    "branchId": "pediatrics",
    "title": "Yenidoğanda beslenmesi iyi olan bradikardi",
    "type": "Klasik vaka",
    "demographics": "1 günlük yenidoğan",
    "setting": "Yenidoğan bebek odası",
    "chiefComplaint": "Auskültasyonda kalp hızının yavaş duyulması.",
    "stem": "Term doğan, solunumu rahat ve emmesi iyi olan bir yenidoğanda rutin değerlendirme sırasında kalp hızı ortalama 90/dk olarak sayılıyor. Cilt rengi pembe, kapiller dolumu normal ve beslenme sırasında belirgin yorulma izlenmiyor. Doğumdan önce anneye sedatif özellikli ilaç uygulandığı öğreniliyor; fetal dönemde ciddi aritmi kaydı bildirilmemiş.",
    "vitals": {
      "TA": "68/42 mmHg",
      "Nabız": "90/dk",
      "Solunum": "38/dk",
      "SpO2": "%98",
      "Ateş": "36.7 °C"
    },
    "exam": [
      "Genel görünüm iyi ve perfüzyon yeterli.",
      "Siyanoz veya mottling izlenmiyor.",
      "Kalp sesleri bradikardik ancak düzenli duyuluyor.",
      "Üfürüm saptanmıyor.",
      "Solunum duraklaması gözlenmiyor."
    ],
    "correct": "Klinik olarak stabil sinüs bradikardisi",
    "options": [
      "Klinik olarak stabil sinüs bradikardisi",
      "Konjenital tam AV blok",
      "Uzun QT sendromuna bağlı 2:1 AV blok",
      "Hipovolemik şok",
      "Acil kardiyoversiyon gerektiren supraventriküler taşikardi"
    ],
    "question": "Bu yenidoğanda en olası ritim yorumu hangisidir?",
    "learningOutcome": "Stabil yenidoğanda bradikardinin ilk ayrımı klinik perfüzyon ve 15 derivasyon EKG ile sinüs bradikardisi, AV blok ve uzun QT paternlerini ayırmaktır.",
    "clinicalFocus": "Yenidoğan bradikardisinde stabilite, sinüs P dalgası ve 1:1 AV iletiminin yorumlanması.",
    "riskContext": [
      "Maternal sedatif veya kardiyak etkili ilaç maruziyeti geçici sinüs bradikardisi yapabilir.",
      "Yenidoğanda bradikardi değerlendirmesinde ilk kritik ayrım perfüzyonun korunup korunmadığıdır.",
      "Fetal bradikardi, ailede ani ölüm veya maternal otoimmünite varsa daha ileri aritmi araştırması gerekir."
    ],
    "distinctiveClues": [
      "Bebek pembe, iyi perfüze ve beslenmeyi sürdürebiliyor.",
      "Kalp hızı yaklaşık 90/dk ve ritim düzenli duyuluyor.",
      "EKG’de her QRS öncesinde sinüs P dalgası ve 1:1 AV iletim izleniyor.",
      "Siyanoz, üfürüm veya belirgin solunum duraklaması yok."
    ],
    "investigations": [
      {
        "name": "15 derivasyon EKG",
        "type": "Ecg",
        "why": "Bradikardinin sinüs ritmi, AV blok veya uzun QT ilişkisini ayırt etmek için istenir.",
        "result": "Sinüs kaynaklı P dalgaları her QRS öncesinde görülür; PR aralığı yaşa uygun, QTc 430 ms ve AV dissosiyasyon yoktur.",
        "rows": [
          [
            "Ritim",
            "Sinüs bradikardisi, 90/dk",
            "Yenidoğan için klinikle birlikte değerlendirilir",
            "Stabil"
          ],
          [
            "QTc",
            "430 ms",
            "<450 ms",
            "Referans içinde"
          ],
          [
            "AV iletim",
            "1:1 iletim",
            "AV dissosiyasyon beklenmez",
            "Normal"
          ]
        ]
      },
      {
        "name": "Sürekli ritim ve oksimetri izlemi",
        "type": "Monitor",
        "why": "Aralıklı apne veya ritim duraklaması olup olmadığını görmek için kullanılır.",
        "result": "İzlemde uzun duraklama, desatürasyon veya düzensiz blok paternleri saptanmaz.",
        "rows": [
          [
            "En uzun RR aralığı",
            "0.8 sn",
            "Uzun pause beklenmez",
            "Referans içinde"
          ],
          [
            "SpO₂ trendi",
            "%97–99",
            "%95 üstü",
            "Normal"
          ]
        ]
      }
    ],
    "whyCorrect": "Bebek klinik olarak iyi perfüze, beslenebiliyor ve EKG’de sinüs P dalgaları ile 1:1 AV iletim görülüyor. Bu patern acil pacing veya kardiyoversiyon değil, klinik stabiliteye göre izlem ve neden araştırmasını gerektirir.",
    "wrongNotes": {
      "Konjenital tam AV blok": "Tam AV blokta P dalgaları ile QRS kompleksleri birbirinden bağımsız ilerler ve ventriküler kaçış ritmi beklenir; bu olguda 1:1 AV iletim vardır.",
      "Uzun QT sendromuna bağlı 2:1 AV blok": "Uzun QT ilişkili 2:1 blokta belirgin QT uzaması ve her ikinci P dalgasının iletilmemesi beklenir; QTc normaldir.",
      "Hipovolemik şok": "Şokta solukluk, zayıf nabız, kapiller dolum uzaması ve beslenme bozulması beklenir; perfüzyon korunmuştur.",
      "Acil kardiyoversiyon gerektiren supraventriküler taşikardi": "Supraventriküler taşikardi yüksek ve çoğunlukla sabit hızla seyreder; burada sorun taşikardi değil stabil bradikardidir."
    },
    "pearls": [
      "Yenidoğan bradikardisinde ilk test EKG’dir; klinik instabilite yoksa değerlendirme için zaman vardır.",
      "Sinüs bradikardisi çoğu kez altta yatan solunum duraklaması, maternal ilaç veya hipotermi gibi bir bağlamın işaretidir.",
      "AV dissosiyasyon, uzun pause, siyanoz, üfürüm veya ailede ani ölüm daha ileri kardiyoloji değerlendirmesi gerektirir."
    ],
    "management": [
      "Perfüzyon, beslenme, SpO₂ ve solunum duraklamalarını izle.",
      "15 derivasyon EKG ile ritmi belgeleyip QTc ve AV iletimi değerlendir.",
      "Üfürüm, siyanoz, maternal lupus öyküsü veya uzun QT şüphesi varsa ekokardiyografi ve ilgili seroloji/genetik değerlendirme planla."
    ],
    "glossary": [
      "Sinüs bradikardisi",
      "Konjenital AV blok",
      "QTc",
      "Maternal anti-SSA/SSB"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-nicu-premature-extrasystole-002",
    "branchId": "pediatrics",
    "title": "Prematüre bebekte monitörde ekstra atımlar",
    "type": "Klasik vaka",
    "demographics": "1 haftalık, 34 gebelik haftasında doğmuş erkek bebek",
    "setting": "Yenidoğan yoğun bakım",
    "chiefComplaint": "Monitörde aralıklı ekstra atım alarmı.",
    "stem": "Prematüre doğan bebek oksijen gereksinimi ve beslenme güçlüğü nedeniyle yenidoğan yoğun bakımda izleniyor. Nazal kanülle 1 L/dk oksijen alıyor ve parenteral beslenme için santral kateteri bulunuyor. Monitör alarm verdiğinde ritim çizgisinde erken gelen atımlar görülüyor; bazı alarmlar hıçkırık ve hareket sırasında ortaya çıkıyor.",
    "vitals": {
      "TA": "64/40 mmHg",
      "Nabız": "148/dk",
      "Solunum": "44/dk",
      "SpO2": "%96",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Genel durum prematürelik ile uyumlu ancak perfüzyon yeterli.",
      "Kalp oskültasyonunda aralıklı erken atım sonrası kısa duraklama duyuluyor.",
      "Belirgin üfürüm yok.",
      "Santral venöz kateter yerinde izleniyor.",
      "Solunum eforu hafif artmış, siyanoz yok."
    ],
    "correct": "Prematür atriyal atım ve tetikleyici nedenlerin araştırılması",
    "options": [
      "Prematür atriyal atım ve tetikleyici nedenlerin araştırılması",
      "Monitör alarmı kesin ventriküler taşikardi kabul edilip amiodaron başlanması",
      "Her ekstra atımda acil senkronize kardiyoversiyon yapılması",
      "Artefakt olasılığı dışlanmadan kalıcı pacemaker takılması",
      "Normal sinüs ritmi düşünülerek hiçbir kayıt alınmaması"
    ],
    "question": "Bu NICU hastasında en uygun ilk değerlendirme yaklaşımı hangisidir?",
    "learningOutcome": "NICU’da ekstra atım alarmında önce gerçek ritim değişikliği artefakttan ayrılmalı, ardından EKG, elektrolitler ve kateter pozisyonu ile prematür atım nedenleri araştırılmalıdır.",
    "clinicalFocus": "Prematüre bebekte monitör artefaktı, prematür atriyal atım ve kateter ilişkili tetikleyicilerin ayrımı.",
    "riskContext": [
      "Prematüre bebeklerde elektrolit dalgalanmaları erken atımları kolaylaştırabilir.",
      "Santral venöz kateter ucunun sağ atriyuma ilerlemesi atriyal ektopiyi tetikleyebilir.",
      "Monitör artefaktı gerçek ritim bozukluğu gibi alarm oluşturabilir."
    ],
    "distinctiveClues": [
      "Ekstra dalga bazı kayıtlarda altta yatan ritmin kadansını değiştirmiyor.",
      "Gerçek erken atımlarda kısa kompansatuvar duraklama duyuluyor.",
      "Parenteral beslenme ve santral kateter elektrolit ve mekanik tetikleyici riskini artırıyor.",
      "Hemodinami stabil ve sürdürülebilir taşikardi yok."
    ],
    "investigations": [
      {
        "name": "Monitör ritim şeridi incelemesi",
        "type": "Monitor",
        "why": "Artefakt ile gerçek prematür atımı ayırmak için ilk basamaktır.",
        "result": "Hareket sırasında bazı dalgalar altta yatan sinüs ritmini değiştirmez; ayrı kayıtta erken P dalgası sonrası iletilen QRS görülür.",
        "rows": [
          [
            "Kadans",
            "Artefaktta değişmiyor, PAC’de erken atım sonrası duraklıyor",
            "Gerçek atımda kadans etkilenir",
            "Ayırt ettirici"
          ]
        ]
      },
      {
        "name": "Serum elektrolitleri",
        "type": "Lab",
        "why": "Hipokalemi, hipomagnezemi ve hipokalsemi prematür atımları artırabilir.",
        "result": "Potasyum hafif düşük, magnezyum sınırda düşük saptanır.",
        "rows": [
          [
            "Potasyum",
            "3.1 mEq/L",
            "3.5–5.1 mEq/L",
            "Düşük"
          ],
          [
            "Magnezyum",
            "1.5 mg/dL",
            "1.7–2.4 mg/dL",
            "Düşük"
          ]
        ]
      },
      {
        "name": "Akciğer grafisi ile kateter ucu",
        "type": "Imaging",
        "why": "Santral kateter ucunun atriyum içine ilerleyip ilerlemediğini değerlendirmek için istenir.",
        "result": "Kateter ucu sağ atriyuma yakın izlenir; geri çekme sonrası erken atım sıklığı azalır.",
        "rows": [
          [
            "Kateter ucu",
            "Sağ atriyuma yakın",
            "Kavoatriyal bileşke hedeflenir",
            "Mekanik tetikleyici"
          ]
        ]
      }
    ],
    "whyCorrect": "Stabil NICU bebeğinde ekstra atım alarmı önce ritim şeridiyle doğrulanmalı ve artefakt ayrılmalıdır. Gerçek prematür atım varsa elektrolit bozukluğu ve santral kateter pozisyonu gibi düzeltilebilir nedenler araştırılır.",
    "wrongNotes": {
      "Monitör alarmı kesin ventriküler taşikardi kabul edilip amiodaron başlanması": "Ventriküler taşikardi sürdürülebilir geniş kompleks ritim ve klinik etkilenme ile düşünülür; bu olguda aralıklı erken atımlar ve olası artefakt vardır.",
      "Her ekstra atımda acil senkronize kardiyoversiyon yapılması": "Kardiyoversiyon hemodinamik olarak anlamlı taşiaritmilerde düşünülür; izole prematür atımda ilk yaklaşım değildir.",
      "Artefakt olasılığı dışlanmadan kalıcı pacemaker takılması": "Pacemaker bradikardi/iletim blokları için seçilir; ekstra atım alarmı pacemaker endikasyonu değildir.",
      "Normal sinüs ritmi düşünülerek hiçbir kayıt alınmaması": "NICU’da tekrarlayan alarm varsa ritim şeridi, EKG ve tetikleyici nedenler belgelenmelidir."
    },
    "pearls": [
      "Artefaktta normal QRS’ler dalgaların içinden düzenli biçimde yürümeye devam eder.",
      "Prematür atriyal atımlar yenidoğanda sık ve çoğu kez benigndir; tedavi altta yatan tetikleyiciye yönelir.",
      "Derin santral kateter ucu atriyal ektopinin düzeltilebilir nedenidir."
    ],
    "management": [
      "Ritim şeridini kaydet ve oskültasyonla monitör bulgusunu eşleştir.",
      "Potasyum, magnezyum ve kalsiyumu düzelt.",
      "Kateter ucu atriyuma ilerlemişse geri çekme, değiştirme veya çıkarma planla."
    ],
    "glossary": [
      "Prematür atriyal atım",
      "Artefakt",
      "Atriyal bigemini",
      "Santral venöz kateter"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-neonatal-atrial-flutter-003",
    "branchId": "pediatrics",
    "title": "Doğum sonrası değişmeyen yenidoğan taşikardisi",
    "type": "Klasik vaka",
    "demographics": "Term yenidoğan",
    "setting": "Yenidoğan yoğun bakım",
    "chiefComplaint": "Doğumdan beri devam eden yüksek kalp hızı.",
    "stem": "Term doğan bebek doğumdan sonra kalp hızının sürekli yüksek seyretmesi nedeniyle izleniyor. Kalp hızı bebeğin ağlama, uyku veya beslenme durumundan belirgin etkilenmiyor. Hemodinami korunmuş, ancak EKG’de QRS kompleksleri arasında seçilmesi zor düzenli atriyal aktivite olduğu fark ediliyor.",
    "vitals": {
      "TA": "70/44 mmHg",
      "Nabız": "152/dk",
      "Solunum": "42/dk",
      "SpO2": "%97",
      "Ateş": "36.9 °C"
    },
    "exam": [
      "Genel durum iyi, perfüzyon yeterli.",
      "Kalp ritmi düzenli ve hızlı duyuluyor.",
      "Üfürüm yok.",
      "Hepatomegali ve siyanoz saptanmıyor."
    ],
    "correct": "Yenidoğan atriyal flutterı",
    "options": [
      "Yenidoğan atriyal flutterı",
      "Dehidratasyona bağlı sinüs taşikardisi",
      "Otomatik ektopik atriyal taşikardi",
      "Ventriküler taşikardi",
      "Hipertiroidiye bağlı sinüs taşikardisi"
    ],
    "question": "Bu olguda EKG ve klinik patern en çok hangi tanıyı destekler?",
    "learningOutcome": "Yenidoğanda doğumdan hemen sonra başlayan, hız değişkenliği az olan ve 2:1 AV iletimle maskelebilen taşikardide atriyal flutter düşünülmelidir.",
    "clinicalFocus": "Yenidoğan atriyal flutterında sabit ventrikül hızı, gizlenen flutter dalgaları ve adenosinin tanısal rolü.",
    "riskContext": [
      "Fetal veya erken postnatal taşikardi atriyal aritmileri düşündürür.",
      "Atriyal flutterda AV düğüm ventrikül hızını sınırlayabilir ve flutter dalgalarını maskeleyebilir.",
      "Stabil görünüm aritminin zararsız olduğu anlamına gelmez; ritim tanısı gereklidir."
    ],
    "distinctiveClues": [
      "Kalp hızı aktiviteyle belirgin değişmiyor.",
      "EKG’de atriyal hız ventrikül hızının yaklaşık iki katı.",
      "Adenosin sonrası AV blok artınca testere dişi atriyal aktivite belirginleşiyor.",
      "QRS kompleksleri dar ve ritim düzenli."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Taşikardinin mekanizmasını ve atriyal aktiviteyi belirlemek için istenir.",
        "result": "Dar QRS’li düzenli taşikardi, 2:1 AV iletimi düşündüren gizli flutter dalgaları ve atriyal hız yaklaşık 300/dk izlenir.",
        "rows": [
          [
            "Ventrikül hızı",
            "150/dk",
            "Yenidoğanda klinikle yorumlanır",
            "Yüksek"
          ],
          [
            "Atriyal aktivite",
            "Yaklaşık 300/dk testere dişi dalgalar",
            "Sinüs ritminde beklenmez",
            "Patolojik"
          ],
          [
            "QRS",
            "Dar",
            "Dar QRS supraventriküler kaynak lehine",
            "Supraventriküler"
          ]
        ]
      },
      {
        "name": "Adenosin eşliğinde ritim kaydı",
        "type": "Ecg",
        "why": "AV blok oluşturarak flutter dalgalarını görünür hale getirmek için tanısal amaçla kullanılır.",
        "result": "Adenosin sonrası taşikardi sonlanmaz; AV blok artışı ile flutter dalgaları netleşir.",
        "rows": [
          [
            "Adenosin yanıtı",
            "AV blok artar, ritim devam eder",
            "AV nod bağımlı taşikardi sonlanabilir",
            "Flutter lehine"
          ]
        ]
      }
    ],
    "whyCorrect": "Atriyal flutterda aritmi devresi atriyum içindedir; AV düğüm yalnızca iletim oranını belirler. Bu nedenle adenosin ritmi sonlandırmayıp AV blok oluşturarak flutter dalgalarını görünür hale getirebilir.",
    "wrongNotes": {
      "Dehidratasyona bağlı sinüs taşikardisi": "Sinüs taşikardisinde hız beslenme, ağlama, ateş veya sıvı durumuyla değişir; burada sabit hız ve atriyal flutter dalgaları vardır.",
      "Otomatik ektopik atriyal taşikardi": "Otomatik taşikardide ısınma-soğuma ve hız değişkenliği beklenir; bu olguda sabit reentran patern ön plandadır.",
      "Ventriküler taşikardi": "Ventriküler taşikardide genellikle geniş QRS ve AV dissosiyasyon beklenir; QRS dar ve atriyal flutter aktivitesi seçiliyor.",
      "Hipertiroidiye bağlı sinüs taşikardisi": "Hipertiroidi sinüs taşikardisi yapabilir ancak yenidoğan başlangıçlı sabit flutter dalgalarını açıklamaz."
    },
    "pearls": [
      "Yenidoğan atriyal flutterında adenosin tanısaldır; çoğu kez tedavi edici değildir.",
      "Stabil yenidoğanda kesin tedavi transözofageal overdrive pacing veya senkronize kardiyoversiyondur.",
      "Flutter dalgaları QRS/T dalgası içine gömülebilir; hız ve voltaj ayarı EKG yorumunu kolaylaştırır."
    ],
    "management": [
      "Pediatrik kardiyoloji/elektrofizyoloji ile görüş.",
      "Hemodinamik instabilite varsa senkronize kardiyoversiyon hazırla.",
      "Stabil hastada transözofageal overdrive pacing veya 0.5–1 J/kg senkronize kardiyoversiyon planla."
    ],
    "glossary": [
      "Atriyal flutter",
      "Adenosin",
      "AV blok",
      "Senkronize kardiyoversiyon"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-infant-avrt-svt-004",
    "branchId": "pediatrics",
    "title": "Altı haftalık bebekte beslenememe ve 210/dk taşikardi",
    "type": "Klasik vaka",
    "demographics": "6 haftalık kız bebek",
    "setting": "Çocuk acil servisi",
    "chiefComplaint": "Beslenememe, huzursuzluk ve hızlı soluma.",
    "stem": "Son 48 saattir emmesi azalan, huzursuzluğu artan ve son 24 saatte 3–4 ıslak bezi olan bebek acile getiriliyor. Kalp hızı 210/dk ve ritim düzenli; ciltte hafif mottling ve takipne var. Ateş belirgin değil, aile kış döneminde üst solunum yolu teması olduğunu belirtiyor.",
    "vitals": {
      "TA": "78/46 mmHg",
      "Nabız": "210/dk",
      "Solunum": "54/dk",
      "SpO2": "%95",
      "Ateş": "37.2 °C"
    },
    "exam": [
      "Hafif mottling ve kapiller dolumda uzama izleniyor.",
      "Kalp ritmi düzenli ve çok hızlı duyuluyor.",
      "Femoral nabızlar alınabiliyor.",
      "Akciğerlerde belirgin ral yok.",
      "Karaciğer kot altında 2 cm palpe ediliyor."
    ],
    "correct": "AV nod bağımlı supraventriküler taşikardi atağında hızlı adenosin uygulaması",
    "options": [
      "AV nod bağımlı supraventriküler taşikardi atağında hızlı adenosin uygulaması",
      "Geniş spektrumlu antibiyotik başlanıp ritim değerlendirmesinin ertelenmesi",
      "Sadece 20 mL/kg sıvı bolusu verip taburculuk",
      "Adenosin yerine oral beta blokerle akut sonlandırma denemesi",
      "Hemodinamik instabilite olmadan rutin defibrilasyon"
    ],
    "question": "Hemodinamik olarak kısmen stabil olan bu bebekte akut ritim yönetiminde en uygun ilk tedavi hangisidir?",
    "learningOutcome": "Düzenli dar kompleks taşikardide bebek stabilse EKG kaydı eşliğinde hızlı IV adenosin AV nod bağımlı SVT’yi sonlandırabilir; instabilite varsa senkronize kardiyoversiyon gerekir.",
    "clinicalFocus": "İnfant SVT’de klinik stabilite, dehidratasyon/sepsis ayırımı ve adenosin uygulama tekniği.",
    "riskContext": [
      "Kötü beslenme ve azalmış idrar çıkışı kardiyak debi azalması veya dehidratasyonla ilişkili olabilir.",
      "İnfantlarda SVT 24 saatten uzun sürerse ventrikül fonksiyonu baskılanabilir.",
      "Sıvı bolusu konjenital kalp hastalığında dikkatli ve küçük hacimlerle verilmelidir."
    ],
    "distinctiveClues": [
      "Kalp hızı 210/dk ve ritim düzenli.",
      "Başlangıç öyküsü ani kötüleşmeye uyuyor.",
      "Mottling ve takipne perfüzyon etkilenmesini gösteriyor.",
      "EKG dar kompleks düzenli taşikardi gösteriyor."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Dar QRS’li düzenli taşikardi, P dalgaları seçilemiyor; adenosin sonrası sinüs ritmi kısa süreli geri dönüyor.",
        "rows": [
          [
            "QRS",
            "Dar",
            "<120 ms",
            "Supraventriküler"
          ],
          [
            "Hız",
            "210/dk",
            "Yaşa göre yüksek",
            "Taşikardi"
          ],
          [
            "Adenosin yanıtı",
            "Ritim sonlanıyor",
            "AV nod bağımlı SVT’de beklenir",
            "Tanısal ve tedavi edici"
          ]
        ]
      },
      {
        "name": "Ekokardiyografi",
        "type": "Imaging",
        "why": "Yapısal kalp hastalığı ve ventrikül fonksiyonunu değerlendirmek için istenir.",
        "result": "Hafif azalmış sistolik fonksiyon, yapısal ciddi defekt yok.",
        "rows": [
          [
            "Ventrikül fonksiyonu",
            "Hafif azalmış sistolik fonksiyon, yapısal ciddi defekt yok.",
            "Yaşa uygun normal fonksiyon beklenir",
            "Klinik karar verdirici"
          ]
        ]
      }
    ],
    "whyCorrect": "Düzenli dar kompleks taşikardi ve adenosinle sonlanma AV düğümün devrede yer aldığı reentran SVT’yi destekler. Bebekte perfüzyon etkilenmiş olsa da nabız alınabiliyor ve acil defibrilasyon değil senkronize kardiyoversiyon gerekir; stabil kısımda ilk ilaç adenosindir.",
    "wrongNotes": {
      "Geniş spektrumlu antibiyotik başlanıp ritim değerlendirmesinin ertelenmesi": "Sepsis ayırıcı tanıda olabilir fakat 210/dk düzenli dar kompleks ritim öncelikle ritim tanısı ve sonlandırma gerektirir.",
      "Sadece 20 mL/kg sıvı bolusu verip taburculuk": "Az idrar çıkışı sıvı gereksinimini düşündürebilir ancak kalp hızı ve ritim paterni SVT lehinedir; ayrıca kalp hastalığında büyük bolus dikkat ister.",
      "Adenosin yerine oral beta blokerle akut sonlandırma denemesi": "Beta blokerler profilakside kullanılabilir; akut düzenli SVT atağında hızlı etkili adenosin tercih edilir.",
      "Hemodinamik instabilite olmadan rutin defibrilasyon": "Şoklanabilir ritim ventriküler fibrilasyon/nabızsız VT içindir; nabızlı SVT’de gerekiyorsa senkronize kardiyoversiyon kullanılır."
    },
    "pearls": [
      "Adenosin hızlı IV push ve hemen serum fizyolojik flush ile verilmelidir.",
      "Adenosin uygulanırken ritim şeridi kaydedilmelidir; kısa süreli sonlanma bile tanısaldır.",
      "İnfantta uzamış SVT kardiyomiyopatiye yol açabilir."
    ],
    "management": [
      "Monitör, damar yolu ve ritim şeridini hazırla.",
      "Stabilse adenosin 0.1 mg/kg hızlı IV push uygula; gerekirse 0.2 mg/kg tekrarla.",
      "İnstabilite gelişirse senkronize kardiyoversiyon ve yoğun bakım desteği planla."
    ],
    "glossary": [
      "Supraventriküler taşikardi",
      "Adenosin",
      "AVRT",
      "Senkronize kardiyoversiyon"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-well-infant-pac-005",
    "branchId": "pediatrics",
    "title": "Sağlıklı infantta oskültasyonda ekstra atım",
    "type": "TUS Spot Olgu",
    "demographics": "4 aylık erkek bebek",
    "setting": "Sağlam çocuk kontrolü",
    "chiefComplaint": "Muayenede aralıklı ekstra kalp sesi duyulması.",
    "stem": "Büyüme ve beslenmesi normal olan bebek rutin kontrolde değerlendiriliyor. Aile çarpıntı, morarma, beslenirken terleme veya bayılma tariflemiyor. Doktor uzun süre dinlediğinde arada erken gelen atım ve ardından kısa duraklama duyuyor.",
    "vitals": {
      "TA": "86/52 mmHg",
      "Nabız": "128/dk",
      "Solunum": "32/dk",
      "SpO2": "%99",
      "Ateş": "36.5 °C"
    },
    "exam": [
      "Genel durum iyi.",
      "Kalp oskültasyonunda aralıklı erken atım sonrası kısa duraklama duyuluyor.",
      "Üfürüm yok.",
      "Ash-leaf makül veya nörokutanöz bulgu saptanmıyor."
    ],
    "correct": "İzole prematür atriyal atım için EKG ile doğrulama ve izlem",
    "options": [
      "İzole prematür atriyal atım için EKG ile doğrulama ve izlem",
      "Asemptomatik her infantta antiaritmik tedavi başlama",
      "Acil kardiyoversiyon",
      "Mitral kapak prolapsusu tanısı koyup ek değerlendirme yapmama",
      "Ventriküler taşikardi kabul edip yoğun bakım yatışı"
    ],
    "question": "Bu sağlıklı infantta en uygun yaklaşım hangisidir?",
    "learningOutcome": "Asemptomatik infantta aralıklı ekstra atımların çoğu prematür atriyal atımdır; EKG ile belgelemek ve aile öyküsü/semptom açısından taramak yeterlidir.",
    "clinicalFocus": "Sağlıklı infantta benign ekstrasistol değerlendirmesi ve gereksiz tedaviden kaçınma.",
    "riskContext": [
      "Ailede ani ölüm veya nöbet öyküsü varsa kalıtsal hastalık açısından sorgulama gerekir.",
      "Sürekli üfürüm veya her siklusta klik duyulması anatomik nedenleri düşündürür."
    ],
    "distinctiveClues": [
      "Bebek asemptomatik ve büyümesi normal.",
      "Ekstra atım her siklusta değil aralıklı geliyor.",
      "Üfürüm veya kalp yetmezliği bulgusu yok.",
      "EKG’de erken P dalgası ile iletilen dar QRS görülüyor."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Sinüs ritmi zemininde aralıklı erken P dalgası ve dar QRS ile iletilen prematür atriyal atımlar izlenir.",
        "rows": [
          [
            "Ritim bulgusu",
            "Sinüs ritmi zemininde aralıklı erken P dalgası ve dar QRS ile iletilen prematür atriyal atımlar izlenir.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      },
      {
        "name": "24 saat Holter",
        "type": "Monitor",
        "why": "Atımlar seyrekse yükü ve kısa SVT koşularını değerlendirmek için kullanılır.",
        "result": "Seyrek PAC izlenir, sürdürülebilir taşikardi yoktur.",
        "rows": [
          [
            "PAC yükü",
            "%1 altında",
            "Düşük yük",
            "Benign"
          ],
          [
            "SVT koşusu",
            "Saptanmadı",
            "Saptanmamalı",
            "Normal"
          ]
        ]
      }
    ],
    "whyCorrect": "Asemptomatik, büyümesi normal ve yapısal kalp hastalığı bulgusu olmayan infantta aralıklı erken atım en çok prematür atriyal atımı düşündürür. Tedavi yerine EKG ile doğrulama, aile öyküsü ve izlem uygundur.",
    "wrongNotes": {
      "Asemptomatik her infantta antiaritmik tedavi başlama": "Antiaritmikler sürdürülebilir taşikardi veya hemodinamik etkilenmede düşünülür; izole PAC’de gereksizdir.",
      "Acil kardiyoversiyon": "Kardiyoversiyon taşiaritmi sonlandırmak içindir; bu olguda aralıklı benign erken atım vardır.",
      "Mitral kapak prolapsusu tanısı koyup ek değerlendirme yapmama": "Klik her kalp siklusunda duyulabilir; bu olguda ritim duraklaması ile aralıklı erken atım ön plandadır.",
      "Ventriküler taşikardi kabul edip yoğun bakım yatışı": "VT geniş kompleks ve sürdürülebilir ritimle düşünülür; EKG dar QRS’li atriyal erken atımı gösterir."
    },
    "pearls": [
      "PAC yenidoğan ve infantlarda sık, çoğu kez geçici ve benigndir.",
      "Ailede ani ölüm, egzersiz senkopu veya nörokutanöz bulgu varsa değerlendirme genişletilir."
    ],
    "management": [
      "12 derivasyon EKG çek.",
      "Sıklık belirsizse Holter ile yükü değerlendir.",
      "Sürdürülebilir SVT yoksa tedavisiz izlem ve aile eğitimi yap."
    ],
    "glossary": [
      "Prematür atriyal atım",
      "Holter",
      "Tüberoskleroz",
      "Kardiyak rabdomiyom"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-recurrent-infant-svt-vagal-006",
    "branchId": "pediatrics",
    "title": "Tekrarlayan SVT atağında buzlu yüz manevrası",
    "type": "TUS Spot Olgu",
    "demographics": "9 aylık kız bebek",
    "setting": "Çocuk acil servisi",
    "chiefComplaint": "Aile tarafından fark edilen hızlı kalp atımı.",
    "stem": "Daha önce SVT nedeniyle izlenen bebekte aile kalp hızının aniden 220/dk olduğunu fark ediyor. Bebek uyanık, ağlıyor ve femoral nabızları alınabiliyor. Aile ilaç dozunun son kilo artışından sonra yeniden düzenlenmediğini söylüyor.",
    "vitals": {
      "TA": "84/50 mmHg",
      "Nabız": "220/dk",
      "Solunum": "40/dk",
      "SpO2": "%97",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Genel durum hafif huzursuz.",
      "Perfüzyon korunmuş, kapiller dolum 2 saniye.",
      "Kalp ritmi düzenli ve çok hızlı.",
      "Solunum sıkıntısı ağır değil."
    ],
    "correct": "Yüzü kaplayan buzlu su poşeti ile vagal manevra denemesi",
    "options": [
      "Yüzü kaplayan buzlu su poşeti ile vagal manevra denemesi",
      "Oksüler bası uygulamak",
      "Hemen oral verapamil vermek",
      "Defibrilasyon yapmak",
      "Aritmi geçene kadar evde beklemek"
    ],
    "question": "Stabil infantta tekrarlayan SVT atağında ilk nonfarmakolojik sonlandırma seçeneği hangisidir?",
    "learningOutcome": "Stabil infant SVT atağında uygun uygulanan buzlu yüz manevrası dalış refleksiyle AV nod iletimini yavaşlatabilir; oküler bası kullanılmamalıdır.",
    "clinicalFocus": "İnfant SVT’de güvenli vagal manevra ve aile eğitimi.",
    "riskContext": [
      "Tekrarlayan ataklar ilaç dozunun kilo artışıyla yetersiz kalmasına bağlı olabilir.",
      "Stabilite korunuyorsa vagal manevra ve adenosin basamaklı kullanılır."
    ],
    "distinctiveClues": [
      "Ani başlangıçlı, düzenli 220/dk taşikardi.",
      "Femoral nabızlar alınabiliyor ve ağır şok yok.",
      "Önceki SVT öyküsü mevcut."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Dar QRS’li düzenli taşikardi; vagal manevra sonrası sinüs ritmine dönüş izlenir.",
        "rows": [
          [
            "Ritim bulgusu",
            "Dar QRS’li düzenli taşikardi; vagal manevra sonrası sinüs ritmine dönüş izlenir.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      }
    ],
    "whyCorrect": "Bebek stabil olduğu için ilk nonfarmakolojik girişim güvenli vagal manevradır. Buzlu su içeren poşetin yüzü kısa süre tamamen kaplaması dalış refleksini tetikleyerek AV nod bağımlı SVT’yi sonlandırabilir.",
    "wrongNotes": {
      "Oksüler bası uygulamak": "Oküler bası göz hasarı riski nedeniyle önerilmez; eski kaynaklarda geçse de güvenli seçenek değildir.",
      "Hemen oral verapamil vermek": "Verapamil özellikle infantlarda ciddi hipotansiyon riski taşır ve akut ilk basamak değildir.",
      "Defibrilasyon yapmak": "Nabızlı düzenli SVT’de defibrilasyon değil, instabilse senkronize kardiyoversiyon kullanılır.",
      "Aritmi geçene kadar evde beklemek": "Uzayan SVT infantta beslenme bozukluğu ve kardiyak disfonksiyona yol açabilir; aktif sonlandırma gerekir."
    },
    "pearls": [
      "İnfantta buzlu yüz manevrası 10–15 saniye uygulanır; boğma gibi değil, yüzü soğukla uyaran kısa bir manevradır.",
      "SVT ilaç dozları kilo alımıyla yetersiz kalabilir."
    ],
    "management": [
      "Vagal manevrayı doğru uygula.",
      "Başarısızsa damar yolu ve ritim kaydı eşliğinde adenosin kullan.",
      "Atak sonrası ilaç dozu, aile eğitimi ve kardiyoloji kontrolünü güncelle."
    ],
    "glossary": [
      "Vagal manevra",
      "Dalış refleksi",
      "SVT"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-breath-holding-spell-007",
    "branchId": "pediatrics",
    "title": "Ağlama sonrası morarma ve kısa bayılma",
    "type": "TUS Spot Olgu",
    "demographics": "2 yaşında erkek çocuk",
    "setting": "Çocuk acil servisi",
    "chiefComplaint": "Ağlama sonrası kısa süreli morarma ve bayılma.",
    "stem": "Çocuk oyuncak alınmadığı için şiddetli ağladıktan sonra nefesini tutuyor, morarıyor ve birkaç saniye gevşeyip kendine geliyor. Olaydan sonra hızla normale dönüyor; ateş, egzersiz ilişkisi veya uzun postiktal uyku yok.",
    "vitals": {
      "TA": "92/58 mmHg",
      "Nabız": "104/dk",
      "Solunum": "24/dk",
      "SpO2": "%99",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Genel durum iyi ve nörolojik muayene normal.",
      "Kalp sesleri ritmik, üfürüm yok.",
      "Perfüzyon normal.",
      "Travma bulgusu yok."
    ],
    "correct": "Siyanotik breath-holding spell",
    "options": [
      "Siyanotik breath-holding spell",
      "Epileptik nöbet",
      "Hipertrofik kardiyomiyopatiye bağlı egzersiz senkopu",
      "Uzun QT sendromu",
      "Munchausen by proxy"
    ],
    "question": "Bu olguda en olası tanı hangisidir?",
    "learningOutcome": "Öfke/ağlama sonrası nefes tutma, morarma, kısa bilinç kaybı ve hızlı toparlanma siyanotik breath-holding spell için tipiktir.",
    "clinicalFocus": "Pediatrik senkop benzeri olayda tetikleyici, süre ve toparlanma ile benign breath-holding spell ayrımı.",
    "riskContext": [
      "Aile kaygısı yüksek olsa da olayın ağlama ile tetiklenmesi benign paterni destekler.",
      "Demir eksikliği breath-holding spell sıklığını artırabilir."
    ],
    "distinctiveClues": [
      "Olay ağlama ve öfke sonrası başlıyor.",
      "Morarma kısa sürüyor ve kendiliğinden düzeliyor.",
      "Postiktal dönem veya egzersiz sırasında çökme yok.",
      "Fizik ve nörolojik muayene normal."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Sinüs ritmi, QTc 410 ms, preeksitasyon veya iletim bloğu yok.",
        "rows": [
          [
            "Ritim bulgusu",
            "Sinüs ritmi, QTc 410 ms, preeksitasyon veya iletim bloğu yok.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      },
      {
        "name": "Tam kan sayımı ve ferritin",
        "type": "Lab",
        "why": "Tekrarlayan breath-holding spell’de demir eksikliğini değerlendirmek için istenir.",
        "result": "Hemoglobin sınırda düşük, ferritin düşük saptanır.",
        "rows": [
          [
            "Hemoglobin",
            "10.8 g/dL",
            "11.5–13.5 g/dL",
            "Düşük"
          ],
          [
            "Ferritin",
            "8 ng/mL",
            ">12 ng/mL",
            "Düşük"
          ]
        ]
      }
    ],
    "whyCorrect": "Olayın ağlama/öfke sonrası başlaması, kısa morarma ve hızlı toparlanma breath-holding spell lehinedir. Kardiyak ölüm riski taşıyan senkop genellikle egzersizle, aile öyküsüyle veya anormal EKG ile desteklenir.",
    "wrongNotes": {
      "Epileptik nöbet": "Nöbette tetikleyici olmayabilir, ritmik kasılma ve postiktal uyku beklenebilir; burada olay ağlama sonrası ve kısa süreli.",
      "Hipertrofik kardiyomiyopatiye bağlı egzersiz senkopu": "Egzersiz sırasında senkop kırmızı bayraktır; bu olay öfke/ağlama sonrası gelişmiştir.",
      "Uzun QT sendromu": "Uzun QT’de tetikleyici ses/egzersiz ve QTc uzaması olabilir; EKG normaldir.",
      "Munchausen by proxy": "Tekrarlayan açıklanamayan, bakım verenle ilişkili ve tutarsız öykülerde düşünülür; burada tipik benign patern var."
    },
    "pearls": [
      "Breath-holding spell genellikle 6 ay–6 yaş arasında görülür.",
      "Ağlama sonrası siyanoz ve kısa senkop, hızlı normale dönüşle birlikte tipiktir."
    ],
    "management": [
      "Aileye benign doğayı ve güvenli pozisyonlamayı anlat.",
      "Tekrarlıyorsa demir eksikliğini düzelt.",
      "Egzersiz senkopu, ailede ani ölüm veya anormal EKG varsa kardiyolojiye yönlendir."
    ],
    "glossary": [
      "Breath-holding spell",
      "Postiktal dönem",
      "QTc"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-child-low-resting-rate-008",
    "branchId": "pediatrics",
    "title": "Üç yaşında asemptomatik düşük istirahat nabzı",
    "type": "TUS Spot Olgu",
    "demographics": "3 yaşında erkek çocuk",
    "setting": "Sağlam çocuk kontrolü",
    "chiefComplaint": "İstirahatte kalp hızının düşük ölçülmesi.",
    "stem": "Rutin kontrolde uykuya yakın sakin bir çocukta nabız 62/dk ölçülüyor. Aile bayılma, egzersiz intoleransı, morarma veya kilo alamama tariflemiyor. Dinleme sırasında solunumla hızlanan ve yavaşlayan düzenli değişkenlik fark ediliyor.",
    "vitals": {
      "TA": "92/56 mmHg",
      "Nabız": "62/dk",
      "Solunum": "22/dk",
      "SpO2": "%99",
      "Ateş": "36.4 °C"
    },
    "exam": [
      "Genel durum iyi.",
      "Kalp ritmi solunumla hızlanıp yavaşlıyor.",
      "Üfürüm yok.",
      "Perfüzyon normal."
    ],
    "correct": "Yaşa göre benign sinüs bradikardisi/sinüs aritmisi",
    "options": [
      "Yaşa göre benign sinüs bradikardisi/sinüs aritmisi",
      "Edinsel tam AV blok",
      "Miyokardit",
      "Lyme karditi",
      "Uzun QT sendromu"
    ],
    "question": "Bu çocukta en olası ritim yorumu hangisidir?",
    "learningOutcome": "Asemptomatik, perfüzyonu iyi çocukta solunumla değişen sinüs ritmi ve 1:1 AV iletim benign sinüs aritmisi lehinedir.",
    "clinicalFocus": "Çocukta düşük istirahat nabzında normal sinüs aritmisi ile iletim bloklarının ayrımı.",
    "riskContext": [
      "Semptom yokluğu benignliği destekler.",
      "Kene teması, miyokardit bulgusu veya ailede ani ölüm varsa değerlendirme genişletilir."
    ],
    "distinctiveClues": [
      "Solunumla kalp hızı değişiyor.",
      "EKG’de her QRS öncesinde sinüs P dalgası var.",
      "AV dissosiyasyon veya PR uzaması yok.",
      "Perfüzyon ve büyüme normal."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Sinüs P dalgaları ile 1:1 AV iletim, solunumsal hız değişkenliği ve normal QTc izlenir.",
        "rows": [
          [
            "P-QRS ilişkisi",
            "1:1",
            "Her QRS öncesi P dalgası",
            "Normal"
          ],
          [
            "PR",
            "140 ms",
            "Yaşa uygun",
            "Normal"
          ],
          [
            "QTc",
            "415 ms",
            "<450 ms",
            "Normal"
          ]
        ]
      }
    ],
    "whyCorrect": "Ritim solunumla değişkenlik gösteriyor ve EKG’de sinüs P dalgaları 1:1 iletiliyor. Semptom, üfürüm, perfüzyon bozukluğu veya QT uzaması olmadığı için benign sinüs aritmisi en uygundur.",
    "wrongNotes": {
      "Edinsel tam AV blok": "Tam AV blokta P ve QRS ilişkisi kopar; bu olguda 1:1 iletim var.",
      "Miyokardit": "Miyokarditte halsizlik, taşikardi, göğüs ağrısı veya kalp yetmezliği bulguları beklenir; çocuk iyi görünmektedir.",
      "Lyme karditi": "Kene teması, eritema migrans ve PR uzaması ile düşünülür; bu ipuçları yoktur.",
      "Uzun QT sendromu": "QTc uzaması, senkop veya aile öyküsü beklenir; QTc normaldir."
    },
    "pearls": [
      "Çocuklarda sinüs aritmisi sık ve fizyolojiktir.",
      "Semptomatik bradikardi, AV blok veya uzun pause varsa ileri değerlendirme gerekir."
    ],
    "management": [
      "12 derivasyon EKG ile sinüs ritmini belgeleyin.",
      "Semptom yoksa aileye güven verip izlem planlayın.",
      "Senkop, egzersiz intoleransı veya ailede ani ölüm varsa kardiyolojiye yönlendirin."
    ],
    "glossary": [
      "Sinüs aritmisi",
      "AV blok",
      "PR aralığı"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-recurrent-school-age-svt-ablation-009",
    "branchId": "pediatrics",
    "title": "Yedi yaşında sık tekrarlayan SVT ve ablasyon kararı",
    "type": "Klasik vaka",
    "demographics": "7 yaşında kız çocuk",
    "setting": "Çocuk acil servisi",
    "chiefComplaint": "Tekrarlayan çarpıntı atağı.",
    "stem": "Çocuk son aylarda okulda neredeyse her gün aniden başlayan kalbin hızlı atması atakları yaşıyor. Bugün kalp hızı 220/dk iken acile getiriliyor ve damar yolu açılırken ritim kendiliğinden sonlanıyor. Kalsiyum kanal blokerine rağmen ataklar sürüyor ve ilaç belirgin kabızlık yapıyor.",
    "vitals": {
      "TA": "104/64 mmHg",
      "Nabız": "92/dk",
      "Solunum": "18/dk",
      "SpO2": "%99",
      "Ateş": "36.7 °C"
    },
    "exam": [
      "Atağ sonrasında genel durum iyi.",
      "Kalp sesleri ritmik, üfürüm yok.",
      "Perfüzyon normal."
    ],
    "correct": "Elektrofizyoloji çalışması ve kateter ablasyonun aileyle görüşülmesi",
    "options": [
      "Elektrofizyoloji çalışması ve kateter ablasyonun aileyle görüşülmesi",
      "Ataklar günlük olsa da sadece yıllık kontrol",
      "Kalsiyum kanal bloker dozunu sınırsız artırma",
      "Egzersizi tamamen yasaklayıp tedavi vermeme",
      "Kalıcı pacemaker implantasyonu"
    ],
    "question": "Bu çocukta uzun dönem yönetim için en uygun seçenek hangisidir?",
    "learningOutcome": "Okul çağı, yeterli kilo ve sık/acil başvuru gerektiren veya ilaçla kontrol edilemeyen SVT’de elektrofizyoloji çalışması ve kateter ablasyon güçlü bir seçenektir.",
    "clinicalFocus": "Rekürren okul çağı SVT’de ilaç tedavisi ile ablasyon endikasyonu arasındaki karar.",
    "riskContext": [
      "Sık acil başvurular yaşam kalitesini ve güvenliği etkiler.",
      "İlaç yan etkisi ve yetersiz kontrol ablasyon seçeneğini güçlendirir."
    ],
    "distinctiveClues": [
      "Ataklar ani başlıyor ve 220/dk düzenli taşikardi oluyor.",
      "Vagal yanıt/IV girişimle sonlanma AV nod bağımlı reentran SVT’yi destekliyor.",
      "İlaç tedavisine rağmen günlük atak var.",
      "Çocuk ablasyon için uygun yaş/kilo aralığında."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Atağ sırasında dar QRS’li düzenli taşikardi; sinüs ritminde yapısal anormallik yok.",
        "rows": [
          [
            "Ritim bulgusu",
            "Atağ sırasında dar QRS’li düzenli taşikardi; sinüs ritminde yapısal anormallik yok.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      },
      {
        "name": "Ekokardiyografi",
        "type": "Imaging",
        "why": "Yapısal kalp hastalığı ve ventrikül fonksiyonunu değerlendirmek için istenir.",
        "result": "Normal sistolik fonksiyon ve yapısal kalp hastalığı yok.",
        "rows": [
          [
            "Ventrikül fonksiyonu",
            "Normal sistolik fonksiyon ve yapısal kalp hastalığı yok.",
            "Yaşa uygun normal fonksiyon beklenir",
            "Klinik karar verdirici"
          ]
        ]
      }
    ],
    "whyCorrect": "Sık tekrarlayan, ilaçla kontrol edilemeyen ve acil başvurulara yol açan reentran SVT okul çağı çocukta ablasyon için uygun endikasyondur. Ablasyon ritim substratını ortadan kaldırarak uzun dönem çözüm sağlayabilir.",
    "wrongNotes": {
      "Ataklar günlük olsa da sadece yıllık kontrol": "Günlük ve semptomatik SVT izlemle geçiştirilemeyecek kadar sık ve yaşam kalitesini bozucudur.",
      "Kalsiyum kanal bloker dozunu sınırsız artırma": "Doz artışı yan etki ve güvenlik sınırlarıyla kısıtlıdır; hasta zaten yan etki yaşamaktadır.",
      "Egzersizi tamamen yasaklayıp tedavi vermeme": "Egzersizden kaçınma tek başına ritim substratını düzeltmez ve gereksiz kısıtlama yaratır.",
      "Kalıcı pacemaker implantasyonu": "Pacemaker bradikardi/iletim bloğu tedavisidir; reentran SVT’nin standart kalıcı tedavisi ablasyondur."
    },
    "pearls": [
      "Çocukta recurrent SVT, ilaç başarısızlığı veya sık acil başvuru varsa ablasyon düşünülür.",
      "Modern pediatrik ablasyonda üç boyutlu haritalama ile radyasyon azaltılabilir."
    ],
    "management": [
      "Aileyle tedavi seçeneklerini ve riskleri konuş.",
      "Elektrofizyoloji çalışması ve haritalama planla.",
      "Ablasyona kadar akut atak yönetimi ve vagal manevra eğitimi ver."
    ],
    "glossary": [
      "Kateter ablasyon",
      "AVRT",
      "AVNRT",
      "Elektrofizyoloji çalışması"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-persistent-mild-tachycardia-eat-010",
    "branchId": "pediatrics",
    "title": "Altı yaşında ateşten bağımsız kalıcı hafif taşikardi",
    "type": "Klasik vaka",
    "demographics": "6 yaşında kız çocuk",
    "setting": "Pediatri polikliniği",
    "chiefComplaint": "Kulak ağrısı sırasında beklenenden yüksek ve değişmeyen nabız.",
    "stem": "Sağ otit media nedeniyle başvuran çocukta ateş 37.4 °C olmasına rağmen kalp hızı 135/dk ve muayene boyunca değişmiyor. Anne son haftalarda çabuk yorulma ve gece öksürüğünden söz ediyor. Nabız dinlenme, dikkat dağılması veya sıvı alımıyla belirgin düşmüyor.",
    "vitals": {
      "TA": "96/60 mmHg",
      "Nabız": "135/dk",
      "Solunum": "22/dk",
      "SpO2": "%98",
      "Ateş": "37.4 °C"
    },
    "exam": [
      "Genel durum iyi ancak hafif yorgun görünüyor.",
      "Kalp ritmi düzenli ve sabit hızlı.",
      "Hafif hepatomegali var.",
      "Akciğer bazallerinde ince ral duyuluyor."
    ],
    "correct": "Ektopik atriyal taşikardiye bağlı kalıcı taşikardi",
    "options": [
      "Ektopik atriyal taşikardiye bağlı kalıcı taşikardi",
      "Ateşe fizyolojik sinüs taşikardisi",
      "Panik atak",
      "Ventriküler taşikardi",
      "Hipovolemiye bağlı kompansatuvar taşikardi"
    ],
    "question": "Bu olguda en olası ritim mekanizması hangisidir?",
    "learningOutcome": "Sabit, ısrarcı ve fizyolojik durumla değişmeyen hafif-orta taşikardi ektopik atriyal taşikardi gibi otomatik atriyal odakları düşündürür.",
    "clinicalFocus": "Kalıcı hafif taşikardide sinüs taşikardisi ile otomatik atriyal taşikardiyi ayırma.",
    "riskContext": [
      "Uzun süren taşikardi taşikardiye bağlı kardiyomiyopati riski taşır.",
      "Hafif enfeksiyon taşikardiyi açıklayamayacak kadar düşük ateşle seyreder."
    ],
    "distinctiveClues": [
      "Kalp hızı muayene boyunca sabit.",
      "Ateş düşük ve taşikardi düzeyini açıklamıyor.",
      "Yorgunluk ve hepatomegali kardiyak etkilenmeyi düşündürüyor.",
      "EKG’de P dalga aksı sinüs dışı."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Dar QRS’li düzenli taşikardi; P dalga morfolojisi sinüsle uyumlu değil ve hız değişkenliği az.",
        "rows": [
          [
            "Hız",
            "135/dk",
            "Yaşa göre yüksek",
            "Yüksek"
          ],
          [
            "P dalgası",
            "Sinüs aksı dışında",
            "Sinüs P aksı beklenir",
            "Ektopik odak"
          ],
          [
            "Hız değişkenliği",
            "Minimal",
            "Sinüste değişkenlik beklenir",
            "Patolojik"
          ]
        ]
      },
      {
        "name": "Ekokardiyografi",
        "type": "Imaging",
        "why": "Yapısal kalp hastalığı ve ventrikül fonksiyonunu değerlendirmek için istenir.",
        "result": "Hafif sol ventrikül sistolik fonksiyon azalması saptanır.",
        "rows": [
          [
            "Ventrikül fonksiyonu",
            "Hafif sol ventrikül sistolik fonksiyon azalması saptanır.",
            "Yaşa uygun normal fonksiyon beklenir",
            "Klinik karar verdirici"
          ]
        ]
      }
    ],
    "whyCorrect": "Ektopik atriyal taşikardi otomatik odaktan kaynaklandığı için hız ısrarcı olabilir ve katekolamin durumuyla sınırlı değişir. Uzamış taşikardi ventrikül fonksiyonunu bozabileceğinden kardiyoloji değerlendirmesi gerekir.",
    "wrongNotes": {
      "Ateşe fizyolojik sinüs taşikardisi": "Sinüs taşikardisi ateş, ağrı veya dehidratasyonla değişkenlik gösterir; burada hız sabit ve P aksı sinüs dışıdır.",
      "Panik atak": "Panik atak kısa süreli ve klinik bağlamla ilişkili olur; çocukta objektif EKG paternli kalıcı taşikardi var.",
      "Ventriküler taşikardi": "VT genellikle geniş QRS ve AV dissosiyasyonla düşünülür; QRS dar ve atriyal odak bulgusu var.",
      "Hipovolemiye bağlı kompansatuvar taşikardi": "Hipovolemide zayıf nabız ve sıvı yanıtı beklenir; hız sabitliği ve ektopik P dalgası farklıdır."
    },
    "pearls": [
      "Kalıcı hafif taşikardi masum görülmemelidir; EAT/PJRT kardiyomiyopati yapabilir.",
      "Adenosin otomatik atriyal taşikardiyi kalıcı olarak sonlandırmayabilir."
    ],
    "management": [
      "EKG ve Holter ile ritim yükünü belirle.",
      "Ekokardiyografiyle fonksiyonu değerlendir.",
      "Pediatrik elektrofizyoloji ile antiaritmik veya ablasyon planını tartış."
    ],
    "glossary": [
      "Ektopik atriyal taşikardi",
      "PJRT",
      "Taşikardiye bağlı kardiyomiyopati"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-adhd-screening-context-011",
    "branchId": "pediatrics",
    "title": "Stimulana başlamadan önce EKG ile tek başına kardiyak onay isteği",
    "type": "Adli-etik/Yönetim sorusu",
    "demographics": "8 yaşında erkek çocuk",
    "setting": "Kardiyoloji danışma hattı",
    "chiefComplaint": "ADHD tedavisi öncesi EKG yorumuyla hızlı kardiyak onay istenmesi.",
    "stem": "Anne, ADHD için başlanacak stimülan tedavi öncesinde yalnızca EKG raporunun imzalanmasını istiyor. Çocuk kardiyoloji tarafından hiç görülmemiş; efor senkopu, göğüs ağrısı ve ailede ani ölüm bilgileri henüz sistematik sorgulanmamış. EKG bilgisayar çıktısında belirgin acil ritim yazmıyor, ancak klinik bağlam bilinmiyor.",
    "vitals": {
      "TA": "102/64 mmHg",
      "Nabız": "88/dk",
      "Solunum": "18/dk",
      "SpO2": "%99",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Genel durum iyi.",
      "Kalp sesleri ritmik, patolojik üfürüm saptanmıyor.",
      "Femoral nabızlar simetrik.",
      "Marfanoid görünüm belirgin değil."
    ],
    "correct": "Sadece EKG’ye dayanarak onay vermeden kardiyak öykü, aile öyküsü ve muayene ile değerlendirme yapmak",
    "options": [
      "Sadece EKG’ye dayanarak onay vermeden kardiyak öykü, aile öyküsü ve muayene ile değerlendirme yapmak",
      "EKG normal görünüyorsa çocuğu görmeden sınırsız onay vermek",
      "Tüm çocuklarda stimülanları kesin kontrendike kabul etmek",
      "Sadece troponin bakarak kardiyak risk değerlendirmek",
      "Semptom sorgulamadan rutin kardiyak MR istemek"
    ],
    "question": "Bu durumda en uygun yaklaşım hangisidir?",
    "learningOutcome": "ADHD stimülanı öncesi kardiyak değerlendirme yalnız EKG çıktısının imzalanması değildir; semptom, aile öyküsü, fizik muayene ve EKG birlikte yorumlanmalıdır.",
    "clinicalFocus": "Kardiyak taramada testin klinik bağlam olmadan yanlış güven veya gereksiz alarm yaratabileceğini öğretir.",
    "riskContext": [
      "EKG bazı riskli hastalıkları gösterebilir ancak anomal koroner arter ve CPVT gibi durumlarda normal olabilir.",
      "Efor senkopu veya ailede ani ölüm varsa değerlendirme acilleşir."
    ],
    "distinctiveClues": [
      "Kardiyoloji muayenesi yapılmamış.",
      "Aile öyküsü ve efor semptomları bilinmiyor.",
      "EKG tek başına tüm ani ölüm risklerini dışlamaz."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Sinüs ritmi; belirgin preeksitasyon veya QT uzaması yok. Klinik öyküyle birlikte yorumlanması gerekir.",
        "rows": [
          [
            "Ritim bulgusu",
            "Sinüs ritmi; belirgin preeksitasyon veya QT uzaması yok. Klinik öyküyle birlikte yorumlanması gerekir.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      }
    ],
    "whyCorrect": "EKG taraması klinik bağlam olmadan hem yanlış güven hem de gereksiz ileri test doğurabilir. Kardiyak semptomlar, ailede ani ölüm ve fizik muayene ile birlikte değerlendirme yapılmadan “clearance” verilmemelidir.",
    "wrongNotes": {
      "EKG normal görünüyorsa çocuğu görmeden sınırsız onay vermek": "Normal EKG anomal koroner arter veya CPVT gibi riskleri dışlamaz; klinik bağlam gerekir.",
      "Tüm çocuklarda stimülanları kesin kontrendike kabul etmek": "Stimulantlar çoğu çocukta kullanılabilir; doğru yaklaşım risk taramasıdır, mutlak yasak değildir.",
      "Sadece troponin bakarak kardiyak risk değerlendirmek": "Troponin akut miyokart hasarını gösterir; kalıtsal aritmi veya yapısal risk taraması değildir.",
      "Semptom sorgulamadan rutin kardiyak MR istemek": "MR seçilmiş şüphelerde kullanılır; ilk basamak ayrıntılı öykü, muayene ve EKG’dir."
    },
    "pearls": [
      "Kardiyak taramada “klinik korelasyon” zorunludur.",
      "Efor senkopu, efor göğüs ağrısı ve ailede genç yaşta ani ölüm kırmızı bayraktır."
    ],
    "management": [
      "Ayrıntılı kişisel ve aile öyküsü al.",
      "Kardiyak muayene ve EKG’yi birlikte değerlendir.",
      "Kırmızı bayrak varsa pediatrik kardiyoloji/elektrofizyolojiye yönlendir."
    ],
    "glossary": [
      "ADHD stimülanları",
      "Kardiyak tarama",
      "Ani kardiyak ölüm"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-family-sudden-death-012",
    "branchId": "pediatrics",
    "title": "Babası genç yaşta ani ölen çocukta kalıtsal risk taraması",
    "type": "Klasik vaka",
    "demographics": "11 yaşında erkek çocuk",
    "setting": "Pediatri polikliniği",
    "chiefComplaint": "Ailede genç yaşta ani ölüm sonrası risk değerlendirmesi.",
    "stem": "Sağlıklı olduğu bilinen baba 40 yaşında beklenmedik şekilde yaşamını yitiriyor. Aile olayı “kalp krizi” olarak duymuş ancak bilinen koroner hastalık yok. Anne çocuğun risk taşıyıp taşımadığını soruyor; otopsi yapılıp yapılmadığı ve babadan genetik örnek alınıp alınmadığı bilinmiyor.",
    "vitals": {
      "TA": "106/66 mmHg",
      "Nabız": "82/dk",
      "Solunum": "18/dk",
      "SpO2": "%99",
      "Ateş": "36.5 °C"
    },
    "exam": [
      "Çocuk iyi görünüyor.",
      "Kalp sesleri ritmik, patolojik üfürüm yok.",
      "Marfanoid görünüm veya belirgin cilt bulgusu yok.",
      "Nörolojik muayene normal."
    ],
    "correct": "Birinci derece akrabada genç ani ölüm nedeniyle kardiyoloji ve kalıtsal aritmi/kardiyomiyopati taraması",
    "options": [
      "Birinci derece akrabada genç ani ölüm nedeniyle kardiyoloji ve kalıtsal aritmi/kardiyomiyopati taraması",
      "Çocuk asemptomatikse hiçbir değerlendirme yapmamak",
      "Sadece lipit paneli ile koroner risk taraması yapmak",
      "Tüm aileye ampirik beta bloker başlamak",
      "Önce çocuğa invaziv elektrofizyoloji çalışması yapmak"
    ],
    "question": "Bu çocuk için en uygun yaklaşım hangisidir?",
    "learningOutcome": "Genç yaşta açıklanamayan ani ölüm birinci derece akrabalarda kalıtsal kardiyomiyopati veya kanalopati taraması gerektirir.",
    "clinicalFocus": "Ailede ani ölümde proband bilgisi, otopsi, mor kapaklı kan örneği ve akraba taramasının önemi.",
    "riskContext": [
      "Babanın bilinen kardiyak öyküsüz ani ölümü kalıtsal hastalık ihtimalini artırır.",
      "Ölen kişiden uygun örnek alınması ailede genetik tanıyı kolaylaştırır."
    ],
    "distinctiveClues": [
      "Birinci derece akraba ani ve genç yaşta ölmüş.",
      "Olay nedeni net değil ve otopsi/genetik bilgi yok.",
      "Çocuk asemptomatik olsa da risk dışlanamaz."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Sinüs ritmi, QTc 420 ms, preeksitasyon yok.",
        "rows": [
          [
            "Ritim bulgusu",
            "Sinüs ritmi, QTc 420 ms, preeksitasyon yok.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      },
      {
        "name": "Ekokardiyografi",
        "type": "Imaging",
        "why": "Yapısal kalp hastalığı ve ventrikül fonksiyonunu değerlendirmek için istenir.",
        "result": "Normal duvar kalınlığı ve sistolik fonksiyon izlenir.",
        "rows": [
          [
            "Ventrikül fonksiyonu",
            "Normal duvar kalınlığı ve sistolik fonksiyon izlenir.",
            "Yaşa uygun normal fonksiyon beklenir",
            "Klinik karar verdirici"
          ]
        ]
      },
      {
        "name": "Aile/proband genetik değerlendirme planı",
        "type": "Genetic",
        "why": "Kalıtsal kardiyomiyopati ve kanalopati olasılığını araştırmak için planlanır.",
        "result": "Ölen kişiden mor kapaklı tüpte saklanmış kan varsa hedefli genetik analiz önerilir; yoksa çocuk ve aile fenotip taraması ile izlenir.",
        "rows": [
          [
            "Hedef",
            "Proband örneği",
            "Mümkünse öncelikli",
            "Tanısal verim yüksek"
          ],
          [
            "Akraba taraması",
            "EKG + EKO ± egzersiz testi",
            "Birinci derece akrabalarda önerilir",
            "Gerekli"
          ]
        ]
      }
    ],
    "whyCorrect": "Açıklanamayan genç ani ölüm HCM, uzun QT, Brugada, CPVT ve aritmojenik kardiyomiyopati gibi kalıtsal durumların ilk bulgusu olabilir. Çocuk asemptomatik olsa da yapılandırılmış kardiyoloji değerlendirmesi gerekir.",
    "wrongNotes": {
      "Çocuk asemptomatikse hiçbir değerlendirme yapmamak": "Kalıtsal hastalıklar ilk olaya kadar sessiz olabilir; aile öyküsü tek başına tarama endikasyonudur.",
      "Sadece lipit paneli ile koroner risk taraması yapmak": "Koroner risk değerlendirmesi genç ani ölümde tek başına yeterli değildir; kanalopati/kardiyomiyopati taranmalıdır.",
      "Tüm aileye ampirik beta bloker başlamak": "Tedavi tanıya göre verilir; fenotip veya genetik tanı olmadan tüm aileye ampirik ilaç doğru değildir.",
      "Önce çocuğa invaziv elektrofizyoloji çalışması yapmak": "İlk basamak noninvaziv fenotip taraması ve proband bilgisidir; EPS seçilmiş durumlarda düşünülür."
    },
    "pearls": [
      "Genç ani ölümde birinci derece akrabalar kardiyoloji tarafından değerlendirilir.",
      "Probanddan saklanan EDTA’lı kan genetik tanı için çok değerlidir."
    ],
    "management": [
      "Olayın ayrıntılarını, otopsi raporunu ve varsa tıbbi kayıtları topla.",
      "Çocuğa EKG, EKO ve gerekirse egzersiz/Holter planla.",
      "Genetik danışmanlık ve aile taraması organize et."
    ],
    "glossary": [
      "Kanalopati",
      "Hipertrofik kardiyomiyopati",
      "CPVT",
      "Proband"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-asymptomatic-wpw-013",
    "branchId": "pediatrics",
    "title": "Asemptomatik çocukta EKG’de ventriküler preeksitasyon",
    "type": "Klasik vaka",
    "demographics": "7 yaşında erkek çocuk",
    "setting": "Kardiyoloji polikliniği",
    "chiefComplaint": "ADHD öncesi EKG’de ventriküler preeksitasyon saptanması.",
    "stem": "Psikiyatri kontrolünde çekilen EKG’de kısa PR aralığı, delta dalgası ve genişlemiş QRS görülüyor. Çocuk çarpıntı veya senkop tariflemiyor. Aile stimülan tedaviye başlanıp başlanamayacağını soruyor.",
    "vitals": {
      "TA": "100/62 mmHg",
      "Nabız": "86/dk",
      "Solunum": "18/dk",
      "SpO2": "%99",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Genel durum iyi.",
      "Kalp sesleri ritmik ve üfürüm yok.",
      "Perfüzyon normal."
    ],
    "correct": "Asemptomatik Wolff-Parkinson-White paterni için pediatrik kardiyoloji/elektrofizyoloji risk değerlendirmesi",
    "options": [
      "Asemptomatik Wolff-Parkinson-White paterni için pediatrik kardiyoloji/elektrofizyoloji risk değerlendirmesi",
      "EKG makine yorumu olduğu için bulguyu tamamen yok saymak",
      "Preeksitasyon varken AV nod blokeriyle atriyal fibrilasyonu tedavi etmek",
      "Aile taraması için tüm akrabalara rutin EKG zorunlu tutmak",
      "Semptom yoksa hiçbir bilgilendirme yapmadan stimülana başlamak"
    ],
    "question": "Bu çocukta en uygun yaklaşım hangisidir?",
    "learningOutcome": "EKG’de preeksitasyon varsa çocuk asemptomatik olsa bile WPW paterni doğrulanmalı ve aksesuar yol riskine göre değerlendirme yapılmalıdır.",
    "clinicalFocus": "WPW’de delta dalgası, AVRT ve preeksitasyonlu atriyal fibrilasyon riskinin ayrımı.",
    "riskContext": [
      "WPW çoğu kez sporadik olabilir.",
      "Preeksitasyonlu atriyal fibrilasyon nadir ama yaşamı tehdit edici olabilir."
    ],
    "distinctiveClues": [
      "Kısa PR aralığı ve delta dalgası var.",
      "QRS sinüs ritminde preeksitasyonla genişliyor.",
      "Semptom yokluğu riski tamamen dışlamıyor."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "PR kısa, delta dalgası mevcut, QRS geniş; ventriküler preeksitasyon ile uyumlu.",
        "rows": [
          [
            "PR",
            "90 ms",
            "Yaşa göre kısa",
            "Kısa"
          ],
          [
            "QRS",
            "120 ms",
            "Dar olması beklenir",
            "Geniş"
          ],
          [
            "Delta dalgası",
            "Mevcut",
            "Normalde yok",
            "Preeksitasyon"
          ]
        ]
      },
      {
        "name": "Ekokardiyografi",
        "type": "Imaging",
        "why": "Yapısal kalp hastalığı ve ventrikül fonksiyonunu değerlendirmek için istenir.",
        "result": "Yapısal kalp hastalığı ve ventrikül disfonksiyonu saptanmaz.",
        "rows": [
          [
            "Ventrikül fonksiyonu",
            "Yapısal kalp hastalığı ve ventrikül disfonksiyonu saptanmaz.",
            "Yaşa uygun normal fonksiyon beklenir",
            "Klinik karar verdirici"
          ]
        ]
      }
    ],
    "whyCorrect": "Kısa PR, delta dalgası ve geniş QRS aksesuar yol üzerinden ventriküler preeksitasyonu gösterir. Asemptomatik WPW’de bile ani hızlı iletim riski değerlendirilmeli ve aileye AVRT/preeksitasyonlu AF belirtileri anlatılmalıdır.",
    "wrongNotes": {
      "EKG makine yorumu olduğu için bulguyu tamamen yok saymak": "Makine yorumu doğrulanmalıdır ancak kısa PR ve delta dalgası gerçekse klinik önemi vardır.",
      "Preeksitasyon varken AV nod blokeriyle atriyal fibrilasyonu tedavi etmek": "Preeksitasyonlu AF’de AV nod blokerleri aksesuar yoldan iletimi artırabilir; bu güvenli değildir.",
      "Aile taraması için tüm akrabalara rutin EKG zorunlu tutmak": "WPW çoğu kez sporadiktir; aile taraması her olguda zorunlu değildir.",
      "Semptom yoksa hiçbir bilgilendirme yapmadan stimülana başlamak": "Semptom yokluğu değerlendirme gereksinimini kaldırmaz; kardiyoloji görüşü alınmalıdır."
    },
    "pearls": [
      "WPW paterninde kısa PR + delta dalgası + geniş QRS beklenir.",
      "Preeksitasyonlu AF düzensiz, çok hızlı ve geniş kompleks taşikardi yapabilir."
    ],
    "management": [
      "EKG’yi kardiyolojiyle doğrula.",
      "Semptom ve aile öyküsünü ayrıntılandır.",
      "Risk değerlendirmesine göre egzersiz testi, Holter veya EPS/ablasyon görüş."
    ],
    "glossary": [
      "Wolff-Parkinson-White",
      "Delta dalgası",
      "Preeksitasyon",
      "Aksesuar yol"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-antiarrhythmic-overdose-014",
    "branchId": "pediatrics",
    "title": "Kalp ilacı alımı sonrası bradikardi ve hipotansiyon",
    "type": "Acil yönetim sorusu",
    "demographics": "15 yaşında kız hasta",
    "setting": "Acil servis",
    "chiefComplaint": "İlaç alımı sonrası bilinç azalması, bradikardi ve hipotansiyon.",
    "stem": "Hasta ailesi tarafından boş kalp ilacı kutularıyla bulunuyor. İkinci intihar girişimi olduğu belirtiliyor. Bilinci ağrılı uyarana yanıt düzeyinde, nabız 40/dk ve kan basıncı düşük. Alınan ilacın beta bloker veya kalsiyum kanal blokeri olabileceği düşünülüyor.",
    "vitals": {
      "TA": "92/50 mmHg",
      "Nabız": "40/dk",
      "Solunum": "14/dk",
      "SpO2": "%96",
      "Ateş": "36.4 °C"
    },
    "exam": [
      "Bilinç depresyonu var.",
      "Periferik nabızlar zayıf, kapiller dolum 4 saniye.",
      "Cilt soğuk ve soluk.",
      "Kalp sesleri bradikardik duyuluyor."
    ],
    "correct": "Zehir danışma ile yoğun bakım düzeyinde destek, EKG/lab izlemi ve hedefe yönelik antidot/tedavi",
    "options": [
      "Zehir danışma ile yoğun bakım düzeyinde destek, EKG/lab izlemi ve hedefe yönelik antidot/tedavi",
      "Psikiyatri görüşünü tek başına yeterli görüp kardiyak izlemi bırakmak",
      "Sadece oral sıvı verip gözlem yapmak",
      "Tüm olgularda adenosin uygulamak",
      "Taburculuk öncesi EKG çekmemek"
    ],
    "question": "Bu hastada en uygun ilk yaklaşım hangisidir?",
    "learningOutcome": "Antiaritmik/beta bloker/kalsiyum kanal bloker alımında bradikardi ve hipotansiyon kardiyojenik şok habercisidir; zehir danışma, yoğun kardiyak monitorizasyon ve hedefe yönelik tedavi gerekir.",
    "clinicalFocus": "Kardiyak ilaç intoksikasyonunda EKG paternleri ve toksikoloji temelli destek tedavisi.",
    "riskContext": [
      "İntihar girişimi tıbbi stabilizasyon sonrası psikiyatrik güvenlik değerlendirmesi gerektirir.",
      "Uzun salınımlı ilaçlar gecikmiş toksisite yapabilir."
    ],
    "distinctiveClues": [
      "Bradikardi ve hipotansiyon birlikte.",
      "Bilinç azalması perfüzyon etkilenmesini gösteriyor.",
      "Boş kalp ilacı kutuları kardiyotoksik alımı düşündürüyor."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Sinüs bradikardisi, PR uzaması; QRS genişliği ve QTc seri olarak izlenir.",
        "rows": [
          [
            "Hız",
            "40/dk",
            "Yaşa göre düşük",
            "Düşük"
          ],
          [
            "PR",
            "240 ms",
            "<200 ms",
            "Uzun"
          ],
          [
            "QRS",
            "96 ms",
            "<120 ms",
            "Şimdilik dar"
          ],
          [
            "QTc",
            "460 ms",
            "<450 ms",
            "Sınırda yüksek"
          ]
        ]
      },
      {
        "name": "Kan gazı, laktat, glukoz ve elektrolitler",
        "type": "Lab",
        "why": "Şok, metabolik bozulma ve ilaç etkilerini değerlendirmek için istenir.",
        "result": "Laktat yüksek, glukoz düşük-sınırda, potasyum normal saptanır.",
        "rows": [
          [
            "Laktat",
            "4.2 mmol/L",
            "<2 mmol/L",
            "Yüksek"
          ],
          [
            "Glukoz",
            "62 mg/dL",
            "70–100 mg/dL",
            "Düşük"
          ],
          [
            "Potasyum",
            "4.8 mEq/L",
            "3.5–5.1 mEq/L",
            "Referans içinde"
          ]
        ]
      }
    ],
    "whyCorrect": "Bu tablo öncelikle yaşamı tehdit eden kardiyotoksik ilaç alımı olarak yönetilir. Destek tedavisi, ritim ve hemodinami izlemi, toksikoloji önerileri ve gerekirse yüksek doz insülin euglisemik tedavi, vazopressör, kalsiyum veya spesifik antidotlar düşünülür.",
    "wrongNotes": {
      "Psikiyatri görüşünü tek başına yeterli görüp kardiyak izlemi bırakmak": "Psikiyatrik değerlendirme şarttır ancak önce kardiyak toksisite ve şok stabilize edilmelidir.",
      "Sadece oral sıvı verip gözlem yapmak": "Hipotansiyon ve bilinç azalması yoğun bakım düzeyinde destek gerektirir.",
      "Tüm olgularda adenosin uygulamak": "Adenosin SVT için kullanılır; bradikardi ve blokla seyreden toksisitede uygun değildir.",
      "Taburculuk öncesi EKG çekmemek": "EKG toksisite paternini ve düzelmeyi izlemek için temel testtir."
    },
    "pearls": [
      "Beta bloker aşırı dozunda bradikardi, PR uzaması ve AV blok görülebilir.",
      "Kalsiyum kanal blokeri bradikardi, AV blok, hipotansiyon ve asistol riski taşır.",
      "Sodyum kanal blokeri QRS genişletir; potasyum kanal blokeri QT uzatır ve torsades riski yaratır."
    ],
    "management": [
      "Havayolu, solunum ve dolaşımı stabilize et.",
      "Zehir danışma/toksikoloji ve yoğun bakım ile eş zamanlı yönet.",
      "Seri EKG, glukoz, elektrolit, laktat ve organ fonksiyonlarını izle.",
      "Tıbbi stabilizasyon sonrası psikiyatrik güvenlik değerlendirmesi yap."
    ],
    "glossary": [
      "Beta bloker toksisitesi",
      "Kalsiyum kanal bloker toksisitesi",
      "Yüksek doz insülin euglisemik tedavi",
      "Antidigoksin Fab"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-athlete-pvc-015",
    "branchId": "pediatrics",
    "title": "Spor muayenesinde saptanan prematür ventriküler atımlar",
    "type": "Klasik vaka",
    "demographics": "16 yaşında erkek sporcu",
    "setting": "Spor katılım muayenesi",
    "chiefComplaint": "Rutin muayenede düzensiz nabız.",
    "stem": "Yıllardır sağlıklı olan adölesan sporcu katılım muayenesinde aralıklı düzensiz nabızla fark ediliyor. Çarpıntı, senkop, göğüs ağrısı veya eforla kötüleşme tariflemiyor. Ailede genç yaşta ani ölüm yok.",
    "vitals": {
      "TA": "116/70 mmHg",
      "Nabız": "72/dk",
      "Solunum": "14/dk",
      "SpO2": "%99",
      "Ateş": "36.5 °C"
    },
    "exam": [
      "Genel durum iyi.",
      "Kalp oskültasyonunda aralıklı erken atım sonrası duraklama duyuluyor.",
      "Üfürüm yok.",
      "Egzersiz sonrası atım sıklığı azalıyor."
    ],
    "correct": "Sağlıklı yapısal kalpte düşük yükte benign PVC değerlendirmesi",
    "options": [
      "Sağlıklı yapısal kalpte düşük yükte benign PVC değerlendirmesi",
      "Her PVC’de spordan kalıcı men",
      "Acil ICD implantasyonu",
      "Atrial fibrilasyon tanısı",
      "Tedavisiz ve EKG’siz onay"
    ],
    "question": "Bu sporcu için en uygun yorum ve yaklaşım hangisidir?",
    "learningOutcome": "Asemptomatik sporcuda PVC saptanırsa EKG, Holter, egzersiz yanıtı ve ekokardiyografi ile yapısal/elektriksel risk dışlanmalıdır; düşük yük ve egzersizde azalma benignliği destekler.",
    "clinicalFocus": "Adölesan sporcuda PVC’nin benign özellikleri ile kırmızı bayraklarının ayrımı.",
    "riskContext": [
      "Egzersizde artan PVC veya senkop daha risklidir.",
      "Yüksek PVC yükü ventrikül fonksiyonunu bozabilir."
    ],
    "distinctiveClues": [
      "Semptom yok.",
      "Ailede ani ölüm yok.",
      "PVC egzersizde artmak yerine azalıyor.",
      "EKO normal."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Sinüs ritminde monomorfik PVC’ler; QTc normal.",
        "rows": [
          [
            "Ritim bulgusu",
            "Sinüs ritminde monomorfik PVC’ler; QTc normal.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      },
      {
        "name": "Holter ve egzersiz testi",
        "type": "Monitor",
        "why": "PVC yükünü ve egzersizle davranışını belirlemek için istenir.",
        "result": "PVC yükü %3, egzersizle baskılanıyor, NSVT yok.",
        "rows": [
          [
            "PVC yükü",
            "%3",
            "Yüksek yük genellikle >10–15% ile önem kazanır",
            "Düşük"
          ],
          [
            "Egzersiz yanıtı",
            "Baskılanıyor",
            "Artış risklidir",
            "Benign lehine"
          ],
          [
            "NSVT",
            "Saptanmadı",
            "Saptanmamalı",
            "Normal"
          ]
        ]
      },
      {
        "name": "Ekokardiyografi",
        "type": "Imaging",
        "why": "Yapısal kalp hastalığı ve ventrikül fonksiyonunu değerlendirmek için istenir.",
        "result": "Normal yapı ve fonksiyon.",
        "rows": [
          [
            "Ventrikül fonksiyonu",
            "Normal yapı ve fonksiyon.",
            "Yaşa uygun normal fonksiyon beklenir",
            "Klinik karar verdirici"
          ]
        ]
      }
    ],
    "whyCorrect": "Düşük yükte, monomorfik, egzersizle azalan PVC ve normal EKO benign patern lehinedir. Ancak spor onayı öncesi ritim yükü ve yapısal kalp hastalığı dışlanmadan “önemsiz” denmemelidir.",
    "wrongNotes": {
      "Her PVC’de spordan kalıcı men": "Risk değerlendirmesi normal ve benign özellikler varsa kalıcı men gerekli değildir.",
      "Acil ICD implantasyonu": "ICD malign ventriküler aritmi riski yüksek tanılarda düşünülür; izole benign PVC için değildir.",
      "Atrial fibrilasyon tanısı": "AF düzensiz düzensiz ritim ve P dalgasız bazal aktiviteyle seyreder; burada erken ventriküler atımlar var.",
      "Tedavisiz ve EKG’siz onay": "Sporcu değerlendirmesinde PVC belgelenmeli ve kırmızı bayraklar dışlanmalıdır."
    },
    "pearls": [
      "PVC egzersizde artıyorsa veya polimorfikse risk değerlendirmesi genişler.",
      "Normal EKO ve düşük Holter yükü benignliği destekler."
    ],
    "management": [
      "EKG, Holter, egzersiz testi ve EKO ile değerlendir.",
      "Kırmızı bayrak yoksa spor katılımını bireyselleştir.",
      "Yüksek yük, NSVT veya disfonksiyon varsa kardiyoloji/elektrofizyoloji takibi planla."
    ],
    "glossary": [
      "PVC",
      "NSVT",
      "Holter",
      "Sporcu taraması"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-vasovagal-syncope-line-016",
    "branchId": "pediatrics",
    "title": "Öğle sırasında ayakta beklerken senkop",
    "type": "TUS Spot Olgu",
    "demographics": "13 yaşında kız öğrenci",
    "setting": "Okul reviri / acil değerlendirme",
    "chiefComplaint": "Ayakta beklerken bayılma.",
    "stem": "Öğle yemeği sırasında uzun süre sırada bekleyen hasta baş dönmesi, bulantı, görmede kararma ve sıcak basması sonrası kısa süreli bayılıyor. Yere yatırıldıktan sonra hızla kendine geliyor. Olay egzersiz sırasında değil; göğüs ağrısı veya ailede ani ölüm yok.",
    "vitals": {
      "TA": "104/66 mmHg",
      "Nabız": "78/dk",
      "Solunum": "16/dk",
      "SpO2": "%99",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Genel durum iyi.",
      "Kalp ve nörolojik muayene normal.",
      "Ortostatik yakınma hafif provake oluyor."
    ],
    "correct": "Vazovagal/nörokardiyojenik senkop",
    "options": [
      "Vazovagal/nörokardiyojenik senkop",
      "Egzersizle tetiklenen ani kardiyak ölüm eşdeğeri senkop",
      "Epileptik nöbet",
      "Hipoglisemik koma",
      "Aort stenozu"
    ],
    "question": "Bu olguda en olası tanı hangisidir?",
    "learningOutcome": "Uzun süre ayakta durma, prodromal bulgular ve hızlı toparlanma vazovagal senkop için tipiktir.",
    "clinicalFocus": "Benign senkop paternini egzersiz senkopu ve nöbetten ayırma.",
    "riskContext": [
      "Dehidratasyon ve uzun süre ayakta kalma vazovagal senkopu tetikleyebilir.",
      "Egzersiz sırasında senkop kardiyak açıdan kırmızı bayraktır."
    ],
    "distinctiveClues": [
      "Ayakta bekleme tetikleyici.",
      "Bulantı, kararma ve sıcak basması prodromu var.",
      "Yatınca hızla toparlıyor.",
      "Egzersiz ilişkisi ve ailede ani ölüm yok."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Sinüs ritmi, QTc normal, preeksitasyon yok.",
        "rows": [
          [
            "Ritim bulgusu",
            "Sinüs ritmi, QTc normal, preeksitasyon yok.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      }
    ],
    "whyCorrect": "Klasik prodrom, ortostatik tetikleyici ve hızlı toparlanma vazovagal senkop lehinedir. Egzersiz sırasında ani çökme, göğüs ağrısı, anormal EKG veya ailede ani ölüm olsaydı kardiyak değerlendirme öncelikli olurdu.",
    "wrongNotes": {
      "Egzersizle tetiklenen ani kardiyak ölüm eşdeğeri senkop": "Kardiyak senkop özellikle efor sırasında veya hemen sonrasında prodromsuz gelişir; olay yemek sırasında ayakta beklerken olmuştur.",
      "Epileptik nöbet": "Nöbette uzun postiktal dönem, dil ısırma veya tonik-klonik aktivite beklenebilir; burada tipik presenkop var.",
      "Hipoglisemik koma": "Hipoglisemi kalıcı bilinç bozukluğu ve düşük glukozla desteklenir; hasta hızla normale dönmüştür.",
      "Aort stenozu": "Efor senkopu ve sistolik üfürüm beklenir; muayene normaldir."
    },
    "pearls": [
      "Vazovagal senkopta prodrom tanıyı destekler.",
      "Efor sırasında senkop kardiyak hastalık dışlanana kadar ciddiye alınır."
    ],
    "management": [
      "Sıvı-tuz alımını artır, uzun ayakta kalmaktan kaçınma ve prodromda oturma/uzanmayı öğret.",
      "EKG ile kırmızı bayrakları dışla.",
      "Tekrarlayan veya kırmızı bayraklı olguları kardiyolojiye yönlendir."
    ],
    "glossary": [
      "Vazovagal senkop",
      "Prodrom",
      "Ortostatik intolerans"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-cross-country-syncope-017",
    "branchId": "pediatrics",
    "title": "Kros koşusunda sıcak havada senkop",
    "type": "Klasik vaka",
    "demographics": "14 yaşında kız koşucu",
    "setting": "Acil servis",
    "chiefComplaint": "Yarış sırasında bayılma.",
    "stem": "Hasta sıcak ve nemli havada kros yarışının son bölümünde baş dönmesi, susuzluk ve halsizlik hissettikten sonra yavaşlayıp bayılıyor. Nabız hızlı, vücut ısısı hafif yüksek ve belirgin göğüs ağrısı yok. Ailede ani ölüm bildirilmiyor ancak olay egzersiz sırasında olduğu için kardiyak nedenler dışlanmak isteniyor.",
    "vitals": {
      "TA": "100/62 mmHg",
      "Nabız": "118/dk",
      "Solunum": "22/dk",
      "SpO2": "%98",
      "Ateş": "38.1 °C"
    },
    "exam": [
      "Terli ve yorgun görünüyor.",
      "Kalp sesleri ritmik, üfürüm yok.",
      "Nörolojik fokal defisit yok.",
      "Ortostatik yakınma var."
    ],
    "correct": "Isı/dehidratasyonla ilişkili egzersiz senkopu; kardiyak kırmızı bayrakların dışlanması gerekir",
    "options": [
      "Isı/dehidratasyonla ilişkili egzersiz senkopu; kardiyak kırmızı bayrakların dışlanması gerekir",
      "Kesin epilepsi tanısı",
      "Panik atak",
      "Asemptomatik WPW tanısı",
      "Bakteriyel sepsis"
    ],
    "question": "Bu olguda en uygun değerlendirme yorumu hangisidir?",
    "learningOutcome": "Sıcak hava, dehidratasyon ve prodrom ısı/dehidratasyon ilişkili senkopu destekler; yine de egzersiz sırasında senkop kardiyak nedenler dışlanana kadar değerlendirilmelidir.",
    "clinicalFocus": "Egzersizle ilişkili senkopta benign çevresel tetikleyici ile kardiyak riskin birlikte ele alınması.",
    "riskContext": [
      "Egzersiz sırasında senkop kardiyak açıdan kırmızı bayraktır.",
      "Sıcak hava ve sıvı kaybı vazovagal/ısı ilişkili senkopu kolaylaştırır."
    ],
    "distinctiveClues": [
      "Sıcak ve nemli yarış koşulları var.",
      "Prodrom ve yavaşlama gelişmiş.",
      "Muayenede üfürüm veya ailede ani ölüm yok.",
      "EKG normal."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Sinüs taşikardisi, QTc 420 ms, ST-T patolojisi ve preeksitasyon yok.",
        "rows": [
          [
            "Ritim bulgusu",
            "Sinüs taşikardisi, QTc 420 ms, ST-T patolojisi ve preeksitasyon yok.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      },
      {
        "name": "Temel metabolik panel ve CK",
        "type": "Lab",
        "why": "Isı stresi, dehidratasyon ve kas hasarını değerlendirmek için istenir.",
        "result": "Sodyum normal, kreatinin normal, CK hafif yüksek.",
        "rows": [
          [
            "Sodyum",
            "138 mEq/L",
            "135–145 mEq/L",
            "Normal"
          ],
          [
            "Kreatinin",
            "0.8 mg/dL",
            "0.5–1.0 mg/dL",
            "Normal"
          ],
          [
            "CK",
            "420 U/L",
            "<200 U/L",
            "Hafif yüksek"
          ]
        ]
      }
    ],
    "whyCorrect": "Olguda çevresel tetikleyici ve prodrom benign mekanizmayı destekler. Ancak senkopun egzersiz sırasında olması nedeniyle EKG ve gerekirse kardiyoloji değerlendirmesi olmadan spor dönüş kararı verilmemelidir.",
    "wrongNotes": {
      "Kesin epilepsi tanısı": "Prodrom, sıcaklık ve hızlı toparlanma epilepsi yerine senkopu destekler; nöbet bulgusu yok.",
      "Panik atak": "Panik atak egzersiz sırasında gerçek senkop ve ısı stresiyle açıklanmaz.",
      "Asemptomatik WPW tanısı": "EKG’de preeksitasyon bulgusu yoktur.",
      "Bakteriyel sepsis": "Ateş hafif ısı stresi ile uyumludur; enfeksiyon odağı ve sepsis bulguları yok."
    },
    "pearls": [
      "Egzersiz senkopu mutlaka ciddiye alınır.",
      "Prodrom ve çevresel tetikleyici benignliği desteklese de EKG ilk taramadır."
    ],
    "management": [
      "Soğutma, sıvı replasmanı ve klinik izlem yap.",
      "EKG ve kırmızı bayrak taraması tamamlanana kadar spora dönüşü ertele.",
      "Tekrarlayan, prodromsuz veya anormal EKG varsa kardiyolojiye yönlendir."
    ],
    "glossary": [
      "Egzersiz senkopu",
      "Isı hastalığı",
      "QTc"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-athlete-collapse-018",
    "branchId": "pediatrics",
    "title": "Futbol sırasında ani kollaps",
    "type": "Acil yönetim sorusu",
    "demographics": "16 yaşında erkek sporcu",
    "setting": "Acil servis",
    "chiefComplaint": "Müsabaka sırasında ani bayılma.",
    "stem": "Futbol turnuvasında koşarken prodrom olmadan aniden yere yığılan hasta kısa süreli bilinç kaybı yaşıyor. Tanıklar düşmeden hemen önce göğsünü tuttuğunu söylüyor. Ailede genç yaşta ani ölüm net değil; olay dinlenme sırasında değil, yoğun egzersiz sırasında gelişmiş.",
    "vitals": {
      "TA": "108/68 mmHg",
      "Nabız": "96/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Genel durum acilde düzelmiş.",
      "Kalp sesleri ritmik; belirgin üfürüm yok.",
      "Nörolojik fokal defisit yok."
    ],
    "correct": "Kardiyak neden dışlanana kadar ani kardiyak arrest eşdeğeri kabul edilip monitörize yatış ve kapsamlı değerlendirme",
    "options": [
      "Kardiyak neden dışlanana kadar ani kardiyak arrest eşdeğeri kabul edilip monitörize yatış ve kapsamlı değerlendirme",
      "Vazovagal senkop denilerek hemen spora döndürme",
      "Sadece hidrasyon önerip taburcu etme",
      "Psikojenik bayılma tanısı koyma",
      "Rutin EEG ile değerlendirmeyi sınırlama"
    ],
    "question": "Bu sporcu için en doğru ilk yaklaşım hangisidir?",
    "learningOutcome": "Egzersiz sırasında prodromsuz kollaps kardiyak hastalık dışlanana kadar yüksek riskli kabul edilir; EKG, EKO, laboratuvar ve monitörize yatış gerekir.",
    "clinicalFocus": "Sporcuda efor sırasında senkopun kardiyak kırmızı bayrak olduğunu vurgular.",
    "riskContext": [
      "Hipertrofik kardiyomiyopati, anomal koroner arter, uzun QT, CPVT, ARVC ve miyokardit dışlanmalıdır.",
      "Tanı netleşene kadar rekabetçi spordan uzak durmalıdır."
    ],
    "distinctiveClues": [
      "Senkop egzersiz sırasında gelişmiş.",
      "Prodrom yok veya çok kısa.",
      "Olay ani çökme şeklinde.",
      "Aile öyküsü belirsiz ve risk dışlanmamış."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Sinüs ritmi; repolarizasyon ve QTc kardiyoloji tarafından değerlendirilmelidir.",
        "rows": [
          [
            "Ritim bulgusu",
            "Sinüs ritmi; repolarizasyon ve QTc kardiyoloji tarafından değerlendirilmelidir.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      },
      {
        "name": "Ekokardiyografi",
        "type": "Imaging",
        "why": "Yapısal kalp hastalığı ve ventrikül fonksiyonunu değerlendirmek için istenir.",
        "result": "Başlangıç EKO yapısal hastalık taraması için planlanır.",
        "rows": [
          [
            "Ventrikül fonksiyonu",
            "Başlangıç EKO yapısal hastalık taraması için planlanır.",
            "Yaşa uygun normal fonksiyon beklenir",
            "Klinik karar verdirici"
          ]
        ]
      }
    ],
    "whyCorrect": "Efor sırasında ani kollaps benign vazovagal olay kabul edilemez. Tanı netleşene kadar kardiyak izlem, EKG/EKO ve ileri testlerle yaşamı tehdit eden nedenler araştırılmalıdır.",
    "wrongNotes": {
      "Vazovagal senkop denilerek hemen spora döndürme": "Vazovagal senkop daha çok ayakta bekleme ve prodromla olur; egzersiz içi prodromsuz kollaps kırmızı bayraktır.",
      "Sadece hidrasyon önerip taburcu etme": "Hidrasyon benign senkopta yararlı olabilir ama bu olayda kardiyak neden dışlanmamıştır.",
      "Psikojenik bayılma tanısı koyma": "Psikojenik nedenler dışlama tanısıdır; efor sırasında ani kollaps öncelikle organik/kardiyak değerlendirme gerektirir.",
      "Rutin EEG ile değerlendirmeyi sınırlama": "Nöbet ayırıcı tanıda olabilir fakat kardiyak kırmızı bayraklar önceliklidir."
    },
    "pearls": [
      "Efor sırasında senkop aksi kanıtlanana kadar kardiyak kabul edilir.",
      "Spora dönüş kararı tanı ve risk değerlendirmesinden sonra verilir."
    ],
    "management": [
      "Monitörize yatış ve pediatrik kardiyoloji/elektrofizyoloji konsültasyonu yap.",
      "EKG, EKO, laboratuvar ve gerekirse egzersiz testi/MR/genetik değerlendirme planla.",
      "Tanı netleşene kadar rekabetçi sporu kısıtla."
    ],
    "glossary": [
      "Ani kardiyak arrest",
      "CPVT",
      "ARVC",
      "Hipertrofik kardiyomiyopati"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-adolescent-atrial-fibrillation-019",
    "branchId": "pediatrics",
    "title": "Adölesanda düzensiz düzensiz çarpıntı",
    "type": "Klasik vaka",
    "demographics": "17 yaşında erkek hasta",
    "setting": "Acil servis",
    "chiefComplaint": "Ani başlayan çarpıntı ve düzensiz nabız.",
    "stem": "Hasta birkaç saattir süren çarpıntı nedeniyle acile geliyor. Nabız düzensiz düzensiz, başlangıç zamanını net olarak öğleden sonra hatırlıyor. Hemodinamik olarak stabil; bilinen yapısal kalp hastalığı yok, enerji içeceği tüketimi olduğunu söylüyor.",
    "vitals": {
      "TA": "122/74 mmHg",
      "Nabız": "138/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "36.7 °C"
    },
    "exam": [
      "Genel durum iyi.",
      "Kalp ritmi düzensiz düzensiz duyuluyor.",
      "Üfürüm yok.",
      "Perfüzyon korunmuş."
    ],
    "correct": "Adölesan atriyal fibrilasyonu; <48 saat ise heparin sonrası senkronize kardiyoversiyon düşünülebilir",
    "options": [
      "Adölesan atriyal fibrilasyonu; <48 saat ise heparin sonrası senkronize kardiyoversiyon düşünülebilir",
      "AV nod bağımlı düzenli SVT için adenosinle kesin tedavi",
      "Vazovagal senkop",
      "Tam AV blok",
      "Sinüs aritmisi"
    ],
    "question": "Bu ritim ve yönetim için en uygun seçenek hangisidir?",
    "learningOutcome": "Düzensiz düzensiz ritim ve P dalgasız dalgalı bazal aktivite atriyal fibrilasyonu destekler; süre >48 saatse trombüs değerlendirmesi gerekir.",
    "clinicalFocus": "Gençte atriyal fibrilasyonun EKG tanısı, süreye göre TEE/antikoagülasyon ve kardiyoversiyon kararı.",
    "riskContext": [
      "AF gençte nadir olduğu için altta yatan substrat veya tetikleyici araştırılmalıdır.",
      ">48 saat veya bilinmeyen süre trombüs riskini artırır."
    ],
    "distinctiveClues": [
      "Nabız düzensiz düzensiz.",
      "EKG’de belirgin P dalgaları yok.",
      "Başlangıç <48 saat olarak hatırlanıyor.",
      "Hemodinami stabil."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Düzensiz düzensiz RR aralıkları, belirgin P dalgası yok ve dalgalı bazal aktivite izleniyor.",
        "rows": [
          [
            "Ritim bulgusu",
            "Düzensiz düzensiz RR aralıkları, belirgin P dalgası yok ve dalgalı bazal aktivite izleniyor.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      }
    ],
    "whyCorrect": "Düzensiz düzensiz ritim atriyal fibrilasyonu düşündürür. Başlangıç <48 saat ve hasta stabilse uygun antikoagülasyon hazırlığı ile senkronize kardiyoversiyon planlanabilir; süre uzunsa TEE ile trombüs dışlanmalıdır.",
    "wrongNotes": {
      "AV nod bağımlı düzenli SVT için adenosinle kesin tedavi": "AVNRT/AVRT düzenli dar kompleks taşikardidir; bu olguda ritim düzensiz düzensizdir.",
      "Vazovagal senkop": "Ana yakınma çarpıntı ve EKG’de AF’dir; senkop yoktur.",
      "Tam AV blok": "Tam blok bradikardi ve AV dissosiyasyon yapar; burada taşikardik düzensiz ritim var.",
      "Sinüs aritmisi": "Sinüs aritmisinde P dalgaları korunur ve solunumla düzenli değişir; burada P dalgaları seçilmiyor."
    },
    "pearls": [
      "Atriyal fibrilasyonun klasik oskültasyonu düzensiz düzensiz ritimdir.",
      ">48 saat AF’de kardiyoversiyon öncesi TEE veya yeterli antikoagülasyon gerekir."
    ],
    "management": [
      "EKG ile AF tanısını doğrula.",
      "Başlangıç süresini belirle ve trombüs riskini değerlendir.",
      "Stabilse senkronize kardiyoversiyon için sedasyon ve uygun enerji hazırlığı yap."
    ],
    "glossary": [
      "Atriyal fibrilasyon",
      "TEE",
      "Senkronize kardiyoversiyon"
    ]
  },
  {
    "id": "pdf-obgyn-fetal-abnormal-rhythm-020",
    "branchId": "obstetrics-gynecology",
    "title": "Prenatal değerlendirmede fetal ritim düzensizliği",
    "type": "Klasik vaka",
    "demographics": "20 haftalık gebe",
    "setting": "Perinatoloji polikliniği",
    "chiefComplaint": "Ultrasonda fetal ritmin düzensiz izlenmesi.",
    "stem": "Rutin gebelik kontrolünde fetal kalp ritmi aralıklı düzensiz duyuluyor. Anne kendini iyi hissediyor, hidrops bulgusu yok. M-mode ultrason ve fetal eko ile atriyal ve ventriküler kasılmalar ayrı ayrı değerlendirilmek isteniyor.",
    "vitals": {
      "TA": "112/70 mmHg",
      "Nabız": "82/dk",
      "Solunum": "16/dk",
      "SpO2": "%99",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Anne genel durumu iyi.",
      "Uterin hassasiyet yok.",
      "Fetal hareketler mevcut."
    ],
    "correct": "Fetal prematür atriyal atımın hidrops ve sürdürülebilir taşikardi açısından izlenmesi",
    "options": [
      "Fetal prematür atriyal atımın hidrops ve sürdürülebilir taşikardi açısından izlenmesi",
      "Hemen fetal kardiyoversiyon",
      "Gebeliği sonlandırma",
      "Anneye ampirik adenosin verme",
      "Ritim değerlendirmeden acil sezaryen"
    ],
    "question": "Bu fetal ritim düzensizliğinde en uygun yaklaşım hangisidir?",
    "learningOutcome": "Fetal ritim düzensizliğinin en sık nedenlerinden biri prematür atriyal atımdır; fetal eko ile yapısal hastalık, hidrops ve sürdürülebilir taşikardi araştırılır.",
    "clinicalFocus": "Fetal aritmide M-mode/fetal eko ile atriyal-ventriküler ilişkiyi değerlendirme.",
    "riskContext": [
      "Fetal taşikardi hidrops gelişirse acil yönetim gerektirir.",
      "Maternal otoimmünite tam kalp bloğu açısından sorgulanmalıdır."
    ],
    "distinctiveClues": [
      "Ritim aralıklı düzensiz, sürekli hızlı değil.",
      "Hidrops veya kalp yetmezliği bulgusu yok.",
      "Fetal eko atriyal erken atım gösteriyor."
    ],
    "investigations": [
      {
        "name": "Fetal ekokardiyografi ve M-mode",
        "type": "Imaging",
        "why": "Atriyal ve ventriküler kasılma ilişkisini ve hidrops bulgularını görmek için istenir.",
        "result": "Aralıklı erken atriyal kasılmalar izlenir; sürdürülebilir taşikardi ve hidrops yoktur.",
        "rows": [
          [
            "Atriyal erken atım",
            "Aralıklı mevcut",
            "Normalde düzenli ilişki beklenir",
            "PAC lehine"
          ],
          [
            "Hidrops",
            "Yok",
            "Yok",
            "Normal"
          ],
          [
            "Ventrikül hızı",
            "140/dk",
            "110–160/dk",
            "Referans içinde"
          ]
        ]
      }
    ],
    "whyCorrect": "Sürekli fetal taşikardi veya hidrops yoksa aralıklı düzensizliğin en olası açıklaması prematür atriyal atımdır. Bu durumda yakın izlem ve fetal eko yeterli olur; invaziv veya acil doğum kararı gerekmez.",
    "wrongNotes": {
      "Hemen fetal kardiyoversiyon": "Fetal kardiyoversiyon rutin bir yaklaşım değildir; sürdürülebilir ciddi taşikardi/hidrops yoktur.",
      "Gebeliği sonlandırma": "Benign PAC gebelik sonlandırma endikasyonu değildir.",
      "Anneye ampirik adenosin verme": "Adenosin fetal PAC izleminde kullanılmaz; maternal uygulama uygun endikasyon gerektirir.",
      "Ritim değerlendirmeden acil sezaryen": "20 haftada ve stabil fetüste acil sezaryen uygun değildir; tanısal fetal eko önceliklidir."
    },
    "pearls": [
      "Fetal ritim düzensizliğinde M-mode atriyum ve ventrikül ilişkisini gösterir.",
      "PAC çoğu kez benign olsa da SVT’ye dönüşüm açısından izlenir."
    ],
    "management": [
      "Fetal ekokardiyografi yap.",
      "Hidrops ve sürdürülebilir taşikardi gelişimini izle.",
      "Maternal otoimmünite veya fetal AV blok şüphesinde perinatoloji-kardiyoloji ekibiyle yönet."
    ],
    "glossary": [
      "Fetal PAC",
      "Fetal ekokardiyografi",
      "Hidrops fetalis"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-postoperative-complete-heart-block-021",
    "branchId": "pediatrics",
    "title": "AV kanal cerrahisi sonrası tam kalp bloğu",
    "type": "Acil yönetim sorusu",
    "demographics": "3 aylık bebek",
    "setting": "Çocuk kalp yoğun bakım",
    "chiefComplaint": "AV kanal onarımı sonrası kalp hızının düşük seyretmesi.",
    "stem": "Komplet AV kanal defekti onarımından sonra yoğun bakımda izlenen bebekte atriyal hız 150/dk iken ventrikül hızı 70/dk civarında kalıyor. Geçici epikardiyal teller mevcut. Perfüzyon sınırda ve laktat hafif yükseliyor.",
    "vitals": {
      "TA": "66/38 mmHg",
      "Nabız": "70/dk",
      "Solunum": "32/dk",
      "SpO2": "%96",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Kapiller dolum 3 saniye.",
      "Kalp sesleri bradikardik.",
      "Hepatomegali hafif.",
      "Cerrahi yara postoperatif döneme uygun."
    ],
    "correct": "Postoperatif tam AV blokta geçici pacing ve kalıcı pacemaker gereksiniminin izlenmesi",
    "options": [
      "Postoperatif tam AV blokta geçici pacing ve kalıcı pacemaker gereksiniminin izlenmesi",
      "Adenosin uygulamak",
      "Defibrilasyon yapmak",
      "Sadece sıvı kısıtlamasıyla izlemek",
      "Antibiyotik değiştirerek ritmin düzelmesini beklemek"
    ],
    "question": "Bu hastada en uygun yaklaşım hangisidir?",
    "learningOutcome": "Postoperatif AV kanal onarımından sonra AV dissosiyasyonla düşük ventrikül hızı tam AV bloktur; geçici pacing ile perfüzyon desteklenir ve düzelme olmazsa kalıcı pacemaker değerlendirilir.",
    "clinicalFocus": "Konjenital kalp cerrahisi sonrası iletim bloğu yönetimi.",
    "riskContext": [
      "AV kanal cerrahisi AV düğüm/His bölgesi çevresinde iletim hasarı riski taşır.",
      "Uzayan postoperatif tam blok kalıcı pacemaker gerektirebilir."
    ],
    "distinctiveClues": [
      "Atriyal ve ventriküler hız bağımsız.",
      "Ventrikül hızı düşük ve perfüzyon sınırda.",
      "Geçici epikardiyal teller mevcut."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "P dalgaları QRS’lerden bağımsız; ventriküler kaçış ritmi 70/dk.",
        "rows": [
          [
            "Atriyal hız",
            "150/dk",
            "Sinüs hızı",
            "Korunmuş"
          ],
          [
            "Ventrikül hızı",
            "70/dk",
            "Düşük",
            "Bradikardi"
          ],
          [
            "AV ilişki",
            "Dissosiyasyon",
            "1:1 beklenir",
            "Tam blok"
          ]
        ]
      }
    ],
    "whyCorrect": "Cerrahi sonrası P dalgaları ve QRS’lerin bağımsız olması tam AV bloğu gösterir. Perfüzyon etkileniyorsa geçici pacing acildir; düzelme olmazsa kalıcı pacemaker planlanır.",
    "wrongNotes": {
      "Adenosin uygulamak": "Adenosin AV nod iletimini geçici bloke eder; zaten AV blok olan hastada uygun değildir.",
      "Defibrilasyon yapmak": "Defibrilasyon nabızsız VT/VF içindir; burada bradikardik iletim bloğu var.",
      "Sadece sıvı kısıtlamasıyla izlemek": "Perfüzyon sınırda ve ventrikül hızı düşük; aktif pacing desteği gerekir.",
      "Antibiyotik değiştirerek ritmin düzelmesini beklemek": "Ritim sorunu iletim bloğudur; enfeksiyon tedavisi ritim yönetiminin yerine geçmez."
    },
    "pearls": [
      "Postoperatif tam AV blokta geçici epikardiyal teller hayat kurtarıcıdır.",
      "Kalıcı blok günler içinde düzelmezse pacemaker endikasyonu doğar."
    ],
    "management": [
      "Geçici pacing ile uygun hız ve AV senkroniyi sağla.",
      "Elektrolit, asit-baz ve hemodinamiyi düzelt.",
      "Persistan blokta pediatrik elektrofizyoloji ile kalıcı pacemaker planla."
    ],
    "glossary": [
      "Tam AV blok",
      "Epikardiyal pacing teli",
      "Pacemaker"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-postoperative-jet-022",
    "branchId": "pediatrics",
    "title": "VSD onarımı sonrası junctional ektopik taşikardi",
    "type": "Acil yönetim sorusu",
    "demographics": "4 aylık erkek bebek",
    "setting": "Çocuk kalp yoğun bakım",
    "chiefComplaint": "VSD onarımı sonrası giderek artan kalp hızı.",
    "stem": "VSD onarımından saatler sonra kalp hızı 200/dk’ye çıkıyor, kan basıncı düşüyor ve hasta inotrop desteği alıyor. EKG’de QRS dar, P dalgaları QRS’lerden bağımsız görünüyor; ritim ısı ve katekolamin desteğiyle daha hızlı seyrediyor.",
    "vitals": {
      "TA": "62/36 mmHg",
      "Nabız": "200/dk",
      "Solunum": "30/dk",
      "SpO2": "%95",
      "Ateş": "38.0 °C"
    },
    "exam": [
      "Perfüzyon azalmış, kapiller dolum 4 saniye.",
      "Kalp ritmi hızlı ve düzenli.",
      "Postoperatif drenler yerinde.",
      "Hepatomegali hafif."
    ],
    "correct": "Postoperatif junctional ektopik taşikardi",
    "options": [
      "Postoperatif junctional ektopik taşikardi",
      "AVRT atağı",
      "Sinüs taşikardisi",
      "Tam AV blok",
      "Atriyal fibrilasyon"
    ],
    "question": "Bu postoperatif ritim en çok hangi tanıyı destekler?",
    "learningOutcome": "JET, postoperatif dönemde dar QRS taşikardi, AV dissosiyasyon ve katekolamin/ateşle hızlanma ile seyreder; tedavi soğutma, katekolamin azaltma, sedasyon ve antiaritmik destek içerir.",
    "clinicalFocus": "Postoperatif JET tanısı ve akut yoğun bakım yönetimi.",
    "riskContext": [
      "Konjenital kalp cerrahisi sonrası His bölgesi irritasyonu JET riskini artırır.",
      "Ateş ve katekolaminler otomatik odak hızını artırır."
    ],
    "distinctiveClues": [
      "VSD cerrahisi sonrası erken saatlerde başladı.",
      "Dar QRS hızlı ritim var.",
      "P dalgaları QRS ile ilişkili değil.",
      "Ateş/katekolaminle hız artıyor."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Dar QRS taşikardi, AV dissosiyasyon ve junctional hızın atriyal hızdan yüksek olduğu patern izlenir.",
        "rows": [
          [
            "Ritim bulgusu",
            "Dar QRS taşikardi, AV dissosiyasyon ve junctional hızın atriyal hızdan yüksek olduğu patern izlenir.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      }
    ],
    "whyCorrect": "Postoperatif JET otomatik junctional odaktan kaynaklanır ve AV senkroniyi bozarak kardiyak debiyi düşürür. AV nod bağımlı reentran SVT gibi adenosinle kalıcı sonlanması beklenmez.",
    "wrongNotes": {
      "AVRT atağı": "AVRT genellikle AV nod bağımlıdır ve adenosinle sonlanabilir; JET otomatik odaktır ve AV dissosiyasyon belirgindir.",
      "Sinüs taşikardisi": "Sinüs taşikardisinde P dalgaları QRS öncesinde 1:1 ilişkilidir; burada junctional ritim ve AV dissosiyasyon var.",
      "Tam AV blok": "Tam blok bradikardiyle seyreder; burada junctional taşikardi vardır.",
      "Atriyal fibrilasyon": "AF düzensiz düzensiz ritim yapar; bu ritim düzenli ve postoperatif JET paternindedir."
    },
    "pearls": [
      "JET’de ilk hedef hızı azaltmak ve AV senkroniyi mümkünse geri kazanmaktır.",
      "Soğutma, sedasyon, elektrolit düzeltme ve katekolamin azaltma temel basamaklardır."
    ],
    "management": [
      "Ateşi düşür ve hafif soğutma/sedasyon uygula.",
      "Katekolaminleri mümkün olan en düşük düzeye indir.",
      "Elektrolitleri düzelt, gerekirse amiodaron ve atriyal pacing stratejilerini kardiyolojiyle planla."
    ],
    "glossary": [
      "Junctional ektopik taşikardi",
      "AV dissosiyasyon",
      "Postoperatif aritmi"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-pacemaker-syncope-023",
    "branchId": "pediatrics",
    "title": "Pacemakerlı çocukta baş dönmesi ve senkop",
    "type": "Acil yönetim sorusu",
    "demographics": "10 yaşında kız çocuk",
    "setting": "Acil servis",
    "chiefComplaint": "Pacemaker öyküsü olan hastada baş dönmesi ve senkop.",
    "stem": "Konjenital kalp hastalığı nedeniyle pacemaker taşıyan çocuk acile baş dönmesi ve kısa senkopla geliyor. Cihaz kartı yanında değil. Kalp hızı beklenenden düşük, EKG’de bazı pacing spike’ları QRS oluşturuyor, bazıları oluşturmuyor. Göğüs travması yok.",
    "vitals": {
      "TA": "94/58 mmHg",
      "Nabız": "48/dk",
      "Solunum": "18/dk",
      "SpO2": "%97",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Soluk ve halsiz görünüyor.",
      "Periferik nabızlar zayıf.",
      "Pacemaker cebi üzerinde eritem yok.",
      "Kalp sesleri bradikardik."
    ],
    "correct": "Pacemaker disfonksiyonu için cihaz interrogasyonu, EKG ve akciğer grafisi ile değerlendirme",
    "options": [
      "Pacemaker disfonksiyonu için cihaz interrogasyonu, EKG ve akciğer grafisi ile değerlendirme",
      "Vazovagal senkop kabul edip taburculuk",
      "Adenosin uygulamak",
      "Sadece antibiyotik başlamak",
      "Cihazı sorgulamadan spor onayı vermek"
    ],
    "question": "Bu hastada ilk değerlendirme hangi yönde olmalıdır?",
    "learningOutcome": "Pacemakerlı çocukta senkop cihaz veya lead problemi dışlanana kadar ciddi kabul edilir; EKG, cihaz interrogasyonu ve grafi ile sensing/capture/lead sorunları araştırılır.",
    "clinicalFocus": "Pacemaker hastasında senkopta cihaz disfonksiyonu ve lead problemini tanıma.",
    "riskContext": [
      "Pacemaker bağımlı hastada capture kaybı bradikardi ve senkop yapabilir.",
      "Cihaz kartı yoksa üretici ve providerLabel bilgisi hızlıca bulunmalıdır."
    ],
    "distinctiveClues": [
      "Pacemaker öyküsü var.",
      "Senkop ve düşük nabız mevcut.",
      "Pacing spike sonrası her zaman QRS oluşmuyor."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Aralıklı pacing spike sonrası QRS oluşmaması capture kaybını düşündürür.",
        "rows": [
          [
            "Ritim bulgusu",
            "Aralıklı pacing spike sonrası QRS oluşmaması capture kaybını düşündürür.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      },
      {
        "name": "Cihaz interrogasyonu",
        "type": "Device",
        "why": "Batarya, lead impedansı, sensing ve capture eşiklerini değerlendirmek için yapılır.",
        "result": "Ventriküler capture eşiği yükselmiş ve lead impedansı anormal saptanır.",
        "rows": [
          [
            "Capture eşiği",
            "Yüksek",
            "Düşük eşik beklenir",
            "Anormal"
          ],
          [
            "Lead impedansı",
            "Anormal",
            "Cihaz aralığında olmalı",
            "Lead sorunu"
          ]
        ]
      },
      {
        "name": "Akciğer grafisi",
        "type": "Imaging",
        "why": "Lead kırığı veya yer değiştirmeyi değerlendirmek için istenir.",
        "result": "Ventriküler lead boyunca süreksizlik şüphesi izlenir.",
        "rows": [
          [
            "Lead bütünlüğü",
            "Süreksizlik şüphesi",
            "Süreklilik beklenir",
            "Anormal"
          ]
        ]
      }
    ],
    "whyCorrect": "Pacemaker spike’larının QRS oluşturamaması capture kaybını düşündürür. Senkop bu bağlamda cihaz disfonksiyonu kabul edilmeli ve cihaz sorgulaması/grafi hızla yapılmalıdır.",
    "wrongNotes": {
      "Vazovagal senkop kabul edip taburculuk": "Pacemakerlı hastada senkop cihaz disfonksiyonu dışlanmadan benign kabul edilemez.",
      "Adenosin uygulamak": "Adenosin SVT tanı/tedavisinde kullanılır; bradikardi ve capture kaybında uygun değildir.",
      "Sadece antibiyotik başlamak": "Cihaz cebi enfeksiyon bulgusu yok; temel sorun ritim ve cihaz işlevi.",
      "Cihazı sorgulamadan spor onayı vermek": "Senkop ve cihaz bulgusu varken aktivite onayı güvenli değildir."
    },
    "pearls": [
      "Pacemaker spike sonrası QRS yoksa capture kaybını düşün.",
      "Lead kırığı veya batarya sorunu senkop nedeni olabilir."
    ],
    "management": [
      "Hastayı monitörize et ve dış pacing/defibrilasyon hazırlığını bulundur.",
      "Cihaz interrogasyonu ve akciğer grafisi iste.",
      "Pacemaker bağımlıysa acil geçici pacing veya cihaz revizyonu planla."
    ],
    "glossary": [
      "Pacemaker capture kaybı",
      "Lead kırığı",
      "Cihaz interrogasyonu"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-long-qt-resuscitated-024",
    "branchId": "pediatrics",
    "title": "Kollaps sonrası uzun QT saptanan çocuk",
    "type": "Klasik vaka",
    "demographics": "11 yaşında erkek çocuk",
    "setting": "Acil servis",
    "chiefComplaint": "Parkta ani kollaps sonrası resüsitasyon.",
    "stem": "Aile parkta oynarken çocuğun aniden yere yığıldığını, kısa CPR sonrası spontan dolaşımın döndüğünü söylüyor. EKG’de belirgin QT uzaması saptanıyor. Ailede genç yaşta açıklanamayan ölüm olup olmadığı bilinmiyor.",
    "vitals": {
      "TA": "106/64 mmHg",
      "Nabız": "84/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "36.7 °C"
    },
    "exam": [
      "Genel durum postiktal olmayan hafif yorgun.",
      "Kalp sesleri ritmik, üfürüm yok.",
      "Nörolojik fokal defisit yok."
    ],
    "correct": "Konjenital uzun QT sendromu sonrası ani kardiyak arrest riski",
    "options": [
      "Konjenital uzun QT sendromu sonrası ani kardiyak arrest riski",
      "Vazovagal senkop",
      "Breath-holding spell",
      "Akut miyokard enfarktüsü",
      "Basit anksiyete atağı"
    ],
    "question": "Bu olguda EKG bulgusu en çok hangi tanıyı destekler?",
    "learningOutcome": "Resüsitasyon gerektiren ani kollaps ve QTc uzaması konjenital uzun QT sendromunu düşündürür; elektrolit/ilaç nedenleri dışlanmalı ve aile taraması yapılmalıdır.",
    "clinicalFocus": "Uzun QT sendromunda ani ölüm riski, tetikleyici ve aile taraması.",
    "riskContext": [
      "QT uzatan ilaçlar ve elektrolit bozuklukları edinilmiş QT uzaması yapabilir.",
      "Genetik kanalopati aile bireylerinde sessiz olabilir."
    ],
    "distinctiveClues": [
      "Ani kollaps resüsitasyon gerektirmiş.",
      "QTc belirgin uzamış.",
      "Yapısal üfürüm yok.",
      "Olay benign prodromla açıklanmıyor."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Sinüs ritmi, QTc 520 ms; T dalgası morfolojisi uzun QT ile uyumlu.",
        "rows": [
          [
            "QTc",
            "520 ms",
            "<450 ms",
            "Yüksek"
          ],
          [
            "QRS",
            "Dar",
            "<120 ms",
            "Normal"
          ]
        ]
      },
      {
        "name": "Elektrolitler ve ilaç taraması",
        "type": "Lab",
        "why": "Edinilmiş QT uzaması nedenlerini dışlamak için istenir.",
        "result": "Potasyum, kalsiyum ve magnezyum referans aralığında; QT uzatan ilaç öyküsü yok.",
        "rows": [
          [
            "Potasyum",
            "4.2 mEq/L",
            "3.5–5.1",
            "Normal"
          ],
          [
            "Magnezyum",
            "2.0 mg/dL",
            "1.7–2.4",
            "Normal"
          ],
          [
            "Kalsiyum",
            "9.5 mg/dL",
            "8.8–10.6",
            "Normal"
          ]
        ]
      }
    ],
    "whyCorrect": "QTc’nin belirgin uzaması ve ani kollaps kanalopatiyi güçlü destekler. Edinilmiş nedenler dışlandıktan sonra uzun QT sendromu tanısı, tedavi ve aile taraması için kardiyoloji/elektrofizyoloji gerektirir.",
    "wrongNotes": {
      "Vazovagal senkop": "Vazovagal senkopta prodrom ve hızlı toparlanma beklenir; burada resüsitasyon ve QT uzaması var.",
      "Breath-holding spell": "Bu yaş ve olay paterni breath-holding spell ile uyumlu değildir.",
      "Akut miyokard enfarktüsü": "Çocukta MI çok nadirdir ve QTc uzamasıyla açıklanmaz; ST elevasyonu/troponin paterni yok.",
      "Basit anksiyete atağı": "Anksiyete resüsitasyon gerektiren kollaps ve QTc 520 ms yapmaz."
    },
    "pearls": [
      "Uzun QT’de QTc belirgin uzaması ani ölüm riskini artırır.",
      "Tedavide beta bloker, tetikleyici/ilaç kaçınma ve seçilmiş olguda ICD düşünülür."
    ],
    "management": [
      "Monitörize yatış ve elektrolit optimizasyonu yap.",
      "QT uzatan ilaçları kes ve kardiyoloji/elektrofizyolojiye danış.",
      "Aile taraması ve genetik danışmanlık planla."
    ],
    "glossary": [
      "Uzun QT sendromu",
      "QTc",
      "Torsades de pointes",
      "Kanalopati"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-hcm-syncope-025",
    "branchId": "pediatrics",
    "title": "Hipertrofik kardiyomiyopatili çocukta efor senkopu",
    "type": "Acil yönetim sorusu",
    "demographics": "12 yaşında erkek çocuk",
    "setting": "Acil servis",
    "chiefComplaint": "Okul teneffüsünde koşarken bayılma.",
    "stem": "Hipertrofik kardiyomiyopati tanısıyla izlenen çocuk teneffüste koşarken aniden bayılıyor. Göğüs ağrısı ve çarpıntı hissi olmuş. Daha önce beta bloker kullanıyor ancak son günlerde birkaç doz atladığı öğreniliyor.",
    "vitals": {
      "TA": "104/66 mmHg",
      "Nabız": "102/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "36.7 °C"
    },
    "exam": [
      "Sistolik üfürüm duyuluyor.",
      "Perfüzyon iyi ancak hasta yorgun.",
      "Nörolojik muayene normal."
    ],
    "correct": "HCM’de efor senkopu nedeniyle ani ölüm riski açısından acil kardiyoloji değerlendirmesi ve monitörize yatış",
    "options": [
      "HCM’de efor senkopu nedeniyle ani ölüm riski açısından acil kardiyoloji değerlendirmesi ve monitörize yatış",
      "Vazovagal senkop tanısıyla taburculuk",
      "Sadece sıvı alımını artırma önerisi",
      "Antibiyotik başlama",
      "Astım atağı olarak bronkodilatör verme"
    ],
    "question": "Bu hastada en uygun yaklaşım hangisidir?",
    "learningOutcome": "HCM tanılı çocukta efor sırasında senkop malign ventriküler aritmi ve ani ölüm riski açısından yüksek risklidir; monitörize değerlendirme gerekir.",
    "clinicalFocus": "HCM’de efor senkopu ve ICD/ilaç uyumu risk değerlendirmesi.",
    "riskContext": [
      "İlaç uyumsuzluğu aritmi riskini artırabilir.",
      "HCM’de efor semptomları ani ölüm risk sınıflamasında önemlidir."
    ],
    "distinctiveClues": [
      "Bilinen HCM tanısı var.",
      "Senkop egzersiz sırasında gelişmiş.",
      "Çarpıntı/göğüs ağrısı eşlik etmiş.",
      "Beta bloker dozları atlanmış."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Sol ventrikül hipertrofisi ve repolarizasyon değişiklikleri; akut ritim kaydı için monitörizasyon gerekir.",
        "rows": [
          [
            "Ritim bulgusu",
            "Sol ventrikül hipertrofisi ve repolarizasyon değişiklikleri; akut ritim kaydı için monitörizasyon gerekir.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      },
      {
        "name": "Ekokardiyografi",
        "type": "Imaging",
        "why": "Yapısal kalp hastalığı ve ventrikül fonksiyonunu değerlendirmek için istenir.",
        "result": "Hipertrofik septum ve çıkış yolu gradiyenti değerlendirilir.",
        "rows": [
          [
            "Ventrikül fonksiyonu",
            "Hipertrofik septum ve çıkış yolu gradiyenti değerlendirilir.",
            "Yaşa uygun normal fonksiyon beklenir",
            "Klinik karar verdirici"
          ]
        ]
      }
    ],
    "whyCorrect": "HCM’de efor senkopu benign kabul edilmez. Hastanın ritim açısından izlenmesi, ilaç uyumunun değerlendirilmesi ve ani ölüm riskine göre ICD/tedavi düzenlemesi tartışılmalıdır.",
    "wrongNotes": {
      "Vazovagal senkop tanısıyla taburculuk": "Vazovagal senkop genellikle prodrom ve ayakta beklemeyle olur; HCM ve efor senkopu yüksek risklidir.",
      "Sadece sıvı alımını artırma önerisi": "Hidrasyon yardımcı olabilir ancak malign aritmi riskini dışlamaz.",
      "Antibiyotik başlama": "Enfeksiyon bulgusu yok; ana sorun kardiyak risk.",
      "Astım atağı olarak bronkodilatör verme": "Wheezing veya bronkospazm bulgusu yok; efor senkopu kardiyak değerlendirme gerektirir."
    },
    "pearls": [
      "HCM + efor senkopu = kırmızı bayrak.",
      "Ani ölüm risk değerlendirmesi aile öyküsü, senkop, duvar kalınlığı, NSVT ve genetikle yapılır."
    ],
    "management": [
      "Monitörize yatır ve pediatrik kardiyolojiye danış.",
      "Beta bloker uyumu ve dozunu değerlendir.",
      "Holter/egzersiz kısıtlaması ve ICD endikasyonunu tartış."
    ],
    "glossary": [
      "Hipertrofik kardiyomiyopati",
      "Efor senkopu",
      "ICD",
      "NSVT"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-repaired-tof-pvcs-026",
    "branchId": "pediatrics",
    "title": "Fallot onarımı sonrası sık PVC",
    "type": "Klasik vaka",
    "demographics": "13 yaşında kız çocuk",
    "setting": "Pediatri polikliniği",
    "chiefComplaint": "Rutin kontrolde sık ventriküler erken atım.",
    "stem": "Hasta bebeklikte Fallot tetralojisi onarımı geçirmiş. Rutin kontrolde aralıklı çarpıntı ve efor kapasitesinde azalma tarifliyor. EKG’de sağ dal bloğu zemini ve PVC’ler var; Holterde sık ventriküler ektopi saptanıyor.",
    "vitals": {
      "TA": "104/64 mmHg",
      "Nabız": "86/dk",
      "Solunum": "18/dk",
      "SpO2": "%96",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Sternotomi skarı mevcut.",
      "Kalp oskültasyonunda pulmoner yetmezlik üfürümü duyuluyor.",
      "Perfüzyon normal."
    ],
    "correct": "Onarılmış Fallot tetralojisinde ventriküler aritmi ve RV dilatasyonu açısından değerlendirme",
    "options": [
      "Onarılmış Fallot tetralojisinde ventriküler aritmi ve RV dilatasyonu açısından değerlendirme",
      "Benign infant PAC olarak izlem",
      "Hiç değerlendirme yapmadan spor onayı",
      "Adenosinle PVC sonlandırma",
      "Acil antibiyotik tedavisi"
    ],
    "question": "Bu olguda PVC’ler hangi bağlamda değerlendirilmelidir?",
    "learningOutcome": "Onarılmış Fallot tetralojisinde skar, sağ ventrikül dilatasyonu ve pulmoner yetmezlik ventriküler aritmi riskini artırır; Holter, EKO/MR ve elektrofizyoloji değerlendirmesi gerekir.",
    "clinicalFocus": "Konjenital kalp cerrahisi sonrası ventriküler aritmi riskini tanıma.",
    "riskContext": [
      "Ventrikülotomi veya patch skarı VT substratı oluşturabilir.",
      "Pulmoner yetmezlik sağ ventrikül dilatasyonu ve aritmi riskini artırır."
    ],
    "distinctiveClues": [
      "Fallot onarımı öyküsü var.",
      "Sağ dal bloğu ve PVC’ler mevcut.",
      "Efor kapasitesi azalmış.",
      "Pulmoner yetmezlik üfürümü duyuluyor."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Sağ dal bloğu zemini ve monomorfik/tekrarlayan PVC’ler izlenir.",
        "rows": [
          [
            "Ritim bulgusu",
            "Sağ dal bloğu zemini ve monomorfik/tekrarlayan PVC’ler izlenir.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      },
      {
        "name": "Holter ve kardiyak MR/EKO",
        "type": "Monitor",
        "why": "PVC yükü, NSVT, sağ ventrikül hacmi ve pulmoner yetmezliği değerlendirmek için istenir.",
        "result": "PVC yükü artmış; kardiyak görüntülemede sağ ventrikül dilatasyonu ve pulmoner yetmezlik saptanır.",
        "rows": [
          [
            "PVC yükü",
            "%12",
            "Düşük olması beklenir",
            "Yüksek"
          ],
          [
            "NSVT",
            "Kısa koşular mevcut",
            "Saptanmamalı",
            "Anormal"
          ],
          [
            "RV hacmi",
            "Artmış",
            "Normal hacim beklenir",
            "Dilatasyon"
          ]
        ]
      }
    ],
    "whyCorrect": "Repaired TOF hastasında PVC basit benign bulgu gibi ele alınmaz. Cerrahi skar ve sağ ventrikül yüklenmesi ventriküler taşikardi substratı oluşturabilir.",
    "wrongNotes": {
      "Benign infant PAC olarak izlem": "Bu hasta infant değil ve atriyal değil ventriküler ektopi var; konjenital cerrahi öyküsü riski artırır.",
      "Hiç değerlendirme yapmadan spor onayı": "Konjenital kalp hastalığı ve sık PVC varken spor kararı ileri değerlendirme sonrası verilir.",
      "Adenosinle PVC sonlandırma": "Adenosin AV nod bağımlı SVT için kullanılır; PVC substratını ortadan kaldırmaz.",
      "Acil antibiyotik tedavisi": "Enfeksiyon bulgusu yok; sorun ritim ve yapısal rezidüdür."
    },
    "pearls": [
      "Fallot onarımı sonrası geç dönemde VT riski vardır.",
      "QRS süresi, RV dilatasyonu, pulmoner yetmezlik ve NSVT risk değerlendirmesinde önemlidir."
    ],
    "management": [
      "Holterle PVC/NSVT yükünü belirle.",
      "EKO/MR ile RV ve pulmoner yetmezliği değerlendir.",
      "Kardiyoloji/elektrofizyoloji ile ablasyon, pulmoner kapak tedavisi veya ICD riskini tartış."
    ],
    "glossary": [
      "Fallot tetralojisi",
      "Pulmoner yetmezlik",
      "Sağ ventrikül dilatasyonu",
      "Ventriküler taşikardi"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-aed-resuscitated-027",
    "branchId": "pediatrics",
    "title": "AED ile başarılı resüsitasyon sonrası adölesan",
    "type": "Acil yönetim sorusu",
    "demographics": "15 yaşında erkek sporcu",
    "setting": "Acil servis",
    "chiefComplaint": "Spor sırasında ani kollaps ve AED şoku sonrası düzelme.",
    "stem": "Okulda güreş antrenmanı sırasında hasta aniden kollabe oluyor. Okul AED cihazı ritmi analiz edip şok veriyor ve hasta kısa sürede dolaşım kazanıyor. Acile gelirken uyanık ancak olayı hatırlamıyor.",
    "vitals": {
      "TA": "110/68 mmHg",
      "Nabız": "98/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Genel durum stabil.",
      "Kalp sesleri ritmik, üfürüm net değil.",
      "Nörolojik fokal defisit yok."
    ],
    "correct": "Başarılı resüsitasyon sonrası ani kardiyak arrest kabul edilip yoğun kardiyak değerlendirme",
    "options": [
      "Başarılı resüsitasyon sonrası ani kardiyak arrest kabul edilip yoğun kardiyak değerlendirme",
      "Kendine geldiği için taburculuk",
      "Vazovagal senkop olarak izlem",
      "Sadece psikiyatri konsültasyonu",
      "Rutin antibiyotik başlanması"
    ],
    "question": "Bu hastada en uygun ilk yaklaşım hangisidir?",
    "learningOutcome": "AED şoku gerektiren spor ilişkili kollaps ani kardiyak arresttir; altta yatan yapısal, elektriksel veya edinilmiş nedenler acil araştırılmalıdır.",
    "clinicalFocus": "Toplumda AED kullanımı sonrası pediatrik ani kardiyak arrest yönetimi.",
    "riskContext": [
      "AED şok vermişse ritim şoklanabilir taşiaritmi olarak kabul edilir.",
      "Egzersiz ilişkili olay HCM, anomal koroner, CPVT, uzun QT ve ARVC açısından değerlendirilmelidir."
    ],
    "distinctiveClues": [
      "Spor sırasında ani kollaps.",
      "AED şoku sonrası dolaşım geri dönmüş.",
      "Olay prodromsuz ve ciddi."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Resüsitasyon sonrası sinüs ritmi; QTc ve ST-T değişiklikleri seri izlenir.",
        "rows": [
          [
            "Ritim bulgusu",
            "Resüsitasyon sonrası sinüs ritmi; QTc ve ST-T değişiklikleri seri izlenir.",
            "Sinüs ritmi ile karşılaştırılır",
            "Klinik olarak anlamlı"
          ]
        ]
      },
      {
        "name": "AED veri indirme ve ritim analizi",
        "type": "Device",
        "why": "Şok öncesi ritmi belgelemek için yapılır.",
        "result": "Şoklanabilir hızlı ventriküler ritim kaydı elde edilir.",
        "rows": [
          [
            "AED ritmi",
            "Şoklanabilir ventriküler ritim",
            "Normal sinüs beklenir",
            "Kritik"
          ]
        ]
      }
    ],
    "whyCorrect": "AED ile şoklanan kollaps benign senkop değildir. Şok öncesi ritim kaydı, EKG/EKO/laboratuvar ve aile öyküsü ile ani ölüm nedenleri araştırılmalıdır.",
    "wrongNotes": {
      "Kendine geldiği için taburculuk": "Spontan düzelme ciddi ritim olayını dışlamaz; AED şoku yüksek risklidir.",
      "Vazovagal senkop olarak izlem": "Vazovagal senkop AED şoku gerektirmez ve genellikle prodromludur.",
      "Sadece psikiyatri konsültasyonu": "Psikiyatrik değerlendirme gerekli olabilir ancak kardiyak arrest yönetiminin yerine geçmez.",
      "Rutin antibiyotik başlanması": "Enfeksiyon bulgusu yok; öncelik aritmi nedenidir."
    },
    "pearls": [
      "AED kayıtları tanısal değerdedir; mutlaka indirilip incelenmelidir.",
      "Ani kardiyak arrest sonrası aile taraması ve spora dönüş kararı uzmanlık gerektirir."
    ],
    "management": [
      "Yoğun bakım/monitörize yatış sağla.",
      "AED verisini indir, EKG/EKO/lab ve gerekirse MR/genetik planla.",
      "Kardiyoloji/elektrofizyoloji ile ikincil korunma ve ICD gereksinimini değerlendir."
    ],
    "glossary": [
      "AED",
      "Ani kardiyak arrest",
      "Ventriküler fibrilasyon"
    ]
  },
  {
    "id": "pdf-peds-arrhythmia-icd-shock-028",
    "branchId": "pediatrics",
    "title": "ICD şoku alan adölesanda uygun-uygunsuz şok ayrımı",
    "type": "Acil yönetim sorusu",
    "demographics": "16 yaşında erkek hasta",
    "setting": "Acil servis / acil bakım",
    "chiefComplaint": "ICD şoku hissi ve düşme.",
    "stem": "Önceden ani kardiyak arrest nedeniyle ICD taşıyan hasta gün içinde basketbol oynarken sırtına yumruk gibi bir his, akşam kalkarken göğüste sert tekme gibi bir şok ve düşme tarifliyor. Şok sonrası kendine hızlı geliyor. Hareketle ilişkili lead gürültüsü veya gerçek ventriküler aritmi ayırımı gerekiyor.",
    "vitals": {
      "TA": "116/70 mmHg",
      "Nabız": "84/dk",
      "Solunum": "16/dk",
      "SpO2": "%99",
      "Ateş": "36.5 °C"
    },
    "exam": [
      "Genel durum iyi.",
      "ICD cebi üzerinde enfeksiyon bulgusu yok.",
      "Kalp ritmi sinüs ve perfüzyon normal."
    ],
    "correct": "Acil ICD interrogasyonu ve lead/ritim değerlendirmesi",
    "options": [
      "Acil ICD interrogasyonu ve lead/ritim değerlendirmesi",
      "Şok hissini kas ağrısı sayıp taburculuk",
      "ICD’yi kalıcı olarak kapatıp eve gönderme",
      "Adenosin uygulamak",
      "Sadece göğüs grafisiyle yetinmek"
    ],
    "question": "Bu hastada en önemli sonraki adım hangisidir?",
    "learningOutcome": "ICD şoku sonrası ilk hedef şokun uygun mu uygunsuz mu olduğunu cihaz interrogasyonu ile anlamaktır; grafi lead sorununu destekler ama ritim kaydının yerini tutmaz.",
    "clinicalFocus": "ICD şokunda uygun/uygunsuz şok, lead kırığı ve cihaz interrogasyonunun önceliği.",
    "riskContext": [
      "Uygun şok altta yatan aritminin kırıldığını, uygunsuz şok lead gürültüsü gibi sorunları düşündürür.",
      "Magnet ancak monitorize ortamda ve uygunsuz şok riski varsa geçici çözüm olarak kullanılabilir."
    ],
    "distinctiveClues": [
      "Hasta ICD şoku hissi tarifliyor.",
      "Bir olay egzersiz, diğeri pozisyon değişimiyle ilişkili.",
      "Uygun ve uygunsuz şok ayrımı klinikle yapılamıyor."
    ],
    "investigations": [
      {
        "name": "ICD interrogasyonu",
        "type": "Device",
        "why": "Şok öncesi ritmi, algılama, tedavi ve lead sinyallerini görmek için yapılır.",
        "result": "Bir kayıtta ventriküler taşikardiye uygun şok, diğerinde lead gürültüsü olasılığı değerlendirilir.",
        "rows": [
          [
            "Şok kaydı",
            "Mevcut",
            "Şok sonrası mutlaka incelenir",
            "Kritik"
          ],
          [
            "Lead gürültüsü",
            "Hareketle provake olabilir",
            "Olmamalı",
            "Uygunsuz şok riski"
          ]
        ]
      },
      {
        "name": "Akciğer grafisi",
        "type": "Imaging",
        "why": "Lead kırığı veya yer değiştirmeyi desteklemek için istenir.",
        "result": "Lead bütünlüğü ve jeneratör bağlantısı değerlendirilir.",
        "rows": [
          [
            "Lead bütünlüğü",
            "Değerlendiriliyor",
            "Süreklilik beklenir",
            "Gerekli"
          ]
        ]
      }
    ],
    "whyCorrect": "ICD şokundan sonra cihaz belleği şok öncesi ritmi ve tedavi yanıtını gösterir. Bu bilgi olmadan uygun aritmi tedavisi mi, lead kırığına bağlı uygunsuz şok mu olduğunu ayırmak mümkün değildir.",
    "wrongNotes": {
      "Şok hissini kas ağrısı sayıp taburculuk": "ICD taşıyan hastada şok hissi cihaz tedavisi kabul edilip sorgulanmalıdır.",
      "ICD’yi kalıcı olarak kapatıp eve gönderme": "Cihaz kapatılırsa hasta gerçek VT/VF’ye korunmasız kalabilir; yalnız monitorize ortamda geçici magnet düşünülebilir.",
      "Adenosin uygulamak": "Adenosin SVT için tanı/tedavi aracıdır; ICD şok nedenini belirlemez.",
      "Sadece göğüs grafisiyle yetinmek": "Grafi lead sorununu gösterebilir ancak şok öncesi ritmi ve cihaz algısını interrogasyon gösterir."
    },
    "pearls": [
      "ICD şoku sonrası “uygun mu, uygunsuz mu?” sorusu ilk sorudur.",
      "Lead kırığı hareketle gürültü üretip uygunsuz şoka yol açabilir."
    ],
    "management": [
      "Hastayı monitörize et.",
      "ICD interrogasyonunu acil yap ve göğüs grafisi ile lead kontrolü ekle.",
      "Uygunsuz şok riski varsa uzman eşliğinde programlama/magnet ve güvenli defibrilasyon planı oluştur."
    ],
    "glossary": [
      "ICD",
      "Uygunsuz şok",
      "Lead kırığı",
      "Cihaz interrogasyonu"
    ]
  },
  {
    "id": "pdf-internal-fontan-iart-029",
    "branchId": "internal-medicine",
    "title": "Fontan palliasyonu sonrası değişmeyen 110/dk kalp hızı",
    "type": "Klasik vaka",
    "demographics": "22 yaşında kadın hasta",
    "setting": "Gastroenteroloji polikliniği",
    "chiefComplaint": "İki haftadır halsizlik ve alışılmıştan yüksek sabit nabız.",
    "stem": "Tek ventrikül fizyolojisi nedeniyle Fontan palliasyonu geçiren ve protein kaybettiren enteropati için izlenen hasta son iki haftadır halsiz olduğunu söylüyor. Oksijen satürasyonu kendi bazaliyle uyumlu ancak kalp hızı 110/dk ve bekleme süresince hiç değişmiyor. Ateş veya dehidratasyon bulgusu yok.",
    "vitals": {
      "TA": "104/66 mmHg",
      "Nabız": "110/dk",
      "Solunum": "18/dk",
      "SpO2": "%95",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Genel durum stabil.",
      "Hafif halsiz görünüyor.",
      "Kalp ritmi düzenli ve sabit hızlı.",
      "Periferik ödem hafif."
    ],
    "correct": "Fontan sonrası intraatriyal reentran taşikardi",
    "options": [
      "Fontan sonrası intraatriyal reentran taşikardi",
      "Basit sinüs taşikardisi",
      "Panik atak",
      "Ventriküler fibrilasyon",
      "Akut bakteriyel endokardit"
    ],
    "question": "Bu hastada sabit hafif taşikardi en çok hangi ritmi düşündürür?",
    "learningOutcome": "Fontan gibi atriyal cerrahi geçirmiş hastalarda sabit 110–150/dk hız, atriyal hızın 2:1 iletildiği intraatriyal reentran taşikardi olabilir.",
    "clinicalFocus": "Erişkin konjenital kalp hastasında atriyal skar ilişkili IART ve kardiyoversiyon öncesi trombüs değerlendirmesi.",
    "riskContext": [
      "Atriyal cerrahi skar reentran devre substratı oluşturur.",
      "Aritmi >48 saat sürdüyse kardiyoversiyon öncesi TEE veya antikoagülasyon gerekir."
    ],
    "distinctiveClues": [
      "Fontan palliasyonu ve atriyal cerrahi öyküsü var.",
      "Kalp hızı hafif yüksek ama tamamen sabit.",
      "Halsizlik yeni başlamış.",
      "Ateş/dehidratasyon taşikardiyi açıklamıyor."
    ],
    "investigations": [
      {
        "name": "12 derivasyon EKG",
        "type": "Ecg",
        "why": "Ritim mekanizmasını ve iletim ilişkisini değerlendirmek için istenir.",
        "result": "Düzenli taşikardi; T dalgası içine gömülü ek atriyal dalgalar ve 2:1 AV iletim izlenir.",
        "rows": [
          [
            "Ventrikül hızı",
            "110/dk",
            "Bazal 70–80/dk",
            "Yüksek"
          ],
          [
            "Atriyal aktivite",
            "Yaklaşık 220/dk",
            "Sinüste tek P beklenir",
            "IART lehine"
          ],
          [
            "Hız değişkenliği",
            "Minimal",
            "Sinüste değişkenlik beklenir",
            "Reentran patern"
          ]
        ]
      },
      {
        "name": "Transözofageal ekokardiyografi",
        "type": "Imaging",
        "why": "Aritmi süresi >48 saat veya bilinmiyorsa kardiyoversiyon öncesi trombüs dışlamak için istenir.",
        "result": "Atriyal trombüs açısından değerlendirme planlanır.",
        "rows": [
          [
            "Aritmi süresi",
            "Yaklaşık 2 hafta",
            ">48 saatte trombüs riski",
            "Kritik"
          ],
          [
            "TEE hedefi",
            "Atriyal trombüs",
            "Kardiyoversiyon öncesi dışlanmalı",
            "Gerekli"
          ]
        ]
      }
    ],
    "whyCorrect": "Fontan hastasında atriyal skar çevresinde reentran taşikardi gelişebilir ve ventrikül hızı yalnızca 110/dk olsa bile klinik kötüleşme yapabilir. Uzun süredir devam eden atriyal aritmide kardiyoversiyon öncesi trombüs değerlendirmesi gerekir.",
    "wrongNotes": {
      "Basit sinüs taşikardisi": "Sinüs taşikardisi ateş, ağrı veya dehidratasyonla değişkenlik gösterir; burada sabit hız ve atriyal cerrahi öyküsü var.",
      "Panik atak": "Panik atak kalıcı ve bekleme süresince değişmeyen düzenli atriyal taşikardiyi açıklamaz.",
      "Ventriküler fibrilasyon": "VF kaotik, nabızsız ve acil arrest ritmidir; hasta stabil ve düzenli taşikardiktir.",
      "Akut bakteriyel endokardit": "Ateş, üfürüm değişikliği ve enfeksiyon bulguları yok; ana bulgu sabit atriyal taşikardidir."
    },
    "pearls": [
      "Fontan sonrası atriyal aritmiler düşük hızda bile ciddi hemodinamik etki yapabilir.",
      ">48 saat atriyal aritmide kardiyoversiyon öncesi trombüs dışlanmalıdır."
    ],
    "management": [
      "Erişkin konjenital kardiyoloji/elektrofizyolojiye danış.",
      "EKG ile IART’yi doğrula ve ventrikül fonksiyonunu değerlendir.",
      "Süre >48 saat olduğundan TEE veya antikoagülasyon stratejisi sonrası kardiyoversiyon/ablasyon planla."
    ],
    "glossary": [
      "Fontan palliasyonu",
      "IART",
      "Transözofageal ekokardiyografi",
      "Erişkin konjenital kalp hastalığı"
    ]
  }
];

function buildRows(investigation) {
  if (Array.isArray(investigation.rows) && investigation.rows.length) return investigation.rows;
  return [[investigation.name, investigation.result || 'Klinik veri mevcut.', 'Olgu bağlamına göre yorumlanır', 'Klinik olarak anlamlı']];
}

function makeDifferentials(definition) {
  return Object.fromEntries(
    definition.options
      .filter((option) => option !== definition.correct)
      .map((option) => [
        option,
        {
          explanation: definition.wrongNotes?.[option] || `${option} bazı olgularda düşünülebilir; ancak bu olgudaki öykü, fizik muayene ve EKG bulguları ${definition.correct} lehine daha güçlüdür.`,
          comparisonPoints: [
            definition.wrongNotes?.[option] || 'Olgu verileri bu seçeneği birincil karar olarak desteklemez.',
            definition.distinctiveClues?.[0] || definition.learningOutcome,
            definition.distinctiveClues?.[1] || 'Objektif ritim verisi doğru cevabı güçlendirir.',
          ],
        },
      ]),
  );
}

function makeCase(definition, index) {
  const investigations = (definition.investigations || []).map((investigation, investigationIndex) => ({
    id: investigation.id || `${definition.id}-test-${investigationIndex + 1}`,
    label: investigation.name,
    type: investigation.type || 'Clinical',
    priority: investigation.priority || 'Useful',
    summary: investigation.result,
    whyOrder: investigation.why,
    findings: [investigation.why, investigation.result].filter(Boolean),
    rows: buildRows(investigation),
  }));

  const evidenceChain = (definition.distinctiveClues || []).slice(0, 5).map((text, clueIndex) => ({
    title: clueIndex === 0 ? 'Karar verdirici ipucu' : 'Olgu kanıtı',
    text,
  }));

  const pearls = (definition.pearls || []).slice(0, 4).map((text, pearlIndex) => ({
    label: pearlIndex === 0 ? 'Sınav bilgisi' : 'Kritik ipucu',
    text,
  }));

  const management = (definition.management || []).slice(0, 4).map((text, stepIndex) => ({
    title: ['İlk yaklaşım', 'Tanısal doğrulama', 'Tedavi basamağı', 'İzlem'][stepIndex] || 'Yönetim',
    text,
  }));

  const differentials = makeDifferentials(definition);
  const whyWrong = Object.fromEntries(
    Object.entries(differentials).map(([option, detail]) => [option, detail.explanation]),
  );

  return {
    id: definition.id,
    branchId: definition.branchId || 'pediatrics',
    title: definition.title,
    difficulty: definition.difficulty || 'PDF dönüşümü · TUS/komite düzeyi',
    clinicalFocus: definition.clinicalFocus || definition.learningOutcome,
    sourceLabel: SOURCE_LABEL,
    transformationType: definition.type,
    demographics: definition.demographics,
    setting: definition.setting,
    chiefComplaint: definition.chiefComplaint,
    stem: definition.stem,
    vitals: definition.vitals || {},
    exam: definition.exam || [],
    investigations,
    images: [],
    diagnosis: {
      correct: definition.correct,
      options: definition.options,
      explanation: definition.whyCorrect,
      pearls,
      nextStep: (definition.management || []).join(' '),
      answerFeedback: {
        diagnosisMeta: definition.clinicalFocus || definition.learningOutcome,
        whyCorrect: definition.whyCorrect,
        evidenceChain,
        pearls,
        clinicalPearls: pearls,
        management,
        managementSteps: management,
        learningOutcome: definition.learningOutcome,
        spotClue: definition.distinctiveClues?.[0] || definition.learningOutcome,
        trap: 'Ritim bulgusunu klinik stabilite ve EKG mekanizmasıyla birlikte yorumlamadan tek bulguya göre karar vermek.',
        differentials,
        differentialComparison: differentials,
        whyWrong,
        feedbackStandardVersion: 'pdf-arrhythmia-conversion-v1',
      },
      question: definition.question,
    },
    question: definition.question,
    patientIntro: {
      profile: `${definition.demographics} · ${definition.setting}`,
      presentation: definition.chiefComplaint,
      riskContext: definition.riskContext || [],
      distinctiveClues: definition.distinctiveClues || [],
      historySummary: definition.stem,
      priorityFocus: definition.learningOutcome,
    },
    glossaryTerms: definition.glossary || [],
    contentSource: {
      label: SOURCE_LABEL,
      sourceChapterIndex: index + 1,
      note: 'Uploaded PDF content was reviewed and transformed into a paraphrased interactive KlinikIQ case object.',
    },
  };
}

export const pediatricArrhythmiaPdfCases = attachClinicalVisualsToCases(definitions.map(makeCase), clinicalVisualManifest);
