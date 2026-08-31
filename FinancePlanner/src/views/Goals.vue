<script setup>
import { computed, reactive, ref } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import { addGoal, goals, removeGoal, updateGoal, updateGoalAmount } from '../store/goals'
import { formatMoney, today } from '../utils/format'

const GOAL_CATEGORIES = ['General', 'Savings', 'Technology', 'Travel', 'Education', 'Emergency', 'Other']

const showForm = ref(false)
const editingId = ref(null)
const formError = ref('')
const busy = ref(false)

const form = reactive({ name: '', category: 'General', target: '', current: '', deadline: '' })

function resetForm() {
  form.name = ''
  form.category = 'General'
  form.target = ''
  form.current = ''
  form.deadline = ''
  editingId.value = null
}

function openAdd() {
  resetForm()
  formError.value = ''
  showForm.value = true
}

function openEdit(goal) {
  form.name = goal.name
  form.category = goal.category
  form.target = goal.target
  form.current = goal.current
  form.deadline = goal.deadline
  editingId.value = goal.id
  formError.value = ''
  showForm.value = true
}

function cancelForm() {
  showForm.value = false
  formError.value = ''
  resetForm()
}

async function submitForm() {
  if (!form.name.trim() || !Number(form.target)) return
  busy.value = true
  formError.value = ''
  try {
    if (editingId.value) {
      await updateGoal(editingId.value, {
        name: form.name.trim(),
        category: form.category,
        target: Number(form.target),
        current: Number(form.current) || 0,
        deadline: form.deadline,
      })
    } else {
      await addGoal(form)
    }
    cancelForm()
  } catch (err) {
    formError.value =
      err?.code === 'permission-denied'
        ? 'Firestore rejected this write. Make sure the updated security rules (covering budgets and goals) have been published in the Firebase Console.'
        : err?.message || 'Something went wrong saving this goal.'
  } finally {
    busy.value = false
  }
}

async function quickAdd(goal, amount) {
  await updateGoalAmount(goal.id, Math.min(goal.target, goal.current + amount))
}

async function complete(goal) {
  await updateGoalAmount(goal.id, goal.target)
}

async function remove(goal) {
  if (confirm(`Delete goal "${goal.name}"?`)) await removeGoal(goal.id)
}

function percent(goal) {
  return goal.target ? Math.min(100, Math.round((goal.current / goal.target) * 100)) : 0
}

function deadlineInfo(goal) {
  if (!goal.deadline) return { text: '', overdue: false }
  const diff = Math.ceil((new Date(`${goal.deadline}T00:00:00`) - new Date()) / 86400000)
  return diff < 0 ? { text: 'Overdue', overdue: true } : { text: `${diff} days left`, overdue: false }
}

function formatDeadline(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

const minDeadline = computed(() => today())
</script>

<template>
  <AppLayout>
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Savings Goals 🎯</h1>
        <p class="mt-1 text-slate-500">Track and achieve your financial goals</p>
      </div>

      <button
        v-if="!showForm"
        class="flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
        @click="openAdd"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-4 w-4">
          <path d="M12 5v14M5 12h14" stroke-linecap="round" />
        </svg>
        Add Goal
      </button>
      <button
        v-else
        class="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        @click="cancelForm"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
          <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
        </svg>
        Cancel
      </button>
    </div>

    <form
      v-if="showForm"
      class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      @submit.prevent="submitForm"
    >
      <h2 class="font-semibold text-slate-900">{{ editingId ? 'Edit Goal' : 'New Goal' }}</h2>

      <div class="mt-4 space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700" for="goal-name">Goal Name</label>
          <input
            id="goal-name"
            v-model="form.name"
            type="text"
            required
            placeholder="Emergency Fund"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700" for="goal-category">Category</label>
          <select
            id="goal-category"
            v-model="form.category"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option v-for="c in GOAL_CATEGORIES" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700" for="goal-target">Target Amount ($)</label>
          <input
            id="goal-target"
            v-model="form.target"
            type="number"
            min="1"
            step="0.01"
            required
            placeholder="1000.00"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700" for="goal-current">Current Amount ($)</label>
          <input
            id="goal-current"
            v-model="form.current"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700" for="goal-deadline">Deadline</label>
          <input
            id="goal-deadline"
            v-model="form.deadline"
            type="date"
            :min="minDeadline"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <p v-if="formError" class="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{{ formError }}</p>

        <button
          type="submit"
          :disabled="busy"
          class="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-4 w-4">
            <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ editingId ? 'Save Changes' : 'Create Goal' }}
        </button>
      </div>
    </form>

    <p v-if="!goals.length && !showForm" class="mt-6 text-sm text-slate-500">
      No savings goals yet. Click "Add Goal" to create one.
    </p>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div
        v-for="goal in goals"
        :key="goal.id"
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-semibold text-slate-900">{{ goal.name }}</h3>
            <p class="text-sm text-slate-400">{{ goal.category }}</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="text-slate-400 hover:text-slate-700" @click="openEdit(goal)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path
                  d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button class="text-rose-400 hover:text-rose-600" @click="remove(goal)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path
                  d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="mt-4 flex items-baseline justify-between">
          <span class="font-medium tabular-nums text-slate-900">
            {{ formatMoney(goal.current) }} / {{ formatMoney(goal.target) }}
          </span>
          <span class="font-semibold text-blue-600">{{ percent(goal) }}%</span>
        </div>
        <div class="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div class="h-full rounded-full bg-blue-600 transition-all" :style="{ width: `${percent(goal)}%` }" />
        </div>

        <div v-if="goal.deadline" class="mt-3 flex items-center justify-between text-xs">
          <span class="text-slate-400">Deadline: {{ formatDeadline(goal.deadline) }}</span>
          <span :class="deadlineInfo(goal).overdue ? 'font-medium text-rose-600' : 'text-slate-400'">
            {{ deadlineInfo(goal).text }}
          </span>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <button
            class="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100"
            @click="quickAdd(goal, 50)"
          >
            +$50
          </button>
          <button
            class="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100"
            @click="quickAdd(goal, 100)"
          >
            +$100
          </button>
          <button
            class="rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-100"
            @click="complete(goal)"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
