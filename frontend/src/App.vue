<template>
  <div>
    <h1>Vue + Django App GG</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const message = ref('')

onMounted(async () => {
  try {
    const response = await fetch('/api/hello/')
    const data = await response.json()
    message.value = data.message
  } catch (error) {
    console.error('Error:', error)
  }
})
</script>