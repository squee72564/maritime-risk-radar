import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { env } from "./config/env.js";
import { dbPool } from "./db/client.js";
import { logger } from "./lib/logger.js";
import { normalizeError, toErrorResponse } from "./lib/errors.js";
import { requestIdMiddleware } from "./middleware/request-id.js";
import { requestLoggerMiddleware } from "./middleware/request-logger.js";
import { chokepointRoutes } from "./routes/chokepoints.js";
import { healthRoutes } from "./routes/health.js";
import { readyRoutes } from "./routes/ready.js";
import { versionRoutes } from "./routes/version.js";
import type { AppBindings } from "./types/hono.js";

const app = new Hono<AppBindings>();

app.use("*", requestIdMiddleware);
app.use("*", requestLoggerMiddleware);

app.route("/api", healthRoutes);
app.route("/api", readyRoutes);
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

const server = serve(
  {
    fetch: app.fetch,
    hostname: "127.0.0.1",
    port: env.API_PORT,
  },
  (info) => {
    logger.info(
      { address: info.address, port: info.port },
      "Squee Radar API listening",
    );
  },
);

async function shutdown(signal: NodeJS.Signals) {
  logger.info({ signal }, "Shutting down Squee Radar API");

  server.close(async () => {
    await dbPool.end();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
