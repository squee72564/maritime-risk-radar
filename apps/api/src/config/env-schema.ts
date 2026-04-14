import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  API_PORT: z.coerce.number().int().positive(),
  DB_POOL_MAX: z.coerce.number().int().positive().max(20),
  LOG_FORMAT: z.enum(["json", "pretty"]),
  LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

export type ApiEnv = Readonly<z.infer<typeof envSchema>>;

export class EnvConfigError extends Error {
  readonly issues: z.core.$ZodIssue[];

  constructor(issues: z.core.$ZodIssue[]) {
    super("Invalid API environment configuration");
    this.name = "EnvConfigError";
    this.issues = issues;
  }
}

export function parseEnv(input: NodeJS.ProcessEnv): ApiEnv {
  const parsedEnv = envSchema.safeParse(input);

  if (!parsedEnv.success) {
    throw new EnvConfigError(parsedEnv.error.issues);
  }

  return Object.freeze(parsedEnv.data);
}

export function formatEnvConfigError(error: EnvConfigError) {
  const lines = ["Invalid API environment configuration:"];

  for (const issue of error.issues) {
    const key = issue.path.join(".") || "environment";
    lines.push(`- ${key}: ${issue.message}`);
  }

  return `${lines.join("\n")}\n`;
}
