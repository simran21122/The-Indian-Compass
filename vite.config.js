import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/wishlist": "http://localhost:5000",
      "/likes": "http://localhost:5000"
    }
  }
})
