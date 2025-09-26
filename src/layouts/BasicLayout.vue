<template>
  <a-layout class="basic-layout">
    <!-- 顶部导航栏 -->
    <GlobalHeader />
    <!-- 主要内容区域 -->
    <a-layout-content class="main-content">
      <router-view />
    </a-layout-content>
    <!-- 底部版权信息 -->
    <GlobalFooter />
  </a-layout>
</template>

<script setup lang="ts">
import GlobalFooter from '@/components/GlobalFooter.vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<style scoped>
.basic-layout {
  min-height: 100vh;
  background: linear-gradient(
    160deg,
    #f1f2ee 0%,
    #f1f2ee 25%,
    #68a5f4 50%,
    #f1f2ee 75%,
    #f1f2ee 100%
  );
  background-repeat: no-repeat;
  background-size: 100% 1800px; /* 600px为渐变区域高度，可调整 */
  background-color: #f1f2ee; /* 超过渐变区域后为纯色 */
}
/* .basic-layout {
  background: url('@/assets/bg.png') center/cover no-repeat;
} */

.main-content {
  width: 100%;
  padding: 0;
  background: none;
  margin: 0;
}
</style>
