import { createRouter, createWebHistory } from 'vue-router'
import Home from "../components/Home.vue";
import ExerciseList from "../components/ExerciseList.vue";
import ExerciseMovements from "../components/ExerciseMovements.vue";

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
  },
  {
      path: '/exercise/:id',
    name: 'ExerciseMovements',
    component: ExerciseMovements
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router