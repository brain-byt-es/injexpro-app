import { adminSupabase } from "@/lib/supabase/admin";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type ComplicationRow = {
  id: string;
  name: string;
  // In your schema it's an ARRAY; treat as string[] | null
  signs_symptoms: string[] | null;
};

export default async function ComplicationsPage() {
  const { data, error } = await adminSupabase
    .from("complications")
    .select("id,name,signs_symptoms")
    .order("name", { ascending: true });

  if (error) throw error;

  const complications = (data ?? []) as ComplicationRow[];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Complications</CardTitle>
          <CardDescription>
            A guide to identifying and managing potential adverse events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complication</TableHead>
                <TableHead>Signs &amp; Symptoms</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complications.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(c.signs_symptoms ?? []).map((s) => (
                        <Badge key={s} variant="outline">{s}</Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {complications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className="text-muted-foreground p-3">
                    No complications yet.
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
