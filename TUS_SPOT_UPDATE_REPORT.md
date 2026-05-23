KlinikIQ TUS Spot Olgular güncelleme raporu

Yapılan işlem:
- Projedeki mevcut TUS Spot Olgular soru havuzu tarandı.
- Mevcut projede 70 adet vaka dışı TUS Spot soru vardı.
- Daha önce üretilen toplam 155 soru kaynağı tarandı.
- Projede eksik olan 85 soru eklendi: 061-090 ve 101-155 aralığı.
- TUS Spot Olgular havuzu 155 soruya çıkarıldı.
- Mevcut 001-060 ve 091-100 soruları da yeni ultra kalite schema standardına yeniden normalize edildi.
- Tüm TUS Spot sorularında şu alanlar dolduruldu/güçlendirildi:
  id, title, displayLabel, score, branchId, branch, relatedBranch, section, topic,
  questionType, difficulty, stem, options, correctAnswer, correctOptionText,
  coreKnowledge, explanation, answerAnalysisIntro, optionFeedback, examPearl,
  diagnosis.optionComparison, diagnosis.answerFeedback, listTitle, cardTitle.
- title alanları görünür başlık sızmasını önlemek için boş bırakıldı.
- branchId tüm sorularda tus-spot-olgular olarak korundu.
- Tüm sorularda 5 seçenek, tek doğru cevap, seçenek feedbackleri ve açıklama alanları kontrol edildi.
- cases.js syntax kontrolü node --check ile başarıyla geçti.

Son durum:
- Toplam cases.js kayıt sayısı: 545
- TUS Spot Olgular soru sayısı: 155
