import { defineConfig } from 'vitest/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer()],
  test: {
    environment: 'jsdom' // or 'happy-dom', 'node'
  },
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  }
})
