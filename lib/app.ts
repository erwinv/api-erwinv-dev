import Router from '@koa/router'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { logger } from './middleware/logger.cjs'

export default function App() {
  const router = new Router()

  router.get('/ping', (ctx) => {
    ctx.body = 'pong'
  })

  const app = new Koa()
  app
    .use(bodyParser())
    .use(logger(app))
    .use(router.routes())
    .use(router.allowedMethods())
  return app
}
