<template>
  <div class="p-4 sm:p-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
    <h1 class="text-2xl md:text-3xl font-semibold tracking-tight">Cupones</h1>
    <button
      @click="$emit('abrir-agregar')"
      class="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-blue-600 text-white hover:bg-indigo-700 transition shadow"
    >
      + Agregar Cupón
    </button>
    </div>


    <div v-if="cupones.length">
      <ul>
        <li
          v-for="cupon in cupones"
          :key="cupon.id"
          class="flex justify-between items-center border-b py-2"
        >
          {{ cupon.nombre }}
          <button
            @click="$emit('abrir-editar', cupon)"
            class="text-blue-500 hover:underline"
          >
            Editar
          </button>
        </li>
      </ul>
    </div>
    <p v-else>No hay cupones disponibles</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const cupones = ref<any[]>([])

const cargarCupones = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/cupones')
    cupones.value = response.data
  } catch (error) {
    console.error('Error cargando cupones:', error)
  }
}

onMounted(() => {
  cargarCupones()
})

// Exponer el método al componente padre
defineExpose({ cargarCupones })

// Definir eventos permitidos
defineEmits(['abrir-agregar', 'abrir-editar'])
</script>
