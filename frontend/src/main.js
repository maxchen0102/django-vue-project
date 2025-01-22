import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// 👉 加入 PWA 註冊
import { registerSW } from 'virtual:pwa-register'

registerSW()


const app = createApp(App)
app.use(router)
app.mount('#app')
