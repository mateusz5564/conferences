import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDtYbZokAi1OVXplmLIpuxlJpppE0fijPA',
  authDomain: 'konferencje-95600.firebaseapp.com',
  databaseURL: 'https://konferencje-95600.firebaseio.com',
  projectId: 'konferencje-95600',
  storageBucket: 'konferencje-95600.appspot.com',
  messagingSenderId: '777474069958',
  appId: '1:777474069958:web:0eec11adf451e87a060ec7',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

export const firebaseErrors = {
  'auth/wrong-password': 'Nieprawidłowe hasło.',
  'auth/email-already-in-use': 'Podany adres email jest już w użyciu.',
  'auth/invalid-email': 'Wprowadzona wartość nie jest prawidłowym adresem email.',
  'auth/invalid-password': 'Hasło musi się składać z minimum 6 znaków.',
  'auth/user-not-found': 'Taki użytkownik nie istnieje.',
}
