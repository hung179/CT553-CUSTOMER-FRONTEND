// middleware/is-store-owner.ts
import { useAuthStore } from '~/stores/auth'
import { getUserId } from '~/utils/getUserId'
import { until } from '@vueuse/core'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const event = import.meta.server ? useRequestEvent() : undefined
  const userId = await getUserId(event)


  if (userId !== to.params.id) {
    return navigateTo(`/store/${to.params.id}/customer`)
  }
})
