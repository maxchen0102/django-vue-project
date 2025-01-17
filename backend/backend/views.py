import json
import os
from django.conf import settings
from django.shortcuts import render

#
# def get_vite_asset_path(file_name):
#     """ 讀取 Vite build 產生的檔案名稱 """
#     manifest_path = os.path.join(settings.BASE_DIR, 'backend/static/dist/manifest.json')
#     with open(manifest_path) as f:
#         manifest = json.load(f)
#     return f"/static/dist/{manifest[file_name]['file']}"


def index(request):
    context = {
        "js_file": "/static/dist/assets/index.js",  # 直接指定固定的檔案名稱
        "css_file": "/static/dist/assets/style.css"
    }
    return render(request, 'index.html', context)
