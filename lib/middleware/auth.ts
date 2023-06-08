import { type UserRecord } from 'firebase-admin/auth'
import { type Middleware } from 'koa'
import { auth as firebaseAuth } from '../service/firebaseAdmin.js'

declare module 'koa' {
  interface DefaultState {
    user: UserRecord
  }
}

const BEARER_AUTH = /Bearer\s+(\S+)/

export function auth(): Middleware {
  return async (ctx, next) => {
    try {
      const match = BEARER_AUTH.exec(ctx.get('Authorization'))
      if (!match) throw new Error()
      const [, token] = match
      const verifiedClaims = await firebaseAuth.verifyIdToken(token)
      const user = await firebaseAuth.getUser(verifiedClaims.uid)
      ctx.state.user = user
      return next()
    } catch {
      ctx.status = 401
    }
  }
}
