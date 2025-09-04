<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-[#69BBF0] mb-6">Registro</h2>

      <form class="space-y-4">
        <!-- Nombre -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Nombre Completo</label>
          <input
            type="text"
            placeholder="Tu nombre"
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#69BBF0] outline-none"
          />
        </div>

        <!-- Correo -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Correo Electrónico</label>
          <input
            type="email"
            placeholder="ejemplo@correo.com"
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#69BBF0] outline-none"
          />
        </div>

        <!-- Contraseña -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Contraseña</label>
          <input
            type="password"
            placeholder="********"
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#69BBF0] outline-none"
          />
        </div>

        <!-- Confirmar Contraseña -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Confirmar Contraseña</label>
          <input
            type="password"
            placeholder="********"
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#69BBF0] outline-none"
          />
        </div>

        <!-- Botón -->
        <button
          type="submit"
          class="w-full bg-[#69BBF0] text-white font-bold py-2 rounded-lg hover:bg-[#4a9ed1] transition">
          Registrarme
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-4">
        ¿Ya tienes cuenta?
        <router-link to="/iniciar-sesion" class="text-[#69BBF0] font-medium hover:underline">
          Inicia sesión aquí
        </router-link>
      </p>
    </div>
  </div>
</template>
