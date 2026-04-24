import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Heroapp2.0/', // 🔥 ESTO ES LA CLAVE
  plugins: [react()],
})