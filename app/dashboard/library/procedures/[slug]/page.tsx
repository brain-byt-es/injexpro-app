// app/dashboard/library/procedures/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseClient } from "@/lib/supabase/client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { QuickFactsCard } from "@/components/dashboard/quick-facts-card";
import { ReferenceList } from "@/components/dashboard/reference-list";
import { SaveHeart } from "@/components/dashboard/save-controls";

// ---- Local types (keep minimal & permissive to avoid TS friction) ----
type ProcedureRow = {
  id: string;
  slug: string;
  title: string;
  region: string | null;
  condition_type: string | null;
  guidance: string | null;
  evidence_level: string | null;
  sites_min: number | null;
  sites_max: number | null;
  total_dose_min: number | null;
  total_dose_max: number | null;
  key_muscles: any[] | null; // typically [{ name, slug }, ...] — keep as any[] to be flexible
  total_muscle_count: number | null;
};

type LiteratureReference = {
  id: string;
  title: string | null;
  journal: string | null;
  publication_year: number | null;
  doi_url: string | null;
};

// Small display helper
function formatRange(min: number | null, max: number | null, unit = ""): string {
  if (min == null && max == null) return "—";
  if (min != null && max != null) return `${min}–${max}${unit}`;
  if (min != null) return `${min}${unit}`;
  return `${max}${unit}`;
}

export default async function ProcedurePage({
  // Next.js 15: params is async — await before using
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theSlug = slug;

  const sb = await supabaseClient();

  // 1) Base procedure
  const procRes = await sb
    .from("library_procedures")
    .select(
      [
        "id",
        "slug",
        "title",
        "region",
        "condition_type",
        "guidance",
        "evidence_level",
        "sites_min",
        "sites_max",
        "total_dose_min",
        "total_dose_max",
        "key_muscles",
        "total_muscle_count",
      ].join(",")
    )
    .eq("slug", slug)
    .maybeSingle();

  if (procRes.error) {
    console.error("Supabase[procedure:load]", procRes.error);
    notFound(); // keep user experience clean
  }
  const proc = (procRes.data as unknown) as ProcedureRow | null;
  if (!proc) {
    notFound();
  }

  // 2) References via junction table (FK: procedure_id → library_procedures.id)
  const refsRes = await sb
    .from("procedure_references")
    .select("reference:literature_references(id,title,journal,publication_year,doi_url)")
    .eq("procedure_id", proc.id)
    .limit(25);

  if (refsRes.error) {
    console.error("Supabase[procedure:refs]", refsRes.error);
  }

  const refs =
    (((refsRes.data as unknown) as { reference: LiteratureReference | null }[] | null) ?? [])
      .map((row) => row?.reference)
      .filter(Boolean) as LiteratureReference[];

  // Sort newest first without relying on complex nested order syntax
  refs.sort((a, b) => (b.publication_year ?? 0) - (a.publication_year ?? 0));

  // Transform for your <ReferenceList /> (shape is project-specific; keep as any[])
  const refItems: any[] = refs.map((r) => ({
    id: r.id,
    title: r.title ?? "Untitled",
    meta: [r.journal, r.publication_year ?? undefined].filter(Boolean).join(" • "),
    href: r.doi_url ?? undefined,
  }));

  // 3) Saved state (RLS table)
  const savedRes = await sb
    .from("saved_items")
    .select("id")
    .eq("kind", "procedure")
    .eq("slug", slug)
    .maybeSingle();

  const initiallySaved = !!savedRes.data;

  // 4) UpdatedAt — if you have it in another table/view, fetch it here.
  // Leaving as null if not available to avoid extra failing queries.
  const updatedAt: string | null = null;

  // ---- Render (your layout preserved) ----
  return (
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Hero + Save */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">{proc.title}</h1>
              <p className="text-sm text-muted-foreground">
                {[proc.region || "—", proc.guidance || "—", proc.evidence_level || "—"].join(" • ")}
              </p>
            </div>
            {/* Remove if not wiring saves yet */}
            <SaveHeart kind="procedure" slug={theSlug} initiallySaved={!!initiallySaved} />
          </div>

          {/* Key muscles */}
          {proc.key_muscles?.length ? (
            <div className="flex flex-wrap gap-2">
              {(proc.key_muscles as any[])
                .slice(0, 8)
                .map((m: { name?: string; slug?: string }) => (
                  <Link
                    key={m.slug ?? m.name}
                    href={`/dashboard/library/muscles/${m.slug}`}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-sm hover:bg-muted"
                  >
                    {m.name ?? m.slug}
                  </Link>
                ))}
              {proc.total_muscle_count && proc.total_muscle_count > 8 ? (
                <span className="text-sm text-muted-foreground">
                  +{proc.total_muscle_count - 8} more
                </span>
              ) : null}
            </div>
          ) : null}

          {/* Badges */}
          <div className="mt-1 flex flex-wrap gap-1">
            {proc.evidence_level ? <Badge className="rounded-full">Evidence {proc.evidence_level}</Badge> : null}
            {proc.region ? <Badge variant="secondary" className="rounded-full">{proc.region}</Badge> : null}
            {proc.guidance ? <Badge variant="outline" className="rounded-full">{proc.guidance}</Badge> : null}
          </div>

          {/* Metrics */}
          <div className="mt-2 text-sm text-muted-foreground">
            Sites: {formatRange(proc.sites_min, proc.sites_max)} • Total dose:{" "}
            {formatRange(proc.total_dose_min, proc.total_dose_max, " U")} • Type:{" "}
            {proc.condition_type ?? "—"}
          </div>

          <Separator />

          {/* References */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold">References</h2>
            <ReferenceList items={refItems} />
          </section>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <QuickFactsCard
            title="Protocol"
            updatedAt={updatedAt}
            items={[
              { label: "Sites", value: formatRange(proc.sites_min, proc.sites_max) },
              { label: "Total Dose", value: formatRange(proc.total_dose_min, proc.total_dose_max, " U") },
              { label: "Guidance", value: proc.guidance ?? "—" },
              { label: "Condition", value: proc.condition_type ?? "—" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
