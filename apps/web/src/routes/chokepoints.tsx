import { placeholderChokepoints } from "@squee-radar/shared";
import { createFileRoute } from "@tanstack/react-router";
import { CircleDot, MapPinned, Waves } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/chokepoints")({
  component: ChokepointsPage,
});

const chokepointIntel: Record<
  string,
  {
    coordinate: string;
    lane: string;
    posture: string;
    postureKey: "elevated" | "guarded" | "hydrology" | "severe";
    region: string;
  }
> = {
  hormuz: {
    region: "Gulf",
    posture: "Severe watch",
    postureKey: "severe",
    coordinate: "26.6N 56.3E",
    lane: "Energy transit",
  },
  "red-sea": {
    region: "Red Sea",
    posture: "Elevated",
    postureKey: "elevated",
    coordinate: "12.6N 43.3E",
    lane: "Asia-Europe",
  },
  suez: {
    region: "Egypt",
    posture: "Guarded",
    postureKey: "guarded",
    coordinate: "30.6N 32.3E",
    lane: "Canal flow",
  },
  malacca: {
    region: "Southeast Asia",
    posture: "Guarded",
    postureKey: "guarded",
    coordinate: "1.2N 103.5E",
    lane: "Container flow",
  },
  panama: {
    region: "Central America",
    posture: "Hydrology watch",
    postureKey: "hydrology",
    coordinate: "9.1N 79.7W",
    lane: "Canal flow",
  },
  turkish: {
    region: "Black Sea",
    posture: "Elevated",
    postureKey: "elevated",
    coordinate: "41.1N 29.0E",
    lane: "Grain and energy",
  },
};

function ChokepointsPage() {
  return (
    <section className="grid gap-6">
      <div className="intel-panel grid gap-5 rounded-lg p-6 sm:grid-cols-[1fr_auto] sm:p-8">
        <div className="grid gap-3">
          <p className="intel-label">Chokepoint registry</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-normal">
            Maritime corridors under persistent strategic pressure.
          </h1>
          <p className="max-w-2xl leading-7 text-muted-foreground">
            Baseline reference entities for canal flow, energy transit, container
            routing, and conflict-adjacent maritime movement.
          </p>
        </div>
        <div className="radar-surface flex h-28 w-full items-center justify-center rounded-lg border border-primary/20 text-primary sm:w-40">
          <MapPinned className="h-8 w-8" aria-hidden="true" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderChokepoints.map((chokepoint) => {
          const intel = chokepointIntel[chokepoint.id];

          return (
            <Card
              key={chokepoint.id}
              className={`intel-panel rounded-lg ${postureCardClass(intel?.postureKey)}`}
            >
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-3">
                  <span>{chokepoint.name}</span>
                  <CircleDot
                    className={`mt-1 h-4 w-4 ${postureIconClass(intel?.postureKey)}`}
                    aria-hidden="true"
                  />
                </CardTitle>
                <CardDescription>
                  {intel?.region ?? "Global"} / {chokepoint.slug}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <span
                  className={`posture-badge ${postureBadgeClass(intel?.postureKey)}`}
                >
                  {intel?.posture ?? "Watch"}
                </span>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <IntelDatum label="Grid" value={intel?.coordinate ?? "Pending"} />
                  <IntelDatum label="Lane" value={intel?.lane ?? "Strategic transit"} />
                </div>
                <div className="flex items-center gap-2 border-t border-border pt-3 text-sm text-muted-foreground">
                  <Waves className="h-4 w-4 text-accent" aria-hidden="true" />
                  Watch posture pending live source ingestion.
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function postureBadgeClass(posture?: string) {
  switch (posture) {
    case "severe":
      return "posture-severe";
    case "elevated":
      return "posture-elevated";
    case "hydrology":
      return "posture-hydrology";
    default:
      return "posture-guarded";
  }
}

function postureCardClass(posture?: string) {
  switch (posture) {
    case "severe":
      return "border-l-2 border-l-accent";
    case "elevated":
    case "hydrology":
      return "border-l-2 border-l-accent/70";
    default:
      return "border-l-2 border-l-primary/45";
  }
}

function postureIconClass(posture?: string) {
  return posture === "severe" || posture === "elevated" || posture === "hydrology"
    ? "text-accent"
    : "text-primary";
}

function IntelDatum({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded-lg border border-border bg-background/45 p-3">
      <span className="block font-mono text-[0.7rem] text-muted-foreground">
        {label}
      </span>
      <span className="mt-1 block font-medium text-card-foreground">{value}</span>
    </span>
  );
}
