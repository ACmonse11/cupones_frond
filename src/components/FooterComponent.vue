<template>
  <footer class="bg-[#276796] text-white py-10">
    <div class="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">

      <!-- Información -->
      <div>
        <h3 class="text-2xl font-extrabold mb-4 tracking-wide">Gasta Y Gana</h3>
        <p class="text-sm leading-relaxed opacity-90">
          © 2025 Gasta Y Gana. Todos los derechos reservados.
        </p>
      </div>

      <!-- Navegación -->
      <div>
        <h4 class="text-lg font-semibold mb-4 border-b border-white/30 pb-2">Navegación</h4>
        <ul class="space-y-2 text-sm">
          <li><RouterLink to="/" class="hover:text-yellow-200 transition">Inicio</RouterLink></li>
          <li><RouterLink to="/cupones" class="hover:text-yellow-200 transition">Cupones</RouterLink></li>
          <li><RouterLink to="/descuentos" class="hover:text-yellow-200 transition">Descuentos</RouterLink></li>
          <li><RouterLink to="/contactanos" class="hover:text-yellow-200 transition">Contacto</RouterLink></li>
          <li><RouterLink to="/noticias" class="hover:text-yellow-200 transition">Noticias</RouterLink></li>
        </ul>
      </div>

      <!-- Contacto -->
      <div>
        <h4 class="text-lg font-semibold mb-4 border-b border-white/30 pb-2">Contacto</h4>
        <ul class="space-y-2 text-sm">
          <li class="flex items-center gap-2">
            📧 <span>soporte@mitienda.com</span>
          </li>
          <li class="flex items-center gap-2">
            📞 <span>+52 998 123 4567</span>
          </li>
          <li class="flex items-center gap-2">
            📍 <span>Ciudad, País</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Línea inferior -->
   
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
/* Puedes añadir un efecto de gradiente si quieres */
footer {
  background: linear-gradient(135deg, #000 0%, #276796 100%);
}
</style>
