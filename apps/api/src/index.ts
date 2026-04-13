import { serve } from "@hono/node-server";
import { Hono } from "hono";
import pino from "pino";

import { env } from "./config/env.js";
import { dbPool } from "./db/client.js";
import { chokepointRoutes } from "./routes/chokepoints.js";
import { healthRoutes } from "./routes/health.js";
import { versionRoutes } from "./routes/version.js";

const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
});

const app = new Hono();

app.route("/api", healthRoutes);
app.route("/api", versionRoutes);
app.route("/api", chokepointRoutes);

app.notFound((c) =>
  c.json(
    {
      error: "Not found",
    },
    404,
  ),
);

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
