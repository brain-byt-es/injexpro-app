"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type Complication = {
  id: string;
  name: string;
  signs_symptoms: string[] | null;
};

export function ComplicationsList({ initialItems }: { initialItems: Complication[] }) {
  const [q, setQ] = React.useState("");

  const filtered = React.useMemo(() => {
    const norm = (s: string) => s.toLowerCase().normalize("NFKD");
    const terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return initialItems;
    return initialItems.filter(c => {
      const hay = norm([c.name, ...(c.signs_symptoms ?? [])].join(" "));
      return terms.every(t => hay.includes(t));
    });
  }, [initialItems, q]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Complications</h1>
        <p className="text-muted-foreground">Identify and review potential adverse events.</p>
      </header>

      <div className="flex items-center gap-2">
        <Input
          aria-label="Search"
          placeholder="Search complications or symptoms…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Escape") setQ(""); }}
          className="w-full max-w-lg"
        />
      </div>

      <div className="rounded-2xl border overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Complication</TableHead>
              <TableHead>Signs &amp; Symptoms</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length ? filtered.map(c => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {(c.signs_symptoms ?? []).map(s => (
                      <Badge key={s} variant="outline" className="rounded-full">{s}</Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={2} className="text-muted-foreground py-8 text-center">No matches. Try clearing search.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
