import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    include: ['exercises/**/*.test.{js,jsx}', 'src/**/*.test.{js,jsx}'],
    exclude: ['exercises/_template/**', 'node_modules/**'],
  },
})
