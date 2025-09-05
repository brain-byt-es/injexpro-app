import { z } from "zod";

export const procedureTableSchema = z.object({
  id: z.string(),               // uuid
  name: z.string(),
  area: z.string(),
  type: z.string(),             // DB user-defined → treat as string
  createdAt: z.string().nullable().optional(),
  status: z.string().optional(), // if you have one; otherwise omit
});

export type ProcedureTableRow = z.infer<typeof procedureTableSchema>;
