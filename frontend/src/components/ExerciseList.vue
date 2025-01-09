<!-- ExerciseList.vue -->
<template>
  <div class="container">
    <div class="exercise-card">
      <div class="card-header">
        <h5>運動項目列表</h5>
      </div>
      <div class="card-content">
        <button
          @click="fetchData"
          :disabled="isLoading"
          class="fetch-button"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
          {{ isLoading ? '載入中...' : '獲取資料' }}
        </button>

        <div v-if="error" class="error-alert">
          <i class="bi bi-exclamation-triangle-fill error-icon"></i>
          {{ error }}
        </div>

        <div v-if="data" class="exercise-list">
          <div v-for="item in data"
               :key="item.id"
               class="exercise-item"
                @click="goToDetail(item.id)">
            <div class="item-header">
              <h5 class="item-title">{{ item.name }}</h5>
              <small class="item-id">ID: {{ item.id }}</small>
            </div>
            <p class="item-description">{{ item.description }}</p>
            <small class="item-time">
              創建時間: {{ formatDate(item.created_at) }}
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const data = ref(null)
const isLoading = ref(false)
const error = ref(null)
const router = useRouter()


const goToDetail = (id) => {
  router.push({
    name: 'exercise-detail',
    params: { id: id }
  })
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const fetchData = async () => {
  isLoading.value = true
  error.value = null

  try {
    const response = await fetch('http://127.0.0.1:11111/api/exercises/')
    if (!response.ok) {
      throw new Error('API 請求失敗')
    }
    data.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}
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
}

.card-header h5 {
  margin: 0;
  font-size: 1.25rem;
}

.card-content {
  padding: 1rem;
}

.fetch-button {
  padding: 0.5rem 1rem;
  color: #fff;
  background-color: #0d6efd;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.fetch-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
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

.error-icon {
  margin-right: 0.5rem;
}

.exercise-list {
  margin-top: 1rem;
}

.exercise-item {
    cursor: pointer;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}

.exercise-item:hover {
  background-color: #f0f0f0;
  transition: background-color 0.3s;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.item-title {
  margin: 0;
  font-size: 1.1rem;
}

.item-id {
  color: #6c757d;
}

.item-description {
  margin-bottom: 0.5rem;
}

.item-time {
  color: #6c757d;
}

@keyframes spinner-border {
  to { transform: rotate(360deg); }
}
</style>