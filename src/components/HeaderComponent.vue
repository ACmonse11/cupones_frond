<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <!-- Logo -->
      <RouterLink to="/" class="text-2xl font-bold text-red-600">
        MiTienda
      </RouterLink>

      <!-- Menú Desktop -->
      <nav class="hidden md:flex space-x-6 text-gray-700 font-medium">
        <RouterLink to="/" class="text-red-600 transition hover:underline">Inicio</RouterLink>
        <RouterLink to="/productos" class="text-red-600 transition hover:underline">Productos</RouterLink>
        <RouterLink to="/contacto" class="text-red-600 transition hover:underline">Contacto</RouterLink>
        <RouterLink to="/acerca" class="text-red-600 transition hover:underline">Acerca de</RouterLink>
        <RouterLink to="/cupones" class="text-red-600 transition hover:underline">Cupones</RouterLink>
      </nav>

      <!-- Botón -->
      <div class="hidden md:block">
        <button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
          Iniciar sesión
        </button>
      </div>

      <!-- Botón hamburguesa móvil -->
      <button @click="isOpen = !isOpen" class="md:hidden text-gray-600 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Menú móvil -->
    <div v-if="isOpen" class="md:hidden bg-white shadow-md">
      <nav class="flex flex-col px-4 py-4 space-y-2 text-gray-700">
        <RouterLink to="/" class="hover:text-green-600">Inicio</RouterLink>
        <RouterLink to="/productos" class="hover:text-green-600">Productos</RouterLink>
        <RouterLink to="/contacto" class="hover:text-green-600">Contacto</RouterLink>
        <RouterLink to="/acerca" class="hover:text-green-600">Acerca de</RouterLink>
        <RouterLink to="/cupones" class="hover:text-green-600">Cupones</RouterLink>
        <button class="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Iniciar sesión
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
</script>

<style scoped>
/* Puedes agregar estilos personalizados si lo necesitas */
</style>
