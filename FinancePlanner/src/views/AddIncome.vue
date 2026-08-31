<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'
import { addTransaction } from '../store/transactions'
import { INCOME_CATEGORIES } from '../utils/categories'
import { today } from '../utils/format'

const router = useRouter()
const busy = ref(false)

const form = reactive({
  amount: '',
  category: INCOME_CATEGORIES[0],
  note: '',
  date: today(),
  recurring: false,
})

async function submit() {
  if (!Number(form.amount)) return
  busy.value = true
  await addTransaction({ ...form, type: 'income' })
  busy.value = false
  router.push('/dashboard')
}
</script>

<template>
  <AppLayout>
    <h1 class="text-2xl font-bold text-slate-900">Add Income 💵</h1>
    <p class="mt-1 text-slate-500">Track your earnings and keep your finances up to date</p>

    <form
      class="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      @submit.prevent="submit"
    >
      <div>
        <label class="block text-sm font-medium text-slate-700" for="amount">Amount</label>
        <div class="relative mt-1">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
          <input
            id="amount"
            v-model="form.amount"
            type="number"
            min="0.01"
            step="0.01"
            required
            placeholder="0.00"
            class="w-full rounded-lg border border-slate-300 py-2 pl-7 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700" for="category">Category</label>
        <select
          id="category"
          v-model="form.category"
          class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        >
          <option v-for="c in INCOME_CATEGORIES" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700" for="date">Date</label>
        <input
          id="date"
          v-model="form.date"
          type="date"
          required
          class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700" for="note">Description</label>
        <input
          id="note"
          v-model="form.note"
          type="text"
          placeholder="e.g., Monthly scholarship payment"
          class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <label
        class="flex cursor-pointer items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3"
      >
        <input v-model="form.recurring" type="checkbox" class="h-4 w-4 rounded text-emerald-600" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-emerald-600">
          <path d="M17 2 21 6 17 10M21 6H8a4 4 0 0 0-4 4v1M7 22l-4-4 4-4M3 18h13a4 4 0 0 0 4-4v-1" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="text-sm font-medium text-emerald-800">Mark as recurring income</span>
      </label>

      <div class="flex gap-3 pt-2">
        <button
          type="submit"
          :disabled="busy"
          class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-4 w-4">
            <path d="M12 5v14M5 12h14" stroke-linecap="round" />
          </svg>
          Add Income
        </button>
        <RouterLink
          to="/dashboard"
          class="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
            <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
          Cancel
        </RouterLink>
      </div>
    </form>
  </AppLayout>
</template>
