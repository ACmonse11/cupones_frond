<!-- src/views/DescuentosView.vue -->
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface Coupon {
  id: number;
  title: string;
  description: string;
  discount: number;
  expiration_date: string;
  status: "Activo" | "Inactivo";
  image?: string;
  category?: Category;
}

const cupones = ref<Coupon[]>([]);
const descuentoSeleccionado = ref(0);
const loading = ref(false);
const error = ref<string | null>(null);

// ✅ URL del backend Laravel
const API_URL = "http://127.0.0.1:8000/api/coupons";

// ✅ Cargar cupones desde el backend
onMounted(async () => {
  try {
    loading.value = true;
    const res = await axios.get(API_URL);

    // Solo cupones activos y con descuento mayor a 0
    cupones.value = res.data.filter(
      (c: Coupon) => c.status === "Activo" && c.discount > 0
    );
  } catch (err: any) {
    console.error("Error al cargar cupones:", err);
    error.value = "No se pudieron cargar los descuentos.";
  } finally {
    loading.value = false;
  }
});

// ✅ Filtrar por porcentaje seleccionado
const cuponesFiltrados = computed(() => {
  if (descuentoSeleccionado.value === 0) return cupones.value;
  return cupones.value.filter(
    (c) => c.discount >= descuentoSeleccionado.value
  );
});
</script>

<template>
  <div class="px-4 py-12 max-w-7xl mx-auto">
    <!-- Título -->
    <h1 class="text-4xl font-extrabold mb-10 text-[#276796] text-center tracking-wide">
      💸 Descuentos Especiales
    </h1>

    <!-- 🔍 Filtro de descuento -->
    <div
      class="mb-12 flex flex-col sm:flex-row sm:items-center gap-4 bg-white shadow-md rounded-xl p-6 border border-gray-200"
    >
      <label for="descuento" class="text-sm font-semibold text-gray-700">
        Filtrar por rango de descuento:
      </label>
      <select
        id="descuento"
        v-model.number="descuentoSeleccionado"
        class="block w-full sm:w-60 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#276796] focus:border-[#276796] outline-none transition"
      >
        <option :value="0">Todos</option>
        <option :value="10">10% o más</option>
        <option :value="20">20% o más</option>
        <option :value="30">30% o más</option>
        <option :value="40">40% o más</option>
        <option :value="50">50% o más</option>
      </select>
    </div>

    <!-- Estado de carga -->
    <div v-if="loading" class="text-center text-gray-500 py-16 text-lg font-medium">
      ⏳ Cargando descuentos...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-600 py-16 text-lg font-semibold">
      {{ error }}
    </div>

    <!-- 🧾 Lista de cupones -->
    <div
      v-else-if="cuponesFiltrados.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <div
        v-for="cupon in cuponesFiltrados"
        :key="cupon.id"
        class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2 flex flex-col"
      >
        <!-- Imagen -->
        <div class="w-full h-44 bg-gray-100 flex items-center justify-center relative">
          <img
            v-if="cupon.image"
            :src="cupon.image.startsWith('http')
              ? cupon.image
              : `http://127.0.0.1:8000/storage/${cupon.image}`"
            alt="Imagen del cupón"
            class="w-full h-44 object-contain"
          />
          <span v-else class="text-gray-400 text-sm italic">Sin imagen</span>

          <!-- Badge descuento -->
          <span
            class="absolute top-3 left-3 bg-[#f73b3b] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
          >
            {{ cupon.discount }}% OFF
          </span>
        </div>

        <!-- Contenido -->
        <div class="p-5 flex flex-col flex-1">
          <h2 class="text-lg font-bold text-gray-800 line-clamp-1">
            {{ cupon.title }}
          </h2>
          <p class="text-gray-600 mt-2 text-sm line-clamp-2">
            {{ cupon.description }}
          </p>

          <p class="mt-3 text-xs text-gray-500">
            🗓 Vence: {{ new Date(cupon.expiration_date).toLocaleDateString() }}
          </p>

          <p class="text-xs text-gray-400 mt-auto italic">
            📂 {{ cupon.category?.name || "Sin categoría" }}
          </p>
        </div>
      </div>
    </div>

    <!-- Sin resultados -->
    <div v-else class="mt-12 text-center text-gray-500 italic text-lg">
      🚫 No hay cupones que coincidan con el rango de descuento seleccionado.
    </div>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
