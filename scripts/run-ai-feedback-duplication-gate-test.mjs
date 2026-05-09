import { feedbackDuplicationGate } from '../src/utils/feedbackDuplicationGate.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const anaphylaxis = feedbackDuplicationGate({
  signal: {
    hasContent: true,
    spotPearl: 'Spot bilgi: Anafilaksi tedavisinde epinefrin IM en kritik ilk adımdır, ardından oksijen, sıvı ve ek ilaçlar eklenir.',
    keywords: [
      'Düşük tansiyon ve solunum sıkıntısı',
      'Mukoza şişliği ve hırıltı',
      '0.3 mg',
      'IM önerisi',
      'Epinefrin 0.3 mg',
      'IM önerisi',
    ],
  },
  pearls: [
    { label: 'Sınav incisi', text: 'Anafilakside ilk ilaç IM epinefrindir; antihistaminik ve steroidler ilk basamak değildir.' },
  ],
  reasoningText: 'Hipotansiyon, solunum sıkıntısı ve mukozal tutulum anafilaksi lehine sistemik reaksiyon düşündürür. Bu tabloda ilk hayat kurtarıcı tedavi intramüsküler epinefrindir. Antihistaminik, bronkodilatör ve kortikosteroidler destek tedavilerdir; epinefrinin yerine geçmez.',
  evidenceChain: [
    { title: 'Dolaşım etkilenimi', text: 'Düşük kan basıncı sistemik reaksiyonu gösterir.' },
    { title: 'Solunum bulgusu', text: 'Hışıltılı solunum bronş tutulumunu destekler.' },
  ],
  correctAnswer: 'Epinefrin 0.3 mg intramüsküler',
});

assert(anaphylaxis.signal.spotPearl.startsWith('Anafilaksi kuralı:'), 'Anafilaksi için mekanik Spot bilgi metni temizlenmedi.');
assert(anaphylaxis.signal.keywords.length <= 3, 'Chip sayısı 3 sınırını aşıyor.');
assert(new Set(anaphylaxis.signal.keywords).size === anaphylaxis.signal.keywords.length, 'Chiplerde birebir tekrar var.');
assert(!anaphylaxis.signal.keywords.some((chip) => /IM önerisi|Epinefrin 0\.3 mg|^3 mg$/iu.test(chip)), 'Zayıf veya tekrar eden chip kaldı.');
assert(anaphylaxis.pearls.length === 0, 'Klinik gerekçe/sınav notu ile aynı pearl tekrar gösteriliyor.');

const sle = feedbackDuplicationGate({
  signal: {
    hasContent: true,
    spotPearl: 'SLE aktivite takibinde anti-dsDNA artışı ve C3/C4 düşüklüğü birlikte değerlendirilir.',
    keywords: ['anti-dsDNA yüksek', 'C3 düşük', 'C4 düşük', 'anti-dsDNA yüksek'],
  },
  pearls: [{ label: 'Sınav incisi', text: 'Aktivite takibinde anti-dsDNA artışı ve kompleman düşüklüğü kullanılır.' }],
  reasoningText: 'Sistemik lupus eritematozus aktivitesinde anti-dsDNA artışı ve kompleman düşüklüğü birlikte anlamlıdır. İzlemde tek başına ANA titresi aktiviteyi güvenilir biçimde göstermez.',
  correctAnswer: 'Anti-dsDNA ve C3/C4 düzeyleri',
});

assert(sle.signal.keywords.length <= 3, 'SLE chipleri fazla.');
assert(new Set(sle.signal.keywords.map((chip) => chip.toLocaleLowerCase('tr'))).size === sle.signal.keywords.length, 'SLE chiplerinde tekrar var.');
assert(!sle.signal.keywords.some((chip) => chip.length > 34), 'Uzun chip kaldı.');

console.log('AI feedback duplication gate QA passed: anaphylaxis + SLE scenarios');
