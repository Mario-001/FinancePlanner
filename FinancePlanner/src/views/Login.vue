<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authError, signIn } from '../store/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const busy = ref(false)

async function submit() {
  busy.value = true
  await signIn(email.value, password.value)
  busy.value = false
  if (!authError.value) router.push('/dashboard')
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50/60 to-white px-4">
    <div class="w-full max-w-sm text-center">
      <div
        class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-8 w-8">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <h1 class="mt-5 text-2xl font-bold text-slate-900">Welcome Back</h1>
      <p class="mt-1 text-sm text-slate-500">Manage your finances with ease</p>

      <form
        class="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm"
        @submit.prevent="submit"
      >
        <div>
          <label class="block text-sm font-medium text-slate-700" for="email">Email Address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="student@example.com"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700" for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            minlength="6"
            autocomplete="current-password"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <p v-if="authError" class="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {{ authError }}
        </p>

        <button
          type="submit"
          :disabled="busy"
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
            <path
              d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Sign In
        </button>
      </form>

      <p class="mt-4 text-sm text-slate-500">
        Don't have an account?
        <RouterLink to="/register" class="font-medium text-blue-600 hover:text-blue-500">Sign up</RouterLink>
      </p>

      <p class="mt-8 text-xs text-slate-400">Track expenses • Save smarter • Achieve your goals</p>
    </div>
  </div>
</template>
