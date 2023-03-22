import { createApp } from 'vue'
import type { App as TApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { onAuthStateChanged } from 'firebase/auth'
import vuetify from './includes/vuetify'
import validate from './includes/validate'
import { auth } from './includes/firebase'
import './assets/base.css'
import useUserStore from '@/stores/user'

let app: null | TApp = null

onAuthStateChanged(auth, async (user) => {
  if (!app) {
    app = createApp(App)

    app.use(vuetify)
    app.use(validate)
    app.use(createPinia())
    app.use(router)

    app.mount('#app')
  }

  const userStore = useUserStore()
  if (user) {
    try {
      await userStore.getProfile(user.uid)
    } catch (err) {
      console.log(err)
    }
  } else {
    userStore.profile = null
  }
})
