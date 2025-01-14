<template>
  <div class="container">
    <h1 class="main-title">訓練記錄</h1>
    <button class="btn btn-danger mb-3" @click="showModal = true">新增訓練記錄</button>
    <button class="btn btn-danger mb-3 " @click="goBack">返回</button>

    <div v-if="workouts.length" class="workout-list">
      <div v-for="workout in workouts"
           :key="workout.id"
           class="workout-item"
           @click="handleWorkoutClick">
        <div class="workout-content">
          <div class="workout-info">
            <h3 class="workout-title">{{ workout.reps }} 下 * {{ workout.sets }}組  每組 {{ workout.weight }}公斤</h3>

          </div>
          <div class="workout-date">
            {{ formatDate(workout.created_at) }}
          </div>
        </div>
        <div class="workout-arrow">
          <span>&rsaquo;</span>
        </div>
      </div>
    </div>

    <div v-else class="no-data">
      暫無訓練記錄
    </div>
  </div>

  <!-- Modal -->
  <Transition name="modal">
    <div v-if="showModal" class="modal-backdrop" @click="showModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>新增訓練記錄</h3>
          <button class="close-button" @click="showModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="reps">下數</label>
            <input
              type="number"
              id="reps"
              v-model="newReps"
              class="form-control"
              placeholder="請輸入下數"
            >
          </div>
          <div class="form-group">
            <label for="sets">組數</label>
            <input
              type="number"
              id="sets"
              v-model="newSets"
              class="form-control"
              placeholder="請輸入組數"
            >
          </div>
          <div class="form-group">
            <label for="weight">重量</label>
            <input
              type="number"
              id="weight"
              v-model="newWeight"
              class="form-control"
              placeholder="請輸入重量"
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
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import './css/WorkoutList.css'

const router = useRouter()
const route = useRoute()
const movement_id = route.params.id
const workouts = ref([])
const showModal = ref(false)
const newReps = ref('')
const newSets = ref('')
const newWeight = ref('')
const isSubmitting = ref(false)


const goBack = () => {
  router.go(-1)
}


const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const fetchWorkouts = async () => {
  try {
    const response = await fetch(`http://localhost:11111/api/workoutsets/${movement_id}/`)
    if (!response.ok) {
      throw new Error('網路請求失敗')
    }
    workouts.value = await response.json()
    console.log("訓練數據:", workouts.value)
  } catch (err) {
    console.error("獲取數據失敗:", err)
  }
}

const handleSubmit= async ()=>{
  console.log('Submitting new workout:', newReps.value, newSets.value, newWeight.value)
  showModal.value = false

  if (isSubmitting.value) return

 if (!newReps.value || !newSets.value || !newWeight.value) {
    alert('請輸入訓練記錄')
    return
  }
  isSubmitting.value = true
  try {
    const response = await fetch(`http://localhost:11111/api/workoutsets/${movement_id}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reps: newReps.value,
        sets: newSets.value,
        weight: newWeight.value
      })
    })
    if (!response.ok) {
      throw new Error('網路請求失敗')
    }
    const newWorkout = await response.json()
    workouts.value.push(newWorkout)
    newReps.value = ''
    newSets.value = ''
    newWeight.value = ''
  } catch (err) {
    console.error("提交數據失敗:", err)
  } finally {
    isSubmitting.value = false
  }
}


const handleWorkoutClick = () => {
  // router.push({ name: 'WorkoutDetail', params: { id: workout.id } })
}

onMounted(() => {
  fetchWorkouts()
})
</script>
