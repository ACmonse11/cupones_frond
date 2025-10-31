<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { UserPlus, Pencil, Trash2, ChevronLeft, ChevronRight, Search } from 'lucide-vue-next'
import { getUsers, createUser, updateUser, deleteUser } from '@/api/users'

// ===== Tipos =====
interface User {
  id: number
  name: string
  email: string
  role: 'Administrador' | 'Editor' | 'Cliente'
  status: 'Activo' | 'Inactivo'
  last_login?: string
}

type SortKey = keyof Pick<User, 'name' | 'email' | 'role' | 'status' | 'last_login'>

// ===== Estado =====
const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const q = ref('')
const roleFilter = ref<'Todos' | User['role']>('Todos')
const statusFilter = ref<'Todos' | User['status']>('Todos')

const page = ref(1)
const pageSize = ref(10)

const sortBy = ref<SortKey>('name')
const sortDir = ref<'asc' | 'desc'>('asc')

// ===== Funciones API =====
async function fetchUsers() {
  loading.value = true
  error.value = null
  try {
    const { data } = await getUsers()
    users.value = data
  } catch (e: any) {
    console.error('Error al cargar usuarios', e)
    error.value = 'No se pudieron cargar los usuarios.'
  } finally {
    loading.value = false
  }
}

async function save() {
  if (!form.name?.trim() || !form.email?.trim()) {
    return alert('Nombre y correo son obligatorios')
  }

  try {
    if (isEditing.value && form.id) {
      const { data } = await updateUser(form.id, form)
      const index = users.value.findIndex(u => u.id === data.id)
      if (index !== -1) users.value[index] = data
      alert('✅ Usuario actualizado correctamente')
    } else {
      // 🔹 Asignamos contraseña por defecto si no se manda
      const payload = {
        ...form,
        password: '123456'
      }
      const { data } = await createUser(payload)
      users.value.unshift(data)
      alert('✅ Usuario creado correctamente (Contraseña: 123456)')
    }
    showModal.value = false
  } catch (e: any) {
    console.error('Error al guardar usuario', e)
    const msg = e.response?.data?.error || e.response?.data?.details || e.message
    alert('❌ Error al guardar usuario: ' + msg)
  }
}

async function remove(u: User) {
  if (!confirm(`¿Eliminar a ${u.name}?`)) return
  try {
    await deleteUser(u.id)
    users.value = users.value.filter(x => x.id !== u.id)
    alert('🗑️ Usuario eliminado correctamente')
  } catch (e: any) {
    console.error('Error al eliminar usuario', e)
    const msg = e.response?.data?.error || e.response?.data?.details || e.message
    alert('❌ No se pudo eliminar el usuario: ' + msg)
  }
}

// ===== Utilidades =====
function formatDate(iso: string | undefined) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

function setSort(key: SortKey) {
  if (sortBy.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = key
    sortDir.value = 'asc'
  }
}

// ===== Filtros y Paginación =====
const filtered = computed(() => {
  const query = q.value.trim().toLowerCase()
  return users.value.filter(u => {
    const matchesQ = !query || `${u.name} ${u.email}`.toLowerCase().includes(query)
    const matchesRole = roleFilter.value === 'Todos' || u.role === roleFilter.value
    const matchesStatus = statusFilter.value === 'Todos' || u.status === statusFilter.value
    return matchesQ && matchesRole && matchesStatus
  })
})

const sorted = computed(() => {
  const arr = [...filtered.value]
  arr.sort((a, b) => {
    const A: any = a[sortBy.value]
    const B: any = b[sortBy.value]
    if (A === B) return 0
    const dir = sortDir.value === 'asc' ? 1 : -1
    if (sortBy.value === 'last_login') {
      return (new Date(A).getTime() - new Date(B).getTime()) * dir
    }
    return (A > B ? 1 : -1) * dir
  })
  return arr
})

const total = computed(() => sorted.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))

const paged = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return sorted.value.slice(start, start + pageSize.value)
})

watch([q, roleFilter, statusFilter, pageSize], () => {
  page.value = 1
})

function prevPage() { if (page.value > 1) page.value-- }
function nextPage() { if (page.value < totalPages.value) page.value++ }

// ===== Modal =====
const showModal = ref(false)
const isEditing = ref(false)
const form = reactive<Partial<User>>({
  name: '',
  email: '',
  role: 'Cliente',
  status: 'Activo'
})

function openCreate() {
  isEditing.value = false
  Object.assign(form, { id: undefined, name: '', email: '', role: 'Cliente', status: 'Activo' })
  showModal.value = true
}

function openEdit(u: User) {
  isEditing.value = true
  Object.assign(form, u)
  showModal.value = true
}

onMounted(fetchUsers)
</script>


<template>
  <AdminLayout>
    <div class="p-6">
      <!-- Encabezado -->
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-semibold tracking-tight">Usuarios</h1>
          <p class="text-sm text-gray-500">Administra cuentas, roles y estado de acceso.</p>
        </div>
        <div class="flex items-center gap-2">
          <button @click="openCreate" class="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-[#276796] text-white hover:bg-[#134A00] transition shadow">
            <UserPlus class="w-4 h-4" />
            <span>Nuevo usuario</span>
          </button>
        </div>
      </div>

      <!-- Filtros -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
        <div class="md:col-span-2">
          <div class="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
            <Search class="w-4 h-4" />
            <input v-model="q" type="text" placeholder="Buscar por nombre o correo" class="w-full outline-none text-sm" />
          </div>
        </div>
        <select v-model="roleFilter" class="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
          <option value="Todos">Todos los roles</option>
          <option value="Administrador">Administrador</option>
          <option value="Editor">Editor</option>
          <option value="Cliente">Cliente</option>
        </select>
        <select v-model="statusFilter" class="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
          <option value="Todos">Todos los estados</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      <!-- Tabla -->
      <div class="mt-4 rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-50 text-gray-600">
              <tr>
                <th class="px-4 py-3 text-left cursor-pointer" @click="setSort('name')">Nombre</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="setSort('email')">Correo</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="setSort('role')">Rol</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="setSort('status')">Estado</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="setSort('last_login')">Último acceso</th>
                <th class="px-4 py-3 w-12">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="6" class="px-4 py-8 text-center text-gray-500">Cargando…</td>
              </tr>
              <tr v-else-if="error">
                <td colspan="6" class="px-4 py-8 text-center text-red-600">{{ error }}</td>
              </tr>
              <tr v-else-if="!paged.length">
                <td colspan="6" class="px-4 py-8 text-center text-gray-500">Sin resultados</td>
              </tr>
              <tr v-for="u in paged" :key="u.id" class="border-t border-gray-100 hover:bg-gray-50">
                <td class="px-4 py-3 font-medium">{{ u.name }}</td>
                <td class="px-4 py-3 text-gray-600">{{ u.email }}</td>
                <td class="px-4 py-3">{{ u.role }}</td>
                <td class="px-4 py-3">
                  <span class="px-3 py-1 rounded-full text-xs font-medium" :class="u.status === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                    {{ u.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-gray-600">{{ formatDate(u.last_login) }}</td>
                <td class="px-2 py-2">
                  <div class="flex items-center justify-end gap-1">
                    <button @click="openEdit(u)" class="p-2 rounded-xl hover:bg-gray-100" title="Editar">
                      <Pencil class="w-4 h-4" />
                    </button>
                    <button @click="remove(u)" class="p-2 rounded-xl hover:bg-gray-100 text-red-600" title="Eliminar">
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal Crear/Editar -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/40" @click="showModal = false"></div>
        <div class="relative w-[95%] max-w-xl rounded-2xl bg-white shadow-2xl">
          <div class="p-5 border-b border-gray-100">
            <h3 class="text-lg font-semibold">{{ isEditing ? 'Editar usuario' : 'Nuevo usuario' }}</h3>
          </div>
          <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm text-gray-600">Nombre</label>
              <input v-model="form.name" type="text" class="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#276796]" />
            </div>
            <div>
              <label class="text-sm text-gray-600">Correo</label>
              <input v-model="form.email" type="email" class="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#276796]" />
            </div>
            <div>
              <label class="text-sm text-gray-600">Rol</label>
              <select v-model="(form.role as User['role'])" class="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm">
                <option value="Administrador">Administrador</option>
                <option value="Editor">Editor</option>
                <option value="Cliente">Cliente</option>
              </select>
            </div>
            <div>
              <label class="text-sm text-gray-600">Estado</label>
              <select v-model="(form.status as User['status'])" class="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm">
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <div class="p-5 flex items-center justify-end gap-2 border-t border-gray-100">
            <button @click="showModal = false" class="rounded-xl px-4 py-2 border border-gray-200">Cancelar</button>
            <button @click="save" class="rounded-xl px-4 py-2 bg-[#276796] text-white hover:bg-[#134A00]">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
