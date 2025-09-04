<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Trash2, Minus, Plus } from "lucide-vue-next";

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const cartItems = ref<CartItem[]>([
  { id: 1, name: "Camiseta básica", price: 250, quantity: 2, image: "https://via.placeholder.com/120" },
  { id: 2, name: "Pantalón jeans", price: 480, quantity: 1, image: "https://via.placeholder.com/120" },
]);

const removeItem = (id: number) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id);
};

const increaseQuantity = (id: number) => {
  const item = cartItems.value.find(i => i.id === id);
  if (item) item.quantity++;
};

const decreaseQuantity = (id: number) => {
  const item = cartItems.value.find(i => i.id === id);
  if (item && item.quantity > 1) item.quantity--;
};

const total = () => cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Título -->
    <h1 class="text-4xl font-bold text-gray-800 mb-10 flex items-center gap-2">
      🛒 Mi Carrito
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Lista de productos -->
      <div class="lg:col-span-2 space-y-6">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="flex items-center gap-6 p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition"
        >
          <!-- Imagen -->
          <img :src="item.image" alt="" class="w-28 h-28 rounded-xl object-cover"/>

          <!-- Info -->
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-800">{{ item.name }}</h3>
            <p class="text-gray-500 text-sm mt-1">Precio unitario: ${{ item.price }}</p>

            <!-- Cantidad -->
            <div class="flex items-center mt-3 gap-3">
              <button
                @click="decreaseQuantity(item.id)"
                class="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <Minus class="w-4 h-4 text-gray-600"/>
              </button>
              <span class="px-4 py-1 border rounded-lg bg-gray-50 text-gray-800 font-medium">
                {{ item.quantity }}
              </span>
              <button
                @click="increaseQuantity(item.id)"
                class="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <Plus class="w-4 h-4 text-gray-600"/>
              </button>
            </div>
          </div>

          <!-- Precio total + eliminar -->
          <div class="flex flex-col items-end justify-between h-full">
            <span class="text-lg font-bold text-gray-800">
              ${{ item.price * item.quantity }}
            </span>
            <button @click="removeItem(item.id)" class="text-red-500 hover:text-red-700 mt-3">
              <Trash2 class="w-6 h-6"/>
            </button>
          </div>
        </div>

        <!-- Carrito vacío -->
        <div v-if="cartItems.length === 0" class="text-center text-gray-400 text-lg mt-20">
          Tu carrito está vacío 🛍️
        </div>
      </div>

      <!-- Resumen -->
      <div class="bg-white border border-gray-200 shadow-md rounded-2xl p-6 flex flex-col space-y-6 h-fit">
        <h2 class="text-2xl font-semibold text-gray-800 border-b pb-3">Resumen</h2>

        <div class="space-y-3 text-gray-700">
          <div class="flex justify-between text-lg">
            <span>Subtotal</span>
            <span>${{ total() }}</span>
          </div>
          <div class="flex justify-between text-lg">
            <span>Envío</span>
            <span>$50</span>
          </div>
        </div>

        <div class="flex justify-between text-gray-900 text-2xl font-bold border-t pt-4">
          <span>Total</span>
          <span>${{ total() + 50 }}</span>
        </div>

        <button class="w-full bg-[#69BBF0] text-white py-3 rounded-xl font-semibold hover:bg-blue-500 transition">
          Finalizar compra
        </button>
      </div>
    </div>
  </div>
</template>
