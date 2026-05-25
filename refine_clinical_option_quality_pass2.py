import json, re
from pathlib import Path
from collections import Counter
root=Path('/mnt/data/klinik_v337_work')
p=root/'src/data/cases.js'
s=p.read_text(encoding='utf-8')
prefix='export const rawCases = '
start=s.index(prefix)+len(prefix); end=s.index('\n\nexport const cases', start)
cases=json.loads(s[start:end].rstrip(';')); suffix=s[end:]
letters=['A','B','C','D','E']
rx=re.compile(r'\bSadece\b|\bsadece\b|evde|taburcu|taburculuk|diş macunu|tedavisiz|bekle|beklen|tamamen kes|bülleri evde|öksürük şurubu|topikal krem|süt içirmek|egzersiz yaptır|yürütüp|her hastaya|uzun süreli|gözlem|hiçbir', re.I)

def flagged(opt): return isinstance(opt,str) and bool(rx.search(opt))

def replace_keyed(mapping, old, new, fb):
    if isinstance(mapping, dict) and old in mapping:
        nm={}
        for k,v in mapping.items():
            nm[new if k==old else k]=fb if k==old else v
        mapping.clear(); mapping.update(nm)

def letter_fb(mapping, idx, fb):
    if isinstance(mapping, dict) and idx < len(letters) and letters[idx] in mapping:
        mapping[letters[idx]]=fb

def cleanse(o):
    new=o.strip()
    custom={
        'İndirekt Coombs testi pozitifleşene kadar tedavisiz izlenmesi':'İndirekt Coombs sonucuna göre profilaksi kararını ertelemek',
        'Nebülize salbutamol verilerek taburculuk planlanması':'Nebülize bronkodilatör yanıtına göre ayaktan izlem planlamak',
        'Subkutan hızlı etkili insülin uygulanıp taburcu edilmesi':'Subkutan hızlı etkili insülinle ayaktan glisemik izlem planlamak',
        'Trombosit transfüzyonu yapılıp antikoagülasyonun tamamen kesilmesi':'Trombosit transfüzyonu sonrası antikoagülasyonu keserek izlem planlamak',
        'Ayaktan analjezik verilerek taburcu edilmesi':'Ayaktan analjezik tedavi ve yakın kontrol planlamak',
        'Ayaktan izlem için taburculuk verilmesi':'Ayaktan yakın izlem ve planlı kontrol önermek',
        'oral rehidratasyon ve taburculuk':'Oral rehidratasyon ve yakın ayaktan izlem',
        'oral parasetamol ve taburculuk':'Oral antipiretik-analjezik tedaviyle ayaktan izlem',
        'Ayaktan oral analjezikle taburculuk':'Ayaktan oral analjezik tedavi ve yakın kontrol',
        'Ayaktan izlem için antibiyotiksiz taburculuk':'Antibiyotiksiz ayaktan yakın izlem planlamak',
        'İntravenöz kortikosteroid başlanıp yanıt beklenmesi':'İntravenöz kortikosteroid yanıtına göre tedavi planlamak',
        'Oral levetirasetam reçete edilip taburcu edilmesi':'Oral antiepileptik reçetesiyle ayaktan izlem planlamak',
        'Oral sıvı ve evde glukoz takibi önerilmesi':'Oral sıvı desteği ve ayaktan glukoz izlemi planlamak',
        'oral antihistaminik ve taburculuk':'Oral antihistaminik tedavi ve ayaktan izlem',
        'Boğaz kültürü sonucu beklenene kadar tedavisiz izlem':'Boğaz kültürü sonucuna göre klinik izlem ve tedavi planlamak',
        'Yüksek doz diüretik ve taburculuk':'Yüksek doz diüretik tedaviyle ayaktan izlem planlamak',
        'Ateş düşürücü verilerek kültür sonucu beklenmesi':'Antipiretik tedaviyle kültür sonucuna göre izlem planlamak',
        'oral amoksisilin-klavulanat ile taburculuk':'Oral amoksisilin-klavulanat ile ayaktan izlem planlamak',
        'Oral şekerli sıvı içirilip beklenmesi':'Oral karbonhidrat vererek klinik yanıtı izlemek',
        'Antiepileptik idame tedavisi başlanıp taburculuk':'Antiepileptik idame tedavisiyle ayaktan izlem planlamak',
        'oral sıvı verilerek gölgede bekletme':'Oral sıvı ve gölgede soğutmayla klinik izlem',
        'Ateş düşürücü verip taburcu etme':'Antipiretik tedaviyle ayaktan izlem planlama',
        'Antibiyotik başlanıp kültür sonucu bekleme':'Antibiyotik başlanıp kültür sonucuna göre izlem planlama',
        'ağrı kesici verilerek taburculuk':'Analjezik tedaviyle ayaktan izlem planlamak',
        'Hiçbir görüntüleme veya tedavi olmadan beklenmesi':'İleri görüntüleme yapmadan klinik izlem planlamak',
        'Pulse oksimetre normal olduğu için taburcu edilmesi':'Pulse oksimetre normal olduğu için ayaktan izlem planlanması',
        'Antibiyotik için kan kültürü sonucu kesinleşene kadar beklenmesi':'Kan kültürü sonucuna göre antibiyotik kararını ertelemek',
        'oral tuz desteği verilerek taburculuk':'Oral tuz desteğiyle ayaktan izlem planlamak',
        'Elektif genetik test sonucu beklenmesi':'Elektif genetik test sonucuna göre klinik izlem planlamak',
        'Kayeksalat etkisi beklenerek monitörsüz izlem':'Reçine tedavisiyle monitörsüz klinik izlem planlamak',
        'oral aktif kömür verilerek taburculuk':'Oral aktif kömür sonrası ayaktan izlem planlamak',
        'oral sıvı verilerek taburcu edilmesi':'Oral sıvı desteğiyle ayaktan izlem planlamak',
        'Antibiyotik tedavisiyle taburculuk':'Antibiyotik tedavisiyle ayaktan izlem planlamak',
        'Furosemid verilerek taburcu edilmesi':'Furosemid verilerek ayaktan izlem planlamak',
        'Oral antibiyotik başlanıp taburcu edilmesi':'Oral antibiyotik başlanarak ayaktan izlem planlamak',
        'Semptom olduğu halde hemen taburcu etmek':'Semptomlara rağmen ayaktan izlem planlamak',
        'Antibiyotik verilmeden taburcu edilmesi':'Antibiyotiksiz ayaktan izlem planlamak',
        'Acil taburculuk ve poliklinik kontrolü':'Acil servisten ayaktan kontrol planlamak',
        'Semptomlara rağmen hemen taburcu etmek':'Semptomlara rağmen ayaktan izlem planlamak',
        'öksürük şurubu vermek':'Antitussif semptomatik tedavi vermek',
        'Taburculuk planlanması':'Ayaktan izlem planlanması',
        'Herni bağı kullanarak taburcu etmek':'Herni bağı ile ayaktan izlem planlamak',
        'oral analjezik vererek taburcu etmek':'Oral analjezikle ayaktan izlem planlamak',
        'Ağrı kesici sonrası taburculuk':'Analjezik tedavi sonrası ayaktan izlem',
        'oral analjezik ve taburculuk':'Oral analjezik tedavi ve ayaktan izlem',
        'Ağrısız olduğu için hastayı hemen taburcu etmek':'Ağrısız kanama nedeniyle ayaktan izlem planlamak',
        'oral antiasit verilerek taburculuk':'Oral antiasit tedavisiyle ayaktan izlem',
        'oral demir verilerek taburculuk':'Oral demir tedavisiyle ayaktan izlem',
        'Evde soğuk kompres ve kontrol önerilmesi':'Soğuk kompres ve ayaktan yakın kontrol önermek',
        'Alerji testi sonucu beklenmesi':'Alerji testi sonucuna göre klinik izlem planlamak',
        'Antikoagülasyonu tamamen kesip izlemek':'Antikoagülasyonu keserek klinik izlem planlamak',
        'laksatif vererek taburculuk':'Laksatif tedaviyle ayaktan izlem',
        'Ateş olmadığı için taburculuk ve kontrolsüz izlem':'Ateş olmadığı için ayaktan izlem planlamak',
        'kulak kiri temizliği ve taburculuk':'Kulak yolu temizliği sonrası ayaktan izlem',
        'Grafi normal olduğu için hiçbir tedavi vermeden taburcu etmek':'Grafi normal olduğu için ileri tedavisiz ayaktan izlem planlamak',
        'oral tuz tabletleriyle taburculuk':'Oral tuz desteğiyle ayaktan izlem',
        'Göz muayenesi gerekmeden taburculuk':'Göz muayenesi olmadan ayaktan izlem',
        'oral antiasit vererek taburcu etmek':'Oral antiasit tedavisiyle ayaktan izlem planlamak',
        'Cilt döküntüsü gerileyene kadar tedavisiz klinik izlemek':'Cilt bulgularının seyrine göre klinik izlem planlamak',
        'oral öksürük şurubu':'Antitussif semptomatik tedavi',
        'Evde klinik izlem':'Ayaktan klinik izlem'
    }
    if new in custom:
        return custom[new]
    # lowercase-insensitive general cleanups
    new=re.sub(r'\b[Ss]adece\s+', '', new)
    new=re.sub(r'(?i)taburcu edilmesi|taburcu etmek|taburcu etme|taburculuk verilmesi|taburculuk', 'ayaktan izlem planlanması', new)
    new=re.sub(r'(?i)evde', 'ayaktan', new)
    new=re.sub(r'(?i)tedavisiz izlenmesi|tedavisiz izlem|tedavisiz klinik izlemek|tedavisiz beklemek', 'klinik izlemle tedavi kararını ertelemek', new)
    new=re.sub(r'(?i)sonucu beklenene kadar|sonucu kesinleşene kadar|sonucu beklenmesi|sonucu bekleme|sonucu beklemek|sonucunun beklenmesi|sonucunu beklemek', 'sonucuna göre klinik izlem planlamak', new)
    new=re.sub(r'(?i)beklenmesi|bekleme|beklemek|bekletme', 'klinik izlem planlamak', new)
    new=re.sub(r'(?i)tamamen kesilmesi|tamamen kesip|tamamen kesmek', 'keserek klinik izlem planlamak', new)
    new=re.sub(r'(?i)hiçbir', 'ileri', new)
    new=re.sub(r'(?i)öksürük şurubu', 'antitussif semptomatik tedavi', new)
    new=re.sub(r'(?i)topikal krem', 'lokal topikal tedavi', new)
    new=re.sub(r'(?i)uzun süreli', 'kontrol tedavisi olarak', new)
    new=re.sub(r'(?i)gözlem', 'klinik izlem', new)
    new=re.sub(r'\s+', ' ', new).strip()
    return new

def make_fb(c,new):
    correct=c.get('diagnosis',{}).get('correct') or 'doğru yaklaşım'
    q=(c.get('question') or '').lower(); at=(c.get('answerTarget') or c.get('questionType') or '').lower()
    if 'tanı' in q or at in {'diagnosis','pathogen','mechanism','anatomy','pathology'}:
        return f"{new} ayırıcı değerlendirmede düşünülebilir ancak olgudaki belirleyici klinik ve tetkik bulguları {correct} seçeneğini daha güçlü destekler."
    if 'test' in q or 'tanısal' in q or at in {'diagnostic_test','lab_interpretation'}:
        return f"{new} bu olgudaki tanısal hedefi yeterince karşılamaz; vaka bağlamında {correct} daha uygun ve hedefe yönelik tanısal basamaktır."
    return f"{new} bazı destekleyici unsurlar içerse de bu olguda sorulan öncelikli klinik kararı yeterince karşılamaz; {correct} daha güvenli ve hedefe yönelik yaklaşımdır."

def update(c,old,new,fb):
    d=c.get('diagnosis',{}); opts=d.get('options') or []
    if old not in opts: return False
    idx=opts.index(old)
    if new in opts and new!=old: new+=' yaklaşımı'
    opts[idx]=new
    for k in ['optionComparison','whyWrong']:
        replace_keyed(d.get(k),old,new,fb)
    af=d.get('answerFeedback') or {}
    for k in ['optionComparison','whyWrong']:
        replace_keyed(af.get(k),old,new,fb)
    letter_fb(d.get('optionFeedback'),idx,fb); letter_fb(af.get('optionFeedback'),idx,fb)
    return {'caseId':c.get('id'),'branchId':c.get('branchId'),'title':c.get('title'),'oldOption':old,'newOption':new,'correctAnswerText':d.get('correct')}

changed=[]
for c in cases:
    if c.get('caseType')!='standard': continue
    d=c.get('diagnosis',{}); correct=d.get('correct')
    for old in list(d.get('options') or []):
        if old==correct: continue
        if flagged(old):
            new=cleanse(old)
            if new!=old:
                ch=update(c,old,new,make_fb(c,new))
                if ch: changed.append(ch)

# Validate
issues=[]
for c in cases:
    d=c.get('diagnosis',{}); opts=d.get('options') or []
    if len(opts)!=5: issues.append((c.get('id'),'option_count',len(opts)))
    if len(set(opts))!=5: issues.append((c.get('id'),'duplicate',opts))
    if d.get('correct') not in opts: issues.append((c.get('id'),'correct_missing',d.get('correct')))
    for comp_name in ['optionComparison','whyWrong']:
        comp=d.get(comp_name)
        if isinstance(comp,dict):
            miss=[o for o in opts if o not in comp]
            if miss: issues.append((c.get('id'),'missing_'+comp_name,miss))
    af=d.get('answerFeedback') or {}
    comp=af.get('optionComparison')
    if isinstance(comp,dict):
        miss=[o for o in opts if o not in comp]
        if miss: issues.append((c.get('id'),'missing_af_optionComparison',miss))
if issues:
    raise RuntimeError(str(issues[:10]))

remaining=[]
for c in cases:
    if c.get('caseType')!='standard': continue
    d=c.get('diagnosis',{}); correct=d.get('correct')
    for opt in d.get('options') or []:
        if opt==correct: continue
        if flagged(opt): remaining.append({'caseId':c.get('id'),'branchId':c.get('branchId'),'title':c.get('title'),'option':opt})

p.write_text(prefix+json.dumps(cases,ensure_ascii=False,separators=(',',':'))+';'+suffix, encoding='utf-8')
# merge report
report_path=root/'reports/clinical-branch-option-quality-v338-report.json'
r=json.loads(report_path.read_text(encoding='utf-8'))
r['summary']['optionsRefinedPass2']=len(changed)
r['summary']['optionsRefinedTotal']=r['summary'].get('optionsRefined',0)+len(changed)
r['summary']['flaggedWrongOptionsAfterPass2']=len(remaining)
r['changedOptionsPass2']=changed
r['remainingFlaggedWrongOptionsAfterPass2']=remaining
report_path.write_text(json.dumps(r,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'pass2Changed':len(changed),'remainingWrongFlagged':len(remaining)}, ensure_ascii=False, indent=2))
