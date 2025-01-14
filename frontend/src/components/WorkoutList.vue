

<template>
  <div>
    <h1>Workout List</h1>
    <div v-for="workout in workouts" :key="workout.id">
      <h2>{{ workout.name }}</h2>
      <p>{{ workout.description }}</p>
  </div>
  </div>

</template>

<script setup>
import { useRouter,useRoute} from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const movement_id = route.params.id
const workouts = ref([])
const showModal = ref(false)

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

onMounted(() => {
  fetchWorkouts()
})


</script>

<style scoped>

</style>