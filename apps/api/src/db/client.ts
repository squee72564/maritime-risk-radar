import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { env } from "../config/env.js";
import * as schema from "./schema.js";

const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  max: env.DB_POOL_MAX,
});

export const db = drizzle(pool, { schema });
export const dbPool = pool;

export async function checkDatabaseReady() {
  const client = await pool.connect();

  try {
    await client.query("begin");
    await client.query("set local statement_timeout = 2000");
    const result = await client.query<{ ready: number }>("select 1 as ready");
    await client.query("commit");

    return result.rows[0]?.ready === 1;
  } catch (error) {
    await client.query("rollback").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}
