import { ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, firebaseReady } from '../firebase'

const LOCAL_USER = { uid: 'local-user', email: 'local@financeplanner.app', displayName: 'User' }

export const user = ref(null)
export const authLoading = ref(true)
export const authError = ref('')

if (firebaseReady) {
  onAuthStateChanged(auth, (u) => {
    user.value = u
    authLoading.value = false
  })
} else {
  user.value = LOCAL_USER
  authLoading.value = false
}

function friendly(err) {
  const map = {
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/email-already-in-use': 'That email already has an account.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/invalid-email': 'That email address is not valid.',
  }
  return map[err?.code] || err?.message || 'Something went wrong.'
}

export async function signIn(email, password) {
  authError.value = ''
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    authError.value = friendly(err)
  }
}

export async function signUp(email, password, name) {
  authError.value = ''
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (name?.trim()) {
      await updateProfile(cred.user, { displayName: name.trim() })
      user.value = { ...cred.user, displayName: name.trim() }
    }
  } catch (err) {
    authError.value = friendly(err)
  }
}

export async function logOut() {
  if (firebaseReady) await signOut(auth)
}
