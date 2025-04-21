import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
     
  ],
  define: {
    'process.env.LARAVEL_SERVER':JSON.stringify(process.env.BASE_URL),
  }
})
