import { createRouter, createWebHistory } from 'vue-router'
import Home from "../components/Home.vue";
import ExerciseList from "../components/ExerciseList.vue";
import ExerciseMovements from "../components/ExerciseMovements.vue";
import WorkoutList from "../components/WorkoutList.vue";

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
  },
  {
    path: '/workoutList/:id',
    name: 'WorkoutList',
    component: WorkoutList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router