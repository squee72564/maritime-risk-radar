import { Hono } from "hono";

export const healthRoutes = new Hono().get("/health", (c) =>
  c.json({
    status: "ok",
    service: "squee-radar-api",
    timestamp: new Date().toISOString(),
  }),
);
