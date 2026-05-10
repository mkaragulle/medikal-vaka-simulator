@echo off
setlocal
cd /d %~dp0
call npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund
call npm run mobile:build
cd android
call gradlew.bat assembleDebug
cd ..
echo.
echo APK output: android\app\build\outputs\apk\debug\app-debug.apk
pause
