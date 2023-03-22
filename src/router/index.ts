import { createRouter, createWebHistory } from 'vue-router'
import ConferencesView from '@/views/ConferencesView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CalendarView from '@/views/CalendarView.vue'
import NewConferenceView from '@/views/NewConferenceView.vue'
import MyConferencesView from '@/views/MyConferencesView.vue'
import ObservedConferencesView from '@/views/ObservedConferencesView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ConferencesView,
    },
    {
      path: '/rejestracja',
      component: RegisterView,
    },
    {
      path: '/logowanie',
      component: LoginView,
    },
    {
      path: '/kalendarz',
      component: CalendarView,
    },
    {
      path: '/nowa-konferencja',
      component: NewConferenceView,
    },
    {
      path: '/moje-konferencje',
      component: MyConferencesView,
    },
    {
      path: '/obserwowane',
      component: ObservedConferencesView,
    },
    {
      path: '/profil',
      component: ProfileView,
    },
  ],
})

export default router
