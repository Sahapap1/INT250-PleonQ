import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false)
  const user = ref(null)

  const login = (userData) => {
    isAuth.value = true
    user.value = userData
    localStorage.setItem('isAuth', 'true')
  }

  const logout = () => {
    isAuth.value = false
    user.value = null
    localStorage.removeItem('isAuth')
  }

  return { isAuth, user, login, logout }
})