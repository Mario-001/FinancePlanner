<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authError, signUp } from '../store/auth'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const busy = ref(false)

async function submit() {
  busy.value = true
  await signUp(email.value, password.value, name.value)
  busy.value = false
  if (!authError.value) router.push('/dashboard')
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-50/60 to-white px-4">
    <div class="w-full max-w-sm text-center">
      <div
        class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white shadow-sm"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-8 w-8">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <h1 class="mt-5 text-2xl font-bold text-slate-900">Create Account</h1>
      <p class="mt-1 text-sm text-slate-500">Start managing your money today</p>

      <form
        class="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm"
        @submit.prevent="submit"
      >
        <div>
          <label class="block text-sm font-medium text-slate-700" for="name">Full Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            autocomplete="name"
            placeholder="John Doe"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700" for="email">Email Address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="student@example.com"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
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
            autocomplete="new-password"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        <p v-if="authError" class="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {{ authError }}
        </p>

        <button
          type="submit"
          :disabled="busy"
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
            <path
              d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM19 8v6M22 11h-6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Create Account
        </button>
      </form>

      <p class="mt-4 text-sm text-slate-500">
        Already have an account?
        <RouterLink to="/login" class="font-medium text-purple-600 hover:text-purple-500">Sign in</RouterLink>
      </p>

      <p class="mt-8 text-xs text-slate-400">Simple • Secure • Student-friendly</p>
    </div>
  </div>
</template>
