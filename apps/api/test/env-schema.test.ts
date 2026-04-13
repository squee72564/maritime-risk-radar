import { describe, expect, it } from "vitest";

import {
  EnvConfigError,
  formatEnvConfigError,
  parseEnv,
} from "../src/config/env-schema.js";

describe("parseEnv", () => {
  it("accepts the required API env contract", () => {
    expect(
      parseEnv({
        API_PORT: "3000",
        DATABASE_URL: "postgres://squee:squee_dev_password@127.0.0.1:5432/squee_radar",
        DB_POOL_MAX: "5",
        LOG_FORMAT: "json",
        LOG_LEVEL: "info",
        NODE_ENV: "production",
      }),
    ).toEqual({
      API_PORT: 3000,
      DATABASE_URL: "postgres://squee:squee_dev_password@127.0.0.1:5432/squee_radar",
      DB_POOL_MAX: 5,
      LOG_FORMAT: "json",
      LOG_LEVEL: "info",
      NODE_ENV: "production",
    });
  });

  it("rejects missing required API env", () => {
    expect(() => parseEnv({})).toThrow(EnvConfigError);
  });

  it("formats validation errors for stderr output", () => {
    let thrownError: unknown;

    try {
      parseEnv({});
    } catch (error) {
      thrownError = error;
    }

    expect(thrownError).toBeInstanceOf(EnvConfigError);
    expect(formatEnvConfigError(thrownError as EnvConfigError)).toContain(
      "Invalid API environment configuration:",
    );
    expect(formatEnvConfigError(thrownError as EnvConfigError)).toContain(
      "DATABASE_URL",
    );
  });
});
