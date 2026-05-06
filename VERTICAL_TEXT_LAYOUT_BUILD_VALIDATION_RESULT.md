# Build / Validation Result

## Static validation
- `src/styles/klinikiq-responsive-safety.css` brace validation geçti.
- `src/styles/klinikiq-refine.css` brace validation geçti.
- `src/index.css` brace validation geçti.
- Aktif kaynak içinde `word-break: break-all` kuralı bulunmadı.
- Aktif kaynak içinde `writing-mode: vertical-*` kuralı bulunmadı.
- `CasePlayer.jsx` içinde hasta özeti listeleri `summary-readable-list` sınıfı ve `data-summary-kind` niteliğiyle semantik olarak işaretlendi.

## Build denemesi
- `npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund` sandbox ortamında timeout verdi.
- Dependency kurulumu tamamlanamadığı için `npm run build` denemesi `vite: not found` hatasıyla tamamlanamadı.

Lokal doğrulama komutları:

```bash
npm install
npm run build
npm run dev
```
