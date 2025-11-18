<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ShoppingCart } from 'lucide-vue-next'
import { useAuthStore } from "@/stores/auth"

const isOpen = ref(false)
const cartItemsCount = ref(3)

const closeMenu = () => (isOpen.value = false)

const auth = useAuthStore()
const router = useRouter()

const cerrarSesion = async () => {
  await auth.logout()
  router.push("/login")
}
</script>

<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center h-20 border-b border-gray-200">

      <!-- Logo principal -->
      <RouterLink to="/" class="flex items-center space-x-3">
        <img
          src="@/img/GASTA (1).png"
          alt="Logo"
          class="h-12 w-12 object-cover rounded-full shadow-md"
        />

      </RouterLink>

      <!-- Navegación principal (desktop) -->
      <nav class="hidden md:flex space-x-8 text-gray-700 font-semibold">
        <RouterLink to="/" class="hover:text-[#276796] transition-colors">Inicio</RouterLink>
        <RouterLink to="/cupones" class="hover:text-[#276796] transition-colors">Cupones</RouterLink>
        <RouterLink to="/descuentos" class="hover:text-[#276796] transition-colors">Descuentos</RouterLink>
        <RouterLink to="/Noticias" class="hover:text-[#276796] transition-colors">Blog</RouterLink>
        <RouterLink to="/contactanos" class="hover:text-[#276796] transition-colors">Contacto</RouterLink>
      </nav>

      <!-- Botones acción -->
      <div class="flex items-center space-x-5">
        <!-- Carrito -->


        <!-- ✅ Si NO está logueado -->
        <RouterLink
          v-if="!auth.isAuthenticated"
          to="/login"
          class="hidden md:block font-medium bg-[#276796] text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Iniciar sesión
        </RouterLink>

        <!-- ✅ Si está logueado -->
        <button
          v-else
          @click="cerrarSesion"
          class="hidden md:block font-medium bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>

        <!-- Botón menú mobile -->
        <button @click="isOpen = !isOpen" class="md:hidden text-gray-600 focus:outline-none">
          <svg v-if="!isOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Menú mobile -->
    <transition name="fade">
      <div v-if="isOpen" class="md:hidden bg-white shadow-lg border-t border-gray-200">
        <nav class="flex flex-col px-6 py-6 space-y-4 text-gray-700 font-medium">
          <RouterLink to="/" @click="closeMenu" class="hover:text-[#276796] transition">Inicio</RouterLink>
          <RouterLink to="/descuentos" @click="closeMenu" class="hover:text-[#276796] transition">Descuentos</RouterLink>
          <RouterLink to="/cupones" @click="closeMenu" class="hover:text-[#276796] transition">Cupones</RouterLink>
          <RouterLink to="/Noticias" @click="closeMenu" class="hover:text-[#276796] transition">Noticias</RouterLink>
          <RouterLink to="/contactanos" @click="closeMenu" class="hover:text-[#276796] transition">Contacto</RouterLink>

          <!-- ✅ Login si no está logueado -->
          <RouterLink
            v-if="!auth.isAuthenticated"
            to="/login"
            @click="closeMenu"
            class="text-[#276796] font-semibold hover:text-blue-800"
          >
            Iniciar sesión
          </RouterLink>

          <!-- ✅ Logout si está logueado -->
          <button
            v-else
            @click="() => { cerrarSesion(); closeMenu(); }"
            class="text-red-600 font-bold hover:text-red-800"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
