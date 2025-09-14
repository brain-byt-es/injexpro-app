import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function WelcomeHero() {
  return (
    <section aria-label="Welcome">
      <Card
        className="
          relative overflow-hidden rounded-2xl border
          bg-[radial-gradient(1200px_600px_at_80%_-20%,hsl(var(--primary)/0.12),transparent_60%)]
          dark:bg-[radial-gradient(1200px_600px_at_80%_-20%,hsl(var(--primary)/0.18),transparent_60%)]
        "
      >
        {/* subtle top gradient line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <CardContent className="px-6 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="
                text-3xl md:text-4xl font-semibold tracking-tight
                bg-gradient-to-br from-foreground to-foreground/70
                bg-clip-text text-transparent
              "
            >
              Welcome to InjexPro Therapeutics
            </h1>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              Your clinical co-pilot for safe &amp; efficient botulinum toxin therapy.
            </p>

            <div className="mt-7 flex items-center justify-center">
              <Button asChild size="lg" className="rounded-xl">
                <Link href="/dashboard/atlas/muscles" aria-label="Open Anatomy Atlas">
                  Open Anatomy Atlas
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>

        {/* soft vignette corners */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-border/60" />
      </Card>
    </section>
  );
}
