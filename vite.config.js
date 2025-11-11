import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // sorgt für korrekte Pfade auf Vercel
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
})