import { createMiddleware } from "hono/factory";

import { logger } from "../lib/logger.js";

export const requestLoggerMiddleware = createMiddleware(async (c, next) => {
  const start = performance.now();

  await next();

  const durationMs = Math.round((performance.now() - start) * 100) / 100;

  logger.info(
    {
      durationMs,
      method: c.req.method,
      path: new URL(c.req.url).pathname,
      requestId: c.get("requestId"),
      status: c.res.status,
      userAgent: c.req.header("user-agent"),
    },
    "Request completed",
  );
});
