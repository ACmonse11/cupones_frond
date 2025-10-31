<!-- src/views/CuponesView.vue -->
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import jsPDF from "jspdf";

// --- Tipos ---
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
  code?: string;
}

// --- Estado ---
const cupones = ref<Coupon[]>([]);
const categorias = ref<string[]>([]);
const categoriaSeleccionada = ref("");
const loading = ref(false);
const error = ref<string | null>(null);

// --- API ---
const API_URL = "http://127.0.0.1:8000/api/coupons";

// --- Obtener cupones ---
onMounted(async () => {
  try {
    loading.value = true;
    const res = await axios.get(API_URL);
    cupones.value = res.data.filter((c: Coupon) => c.status === "Activo");

    const categoriasUnicas = new Set<string>();
    cupones.value.forEach((c) => {
      if (c.category?.name) categoriasUnicas.add(c.category.name);
    });
    categorias.value = Array.from(categoriasUnicas);
  } catch (err: any) {
    console.error("Error cargando cupones:", err);
    error.value = "No se pudieron cargar los cupones.";
  } finally {
    loading.value = false;
  }
});

// --- Filtrar por categoría ---
const cuponesFiltrados = computed(() => {
  if (!categoriaSeleccionada.value) return cupones.value;
  return cupones.value.filter(
    (c) => c.category?.name === categoriaSeleccionada.value
  );
});

// --- Descargar PDF ---
function descargarPDF(cupon: Coupon) {
  const doc = new jsPDF();
  const folio = `FOLIO-${String(cupon.id).padStart(4, "0")}`;
  const fechaVence = new Date(cupon.expiration_date).toLocaleDateString();

  // --- Encabezado ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("CUPÓN DIGITAL", 70, 20);

  // --- Información principal ---
  doc.setFontSize(12);
  doc.text(`Folio: ${folio}`, 20, 40);
  doc.text(`Código: ${cupon.code || "N/A"}`, 20, 50);
  doc.text(`Título: ${cupon.title}`, 20, 60);
  doc.text(`Categoría: ${cupon.category?.name || "Sin categoría"}`, 20, 70);
  doc.text(`Descuento: ${cupon.discount}% OFF`, 20, 80);
  doc.text(`Vence el: ${fechaVence}`, 20, 90);

  // --- Descripción ---
  doc.setFont("helvetica", "normal");
  doc.text("Descripción:", 20, 105);
  doc.text(cupon.description || "Sin descripción", 20, 115, { maxWidth: 170 });

  // --- Imagen (si existe) ---
  if (cupon.image) {
    const img = new Image();
    img.src = cupon.image.startsWith("http")
      ? cupon.image
      : `http://127.0.0.1:8000/storage/${cupon.image}`;

    img.onload = () => {
      doc.addImage(img, "JPEG", 60, 130, 90, 60);
      doc.save(`Cupon_${folio}.pdf`);
    };
  } else {
    doc.text("Sin imagen disponible", 70, 150);
    doc.save(`Cupon_${folio}.pdf`);
  }
}
</script>

<template>
  <div class="px-4 py-8 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-[#276796] text-center">
      🎟️ Cupones Disponibles
    </h1>

    <!-- Filtro -->
    <div
      class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4"
    >
      <label for="categoria" class="text-sm font-medium text-gray-700">
        Selecciona una categoría:
      </label>
      <select
        id="categoria"
        v-model="categoriaSeleccionada"
        class="block w-full sm:w-60 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#69BBF0] outline-none"
      >
        <option value="">Todas</option>
        <option v-for="categoria in categorias" :key="categoria" :value="categoria">
          {{ categoria }}
        </option>
      </select>
    </div>

    <!-- Estado -->
    <div v-if="loading" class="text-center text-gray-500 py-10">
      Cargando cupones...
    </div>

    <div v-else-if="error" class="text-center text-red-500 py-10">
      {{ error }}
    </div>

    <!-- Cupones -->
    <div
      v-else-if="cuponesFiltrados.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="cupon in cuponesFiltrados"
        :key="cupon.id"
        class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col"
      >
        <!-- Imagen -->
        <div class="w-full h-40 bg-gray-100 flex items-center justify-center">
          <img
            v-if="cupon.image"
            :src="cupon.image.startsWith('http') ? cupon.image : `http://127.0.0.1:8000/storage/${cupon.image}`"
            alt="Imagen del cupón"
            class="w-full h-40 object-cover"
          />
          <span v-else class="text-gray-400 text-sm italic">Sin imagen</span>
        </div>

        <!-- Contenido -->
        <div class="p-4 flex flex-col flex-1">
          <h2 class="text-lg font-semibold text-gray-800 line-clamp-1">
            {{ cupon.title }}
          </h2>
          <p class="text-gray-600 mt-1 text-sm line-clamp-2">
            {{ cupon.description }}
          </p>

          <p
            class="mt-3 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full inline-block w-max"
          >
            {{ cupon.discount }}% OFF
          </p>

          <p class="mt-2 text-xs text-gray-500">
            Vence: {{ new Date(cupon.expiration_date).toLocaleDateString() }}
          </p>

          <p class="text-xs text-gray-400 mb-3">
            {{ cupon.category?.name || "Sin categoría" }}
          </p>

          <button
            @click="descargarPDF(cupon)"
            class="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition"
          >
            Descargar PDF
          </button>
        </div>
      </div>
    </div>

    <div v-else class="mt-8 text-center text-gray-500 italic">
      No hay cupones en esta categoría.
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

button {
  transition: all 0.2s ease;
}
button:hover {
  transform: scale(1.03);
}
</style>
