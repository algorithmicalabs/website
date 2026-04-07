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
        challenge: resolve(__dirname, 'challenge.html'),
        insights: resolve(__dirname, 'industry-insights.html'),
        rd: resolve(__dirname, 'rd.html'),
        post: resolve(__dirname, 'post.html'),
        rd_post: resolve(__dirname, 'rd-post.html'),
        terms: resolve(__dirname, 'terms.html'),
      },
    },
  },
})
