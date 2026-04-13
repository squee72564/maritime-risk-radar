import { describe, expect, it } from "vitest";

import { createApp } from "../src/app.js";

describe("API app", () => {
  it("returns process health and preserves request id", async () => {
    const app = createApp({
      checkDatabaseReady: async () => true,
    });

    const response = await app.request("/api/health", {
      headers: {
        "x-request-id": "health-test-id",
      },
    });

    await expect(response.json()).resolves.toMatchObject({
      service: "squee-radar-api",
      status: "ok",
    });
    expect(response.headers.get("x-request-id")).toBe("health-test-id");
    expect(response.status).toBe(200);
  });

  it("returns version metadata", async () => {
    const app = createApp({
      checkDatabaseReady: async () => true,
    });

    const response = await app.request("/api/version");

    await expect(response.json()).resolves.toEqual({
      name: "squee-radar-api",
      version: "0.1.0",
    });
    expect(response.status).toBe(200);
  });

  it("returns readiness when the database check passes", async () => {
    const app = createApp({
      checkDatabaseReady: async () => true,
    });

    const response = await app.request("/api/ready", {
      headers: {
        "x-request-id": "ready-test-id",
      },
    });

    await expect(response.json()).resolves.toMatchObject({
      checks: {
        database: "ok",
      },
      service: "squee-radar-api",
      status: "ready",
    });
    expect(response.headers.get("x-request-id")).toBe("ready-test-id");
    expect(response.status).toBe(200);
  });

  it("returns a canonical 503 when the database check fails", async () => {
    const app = createApp({
      checkDatabaseReady: async () => false,
    });

    const response = await app.request("/api/ready", {
      headers: {
        "x-request-id": "ready-fail-id",
      },
    });

    await expect(response.json()).resolves.toMatchObject({
      error: {
        code: "DATABASE_NOT_READY",
        message: "Database is not ready",
        requestId: "ready-fail-id",
      },
    });
    expect(response.headers.get("x-request-id")).toBe("ready-fail-id");
    expect(response.status).toBe(503);
  });

  it("returns canonical JSON for missing routes", async () => {
    const app = createApp({
      checkDatabaseReady: async () => true,
    });

    const response = await app.request("/api/missing", {
      headers: {
        "x-request-id": "missing-test-id",
      },
    });

    await expect(response.json()).resolves.toMatchObject({
      error: {
        code: "NOT_FOUND",
        message: "Not found",
        requestId: "missing-test-id",
      },
    });
    expect(response.headers.get("x-request-id")).toBe("missing-test-id");
    expect(response.status).toBe(404);
  });
});
