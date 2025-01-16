

<template>
  <router-view></router-view>
</template>


<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()


const checkAuth=()=>{
  const token =localStorage.getItem('token')
   if (!token && route.name !== 'Login') {
    router.push('/login')
  }
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

checkAuth()

</script>
<style scoped>
</style>
