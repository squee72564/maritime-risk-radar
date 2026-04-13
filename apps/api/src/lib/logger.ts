import pino from "pino";

import { env } from "../config/env.js";

export const logger = pino({
  level: env.LOG_LEVEL,
  transport:
    env.LOG_FORMAT === "pretty"
      ? {
          target: "pino-pretty",
          options: {
            colorize: env.NODE_ENV !== "production",
            ignore: "pid,hostname",
            translateTime: "SYS:standard",
          },
        }
      : undefined,
});
