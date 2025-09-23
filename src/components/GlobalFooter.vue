<template>
  <a-layout-footer class="footer">
    <div class="footer-content">
      <p class="copyright">
        <a
          href="https://github.com/qk-antares"
          target="_blank"
          rel="noopener noreferrer"
          class="author-link"
        >
          @2024 Antares Chat Dev. All Rights Reserved.
        </a>
      </p>
    </div>
  </a-layout-footer>
</template>

<script setup lang="ts">
// 无需额外的响应式数据
</script>

<style scoped>
.footer {
  background: #ffffff;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  /* 轻量阴影，避免大半径模糊 */
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
}

.copyright {
  margin: 0;
  color: #666;
  font-size: 14px;
}
</style>
