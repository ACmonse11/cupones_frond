<template>
  <div v-if="mostrar" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg w-96">
      <h2 class="text-xl font-semibold mb-4">Agregar Cupón</h2>

      <form @submit.prevent="guardarCupon">
        <input
          v-model="nombre"
          type="text"
          placeholder="Nombre del cupón"
          class="border p-2 w-full mb-4"
        />

        <div class="flex justify-end">
          <button type="button" @click="$emit('cerrar')" class="mr-2">Cancelar</button>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  mostrar: Boolean
})

const emit = defineEmits(['cerrar', 'actualizado'])

const nombre = ref('')

const guardarCupon = async () => {
  try {
    await axios.post('http://127.0.0.1:8000/api/cupones', { nombre: nombre.value })
    emit('actualizado') // Avisar al padre que debe recargar
    emit('cerrar')
    nombre.value = ''
  } catch (error) {
    console.error('Error guardando cupón:', error)
  }
}
</script>
