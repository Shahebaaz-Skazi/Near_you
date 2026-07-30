@echo off
echo ========================================================
echo NearYou Expo APK Local Builder (Windows CMD Mode)
echo ========================================================
echo Running Expo Prebuild (Generating Android project)...
call npx expo prebuild --platform android --no-install

echo Re-configuring local properties...
if exist android (
  if not exist android\local.properties (
    if exist ..\nearyou-app\android\local.properties (
      copy ..\nearyou-app\android\local.properties android\local.properties
    ) else (
      echo sdk.dir=C:\Users\shahe\AppData\Local\Android\Sdk > android\local.properties
    )
  )
)

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
