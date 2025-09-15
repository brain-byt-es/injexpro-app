import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { QuickFactsCard } from "@/components/dashboard/quick-facts-card";
import { ReferenceList, type RefItem } from "@/components/dashboard/reference-list";

// Optional — remove if you’re not wiring saves/notes yet
import { getSaved, getNote } from "@/lib/db/queries";
import { SaveHeart, NoteBox } from "@/components/dashboard/save-controls";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type ProcDetail = {
  id: string;
  slug: string;
  title: string;
  region: string | null;
  condition_type: string | null;
  guidance: "US" | "EMG" | "Landmark" | string | null;
  evidence_level: "A" | "B" | "C" | string | null;
  sites_min: number | null;
  sites_max: number | null;
  total_dose_min: number | null;
  total_dose_max: number | null;
  key_muscles: { name: string; slug: string }[] | null;
  total_muscle_count: number | null;
};

type RefRow = { reference: RefItem | RefItem[] | null };

export default async function ProcedurePage({ params }: { params: { slug: string } }) {
  const sb = await supabaseClient();

  // ── Fetch main row (typed) + references (shape-agnostic) ─────────────────────
  const [procRes, refsRes] = await Promise.all([
    sb
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
      .eq("slug", params.slug)
      .maybeSingle(), // never throws on 0 rows
    sb
      .from("procedure_references")
      .select("reference:literature_references(id,title,journal,publication_year,doi_url)")
      // If your link table has a FK/slug, keep this; otherwise remove this line.
      .eq("procedure_slug", params.slug)
      .order("reference(publication_year)", { ascending: false })
      .limit(25),
  ]);

  const pErr = procRes.error;
  // Force the union to the exact row shape (TS can’t infer DB types without generated definitions)
  const proc = (procRes.data as unknown) as ProcDetail | null;

  if (pErr) {
    console.error("Supabase[procedure:detail]", {
      message: (pErr as any)?.message,
      hint: (pErr as any)?.hint,
      details: (pErr as any)?.details,
      code: (pErr as any)?.code,
    });
    throw new Error("Failed to load procedure.");
  }
  if (!proc) return notFound();

  const rErr = refsRes.error;
  if (rErr) {
    console.error("Supabase[procedure:refs]", {
      message: (rErr as any)?.message,
      hint: (rErr as any)?.hint,
      details: (rErr as any)?.details,
      code: (rErr as any)?.code,
    });
  }

  // Reference list: flatten whether Supabase nested a single object or an array
  const refItems: RefItem[] = ((refsRes.data ?? []) as RefRow[])
    .flatMap((row) => (Array.isArray(row.reference) ? row.reference : row.reference ? [row.reference] : []))
    .filter(Boolean);

  // Optional: updated_at from base table (if the view doesn’t expose it)
  const metaRes = await sb.from("procedures").select("updated_at").eq("slug", params.slug).maybeSingle();
  const updatedAt = (metaRes.data as { updated_at: string } | null)?.updated_at ?? null;

  // Optional saves / notes (delete this block and the UI bits if not needed now)
  const theSlug = proc.slug;
  const [initiallySaved, initialNote] = await Promise.all([
    typeof getSaved === "function" ? getSaved("procedure", theSlug) : Promise.resolve(false),
    typeof getNote === "function" ? getNote("procedure", theSlug) : Promise.resolve(null),
  ]);

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
              {proc.key_muscles.slice(0, 8).map((m: { name: string; slug: string }) => (
                <Link
                  key={m.slug}
                  href={`/dashboard/library/muscles/${m.slug}`}
                  className="inline-flex items-center rounded-full border px-3 py-1 text-sm hover:bg-muted"
                >
                  {m.name}
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

/* utils */
function formatRange(a: number | null, b: number | null, suffix = "") {
  if (a == null && b == null) return "—";
  if (a != null && b != null) return `${a}–${b}${suffix}`;
  return `${a ?? b}${suffix}`;
}
