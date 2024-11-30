import { defineConfig } from "vite";
import {
	vitePlugin as remix,
	cloudflareDevProxyVitePlugin,
} from "@remix-run/dev";
import serverAdapter from "hono-remix-adapter/vite";
import adapter from "@hono/vite-dev-server/cloudflare";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from "./load-context";

declare module "@remix-run/cloudflare" {
	interface Future {
		v3_singleFetch: true;
	}
}

export default defineConfig({
	plugins: [
		cloudflareDevProxyVitePlugin(),
		remix({
			future: {
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
				v3_throwAbortReason: true,
				v3_singleFetch: true,
				v3_lazyRouteDiscovery: true,
			},
		}),
		serverAdapter({
			adapter,
			getLoadContext,
			entry: "server/index.ts",
		}),
		tsconfigPaths(),
	],
	ssr: {
		resolve: {
			conditions: ["workerd", "worker", "browser"],
		},
	},
	resolve: {
		mainFields: ["browser", "module", "main"],
	},
	build: {
		minify: true,
	},
});
