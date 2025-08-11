<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-center">
    <h1 class="text-6xl font-bold text-red-600 mb-4">404</h1>
    <p class="text-xl text-gray-700 mb-6">Página no encontrada</p>
    <RouterLink to="/" class="text-blue-600 underline">Volver al inicio</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
