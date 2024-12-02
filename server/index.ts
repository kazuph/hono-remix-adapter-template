// server/index.ts
import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

app.use(async (c, next) => {
  await next();
  c.header("X-Powered-By", c.env.EXAMPLE_VARIABLE);
});

const route = app.get("/api/hello", (c) => {
  const name = c.env.EXAMPLE_VARIABLE;
  return c.text(`Hello ${name}?`);
});

export type AppType = typeof route;
export default app;
