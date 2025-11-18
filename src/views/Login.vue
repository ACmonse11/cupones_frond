<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <!-- Logo centrado -->
      <div class="flex justify-center mb-6">
        <RouterLink to="/" class="flex items-center">
          <img
            src="@/img/GASTA (1).png"
            alt="Logo"
            class="h-16 w-16 object-cover rounded-full shadow-md"
          />
        </RouterLink>
      </div>

      <h2 class="text-2xl font-bold text-center text-[#276796] mb-6">
        Iniciar Sesión
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
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

        <!-- Botón -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full text-white font-bold py-2 rounded-lg bg-[#276796] hover:bg-blue-500 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-4">
        ¿No tienes cuenta?
        <router-link
          to="/register"
          class="text-[#4d92bf] font-medium hover:underline"
        >
          Regístrate aquí
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

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const data = await auth.login(email.value, password.value);
    const role = String(data.user?.role || "").toLowerCase();

    console.log("🧠 Usuario logueado:", data.user);
    console.log("🧩 Rol detectado:", role);

    alert("Inicio de sesión correcto ✅");

    // 🔹 Redirección flexible según rol (sin importar mayúsculas/minúsculas)
if (data.user.role === "admin") {
  router.push("/admin/dashboard");
} else {
  router.push("/");
}


  } catch (error: any) {
    console.error("Error al iniciar sesión:", error);
    alert(
      error.response?.data?.error ||
        "Error al iniciar sesión. Verifica tus credenciales ❌"
    );
  }
};
</script>
