#!/bin/bash

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== 萌典 Android 建置腳本 ===${NC}"

# 檢查是否在正確的目錄
if [ ! -f "package.json" ]; then
    echo -e "${RED}錯誤：請在專案根目錄執行此腳本${NC}"
    exit 1
fi

# 建置 Web 版本
echo -e "${YELLOW}1. 建置 Web 版本...${NC}"
quasar build -m spa

if [ $? -ne 0 ]; then
    echo -e "${RED}Web 建置失敗！${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Web 建置完成${NC}"

# 同步到 Capacitor
echo -e "${YELLOW}2. 同步到 Capacitor...${NC}"
cd src-capacitor
./node_modules/.bin/cap sync

if [ $? -ne 0 ]; then
    echo -e "${RED}Capacitor 同步失敗！${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Capacitor 同步完成${NC}"

# 建置 Android APK
echo -e "${YELLOW}3. 建置 Android APK...${NC}"
./node_modules/.bin/cap build android --release

if [ $? -ne 0 ]; then
    echo -e "${RED}Android 建置失敗！${NC}"
    echo -e "${YELLOW}請檢查：${NC}"
    echo -e "  - Android Studio 是否已安裝"
    echo -e "  - Android SDK 是否已設置"
    echo -e "  - JDK 是否已安裝"
    exit 1
fi

echo -e "${GREEN}✓ Android APK 建置完成！${NC}"

# 顯示結果
echo -e "${BLUE}=== 建置結果 ===${NC}"
echo -e "APK 檔案位於："
echo -e "${GREEN}src-capacitor/android/app/build/outputs/apk/release/${NC}"

# 檢查 APK 檔案是否存在
APK_PATH="android/app/build/outputs/apk/release/app-release.apk"
if [ -f "$APK_PATH" ]; then
    APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo -e "APK 檔案大小：${GREEN}$APK_SIZE${NC}"
else
    echo -e "${YELLOW}注意：未找到 APK 檔案，請檢查建置過程${NC}"
fi

echo -e "${BLUE}=== 建置完成 ===${NC}"
