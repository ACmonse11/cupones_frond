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
  <div class="flex justify-center px-4 py-8">
    <div class="w-full max-w-xl">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-6">
        Recomendaciones de la página de cupones
      </h1>

      <!-- Formulario -->
      <div class="bg-white shadow-md rounded-lg p-5 mb-8">
        <h2 class="text-lg font-semibold mb-4">Deja tu comentario</h2>

        <input
          v-model="nombre"
          type="text"
          placeholder="Tu nombre"
          class="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <textarea
          v-model="comentario"
          rows="3"
          placeholder="Escribe tu comentario..."
          class="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        ></textarea>

        <!-- Calificación -->
        <div class="flex items-center mb-4 space-x-1">
          <span
            v-for="n in 5"
            :key="n"
            @click="setRating(n)"
            class="cursor-pointer text-xl"
            :class="n <= calificacion ? 'text-yellow-400' : 'text-gray-300'"
          >
            ★
          </span>
        </div>

        <button
          @click="enviarRecomendacion"
          class="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg transition"
        >
          Enviar
        </button>
      </div>

      <!-- Lista de recomendaciones -->
      <div>
        <h2 class="text-lg font-semibold mb-4">Comentarios recientes</h2>
        <div
          v-if="recomendaciones.length === 0"
          class="text-gray-500 italic"
        >
          No hay recomendaciones aún.
        </div>

        <div
          v-for="(rec, index) in recomendaciones"
          :key="index"
          class="bg-gray-50 border rounded-lg p-3 mb-3 shadow-sm"
        >
          <div class="flex justify-between items-center mb-1">
            <span class="font-semibold">{{ rec.nombre }}</span>
            <span class="text-xs text-gray-400">{{ rec.fecha }}</span>
          </div>
          <div class="flex text-yellow-400 mb-1 text-sm">
            <span v-for="n in rec.calificacion" :key="n">★</span>
          </div>
          <p class="text-gray-700 text-sm">{{ rec.comentario }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
