<template>
  <div class="exercise-container">
    <h1 class="page-title">訓練部位</h1>

    <button class="btn btn-danger mb-3" @click="showModal = true">新增訓練部位</button>
    <button class="btn btn-success mb-3" @click="goBack">返回</button>



    <div class="exercise-list">
      <div
        v-for="exercise in exercises"
        :key="exercise.id"
        class="exercise-item-wrapper"
      >
        <div
          class="exercise-item"
          :style="{ transform: `translateX(${exercise.offset}px)` }"
          @touchstart="handleTouchStart($event, exercise)"
          @touchmove="handleTouchMove($event, exercise)"
          @touchend="handleTouchEnd(exercise)"
          @click="exercise.offset === 0 && handleExerciseClick(exercise)"
        >
          <div class="exercise-content">
            <h2 class="exercise-title">{{ exercise.name }}</h2>
            <p class="exercise-subtitle">點擊開始訓練</p>
          </div>
          <div class="arrow-icon">
            <i class="bi bi-chevron-right"></i>
          </div>
        </div>
        <div class="delete-button" @click="handleDelete(exercise)">
          <i class="bi bi-trash"></i>
          刪除
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Transition name="modal">
      <div v-if="showModal" class="modal-backdrop" @click="showModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>新增訓練部位</h3>
            <button class="close-button" @click="showModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="exerciseName">部位名稱</label>
              <input
                type="text"
                id="exerciseName"
                v-model="newExerciseName"
                class="form-control"
                placeholder="請輸入訓練部位名稱"
                @keyup.enter="handleSubmit"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="showModal = false">取消</button>
            <button class="btn btn-primary" @click="handleSubmit" :disabled="isSubmitting">
              {{ isSubmitting ? '提交中...' : '確定' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 無數據時的提示 -->
    <div v-if="exercises.length === 0" class="empty-state">
      <i class="bi bi-inbox"></i>
      <p>暫無訓練部位數據</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import './css/ExerciseList.css'

const router = useRouter()
const exercises = ref([])
const showModal = ref(false)
const newExerciseName = ref('')
const isSubmitting = ref(false)
const deleteThreshold = -8
const token = localStorage.getItem('token')

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;




let touchStartX = 0
let currentExercise = null

function goBack() {
  router.go(-1)
}

const getCsrfToken = () => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
}

const fetchExercises = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/exercises/`,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('網路請求失敗')
    }
    const data = await response.json()
    exercises.value = data.map(exercise => ({
      ...exercise,
      offset: 0
    }))
  } catch (err) {
    console.error("獲取數據失敗:", err)
  }
}

const handleDelete = async (exercise) => {
  if (!confirm('確定要刪除嗎？')) {
    exercise.offset = 0
    return
  }

  try {
    const response = await fetch(`http://localhost:11111/api/exercises/${exercise.id}/`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': getCsrfToken(),
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })

    if (!response.ok) {
      const responseText = await response.text()
      throw new Error(`刪除失敗: ${response.status} ${responseText}`)
    }

    await fetchExercises()
  } catch (err) {
    console.error("刪除失敗:", err)
    alert(err.message || '刪除失敗，請稍後再試')
    exercise.offset = 0
  }
}

const handleExerciseClick = (exercise) => {
  console.log('Clicked exercise:', exercise.name)
  router.push(
      {
       path: `/exercise/${exercise.id}`,
       query: { name: exercise.name }
      }
  )
}

const handleSubmit = async () => {
  if (isSubmitting.value) return

  if (!newExerciseName.value.trim()) {
    alert('請輸入訓練部位名稱')
    return
  }

  isSubmitting.value = true

  try {
    const response = await fetch('/api/exercises/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`,
        'X-CSRFToken': getCsrfToken()
      },
      credentials: 'include',
      body: JSON.stringify({
        name: newExerciseName.value.trim()
      })
    })

    if (!response.ok) {
      throw new Error('新增失敗')
    }

    await fetchExercises()
    newExerciseName.value = ''
    showModal.value = false
  } catch (err) {
    console.error("新增失敗:", err)
    alert('新增失敗，請稍後再試')
  } finally {
    isSubmitting.value = false
  }
}

const handleTouchStart = (event, exercise) => {
  touchStartX = event.touches[0].clientX
  currentExercise = exercise
  exercises.value.forEach(e => {
    if (e.id !== exercise.id) {
      e.offset = 0
    }
  })
}

const handleTouchMove = (event, exercise) => {
  if (currentExercise !== exercise) return

  const touchCurrentX = event.touches[0].clientX
  const diff = touchCurrentX - touchStartX
  exercise.offset = Math.max(deleteThreshold, Math.min(0, diff))
}

const handleTouchEnd = (exercise) => {
  if (!currentExercise) return

  if (exercise.offset <= deleteThreshold / 2) {
    exercise.offset = deleteThreshold
  } else {
    exercise.offset = 0
  }
  currentExercise = null
}

onMounted(() => {
  fetchExercises()
})
</script>