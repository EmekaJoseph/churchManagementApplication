import { useAuthStore } from "~/stores/authStore"

export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuthStore()

  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }
})
