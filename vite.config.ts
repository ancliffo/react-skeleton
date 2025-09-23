import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react()
  ],
  server: {
    watch: {
      ignored: [
        '**/tests/**',
        '**/test-results/**',
        '**/playwright-report/**',
        '**/blob-report/**',
        '**/playwright/.cache/**'
      ]
    }
  }
})
