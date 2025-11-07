import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// IMPORTANT: base must match repo name for GitHub Pages under user site
export default defineConfig({
  plugins: [react()],
  base: '/WeatherApp/',
})
