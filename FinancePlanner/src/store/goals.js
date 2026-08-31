import { ref, watch } from 'vue'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { db, firebaseReady } from '../firebase'
import { user } from './auth'

export const goals = ref([])
export const loading = ref(true)

const localKey = (uid) => `financeplanner:goals:${uid}`

function readLocal(uid) {
  try {
    return JSON.parse(localStorage.getItem(localKey(uid)) || '[]')
  } catch {
    return []
  }
}

function writeLocal(uid) {
  localStorage.setItem(localKey(uid), JSON.stringify(goals.value))
}

let unsubscribe = null

watch(
  user,
  (u) => {
    unsubscribe?.()
    unsubscribe = null
    goals.value = []

    if (!u) {
      loading.value = false
      return
    }

    if (!firebaseReady) {
      goals.value = readLocal(u.uid)
      loading.value = false
      return
    }

    loading.value = true
    const q = query(collection(db, 'users', u.uid, 'goals'), orderBy('createdAt', 'desc'))
    unsubscribe = onSnapshot(
      q,
      (snap) => {
        goals.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        loading.value = false
      },
      (err) => {
        console.error('goals listener error', err)
        loading.value = false
      },
    )
  },
  { immediate: true },
)

export async function addGoal(goal) {
  const u = user.value
  if (!u) return

  const record = {
    name: goal.name.trim(),
    category: goal.category,
    target: Number(goal.target),
    current: Number(goal.current) || 0,
    deadline: goal.deadline || '',
    createdAt: Date.now(),
  }

  if (!firebaseReady) {
    goals.value = [{ id: crypto.randomUUID(), ...record }, ...goals.value]
    writeLocal(u.uid)
    return
  }

  await addDoc(collection(db, 'users', u.uid, 'goals'), record)
}

export async function updateGoalAmount(id, current) {
  return updateGoal(id, { current })
}

export async function updateGoal(id, patch) {
  const u = user.value
  if (!u) return

  if (!firebaseReady) {
    const g = goals.value.find((g) => g.id === id)
    if (g) Object.assign(g, patch)
    writeLocal(u.uid)
    return
  }

  await updateDoc(doc(db, 'users', u.uid, 'goals', id), patch)
}

export async function removeGoal(id) {
  const u = user.value
  if (!u) return

  if (!firebaseReady) {
    goals.value = goals.value.filter((g) => g.id !== id)
    writeLocal(u.uid)
    return
  }

  await deleteDoc(doc(db, 'users', u.uid, 'goals', id))
}
