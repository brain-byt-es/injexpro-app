// app/dashboard/atlas/page.tsx
import Link from "next/link";
import { supabaseClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Stethoscope, TriangleAlert, BookOpen } from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function AtlasPage() {
  const sb = await supabaseClient();

  const [musclesCountRes, procsCountRes, compliCountRes] = await Promise.all([
    sb.from("muscles").select("*", { head: true, count: "exact" }),
    sb.from("library_procedures").select("*", { head: true, count: "exact" }),
    sb.from("complications").select("*", { head: true, count: "exact" }),
  ]);

  // Soft-fail to zero if any count errors (RLS or empty)
  const musclesCount = musclesCountRes.count ?? 0;
  const procsCount = procsCountRes.count ?? 0;
  const compliCount = compliCountRes.count ?? 0;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Hero / Intro */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Anatomy Atlas</CardTitle>
          <CardDescription>
            Navigate muscles, procedures, and complications — optimized for safe, efficient botulinum toxin therapy.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Link href="/dashboard/atlas/muscles">
            <Button>Open Muscle Library</Button>
          </Link>
          <Link href="/dashboard/atlas/procedures">
            <Button variant="outline">Open Procedure Library</Button>
          </Link>
          <Link href="/dashboard/complications">
            <Button variant="ghost">View Complications</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Quick tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Tile
          href="/dashboard/atlas/muscles"
          title="Muscles"
          description="Regional anatomy, function, innervation & safety."
          countLabel={`${musclesCount} items`}
          icon={<Brain className="size-5" aria-hidden="true" />}
        />

        <Tile
          href="/dashboard/atlas/procedures"
          title="Procedures"
          description="Indications, key muscles, sites & total dose ranges."
          countLabel={`${procsCount} items`}
          icon={<Stethoscope className="size-5" aria-hidden="true" />}
        />

        <Tile
          href="/dashboard/complications"
          title="Complications"
          description="Recognition & management, with literature references."
          countLabel={`${compliCount} items`}
          icon={<TriangleAlert className="size-5" aria-hidden="true" />}
        />
      </div>

      {/* Trust strip */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <TrustBadge
          icon={<BadgeDot />}
          title="Data Privacy"
          text="RLS + short-lived tokens; patient data never stored."
        />
        <TrustBadge
          icon={<BookOpen className="size-4" aria-hidden="true" />}
          title="Evidence-Based"
          text="Curated references; evidence levels visible on procedures."
        />
        <TrustBadge
          icon={<Spark />}
          title="Efficiency"
          text="Fast search, focused fields, and sticky quick facts."
        />
      </div>
    </div>
  );
}

/* ---------- bits ---------- */

function Tile(props: {
  href: string;
  title: string;
  description: string;
  countLabel?: string;
  icon?: React.ReactNode;
}) {
  const { href, title, description, countLabel, icon } = props;
  return (
    <Link href={href} className="group">
      <Card className="transition hover:border-primary/40 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <div className="text-muted-foreground">{icon}</div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{description}</p>
          {typeof countLabel === "string" && countLabel.length > 0 ? (
            <Badge variant="secondary" className="rounded-full">
              {countLabel}
            </Badge>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
}

function TrustBadge(props: { icon: React.ReactNode; title: string; text: string }) {
  const { icon, title, text } = props;
  return (
    <div className="rounded-2xl border p-4">
      <div className="flex items-center gap-2">
        <div className="text-muted-foreground">{icon}</div>
        <div className="font-medium">{title}</div>
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{text}</div>
    </div>
  );
}

/* tiny decorative icons to match your tone */
function BadgeDot() {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-3 rounded-full bg-emerald-500/90 ring-2 ring-emerald-500/20"
    />
  );
}
function Spark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 text-muted-foreground" aria-hidden="true">
      <path
        d="M12 2l1.8 4.2L18 8l-4.2 1.8L12 14l-1.8-4.2L6 8l4.2-1.8L12 2z"
        fill="currentColor"
      />
    </svg>
  );
}
