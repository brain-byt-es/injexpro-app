// app/dashboard/atlas/muscles/page.tsx
import { adminSupabase } from "@/lib/supabase/admin";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type MuscleRow = {
  id: string;
  name: string;
  anatomical_region: string | null;
  innervation: string | null;
};

export default async function MusclesPage() {
  const { data, error } = await adminSupabase
    .from("muscles")
    .select("id,name,anatomical_region,innervation")
    .order("name", { ascending: true });

  if (error) throw error;

  const muscles = (data ?? []) as MuscleRow[];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Muscles</CardTitle>
          <CardDescription>
            An index of all relevant muscles for therapeutic injections.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Muscle Name</TableHead>
                <TableHead>Region</TableHead>
                <TableHead className="hidden md:table-cell">Innervation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {muscles.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell>{m.anatomical_region ?? "—"}</TableCell>
                  <TableCell className="hidden md:table-cell">{m.innervation ?? "—"}</TableCell>
                </TableRow>
              ))}
              {muscles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-muted-foreground p-3">
                    No muscles yet.
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
