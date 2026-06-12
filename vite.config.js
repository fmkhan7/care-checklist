import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️  Replace 'care-checklist' with your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/care-checklist/',
})
