<template>
  <AdminLayout>
    <div class="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <!-- Encabezado -->
      <h1 class="text-2xl md:text-3xl font-semibold tracking-tight">Dashboard</h1>

      <!-- Tarjetas de Métricas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div class="bg-white p-4 sm:p-6 rounded-lg shadow text-center">
          <h2 class="text-gray-500 text-sm sm:text-base">Usuarios Activos</h2>
          <p class="text-2xl sm:text-3xl font-bold">1,245</p>
        </div>
        <div class="bg-white p-4 sm:p-6 rounded-lg shadow text-center">
          <h2 class="text-gray-500 text-sm sm:text-base">Ventas</h2>
          <p class="text-2xl sm:text-3xl font-bold">$12,450</p>
        </div>
        <div class="bg-white p-4 sm:p-6 rounded-lg shadow text-center">
          <h2 class="text-gray-500 text-sm sm:text-base">Visitas</h2>
          <p class="text-2xl sm:text-3xl font-bold">8,234</p>
        </div>
      </div>

      <!-- Gráficas -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div class="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 class="text-base sm:text-lg font-semibold mb-4">Gráfica de Ventas</h2>
          <div class="w-full overflow-x-auto">
            <canvas id="barChart" class="max-w-full"></canvas>
          </div>
        </div>
        <div class="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 class="text-base sm:text-lg font-semibold mb-4">Distribución</h2>
          <div class="flex justify-center">
            <canvas id="pieChart" class="max-w-[300px]"></canvas>
          </div>
        </div>
      </div>

      <!-- Tabla -->
      <div class="bg-white p-4 sm:p-6 rounded-lg shadow overflow-x-auto">
        <h2 class="text-base sm:text-lg font-semibold mb-4">Últimos Registros</h2>
        <table class="min-w-full border border-gray-200 text-sm sm:text-base">
          <thead>
            <tr class="bg-gray-100 text-gray-600">
              <th class="py-2 px-4 border">ID</th>
              <th class="py-2 px-4 border">Nombre</th>
              <th class="py-2 px-4 border">Email</th>
              <th class="py-2 px-4 border">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-2 px-4 border">1</td>
              <td class="py-2 px-4 border">Juan Pérez</td>
              <td class="py-2 px-4 border">juan@example.com</td>
              <td class="py-2 px-4 border text-green-600">Activo</td>
            </tr>
            <tr>
              <td class="py-2 px-4 border">2</td>
              <td class="py-2 px-4 border">Ana López</td>
              <td class="py-2 px-4 border">ana@example.com</td>
              <td class="py-2 px-4 border text-red-600">Inactivo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

onMounted(() => {
  // Gráfica de Barras
  const barCtx = document.getElementById("barChart");
  new Chart(barCtx, {
    type: "bar",
    data: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May"],
      datasets: [
        {
          label: "Ventas ($)",
          data: [5000, 7000, 4000, 9000, 12000],
          backgroundColor: "#3b82f6",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  // Gráfica de Pastel
  const pieCtx = document.getElementById("pieChart");
  new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: ["Activos", "Inactivos"],
      datasets: [
        {
          data: [70, 30],
          backgroundColor: ["#10b981", "#ef4444"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
});
</script>
