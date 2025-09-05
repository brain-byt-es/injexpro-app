import { adminSupabase } from "@/lib/supabase/admin";
import { DataTable } from "@/components/data-table";
import { muscleColumns } from "@/components/schemas/muscles/columns";
import { muscleTableSchema, type MuscleTableRow } from "@/lib/schemas/muscle-table";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function MusclesPage() {
  const { data, error } = await adminSupabase
    .from("muscles")
    .select("id,name,anatomical_region,innervation,created_at")
    .order("name", { ascending: true });
  if (error) throw error;

  const tableData: MuscleTableRow[] = (data ?? []).map((r) =>
    muscleTableSchema.parse({
      id: r.id,
      name: r.name,
      anatomical_region: r.anatomical_region,
      innervation: r.innervation,
      createdAt: r.created_at ?? null,
    })
  );

  return (
    <DataTable
      columns={muscleColumns}
      data={tableData}
      emptyMessage="No muscles found."
    />
  );
}
