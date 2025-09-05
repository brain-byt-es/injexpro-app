import { adminSupabase } from "@/lib/supabase/admin";
import { DataTable } from "@/components/data-table";
import { complicationColumns } from "@/components/schemas/complication/columns";
import { complicationTableSchema, type ComplicationTableRow } from "@/lib/schemas/complication-table";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function ComplicationsPage() {
  const { data, error } = await adminSupabase
    .from("complications")
    .select("id,name,signs_symptoms")
    .order("name", { ascending: true });
  if (error) throw error;

  const tableData: ComplicationTableRow[] = (data ?? []).map((r) =>
    complicationTableSchema.parse({
      id: r.id,
      name: r.name,
      signs: Array.isArray(r.signs_symptoms) ? r.signs_symptoms : [],
    })
  );

  return (
    <DataTable
      columns={complicationColumns}
      data={tableData}
      emptyMessage="No complications found."
    />
  );
}
