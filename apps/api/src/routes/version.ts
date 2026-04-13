import { Hono } from "hono";

export const versionRoutes = new Hono().get("/version", (c) =>
  c.json({
    name: "squee-radar-api",
    version: "0.1.0",
  }),
);
