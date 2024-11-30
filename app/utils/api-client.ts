import { hc } from "hono/client";
import type { AppType } from "../../server";

let client: ReturnType<typeof hc<AppType>> | null = null;

export function getApiClient(request: Request) {
	if (client) return client;

	const url = new URL(request.url);
	const baseUrl = `${url.protocol}//${url.host}`;
	client = hc<AppType>(baseUrl);

	return client;
}
