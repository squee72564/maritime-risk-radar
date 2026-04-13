import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import { env } from "../config/env.js";

export type ErrorResponse = {
  error: {
    code: string;
    message: string;
    requestId: string;
    details?: unknown;
    stack?: string;
  };
};

export class AppError extends Error {
  readonly code: string;
  readonly details?: unknown;
  readonly expose: boolean;
  readonly status: ContentfulStatusCode;

  constructor({
    cause,
    code,
    details,
    expose = false,
    message,
    status = 500,
  }: {
    cause?: unknown;
    code: string;
    details?: unknown;
    expose?: boolean;
    message: string;
    status?: ContentfulStatusCode;
  }) {
    super(message, { cause });
    this.name = "AppError";
    this.code = code;
    this.details = details;
    this.expose = expose;
    this.status = status;
  }
}

export function normalizeError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof HTTPException) {
    return new AppError({
      cause: error,
      code: httpStatusCodeToErrorCode(error.status),
      expose: error.status < 500,
      message: error.message || httpStatusCodeToMessage(error.status),
      status: toContentfulStatusCode(error.status),
    });
  }

  if (error instanceof Error) {
    return new AppError({
      cause: error,
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
      status: 500,
    });
  }

  return new AppError({
    code: "INTERNAL_SERVER_ERROR",
    details: error,
    message: "Internal server error",
    status: 500,
  });
}

export function toErrorResponse(error: AppError, requestId: string): ErrorResponse {
  const includeDebugFields = env.NODE_ENV !== "production";
  const safeMessage = error.expose ? error.message : "Internal server error";

  return {
    error: {
      code: error.code,
      message: includeDebugFields ? error.message : safeMessage,
      requestId,
      ...(includeDebugFields && error.details ? { details: error.details } : {}),
      ...(includeDebugFields && error.stack ? { stack: error.stack } : {}),
    },
  };
}

function httpStatusCodeToErrorCode(status: number) {
  if (status === 404) {
    return "NOT_FOUND";
  }

  if (status === 400) {
    return "BAD_REQUEST";
  }

  if (status === 401) {
    return "UNAUTHORIZED";
  }

  if (status === 403) {
    return "FORBIDDEN";
  }

  return status >= 500 ? "INTERNAL_SERVER_ERROR" : "HTTP_ERROR";
}

function httpStatusCodeToMessage(status: number) {
  if (status === 404) {
    return "Not found";
  }

  if (status >= 500) {
    return "Internal server error";
  }

  return "Request failed";
}

function toContentfulStatusCode(status: number): ContentfulStatusCode {
  if (status === 204 || status === 205 || status === 304) {
    return 500;
  }

  return status as ContentfulStatusCode;
}
