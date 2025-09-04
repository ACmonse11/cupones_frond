<template>
  <div v-if="mostrar" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg w-96">
      <h2 class="text-xl font-semibold mb-4">Editar Cupón</h2>

      <form @submit.prevent="editarCupon">
        <input
          v-model="nombre"
          type="text"
          placeholder="Nombre del cupón"
          class="border p-2 w-full mb-4"
        />

        <div class="flex justify-end">
          <button type="button" @click="$emit('cerrar')" class="mr-2">Cancelar</button>
          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">Actualizar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  mostrar: Boolean,
  cuponData: Object
})

const emit = defineEmits(['cerrar', 'actualizado'])

const nombre = ref('')

// Cuando cambie cuponData, actualizamos el input
watch(() => props.cuponData, (nuevo) => {
  nombre.value = nuevo ? nuevo.nombre : ''
})

const editarCupon = async () => {
  try {
    await axios.put(`http://127.0.0.1:8000/api/cupones/${props.cuponData?.id}`, {
      nombre: nombre.value
    })
    emit('actualizado')
    emit('cerrar')
  } catch (error) {
    console.error('Error editando cupón:', error)
  }
}
</script>
