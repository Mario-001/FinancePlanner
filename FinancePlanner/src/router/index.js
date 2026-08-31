import { createRouter, createWebHistory } from 'vue-router'
import { authLoading, user } from '../store/auth'

const routes = [
  { path: '/', name: 'landing', component: () => import('../views/LandingPage.vue') },
  { path: '/login', name: 'login', component: () => import('../views/Login.vue') },
  { path: '/register', name: 'register', component: () => import('../views/Register.vue') },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: () => import('../views/Analytics.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/budget',
    name: 'budget',
    component: () => import('../views/Budget.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/goals',
    name: 'goals',
    component: () => import('../views/Goals.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/History.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/add-income',
    name: 'add-income',
    component: () => import('../views/AddIncome.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/add-expense',
    name: 'add-expense',
    component: () => import('../views/AddExpense.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

function waitForAuth() {
  if (!authLoading.value) return Promise.resolve()
  return new Promise((resolve) => {
    const stop = setInterval(() => {
      if (!authLoading.value) {
        clearInterval(stop)
        resolve()
      }
    }, 20)
  })
}

router.beforeEach(async (to) => {
  await waitForAuth()

  if (to.meta.requiresAuth && !user.value) {
    return { name: 'login' }
  }

  if ((to.name === 'login' || to.name === 'register') && user.value) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
