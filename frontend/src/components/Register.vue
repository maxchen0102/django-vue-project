<template>
  <div class="register-container">
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label>帳號:</label>
        <input type="text" v-model="username" required>
      </div>
      <div class="form-group">
        <label>密碼:</label>
        <input type="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label>確認密碼:</label>
        <input type="password" v-model="confirmPassword" required>
      </div>
      <button type="submit">註冊</button>
    </form>
    <div class="login-link">
      已有帳號？ <router-link to="/login">立即登入</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('兩次輸入的密碼不一致')
    return
  }

  try {
    const response = await fetch('/api/register/', {
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
      // 儲存 JWT token
      localStorage.setItem('token', data.token)
      alert('註冊成功！')
      router.push('/') // 導向首頁或儀表板
    } else {
      alert(data.message || '註冊失敗，請稍後重試')
    }
  } catch (error) {
    console.error('註冊錯誤:', error)
    alert('註冊出錯，請稍後重試')
  }
}
</script>

<style scoped>
.register-container {
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

.login-link {
  text-align: center;
  margin-top: 10px;
}

.login-link a {
  color: #4CAF50;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>