// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
    user: null
  }),

  actions: {
    setAuth(token: string) {
      this.accessToken = token
    },

    async login(credential: any) {

      const { $api } = useNuxtApp()
      console.log(credential)
      const response = await $api.post('students/auth/token', credential);

      const event = useRequestEvent();

      if (import.meta.server && event) {
        setCookie(event, 'access_token', response.data.token, {
          path: '/',
          httpOnly: false,
          maxAge: 60 * 60 * 24,
        });
      } else {
        const cookie = useCookie('access_token');
        cookie.value = response.data.token;
        this.accessToken = response.data.token;
      }
    },

    async loadUser() {
      const { $api } = useNuxtApp()
      try {
        const isActive = (await $api.post(`students/auth/introspect`, { token: this.accessToken })).data;
        if (isActive.valid) {
          const res = await $api.get('students/myInfo', {
            headers: { Authorization: `Bearer ${this.accessToken}` },
          })
          this.user = res.data;
        }
      } catch (err) {
        console.error('Lỗi loadUser:', err)
        this.clearAuth() 
      }
    },
    clearAuth() {
      this.accessToken = null
      this.user = null
      const cookie = useCookie('access_token')
      cookie.value = null
    },

    async logout() {
      const { $api } = useNuxtApp()
      await $api.post('students/auth/logout', { token: this.accessToken });

      this.accessToken = null
      this.user = null

      const cookie = useCookie('access_token')
      cookie.value = null
    }
  },

  persist: true
})
