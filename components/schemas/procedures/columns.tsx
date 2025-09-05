"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { ProcedureTableRow } from "@/lib/schemas/procedure-table";

export const procedureColumns: ColumnDef<ProcedureTableRow>[] = [
  { accessorKey: "name", header: "Procedure" },        // ← was "header", fix to "name"
  { accessorKey: "area", header: "Anatomical Area" },
  { accessorKey: "type", header: "Type" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.original.status ?? "—",
  },
];
