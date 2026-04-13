import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  API_PORT: z.coerce.number().int().positive(),
  DB_POOL_MAX: z.coerce.number().int().positive().max(20),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  process.stderr.write("Invalid API environment configuration:\n");

  for (const issue of parsedEnv.error.issues) {
    const key = issue.path.join(".") || "environment";
    process.stderr.write(`- ${key}: ${issue.message}\n`);
  }

  process.exit(1);
}

export const env = Object.freeze(parsedEnv.data);
