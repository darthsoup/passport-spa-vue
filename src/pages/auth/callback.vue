<template>
  <div class="">
    Logging you in...
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { useAuthStore } from '~/stores/auth'

export default {
  setup() {
    const user = useAuthStore()
    const router = useRouter()
    const route = useRoute()

    onMounted(async() => {
      try {
        const url = new URL(import.meta.env.VITE_OAUTH_AUTH_SERVER)
        const response = await axios.post(`${url.toString()}oauth/token`, {
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
          client_secret: import.meta.env.VITE_OAUTH_CLIENT_SECRET,
          redirect_uri: import.meta.env.VITE_OAUTH_CLIENT_REDIRECT,
          code: route.query.code,
        })

        user.setToken(response.data.access_token)
        window.localStorage.setItem('accessToken', response.data.access_token)
        window.localStorage.setItem('refreshToken', response.data.refresh_token)
        router.push('/')
      }
      catch (error) {
        console.error(error)
        router.push('/')
      }
    })
    return {
      user,
    }
  },
}
</script>

<route lang="yaml">
meta:
  layout: auth
</route>
