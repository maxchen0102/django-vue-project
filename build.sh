# build.sh
#!/bin/bash
# 安裝 Python 依賴

PROJECT_ROOT=$(pwd)

echo "===========Installing Python dependencies============"
cd $PROJECT_ROOT/backend
pip install -r requirements.txt

# 安裝前端依賴並編譯
echo "===========Building frontend for production============"
cd $PROJECT_ROOT/frontend
cd frontend
npm install
npm run build

echo "===========Building backend for production============"
cd $PROJECT_ROOT/backend
python manage.py collectstatic --noinput
python manage.py migrate  # 執行資料庫遷移

echo "================Project has been built successfully===================="