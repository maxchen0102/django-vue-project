<template>
  <div class="min-vh-100 bg-light">
    <!-- 導航欄 -->
        <nav class="navbar bg-primary">
      <div class="container">
        <span class="navbar-brand mb-0 h1 text-white">FitLife</span>
        <button
          class="btn text-white"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebar"
          aria-controls="sidebar"
        >
          <i class="bi bi-person fs-4"></i>
        </button>
      </div>
    </nav>

        <!-- 側邊欄 -->
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="sidebar"
      aria-labelledby="sidebarLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="sidebarLabel">使用者選單</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="d-flex flex-column">
          <button class="btn btn-link text-decoration-none text-start">
            <i class="bi bi-person-circle me-2"></i>個人資料
          </button>
          <button class="btn btn-link text-decoration-none text-start">
            <i class="bi bi-gear me-2"></i>設定
          </button>
          <button
            class="btn btn-danger mt-auto"
            @click="handleLogout"
          >
            <i class="bi bi-box-arrow-right me-2"></i>登出
          </button>
        </div>
      </div>
    </div>


    <!-- 主要內容區 -->
    <div class="container py-4">
      <!-- 統計卡片 -->
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <!-- 健身次數 -->
          <div class="bg-light rounded p-3 mb-3">
            <p class="text-secondary mb-1">本週健身次數</p>
            <p class="text-primary fs-3 fw-bold mb-0">{{ stats.weeklyWorkouts }}次</p>
          </div>

          <!-- 訓練時間 -->
          <div class="bg-light rounded p-3 mb-3">
            <p class="text-secondary mb-1">累計訓練時間</p>
            <p class="text-primary fs-3 fw-bold mb-0">{{ stats.totalMinutes }}分</p>
          </div>

          <!-- 完成組數 -->
          <div class="bg-light rounded p-3">
            <p class="text-secondary mb-1">完成組數</p>
            <p class="text-primary fs-3 fw-bold mb-0">{{ stats.completedSets }}組</p>
          </div>
        </div>
      </div>

      <!-- 操作按鈕 -->
      <div class="d-flex flex-column gap-3">
        <!-- 開始訓練按鈕 -->
        <div class="card shadow-sm" @click="navigateToExerciseList">
          <div class="card-body d-flex align-items-center gap-3">
            <div class="bg-primary rounded-circle p-3 d-flex align-items-center justify-content-center icon-container">
              <i class="bi bi-activity text-white fs-5"></i>
            </div>
            <div>
              <h6 class="mb-1">開始訓練</h6>
              <small class="text-secondary">記錄今天的訓練</small>
            </div>
          </div>
        </div>

        <!-- 科學分析按鈕 -->
        <div class="card shadow-sm">
          <div class="card-body d-flex align-items-center gap-3">
            <div class="bg-info rounded-circle p-3 d-flex align-items-center justify-content-center icon-container">
              <i class="bi bi-graph-up text-white fs-5"></i>
            </div>
            <div>
              <h6 class="mb-1">科學分析</h6>
              <small class="text-secondary">專業數據分析</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import router from "../router/index.js";

// 狀態定義
const exercises = ref([])
const loading = ref(false)
const error = ref(null)
const count = ref(0)
const disabled = ref(false)

// 統計數據
const stats = ref({
  weeklyWorkouts: 4,
  totalMinutes: 180,
  completedSets: 24
})

function navigateToExerciseList() {
  console.log('go to exercise list')
  router.push({ name: 'ExerciseList' })
}

// 獲取運動數據
const fetchExercises = async () => {
  loading.value = true
  error.value = null
  try {
    const token = localStorage.getItem('token')
    console.log("token:",token)

    const response = await fetch('http://localhost:11111/api/exercises/',{
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('網路請求失敗')
    }
    const data = await response.json()
    exercises.value = data
    console.log("健身部位數據:",data)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// 點擊處理
const handleClick = () => {
  if (count.value >= 10) {
    disabled.value = true
    return
  }
  count.value++
}

// 刪除處理
const handleDelete = () => {
  loading.value = true
  try {
    count.value--
  } finally {
    loading.value = false
  }
}

// 登出
const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

// 生命週期鉤子
onMounted(() => {
  fetchExercises()
})
</script>

<style scoped>
.icon-container {
  width: 48px;
  height: 48px;
}

.offcanvas {
  width: 250px;
}
</style>