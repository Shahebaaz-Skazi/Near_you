@echo off
echo ========================================================
echo NearYou Expo APK Local Builder (Windows CMD Mode)
echo ========================================================
echo Running Expo Prebuild (Generating Android project)...
call npx expo prebuild --platform android
echo Compiling Android APK with local Gradle wrapper...
cd android
call gradlew.bat assembleDebug
cd ..
echo ========================================================
echo Standalone Native APK Compilation Complete!
echo Sideloadable APK:
echo nearyou-native\android\app\build\outputs\apk\debug\app-debug.apk
echo ========================================================
pause
