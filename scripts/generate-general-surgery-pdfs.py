# -*- coding: utf-8 -*-
from pathlib import Path
import json
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
QR = ROOT / 'quality-reports'
OUT1 = QR / 'KlinikIQ_GENERAL_SURGERY_CASES_ULTRA_REFINED_REPORT.pdf'
OUT2 = QR / 'KlinikIQ_GENERAL_SURGERY_CASES_ULTRA_REFINED_QC_REPORT.pdf'
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
FONT_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
pdfmetrics.registerFont(TTFont('DejaVu', FONT))
pdfmetrics.registerFont(TTFont('DejaVu-Bold', FONT_BOLD))

coverage = json.loads((QR/'KlinikIQ_GENERAL_SURGERY_CASES_COVERAGE_REPORT.json').read_text(encoding='utf-8'))
metrics = json.loads((QR/'KlinikIQ_GENERAL_SURGERY_QC_METRICS.json').read_text(encoding='utf-8'))
source = json.loads((QR/'KlinikIQ_GENERAL_SURGERY_SOURCE_CONTROL_DECISION_REPORT.json').read_text(encoding='utf-8'))
objective = json.loads((QR/'KlinikIQ_GENERAL_SURGERY_OBJECTIVE_DATA_SHORT_COMMENT_REPORT.json').read_text(encoding='utf-8'))

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='TRTitle', parent=styles['Title'], fontName='DejaVu-Bold', fontSize=18, leading=22, spaceAfter=14))
styles.add(ParagraphStyle(name='TRH1', parent=styles['Heading1'], fontName='DejaVu-Bold', fontSize=14, leading=18, spaceBefore=10, spaceAfter=8))
styles.add(ParagraphStyle(name='TRH2', parent=styles['Heading2'], fontName='DejaVu-Bold', fontSize=11.5, leading=15, spaceBefore=8, spaceAfter=5))
styles.add(ParagraphStyle(name='TRBody', parent=styles['BodyText'], fontName='DejaVu', fontSize=8.8, leading=11.5, spaceAfter=5, alignment=TA_LEFT))
styles.add(ParagraphStyle(name='TRSmall', parent=styles['BodyText'], fontName='DejaVu', fontSize=7.7, leading=10, spaceAfter=3))
styles.add(ParagraphStyle(name='TRBold', parent=styles['BodyText'], fontName='DejaVu-Bold', fontSize=8.5, leading=11, spaceAfter=3))

def P(text, style='TRBody'):
    text = str(text).replace('&','&amp;').replace('<','&lt;').replace('>','&gt;').replace('\n','<br/>')
    return Paragraph(text, styles[style])

def bullet_list(items, max_items=None):
    if max_items:
        items = items[:max_items]
    flow=[]
    for item in items:
        flow.append(P('• ' + item, 'TRSmall'))
    return flow

def make_doc(path, title):
    return SimpleDocTemplate(str(path), pagesize=A4, rightMargin=1.3*cm, leftMargin=1.3*cm, topMargin=1.2*cm, bottomMargin=1.2*cm, title=title)

# General report
flow=[P('KlinikIQ General Surgery Cases Ultra Refined Report', 'TRTitle')]
flow.append(P('Kapsam: Klinik Branş Seç / Klinik Vakalar / Olgular / Diğer Olgular içindeki branchId=general-surgery olan 27 standart vaka işlendi. TUS Spot Olgular, Hap Bilgi, glossary, API endpointleri, environment değişkenleri ve component mimarisi değiştirilmedi.'))
flow.append(P('Editoryal odak: akut karın, hepatobiliyer cerrahi, travma, vasküler aciller, fıtık, kolorektal/proktoloji, endokrin cerrahisi, meme cerrahisi, üst GIS ve cerrahi enfeksiyonlarda klinik karar algoritması, tetkik-olgu katmanı ve seçenek/feedback kalitesi güçlendirildi.'))

metric_rows = [
    ['Metrik','Değer'],
    ['Taranan Genel Cerrahi vakası', metrics['scannedGeneralSurgeryCases']],
    ['Güncellenen vaka', metrics['updatedGeneralSurgeryCases']],
    ['Option feedback yeniden yazımı', metrics['optionFeedbackRewrittenCount']],
    ['Kısa yorum yeniden yazımı', metrics['shortCommentsRewrittenCount']],
    ['Alakasız tetkik kaldırma/gizleme', metrics['irrelevantInvestigationsRemovedOrHiddenCount']],
    ['Scientific concern', metrics['scientificConcernCount']],
]
t=Table([[P(a,'TRBold'),P(b,'TRBody')] for a,b in metric_rows], colWidths=[8.2*cm,7*cm])
t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#E8EEF7')),('GRID',(0,0),(-1,-1),0.25,colors.grey),('VALIGN',(0,0),(-1,-1),'TOP')]))
flow.append(t)
flow.append(Spacer(1,8))
flow.append(P('Vaka Bazlı Coverage Özeti', 'TRH1'))
for rec in coverage:
    flow.append(P(f"{rec['caseId']} - {rec['newTitle']}", 'TRH2'))
    flow.append(P(f"Alt alan: {rec['surgicalSubfield']}", 'TRSmall'))
    flow.append(P(f"Öğrenme hedefi: {rec['learningTarget']}", 'TRSmall'))
    flow.append(P(f"Yeni soru: {rec['newQuestion']}", 'TRSmall'))
    flow.append(P(f"Doğru cevap: {rec['correctAnswer']}", 'TRSmall'))
    if rec.get('addedOrStrengthenedObjectiveData'):
        flow.append(P('Güçlendirilen tetkik/veri: ' + ', '.join(rec['addedOrStrengthenedObjectiveData']), 'TRSmall'))
    if rec.get('removedIrrelevantInvestigations'):
        flow.append(P('Kaldırılan/yeniden sınıflanan eski tetkikler: ' + ', '.join(rec['removedIrrelevantInvestigations']), 'TRSmall'))
    flow.extend(bullet_list(rec['newEvidenceChain'], 3))
    flow.append(Spacer(1,4))

doc=make_doc(OUT1, 'KlinikIQ General Surgery Refined Report')
doc.build(flow)

# QC report
flow=[P('KlinikIQ General Surgery Ultra Refined QC Report', 'TRTitle')]
flow.append(P('Bu rapor, Genel Cerrahi standart vakalarının kapsam, veri temizliği, seçenek/feedback yeniden yazımı ve teknik doğrulama sonuçlarını özetler.'))
qc_rows = [['QC maddesi','Sonuç']]
labels = [
('Toplam taranan Genel Cerrahi vaka sayısı','scannedGeneralSurgeryCases'),
('Güncellenen Genel Cerrahi vaka sayısı','updatedGeneralSurgeryCases'),
('Sol kolon metni yeniden yazılan vaka sayısı','leftColumnRewrittenCases'),
('Cerrahi alt alanı netleştirilen vaka sayısı','surgicalSubfieldClarifiedCases'),
('Vital/fizik muayene yorumu düzeltilen vaka sayısı','vitalExamCorrectedCases'),
('Objektif veri/tetkik alanı düzeltilen vaka sayısı','objectiveDataCorrectedCases'),
('Olgu/tetkik katmanı kapsamı artırılan vaka sayısı','objectiveDataLayerExpandedCases'),
('Laboratuvar/görüntüleme/mikrobiyoloji/patoloji katmanı ayrımı düzeltilen vaka sayısı','dataLayerSeparationCorrectedCases'),
('Görüntüleme/görsel açıklaması güçlendirilen vaka sayısı','imagingVisualExplanationStrengthenedCases'),
('Kolon kayması/referans-durum/birim hatası düzeltilen satır sayısı','rowUnitReferenceStatusFixes'),
('Alakasız/generic kısa yorum temizlenen vaka sayısı','irrelevantGenericShortCommentsCleanedCases'),
('Kısa yorum sıfırdan yazılan kayıt sayısı','shortCommentsRewrittenCount'),
('Gereksiz kısa yorum kaldırılan/gizlenen kayıt sayısı','unnecessaryShortCommentsHiddenOrRemovedCount'),
('Alakasız tetkik kaldırılan/gizlenen kayıt sayısı','irrelevantInvestigationsRemovedOrHiddenCount'),
('Soru kökü güncellenen vaka sayısı','questionStemUpdatedCases'),
('Seçenek seti güçlendirilen vaka sayısı','optionSetsStrengthenedCases'),
('Seçenek metni değiştirilen sayı','optionTextsChangedCount'),
('OptionFeedback sıfırdan yazılan sayı','optionFeedbackRewrittenCount'),
('Klinik/Bilimsel gerekçe yeniden yazılan vaka sayısı','clinicalScientificRationaleRewrittenCases'),
('Kanıt zinciri yeniden yazılan vaka sayısı','evidenceChainRewrittenCases'),
('Sınav notu/Core Knowledge/Exam Pearl güçlendirilen vaka sayısı','examPearlStrengthenedCases'),
('Scientific concern sayısı','scientificConcernCount'),
]
for label,key in labels:
    qc_rows.append([label, metrics[key]])
qc_rows.extend([
    ['ID değişikliği', 'Yok' if not metrics['idChanged'] else 'Var'],
    ['Doğru cevap mantığı', 'Korundu' if metrics['correctAnswerLogicPreserved'] else 'Kontrol gerekli'],
    ['TUS Spot Olgular', 'Dokunulmadı' if not metrics['tusSpotCasesTouched'] else 'Kontrol gerekli'],
    ['Build/test durumu', metrics['buildTestStatus']],
])
t=Table([[P(a,'TRSmall'),P(b,'TRSmall')] for a,b in qc_rows], colWidths=[10.0*cm,6.0*cm], repeatRows=1)
t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#E8EEF7')),('GRID',(0,0),(-1,-1),0.25,colors.grey),('VALIGN',(0,0),(-1,-1),'TOP')]))
flow.append(t)
flow.append(PageBreak())
flow.append(P('Temizlenen Başlıca Hata Tipleri', 'TRH1'))
cleaned = [
    'Kolanjit/kolesistit kartlarından beta-hCG ve gebelik yorumları kaldırıldı.',
    'Kolanjit/kolesistit USG kartlarındaki apandisit yorum kaçakları temizlendi.',
    'Travma, perforasyon, nekrotizan enfeksiyon ve üst GIS vakalarındaki menenjit/pnömoni/hiperkalemi/nefrotik sendrom gibi başka vaka yorumları temizlendi.',
    'Görüntülemede “Modaliteye özgü bulgu” gibi boş referanslar klinik karar anlamı taşıyan satırlara dönüştürüldü.',
    '“Bu olguda en uygun yanıt değildir” kalıbı Genel Cerrahi optionFeedback alanlarından kaldırıldı.',
    'Kanıt zincirleri üç tam cümleli, gerçek vaka ipuçlarına dayanan ve cerrahi karara bağlanan yapıya getirildi.'
]
flow.extend(bullet_list(cleaned))
flow.append(P('Kaynak Kontrolü / Cerrahi Karar Önceliği Kontrolü', 'TRH1'))
for rec in source:
    flow.append(P(f"{rec['caseId']} - {rec['title']}: {rec['correctAnswer']}", 'TRH2'))
    flow.append(P(f"Karar kuralı: {rec['priorityRule']}", 'TRSmall'))
    flow.extend(bullet_list(rec['evidenceChain'], 3))

doc=make_doc(OUT2, 'KlinikIQ General Surgery QC Report')
doc.build(flow)
print(OUT1)
print(OUT2)
