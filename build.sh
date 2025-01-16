# build.sh
#!/bin/bash
# 安裝 Python 依賴
pip install -r requirements.txt

# 安裝前端依賴並編譯
cd frontend
npm install
npm run build

# 回到後端目錄收集靜態文件
cd ../backend
python manage.py collectstatic --noinput
python manage.py migrate  # 執行資料庫遷移