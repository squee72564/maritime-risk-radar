import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  DatabaseZap,
  Radar,
  Satellite,
  ShieldAlert,
} from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HealthResponse = {
  status: string;
  service: string;
  timestamp: string;
};

type DbReadyResponse = {
  checks: { database: string };
  service: string;
  status: string;
  timestamp: string;
};

export const Route = createFileRoute("/")({
  component: HomePage,
});

async function fetchReady(): Promise<DbReadyResponse> {
  const response = await fetch("/api/ready");

  if (!response.ok) {
    throw new Error(`Ready check failed with ${response.status}`);
  }

  return response.json() as Promise<DbReadyResponse>;
}

async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch("/api/health");

  if (!response.ok) {
    throw new Error(`Health check failed with ${response.status}`);
  }

  return response.json() as Promise<HealthResponse>;
}

function HomePage() {
  const health = useQuery({
    queryKey: ["api-health"],
    queryFn: fetchHealth,
    retry: 1,
  });

  const ready = useQuery({
    queryKey: ["api-ready"],
    queryFn: fetchReady,
    retry: 1,
  });

  return (
    <section className="grid gap-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="intel-panel rounded-lg p-6 sm:p-8">
          <p className="intel-label">Maritime pressure watch</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
            Chokepoint risk, trade exposure, and geopolitical signal tracking.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Monitor narrow waterways, canal constraints, regional conflict pressure, and
            operational readiness from a single watch surface.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Metric label="Active corridors" value="06" detail="seeded coverage" />
            <Metric label="Signal posture" value="BETA" detail="manual review" />
            <Metric label="Data mode" value="OSINT" detail="open source" />
          </div>
        </div>

        <div className="intel-panel radar-surface flex min-h-72 flex-col justify-between rounded-lg p-5">
          <span className="radar-blip left-[62%] top-[34%]" aria-hidden="true" />
          <span className="radar-blip left-[37%] top-[55%]" aria-hidden="true" />
          <span className="radar-blip left-[72%] top-[67%]" aria-hidden="true" />
          <div className="flex items-start justify-between">
            <div>
              <p className="intel-label">Radar surface</p>
              <p className="mt-2 max-w-52 text-sm text-muted-foreground">
                Coverage model awaiting live signals.
              </p>
            </div>
            <Radar className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div className="grid gap-2 font-mono text-xs text-muted-foreground">
            <span>RANGE RINGS: 3 / WATCH SECTOR</span>
            <span>LAT BAND: 31.2N / 1.3S</span>
            <span>SCAN RATE: DEVELOPMENT</span>
            <span className="text-accent">WATCH FLOOR: ONLINE</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="intel-panel rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DatabaseZap className="h-4 w-4 text-primary" aria-hidden="true" />
              System readiness
            </CardTitle>
            <CardDescription>
              API and database checks through the local proxy.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {health.isLoading ? (
              <StatusLine label="Checking API process..." />
            ) : health.isError ? (
              <StatusLine
                label="API process is not responding"
                tone="error"
                detail={health.error.message}
              />
            ) : health.data ? (
              <StatusLine
                label={`${health.data.service}: ${health.data.status}`}
                detail={health.data.timestamp}
                tone="ok"
              />
            ) : (
              <StatusLine label="No health payload returned" tone="error" />
            )}
            {ready.isLoading ? (
              <StatusLine label="Checking database readiness..." />
            ) : ready.isError ? (
              <StatusLine
                label="Database readiness is unavailable"
                tone="error"
                detail={ready.error.message}
              />
            ) : ready.data ? (
              <StatusLine
                label={`${ready.data.service}: ${ready.data.status}`}
                detail={`database: ${ready.data.checks.database} / ${ready.data.timestamp}`}
                tone="ok"
              />
            ) : (
              <StatusLine label="No ready payload returned" tone="error" />
            )}
          </CardContent>
        </Card>

        <Card className="intel-panel rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Satellite className="h-4 w-4 text-primary" aria-hidden="true" />
              Work areas
            </CardTitle>
            <CardDescription>Primary surfaces for the current build.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button
              asChild
              variant="secondary"
              className="h-10 justify-between border border-border bg-background/45 px-3 hover:border-primary/35"
            >
              <Link to="/" className="justify-between">
                <span className="inline-flex items-center gap-2">
                  <Radar className="h-4 w-4 text-primary" aria-hidden="true" />
                  Dashboard
                </span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="h-10 justify-between border border-border bg-background/45 px-3 hover:border-primary/35"
            >
              <Link to="/chokepoints" className="justify-between">
                <span className="inline-flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-accent" aria-hidden="true" />
                  Chokepoints
                </span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="h-10 justify-between border border-border bg-background/45 px-3 hover:border-primary/35"
            >
              <Link to="/about" className="justify-between">
                <span className="inline-flex items-center gap-2">
                  <Satellite className="h-4 w-4 text-primary" aria-hidden="true" />
                  Methodology
                </span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <SignalCard
          icon={<ShieldAlert className="h-4 w-4" aria-hidden="true" />}
          label="Security"
          value="Regional pressure"
          detail="Conflict proximity, maritime advisories, and disruption reports."
        />
        <SignalCard
          icon={<Radar className="h-4 w-4" aria-hidden="true" />}
          label="Operations"
          value="Transit constraints"
          detail="Canal throughput, congestion, weather, and routing pressure."
        />
        <SignalCard
          icon={<Satellite className="h-4 w-4" aria-hidden="true" />}
          label="Sources"
          value="Traceable evidence"
          detail="Each risk movement should point back to a timestamped source."
        />
      </div>
    </section>
  );
}

function Metric({
  detail,
  label,
  value,
}: {
  detail: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background/45 p-3">
      <span className="font-mono text-2xl font-semibold text-primary">{value}</span>
      <span className="mt-2 block text-sm font-medium">{label}</span>
      <span className="block text-xs text-muted-foreground">{detail}</span>
    </div>
  );
}

function SignalCard({
  detail,
  icon,
  label,
  value,
}: {
  detail: string;
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="intel-panel rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
            {icon}
          </span>
          {label}
        </CardTitle>
        <CardDescription>{value}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}

function StatusLine({
  detail,
  label,
  tone = "neutral",
}: {
  detail?: string;
  label: string;
  tone?: "neutral" | "ok" | "error";
}) {
  const icon =
    tone === "ok" ? (
      <CheckCircle2 className="h-5 w-5 text-primary" />
    ) : tone === "error" ? (
      <AlertCircle className="h-5 w-5 text-destructive" />
    ) : (
      <span className="h-2 w-2 rounded-full bg-muted-foreground" />
    );

  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-background/50 p-4">
      <span className="mt-0.5 flex h-5 w-5 items-center justify-center">{icon}</span>
      <span>
        <span className="block font-medium">{label}</span>
        {detail ? (
          <span className="block text-sm text-muted-foreground">{detail}</span>
        ) : null}
      </span>
    </div>
  );
}
