<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'
import { PlusCircle, Pencil, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-vue-next'

// ====== Tipos ======
interface Category {
  id: number
  name: string
  description?: string
  created_at?: string
}

// ====== Estado ======
const categories = ref<Category[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const showModal = ref(false)
const isEditing = ref(false)
const form = reactive<Partial<Category>>({
  name: '',
  description: ''
})

// ====== URL base del backend ======
const API_URL = 'http://127.0.0.1:8000/api/categories'

// ====== Funciones CRUD ======
async function fetchCategories() {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get(API_URL)
    categories.value = res.data
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchCategories)

async function saveCategory() {
  try {
    if (!form.name?.trim()) {
      alert('El nombre es obligatorio')
      return
    }

    if (isEditing.value && form.id) {
      await axios.put(`${API_URL}/${form.id}`, form)
    } else {
      await axios.post(API_URL, form)
    }

    showModal.value = false
    await fetchCategories()
  } catch (err: any) {
    alert('Error al guardar: ' + err.message)
  }
}

async function deleteCategory(id: number) {
  if (!confirm('¿Eliminar esta categoría?')) return
  try {
    await axios.delete(`${API_URL}/${id}`)
    await fetchCategories()
  } catch (err: any) {
    alert('Error al eliminar: ' + err.message)
  }
}

// ====== Abrir modal ======
function openCreate() {
  isEditing.value = false
  Object.assign(form, { id: undefined, name: '', description: '' })
  showModal.value = true
}

function openEdit(category: Category) {
  isEditing.value = true
  Object.assign(form, category)
  showModal.value = true
}

// ====== Búsqueda y paginación ======
const q = ref('')
const filtered = computed(() => {
  const query = q.value.toLowerCase()
  return categories.value.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.description?.toLowerCase().includes(query)
  )
})

const page = ref(1)
const pageSize = 10
const totalPages = computed(() => Math.ceil(filtered.value.length / pageSize))
const paged = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))

function nextPage() { if (page.value < totalPages.value) page.value++ }
function prevPage() { if (page.value > 1) page.value-- }
</script>

<template>
  <div class="p-6">
    <!-- Encabezado -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Gestión de Categorías</h1>
        <p class="text-gray-500 text-sm">Crea, edita o elimina categorías de cupones.</p>
      </div>
      <button
        @click="openCreate"
        class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">
        <PlusCircle class="w-4 h-4" /> Nueva categoría
      </button>
    </div>

    <!-- Búsqueda -->
    <div class="flex items-center mb-4 gap-2 border rounded-lg px-3 py-2 bg-white shadow-sm max-w-md">
      <Search class="w-4 h-4 text-gray-500" />
      <input v-model="q" placeholder="Buscar categoría..." class="outline-none w-full text-sm" />
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto bg-white shadow rounded-lg">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 text-gray-700">
          <tr>
            <th class="px-4 py-3 text-left">Nombre</th>
            <th class="px-4 py-3 text-left">Descripción</th>
            <th class="px-4 py-3 text-left">Creado el</th>
            <th class="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="4" class="text-center py-6 text-gray-500">Cargando...</td>
          </tr>
          <tr v-else-if="error">
            <td colspan="4" class="text-center py-6 text-red-500">{{ error }}</td>
          </tr>
          <tr v-else-if="!paged.length">
            <td colspan="4" class="text-center py-6 text-gray-500">Sin resultados</td>
          </tr>
          <tr v-for="c in paged" :key="c.id" class="border-t hover:bg-gray-50">
            <td class="px-4 py-3 font-medium">{{ c.name }}</td>
            <td class="px-4 py-3 text-gray-600">{{ c.description || '—' }}</td>
            <td class="px-4 py-3 text-gray-500 text-xs">{{ c.created_at ? new Date(c.created_at).toLocaleDateString() : '-' }}</td>
            <td class="px-4 py-3 flex justify-center gap-2">
              <button @click="openEdit(c)" class="p-2 hover:bg-gray-100 rounded-lg">
                <Pencil class="w-4 h-4 text-blue-600" />
              </button>
              <button @click="deleteCategory(c.id)" class="p-2 hover:bg-gray-100 rounded-lg">
                <Trash2 class="w-4 h-4 text-red-600" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginación -->
    <div class="flex justify-between items-center mt-4 text-sm">
      <span class="text-gray-600">Página {{ page }} de {{ totalPages }}</span>
      <div class="flex gap-2">
        <button @click="prevPage" :disabled="page === 1" class="px-3 py-1 border rounded disabled:opacity-50">Anterior</button>
        <button @click="nextPage" :disabled="page === totalPages" class="px-3 py-1 border rounded disabled:opacity-50">Siguiente</button>
      </div>
    </div>

    <!-- Modal Crear/Editar -->
    <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl w-full max-w-lg shadow-xl">
        <div class="p-5 border-b">
          <h2 class="text-lg font-semibold">{{ isEditing ? 'Editar Categoría' : 'Nueva Categoría' }}</h2>
        </div>
        <div class="p-5 grid grid-cols-1 gap-4">
          <div>
            <label class="text-sm text-gray-700">Nombre</label>
            <input v-model="form.name" class="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Descripción</label>
            <textarea v-model="form.description" rows="3" class="w-full border rounded-lg px-3 py-2 text-sm"></textarea>
          </div>
        </div>
        <div class="flex justify-end gap-2 border-t p-4">
          <button @click="showModal = false" class="px-4 py-2 border rounded-lg">Cancelar</button>
          <button @click="saveCategory" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>
