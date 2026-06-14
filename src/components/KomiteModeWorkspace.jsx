import { useMemo, useRef, useState } from 'react';
import { Icon } from './ui.jsx';
import { localBackend } from '../services/localBackend.js';

const KOMITE_MATERIALS_STORAGE_KEY = 'komite-materials-v1';
const CLASS_YEARS = ['1', '2', '3', '4', '5', '6'];
const LEARNING_TARGETS = ['Komite sınavı', 'Final sınavı', 'Klinik staj', 'Genel tekrar'];

function createId(prefix = 'item') {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function readMaterials() {
  const stored = localBackend.read(KOMITE_MATERIALS_STORAGE_KEY, []);
  return Array.isArray(stored) ? stored : [];
}

function writeMaterials(materials) {
  localBackend.writeDeferred(KOMITE_MATERIALS_STORAGE_KEY, materials);
}

function formatFileSize(size = 0) {
  const bytes = Number(size || 0);
  if (!Number.isFinite(bytes) || bytes <= 0) return 'Boyut bilinmiyor';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function KomiteFormSelect({ label, value, options = [], onChange }) {
  return (
    <label className="komite-field-card">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function EmptyState({ title, text, icon = 'FileText' }) {
  return (
    <section className="komite-empty-state card-surface">
      <span className="komite-empty-icon"><Icon name={icon} /></span>
      <h3>{title}</h3>
      <p>{text}</p>
    </section>
  );
}

function MaterialCard({ material, active, onSelect, onRemove }) {
  return (
    <article className={`komite-material-card card-surface ${active ? 'active' : ''}`.trim()}>
      <button type="button" className="komite-material-card-main" onClick={() => onSelect(material.id)}>
        <span className="komite-material-icon"><Icon name="FileText" /></span>
        <span>
          <strong>{material.title}</strong>
          <em>{material.course || 'Ders belirtilmedi'} · {material.committee || 'Komite belirtilmedi'}</em>
          <small>{material.files?.length || 0} dosya · {material.learningTarget}</small>
        </span>
      </button>
      <button type="button" className="btn btn-ghost" onClick={() => onRemove(material.id)} aria-label="Materyali sil">
        <Icon name="Trash2" />
      </button>
    </article>
  );
}

function MaterialWorkspace({ material }) {
  if (!material) {
    return <EmptyState title="Henüz materyal seçilmedi" text="Sol taraftan bir materyal seçebilir veya yeni ders materyali ekleyebilirsin." icon="FolderOpen" />;
  }

  return (
    <section className="komite-workspace-panel card-surface">
      <header className="komite-workspace-header">
        <span className="komite-kicker"><Icon name="BookOpen" /> Materyal çalışma alanı</span>
        <h2>{material.title}</h2>
        <p>{material.course || 'Ders adı belirtilmedi'} · {material.committee || 'Komite belirtilmedi'} · {material.learningTarget}</p>
      </header>

      <div className="komite-static-grid">
        <article className="komite-static-card">
          <Icon name="UploadCloud" />
          <strong>Yüklenen dosyalar</strong>
          {(material.files || []).length ? (
            <ul>
              {material.files.map((file) => (
                <li key={`${file.name}-${file.size}`}>{file.name} <span>{formatFileSize(file.size)}</span></li>
              ))}
            </ul>
          ) : <p>Bu materyale dosya eklenmedi.</p>}
        </article>

        <article className="komite-static-card">
          <Icon name="BookOpen" />
          <strong>Ders anlatımı</strong>
          <p>Bu bölüm şu anda aktif değil. Otomatik konu anlatımı oluşturma kodu kaldırıldı.</p>
        </article>

        <article className="komite-static-card">
          <Icon name="ClipboardList" />
          <strong>Öğretici sorular</strong>
          <p>Bu bölüm şu anda aktif değil. Otomatik soru oluşturma kodu kaldırıldı.</p>
        </article>

        <article className="komite-static-card">
          <Icon name="LayeredCards" />
          <strong>Hap kartlar</strong>
          <p>Elle girilmiş/statik kartlar korunabilir; dosyadan otomatik kart oluşturma kodu kaldırıldı.</p>
        </article>
      </div>
    </section>
  );
}

function KomiteModeWorkspace() {
  const fileInputRef = useRef(null);
  const [materials, setMaterials] = useState(() => readMaterials());
  const [selectedId, setSelectedId] = useState(() => readMaterials()[0]?.id || null);
  const [form, setForm] = useState({
    classYear: '3',
    committee: '',
    course: '',
    learningTarget: LEARNING_TARGETS[0],
  });

  const selectedMaterial = useMemo(
    () => materials.find((material) => material.id === selectedId) || materials[0] || null,
    [materials, selectedId],
  );

  const persistMaterials = (nextMaterials) => {
    setMaterials(nextMaterials);
    writeMaterials(nextMaterials);
  };

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    const nextMaterial = {
      id: createId('komite-material'),
      title: form.course || files[0]?.name || 'Yeni materyal',
      classYear: form.classYear,
      committee: form.committee,
      course: form.course,
      learningTarget: form.learningTarget,
      createdAt: Date.now(),
      files: files.map((file) => ({ name: file.name, type: file.type, size: file.size, lastModified: file.lastModified })),
    };
    const nextMaterials = [nextMaterial, ...materials];
    persistMaterials(nextMaterials);
    setSelectedId(nextMaterial.id);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeMaterial = (materialId) => {
    const nextMaterials = materials.filter((material) => material.id !== materialId);
    persistMaterials(nextMaterials);
    if (selectedId === materialId) setSelectedId(nextMaterials[0]?.id || null);
  };

  const stats = useMemo(() => ({
    materialCount: materials.length,
    fileCount: materials.reduce((sum, material) => sum + (material.files?.length || 0), 0),
    reviewCount: 0,
  }), [materials]);

  return (
    <section className="komite-mode-page page-shell">
      <section className="home-hero-v10-main tus-hero-main-redesign komite-hero card-surface">
        <div className="home-hero-copy-v10 tus-hero-copy-redesign">
          <span className="tus-hero-kicker"><Icon name="GraduationCap" /> KlinikIQ Komite</span>
          <h1 className="home-brand-title-v10 tus-hero-title-redesign">Komite <span>Çalışma Alanı</span></h1>
          <p>Ders materyallerini tek yerde topla; çalışma arşivi, tekrar merkezi ve statik kart akışını aynı panelden yönet.</p>
        </div>
        <div className="komite-hero-stat-grid">
          <article><strong>{stats.materialCount}</strong><span>Materyal</span></article>
          <article><strong>{stats.fileCount}</strong><span>Dosya</span></article>
          <article><strong>{stats.reviewCount}</strong><span>Tekrar kaydı</span></article>
        </div>
      </section>

      <section className="komite-action-grid">
        <article className="komite-action-card card-surface">
          <span><Icon name="UploadCloud" /></span>
          <h3>Ders Materyali Yükle</h3>
          <p>Dosyalar yalnızca materyal arşivine eklenir; otomatik içerik üretimi çalışmaz.</p>
          <button type="button" className="btn btn-primary" onClick={() => fileInputRef.current?.click()}>
            <Icon name="Plus" /> Materyal ekle
          </button>
        </article>
        <article className="komite-action-card card-surface">
          <span><Icon name="FolderOpen" /></span>
          <h3>Tüm Çalıştıklarım</h3>
          <p>Eklediğin materyaller ve statik çalışma kayıtları burada listelenir.</p>
        </article>
        <article className="komite-action-card card-surface">
          <span><Icon name="RotateCcw" /></span>
          <h3>Tekrar Merkezine Git</h3>
          <p>Tekrar merkezi arayüzü korunur; otomatik özet veya kart üretimi yapılmaz.</p>
        </article>
      </section>

      <section className="komite-form-grid card-surface">
        <KomiteFormSelect label="Sınıf" value={form.classYear} options={CLASS_YEARS} onChange={(classYear) => setForm((current) => ({ ...current, classYear }))} />
        <label className="komite-field-card">
          <span>Komite</span>
          <input value={form.committee} onChange={(event) => setForm((current) => ({ ...current, committee: event.target.value }))} placeholder="Örn. 4. Komite" />
        </label>
        <label className="komite-field-card">
          <span>Ders</span>
          <input value={form.course} onChange={(event) => setForm((current) => ({ ...current, course: event.target.value }))} placeholder="Örn. Patoloji" />
        </label>
        <KomiteFormSelect label="Hedef" value={form.learningTarget} options={LEARNING_TARGETS} onChange={(learningTarget) => setForm((current) => ({ ...current, learningTarget }))} />
        <input ref={fileInputRef} type="file" multiple hidden onChange={(event) => addFiles(event.target.files)} />
      </section>

      <section className="komite-layout-grid">
        <aside className="komite-material-list card-surface" aria-label="Komite materyalleri">
          <header>
            <span className="komite-kicker"><Icon name="FolderOpen" /> Materyaller</span>
            <strong>{materials.length} kayıt</strong>
          </header>
          {materials.length ? materials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              active={selectedMaterial?.id === material.id}
              onSelect={setSelectedId}
              onRemove={removeMaterial}
            />
          )) : <EmptyState title="Materyal yok" text="Dosya eklediğinde burada görünecek." icon="FolderOpen" />}
        </aside>
        <MaterialWorkspace material={selectedMaterial} />
      </section>
    </section>
  );
}

export default KomiteModeWorkspace;
