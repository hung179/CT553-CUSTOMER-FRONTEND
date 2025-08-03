import tailwindcss from "@tailwindcss/vite";
import path from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 plugins: [
    '~/plugins/pinia-plugin.client.ts',
    '~/plugins/axios.ts'
  ],
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  srcDir: 'src/',
  modules: ['@nuxt/ui', '@nuxt/icon', '@nuxt/image', '@pinia/nuxt' ],
  alias: {
    '@': path.resolve(__dirname, './src')
  },

  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ],
    optimizeDeps: {
    include: ['form-data']
  },
  ssr: {
    noExternal: ['form-data'] 
  }
  },
    runtimeConfig: {
        public: {
            apiBase: "http://localhost:3000", // Địa chỉ API backend
        },
    },
})