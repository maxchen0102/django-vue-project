import { createRouter, createWebHistory } from 'vue-router'
import Home from "../components/Home.vue";
import ExerciseList from "../components/ExerciseList.vue";
import ExerciseMovements from "../components/ExerciseMovements.vue";
import WorkoutList from "../components/WorkoutList.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

const routes = [
  {
    path :'/login',
    name: 'Login',
    component: Login,
    meta:{requiresAuth: false}

  },
  {
    path :'/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{requiresAuth: true}
  },
  {
    path: '/exerciseList',
    name: 'ExerciseList',
    component: ExerciseList,
    meta:{requiresAuth: true}

  },
  {
    path: '/exercise/:id',
    name: 'ExerciseMovements',
    component: ExerciseMovements,
    meta:{requiresAuth: true}


  },
  {
    path: '/workoutList/:id',
    name: 'WorkoutList',
    component: WorkoutList,
    meta:{requiresAuth: true}

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') // 或其他验证登录状态的方法

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 需要登录但未登录时，重定向到登录页
    next({ name: 'Login', query: { redirect: to.fullPath }})
  } else {
    next()
  }
})


export default router