import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Change 'nexus-start' to your repository name if deploying to https://<user>.github.io/<repo>/
  // If deploying to https://<user>.github.io/ (User site), remove the base property or set it to '/'
  base: '/nexus-start/', 
})