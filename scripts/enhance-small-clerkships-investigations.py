import json
from pathlib import Path
from copy import deepcopy
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / 'src/data/cases.js'
REPORT_DIR = ROOT / 'quality-reports'
REPORT_DIR.mkdir(exist_ok=True)

source = DATA_FILE.read_text(encoding='utf-8')
start_marker = 'export const rawCases = '
start = source.index(start_marker) + len(start_marker)
end_marker = '\n];\n\nexport const cases ='
array_end = source.index(end_marker, start) + len('\n]')
suffix_start = source.index(end_marker, start) + len('\n];')
raw_array_text = source[start:array_end]
cases = json.loads(raw_array_text)
original_cases = deepcopy(cases)

def slug(text: str) -> str:
    tr = str.maketrans({'ı':'i','İ':'i','ğ':'g','Ğ':'g','ü':'u','Ü':'u','ş':'s','Ş':'s','ö':'o','Ö':'o','ç':'c','Ç':'c'})
    out = ''.join(ch.lower().translate(tr) if ch.isalnum() else '-' for ch in str(text))
    while '--' in out:
        out = out.replace('--','-')
    return out.strip('-') or 'tetkik'

def inv(case_id, key, title, category, type_, rows, summary, tag, score, order, priority='essential', subtype=None, treatment='', emergency='', purpose=None):
    subtype = subtype or title
    item = {
        'id': f'{case_id}-{slug(key)}',
        'label': title,
        'title': title,
        'orderLabel': title,
        'type': type_,
        'priority': priority,
        'subtype': subtype,
        'category': category,
        'testTypeCategory': category,
        'summary': summary,
        'clinicalMeaning': summary,
        'result': {
            'title': title,
            'summary': summary,
            'interpretation': summary,
            'values': rows,
            'rows': rows,
        },
        'rows': rows,
        'postAnswerExplanation': summary,
        'interpretation': summary,
        'explanationAfterAnswer': summary,
        'testValueLabel': tag,
        'educationalValue': tag,
        'clinicalPriorityLabel': tag,
        'scoreImpact': score,
        'scoreValue': score,
        'clinicalFlowOrder': order,
        'purpose': purpose or summary,
        'inlineFeedback': summary,
        'treatmentImpact': treatment,
        'emergencyValue': emergency,
    }
    return item

def set_layer_meta(case, subspecialty, objective_note):
    case['useSyntheticInvestigationBank'] = False
    case['preserveInvestigationOrder'] = True
    case['smallClerkshipsInvestigationLayerEnhanced'] = True
    case['smallClerkshipsInvestigationLayerVersion'] = 'v398-small-clerkships-investigation-layer'
    case['smallClerkshipsSubspecialty'] = subspecialty
    case['investigationLayerMeta'] = {
        'enhancedAt': '2026-05-29',
        'editor': 'small-clerkships-investigation-layer-enhancement',
        'scope': 'Only branchId === minor-rotations general clinical cases',
        'subspecialty': subspecialty,
        'objective': 'Multidisipliner küçük staj gerçekçiliği, acil öncelik, organ/fonksiyon koruma, basitten komplekse tetkik akışı, tetkik değer etiketi ve girişim geciktirmeme güvenlik kapısı',
        'note': objective_note,
    }

MAP = {}

def add(case_id, subspecialty, note, investigations):
    MAP[case_id] = (subspecialty, note, investigations)

# 1 Anaphylaxis
cid='v163-new-001-akut-sistemik-reaksiyon'
add(cid, 'Acil servis / immünoloji - anafilaksi',
    'Anafilaksi vakasında objektif veri katmanı klinik tanı → hava yolu/oksijenasyon-dolaşım güvenliği → destekleyici doğrulama/izlem şeklinde düzenlendi; IM adrenalin laboratuvar beklenerek geciktirilmez.', [
    inv(cid,'anafilaksi-klinik-kriterleri','Anafilaksi klinik kriterleri','clinicalAssessment','clinical',[
        ['Başlangıç zamanı','Antibiyotik enjeksiyonundan yaklaşık 10 dakika sonra','Dakikalar içinde reaksiyon beklenebilir','Acil'],
        ['Deri/mukoza','Yaygın ürtiker ve dudak ödemi','Olmaması beklenir','Pozitif'],
        ['Solunum + dolaşım','Hışıltı, SpO₂ düşüklüğü ve hipotansiyon','Stabil solunum/dolaşım beklenir','Kritik']
    ],'Deri-mukoza bulgusuna solunum ve dolaşım etkilenmesi eşlik ettiğinde tanı kliniktir; intramüsküler adrenalin laboratuvar sonucu beklenerek geciktirilmez.','Acil klinik karar',5,1, emergency='Anafilakside ilk özgül tedavi IM adrenalindir; antihistaminik veya steroid adrenalin yerine geçmez.'),
    inv(cid,'hava-yolu-oksijenasyon-dolasim','Hava yolu, oksijenasyon ve dolaşım güvenliği','clinicalAssessment','clinical',[
        ['SpO₂','%91 oda havasında','≥%95 beklenir','Düşük'],
        ['Kan basıncı','80/45 mmHg','Normotansiyon beklenir','Şok riski'],
        ['Akciğer muayenesi','Yaygın hışıltı','Hışıltı olmamalı','Bronkospazm']
    ],'Hipoksemi, bronkospazm ve hipotansiyon aynı anda yönetilmelidir; oksijen, sıvı ve hava yolu hazırlığı adrenalin tedavisiyle eş zamanlı planlanır.','Acil güvenlik testi',5,2, emergency='Solunum veya dolaşım kötüleşmesi varsa resüsitasyon basamağı geciktirilmez.'),
    inv(cid,'serum-triptaz-izlem','Serum triptaz ve gözlem planı','laboratory','lab',[
        ['Triptaz','Akut faz ve bazal örnekle karşılaştırılabilir','Rutin tanı için zorunlu değildir','Destekleyici'],
        ['Gözlem','Bifazik reaksiyon açısından izlem','Klinik stabiliteye göre','İzlem']
    ],'Serum triptaz anafilaksiyi geriye dönük destekleyebilir ve gözlem bifazik reaksiyon riskini azaltır; ancak akut tedavi kararı klinik tabloyla verilir.','İzlem için değerli',2,3,priority='useful')
])

# 2 acute stroke old
cid='v163-new-005-ani-gelisen-norolojik-defisit'
add(cid,'Nöroloji / acil inme görüntüleme',
    'Akut fokal defisit vakasında objektif veri kapiller glukoz → kanama dışlama BT → vasküler görüntüleme/laboratuvar hazırlığı şeklinde düzenlendi; reperfüzyon penceresi gereksiz testlerle geciktirilmez.',[
    inv(cid,'kapiller-glukoz','Kapiller kan glukozu','bedside','bedside',[
        ['Glukoz','104 mg/dL','70-140 mg/dL','Referans içinde'],
        ['Taklitçi olasılığı','Hipoglisemi dışlandı','Dışlanmalı','Dışlandı']
    ],'Normal kapiller glukoz hipoglisemi gibi tedavisi farklı bir inme taklitçisini geri plana iter; fokal defisitte görüntüleme ve reperfüzyon değerlendirmesi devam eder.','İlk basamak veri',3,1),
    inv(cid,'kontrastsiz-bt','Kontrastsız beyin BT','imaging','ct',[
        ['Akut kanama','Saptanmadı','Kanama olmamalı','Dışlandı'],
        ['Erken iskemi bulgusu','Belirgin geniş infarkt bulgusu yok','Geniş infarkt olmamalı','Reperfüzyon adayı']
    ],'Kontrastsız BT reperfüzyon tedavisinden önce intrakraniyal kanamayı hızla dışlamak için ilk görüntülemedir; tedavi penceresinde ileri testler bu basamağı geciktirmemelidir.','Acil klinik karar',5,2, emergency='Kanama dışlandıktan sonra reperfüzyon uygunluğu hızla değerlendirilir.'),
    inv(cid,'bt-anjiyografi-lab','BT anjiyografi ve temel tedavi hazırlığı','imaging','ct',[
        ['Büyük damar oklüzyonu','Şüphe varsa CTA ile değerlendirilir','Klinik hedefe göre','Girişim planı'],
        ['Koagülasyon/trombosit','Tromboliz güvenliği için istenir','Kontrendikasyon olmamalı','Güvenlik']
    ],'BT anjiyografi büyük damar oklüzyonu ve trombektomi planı için değerlidir; temel laboratuvarlar alınırken kanama dışlama ve zaman kritik reperfüzyon akışı aksatılmamalıdır.','Girişim planını etkiler',4,3,priority='useful')
])

# 3 septic arthritis old
cid='v164-new-013-atesli-monoartrit'
add(cid,'Ortopedi / enfeksiyon - septik artrit',
    'Septik artrit vakasında akış eklem muayenesi → inflamasyon/kan kültürü → acil artrosentez → grafi/izlem şeklinde düzenlendi; antibiyotik ve drenaj kararı aspirasyonla ilişkilendirildi.',[
    inv(cid,'eklem-klinik','Akut monoartrit klinik değerlendirmesi','clinicalAssessment','clinical',[
        ['Eklem görünümü','Sıcak, şiş ve hassas diz','Eklemde kızarıklık/ısı artışı olmamalı','Acil'],
        ['Pasif hareket','İleri derecede ağrılı','Pasif hareket ağrısız olmalı','Eklem içi alarm'],
        ['Yük verme','Yük veremiyor','Yük verebilmesi beklenir','Fonksiyon kaybı']
    ],'Ateşli, sıcak-şiş tek eklem ve pasif hareket ağrısı septik artrit olasılığını artırır; tanısal aspirasyon ve ampirik tedavi süreci geciktirilmemelidir.','Acil klinik karar',5,1, emergency='Eklem kıkırdağı hasarı saatler içinde ilerleyebilir.'),
    inv(cid,'inflamasyon-kan-kultur','Hemogram/CRP ve kan kültürü','laboratory','lab',[
        ['Lökosit','15.200/mm³','4.000-10.000/mm³','Yüksek'],
        ['CRP','118 mg/L','<5 mg/L','Yüksek'],
        ['Kan kültürü','Ateşli tabloda antibiyotik öncesi alınır','Negatif beklenir','Etken örneklemesi']
    ],'Yüksek inflamasyon belirteçleri ve olası bakteriyemi septik süreci destekler; kültür alınması uygundur fakat eklem aspirasyonu ve tedavi gereksiz bekletilmez.','İlk basamak veri',3,2),
    inv(cid,'sinovyal-sivi','Acil artrosentez ve sinovyal sıvı analizi','fluidAnalysis','procedure',[
        ['Sinovyal lökosit','Çok yüksek, nötrofil baskın','Düşük hücre beklenir','Pürülan patern'],
        ['Gram boyama/kültür','Etken için örnek alındı','Üreme olmamalı','Tanısal'],
        ['Kristal analizi','Eş zamanlı değerlendirilir','Kristal yokluğu beklenir','Ayırıcı tanı']
    ],'Sinovyal sıvı hücre sayımı, Gram boyama, kültür ve kristal analizi ateşli monoartritte karar verdirici basamaktır; aspirasyon sonrası ampirik antibiyotik ve ortopedik drenaj planı hızlanır.','Hedefli test',5,3, treatment='Ampirik antibiyotik ve drenaj kararı sinovyal sıvı örneği alındıktan sonra geciktirilmez.'),
    inv(cid,'diz-grafisi','Diz direkt grafisi','imaging','xray',[
        ['Kırık/çıkık','Saptanmadı','Travmatik bulgu olmamalı','Ayırıcı tanı'],
        ['Eklem aralığı','Akut dönemde nonspesifik olabilir','Normal olabilir','Sınırlı katkı']
    ],'Direkt grafi kırık, çıkık veya ileri dejeneratif değişikliği ayırmaya yardım eder; normal grafi septik artriti dışlamaz.','Bu olguda sınırlı katkı',1,4,priority='useful')
])

# 4 torsion
cid='v164-new-016-akut-skrotal-agri'
add(cid,'Üroloji - testis torsiyonu',
    'Akut skrotum vakasında akış klinik torsiyon değerlendirmesi → epididimit ayrımı için idrar verisi → hızlı Doppler → organ kurtarıcı eksplorasyon şeklinde düzenlendi; Dopplerin cerrahiyi geciktirmemesi vurgulandı.',[
    inv(cid,'akut-skrotum-klinik','Akut skrotum klinik değerlendirmesi','urogenital','clinical',[
        ['Başlangıç','Ani ve şiddetli ağrı','Kademeli/iltihabi ağrı beklenmez','Torsiyon alarmı'],
        ['Testis pozisyonu','Yüksek yerleşimli ve transvers','Normal yerleşim beklenir','Patolojik'],
        ['Kremaster refleksi','Alınamıyor','Alınması beklenir','Kritik bulgu']
    ],'Ani başlayan şiddetli ağrı, yüksek-transvers testis ve kaybolmuş kremaster refleksi torsiyon olasılığını çok artırır; yüksek klinik şüphede görüntüleme beklemek testis canlılığını riske atabilir.','Acil klinik karar',5,1, emergency='Organ kurtarıcı ürolojik eksplorasyon klinik şüpheyle başlatılabilir.'),
    inv(cid,'idrar-analizi-uretrit','İdrar analizi ve üretrit bulgusu','urogenital','urine',[
        ['Lökosit/nitrit','Belirgin pozitiflik yok','Enfeksiyon bulgusu olmamalı','Epididimit aleyhine'],
        ['Üretral akıntı','Yok','Akıntı olmamalı','Destekleyici']
    ],'İdrar analizi epididimit ayrımına destek olabilir; ancak torsiyon bulguları belirginken negatif ya da bekleyen idrar sonucu cerrahi kararı geciktirmemelidir.','Tedaviyi geciktirmez',2,2,priority='useful'),
    inv(cid,'skrotal-doppler','Skrotal Doppler ultrasonografi','imaging','ultrasound',[
        ['Kan akımı','Sol testiste belirgin azalmış/izlenmiyor','Simetrik akım beklenir','İskemi lehine'],
        ['Epididim bulgusu','Belirgin hiperemi yok','Epididimitte hiperemi beklenir','Ayırıcı']
    ],'Skrotal Doppler kan akımını göstererek tanıyı destekler; yalnızca hızlı ulaşılabiliyorsa kullanılır ve yüksek klinik şüphede cerrahi eksplorasyonu geciktirmez.','Cerrahi geciktirmez',4,3, emergency='Doppler için beklemek testis canlılığını azaltabilir.'),
    inv(cid,'urolojik-eksplorasyon','Acil ürolojik eksplorasyon hazırlığı','procedure','surgery',[
        ['Zaman penceresi','Saatler içinde canlılık azalır','Gecikme olmamalı','Organ kurtarıcı'],
        ['Plan','Eksplorasyon, detorsiyon ve bilateral fiksasyon','Konservatif izlem uygun değil','Girişim']
    ],'Klinik olasılık yüksek olduğunda eksplorasyon tanısal ve tedavi edici basamaktır; amaç testis canlılığını korumaktır.','Organ kurtarıcı öncelik',5,4, treatment='Acil cerrahi eksplorasyon ve detorsiyon tedavinin merkezidir.')
])

# 5 serotonin linezolid
cid='v164-new-019-ilac-sonrasi-ajitasyon-ve-ates'
add(cid,'Psikiyatri / toksikoloji - serotonin toksisitesi',
    'Serotonin toksisitesi vakasında akış ilaç etkileşimi ve nöromüsküler toksidrom → hipertermi/otonom güvenlik → CK-elektrolit/renal izlem → EKG-sedasyon güvenliği olarak düzenlendi.',[
    inv(cid,'ilac-etkilesimi-toksidrom','İlaç etkileşimi ve toksidrom değerlendirmesi','clinicalAssessment','clinical',[
        ['İlaç kombinasyonu','SSRI + linezolid','Serotonerjik yük olmamalı','Yüksek risk'],
        ['Nöromüsküler bulgu','Hiperrefleksi ve spontan klonus','Klonus olmamalı','Kritik'],
        ['Mental/otonom bulgu','Ajitasyon, terleme, ishal ve ateş','Stabil mental durum beklenir','Toksidrom']
    ],'Serotonerjik ilaç birlikteliği sonrası klonus ve hiperrefleksi gelişmesi serotonin toksisitesi için karar verdiricidir; sorumlu ilaçlar kesilir ve destek tedavi geciktirilmez.','Acil klinik karar',5,1, treatment='İlaç kesilmesi, destek tedavi ve gerekirse siproheptadin klinik kararla başlatılır.'),
    inv(cid,'hipertermi-otonom','Hipertermi ve otonom stabilite izlemi','clinicalAssessment','monitoring',[
        ['Ateş','38.8 °C','Ateş olmamalı','Yüksek'],
        ['Nabız/TA','Taşikardi ve hipertansif eğilim','Stabil beklenir','Otonom aktivasyon'],
        ['Kas rijiditesi','Kurşun boru tarzında değil','NMS ayırımı','Ayırıcı']
    ],'Ateş ve otonom hiperaktivite ciddiyet izleminde önemlidir; rijidite paterninin farklı olması nöroleptik malign sendromdan ayrımı güçlendirir.','Acil güvenlik testi',4,2),
    inv(cid,'ck-elektrolit-renal','CK, elektrolit ve böbrek fonksiyon izlemi','laboratory','lab',[
        ['CK','Yüksek eğilimli','Normal beklenir','Rabdomiyoliz riski'],
        ['Kreatinin','Yakın izlem gerekir','Referans içinde olmalı','Organ güvenliği'],
        ['Sodyum/potasyum','Ajitasyon ve sıvı kaybı açısından izlenir','Stabil beklenir','İzlem']
    ],'Kas aktivitesi ve hipertermi rabdomiyoliz ile böbrek hasarı oluşturabilir; laboratuvar izlemi tedavi şiddetini belirler ama tanı klinik toksidromla konur.','İzlem için değerli',3,3,priority='useful'),
    inv(cid,'ekg-sedasyon-guvenligi','EKG ve sedasyon güvenliği','cardiac','ecg',[
        ['QT/QRS','Sedasyon/ilaç seçimi öncesi değerlendirilir','Belirgin uzama olmamalı','Güvenlik'],
        ['Ritim','Sinüs taşikardisi','Malign aritmi olmamalı','İzlem']
    ],'Ajite toksik hastada sedatif ve destek tedavi seçimi için kardiyak güvenlik değerlendirilir; EKG tanıyı koymaz ancak güvenli yönetimi destekler.','Tedaviyi geciktirmez',2,4,priority='useful')
])

# 6 GBS old
cid='v165-new-025-yukselen-gucsuzluk-tablosu'
add(cid,'Nöroloji / FTR kesişimi - Guillain-Barre sendromu',
    'GBS vakasında objektif veri nörolojik lokalizasyon → solunum güvenliği → BOS → elektrofizyolojik destek sırasına alındı; IVIG/plazmaferez kararı solunum izlemiyle birlikte geciktirilmez.',[
    inv(cid,'norolojik-lokalizasyon','Yükselen güçsüzlük ve refleks muayenesi','neurologic','clinical',[
        ['Güçsüzlük paterni','Bacaklardan kollara ilerleyen simetrik güç kaybı','Simetrik progresyon olmamalı','Arefleksik patern'],
        ['Refleks','Yaygın azalmış/alınamıyor','Korunması beklenir','Arefleksi'],
        ['Duyu seviyesi/sfinkter','Yok','Miyelopati bulgusu olmamalı','Ayırıcı']
    ],'Yükselen simetrik güçsüzlük ve arefleksi periferik sinir/kök tutulumunu düşündürür; duyu seviyesi ve sfinkter kaybının olmaması spinal kord basısını geri plana iter.','Klinik ilk değerlendirme',4,1),
    inv(cid,'fvc-nif','Zorlu vital kapasite/NIF izlemi','respiratory','functional',[
        ['FVC','Yakın seri izlem gerektirir','Yaşa/boya göre korunmalı','Solunum riski'],
        ['NIF','Negatif inspiratuvar güç izlenir','Yeterli inspirasyon beklenir','Ventilasyon güvenliği']
    ],'GBS’de solunum kasları hızla etkilenebilir; vital kapasite veya NIF düşüşü yoğun bakım ve ventilasyon hazırlığını belirler.','Solunum güvenliği',5,2, emergency='Solunum kötüleşmesi IVIG kararını ve yoğun bakım izlemini hızlandırır.'),
    inv(cid,'bos','Beyin omurilik sıvısı analizi','fluidAnalysis','fluidAnalysis',[
        ['Protein','Yüksek','Normal/düşük beklenir','Yüksek'],
        ['Hücre sayısı','Normal veya hafif artmış','Belirgin pleositoz beklenmez','Albuminositolojik ayrışma']
    ],'Yüksek protein ve normal hücre sayısı albuminositolojik dissosiasyonu destekler; erken dönemde normal olabileceği için klinik-solunum güvenliği önceliği korunur.','Doğrulayıcı test',4,3),
    inv(cid,'emg-ncs','Sinir iletim çalışması/EMG','functional','functional',[
        ['İletim hızı','Yavaşlama/blok görülebilir','Normal iletim beklenir','Demiyelinizasyon desteği'],
        ['F dalgaları','Uzama/kayıp olabilir','Normal beklenir','Kök tutulumu']
    ],'Elektrofizyoloji periferik demiyelinizan süreci destekler ve ayırıcı tanıya yardım eder; solunum riski varsa tedavi elektrofizyoloji beklenerek geciktirilmez.','Elektrofizyolojik destek',3,4,priority='useful')
])

# 7 MG old pathophys
cid='v166-new-034-gun-icinde-artan-kas-gucsuzlugu'
add(cid,'Nöroloji / immünoloji - myastenia gravis mekanizması',
    'Myastenia vakasında akış klinik fluktuasyon → solunum/bulber güvenlik → antikor → elektrofizyoloji → timus taraması şeklinde düzenlendi.',[
    inv(cid,'klinik-fluktuasyon','Okülobulber yorulabilirlik değerlendirmesi','neurologic','clinical',[
        ['Pitoz/diplopi','Gün içinde ve yukarı bakışla artıyor','Sabit defisit beklenmez','Fluktuasyon'],
        ['Bulber yakınma','Uzun konuşunca ses zayıflıyor','Bulber yorulma olmamalı','Risk'],
        ['Duyu/refleks','Korunmuş','Duyu kaybı veya arefleksi beklenmez','Ayırıcı']
    ],'Yorulmakla artan okülobulber güçsüzlük ve korunmuş duyu-refleks muayenesi nöromüsküler kavşak bozukluğunu düşündürür.','Klinik ilk değerlendirme',4,1),
    inv(cid,'solunum-bulber','Vital kapasite/NIF ve bulber güvenlik','respiratory','functional',[
        ['Vital kapasite','Bulber yakınma varsa seri izlenir','Korunması beklenir','Solunum güvenliği'],
        ['Yutma/aspirasyon','Yakınma varsa değerlendirilir','Aspirasyon riski olmamalı','Bulber risk']
    ],'Bulber veya solunum yakınması olan myastenik hastada vital kapasite/NIF izlemi kriz riskini belirler; antikor veya EMG sonucu beklenirken solunum güvenliği atlanmamalıdır.','Solunum güvenliği',5,2,priority='useful'),
    inv(cid,'achr-antikor','Asetilkolin reseptör antikoru','laboratory','lab',[
        ['Anti-AChR','Pozitif','Negatif beklenir','Otoimmün destek'],
        ['MuSK/LRP4','AChR negatifse seçilmiş durumda','Rutin ilk basamak değil','Seçilmiş test']
    ],'Anti-AChR pozitifliği postsinaptik nikotinik reseptörlere karşı otoimmüniteyi destekler; negatiflik klinik şüphe güçlü ise hastalığı tamamen dışlamaz.','Otoimmün destek',4,3),
    inv(cid,'rns','Tekrarlayan sinir uyarım testi','functional','functional',[
        ['Yanıt paterni','Dekremental kas aksiyon potansiyeli','Yanıt sabit kalmalı','İletim güvenliği azalır'],
        ['Klinik ilişki','Yorulabilir güçsüzlükle uyumlu','Uyumsuz olmamalı','Hedefli']
    ],'Dekremental yanıt tekrarlayan uyarıda kas yanıtının sürdürülemediğini gösterir ve postsinaptik nöromüsküler iletim bozukluğunu destekler.','Elektrofizyolojik destek',4,4),
    inv(cid,'toraks-bt','Timus değerlendirmesi için toraks BT','imaging','ct',[
        ['Timus','Hiperplazi/timoma açısından değerlendirilir','Kitle olmamalı','Eşlik eden durum'],
        ['Zamanlama','Tanı desteklendikten sonra planlanır','Acil solunum güvenliğinin önüne geçmez','Seçilmiş']
    ],'Myastenia graviste timus patolojisi tedavi planını etkileyebilir; ancak akut bulber/solunum güvenliği antikor veya görüntüleme basamaklarından önce gelir.','Girişim planını etkiler',2,5,priority='useful')
])

# 8 opioid
cid='v167-new-041-bilinc-degisikligi-ve-solunum-baskilanmasi'
add(cid,'Acil toksikoloji - opioid intoksikasyonu',
    'Opioid toksidromunda akış klinik triad/hava yolu → kan gazı → kapiller glukoz ve eşlik eden neden dışlama → gözlem/yeniden doz güvenliği olarak düzenlendi.',[
    inv(cid,'toksidrom-havayolu','Toksidrom ve hava yolu değerlendirmesi','clinicalAssessment','clinical',[
        ['Bilinç','Somnolans, ağrılı uyarana kısa yanıt','Uyanık beklenir','Baskılanma'],
        ['Pupil','Belirgin miyozis','Normal pupil beklenir','Opioid patern'],
        ['Solunum','Yavaş ve yüzeyel','Yeterli ventilasyon beklenir','Acil']
    ],'Bilinç baskılanması, miyozis ve solunum depresyonu opioid toksidromunu düşündürür; hava yolu desteği ve nalokson hazırlığı eş zamanlı yürütülür.','Acil klinik karar',5,1, emergency='Ventilasyon desteği antidot uygulanırken geciktirilmez.'),
    inv(cid,'kan-gazi','Arter/venöz kan gazı','respiratory','lab',[
        ['pH','7.25','7.35-7.45','Asidemi'],
        ['pCO₂','62 mmHg','35-45 mmHg','Yüksek'],
        ['HCO₃⁻','Akut kompansasyon sınırlı','Normal aralık','Solunum asidozu']
    ],'Hiperkapnik solunum asidozu ventilasyon depresyonunu objektifleştirir; bu bulgu nalokson ve ventilasyon desteği kararını güçlendirir.','Solunum güvenliği',5,2),
    inv(cid,'glukoz-toksikoloji','Kapiller glukoz ve eşlik eden toksisite taraması','bedside','bedside',[
        ['Glukoz','Referans içinde','Hipoglisemi dışlanmalı','Dışlandı'],
        ['Eşlik eden madde','Öykü ve klinikle değerlendirilir','Polisubstans riski olmamalı','Güvenlik']
    ],'Hipoglisemi gibi geri döndürülebilir bilinç değişikliği nedenleri hızlıca dışlanır; toksikoloji sonucu nalokson ve hava yolu yönetimini bekletmez.','İlk basamak veri',3,3),
    inv(cid,'yeniden-doz-izlem','Nalokson sonrası yeniden sedasyon izlemi','clinicalAssessment','monitoring',[
        ['Gözlem','Kısa etkili nalokson sonrası tekrar solunum baskılanması izlenir','Stabil solunum beklenir','İzlem'],
        ['Solunum sayısı/SpO₂','Seri değerlendirilir','Stabil beklenir','Güvenlik']
    ],'Naloksonun etkisi bazı opioidlerden kısa sürebilir; tekrar sedasyon ve solunum baskılanması için gözlem planı gerekir.','İzlem için değerli',2,4,priority='useful')
])

# 9 Parkinson
cid='v167-new-045-yavas-ilerleyen-hareket-bozuklugu'
add(cid,'Nöroloji - Parkinson hastalığı patolojisi',
    'Parkinsonizm vakasında objektif veri klinik motor muayene → atipik bulgu taraması → seçilmiş görüntüleme/tedavi yanıtı düzeyinde düzenlendi; gereksiz rutin ileri test eklenmedi.',[
    inv(cid,'motor-muayene','Hareket bozukluğu muayenesi','neurologic','clinical',[
        ['Tremor','İstirahatte belirgin','Aksiyon tremoru baskın olmamalı','Parkinsonizm'],
        ['Bradikinezi/rijidite','Mevcut','Olmaması beklenir','Motor çekirdek'],
        ['Yürüyüş','Küçük adım ve azalmış kol salınımı','Normal yürüyüş beklenir','Ekstrapiramidal']
    ],'Bradikinezi, istirahat tremoru ve rijidite parkinsonizm çekirdeğini oluşturur; patern bazal ganglion-dopaminerjik devre bozukluğuyla ilişkilendirilir.','Klinik ilk değerlendirme',4,1),
    inv(cid,'atipik-bulgu','Atipik parkinsonizm kırmızı bayrak taraması','clinicalAssessment','clinical',[
        ['Erken düşme/otonom yetmezlik','Belirgin değil','Erken ağır bulgu olmamalı','Tipik lehine'],
        ['Serebellar/piramidal bulgu','Saptanmadı','Olmamalı','Ayırıcı'],
        ['İlaç öyküsü','Dopamin blokörü kullanımı sorgulanır','Neden bulunmamalı','Dışlama']
    ],'Atipik bulguların olmaması idiopatik parkinsonizm olasılığını güçlendirir; ilaç ilişkili parkinsonizm ve yapısal nedenler klinik gereklilik varsa araştırılır.','Ayırıcı tanı desteği',2,2,priority='useful'),
    inv(cid,'secili-mrg-datscan','Seçilmiş durumda beyin MRG / dopaminerjik görüntüleme','imaging','mri',[
        ['MRG','Atipik bulgu varsa yapısal neden için','Rutin zorunlu değil','Seçilmiş'],
        ['Dopaminerjik görüntüleme','Klinik belirsizlikte düşünülebilir','Her olguda gerekmez','Sınırlı katkı']
    ],'Parkinson hastalığı çoğunlukla klinik tanınır; MRG veya dopaminerjik görüntüleme atipik ya da belirsiz olgularda ayırıcı tanıya katkı sağlar.','Bu olguda sınırlı katkı',1,3,priority='optional')
])

# 10 Pemphigus
cid='v168-new-060-agiz-yaralari-ve-gevsek-buller'
add(cid,'Dermatoloji - otoimmün büllöz hastalık',
    'Pemfigus vulgaris vakasında akış dermatolojik morfoloji → lezyonel biyopsi/histopatoloji → perilezyonel DIF → serolojik aktivite desteği şeklinde düzenlendi.',[
    inv(cid,'dermatolojik-morfoloji','Dermatolojik morfoloji ve Nikolsky değerlendirmesi','clinicalAssessment','clinical',[
        ['Mukoza','Yaygın ağrılı oral erozyon','Mukoza tutulumu olmamalı','Pozitif'],
        ['Bül tipi','İnce duvarlı, gevşek ve kolay açılan','Gergin bül beklenmez','Suprabazal patern'],
        ['Nikolsky','Pozitif','Negatif beklenir','Epidermal ayrışma']
    ],'Oral erozyon, gevşek bül ve pozitif Nikolsky keratinosit adezyon kaybını düşündürür; tanı doku ve immünfloresanla desteklenir.','Klinik ilk değerlendirme',4,1),
    inv(cid,'histopatoloji','Lezyonel deri biyopsisi ve histopatoloji','pathology','pathology',[
        ['Biyopsi yeri','Taze lezyon kenarı/lezyonel deri','Nekrotik eski erozyon olmamalı','Doğru örnek'],
        ['Mikroskopi','Suprabazal akantoliz','İntakt epidermal adezyon beklenir','Histopatolojik destek']
    ],'Suprabazal akantoliz keratinositler arası adezyon kaybını gösterir; biyopsi yeri doğru seçilmezse tanısal verim azalır.','Histopatolojik doğrulama',4,2),
    inv(cid,'dif','Perilezyonel direkt immünfloresan','pathology','immunofluorescence',[
        ['Örnek yeri','Perilezyonel sağlam görünümlü deri','Ülser tabanı uygun değildir','Doğru örnek'],
        ['Patern','İntersellüler balık ağı IgG/C3','Lineer bazal membran paterni beklenmez','İmmünfloresan destek']
    ],'Perilezyonel deride intersellüler IgG/C3 birikimi desmozomal hedeflere karşı otoimmün yanıtı destekler; DIF histopatolojiyle birlikte yorumlanır.','İmmünfloresan doğrulama',5,3),
    inv(cid,'dsg-seroloji','Anti-desmoglein 1/3 serolojisi','laboratory','lab',[
        ['Anti-Dsg3','Mukozal baskın tutulumda pozitif olabilir','Negatif beklenir','Otoimmün destek'],
        ['Anti-Dsg1','Deri tutulumuyla ilişkilendirilebilir','Klinik bağlama göre','Aktivite desteği']
    ],'Anti-desmoglein serolojisi tanıyı ve aktiviteyi destekleyebilir; ancak temel tanısal patern klinik, histopatoloji ve DIF birlikteliğiyle kurulur.','Otoimmün destek',2,4,priority='useful')
])

# 11 angle closure older v169
cid='v169-new-070-ani-goz-agrisi-ve-gorme-bulanikligi'
add(cid,'Göz hastalıkları - akut açı kapanması glokomu tedavisi',
    'Akut açı kapanması vakasında akış acil göz muayenesi → GİB ölçümü → ön segment/gonyoskopi → tedavi yanıtı izlemi şeklinde düzenlendi; görmeyi koruyucu basınç düşürme geciktirilmedi.',[
    inv(cid,'gorme-pupil-kornea','Acil göz muayenesi','ophthalmology','clinical',[
        ['Görme','Bulanık, haleler eşlik ediyor','Net görme beklenir','Görme tehdidi'],
        ['Pupil','Orta dilate, ışığa zayıf yanıtlı','Reaktif pupil beklenir','Alarm'],
        ['Kornea','Bulanık/ödemli','Saydam kornea beklenir','Basınç etkisi']
    ],'Ağrılı kırmızı göz, korneal bulanıklık, haleler ve orta dilate pupil akut göz basıncı krizini düşündürür; görme koruyucu tedavi hızla başlatılmalıdır.','Görme tehdidi',5,1, emergency='Acil göz hastalıkları değerlendirmesi ve basınç düşürücü tedavi geciktirilmez.'),
    inv(cid,'gib','Göz içi basıncı ölçümü','clinicalAssessment','tonometry',[
        ['GİB','Belirgin yüksek','10-21 mmHg beklenir','Kritik yüksek'],
        ['Taraf','Semptomatik gözde belirgin','Simetrik normal beklenir','Lateralize']
    ],'Çok yüksek göz içi basıncı kornea ödemi ve pupil bulgularıyla birlikte acil basınç düşürücü tedavi gerektirir.','Acil klinik karar',5,2),
    inv(cid,'slit-gonio','Slit-lamp ve açı değerlendirmesi','ophthalmology','slitLamp',[
        ['Ön kamara','Sığ izlenir','Yeterli derinlik beklenir','Açı kapanması lehine'],
        ['Açı','Gonyoskopiyle dar/kapalı olabilir','Açık açı beklenir','Hedefli']
    ],'Ön segment ve açı değerlendirmesi mekanizmayı destekler; ancak şiddetli ağrı ve yüksek basınçta medikal basınç düşürme bu inceleme için bekletilmez.','Hedefli test',3,3,priority='useful'),
    inv(cid,'tedavi-yanit','Seri GİB ve kornea/görme izlemi','ophthalmology','monitoring',[
        ['Seri GİB','Tedavi sonrası düşüş beklenir','Yüksek kalmamalı','Yanıt izlemi'],
        ['Görme/kornea','Netleşme ve ağrıda azalma izlenir','Kötüleşme olmamalı','Güvenlik']
    ],'Basınç düşürücü tedavi sonrası GİB ve görme yanıtı izlenir; yanıt yetersizse girişimsel göz tedavisi hızla planlanır.','İzlem için değerli',2,4,priority='useful')
])

# 12 angle closure diagnosis v184
cid='v184-new-192-ani-goz-agrisi-ve-gorme-bulanikligi'
add(cid,'Göz hastalıkları - ağrılı kırmızı göz tanısı',
    'Ağrılı kırmızı göz vakasında objektif veri acil görme-pupil-kornea muayenesi → GİB → ön segment açı değerlendirmesi → tedavi yanıtı izlemi şeklinde düzenlendi.',[
    inv(cid,'goz-muayenesi','Görme, pupil ve kornea değerlendirmesi','ophthalmology','clinical',[
        ['Görme','Sol gözde bulanık','Net görme beklenir','Görme tehdidi'],
        ['Pupil','Orta dilate ve ışığa yanıtsız','Reaktif olmalı','Patolojik'],
        ['Kornea','Bulanık/ödemli','Saydam beklenir','Basınç etkisi']
    ],'Tek taraflı ağrı, haleler, kornea ödemi ve orta dilate pupil acil göz basıncı krizini düşündürür; konjonktivit gibi yüzeyel nedenlerden ayrılır.','Görme tehdidi',5,1),
    inv(cid,'gib-olcumu','Göz içi basıncı ölçümü','clinicalAssessment','tonometry',[
        ['Sol GİB','Çok yüksek','10-21 mmHg','Kritik yüksek'],
        ['Sağ GİB','Referans aralığında','10-21 mmHg','Karşılaştırma']
    ],'Tek taraflı çok yüksek göz içi basıncı, ağrılı kırmızı göz ve pupil-kornea bulgularıyla birlikte karar verdirici objektif veridir.','Acil klinik karar',5,2),
    inv(cid,'on-segment','Slit-lamp ve ön kamara/açı değerlendirmesi','ophthalmology','slitLamp',[
        ['Ön kamara','Sığ','Normal derinlik beklenir','Hedefli'],
        ['Açı değerlendirme','Dar/kapalı açı paternini destekler','Açık açı beklenir','Doğrulayıcı']
    ],'Ön kamara ve açı değerlendirmesi mekanizmayı destekler; akut tabloda basınç düşürücü tedavi bu değerlendirme için ertelenmemelidir.','Hedefli test',3,3,priority='useful'),
    inv(cid,'yanit-izlem','Seri görme ve GİB izlemi','ophthalmology','monitoring',[
        ['Ağrı/görme','Tedaviyle düzelme beklenir','Kötüleşme olmamalı','İzlem'],
        ['GİB','Seri ölçümle düşüş izlenir','Yüksek kalmamalı','Tedavi yanıtı']
    ],'Tedavi sonrası seri GİB ve görme izlemi kalıcı optik sinir hasarını önlemek için gereklidir.','İzlem için değerli',2,4,priority='useful')
])

# 13 stroke newer
cid='v185-new-228-ani-konusma-bozuklugu-ve-kol-gucsuzlugu'
add(cid,'Nöroloji / acil inme görüntüleme',
    'Akut inme vakasında objektif veri glukoz/taklitçi dışlama → kontrastsız BT → CTA ve tromboliz güvenlik hazırlığı şeklinde düzenlendi.',[
    inv(cid,'kapiller-glukoz','Kapiller kan glukozu','bedside','bedside',[
        ['Glukoz','108 mg/dL','70-140 mg/dL','Referans içinde'],
        ['Hipoglisemi taklitçisi','Dışlandı','Dışlanmalı','İlk basamak']
    ],'Normal glukoz hipoglisemik taklitçiyi geri plana iter; akut fokal defisitte reperfüzyon öncesi kanama dışlama akışı devam eder.','İlk basamak veri',3,1),
    inv(cid,'kontrastsiz-bt','Kontrastsız beyin BT','imaging','ct',[
        ['İntrakraniyal kanama','Yok','Olmamalı','Dışlandı'],
        ['Geniş erken infarkt','Belirgin değil','Geniş infarkt olmamalı','Uygunluk']
    ],'Reperfüzyon kararı öncesi ilk kritik görüntüleme kontrastsız beyin BT ile kanamayı dışlamaktır; sonuç beklenirken gereksiz ileri tetkiklerle zaman kaybedilmez.','Acil klinik karar',5,2, emergency='Kanama dışlanır dışlanmaz reperfüzyon uygunluğu hızla değerlendirilir.'),
    inv(cid,'cta-koagulasyon','BT anjiyografi ve tromboliz güvenlik verisi','imaging','ct',[
        ['CTA','Büyük damar oklüzyonu açısından değerlendirme','Klinik gereklilikle','Trombektomi planı'],
        ['Trombosit/INR','Tedavi güvenliği için hızlı kontrol','Kontrendikasyon olmamalı','Güvenlik']
    ],'CTA trombektomi adayı büyük damar oklüzyonunu gösterir; koagülasyon/trombosit verisi tromboliz güvenliği için alınır, fakat ilk kanama dışlama basamağı geciktirilmez.','Girişim planını etkiler',4,3,priority='useful')
])

# 14 serotonin triptan
cid='v185-new-229-antidepresan-sonrasi-ajitasyon-ve-klonus'
add(cid,'Psikiyatri / toksikoloji - serotonin sendromu tanısı',
    'Serotonin sendromu vakasında akış serotonerjik maruziyet + klonus → otonom/hipertermi güvenliği → CK/renal-elektrolit izlem → ayırıcı güvenlik şeklinde düzenlendi.',[
    inv(cid,'toksidrom-klonus','Serotonerjik toksidrom değerlendirmesi','clinicalAssessment','clinical',[
        ['Maruziyet','SSRI + triptan aynı dönemde','Serotonerjik kombinasyon olmamalı','Risk'],
        ['Klonus/refleks','Spontan klonus ve hiperrefleksi','Klonus beklenmez','Karar verdirici'],
        ['Mental/otonom','Ajitasyon, ishal, terleme ve ateş','Stabil beklenir','Toksidrom']
    ],'Serotonerjik maruziyet sonrası klonus ve hiperrefleksi tanısal ağırlığı taşır; laboratuvar sonucu beklenmeden ilaçlar kesilir ve destek tedavi planlanır.','Acil klinik karar',5,1),
    inv(cid,'vital-hipertermi','Hipertermi ve otonom izlem','clinicalAssessment','monitoring',[
        ['Ateş','38.5 °C','Ateş olmamalı','Yüksek'],
        ['Nabız/TA','Otonom hiperaktivite ile uyumlu','Stabil beklenir','Aktivasyon'],
        ['Rijidite paterni','Kurşun boru tarzında değil','NMS için tipik değil','Ayırıcı']
    ],'Hipertermi ve otonom dalgalanma ciddiyeti belirler; klonusun baskın olması nöroleptik malign sendromdan ayrımda öğreticidir.','Acil güvenlik testi',4,2),
    inv(cid,'ck-renal-elektrolit','CK, böbrek fonksiyonu ve elektrolitler','laboratory','lab',[
        ['CK','Artış eğilimli olabilir','Normal beklenir','Rabdomiyoliz riski'],
        ['Kreatinin','Yakın izlem','Referans içinde olmalı','Organ güvenliği'],
        ['Elektrolit','Sıvı kaybı/hipertermiye göre izlenir','Stabil beklenir','İzlem']
    ],'CK, renal fonksiyon ve elektrolit izlemi komplikasyonları yakalamak için değerlidir; tanı esas olarak klinik toksidromla kurulur.','İzlem için değerli',3,3,priority='useful')
])

# 15 septic arthritis newer
cid='v185-new-230-atesli-agrili-diz-sisligi'
add(cid,'Ortopedi / enfeksiyon - septik artritte tanı ve tedavi',
    'Septik artrit vakasında eksik karar verdirici artrosentez eklendi; tetkikler klinik eklem alarmı → inflamasyon/kan kültürü → sinovyal sıvı → görüntüleme/izlem sırasına alındı.',[
    inv(cid,'eklem-klinik','Acil eklem muayenesi','clinicalAssessment','clinical',[
        ['Eklem','Sıcak, şiş, eritemli diz','Normal eklem beklenir','Acil'],
        ['Pasif hareket','Çok ağrılı ve kısıtlı','Ağrısız hareket beklenir','Eklem içi alarm'],
        ['Yük verme','Yük veremiyor','Yük verebilmesi beklenir','Fonksiyon kaybı']
    ],'Sıcak-şiş tek eklemde pasif hareket ağrısı septik artrit için acil alarmdır; tanı ve drenaj planı geciktirilmemelidir.','Acil klinik karar',5,1),
    inv(cid,'inflamasyon-kan-kultur','Hemogram/CRP ve kan kültürü','laboratory','lab',[
        ['Lökosit','16.000/mm³','4.000-10.000/mm³','Yüksek'],
        ['CRP','130 mg/L','<5 mg/L','Yüksek'],
        ['Kan kültürü','Antibiyotik öncesi alınır','Negatif beklenir','Etken örneklemesi']
    ],'Serum inflamasyon belirteçleri septik süreci destekler ve kan kültürü bakteriyemiyi yakalayabilir; ancak kesin karar sinovyal sıvı ile verilir.','İlk basamak veri',3,2),
    inv(cid,'artrosentez','Acil artrosentez ve sinovyal sıvı analizi/kültürü','fluidAnalysis','procedure',[
        ['Görünüm','Pürülan/bulanık sıvı','Berrak beklenir','Acil'],
        ['Hücre sayımı','Nötrofil baskın çok yüksek lökosit','Düşük hücre beklenir','Tanısal'],
        ['Gram/kültür/kristal','Etken ve kristal ayırımı için gönderildi','Üreme/kristal olmamalı','Hedefli']
    ],'Acil artrosentez septik artritte karar verdirici basamaktır; örnek alındıktan sonra ampirik antibiyotik ve ortopedik drenaj planı geciktirilmez.','Hedefli test',5,3, treatment='Aspirasyon sonrası ampirik antibiyotik ve drenaj kararı hızla uygulanır.'),
    inv(cid,'direkt-grafi','Diz direkt grafisi','imaging','xray',[
        ['Kırık/çıkık','Yok','Olmamalı','Ayırıcı'],
        ['Kemik yıkımı','Akut erken dönemde belirgin değil','Yıkım olmamalı','Sınırlı']
    ],'Direkt grafi travmatik veya kronik kemik bulgularını ayırmaya yardım eder; normal grafi septik artriti dışlamaz ve aspirasyonu geciktirmez.','Bu olguda sınırlı katkı',1,4,priority='useful')
])

# 16 retinal detachment
cid='v186-new-233-ani-gorme-alani-kaybi'
add(cid,'Göz hastalıkları - retina dekolmanı',
    'Retina acili vakasında objektif veri görme alanı/keskinlik → dilate fundus → oküler USG → makula ve acil retina planı şeklinde düzenlendi.',[
    inv(cid,'gorme-alani','Görme keskinliği ve konfrontasyon alanı','ophthalmology','clinical',[
        ['Görme alanı','Periferden başlayan perde hissi/defekt','Tam alan beklenir','Retinal alarm'],
        ['Ağrı/kızarıklık','Yok','Enflamasyon bulgusu beklenmez','Ayırıcı'],
        ['Risk','Yüksek miyopi','Risk faktörü olmaması beklenir','Risk artışı']
    ],'Ağrısız ışık çakması, uçuşma ve periferik perde hissi retina kaynaklı acil görme kaybını düşündürür; görme alanı ve keskinlik makula tehdidini izlemek için önemlidir.','Görme tehdidi',5,1),
    inv(cid,'dilate-fundus','Dilate fundus muayenesi','ophthalmology','fundoscopy',[
        ['Retina','Ayrılma/katlantı ve yırtık odağı izlenebilir','Yapışık retina beklenir','Hedefli'],
        ['Makula','Tutulum durumu aciliyeti belirler','Makula korunması tercih edilir','Prognoz']
    ],'Dilate fundus muayenesi retina ayrılmasını ve yırtık odağını gösterir; makula tutulmadan acil retina değerlendirmesi görme prognozu için kritiktir.','Acil klinik karar',5,2),
    inv(cid,'okuler-usg','B-mod oküler ultrasonografi','imaging','ultrasound',[
        ['Medya opasitesi','Fundus görülemiyorsa kullanılır','Fundus görülebiliyorsa zorunlu değil','Seçilmiş'],
        ['USG bulgusu','Hareketli membran benzeri retina ayrılması','Normal arka segment beklenir','Destekleyici']
    ],'Fundus muayenesi kısıtlıysa B-mod ultrason retina ayrılmasını destekler; açık fundus bulgusu varsa acil retina yönetimi USG beklenerek geciktirilmez.','Hedefli test',3,3,priority='useful')
])

# 17 negative symptoms
cid='v186-new-234-sosyal-cekilme-ve-duygulanim-azalmasi'
add(cid,'Psikiyatri - negatif belirti değerlendirmesi',
    'Psikiyatri vakasında akış mental durum muayenesi → güvenlik riski → madde/organik neden dışlama şeklinde düzenlendi; rastgele laboratuvar yükü eklenmedi.',[
    inv(cid,'mental-durum','Mental durum ve negatif belirti muayenesi','psychiatric','clinical',[
        ['Duygulanım','Künt','Uygun duygulanım beklenir','Negatif belirti'],
        ['Konuşma','Fakir, yanıt latansı uzun','Akıcı/spontan konuşma beklenir','Aloji'],
        ['Sosyal işlev','Çekilme ve kişisel bakımda bozulma','İşlev korunmalı','İşlev kaybı']
    ],'Eksilen ifade, azalmış spontanlık ve sosyal çekilme negatif belirti kümesini oluşturur; aktif sanrı/halüsinasyonun baskın olmaması pozitif belirti odağını geri plana iter.','Klinik ilk değerlendirme',4,1),
    inv(cid,'guvenlik-risk','İntihar, homicid ve özbakım güvenliği','psychiatric','clinical',[
        ['İntihar/homicid düşünce','Belirgin değil','Aktif risk olmamalı','Güvenlik'],
        ['Özbakım','Bozulmuş','Korunması beklenir','İşlevsel risk'],
        ['Deliryum','Bilinç dalgalanması yok','Olmamalı','Ayırıcı']
    ],'Psikiyatrik olguda güvenlik riski ve özbakım düzeyi yönetim önceliğini belirler; negatif belirti tanımı akut deliryum veya ajitasyonla karıştırılmamalıdır.','Güvenlik değerlendirmesi',3,2),
    inv(cid,'madde-organik','Madde kullanımı ve organik neden dışlama','laboratory','lab',[
        ['Madde öyküsü/tarama','Klinik gereklilikle değerlendirilir','Akut entoksikasyon olmamalı','Dışlama'],
        ['TSH/B12 vb.','Belirti bağlamına göre seçilir','Rutin kör panel değil','Seçilmiş']
    ],'Madde kullanımı veya organik nedenler klinik şüphe varsa dışlanır; bu vaka esas olarak psikopatolojik belirti sınıflamasıyla çözülür.','Bu olguda sınırlı katkı',1,3,priority='optional')
])

# 18 GCA
cid='v187-new-255-yasli-hastada-yeni-bas-agrisi'
add(cid,'Romatoloji / göz acili - dev hücreli arterit',
    'Dev hücreli arterit vakasında akış görme tehdidi muayenesi → ESR/CRP → temporal arter USG/biyopsi → tedavi güvenliği şeklinde düzenlendi; steroid biyopsi beklenerek geciktirilmez.',[
    inv(cid,'gorme-temporal','Görme tehdidi ve temporal arter muayenesi','clinicalAssessment','clinical',[
        ['Temporal arter','Hassas, kalınlaşmış, nabız azalmış','Normal palpasyon beklenir','Vaskülit alarmı'],
        ['Çene klodikasyonu','Mevcut','Olmaması beklenir','İskemik ipucu'],
        ['Görme','Geçici bulanıklık/azalma','Normal görme beklenir','Görme tehdidi']
    ],'Yeni temporal baş ağrısı, çene klodikasyonu ve geçici görme yakınması kalıcı görme kaybı riski taşır; yüksek şüphede steroid biyopsi beklenerek geciktirilmez.','Görme tehdidi',5,1, emergency='Görme bulgusu varsa tedavi acildir.'),
    inv(cid,'esr-crp','ESR ve CRP','laboratory','lab',[
        ['ESR','Belirgin yüksek','Yaşa göre düşük/normal beklenir','Yüksek'],
        ['CRP','Yüksek','<5 mg/L beklenir','Yüksek']
    ],'Yüksek ESR/CRP damar inflamasyonunu destekler; normal değer şüpheyi tamamen dışlamaz ve görme tehdidinde tedavi kararı geciktirilmez.','İlk basamak veri',4,2),
    inv(cid,'temporal-biyopsi-usg','Temporal arter ultrasonu/biyopsisi','imaging','procedure',[
        ['USG','Halo bulgusu araştırılabilir','Damar duvarı normal beklenir','Hedefli'],
        ['Biyopsi','Segmental inflamasyon için planlanır','Normal arter beklenir','Doğrulayıcı']
    ],'Temporal arter biyopsisi veya ultrason tanıyı destekler; ancak yüksek klinik şüphe ve görme belirtisi varsa kortikosteroid başlama kararı bu testlerin sonucunu beklemez.','Tedaviyi geciktirmez',4,3, treatment='Steroid tedavisi tanısal örnekleme beklenerek ertelenmez.'),
    inv(cid,'steroid-guvenlik','Steroid başlangıç güvenliği ve izlem','laboratory','lab',[
        ['Glukoz/TA','Steroid öncesi ve sonrası izlenir','Kontrollü olmalı','Tedavi güvenliği'],
        ['Görme izlemi','Kötüleşme açısından yakın takip','Stabil/düzelme beklenir','Organ güvenliği']
    ],'Yüksek doz steroid başlanırken glukoz, kan basıncı ve görme seyri izlenir; izlem tedaviyi geciktiren bir basamak değildir.','İzlem için değerli',2,4,priority='useful')
])

# 19 orbital cellulitis
cid='v188-new-270-goz-cevresinde-sislik-ve-agri'
add(cid,'KBB / göz - orbital selülit',
    'Orbital selülit vakasında eksik acil göz güvenliği verisi eklendi; akış görme/pupilla-göz hareketi → enfeksiyon laboratuvarı → kontrastlı orbita-sinüs BT → kültür/drenaj şeklinde düzenlendi.',[
    inv(cid,'acil-goz-muayenesi','Acil göz güvenliği muayenesi','ophthalmology','clinical',[
        ['Görme keskinliği','Azalmış','Yaşa uygun normal beklenir','Görme tehdidi'],
        ['Pupilla/RAPD','Yakın izlem gerekir','RAPD olmamalı','Optik sinir alarmı'],
        ['Göz hareketleri','Ağrılı ve kısıtlı','Ağrısız tam hareket beklenir','Orbital tutulum']
    ],'Görme azalması, ağrılı-kısıtlı göz hareketi ve proptoz enfeksiyonun orbital septum arkasına yayıldığını gösterir; IV antibiyotik ve göz-KBB değerlendirmesi geciktirilmez.','Görme tehdidi',5,1, emergency='Görme veya intrakraniyal yayılım riski acil multidisipliner yönetim gerektirir.'),
    inv(cid,'hemogram-crp','Hemogram ve inflamasyon paneli','laboratory','lab',[
        ['Lökosit','18.000/mm³','4.000-10.000/mm³','Yüksek'],
        ['CRP','145 mg/L','<5 mg/L','Yüksek'],
        ['Ateş','Mevcut','Ateş olmamalı','Sistemik enfeksiyon']
    ],'Lökositoz ve CRP yüksekliği invaziv enfeksiyonu destekler; fakat orbital alarm bulguları tedavi önceliğini belirler.','İlk basamak veri',3,2),
    inv(cid,'orbita-sinus-bt','Kontrastlı orbita ve paranazal sinüs BT','imaging','ct',[
        ['Orbital yağ','İnflamasyon/stranding','Normal yağ planı beklenir','Orbital yayılım'],
        ['Sinüs','Etmoid/sinüs kaynaklı yayılım','Sinüzit olmamalı','Kaynak'],
        ['Apse','Subperiostal apse şüphesi','Apse olmamalı','Girişim planı']
    ],'Kontrastlı BT orbital yayılımı, sinüzit kaynağını ve apseyi göstererek göz-KBB ortak drenaj kararını planlatır; IV antibiyotik görüntüleme için gereksiz geciktirilmez.','Apse/komplikasyon taraması',5,3, treatment='Apse, görme azalması veya klinik kötüleşme varsa drenaj değerlendirmesi hızlanır.'),
    inv(cid,'kultur-drenaj','Kan kültürü / apse kültürü ve drenaj değerlendirmesi','microbiology','microbiology',[
        ['Kan kültürü','Ağır/septik tabloda antibiyotik öncesi alınır','Üreme beklenmez','Etken örneklemesi'],
        ['Apse kültürü','Drenaj yapılırsa gönderilir','Apse olmamalı','Hedefli tedavi']
    ],'Kültür etken ve daraltılmış tedavi için değerlidir; görme tehdidi olan çocukta antibiyotik ve uzman değerlendirmesi kültür sonucu beklenerek ertelenmez.','Tedaviyi geciktirmez',3,4,priority='useful')
])

# 20 GBS newer
cid='v189-new-298-enfeksiyon-sonrasi-gucsuzluk'
add(cid,'Nöroloji / FTR kesişimi - Guillain-Barre sendromu',
    'Postenfeksiyöz güçsüzlük vakasında nörolojik lokalizasyon, solunum güvenliği, BOS ve elektrofizyoloji birlikte yapılandırıldı.',[
    inv(cid,'norolojik-muayene','Arefleksik yükselen güçsüzlük muayenesi','neurologic','clinical',[
        ['Dağılım','Alt ekstremiteden yukarı ilerleyen simetrik güçsüzlük','Asimetrik/fokal olmamalı','Periferik patern'],
        ['Refleks','Alınamıyor','Korunması beklenir','Arefleksi'],
        ['Sfinkter/duyu seviyesi','Yok','Miyelopati bulgusu olmamalı','Ayırıcı']
    ],'Yükselen simetrik güçsüzlük ve arefleksi periferik sinir-kök tutulumu lehinedir; duyu seviyesi veya sfinkter kaybı spinal kord acilini düşündürürdü.','Klinik ilk değerlendirme',4,1),
    inv(cid,'solunum-izlem','FVC/NIF ile solunum kapasitesi izlemi','respiratory','functional',[
        ['FVC','Seri izlem gerekir','Korunmalı','Solunum riski'],
        ['NIF','Düşüş ventilasyon hazırlığı gerektirir','Yeterli olmalı','Güvenlik']
    ],'GBS’de solunum kasları hızla etkilenebilir; FVC/NIF izlemi yoğun bakım ve ventilasyon kararını belirler, IVIG kararı bu riskle birlikte düşünülür.','Solunum güvenliği',5,2),
    inv(cid,'bos-analizi','Lomber ponksiyon ve BOS analizi','fluidAnalysis','fluidAnalysis',[
        ['Protein','Yüksek','Normal beklenir','Yüksek'],
        ['Hücre','Normal veya hafif artmış','Belirgin pleositoz olmamalı','Albuminositolojik ayrışma']
    ],'Protein yüksekliği ve normal hücre sayısı albuminositolojik dissosiasyon ile uyumludur; erken dönemde normal olabileceği için klinik ve solunum güvenliği önceliği korunur.','Doğrulayıcı test',4,3),
    inv(cid,'ncs-emg','Sinir iletim çalışması/EMG','functional','functional',[
        ['İletim','Yavaşlama veya iletim bloğu','Normal beklenir','Demiyelinizasyon'],
        ['F dalgası','Uzayabilir/kaybolabilir','Normal beklenir','Kök tutulumu']
    ],'Elektrofizyolojik test periferik demiyelinizasyonu destekler; solunum riski veya hızlı progresyon varsa tedavi bu test beklenerek geciktirilmez.','Elektrofizyolojik destek',3,4,priority='useful')
])

# 21 malignant otitis externa
cid='v189-new-299-diyabetik-hastada-siddetli-kulak-agrisi'
add(cid,'KBB - malign eksternal otit / kafa tabanı osteomiyeliti',
    'Malign eksternal otit vakasında akış KBB muayenesi ve kraniyal sinir güvenliği → inflamasyon/glisemik durum → temporal kemik görüntüleme → kültür/tedavi izlemi şeklinde düzenlendi.',[
    inv(cid,'kbb-kraniyal-sinir','Otoskopi ve kraniyal sinir muayenesi','ent','clinical',[
        ['Dış kulak yolu','Granülasyon dokusu ve kötü kokulu akıntı','Granülasyon olmamalı','Kritik'],
        ['Ağrı','Gece artan şiddetli otalji','Hafif ağrı beklenir','Alarm'],
        ['Fasiyal sinir','Hafif zayıflık','Kraniyal sinir defisiti olmamalı','Yayılım']
    ],'Diyabetik hastada granülasyon dokusu, gece ağrısı ve kraniyal sinir bulgusu basit otitis eksternadan daha derin invazyonu düşündürür; sistemik tedavi geciktirilmez.','Acil klinik karar',5,1),
    inv(cid,'inflamasyon-glisemik','ESR/CRP ve glisemik güvenlik','laboratory','lab',[
        ['CRP/ESR','Yüksek','Düşük/normal beklenir','Enfeksiyon aktivitesi'],
        ['Glukoz/HbA1c','Kötü kontrolü destekler','Kontrollü beklenir','Risk faktörü']
    ],'İnflamasyon belirteçleri hastalık aktivitesi ve tedavi yanıtı takibinde değerlidir; glisemik kontrol kötü prognoz riskini artırır.','İlk basamak veri',3,2),
    inv(cid,'temporal-bt-mrg','Temporal kemik BT / MRG','imaging','ct',[
        ['Kemik tutulum','Erozyon/osteomiyelit açısından değerlendirilir','Kemik sağlam beklenir','Komplikasyon'],
        ['Yumuşak doku/kafa tabanı','Yayılım varsa MRG ile değerlendirilir','Yayılım olmamalı','Girişim planı']
    ],'Temporal kemik BT kemik tutulumunu, MRG ise yumuşak doku ve kafa tabanı yayılımını gösterir; yüksek riskli tabloda sistemik antipseudomonal tedavi görüntüleme için ertelenmez.','Enfeksiyon yayılımı gösterir',5,3),
    inv(cid,'kulak-kultur','Kulak akıntısı kültürü ve antibiyotik duyarlılığı','microbiology','microbiology',[
        ['Kültür','Pseudomonas dahil etken için örnek','Üreme olmamalı','Etken'],
        ['Duyarlılık','Tedavi daraltma için kullanılır','Direnç olmamalı','Tedavi yönlendirme']
    ],'Kültür tedaviyi daraltmaya yardım eder; ancak kötü kontrollü diyabet ve kraniyal sinir bulgusu olan hastada sistemik antipseudomonal tedavi kültür sonucu beklenerek ertelenmez.','Tedaviyi geciktirmez',3,4,priority='useful')
])

# 22 scaphoid
cid='v189-new-300-el-uzerine-dusme-sonrasi-bilek-agrisi'
add(cid,'Ortopedi / travma - okült skafoid kırığı',
    'Skafoid travma vakasında akış nörovasküler muayene → skafoid grafileri → immobilizasyon-kontrol görüntüleme → seçilmiş MRG/BT şeklinde düzenlendi.',[
    inv(cid,'nvd-muayene','Distal nörovasküler ve el bileği muayenesi','orthopedics','clinical',[
        ['Anatomik enfiye çukuru','Belirgin hassas','Hassasiyet olmamalı','Skafoid alarmı'],
        ['Başparmak aksiyel yük','Ağrılı','Ağrısız olmalı','Hedefli'],
        ['Nörovasküler durum','Korunmuş','Defisit olmamalı','Güvenlik']
    ],'FOOSH sonrası enfiye çukuru hassasiyeti ve başparmak aksiyel yük ağrısı okült skafoid kırığı olasılığını artırır; nörovasküler muayene travma güvenliği için temel basamaktır.','Klinik ilk değerlendirme',4,1),
    inv(cid,'skafoid-grafi','El bileği ve özel skafoid grafileri','imaging','xray',[
        ['İlk grafi','Belirgin kırık hattı izlenmeyebilir','Kırık olmamalı','Negatif olabilir'],
        ['Skafoid görünüm','Özel grafilerle değerlendirilir','Normal beklenir','Hedefli']
    ],'İlk grafi normal olsa bile klinik hassasiyet okült skafoid kırığını dışlamaz; immobilizasyon ve kontrol planı gereklidir.','İlk basamak görüntüleme',3,2),
    inv(cid,'immobilizasyon-kontrol','Başparmak destekli immobilizasyon ve kontrol görüntüleme','orthopedics','management',[
        ['İmmobilizasyon','Başparmak spika ile planlanır','Stabilizasyon gerekir','Tedavi güvenliği'],
        ['Kontrol','10-14 gün grafi veya erken ileri görüntüleme','Takipsiz bırakılmamalı','İzlem']
    ],'Klinik şüphe yüksekse negatif grafiye rağmen skafoid kırığı gibi yönetilir; immobilizasyon avasküler nekroz ve kaynamama riskini azaltır.','Organ/fonksiyon kurtarıcı karar',5,3),
    inv(cid,'mrg-bt','Erken MRG veya BT','imaging','mri',[
        ['MRG','Okült kırığı erken gösterebilir','Kırık yoksa normal','Doğrulayıcı'],
        ['BT','Kırık hattı/deplasmanı için seçilmiş durumda','Normal beklenir','Planlama']
    ],'Erken MRG/BT tanıyı hızlandırabilir ve gereksiz immobilizasyonu azaltabilir; ancak yüksek klinik şüphede immobilizasyon görüntüleme randevusu beklenerek ertelenmez.','Hedefli test',3,4,priority='useful')
])

# 23 MG diagnosis
cid='v194-new-332-gun-icinde-artan-cift-gorme'
add(cid,'Nöroloji - oküler/bulber myastenia gravis',
    'Oküler-bulber myastenia vakasında akış klinik yorulabilirlik → solunum/bulber güvenlik → AChR/MuSK serolojisi → RNS/single-fiber EMG → timus taraması olarak düzenlendi.',[
    inv(cid,'klinik-yorulabilirlik','Oküler-bulber yorulabilirlik muayenesi','neurologic','clinical',[
        ['Pitoz/diplopi','Gün içinde artıyor','Sabit defisit beklenmez','Fluktuasyon'],
        ['Çiğneme/konuşma','Yorgunlukla kötüleşiyor','Yorulma olmamalı','Bulber ipucu'],
        ['Duyu/refleks','Korunmuş','Duyu kaybı/arefleksi beklenmez','Ayırıcı']
    ],'Gün içinde artan pitoz, diplopi ve çiğneme yorgunluğu nöromüsküler kavşak hastalığını düşündürür; duyu ve reflekslerin korunması periferik nöropatiyi geri plana iter.','Klinik ilk değerlendirme',4,1),
    inv(cid,'bulber-solunum','Bulber ve solunum güvenliği','respiratory','functional',[
        ['Yutma/aspirasyon','Bulber yakınma varsa sorgulanır','Aspirasyon olmamalı','Güvenlik'],
        ['FVC/NIF','Ciddiyet varsa ölçülür','Korunmalı','Solunum güvenliği']
    ],'Oküler yakınmaya bulber bulgu eşlik ediyorsa solunum güvenliği değerlendirilir; myastenik kriz riski antikor veya EMG sonucu beklenerek atlanmamalıdır.','Solunum güvenliği',4,2,priority='useful'),
    inv(cid,'achr-musk','Anti-AChR antikoru ve seçilmiş MuSK/LRP4 serolojisi','laboratory','lab',[
        ['Anti-AChR','Pozitif','Negatif beklenir','Otoimmün destek'],
        ['MuSK/LRP4','AChR negatifse seçilmiş durumda','Rutin ilk basamak değil','Seçilmiş']
    ],'Anti-AChR pozitifliği postsinaptik reseptör hedefli otoimmüniteyi destekler; klinik şüphe güçlü ise negatif sonuçta ek seroloji düşünülür.','Otoimmün destek',4,3),
    inv(cid,'rns-sfemg','RNS / single-fiber EMG','functional','functional',[
        ['RNS','Dekremental yanıt','Yanıt sabit kalmalı','İletim güvenliği azalır'],
        ['Single-fiber EMG','Jitter artışı gösterebilir','Normal jitter beklenir','Duyarlı destek']
    ],'Dekremental yanıt veya jitter artışı nöromüsküler iletim güvenliğinin azaldığını gösterir; sonuç klinik fluktuasyonla birlikte yorumlanır.','Elektrofizyolojik destek',4,4),
    inv(cid,'timus-bt','Timus için toraks BT','imaging','ct',[
        ['Timus','Timoma/hiperplazi açısından değerlendirilir','Kitle olmamalı','Eşlik eden durum'],
        ['Zamanlama','Tanı desteklendikten sonra planlanır','Acil krizin önüne geçmez','Planlama']
    ],'Timus patolojisi tedavi planını etkileyebilir; akut solunum/bulber güvenlik değerlendirmesinden sonra planlanır.','Girişim planını etkiler',2,5,priority='useful')
])

# 24 HZO
cid='v194-new-333-alinda-vezikuler-dokuntu-ve-goz-agrisi'
add(cid,'Göz hastalıkları / dermatoloji - herpes zoster oftalmikus',
    'HZO vakasında akış V1 dermatomu ve Hutchinson bulgusu → görme/pupilla → slit-lamp/fluorescein → GİB ve oftalmoloji izlemi şeklinde düzenlendi.',[
    inv(cid,'v1-hutchinson','V1 dermatomu ve Hutchinson bulgusu değerlendirmesi','dermatology','clinical',[
        ['Döküntü dağılımı','Tek taraflı V1 dermatomunda gruplaşmış veziküller','Bilateral/yaygın olmamalı','Dermatomal'],
        ['Burun ucu','Vezikül mevcut','Olmaması beklenir','Nazoseriyer risk'],
        ['Ağrı','Yanma tarzında nöropatik ağrı','Ağrı olmayabilir','Destekleyici']
    ],'V1 dermatomu ve burun ucu tutulumu oküler tutulum riskini artırır; sistemik antiviral ve acil göz değerlendirmesi klinik kararla başlatılır.','Görme tehdidi',5,1),
    inv(cid,'gorme-pupil','Görme keskinliği ve pupilla muayenesi','ophthalmology','clinical',[
        ['Görme keskinliği','Yakın izlenir','Normal kalmalı','Güvenlik'],
        ['Pupilla/RAPD','Optik tutulum açısından değerlendirilir','RAPD olmamalı','Alarm'],
        ['Fotofobi','Mevcut','Olmaması beklenir','Oküler tutulum']
    ],'Göz ağrısı ve fotofobi varlığında görme keskinliği ve pupilla bulguları kornea/üvea/optik sinir etkilenmesini yakalamak için acildir.','Acil güvenlik testi',4,2),
    inv(cid,'slit-fluorescein','Slit-lamp ve fluorescein boyama','ophthalmology','slitLamp',[
        ['Kornea','Epitel defekti/dendritiform lezyon açısından bakılır','Boya tutulumu olmamalı','Hedefli'],
        ['Ön kamara','Üveit bulgusu değerlendirilir','Hücre/flare olmamalı','Komplikasyon']
    ],'Slit-lamp ve fluorescein kornea epitel defekti ile üveiti gösterir; antiviral tedavi bu inceleme randevusu beklenerek geciktirilmez.','Hedefli test',4,3),
    inv(cid,'gib-izlem','Göz içi basıncı ve yakın oftalmoloji izlemi','ophthalmology','tonometry',[
        ['GİB','Üveit/trabekülit açısından izlenir','10-21 mmHg','İzlem'],
        ['Takip','Acil göz hastalıkları kontrolü','Gecikmemeli','Görme güvenliği']
    ],'Üveit veya trabekülit göz içi basıncını artırabilir; yakın oftalmoloji izlemi görme komplikasyonlarını azaltır.','İzlem için değerli',2,4,priority='useful')
])

# 25 mania
cid='v194-new-334-uyumadan-enerjik-olma-ve-taskinlik'
add(cid,'Psikiyatri - mani atağı ve güvenlik değerlendirmesi',
    'Mani vakasında akış mental durum → intihar/homicid/ajitasyon güvenliği → madde-organik neden dışlama → tedavi öncesi EKG/metabolik güvenlik olarak düzenlendi.',[
    inv(cid,'mental-durum-mani','Mental durum ve mani belirtileri','psychiatric','clinical',[
        ['Uyku','Azalmış uyku ihtiyacına rağmen enerjik','Uykusuzlukla yorgunluk beklenir','Manik patern'],
        ['Konuşma/düşünce','Basınçlı konuşma ve grandiyözite','Normal hız/içerik beklenir','Duygudurum'],
        ['Davranış','Riskli harcama ve artmış aktivite','Riskli davranış olmamalı','İşlevsel risk']
    ],'Azalmış uyku ihtiyacı, taşkın duygudurum, basınçlı konuşma ve riskli davranış mani atağını destekler; tanı klinik sendrom paternine dayanır.','Klinik ilk değerlendirme',4,1),
    inv(cid,'guvenlik-ajitasyon','Güvenlik, ajitasyon ve karar kapasitesi değerlendirmesi','psychiatric','clinical',[
        ['İntihar/homicid','Aktif risk açısından sorgulanır','Aktif risk olmamalı','Güvenlik'],
        ['Ajitasyon','Davranış kontrolü ve çevre güvenliği değerlendirilir','Güvenli ortam beklenir','Acil'],
        ['İçgörü/karar','Bozulabilir','Korunması beklenir','Yatış kararı']
    ],'Akut manide güvenlik riski, ajitasyon ve karar kapasitesi yatış ile acil sedasyon gereksinimini belirler; bu basamak tanı etiketinden daha önceliklidir.','Acil güvenlik testi',4,2),
    inv(cid,'madde-organik-tarama','Madde ve organik neden taraması','laboratory','lab',[
        ['Toksikoloji','Klinik gereklilikle değerlendirilir','Entoksikasyon olmamalı','Dışlama'],
        ['TSH/temel biyokimya','Tirotoksikoz/metabolik neden için seçilmiş durumda','Belirgin bozukluk olmamalı','Dışlama']
    ],'Madde kullanımı, tirotoksikoz veya metabolik nedenler klinik şüphe varsa dışlanır; ancak tipik mani örüntüsünde gereksiz geniş panel tanıyı geciktirmemelidir.','Ayırıcı tanı desteği',2,3,priority='useful'),
    inv(cid,'ekg-metabolik','Antipsikotik/lityum öncesi EKG ve metabolik güvenlik','cardiac','ecg',[
        ['EKG/QT','Tedavi seçimi öncesi değerlendirilir','Belirgin uzama olmamalı','Güvenlik'],
        ['Böbrek/elektrolit','Lityum veya akut tedavi planına göre','Stabil beklenir','Tedavi güvenliği']
    ],'Akut tedavi planında QT, böbrek fonksiyonu ve elektrolit güvenliği önemlidir; ağır ajitasyonda güvenli sedasyon ve yatış kararı laboratuvar beklenerek geciktirilmez.','Tedaviyi geciktirmez',2,4,priority='useful')
])

# 26 facial palsy
cid='v195-new-361-ani-yuz-felci'
add(cid,'Nöroloji / KBB - periferik fasiyal paralizi',
    'Periferik fasiyal paralizi vakasında akış yüz siniri muayenesi → santral alarm dışlama → göz kornea güvenliği → KBB/vezikül değerlendirmesi şeklinde düzenlendi; gereksiz rutin görüntüleme eklenmedi.',[
    inv(cid,'fasiyal-muayene','Yüz siniri ve nörolojik muayene','neurologic','clinical',[
        ['Alın','Sağ alın kırıştırma zayıf','Alın korunması beklenir','Periferik patern'],
        ['Göz kapama','Sağda zayıf','Tam kapanma beklenir','Kornea riski'],
        ['Ağız köşesi','Sağda güçsüz, ağız sola kayıyor','Simetrik beklenir','Fasiyal tutulum']
    ],'Alın, göz kapama ve ağız köşesinin aynı tarafta etkilenmesi periferik fasiyal sinir tutulumunu destekler; santral fasiyal parezide alın çoğunlukla korunur.','Klinik ilk değerlendirme',5,1),
    inv(cid,'santral-alarm','Santral nörolojik alarm değerlendirmesi','neurologic','clinical',[
        ['Kol-bacak gücü','Ek defisit yok','Ekstremite defisiti olmamalı','Santral aleyhine'],
        ['Konuşma/bilinç','Normal','Afazi/bilinç bozukluğu olmamalı','İnme aleyhine'],
        ['Duyu/koordinasyon','Doğal','Lateralizan bulgu olmamalı','Ayırıcı']
    ],'Ekstremite güçsüzlüğü, afazi veya bilinç değişikliği olmaması santral inme olasılığını azaltır; bu bulgular olsaydı acil inme görüntüleme öncelik kazanırdı.','Acil klinik karar',4,2),
    inv(cid,'kornea-goz-koruma','Kornea güvenliği ve göz kapanma değerlendirmesi','ophthalmology','clinical',[
        ['Göz kapanması','Tam kapanmıyor','Tam kapanmalı','Kornea riski'],
        ['Kornea yüzeyi','Kurutma/keratit açısından izlenir','İntakt olmalı','Fonksiyon koruma']
    ],'Göz kapama zayıflığı ekspozisyon keratopatisi riski yaratır; suni gözyaşı, kapama ve göz koruma planı fonksiyon koruyucu basamaktır.','Organ kurtarıcı öncelik',4,3),
    inv(cid,'kulak-vezikul','Kulak çevresi vezikül ve otolojik muayene','ent','clinical',[
        ['Vezikül','İzlenmedi','Ramsay Hunt için aranır','Ayırıcı'],
        ['Otalgia','Hafif kulak arkası ağrı','Şiddetli veziküler ağrı beklenmez','Destekleyici']
    ],'Kulak çevresi vezikül olmaması Ramsay Hunt sendromunu geri plana iter; rutin MRG tipik izole periferik fasiyal paralizide ilk basamak değildir.','Ayırıcı tanı desteği',2,4,priority='useful')
])

# 27 Meniere
cid='v195-new-362-tekrarlayan-vertigo-ve-kulakta-dolgunluk'
add(cid,'KBB / nörootoloji - Meniere hastalığı',
    'Meniere vakasında akış vestibüler-nörolojik muayene → odyometri → vestibüler test seçimi → MRG kırmızı bayrak değerlendirmesi şeklinde düzenlendi.',[
    inv(cid,'vestibuler-norolojik','Vestibüler ve nörolojik muayene','ent','clinical',[
        ['Atak süresi','Saatler süren tekrarlayan vertigo','Saniyelik pozisyonel atak beklenmez','Patern'],
        ['Nörolojik defisit','Yok','Fokal defisit olmamalı','Santral aleyhine'],
        ['Otoskopi','Doğal','Akut enfeksiyon bulgusu olmamalı','Ayırıcı']
    ],'Saatler süren vertigo atağına tinnitus ve kulakta dolgunluk eşlik etmesi iç kulak kaynaklı bir patern oluşturur; fokal nörolojik defisit santral acili düşündürürdü.','Klinik ilk değerlendirme',4,1),
    inv(cid,'odyometri','Saf ses odyometrisi','audiology','functional',[
        ['İşitme','Sol düşük frekans sensörinöral kayıp','Simetrik normal işitme beklenir','Hedefli'],
        ['Dalgalanma','Ataklarla değişebilir','Stabil beklenir','Destekleyici']
    ],'Düşük frekans sensörinöral işitme kaybı, tinnitus ve dolgunlukla birlikte Meniere paternini destekler; iletim tipi kayıp orta kulak nedenlerini düşündürürdü.','Hedefli test',4,2),
    inv(cid,'vestibuler-test','Vestibüler testler','functional','functional',[
        ['Kalorik/vHIT','Seçilmiş durumda unilateral vestibüler fonksiyon değerlendirir','Rutin şart değil','Destekleyici'],
        ['Denge değerlendirmesi','Atak dışı değişken olabilir','Normal olabilir','Sınırlı']
    ],'Vestibüler testler seçilmiş olguda fonksiyonel taraf bilgisini destekler; tipik klinik ve odyometri varken her hastada zorunlu değildir.','Bu olguda sınırlı katkı',2,3,priority='useful'),
    inv(cid,'mrg-iac','İç kulak kanalı/beyin MRG - seçilmiş durum','imaging','mri',[
        ['Endikasyon','Tek taraflı progresif/asimetrik kayıp veya nörolojik alarm varsa','Alarm olmamalı','Seçilmiş'],
        ['Amaç','Vestibüler schwannom/santral neden dışlama','Kitle olmamalı','Ayırıcı']
    ],'MRG tek taraflı progresif işitme kaybı veya nörolojik alarm varsa düşünülür; tipik atak ve odyometri paterninde ilk karar verdirici test değildir.','Gereksiz / öncelikli değil',0,4,priority='optional')
])

# 28 compartment syndrome
cid='v195-new-363-alci-sonrasi-artan-bacak-agrisi'
add(cid,'Ortopedi / travma - kompartman sendromu',
    'Kompartman sendromu vakasında akış klinik ağrı/pasif germe → nörovasküler seri muayene → basınç ölçümü → alçı gevşetme/fasyotomi hazırlığı şeklinde düzenlendi; basınç ölçümünün fasyotomiyi geciktirmemesi vurgulandı.',[
    inv(cid,'klinik-kompartman','Klinik kompartman değerlendirmesi','orthopedics','clinical',[
        ['Ağrı','Analjeziye yanıtsız ve giderek artıyor','Kontrol edilebilir ağrı beklenir','Acil'],
        ['Pasif germe','Parmak ekstansiyonu ağrıyı artırıyor','Ağrısız olmalı','Kritik'],
        ['Kompartman','Gergin ve hassas','Yumuşak beklenir','Basınç artışı']
    ],'Analjeziye yanıtsız artan ağrı, pasif germe ağrısı ve gergin kompartman klinik olarak kompartman sendromunu düşündürür; klasik bulgular varsa fasyotomi ölçüm beklenerek geciktirilmez.','Acil klinik karar',5,1, emergency='Kas-sinir iskemisi zaman kritiktir.'),
    inv(cid,'norovaskuler-seri','Seri nörovasküler muayene','orthopedics','clinical',[
        ['Duyu','Parestezi mevcut','Normal duyu beklenir','Sinir iskemisi'],
        ['Nabız','Distal nabız korunabilir','Nabız varlığı dışlamaz','Yanıltıcı olabilir'],
        ['Motor','Güç kaybı açısından seri izlenir','Korunmalı','Geç bulgu']
    ],'Parestezi sinir iskemisini düşündürür; distal nabızların korunması kompartman sendromunu dışlamaz çünkü nabız kaybı geç bulgudur.','Organ kurtarıcı öncelik',5,2),
    inv(cid,'kompartman-basinci','Kompartman basıncı ölçümü','functional','procedure',[
        ['Basınç','Yüksek veya delta basınç kritik olabilir','Düşük basınç beklenir','Destekleyici'],
        ['Klinik uyum','Bulgular klasikse ölçüm beklenmez','Şüphe belirsizse kullanılır','Cerrahi geciktirmez']
    ],'Basınç ölçümü bilinçsiz veya muayenesi güvenilmez hastada tanıyı destekler; klasik klinik bulgular varsa acil fasyotomi kararı ölçüm sonucu beklenerek geciktirilmemelidir.','Cerrahi geciktirmez',4,3),
    inv(cid,'alci-fasyotomi','Alçının gevşetilmesi ve fasyotomi hazırlığı','procedure','surgery',[
        ['İlk adım','Alçı/kompresyon gevşetilir','Basınç azaltılmalı','Acil'],
        ['Cerrahi hazırlık','Acil fasyotomi için ortopedi','Gecikme olmamalı','Organ kurtarıcı']
    ],'Dış kompresyon azaltılır ve acil fasyotomi hazırlığı yapılır; görüntüleme veya laboratuvar kas-sinir kurtarıcı cerrahi kararın önüne geçmez.','Organ kurtarıcı öncelik',5,4, treatment='Alçı gevşetme ve acil fasyotomi hazırlığı ana yönetim basamağıdır.')
])

changed = []
for c in cases:
    if c.get('id') in MAP and c.get('branchId') == 'minor-rotations':
        subspecialty, note, investigations = MAP[c['id']]
        c['investigations'] = investigations
        set_layer_meta(c, subspecialty, note)
        changed.append(c['id'])

# Verify only intended branch objects changed semantically.
changed_non_scope = []
for before, after in zip(original_cases, cases):
    if before != after and before.get('branchId') != 'minor-rotations':
        changed_non_scope.append(before.get('id'))

missing_targets = sorted(set(MAP) - set(changed))
missing_meta = []
for c in cases:
    if c.get('branchId') == 'minor-rotations':
        for item in c.get('investigations') or []:
            for key in ['label','title','type','category','testTypeCategory','summary','testValueLabel','scoreImpact','clinicalFlowOrder']:
                if key not in item or item[key] in (None,''):
                    missing_meta.append({'caseId': c.get('id'), 'investigationId': item.get('id'), 'missing': key})

# Duplicate check among scoped branch, informational only.
minor = [c for c in cases if c.get('branchId') == 'minor-rotations']
seen = {}
duplicates = []
for c in minor:
    key = (c.get('title','').strip().lower(), (c.get('diagnosis') or {}).get('correct','').strip().lower())
    if key in seen:
        duplicates.append({'firstId': seen[key], 'duplicateId': c.get('id'), 'title': c.get('title'), 'correct': (c.get('diagnosis') or {}).get('correct')})
    else:
        seen[key] = c.get('id')

prefix = source[:start]
suffix = source[suffix_start:]
next_source = prefix + json.dumps(cases, ensure_ascii=False, indent=2) + ';' + suffix
DATA_FILE.write_text(next_source, encoding='utf-8')

report = {
    'generatedAt': datetime.now(timezone.utc).isoformat(),
    'scope': 'Only branchId === minor-rotations general clinical cases; tus-spot-olgular entries with relatedBranch Küçük Stajlar were not modified.',
    'targetCaseCount': len([c for c in original_cases if c.get('branchId') == 'minor-rotations']),
    'changedCaseCount': len(changed),
    'changedCaseIds': changed,
    'addedOrRebuiltInvestigationCount': sum(len(c.get('investigations') or []) for c in cases if c.get('id') in changed),
    'nonScopeChangedCaseIds': changed_non_scope,
    'missingTargetIds': missing_targets,
    'missingCriticalInvestigationMetadata': missing_meta,
    'duplicateSignalsInScope': duplicates,
    'qualityGate': {
        'onlyMinorRotationsChanged': len(changed_non_scope) == 0,
        'allMinorRotationCasesProcessed': len(changed) == len([c for c in original_cases if c.get('branchId') == 'minor-rotations']),
        'allTargetIdsFound': len(missing_targets) == 0,
        'labelsTypesTagsScoresAndFlowOrdersPresent': len(missing_meta) == 0,
        'tusSpotSmallClerkshipEntriesUntouched': True,
        'syntheticInvestigationBankDisabledForScope': all(c.get('useSyntheticInvestigationBank') is False for c in cases if c.get('branchId') == 'minor-rotations'),
        'preserveInvestigationOrderEnabledForScope': all(c.get('preserveInvestigationOrder') is True for c in cases if c.get('branchId') == 'minor-rotations'),
    }
}
(REPORT_DIR / 'KlinikIQ_SMALL_CLERKSHIPS_INVESTIGATION_LAYER_ENHANCEMENT_REPORT.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
tech = '\n'.join([
    'KlinikIQ Küçük Stajlar tetkik/objektif veri katmanı güçlendirme raporu',
    f"Kapsam: {report['targetCaseCount']} Küçük Stajlar genel klinik vaka (branchId=minor-rotations).",
    'TUS Spot içindeki relatedBranch=Küçük Stajlar kayıtlarına dokunulmadı.',
    f"Düzenlenen vaka sayısı: {report['changedCaseCount']}.",
    f"Yeniden yapılandırılan/eklenen tetkik sayısı: {report['addedOrRebuiltInvestigationCount']}.",
    f"Kapsam dışı değişen vaka sayısı: {len(changed_non_scope)}.",
    f"Eksik kritik tetkik metadatası: {len(missing_meta)}.",
    f"Bilgilendirici duplicate sinyali: {len(duplicates)}.",
    'Not: Doğru cevap, seçenekler, optionFeedback, explanation, evidenceChain ve sağ kolon alanları kasıtlı olarak değiştirilmedi; düzenleme tetkik/objektif veri katmanı, tetkik sırası, kısa yorum, değer etiketi, puan ve acil güvenlik metadatası ile sınırlandı.',
])
(REPORT_DIR / 'KlinikIQ_SMALL_CLERKSHIPS_INVESTIGATION_LAYER_TECHNICAL_REPORT.txt').write_text(tech, encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))
