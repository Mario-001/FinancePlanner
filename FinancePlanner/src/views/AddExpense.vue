<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'
import { addTransaction } from '../store/transactions'
import { EXPENSE_CATEGORIES } from '../utils/categories'
import { today } from '../utils/format'

const router = useRouter()
const busy = ref(false)

const form = reactive({
  amount: '',
  category: EXPENSE_CATEGORIES[0],
  note: '',
  date: today(),
  recurring: false,
})

async function submit() {
  if (!Number(form.amount)) return
  busy.value = true
  await addTransaction({ ...form, type: 'expense' })
  busy.value = false
  router.push('/dashboard')
}
</script>

<template>
  <AppLayout>
    <h1 class="text-2xl font-bold text-slate-900">Add Expense 💳</h1>
    <p class="mt-1 text-slate-500">Record a new expense transaction</p>

    <form
      class="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      @submit.prevent="submit"
    >
      <div>
        <label class="block text-sm font-medium text-slate-700" for="amount">Amount ($)</label>
        <input
          id="amount"
          v-model="form.amount"
          type="number"
          min="0.01"
          step="0.01"
          required
          placeholder="0.00"
          class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700" for="category">Category</label>
        <select
          id="category"
          v-model="form.category"
          class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
        >
          <option v-for="c in EXPENSE_CATEGORIES" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700" for="note">Description</label>
        <input
          id="note"
          v-model="form.note"
          type="text"
          placeholder="e.g., Weekly groceries"
          class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700" for="date">Date</label>
        <input
          id="date"
          v-model="form.date"
          type="date"
          required
          class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
        />
      </div>

      <label class="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <input v-model="form.recurring" type="checkbox" class="h-4 w-4 rounded text-rose-600" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-slate-500">
          <path d="M17 2 21 6 17 10M21 6H8a4 4 0 0 0-4 4v1M7 22l-4-4 4-4M3 18h13a4 4 0 0 0 4-4v-1" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="text-sm font-medium text-slate-700">Mark as recurring expense</span>
      </label>

      <div class="flex gap-3 pt-2">
        <button
          type="submit"
          :disabled="busy"
          class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-4 w-4">
            <path d="M12 5v14M5 12h14" stroke-linecap="round" />
          </svg>
          Add Expense
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
