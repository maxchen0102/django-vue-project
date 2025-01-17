#!/bin/bash
# This script is used to build the project for development

set -e  # 遇到錯誤時立即停止腳本

PROJECT_ROOT=$(pwd)

echo "🧹 清除舊的 Vue build 檔案..."
rm -rf $PROJECT_ROOT/backend/static/dist  # ✅ 確保刪除舊的 dist 目錄
rm -rf $PROJECT_ROOT/backend/staticfiles  # ✅ 清除 Django 的 collectstatic 目錄（避免舊檔案殘留）

echo "===========Building frontend for development============"
cd $PROJECT_ROOT/frontend
npm install  # ✅ 確保 node_modules 是最新的
npm run build  # ✅ 重新建置 Vue 應用

echo "===========Building backend for development============"
cd $PROJECT_ROOT/backend
python manage.py collectstatic --noinput  # ✅ 收集最新的靜態檔案
python manage.py migrate  # ✅ 確保資料庫 schema 是最新的

echo "================✅ Project has been built successfully===================="
