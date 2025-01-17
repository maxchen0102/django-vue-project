#!/bin/bash
# 部署 Production 環境的 Build Script

set -e  # 遇到錯誤時立即停止腳本

PROJECT_ROOT=$(pwd)

echo "===========Installing Python dependencies============"
cd $PROJECT_ROOT/backend
pip install --no-cache-dir -r requirements.txt  # ✅ 避免快取，確保安裝最新依賴

# 清除舊的靜態檔案 & 前端 Build
echo "🧹 清除舊的 Vue & Django 靜態檔案..."
rm -rf $PROJECT_ROOT/backend/static/dist  # ✅ 確保刪除舊的 Vue build 檔案
rm -rf $PROJECT_ROOT/backend/staticfiles  # ✅ 確保刪除 Django collectstatic 目錄

# 安裝前端依賴並編譯
echo "===========Building frontend for production============"
cd $PROJECT_ROOT/frontend
npm install   # ✅ 安裝前端套件
npm run build  # ✅ Build Vue

# 收集最新的靜態檔案 & 執行遷移
echo "===========Building backend for production============"
cd $PROJECT_ROOT/backend
python manage.py collectstatic --noinput --clear  # ✅ 收集最新的靜態檔案，並刪除舊的
python manage.py migrate  # ✅ 執行資料庫遷移，確保 DB 結構是最新的

echo "================✅ Project has been built successfully===================="
