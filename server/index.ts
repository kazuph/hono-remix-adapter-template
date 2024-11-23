// server/index.ts
import { Hono } from "hono"

const app = new Hono<{Bindings: Env}>()

app.use(async (c, next) => {
  await next()
  c.header('X-Powered-By', c.env.EXAMPLE_VARIABLE)
})

export default app