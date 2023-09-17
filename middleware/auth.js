import { signInAnonymously } from "firebase/auth"
import { useFirebaseAuth } from 'vuefire'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useFirebaseAuth()
  try {
    await signInAnonymously(auth)
  } catch (e) {
    showError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
})