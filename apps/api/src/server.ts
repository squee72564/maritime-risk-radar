import { serve } from "@hono/node-server";

import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { dbPool } from "./db/client.js";
import { logger } from "./lib/logger.js";

const app = createApp();

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
