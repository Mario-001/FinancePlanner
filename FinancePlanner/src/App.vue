<script setup>
import { firebaseReady } from './firebase'
</script>

<template>
  <p
    v-if="!firebaseReady"
    class="border-b border-amber-200 bg-amber-50 px-6 py-2.5 text-center text-sm text-amber-800"
  >
    Local mode — data is saved in this browser only. Add your Firebase keys to
    <code class="font-mono">.env.local</code> to sync to Firestore.
  </p>
  <router-view />
</template>
