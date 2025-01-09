// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ExerciseList from '../components/ExerciseList.vue'    // 列表頁面
import ExerciseDetail from '../components/ExerciseDetail.vue' // 詳細頁面
import WorkoutRecord from "../components/WorkoutRecord.vue";

const routes = [
  {
    path: '/',
    redirect: '/exercises'  // 根路徑重定向到列表頁
  },
  {
    path: '/exercises',
    name: 'exercises',
    component: ExerciseList
  },
  {
    path: '/exercise/:id',  // 動態路由參數
    name: 'exercise-detail',
    component: ExerciseDetail
  },
  {
    path: '/WorkoutRecord/:movement_id',
    name: 'workout-record',
    component: WorkoutRecord
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router