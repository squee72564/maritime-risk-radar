import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2 } from "lucide-react";

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

export const Route = createFileRoute("/")({
  component: HomePage,
});

async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch("/api/health");

  if (!response.ok) {
    throw new Error(`Health check failed with ${response.status}`);
  }

  return response.json() as Promise<HealthResponse>;
}

export function HomePage() {
  const health = useQuery({
    queryKey: ["api-health"],
    queryFn: fetchHealth,
    retry: 1,
  });

  return (
    <section className="grid gap-8">
      <div className="grid gap-4">
        <p className="text-sm font-semibold uppercase tracking-normal text-accent-foreground">
          Development foundation
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-normal sm:text-5xl">
          Maritime chokepoints, trade pressure, and geopolitical signal tracking.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          A minimal shell for the Squee Radar stack. Product analytics, maps, scoring,
          ingestion, and reports come later.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>API status</CardTitle>
            <CardDescription>Fetched through the Vite reverse proxy.</CardDescription>
          </CardHeader>
          <CardContent>
            {health.isLoading ? (
              <StatusLine label="Checking backend..." />
            ) : health.isError ? (
              <StatusLine
                label="Backend is not responding"
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Routes</CardTitle>
            <CardDescription>Placeholders only.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button asChild variant="secondary">
              <a href="/">Dashboard</a>
            </Button>
            <Button asChild variant="secondary">
              <a href="/chokepoints">Chokepoints</a>
            </Button>
            <Button asChild variant="secondary">
              <a href="/about">About</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
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
      <CheckCircle2 className="h-5 w-5 text-emerald-700" />
    ) : tone === "error" ? (
      <AlertCircle className="h-5 w-5 text-red-700" />
    ) : (
      <span className="h-2 w-2 rounded-full bg-muted-foreground" />
    );

  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-muted p-4">
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
