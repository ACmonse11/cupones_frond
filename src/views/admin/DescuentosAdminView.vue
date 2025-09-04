<script setup lang="ts">

import { ref } from 'vue'

// Lista de cupones de ejemplo (luego puedes traerlos desde el backend)
const cupones = ref([
  {
    id: 1,
    nombre: 'Verano20',
    tipo: 'Porcentaje',
    valor: '20%',
    inicio: '2025-08-01',
    fin: '2025-08-31',
    estado: true
  },
  {
    id: 2,
    nombre: 'Bienvenida50',
    tipo: 'Monto fijo',
    valor: '$50',
    inicio: '2025-08-10',
    fin: '2025-09-10',
    estado: false
  }
])

// Acciones
const editarCupon = (id: number) => {
  alert(`✏️ Editar cupón con ID: ${id}`)
}

const eliminarCupon = (id: number) => {
  if (confirm('¿Seguro que deseas eliminar este cupón?')) {
    cupones.value = cupones.value.filter(c => c.id !== id)
  }
}
</script>

<template>
  <AdminLayout>
    <div class="p-6">
      <!-- Título y botón -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 class="text-2xl md:text-3xl font-semibold tracking-tight">Cupones / Descuentos</h1>
        <button
          class="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-blue-600 text-white hover:bg-indigo-700 transition shadow">
          + Crear Cupón
        </button>
      </div>

      <!-- Tabla en pantallas grandes -->
      <div class="hidden md:block bg-white shadow-md rounded-2xl overflow-hidden">
        <table class="min-w-full text-left border-collapse">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="py-3 px-4">ID</th>
              <th class="py-3 px-4">Nombre</th>
              <th class="py-3 px-4">Tipo</th>
              <th class="py-3 px-4">Valor</th>
              <th class="py-3 px-4">Inicio</th>
              <th class="py-3 px-4">Fin</th>
              <th class="py-3 px-4">Estado</th>
              <th class="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cup in cupones" :key="cup.id" class="border-t hover:bg-gray-50">
              <td class="py-3 px-4">{{ cup.id }}</td>
              <td class="py-3 px-4 font-medium">{{ cup.nombre }}</td>
              <td class="py-3 px-4">{{ cup.tipo }}</td>
              <td class="py-3 px-4">{{ cup.valor }}</td>
              <td class="py-3 px-4">{{ cup.inicio }}</td>
              <td class="py-3 px-4">{{ cup.fin }}</td>
              <td class="py-3 px-4">
                <span
                  :class="cup.estado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                  class="px-3 py-1 rounded-full text-sm font-medium">
                  {{ cup.estado ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="py-3 px-4 text-center space-x-2">
                <button @click="editarCupon(cup.id)"
                  class="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500">
                  Editar
                </button>
                <button @click="eliminarCupon(cup.id)"
                  class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Cards en pantallas pequeñas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        <div v-for="cup in cupones" :key="cup.id" class="bg-white shadow-md rounded-xl p-4 space-y-2">
          <div class="flex justify-between">
            <h2 class="font-bold text-lg">{{ cup.nombre }}</h2>
            <span
              :class="cup.estado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
              class="px-3 py-1 rounded-full text-xs font-medium self-start">
              {{ cup.estado ? 'Activo' : 'Inactivo' }}
            </span>
          </div>
          <p><span class="font-semibold">ID:</span> {{ cup.id }}</p>
          <p><span class="font-semibold">Tipo:</span> {{ cup.tipo }}</p>
          <p><span class="font-semibold">Valor:</span> {{ cup.valor }}</p>
          <p><span class="font-semibold">Inicio:</span> {{ cup.inicio }}</p>
          <p><span class="font-semibold">Fin:</span> {{ cup.fin }}</p>

          <div class="flex justify-end gap-2 pt-2">
            <button @click="editarCupon(cup.id)"
              class="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 text-sm">
              Editar
            </button>
            <button @click="eliminarCupon(cup.id)"
              class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
