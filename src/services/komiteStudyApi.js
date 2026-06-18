export const KOMITE_GENERATION_ERROR_MESSAGE = 'Komite çalışma içeriği şu anda oluşturulamadı. Lütfen tekrar deneyin.';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

function getKomiteGenerationErrorMessage(code = '', fallback = '', status = '') {
  const cleanCode = String(code || '').trim();
  if (cleanCode === 'OPENAI_AUTH') return 'Komite yapay zeka ayari eksik veya gecersiz. OpenAI API anahtarini kontrol edip tekrar deneyin.';
  if (cleanCode === 'OPENAI_MODEL') return 'Komite ders anlatimi modeli erisilebilir degil. OPENAI_KOMITE_MODEL ayarini veya model erisimini kontrol edip tekrar deneyin.';
  if (cleanCode === 'OPENAI_PARAM') return 'Komite ders anlatimi icin gonderilen yapay zeka parametrelerinden biri uyumsuz. Model ve reasoning ayarlarini kontrol edip tekrar deneyin.';
  if (cleanCode === 'AI_INCOMPLETE') return 'Komite ders anlatimi yaniti yarim kaldi. Sistem materyalden toparlanmis ders notu uretmeye calisacak; devam ederse tekrar deneyin.';
  if (cleanCode === 'AI_JSON') return 'Komite ders anlatimi yaniti okunabilir formata donusmedi. Lutfen yeniden olusturmayi deneyin.';
  if (cleanCode === 'NO_SOURCE_TEXT') return 'Yuklenen materyalde ders anlatimi olusturmaya yetecek okunabilir metin bulunamadi.';
  const base = compactText(fallback) || KOMITE_GENERATION_ERROR_MESSAGE;
  return status ? `${base} (Kod: ${status})` : base;
}

function compactText(value = '') {
  if (Array.isArray(value)) return value.map(compactText).filter(Boolean).join(' ');
  if (value && typeof value === 'object') {
    return compactText(value.text || value.content || value.explanation || value.summary || value.value || '');
  }
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function sentenceList(text = '', maxItems = 18) {
  return String(text || '')
    .replace(/\r/g, '\n')
    .split(/(?<=[.!?])\s+|\n+/u)
    .map((item) => cleanGeneratedText(item))
    .filter((item) => item && item.split(/\s+/u).length >= 6)
    .slice(0, maxItems);
}

function sourceTitleFromFile(file = {}, index = 0) {
  const topic = Array.isArray(file.detectedTopics)
    ? file.detectedTopics.map((item) => compactText(item?.title || item?.topic || item)).find(Boolean)
    : '';
  return cleanTopic(topic || file.fileName || file.name || `Komite konusu ${index + 1}`, `Komite konusu ${index + 1}`);
}

function prioritySourceLines(file = {}, maxItems = 16) {
  const text = String(file.cleanedExtractedText || file.text || '');
  const lines = text
    .replace(/\r/g, '\n')
    .split(/\n+/u)
    .map((line) => cleanGeneratedText(line))
    .filter((line) => line && line.split(/\s+/u).length >= 5)
    .filter((line) => /(?:tanı|tedavi|mekanizma|patofizyoloji|klinik|bulgu|laboratuvar|algoritma|sınıflama|komplikasyon|risk|ayırıcı|yönetim|önemli|yüksek|kritik|diagnos|treat|clinical|mechanism|classification|criteria|symptom|sign|management|complication|risk)/iu.test(line));
  const structured = Array.isArray(file.detectedStructure)
    ? file.detectedStructure.map((item) => cleanGeneratedText(`${item?.label || item?.type || ''} ${item?.preview || item?.text || ''}`)).filter(Boolean)
    : [];
  const emphasis = Array.isArray(file.emphasisNotes)
    ? file.emphasisNotes.map((item) => cleanGeneratedText(item?.text || item)).filter(Boolean)
    : [];
  return uniqueTexts([...emphasis, ...structured, ...lines], maxItems);
}

function buildLocalLessonSection(file = {}, index = 0) {
  const rawText = String(file.cleanedExtractedText || file.text || '').trim();
  const heading = sourceTitleFromFile(file, index);
  const coreSentences = sentenceList(rawText.slice(0, 18_000), 14);
  const priorityLines = prioritySourceLines(file, 14);
  const teachingText = uniqueTexts([
    ...coreSentences.slice(0, 8),
    ...priorityLines.slice(0, 10),
    ...coreSentences.slice(8, 14),
  ], 24).join(' ');
  if (!teachingText) return null;
  const diagnosisLines = priorityLines.filter((line) => /(?:tanı|laboratuvar|test|kriter|ayırıcı|diagnos|criteria|laboratory)/iu.test(line));
  const managementLines = priorityLines.filter((line) => /(?:tedavi|yönetim|yaklaşım|algoritma|management|treat)/iu.test(line));
  const mechanismLines = priorityLines.filter((line) => /(?:mekanizma|patofizyoloji|neden|sonuç|artar|azalır|mechanism|pathophysiology)/iu.test(line));
  return {
    heading,
    level: 2,
    subHeadings: uniqueTexts([
      mechanismLines.length ? 'Temel mekanizma ve neden-sonuç ilişkisi' : '',
      diagnosisLines.length ? 'Tanı, laboratuvar ve ayırıcı düşünme' : '',
      managementLines.length ? 'Yönetim yaklaşımı ve sınav odağı' : '',
    ], 4),
    teachingText,
    mechanismFlow: mechanismLines,
    algorithmSteps: uniqueTexts([...diagnosisLines, ...managementLines], 7),
    tableInsights: priorityLines.filter((line) => /(?:tablo|sınıflama|classification|criteria|tip|type)/iu.test(line)).slice(0, 5),
    comparisonPoints: priorityLines.filter((line) => /(?:ayırıcı|karış|fark|versus|vs|differential)/iu.test(line)).slice(0, 5),
    visualNotes: [],
    clinicalConnection: priorityLines.find((line) => /(?:klinik|bulgu|semptom|hasta|clinical|symptom|sign)/iu.test(line)) || '',
    examAngle: priorityLines.find((line) => /(?:önemli|kritik|yüksek|sınav|ayırt|risk|important|high yield)/iu.test(line)) || priorityLines[0] || '',
    commonTrap: priorityLines.find((line) => /(?:karış|ayırıcı|differential|versus|vs)/iu.test(line)) || '',
    keyBoxes: priorityLines[0] ? [{ label: 'Öne çıkan nokta', text: priorityLines[0] }] : [],
  };
}

function buildLocalKomiteLessonFromPayload(payload = {}) {
  const materialPacket = payload.materialPacket || {};
  const files = Array.isArray(materialPacket.files)
    ? materialPacket.files.filter((file) => String(file.cleanedExtractedText || file.text || '').trim())
    : [];
  const sections = files.slice(0, 10).map(buildLocalLessonSection).filter(Boolean);
  if (!sections.length) return null;
  const courseTitle = compactText(payload.metadata?.course || payload.metadata?.committee || materialPacket.courseName || materialPacket.committeeName || 'Komite ders anlatımı');
  const introSource = sections.slice(0, 3).map((section) => section.heading).filter(Boolean).join(', ');
  return {
    title: courseTitle,
    inferredTitle: courseTitle,
    shortIntro: introSource ? `Bu ders notu ${introSource} başlıklarını temel kavram, mekanizma, klinik ilişki ve sınav odağı ekseninde çalışılabilir bir sıraya yerleştirir.` : '',
    overview: '',
    bigPicture: '',
    learningObjectives: sections.slice(0, 5).map(buildLearningObjective).filter(Boolean),
    sections,
    highYieldPoints: uniqueTexts(sections.flatMap((section) => [section.examAngle, section.clinicalConnection, section.commonTrap]), 10),
    mustKnow: uniqueTexts(sections.flatMap((section) => [section.heading, section.clinicalConnection]), 10),
    finalReview: uniqueTexts(sections.flatMap((section) => [section.examAngle, section.heading]), 10),
    commonConfusions: uniqueTexts(sections.map((section) => section.commonTrap), 8),
    mainConcepts: sections.map((section) => section.heading),
    clinicalExamRelevance: '',
  };
}

const TECHNICAL_LESSON_NOTE_PATTERN = /\b(?:dosya bazl[ıi]|dosya işleme|materyal(?:ler)?(?:inden|in)?\s+(?:ana konusu|çıkarılan|temsil)|materyaller temsil edildi|çalışma notları yapılandırıldı|ana konular aşağıda yapılandırıldı|aşağıda yapılandırıldı|temsil edildi|materyal kapsam|coverageSummary|materialCoverage|sourceManifest|sourceFingerprint|source coverage|output structure|MATERIAL_DIGEST|chunk|grup\s*\d+|üretim süreci|teknik nedenle|extraction warning|extraction|ayrıştırılan metin|API bağlamı|öğretici excerpt|görsel sekmesi için|ana konu belirtildi|her dosyanın ana konusu|ilişkili başlıklar birleştirildi|farklı konular tek başlıkta ezilmedi)\b/iu;
const RAW_SOURCE_LINE_PATTERN = /^(?:[A-ZÇĞİÖŞÜ0-9][A-ZÇĞİÖŞÜ0-9\s/():,._-]{10,}|(?:prof\.?|doç\.?|dr\.?|öğr\.?\s*gör\.?)\b|.*\.(?:pdf|pptx|ppt|docx|txt)\b)/iu;
const BAD_OBJECTIVE_PATTERN = /\b(?:odağında klinik, mekanistik ve sınav bağlamıyla yorumlayabilmek|temel öğrenme mantığını açıklayabilmek|bilgisini açıklamak ve soruda ayırt etmek|dosya bazlı|materyal(?:ler)?inden|sınavda .* sorulabilir odağında)\b/iu;
const GENERIC_HEADING_PATTERN = /^(?:(?:bölüm|konu bölümü|section|part)\s*\d+|temel açıklama|klinik tablo|mekanizma\s*\/?\s*patofizyoloji|tanı\s*\/?\s*laboratuvar|tedavi prensipleri|ayırıcı düşünme|bu konu)$/iu;
const GENERIC_SUBHEADING_PATTERN = /^(?:akış|tablo|ayrım|şema|bilgi|özet|klinik|tedavi|sınav ipucu|kritik güvenlik|sık hata|bilgi kutusu|akılda tut|son kontrol|mini tekrar|görsel yorumu|tablonun ana mesajı|şema açıklaması|süreç mantığı|temel açıklama|klinik tablo|mekanizma\s*\/?\s*patofizyoloji|tanı\s*\/?\s*laboratuvar|tedavi prensipleri|ayırıcı düşünme|bu konu)$/iu;

function stripTechnicalLessonSentences(text = '') {
  return String(text || '')
    .split(/(?<=[.!?])\s+|\n+/u)
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !TECHNICAL_LESSON_NOTE_PATTERN.test(part))
    .filter((part) => !RAW_SOURCE_LINE_PATTERN.test(part))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function repairBrokenMedicalFragments(text = '') {
  return String(text || '')
    .replace(/\bOGTT\s+sonrası\s+2\.\s+(?!(?:saat|sa)\b)/giu, 'OGTT sonrası 2. saat ')
    .replace(/\b75\s*g\s+OGTT\s+sonrası\s+2\.\s+(?!(?:saat|sa)\b)/giu, '75 g OGTT sonrası 2. saat ')
    .replace(/\bAçlık plazma glukozunun\s+126\s*mg\/dl\s+ve\s+üzeri,\s+75\s*g\s+OGTT\s+sonrası\s+2\.\s+/giu, 'Açlık plazma glukozunun 126 mg/dL ve üzeri ya da 75 g OGTT sonrası 2. saat plazma glukozunun ')
    .replace(/(?:^|(?<=[.!?])\s+)(?:saat\s*)?≥?\s*200\s*mg\/dl\s+tanısaldır\.?/giu, '75 g OGTT sonrası 2. saat plazma glukozu ≥200 mg/dL ise tanısaldır.')
    .replace(/\bmg\/dl\b/giu, 'mg/dL')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanGeneratedText(value = '', { allowShort = false } = {}) {
  let text = compactText(value)
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\beksiklikt\b/giu, 'eksikliği')
    .replace(/\bmikroo\b/giu, 'mikro')
    .replace(/\bmikrositoğu\b/giu, 'mikrositozu')
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/([([{])\s+/g, '$1')
    .replace(/\s+([)\]}])/g, '$1')
    .replace(/^\s*['"]?\s*sorusudur\.?\s*/iu, '')
    .replace(/\b(?:Ana konu belirtilmedi|Konu belirtilmedi|Unknown topic|Grup\s*\d+|Chunk\s*\d+)\b/giu, '')
    .replace(/\s+/g, ' ')
    .trim();
  text = repairBrokenMedicalFragments(stripTechnicalLessonSentences(text));
  if (!text) return '';
  if (/^[,.;:!?'"`-]+$/u.test(text)) return '';
  if (!allowShort && text.split(/\s+/u).length < 3) return '';
  if (/^(ve|veya|ile|için|çünkü|ancak|fakat|ise|de|da)\b/iu.test(text)) return '';
  if (/[,:;(-]\s*$/u.test(text)) return '';
  return text;
}

function compareText(value = '') {
  return cleanGeneratedText(value, { allowShort: true }).toLocaleLowerCase('tr').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim();
}

function uniqueTexts(items = [], maxItems = 12, exclude = new Set()) {
  const seen = new Set(exclude);
  const output = [];
  (Array.isArray(items) ? items : []).forEach((item) => {
    const text = cleanGeneratedText(item);
    const key = compareText(text);
    const nearDuplicate = [...seen].some((seenKey) => key.length > 42 && seenKey.length > 42 && (key.includes(seenKey) || seenKey.includes(key)));
    if (!text || !key || seen.has(key) || nearDuplicate) return;
    seen.add(key);
    output.push(text);
  });
  return output.slice(0, maxItems);
}

function cleanTopic(value = '', fallback = '') {
  const text = naturalizeLessonHeading(value);
  if (text && !/ana konu|belirtilmedi|net çıkarılamadı|unknown topic/iu.test(text) && !GENERIC_HEADING_PATTERN.test(text) && !TECHNICAL_LESSON_NOTE_PATTERN.test(text) && !RAW_SOURCE_LINE_PATTERN.test(text)) return text;
  const fromFile = cleanGeneratedText(fallback, { allowShort: true }).replace(/\.[a-z0-9]+$/iu, '').replace(/[_-]+/g, ' ');
  return fromFile && !GENERIC_HEADING_PATTERN.test(fromFile) ? fromFile : 'Komite materyali';
}

function naturalizeLessonHeading(value = '') {
  const raw = cleanGeneratedText(value, { allowShort: true });
  if (!raw) return '';
  const withoutPresenter = raw
    .replace(/\b(?:prof\.?|doç\.?|dr\.?|öğr\.?\s*gör\.?)\s+[A-ZÇĞİÖŞÜa-zçğıöşü .-]{2,80}$/u, '')
    .replace(/\b\S+\.(?:pdf|pptx|ppt|docx|txt)\b/giu, '')
    .replace(/\s+/g, ' ')
    .trim();
  const sourceLike = RAW_SOURCE_LINE_PATTERN.test(raw) || /[/|_]{1,}/u.test(raw);
  if (!sourceLike && !GENERIC_HEADING_PATTERN.test(withoutPresenter) && !TECHNICAL_LESSON_NOTE_PATTERN.test(withoutPresenter)) return withoutPresenter;
  const normalized = withoutPresenter
    .split(/\s*(?:\/|\||-|–|—|:)\s*/u)
    .map((part) => cleanGeneratedText(part, { allowShort: true }))
    .filter((part) => part && !/^(?:sunum|lecture|slide|slayt|başlık|title)$/iu.test(part))
    .slice(0, 3)
    .join(' ')
    .replace(/\bPHYSIOPATHOLOGY\b/giu, 'Patofizyoloji')
    .replace(/\bPATHOPHYSIOLOGY\b/giu, 'Patofizyoloji')
    .replace(/\bTREATMENT\b/giu, 'Tedavi yaklaşımı')
    .replace(/\bMANAGEMENT\b/giu, 'Yönetim yaklaşımı')
    .replace(/\bDIAGNOSIS\b/giu, 'Tanı yaklaşımı')
    .replace(/\bCLASSIFICATION\b/giu, 'Sınıflama mantığı')
    .replace(/\bCRITERIA\b/giu, 'Tanı ölçütleri')
    .replace(/\bSIGNS?\s+AND\s+SYMPTOMS\b/giu, 'Klinik bulgular')
    .replace(/\bTYPE\b/giu, 'Tip')
    .replace(/\s+/g, ' ')
    .trim();
  if (!normalized || GENERIC_HEADING_PATTERN.test(normalized) || TECHNICAL_LESSON_NOTE_PATTERN.test(normalized)) return '';
  if (/^[A-ZÇĞİÖŞÜ0-9\s/():,._-]{10,}$/u.test(normalized)) {
    return normalized.toLocaleLowerCase('tr').replace(/(^|\s)(\p{L})/gu, (_, space, letter) => `${space}${letter.toLocaleUpperCase('tr')}`);
  }
  return normalized;
}

function normalizeKeyBoxes(boxes = []) {
  const seen = new Set();
  return (Array.isArray(boxes) ? boxes : [])
    .map((box) => ({
      label: cleanGeneratedText(box?.label || box?.title || 'Komite için kritik', { allowShort: true }) || 'Komite için kritik',
      text: cleanGeneratedText(box?.text || box?.content || box?.body || box?.description),
    }))
    .filter((box) => {
      const key = compareText(box.text);
      if (!box.text || box.text.length < 18 || box.text.split(/\s+/u).length < 4 || seen.has(key)) return false;
      if (/kritik güvenlik/iu.test(box.label) && !/\b(?:acil|hayati|kontrendike|risk|şok|kanama|hava yolu|resüsitasyon|mortalite|toksisite|doz|hasta güvenliği|öncelik)\b/iu.test(box.text)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 2);
}

function normalizeTextList(value = [], maxItems = 6) {
  const items = Array.isArray(value) ? value : value ? [value] : [];
  return uniqueTexts(items.map((item) => {
    if (!item || typeof item !== 'object') return item;
    return item.text || item.content || item.message || item.point || item.summary || item.description || Object.values(item).filter(Boolean).join(' ');
  }), maxItems);
}

function isUsefulProcessStep(item = '') {
  const text = cleanGeneratedText(item);
  if (!text || GENERIC_SUBHEADING_PATTERN.test(text)) return false;
  const wordCount = text.split(/\s+/u).length;
  if (wordCount < 7) return false;
  return /(?:çünkü|bu nedenle|sonuçta|böylece|ardından|sonrasında|neden|yol aç|geliş|oluş|artar|azalır|yansır|klinik|laboratuvar|tanı|tedavi|yönetim|karar|mekanizma|bulgu|risk|komplikasyon|→|>)/iu.test(text);
}

function normalizeProcessList(value = [], maxItems = 6) {
  return normalizeTextList(value, maxItems).filter(isUsefulProcessStep);
}

function normalizeDifficulty(value = 'medium') {
  const clean = compactText(value).toLocaleLowerCase('tr');
  if (['hard', 'zor'].includes(clean)) return 'hard';
  if (['easy', 'kolay'].includes(clean)) return 'easy';
  return 'medium';
}

function objectiveFocusFromSection(section = {}) {
  const source = cleanGeneratedText(section.examAngle || section.clinicalConnection || section.commonTrap || section.teachingText);
  const firstSentence = source.split(/(?<=[.!?])\s+/u).find((item) => cleanGeneratedText(item));
  return cleanGeneratedText(firstSentence || source).replace(/[.!?]+$/u, '').slice(0, 130);
}

function sentenceCaseGenerated(text = '') {
  const clean = cleanGeneratedText(text).replace(/[.!?]+$/u, '').trim();
  if (!clean) return '';
  return `${clean.charAt(0).toLocaleUpperCase('tr')}${clean.slice(1)}.`;
}

function inferSectionHeading(section = {}, index = 0) {
  const candidates = [
    ...(Array.isArray(section.subHeadings) ? section.subHeadings : []),
    ...(Array.isArray(section.subtopics) ? section.subtopics : []),
    section.heading,
    section.title,
    section.examAngle,
    section.clinicalConnection,
    section.teachingText,
    section.content,
  ];
  for (const candidate of candidates) {
    const clean = cleanGeneratedText(candidate, { allowShort: true });
    if (!clean) continue;
    const firstSentence = clean.split(/(?<=[.!?])\s+/u).find(Boolean) || clean;
    const heading = naturalizeLessonHeading(firstSentence)
      .replace(/^\s*(?:şu şekilde sorulur|sınavda|klinik olarak|temel olarak)\s*[:：-]?\s*/iu, '')
      .split(/\s+/u)
      .slice(0, 10)
      .join(' ')
      .replace(/[.;:,!?]+$/u, '')
      .trim();
    if (heading.split(/\s+/u).length >= 3 && heading.length <= 96 && !GENERIC_HEADING_PATTERN.test(heading) && !TECHNICAL_LESSON_NOTE_PATTERN.test(heading) && !RAW_SOURCE_LINE_PATTERN.test(heading)) {
      return heading;
    }
  }
  return `Komite konusu ${index + 1}`;
}

function buildLearningObjective(section = {}) {
  const heading = cleanTopic(section.heading || section.title, 'Komite materyali');
  const subtopics = Array.isArray(section.subHeadings)
    ? section.subHeadings.slice(0, 2).map((item) => cleanGeneratedText(item, { allowShort: true })).filter(Boolean).join(' ve ')
    : '';
  if (subtopics) {
    return sentenceCaseGenerated(`${heading} kapsamında ${subtopics} başlıklarının mekanizma, klinik yansıma ve sınav ayrımıyla nasıl ilişkilendiğini açıklayabilmek`);
  }
  if (section.algorithmSteps?.length || section.mechanismFlow?.length) {
    return sentenceCaseGenerated(`${heading} mekanizmasının bulgu, laboratuvar, tanı basamağı veya yönetim kararına nasıl yansıdığını açıklayabilmek`);
  }
  if (section.comparisonPoints?.length || section.commonTrap) {
    return sentenceCaseGenerated(`${heading} ile karışabilecek durumları ayırt ettiren klinik, laboratuvar veya kavramsal ipuçlarını kullanabilmek`);
  }
  if (section.clinicalConnection || section.examAngle) {
    return sentenceCaseGenerated(`${heading} bilgisini vaka kurgusunda tanı, ayırıcı tanı, yönetim veya sınav sorusu mantığına bağlayabilmek`);
  }
  return sentenceCaseGenerated(`${heading} temel kavramlarını ve sınavda ayırt ettiren bağlantılarını gerekçesiyle açıklayabilmek`);
}

function normalizeLearningObjective(item = '', index = 0, sections = []) {
  const text = cleanGeneratedText(item);
  if (!text) return '';
  const heading = cleanTopic(sections[index]?.heading || sections[index]?.title || sections[0]?.heading || 'Komite materyali', 'Komite materyali');
  const source = /→/u.test(text) ? text.split(/\s*→\s*/u).slice(1).join(' ') || text.replace(/^.*?→\s*/u, '') : text;
  const body = source
    .replace(new RegExp(`^${String(heading).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*(?:konusunda|bölümünde|ile)?\\s*`, 'iu'), '')
    .replace(/^\s*(?:bu konu|bu bölüm|bu başlık)\s*(?:ile|için|kapsamında)?\s*/iu, '')
    .trim();
  if (!body) return '';
  if (new RegExp(`^${String(heading).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'iu').test(body)) return sentenceCaseGenerated(body);
  return sentenceCaseGenerated(`${heading} kapsamında ${body.charAt(0).toLocaleLowerCase('tr')}${body.slice(1)}`);
}

function isUsableLearningObjective(item = '') {
  const text = cleanGeneratedText(item);
  if (!text || text.split(/\s+/u).length < 5) return false;
  if (BAD_OBJECTIVE_PATTERN.test(text) || TECHNICAL_LESSON_NOTE_PATTERN.test(text) || RAW_SOURCE_LINE_PATTERN.test(text)) return false;
  if (/[,:;(-]\s*$/u.test(text)) return false;
  return true;
}

function enrichTeachingText(base = '', section = {}) {
  const cleanBase = cleanGeneratedText(base);
  if (cleanBase.split(/\s+/u).length >= 90) return cleanBase;
  const extras = [
    cleanGeneratedText(section.clinicalConnection || section.clinicalOrPracticalConnection),
    cleanGeneratedText(section.examAngle || section.examConnection || section.examFocus),
    cleanGeneratedText(section.commonTrap || section.commonConfusions),
    ...normalizeTextList(section.algorithmSteps || section.algorithmFlow || section.decisionSteps || section.decisionFlow, 3),
    ...normalizeTextList(section.tableInsights || section.tableNotes || section.tablesAndVisualNotes || section.classificationTable, 2),
    ...normalizeTextList(section.comparisonPoints || section.comparisons || section.differentials, 2),
  ].filter(Boolean);
  return uniqueTexts([cleanBase, ...extras], 8).join(' ');
}

function normalizeLesson(rawLesson = {}, sourceFingerprint = '') {
  const sections = Array.isArray(rawLesson.sections)
    ? rawLesson.sections
    : rawLesson.sections && typeof rawLesson.sections === 'object'
      ? Object.entries(rawLesson.sections).map(([heading, value]) => ({ heading, content: value }))
      : [];
  const normalizedSections = sections.map((section, index) => {
    const teachingText = enrichTeachingText(section.teachingText || section.content || section.coreExplanation || section.bigPicture || section.summary, section);
    const content = enrichTeachingText(section.content || section.teachingText || section.coreExplanation || section.bigPicture || section.summary, section);
    const normalizedSection = {
      id: section.id || `komite-section-${index + 1}`,
      level: Number(section.level) || 2,
      subHeadings: normalizeTextList(section.subHeadings || section.subtopics || section.learningSubtopics || section.outline, 5)
        .filter((item) => !GENERIC_SUBHEADING_PATTERN.test(item))
        .filter((item) => !GENERIC_HEADING_PATTERN.test(item)),
      teachingText,
      content,
      mechanismFlow: normalizeProcessList(section.mechanismFlow, 5),
      algorithmSteps: normalizeProcessList(section.algorithmSteps || section.algorithmFlow || section.decisionSteps || section.decisionFlow, 7),
      tableInsights: normalizeTextList(section.tableInsights || section.tableNotes || section.tablesAndVisualNotes || section.classificationTable, 5),
      comparisonPoints: normalizeTextList(section.comparisonPoints || section.comparisons || section.differentials || section.commonConfusions, 5),
      visualNotes: normalizeTextList(section.visualNotes || section.schemaNotes, 4),
      miniReview: [],
      clinicalConnection: cleanGeneratedText(section.clinicalConnection || section.clinicalOrPracticalConnection),
      examAngle: cleanGeneratedText(section.examAngle || section.examConnection || section.examFocus),
      commonTrap: cleanGeneratedText(section.commonTrap || section.commonConfusions),
      keyBoxes: normalizeKeyBoxes(section.keyBoxes),
    };
    return {
      ...normalizedSection,
      heading: cleanTopic(section.heading || section.title, inferSectionHeading({ ...section, ...normalizedSection }, index)),
    };
  }).filter((section) => section.heading && section.teachingText);
  const fallbackText = cleanGeneratedText(
    rawLesson.teachingText
    || rawLesson.content
    || rawLesson.body
    || rawLesson.lessonText
    || rawLesson.coreExplanation
    || rawLesson.overview
    || rawLesson.shortIntro
    || rawLesson.bigPicture
    || rawLesson.summary,
  );
  const lessonSections = normalizedSections.length
    ? normalizedSections
    : fallbackText
      ? [{
        id: 'komite-section-1',
        heading: cleanTopic(rawLesson.title || rawLesson.inferredTitle, 'Konu anlatımı'),
        level: 2,
        subHeadings: [],
        teachingText: fallbackText,
        content: fallbackText,
        mechanismFlow: [],
        algorithmSteps: [],
        tableInsights: [],
        comparisonPoints: [],
        visualNotes: [],
        miniReview: [],
        clinicalConnection: cleanGeneratedText(rawLesson.clinicalExamRelevance),
        examAngle: cleanGeneratedText(rawLesson.examFocus),
        commonTrap: '',
        keyBoxes: [],
      }]
      : [];
  const derivedHighYield = [
    ...(Array.isArray(rawLesson.highYieldPoints) ? rawLesson.highYieldPoints : []),
    ...lessonSections.flatMap((section) => [section.examAngle, section.commonTrap, section.clinicalConnection]),
  ].map(cleanGeneratedText).filter(Boolean);
  const highYieldPoints = uniqueTexts(derivedHighYield, 12);
  const highYieldKeys = new Set(highYieldPoints.map(compareText));
  const mustKnow = uniqueTexts(Array.isArray(rawLesson.mustKnow) ? rawLesson.mustKnow : [], 10, highYieldKeys);
  const fallbackMustKnow = uniqueTexts(lessonSections.flatMap((section) => [section.clinicalConnection, section.examAngle, section.commonTrap]), 6, highYieldKeys);
  const outputMustKnow = mustKnow.length ? mustKnow : fallbackMustKnow;
  const usedAfterMustKnow = new Set([...highYieldKeys, ...outputMustKnow.map(compareText)]);
  const finalReview = uniqueTexts(Array.isArray(rawLesson.finalReview) ? rawLesson.finalReview : [], 12, usedAfterMustKnow);
  const derivedObjectives = Array.isArray(rawLesson.learningObjectives) && rawLesson.learningObjectives.length
    ? rawLesson.learningObjectives.map((item, index) => normalizeLearningObjective(item, index, lessonSections)).filter(isUsableLearningObjective)
    : [];
  const learningObjectives = uniqueTexts(
    derivedObjectives.length >= 3 ? derivedObjectives : lessonSections.slice(0, 5).map(buildLearningObjective),
    5,
  );
  const cleanShortIntro = cleanGeneratedText(rawLesson.shortIntro || rawLesson.summary || rawLesson.overview);
  const cleanOverview = cleanGeneratedText(rawLesson.overview || rawLesson.shortIntro);
  const cleanBigPicture = cleanGeneratedText(rawLesson.bigPicture || rawLesson.overview);
  const cleanClinicalRelevance = cleanGeneratedText(rawLesson.clinicalExamRelevance);
  const lesson = {
    title: cleanTopic(rawLesson.title || rawLesson.inferredTitle, 'Komite ders anlatımı'),
    inferredTitle: cleanTopic(rawLesson.inferredTitle || rawLesson.title, 'Komite ders anlatımı'),
    shortIntro: cleanShortIntro,
    overview: cleanOverview,
    bigPicture: cleanBigPicture,
    learningObjectives,
    mainConcepts: Array.isArray(rawLesson.mainConcepts) ? uniqueTexts(rawLesson.mainConcepts, 10) : [],
    clinicalExamRelevance: cleanClinicalRelevance,
    commonConfusions: Array.isArray(rawLesson.commonConfusions) ? uniqueTexts(rawLesson.commonConfusions, 8) : [],
    sections: lessonSections,
    highYieldPoints,
    mustKnow: outputMustKnow,
    finalReview: finalReview.length ? finalReview : uniqueTexts(lessonSections.map((section) => section.heading), 6, usedAfterMustKnow),
    tableOfContents: lessonSections.map((section) => section.heading),
    sourceFingerprint,
    generatedAt: Date.now(),
  };

  if (!lesson.sections.length || !lesson.learningObjectives.length) {
    throw new Error('Invalid komite lesson payload.');
  }
  return lesson;
}

function optionFeedbackById(rawFeedback = {}, options = []) {
  return OPTION_IDS.reduce((feedback, id, index) => {
    const optionText = options[index];
    const raw = rawFeedback?.[id] || rawFeedback?.[id.toLowerCase()] || rawFeedback?.[optionText];
    feedback[id] = compactText(typeof raw === 'string' ? raw : raw?.text || raw?.explanation);
    return feedback;
  }, {});
}

function resolveCorrectId(rawCorrect = '', options = []) {
  const clean = compactText(rawCorrect);
  const letter = clean.match(/^[A-E]$/iu)?.[0]?.toLocaleUpperCase('tr');
  if (letter) return letter;
  const normalizedCorrect = clean.toLocaleLowerCase('tr');
  const index = options.findIndex((option) => compactText(option).toLocaleLowerCase('tr') === normalizedCorrect);
  return OPTION_IDS[index] || '';
}

function normalizeQuestions(rawQuestions = [], sourceFingerprint = '') {
  const questions = (Array.isArray(rawQuestions) ? rawQuestions : [])
    .map((question, questionIndex) => {
      const optionTexts = Array.isArray(question.options)
        ? question.options.map((option) => compactText(typeof option === 'string' ? option : option?.text)).filter(Boolean)
        : [];
      const uniqueOptions = Array.from(new Set(optionTexts)).slice(0, 5);
      const correctOptionId = resolveCorrectId(question.correctAnswer || question.correct || question.answer, uniqueOptions);
      const optionFeedback = optionFeedbackById(question.optionFeedback || question.feedback || {}, uniqueOptions);
      if (uniqueOptions.length !== 5 || !correctOptionId || !compactText(question.stem || question.question)) return null;
      return {
        id: question.id || `komite-question-${Date.now()}-${questionIndex}`,
        questionNumber: questionIndex + 1,
        stem: compactText(question.stem || question.context),
        question: compactText(question.question || question.prompt),
        options: uniqueOptions.map((text, index) => ({ id: OPTION_IDS[index], text })),
        correctOptionId,
        explanation: compactText(question.explanation || question.rationale),
        optionFeedback,
        difficulty: normalizeDifficulty(question.difficulty),
        learningTarget: compactText(question.learningTarget || question.sourceTopic),
        sourceTopic: compactText(question.sourceTopic),
        supportingData: Array.isArray(question.supportingData) ? question.supportingData.map(compactText).filter(Boolean) : [],
        learningPoint: compactText(question.learningPoint),
        memoryNote: compactText(question.memoryNote),
        sourceFingerprint,
        generatedAt: Date.now(),
      };
    })
    .filter(Boolean);

  if (questions.length < 5) throw new Error('Invalid komite questions payload.');
  return questions.slice(0, 10);
}

function normalizeFlashcardDeck(rawDeck = {}, sourceFingerprint = '') {
  const cards = (Array.isArray(rawDeck.cards) ? rawDeck.cards : [])
    .map((card, index) => ({
      id: card.id || `komite-card-${Date.now()}-${index}`,
      front: compactText(card.front),
      back: compactText(card.back),
      explanation: compactText(card.explanation),
      examTrap: compactText(card.examTrap),
      type: compactText(card.type || card.tag || 'high_yield'),
      difficulty: normalizeDifficulty(card.difficulty || card.importance),
      tags: Array.isArray(card.tags) ? card.tags.map(compactText).filter(Boolean) : [compactText(card.sourceTopic || card.tag || 'Komite')],
      importance: compactText(card.importance),
      sourceTopic: compactText(card.sourceTopic),
      sourceFingerprint,
      generatedAt: Date.now(),
    }))
    .filter((card) => card.front && card.back);

  if (cards.length < 10) throw new Error('Invalid komite flashcard payload.');
  return {
    deckTitle: compactText(rawDeck.deckTitle) || 'Komite hap kartları',
    cards,
    sourceFingerprint,
    generatedAt: Date.now(),
  };
}

export async function generateKomiteStudyContent({ kind, payload, signal } = {}) {
  let response = null;
  try {
    response = await fetch('/api/generate-komite-study', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, ...(payload || {}) }),
      signal,
    });
  } catch (error) {
    if (kind === 'lesson') {
      const localLesson = buildLocalKomiteLessonFromPayload(payload);
      if (localLesson) return { lesson: normalizeLesson(localLesson, payload?.sourceFingerprint || '') };
    }
    throw error;
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (data?.debugReason) {
      console.error('[komite-study-api]', data.debugReason);
    }
    if (kind === 'lesson') {
      const localLesson = buildLocalKomiteLessonFromPayload(payload);
      if (localLesson) return { lesson: normalizeLesson(localLesson, data?.sourceFingerprint || payload?.sourceFingerprint || '') };
    }
    const error = new Error(getKomiteGenerationErrorMessage(data?.errorCode, data?.error, response.status));
    error.code = data?.errorCode || response.status || '';
    throw error;
  }

  try {
    if (kind === 'lesson') return { lesson: normalizeLesson(data?.lesson, data?.sourceFingerprint || payload?.sourceFingerprint || '') };
    if (kind === 'questions') return { questions: normalizeQuestions(data?.questions, data?.sourceFingerprint || payload?.sourceFingerprint || '') };
    if (kind === 'cards') return { flashcardDeck: normalizeFlashcardDeck(data?.flashcardDeck, data?.sourceFingerprint || payload?.sourceFingerprint || '') };
  } catch (error) {
    console.error('[komite-study-api]', error);
    if (kind === 'lesson') {
      const localLesson = buildLocalKomiteLessonFromPayload(payload);
      if (localLesson) return { lesson: normalizeLesson(localLesson, data?.sourceFingerprint || payload?.sourceFingerprint || '') };
    }
    throw new Error(KOMITE_GENERATION_ERROR_MESSAGE);
  }

  throw new Error(KOMITE_GENERATION_ERROR_MESSAGE);
}
