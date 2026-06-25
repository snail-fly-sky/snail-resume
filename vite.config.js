import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/snail-resume/',
  build: {
    outDir: 'docs'
  }
})
