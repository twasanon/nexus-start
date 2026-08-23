import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  // Production base must match where GitHub Pages serves this repo
  // (https://twasanon.github.io/nexus-start/). Defaults to '/nexus-start/';
  // override with PAGES_BASE (e.g. PAGES_BASE=/atrium/) only once the
  // repo/site actually moves.
  const pagesBase = process.env.PAGES_BASE || env.PAGES_BASE || '/nexus-start/';

  return {
    plugins: [react()],
    // Use '/' for local development so you can access http://localhost:5173/ directly.
    // Production builds publish under PAGES_BASE ('/nexus-start/' by default).
    base: command === 'serve' ? '/' : pagesBase,
    define: {
      // This prevents "Uncaught ReferenceError: process is not defined" in the browser
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      'process.env': {}
    }
  }
})