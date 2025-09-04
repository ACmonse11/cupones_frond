import { createRouter, createWebHistory } from 'vue-router'

// Vistas importadas de forma lazy
const HomeView = () => import('@/views/HomeView.vue')
const ContactanosView = () => import('@/views/ContactanosView.vue')
const CuponesView = () => import('@/views/CuponesView.vue')
const NoticiasView = () => import('@/views/NoticiasView.vue')
const DescuentosView = () => import('@/views/DescuentosView.vue')

const DashboardView = () => import('@/views/admin/DashboardView.vue')
const CuponesAdminView = () => import('@/views/admin/CuponesAdminView.vue')
const CategoriaAdminView = () => import('@/views/admin/CategoriaAdminView.vue')
const UsuariosAdminView = () => import('@/views/admin/UsuariosAdminView.vue')
const DescuentosAdminView = () => import('@/views/admin/DescuentosAdminView.vue')

const CarritoView = () => import('@/views/CarritoView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')
const IniciarSesionView = () => import('@/views/Login.vue')
const RegistroView = () => import('@/views/Register.vue')

const routes = [
  // Rutas de usuario
  { path: '/', name: 'Inicio', component: HomeView, meta: { layout: 'user' } },
  { path: '/cupones', name: 'Cupones', component: CuponesView, meta: { layout: 'user' } },
  { path: '/descuentos', name: 'Descuentos', component: DescuentosView, meta: { layout: 'user' } },
  { path: '/contactanos', name: 'Contactanos', component: ContactanosView, meta: { layout: 'user' } },
  { path: '/noticias', name: 'Recomendaciones', component: NoticiasView, meta: { layout: 'user' } },
  { path: '/carrito', name: 'Carrito', component: CarritoView, meta: { layout: 'user' } },

  // Rutas de admin
  { path: '/admin/dashboard', name: 'Dashboard', component: DashboardView, meta: { layout: 'admin' } },
  { path: '/admin/cupones', name: 'CuponesAdmin', component: CuponesAdminView, meta: { layout: 'admin' } },
  { path: '/admin/categorias', name: 'CategoriasAdmin', component: CategoriaAdminView, meta: { layout: 'admin' } },
  { path: '/admin/usuarios', name: 'UsuariosAdmin', component: UsuariosAdminView, meta: { layout: 'admin' } },
  { path: '/admin/descuentos', name: 'DescuentosAdmin', component: DescuentosAdminView, meta: { layout: 'admin' } },

  // Login / Registro (sin header/footer)
  { path: '/iniciar-sesion', name: 'IniciarSesión', component: IniciarSesionView, meta: { layout: 'none' } },
  { path: '/registro', name: 'Registro', component: RegistroView, meta: { layout: 'none' } },

  // Ruta 404
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView, meta: { layout: 'user' } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
