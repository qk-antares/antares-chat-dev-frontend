import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/user/login',
      name: '用户登录',
      component: () => import('@/pages/user/UserAuthPage.vue'),
      meta: { layout: 'blank', authTab: 'login' },
    },
    {
      path: '/user/register',
      name: '用户注册',
      component: () => import('@/pages/user/UserAuthPage.vue'),
      meta: { layout: 'blank', authTab: 'register' },
    },
    {
      path: '/admin/userManage',
      name: '用户管理',
      component: () => import('@/pages/admin/UserManagePage.vue'),
    },
    {
      path: '/admin/appManage',
      name: '应用管理',
      component: () => import('@/pages/admin/AppManagePage.vue'),
    },
    {
      path: '/app/chat/:id',
      name: '应用对话',
      component: () => import('@/pages/app/AppChatPage.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/app/edit/:id',
      name: '编辑应用',
      component: () => import('@/pages/app/AppEditPage.vue'),
    },
    {
      path: '/admin/chatManage',
      name: '对话管理',
      component: () => import('@/pages/admin/ChatManagePage.vue'),
    },
  ],
})

export default router
