<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import { useLoginUserStore } from './stores/loginUser'

const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()

const route = useRoute()

// 根据路由元信息选择布局
const CurrentLayout = computed(() => {
  if (route.meta.layout === 'blank') {
    return BlankLayout
  }
  return BasicLayout
})
</script>

<template>
  <component :is="CurrentLayout" />
</template>

<style>
/* 全局样式优化 */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

html {
  overflow-x: hidden;
}
</style>
