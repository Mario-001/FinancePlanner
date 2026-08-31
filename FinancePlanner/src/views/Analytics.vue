<script setup>
import { computed } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import { spendingByCategory, totals } from '../store/transactions'
import { categoryColor } from '../utils/categories'
import { formatMoney } from '../utils/format'

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${cx},${cy} L ${start.x},${start.y} A ${r},${r} 0 ${largeArc} 0 ${end.x},${end.y} Z`
}

const pieSlices = computed(() => {
  const total = spendingByCategory.value.reduce((sum, c) => sum + c.amount, 0)
  if (!total) return []
  let angle = 0
  return spendingByCategory.value.map((c, i) => {
    const sweep = Math.min((c.amount / total) * 360, 359.99)
    const slice = { path: arcPath(100, 100, 90, angle, angle + sweep), color: categoryColor(i), ...c }
    angle += sweep
    return slice
  })
})

const maxCategoryAmount = computed(() =>
  Math.max(1, ...spendingByCategory.value.map((c) => c.amount)),
)

const chartMax = computed(() => {
  const max = maxCategoryAmount.value
  const pow = 10 ** Math.floor(Math.log10(max))
  return Math.ceil(max / pow) * pow
})

const gridLines = computed(() => {
  const steps = 4
  return Array.from({ length: steps + 1 }, (_, i) => Math.round((chartMax.value / steps) * i))
})
</script>

<template>
  <AppLayout>
    <h1 class="text-2xl font-bold text-slate-900">Analytics &amp; Insights 📊</h1>
    <p class="mt-1 text-slate-500">Visualize your spending patterns and trends</p>

    <div class="mt-6 grid gap-4 sm:grid-cols-3">
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-start justify-between">
          <p class="text-sm font-medium text-slate-500">Total Income</p>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-emerald-500">
            <path d="M7 17 17 7M7 7h10v10" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <p class="mt-2 text-3xl font-bold tabular-nums text-emerald-600">{{ formatMoney(totals.income) }}</p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-start justify-between">
          <p class="text-sm font-medium text-slate-500">Total Expenses</p>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-rose-500">
            <path d="M7 7l10 10M17 7v10H7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <p class="mt-2 text-3xl font-bold tabular-nums text-rose-600">{{ formatMoney(totals.expense) }}</p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-start justify-between">
          <p class="text-sm font-medium text-slate-500">Net Balance</p>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-blue-500">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 0 1 0 18" />
          </svg>
        </div>
        <p class="mt-2 text-3xl font-bold tabular-nums text-blue-600">{{ formatMoney(totals.balance) }}</p>
      </div>
    </div>

    <section class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="font-semibold text-slate-900">Expense Distribution</h2>

      <div v-if="!pieSlices.length" class="mt-6 text-sm text-slate-500">No expenses recorded yet.</div>

      <div v-else class="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <svg viewBox="0 0 200 200" class="h-56 w-56 shrink-0">
          <path v-for="s in pieSlices" :key="s.category" :d="s.path" :fill="s.color" stroke="white" stroke-width="2" />
        </svg>

        <ul class="space-y-2">
          <li v-for="s in pieSlices" :key="s.category" class="flex items-center gap-2 text-sm">
            <span class="h-3 w-3 shrink-0 rounded-sm" :style="{ backgroundColor: s.color }" />
            <span class="font-medium text-slate-700">{{ s.category }}</span>
            <span class="text-slate-400">{{ s.percent }}%</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="font-semibold text-slate-900">Spending by Category</h2>

      <div v-if="!spendingByCategory.length" class="mt-6 text-sm text-slate-500">No expenses recorded yet.</div>

      <div v-else class="mt-6 flex gap-3">
        <div class="flex h-56 flex-col justify-between text-xs text-slate-400">
          <span v-for="g in [...gridLines].reverse()" :key="g">{{ g }}</span>
        </div>

        <div class="flex h-56 flex-1 items-end gap-4 border-l border-b border-slate-200 pb-0 pl-4">
          <div
            v-for="(c, i) in spendingByCategory"
            :key="c.category"
            class="flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            <div
              class="w-full max-w-14 rounded-t-md transition-all"
              :style="{ height: `${(c.amount / chartMax) * 100}%`, backgroundColor: categoryColor(i) }"
            />
            <span class="text-xs font-medium text-slate-600">{{ c.category }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="font-semibold text-slate-900">Category Breakdown</h2>

      <p v-if="!spendingByCategory.length" class="mt-4 text-sm text-slate-500">No expenses recorded yet.</p>

      <ul v-else class="mt-4 space-y-4">
        <li v-for="(c, i) in spendingByCategory" :key="c.category">
          <div class="flex items-center gap-3">
            <span class="h-3 w-3 shrink-0 rounded-sm" :style="{ backgroundColor: categoryColor(i) }" />
            <span class="flex-1 font-medium text-slate-700">{{ c.category }}</span>
            <span class="font-semibold tabular-nums text-slate-900">{{ formatMoney(c.amount) }}</span>
            <span class="w-14 text-right text-sm text-slate-400">{{ c.percent }}%</span>
          </div>
          <div class="mt-2 ml-6 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              class="h-full rounded-full"
              :style="{ width: `${c.percent}%`, backgroundColor: categoryColor(i) }"
            />
          </div>
        </li>
      </ul>
    </section>
  </AppLayout>
</template>
