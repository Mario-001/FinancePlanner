<script setup>
import { computed, ref } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import { CATEGORIES, removeTransaction, transactions } from '../store/transactions'
import { categoryMeta } from '../utils/categories'
import { formatDate, formatMoney } from '../utils/format'

const search = ref('')
const typeFilter = ref('all')
const categoryFilter = ref('all')

const allCategories = computed(() => [...new Set([...CATEGORIES.income, ...CATEGORIES.expense])].sort())

const filtered = computed(() =>
  transactions.value.filter((t) => {
    if (typeFilter.value !== 'all' && t.type !== typeFilter.value) return false
    if (categoryFilter.value !== 'all' && t.category !== categoryFilter.value) return false
    if (search.value.trim()) {
      const q = search.value.trim().toLowerCase()
      if (!t.category.toLowerCase().includes(q) && !(t.note || '').toLowerCase().includes(q)) return false
    }
    return true
  }),
)

async function remove(t) {
  if (confirm(`Delete "${t.note || t.category}"?`)) await removeTransaction(t.id)
}
</script>

<template>
  <AppLayout>
    <h1 class="text-2xl font-bold text-slate-900">Transaction History 🗂️</h1>
    <p class="mt-1 text-slate-500">View and manage all your financial transactions</p>

    <div class="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="relative">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" stroke-linecap="round" />
        </svg>
        <input
          v-model="search"
          type="text"
          placeholder="Search transactions..."
          class="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="f in ['all', 'income', 'expense']"
          :key="f"
          class="rounded-lg px-4 py-2 text-sm font-semibold capitalize transition"
          :class="
            typeFilter === f
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          "
          @click="typeFilter = f"
        >
          {{ f === 'all' ? 'All' : f === 'income' ? 'Income' : 'Expenses' }}
        </button>
      </div>

      <select
        v-model="categoryFilter"
        class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="all">All Categories</option>
        <option v-for="c in allCategories" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <p v-if="!filtered.length" class="mt-6 text-sm text-slate-500">No transactions match your filters.</p>

    <ul v-else class="mt-6 space-y-3">
      <li
        v-for="t in filtered"
        :key="t.id"
        class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <span
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg"
          :class="categoryMeta(t.category).chip"
        >
          {{ categoryMeta(t.category).icon }}
        </span>

        <div class="min-w-0 flex-1">
          <p class="truncate font-semibold text-slate-900">{{ t.note || t.category }}</p>
          <div class="mt-1 flex items-center gap-2">
            <span class="rounded-full px-2 py-0.5 text-xs font-medium" :class="categoryMeta(t.category).chip">
              {{ t.category }}
            </span>
            <span class="text-xs text-slate-400">{{ formatDate(t.date) }}</span>
          </div>
        </div>

        <p class="font-bold tabular-nums" :class="t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'">
          {{ t.type === 'income' ? '+' : '−' }}{{ formatMoney(t.amount) }}
        </p>

        <button
          class="shrink-0 text-slate-400 transition hover:text-rose-600"
          :aria-label="`Delete ${t.category}`"
          @click="remove(t)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
            <path
              d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </li>
    </ul>

    <div class="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
      <p class="text-sm text-slate-500">Total Transactions</p>
      <p class="mt-1 text-2xl font-bold text-slate-900">{{ filtered.length }}</p>
    </div>
  </AppLayout>
</template>
