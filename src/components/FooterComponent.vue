<template>
  <footer class="bg-blue-600 text-white py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">

      <!-- Información -->
      <div>
        <h3 class="text-xl font-bold mb-4">MiTienda</h3>
        <p class="text-sm">
          © 2025 MiTienda. Todos los derechos reservados.
        </p>
      </div>

      <!-- Navegación -->
      <div>
        <h4 class="font-semibold mb-3">Navegación</h4>
        <ul>
          <li><RouterLink to="/" class="hover:underline">Inicio</RouterLink></li>
          <li><RouterLink to="/cupones" class="hover:underline">Cupones</RouterLink></li>
          <li><RouterLink to="/contacto" class="hover:underline">Contacto</RouterLink></li>
        </ul>
      </div>

      <!-- Contacto -->
      <div>
        <h4 class="font-semibold mb-3">Contacto</h4>
        <p>Email: soporte@mitienda.com</p>
        <p>Tel: +52 998 123 4567</p>
        <p>Dirección: Ciudad, País</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
/* Estilos personalizados si quieres */
</style>
