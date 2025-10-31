<script setup lang="ts">
import { ref } from 'vue'
import { HomeIcon, TagIcon, LayersIcon, UserRound, DollarSign, LogOut, Menu, X } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false) // controla el menú mobile

const menuItems = [
  { label: 'Inicio', icon: HomeIcon, path: '/admin/dashboard' },
  { label: 'Usuarios', icon: UserRound, path: '/admin/usuarios' },
  { label: 'Cupones', icon: TagIcon, path: '/admin/cupones' },
  { label: 'Categorías', icon: LayersIcon, path: '/admin/categorias' }
]

const activeTab = ref(menuItems[0].label)

function handleLogout() {
  alert('Sesión cerrada')
  router.push('/')
}

function navigateTo(path: string, label: string) {
  activeTab.value = label
  router.push(path)
  isOpen.value = false // cerrar menú en móvil al navegar
}
</script>

<template>
  <div class="min-h-screen flex bg-gray-100 text-gray-800">
    <!-- Sidebar Desktop -->
    <aside class="hidden md:flex w-64 bg-white shadow-lg p-6 flex-col justify-between">
      <div>
        <h2 class="text-2xl font-bold mb-8 text-blue-600">Admin Panel</h2>
        <nav class="space-y-2">
          <div
            v-for="item in menuItems"
            :key="item.label"
            @click="navigateTo(item.path, item.label)"
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

    <!-- Sidebar Mobile -->
    <transition name="fade">
      <aside
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
        @click.self="isOpen = false"
      >
        <div class="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h2 class="text-2xl font-bold mb-8 text-blue-600">Admin Panel</h2>
            <nav class="space-y-2">
              <div
                v-for="item in menuItems"
                :key="item.label"
                @click="navigateTo(item.path, item.label)"
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
        </div>
      </aside>
    </transition>

    <!-- Main content -->
    <main class="flex-1 w-full p-6 bg-gray-50 relative">
      <!-- Topbar móvil -->
      <div class="md:hidden flex items-center justify-between mb-6">
        <!-- Botón hamburguesa a la izquierda -->
        <button @click="isOpen = !isOpen" class="text-gray-700">
          <Menu v-if="!isOpen" class="w-7 h-7" />
          <X v-else class="w-7 h-7" />
        </button>

        <!-- Título a la derecha -->
        <h1 class="text-xl font-bold text-blue-600 ml-auto">Admin Panel</h1>
      </div>

      <!-- Aquí se cargan las vistas dinámicas -->
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
