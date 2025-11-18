<script setup lang="ts">
import { ref, onMounted } from 'vue'

const banners = ref([])
const title = ref("")
const image = ref<File | null>(null)

async function loadBanners() {
  const res = await fetch("http://localhost:8000/api/banners")
  banners.value = await res.json()
}

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    image.value = file
  }
}

async function uploadBanner() {
  if (!image.value) {
    alert("Selecciona una imagen")
    return
  }

  const formData = new FormData()
  formData.append("image", image.value)
  formData.append("title", title.value)

  await fetch("http://localhost:8000/api/banners", {
    method: "POST",
    body: formData
  })

  title.value = ""
  image.value = null
  loadBanners()
}

async function deleteBanner(id) {
  if (!confirm("¿Eliminar banner?")) return

  await fetch(`http://localhost:8000/api/banners/${id}`, {
    method: "DELETE"
  })

  loadBanners()
}

onMounted(loadBanners)
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-[#276796]">Administrar Banners</h1>

    <!-- FORM CREAR -->
    <div class="bg-white p-6 shadow rounded-lg mb-10 max-w-lg">
      <h2 class="text-xl font-semibold mb-4">Agregar nuevo banner</h2>

      <input
        v-model="title"
        type="text"
        placeholder="Título opcional"
        class="border p-2 mb-4 w-full rounded"
      />

      <input type="file" @change="onFileChange" class="mb-4" />

      <button
        @click="uploadBanner"
        class="bg-[#276796] hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Subir Banner
      </button>
    </div>

    <!-- LISTADO -->
    <h2 class="text-xl font-bold mb-4">Banners actuales</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="b in banners"
        :key="b.id"
        class="bg-white p-4 rounded shadow"
      >
        <img :src="b.image_url" class="w-full h-48 object-cover rounded mb-4" />

        <p class="text-gray-700 text-sm mb-2">Título: {{ b.title || "—" }}</p>

        <button
          @click="deleteBanner(b.id)"
          class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded w-full"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>
