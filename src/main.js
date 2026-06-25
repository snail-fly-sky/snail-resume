import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useResumeStore } from './stores/resumeStore'
import './styles.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const resumeStore = useResumeStore(pinia)
resumeStore.$subscribe(() => {
  resumeStore.persist()
})

app.mount('#app')
