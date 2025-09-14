import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SafetyBanner } from "@/components/dashboard/safety-banner";
import { QuickFactsCard } from "@/components/dashboard/quick-facts-card";
import { ReferenceList, type RefItem } from "@/components/dashboard/reference-list";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type Muscle = {
  id: string;
  slug: string;
  name: string;
  abbr?: string | null;
  anatomical_region: string | null;
  function_short?: string | null;
  innervation_nerve?: string | null;
  innervation_root?: string | null;
  indications: string[] | null;
  has_ultrasound_window: boolean;
  safety_flags: string[] | null;
  updated_at?: string | null;
};

export default async function MusclePage({ params }: { params: { slug: string } }) {
  const sb = await supabaseClient();

  const [{ data: muscle, error: mErr }, { data: refs, error: rErr }] = await Promise.all([
    sb
      .from("muscles")
      .select("id, slug, name, abbr, anatomical_region, function_short, innervation_nerve, innervation_root, indications, has_ultrasound_window, safety_flags, updated_at")
      .eq("slug", params.slug)
      .single(),
    sb
      .from("muscle_references")
      .select("reference:literature_references(id,title,journal,publication_year,doi_url)")
      .order("reference(publication_year)", { ascending: false })
      .limit(25),
  ]);

  if (mErr) {
    console.error("Supabase[muscle:detail]", { message: mErr.message, hint: (mErr as any).hint });
    throw new Error("Failed to load muscle.");
  }
  if (!muscle) return notFound();
  if (rErr) console.error("Supabase[muscle:refs]", { message: rErr.message, hint: (rErr as any).hint });

  const refItems: RefItem[] = (refs ?? [])
    .map((r: any) => r.reference)
    .filter(Boolean);

  return (
    <div className="p-6">
      {/* 2-column grid */}
      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Hero */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">
              {muscle.name}{" "}
              {muscle.abbr ? <span className="text-muted-foreground">({muscle.abbr})</span> : null}
            </h1>
            <p className="text-sm text-muted-foreground">
              {muscle.anatomical_region ?? "—"} • {muscle.function_short ?? "—"} • {muscle.innervation_nerve ?? "—"}
              {muscle.innervation_root ? ` (${muscle.innervation_root})` : ""}
            </p>
          </div>

          {/* Safety banner (critical flags) */}
          <SafetyBanner flags={muscle.safety_flags ?? []} />

          {/* Badges + chips */}
          <div className="flex flex-wrap gap-2">
            {muscle.has_ultrasound_window ? <Badge variant="outline">US window</Badge> : null}
            {(muscle.safety_flags ?? []).map((f: string) => (
                <Badge key={f} variant="destructive" className="capitalize">
                    {f.replaceAll("-", " ")}
                </Badge>
                ))}
          </div>

          {/* Indication chips (navigate to library w/ facet) */}
          {muscle.indications?.length ? (
            <div className="flex flex-wrap gap-2">
              {(muscle.indications ?? []).slice(0, 8).map((tag: string) => (
                <Link
                    key={tag}
                    href={`/dashboard/atlas/muscles?q=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-sm hover:bg-muted capitalize"
                >
                    {tag.replaceAll("-", " ")}
                </Link>
              ))}
            </div>
          ) : null}

          <Separator />

          {/* References */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold">References</h2>
            <ReferenceList items={refItems} />
          </section>
        </div>

        {/* RIGHT (Sticky Quick Facts) */}
        <div className="space-y-4">
          <QuickFactsCard
            title="Quick Facts"
            updatedAt={muscle.updated_at ?? null}
            items={[
              { label: "Region", value: muscle.anatomical_region ?? "—" },
              { label: "Function", value: muscle.function_short ?? "—" },
              {
                label: "Innervation",
                value: (
                  <>
                    {muscle.innervation_nerve ?? "—"}
                    {muscle.innervation_root ? ` (${muscle.innervation_root})` : ""}
                  </>
                ),
              },
              { label: "US Window", value: muscle.has_ultrasound_window ? "Yes" : "No" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
