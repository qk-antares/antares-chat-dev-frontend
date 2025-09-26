<template>
  <a-layout-footer class="footer">
    <div class="footer-content">
      <p class="copyright">
        ©2025 ChatDev 版权所有

        <a
          href="https://github.com/qk-antares"
          target="_blank"
          rel="noopener noreferrer"
          class="author-link"
          style="margin-left: 16px; color: #666; font-size: 14px"
        >
          <GithubOutlined /> GitHub 地址
        </a>
      </p>
    </div>
  </a-layout-footer>
</template>

<script setup lang="ts">
import { GithubOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.footer {
  text-align: center;
  background: transparent;
  margin-bottom: 16px;
}

.copyright {
  color: #666;
  font-size: 14px;
}
</style>
