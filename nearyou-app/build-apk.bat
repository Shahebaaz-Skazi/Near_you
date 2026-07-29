@echo off
echo ========================================================
echo NearYou APK Builder (Offline CLI Mode)
echo ========================================================
echo Building React production bundle...
call npm run build
echo Syncing assets to Capacitor...
call npx cap sync android
echo Compiling Android APK with Gradle...
cd android
call gradlew.bat assembleDebug
cd ..
echo ========================================================
echo APK Compilation Complete!
echo The sideload-ready APK is available at:
echo nearyou-app\android\app\build\outputs\apk\debug\app-debug.apk
echo ========================================================
pause
