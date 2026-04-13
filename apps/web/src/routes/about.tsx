import { createFileRoute } from "@tanstack/react-router";

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

export function AboutPage() {
  return (
    <section className="grid gap-6">
      <div className="grid gap-3">
        <p className="text-sm font-semibold uppercase tracking-normal text-accent-foreground">
          Methodology
        </p>
        <h1 className="text-4xl font-semibold tracking-normal">About Squee Radar</h1>
        <p className="max-w-2xl text-muted-foreground">
          This page will later explain sources, caveats, scoring logic, and data
          freshness. For now it proves the route and shell are wired.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Source caveats</CardTitle>
          <CardDescription>Future data sources remain opt-in work.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            GDELT, ACLED, EIA references, legal AIS providers, and manual reference data
            can be added after the foundation is stable.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
