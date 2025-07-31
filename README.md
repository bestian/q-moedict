# Quasar App (q-moedict)

萌典 - 教育部辭典民間版

## 系統需求

- Node.js >= 16.0.0
- npm >= 8.0.0
- Android Studio (用於 Android 開發)

## 升級狀態

✅ **已升級到 Quasar v2.18.2**
- Vue 3.3.0
- Vue Router 4.2.0
- Capacitor 7.4.2
- 移除不相容的 `react-zh-stroker` 套件
- 修復 Vue 3 相容性問題
- 新增 Android 建置支援

⚠️ **已知問題**
- 筆順功能暫時停用（需要 Vue 3 相容的替代方案）

✅ **Android 支援**
- 支援建置 APK 和 AAB 格式
- 提供自動化建置腳本
- 完整的 Android 開發環境設置指南

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### 快速建置 Android APK
```bash
./build-android.sh
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build -m pwa
```


### Android 開發

#### 前置需求
1. 安裝 [Android Studio](https://developer.android.com/studio)
2. 設置 Android SDK
3. 安裝 Java Development Kit (JDK) 11 或更新版本

#### 建置 Android 應用程式

1. **建置 Web 版本**：
```bash
quasar build -m spa
```

2. **同步到 Capacitor**：
```bash
cd src-capacitor
./node_modules/.bin/cap sync
```

3. **開啟 Android Studio**：
```bash
./node_modules/.bin/cap open android
```

4. **在 Android Studio 中運行**：
   - 連接 Android 設備或啟動模擬器
   - 點擊 "Run" 按鈕 (綠色三角形)

#### 建置 Release APK

1. **建置 Release 版本**：
```bash
cd src-capacitor
./node_modules/.bin/cap build android --release
```

2. **或使用 Android Studio**：
   - 開啟 Android Studio
   - 選擇 `Build` → `Generate Signed Bundle / APK`
   - 選擇 `APK`
   - 創建或選擇 Keystore
   - 選擇 `release` 建置類型
   - 點擊 `Finish`

#### 建置 AAB (Android App Bundle)

1. **使用 Android Studio**：
   - 開啟 Android Studio
   - 選擇 `Build` → `Generate Signed Bundle / APK`
   - 選擇 `Android App Bundle`
   - 創建或選擇 Keystore
   - 選擇 `release` 建置類型
   - 點擊 `Finish`

#### 自動化建置腳本

創建 `build-android.sh` 腳本：
```bash
#!/bin/bash
echo "建置 Web 版本..."
quasar build -m spa

echo "同步到 Capacitor..."
cd src-capacitor
./node_modules/.bin/cap sync

echo "建置 Android APK..."
./node_modules/.bin/cap build android --release

echo "建置完成！APK 檔案位於："
echo "src-capacitor/android/app/build/outputs/apk/release/"
```

### Customize the configuration
See [Configuring quasar.config.js](https://quasar.dev/quasar-cli/quasar-conf-js).
