<template>
  <div class="app-card" :class="{ 'app-card--featured': featured }">
    <div class="app-preview">
      <img
        v-if="app.cover"
        :src="getAppCoverUrl(app.cover)"
        :alt="app.appName"
        loading="lazy"
        decoding="async"
      />
      <div v-else class="app-placeholder">
        <span>🤖</span>
      </div>
      <div class="app-overlay">
        <a-space>
          <a-button type="primary" @click="handleViewChat">查看对话</a-button>
          <a-button v-if="app.deployKey" type="default" @click="handleViewWork"
            >查看作品</a-button
          >
        </a-space>
      </div>
    </div>
    <div class="app-info">
      <div class="app-info-left">
        <a-avatar :src="app.user?.userAvatar" :size="40">
          {{ app.user?.userName?.charAt(0) || 'U' }}
        </a-avatar>
      </div>
      <div class="app-info-right">
        <h3 class="app-title">{{ app.appName || '未命名应用' }}</h3>
        <p class="app-author">
          {{ app.user?.userName || (featured ? '官方' : '未知用户') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAppCoverUrl } from '@/config/env'

interface Props {
  app: API.AppVO
  featured?: boolean
}

interface Emits {
  (e: 'view-chat', appId: string | number | undefined): void
  (e: 'view-work', app: API.AppVO): void
}

const props = withDefaults(defineProps<Props>(), {
  featured: false,
})

const emit = defineEmits<Emits>()

const handleViewChat = () => {
  emit('view-chat', props.app.id)
}

const handleViewWork = () => {
  emit('view-work', props.app)
}
</script>

<style scoped>
/* 优化版卡片样式：移除背板模糊与重阴影，降低 hover 位移 */
.app-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eef0f3;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease;
  /* 降低首次渲染成本：对屏外卡片延迟样式/布局计算 */
  content-visibility: auto;
  contain-intrinsic-size: 260px 320px;
}

.app-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.app-preview {
  height: 180px;
  background: #f6f8fa;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.app-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.app-placeholder {
  font-size: 42px;
  color: #cbd5e1;
}

/* 将 overlay 常驻显示但半透明，避免频繁透明度动画 */
.app-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

.app-card:hover .app-overlay {
  opacity: 1;
}

.app-info {
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-info-left {
  flex-shrink: 0;
}

.app-info-right {
  flex: 1;
  min-width: 0;
}

.app-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-author {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 辅助：减少动效对弱设备的影响 */
@media (prefers-reduced-motion: reduce) {
  .app-card {
    transition: none !important;
  }
}
</style>
