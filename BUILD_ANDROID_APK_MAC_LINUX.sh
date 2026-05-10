#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund
npm run mobile:build
cd android
chmod +x ./gradlew
./gradlew assembleDebug
cd ..
echo "APK output: android/app/build/outputs/apk/debug/app-debug.apk"
