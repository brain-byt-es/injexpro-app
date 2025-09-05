"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { MuscleTableRow } from "@/lib/schemas/muscle-table";

export const muscleColumns: ColumnDef<MuscleTableRow>[] = [
  { accessorKey: "name", header: "Muscle" },
  {
    accessorKey: "anatomical_region",
    header: "Region",
    cell: ({ row }) => row.original.anatomical_region ?? "—",
  },
  {
    accessorKey: "innervation",
    header: "Innervation",
    cell: ({ row }) => row.original.innervation ?? "—",
  },
];
