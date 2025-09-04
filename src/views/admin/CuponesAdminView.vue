<template>
  <AdminLayout>
    <!-- Lista de cupones -->
    <CuponesList
      @abrir-agregar="mostrarAgregar = true"
      @abrir-editar="abrirEditarModal"
      ref="lista"
    />

    <!-- Modal Agregar -->
    <AgregarCupon
      :mostrar="mostrarAgregar"
      @cerrar="mostrarAgregar = false"
      @actualizado="recargarCupones"
    />

    <!-- Modal Editar -->
    <EditarCupon
      :mostrar="mostrarEditar"
      :cuponData="cuponSeleccionado"
      @cerrar="mostrarEditar = false"
      @actualizado="recargarCupones"
    />
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CuponesList from '../../components/CuponesList.vue'
import AgregarCupon from '../../components/AgregarCupon.vue'
import EditarCupon from '../../components/EditarCupon.vue'

const mostrarAgregar = ref(false)
const mostrarEditar = ref(false)
const cuponSeleccionado = ref<any>(null)

const abrirEditarModal = (cupon: any) => {
  cuponSeleccionado.value = cupon
  mostrarEditar.value = true
}

const lista = ref<any>(null)
const recargarCupones = () => {
  lista.value?.cargarCupones() // Llama al método expuesto en CuponesList
}
</script>
