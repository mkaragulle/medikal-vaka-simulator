# KlinikIQ AI ile Soru Üret - Gerçek AI Hazırlığı ve Tekrar Engelleme Güncellemesi

Bu güncelleme, önceki local/mock AI soru üretim sistemini daha profesyonel ve ölçeklenebilir hale getirir. Sistem artık yalnızca birkaç hazır soruyu döndürmek yerine iki katmanlı çalışır:

1. **Local akıllı generator:** Hazır `aiQuestionSeeds.js` çekirdekleriyle birlikte mevcut `cases.js` vaka verilerinden otomatik soru seedleri türetir.
2. **Gerçek AI entegrasyonuna hazır servis:** `VITE_ENABLE_REAL_AI=true` yapıldığında frontend `/api/generate-ai-question` endpointine istek atar. Endpoint Gemini uyumlu serverless proxy olarak hazırlanmıştır. Gerçek AI başarısız olursa local generator otomatik fallback olarak çalışır.

## Tekrar sorunu nasıl azaltıldı?

Yeni sistem üç seviyeli tekrar engelleme kullanır:

- **Recent ID memory:** Son üretilen seed/soru ID'leri `localStorage` içinde tutulur.
- **Content signature/hash:** Soru başlığı, stem, soru kökü, doğru cevap ve öğrenme hedefinden içerik imzası üretilir. Aynı içerik farklı ID ile gelse bile yakalanır.
- **Case-derived seed pool:** Mevcut KlinikIQ vakalarından çok daha geniş bir soru havuzu oluşturulur. Böylece birkaç seed arasında dönme problemi belirgin azalır.

İlgili dosya:

```txt
src/utils/aiQuestionHistory.js
```

## Gerçek AI entegrasyonu nasıl çalışır?

Frontend API key görmez. Doğru akış:

```txt
React/Vite frontend
  -> src/services/aiQuestionService.js
  -> /api/generate-ai-question
  -> server-side GEMINI_API_KEY
  -> model JSON üretir
  -> frontend schema validation + normalize
  -> CasePlayer ekranında çözülür
```

İlgili dosyalar:

```txt
src/services/aiQuestionService.js
src/utils/validateAIQuestion.js
api/generate-ai-question.js
.env.example
```

## Local geliştirme davranışı

Varsayılan `.env.example` içinde:

```txt
VITE_ENABLE_REAL_AI=false
```

Bu ayar false iken sistem API çağrısı yapmaz. Bu, local geliştirmede hızlı ve ücretsiz çalışır.

Gerçek AI kullanmak için:

1. Vercel gibi serverless destekleyen bir ortama deploy et.
2. Environment Variables içine `GEMINI_API_KEY` ekle.
3. Frontend env değişkenini aç:

```txt
VITE_ENABLE_REAL_AI=true
```

4. Endpoint varsayılan olarak şu yolu kullanır:

```txt
/api/generate-ai-question
```

## Güvenlik notu

API key asla `src/` içine veya `VITE_` ile başlayan frontend değişkeni olarak konmamalıdır. `VITE_` değişkenleri tarayıcı bundle'ına girer ve kullanıcı tarafından görülebilir. Bu yüzden gerçek model anahtarı yalnızca serverless environment variable olarak tutulmalıdır.

## Fallback mantığı

Gerçek AI şu durumlarda başarısız sayılır:

- Endpoint yoksa,
- API key tanımlı değilse,
- model JSON dışı cevap döndürürse,
- 5 şık yoksa,
- doğru cevap A-E ile eşleşmezse,
- kanıt zinciri / açıklama / yanlış şık feedbackleri eksikse,
- üretilen soru son içerik imzalarıyla çakışırsa.

Bu durumda uygulama kırılmaz; local generator devreye girer ve ekranda fallback bildirimi gösterilir.

## Değişen kullanıcı deneyimi

AI soru ekranına şu geliştirmeler eklendi:

- Kaynak rozeti: `Gerçek AI aktif`, `Local akıllı generator` veya `AI fallback: local generator`.
- Branş/konu filtresi: Rastgele veya ilgili branşa yakın soru üretme.
- Tekrar imzası: Debug/kalite kontrol için içerik hash'i gösterilir.
- Fallback bildirimi: Gerçek AI çalışmazsa kullanıcıya uygulamanın güvenli şekilde local üretime döndüğü belirtilir.

## Önemli kalite kontrolleri

Yeni sistem şu kontrolleri yapacak şekilde tasarlandı:

- Aynı soru sürekli tekrar etmesin.
- Doğru cevap seçenekler içinde bulunsun.
- Cevap sonrası klinik gerekçe ve kanıt zinciri eksik olmasın.
- Tetkik sonuçlarında doğru tanı birebir yazılırsa frontend bunu maskeleyerek gösterir.
- AI API başarısız olduğunda ekran boş kalmasın.
