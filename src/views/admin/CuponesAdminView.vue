<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'
import { PlusCircle, Pencil, Trash2, Search } from 'lucide-vue-next'

// ==== Tipos ====
interface Category {
  id: number
  name: string
}

interface Coupon {
  id: number
  title: string
  code: string
  description: string
  discount: number
  expiration_date: string
  status: 'Activo' | 'Inactivo'
  image?: string
  category_id: number | null
  category?: Category
}

// ==== Estado ====
const coupons = ref<Coupon[]>([])
const categories = ref<Category[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const showModal = ref(false)
const isEditing = ref(false)
const imagePreview = ref<string | null>(null)
const imageFile = ref<File | null>(null)

const form = reactive<Partial<Coupon>>({
  title: '',
  code: '',
  description: '',
  discount: 0,
  expiration_date: '',
  category_id: null,
  status: 'Activo',
})

// ==== Rutas API ====
const API_COUPONS = 'http://127.0.0.1:8000/api/coupons'
const API_CATEGORIES = 'http://127.0.0.1:8000/api/categories'

// ==== Cargar datos ====
async function fetchCoupons() {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get(API_COUPONS)
    coupons.value = res.data
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function fetchCategories() {
  try {
    const res = await axios.get(API_CATEGORIES)
    categories.value = res.data
  } catch (err: any) {
    console.error('Error cargando categorías:', err)
  }
}

onMounted(() => {
  fetchCoupons()
  fetchCategories()
})

// ==== Manejar imagen ====
function handleFileUpload(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    imageFile.value = target.files[0]
    imagePreview.value = URL.createObjectURL(imageFile.value)
  }
}

// ==== CRUD ====
async function saveCoupon() {
  try {
    const formData = new FormData()

    // ✅ Agregamos manualmente los campos
    formData.append('title', form.title || '')
    formData.append('code', form.code || '')
    formData.append('description', form.description || '')
    formData.append('discount', form.discount?.toString() || '0')
    formData.append('expiration_date', form.expiration_date || '')
    formData.append('status', form.status || 'Activo')
    if (form.category_id) formData.append('category_id', form.category_id.toString())

    // ✅ Asegurarse de incluir el archivo
    if (imageFile.value) {
      formData.append('image', imageFile.value)
    }

    if (isEditing.value && form.id) {
      await axios.post(`${API_COUPONS}/${form.id}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } else {
      await axios.post(API_COUPONS, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }

    // Limpiar estados
    showModal.value = false
    imageFile.value = null
    imagePreview.value = null
    await fetchCoupons()
  } catch (err: any) {
    console.error('Error al guardar cupón:', err.response?.data || err)
    alert('Error al guardar: ' + (err.response?.data?.message || err.message))
  }
}

async function deleteCoupon(id: number) {
  if (!confirm('¿Eliminar este cupón?')) return
  try {
    await axios.delete(`${API_COUPONS}/${id}`)
    await fetchCoupons()
  } catch (err: any) {
    alert('Error al eliminar: ' + err.message)
  }
}

function openCreate() {
  isEditing.value = false
  imagePreview.value = null
  imageFile.value = null
  Object.assign(form, {
    id: undefined,
    title: '',
    code: '',
    description: '',
    discount: 0,
    expiration_date: '',
    category_id: null,
    status: 'Activo',
  })
  showModal.value = true
}

function openEdit(coupon: Coupon) {
  isEditing.value = true
  Object.assign(form, coupon)
  imagePreview.value = coupon.image ? `http://127.0.0.1:8000/storage/${coupon.image}` : null
  imageFile.value = null
  showModal.value = true
}

// ==== Filtro + Paginación ====
const q = ref('')
const filtered = computed(() => {
  const query = q.value.toLowerCase()
  return coupons.value.filter(c => c.title.toLowerCase().includes(query))
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
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Gestión de Cupones</h1>
        <p class="text-gray-500 text-sm">Crea, edita o elimina cupones con imagen, categoría y estado.</p>
      </div>
      <button
        @click="openCreate"
        class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
        <PlusCircle class="w-4 h-4" /> Nuevo cupón
      </button>
    </div>

    <!-- Buscar -->
    <div class="flex items-center mb-4 gap-2 border rounded-lg px-3 py-2 bg-white shadow-sm max-w-md">
      <Search class="w-4 h-4 text-gray-500" />
      <input v-model="q" placeholder="Buscar cupón..." class="outline-none w-full text-sm" />
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto bg-white shadow rounded-lg">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 text-gray-700">
          <tr>
            <th class="px-4 py-3 text-left">Imagen</th>
            <th class="px-4 py-3 text-left">Título</th>
            <th class="px-4 py-3 text-left">Código</th>
            <th class="px-4 py-3 text-left">Descuento</th>
            <th class="px-4 py-3 text-left">Categoría</th>
            <th class="px-4 py-3 text-left">Estado</th>
            <th class="px-4 py-3 text-left">Vence</th>
            <th class="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="8" class="text-center py-6 text-gray-500">Cargando...</td>
          </tr>
          <tr v-else-if="error">
            <td colspan="8" class="text-center py-6 text-red-500">{{ error }}</td>
          </tr>
          <tr v-else-if="!paged.length">
            <td colspan="8" class="text-center py-6 text-gray-500">Sin resultados</td>
          </tr>
          <tr v-for="c in paged" :key="c.id" class="border-t hover:bg-gray-50">
            <td class="px-4 py-3">
              <img
                v-if="c.image"
                :src="`http://127.0.0.1:8000/storage/${c.image}`"
                class="w-14 h-14 rounded-lg object-cover border"
              />
              <span v-else class="text-gray-400 text-xs italic">Sin imagen</span>
            </td>
            <td class="px-4 py-3 font-medium">{{ c.title }}</td>
            <td class="px-4 py-3 text-gray-700">{{ c.code }}</td>
            <td class="px-4 py-3 text-gray-600">{{ c.discount }}%</td>
            <td class="px-4 py-3 text-gray-700">{{ c.category?.name || 'Sin categoría' }}</td>
            <td class="px-4 py-3">
              <span class="px-2 py-1 rounded-full text-xs font-medium"
                :class="c.status === 'Activo' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'">
                {{ c.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-gray-500 text-xs">{{ new Date(c.expiration_date).toLocaleDateString() }}</td>
            <td class="px-4 py-3 flex justify-center gap-2">
              <button @click="openEdit(c)" class="p-2 hover:bg-gray-100 rounded-lg">
                <Pencil class="w-4 h-4 text-blue-600" />
              </button>
              <button @click="deleteCoupon(c.id)" class="p-2 hover:bg-gray-100 rounded-lg">
                <Trash2 class="w-4 h-4 text-red-600" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Crear/Editar -->
    <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl w-full max-w-lg shadow-xl">
        <div class="p-5 border-b">
          <h2 class="text-lg font-semibold">{{ isEditing ? 'Editar Cupón' : 'Nuevo Cupón' }}</h2>
        </div>
        <div class="p-5 grid grid-cols-1 gap-4">
          <div>
            <label class="text-sm text-gray-700">Título</label>
            <input v-model="form.title" class="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Código</label>
            <input v-model="form.code" placeholder="(Opcional)" class="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Descripción</label>
            <textarea v-model="form.description" rows="3" class="w-full border rounded-lg px-3 py-2 text-sm"></textarea>
          </div>
          <div>
            <label class="text-sm text-gray-700">Descuento (%)</label>
            <input type="number" v-model="form.discount" class="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Fecha de expiración</label>
            <input type="date" v-model="form.expiration_date" class="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Categoría</label>
            <select v-model="form.category_id" class="w-full border rounded-lg px-3 py-2 text-sm">
              <option value="">Sin categoría</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div>
            <label class="text-sm text-gray-700">Estado</label>
            <select v-model="form.status" class="w-full border rounded-lg px-3 py-2 text-sm">
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <!-- Imagen -->
          <div>
            <label class="text-sm text-gray-700">Imagen</label>
            <input type="file" @change="handleFileUpload" accept="image/*" class="w-full border rounded-lg px-3 py-2 text-sm" />
            <div v-if="imagePreview" class="mt-2">
              <img :src="imagePreview" class="w-32 h-32 object-cover rounded-lg border" />
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 border-t p-4">
          <button @click="showModal = false" class="px-4 py-2 border rounded-lg">Cancelar</button>
          <button @click="saveCoupon" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>
