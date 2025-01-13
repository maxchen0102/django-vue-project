import { createRouter, createWebHistory } from 'vue-router'
import Home from "../components/Home.vue";
import ExerciseList from "../components/ExerciseList.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/exerciseList',
    name: 'ExerciseList',
    component: ExerciseList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router