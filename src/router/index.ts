import { createRouter, createWebHistory } from "vue-router"

// Layouts
import AdminLayout from "@/layouts/admin/AdminLayout.vue"
import UserLayout from "@/layouts/UserLayout.vue"

// User Views
const HomeView = () => import("@/views/HomeView.vue")
const CuponesView = () => import("@/views/CuponesView.vue")
const ContactanosView = () => import("@/views/ContactanosView.vue")
const NoticiasView = () => import("@/views/NoticiasView.vue")
const DescuentosView = () => import("@/views/DescuentosView.vue")
const CarritoView = () => import("@/views/CarritoView.vue")

// Auth Views
const LoginView = () => import("@/views/Login.vue")
const RegisterView = () => import("@/views/Register.vue")

// Admin Views
const DashboardView = () => import("@/views/admin/DashboardView.vue")
const UsuariosAdminView = () => import("@/views/admin/UsuariosAdminView.vue")
const CuponesAdminView = () => import("@/views/admin/CuponesAdminView.vue")
const CategoriaAdminView = () => import("@/views/admin/CategoriaAdminView.vue")
const DescuentosAdminView = () => import("@/views/admin/DescuentosAdminView.vue")
const BannersAdminView = () => import("@/views/admin/BannersAdminView.vue")
const LogosAdminView = () => import("@/views/admin/LogoAdminView.vue")
const CouponStatsView = () => import("@/views/admin/CouponStatsView.vue")

// Not Found
const NotFoundView = () => import("@/views/NotFoundView.vue")

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ▶ RUTAS PÚBLICAS
    {
      path: "/",
      component: UserLayout,
      children: [
        { path: "", component: HomeView },
        { path: "cupones", component: CuponesView },
        { path: "contactanos", component: ContactanosView },
        { path: "noticias", component: NoticiasView },
        { path: "descuentos", component: DescuentosView },
        { path: "carrito", component: CarritoView },
      ],
    },

    // ▶ LOGIN Y REGISTRO
    { path: "/login", component: LoginView },
    { path: "/register", component: RegisterView },

    // ▶ RUTAS ADMIN (PROTEGIDAS)
    {
      path: "/admin",
      component: AdminLayout,
      children: [
        { path: "dashboard", component: DashboardView },
        { path: "usuarios", component: UsuariosAdminView },
        { path: "cupones", component: CuponesAdminView },
        { path: "categorias", component: CategoriaAdminView },
        { path: "descuentos", component: DescuentosAdminView },
        { path: "banners", component: BannersAdminView },
        { path: "logos", component: LogosAdminView },   // 👈 NUEVA RUTA
        { path: "estadisticas-cupones", component: CouponStatsView }, // 👈 NUEVA RUTA
      ],
    },

    // ▶ 404
    { path: "/:pathMatch(.*)*", component: NotFoundView },
  ],
})

// ========================================================
// 🔐 PROTECCIÓN DE RUTAS
// ========================================================
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user") || "null")
  const logged = !!token && !!user
  const isAdmin = user?.role === "admin"

  // Permitir siempre login y register
  if (to.path === "/login" || to.path === "/register") {
    if (!logged) return next()
    return next(isAdmin ? "/admin/dashboard" : "/")
  }

  // Bloquear admin si NO está logueado
  if (to.path.startsWith("/admin")) {
    if (!logged) return next("/login")
    if (!isAdmin) return next("/")
  }

  next()
})

export default router
