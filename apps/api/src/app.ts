import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { checkDatabaseReady } from "./db/client.js";
import { logger } from "./lib/logger.js";
import { normalizeError, toErrorResponse } from "./lib/errors.js";
import { requestIdMiddleware } from "./middleware/request-id.js";
import { requestLoggerMiddleware } from "./middleware/request-logger.js";
import { chokepointRoutes } from "./routes/chokepoints.js";
import { healthRoutes } from "./routes/health.js";
import { createReadyRoutes } from "./routes/ready.js";
import { versionRoutes } from "./routes/version.js";
import type { AppBindings } from "./types/hono.js";

export type AppDependencies = {
  checkDatabaseReady?: () => Promise<boolean>;
};

export function createApp({
  checkDatabaseReady: checkReady = checkDatabaseReady,
}: AppDependencies = {}) {
  const app = new Hono<AppBindings>();

  app.use("*", requestIdMiddleware);
  app.use("*", requestLoggerMiddleware);

  app.route("/api", healthRoutes);
  app.route("/api", createReadyRoutes({ checkDatabaseReady: checkReady }));
  app.route("/api", versionRoutes);
  app.route("/api", chokepointRoutes);

  app.notFound(() => {
    throw new HTTPException(404, { message: "Not found" });
  });

  app.onError((error, c) => {
    const appError = normalizeError(error);
    const requestId = c.get("requestId") ?? crypto.randomUUID();

    logger.error(
      {
        code: appError.code,
        error: appError,
        method: c.req.method,
        path: new URL(c.req.url).pathname,
        requestId,
        status: appError.status,
      },
      "Request failed",
    );

    c.header("x-request-id", requestId);

    return c.json(toErrorResponse(appError, requestId), appError.status);
  });

  return app;
}
