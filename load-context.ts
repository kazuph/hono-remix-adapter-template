import type { Context } from "hono";
import type { PlatformProxy } from "wrangler";

type GetLoadContextArgs = {
  request: Request
  context: {
    cloudflare: Omit<PlatformProxy<Env>, "dispose" | "caches" | "cf"> & {
      caches: PlatformProxy<Env>["caches"] | CacheStorage
      cf: Request["cf"]
    }
    hono: {
      context: Context;
    }
  }
}

declare module "@remix-run/cloudflare" {
  interface AppLoadContext extends ReturnType<typeof getLoadContext> {
    // This will merge the result of `getLoadContext` into the `AppLoadContext`
    extra: string
    hono: {
      context: Context;
    }
  }
}

export function getLoadContext({ context }: GetLoadContextArgs) {
  return {
    ...context,
    extra: "stuff",
  };
}