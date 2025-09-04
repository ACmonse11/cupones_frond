<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { UserPlus, Pencil, Trash2, ChevronLeft, ChevronRight, Search, CheckCircle, XCircle } from 'lucide-vue-next'

// ===== Tipos =====
interface User {
  id: number
  name: string
  email: string
  role: 'Administrador' | 'Editor' | 'Cliente'
  status: 'Activo' | 'Inactivo'
  lastLogin: string // ISO
}

type SortKey = keyof Pick<User, 'name' | 'email' | 'role' | 'status' | 'lastLogin'>

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

const selectedIds = ref<Set<number>>(new Set())

// ===== Datos de prueba (reemplaza por tu API) =====
function seed() {
  const base: User[] = [
    { id: 1, name: 'Ana García', email: 'ana@example.com', role: 'Administrador', status: 'Activo', lastLogin: '2025-08-10T12:20:00Z' },
    { id: 2, name: 'Luis Pérez', email: 'luis@example.com', role: 'Editor', status: 'Activo', lastLogin: '2025-08-14T09:05:00Z' },
    { id: 3, name: 'María López', email: 'maria@example.com', role: 'Cliente', status: 'Inactivo', lastLogin: '2025-07-29T19:40:00Z' },
    { id: 4, name: 'Carlos Ruiz', email: 'carlos@example.com', role: 'Editor', status: 'Activo', lastLogin: '2025-08-15T16:00:00Z' },
    { id: 5, name: 'Noely Aguilar', email: 'noely@example.com', role: 'Cliente', status: 'Activo', lastLogin: '2025-08-12T21:12:00Z' },
  ]
  // duplicamos para paginación
  let id = 6
  while (base.length < 38) {
    base.push({
      id: id++,
      name: `Usuario ${id}`,
      email: `usuario${id}@mail.com`,
      role: (['Administrador', 'Editor', 'Cliente'] as const)[Math.floor(Math.random()*3)],
      status: (['Activo', 'Inactivo'] as const)[Math.floor(Math.random()*2)],
      lastLogin: new Date(Date.now() - Math.floor(Math.random()*60)*86400000).toISOString(),
    })
  }
  users.value = base
}

async function fetchUsers() {
  loading.value = true
  error.value = null
  try {
    // Ejemplo con fetch:
    // const res = await fetch('/api/users')
    // users.value = await res.json()
    await new Promise(r => setTimeout(r, 300))
    seed()
  } catch (e: any) {
    error.value = e?.message ?? 'Error al cargar usuarios'
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)

// ===== Utilidades =====
function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0]!.toUpperCase())
    .join('')
}

function toggleAllOnPage(check: boolean) {
  paged.value.forEach(u => {
    if (check) selectedIds.value.add(u.id)
    else selectedIds.value.delete(u.id)
  })
}

const anySelected = computed(() => selectedIds.value.size > 0)

// ===== Filtro + Búsqueda + Orden =====
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
    if (sortBy.value === 'lastLogin') {
      return (new Date(A).getTime() - new Date(B).getTime()) * dir
    }
    return (A > B ? 1 : -1) * dir
  })
  return arr
})

function setSort(key: SortKey) {
  if (sortBy.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = key
    sortDir.value = 'asc'
  }
}

// ===== Paginación =====
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

// ===== CRUD (mock) =====
const showModal = ref(false)
const isEditing = ref(false)
const form = reactive<Partial<User>>({ name: '', email: '', role: 'Cliente', status: 'Activo' })

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

function save() {
  // Validación simple
  if (!form.name?.trim() || !form.email?.trim()) return alert('Nombre y correo son obligatorios')
  if (isEditing.value && typeof form.id === 'number') {
    const idx = users.value.findIndex(u => u.id === form.id)
    if (idx !== -1) users.value[idx] = { ...(users.value[idx]), ...(form as User) }
  } else {
    const id = Math.max(0, ...users.value.map(u => u.id)) + 1
    users.value.unshift({
      id,
      name: form.name!,
      email: form.email!,
      role: (form.role as User['role']) ?? 'Cliente',
      status: (form.status as User['status']) ?? 'Activo',
      lastLogin: new Date().toISOString(),
    })
  }
  showModal.value = false
}

function remove(u: User) {
  if (confirm(`¿Eliminar a ${u.name}?`)) {
    users.value = users.value.filter(x => x.id !== u.id)
    selectedIds.value.delete(u.id)
  }
}

function bulkRemove() {
  if (!anySelected.value) return
  if (confirm(`¿Eliminar ${selectedIds.value.size} usuario(s) seleccionados?`)) {
    users.value = users.value.filter(u => !selectedIds.value.has(u.id))
    selectedIds.value.clear()
  }
}

function bulkSetStatus(status: User['status']) {
  users.value = users.value.map(u => selectedIds.value.has(u.id) ? { ...u, status } : u)
  selectedIds.value.clear()
}
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
          <button @click="openCreate" class="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-blue-600 text-white hover:bg-indigo-700 transition shadow">
            <UserPlus class="w-4 h-4" />
            <span>Nuevo usuario</span>
          </button>
        </div>
      </div>

      <!-- Filtros y búsqueda -->
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

      <!-- Barra de acciones en lote -->
      <div v-if="anySelected" class="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-gray-50 border border-gray-200 p-3">
        <span class="text-sm">Seleccionados: {{ selectedIds.size }}</span>
        <button @click="bulkSetStatus('Activo')" class="text-sm inline-flex items-center gap-1 rounded-xl px-3 py-1 bg-white border border-gray-200 shadow-sm">
          <CheckCircle class="w-4 h-4" /> Activar
        </button>
        <button @click="bulkSetStatus('Inactivo')" class="text-sm inline-flex items-center gap-1 rounded-xl px-3 py-1 bg-white border border-gray-200 shadow-sm">
          <XCircle class="w-4 h-4" /> Desactivar
        </button>
        <button @click="bulkRemove" class="text-sm inline-flex items-center gap-1 rounded-xl px-3 py-1 bg-white border border-red-200 text-red-600 shadow-sm">
          <Trash2 class="w-4 h-4" /> Eliminar
        </button>
      </div>

      <!-- Tabla -->
      <div class="mt-4 rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-50 text-gray-600">
              <tr>
                <th class="px-4 py-3 w-10">
                  <input type="checkbox" :checked="paged.every(u => selectedIds.has(u.id)) && paged.length > 0" @change="toggleAllOnPage(($event.target as HTMLInputElement).checked)" />
                </th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="setSort('name')">Nombre</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="setSort('email')">Correo</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="setSort('role')">Rol</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="setSort('status')">Estado</th>
                <th class="px-4 py-3 text-left cursor-pointer" @click="setSort('lastLogin')">Último acceso</th>
                <th class="px-4 py-3 w-12">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="7" class="px-4 py-8 text-center text-gray-500">Cargando…</td>
              </tr>
              <tr v-else-if="error">
                <td colspan="7" class="px-4 py-8 text-center text-red-600">{{ error }}</td>
              </tr>
              <tr v-else-if="!paged.length">
                <td colspan="7" class="px-4 py-8 text-center text-gray-500">Sin resultados</td>
              </tr>
              <tr v-for="u in paged" :key="u.id" class="border-t border-gray-100 hover:bg-gray-50">
                <td class="px-4 py-3">
                  <input type="checkbox" :checked="selectedIds.has(u.id)" @change="($event) => { const c = ($event.target as HTMLInputElement).checked; c ? selectedIds.add(u.id) : selectedIds.delete(u.id) }" />
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center font-semibold">{{ getInitials(u.name) }}</div>
                    <div class="font-medium">{{ u.name }}</div>
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-600">{{ u.email }}</td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center rounded-xl border px-2 py-0.5 text-xs" :class="{
                    'border-purple-200 bg-purple-50 text-purple-700': u.role === 'Administrador',
                    'border-blue-200 bg-blue-50 text-blue-700': u.role === 'Editor',
                    'border-gray-200 bg-gray-50 text-gray-700': u.role === 'Cliente',
                  }">{{ u.role }}</span>
                </td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium" :class="u.status === 'Activo' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'">
                    <span class="inline-block w-1.5 h-1.5 rounded-full" :class="u.status === 'Activo' ? 'bg-green-600' : 'bg-amber-600'"></span>
                    {{ u.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-gray-600">{{ formatDate(u.lastLogin) }}</td>
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

        <!-- Pie de tabla: paginación y tamaño de página -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-3 border-t border-gray-100 bg-white">
          <div class="text-sm text-gray-600">Mostrando
            <span class="font-medium"> {{ paged.length ? (page - 1) * pageSize + 1 : 0 }} </span>
            -
            <span class="font-medium"> {{ (page - 1) * pageSize + paged.length }} </span>
            de <span class="font-medium">{{ total }}</span>
          </div>
          <div class="flex items-center gap-2">
            <select v-model.number="pageSize" class="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
            <div class="flex items-center gap-1">
              <button @click="prevPage" :disabled="page === 1" class="p-2 rounded-xl border border-gray-200 disabled:opacity-50">
                <ChevronLeft class="w-4 h-4" />
              </button>
              <span class="text-sm">{{ page }} / {{ totalPages }}</span>
              <button @click="nextPage" :disabled="page === totalPages" class="p-2 rounded-xl border border-gray-200 disabled:opacity-50">
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Vista móvil (tarjetas) opcional: si quieres, duplica la info en cards con v-show md:hidden -->
    </div>

    <!-- Modal Crear/Editar -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40" @click="showModal = false"></div>
      <div class="relative w-[95%] max-w-xl rounded-2xl bg-white shadow-2xl">
        <div class="p-5 border-b border-gray-100">
          <h3 class="text-lg font-semibold">{{ isEditing ? 'Editar usuario' : 'Nuevo usuario' }}</h3>
          <p class="text-sm text-gray-500">Completa la información del usuario.</p>
        </div>
        <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm text-gray-600">Nombre</label>
            <input v-model="form.name" type="text" class="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
          </div>
          <div>
            <label class="text-sm text-gray-600">Correo</label>
            <input v-model="form.email" type="email" class="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
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
          <button @click="save" class="rounded-xl px-4 py-2 bg-gray-900 text-white hover:bg-black">Guardar</button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
/* Estilos mínimos extra; Tailwind hace el trabajo pesado */
</style>
