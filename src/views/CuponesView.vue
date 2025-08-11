<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Cupones</h1>

    <!-- Filtro de Categoría -->
    <div class="mb-6">
      <label for="categoria" class="block text-sm font-medium text-gray-700 mb-2">Selecciona una categoría:</label>
      <select id="categoria" v-model="categoriaSeleccionada" class="block w-full p-2 border border-gray-300 rounded-lg">
        <option value="">Todas</option>
        <option v-for="categoria in categorias" :key="categoria" :value="categoria">
          {{ categoria }}
        </option>
      </select>
    </div>

    <!-- Lista de Cupones -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="cupon in cuponesFiltrados"
        :key="cupon.id"
        class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <img :src="cupon.imagen" alt="Imagen del cupón" class="w-full h-40 object-cover" />
        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-800">{{ cupon.titulo }}</h2>
          <p class="text-gray-600 mt-2">{{ cupon.descripcion }}</p>
          <span class="inline-block mt-3 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            {{ cupon.descuento }}% OFF
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const categorias = ['Restaurantes', 'Ropa', 'Tecnología', 'Viajes']
const categoriaSeleccionada = ref('')

const cupones = ref([
  {
    id: 1,
    titulo: 'Descuento en Pizza',
    descripcion: 'Obtén un 20% de descuento en tu pedido de pizza.',
    descuento: 20,
    categoria: 'Restaurantes',
    imagen: 'https://source.unsplash.com/400x300/?pizza'
  },
  {
    id: 2,
    titulo: 'Oferta en Camisetas',
    descripcion: 'Compra 2 y lleva la tercera gratis.',
    descuento: 33,
    categoria: 'Ropa',
    imagen: 'https://source.unsplash.com/400x300/?tshirt'
  },
  {
    id: 3,
    titulo: 'Rebaja en Smartphones',
    descripcion: 'Ahorra hasta un 15% en modelos seleccionados.',
    descuento: 15,
    categoria: 'Tecnología',
    imagen: 'https://source.unsplash.com/400x300/?smartphone'
  }
])

const cuponesFiltrados = computed(() => {
  if (!categoriaSeleccionada.value) return cupones.value
  return cupones.value.filter(c => c.categoria === categoriaSeleccionada.value)
})
</script>

<style scoped>
</style>
