import Cors from '@koa/cors'
import Router from '@koa/router'
import Koa, { type Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
import { getVideoToken } from './controller/twilio.js'
import { auth } from './middleware/auth.js'
import { err } from './middleware/error.js'
import { logger } from './middleware/logger.cjs'

const noContent: Middleware = (ctx) => {
  ctx.status = 204
}
const cors = Cors()

export default function App() {
  const router = new Router()

  router
    .get('/api/v1/ping', (ctx) => {
      ctx.body = 'pong'
    })
    .options('/api/v1/video/token', cors, noContent)
    .post('/api/v1/video/token', auth(), cors, getVideoToken())

  const app = new Koa()
  app
    .use(err())
    .use(bodyParser())
    .use(logger(app))
    .use(router.routes())
    .use(router.allowedMethods())
  return app
}
