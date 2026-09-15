import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Served from GitHub Pages at /gb-the-baby-spot/
export default defineConfig({
  base: '/gb-the-baby-spot/',
  plugins: [react(), tailwindcss()],
})
