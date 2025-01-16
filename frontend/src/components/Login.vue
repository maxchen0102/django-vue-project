<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>帳號:</label>
        <input type="text" v-model="username" required>
      </div>
      <div class="form-group">
        <label>密碼:</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">登入</button>
    </form>
     <div class="register-link">
      還沒有帳號？ <router-link to="/register">立即註冊</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 路由實例
const router = useRouter()
const route = useRoute()

// 響應式數據
const username = ref('')
const password = ref('')

// 登入方法
const handleLogin = async () => {
  try {
    // 發送登入請求到後端
    const response = await fetch('/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,  // 要使用 .value 取值
        password: password.value
      })
    })

    if (response.ok) {
      const data = await response.json()
      // 儲存 token
      localStorage.setItem('token', data.token)

      // 取得重新導向地址或預設跳轉到首頁
      const redirectPath = route.query.redirect || '/'
      router.push(redirectPath)
    } else {
      alert('登入失敗，請檢查帳號和密碼')
    }
  } catch (error) {
    console.error('登入錯誤:', error)
    alert('登入出錯，請稍後重試')
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>