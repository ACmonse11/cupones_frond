<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <RouterLink to="/" class="text-2xl font-bold text-red-600">
        MiTienda
      </RouterLink>

      <nav class="hidden md:flex space-x-6 text-gray-700 font-medium relative">
        <RouterLink to="/" class="text-red-600 transition hover:underline">Inicio</RouterLink>
        <!-- <div class="relative">
          <button @click="isCategoriesOpen = !isCategoriesOpen" class="text-red-600 transition hover:underline flex items-center">
            Categorías
          </button>
          <div v-if="isCategoriesOpen" class="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Restaurantes</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Comer y Beber</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Bar & Club</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Entretenimiento</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Tiendas</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Salud</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Belleza</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Automotriz</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Servicios</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Viajes</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Deportes</a>
          </div>
        </div> -->
        <RouterLink to="/descuentos" class="text-red-600 transition hover:underline">Descuentos</RouterLink>
        <RouterLink to="/cupones" class="text-red-600 transition hover:underline">Cupones</RouterLink>
        <RouterLink to="/destacados" class="text-red-600 transition hover:underline">Destacados</RouterLink>
        <RouterLink to="/contactanos" class="text-red-600 transition hover:underline">Contacto</RouterLink>
      </nav>

      <div class="hidden md:block">
        <button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
          Iniciar sesión
        </button>
      </div>

      <button @click="isOpen = !isOpen" class="md:hidden text-gray-600 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <div v-if="isOpen" class="md:hidden bg-white shadow-md">
      <nav class="flex flex-col px-4 py-4 space-y-2 text-gray-700">
        <RouterLink to="/descuentos" class="text-red-600 transition hover:underline">Descuentos</RouterLink>
        <RouterLink to="/cupones" class="text-red-600 transition hover:underline">Cupones</RouterLink>
        <RouterLink to="/destacados" class="text-red-600 transition hover:underline">Destacados</RouterLink>
        <RouterLink to="/contactanos" class="text-red-600 transition hover:underline">Contacto</RouterLink>
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
const isCategoriesOpen = ref(false)
</script>
