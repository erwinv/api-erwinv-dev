import { cert, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import config from '../config.js'

const app = initializeApp({
  credential: cert(config.FIREBASE_SERVICE_ACCOUNT_KEY),
})

export default app

export const auth = getAuth(app)
