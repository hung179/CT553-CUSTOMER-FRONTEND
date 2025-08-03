// middleware/is-store-owner.ts
import { getUserId } from '~/utils/getUserId'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const event = import.meta.server ? useRequestEvent() : undefined
  const userId = await getUserId(event)


  if (userId === to.params.id) {
    return navigateTo(`/store/${to.params.id}/manage`)
  }
})
