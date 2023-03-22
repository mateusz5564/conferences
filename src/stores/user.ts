import { defineStore } from 'pinia'
import { auth, db } from '@/includes/firebase'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import type { LoginForm, RegisterForm, ResetPasswordForm, UserProfile } from '@/types'

export default defineStore('user', {
  state: () => ({ userLoggedIn: false, profile: null as UserProfile | null }),
  actions: {
    async signUpWithEmail(values: RegisterForm) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username: values.username,
      })

      this.userLoggedIn = true
    },
    async signInWithEmail(values: LoginForm) {
      await signInWithEmailAndPassword(auth, values.email, values.password)

      this.userLoggedIn = true
    },
    async signOut() {
      await signOut(auth)

      this.userLoggedIn = false
    },
    async resetPassword(values: ResetPasswordForm) {
      await sendPasswordResetEmail(auth, values.email)
    },
    async getProfile(uid: string) {
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        this.profile = docSnap.data() as UserProfile
      } else {
        console.log(`User's profile doesn't exist.`)
      }
    },
  },
})
