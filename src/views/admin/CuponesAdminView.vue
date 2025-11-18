<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import axios from "axios";
import { PlusCircle, Pencil, Trash2, Search } from "lucide-vue-next";

interface Category {
  id: number;
  name: string;
}

interface Coupon {
  id: number;
  title: string;
  code: string;
  description: string;
  discount: number;
  expiration_date: string;
  status: "Activo" | "Inactivo";
  image?: string | File | null;
  category_id: number | null;
  category?: Category;
}

const coupons = ref<Coupon[]>([]);
const categories = ref<Category[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const showModal = ref(false);
const isEditing = ref(false);
const imagePreview = ref<string | null>(null);
const imageFile = ref<File | null>(null);

const form = reactive<Partial<Coupon>>({
  title: "",
  code: "",
  description: "",
  discount: 0,
  expiration_date: "",
  category_id: null,
  status: "Activo",
});

const API_COUPONS = "http://127.0.0.1:8000/api/coupons";
const API_CATEGORIES = "http://127.0.0.1:8000/api/categories";

async function fetchCoupons() {
  loading.value = true;
  try {
    const { data } = await axios.get(API_COUPONS);
    coupons.value = data;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

async function fetchCategories() {
  try {
    const { data } = await axios.get(API_CATEGORIES);
    categories.value = data;
  } catch {}
}

onMounted(() => {
  fetchCoupons();
  fetchCategories();
});

function handleFileUpload(e: Event) {
  const file = (e.target as HTMLInputElement)?.files?.[0];

  if (!file) return;

  imageFile.value = file;
  form.image = file as any; // ✅ IMPORTANTE: asignar File al formulario
  imagePreview.value = URL.createObjectURL(file);
}



async function saveCoupon() {
  const formData = new FormData();

Object.entries(form).forEach(([key, value]) => {
  if (value !== null && value !== undefined && key !== "image") {
    formData.append(key, String(value));
  }
});

if (imageFile.value) {
  formData.append("image", imageFile.value);
}



  try {
    if (isEditing.value && form.id) {
      // ✅ IMPORTANTE: agregar headers para PUT con imagen
      await axios.post(`${API_COUPONS}/${form.id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    } else {
      // ✅ IMPORTANTE: agregar headers para POST con imagen
      await axios.post(API_COUPONS, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    }

    closeModal();
    await fetchCoupons();
  } catch (err: any) {
    console.log(err);
    alert(`Error: ${err.response?.data?.message || err.message}`);
  }
}


async function deleteCoupon(id: number) {
  if (!confirm("¿Eliminar este cupón?")) return;
  await axios.delete(`${API_COUPONS}/${id}`);
  fetchCoupons();
}

function openCreate() {
  isEditing.value = false;
  Object.assign(form, {
    id: undefined,
    title: "",
    code: "",
    description: "",
    discount: 0,
    expiration_date: "",
    category_id: null,
    status: "Activo",
  });
  imagePreview.value = null;
  imageFile.value = null;
  showModal.value = true;
}

function openEdit(coupon: Coupon) {
  isEditing.value = true;
  Object.assign(form, coupon);
  form.image = coupon.image; // mantener imagen actual
imagePreview.value = coupon.image || null;
imageFile.value = null;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  imagePreview.value = null;
  imageFile.value = null;
}

const q = ref("");
const filtered = computed(() =>
  coupons.value.filter((c) =>
    c.title.toLowerCase().includes(q.value.toLowerCase())
  )
);

const page = ref(1);
const pageSize = 10;
const totalPages = computed(() => Math.ceil(filtered.value.length / pageSize));
const paged = computed(() =>
  filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize)
);

function nextPage() {
  if (page.value < totalPages.value) page.value++;
}
function prevPage() {
  if (page.value > 1) page.value--;
}



</script>

<template>
  <div class="p-6">
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Gestión de Cupones</h1>
      </div>
      <button
        @click="openCreate"
        class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
      >
        <PlusCircle class="w-4 h-4" /> Nuevo cupón
      </button>
    </div>

    <div class="flex items-center mb-4 gap-2 border rounded-lg px-3 py-2 max-w-md bg-white shadow-sm">
      <Search class="w-4 h-4 text-gray-500" />
      <input v-model="q" placeholder="Buscar cupón..." class="outline-none w-full text-sm" />
    </div>

    <div class="overflow-x-auto bg-white shadow rounded-lg">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 text-gray-700">
          <tr>
            <th class="px-4 py-3">Imagen</th>
            <th class="px-4 py-3">Título</th>
            <th class="px-4 py-3">Código</th>
            <th class="px-4 py-3">Descuento</th>
            <th class="px-4 py-3">Categoría</th>
            <th class="px-4 py-3">Estado</th>
            <th class="px-4 py-3">Vence</th>
            <th class="px-4 py-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="c in paged" :key="c.id" class="border-t hover:bg-gray-50">
            <td class="px-4 py-3">
              <img
                v-if="c.image"
                :src="c.image"
                class="w-14 h-14 rounded-lg object-cover border"
              />
              <span v-else class="text-gray-400 text-xs italic">Sin imagen</span>
            </td>
            <td class="px-4 py-3 font-medium">{{ c.title }}</td>
            <td class="px-4 py-3">{{ c.code }}</td>
            <td class="px-4 py-3">{{ c.discount }}%</td>
            <td class="px-4 py-3">{{ c.category?.name || "Sin categoría" }}</td>
            <td class="px-4 py-3">
              <span
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="c.status === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'"
              >
                {{ c.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-xs">{{ new Date(c.expiration_date).toLocaleDateString() }}</td>

            <td class="px-4 py-3 flex gap-2">
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

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl w-full max-w-lg shadow-xl">
        <div class="p-5 border-b">
          <h2 class="text-lg font-semibold">{{ isEditing ? "Editar Cupón" : "Nuevo Cupón" }}</h2>
        </div>

        <div class="p-5 grid gap-4">
          <input v-model="form.title" placeholder="Título" class="border rounded-lg px-3 py-2" />
          <input v-model="form.code" placeholder="Código (opcional)" class="border rounded-lg px-3 py-2" />
          <textarea v-model="form.description" placeholder="Descripción" class="border rounded-lg px-3 py-2"></textarea>
          <input type="number" v-model="form.discount" placeholder="Descuento %" class="border rounded-lg px-3 py-2" />
          <input type="date" v-model="form.expiration_date" class="border rounded-lg px-3 py-2" />

          <select v-model="form.category_id" class="border rounded-lg px-3 py-2">
            <option value="">Sin categoría</option>
            <option v-for="cat in categories" :value="cat.id">{{ cat.name }}</option>
          </select>

          <select v-model="form.status" class="border rounded-lg px-3 py-2">
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>

          <div>
            <input type="file" @change="handleFileUpload" class="border rounded-lg px-3 py-2" />
            <img v-if="imagePreview" :src="imagePreview" class="w-32 h-32 mt-2 object-cover rounded-lg border" />
          </div>
        </div>

        <div class="flex justify-end gap-2 p-4 border-t">
          <button @click="closeModal" class="px-4 py-2 border rounded-lg">Cancelar</button>
          <button @click="saveCoupon" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>
