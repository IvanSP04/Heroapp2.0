import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Heroapp2.0/', // 🔥 ESTO ES LO QUE FALTABA
})