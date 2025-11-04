import { defineStore } from 'pinia'
import api from '../api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    isAdmin: (state) => state.user?.role === "admin",
  },

  actions: {
    async register(name: string, email: string, password: string) {
      const { data } = await api.post('/register', { name, email, password })
      return data
    },

    async login(email: string, password: string) {
      const { data } = await api.post('/login', { email, password })

      const token = data.access_token || data.token

      this.token = token
      this.user = data.user

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(data.user))

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      return data
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete api.defaults.headers.common['Authorization']
    },
  },
})
