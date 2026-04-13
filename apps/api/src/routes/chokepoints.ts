import { placeholderChokepoints } from "@squee-radar/shared";
import { Hono } from "hono";

export const chokepointRoutes = new Hono().get("/chokepoints", (c) =>
  c.json({
    data: placeholderChokepoints,
  }),
);
