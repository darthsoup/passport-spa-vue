<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Login
        </h2>
      </div>
      <div v-if="error">
        {{ error }}
      </div>
      <form class="mt-8 space-y-6" method="POST" @submit.prevent="">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            >
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-white">
              Remember me
            </label>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="submit">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
              <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { useAuthStore } from '~/stores/auth'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const user = useAuthStore()
    const error = ref(null)
    const form = reactive({
      email: 'admin@localhost',
      password: 'password',
    })

    return {
      router,
      route,
      user,

      error,
      form,
    }
  },
  methods: {
    async submit() {
      this.error = null

      const url = new URL(import.meta.env.VITE_OAUTH_AUTH_SERVER)

      // const response = await axios.post(`${url.toString()}oauth/token`, {
      //   client_id: 2,
      //   client_secret: '8HMNUdm8Gh3QW6l6eKoi41R7SB8lLJoLkqvmlLwE',
      //   grant_type: 'password',
      //   username: this.form.email,
      //   password: this.form.password,
      // }).then(() => {})
      //   .catch((error) => {
      //     this.error = error.message
      //   })

      const response = await axios.post(`${url.toString()}api/passport/login`, {
        email: this.form.email,
        password: this.form.password,
      })
        .then((response) => {
          console.log(response.data)
          this.user.setToken(response.data.token)
          window.localStorage.setItem('accessToken', response.data.token)
          // window.localStorage.setItem('refreshToken', response.data.refresh_token)
          this.router.push('/')
        })
        .catch((error) => {
          this.error = error.message
        })
    },
  },
}
</script>

<route lang="yaml">
meta:
  layout: auth
</route>
