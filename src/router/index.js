import { createRouter, createWebHistory } from 'vue-router'
import ResumeWorkbench from '../views/ResumeWorkbench.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ResumeWorkbench
    },
    {
      path: '/resumes/:resumeId',
      name: 'resume-detail',
      component: ResumeWorkbench
    }
  ]
})

export default router
