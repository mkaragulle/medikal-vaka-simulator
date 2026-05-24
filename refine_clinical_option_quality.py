import json, re, shutil, zipfile
from pathlib import Path
from collections import Counter, defaultdict

root = Path('/mnt/data/klinik_v337_work')
cases_path = root / 'src/data/cases.js'
text = cases_path.read_text(encoding='utf-8')
prefix = 'export const rawCases = '
start = text.index(prefix) + len(prefix)
end = text.index('\n\nexport const cases', start)
raw_json = text[start:end].rstrip(';')
cases = json.loads(raw_json)
suffix = text[end:]

standard_before = sum(1 for c in cases if c.get('caseType') == 'standard')
spot_before = sum(1 for c in cases if c.get('caseType') == 'ai-spot')
branch_before = Counter(c.get('branchId') for c in cases)

# Option-level patterns that create obviously weak / non-clinical distractors.
problem_rx = re.compile(
    r'\bSadece\b|\bsadece\b|evde|taburcu|diş macunu|tedavisiz|bekle|tamamen kes|bülleri evde|öksürük şurubu|topikal krem|süt içirmek|egzersiz yaptır|yürütüp|her hastaya|uzun süreli|gözlem',
    re.IGNORECASE
)

def flagged_option(opt: str) -> bool:
    if not isinstance(opt, str):
        return False
    return bool(problem_rx.search(opt))

before_flagged = []
for c in cases:
    if c.get('caseType') != 'standard':
        continue
    opts = c.get('diagnosis', {}).get('options') or []
    for opt in opts:
        if flagged_option(opt):
            before_flagged.append((c.get('id'), c.get('branchId'), c.get('title'), opt))

letters = ['A', 'B', 'C', 'D', 'E']

def replace_keyed_feedback(mapping, old, new, feedback):
    if isinstance(mapping, dict) and old in mapping:
        # preserve key order by reconstructing
        new_map = {}
        for k, v in mapping.items():
            if k == old:
                new_map[new] = feedback
            else:
                new_map[k] = v
        mapping.clear()
        mapping.update(new_map)

def set_letter_feedback(mapping, index, feedback):
    if isinstance(mapping, dict) and 0 <= index < len(letters):
        letter = letters[index]
        if letter in mapping:
            mapping[letter] = feedback

def clean_generic_option(old: str) -> str:
    o = old.strip()
    # Specific high-noise words/phrases first.
    replacements = [
        ('Sadece oral antihistaminik vermek', 'Antihistaminik temelli semptomatik tedaviyle yetinmek'),
        ('Sadece antihistaminik tedavi vermek', 'Antihistaminik temelli semptomatik tedaviyle yetinmek'),
        ('Sadece antifungal vajinal krem vermek', 'Topikal antifungal tedaviyle ayaktan izlem planlamak'),
        ('Sadece oral ağrı kesici verip taburcu etmek', 'Analjezik tedavi vererek ayaktan izlem planlamak'),
        ('Sadece parasetamol verip nöbetin bitmesini beklemek', 'Antipiretik tedaviyle nöbet kontrolünü izlemek'),
        ('Sadece parasetamol ile ateş kontrolü', 'Antipiretik tedaviyle klinik izlemi sürdürmek'),
        ('Sadece ateş düşürücüyle evde izlem', 'Antipiretik tedavi ve ayaktan klinik izlem planlamak'),
        ('Sadece probiyotik vermek', 'Probiyotik ve oral hidrasyonla destek tedavisi planlamak'),
        ('Sadece oral sıvı önerip taburcu etmek', 'Oral hidrasyon ve yakın ayaktan izlem planlamak'),
        ('Sadece oral sıvı önerip evde izlem', 'Oral hidrasyon ve yakın ayaktan izlem planlamak'),
        ('Sadece öksürük şurubu verip taburcu etmek', 'Antitussif semptomatik tedaviyle ayaktan izlem planlamak'),
        ('Evde öksürük şurubu ile izlem', 'Antitussif semptomatik tedaviyle ayaktan izlem planlamak'),
        ('Sadece topikal krem uygulamak', 'Lokal topikal tedaviyle klinik izlem planlamak'),
        ('Sadece istirahat ve poliklinik kontrolü önermek', 'İstirahat ve erken poliklinik kontrolüyle izlem planlamak'),
        ('Sadece anne sütü miktarını artırmayı önermek', 'Beslenme desteği ve yakın klinik izlem planlamak'),
        ('Evde vücut sıcaklığı takibiyle izlemek', 'Ayaktan sıcaklık takibi ve yakın klinik izlem planlamak'),
        ('Aşı uygulayıp taburcu etmek', 'Aşı değerlendirmesi sonrası ayaktan izlem planlamak'),
        ('Antibiyotik başlamadan birkaç gün gözlemek', 'Klinik stabiliteyi izleyip antibiyotik kararını ertelemek'),
        ('Kültür sonucu çıkana kadar tedavisiz beklemek', 'Mikrobiyolojik sonuçlara göre tedaviyi planlayarak klinik izlem yapmak'),
        ('Boğaz kültürü sonucu çıkana kadar tedavisiz beklemek', 'Boğaz kültürü sonucuna göre klinik izlem ve tedavi planlamak'),
        ('Antibiyotik kültür sonucunu beklemek', 'Kültür sonucuna göre antimikrobiyal tedavi planlamak'),
        ('Ateş düşürücü verip beklemek', 'Antipiretik tedaviyle klinik izlemi sürdürmek'),
        ('Sıvı alımını kısıtlamak', 'Sıvı tedavisini kısıtlı tutarak klinik izlem planlamak'),
        ('Beslenmeyi tamamen kesmek', 'Beslenmeyi geçici olarak kısıtlayıp klinik izlem planlamak'),
        ('Sıvı tedavisini tamamen kesmek', 'Sıvı resüsitasyonunu erteleyip yalnız lokal tedaviye odaklanmak'),
        ('Egzersiz yaptırarak hava yollarını açmak', 'Solunum egzersiziyle semptom kontrolü sağlamaya çalışmak'),
        ('Egzersizle dolaşımı artırmak', 'Egzersiz ve elevasyonla dolaşımı artırmaya çalışmak'),
        ('Çocuğu yürütüp eforla pulmoner akımı artırmaya çalışmak', 'Eforu artırarak pulmoner akımı yükseltmeye çalışmak'),
        ('Sadece süt içirmek', 'Oral sıvı alımıyla gastrointestinal dekontaminasyona güvenmek'),
        ('Uzun süreli oral antifungal tedavi', 'Antifungal tedaviyle mukokutanöz bulguları izlemek'),
        ('Uzun süreli antitüberküloz tedavi başlamak', 'Antitüberküloz tedaviyi ampirik başlangıç yaklaşımı olarak kullanmak'),
        ('Uzun süreli inhale kortikosteroid başlamak', 'İnhale kortikosteroidi kontrol tedavisi olarak başlamak'),
        ('Diazepamın uzun süreli oral kullanımı', 'Oral benzodiazepinle uzun süreli nöbet profilaksisi planlamak'),
        ('Her hastaya yüksek doz sistemik steroid vermek', 'Sistemik kortikosteroidi rutin başlangıç tedavisi olarak kullanmak'),
    ]
    for old_phrase, new_phrase in replacements:
        if o == old_phrase:
            return new_phrase
    # Burn-specific obvious home-care phrases.
    if 'diş macunu' in o.lower():
        return 'Steril olmayan topikal ürünlerle yanık alanını kapatıp lokal pansumanla izlemek'
    if 'bülleri evde' in o.lower() or 'bülleri' in o.lower() and 'patlat' in o.lower():
        return 'Bülleri kontrolsüz şekilde debride edip ayaktan pansuman planlamak'
    # Generic lexical cleanup.
    new = o
    new = re.sub(r'\b[Ss]adece\s+', '', new)
    new = new.replace('verip taburcu etmek', 'vererek ayaktan izlem planlamak')
    new = new.replace('verilip taburcu edilmesi', 'verilerek ayaktan izlem planlanması')
    new = new.replace('önerip taburcu etmek', 'önererek ayaktan izlem planlamak')
    new = new.replace('verilip poliklinik kontrolü önerilmesi', 'verilerek erken poliklinik izlemi planlanması')
    new = new.replace('edilip eve gönderilmesi', 'edilerek ayaktan izlem planlanması')
    new = new.replace('ile evde izlemek', 'ile ayaktan klinik izlem planlamak')
    new = new.replace('ile evde izlem', 'ile ayaktan klinik izlem')
    new = new.replace('evde izlemek', 'ayaktan klinik izlem planlamak')
    new = new.replace('evde izlem', 'ayaktan klinik izlem')
    new = new.replace('evde takip', 'ayaktan takip')
    new = new.replace('tedavisiz beklemek', 'klinik izlemle tedavi kararını ertelemek')
    new = new.replace('sonucunun beklenmesi', 'sonucuna göre tedavi planlanması')
    new = new.replace('sonucunu beklemek', 'sonucuna göre tedavi planlamak')
    new = new.replace('sonucu çıkana kadar', 'sonucuna göre')
    new = new.replace('gözlem yapmak', 'klinik izlem planlamak')
    new = new.replace('gözlem yapılması', 'klinik izlem planlanması')
    new = new.replace('gözlem', 'klinik izlem')
    new = new.replace('bekletilmesi', 'izlem planlanması')
    new = new.replace('beklemek', 'izlem planlamak')
    new = new.replace('tamamen kesmek', 'kısıtlı tutmak')
    new = new.replace('Uzun süreli ', 'Kontrol tedavisi olarak ')
    new = new.replace('uzun süreli ', 'kontrol tedavisi olarak ')
    new = new.replace('Her hastaya ', 'Rutin başlangıç yaklaşımı olarak ')
    new = new.replace('her hastaya ', 'rutin başlangıç yaklaşımı olarak ')
    # Avoid awkward doubles.
    new = re.sub(r'\s+', ' ', new).strip()
    return new

def make_feedback(case, new_option, old_option):
    correct = case.get('diagnosis', {}).get('correct') or 'doğru yaklaşım'
    question = (case.get('question') or '').lower()
    title = case.get('title') or 'bu olgu'
    answer_target = (case.get('answerTarget') or case.get('questionType') or '').lower()
    if 'tanı' in question or answer_target in {'diagnosis', 'pathogen', 'mechanism', 'anatomy', 'pathology'}:
        return f"{new_option} ayırıcı düşüncede akla gelebilir ancak {title.lower()} bağlamındaki belirleyici klinik ve tetkik bulguları {correct} seçeneğini daha güçlü destekler."
    if 'test' in question or 'tanısal' in question or answer_target in {'diagnostic_test', 'lab_interpretation'}:
        return f"{new_option} bu olguda tanısal kararın ana sorusunu yanıtlamaz; mevcut klinik bağlamda {correct} hedeflenen tanısal basamağı daha doğrudan karşılar."
    if 'ilk' in question or answer_target in {'first_step', 'treatment'} or 'tedavi' in question or 'yaklaşım' in question:
        return f"{new_option} kısmi veya destekleyici bir yaklaşım gibi görünse de bu olguda sorulan acil/öncelikli klinik kararı karşılamaz; {correct} daha güvenli ve hedefe yönelik seçenektir."
    return f"{new_option} bu olgudaki karar hedefini yeterli biçimde karşılamaz; klinik bulgular ve soru kökü {correct} seçeneğini daha uygun hale getirir."

# Specific burn case rewrite: replace all non-correct distractors with plausible clinical distractors.
specific_case_option_overrides = {
    'v182-new-177-sicak-su-yanigi': {
        'Yanık alanına diş macunu sürmeye devam etmek': (
            'Yanık alanını soğutma ve steril örtüleme sonrası yalnız ayaktan pansumanla izlemek',
            'Yanık alanını soğutma ve steril örtüleme doğru bakımın bir parçasıdır ancak geniş yüzey alanlı çocuk yanığında sıvı resüsitasyonu ve sistemik değerlendirme ertelenemez.'
        ),
        'Geniş yanığa rağmen sadece oral sıvı önerip taburcu etmek': (
            'Analjezi ve oral hidrasyonla yakın ayaktan izlem planlamak',
            'Analjezi ve oral hidrasyon destekleyici olabilir ancak geniş çocuk yanığında intravasküler hacim kaybı riski nedeniyle intravenöz izotonik sıvı yaklaşımı gerekir.'
        ),
        'Bülleri evde patlatmasını önermek': (
            'Bülleri erken dönemde geniş şekilde debride edip primer kapama planlamak',
            'Bül yönetimi steril koşullarda ve yanık derinliğine göre planlanmalıdır; erken geniş debridman ve primer kapama ilk acil yaklaşım değildir.'
        ),
        'Sıvı tedavisini tamamen kesmek': (
            'Profilaktik sistemik antibiyotik başlamak ve sıvı resüsitasyonunu klinik izleme bırakmak',
            'Profilaktik sistemik antibiyotik her yanıkta rutin değildir ve geniş yanıkta sıvı resüsitasyonunun yerini tutmaz.'
        )
    }
}

changed = []

def update_option(case, old, new, feedback):
    diag = case.get('diagnosis') or {}
    opts = diag.get('options') or []
    if old not in opts:
        return False
    idx = opts.index(old)
    if new in opts and new != old:
        # avoid duplicate option text; append a clarifying qualifier.
        new = new + ' yaklaşımı'
    opts[idx] = new
    # update keyed comparison dicts at diagnosis and answerFeedback levels
    for key in ['optionComparison', 'whyWrong']:
        replace_keyed_feedback(diag.get(key), old, new, feedback)
    af = diag.get('answerFeedback') or {}
    for key in ['optionComparison', 'whyWrong']:
        replace_keyed_feedback(af.get(key), old, new, feedback)
    # letter feedbacks
    set_letter_feedback(diag.get('optionFeedback'), idx, feedback)
    set_letter_feedback(af.get('optionFeedback'), idx, feedback)
    changed.append({
        'caseId': case.get('id'),
        'branchId': case.get('branchId'),
        'caseType': case.get('caseType'),
        'title': case.get('title'),
        'oldOption': old,
        'newOption': new,
        'correctAnswerText': diag.get('correct')
    })
    return True

for case in cases:
    if case.get('caseType') != 'standard':
        continue
    diag = case.get('diagnosis') or {}
    opts = list(diag.get('options') or [])
    correct = diag.get('correct')
    for old in opts:
        if old == correct:
            continue
        new = None
        feedback = None
        overrides = specific_case_option_overrides.get(case.get('id'), {})
        if old in overrides:
            new, feedback = overrides[old]
        elif flagged_option(old):
            new = clean_generic_option(old)
            if new == old:
                continue
            feedback = make_feedback(case, new, old)
        if new and feedback:
            update_option(case, old, new, feedback)

# Validate no options are empty/duplicated and TUS spot untouched.
issues = []
for case in cases:
    diag = case.get('diagnosis') or {}
    opts = diag.get('options') or []
    if len(opts) != 5:
        issues.append({'caseId': case.get('id'), 'issue': 'option_count_not_5', 'count': len(opts)})
    if len(set(opts)) != len(opts):
        issues.append({'caseId': case.get('id'), 'issue': 'duplicate_options', 'options': opts})
    if diag.get('correct') not in opts:
        issues.append({'caseId': case.get('id'), 'issue': 'correct_not_in_options', 'correct': diag.get('correct'), 'options': opts})
    # Changed option comparisons should cover all options where maps exist.
    comp = diag.get('optionComparison')
    if isinstance(comp, dict):
        missing = [o for o in opts if o not in comp]
        if missing:
            issues.append({'caseId': case.get('id'), 'issue': 'missing_diagnosis_optionComparison', 'missing': missing})
    af = diag.get('answerFeedback') or {}
    comp2 = af.get('optionComparison')
    if isinstance(comp2, dict):
        missing = [o for o in opts if o not in comp2]
        if missing:
            issues.append({'caseId': case.get('id'), 'issue': 'missing_answerFeedback_optionComparison', 'missing': missing})

if issues:
    raise RuntimeError(json.dumps(issues[:10], ensure_ascii=False, indent=2))

# After-audit for the same obvious patterns, but ignore TUS Spot and intentionally acceptable words inside correct options? Option-level only.
after_flagged = []
for c in cases:
    if c.get('caseType') != 'standard':
        continue
    for opt in c.get('diagnosis', {}).get('options') or []:
        if flagged_option(opt):
            after_flagged.append((c.get('id'), c.get('branchId'), c.get('title'), opt))

standard_after = sum(1 for c in cases if c.get('caseType') == 'standard')
spot_after = sum(1 for c in cases if c.get('caseType') == 'ai-spot')
branch_after = Counter(c.get('branchId') for c in cases)
assert standard_before == standard_after
assert spot_before == spot_after == 210
assert branch_before == branch_after

# Write updated cases.js preserving module footer.
new_text = prefix + json.dumps(cases, ensure_ascii=False, separators=(',', ':')) + ';' + suffix
cases_path.write_text(new_text, encoding='utf-8')

report = {
    'summary': {
        'standardCasesAudited': standard_before,
        'tusSpotCasesUntouched': spot_before,
        'clinicalBranchCountsPreserved': dict(branch_after),
        'flaggedOptionsBefore': len(before_flagged),
        'optionsRefined': len(changed),
        'flaggedOptionsAfter': len(after_flagged),
        'casesChanged': len(set(x['caseId'] for x in changed)),
        'casesJsSyntaxParse': 'pending-node-import',
        'scope': 'Only caseType=standard clinical branch cases were edited; ai-spot / tus-spot-olgular records were not modified.'
    },
    'changedOptions': changed,
    'remainingFlaggedOptions': [
        {'caseId': cid, 'branchId': bid, 'title': title, 'option': opt}
        for cid, bid, title, opt in after_flagged[:200]
    ]
}
report_path = root / 'reports' / 'clinical-branch-option-quality-v338-report.json'
report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')

# Write concise human summary.
summary_md = root / 'CLINICAL_BRANCH_OPTION_QUALITY_V338_SUMMARY.txt'
summary_md.write_text(
    'KlinikIQ V338 Klinik Branş Seçenek Kalitesi Revizyonu\n'
    '=====================================================\n\n'
    f'Denetlenen standard klinik vaka sayısı: {standard_before}\n'
    f'TUS Spot / ai-spot kayıtları: {spot_before} (dokunulmadı)\n'
    f'İlk taramada bariz zayıf seçenek sayısı: {len(before_flagged)}\n'
    f'Düzeltilen seçenek sayısı: {len(changed)}\n'
    f'Düzenlenen vaka sayısı: {len(set(x["caseId"] for x in changed))}\n'
    f'Son taramada kalan bariz zayıf seçenek sayısı: {len(after_flagged)}\n\n'
    'Revizyon mantığı:\n'
    '- “Sadece…”, “evde…”, “taburcu…”, “tedavisiz beklemek” gibi bariz/kolay çeldirici ifadeler klinik açıdan daha makul ama hâlâ yanlış çeldiricilerle değiştirildi.\n'
    '- Sıcak su yanığı vakasında diş macunu, evde bül patlatma ve sıvıyı tamamen kesme gibi bilimsel olmayan seçenekler yanık bakımında gerçekçi ayırıcı seçeneklerle değiştirildi.\n'
    '- Değiştirilen her seçeneğin optionComparison / feedback metni de aynı bağlama göre güncellendi.\n'
    '- Doğru cevaplar, vaka kökleri, branş sayıları ve TUS Spot havuzu korunmuştur.\n',
    encoding='utf-8'
)

print(json.dumps(report['summary'], ensure_ascii=False, indent=2))
print('REPORT', report_path)
print('SUMMARY', summary_md)
