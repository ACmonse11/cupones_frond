<!-- src/views/CuponesView.vue -->
<script setup lang="ts">
import { ref, computed } from "vue";
import { onMounted } from 'vue'
import imagen23 from "../img/Imagen23.jpg";
import imagen24 from "../img/Imagen24.jpg";
import imagen25 from "../img/Imagen25.jpg";
import imagen26 from "../img/Imagen26.jpg";

const categorias = ["Restaurantes", "Ropa", "Tecnología", "Viajes"];
const categoriaSeleccionada = ref("");

onMounted(async () => {
  const res = await axios.get('/cupones')
  cupones.value = res.data
})


const cupones = ref([
  {
    id: 1,
    titulo: "PizzaManía",
    descripcion: "Obtén un 20% de descuento en tu pedido de pizza.",
    descuento: 20,
    categoria: "Restaurantes",
    imagen: imagen23,
  },
  {
    id: 2,
    titulo: "Tienda de Moda",
    descripcion: "Compra 2 camisetas y lleva la tercera gratis.",
    descuento: 33,
    categoria: "Ropa",
    imagen: imagen24,
  },
  {
    id: 3,
    titulo: "Smartphone Zone",
    descripcion: "Ahorra hasta un 15% en modelos seleccionados.",
    descuento: 15,
    categoria: "Tecnología",
    imagen: imagen25,
  },
  {
    id: 4,
    titulo: "Viajes Caribe",
    descripcion: "Reserva ahora y recibe 25% OFF en paquetes turísticos.",
    descuento: 25,
    categoria: "Viajes",
    imagen: imagen26,
  },
]);

const cuponesFiltrados = computed(() => {
  if (!categoriaSeleccionada.value) return cupones.value;
  return cupones.value.filter(
    (c) => c.categoria === categoriaSeleccionada.value
  );
});

// --- Carrito ---
const carrito = ref<any[]>([])

const agregarAlCarrito = (cupon: any) => {
  carrito.value.push(cupon)
  alert(`Agregaste "${cupon.titulo}" al carrito 🎉`)
}
</script>


<template>
  <div class="px-4 py-8 max-w-5xl mx-auto">
    <h1 class="text-2xl md:text-3xl font-serif mb-8 text-[#69BBF0] text-center">
      Cupones Disponibles
    </h1>

    <!-- Filtro de Categoría -->
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4">
      <label for="categoria" class="text-sm font-medium text-gray-700">
        Selecciona una categoría:
      </label>
      <select
        id="categoria"
        v-model="categoriaSeleccionada"
        class="block w-full sm:w-60 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
      >
        <option value="">Todas</option>
        <option
          v-for="categoria in categorias"
          :key="categoria"
          :value="categoria"
        >
          {{ categoria }}
        </option>
      </select>
    </div>

    <!-- Lista de Cupones -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="cupon in cuponesFiltrados"
        :key="cupon.id"
        class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col"
      >
        <img
          :src="cupon.imagen"
          alt="Imagen del cupón"
          class="w-full h-40 object-cover"
        />
        <div class="p-4 flex flex-col flex-1">
          <h2 class="text-lg font-semibold text-gray-800 line-clamp-1">
            {{ cupon.titulo }}
          </h2>
          <p class="text-gray-600 mt-1 text-sm line-clamp-2">
            {{ cupon.descripcion }}
          </p>
          <span
            class="inline-block mt-3 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full"
          >
            {{ cupon.descuento }}% OFF
          </span>

          <!-- Botón agregar al carrito -->
          <button
            @click="agregarAlCarrito(cupon)"
            class="mt-4 bg-[#69BBF0] hover:bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>

    <!-- Sin resultados -->
    <div
      v-if="cuponesFiltrados.length === 0"
      class="mt-8 text-center text-gray-500 italic"
    >
      No hay cupones en esta categoría.
    </div>

    <!-- Vista simple del carrito -->
    <div class="mt-12 p-4 border rounded-lg bg-gray-50">
      <h2 class="text-xl font-semibold text-gray-800 mb-3">🛒 Carrito</h2>
      <ul v-if="carrito.length > 0" class="list-disc pl-5 space-y-1">
        <li v-for="(item, index) in carrito" :key="index">
          {{ item.titulo }} - {{ item.descuento }}% OFF
        </li>
      </ul>
      <p v-else class="text-gray-500 italic">Tu carrito está vacío.</p>
    </div>
  </div>
</template>
