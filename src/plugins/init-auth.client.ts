export default defineNuxtPlugin( async () => {
  const authStore = useAuthStore()
  const token = useCookie('access_token').value

  if (token) {
    authStore.setAuth(token)
    await authStore.loadUser()
  }else{
    authStore.clearAuth();
  }
})
