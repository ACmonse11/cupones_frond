<!-- src/views/RecomendacionesView.vue -->
<script setup>
import { ref } from "vue";
const nombre = ref("");
const comentario = ref("");
const calificacion = ref(0);
const recomendaciones = ref([]);
import { onMounted } from 'vue'


onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const setRating = (valor) => {
  calificacion.value = valor;
};

const enviarRecomendacion = () => {
  if (!nombre.value || !comentario.value || calificacion.value === 0) {
    alert("Por favor completa todos los campos y califica.");
    return;
  }

  recomendaciones.value.push({
    nombre: nombre.value,
    comentario: comentario.value,
    calificacion: calificacion.value,
    fecha: new Date().toLocaleDateString()
  });

  nombre.value = "";
  comentario.value = "";
  calificacion.value = 0;
};
</script>
<template>
  <div class="flex justify-center px-4 py-12 bg-gray-50 min-h-screen">
    <div class="w-full max-w-2xl">
      <!-- Título principal -->
      <h1 class="text-4xl font-extrabold text-center text-[#276796] mb-10 tracking-wide">
        ⭐ Recomendaciones de nuestros usuarios
      </h1>

      <!-- Formulario -->
      <div class="bg-white shadow-lg rounded-2xl p-8 mb-12 border border-gray-200">
        <h2 class="text-xl font-semibold mb-6 text-gray-800">Deja tu comentario</h2>

        <input
          v-model="nombre"
          type="text"
          placeholder="Tu nombre"
          class="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#276796] transition"
        />

        <textarea
          v-model="comentario"
          rows="4"
          placeholder="Escribe tu comentario..."
          class="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#276796] transition"
        ></textarea>

        <!-- Calificación -->
        <div class="flex items-center mb-6 space-x-2">
          <span
            v-for="n in 5"
            :key="n"
            @click="setRating(n)"
            class="cursor-pointer text-2xl transition"
            :class="n <= calificacion ? 'text-yellow-400' : 'text-gray-300'"
          >
            ★
          </span>
        </div>

        <button
          @click="enviarRecomendacion"
          class="w-full bg-[#276796] hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Enviar recomendación
        </button>
      </div>

      <!-- Lista de recomendaciones -->
      <div>
        <h2 class="text-xl font-semibold mb-6 text-gray-800">💬 Comentarios recientes</h2>

        <div
          v-if="recomendaciones.length === 0"
          class="text-gray-500 italic text-center py-6"
        >
          No hay recomendaciones aún. ¡Sé el primero en dejar tu comentario!
        </div>

        <div
          v-for="(rec, index) in recomendaciones"
          :key="index"
          class="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition"
        >
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold text-gray-800">{{ rec.nombre }}</span>
            <span class="text-xs text-gray-400">{{ rec.fecha }}</span>
          </div>
          <div class="flex text-yellow-400 mb-2 text-lg">
            <span v-for="n in rec.calificacion" :key="n">★</span>
          </div>
          <p class="text-gray-700 text-sm leading-relaxed">{{ rec.comentario }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
