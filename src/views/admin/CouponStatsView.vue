<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-[#276796]">📊 Estadísticas de Descargas</h1>

    <!-- LOADING -->
    <div v-if="loading" class="text-center text-gray-600 py-8">
      Cargando estadísticas...
    </div>

  

    <!-- TABLA -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">Tabla de Descargas</h2>

      <table class="w-full border-collapse text-left">
        <thead>
          <tr class="border-b bg-gray-100">
            <th class="p-3">Cupón</th>
            <th class="p-3">Descargas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in stats" :key="c.id" class="border-b hover:bg-gray-50">
            <td class="p-3">{{ c.title }}</td>
            <td class="p-3 font-bold text-[#276796]">{{ c.downloads_count }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const stats = ref([]);
const loading = ref(true);
let chart = null;

// CARGAR ESTADÍSTICAS
async function loadStats() {
  const res = await fetch("http://127.0.0.1:8000/api/coupon-stats");
  stats.value = await res.json();
  loading.value = false;
  renderChart();
}

// GRÁFICA
function renderChart() {
  const ctx = document.getElementById("chart");

  if (chart) chart.destroy(); // evitar duplicado

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: stats.value.map(s => s.title),
      datasets: [
        {
          label: "Descargas",
          data: stats.value.map(s => s.downloads_count),
          backgroundColor: "rgba(39, 103, 150, 0.7)",
          borderColor: "#276796",
          borderWidth: 1,
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0 }
        }
      }
    }
  });
}

onMounted(() => loadStats());
</script>

<style scoped>
table th, table td {
  border-bottom: 1px solid #ddd;
}
</style>
