import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      VitePWA({
      manifestFilename: 'manifest.json',
      registerType: 'autoUpdate',
     manifest: {
        name: "My App",
        short_name: "App",
        display: "standalone", // 這會移除網址列
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-logo.png", // 只需要一個基本圖標
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],

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