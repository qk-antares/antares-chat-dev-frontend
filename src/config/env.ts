/**
 * 环境变量配置
 */

import { CodeGenTypeEnum } from '@/utils/codeGenTypes'

// 应用封面图地址
export const APP_COVER_BASE_URL =
  import.meta.env.VITE_APP_COVER_BASE_URL ||
  'https://chatdev.fffu.fun/screenshots'

// 应用部署域名
export const DEPLOY_DOMAIN =
  import.meta.env.VITE_DEPLOY_DOMAIN || 'https://chatdev.fffu.fun/demo'

// API 基础地址
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://chatdev.fffu.fun/api'

// 静态资源地址
export const STATIC_BASE_URL = `${API_BASE_URL}/static`

// 获取封面图完整URL
export const getAppCoverUrl = (cover: string) => {
  return `${APP_COVER_BASE_URL}/${cover}`
}

// 获取部署应用的完整URL
export const getDeployUrl = (deployKey: string) => {
  return `${DEPLOY_DOMAIN}/${deployKey}`
}

// TODO: 获取静态资源预览URL
export const getStaticPreviewUrl = (codeGenType: string, appId: string) => {
  const baseUrl = `${STATIC_BASE_URL}/${codeGenType}_${appId}/`
  // 如果是 Vue 项目，浏览地址需要添加 dist 后缀
  if (codeGenType === CodeGenTypeEnum.VUE_PROJECT) {
    return `${baseUrl}dist/index.html`
  }
  return baseUrl
}
