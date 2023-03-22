<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapWritableState } from 'pinia'

import useUserStore from '@/stores/user'
import AppLayout from '@/components/AppLayout.vue'
import { auth } from './includes/firebase'

export default defineComponent({
  name: 'App',
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },
  components: {
    AppLayout,
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  },
})
</script>
