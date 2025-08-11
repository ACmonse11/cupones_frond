<script setup lang="ts">
import { ref } from 'vue'
import { HomeIcon, TagIcon, LayersIcon, UserRound, DollarSign, LogOut } from 'lucide-vue-next'

const menuItems = [
  { label: 'Inicio', icon: HomeIcon },
  { label: 'Cupones', icon: TagIcon },
  { label: 'Categorías', icon: LayersIcon },
  { label: 'Usuarios', icon: UserRound },
  { label: 'Descuentos', icon: DollarSign }
]

const activeTab = ref(menuItems[0].label)

function handleLogout() {
  // Aquí pones la lógica real para cerrar sesión, ej:
  // eliminar token, redirigir, etc.
  alert('Sesión cerrada')
  // Ejemplo redirección:
  // router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex bg-gray-100 text-gray-800">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h2 class="text-2xl font-bold mb-8 text-blue-600">Admin Panel</h2>
        <nav class="space-y-2">
          <div
            v-for="item in menuItems"
            :key="item.label"
            @click="activeTab = item.label"
            class="flex items-center gap-3 cursor-pointer px-4 py-3 rounded-lg transition"
            :class="{
              'bg-blue-100 text-blue-700 font-semibold': activeTab === item.label,
              'hover:bg-gray-100': activeTab !== item.label
            }"
          >
            <component :is="item.icon" class="w-5 h-5" />
            {{ item.label }}
          </div>
        </nav>
      </div>

      <!-- Botón Cerrar Sesión -->
      <button
        @click="handleLogout"
        class="mt-6 flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 font-semibold hover:bg-red-100 transition"
      >
        <LogOut class="w-5 h-5" />
        Cerrar Sesión
      </button>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-8 overflow-y-auto">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-blue-700">{{ activeTab }}</h1>
        <p class="text-gray-500">Bienvenido al panel de administración</p>
      </header>

      <slot />
    </main>
  </div>
</template>
