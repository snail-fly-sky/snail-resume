import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/snail-resume/', // 仓库名称
  build: {
    outDir: 'docs'
  }
})
