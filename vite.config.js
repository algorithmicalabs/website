import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        solutions: resolve(__dirname, 'solutions.html'),
        process: resolve(__dirname, 'process.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
