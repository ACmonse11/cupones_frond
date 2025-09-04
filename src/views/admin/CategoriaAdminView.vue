<template>
  <AdminLayout>
    <div class="p-4 sm:p-6">
      <!-- Encabezado -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 class="text-2xl md:text-3xl font-semibold tracking-tight">Categorías</h1>
        <button
          @click="agregarCategoria"
          class="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-blue-600 text-white hover:bg-indigo-700 transition shadow"
        >
          + Agregar Categoría
        </button>
      </div>

      <!-- Grid de Categorías -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="categoria in categorias"
          :key="categoria.id"
          class="bg-white p-4 sm:p-5 rounded-xl shadow-md hover:shadow-xl transition flex flex-col justify-between"
        >
          <!-- Encabezado de tarjeta -->
          <div class="flex items-center gap-3 mb-3">
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full"
              :class="categoria.color"
            >
              <span class="text-white text-lg font-bold">
                {{ categoria.icon }}
              </span>
            </div>
            <h2 class="text-base sm:text-lg font-semibold text-gray-700">
              {{ categoria.nombre }}
            </h2>
          </div>

          <!-- Descripción -->
          <p class="text-gray-500 text-sm sm:text-base mb-4">
            {{ categoria.descripcion }}
          </p>

          <!-- Botones -->
          <div class="flex justify-end gap-2 pt-2">
            <button
              @click="editarCategoria(categoria)"
              class="bg-yellow-400 text-white px-3 py-2 rounded-lg hover:bg-yellow-500 transition text-sm sm:text-base"
            >
              Editar
            </button>
            <button
              @click="eliminarCategoria(categoria.id)"
              class="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition text-sm sm:text-base"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay categorías -->
      <p v-if="categorias.length === 0" class="text-center text-gray-400 mt-6">
        No hay categorías registradas.
      </p>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Categoria {
  id: number
  nombre: string
  descripcion: string
  color: string
  icon: string
}

const categorias = ref<Categoria[]>([
  {
    id: 1,
    nombre: 'Electrónica',
    descripcion: 'Dispositivos y gadgets electrónicos.',
    color: 'bg-blue-500',
    icon: '📱'
  },
  {
    id: 2,
    nombre: 'Ropa',
    descripcion: 'Moda y accesorios para todas las edades.',
    color: 'bg-pink-500',
    icon: '👗'
  }
])

const agregarCategoria = () => alert('Agregar categoría')
const editarCategoria = (categoria: Categoria) => alert(`Editar: ${categoria.nombre}`)
const eliminarCategoria = (id: number) => {
  if (confirm('¿Eliminar esta categoría?')) {
    categorias.value = categorias.value.filter(c => c.id !== id)
  }
}
</script>
