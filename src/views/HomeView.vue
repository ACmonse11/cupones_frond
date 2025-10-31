<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Importar imágenes
import imagen23 from '../img/cuponesprueba.jpg'
import imagen24 from '../img/cupon.jpg'
import imagen25 from '../img/cupon.jpg'
import imagen26 from '../img/cuponesprueba.jpg'
import banner from '../img/prueba.jpg'

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// Lista de imágenes para el banner
const bannerImages = [ banner]
const currentImageIndex = ref(0)

// Cambiar imagen cada 3 segundos
onMounted(() => {
  setInterval(() => {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % bannerImages.length
  }, 3000)
})
</script>

<template>
  <!-- BANNER COMPLETO -->
<!-- BANNER COMPLETO -->
<section class="bg-white">
  <div class="w-full relative overflow-hidden">
    <img
      v-for="(img, index) in bannerImages"
      :key="index"
      :src="img"
      alt="Banner promocional"
      class="w-full h-auto object-cover transition-opacity duration-1000"
      :class="{
        'opacity-100': currentImageIndex === index,
        'opacity-0': currentImageIndex !== index
      }"
    />
  </div>
</section>


  <main class="bg-gray-100">
    <!-- ¿QUÉ OFRECEMOS? -->
    <section class="py-12 px-4 md:px-20 bg-white text-center">
      <h2 class="text-2xl font-bold text-[#276796] mb-4">
        ¿Qué ofrece nuestra página?
      </h2>
      <p class="text-sm font-medium text-gray-700">
        Somos tu portal de descuentos en Cancún, Puerto Morelos, Playa del Carmen y Tulum. Encuentra los mejores
        <strong>cupones para parques acuáticos</strong>,
        <strong>promociones en restaurantes locales</strong>, entradas con
        descuento, combos especiales y más. ¡Ahorra mientras disfrutas al máximo
        tus vacaciones o fines de semana en el paraíso!
      </p>
    </section>

    <!-- CUPONES DESTACADOS -->
    <section class="py-8 px-4 font-medium md:px-16 bg-blue-50">
      <h2 class="text-xl font-bold text-[#276796] mb-6 text-center">
        Cupones destacados
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            :src="imagen23"
            alt="Parque Xtreme Splash"
            class="w-full h-60 object-cover"
          />
          <div class="p-4 text-center">
            <h3 class="text-base font-semibold mb-1">Parque Xtreme Splash</h3>
            <p class="text-gray-700 text-sm mb-3">
              30% de descuento en entradas generales
            </p>
            <button
              class="bg-[#276796] text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              Ver cupón
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            :src="imagen24"
            alt="Restaurante Marisquísimo"
            class="w-full h-60 object-cover"
          />
          <div class="p-4 text-center">
            <h3 class="text-base font-semibold mb-1">
              Restaurante Marisquísimo
            </h3>
            <p class="text-gray-700 text-sm mb-3">
              2x1 en platillos seleccionados
            </p>
            <button
              class="bg-[#276796] text-white px-3 py-1 rounded text-sm hover:bg-blue-500"
            >
              Ver cupón
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            :src="imagen25"
            alt="Aquaventuras Cancún"
            class="w-full h-60 object-cover"
          />
          <div class="p-4 text-center">
            <h3 class="text-base font-semibold mb-1">Aquaventuras Cancún</h3>
            <p class="text-gray-700 text-sm mb-3">
              Combo familiar por solo $999
            </p>
            <button
              class="bg-[#276796] text-white px-3 py-1 rounded text-sm hover:bg-blue-500"
            >
              Ver cupón
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            :src="imagen26"
            alt="Spa Relajación Total"
            class="w-full h-60 object-cover"
          />
          <div class="p-4 text-center">
            <h3 class="text-base font-semibold mb-1">Spa Relajación Total</h3>
            <p class="text-gray-700 text-sm mb-3">
              20% de descuento en masajes
            </p>
            <button
              class="bg-[#276796] text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              Ver cupón
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN FINAL: FACEBOOK -->
    <section class="py-12 px-4 md:px-20 bg-white">
      <div class="flex flex-wrap justify-center gap-6">
        <div
          class="bg-white rounded-xl shadow-xl border-4 border-blue-500 p-6 w-[320px] flex flex-col items-center justify-center"
        >
          <h3 class="text-lg font-bold text-blue-700 mb-4 text-center">
            Grupo de Memes XC
          </h3>
          <iframe
            src="https://www.facebook.com/tiodexc"
            width="300"
            height="200"
            style="border: 0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  </main>
</template>
