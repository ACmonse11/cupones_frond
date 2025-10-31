import { defineStore } from 'pinia'
import api from '../api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as any,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,

    isAdmin: (state) =>
      String(state.user?.role || '')
        .toLowerCase()
        .includes('admin'),
  },

  actions: {
    // ✅ Inicializar sesión desde localStorage
    initializeAuth() {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user') || 'null')

      if (token && user) {
        this.token = token
        this.user = user
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        this.logout()
      }
    },

    // ✅ Registro
    async register(name: string, email: string, password: string) {
      const { data } = await api.post('/register', { name, email, password })
      return data
    },

    // ✅ Login
    async login(email: string, password: string) {
      const { data } = await api.post('/login', { email, password })

      this.token = data.access_token || data.token
      this.user = data.user

      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user))

      api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

      return data
    },

    // ✅ Logout
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete api.defaults.headers.common['Authorization']
    },
  },
})
