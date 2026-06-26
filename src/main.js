import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import { useResumeStore } from './stores/resumeStore'
import 'element-plus/dist/index.css'
import './styles.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})

const resumeStore = useResumeStore(pinia)
resumeStore.$subscribe(() => {
  resumeStore.persist()
})

app.mount('#app')
