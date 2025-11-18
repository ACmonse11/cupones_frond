<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 🔥 Estado principal
const banners = ref<{ image_url: string }[]>([])
const logos = ref<{ image_url: string }[]>([])   // 👈 NUEVO
const currentIndex = ref(0)
const loading = ref(true)

// 🔥 Cargar banners
async function loadBanners() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/banners/activos")
    banners.value = await res.json()
  } finally {
    loading.value = false
  }
}

// 🔥 Cargar logos
async function loadLogos() {
  try {
    const res = await fetch("http://localhost:8000/api/logos/activos")
    logos.value = await res.json()
  } catch (error) {
    console.error("Error cargando logos:", error)
  }
}

// 🔥 Inicialización
onMounted(() => {
  loadBanners()
  loadLogos()   // 👈 IMPORTANTE

  setInterval(() => {
    if (banners.value.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % banners.value.length
    }
  }, 3000)
})
</script>

<template>
  <!-- HERO (BANNER PRINCIPAL) -->
  <section class="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
    <img
      v-if="banners.length"
      :src="banners[currentIndex].image_url"
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
    />

    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

    <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-6">
      <h1 class="text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg">
        Descuentos exclusivos en el Caribe
      </h1>

      <p class="mt-3 text-base md:text-lg lg:text-xl max-w-xl md:max-w-2xl">
        Vive Cancún, Playa del Carmen y Tulum con promociones únicas
      </p>


    </div>

    <div class="absolute bottom-4 md:bottom-6 w-full flex justify-center gap-2">
      <span
        v-for="(banner, i) in banners"
        :key="i"
        class="w-2 h-2 md:w-3 md:h-3 rounded-full transition"
        :class="i === currentIndex ? 'bg-white' : 'bg-gray-400/70'"
      />
    </div>
  </section>

  <main class="bg-gray-50">

    <!-- ¿QUÉ OFRECEMOS? -->
    <section class="py-16 px-4 md:px-12 lg:px-20 bg-white text-center">
      <h2 class="text-2xl md:text-3xl font-extrabold text-[#276796] mb-4">
        ¿Qué ofrece nuestra página?
      </h2>

      <div class="w-20 md:w-24 h-1 bg-[#276796] mx-auto mb-8 rounded"></div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-10">
        <div class="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
          <span class="text-4xl">🎟️</span>
          <h3 class="mt-4 font-bold text-[#276796]">Cupones</h3>
          <p class="text-gray-600">Entradas con descuento en parques y atracciones.</p>
        </div>

        <div class="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
          <span class="text-4xl">🍽️</span>
          <h3 class="mt-4 font-bold text-[#276796]">Restaurantes</h3>
          <p class="text-gray-600">Promociones en la mejor gastronomía local.</p>
        </div>

        <div class="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
          <span class="text-4xl">🌊</span>
          <h3 class="mt-4 font-bold text-[#276796]">Experiencias</h3>
          <p class="text-gray-600">Combos especiales para disfrutar el Caribe.</p>
        </div>
      </div>
    </section>

    <!-- LOGOS EN MOVIMIENTO -->
    <section class="py-12 bg-gray-100 overflow-hidden">
      <h3 class="text-center text-lg md:text-xl font-bold text-[#276796] mb-6 md:mb-8">
        Marcas con las que hemos trabajado
      </h3>

      <div class="slider">
        <div class="slide-track">

          <!-- LOGOS DINÁMICOS -->
          <img
            v-for="(logo, index) in logos"
            :key="'logo-'+index"
            :src="logo.image_url"
            class="logo"
          />

          <!-- DUPLICADOS PARA ANIMACIÓN INFINITA -->
          <img
            v-for="(logo, index) in logos"
            :key="'logo-dup-'+index"
            :src="logo.image_url"
            class="logo"
          />

        </div>
      </div>
    </section>

    <!-- FACEBOOK -->
    <section class="py-16 px-4 md:px-12 lg:px-20 bg-gray-50">
      <div class="flex justify-center">
        <div class="bg-white rounded-2xl shadow-lg p-8 md:p-10 w-full max-w-sm text-center border border-gray-200">
          <h3 class="text-lg md:text-xl font-bold text-[#276796] mb-4 flex items-center justify-center gap-2">
            <span>📱</span> Grupo de Memes XC
          </h3>

          <iframe
            src="https://www.facebook.com/tiodexc"
            width="100%" height="200"
            style="border:0"
            allowfullscreen loading="lazy"
            class="rounded-lg shadow-md"
          ></iframe>

          <a
            href="https://www.facebook.com/tiodexc"
            target="_blank"
            class="mt-6 inline-block bg-[#276796] text-white px-6 py-2 md:px-8 md:py-3 rounded-lg shadow hover:bg-[#1f4d73]"
          >
            Únete al grupo
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
/* ----------------- SLIDER LOGOS RESPONSIVO ----------------- */
.slider {
  height: 100px;
  overflow: hidden;
  width: 100%;
  position: relative;
}

@media (min-width: 768px) {
  .slider {
    height: 120px;
  }
}

.slide-track {
  display: flex;
  animation: scroll 20s linear infinite;
  width: calc(160px * (logos.length * 2)); /* Puedes ajustarlo luego dinámico */
}

.logo {
  height: 60px;
  margin: 0 25px;
  filter: none;
}

@media (min-width: 768px) {
  .logo {
    height: 75px;
    margin: 0 40px;
  }
}

@media (min-width: 1024px) {
  .logo {
    height: 90px;
    margin: 0 50px;
  }
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-160px * 4)); }
}
</style>
