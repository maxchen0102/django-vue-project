import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:11111',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: '../backend/static/dist',  // 指向 Django 的靜態文件目錄
    assetsDir: 'assets', // css image 檔案放置目錄, 也在dist 底下
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',  // 移除 hash
        chunkFileNames: 'assets/[name].js',  // 移除 hash
        assetFileNames: 'assets/[name].[ext]'  // 移除 hash
      }
    }
  },
})