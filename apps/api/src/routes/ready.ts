import { Hono } from "hono";

import { checkDatabaseReady } from "../db/client.js";
import { AppError } from "../lib/errors.js";

export const readyRoutes = new Hono().get("/ready", async (c) => {
  const databaseReady = await checkDatabaseReady();

  if (!databaseReady) {
    throw new AppError({
      code: "DATABASE_NOT_READY",
      expose: true,
      message: "Database is not ready",
      status: 503,
    });
  }

  return c.json({
    checks: {
      database: "ok",
    },
    service: "squee-radar-api",
    status: "ready",
    timestamp: new Date().toISOString(),
  });
});
