<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { logOut, user } from '../store/auth'
import { firebaseReady } from '../firebase'

const menuOpen = ref(false)

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: 'grid' },
  { to: '/analytics', label: 'Analytics', icon: 'pie' },
  { to: '/history', label: 'History', icon: 'clock' },
  { to: '/goals', label: 'Goals', icon: 'target' },
  { to: '/budget', label: 'Budget', icon: 'trend' },
]

async function handleLogout() {
  menuOpen.value = false
  await logOut()
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <RouterLink to="/dashboard" class="flex items-center gap-2">
          <span
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
              <path
                d="M21 12V7H5a2 2 0 0 1 0-4h14v4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 5v14a2 2 0 0 0 2 2h16v-5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="text-lg font-bold text-slate-900">FinanceTracker</span>
        </RouterLink>

        <nav class="hidden items-center gap-1 md:flex">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            active-class="!bg-blue-50 !text-blue-600"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <div class="hidden items-center gap-3 md:flex">
          <button
            class="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            @click="handleLogout"
          >
            Logout
          </button>
        </div>

        <button
          class="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Open menu"
          @click="menuOpen = true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
            <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="menuOpen" class="fixed inset-0 z-40 bg-white md:hidden">
          <div class="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <span class="flex items-center gap-2">
              <span
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <span class="text-lg font-bold text-slate-900">FinanceTracker</span>
            </span>
            <button
              class="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Close menu"
              @click="menuOpen = false"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
                <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <nav class="flex flex-col gap-1 p-4">
            <RouterLink
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              class="rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-100"
              active-class="!bg-blue-50 !text-blue-600"
              @click="menuOpen = false"
            >
              {{ link.label }}
            </RouterLink>
            <button
              class="mt-2 flex items-center gap-2 rounded-lg px-4 py-3 text-left text-base font-medium text-rose-600 transition hover:bg-rose-50"
              @click="handleLogout"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                <path
                  d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Logout
            </button>
          </nav>
        </div>
      </Transition>
    </header>

    <p
      v-if="!firebaseReady"
      class="border-b border-amber-200 bg-amber-50 px-6 py-2 text-center text-xs text-amber-800"
    >
      Local mode — data is saved in this browser only.
    </p>

    <main class="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <slot />
    </main>

    <footer class="border-t border-slate-200 bg-white">
      <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div class="flex items-center gap-2">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="font-bold text-slate-900">FinanceTracker</span>
        </div>
        <p class="mt-2 max-w-sm text-sm text-slate-500">
          Smart financial management for students and young professionals.
        </p>
        <p class="mt-6 text-xs text-slate-400">© 2026 FinanceTracker. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
