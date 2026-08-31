<script setup>
import { computed } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import { user } from '../store/auth'
import { monthlyTotals, totals, transactions } from '../store/transactions'
import { categoryMeta } from '../utils/categories'
import { formatDate, formatMoney } from '../utils/format'

const firstName = computed(() => (user.value?.displayName || user.value?.email || 'User').split(' ')[0])
const recent = computed(() => transactions.value.slice(0, 5))

function exportCsv() {
  const rows = [['Date', 'Type', 'Category', 'Description', 'Amount']]
  for (const t of transactions.value) {
    rows.push([t.date, t.type, t.category, t.note || '', t.amount])
  }
  const csv = rows.map((r) => r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'financetracker-transactions.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <AppLayout>
    <h1 class="text-2xl font-bold text-slate-900">Welcome back, {{ firstName }}! 👋</h1>
    <p class="mt-1 text-slate-500">Here's your financial overview for today</p>

    <div class="mt-6 grid gap-4 sm:grid-cols-3">
      <div class="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-white shadow-sm">
        <p class="text-sm font-medium text-indigo-100">Total Balance</p>
        <p class="mt-2 text-3xl font-bold tabular-nums">{{ formatMoney(totals.balance) }}</p>
        <p class="mt-3 flex items-center gap-1.5 text-xs text-indigo-100">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke-linecap="round" />
            <path d="M3 10h18M8 2v4M16 2v4" stroke-linecap="round" />
          </svg>
          All time
        </p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-start justify-between">
          <p class="text-sm font-medium text-slate-500">This Month's Income</p>
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path d="M7 17 17 7M7 7h10v10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
        <p class="mt-2 text-3xl font-bold tabular-nums text-emerald-600">
          {{ formatMoney(monthlyTotals.income) }}
        </p>
        <p class="mt-3 text-xs text-slate-400">Total: {{ formatMoney(totals.income) }}</p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-start justify-between">
          <p class="text-sm font-medium text-slate-500">This Month's Expenses</p>
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path d="M7 7l10 10M17 7v10H7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
        <p class="mt-2 text-3xl font-bold tabular-nums text-rose-600">
          {{ formatMoney(monthlyTotals.expense) }}
        </p>
        <p class="mt-3 text-xs text-slate-400">Total: {{ formatMoney(totals.expense) }}</p>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <RouterLink
        to="/add-income"
        class="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-emerald-200 hover:shadow"
      >
        <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
            <path d="M12 5v14M5 12h14" stroke-linecap="round" />
          </svg>
        </span>
        <span class="text-sm font-semibold text-slate-800">Add Income</span>
      </RouterLink>

      <RouterLink
        to="/add-expense"
        class="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-rose-200 hover:shadow"
      >
        <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
          <span class="text-lg font-bold">$</span>
        </span>
        <span class="text-sm font-semibold text-slate-800">Add Expense</span>
      </RouterLink>

      <RouterLink
        to="/goals"
        class="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-blue-200 hover:shadow"
      >
        <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
            <path d="M7 17 17 7M7 7h10v10" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="text-sm font-semibold text-slate-800">Set Goals</span>
      </RouterLink>

      <button
        class="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-purple-200 hover:shadow"
        @click="exportCsv"
      >
        <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
            <path
              d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span class="text-sm font-semibold text-slate-800">Export Data</span>
      </button>
    </div>

    <section class="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header class="flex items-center justify-between border-b border-slate-100 p-5">
        <h2 class="font-semibold text-slate-900">Recent Transactions</h2>
        <RouterLink to="/history" class="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-500">
          View All
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </RouterLink>
      </header>

      <p v-if="!recent.length" class="p-5 text-sm text-slate-500">No transactions yet.</p>

      <ul v-else class="divide-y divide-slate-100">
        <li
          v-for="t in recent"
          :key="t.id"
          class="flex items-center gap-4 border-l-4 px-5 py-4"
          :class="t.type === 'income' ? 'border-emerald-500' : 'border-rose-500'"
        >
          <span
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
            :class="t.type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'"
          >
            <svg
              v-if="t.type === 'income'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="h-5 w-5"
            >
              <path d="M7 17 17 7M7 7h10v10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
              <path d="M7 7l10 10M17 7v10H7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
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

          <div class="text-right">
            <p class="font-bold tabular-nums" :class="t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'">
              {{ t.type === 'income' ? '+' : '−' }}{{ formatMoney(t.amount) }}
            </p>
            <p class="text-xs capitalize text-slate-400">{{ t.type }}</p>
          </div>
        </li>
      </ul>
    </section>
  </AppLayout>
</template>
