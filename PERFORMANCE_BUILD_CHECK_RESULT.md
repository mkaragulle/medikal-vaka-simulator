# Performance Build Check Result

## Static checks
```bash
tsc --allowJs --jsx react-jsx --noEmit --skipLibCheck --moduleResolution bundler --module esnext --target es2022 src/App.jsx src/main.jsx src/components/*.jsx src/utils/*.js src/data/*.js
```
Result: PASS

```bash
postcss.parse(src/index.css)
```
Result: PASS

## Vite build
```bash
npm run build
```
Result in sandbox: FAIL because local dependencies were not installed.

Error:
```text
sh: 1: vite: not found
```

Notes: `npm install` was attempted, but the sandbox internal npm registry request timed out. No source-level syntax error was found by the static checks above.
