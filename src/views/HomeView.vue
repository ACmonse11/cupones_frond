<template>
  <main class="bg-gray-100">
    <!-- ENCABEZADO -->
<section class="relative h-[300px] md:h-[350px] w-full overflow-hidden">
  <!-- Imágenes de fondo animadas -->
  <div class="flex w-[300%] h-full animate-slide">
    <img src="@/img/link.jpeg" alt="Imagen 1" class="w-1/3 h-full object-cover" />
    <img src="@/img/maxresdefault.jpg" alt="Imagen 2" class="w-1/3 h-full object-cover" />
    <img src="@/img/img5c7f741f3e220.jpg" alt="Imagen 3" class="w-1/3 h-full object-cover" />
  </div>

  <!-- Capa oscura transparente -->
  <div class="absolute inset-0 bg-black/20 z-10"></div>

  <!-- Texto centrado -->
  <div class="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4 text-center">
    <h1 class="text-3xl md:text-4xl font-bold mb-2">¡Bienvenido a nuestra página!</h1>
    <p class="text-base md:text-lg">Disfruta de nuestras promociones y novedades</p>
  </div>
</section>



    <!-- ¿QUÉ OFRECEMOS? -->
    <section class="py-12 px-4 md:px-20 bg-white text-center">
      <h2 class="text-2xl font-bold text-blue-600 mb-4">¿Qué ofrece nuestra página?</h2>
      <p class="text-gray-700 max-w-3xl mx-auto">
        Somos tu portal de descuentos exclusivo en Cancún. Encuentra los mejores <strong>cupones para parques acuáticos</strong>, <strong>promociones en restaurantes locales</strong>, entradas con descuento, combos especiales y más. ¡Ahorra mientras disfrutas al máximo tus vacaciones o fines de semana en el paraíso!
      </p>
    </section>

   <!-- CUPONES DESTACADOS CON IMÁGENES -->
<section class="py-8 px-4 md:px-16 bg-blue-50">
  <h2 class="text-xl font-bold text-blue-700 mb-6 text-center">Cupones destacados</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- Cupón 1 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <img src="@/img/maxresdefault.jpg" alt="Parque Xtreme Splash" class="w-full h-60 object-cover" />
      <div class="p-4 text-center">
        <h3 class="text-base font-semibold mb-1">Parque Xtreme Splash</h3>
        <p class="text-gray-700 text-sm mb-3">30% de descuento en entradas generales</p>
        <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Ver cupón</button>
      </div>
    </div>

    <!-- Cupón 2 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <img src="@/img/maxresdefault.jpg" alt="Restaurante Marisquísimo" class="w-full h-60 object-cover" />
      <div class="p-4 text-center">
        <h3 class="text-base font-semibold mb-1">Restaurante Marisquísimo</h3>
        <p class="text-gray-700 text-sm mb-3">2x1 en platillos seleccionados</p>
        <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Ver cupón</button>
      </div>
    </div>

    <!-- Cupón 3 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <img src="@/img/maxresdefault.jpg" alt="Aquaventuras Cancún" class="w-full h-60 object-cover" />
      <div class="p-4 text-center">
        <h3 class="text-base font-semibold mb-1">Aquaventuras Cancún</h3>
        <p class="text-gray-700 text-sm mb-3">Combo familiar por solo $999</p>
        <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Ver cupón</button>
      </div>
    </div>

    <!-- Cupón 4 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <img src="@/img/maxresdefault.jpg" alt="Spa Relajación Total" class="w-full h-60 object-cover" />
      <div class="p-4 text-center">
        <h3 class="text-base font-semibold mb-1">Spa Relajación Total</h3>
        <p class="text-gray-700 text-sm mb-3">20% de descuento en masajes</p>
        <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Ver cupón</button>
      </div>
    </div>
  </div>
</section>

    <!-- PROMOCIONES GENERALES -->
    <section class="py-12 px-4 md:px-20 bg-white">
      <h2 class="text-2xl font-bold text-blue-600 mb-8 text-center">Promociones generales</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-blue-100 p-6 rounded-xl shadow-md text-center">
          <h3 class="text-lg font-semibold mb-2">2x1 en productos seleccionados</h3>
          <p class="text-gray-700">Solo por tiempo limitado.</p>
        </div>
        <div class="bg-blue-100 p-6 rounded-xl shadow-md text-center">
          <h3 class="text-lg font-semibold mb-2">Envío gratis</h3>
          <p class="text-gray-700">En pedidos mayores a $500.</p>
        </div>
        <div class="bg-blue-100 p-6 rounded-xl shadow-md text-center">
          <h3 class="text-lg font-semibold mb-2">10% de descuento</h3>
          <p class="text-gray-700">Al pagar con tarjeta de crédito.</p>
        </div>
      </div>
    </section>

    <!-- SECCIÓN FINAL: FACEBOOK -->
    <section class="py-12 px-4 md:px-20 bg-white">
      <div class="flex flex-wrap justify-center gap-6">
        <div class="bg-white rounded-xl shadow-xl border-4 border-blue-500 p-6 w-[320px] flex flex-col items-center justify-center">
          <h3 class="text-lg font-bold text-blue-700 mb-4 text-center">Grupo de Memes XC</h3>
          <iframe
            src="https://www.facebook.com/tiodexc"
            width="300"
            height="200"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
// No necesitas JS adicional por ahora.
</script>

<style>
@keyframes slide {
  0% { transform: translateX(0); }
  33.33% { transform: translateX(-100%); }
  66.66% { transform: translateX(-200%); }
  100% { transform: translateX(0); }
}
.animate-slide {
  animation: slide 15s infinite ease-in-out;
}
</style>
