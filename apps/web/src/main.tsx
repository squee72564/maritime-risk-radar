import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";

import { routeTree } from "./routeTree.gen";
import "./styles.css";

const queryClient = new QueryClient();
export const router = createRouter({ routeTree });

const Devtools = import.meta.env.DEV
  ? React.lazy(() =>
      import("./devtools").then((module) => ({
        default: module.Devtools,
      })),
    )
  : null;

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {Devtools ? (
        <React.Suspense fallback={null}>
          <Devtools appRouter={router} />
        </React.Suspense>
      ) : null}
    </QueryClientProvider>
  </React.StrictMode>,
);
