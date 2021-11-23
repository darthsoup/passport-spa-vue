import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: window.localStorage.getItem('accessToken'),
    data: null,
  }),
  getters: {
    isLoggedIn(state) {
      return !!state.accessToken
    },
    token(state) {
      return state.accessToken
    },
    userData(state) {
      return state.data
    },
  },
  actions: {
    setToken(token: string) {
      this.accessToken = token
    },
    setData(data: any) {
      console.log(`store: ${data}`)
      this.data = data
    },
    logout() {
      window.localStorage.removeItem('accessToken')
      window.localStorage.removeItem('refreshToken')
      this.accessToken = null
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
