import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      VitePWA({
      registerType: 'prompt',
      manifest: {
        name: '您的應用程式名稱',
        short_name: '短名稱',
        description: '應用程式描述',
        theme_color: '#41b883',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: "/",
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
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