import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          // Ant Design Vue v4 使用 CSS-in-JS，无需注入组件样式导入
          importStyle: false,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          antd: ['ant-design-vue', '@ant-design/icons-vue'],
          markdown: ['markdown-it', 'highlight.js'],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8001,
    allowedHosts: ['chatdev.fffu.fun'],
  },
})
