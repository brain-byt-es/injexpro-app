import { z } from "zod";

export const muscleTableSchema = z.object({
  id: z.string(),
  name: z.string(),
  anatomical_region: z.string().nullable(),
  innervation: z.string().nullable(),
  createdAt: z.string().nullable().optional(),
});
export type MuscleTableRow = z.infer<typeof muscleTableSchema>;
