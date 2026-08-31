import { computed, ref, watch } from 'vue'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { db, firebaseReady } from '../firebase'
import { user } from './auth'
import { CATEGORIES } from '../utils/categories'

export { CATEGORIES }

export const transactions = ref([])
export const loading = ref(true)

const localKey = (uid) => `financeplanner:tx:${uid}`

function readLocal(uid) {
  try {
    return JSON.parse(localStorage.getItem(localKey(uid)) || '[]')
  } catch {
    return []
  }
}

function writeLocal(uid) {
  localStorage.setItem(localKey(uid), JSON.stringify(transactions.value))
}

let unsubscribe = null

watch(
  user,
  (u) => {
    unsubscribe?.()
    unsubscribe = null
    transactions.value = []

    if (!u) {
      loading.value = false
      return
    }

    if (!firebaseReady) {
      transactions.value = readLocal(u.uid)
      loading.value = false
      return
    }

    loading.value = true
    const q = query(collection(db, 'users', u.uid, 'transactions'), orderBy('date', 'desc'))
    unsubscribe = onSnapshot(q, (snap) => {
      transactions.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      loading.value = false
    })
  },
  { immediate: true },
)

export async function addTransaction(tx) {
  const u = user.value
  if (!u) return

  const record = {
    type: tx.type,
    amount: Number(tx.amount),
    category: tx.category,
    note: tx.note?.trim() || '',
    date: tx.date,
    recurring: Boolean(tx.recurring),
    createdAt: Date.now(),
  }

  if (!firebaseReady) {
    transactions.value = [{ id: crypto.randomUUID(), ...record }, ...transactions.value].sort(
      (a, b) => b.date.localeCompare(a.date),
    )
    writeLocal(u.uid)
    return
  }

  await addDoc(collection(db, 'users', u.uid, 'transactions'), record)
}

export async function removeTransaction(id) {
  const u = user.value
  if (!u) return

  if (!firebaseReady) {
    transactions.value = transactions.value.filter((t) => t.id !== id)
    writeLocal(u.uid)
    return
  }

  await deleteDoc(doc(db, 'users', u.uid, 'transactions', id))
}

export const totals = computed(() => {
  let income = 0
  let expense = 0
  for (const t of transactions.value) {
    if (t.type === 'income') income += t.amount
    else expense += t.amount
  }
  return { income, expense, balance: income - expense }
})

const currentMonthKey = () => new Date().toISOString().slice(0, 7)

export const monthlyTotals = computed(() => {
  const key = currentMonthKey()
  let income = 0
  let expense = 0
  for (const t of transactions.value) {
    if (!t.date?.startsWith(key)) continue
    if (t.type === 'income') income += t.amount
    else expense += t.amount
  }
  return { income, expense }
})

export const spendingByCategory = computed(() => {
  const byCat = new Map()
  for (const t of transactions.value) {
    if (t.type !== 'expense') continue
    byCat.set(t.category, (byCat.get(t.category) || 0) + t.amount)
  }
  const total = [...byCat.values()].reduce((a, b) => a + b, 0)
  return [...byCat.entries()]
    .map(([category, amount]) => ({
      category,
      amount,
      percent: total ? Math.round((amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount)
})

export function spentInCategoryThisMonth(category) {
  const key = currentMonthKey()
  return transactions.value
    .filter((t) => t.type === 'expense' && t.category === category && t.date?.startsWith(key))
    .reduce((sum, t) => sum + t.amount, 0)
}
