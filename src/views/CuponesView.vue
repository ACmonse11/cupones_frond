<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import jsPDF from "jspdf";
import logo from "@/assets/logo.png";

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
  image?: string | null;
  category?: Category;
  code?: string;
}

const cupones = ref<Coupon[]>([]);
const categorias = ref<string[]>([]);
const categoriaSeleccionada = ref("");
const loading = ref(false);
const error = ref<string | null>(null);
const isLogged = ref(!!localStorage.token);

const API_URL = "http://127.0.0.1:8000/api/coupons";

onMounted(async () => {
  try {
    loading.value = true;
    const res = await axios.get(API_URL);
    cupones.value = res.data.filter((c: Coupon) => c.status === "Activo");

    const cats = new Set<string>();
    cupones.value.forEach((c) => {
      if (c.category?.name) cats.add(c.category.name);
    });
    categorias.value = [...cats];
  } catch {
    error.value = "No se pudieron cargar los cupones.";
  } finally {
    loading.value = false;
  }
});

const cuponesFiltrados = computed(() =>
  categoriaSeleccionada.value
    ? cupones.value.filter((c) => c.category?.name === categoriaSeleccionada.value)
    : cupones.value
);

// -------------------------------------------------
// 🔥 DESCARGAR PDF + Registrar descarga
// -------------------------------------------------
async function descargarPDF(cupon: Coupon) {

  if (isLogged.value) {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/coupon/${cupon.id}/download`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
    } catch (e: any) {
      // ❌ SI YA DESCARGÓ, CORTAR EL PROCESO Y NO GENERAR PDF
      if (e.response && e.response.status === 400) {
        alert("Ya descargaste este cupón. Solo se permite una descarga.");
        return;
      }

      console.warn("No se pudo registrar la descarga:", e);
      return;
    }
  }

  // -------------------------------------------------
  // 🔥 2) GENERAR PDF — SOLO SI EL USUARIO NO DESCARGÓ ANTES
  // -------------------------------------------------
  const doc = new jsPDF("p", "mm", "a4");

  const folio = `FOLIO-${String(cupon.id).padStart(4, "0")}`;
  const primary = "#276796";
  const gray = "#555";

  // ENCABEZADO
  doc.setFillColor(primary);
  doc.rect(0, 0, 210, 40, "F");

  const logoImg = new Image();
  logoImg.src = logo;

  await new Promise((resolve) => {
    logoImg.onload = () => {
      doc.addImage(logoImg, "PNG", 80, 5, 50, 30);
      resolve(true);
    };
  });

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primary);
  doc.text("Cupón Digital", 70, 60);

  doc.setDrawColor(primary);
  doc.setLineWidth(1);
  doc.roundedRect(15, 70, 180, 160, 5, 5);

  let y = 85;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Detalles del cupón", 20, y);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(gray);

  doc.text(` Folio: ${folio}`, 20, y); y += 8;
  doc.text(` Código: ${cupon.code}`, 20, y); y += 8;
  doc.text(` Título: ${cupon.title}`, 20, y); y += 8;

  // ⭐ CORREGIDO → si no tiene descuento, mostrar "Sin descuento"
  if (cupon.discount && cupon.discount > 0) {
    doc.text(` Descuento: ${cupon.discount}%`, 20, y);
  } else {
    doc.text(` Descuento: Sin descuento`, 20, y);
  }
  y += 8;

  doc.text(
    ` Vence el: ${new Date(cupon.expiration_date).toLocaleDateString()}`,
    20,
    y
  );

  y += 12;

  doc.setDrawColor("#cccccc");
  doc.line(20, y, 190, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(primary);
  doc.text("Imagen del cupón", 20, y);
  y += 8;

  if (cupon.image) {
    try {
      const res = await fetch(cupon.image);
      const blob = await res.blob();

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;

        const img = new Image();
        img.src = base64;

        img.onload = () => {
          doc.addImage(img, "JPEG", 40, y, 130, 80);

          doc.setFont("helvetica", "italic");
          doc.setFontSize(10);
          doc.setTextColor(gray);
          doc.text("Presenta este cupón en el establecimiento.", 40, 260);
          doc.text("Gasta y Gana © 2025", 80, 270);

          doc.save(`Cupon_${folio}.pdf`);
        };
      };

      reader.readAsDataURL(blob);
    } catch {
      doc.text("Error cargando imagen", 20, y);
      doc.save(`Cupon_${folio}.pdf`);
    }
  } else {
    doc.text("Este cupón no contiene imagen.", 20, y);
    doc.save(`Cupon_${folio}.pdf`);
  }
}

</script>

<template>
  <div class="px-4 py-12 max-w-7xl mx-auto">
    <h1 class="text-4xl font-extrabold text-center mb-10 text-[#276796] tracking-wide">
      🎟️ Cupones Disponibles
    </h1>

    <div class="mb-10 flex flex-col sm:flex-row sm:items-center gap-4 bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <label for="categoria" class="text-sm font-semibold text-gray-700">Filtrar por categoría:</label>

      <select
        id="categoria"
        v-model="categoriaSeleccionada"
        class="block w-full sm:w-60 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#276796] focus:border-[#276796]"
      >
        <option value="">Todas</option>
        <option v-for="c in categorias" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <div v-if="loading" class="text-center text-gray-500 py-16 text-lg font-medium">
      ⏳ Cargando cupones...
    </div>

    <div v-else-if="error" class="text-center text-red-600 py-16 text-lg font-semibold">
      {{ error }}
    </div>

    <div
      v-else-if="cuponesFiltrados.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <div
        v-for="cupon in cuponesFiltrados"
        :key="cupon.id"
        class="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 overflow-hidden flex flex-col"
      >
        <div class="w-full h-44 bg-gray-100 flex items-center justify-center relative">
          <img
            v-if="cupon.image"
            :src="cupon.image"
            class="w-full h-44 object-contain"
            alt="Imagen del cupón"
          />
          <span v-else class="text-gray-400 text-sm italic">Sin imagen</span>

          <!-- ⭐ CORREGIDO → mostrar badge SOLO si tiene descuento -->
          <span
            v-if="cupon.discount && cupon.discount > 0"
            class="absolute top-3 left-3 bg-[#f73b3b] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
          >
            {{ cupon.discount }}% OFF
          </span>
        </div>

        <div class="p-5 flex flex-col flex-1">
          <h2 class="text-lg font-bold text-gray-800 line-clamp-1">
            {{ cupon.title }}
          </h2>

          <p class="text-sm text-gray-600 mt-2 line-clamp-2">
            {{ cupon.description }}
          </p>

          <p class="mt-3 text-xs text-gray-500">
            🗓 Vence: {{ new Date(cupon.expiration_date).toLocaleDateString() }}
          </p>

          <p class="text-xs text-gray-400 italic mt-auto">
            📂 {{ cupon.category?.name || "Sin categoría" }}
          </p>

          <button
            v-if="isLogged"
            @click="descargarPDF(cupon)"
            class="mt-4 w-full bg-[#276796] text-white py-2 rounded-full font-semibold hover:bg-green-700 transition-colors"
          >
            📥 Descargar PDF
          </button>

          <p v-else class="mt-4 text-center text-gray-500 text-sm">
            Inicia sesión para descargar este cupón.
          </p>
        </div>
      </div>
    </div>

    <div v-else class="mt-12 text-center text-gray-500 italic text-lg">
      🚫 No hay cupones disponibles en esta categoría.
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
