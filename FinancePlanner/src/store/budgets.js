import { computed, ref, watch } from 'vue'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db, firebaseReady } from '../firebase'
import { user } from './auth'

export const budgets = ref([])
export const loading = ref(true)

const localKey = (uid) => `financeplanner:budgets:${uid}`

function readLocal(uid) {
  try {
    return JSON.parse(localStorage.getItem(localKey(uid)) || '[]')
  } catch {
    return []
  }
}

function writeLocal(uid) {
  localStorage.setItem(localKey(uid), JSON.stringify(budgets.value))
}

let unsubscribe = null

watch(
  user,
  (u) => {
    unsubscribe?.()
    unsubscribe = null
    budgets.value = []

    if (!u) {
      loading.value = false
      return
    }

    if (!firebaseReady) {
      budgets.value = readLocal(u.uid)
      loading.value = false
      return
    }

    loading.value = true
    unsubscribe = onSnapshot(
      collection(db, 'users', u.uid, 'budgets'),
      (snap) => {
        budgets.value = snap.docs.map((d) => ({ category: d.id, ...d.data() }))
        loading.value = false
      },
      (err) => {
        console.error('budgets listener error', err)
        loading.value = false
      },
    )
  },
  { immediate: true },
)

export function limitFor(category) {
  return budgets.value.find((b) => b.category === category)?.limit ?? null
}

export async function setBudgetLimit(category, limit) {
  const u = user.value
  if (!u) return

  if (!firebaseReady) {
    const existing = budgets.value.find((b) => b.category === category)
    if (existing) existing.limit = limit
    else budgets.value.push({ category, limit })
    writeLocal(u.uid)
    return
  }

  await setDoc(doc(db, 'users', u.uid, 'budgets', category), { limit })
}

export async function clearBudgetLimit(category) {
  const u = user.value
  if (!u) return

  if (!firebaseReady) {
    budgets.value = budgets.value.filter((b) => b.category !== category)
    writeLocal(u.uid)
    return
  }

  await deleteDoc(doc(db, 'users', u.uid, 'budgets', category))
}

export const totalBudget = computed(() => budgets.value.reduce((sum, b) => sum + (b.limit || 0), 0))
