import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/medab/' // Buraya GitHub'daki reponun tam adını yazdım (MedAB olduğunu varsayarak)
})