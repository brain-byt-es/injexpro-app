import { auth } from "@clerk/nextjs/server";
import { adminSupabase } from "@/lib/supabase/admin";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type ProcedureRow = {
  id: string;
  name: string;
  area: string;
  type: string;
  created_at: string | null;
};

export default async function Page() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const [procCountRes, muscleCountRes, procListRes] = await Promise.all([
    adminSupabase.from("procedures").select("*", { count: "exact", head: true }),
    adminSupabase.from("muscles").select("*", { count: "exact", head: true }),
    adminSupabase
      .from("procedures")
      .select("id,name,area,type,created_at")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  if (procCountRes.error) throw procCountRes.error;
  if (muscleCountRes.error) throw muscleCountRes.error;
  if (procListRes.error) throw procListRes.error;

  const procedures = (procListRes.data ?? []) as ProcedureRow[];
  const tableData = procedures.map((p) => ({
    id: p.id,
    name: p.name,
    area: p.area,
    type: p.type,
    createdAt: p.created_at,
  }));

  return (
    <>
      <StatsGrid
        procedures={procCountRes.count ?? 0}
        muscles={muscleCountRes.count ?? 0}
      />

      <ChartAreaInteractive />

      <DataTable data={tableData} />
    </>
  );
}

function StatsGrid({
  procedures,
  muscles,
}: {
  procedures: number;
  muscles: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <StatCard label="Procedures" value={procedures} />
      <StatCard label="Muscles" value={muscles} />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border p-6">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-3xl font-semibold">{value}</div>
    </div>
  );
}
