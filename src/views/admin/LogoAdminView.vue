<script setup lang="ts">
import { ref, onMounted } from 'vue'

const logos = ref([])
const title = ref("")
const image = ref<File | null>(null)

// ----------------------
// CARGAR LISTA DE LOGOS
// ----------------------
async function loadLogos() {
  const res = await fetch("http://localhost:8000/api/logos", {
    headers: { Authorization: `Bearer ${localStorage.token}` }
  })
  logos.value = await res.json()
}

// ----------------------
// CAPTURAR ARCHIVO (FIX TS)
// ----------------------
function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement

  if (!target.files || target.files.length === 0) {
    alert("No se pudo leer la imagen")
    return
  }

  image.value = target.files[0]
  console.log("IMAGEN CARGADA:", image.value)
}

// ----------------------
// SUBIR LOGO
// ----------------------
async function uploadLogo() {
  if (!image.value) {
    alert("Selecciona una imagen")
    return
  }

  const formData = new FormData()
  formData.append("image", image.value)
  formData.append("title", title.value)

  await fetch("http://localhost:8000/api/logos", {
    method: "POST",
    body: formData,
    headers: { Authorization: `Bearer ${localStorage.token}` }
  })

  // limpiar
  title.value = ""
  image.value = null

  loadLogos()
}

// ----------------------
// ELIMINAR LOGO
// ----------------------
async function deleteLogo(id: number) {
  if (!confirm("¿Eliminar logo?")) return

  await fetch(`http://localhost:8000/api/logos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.token}` }
  })

  loadLogos()
}

onMounted(loadLogos)
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-[#276796]">Administrar Logos</h1>

    <!-- FORM CREAR -->
    <div class="bg-white p-6 shadow rounded-lg mb-10 max-w-lg">
      <h2 class="text-xl font-semibold mb-4">Subir nuevo logo</h2>

      <input
        v-model="title"
        type="text"
        placeholder="Título opcional"
        class="border p-2 mb-4 w-full rounded"
      />

      <input type="file" @change="onFileChange" class="mb-4" />

      <!-- DEBUG VISUAL -->
      <p class="text-red-600 text-sm mb-4">
        Archivo detectado: {{ image ? image.name : 'ninguno' }}
      </p>

      <button
        type="button"
        @click="uploadLogo"
        class="bg-[#276796] hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Subir Logo
      </button>
    </div>

    <!-- LISTADO -->
    <h2 class="text-xl font-bold mb-4">Logos actuales</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="l in logos"
        :key="l.id"
        class="bg-white p-4 rounded shadow text-center"
      >
        <img :src="l.image_url" class="w-full h-32 object-contain rounded mb-4" />

        <p class="text-gray-700 text-sm mb-2">
          Título: {{ l.title || "—" }}
        </p>

        <button
          @click="deleteLogo(l.id)"
          class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded w-full"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>
