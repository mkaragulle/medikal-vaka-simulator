export const EDUCATION_STATUS_OPTIONS = [
  { value: 'year-1', label: '1. sınıf tıp öğrencisi', classYear: 1, modeHint: 'medical-school' },
  { value: 'year-2', label: '2. sınıf tıp öğrencisi', classYear: 2, modeHint: 'medical-school' },
  { value: 'year-3', label: '3. sınıf tıp öğrencisi', classYear: 3, modeHint: 'medical-school' },
  { value: 'year-4', label: '4. sınıf tıp öğrencisi', classYear: 4, modeHint: 'clinical-rotation' },
  { value: 'year-5', label: '5. sınıf tıp öğrencisi', classYear: 5, modeHint: 'clinical-rotation' },
  { value: 'year-6', label: '6. sınıf / intörn hekim', classYear: 6, modeHint: 'clinical-rotation' },
  { value: 'tus-candidate', label: 'TUS adayı', classYear: null, modeHint: 'tus' },
];

export const STUDY_GOAL_OPTIONS = [
  { value: 'committee', label: 'Komite sınavı' },
  { value: 'final', label: 'Final sınavı' },
  { value: 'clinical-rotation', label: 'Klinik staj' },
  { value: 'tus', label: 'TUS hazırlığı' },
  { value: 'general-review', label: 'Genel tekrar' },
];

export const STUDY_MODE_OPTIONS = [
  { value: 'medical-school', label: 'Tıp fakültesi / komite', description: 'Ders PDF/slaytlarından mekanizma odaklı ders, quiz ve kart üretir.' },
  { value: 'tus', label: 'TUS hazırlığı', description: 'Branş odaklı spot bilgi, güçlü çeldirici ve sınav tuzağı üretir.' },
  { value: 'clinical-rotation', label: 'Klinik staj', description: 'Tanı, ayırıcı tanı, tetkik ve yönetim sırasını öne çıkarır.' },
  { value: 'general-learning', label: 'Genel öğrenme', description: 'Temel kavramları yapılandırılmış ders notuna dönüştürür.' },
];

export const DEFAULT_UNIVERSITIES = [
  'Acıbadem Üniversitesi',
  'Ankara Üniversitesi',
  'Atatürk Üniversitesi',
  'Başkent Üniversitesi',
  'Bezmialem Vakıf Üniversitesi',
  'Cerrahpaşa Tıp Fakültesi',
  'Dokuz Eylül Üniversitesi',
  'Ege Üniversitesi',
  'Gazi Üniversitesi',
  'Hacettepe Üniversitesi',
  'İstanbul Medeniyet Üniversitesi',
  'İstanbul Üniversitesi',
  'Koç Üniversitesi',
  'Marmara Üniversitesi',
  'Ondokuz Mayıs Üniversitesi',
  'Sağlık Bilimleri Üniversitesi',
  'Selçuk Üniversitesi',
  'Yeditepe Üniversitesi',
  'Diğer / manuel giriş',
];

export const COMMITTEE_COURSE_OPTIONS = [
  'Nöroloji',
  'Gastrointestinal Sistem',
  'Kardiyovasküler Sistem',
  'Solunum Sistemi',
  'Renal Sistem',
  'Endokrin Sistem',
  'Hematoloji',
  'Enfeksiyon / İmmünoloji',
  'Kas-İskelet Sistemi',
  'Üreme Sistemi',
  'Temel Bilimler',
  'Histoloji / Embriyoloji',
  'Fizyoloji',
  'Biyokimya',
  'Patoloji',
  'Farmakoloji',
  'Mikrobiyoloji',
  'Diğer / özel ders',
];

export const TUS_BRANCH_OPTIONS = [
  'Anatomi',
  'Fizyoloji',
  'Biyokimya',
  'Mikrobiyoloji',
  'Patoloji',
  'Farmakoloji',
  'Dahiliye',
  'Pediatri',
  'Genel Cerrahi',
  'Kadın Hastalıkları ve Doğum',
  'Halk Sağlığı',
  'Adli Tıp',
  'Psikiyatri',
  'Nöroloji',
  'Dermatoloji',
  'Diğer / özel branş',
];

export const PROCESSING_STEPS = [
  'Uploaded',
  'Reading text',
  'Analyzing figures',
  'Building lesson structure',
  'Generating questions',
  'Generating flashcards',
  'Ready',
];

export function resolvePreferredStudyMode(profile = {}) {
  if (profile.primaryGoal === 'tus' || profile.educationStatus === 'tus-candidate') return 'tus';
  if (profile.primaryGoal === 'clinical-rotation' || ['year-4', 'year-5', 'year-6'].includes(profile.educationStatus)) return 'clinical-rotation';
  if (['committee', 'final'].includes(profile.primaryGoal)) return 'medical-school';
  return EDUCATION_STATUS_OPTIONS.find((item) => item.value === profile.educationStatus)?.modeHint || 'medical-school';
}

export function buildEmptyUploadMetadata(profile = {}) {
  const preferredMode = resolvePreferredStudyMode(profile);
  return {
    studyMode: preferredMode,
    classYear: profile.classYear || '',
    university: profile.university || '',
    committee: '',
    course: preferredMode === 'medical-school' ? 'Kardiyovasküler Sistem' : '',
    tusBranch: preferredMode === 'tus' ? 'Dahiliye' : '',
    examDate: '',
  };
}
