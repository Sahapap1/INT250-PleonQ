import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(sessionStorage.getItem('isAuth') === 'true')
  const user = ref(JSON.parse(sessionStorage.getItem('user')) || null)

  const login = (userData) => {
    isAuth.value = true
    user.value = userData
    sessionStorage.setItem('isAuth', 'true')
    sessionStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    isAuth.value = false
    user.value = null
    sessionStorage.removeItem('isAuth')
    sessionStorage.removeItem('user')
  }

  return { isAuth, user, login, logout }
})