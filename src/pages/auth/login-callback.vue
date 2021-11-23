<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div>
      <a href="#" @click="redirect">Redirect</a>
    </div>
  </div>
</template>

<script lang="ts">
import qs from 'query-string'
import { useAuthStore } from '~/stores/auth'

export default {
  setup() {
    const user = useAuthStore()
    return {
      user,
    }
  },
  methods: {
    redirect() {
      const params = qs.stringify({
        client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_OAUTH_CLIENT_REDIRECT,
        response_type: 'code',
      })
      const url = new URL(import.meta.env.VITE_OAUTH_AUTH_SERVER)

	  window.location.href = `${url.toString()}oauth/authorize?${params}`
    },
  },
}
</script>

<route lang="yaml">
meta:
  layout: auth
</route>
