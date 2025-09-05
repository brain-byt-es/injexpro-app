// app/dashboard/atlas/procedures/page.tsx
import { adminSupabase } from "@/lib/supabase/admin";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type ProcedureRow = {
  id: string;
  name: string;
  area: string;
  type: string; // USER-DEFINED in DB → treat as string
};

export default async function ProceduresPage() {
  const { data, error } = await adminSupabase
    .from("procedures")
    .select("id,name,area,type")
    .order("name", { ascending: true });

  if (error) throw error;

  const procedures = (data ?? []) as ProcedureRow[];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Procedures</CardTitle>
          <CardDescription>
            A comprehensive list of all therapeutic and aesthetic procedures.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Procedure Name</TableHead>
                <TableHead>Area</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {procedures.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.area}</TableCell>
                  <TableCell className="hidden md:table-cell">{p.type}</TableCell>
                </TableRow>
              ))}
              {procedures.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-muted-foreground p-3">
                    No procedures yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
