process.env.DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgres://squee:squee_dev_password@127.0.0.1:5432/squee_radar";
process.env.API_PORT = process.env.API_PORT ?? "3000";
process.env.DB_POOL_MAX = process.env.DB_POOL_MAX ?? "5";
process.env.LOG_FORMAT = process.env.LOG_FORMAT ?? "json";
process.env.LOG_LEVEL = process.env.LOG_LEVEL ?? "fatal";
process.env.NODE_ENV = process.env.NODE_ENV ?? "test";
