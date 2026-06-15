import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,          // Cambia la porta del dev server
    open: true,          // Apre il browser automaticamente
  },
  resolve: {
    alias: {
      '@': '/src',       // Alias per import assoluti: import Foo from '@/components/Foo'
    },
  },
  build: {
    outDir: 'dist',      // Cartella output per la build (default già 'dist')
  },
})