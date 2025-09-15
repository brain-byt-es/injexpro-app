// app/dashboard/complications/page.tsx
import { getComplicationsLite } from "@/lib/db/queries";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function ComplicationsPage() {
  const data = await getComplicationsLite();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Complications</CardTitle>
          <CardDescription>Identify and manage potential adverse events.</CardDescription>
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
              {data.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(c.signs_symptoms ?? []).map((s: string) => (
                        <Badge key={s} variant="outline">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!data.length && (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground">
                    No complications found.
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
