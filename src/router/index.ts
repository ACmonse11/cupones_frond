import { createRouter, createWebHistory } from 'vue-router'

// 🧭 Vistas del usuario
const HomeView = () => import('@/views/HomeView.vue')
const ContactanosView = () => import('@/views/ContactanosView.vue')
const CuponesView = () => import('@/views/CuponesView.vue')
const NoticiasView = () => import('@/views/NoticiasView.vue')
const DescuentosView = () => import('@/views/DescuentosView.vue')
const CarritoView = () => import('@/views/CarritoView.vue')

// 🧰 Vistas del administrador
const DashboardView = () => import('@/views/admin/DashboardView.vue')
const CuponesAdminView = () => import('@/views/admin/CuponesAdminView.vue')
const CategoriaAdminView = () => import('@/views/admin/CategoriaAdminView.vue')
const UsuariosAdminView = () => import('@/views/admin/UsuariosAdminView.vue')
const DescuentosAdminView = () => import('@/views/admin/DescuentosAdminView.vue')

// 🔐 Autenticación
const LoginView = () => import('@/views/Login.vue')
const RegisterView = () => import('@/views/Register.vue')

// 🚫 Página 404
const NotFoundView = () => import('@/views/NotFoundView.vue')

const routes = [
  // 🌍 Público
  { path: '/', name: 'Inicio', component: HomeView, meta: { layout: 'user' } },
  { path: '/cupones', name: 'Cupones', component: CuponesView, meta: { layout: 'user', title: 'Cupones Disponibles' } },
  { path: '/descuentos', name: 'Descuentos', component: DescuentosView, meta: { layout: 'user' } },
  { path: '/contactanos', name: 'Contactanos', component: ContactanosView, meta: { layout: 'user' } },
  { path: '/noticias', name: 'Noticias', component: NoticiasView, meta: { layout: 'user' } },
  { path: '/carrito', name: 'Carrito', component: CarritoView, meta: { layout: 'user' } },

  // 🧑‍💼 Admin (🔒 con rol)
  { path: '/admin/dashboard', name: 'Dashboard', component: DashboardView, meta: { layout: 'admin', requiresAuth: true, role: 'admin' } },
  { path: '/admin/cupones', name: 'CuponesAdmin', component: CuponesAdminView, meta: { layout: 'admin', requiresAuth: true, role: 'admin' } },
  { path: '/admin/categorias', name: 'CategoriasAdmin', component: CategoriaAdminView, meta: { layout: 'admin', requiresAuth: true, role: 'admin' } },
  { path: '/admin/usuarios', name: 'UsuariosAdmin', component: UsuariosAdminView, meta: { layout: 'admin', requiresAuth: true, role: 'admin' } },
  { path: '/admin/descuentos', name: 'DescuentosAdmin', component: DescuentosAdminView, meta: { layout: 'admin', requiresAuth: true, role: 'admin' } },

  // 🔑 Login/Register
  { path: '/login', name: 'Login', component: LoginView, meta: { layout: 'none', title: 'Iniciar Sesión' } },
  { path: '/register', name: 'Register', component: RegisterView, meta: { layout: 'none', title: 'Registro' } },

  // ❌ 404
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView, meta: { layout: 'user', title: 'Página no encontrada' } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// ✅ Middleware global de autenticación + roles
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  let user = null

  try {
    user = JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const isLoggedIn = Boolean(token && user && user.email)
  const role = String(user?.role || '').toLowerCase()

  // ✅ Permitir login/registro si NO está logueado
  if (!isLoggedIn && ['/login', '/register'].includes(to.path)) {
    return next()
  }

  // 🚫 Rutas admin protegidas
  if (to.meta.role === 'admin') {
    if (!isLoggedIn) {
      alert('🔒 Debes iniciar sesión para acceder al panel.')
      return next('/login')
    }
    if (!role.includes('admin')) {
      alert('🚫 Solo los administradores pueden acceder al panel.')
      return next('/')
    }
  }

  // 🔐 Rutas que requieren login
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/login')
  }

  // 🚫 Usuario logueado intentando entrar a login/register
  if (isLoggedIn && ['/login', '/register'].includes(to.path)) {
    return next(role.includes('admin') ? '/admin/dashboard' : '/')
  }

  next()
})

// 🧩 Título dinámico
router.afterEach((to) => {
  document.title = to.meta.title
    ? `KingKang | ${to.meta.title}`
    : 'KingKang Cuponera'
})

export default router
