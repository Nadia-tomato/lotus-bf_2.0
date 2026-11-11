// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // ✨ 新增或修改这一行
  base: '/lotus-bf/',

  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    allowedHosts: ['hpc.psy.ntu.edu.tw', 'localhost'],
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      '/terms': 'http://127.0.0.1:5000',
      '/query': 'http://127.0.0.1:5000',
      '/help': 'http://127.0.0.1:5000',
    }
  }
})

