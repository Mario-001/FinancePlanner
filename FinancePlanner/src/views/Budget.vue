<script setup>
import { computed, reactive } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import { limitFor, setBudgetLimit, totalBudget } from '../store/budgets'
import { monthlyTotals, spentInCategoryThisMonth } from '../store/transactions'
import { EXPENSE_CATEGORIES, categoryMeta } from '../utils/categories'
import { formatMoney } from '../utils/format'

const editing = reactive({ category: null, value: '' })

const remaining = computed(() => totalBudget.value - monthlyTotals.expense)
const usedPercent = computed(() =>
  totalBudget.value ? Math.min(100, Math.round((monthlyTotals.expense / totalBudget.value) * 100)) : 0,
)

function startEdit(category) {
  editing.category = category
  editing.value = limitFor(category) ?? ''
}

function cancelEdit() {
  editing.category = null
  editing.value = ''
}

async function confirmEdit(category) {
  const value = Number(editing.value)
  if (!Number.isFinite(value) || value < 0) return
  await setBudgetLimit(category, value)
  cancelEdit()
}

function categoryPercent(category) {
  const limit = limitFor(category)
  if (!limit) return 0
  return Math.min(100, Math.round((spentInCategoryThisMonth(category) / limit) * 100))
}
</script>

<template>
  <AppLayout>
    <h1 class="text-2xl font-bold text-slate-900">Budget Planning 💰</h1>
    <p class="mt-1 text-slate-500">Set spending limits and track your monthly budget</p>

    <section class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="font-semibold text-slate-900">Monthly Budget Overview</h2>

      <div class="mt-4 grid gap-6 sm:grid-cols-3">
        <div>
          <p class="text-sm text-slate-500">Total Budget</p>
          <p class="mt-1 text-2xl font-bold tabular-nums text-slate-900">{{ formatMoney(totalBudget) }}</p>
        </div>
        <div>
          <p class="text-sm text-slate-500">Total Spent</p>
          <p class="mt-1 text-2xl font-bold tabular-nums text-emerald-600">
            {{ formatMoney(monthlyTotals.expense) }}
          </p>
        </div>
        <div>
          <p class="text-sm text-slate-500">Remaining</p>
          <p class="mt-1 text-2xl font-bold tabular-nums text-blue-600">{{ formatMoney(remaining) }}</p>
        </div>
      </div>

      <div class="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
        <div class="h-full rounded-full bg-blue-600 transition-all" :style="{ width: `${usedPercent}%` }" />
      </div>
      <div class="mt-2 flex justify-between text-xs text-slate-400">
        <span>0%</span>
        <span>{{ usedPercent }}% used</span>
        <span>100%</span>
      </div>
    </section>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div
        v-for="category in EXPENSE_CATEGORIES"
        :key="category"
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-slate-900">{{ category }}</h3>

          <div v-if="editing.category === category" class="flex items-center gap-1.5">
            <input
              v-model="editing.value"
              type="number"
              min="0"
              step="1"
              autofocus
              class="w-24 rounded-lg border border-slate-300 px-2 py-1 text-sm outline-none focus:border-blue-500"
            />
            <button
              class="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
              @click="confirmEdit(category)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-4 w-4">
                <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button
              class="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-500 hover:bg-slate-200"
              @click="cancelEdit"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-4 w-4">
                <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <button
            v-else
            class="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-500"
            @click="startEdit(category)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
              <path
                d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ limitFor(category) ? 'Edit' : 'Set Limit' }}
          </button>
        </div>

        <template v-if="limitFor(category)">
          <div class="mt-4 flex items-baseline justify-between">
            <span class="text-lg font-bold tabular-nums text-slate-900">
              {{ formatMoney(spentInCategoryThisMonth(category)) }}
            </span>
            <span class="text-sm text-slate-400">of {{ formatMoney(limitFor(category)) }}</span>
          </div>
          <div class="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              class="h-full rounded-full transition-all"
              :class="categoryPercent(category) >= 100 ? 'bg-rose-500' : categoryMeta(category).iconBg"
              :style="{ width: `${categoryPercent(category)}%` }"
            />
          </div>
          <p
            class="mt-1 text-xs"
            :class="categoryPercent(category) >= 100 ? 'font-medium text-rose-600' : 'text-slate-400'"
          >
            {{ categoryPercent(category) }}% used
          </p>
        </template>

        <div v-else class="mt-6 flex flex-col items-center gap-2 py-4 text-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-8 w-8 text-slate-300">
            <path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p class="text-sm text-slate-400">No budget limit set</p>
          <p class="text-xs text-slate-400">Click "Set Limit" to start tracking</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
