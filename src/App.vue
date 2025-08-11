<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Importa tus layouts
import UserLayout from '@/layouts/UserLayout.vue'
import AdminLayout from '@/layouts/admin/AdminLayout.vue'


const route = useRoute()

// Determina qué layout usar según la ruta
const layoutComponent = computed(() => {
  const layout = route.meta.layout
  if (layout === 'admin') return AdminLayout
  return UserLayout // Por defecto
})
</script>

<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>
