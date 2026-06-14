import { useMemo, useState } from 'react';
import { branches } from '../data/branches.js';
import { Icon } from './ui.jsx';

const DIFFICULTIES = ['Kolay', 'Orta', 'Zor'];

function TusQuestionModuleInactive({ onBackHome }) {
  const visibleBranches = useMemo(
    () => branches.map((branch) => ({ id: branch.id, name: branch.name || branch.shortName || branch.id })),
    [],
  );
  const [branchId, setBranchId] = useState(visibleBranches[0]?.id || 'all');
  const [difficulty, setDifficulty] = useState('Orta');
  const [noticeVisible, setNoticeVisible] = useState(false);

  return (
    <section className="page-shell tus-question-module-shell">
      <section className="card-surface tus-question-module-hero" aria-label="Yeni TUS sorusu üret sayfası">
        <div className="tus-question-module-title-block">
          <span className="tus-hero-kicker"><Icon name="ClipboardList" /> TUS Pratiği</span>
          <h1>Yeni TUS Sorusu Üret</h1>
          <p>
            Bu ekran tasarım olarak korunmuştur. Üretim altyapısı projeden çıkarıldığı için butonlar yalnızca pasif durum gösterir.
          </p>
        </div>

        <div className="tus-question-module-controls" aria-label="Soru ayarları">
          <label className="komite-field-card">
            <span>Branş</span>
            <select value={branchId} onChange={(event) => setBranchId(event.target.value)}>
              {visibleBranches.map((branch) => (
                <option value={branch.id} key={branch.id}>{branch.name}</option>
              ))}
            </select>
          </label>

          <label className="komite-field-card">
            <span>Zorluk</span>
            <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
              {DIFFICULTIES.map((level) => <option value={level} key={level}>{level}</option>)}
            </select>
          </label>
        </div>

        <div className="tus-question-module-actions">
          <button type="button" className="btn btn-secondary" onClick={onBackHome}>
            <Icon name="Home" /> Dashboard’a dön
          </button>
          <button type="button" className="btn btn-primary" onClick={() => setNoticeVisible(true)}>
            <Icon name="Lock" /> Yeni TUS Sorusu Üret
          </button>
        </div>

        {noticeVisible ? (
          <div className="inline-status info" role="status">
            Bu modül şu anda aktif değil.
          </div>
        ) : null}
      </section>
    </section>
  );
}

export default TusQuestionModuleInactive;
