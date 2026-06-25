import { createRouter, createWebHistory } from 'vue-router'
import ResumeWorkbench from '../views/ResumeWorkbench.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ResumeWorkbench
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
