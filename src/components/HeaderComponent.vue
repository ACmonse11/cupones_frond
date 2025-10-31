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
    <div class="max-w-7x2 mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 border-b-2 border-[#569E4C]">

      <!-- Logo principal -->
     <RouterLink to="/" class="flex items-center">
  <img
    src="@/img/GMXC.jpg"
    alt="Logo MiTienda"
    class="h-15 w-15 object-cover rounded-full"
  />
</RouterLink>


      <!-- Navegación principal (desktop) -->
      <nav class="hidden md:flex space-x-6 text-[#569E4C] font-bold">
        <RouterLink to="/" class="hover:text-[#134A00] transition">Inicio</RouterLink>
        <RouterLink to="/descuentos" class="hover:text-[#134A00] transition">Descuentos</RouterLink>
        <RouterLink to="/cupones" class="hover:text-[#134A00] transition">Cupones</RouterLink>
        <RouterLink to="/Noticias" class="hover:text-[#134A00] transition">Blog</RouterLink>
        <RouterLink to="/contactanos" class="hover:text-[#134A00] transition">Contacto</RouterLink>
      </nav>

      <!-- Botones acción -->
      <div class="flex items-center space-x-3">
       
        <RouterLink
  to="/login"
  class="hidden md:block font-medium bg-[#276796] text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
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
  to="/login"
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
