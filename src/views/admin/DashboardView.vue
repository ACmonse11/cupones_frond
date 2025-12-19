<template>
  <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

    <!-- TÍTULO -->
    <h1 class="text-4xl font-extrabold text-gray-800 mb-10 tracking-tight">
      📊 Dashboard
    </h1>

    <!-- MÉTRICAS -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h2 class="text-gray-500 text-sm uppercase tracking-wide">Usuarios totales</h2>
        <p class="text-4xl font-bold text-gray-800 mt-2">{{ summary.total_users }}</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h2 class="text-gray-500 text-sm uppercase tracking-wide">Usuarios activos</h2>
        <p class="text-4xl font-bold text-green-600 mt-2">{{ summary.active_users }}</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h2 class="text-gray-500 text-sm uppercase tracking-wide">Cupones</h2>
        <p class="text-4xl font-bold text-indigo-600 mt-2">{{ summary.total_coupons }}</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h2 class="text-gray-500 text-sm uppercase tracking-wide">Descargas</h2>
        <p class="text-4xl font-bold text-blue-600 mt-2">{{ summary.total_downloads }}</p>
      </div>
    </div>

    <!-- GRÁFICAS -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">📈 Descargas por mes</h2>
        <canvas id="downloadsChart"></canvas>
      </div>

      <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">🏆 Top cupones descargados</h2>
        <canvas id="topCouponsChart"></canvas>
      </div>
    </div>

    <!-- Tabla últimos usuarios -->
    <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h2 class="text-lg font-semibold text-gray-700 mb-6">👥 Últimos usuarios registrados</h2>

      <table class="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th class="py-3 px-4 border">ID</th>
            <th class="py-3 px-4 border">Nombre</th>
            <th class="py-3 px-4 border">Email</th>
            <th class="py-3 px-4 border">Estado</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="user in summary.latest_users" :key="user.id" class="hover:bg-gray-50 transition">
            <td class="py-3 px-4">{{ user.id }}</td>
            <td class="py-3 px-4 font-medium text-gray-800">{{ user.name }}</td>
            <td class="py-3 px-4 text-gray-600">{{ user.email }}</td>
            <td class="py-3 px-4">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="user.status === 'Activo'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'"
              >
                {{ user.status }}
              </span>
            </td>
          </tr>

          <tr v-if="summary.latest_users.length === 0">
            <td colspan="4" class="py-4 text-center text-gray-500">
              No hay usuarios registrados aún.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/services/axios.js";
import Chart from "chart.js/auto";

const summary = ref({
  total_users: 0,
  active_users: 0,
  total_coupons: 0,
  total_downloads: 0,
  downloads_by_month: [],
  top_coupons: [],
  latest_users: []
});

const fetchSummary = async () => {
  try {
    const { data } = await axios.get("/dashboard/summary");
    summary.value = data;
    loadCharts();
  } catch (e) {
    console.error("Error:", e);
  }
};

const loadCharts = () => {
  // 🔵 Descargas por mes
  const months = summary.value.downloads_by_month.map(i => i.month);
  const totals = summary.value.downloads_by_month.map(i => i.total);

  new Chart(document.getElementById("downloadsChart"), {
    type: "line",
    data: {
      labels: months,
      datasets: [{
        label: "Descargas",
        data: totals,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  // 🔴 Top cupones
  const couponNames = summary.value.top_coupons.map(i => i.title);
  const couponTotals = summary.value.top_coupons.map(i => i.downloads_count);

  new Chart(document.getElementById("topCouponsChart"), {
    type: "bar",
    data: {
      labels: couponNames,
      datasets: [{
        label: "Descargas",
        data: couponTotals,
        backgroundColor: "#10b981"
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
};

onMounted(fetchSummary);
</script>

<style scoped>
table th,
table td {
  text-align: center;
}
</style>
