<template>
  <div class="container">
    <h1 class="page-title">訓練動作</h1>
    <div class="row">
    <button class="btn btn-danger mb-3" @click="showModal = true">新增訓練部位</button>
  <button class="btn btn-danger " @click="goBack">返回</button>

    </div>
  </div>
  <div class="movement-list">
    <div v-if="movements.length">
      <div v-for="movement in movements"
           :key="movement.id"
           class="movement-item"
           @click="handleMovementClick(movement)">
        <div class="movement-content">
          <h3 class="movement-title">{{ movement.name }}</h3>
          <p class="movement-subtitle">點擊開始訓練</p>
        </div>
        <div class="movement-arrow">
          <span>&rsaquo;</span>
        </div>
      </div>
    </div>
    <div v-else class="no-data">
      <p>暫無動作資料</p>
    </div>
  </div>



   <!-- Modal -->
    <Transition name="modal">
      <div v-if="showModal" class="modal-backdrop" @click="showModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>新增訓練動作</h3>
            <button class="close-button" @click="showModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="movementName">部位名稱</label>
              <input
                type="text"
                id="movementName"
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
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import {onMounted, ref} from "vue"

const route = useRoute()
const router = useRouter()
const exerciseId = route.params.id
const movements = ref([])
const showModal = ref(false)
const newExerciseName = ref('')
const isSubmitting = ref(false)
const token = localStorage.getItem('token')


const goBack = () => {
  router.go(-1)
}

const handleSubmit = async () => {
  console.log('Submitting new exercise:', newExerciseName.value)
  showModal.value = false

  if (isSubmitting.value) return

  if (!newExerciseName.value.trim()) {
    alert('請輸入訓練部位名稱')
    return
  }
  isSubmitting.value = true
  try {
    const response = await fetch(`http://localhost:11111/api/movements/${exerciseId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: newExerciseName.value
      })
    })
    if (!response.ok) {
      throw new Error('網路請求失敗')
    }
    const newMovement = await response.json()
    movements.value.push(newMovement)
    newExerciseName.value = ''
  } catch (err) {
    console.error("提交數據失敗:", err)
  } finally {
    isSubmitting.value = false
  }
}

const handleMovementClick = (movement) => {
  // 可以加入點擊處理邏輯
  console.log('Clicked movement:', movement)
  router.push(`/workoutList/${movement.id}`)
}

const fetchMovements = async () => {
  console.log('Fetching movements for exercise:', exerciseId)
  try {
    const response = await fetch(`http://localhost:11111/api/movements/${exerciseId}/`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error('網路請求失敗')
    }
    movements.value = await response.json()
    console.log('Movements:', movements.value)
  } catch (err) {
    console.error("獲取數據失敗:", err)
  }
}

onMounted(() => {
  console.log('Exercise ID:', exerciseId)
  fetchMovements()
})
</script>

<style scoped>
.movement-list {
  padding: 16px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.movement-item {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.movement-content {
  flex: 1;
}

.movement-title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.movement-subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: #666;
}

.movement-arrow {
  color: #999;
  font-size: 24px;
  padding-left: 8px;
}

.no-data {
  text-align: center;
  color: #666;
  padding: 32px 0;
}
</style>