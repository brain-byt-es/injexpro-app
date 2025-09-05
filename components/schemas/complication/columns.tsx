"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { ComplicationTableRow } from "@/lib/schemas/complication-table";
import { Badge } from "@/components/ui/badge";

export const complicationColumns: ColumnDef<ComplicationTableRow>[] = [
  { accessorKey: "name", header: "Complication" },
  {
    accessorKey: "signs",
    header: "Signs & Symptoms",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.signs.map((s) => (
          <Badge key={s} variant="outline">{s}</Badge>
        ))}
      </div>
    ),
  },
];
