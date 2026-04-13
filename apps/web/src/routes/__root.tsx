import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { Activity, Anchor, Info } from "lucide-react";
import type { ReactNode } from "react";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

function RootLayout() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b border-border bg-background/95">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Squee Radar home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-foreground text-background">
              <Anchor className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-lg font-semibold tracking-normal">
                Squee Radar
              </span>
              <span className="block text-sm text-muted-foreground">
                Maritime pressure signals
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

      <main className="mx-auto max-w-6xl px-5 py-10">
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
        className: "bg-foreground text-background",
      }}
      inactiveProps={{
        className: "bg-card text-card-foreground hover:bg-muted",
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}

function NotFoundPage() {
  return (
    <section className="grid gap-4">
      <p className="text-sm font-semibold uppercase tracking-normal text-accent-foreground">
        Unknown route
      </p>
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
