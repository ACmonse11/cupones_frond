import { createRouter, createWebHistory } from 'vue-router'

// Vistas importadas de forma lazy
const HomeView = () => import('@/views/HomeView.vue')
const ContactanosView = () => import('@/views/ContactanosView.vue')
const CuponesView = () => import('@/views/CuponesView.vue') // nueva vista
const DashboardView = () => import('@/views/admin/DashboardView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: HomeView,
    meta: { layout: 'user' }
  },
  {
    path: '/cupones', // nueva ruta
    name: 'Cupones',
    component: CuponesView,
    meta: { layout: 'user' }
  },
  {
    path: '/contactanos',
    name: 'Contactanos',
    component: ContactanosView,
    meta: { layout: 'user' }
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { layout: 'admin' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { layout: 'user' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
