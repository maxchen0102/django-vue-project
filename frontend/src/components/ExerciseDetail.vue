<!-- ExerciseDetail.vue -->
<template>
  <div class="container">
    <div class="exercise-card">
      <div class="card-header">
        <button class="back-button" @click="goBack">
          返回
        </button>
        <h5>運動項目詳情</h5>
      </div>
      <div class="card-content">
        <div v-if="isLoading" class="loading">
          <span class="loading-spinner"></span>
          載入中...
        </div>

        <div v-if="error" class="error-alert">
          <i class="bi bi-exclamation-triangle-fill error-icon"></i>
          {{ error }}
        </div>

        <div v-if="movements_data.length > 0" class="exercise-detail">
          <div v-for="movement in movements_data" :key="movement.id" class="movement-item"  @click="goToWorkoutRecord(movement.id)">
            <div class="detail-info">
              <p><strong>ID:</strong> {{ movement.id }}</p>
              <p><strong>名稱:</strong> {{ movement.name }}</p>
              <p><strong>描述:</strong> {{ movement.description || '無' }}</p>
              <p><strong>創建時間:</strong> {{ formatDate(movement.created_at) }}</p>
              <p><strong>更新時間:</strong> {{ formatDate(movement.updated_at) }}</p>
            </div>
          </div>
        </div>
        <div v-else-if="!isLoading" class="no-data">
          無可用的運動項目資料
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const movements_data = ref([])
const isLoading = ref(false)
const error = ref(null)


const goToWorkoutRecord = (id) => {
  console.log('movement_id:', id)
   router.push({
    name: 'workout-record',
    params: { movement_id: id }
  })
}

const formatDate = (date_string) => {
  if (!date_string) return 'N/A'
  try {
    const date = new Date(date_string)
    if (isNaN(date.getTime())) return 'Invalid Date'
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'Invalid Date'
  }
}

const goBack = () => {
  router.back()
}

const fetchExerciseDetail = async () => {
  const exercise_id = route.params.id
  isLoading.value = true
  error.value = null

  try {
    const response = await fetch(`http://127.0.0.1:11111/api/exercises/${exercise_id}/movements/`)
    if (!response.ok) {
      throw new Error('獲取詳細資料失敗')
    }
    const data = await response.json()
    movements_data.value = Array.isArray(data) ? data : [data]
    console.log('movements_data:', movements_data.value)
  } catch (err) {
    error.value = err.message
    console.error('Error:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchExerciseDetail)
</script>

<style scoped>
.container {
  padding: 1.5rem;
}

.exercise-card {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  background-color: #fff;
}

.card-header {
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  align-items: center;
}

.back-button {
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.back-button:hover {
  background-color: #5c636a;
}

.card-header h5 {
  margin: 0;
  font-size: 1.25rem;
}

.card-content {
  padding: 1rem;
}

.loading {
  text-align: center;
  padding: 2rem;
}

.loading-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 0.2em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;
  margin-right: 0.5rem;
}

.error-alert {
  padding: 1rem;
  margin-top: 1rem;
  color: #842029;
  background-color: #f8d7da;
  border: 1px solid #f5c2c7;
  border-radius: 0.25rem;
}

.exercise-detail {
  padding: 0.5rem;
}

.movement-item {
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.movement-item:last-child {
  margin-bottom: 0;
}

.detail-info p {
  margin-bottom: 0.75rem;
}

.detail-info p:last-child {
  margin-bottom: 0;
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

@keyframes spinner-border {
  to { transform: rotate(360deg); }
}
</style>