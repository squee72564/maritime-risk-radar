import "dotenv/config";

import { EnvConfigError, formatEnvConfigError, parseEnv } from "./env-schema.js";

let loadedEnv;

try {
  loadedEnv = parseEnv(process.env);
} catch (error) {
  process.stderr.write(
    error instanceof EnvConfigError
      ? formatEnvConfigError(error)
      : "Invalid API environment configuration.\n",
  );
  process.exit(1);
}

export const env = loadedEnv;
