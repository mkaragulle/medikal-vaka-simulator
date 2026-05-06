import { Icon, IconBadge } from './ui.jsx';
import GlossaryText from './GlossaryTooltip.jsx';

const MAX_EVIDENCE_ITEMS = 5;
const MAX_PEARL_ITEMS = 4;
const MAX_MANAGEMENT_ITEMS = 4;
const MAX_COMPARISON_ITEMS = 6;

const GENERIC_COMPARISON_PATTERNS = [
  /belirleyici klinik bulgular doğru tanı lehine/i,
  /seçeneğin beklenen tipik bulguları/i,
  /ilk yönetim doğru tanının aciliyetine göre/i,
  /klinik bağlamda değerlendir/i,
  /ayırıcı tanıda yer alabilir/i,
  /veriler tek bir öğrenme hedefi etrafında birleşir/i,
];

const BASIC_SCIENCE_BRANCHES = new Set([
  'anatomy',
  'physiology',
  'histology-embryology',
  'medical-biochemistry',
  'medical-pathology',
  'medical-pharmacology',
  'medical-microbiology',
]);

function normalizeText(value = '') {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

function itemText(value) {
  if (!value) return '';
  if (typeof value === 'string') return normalizeText(value);
  return normalizeText(value.text || value.description || value.summary || value.explanation || value.label || value.title || '');
}

function itemTitle(value) {
  if (!value || typeof value === 'string') return '';
  return normalizeText(value.title || value.label || value.heading || value.type || '');
}

function trimTrailingPunctuation(value = '') {
  return normalizeText(value).replace(/[.;:]$/u, '');
}

function isContextlessEvidenceTitle(title = '') {
  return /^(Kanıt\s*\d+|Kanıt|Gerekçe ipucu|Ayırt ettirici ipucu)$/iu.test(normalizeText(title));
}

function isLaboratoryEvidence(text = '') {
  return /troponin|d-dimer|crp|lökosit|hemoglobin|trombosit|glukoz|ph\b|baz açığı|enzim|metabolit|kreatinin|ast|alt|bilirubin|seroloji|kültür|pcr|marker|antikor|antijen|ng\/mL|mg\/dL|pozitif|negatif/iu.test(normalizeText(text));
}

function isContextlessEvidenceText(text = '') {
  return /^(Yüksek|Düşük|Normal|Pozitif|Negatif|Saptandı|Saptanmadı)\.?$/iu.test(normalizeText(text));
}

function capitalizeSentence(value = '') {
  const text = normalizeText(value);
  if (!text) return '';
  return text.charAt(0).toLocaleUpperCase('tr') + text.slice(1);
}

function ensureSentence(value = '') {
  const text = capitalizeSentence(normalizeText(value));
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function truncateSentence(value = '', limit = 230) {
  const text = normalizeText(value);
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit).replace(/\s+\S*$/u, '').trim();
  return `${cut}…`;
}

function splitIntoSentences(text = '') {
  return normalizeText(text)
    .split(/(?<=[.!?])\s+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function compactParagraph(value = '', maxSentences = 4, maxLength = 620) {
  const sentences = splitIntoSentences(value).slice(0, maxSentences);
  const text = sentences.length ? sentences.join(' ') : normalizeText(value);
  return truncateSentence(text, maxLength);
}

function unique(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    const text = itemText(item);
    if (!text) return false;
    const key = text.toLocaleLowerCase('tr');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function removeMetaLanguage(value = '') {
  return normalizeText(value)
    .replace(/Bu spot olguda\s+/giu, '')
    .replace(/öğrenci\s+[^.]*\.?/giu, '')
    .replace(/Bu vaka,?\s*/giu, '')
    .replace(/klinik bağlamda değerlendirilir/giu, 'olgudaki objektif paternle yorumlanır')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitActionItems(text = '') {
  const normalized = normalizeText(text);
  if (!normalized) return [];

  const semicolonParts = normalized.split(/;\s*/u).map(trimTrailingPunctuation).filter(Boolean);
  if (semicolonParts.length > 1) return semicolonParts;

  const sentenceParts = splitIntoSentences(normalized).map(trimTrailingPunctuation).filter(Boolean);
  if (sentenceParts.length > 1) return sentenceParts;

  return normalized
    .split(/,\s+(?=(?:intravenöz|oral|acil|ritim|hemodinami|hasta|tedavi|cerrahi|antibiyotik|antikoagülasyon|aspirin|görüntüleme|izlem|kontrendikasyon|mekanik|reperfüzyon|stabilizasyon|bildirim|güvenlik)\b)/iu)
    .map(trimTrailingPunctuation)
    .filter(Boolean);
}

function getFeedback(clinicalCase) {
  return clinicalCase.diagnosis?.answerFeedback || clinicalCase.answerFeedback || {};
}

function pickClinicalMeta(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  if (feedback.shortDiagnosisMeta) return normalizeText(feedback.shortDiagnosisMeta);
  if (feedback.diagnosisMeta) return normalizeText(feedback.diagnosisMeta);

  const focus = normalizeText(clinicalCase.clinicalFocus || '');
  if (focus) return focus.split(/[,.;]/u)[0].trim();
  return normalizeText(clinicalCase.setting || 'Klinik karar verme');
}

function getMainClue(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const candidates = [
    feedback.spotClue,
    clinicalCase.spotClue,
    clinicalCase.patientIntro?.priorityFocus,
    clinicalCase.patientIntro?.distinctiveClues?.[0],
    feedback.evidenceChain?.[0]?.title ? `${feedback.evidenceChain[0].title}: ${feedback.evidenceChain[0].text || ''}` : feedback.evidenceChain?.[0],
    clinicalCase.clinicalFocus,
    clinicalCase.chiefComplaint,
  ];
  return truncateSentence(removeMetaLanguage(candidates.find((item) => normalizeText(itemText(item))) || ''), 190);
}

function deriveWhyCorrect(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const explicit = normalizeText(feedback.whyCorrect || '');
  if (explicit) return compactParagraph(removeMetaLanguage(explicit), 4, 620);

  const explanation = normalizeText(clinicalCase.diagnosis?.explanation || '');
  if (explanation) return compactParagraph(removeMetaLanguage(explanation), 4, 620);

  const clue = getMainClue(clinicalCase);
  const correct = clinicalCase.diagnosis?.correct || 'doğru seçenek';
  return `${clue ? `${clue} karar verdirici ana ipucudur. ` : ''}Bu nedenle ${correct} olgudaki öykü, muayene ve objektif veri paternini en iyi açıklar.`;
}

function normalizeWrongMap(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const maps = [
    feedback.whyWrong,
    feedback.differentialComparison,
    feedback.differentials,
    feedback.differentialExplanations,
    clinicalCase.diagnosis?.differentials,
  ].filter((map) => map && typeof map === 'object' && !Array.isArray(map));

  return maps.reduce((accumulator, map) => {
    Object.entries(map).forEach(([key, value]) => {
      if (!key || accumulator[key]) return;
      if (typeof value === 'string') accumulator[key] = { explanation: value, comparisonPoints: [] };
      else accumulator[key] = {
        explanation: value?.explanation || value?.summary || '',
        comparisonPoints: value?.comparisonPoints || value?.points || [],
      };
    });
    return accumulator;
  }, {});
}

function deriveWhyWrong(clinicalCase, selectedOption, selectedComparison) {
  const feedback = getFeedback(clinicalCase);
  if (selectedOption && feedback.whyWrong && typeof feedback.whyWrong === 'object' && typeof feedback.whyWrong[selectedOption] === 'string') {
    return compactParagraph(removeMetaLanguage(feedback.whyWrong[selectedOption]), 4, 620);
  }
  if (typeof feedback.whyWrong === 'string') return compactParagraph(removeMetaLanguage(feedback.whyWrong), 4, 620);
  if (selectedComparison?.explanation) return compactParagraph(removeMetaLanguage(selectedComparison.explanation), 4, 620);

  const clue = getMainClue(clinicalCase);
  const correctDiagnosis = clinicalCase.diagnosis?.correct || 'doğru seçenek';
  if (selectedOption) {
    return `${selectedOption} bazı benzer olgularda düşünülebilir; ancak bu vakada ${clue ? `${clue} ` : 'ana klinik patern '}doğru yanıta götüren belirleyici ipucudur. Bu seçim, ${correctDiagnosis} lehine olan kanıt zincirini ve ilk yaklaşımı eksik bırakır.`;
  }

  return `Seçilen yanıt, olgunun ana klinik ve tetkik paternini ${correctDiagnosis} kadar iyi açıklamaz.`;
}

function inferEvidenceTitle(text = '', index = 0) {
  const normalized = normalizeText(text).toLocaleLowerCase('tr');
  if (/st |ekg|derivasyon|ritim|qrs|qt|pr\b|segment/.test(normalized)) return 'EKG paterni';
  if (/bt|mr|mrg|usg|grafi|tomografi|görüntüleme|radyografi|ultrason/.test(normalized)) return 'Görüntüleme bulgusu';
  if (/troponin|crp|lökosit|hemoglobin|trombosit|glukoz|ph\b|baz açığı|enzim|metabolit|kreatinin|ast|alt|bilirubin|seroloji|kültür|pcr|marker|antikor|antijen/.test(normalized)) return 'Laboratuvar paterni';
  if (/muayene|oskültasyon|defans|rebound|döküntü|ekimoz|letarji|ral|üfürüm|ödem|nörolojik|ateş/.test(normalized)) return 'Muayene bulgusu';
  if (/öykü|maruziyet|travma|ilaç|sigara|gebelik|doğum|aile|beslenme|seyahat|temas/.test(normalized)) return 'Öykü ipucu';
  if (/yaş|bebek|çocuk|yenidoğan|erkek|kadın|adölesan|gebede/.test(normalized)) return 'Klinik bağlam';
  if (/reseptör|enzim|gen|mutasyon|yolak|hormon|protein|histolojik|nekroz|inflamasyon|morfoloji/.test(normalized)) return 'Mekanizma';
  if (/negatif|saptanmadı|normal|yok/.test(normalized)) return 'Dışlatıcı bulgu';
  return index === 0 ? 'Klinik ipucu' : 'Destekleyici bulgu';
}

function normalizeTitledItem(item, index, fallbackTitle, maxLength = 190) {
  if (!item) return null;
  const originalTitle = itemTitle(item);
  let text = removeMetaLanguage(itemText(item));
  if (!text) return null;

  let title = originalTitle;
  const colonMatch = text.match(/^([^:：]{2,42})[:：]\s*(.+)$/u);
  if ((!title || isContextlessEvidenceTitle(title)) && colonMatch) {
    title = normalizeText(colonMatch[1]);
    text = normalizeText(colonMatch[2]);
  }

  const shouldInferTitle = !title || isContextlessEvidenceTitle(title) || (/^Laboratuvar paterni$/iu.test(title) && !isLaboratoryEvidence(text));
  if (shouldInferTitle) title = fallbackTitle && !isContextlessEvidenceTitle(fallbackTitle) ? fallbackTitle : inferEvidenceTitle(text, index);
  if (isContextlessEvidenceText(text)) return null;
  return {
    title: truncateSentence(trimTrailingPunctuation(title), 46),
    text: truncateSentence(text, maxLength),
  };
}

function cleanEvidenceText(item, index = 0) {
  const normalized = normalizeTitledItem(item, index, null, 185);
  if (!normalized || isContextlessEvidenceTitle(normalized.title) || isContextlessEvidenceText(normalized.text)) return null;
  normalized.text = normalized.text
    .replace(/^Başvuru:\s*/iu, '')
    .replace(/^Muayene:\s*/iu, '')
    .replace(/^Tetkik:\s*/iu, '');
  return normalized;
}

function deriveEvidenceChain(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const rawEvidence = [];
  if (Array.isArray(feedback.evidenceChain)) rawEvidence.push(...feedback.evidenceChain);

  if (rawEvidence.length < 3 && clinicalCase.chiefComplaint) {
    rawEvidence.push({ title: 'Başvuru paterni', text: `${trimTrailingPunctuation(clinicalCase.chiefComplaint)} başvurunun temel klinik problemini oluşturur` });
  }

  if (rawEvidence.length < 4 && Array.isArray(clinicalCase.exam) && clinicalCase.exam.length) {
    rawEvidence.push({ title: 'Muayene bulgusu', text: trimTrailingPunctuation(clinicalCase.exam[0]) });
  }

  const highYieldInvestigations = (clinicalCase.investigations || [])
    .map((investigation) => {
      const finding = investigation.summary || investigation.findings?.[0] || '';
      if (!finding) return null;
      return { title: investigation.label || 'Tetkik paterni', text: trimTrailingPunctuation(finding) };
    })
    .filter(Boolean);

  rawEvidence.push(...highYieldInvestigations.slice(0, 3));

  if (rawEvidence.length < 3) {
    const explanationSentences = splitIntoSentences(clinicalCase.diagnosis?.explanation || '');
    explanationSentences.slice(0, 2).forEach((sentence) => rawEvidence.push({ title: 'Gerekçe ipucu', text: trimTrailingPunctuation(sentence) }));
  }

  return unique(rawEvidence)
    .slice(0, MAX_EVIDENCE_ITEMS)
    .map(cleanEvidenceText)
    .filter(Boolean);
}

function inferPearlLabel(text = '', index = 0) {
  const normalized = normalizeText(text).toLocaleLowerCase('tr');
  if (/kırmızı bayrak|red flag|tutarsız|acil|geciktirmez/.test(normalized)) return 'TUS kırmızı bayrağı';
  if (/ilk|başla|önce|bekleme|stabilizasyon|reperfüzyon|bildirim/.test(normalized)) return 'İlk adım';
  if (/değil|kaçır|karışır|tuzak|çeldirici|yanlış/.test(normalized)) return 'Sık tuzak';
  if (/mekanizma|enzim|reseptör|gen|yolak|inhibe|aktive/.test(normalized)) return 'Mekanizma';
  if (/tanı|test|marker|seroloji|kültür|pcr|histoloji/.test(normalized)) return 'Ayırt ettirici bulgu';
  return index === 0 ? 'Sınav incisi' : 'Hap bilgi';
}

function derivePearls(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const pearls = feedback.clinicalPearls || feedback.pearls || clinicalCase.diagnosis?.pearls || [];
  const clue = getMainClue(clinicalCase);
  const rawPearls = Array.isArray(pearls) ? [...pearls] : [];
  if (rawPearls.length < 2 && clue) rawPearls.push({ label: 'TUS paterni', text: `${clue} benzer sorularda çeldiricileri eleten yüksek verimli patern olarak hatırlanmalıdır.` });

  return unique(rawPearls)
    .slice(0, MAX_PEARL_ITEMS)
    .map((item, index) => {
      const normalized = normalizeTitledItem(item, index, item?.label || inferPearlLabel(itemText(item), index), 170);
      if (!normalized) return null;
      normalized.label = normalized.title;
      return normalized;
    })
    .filter(Boolean);
}

function inferManagementTitle(text = '', index = 0) {
  const normalized = normalizeText(text).toLocaleLowerCase('tr');
  if (/stabil|abc|hava yolu|solunum|dolaşım|monitör|damar yolu|nöbet/.test(normalized)) return 'Stabilizasyon';
  if (/kaydet|dokümante|objektif|adli|bildirim|güvenlik|koruyucu/.test(normalized)) return /bildirim|güvenlik|koruyucu|adli/.test(normalized) ? 'Güvenlik ve bildirim' : 'Objektif kayıt';
  if (/tetkik|ekg|bt|mr|usg|kültür|seroloji|biyopsi|marker|laboratuvar|doğrula/.test(normalized)) return 'Tanısal doğrulama';
  if (/tedavi|başla|ver|antibiyotik|antikoagülasyon|aspirin|insülin|antidot|cerrahi|pci|reperfüzyon|hipotermi|sıvı/.test(normalized)) return 'İlk tedavi';
  if (/izle|takip|kontrol|komplikasyon|yanıt|daralt|değiştir/.test(normalized)) return 'İzlem';
  return index === 0 ? 'İlk karar' : 'Sonraki adım';
}

function deriveManagementSteps(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const management = feedback.managementSteps || feedback.management;
  let steps = [];
  if (Array.isArray(management) && management.length) {
    steps = management;
  } else {
    const nextStep = clinicalCase.diagnosis?.nextStep || '';
    steps = splitActionItems(nextStep);
  }

  return unique(steps)
    .slice(0, MAX_MANAGEMENT_ITEMS)
    .map((step, index) => normalizeTitledItem(step, index, inferManagementTitle(itemText(step), index), 170))
    .filter(Boolean);
}

function isGenericComparisonPoint(point = '') {
  return GENERIC_COMPARISON_PATTERNS.some((pattern) => pattern.test(point));
}

function buildNaturalComparisonPoints(clinicalCase, option, evidenceChain = []) {
  const keyEvidence = evidenceChain[0]?.text || itemText(evidenceChain[0]);
  const secondEvidence = evidenceChain[1]?.text || itemText(evidenceChain[1]);
  const expectedPattern = inferOptionExpectedPattern(option);
  const points = [
    expectedPattern ? `Beklenen patern: ${expectedPattern}` : null,
    keyEvidence ? `Olgu verisi: ${trimTrailingPunctuation(keyEvidence)}.` : null,
    secondEvidence ? `Ek destek: ${trimTrailingPunctuation(secondEvidence)}.` : null,
  ];

  return unique(points.filter(Boolean)).slice(0, 3).map((item) => truncateSentence(item, 155));
}

function inferOptionExpectedPattern(option = '') {
  const text = normalizeText(option).toLocaleLowerCase('tr');
  if (/pnömoni/.test(text)) return 'ateş, öksürük, balgam ve parankimal infiltrasyon beklenir.';
  if (/pnömotoraks/.test(text)) return 'tek taraflı solunum sesi azalması ve akciğer grafisinde plevral çizgi beklenir.';
  if (/astım/.test(text)) return 'wheezing ve bronkospazm ön plandadır.';
  if (/radyasyon/.test(text)) return 'iyonizan radyasyon maruziyeti, GİS prodromu ve hematopoetik baskılanma beklenir.';
  if (/akut koroner|miyokart|stemi|nstemi/.test(text)) return 'iskemik ağrı, EKG ve troponin paterni beklenir.';
  if (/panik/.test(text)) return 'objektif organ/tromboemboli bulgusu olmadan ani anksiyete atağı beklenir.';
  return '';
}

function buildOptionComparisons(clinicalCase, selectedOption, evidenceChain = []) {
  const feedback = getFeedback(clinicalCase);
  const correct = clinicalCase.diagnosis?.correct;
  const options = Array.isArray(clinicalCase.diagnosis?.options) ? clinicalCase.diagnosis.options : [];
  const wrongMap = normalizeWrongMap(clinicalCase);
  const whyCorrect = deriveWhyCorrect(clinicalCase);
  const clue = getMainClue(clinicalCase);

  return options.slice(0, MAX_COMPARISON_ITEMS).map((option) => {
    const isCorrectOption = option === correct;
    if (isCorrectOption) {
      return {
        option,
        status: 'correct',
        isSelected: selectedOption === option,
        title: 'En iyi seçenek',
        explanation: truncateSentence(whyCorrect, 260),
        comparisonPoints: clue ? [`Özet patern: ${trimTrailingPunctuation(clue)}.`] : [],
      };
    }

    const explicit = wrongMap[option] || {};
    const explanation = removeMetaLanguage(explicit.explanation || `${option} için beklenen tipik öykü, muayene veya tetkik paterni bu olguda baskın değildir. ${clue ? `${clue} ` : 'Olgudaki somut kanıtlar '}doğru seçenek lehine daha tutarlıdır.`);
    const nonGenericPoints = unique(explicit.comparisonPoints || []).filter((point) => !isGenericComparisonPoint(point));

    return {
      option,
      status: 'wrong',
      isSelected: selectedOption === option,
      title: selectedOption === option ? 'Seçtiğin çeldirici' : 'Neden elenir?',
      explanation: truncateSentence(explanation, 260),
      comparisonPoints: (nonGenericPoints.length ? nonGenericPoints : buildNaturalComparisonPoints(clinicalCase, option, evidenceChain)).slice(0, 3),
    };
  });
}

function FeedbackSection({ icon, tone = 'blue', eyebrow, title, children, className = '' }) {
  return (
    <section className={`feedback-card ${className}`.trim()}>
      <header className="feedback-card-head">
        <IconBadge icon={icon} tone={tone} size="sm" />
        <div>
          {eyebrow ? <span>{eyebrow}</span> : null}
          <h4>{title}</h4>
        </div>
      </header>
      {children}
    </section>
  );
}

function ResultSummary({ isCorrect, diagnosis, selected, points, diagnosisMeta, glossaryEnabled = true, isSpotCase = false }) {
  const statusTone = isCorrect ? 'success' : 'danger';
  return (
    <header className={`answer-feedback-summary ${statusTone}`}>
      <div className="answer-feedback-status-icon">
        <Icon name={isCorrect ? 'CheckCircle' : 'XCircle'} />
      </div>
      <div className="answer-feedback-summary-copy">
        <span className={`feedback-status-pill ${statusTone}`}>{isCorrect ? 'Doğru' : 'Yanlış'}</span>
        <h3>{isCorrect ? (isSpotCase ? 'Karar doğru seçildi' : 'Tanı doğru seçildi') : (isSpotCase ? 'Seçilen yanıt doğru değil' : 'Seçilen tanı doğru değil')}</h3>
        {isCorrect ? (
          <p><GlossaryText text={diagnosis} enabled={glossaryEnabled} /></p>
        ) : (
          <p><strong>Doğru:</strong> <GlossaryText text={diagnosis} enabled={glossaryEnabled} /> · <strong>Seçimin:</strong> <GlossaryText text={selected} enabled={glossaryEnabled} /></p>
        )}
        {diagnosisMeta ? <small><GlossaryText text={diagnosisMeta} enabled={glossaryEnabled} /></small> : null}
      </div>
      <div className="answer-feedback-meta-row" aria-label="Yanıt özeti">
        {isCorrect ? <span>Vaka puanı: {points} p</span> : <span>{isSpotCase ? 'Yanıt puanı: 0' : 'Tanı puanı: 0'}</span>}
      </div>
    </header>
  );
}

function ReasoningCard({ reasoningText, isCorrect = true, glossaryEnabled = true }) {
  return (
    <FeedbackSection
      icon={isCorrect ? 'Brain' : 'AlertTriangle'}
      tone={isCorrect ? 'blue' : 'warning'}
      eyebrow="Klinik gerekçe"
      title={isCorrect ? 'Neden doğru?' : 'Neden yanlış?'}
      className="reasoning-evidence-card clinical-reasoning-card"
    >
      <p className="feedback-body-copy"><GlossaryText text={ensureSentence(reasoningText)} enabled={glossaryEnabled} /></p>
    </FeedbackSection>
  );
}

function EvidenceChainCard({ evidenceChain, glossaryEnabled = true }) {
  if (!evidenceChain.length) return null;
  return (
    <FeedbackSection icon="ClipboardList" tone="teal" eyebrow="Kanıt zinciri" title="Hangi ipuçları çözdürür?" className="evidence-chain-card">
      <ol className="evidence-chain-list evidence-chain-list-pro">
        {evidenceChain.map((item, index) => (
          <li key={`${item.title}-${item.text}-${index}`}>
            <b>{index + 1}</b>
            <div className="evidence-chain-copy">
              <strong><GlossaryText text={item.title} enabled={glossaryEnabled} /></strong>
              <p><GlossaryText text={ensureSentence(item.text)} enabled={glossaryEnabled} /></p>
            </div>
          </li>
        ))}
      </ol>
    </FeedbackSection>
  );
}

function ClinicalPearlsList({ pearls, glossaryEnabled = true }) {
  if (!pearls.length) return null;
  return (
    <FeedbackSection icon="Sparkles" tone="accent" eyebrow="Sınav notu" title="Kritik ipuçları" className="clinical-pearls-card">
      <div className="clinical-pearl-list">
        {pearls.map((pearl, index) => (
          <div className="clinical-pearl-item clinical-pearl-item-pro" key={`${pearl.label}-${pearl.text}-${index}`}>
            <span aria-hidden="true" />
            <p><strong><GlossaryText text={pearl.label} enabled={glossaryEnabled} />:</strong> <GlossaryText text={ensureSentence(pearl.text)} enabled={glossaryEnabled} /></p>
          </div>
        ))}
      </div>
    </FeedbackSection>
  );
}

function OptionComparisonCard({ comparisons, glossaryEnabled = true, isSpotCase = false }) {
  if (!comparisons.length) return null;
  return (
    <FeedbackSection icon="Target" tone="warning" eyebrow="Seçenek karşılaştırması" title={isSpotCase ? 'Şıklar nasıl elenir?' : 'Ayırıcı karar'} className="option-comparison-card differential-comparison-card">
      <div className="option-comparison-list">
        {comparisons.map((item, index) => (
          <article className={`option-comparison-item ${item.status} ${item.isSelected ? 'selected-option' : ''}`.trim()} key={`${item.option}-${index}`}>
            <div className="option-comparison-head">
              <span className={`option-comparison-status ${item.status}`}>{item.status === 'correct' ? 'Doğru' : item.isSelected ? 'Seçimin' : 'Çeldirici'}</span>
              <strong><GlossaryText text={item.option} enabled={glossaryEnabled} /></strong>
            </div>
            <p><GlossaryText text={ensureSentence(item.explanation)} enabled={glossaryEnabled} /></p>
            {item.comparisonPoints?.length ? (
              <ul className="comparison-point-list">
                {item.comparisonPoints.slice(0, 3).map((point, pointIndex) => (
                  <li key={`${point}-${pointIndex}`}><GlossaryText text={ensureSentence(point)} enabled={glossaryEnabled} /></li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </FeedbackSection>
  );
}

function FeedbackManagementCard({ managementSteps, glossaryEnabled = true, clinicalCase }) {
  if (!managementSteps.length) return null;
  const isBasic = BASIC_SCIENCE_BRANCHES.has(clinicalCase?.branchId) && clinicalCase?.caseType !== 'spot';
  return (
    <FeedbackSection icon="Timer" tone="warning" eyebrow={isBasic ? 'Yaklaşım' : 'Yönetim'} title={isBasic ? 'Mekanistik yaklaşım notu' : 'İlk yönetim basamağı'} className="feedback-management-card">
      <div className="management-action-list">
        {managementSteps.map((step, index) => (
          <div className="management-action-item management-action-item-pro" key={`${step.title}-${step.text}-${index}`}>
            <b>{index + 1}</b>
            <p><strong><GlossaryText text={step.title} enabled={glossaryEnabled} />:</strong> <GlossaryText text={ensureSentence(step.text)} enabled={glossaryEnabled} /></p>
          </div>
        ))}
      </div>
    </FeedbackSection>
  );
}

function AnswerFeedbackPanel({
  clinicalCase,
  selected,
  isCorrect,
  difficultyMeta,
  children,
  hardMode = false,
}) {
  const selectedDiagnosis = selected;
  const whyCorrect = deriveWhyCorrect(clinicalCase);
  const evidenceChain = deriveEvidenceChain(clinicalCase);
  const optionComparisons = buildOptionComparisons(clinicalCase, selectedDiagnosis, evidenceChain);
  const selectedComparison = optionComparisons.find((item) => item.option === selectedDiagnosis);
  const whyWrong = deriveWhyWrong(clinicalCase, selectedDiagnosis, selectedComparison);
  const reasoningText = isCorrect ? whyCorrect : whyWrong;
  const pearls = derivePearls(clinicalCase);
  const managementSteps = deriveManagementSteps(clinicalCase);
  const glossaryEnabled = !hardMode;
  const isSpotCase = clinicalCase.caseType === 'spot' || clinicalCase.caseType === 'ai-spot' || clinicalCase.branchId === 'tus-spot-olgular';
  const diagnosisMeta = pickClinicalMeta(clinicalCase);
  const points = difficultyMeta?.points || 0;

  return (
    <div className={`feedback answer-feedback-panel ${isCorrect ? 'success' : 'danger'} answer-feedback-panel-pro`} aria-live="polite">
      <ResultSummary
        isCorrect={isCorrect}
        diagnosis={clinicalCase.diagnosis?.correct}
        selected={selectedDiagnosis}
        points={points}
        diagnosisMeta={diagnosisMeta}
        glossaryEnabled={glossaryEnabled}
        isSpotCase={isSpotCase}
      />

      <div className="answer-feedback-grid answer-feedback-grid-pro">
        <div className="feedback-column feedback-primary-column">
          <ReasoningCard reasoningText={reasoningText} isCorrect={isCorrect} glossaryEnabled={glossaryEnabled} />
          <EvidenceChainCard evidenceChain={evidenceChain} glossaryEnabled={glossaryEnabled} />
        </div>

        {(pearls.length || managementSteps.length) ? (
          <div className="feedback-column feedback-support-column">
            <ClinicalPearlsList pearls={pearls} glossaryEnabled={glossaryEnabled} />
            <FeedbackManagementCard managementSteps={managementSteps} glossaryEnabled={glossaryEnabled} clinicalCase={clinicalCase} />
          </div>
        ) : null}

        <OptionComparisonCard comparisons={optionComparisons} glossaryEnabled={glossaryEnabled} isSpotCase={isSpotCase} />
      </div>

      {children ? <div className="answer-feedback-actions">{children}</div> : null}
    </div>
  );
}

export default AnswerFeedbackPanel;
