import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        sourceMaps: true,
        compact: false,
        comments: true,
      },
    }),
  ],

  server: {
    sourcemap: true,
  },

  esbuild: {
    minify: false,
    keepNames: true,
    legalComments: 'inline',
  },

  css: {
    modules: {
      generateScopedName: '[local]', // exact class names in dev
    },
  },

  build: {
    sourcemap: mode === 'development',
    minify: mode === 'production',
  },
}))
