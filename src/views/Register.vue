<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-[#276796] mb-6">Registro</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Nombre -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Nombre Completo</label>
          <input
            v-model="name"
            type="text"
            placeholder="Tu nombre"
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#69BBF0] outline-none"
            required
          />
        </div>

        <!-- Correo -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Correo Electrónico</label>
          <input
            v-model="email"
            type="email"
            placeholder="ejemplo@correo.com"
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#69BBF0] outline-none"
            required
          />
        </div>

        <!-- Contraseña -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Contraseña</label>
          <input
            v-model="password"
            type="password"
            placeholder="********"
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#69BBF0] outline-none"
            required
          />
        </div>

        <!-- Confirmar Contraseña -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Confirmar Contraseña</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="********"
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#69BBF0] outline-none"
            required
          />
        </div>

        <!-- Botón -->
        <button
          type="submit"
          class="w-full text-white font-bold py-2 rounded-lg bg-[#276796] hover:bg-blue-500 transition">
          Registrarme
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-4">
        ¿Ya tienes cuenta?
        <router-link to="/login" class="text-[#4d92bf] font-medium hover:underline">
          Inicia sesión aquí
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const auth = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert("⚠️ Las contraseñas no coinciden");
    return;
  }

  try {
    await auth.register(name.value, email.value, password.value);
    router.push("/login");
  } catch (error) {
    console.error(error);
    alert("Error al registrar usuario ❌");
  }
};
</script>
