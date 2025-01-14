<!-- components/ExerciseMovements.vue -->
<template>
  <div class="exercise-movements">
    <h2>{{ exercise?.name }} Movements</h2>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div
        v-for="movement in movements"
        :key="movement.id"
        class="movement-item"
      >
        {{ movement.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const exerciseId = route.params.id

const exercise = ref(null)
const movements = ref([])
const loading = ref(false)
const error = ref(null)

// 獲取 exercise 資訊和其相關的 movements
const fetchExerciseMovements = async () => {
  loading.value = true
  try {
    // 獲取 exercise 詳情
    const exerciseResponse = await axios.get(`/api/exercises/${exerciseId}`)
    exercise.value = exerciseResponse.data

    // 獲取相關的 movements
    const movementsResponse = await axios.get(`/api/exercises/${exerciseId}/movements`)
    movements.value = movementsResponse.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchExerciseMovements()
})
</script>

<style scoped>
.exercise-movements {
  padding: 20px;
}

.movement-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.movement-item:last-child {
  border-bottom: none;
}
</style>