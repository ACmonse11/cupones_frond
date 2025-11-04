import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

// 🧩 Crear app y Pinia
const app = createApp(App)
const pinia = createPinia()

// 🧠 Agregar Pinia y Router a la app
app.use(pinia)
app.use(router)

// ✅ Inicializar autenticación ANTES de montar la app
const auth = useAuthStore()


// 🚀 Montar la app después de cargar la sesión
app.mount('#app')
