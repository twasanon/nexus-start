import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    // Use '/' for local development so you can access http://localhost:5173/ directly.
    // Use '/nexus-start/' only for production build (GitHub Pages).
    base: command === 'serve' ? '/' : '/nexus-start/',
    define: {
      // This prevents "Uncaught ReferenceError: process is not defined" in the browser
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      'process.env': {}
    }
  }
})