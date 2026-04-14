import { createFileRoute } from "@tanstack/react-router";
import { FileSearch, Gauge, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const scoringInputs = [
  {
    signal: "Security incident",
    weight: "High",
    evidence: "Advisory, report, incident source",
  },
  {
    signal: "Transit constraint",
    weight: "Medium",
    evidence: "Canal notice, port status, weather",
  },
  {
    signal: "Conflict proximity",
    weight: "High",
    evidence: "Geolocated event or regional bulletin",
  },
  {
    signal: "Source freshness",
    weight: "Decay",
    evidence: "Timestamp and ingestion window",
  },
];

function AboutPage() {
  return (
    <section className="grid gap-6">
      <div className="intel-panel grid gap-3 rounded-lg p-6 sm:p-8">
        <p className="intel-label">Methodology</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-normal">
          Risk movement must be explainable, sourced, and timestamped.
        </h1>
        <p className="max-w-2xl leading-7 text-muted-foreground">
          Squee Radar is structured around traceable signals, confidence levels, and
          explicit caveats for maritime chokepoint monitoring.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MethodCard
          icon={<FileSearch className="h-4 w-4" aria-hidden="true" />}
          title="Source discipline"
          description="Every signal needs origin, timestamp, and confidence metadata."
        />
        <MethodCard
          icon={<Gauge className="h-4 w-4" aria-hidden="true" />}
          title="Weighted posture"
          description="Scores should separate severity, confidence, and freshness."
        />
        <MethodCard
          icon={<ShieldCheck className="h-4 w-4" aria-hidden="true" />}
          title="Analyst review"
          description="Automation can surface movement; humans preserve judgment."
        />
      </div>

      <Card className="intel-panel rounded-lg">
        <CardHeader>
          <CardTitle>Scoring inputs</CardTitle>
          <CardDescription>
            Initial model dimensions before automated ingestion is expanded.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <div className="min-w-[620px]">
              <div className="grid grid-cols-[1fr_0.55fr_1.1fr] border-b border-border bg-background/55 px-4 py-3 font-mono text-[0.72rem] text-muted-foreground">
                <span>Signal</span>
                <span>Weight</span>
                <span>Evidence</span>
              </div>
              {scoringInputs.map((input) => (
                <div
                  key={input.signal}
                  className="grid grid-cols-[1fr_0.55fr_1.1fr] border-b border-border px-4 py-3 text-sm last:border-b-0"
                >
                  <span className="font-medium text-card-foreground">
                    {input.signal}
                  </span>
                  <span className="text-accent">{input.weight}</span>
                  <span className="text-muted-foreground">{input.evidence}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="intel-panel rounded-lg">
        <CardHeader>
          <CardTitle>Source caveats</CardTitle>
          <CardDescription>
            Initial integrations should stay explicit and auditable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
            Government maritime advisories, canal authority notices, conflict datasets,
            legal AIS providers, weather alerts, and analyst-entered references can be
            added as separate adapters with visible source attribution.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

function MethodCard({
  description,
  icon,
  title,
}: {
  description: string;
  icon: ReactNode;
  title: string;
}) {
  return (
    <Card className="intel-panel rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
            {icon}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
