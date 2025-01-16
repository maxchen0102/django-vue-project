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
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const response = await fetch('/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (response.ok) {
      // 儲存 tokens
      localStorage.setItem('token', data.access)
      localStorage.setItem('refresh_token', data.refresh)

      alert('登入成功！')
      router.push('/') // 導向首頁或儀表板
    } else {
      alert(data.detail || '登入失敗，請檢查帳號密碼')
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
  margin-bottom: 15px;
}

button:hover {
  background-color: #45a049;
}

.register-link {
  text-align: center;
  margin-top: 10px;
}

.register-link a {
  color: #4CAF50;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>