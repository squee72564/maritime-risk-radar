import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { Activity, Anchor, Crosshair, Info, RadioTower } from "lucide-react";
import type { ReactNode } from "react";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

function RootLayout() {
  const utcTimestamp = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    month: "short",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(new Date());

  return (
    <div className="intel-shell bg-background text-foreground">
      <header className="relative z-10 border-b border-border bg-background/85 backdrop-blur">
        <div className="border-b border-border/70 bg-card/30">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-2 font-mono text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <RadioTower className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Live maritime intelligence workspace
            </span>
            <span className="flex flex-wrap gap-x-4 gap-y-1 text-[0.72rem]">
              <span>UTC {utcTimestamp}</span>
              <span>ENV {import.meta.env.MODE.toUpperCase()}</span>
              <span className="text-accent">CLASSIFICATION OPEN SOURCE</span>
            </span>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Squee Radar home"
          >
            <span className="radar-surface flex h-11 w-11 items-center justify-center rounded-lg border border-primary/25 text-primary shadow-[0_0_28px_oklch(0.78_0.12_168_/_18%)]">
              <Crosshair className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-lg font-semibold uppercase tracking-normal text-foreground">
                SQUEE RADAR
              </span>
              <span className="block font-mono text-xs text-muted-foreground">
                MARITIME SIGNALS / SIG-RDR
              </span>
            </span>
          </Link>

          <nav className="flex flex-wrap gap-2 text-sm" aria-label="Primary navigation">
            <NavLink to="/" icon={<Activity className="h-4 w-4" />}>
              Dashboard
            </NavLink>
            <NavLink to="/chokepoints" icon={<Anchor className="h-4 w-4" />}>
              Chokepoints
            </NavLink>
            <NavLink to="/about" icon={<Info className="h-4 w-4" />}>
              About
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:py-10">
        <Outlet />
      </main>
    </div>
  );
}

function NavLink({
  children,
  icon,
  to,
}: {
  children: ReactNode;
  icon: ReactNode;
  to: "/" | "/chokepoints" | "/about";
}) {
  return (
    <Link
      to={to}
      activeProps={{
        className:
          "border-primary/35 bg-primary text-primary-foreground shadow-[0_0_24px_oklch(0.78_0.12_168_/_16%)]",
      }}
      inactiveProps={{
        className:
          "bg-card/55 text-card-foreground hover:border-primary/25 hover:bg-muted",
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 font-medium transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}

function NotFoundPage() {
  return (
    <section className="intel-panel grid gap-4 rounded-lg p-6">
      <p className="intel-label">Unknown route</p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-normal">
        This bearing does not resolve yet.
      </h1>
      <Link
        to="/"
        className="w-fit rounded-lg border border-border px-4 py-2 text-sm font-medium"
      >
        Return to dashboard
      </Link>
    </section>
  );
}
