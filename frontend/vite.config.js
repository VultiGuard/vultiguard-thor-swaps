import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/vultiguard-thor-swaps/frontend/',  // Codespaces path
  root: '.',  // Serve from frontend/
  publicDir: 'public',
  build: {
    outDir: '../dist'  // Deploy to repo root dist/
  }
})