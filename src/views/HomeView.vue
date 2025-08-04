<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="bg-yellow-50 py-16 px-4 md:px-10 text-center">
    <h1 class="text-4xl md:text-5xl font-extrabold text-red-600 mb-4">
      ¡Descarga Cuponerapp y ahorra con los mejores cupones!
    </h1>
    <p class="text-lg md:text-xl text-gray-700 mb-8">
      Únete a 736,958 usuarios y disfruta de promociones, descuentos y regalos exclusivos.
    </p>
    <img
      src="https://cdn-icons-png.flaticon.com/512/1047/1047718.png"
      alt="Cupones y Promociones"
      class="mx-auto w-48 md:w-64 mb-6"
    />
    <div class="flex flex-col md:flex-row justify-center gap-4 mb-6">
      <a href="https://www.apple.com/app-store/" target="_blank">
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          alt="App Store"
          class="h-12"
        />
      </a>
      <a href="https://play.google.com/store" target="_blank">
        <img
          src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
          alt="Google Play"
          class="h-12"
        />
      </a>
      <a href="https://appgallery.huawei.com/" target="_blank">
        <img
          src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp/appgallery/appgallery_badge_en.png"
          alt="App Gallery"
          class="h-12"
        />
      </a>
    </div>
    <RouterLink to="/promociones">
      <button class="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700 transition">
        Ver promociones disponibles
      </button>
    </RouterLink>
  </section>

  <section class="py-12 px-4 md:px-10 bg-white">
    <h2 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
      ¿Por qué elegir Cuponerapp?
    </h2>
    <div class="grid md:grid-cols-3 gap-8 text-center">
      <div>
        <span class="text-5xl text-red-500">🎟️</span>
        <h3 class="text-xl font-semibold mt-4">Descuentos Exclusivos</h3>
        <p class="text-gray-600 mt-2">Ahorra en cine, restaurantes, viajes y más con nuestras ofertas.</p>
      </div>
      <div>
        <span class="text-5xl text-red-500">📱</span>
        <h3 class="text-xl font-semibold mt-4">Fácil de Usar</h3>
        <p class="text-gray-600 mt-2">Paga en la app y muestra tu código en el establecimiento.</p>
      </div>
      <div>
        <span class="text-5xl text-red-500">🎁</span>
        <h3 class="text-xl font-semibold mt-4">Promociones y Regalos</h3>
        <p class="text-gray-600 mt-2">Gira la ruleta y participa por premios y descuentos adicionales.</p>
      </div>
    </div>
  </section>

  <section class="bg-gray-100 py-12 px-4 md:px-10">
    <h2 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
      Algunas de Nuestras Promociones
    </h2>
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-red-600">Combo Nachos</h3>
        <p class="text-gray-600">Por solo $94</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-red-600">Boleto Platino</h3>
        <p class="text-gray-600">Por solo $122</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-red-600">2x1 en Helado Chico</h3>
        <p class="text-gray-600">¡Disfruta con un amigo!</p>
      </div>
    </div>
    <div class="text-center mt-8">
      <RouterLink to="/promociones">
        <button class="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700 transition">
          Ver todas las promociones
        </button>
      </RouterLink>
    </div>
  </section>
</template>
