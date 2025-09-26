<template>
  <div id="userAuthPage">
    <div class="header">
      <img class="logo" src="@/assets/logo.png" alt="Logo" />
      <img :style="{ height: '18px' }" src="@/assets/title.svg" alt="Logo" />
    </div>

    <div class="desc">不写一行代码，生成完整应用</div>
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="login" tab="登录">
        <a-form
          :model="loginForm"
          autocomplete="off"
          @finish="handleLoginSubmit"
        >
          <a-form-item
            name="userAccount"
            :rules="[{ required: true, message: '请输入账号' }]"
          >
            <a-input
              v-model:value="loginForm.userAccount"
              placeholder="请输入账号"
            >
              <template #prefix><UserOutlined style="color: #bbb" /></template>
            </a-input>
          </a-form-item>
          <a-form-item
            name="userPassword"
            :rules="[
              { required: true, message: '请输入密码' },
              { min: 8, message: '密码长度不能小于 8 位' },
            ]"
          >
            <a-input-password
              v-model:value="loginForm.userPassword"
              placeholder="请输入密码"
            >
              <template #prefix><LockOutlined style="color: #bbb" /></template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              style="width: 100%"
              :loading="loading"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="register" tab="注册">
        <a-form
          :model="registerForm"
          autocomplete="off"
          @finish="handleRegisterSubmit"
        >
          <a-form-item
            name="userAccount"
            :rules="[{ required: true, message: '请输入账号' }]"
          >
            <a-input
              v-model:value="registerForm.userAccount"
              placeholder="请输入账号"
            >
              <template #prefix><UserOutlined style="color: #bbb" /></template>
            </a-input>
          </a-form-item>
          <a-form-item
            name="userPassword"
            :rules="[
              { required: true, message: '请输入密码' },
              { min: 8, message: '密码不能小于 8 位' },
            ]"
          >
            <a-input-password
              v-model:value="registerForm.userPassword"
              placeholder="请输入密码"
            >
              <template #prefix><LockOutlined style="color: #bbb" /></template>
            </a-input-password>
          </a-form-item>
          <a-form-item
            name="checkPassword"
            :rules="[
              { required: true, message: '请确认密码' },
              { min: 8, message: '密码不能小于 8 位' },
              { validator: validateCheckPassword },
            ]"
          >
            <a-input-password
              v-model:value="registerForm.checkPassword"
              placeholder="请确认密码"
            >
              <template #prefix><LockOutlined style="color: #bbb" /></template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              style="width: 100%"
              :loading="loading"
            >
              注册
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { userLogin, userRegister } from '@/api/userController'
import { useLoginUserStore } from '@/stores/loginUser'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const loginUserStore = useLoginUserStore()

// 活动 tab (login | register)
const activeKey = ref<'login' | 'register'>(
  (route.meta.authTab as 'login' | 'register') || 'login',
)

watch(
  () => route.meta.authTab,
  val => {
    if (val && val !== activeKey.value) {
      activeKey.value = val as 'login' | 'register'
    }
  },
)

const loginForm = reactive<API.UserLoginRequest>({
  userAccount: '',
  userPassword: '',
})

const registerForm = reactive<API.UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
})

const loading = ref(false)

// 切换标签时更新路由（保持两个路径均可访问）
const onTabChange = (key: string) => {
  if (key === 'login') {
    router.replace({ path: '/user/login' })
  } else if (key === 'register') {
    router.replace({ path: '/user/register' })
  }
}

// 校验确认密码
const validateCheckPassword = (
  _rule: unknown,
  value: string,
  callback: (error?: Error) => void,
) => {
  if (value && value !== registerForm.userPassword) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

// 登录
const handleLoginSubmit = async (values: API.UserLoginRequest) => {
  loading.value = true
  try {
    const res = await userLogin(values)
    if (res.data.code === 0 && res.data.data) {
      await loginUserStore.fetchLoginUser()
      message.success('登录成功')
      router.push({ path: '/', replace: true })
    } else {
      message.error('登录失败，' + res.data.message)
    }
  } finally {
    loading.value = false
  }
}

// 注册
const handleRegisterSubmit = async (values: API.UserRegisterRequest) => {
  loading.value = true
  try {
    const res = await userRegister(values)
    if (res.data.code === 0) {
      message.success('注册成功，已自动切换到登录')
      activeKey.value = 'login'
      router.replace({ path: '/user/login' })
    } else {
      message.error('注册失败，' + res.data.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
#userAuthPage {
  background: white;
  max-width: 480px;
  padding: 32px 32px 16px;
  margin: 96px auto;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
}

.header {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
}

.logo {
  height: 32px;
  width: 32px;
}

.title {
  text-align: center;
  margin-bottom: 0px;
  font-size: 22px;
  color: #1890ff;
}

.desc {
  text-align: center;
  color: #888;
  margin-bottom: 24px;
  font-size: 13px;
}

/* 优化 tabs 间距 */
:deep(.ant-tabs-nav) {
  margin-bottom: 24px;
}

:deep(.ant-tabs-tab) {
  font-size: 16px;
  font-weight: 500;
}
</style>
