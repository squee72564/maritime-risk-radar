import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import type { router } from "./main";

export function Devtools({ appRouter }: { appRouter: typeof router }) {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools router={appRouter} />
    </>
  );
}
