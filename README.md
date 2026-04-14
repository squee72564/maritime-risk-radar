# Squee Radar

Squee Radar is a full-stack TypeScript app for maritime chokepoint analytics and geopolitical trade-disruption signals.

This repository currently contains only the development foundation:

- `apps/web`: React, Vite, TanStack Router, TanStack Query, Tailwind CSS, shadcn/ui
- `apps/api`: Hono API, Zod env validation, Pino logging, Drizzle ORM
- `packages/shared`: shared placeholder constants and types

## Prerequisites

- Node.js 24+
- pnpm 10.24+
- Docker Desktop or Docker Engine

## Local Setup

Install dependencies:

```bash
pnpm install
```

Start Postgres:

```bash
docker compose up -d postgres
```

Run migrations:

```bash
pnpm db:migrate
```

Start the full dev stack:

```bash
pnpm dev
```

The frontend runs at `http://127.0.0.1:5173`.
The API runs at `http://127.0.0.1:3000`.
Vite proxies `/api/*` to the API during local development.

Health endpoints:

- `GET /api/health`: process health only
- `GET /api/ready`: readiness check, including database connectivity

## Useful Commands

```bash
pnpm format
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
pnpm check
```

Database commands:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

Add shadcn/ui components from `apps/web`:

```bash
cd apps/web
pnpm dlx shadcn@4.2.0 add button card
```

## Environment

Copy the example values when local overrides are needed. The root `.env`
is for Docker Compose. `apps/api/.env` is for the API process and Drizzle.

For Docker Compose:

```bash
cp .env.example .env
```

For the API process and Drizzle commands:

```bash
cp apps/api/.env.example apps/api/.env
```

Root Docker Compose value:

```bash
POSTGRES_PORT=5432
```

API values:

```bash
DATABASE_URL=postgres://squee:squee_dev_password@127.0.0.1:5432/squee_radar
API_PORT=3000
DB_POOL_MAX=5
LOG_LEVEL=debug
LOG_FORMAT=pretty
NODE_ENV=development
```

Do not commit real secrets.

## Production Shape

Production is intended to be single-origin behind Caddy:

- Caddy serves `apps/web/dist` as static files.
- Caddy reverse proxies `/api/*` to `127.0.0.1:3000`.
- The API binds only to `127.0.0.1`.
- PostgreSQL runs locally on the VPS, with conservative pool sizing for a small 4 GB / 2 CPU host.

See `caddy/Caddyfile.example` for the reverse proxy model.
