<script setup lang="ts">
import axios from 'axios'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const { t } = useI18n()

onMounted(async() => {
  if (!auth.isLoggedIn)
    return

  try {
    const response = await axios.get(`${import.meta.env.VITE_OAUTH_AUTH_SERVER}/api/user`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    auth.setData(response.data)
  }
  catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="space-x-2">
    <router-link to="/auth/login" class="bg-green-900 px-3 py-1 rounded font-bold text-white">
      Login
    </router-link>
    <router-link to="/auth/login-callback" class="bg-green-900 px-3 py-1 rounded font-bold text-white">
      Callback
    </router-link>
    <button v-if="auth.isLoggedIn" class="bg-red-500 px-3 py-1 rounded font-bold text-white" @click="auth.logout()">
      Logout
    </button>
    <div class="py-4" />

    <div v-if="auth.isLoggedIn" class="content">
      Hello <strong>{{ auth.userData?.name }} 👋</strong>
    </div>
    <div v-else>
      Not logged in
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
