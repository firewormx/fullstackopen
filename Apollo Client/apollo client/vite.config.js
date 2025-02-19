import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/': {
      target: 'http://localhost:4000/graphql',
      changeOrigin: true,
      secure: false,
    },
  },
})
