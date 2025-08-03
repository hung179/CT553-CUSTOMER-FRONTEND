export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const authStore = useAuthStore()
  const isPublicPage = (to.path === '/login')

  // 🔥 Chờ Pinia hydrate xong (nếu truy cập trực tiếp từ Google/bookmark)
  await new Promise(resolve => setTimeout(resolve, 100))

  // Không phải trang public -> kiểm tra token + người dùng
  if (!isPublicPage) {
    if (!authStore.accessToken) {
      return navigateTo('/login')
    }

    // Gọi loadUser để kiểm tra token có hợp lệ không
    try {
      await authStore.loadUser()
    } catch (error) {
      console.error('Middleware auth: lỗi loadUser()', error)
      return navigateTo('/login')
    }
  }
})
