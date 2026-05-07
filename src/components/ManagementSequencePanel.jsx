import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Icon, IconBadge } from './ui.jsx';
import GlossaryText from './GlossaryTooltip.jsx';

function sentence(value = '') {
  const cleaned = String(value).replace(/[.;]+$/g, '').trim();
  return cleaned ? `${cleaned}.` : '';
}

function normalizeStep(step, index, fallbackRequired = true) {
  if (typeof step === 'string') {
    return {
      id: `step-${index + 1}`,
      label: sentence(step),
      correctOrder: fallbackRequired ? index + 1 : null,
      required: fallbackRequired,
      score: fallbackRequired ? 2 : -1,
      rationale: fallbackRequired
        ? 'Bu basamak olgunun güvenli yönetim akışında yer alır.'
        : 'Bu seçenek bu aşamada öncelikli değildir.',
    };
  }

  const required = step.required !== undefined ? Boolean(step.required) : fallbackRequired;
  return {
    id: step.id || `step-${index + 1}`,
    label: sentence(step.label || step.text || `Basamak ${index + 1}`),
    correctOrder: required ? (step.correctOrder || index + 1) : null,
    required,
    unsafe: Boolean(step.unsafe),
    early: Boolean(step.early),
    score: Number.isFinite(step.score) ? step.score : required ? 2 : step.unsafe ? -2 : -1,
    rationale: step.rationale || (required
      ? 'Bu basamak olgunun güvenli yönetim akışında yer alır.'
      : step.unsafe
        ? 'Bu seçenek klinik güvenlik açısından uygun değildir.'
        : 'Bu seçenek bu aşamada öncelikli değildir.'),
  };
}

function deterministicShuffle(items = [], seed = '') {
  const source = [...items];
  let state = Array.from(String(seed)).reduce((total, char) => total + char.charCodeAt(0), 17) || 17;
  for (let i = source.length - 1; i > 0; i -= 1) {
    state = (state * 9301 + 49297) % 233280;
    const j = state % (i + 1);
    [source[i], source[j]] = [source[j], source[i]];
  }
  if (source.every((step, index) => step.id === items[index]?.id) && source.length > 1) {
    [source[0], source[1]] = [source[1], source[0]];
  }
  return source;
}

function textPool(clinicalCase = {}) {
  return `${clinicalCase.title || ''} ${clinicalCase.clinicalFocus || ''} ${clinicalCase.chiefComplaint || ''} ${clinicalCase.stem || ''} ${clinicalCase.diagnosis?.correct || ''}`.toLocaleLowerCase('tr');
}

const sequenceTemplates = {
  stroke: {
    required: [
      ['abc-glucose', 'Havayolu-dolaşım güvenliğini, glukozu ve hızlı düzeltilebilir inme taklitçilerini değerlendir', 'Acil nörolojik defisitte önce yaşamı tehdit eden durumlar ve hızlı düzeltilebilir taklitçiler değerlendirilir.'],
      ['last-known-well', 'Son sağlıklı görülme zamanını netleştir', 'Reperfüzyon kararında zaman penceresi temel belirleyicidir.'],
      ['noncontrast-ct', 'Kontrastsız beyin BT ile kanamayı dışla', 'Kanama dışlanmadan reperfüzyon tedavisi güvenli biçimde planlanamaz.'],
      ['vascular-imaging', 'Damar görüntüleme ile büyük damar oklüzyonunu değerlendir', 'Büyük damar oklüzyonu mekanik trombektomi kararını etkiler.'],
      ['reperfusion-eligibility', 'Kontrendikasyon ve zaman penceresine göre reperfüzyon uygunluğunu belirle', 'Tedavi seçimi klinik zamanlama ve güvenlik koşullarına göre verilir.'],
      ['start-reperfusion', 'Uygunsa IV tromboliz ve/veya mekanik trombektomi algoritmasını başlat', 'Uygun hastada gecikme fonksiyonel sonucu kötüleştirebilir.'],
      ['monitor-secondary', 'Monitorizasyon ve sekonder önleme planını oluştur', 'Akut tedavi sonrası komplikasyon izlemi ve tekrar riskini azaltma planlanır.'],
    ],
    distractors: [
      ['wrong-anticoag-before-imaging', 'Kanama dışlanmadan antikoagülasyonu hemen başla', 'Kanama dışlanmadan antikoagülasyon güvenli değildir.', true],
      ['wrong-thrombolysis-before-ct', 'Beyin görüntülemesi olmadan trombolitik tedavi ver', 'Tromboliz öncesi kanama dışlanmalıdır.', true],
      ['early-lp', 'Tüm hastalarda önce lomber ponksiyon yap', 'Lomber ponksiyon akut iskemik inme yönetiminde rutin ilk basamak değildir.', false],
      ['wrong-neuro-only', 'Yalnız nörolojik muayeneye göre reperfüzyon kararı ver', 'Reperfüzyon kararı görüntüleme ve zaman bilgisiyle birlikte verilmelidir.', true],
    ],
  },
  stemi: {
    required: [
      ['monitor', 'Hemodinamik durum ve ritim monitorizasyonunu başlat', 'Akut koroner sendromda ritim ve dolaşım güvenliği erken değerlendirilir.'],
      ['ecg', '12 derivasyon EKG’yi hızla değerlendir', 'ST elevasyonu görüldüğünde reperfüzyon kararı EKG üzerinden verilir.'],
      ['antithrombotic', 'Antitrombotik tedavi ve analjezi/oksijen gereksinimini değerlendir', 'Başlangıç tedavisi semptom, oksijenizasyon ve kanama riskiyle birlikte planlanır.'],
      ['pci-strategy', 'Primer PCI uygunluğunu ve reperfüzyon stratejisini belirle', 'STEMI’de hedef mümkün olan en hızlı koroner reperfüzyondur.'],
      ['fibrinolysis-if-delay', 'PCI gecikecekse fibrinoliz uygunluğunu değerlendir', 'Merkez gecikmesi varsa fibrinoliz seçeneği kontrendikasyonlarla birlikte değerlendirilir.'],
      ['complication-monitor', 'Komplikasyon ve ritim takibini sürdür', 'Aritmi, kalp yetmezliği ve hemodinamik bozulma erken yakalanmalıdır.'],
      ['secondary-prevention', 'Sekonder korunma ve yatış planını oluştur', 'Akut tedavi sonrası uzun dönem risk azaltma planlanır.'],
    ],
    distractors: [
      ['wait-troponin', 'Troponin sonucunu beklemeden hiçbir işlem yapma', 'ST elevasyonu varlığında reperfüzyon kararı troponin beklenerek geciktirilmez.', true],
      ['stress-test', 'EKG yerine önce elektif efor testi iste', 'Akut göğüs ağrısı ve ST değişikliğinde efor testi uygun ilk yaklaşım değildir.', true],
      ['discharge', 'Stabilizasyon olmadan taburculuk planla', 'Akut koroner sendrom şüphesinde güvenli taburculuk için seri değerlendirme gerekir.', true],
      ['symptom-only', 'Reperfüzyon kararını yalnızca ağrı şiddetine göre ver', 'Reperfüzyon kararı klinik, EKG ve zaman penceresiyle birlikte verilir.', false],
    ],
  },
  sepsis: {
    required: [
      ['abc-sepsis', 'Hipotansiyon, bilinç değişikliği, laktat yüksekliği ve organ perfüzyonunu acil risk açısından değerlendir', 'Enfeksiyon şüphesinde önce stabilite ve organ perfüzyonu değerlendirilir.'],
      ['oxygen-iv-fluid', 'Oksijen ihtiyacı, damar yolu ve kristalloid sıvı yanıtını erken planla', 'Destek tedavisi klinik bozulmayı önlemek için erken planlanır.'],
      ['cultures-labs', 'Antibiyotiği geciktirmeden önce kan kültürü ve odağa yönelik örnekleri al', 'Mikrobiyolojik örnekler tedaviyi geciktirmeden, mümkünse antibiyotik öncesi alınır.'],
      ['empiric-antibiotic', 'Olası odağı kapsayan ampirik antibiyotiği ilk saat içinde başla', 'Sepsis veya ağır enfeksiyonda antibiyotik gecikmesi kötü sonuçla ilişkilidir.'],
      ['source-evaluation', 'Görüntüleme ve laboratuvar sonuçlarıyla enfeksiyon odağını değerlendir', 'Odak belirlenmesi antibiyotik seçimini ve kaynak kontrolü gereksinimini belirler.'],
      ['deescalate', 'Kültür/duyarlılık sonuçlarına göre tedaviyi daralt veya değiştir', 'Gereksiz geniş spektrum baskısını azaltmak için tedavi yeniden düzenlenir.'],
      ['monitor-response', 'Ateş, hemodinami, laktat ve organ fonksiyonlarıyla yanıtı izle', 'Tedavi başarısı vital bulgular, laboratuvar ve organ fonksiyonuyla takip edilir.'],
    ],
    distractors: [
      ['wait-culture', 'Kültür sonucu çıkana kadar antibiyotiği tamamen beklet', 'Ağır enfeksiyon veya sepsis şüphesinde antibiyotik geciktirilmemelidir.', true],
      ['outpatient-unstable', 'Stabil olmayan hastada yalnızca ayaktan takip öner', 'Stabil olmayan hastada yakın izlem ve destek tedavisi gerekir.', true],
      ['stop-antibiotic', 'Klinik değerlendirme olmadan antibiyotiği kes', 'Tedavi değişikliği klinik yanıt ve mikrobiyoloji verileriyle yapılmalıdır.', true],
      ['ignore-source', 'Kaynak kontrolü gereksinimini değerlendirme dışı bırak', 'Bazı enfeksiyonlarda kaynak kontrolü tedavinin ana parçasıdır.', false],
    ],
  },
  giBleed: {
    required: [
      ['stabilize-circulation', 'Havayolu, dolaşım ve hemodinamik stabiliteyi değerlendir', 'Aktif kanama şüphesinde önce yaşamı tehdit eden durumlar değerlendirilir.'],
      ['iv-access', 'Geniş damar yolu aç ve sıvı/kan ürünü gereksinimini belirle', 'Resüsitasyon ve transfüzyon hazırlığı erken yapılmalıdır.'],
      ['labs-crossmatch', 'Hemogram, koagülasyon ve kan grubu/cross-match tetkiklerini al', 'Kanama şiddeti ve tedavi güvenliği için temel veriler gerekir.'],
      ['targeted-medication', 'Kanama kaynağına göre proton pompası inhibitörü veya vasoaktif tedaviyi başla', 'Tedavi kanamanın olası kaynağına göre erken planlanır.'],
      ['endoscopy', 'Stabilizasyon sonrası üst gastrointestinal endoskopi planla', 'Endoskopi tanı ve tedavi açısından ana yöntemdir.'],
      ['definitive-hemostasis', 'Endoskopik hemostaz veya ileri girişim gereksinimini değerlendir', 'Devam eden kanamada kaynak kontrolü gerekir.'],
      ['monitor-rebleed', 'Yeniden kanama, hemoglobin ve hemodinami takibini sürdür', 'Tedavi sonrası yakın izlem yeniden kanamayı yakalamak için gereklidir.'],
    ],
    distractors: [
      ['discharge-bleed', 'Aktif kanama bulguları varken taburculuk planla', 'Aktif veya ciddi kanama şüphesinde güvenli taburculuk uygun değildir.', true],
      ['endoscopy-before-stabilize', 'Stabilizasyonu değerlendirmeden acil endoskopiye gönder', 'İşlem öncesi hemodinamik güvenlik değerlendirilmelidir.', true],
      ['ignore-coag', 'Koagülasyon durumunu değerlendirme dışı bırak', 'Kanama yönetiminde koagülasyon tedavi güvenliğini etkiler.', false],
      ['oral-only', 'Şok bulgusu olan hastada yalnız oral hidrasyon öner', 'Hemodinamik bozulmada damar içi destek gerekir.', true],
    ],
  },
  default: {
    required: [
      ['stability', 'Solunum, dolaşım, bilinç ve ağrı düzeyine göre aciliyet önceliğini belirle', 'Güvenli klinik yönetim stabilite değerlendirmesiyle başlar.'],
      ['focused-history', 'Öykü ve fizik muayenedeki ayırt edici bulguları netleştir', 'Yönetim kararı klinik örüntünün doğru tanımlanmasına dayanır.'],
      ['initial-tests', 'Tanı veya tedavi kararını değiştiren hedef tetkikleri seç', 'Tanısal karar ve tedavi güvenliği için temel veriler gerekir.'],
      ['targeted-treatment', 'Tanıyı destekleyen bulgulara göre ilk tedavi veya girişimi başlat', 'Tedavi, tanısal olasılık ve hasta güvenliğiyle birlikte belirlenir.'],
      ['monitor', 'Ateş, hemodinami, laktat ve organ fonksiyonlarıyla yanıtı izle', 'İlk yaklaşım sonrası hasta yanıtı yeniden değerlendirilmelidir.'],
    ],
    distractors: [
      ['ignore-stability', 'Stabilite değerlendirmesi yapmadan taburculuk planla', 'Stabilite değerlendirilmeden güvenli taburculuk kararı verilmez.', true],
      ['random-treatment', 'Tanısal veri olmadan rastgele tedavi başla', 'Tedavi klinik olasılık ve güvenlik verileriyle birlikte planlanmalıdır.', true],
      ['delay-all', 'Tüm tedaviyi ileri randevuya kadar ertele', 'Acil veya progresif tabloda gecikme hasta güvenliğini bozabilir.', false],
      ['over-investigate', 'Endikasyon olmadan ileri invaziv tetkik planla', 'İleri tetkikler klinik endikasyonla basamaklandırılmalıdır.', false],
    ],
  },
};

function chooseTemplate(clinicalCase) {
  const pool = textPool(clinicalCase);
  if (/inme|afazi|hemiparezi|mca|tromboliz|trombektomi|fokal/.test(pool)) return sequenceTemplates.stroke;
  if (/stemi|st elevasyon|miyokart|koroner|göğüs ağrısı|retrosternal/.test(pool)) return sequenceTemplates.stemi;
  if (/sepsis|pnömoni|ateş|enfeksiyon|kültür|septik/.test(pool)) return sequenceTemplates.sepsis;
  if (/hematemez|melena|gastrointestinal kanama|varis|siroz|endoskopi/.test(pool)) return sequenceTemplates.giBleed;
  return sequenceTemplates.default;
}

function templateToSteps(template) {
  const required = template.required.map(([id, label, rationale], index) => normalizeStep({
    id,
    label,
    rationale,
    required: true,
    correctOrder: index + 1,
    score: index < 3 ? 2 : 1,
  }, index, true));

  const distractors = template.distractors.map(([id, label, rationale, unsafe], index) => normalizeStep({
    id,
    label,
    rationale,
    required: false,
    unsafe,
    score: unsafe ? -2 : -1,
  }, index, false));

  return [...required, ...distractors];
}

export function buildManagementSequence(clinicalCase = {}) {
  const explicit = clinicalCase.managementSequence;
  if (explicit?.enabled === false) return null;

  if (Array.isArray(explicit?.steps)) {
    if (explicit.steps.length === 0) return null;
    const steps = explicit.steps.map((step, index) => normalizeStep(step, index, step.required !== false));
    return {
      title: explicit.title || 'Yönetim sırası',
      instruction: explicit.instruction || 'Klinik önceliğe göre gerekli basamakları seç ve doğru sıraya yerleştir.',
      minRequiredSteps: explicit.minRequiredSteps || steps.filter((step) => step.required).length,
      steps,
    };
  }

  const template = chooseTemplate(clinicalCase);
  const steps = templateToSteps(template);

  return {
    title: 'Yönetim sırası',
    instruction: 'Klinik önceliğe göre gerekli basamakları seç ve doğru sıraya yerleştir.',
    minRequiredSteps: steps.filter((step) => step.required).length,
    steps,
  };
}

function MoveButton({ direction, disabled, onClick }) {
  return (
    <button
      type="button"
      className="sequence-move-btn"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'up' ? 'Basamağı yukarı taşı' : 'Basamağı aşağı taşı'}
    >
      <Icon name={direction === 'up' ? 'ChevronUp' : 'ChevronDown'} size={15} />
    </button>
  );
}

function StepStatePill({ step, submitted, inPlan, index, correctById }) {
  if (!submitted) return null;
  if (!step.required && inPlan) return <span className={step.unsafe ? 'step-state-pill unsafe' : 'step-state-pill review'}>{step.unsafe ? 'Uygun değil' : 'Öncelikli değil'}</span>;
  if (!step.required && !inPlan) return <span className="step-state-pill correct">Dışarıda bırakıldı</span>;
  if (step.required && !inPlan) return <span className="step-state-pill missing">Eksik</span>;
  const isCorrect = step.required && correctById.get(step.id) === index + 1;
  return <span className={isCorrect ? 'step-state-pill correct' : 'step-state-pill review'}>{isCorrect ? 'Doğru konum' : 'Sıra gözden geçir'}</span>;
}

function ManagementStepCard({
  step,
  index,
  inPlan = false,
  submitted = false,
  correctById,
  onAdd,
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  hardMode = false,
  mode = 'study',
}) {
  const correctOrder = correctById.get(step.id);
  const isWrongSelection = submitted && !step.required && inPlan;
  const isMissing = submitted && step.required && !inPlan;
  const isCorrectSpot = submitted && inPlan && step.required && correctOrder === index + 1;
  const stateClass = submitted
    ? isWrongSelection
      ? step.unsafe ? 'unsafe' : 'not-needed'
      : isMissing
        ? 'missing'
        : isCorrectSpot
          ? 'correct'
          : inPlan
            ? 'needs-review'
            : ''
    : '';

  return (
    <article className={`management-step-card advanced-step-card v38-step-card ${inPlan ? 'in-plan' : 'available'} ${stateClass}`.trim()}>
      <div className="management-step-index">{inPlan ? index + 1 : <Icon name="ClipboardList" size={15} />}</div>
      <div className="management-step-copy">
        <p><GlossaryText text={step.label} enabled={mode !== 'exam' && !hardMode} /></p>
        {submitted ? <small><GlossaryText text={step.rationale} enabled={mode !== 'exam' && !hardMode} /></small> : null}
      </div>
      <div className="management-step-actions">
        <StepStatePill step={step} submitted={submitted} inPlan={inPlan} index={index} correctById={correctById} />
        {!submitted && inPlan ? (
          <>
            <MoveButton direction="up" disabled={!canMoveUp} onClick={onMoveUp} />
            <MoveButton direction="down" disabled={!canMoveDown} onClick={onMoveDown} />
            <button type="button" className="sequence-remove-btn" onClick={onRemove}>Çıkar</button>
          </>
        ) : null}
        {!submitted && !inPlan ? (
          <button type="button" className="sequence-add-btn" onClick={onAdd}>Plana ekle</button>
        ) : null}
        {submitted && inPlan && step.required ? <span className="management-correct-position">Doğru sıra: {correctOrder}</span> : null}
      </div>
    </article>
  );
}

function scorePlan(plan = [], sequence = null) {
  if (!sequence) return { score: 0, max: 0, correctRequired: 0, selectedUnnecessary: 0, missingRequired: 0 };
  const required = sequence.steps.filter((step) => step.required).sort((a, b) => a.correctOrder - b.correctOrder);
  const selectedIds = new Set(plan.map((step) => step.id));
  const correctById = new Map(required.map((step) => [step.id, step.correctOrder]));

  let score = 0;
  let correctRequired = 0;
  let selectedUnnecessary = 0;

  plan.forEach((step, index) => {
    if (step.required) {
      score += 1;
      if (correctById.get(step.id) === index + 1) {
        score += step.score || 1;
        correctRequired += 1;
      }
    } else {
      selectedUnnecessary += 1;
      score += step.score || -1;
    }
  });

  const missingRequired = required.filter((step) => !selectedIds.has(step.id)).length;
  score -= missingRequired;

  const max = required.reduce((total, step) => total + 1 + (step.score || 1), 0);
  return { score: Math.max(score, 0), max, correctRequired, selectedUnnecessary, missingRequired };
}

function ManagementSequencePanel({ clinicalCase, mode = 'study', hardMode = false }) {
  const sequence = useMemo(() => buildManagementSequence(clinicalCase), [clinicalCase]);
  const [availableSteps, setAvailableSteps] = useState([]);
  const [planSteps, setPlanSteps] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sequence) return;
    setAvailableSteps(deterministicShuffle(sequence.steps, `${clinicalCase.id}-management-options`));
    setPlanSteps([]);
    setSubmitted(false);
  }, [clinicalCase.id, sequence]);

  const requiredSteps = useMemo(() => sequence ? sequence.steps.filter((step) => step.required).sort((a, b) => a.correctOrder - b.correctOrder) : [], [sequence]);
  const correctById = useMemo(() => new Map(requiredSteps.map((step) => [step.id, step.correctOrder])), [requiredSteps]);
  const selectedIds = useMemo(() => new Set(planSteps.map((step) => step.id)), [planSteps]);
  const poolSteps = useMemo(() => availableSteps.filter((step) => !selectedIds.has(step.id)), [availableSteps, selectedIds]);
  const planScore = useMemo(() => sequence ? scorePlan(planSteps, sequence) : { score: 0, max: 0, correctRequired: 0, selectedUnnecessary: 0, missingRequired: 0 }, [planSteps, sequence]);

  const addStep = useCallback((step) => {
    if (submitted) return;
    setPlanSteps((current) => current.some((item) => item.id === step.id) ? current : [...current, step]);
  }, [submitted]);

  const removeStep = useCallback((stepId) => {
    if (submitted) return;
    setPlanSteps((current) => current.filter((step) => step.id !== stepId));
  }, [submitted]);

  const moveStep = useCallback((index, direction) => {
    setPlanSteps((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    if (!sequence) return;
    setAvailableSteps(deterministicShuffle(sequence.steps, `${clinicalCase.id}-management-options-reset`));
    setPlanSteps([]);
    setSubmitted(false);
  }, [clinicalCase.id, sequence]);

  if (!sequence) return null;

  return (
    <section className="card-surface management-sequence-panel advanced-management-panel v38-management-panel" aria-label="Yönetim sırası">
      <header className="management-sequence-head advanced-management-head">
        <div className="management-sequence-title">
          <IconBadge icon="ClipboardList" tone="teal" size="sm" />
          <div>
            <h2>{sequence.title}</h2>
            <p>{sequence.instruction}</p>
          </div>
        </div>
        {submitted ? <span className="management-score-chip">{planScore.score}/{planScore.max} puan</span> : <span className="management-score-chip muted">{planSteps.length} basamak seçildi</span>}
      </header>

      <div className="management-workspace-grid">
        <section className="management-option-zone v38-management-zone" aria-label="Kullanılabilir basamaklar">
          <div className="management-zone-head">
            <span>Yönetim sırası</span>
            <small>Basamak seçenekleri</small>
          </div>
          <div className="management-step-list available-step-list">
            {poolSteps.map((step) => (
              <ManagementStepCard
                key={step.id}
                step={step}
                correctById={correctById}
                onAdd={() => addStep(step)}
                submitted={submitted}
                mode={mode}
                hardMode={hardMode}
              />
            ))}
          </div>
        </section>

        <section className="management-plan-zone v38-management-zone" aria-label="Yönetim planı">
          <div className="management-zone-head">
            <span>Yönetim planı</span>
            <small>Seçtiklerini klinik sıraya yerleştir</small>
          </div>
          {planSteps.length ? (
            <div className="management-step-list plan-step-list">
              {planSteps.map((step, index) => (
                <ManagementStepCard
                  key={step.id}
                  step={step}
                  index={index}
                  inPlan
                  submitted={submitted}
                  correctById={correctById}
                  canMoveUp={index > 0}
                  canMoveDown={index < planSteps.length - 1}
                  onMoveUp={() => moveStep(index, -1)}
                  onMoveDown={() => moveStep(index, 1)}
                  onRemove={() => removeStep(step.id)}
                  mode={mode}
                  hardMode={hardMode}
                />
              ))}
            </div>
          ) : (
            <div className="management-empty-plan">
              <IconBadge icon="Target" tone="slate" size="sm" />
              <div>
                <strong>Henüz basamak seçilmedi</strong>
                <p>Klinik olarak gerekli gördüğün seçenekleri plana ekle.</p>
              </div>
            </div>
          )}
        </section>
      </div>

      {submitted ? (
        <section className="management-feedback-panel" aria-label="Yönetim sırası geri bildirimi">
          <div className="management-feedback-summary">
            <strong>{planScore.correctRequired}/{requiredSteps.length} gerekli basamak doğru konumda</strong>
            <p>
              {planScore.missingRequired
                ? `${planScore.missingRequired} gerekli basamak plana eklenmemiş. Klinik akışta eksik kalan adımları doğru sıraya yerleştirerek tekrar dene.`
                : planScore.selectedUnnecessary
                  ? `${planScore.selectedUnnecessary} seçenek bu aşamada öncelikli değildi. Gerekli basamakları koruyup planı sadeleştir.`
                  : 'Yönetim akışı gerekli basamakları güvenli bir sırayla içeriyor.'}
            </p>
          </div>
          <ol className="management-correct-sequence">
            {requiredSteps.map((step) => (
              <li key={step.id}>
                <span>{step.correctOrder}</span>
                <div>
                  <strong><GlossaryText text={step.label} enabled={mode !== 'exam' && !hardMode} /></strong>
                  <p><GlossaryText text={step.rationale} enabled={mode !== 'exam' && !hardMode} /></p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <div className="management-actions-row">
        {!submitted ? (
          <button type="button" className="btn btn-primary management-check-button" onClick={() => setSubmitted(true)} disabled={!planSteps.length}>
            Sıralamayı kontrol et
          </button>
        ) : (
          <button type="button" className="btn btn-secondary" onClick={reset}>
            Yeniden dene
          </button>
        )}
      </div>
    </section>
  );
}

export default memo(ManagementSequencePanel);
