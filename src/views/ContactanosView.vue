<template>
  <section class="min-h-screen flex items-center justify-center bg-red-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="bg-white w-full max-w-2xl p-6 sm:p-10 rounded-2xl shadow-2xl border border-red-300 transition-all duration-300 hover:shadow-3xl">
      <h1 class="text-4xl sm:text-5xl font-bold text-center text-red-600 mb-6 animate-fade-in">Contáctanos</h1>

      <form @submit.prevent="enviarFormulario" class="space-y-6" novalidate>
        <div>
          <label for="nombre" class="block text-sm font-semibold text-red-700 mb-1">Nombre completo</label>
          <input
            id="nombre"
            v-model="form.nombre"
            type="text"
            placeholder="Ingresa tu nombre"
            class="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 placeholder-gray-400"
            required
            aria-required="true"
          />
          <p v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</p>
        </div>

        <div>
          <label for="correo" class="block text-sm font-semibold text-red-700 mb-1">Correo electrónico</label>
          <input
            id="correo"
            v-model="form.correo"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            class="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 placeholder-gray-400"
            required
            aria-required="true"
          />
          <p v-if="errors.correo" class="text-red-500 text-sm mt-1">{{ errors.correo }}</p>
        </div>

        <div>
          <label for="asunto" class="block text-sm font-semibold text-red-700 mb-1">Asunto</label>
          <input
            id="asunto"
            v-model="form.asunto"
            type="text"
            placeholder="Motivo del contacto"
            class="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 placeholder-gray-400"
            required
            aria-required="true"
          />
          <p v-if="errors.asunto" class="text-red-500 text-sm mt-1">{{ errors.asunto }}</p>
        </div>

        <div>
          <label for="mensaje" class="block text-sm font-semibold text-red-700 mb-1">Mensaje</label>
          <textarea
            id="mensaje"
            v-model="form.mensaje"
            rows="5"
            placeholder="Escribe tu mensaje aquí"
            class="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 placeholder-gray-400 resize-y"
            required
            aria-required="true"
          ></textarea>
          <p v-if="errors.mensaje" class="text-red-500 text-sm mt-1">{{ errors.mensaje }}</p>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2"
        >
          <span v-if="loading" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          <span>Enviar mensaje</span>
        </button>

        <p v-if="exito" class="text-green-600 text-center font-medium mt-4 animate-fade-in">¡Mensaje enviado con éxito!</p>
        <p v-if="error" class="text-red-500 text-center font-medium mt-4">{{ error }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  nombre: '',
  correo: '',
  asunto: '',
  mensaje: ''
})

const exito = ref(false)
const error = ref('')
const loading = ref(false)
const errors = ref({})

const enviarFormulario = async () => {
  errors.value = {}
  loading.value = true

  // Simulación de validación
  if (!form.value.nombre.trim()) errors.value.nombre = 'El nombre es requerido.'
  if (!form.value.correo.trim()) errors.value.correo = 'El correo es requerido.'
  else if (!/^\S+@\S+\.\S+$/.test(form.value.correo)) errors.value.correo = 'El correo no es válido.'
  if (!form.value.asunto.trim()) errors.value.asunto = 'El asunto es requerido.'
  if (!form.value.mensaje.trim()) errors.value.mensaje = 'El mensaje es requerido.'

  if (Object.keys(errors.value).length === 0) {
    try {
      // Simulación de envío (reemplazar con API real)
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Formulario enviado:', form.value)
      exito.value = true
      error.value = ''
      form.value = { nombre: '', correo: '', asunto: '', mensaje: '' }
    } catch (err) {
      error.value = 'Error al enviar el mensaje. Intenta de nuevo.'
    }
  }

  loading.value = false
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
