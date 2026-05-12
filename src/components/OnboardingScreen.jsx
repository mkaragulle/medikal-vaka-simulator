import { useMemo, useState } from 'react';
import { Icon, BrandMark, ThemeToggle } from './ui.jsx';
import { DEFAULT_UNIVERSITIES, EDUCATION_STATUS_OPTIONS, STUDY_GOAL_OPTIONS, resolvePreferredStudyMode } from '../data/learningPlatform.js';

function splitName(name = '') {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { firstName: '', lastName: '' };
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

function OnboardingScreen({ currentUser, theme, onToggleTheme, onComplete, onLogout }) {
  const nameParts = useMemo(() => splitName(currentUser?.name), [currentUser?.name]);
  const [form, setForm] = useState({
    firstName: nameParts.firstName,
    lastName: nameParts.lastName,
    educationStatus: 'year-3',
    university: '',
    manualUniversity: '',
    primaryGoal: 'committee',
    defaultLanguage: 'tr',
  });
  const [error, setError] = useState('');

  const selectedEducation = EDUCATION_STATUS_OPTIONS.find((item) => item.value === form.educationStatus);
  const resolvedUniversity = form.university === 'Diğer / manuel giriş' ? form.manualUniversity : form.university;

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const university = resolvedUniversity.trim();

    if (!firstName || !lastName) {
      setError('Ad ve soyad alanlarını doldurmalısın.');
      return;
    }
    if (!university) {
      setError('Üniversite alanını seçmeli veya manuel yazmalısın.');
      return;
    }

    const profile = {
      id: currentUser?.id,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      educationStatus: form.educationStatus,
      educationStatusLabel: selectedEducation?.label || '',
      classYear: selectedEducation?.classYear || null,
      university,
      primaryGoal: form.primaryGoal,
      primaryGoalLabel: STUDY_GOAL_OPTIONS.find((item) => item.value === form.primaryGoal)?.label || '',
      defaultLanguage: form.defaultLanguage,
      preferredStudyMode: resolvePreferredStudyMode({ ...form, classYear: selectedEducation?.classYear || null }),
      onboardedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onComplete(profile);
  };

  return (
    <main className="app-shell premium-shell" data-theme={theme}>
      <section className="onboarding-shell">
        <div className="onboarding-topbar">
          <button className="nav-brand nav-brand-icon-only" type="button" aria-label="KlinikIQ">
            <span className="nav-brand-mark nav-brand-mark-pulse" aria-hidden="true"><BrandMark title="" /></span>
          </button>
          <div className="onboarding-topbar-actions">
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} variant="navIcon" />
            <button type="button" className="btn btn-secondary" onClick={onLogout}>Çıkış</button>
          </div>
        </div>

        <section className="onboarding-card card-surface">
          <div className="onboarding-copy">
            <span className="home-hero-eyebrow-v10"><Icon name="Sparkles" /> Kişisel öğrenme alanını kur</span>
            <h1>KlinikIQ artık tıp fakültesi + TUS çalışma merkezine dönüşüyor.</h1>
            <p>İlk girişte birkaç bilgi alıyoruz; böylece dashboard, PDF analizi, soru seviyesi, kart tipi ve tekrar önerileri sana göre şekillenir.</p>
          </div>

          <form className="onboarding-form" onSubmit={handleSubmit}>
            <div className="onboarding-grid two">
              <label className="form-field">
                <span>Ad</span>
                <input value={form.firstName} onChange={(event) => updateField('firstName', event.target.value)} placeholder="Mustafa" />
              </label>
              <label className="form-field">
                <span>Soyad</span>
                <input value={form.lastName} onChange={(event) => updateField('lastName', event.target.value)} placeholder="Akyol" />
              </label>
            </div>

            <label className="form-field">
              <span>Eğitim durumu</span>
              <select value={form.educationStatus} onChange={(event) => updateField('educationStatus', event.target.value)}>
                {EDUCATION_STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>

            <div className="onboarding-grid two">
              <label className="form-field">
                <span>Üniversite</span>
                <select value={form.university} onChange={(event) => updateField('university', event.target.value)}>
                  <option value="">Üniversite seç</option>
                  {DEFAULT_UNIVERSITIES.map((university) => <option key={university} value={university}>{university}</option>)}
                </select>
              </label>
              {form.university === 'Diğer / manuel giriş' ? (
                <label className="form-field">
                  <span>Manuel üniversite</span>
                  <input value={form.manualUniversity} onChange={(event) => updateField('manualUniversity', event.target.value)} placeholder="Üniversite adını yaz" />
                </label>
              ) : (
                <label className="form-field">
                  <span>Varsayılan dil</span>
                  <select value={form.defaultLanguage} onChange={(event) => updateField('defaultLanguage', event.target.value)}>
                    <option value="tr">Türkçe</option>
                    <option value="en">English later</option>
                  </select>
                </label>
              )}
            </div>

            <label className="form-field">
              <span>Birincil çalışma hedefi</span>
              <select value={form.primaryGoal} onChange={(event) => updateField('primaryGoal', event.target.value)}>
                {STUDY_GOAL_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>

            <div className="onboarding-preview">
              <Icon name="Target" />
              <div>
                <strong>Önerilen başlangıç modu: {resolvePreferredStudyMode({ ...form, classYear: selectedEducation?.classYear || null }) === 'tus' ? 'TUS hazırlığı' : resolvePreferredStudyMode({ ...form, classYear: selectedEducation?.classYear || null }) === 'clinical-rotation' ? 'Klinik staj' : 'Tıp fakültesi / komite'}</strong>
                <p>Bu tercih daha sonra değiştirilebilir; yüklenen her materyal için çalışma amacı ayrıca sorulur.</p>
              </div>
            </div>

            {error ? <p className="form-error">{error}</p> : null}
            <button type="submit" className="btn btn-primary onboarding-submit">
              <Icon name="ArrowRight" />
              <span>Dashboard’u kişiselleştir</span>
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}

export default OnboardingScreen;
