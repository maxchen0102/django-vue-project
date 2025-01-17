import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// 👉 加入 PWA 註冊
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('新版本可用，是否重新載入？')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('PWA 已準備好，可以離線使用！')
  }
});

const app = createApp(App)
app.use(router)
app.mount('#app')
