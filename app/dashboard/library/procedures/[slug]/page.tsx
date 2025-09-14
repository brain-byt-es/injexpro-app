import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { QuickFactsCard } from "@/components/dashboard/quick-facts-card";
import { ReferenceList, type RefItem } from "@/components/dashboard/reference-list";
import { GlossaryBadge } from "@/components/dashboard/glossary";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type Proc = {
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
  updated_at?: string | null;
};

export default async function ProcedurePage({ params }: { params: { slug: string } }) {
  const sb = await supabaseClient();

  const [{ data: proc, error: pErr }, { data: refs, error: rErr }] = await Promise.all([
    sb
      .from("library_procedures")
      .select(
        "id, slug, title, region, condition_type, guidance, evidence_level, sites_min, sites_max, total_dose_min, total_dose_max, key_muscles, total_muscle_count, updated_at"
      )
      .eq("slug", params.slug)
      .single(),
    sb
      .from("procedure_references")
      .select("reference:literature_references(id,title,journal,publication_year,doi_url)")
      .order("reference(publication_year)", { ascending: false })
      .limit(25),
  ]);

  if (pErr) {
    console.error("Supabase[procedure:detail]", { message: pErr.message, hint: (pErr as any).hint });
    throw new Error("Failed to load procedure.");
  }
  if (!proc) return notFound();
  if (rErr) console.error("Supabase[procedure:refs]", { message: rErr.message, hint: (rErr as any).hint });

  const muscles = proc.key_muscles ?? [];
  const extra = Math.max((proc.total_muscle_count ?? 0) - muscles.length, 0);
  const refItems: RefItem[] = (refs ?? [])
    .map((r: any) => r.reference)
    .filter(Boolean);

  return (
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Hero */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{proc.title}</h1>
            <p className="text-sm text-muted-foreground">
              {proc.region ?? "—"} •{" "}
              <GlossaryBadge kind="guidance" code={proc.guidance}>
                <span>{proc.guidance ?? "—"}</span>
              </GlossaryBadge>{" "}
              •{" "}
              <GlossaryBadge kind="evidence" code={proc.evidence_level}>
                <span>Evidence {proc.evidence_level ?? "—"}</span>
              </GlossaryBadge>
            </p>
          </div>

          {/* Key muscles */}
          <section className="space-y-2">
            <div className="text-sm text-muted-foreground">Key muscles</div>
            <div className="flex flex-wrap gap-2">
              {muscles.slice(0, 4).map((m: { name: string; slug: string }) => (
                <Link
                    key={m.slug}
                    href={`/dashboard/atlas/muscles/${m.slug}`}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-sm hover:bg-muted"
                >
                    {m.name}
                </Link>
              ))}
              {extra > 0 ? <Badge variant="outline">+{extra} more</Badge> : null}
            </div>
          </section>

          {/* Metrics strip */}
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border p-4">
              <div className="text-sm text-muted-foreground">Sites</div>
              <div className="text-lg font-medium">
                {proc.sites_min ?? "—"}–{proc.sites_max ?? "—"}
              </div>
            </div>
            <div className="rounded-2xl border p-4">
              <div className="text-sm text-muted-foreground">Total dose (U)</div>
              <div className="text-lg font-medium">
                {proc.total_dose_min ?? "—"}–{proc.total_dose_max ?? "—"}
              </div>
            </div>
          </section>

          <Separator />

          {/* References */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold">References</h2>
            <ReferenceList items={refItems} />
          </section>
        </div>

        {/* RIGHT (Sticky Protocol) */}
        <div className="space-y-4">
          <QuickFactsCard
            title="Protocol"
            updatedAt={proc.updated_at ?? null}
            items={[
              { label: "Sites", value: `${proc.sites_min ?? "—"}–${proc.sites_max ?? "—"}` },
              { label: "Total dose (U)", value: `${proc.total_dose_min ?? "—"}–${proc.total_dose_max ?? "—"}` },
              { label: "Guidance", value: proc.guidance ?? "—" },
              { label: "Condition", value: proc.condition_type ?? "—" },
              { label: "Region", value: proc.region ?? "—" },
              { label: "Evidence", value: proc.evidence_level ?? "—" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
