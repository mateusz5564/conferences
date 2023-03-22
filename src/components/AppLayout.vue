<template>
  <v-app>
    <v-app-bar class="px-4" color="primary" elevation="0">
      <v-app-bar-nav-icon class="ml-0" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="font-weight-bold"
        ><router-link to="/" class="text-decoration-none text-white"
          >Konferencje</router-link
        ></v-app-bar-title
      >
      <v-btn
        v-if="!userLoggedIn"
        :active="false"
        variant="outlined"
        prepend-icon="mdi-account-box-outline"
        to="logowanie"
        >Logowanie</v-btn
      >
      <template v-else>
        <v-btn class="mr-4" icon="mdi-calendar-plus" to="/nowa-konferencja" :active="false"></v-btn>
        <v-btn icon>
          <v-avatar color="info"><v-img :src="avatar" /></v-avatar>
          <v-menu activator="parent" max-width="300">
            <v-card>
              <v-card-title>
                <v-avatar color="info"><v-img :src="avatar" /></v-avatar>
                <p class="text-body-1 d-inline ml-3">{{ profile?.username }}</p>
              </v-card-title>
              <v-divider />
              <v-list class="pa-2">
                <v-list-item
                  v-for="item in userMenuItems"
                  :key="item.title"
                  :value="item.title"
                  :to="item.to"
                  active-color="primary"
                  rounded="lg"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>

                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  key="wyloguj"
                  value="wyloguj"
                  active-color="primary"
                  rounded="lg"
                  @click="handleLogout"
                >
                  <template v-slot:prepend>
                    <v-icon icon="mdi-logout-variant"></v-icon>
                  </template>

                  <v-list-item-title>Wyloguj</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer class="bg-primary pa-3" v-model="drawer" scrim elevation="0">
      <v-list>
        <v-list-item
          v-for="(item, i) in drawerItems"
          :key="i"
          :value="item"
          :to="item.to"
          rounded="lg"
        >
          <template v-slot:prepend>
            <v-icon color="#FFF" :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title class="text-caption">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { auth } from '@/includes/firebase'
import useUserStore from '@/stores/user'
import avatar from '@/assets/default_avatar.png'

export default defineComponent({
  name: 'AppLayout',
  data() {
    return {
      drawer: null as null | boolean,
      avatar,
      drawerItems: [
        { title: 'Konferencje', icon: 'mdi-view-grid', to: '/' },
        { title: 'Kalendarz', icon: 'mdi-calendar-month', to: '/kalendarz' },
      ],
      userMenuItems: [
        { title: 'Moje konferencje', icon: 'mdi-calendar-edit', to: '/moje-konferencje' },
        { title: 'Obserwowane', icon: 'mdi-calendar-star', to: '/obserwowane' },
        { title: 'Profil', icon: 'mdi-account-edit', to: '/profil' },
      ],
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn', 'profile']),
    currentUser: () => auth.currentUser,
  },
  methods: {
    ...mapActions(useUserStore, ['signOut']),
    async handleLogout() {
      try {
        this.signOut()
      } catch (err) {
        console.log(err)
      }
    },
  },
})
</script>
