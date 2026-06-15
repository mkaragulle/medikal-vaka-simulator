import DiagnosisQuiz from './DiagnosisQuiz.jsx';
import GlossaryText from './GlossaryTooltip.jsx';
import { Icon } from './ui.jsx';
import { getDifficultyMeta } from '../utils/scoring.js';


function compactText(value = '') {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function buildTusSpotContextLine(question = {}) {
  return compactText([
    question.relatedBranch || question.branchName || 'TUS',
    question.difficulty,
    question.learningTarget || question.clinicalFocus,
  ].filter(Boolean).join(' · '));
}

function buildTusSpotNarrativeStem(question = {}) {
  const candidates = [
    question.narrativeStem,
    question.stem,
    question.questionStem,
    question.patientIntro?.historySummary,
    question.chiefComplaint,
    question.question,
  ].map(compactText).filter(Boolean);
  const text = candidates[0] || 'Bu soru metni statik kayıt üzerinden görüntüleniyor.';
  return text.split(/(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜ0-9])/u).map(compactText).filter(Boolean);
}

function buildTusSpotQuestionStem(question = {}) {
  return compactText(question.question || question.prompt || question.clinicalFocus || 'En olası seçenek hangisidir?');
}

function getTusSpotPreviewDiagnostics(question = {}) {
  const paragraphs = buildTusSpotNarrativeStem(question);
  return {
    paragraphCount: paragraphs.length,
    wordCount: paragraphs.join(' ').split(/\s+/u).filter(Boolean).length,
    supportGroupCount: 0,
    supportItemCount: 0,
    hasLegacyBoxLabels: false,
    containsCorrectAnswerText: false,
  };
}

const TUS_SPOT_BRANCH = {
  id: 'tus-spot-olgular',
  name: 'TUS Spot Sorusu',
  shortName: 'TUS Spot',
  description: 'Tek köklü, paragraf temelli TUS spot sorusu.',
};


function normalizeDisplayNumber(raw = '') {
  const match = String(raw || '').replace(',', '.').match(/-?\d+(?:\.\d+)?/u);
  if (!match) return '';
  const value = Number.parseFloat(match[0]);
  if (!Number.isFinite(value)) return '';
  return Number.isInteger(value) ? String(value) : String(value).replace(/\.0$/u, '');
}

function toTurkishTitleCase(text = '') {
  const lower = String(text || '').trim().toLocaleLowerCase('tr');
  if (!lower) return '';

  return lower
    .split(/(\s+|[\/()-])/u)
    .map((token) => {
      if (!token || /^(\s+|[\/()-])$/u.test(token)) return token;
      return token.charAt(0).toLocaleUpperCase('tr') + token.slice(1);
    })
    .join('');
}

function formatTusSpotDataLabel(label = '') {
  const rawLabel = String(label || '').trim();
  if (!rawLabel) return 'Veri';

  const normalized = rawLabel
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const key = normalized.toLocaleLowerCase('tr');

  if (/^(ta|tansiyon|kan basıncı|kan basinçi|kan basinci|arteriyel tansiyon|kan basinci)$/iu.test(normalized)) return 'Kan Basıncı';
  if (/^(spo2|spo₂|oksijen satürasyonu|satürasyon)$/iu.test(normalized)) return 'SpO₂';
  if (/^(ph)$/iu.test(normalized)) return 'pH';
  if (/^(wbc)$/iu.test(normalized)) return 'WBC';
  if (/^(crp)$/iu.test(normalized)) return 'CRP';
  if (/^(alt|ast|alp|ggt|tsh|bt|pt|inr|hb|ekg|ecg|usg|mr|mri|ct|bt)$/iu.test(normalized)) return normalized.toLocaleUpperCase('tr').replace('ECG', 'EKG').replace('MRI', 'MR').replace('CT', 'BT');
  if (/^(gks)$/iu.test(normalized)) return 'GKS';
  if (/^(glaskow|glasgow)$/iu.test(key)) return 'Glasgow';
  if (/^(yaşına göre|yasina gore)$/iu.test(key)) return 'Yaşına Göre';
  if (/^(kalp hızı)$/iu.test(key)) return 'Kalp Hızı';

  return toTurkishTitleCase(normalized);
}

function formatTusSpotGroupTitle(title = '') {
  const normalized = String(title || '')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const key = normalized.toLocaleLowerCase('tr');

  if (/vital/iu.test(normalized)) return 'Vital Bulgular';
  if (/laboratuvar/iu.test(normalized) || /lab\b/iu.test(normalized)) return 'Laboratuvar Verileri';
  if (/muayene/iu.test(normalized)) return 'Fizik Muayene';
  if (/görüntüleme|goruntuleme|radyoloji/iu.test(normalized)) return 'Görüntüleme';
  if (/mikrobiyoloji/iu.test(normalized)) return 'Mikrobiyoloji';
  if (/patoloji/iu.test(normalized)) return 'Patoloji';
  if (/ek veri|objektif|destek/iu.test(normalized)) return 'Destekleyici Veriler';
  if (/yaşına göre|yasina gore/iu.test(key)) return 'Yaşına Göre';

  return toTurkishTitleCase(normalized);
}

function formatTusSpotDataValue(label = '', value = '') {
  const rawLabel = String(label || '').trim();
  let rawValue = String(value || '').trim();
  if (!rawValue) return { value: '—', quality: 'missing' };

  rawValue = rawValue
    .replace(/\bSpO2\b/giu, 'SpO₂')
    .replace(/\bPH\b/g, 'pH')
    .replace(/\bmm\s*hg\b/giu, 'mmHg')
    .replace(/\bmg\s*\/\s*dl\b/giu, 'mg/dL')
    .replace(/\bg\s*\/\s*dl\b/giu, 'g/dL')
    .replace(/\bmeq\s*\/\s*l\b/giu, 'mEq/L')
    .replace(/\bmmol\s*\/\s*l\b/giu, 'mmol/L')
    .replace(/\s+/g, ' ')
    .trim();

  const key = rawLabel.toLocaleLowerCase('tr');
  const comparable = rawValue.toLocaleLowerCase('tr');
  const hasClinicalUnit = /(?:mmHg|°C|\/dk|%|mg\/dL|mg\/L|g\/dL|mEq\/L|mmol\/L|U\/L|IU\/L|ng\/mL|pg\/mL|\/mm³|\/µL|×10³\/µL|x10\^3\/µL)/iu.test(rawValue);
  const numeric = normalizeDisplayNumber(rawValue);

  if (/^(ta|tansiyon|kan basıncı|arteriyel tansiyon)$/iu.test(rawLabel) && /^\d{2,3}\s*\/\s*\d{2,3}$/u.test(rawValue)) {
    return { value: rawValue.replace(/\s*\/\s*/u, '/') + ' mmHg', quality: 'completed' };
  }
  if (/nabız|nabiz|kalp hızı|kalp hizi/iu.test(key) && numeric && !hasClinicalUnit) {
    return { value: `${numeric}/dk`, quality: 'completed' };
  }
  if (/solunum/iu.test(key) && numeric && !hasClinicalUnit) {
    return { value: `${numeric}/dk`, quality: 'completed' };
  }
  if (/ateş|ates|sıcaklık|sicaklik/iu.test(key) && numeric && !hasClinicalUnit) {
    const fever = Number.parseFloat(numeric);
    const formatted = Number.isFinite(fever) ? fever.toFixed(1).replace(/\.0$/u, '.0') : numeric;
    return { value: `${formatted} °C`, quality: 'completed' };
  }
  if (/spo₂|spo2|satürasyon|saturasyon/iu.test(key) && numeric && !hasClinicalUnit) {
    return { value: `%${Math.round(Number.parseFloat(numeric))}`, quality: 'completed' };
  }

  if (hasClinicalUnit || !numeric || /pozitif|negatif|düşük|yüksek|normal|artmış|azalmış|saptan/i.test(comparable)) {
    return { value: rawValue, quality: 'clean' };
  }

  if (/lökosit|lokosit|wbc/iu.test(key)) {
    const n = Number.parseFloat(numeric);
    return { value: n < 100 ? `${numeric} ×10³/µL` : `${numeric}/mm³`, quality: 'completed' };
  }
  if (/trombosit|platelet|plt/iu.test(key)) return { value: `${numeric} ×10³/µL`, quality: 'completed' };
  if (/hemoglobin|\bhb\b/iu.test(key)) return { value: `${numeric} g/dL`, quality: 'completed' };
  if (/crp|c-reaktif/iu.test(key)) return { value: `${numeric} mg/L`, quality: 'completed' };
  if (/glukoz|glucose|kan şekeri|kan sekeri/iu.test(key)) return { value: `${numeric} mg/dL`, quality: 'completed' };
  if (/kreatinin|üre|ure|bilirubin|kolesterol|trigliserid/iu.test(key)) return { value: `${numeric} mg/dL`, quality: 'completed' };
  if (/sodyum|na⁺|na\+|potasyum|k⁺|k\+|klor|bikarbonat|hco₃|hco3/iu.test(key)) return { value: `${numeric} mEq/L`, quality: 'completed' };
  if (/laktat/iu.test(key)) return { value: `${numeric} mmol/L`, quality: 'completed' };
  if (/ast|alt|alp|ggt|amilaz|lipaz/iu.test(key)) return { value: `${numeric} U/L`, quality: 'completed' };
  if (/tsh/iu.test(key)) return { value: `${numeric} µIU/mL`, quality: 'completed' };
  if (/t4|t3/iu.test(key)) return { value: `${numeric} ng/dL`, quality: 'completed' };

  return { value: rawValue, quality: 'clean' };
}

function TusSpotMetaBadge({ icon, children, tone = 'teal' }) {
  return (
    <span className={`tus-spot-narrative-badge ${tone}`.trim()}>
      <Icon name={icon} size={14} />
      {children}
    </span>
  );
}

function CompactDataGroup({ title, items = [] }) {
  if (!items.length) return null;
  const displayTitle = formatTusSpotGroupTitle(title);

  return (
    <div className="tus-spot-compact-data-group" aria-label={displayTitle}>
      <div className="tus-spot-compact-data-title">{displayTitle}</div>
      <div className="tus-spot-compact-data-grid">
        {items.map((item, index) => {
          const label = formatTusSpotDataLabel(item.label || '');
          const formatted = formatTusSpotDataValue(label, item.value || '');
          const value = formatted.value;
          const isLong = value.length > 32 || label.length > 18;
          const qualityClass = [formatted.quality === 'completed' ? 'unit-completed' : '', isLong ? 'is-long' : ''].filter(Boolean).join(' ');
          return (
            <div
              className={`tus-spot-compact-data-item ${qualityClass}`.trim()}
              key={`${displayTitle}-${label}-${index}`}
              title={`${label}: ${value}`}
            >
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TusSpotNarrativePanel({ question, hardMode = false, embedded = false }) {
  const contextLine = buildTusSpotContextLine(question);
  const paragraphs = buildTusSpotNarrativeStem(question);
  // V383: TUS spot soru görünümünde sağ taraftaki destek/veri paneli gösterilmez; tüm veri soru paragrafına entegre edilir.
  const supportDataGroups = [];
  const difficultyMeta = getDifficultyMeta(question.difficulty);
  const diagnostics = import.meta.env?.DEV ? getTusSpotPreviewDiagnostics(question) : null;

  return (
    <section
      className={`tus-spot-narrative-card ${embedded ? 'is-embedded' : 'card-surface'}`.trim()}
      id="tus-spot-narrative"
      aria-label="TUS spot soru metni"
    >
      <div className="tus-spot-narrative-simple-header" aria-label="Soru üst bilgisi">
        <div className="tus-spot-narrative-simple-title">
          <Icon name="ClipboardList" size={17} />
          <span>Klinik olgu</span>
        </div>
        <div className="tus-spot-narrative-simple-meta">
          <span>{question.relatedBranch || question.branchName || 'TUS'}</span>
          <span className="tus-spot-simple-dot" aria-hidden="true" />
          <span>{difficultyMeta.label} · {difficultyMeta.points} puan</span>
        </div>
      </div>

      <div className={`tus-spot-narrative-content-grid ${supportDataGroups.length ? 'has-support-data' : 'no-support-data'}`.trim()}>
        <div className="tus-spot-narrative-reading-panel">
          {paragraphs.map((paragraph, index) => (
            <p key={`${question.id}-tus-narrative-${index}`}>
              <GlossaryText text={paragraph} enabled={!hardMode} revealMode="preAnswer" maxTerms={3} />
            </p>
          ))}
        </div>

        {supportDataGroups.length ? (
          <aside className="tus-spot-support-data-panel" aria-label="Soruya ait destek veriler">
            {supportDataGroups.map((group) => (
              <CompactDataGroup key={group.title} title={group.title} items={group.items} />
            ))}
          </aside>
        ) : null}
      </div>

      {diagnostics ? (
        <div className="tus-spot-dev-diagnostics" aria-hidden="true">
          <span>paragraphs: {diagnostics.paragraphCount}</span>
          <span>words: {diagnostics.wordCount}</span>
          <span>support groups: {diagnostics.supportGroupCount}</span>
          <span>support items: {diagnostics.supportItemCount}</span>
          <span>legacy labels: {diagnostics.hasLegacyBoxLabels ? 'yes' : 'no'}</span>
          <span>correct in stem: {diagnostics.containsCorrectAnswerText ? 'yes' : 'no'}</span>
        </div>
      ) : null}
    </section>
  );
}

function TusSpotQuestionScreen({
  question,
  onGenerateQuestion,
  onSubmitAnswer,
  tutorMode,
  hardMode = false,
  randomActionLabel = 'Yeni TUS sorusu üret',
}) {
  const isAiGeneratedQuestion = question.sourceType === 'ai-generated-tus-question';
  const questionStem = buildTusSpotQuestionStem(question);

  return (
    <article className="case-player-shell tus-spot-player-shell">
      <section className="tus-spot-unified-panel card-surface" aria-label="TUS spot soru akışı">
        <TusSpotNarrativePanel question={question} hardMode={hardMode} embedded />

        <div className="tus-spot-answer-flow" role="region" aria-label="Yanıt seçenekleri ve geri bildirim">
          <DiagnosisQuiz
            clinicalCase={question}
            branch={TUS_SPOT_BRANCH}
            mode="study"
            onRandomCase={onGenerateQuestion}
            onSubmitAnswer={onSubmitAnswer}
            tutorMode={tutorMode}
            orderedInvestigationIds={[]}
            investigationOrders={[]}
            hardMode={hardMode}
            randomActionLabel={randomActionLabel}
            hideSpotQuestionCallout
            questionStemOverride={questionStem}
            questionHeadingOverride=""
            questionSubtextOverride=""
            hideQuestionScoreChip
            hideQuestionHeader
            hideInlineQuestionStemLabel
            hideQuestionStem={isAiGeneratedQuestion}
          />
        </div>
      </section>
    </article>
  );
}

export default TusSpotQuestionScreen;
