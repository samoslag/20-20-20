import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Timer from '../views/Timer.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Timer',
    component: Timer
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
