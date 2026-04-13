import { placeholderChokepoints } from "@squee-radar/shared";
import { createFileRoute } from "@tanstack/react-router";

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

export function ChokepointsPage() {
  return (
    <section className="grid gap-6">
      <div className="grid gap-3">
        <p className="text-sm font-semibold uppercase tracking-normal text-accent-foreground">
          Placeholder
        </p>
        <h1 className="text-4xl font-semibold tracking-normal">Chokepoints</h1>
        <p className="max-w-2xl text-muted-foreground">
          These are the initial canonical chokepoints. Maps, cards, scoring, and event
          feeds are intentionally out of scope for this setup pass.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderChokepoints.map((chokepoint) => (
          <Card key={chokepoint.id}>
            <CardHeader>
              <CardTitle>{chokepoint.name}</CardTitle>
              <CardDescription>/{chokepoint.slug}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Reference entity stub.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
