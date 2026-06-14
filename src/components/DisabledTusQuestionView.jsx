import { useMemo } from 'react';
import { Icon } from './ui.jsx';

const DIFFICULTY_OPTIONS = ['Kolay', 'Orta', 'Zor'];

function getBranchLabel(branchFilter = 'random', branchOptions = []) {
  if (!branchFilter || branchFilter === 'random') return 'Rastgele branş';
  const match = branchOptions.find((branch) => String(branch.id) === String(branchFilter));
  return match?.name || match?.shortName || String(branchFilter);
}

function StaticSelect({ label, value, options = [], onChange, disabled = false }) {
  return (
    <label className={`ai-compact-dropdown-shell ${disabled ? 'disabled' : ''}`.trim()}>
      <span className="ai-compact-dropdown-label">{label}</span>
      <select
        className="ai-compact-dropdown-trigger"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.value)}
        aria-label={label}
      >
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.id;
          const optionLabel = typeof option === 'string' ? option : (option.name || option.shortName || option.id);
          return <option key={optionValue} value={optionValue}>{optionLabel}</option>;
        })}
      </select>
    </label>
  );
}

function InactiveModuleNotice({ branchFilter, branchOptions, difficulty, onGenerateQuestion }) {
  const branchLabel = useMemo(() => getBranchLabel(branchFilter, branchOptions), [branchFilter, branchOptions]);

  return (
    <section className="ai-generation-state ai-generation-ready card-surface" aria-live="polite">
      <span className="ai-generation-orb" aria-hidden="true"><Icon name="Sparkles" /></span>
      <div>
        <h2>Bu modül şu anda aktif değil.</h2>
        <p>
          Seçili görünüm korunuyor: {branchLabel} · {difficulty}. Bu buton artık herhangi bir üretim,
          yerel üretim, kalite kontrol, onarım veya servis çağrısı başlatmaz.
        </p>
      </div>
      <button type="button" className="btn btn-primary ai-ready-cta" onClick={onGenerateQuestion}>
        <span className="ai-ready-cta-icon"><Icon name="Power" /></span>
        <span>Yeni TUS Sorusu Üret</span>
      </button>
    </section>
  );
}

export default function DisabledTusQuestionView({
  aiStats = {},
  branchFilter = 'random',
  branchOptions = [],
  difficulty = 'Orta',
  onChangeDifficulty,
  onChangeBranchFilter,
  onGenerateQuestion,
  onBackHome,
}) {
  const safeBranchOptions = useMemo(() => {
    const normalized = Array.isArray(branchOptions) && branchOptions.length
      ? branchOptions
      : [{ id: 'random', name: 'Rastgele branş', shortName: 'Rastgele' }];
    return normalized.some((branch) => branch.id === 'random')
      ? normalized
      : [{ id: 'random', name: 'Rastgele branş', shortName: 'Rastgele' }, ...normalized];
  }, [branchOptions]);

  return (
    <section className="ai-practice-page page-shell case-page-shell stable-case-page-shell">
      <div className="ai-practice-hero card-surface">
        <div className="ai-practice-hero-copy">
          <span className="eyebrow"><Icon name="Sparkles" /> TUS soru üretim alanı</span>
          <h1>Yeni TUS Sorusu Üret</h1>
          <p>
            Sayfa tasarımı, kontrol paneli ve çalışma akışı korunmuştur. Üretim motoru kaldırıldığı için
            bu ekrandan yeni içerik oluşturulmaz.
          </p>
          <div className="ai-practice-metrics" aria-label="Çalışma istatistikleri">
            <span><strong>{aiStats.attempts || 0}</strong><small>Deneme</small></span>
            <span><strong>{aiStats.correct || 0}</strong><small>Doğru</small></span>
            <span><strong>{aiStats.bestStreak || 0}</strong><small>En iyi seri</small></span>
          </div>
        </div>
        <div className="ai-practice-controls">
          <StaticSelect
            label="Branş"
            value={branchFilter}
            options={safeBranchOptions}
            onChange={onChangeBranchFilter}
          />
          <StaticSelect
            label="Zorluk"
            value={difficulty}
            options={DIFFICULTY_OPTIONS}
            onChange={onChangeDifficulty}
          />
          <button type="button" className="btn btn-primary ai-generate-cta ai-spot-generate-btn" onClick={onGenerateQuestion}>
            <Icon name="Sparkles" />
            <span>Yeni TUS Sorusu Üret</span>
          </button>
          <button type="button" className="btn btn-secondary" onClick={onBackHome}>
            <Icon name="Home" /> Dashboard’a dön
          </button>
        </div>
      </div>

      <InactiveModuleNotice
        branchFilter={branchFilter}
        branchOptions={safeBranchOptions}
        difficulty={difficulty}
        onGenerateQuestion={onGenerateQuestion}
      />
    </section>
  );
}
