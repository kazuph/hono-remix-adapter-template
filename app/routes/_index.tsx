import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Calculator, Github, Minus, Plus, Rocket, Twitter } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { getApiClient } from "~/lib/client";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export async function loader({ context, request }: LoaderFunctionArgs) {
  const res = await getApiClient(request).api.hello.$get();
  return {
    text: context.cloudflare.env.EXAMPLE_VARIABLE,
    res: await res.text(),
  };
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full p-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6" />
            <span className="text-xl font-bold">Hono Remix Template</span>
          </div>
          <div className="flex gap-4"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Calculator className="w-8 h-8" />
            Counter
          </h1>
          <div className="text-2xl">{count}</div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setCount((prev) => prev - 1)}>
              <Minus className="w-4 h-4 mr-1" />1
            </Button>
            <Button variant="default" onClick={() => setCount((prev) => prev + 1)}>
              <Plus className="w-4 h-4 mr-1" />1
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold">Hono API Response</h2>
          <div className="text-xl">
            <p>Environment Variable: {data.text}</p>
            <p>API Response: {data.res}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 border-t">
        <div className="container mx-auto text-center text-sm text-gray-600"></div>
      </footer>
    </div>
  );
}
