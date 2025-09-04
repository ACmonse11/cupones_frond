<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ShoppingCart } from 'lucide-vue-next'

const isOpen = ref(false)
const cartItemsCount = ref(3) // Cambiar dinámicamente según tu carrito

// Cierra el menú cuando cambias de ruta
const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7x2 mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 border-b-2 border-[#69BBF0]">

      <!-- Logo principal -->
      <RouterLink to="/" class="text-2xl font-bold text-[#69BBF0]">
        MiTienda
      </RouterLink>

      <!-- Navegación principal (desktop) -->
      <nav class="hidden md:flex space-x-6 text-gray-700 font-serif">
        <RouterLink to="/" class="hover:text-[#69BBF0] transition">Inicio</RouterLink>
        <RouterLink to="/descuentos" class="hover:text-[#69BBF0] transition">Descuentos</RouterLink>
        <RouterLink to="/cupones" class="hover:text-[#69BBF0] transition">Cupones</RouterLink>
        <RouterLink to="/Noticias" class="hover:text-[#69BBF0] transition">Noticias</RouterLink>
        <RouterLink to="/contactanos" class="hover:text-[#69BBF0] transition">Contacto</RouterLink>
      </nav>

      <!-- Botones acción -->
      <div class="flex items-center space-x-3">
        <!-- Carrito -->
        <RouterLink to="/carrito" class="relative text-gray-700 hover:text-[#69BBF0] transition">
          <ShoppingCart class="w-7 h-7 md:w-8 md:h-8"/>
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] md:text-xs w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full"
          >
            {{ cartItemsCount }}
          </span>
        </RouterLink>

        <!-- Botón login (solo desktop visible) -->
        <RouterLink
          to="/iniciar-sesion"
          class="hidden md:block font-medium bg-[#69BBF0] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Iniciar sesión
        </RouterLink>

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
          <RouterLink to="/" @click="closeMenu" class="hover:text-[#69BBF0] transition">Inicio</RouterLink>
          <RouterLink to="/descuentos" @click="closeMenu" class="hover:text-[#69BBF0] transition">Descuentos</RouterLink>
          <RouterLink to="/cupones" @click="closeMenu" class="hover:text-[#69BBF0] transition">Cupones</RouterLink>
          <RouterLink to="/Noticias" @click="closeMenu" class="hover:text-[#69BBF0] transition">Noticias</RouterLink>
          <RouterLink to="/contactanos" @click="closeMenu" class="hover:text-[#69BBF0] transition">Contacto</RouterLink>
          <!-- Botón login móvil -->
          <RouterLink
            to="/iniciar-sesion"
            @click="closeMenu"
            class="w-full bg-[#69BBF0] text-white py-2 rounded-lg hover:bg-blue-700 transition text-center"
          >
            Iniciar sesión
          </RouterLink>
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
